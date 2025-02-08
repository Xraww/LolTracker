type CacheEntry<T> = {
    data: T;
    timestamp: number;
    ttl: number;
};

type CacheOptions = {
    ttl: number; // Time to live in seconds
};

class MemoryCache {
    private static instance: MemoryCache;
    private cache: Map<string, CacheEntry<any>>;
    private defaultTTL: number = 60; // 1 minute default TTL

    private constructor() {
        this.cache = new Map();
    }

    public static getInstance(): MemoryCache {
        if (!MemoryCache.instance) {
            MemoryCache.instance = new MemoryCache();
        }
        return MemoryCache.instance;
    }

    public get<T>(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        const now = Date.now();
        if (now - entry.timestamp > entry.ttl * 1000) {
            this.cache.delete(key);
            return null;
        }

        return entry.data;
    }

    public set<T>(key: string, data: T, options: CacheOptions = { ttl: this.defaultTTL }): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl: options.ttl
        });
    }

    public delete(key: string): void {
        this.cache.delete(key);
    }

    public clear(): void {
        this.cache.clear();
    }
}

export const cache = MemoryCache.getInstance();

// Cache TTL constants (in seconds)
export const CACHE_TTL = {
    SUMMONER: 300,        // 5 minutes
    ACCOUNT: 300,         // 5 minutes
    RANKED: 300,          // 5 minutes
    MATCH_LIST: 60,       // 1 minute
    MATCH_DETAILS: 3600,  // 1 hour (matches don't change)
} as const; 