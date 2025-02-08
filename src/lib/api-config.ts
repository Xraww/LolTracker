// Configuration des points d'accès API
export const API_ENDPOINTS = {
    // League of Legends API endpoints
    lol: {
        base: 'https://euw1.api.riotgames.com/lol',
        summoner: '/summoner/v4/summoners/by-name',
        matchHistory: '/match/v5/matches/by-puuid',
        matchDetails: '/match/v5/matches',
        leaderboard: '/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5',
    },
};

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