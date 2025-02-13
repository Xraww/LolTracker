'use client';

import { useState, useEffect } from 'react';
import { SiRiotgames } from 'react-icons/si';
import { BiSearch } from 'react-icons/bi';
import { useLanguage } from "@/context/LanguageContext";
import { CompleteSummonerInfo } from '@/types/riot-api';
import { getCurrentLoLVersion, getProfileIconUrl } from '@/lib/api-utils';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SearchPlayer() {
    const router = useRouter();
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('EUW1');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [summonerData, setSummonerData] = useState<CompleteSummonerInfo | null>(null);
    const [currentVersion, setCurrentVersion] = useState<string>('13.24.1');

    // Available regions for the dropdown
    const regions = [
        { value: 'EUW1', label: 'EUW' },
        { value: 'NA1', label: 'NA' },
        { value: 'KR', label: 'KR' },
        { value: 'BR1', label: 'BR' },
        { value: 'EUN1', label: 'EUNE' },
        { value: 'JP1', label: 'JP' },
        { value: 'LA1', label: 'LAN' },
        { value: 'LA2', label: 'LAS' },
        { value: 'OC1', label: 'OCE' },
        { value: 'TR1', label: 'TR' },
        { value: 'RU', label: 'RU' }
    ];

    useEffect(() => {
        // Fetch current LoL version when component mounts
        getCurrentLoLVersion().then(version => {
            setCurrentVersion(version);
        });
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSummonerData(null);

        // Validate search query
        if (!searchQuery.trim()) {
            setError(t.lol.searchPlayerPage.errors.emptySearch);
            return;
        }

        // Parse Riot ID (format: gameName#tagLine)
        const [gameName, tagLine] = searchQuery.split('#');
        if (!tagLine) {
            setError(t.lol.searchPlayerPage.errors.invalidFormat);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/lol/summoner?name=${encodeURIComponent(gameName)}&tag=${encodeURIComponent(tagLine)}&region=${selectedRegion}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || t.lol.searchPlayerPage.errors.generic);
            }

            setSummonerData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.lol.searchPlayerPage.errors.generic);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToProfile = () => {
        if (summonerData) {
            router.push(`/lol/search-player/${encodeURIComponent(summonerData.account.gameName)}-${encodeURIComponent(summonerData.account.tagLine)}?region=${selectedRegion}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-[135deg] from-[#0A1428] to-[#091428] text-white relative flex items-center justify-center overflow-hidden px-4 py-8 md:p-0">
            {/* League of Legends themed background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Runic circle - inspired by LoL's magical elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px]">
                    {/* Outer circle */}
                    {/* <div className="absolute inset-0 border-2 border-[#C89B3C]/20 rounded-full animate-slow-spin" /> */}
                    {/* Inner circle */}
                    <div className="absolute inset-[60px] sm:inset-[90px] md:inset-[120px] border border-[#785A28]/10 rounded-full animate-slow-spin" />
                </div>

                {/* Magical energy streams - Hidden on mobile, visible on larger screens */}
                <div className="absolute inset-0 hidden sm:block">
                    <div className="absolute top-0 left-[20%] w-[2px] h-[30%] bg-gradient-to-b from-transparent via-[#C89B3C]/20 to-transparent" />
                    <div className="absolute top-[40%] right-[15%] w-[2px] h-[40%] bg-gradient-to-b from-transparent via-[#C8AA6E]/20 to-transparent" />
                </div>

                {/* Runeterra map elements - Hidden on mobile, visible on larger screens */}
                <div className="absolute inset-0 hidden sm:block">
                    <div className="absolute top-[10%] left-[10%] w-[100px] sm:w-[150px] md:w-[200px] h-[100px] sm:h-[150px] md:h-[200px] bg-[radial-gradient(circle_at_center,#C89B3C10,transparent_70%)] animate-pulse" />
                    <div className="absolute bottom-[15%] right-[12%] w-[90px] sm:w-[135px] md:w-[180px] h-[90px] sm:h-[135px] md:h-[180px] bg-[radial-gradient(circle_at_center,#785A2810,transparent_70%)] animate-pulse [animation-delay:1s]" />
                </div>

                {/* Ancient runes floating - Hidden on mobile, visible on larger screens */}
                <div className="absolute top-[20%] right-[25%] w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 opacity-20 animate-float hidden sm:block">
                    <div className="w-full h-full border-2 border-[#C89B3C] rotate-45" />
                </div>

                <div className="absolute bottom-[30%] left-[20%] w-6 sm:w-9 md:w-12 h-6 sm:h-9 md:h-12 opacity-20 animate-float-delayed hidden sm:block">
                    <div className="w-full h-full border-2 border-[#C8AA6E] rotate-12" />
                </div>
            </div>

            {/* Main Container */}
            <div className="w-full max-w-[800px] mx-auto text-center relative z-10 p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="mb-8 sm:mb-12 md:mb-16 relative py-4 sm:py-6 md:py-8">
                    <h1 className="text-2xl sm:text-3xl md:text-[3.5rem] mb-4 sm:mb-6 text-[#C89B3C] font-extrabold tracking-[-1px] uppercase relative">
                        {t.lol.searchPlayerPage.title}
                        <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-r-2 border-[#C89B3C]/30" />
                        <div className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-l-2 border-[#C89B3C]/30" />
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-[600px] mx-auto leading-relaxed px-4">
                        {t.lol.searchPlayerPage.description}
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-6 sm:mb-8 md:mb-10">
                    <div className="flex flex-col sm:flex-row max-w-[600px] mx-auto gap-2 sm:gap-2">
                        {/* Search Input with Region Selector */}
                        <div className="flex flex-1 bg-gradient-to-br from-black to-lol-dark text-white border border-[#C89B3C]/30 rounded-full p-1 sm:p-2 shadow-lg shadow-black/20 items-center transition-all duration-300 hover:border-[#C89B3C]/60 hover:shadow-[#C89B3C]/10 hover:-translate-y-0.5">
                            {/* Region Selector */}
                            <div className="relative min-w-[90px] ml-2">
                                <select
                                    value={selectedRegion}
                                    onChange={(e) => setSelectedRegion(e.target.value)}
                                    className="appearance-none w-full bg-transparent text-[#C89B3C] pr-6 focus:outline-none font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center"
                                    disabled={isLoading}
                                >
                                    {regions.map((region) => (
                                        <option 
                                            key={region.value} 
                                            value={region.value}
                                            className="bg-black text-[#C89B3C] font-semibold"
                                        >
                                            {region.label}
                                        </option>
                                    ))}
                                </select>

                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-[#C89B3C]">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                                    </svg>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-6 bg-[#C89B3C]/30 mx-3" />

                            <SiRiotgames className="text-[#C89B3C] text-xl sm:text-2xl opacity-80" />
                            
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.lol.searchPlayerPage.placeholder}
                                className="flex-1 px-3 sm:px-6 py-3 sm:py-4 bg-transparent text-[#F0E6D2] text-base sm:text-lg font-medium placeholder:text-[#C8AA6E]/40 focus:outline-none"
                                disabled={isLoading}
                            />

                            <button 
                                type="submit"
                                className={`bg-[#C89B3C] px-4 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:bg-[#C8AA6E] hover:-translate-y-0.5 mr-0.5 sm:mr-1 text-[#1E2328] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#C89B3C] disabled:hover:translate-y-0`}
                                disabled={isLoading}
                            >
                                <BiSearch className="text-xl sm:text-2xl" />
                            </button>
                        </div>
                    </div>
                </form>

                {/* Error Message */}
                {error && (
                    <div className="text-[#FF4655] bg-[#FF4655]/10 border border-[#FF4655]/20 rounded-lg p-4 mb-6 max-w-[600px] mx-auto">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center space-x-2 text-[#C89B3C]">
                        <div className="w-4 h-4 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-4 h-4 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-4 h-4 rounded-full animate-bounce" />
                    </div>
                )}

                {/* Summoner Data */}
                {summonerData && (
                    <div 
                        onClick={navigateToProfile}
                        className="group bg-gradient-to-br from-black to-lol-dark text-white border border-[#C89B3C]/30 rounded-lg p-6 max-w-[600px] mx-auto transition-all duration-300 hover:bg-[#1E2328]/95 hover:border-[#C89B3C] hover:shadow-lg hover:shadow-[#C89B3C]/10 hover:-translate-y-0.5 cursor-pointer relative"
                    >

                        <div className="flex items-center space-x-4 mb-4">
                            <Image 
                                src={getProfileIconUrl(summonerData.summoner.profileIconId, currentVersion)}
                                alt="Profile Icon"
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-full border-2 border-[#C89B3C] group-hover:border-[#C8AA6E] transition-colors duration-300"
                            />

                            <div className="text-left">
                                <h2 className="text-xl font-bold text-[#C89B3C] group-hover:text-[#C8AA6E] transition-colors duration-300">
                                    {summonerData.account.gameName}
                                    <span className="text-sm text-[#C8AA6E] ml-2 opacity-80">#{summonerData.account.tagLine}</span>
                                </h2>

                                <p className="text-[#C8AA6E]/60 group-hover:text-[#C8AA6E]/80 transition-colors duration-300">
                                    Level {summonerData.summoner.summonerLevel}
                                </p>
                            </div>
                        </div>

                        {summonerData.ranked && summonerData.ranked.length > 0 && (
                            <div className="border-t border-[#C89B3C]/20 pt-4 mt-4">
                                <h3 className="text-lg font-semibold text-[#C8AA6E] mb-2">Ranked Solo/Duo</h3>
                                
                                {summonerData.ranked.map((rank, index) => (
                                    rank.queueType === 'RANKED_SOLO_5x5' && (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Image 
                                                    src={`/images/game/lol/rank/${rank.tier.toLowerCase()}.png`}
                                                    alt={`${rank.tier} Rank`}
                                                    width={32}
                                                    height={32}
                                                    className="w-8 h-8 object-contain"
                                                />

                                                <div>
                                                    <span className="text-[#C89B3C] font-bold group-hover:text-[#C8AA6E] transition-colors duration-300">
                                                        {rank.tier === 'CHALLENGER' || rank.tier === 'GRANDMASTER' || rank.tier === 'MASTER' 
                                                            ? rank.tier 
                                                            : `${rank.tier} ${rank.rank}`
                                                        }
                                                    </span>

                                                    <span className="text-[#C8AA6E]/60 ml-2 group-hover:text-[#C8AA6E]/80 transition-colors duration-300">
                                                        - {rank.leaguePoints} LP
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="text-[#C8AA6E]/60 group-hover:text-[#C8AA6E]/80 transition-colors duration-300">
                                                {rank.wins}W - {rank.losses}L
                                                <span className="ml-2">
                                                    ({Math.round((rank.wins / (rank.wins + rank.losses)) * 100)}%)
                                                </span>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}