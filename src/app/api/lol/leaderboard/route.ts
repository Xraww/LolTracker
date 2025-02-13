import { API_ENDPOINTS, Region, getRegionalFromRegion } from '@/lib/api-config';
import { fetchRiotApi } from '@/lib/api-utils';
import { cache } from '@/lib/cache-utils';
import { NextRequest, NextResponse } from 'next/server';

interface LeagueEntry {
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    rank: string;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
    profileIconId?: number;
    gameName?: string;
    tagLine?: string;
}

interface LeagueList {
    tier: string;
    leagueId: string;
    queue: string;
    name: string;
    entries: LeagueEntry[];
}

interface SummonerDTO {
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

interface RiotAccountDTO {
    puuid: string;
    gameName: string;
    tagLine: string;
}

async function fetchLeagueData(region: Region, tier: 'CHALLENGER' | 'GRANDMASTER' | 'MASTER'): Promise<LeagueEntry[]> {
    const endpoint = tier === 'CHALLENGER' 
        ? API_ENDPOINTS.LEAGUE.CHALLENGER 
        : tier === 'GRANDMASTER' 
            ? API_ENDPOINTS.LEAGUE.GRANDMASTER 
            : API_ENDPOINTS.LEAGUE.MASTER;

    try {
        const response = await fetchRiotApi<LeagueList>(region, endpoint);
        
        if (!response.success) {
            console.error(`Failed to fetch ${tier} data:`, response.error);
            return [];
        }

        if (!response.data || !response.data.entries || !Array.isArray(response.data.entries)) {
            console.error(`Invalid response format for ${tier} data:`, response.data);
            return [];
        }

        return response.data.entries;
    } catch (error) {
        console.error(`Error in fetchLeagueData for ${tier}:`, error);
        return [];
    }
}

async function enrichWithSummonerData(entries: LeagueEntry[], region: Region): Promise<LeagueEntry[]> {
    // Process entries in smaller batches to avoid rate limits
    const batchSize = 10;
    const enrichedEntries: LeagueEntry[] = [];
    
    for (let i = 0; i < entries.length; i += batchSize) {
        const batch = entries.slice(i, i + batchSize);
        const batchPromises = batch.map(async (entry) => {
            if (!entry || !entry.summonerId) {
                return entry;
            }

            // Create cache key for summoner data
            const summonerCacheKey = `summoner:${region}:${entry.summonerId}`;
            const cachedSummoner = cache.get<SummonerDTO & { gameName?: string; tagLine?: string }>(summonerCacheKey);
            
            if (cachedSummoner && cachedSummoner.gameName) {
                return {
                    ...entry,
                    summonerName: cachedSummoner.name,
                    profileIconId: cachedSummoner.profileIconId,
                    gameName: cachedSummoner.gameName,
                    tagLine: cachedSummoner.tagLine
                };
            }

            try {
                // First get summoner data
                const summonerResponse = await fetchRiotApi<SummonerDTO>(
                    region,
                    `/lol/summoner/v4/summoners/${entry.summonerId}`
                );

                if (summonerResponse.success) {
                    // Then get Riot Account data using PUUID
                    const regionalRoute = getRegionalFromRegion(region);
                    const accountResponse = await fetchRiotApi<RiotAccountDTO>(
                        regionalRoute,
                        `/riot/account/v1/accounts/by-puuid/${summonerResponse.data.puuid}`
                    );

                    if (accountResponse.success) {
                        const enrichedData = {
                            ...summonerResponse.data,
                            gameName: accountResponse.data.gameName,
                            tagLine: accountResponse.data.tagLine
                        };

                        // Cache the combined data for 1 hour
                        cache.set(summonerCacheKey, enrichedData, { ttl: 3600 });
                        
                        return {
                            ...entry,
                            summonerName: summonerResponse.data.name,
                            profileIconId: summonerResponse.data.profileIconId,
                            gameName: accountResponse.data.gameName,
                            tagLine: accountResponse.data.tagLine
                        };
                    }
                }
                // If either API call fails, return entry with default profile icon
                return {
                    ...entry,
                    profileIconId: 29 // Default profile icon ID
                };
            } catch (error) {
                console.error(`Failed to fetch summoner data for ${entry.summonerId}:`, error);
                return {
                    ...entry,
                    profileIconId: 29 // Default profile icon ID
                };
            }
        });

        const batchResults = await Promise.all(batchPromises);
        enrichedEntries.push(...batchResults);

        // Add a small delay between batches to respect rate limits
        if (i + batchSize < entries.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    return enrichedEntries;
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const region = (searchParams.get('region') as Region) || 'EUW1';
        const page = parseInt(searchParams.get('page') || '1');
        const pageSize = 10;
        const MIN_ENTRIES = 50;

        // Create cache key for the full leaderboard
        const fullLeaderboardCacheKey = `full-leaderboard:${region}`;
        let sortedEntries = cache.get<LeagueEntry[]>(fullLeaderboardCacheKey);

        if (!sortedEntries) {
            let allEntries: LeagueEntry[] = [];
            
            // Start with Challenger
            const challengerEntries = await fetchLeagueData(region, 'CHALLENGER');
            allEntries = [...challengerEntries];

            // If we have less than MIN_ENTRIES entries, fetch Grandmaster
            if (allEntries.length < MIN_ENTRIES) {
                const grandmasterEntries = await fetchLeagueData(region, 'GRANDMASTER');
                allEntries = [...allEntries, ...grandmasterEntries];
            }

            // If we still have less than MIN_ENTRIES entries, fetch Master
            if (allEntries.length < MIN_ENTRIES) {
                const masterEntries = await fetchLeagueData(region, 'MASTER');
                allEntries = [...allEntries, ...masterEntries];
            }

            if (allEntries.length === 0) {
                return NextResponse.json(
                    { error: 'No leaderboard data available' },
                    { status: 404 }
                );
            }

            // Sort all entries by LP and keep top MIN_ENTRIES
            sortedEntries = allEntries
                .sort((a, b) => b.leaguePoints - a.leaguePoints)
                .slice(0, MIN_ENTRIES);

            cache.set(fullLeaderboardCacheKey, sortedEntries, { ttl: 300 });
        }

        // Calculate pagination
        const start = (page - 1) * pageSize;
        const end = Math.min(start + pageSize, sortedEntries.length);
        
        if (start >= sortedEntries.length) {
            return NextResponse.json(
                { error: 'Page number exceeds available data' },
                { status: 400 }
            );
        }

        const paginatedEntries = sortedEntries.slice(start, end);
        const enrichedEntries = await enrichWithSummonerData(paginatedEntries, region);

        const result = {
            tier: 'CHALLENGER',
            queue: 'RANKED_SOLO_5x5',
            name: `Top ${MIN_ENTRIES} Players`,
            entries: enrichedEntries,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(sortedEntries.length / pageSize),
                totalEntries: sortedEntries.length
            }
        };

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json(
            { error: 'Failed to fetch leaderboard data' },
            { status: 500 }
        );
    }
} 