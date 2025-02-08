import { ApiError, ApiResponse } from '@/types/riot-api';
import { getApiUrl, getRiotHeaders, Region, RegionalRoute, API_CONFIG } from './api-config';
import { cache, CACHE_TTL } from './cache-utils';

export class RiotApiError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
        this.name = 'RiotApiError';
    }
}

// Cache key for the LoL version
const LOL_VERSION_CACHE_KEY = 'lol-current-version';

export async function getCurrentLoLVersion(): Promise<string> {
    // Try to get from cache first
    const cachedVersion = cache.get<string>(LOL_VERSION_CACHE_KEY);
    if (cachedVersion) {
        return cachedVersion;
    }

    try {
        const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await response.json();
        const currentVersion = versions[0]; // First version is always the latest

        // Cache the version for 24 hours
        cache.set(LOL_VERSION_CACHE_KEY, currentVersion, { ttl: 86400 }); // 24 hours
        return currentVersion;
    } catch (error) {
        console.error('Error fetching LoL version:', error);
        return '13.24.1'; // Fallback version if API fails
    }
}

export function getProfileIconUrl(profileIconId: number, version?: string): string {
    const baseVersion = version || '13.24.1'; // Fallback version if not provided
    return `https://ddragon.leagueoflegends.com/cdn/${baseVersion}/img/profileicon/${profileIconId}.png`;
}

async function fetchWithTimeout(
    url: string,
    options: RequestInit & { timeout?: number }
): Promise<Response> {
    const { timeout = API_CONFIG.timeout } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        return response;
    } finally {
        clearTimeout(id);
    }
}

async function fetchWithRetry<T>(
    url: string,
    options: RequestInit,
    retries: number = API_CONFIG.retries
): Promise<ApiResponse<T>> {
    let lastError: Error | null = null;

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetchWithTimeout(url, {
                ...options,
                timeout: API_CONFIG.timeout
            });

            if (!response.ok) {
                // Don't retry on client errors (4xx)
                if (response.status >= 400 && response.status < 500) {
                    return handleApiError({
                        status: {
                            message: response.statusText,
                            status_code: response.status
                        }
                    });
                }

                throw new RiotApiError(response.status, response.statusText);
            }

            const data = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            lastError = error as Error;
            
            // Don't retry on abort or rate limit
            if (error instanceof RiotApiError && (
                error.statusCode === 429 || // Rate limit
                error.statusCode === 403    // Forbidden
            )) {
                return handleApiError({
                    status: {
                        message: error.message,
                        status_code: error.statusCode
                    }
                });
            }

            // Wait before retrying, with exponential backoff
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
            }
        }
    }

    return handleApiError({
        status: {
            message: lastError?.message || 'Maximum retries reached',
            status_code: 500
        }
    });
}

function getCacheTTL(endpoint: string): number {
    if (endpoint.includes('/account/')) return CACHE_TTL.ACCOUNT;
    if (endpoint.includes('/summoner/')) return CACHE_TTL.SUMMONER;
    if (endpoint.includes('/league/')) return CACHE_TTL.RANKED;
    if (endpoint.includes('/match/')) {
        return endpoint.includes('/matches/') ? CACHE_TTL.MATCH_DETAILS : CACHE_TTL.MATCH_LIST;
    }
    return CACHE_TTL.SUMMONER; // Default TTL
}

export async function fetchRiotApi<T>(
    region: Region | RegionalRoute,
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = getApiUrl(region, endpoint);
    const cacheKey = `riot-api:${url}`;

    // Try to get from cache first
    const cachedData = cache.get<ApiResponse<T>>(cacheKey);
    if (cachedData) {
        return cachedData;
    }


    // If not in cache, fetch from API
    const response = await fetchWithRetry<T>(url, {
        ...options,
        headers: {
            ...getRiotHeaders(),
            ...options.headers,
        },
    });

    // Only cache successful responses
    if (response.success) {
        cache.set(cacheKey, response, { ttl: getCacheTTL(endpoint) });
    }

    return response;
}

export function handleApiError(error: ApiError): ApiResponse<never> {
    return {
        success: false,
        error
    };
} 