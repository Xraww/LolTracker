// Types communs pour l'application
export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
}

// Types pour Valorant
export interface ValorantStats {
    rank: string;
    tier: number;
    rr: number;  // Rank Rating
    winRate: number;
    kda: {
        kills: number;
        deaths: number;
        assists: number;
    };
}

// Types pour League of Legends
export interface LeagueStats {
    rank: string;
    tier: string;
    lp: number;  // League Points
    winRate: number;
    mainChampions: Champion[];
}

export interface Champion {
    id: number;
    name: string;
    winRate: number;
    gamesPlayed: number;
    kda: {
        kills: number;
        deaths: number;
        assists: number;
    };
} 