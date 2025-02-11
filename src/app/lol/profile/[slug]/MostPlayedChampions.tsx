'use client';

import { useLanguage } from "@/context/LanguageContext";
import { CompleteSummonerInfo, MatchData } from '@/types/riot-api';
import { useEffect, useState } from 'react';

interface ChampionStats {
    championId: string;
    championName: string;
    games: number;
    wins: number;
    kills: number;
    deaths: number;
    assists: number;
}

interface MostPlayedChampionsProps {
    summonerData: CompleteSummonerInfo;
    currentVersion: string;
    region: string;
}

const MostPlayedChampions = ({ summonerData, currentVersion, region }: MostPlayedChampionsProps) => {
    const { t } = useLanguage();
    const [championStats, setChampionStats] = useState<ChampionStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMatchHistory = async () => {
            try {
                const response = await fetch(`/api/lol/matches?puuid=${summonerData.account.puuid}&region=${region}&count=100`);
                const matches: MatchData[] = await response.json();

                // Process matches to get champion stats
                const statsMap = new Map<string, ChampionStats>();

                matches.forEach(match => {
                    const participant = match.info.participants.find(
                        p => p.puuid === summonerData.account.puuid
                    );

                    if (participant) {
                        const existingStats = statsMap.get(participant.championName) || {
                            championId: participant.championId.toString(),
                            championName: participant.championName,
                            games: 0,
                            wins: 0,
                            kills: 0,
                            deaths: 0,
                            assists: 0
                        };

                        statsMap.set(participant.championName, {
                            ...existingStats,
                            games: existingStats.games + 1,
                            wins: existingStats.wins + (participant.win ? 1 : 0),
                            kills: existingStats.kills + participant.kills,
                            deaths: existingStats.deaths + participant.deaths,
                            assists: existingStats.assists + participant.assists
                        });
                    }
                });

                // Convert to array and sort by games played
                const sortedStats = Array.from(statsMap.values())
                    .sort((a, b) => b.games - a.games)
                    .slice(0, 10);

                setChampionStats(sortedStats);
            } catch (error) {
                console.error('Error fetching match history:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatchHistory();
    }, [summonerData.account.puuid, region]);

    return (
        <div className="bg-gradient-to-br from-[#111111] to-black rounded-lg border border-[#C89B3C]/30 overflow-hidden">
            <div className="border-b border-[#C89B3C]/30 p-4">
                <h2 className="text-xl font-bold text-[#C89B3C]">{t.lol.profile.mostPlayedChampions.title}</h2>
            </div>

            <div className="p-4">
                <div className="space-y-2">
                    {isLoading ? (
                        // Loading skeleton
                        Array(10).fill(0).map((_, index) => (
                            <div key={index} className="bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1.5 border border-[#C89B3C]/20 animate-pulse">
                                <div className="flex items-center w-full">
                                    <div className="w-8 h-8 bg-black/60 rounded-lg flex-shrink-0"></div>
                                    
                                    <div className="flex-1 ml-2 space-y-2">
                                        <div className="h-4 bg-black/60 rounded w-24"></div>
                                        <div className="h-3 bg-black/60 rounded w-16"></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        championStats.map((champion) => {
                            const winRate = (champion.wins / champion.games) * 100;
                            const kda = ((champion.kills + champion.assists) / Math.max(champion.deaths, 1)).toFixed(2);
                            const avgKDA = {
                                kills: (champion.kills / champion.games).toFixed(1),
                                deaths: (champion.deaths / champion.games).toFixed(1),
                                assists: (champion.assists / champion.games).toFixed(1)
                            };

                            return (
                                <div key={champion.championName} className="bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1.5 border border-[#C89B3C]/20 hover:bg-black/60 transition-colors">
                                    <div className="flex items-center w-full">
                                        {/* Champion Icon */}
                                        <img 
                                            src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${champion.championName}.png`}
                                            alt={champion.championName}
                                            className="w-8 h-8 rounded-lg flex-shrink-0"
                                        />
                                        
                                        {/* Champion Name and Games */}
                                        <div className="flex-shrink-0 w-[30%] ml-2">
                                            <div className="text-[#C89B3C] font-medium text-sm truncate">{champion.championName}</div>
                                            <div className="text-xs text-gray-400">{champion.games} {t.lol.profile.mostPlayedChampions.games}</div>
                                        </div>

                                        {/* KDA */}
                                        <div className="flex-shrink-0 w-[30%]">
                                            <div className="flex items-center justify-center space-x-1 mb-0.5">
                                                <span className="text-gray-400 text-xs">KDA</span>
                                                <span className="text-[#C89B3C] text-xs">{kda}</span>
                                            </div>

                                            <div className="text-white text-xs text-center">
                                                {avgKDA.kills} / {avgKDA.deaths} / {avgKDA.assists}
                                            </div>
                                        </div>

                                        {/* Winrate */}
                                        <div className="flex items-center justify-end flex-1 min-w-[80px]">
                                            <div className="relative w-8 h-8 mr-2">
                                                <svg className="w-8 h-8 transform -rotate-90">
                                                    {/* Background Circle */}
                                                    <circle
                                                        cx="16"
                                                        cy="16"
                                                        r="14"
                                                        stroke="rgba(0,0,0,0.6)"
                                                        strokeWidth="2"
                                                        fill="none"
                                                    />
                                                    {/* Progress Circle */}
                                                    <circle
                                                        cx="16"
                                                        cy="16"
                                                        r="14"
                                                        stroke="url(#winrateGradient)"
                                                        strokeWidth="2"
                                                        fill="none"
                                                        strokeDasharray="87.96"
                                                        strokeDashoffset={87.96 * (1 - winRate / 100)}
                                                        strokeLinecap="round"
                                                    />
                                                    <defs>
                                                        <linearGradient id="winrateGradient" x1="0" y1="0" x2="1" y2="0">
                                                            <stop offset="0%" stopColor="#C89B3C" />
                                                            <stop offset="100%" stopColor="#C8AA6E" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>

                                                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-[#C89B3C]">
                                                    {Math.round(winRate)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default MostPlayedChampions; 