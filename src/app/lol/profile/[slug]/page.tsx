'use client';

import { useState, useEffect, use } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { CompleteSummonerInfo } from '@/types/riot-api';
import { getCurrentLoLVersion } from '@/lib/api-utils';
import ProfileHeader from './ProfileHeader';
import MatchHistory from './MatchHistory';
import MostPlayedChampions from './MostPlayedChampions';
import ChampionMasteries from './ChampionMasteries';

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
    const [region, setRegion] = useState<string>('');

    useEffect(() => {
        const fetchSummonerData = async () => {
            try {
                // Parse the summoner parameter (format: gameName-tagLine)
                const [gameName, tagLine] = decodeURIComponent(resolvedParams.slug).split('-');
                if (!gameName || !tagLine) {
                    throw new Error('Invalid summoner name format');
                }

                // Get region from URL search params
                const urlParams = new URLSearchParams(window.location.search);
                const regionParam = urlParams.get('region');
                
                if (!regionParam) {
                    throw new Error('Region is required');
                }

                setRegion(regionParam);

                // Fetch current LoL version
                const version = await getCurrentLoLVersion();
                setCurrentVersion(version);

                // Fetch summoner data with region
                const response = await fetch(`/api/lol/summoner?name=${encodeURIComponent(gameName)}&tag=${encodeURIComponent(tagLine)}&region=${regionParam}`);
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
            <div className="min-h-screen bg-gradient-to-[135deg] from-[#0A1428] to-[#091428] text-white flex items-center justify-center mt-16">
                <div className="text-center">
                    <div className="text-[#C89B3C] text-xl mb-4">{error}</div>
                </div>
            </div>
        );
    }

    if (!summonerData) {
        return (
            <div className="min-h-screen bg-gradient-to-[135deg] from-[#0A1428] to-[#091428] text-white flex items-center justify-center mt-16">
                <div className="text-center">
                    <div className="text-[#C89B3C] text-xl mb-4">{t.lol.searchPlayerPage.errors.notFound}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-[135deg] from-[#0A1428] to-[#091428] text-white pt-16">
            {/* Profile Header */}
            <ProfileHeader summonerData={summonerData} currentVersion={currentVersion} />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Match History */}
                    <div className="lg:col-span-2">
                        <MatchHistory summonerData={summonerData} currentVersion={currentVersion}region={region}/>
                    </div>

                    {/* Right Side Containers */}
                    <div className="space-y-6">
                        <MostPlayedChampions summonerData={summonerData} region={region}/>
                        <ChampionMasteries summonerData={summonerData} currentVersion={currentVersion}region={region}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummonerProfile; 