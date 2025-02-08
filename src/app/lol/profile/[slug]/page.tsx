'use client';

import { useState, useEffect, use } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { CompleteSummonerInfo } from '@/types/riot-api';
import { getCurrentLoLVersion, getProfileIconUrl } from '@/lib/api-utils';

interface ProfilePageProps {
    params: Promise<{
        slug: string;
    }>;
}


const SummonerProfile = ({ params }: ProfilePageProps) => {
    const resolvedParams = use(params);
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [summonerData, setSummonerData] = useState<CompleteSummonerInfo | null>(null);
    const [currentVersion, setCurrentVersion] = useState<string>('13.24.1');

    useEffect(() => {
        const fetchSummonerData = async () => {
            try {
                // Parse the summoner parameter (format: gameName-tagLine)
                const [gameName, tagLine] = decodeURIComponent(resolvedParams.slug).split('-');
                if (!gameName || !tagLine) {
                    throw new Error('Invalid summoner name format');
                }

                // Fetch current LoL version
                const version = await getCurrentLoLVersion();
                setCurrentVersion(version);

                // Fetch summoner data
                const response = await fetch(`/api/lol/summoner?name=${encodeURIComponent(gameName)}&tag=${encodeURIComponent(tagLine)}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch summoner data');
                }

                setSummonerData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSummonerData();
    }, [resolvedParams.slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-[135deg] from-[#0A1428] to-[#091428] text-white flex items-center justify-center mt-16">
                <div className="flex items-center justify-center space-x-2 text-[#C89B3C]">
                    <div className="w-4 h-4 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-4 h-4 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-4 h-4 rounded-full animate-bounce" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-[135deg] from-[#0A1428] to-[#091428] text-white flex items-center justify-center p-4 mt-16">
                <div className="text-[#FF4655] bg-[#FF4655]/10 border border-[#FF4655]/20 rounded-lg p-6 max-w-[600px] text-center">
                    <h2 className="text-xl font-bold mb-2">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!summonerData) {
        return (
            <div className="min-h-screen bg-gradient-to-[135deg] from-[#0A1428] to-[#091428] text-white flex items-center justify-center p-4 mt-16">
                <div className="text-[#C8AA6E] text-center">
                    <h2 className="text-xl font-bold mb-2">Summoner Not Found</h2>
                    <p>The requested summoner profile could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-[135deg] from-[#0A1428] to-[#091428] text-white mt-16">
            {/* Profile Header */}
            <div className="bg-gradient-to-br from-black to-lol-dark border-b border-[#C89B3C]/30">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <img 
                                src={getProfileIconUrl(summonerData.summoner.profileIconId, currentVersion)}
                                alt="Profile Icon"
                                className="w-24 h-24 rounded-full border-2 border-[#C89B3C]"
                            />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1E2328] px-3 py-1 rounded-full border border-[#C89B3C]/50 text-sm">
                                {summonerData.summoner.summonerLevel}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#C89B3C]">
                                {summonerData.account.gameName}
                                <span className="text-base text-[#C89B3C] ml-2 opacity-80">
                                    #{summonerData.account.tagLine}
                                </span>
                            </h1>
                            {summonerData.ranked && summonerData.ranked.length > 0 && (
                                <div className="flex items-center mt-2 space-x-2">
                                    {summonerData.ranked.map((rank, index) => (
                                        rank.queueType === 'RANKED_SOLO_5x5' && (
                                            <div key={index} className="flex items-center space-x-2">
                                                <img 
                                                    src={`/images/game/lol/rank/${rank.tier.toLowerCase()}.png`}
                                                    alt={`${rank.tier} Rank`}
                                                    className="w-6 h-6"
                                                />
                                                <span className="text-white">
                                                    {rank.tier === 'CHALLENGER' || rank.tier === 'GRANDMASTER' || rank.tier === 'MASTER' 
                                                        ? rank.tier 
                                                        : `${rank.tier} ${rank.rank}`
                                                    }
                                                </span>
                                                <span className="text-white">
                                                    {rank.leaguePoints} LP
                                                </span>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Add more sections here as needed */}
                {/* For example: Match History, Champion Stats, etc. */}
            </div>
        </div>
    );
};

export default SummonerProfile; 