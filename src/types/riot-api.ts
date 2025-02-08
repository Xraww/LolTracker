export interface RiotAccountDTO {
    puuid: string;
    gameName: string;
    tagLine: string;
}

export interface SummonerDTO {
    accountId: string;
    profileIconId: number;
    revisionDate: number;
    id: string;
    puuid: string;
    summonerLevel: number;
}

export interface CompleteSummonerInfo {
    account: RiotAccountDTO;
    summoner: SummonerDTO;
    ranked?: LeagueEntryDTO[];
}

export interface LeagueEntryDTO {
    leagueId: string;
    summonerId: string;
    summonerName: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    hotStreak: boolean;
    veteran: boolean;
    freshBlood: boolean;
    inactive: boolean;
    miniSeries?: MiniSeriesDTO;
}

export interface MiniSeriesDTO {
    losses: number;
    progress: string;
    target: number;
    wins: number;
}

export interface ApiError {
    status: {
        message: string;
        status_code: number;
    };
}

export type ApiResponse<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: ApiError;
} 