'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { CompleteSummonerInfo } from '@/types/riot-api';

interface ChampionMasteriesProps {
    summonerData: CompleteSummonerInfo;
    currentVersion: string;
    region: string;
}

interface ChampionMastery {
    championId: number;
    championLevel: number;
    championPoints: number;
    championPointsUntilNextLevel: number;
    championPointsSinceLastLevel: number;
    lastPlayTime: number;
    tokensEarned: number;
    chestGranted: boolean;
}

const ChampionMasteries = ({ summonerData, currentVersion, region }: ChampionMasteriesProps) => {
    const { t } = useLanguage();
    const [masteries, setMasteries] = useState<ChampionMastery[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [championData, setChampionData] = useState<{ [key: string]: { key: string, id: string, name: string } }>({});

    // Fetch champion data
    useEffect(() => {
        const fetchChampionData = async () => {
            try {
                const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/champion.json`);
                const data = await response.json();
                setChampionData(data.data);
            } catch (error) {
                console.error('Error fetching champion data:', error);
            }
        };

        fetchChampionData();
    }, [currentVersion]);

    // Fetch masteries
    useEffect(() => {
        const fetchMasteries = async () => {
            if (!summonerData?.summoner.puuid) return;

            try {
                const response = await fetch(`/api/lol/masteries?puuid=${summonerData.summoner.puuid}&region=${region}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch masteries');
                }

                setMasteries(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load champion masteries');
                console.error('Error fetching masteries:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMasteries();
    }, [summonerData, region]);

    const getChampionNameById = (championId: number): { name: string, id: string } => {
        const champion = Object.values(championData).find(c => c.key === championId.toString());
        return champion ? { name: champion.name, id: champion.id } : { name: 'Unknown Champion', id: 'Unknown' };
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    if (isLoading) {
        return (
            <div className="bg-gradient-to-br from-[#111111] to-black rounded-lg border border-[#C89B3C]/30 overflow-hidden">
                <div className="border-b border-[#C89B3C]/30 p-4">
                    <h2 className="text-xl font-bold text-[#C89B3C]">{t.lol.profile.championMasteries.title}</h2>
                </div>
                
                <div className="p-4">
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <div key={index} className="bg-black/40 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-4 border border-[#C89B3C]/20 animate-pulse">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-black/60 rounded-lg"></div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black/60 rounded-full border border-[#C89B3C]"></div>
                                </div>

                                <div className="flex-1">
                                    <div className="h-4 bg-black/60 rounded w-24 mb-2"></div>
                                    <div className="w-full h-1.5 bg-black/60 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient-to-br from-[#111111] to-black rounded-lg border border-[#C89B3C]/30 overflow-hidden">
                <div className="border-b border-[#C89B3C]/30 p-4">
                    <h2 className="text-xl font-bold text-[#C89B3C]">{t.lol.profile.championMasteries.title}</h2>
                </div>

                <div className="p-4">
                    <div className="text-[#FF4655] text-center">{error}</div>
                </div>
            </div>
        );
    }

    const sortedMasteries = [...masteries].sort((a, b) => b.championPoints - a.championPoints).slice(0, 5);

    return (
        <div className="bg-gradient-to-br from-[#111111] to-black rounded-lg border border-[#C89B3C]/30 overflow-hidden">
            <div className="border-b border-[#C89B3C]/30 p-4">
                <h2 className="text-xl font-bold text-[#C89B3C]">{t.lol.profile.championMasteries.title}</h2>
            </div>

            <div className="p-4">
                <div className="space-y-4">
                    {sortedMasteries.map((mastery, index) => {
                        const champion = getChampionNameById(mastery.championId);

                        return (
                            <div key={mastery.championId} className="bg-black/40 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-4 border border-[#C89B3C]/20 hover:bg-black/60 transition-colors">
                                {/* Champion Icon */}
                                <div className="relative">
                                    <img
                                        src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${champion.id}.png`}
                                        alt={champion.name}
                                        className="w-12 h-12 rounded-lg border border-[#C89B3C]/30"
                                    />
                                </div>
                                
                                {/* Champion Info */}
                                <div className="flex-1">
                                    {/* First Row: Champion Name and Points */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-[#C89B3C]">{champion.name}</div>
                                        
                                        <div className="text-sm text-gray-400">
                                            {formatNumber(mastery.championPoints)} {t.lol.profile.championMasteries.points}
                                        </div>
                                    </div>
                                    
                                    {/* Second Row: Mastery Level and Last Played */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1">
                                            <img 
                                                src={`/images/game/lol/masteries/mastery-${mastery.championLevel > 10 ? 10 : mastery.championLevel}.png`}
                                                alt={`Mastery ${mastery.championLevel}`}
                                                className="w-5 h-5"
                                            />

                                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                                                mastery.championLevel >= 6 ? 'bg-[#C89B3C] text-black' : 'bg-black/60 text-[#C89B3C]'
                                            }`}>
                                                {t.lol.profile.championMasteries.name} {mastery.championLevel}
                                            </span>
                                        </div>

                                        <div className="text-xs text-gray-600">
                                            {new Date(mastery.lastPlayTime).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChampionMasteries; 