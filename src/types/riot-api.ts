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

export interface MatchParticipant {
    assists: number;
    baronKills: number;
    bountyLevel: number;
    champExperience: number;
    champLevel: number;
    championId: number;
    championName: string;
    damageDealtToBuildings: number;
    damageDealtToObjectives: number;
    damageDealtToTurrets: number;
    damageSelfMitigated: number;
    deaths: number;
    doubleKills: number;
    dragonKills: number;
    firstBloodAssist: boolean;
    firstBloodKill: boolean;
    firstTowerAssist: boolean;
    firstTowerKill: boolean;
    gameEndedInEarlySurrender: boolean;
    gameEndedInSurrender: boolean;
    goldEarned: number;
    goldSpent: number;
    individualPosition: string;
    inhibitorKills: number;
    inhibitorTakedowns: number;
    inhibitorsLost: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
    kills: number;
    lane: string;
    largestCriticalStrike: number;
    largestKillingSpree: number;
    largestMultiKill: number;
    longestTimeSpentLiving: number;
    magicDamageDealt: number;
    magicDamageDealtToChampions: number;
    magicDamageTaken: number;
    neutralMinionsKilled: number;
    nexusKills: number;
    nexusTakedowns: number;
    nexusLost: number;
    objectivesStolen: number;
    objectivesStolenAssists: number;
    pentaKills: number;
    physicalDamageDealt: number;
    physicalDamageDealtToChampions: number;
    physicalDamageTaken: number;
    profileIcon: number;
    puuid: string;
    quadraKills: number;
    riotIdGameName: string;
    riotIdTagline: string;
    role: string;
    sightWardsBoughtInGame: number;
    spell1Casts: number;
    spell2Casts: number;
    spell3Casts: number;
    spell4Casts: number;
    summoner1Casts: number;
    summoner1Id: number;
    summoner2Casts: number;
    summoner2Id: number;
    summonerLevel: number;
    summonerName: string;
    teamEarlySurrendered: boolean;
    teamId: number;
    teamPosition: string;
    timeCCingOthers: number;
    timePlayed: number;
    totalDamageDealt: number;
    totalDamageDealtToChampions: number;
    totalDamageShieldedOnTeammates: number;
    totalDamageTaken: number;
    totalHeal: number;
    totalHealsOnTeammates: number;
    totalMinionsKilled: number;
    totalTimeCCDealt: number;
    totalTimeSpentDead: number;
    totalUnitsHealed: number;
    tripleKills: number;
    trueDamageDealt: number;
    trueDamageDealtToChampions: number;
    trueDamageTaken: number;
    turretKills: number;
    turretTakedowns: number;
    turretsLost: number;
    unrealKills: number;
    visionScore: number;
    visionWardsBoughtInGame: number;
    wardsKilled: number;
    wardsPlaced: number;
    win: boolean;
    perks: {
        statPerks: {
            defense: number;
            flex: number;
            offense: number;
        };
        styles: Array<{
            description: string;
            selections: Array<{
                perk: number;
                var1: number;
                var2: number;
                var3: number;
            }>;
            style: number;
        }>;
    };
}

export interface MatchTeam {
    teamId: number;
    win: boolean;
    objectives: {
        baron: { first: boolean; kills: number };
        champion: { first: boolean; kills: number };
        dragon: { first: boolean; kills: number };
        inhibitor: { first: boolean; kills: number };
        riftHerald: { first: boolean; kills: number };
        tower: { first: boolean; kills: number };
        horde: { first: boolean; kills: number };
    };
    bans: Array<{
        championId: number;
        pickTurn: number;
    }>;
}

export interface MatchInfo {
    gameCreation: number;
    gameDuration: number;
    gameEndTimestamp: number;
    gameId: number;
    gameMode: string;
    gameName: string;
    gameStartTimestamp: number;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participants: MatchParticipant[];
    platformId: string;
    queueId: number;
    teams: MatchTeam[];
    tournamentCode?: string;
}

export interface MatchData {
    metadata: {
        dataVersion: string;
        matchId: string;
        participants: string[];
    };
    info: MatchInfo;
} 