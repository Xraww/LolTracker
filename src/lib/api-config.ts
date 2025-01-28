// Configuration des points d'accès API
export const API_ENDPOINTS = {
    // Valorant API endpoints
    valorant: {
        base: 'https://api.henrikdev.xyz/valorant/v1',
        mmr: '/mmr',
        matches: '/matches',
    },
    
    // League of Legends API endpoints
    leagueOfLegends: {
        base: 'https://euw1.api.riotgames.com/lol',
        summoner: '/summoner/v4/summoners/by-name',
        league: '/league/v4/entries/by-summoner',
        matches: '/match/v5/matches/by-puuid',
    }
};

// Configuration des régions
export const REGIONS = {
    valorant: ['eu', 'na', 'ap', 'kr'],
    leagueOfLegends: ['euw1', 'eun1', 'na1', 'kr', 'jp1']
} as const;

// Types pour les régions
export type ValorantRegion = typeof REGIONS.valorant[number];
export type LeagueRegion = typeof REGIONS.leagueOfLegends[number];

// Configuration des timeouts et limites
export const API_CONFIG = {
    timeout: 10000, // 10 secondes
    retries: 3,
    rateLimit: {
        windowMs: 60000, // 1 minute
        maxRequests: 100
    }
}; 