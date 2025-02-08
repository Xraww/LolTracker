// Configuration des points d'accès API
export const RIOT_API_BASE_URL = {
    BR1: 'https://br1.api.riotgames.com',
    EUN1: 'https://eun1.api.riotgames.com',
    EUW1: 'https://euw1.api.riotgames.com',
    JP1: 'https://jp1.api.riotgames.com',
    KR: 'https://kr.api.riotgames.com',
    LA1: 'https://la1.api.riotgames.com',
    LA2: 'https://la2.api.riotgames.com',
    NA1: 'https://na1.api.riotgames.com',
    OC1: 'https://oc1.api.riotgames.com',
    TR1: 'https://tr1.api.riotgames.com',
    RU: 'https://ru.api.riotgames.com'
} as const;

export const RIOT_REGIONAL_URLS = {
    AMERICAS: 'https://americas.api.riotgames.com',
    ASIA: 'https://asia.api.riotgames.com',
    EUROPE: 'https://europe.api.riotgames.com',
    SEA: 'https://sea.api.riotgames.com'
} as const;

export const REGION_TO_REGIONAL = {
    BR1: 'AMERICAS',
    LA1: 'AMERICAS',
    LA2: 'AMERICAS',
    NA1: 'AMERICAS',
    KR: 'ASIA',
    JP1: 'ASIA',
    EUN1: 'EUROPE',
    EUW1: 'EUROPE',
    TR1: 'EUROPE',
    RU: 'EUROPE',
    OC1: 'SEA'
} as const;

export type Region = keyof typeof RIOT_API_BASE_URL;
export type RegionalRoute = keyof typeof RIOT_REGIONAL_URLS;

export const DEFAULT_REGION: Region = 'EUW1';

export const API_ENDPOINTS = {
    ACCOUNT: {
        BY_RIOT_ID: (gameName: string, tagLine: string) => 
            `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
        BY_PUUID: (puuid: string) => 
            `/riot/account/v1/accounts/by-puuid/${puuid}`,
    },
    SUMMONER: {
        BY_PUUID: (puuid: string) => 
            `/lol/summoner/v4/summoners/by-puuid/${puuid}`,
        BY_NAME: (summonerName: string) => 
            `/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`,
    },
    LEAGUE: {
        BY_SUMMONER: (summonerId: string) => 
            `/lol/league/v4/entries/by-summoner/${summonerId}`,
        CHALLENGER: '/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5',
        GRANDMASTER: '/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5',
        MASTER: '/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5',
    },
    MATCH: {
        BY_PUUID: (puuid: string) => 
            `/lol/match/v5/matches/by-puuid/${puuid}/ids`,
        BY_ID: (matchId: string) => 
            `/lol/match/v5/matches/${matchId}`,
    }
} as const;

export const getApiUrl = (region: Region | RegionalRoute, endpoint: string) => {
    if (region in RIOT_REGIONAL_URLS) {
        return `${RIOT_REGIONAL_URLS[region as RegionalRoute]}${endpoint}`;
    }
    return `${RIOT_API_BASE_URL[region as Region]}${endpoint}`;
};

export const getRegionalFromRegion = (region: Region): RegionalRoute => {
    return REGION_TO_REGIONAL[region];
};

export const getRiotHeaders = () => ({
    'X-Riot-Token': process.env.RIOT_API_KEY || '',
});

// Configuration des régions
export const REGIONS = {
    lol: ['euw1', 'na1', 'kr', 'br1', 'eun1', 'jp1', 'la1', 'la2', 'oc1', 'tr1', 'ru'],
} as const;

// Types pour les régions
export type LolRegion = typeof REGIONS.lol[number];

// Configuration des timeouts et limites
export const API_CONFIG = {
    timeout: 10000, // 10 secondes
    retries: 3,
    rateLimit: {
        windowMs: 60000, // 1 minute
        maxRequests: 100
    }
}; 