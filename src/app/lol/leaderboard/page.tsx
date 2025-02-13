'use client';

import { useState, useEffect } from 'react';
import { REGIONS } from '@/lib/api-config';
import { calculateWinRate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { getProfileIconUrl } from '@/lib/api-utils';
import { getCurrentLoLVersion } from '@/lib/api-utils';

interface LeagueEntry {
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    rank: string;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
    profileIconId?: number;
    gameName?: string;
    tagLine?: string;
}

interface LeaderboardData {
    tier: string;
    leagueId: string;
    queue: string;
    name: string;
    entries: LeagueEntry[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalEntries: number;
    };
}

export default function Leaderboard() {
    const [region, setRegion] = useState('EUW1');
    const [page, setPage] = useState(1);
    const [allEntries, setAllEntries] = useState<LeagueEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPatch, setCurrentPatch] = useState('15.3.1');
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const fetchCurrentPatch = async () => {
            const currentPatch = await getCurrentLoLVersion();
            setCurrentPatch(currentPatch);
        };
        fetchCurrentPatch();
    }, []);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/lol/leaderboard?region=${region}&page=${page}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch leaderboard data');
                }
                const data = await response.json();
                
                if (data.entries) {
                    setAllEntries(data.entries);
                    setTotalPages(data.pagination.totalPages);
                } else {
                    setError('No leaderboard data available');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setAllEntries([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [region, page]); // Re-fetch when region or page changes

    const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(event.target.value);
        setPage(1); // Reset to first page when changing region
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto p-4 pt-20 min-h-screen bg-gradient-to-br from-black to-lol-dark">
            {/* Region Selector */}
            <div className="mb-6 flex justify-center">
                <select
                    value={region}
                    onChange={handleRegionChange}
                    className="w-32 bg-gradient-to-br from-black to-lol-dark border border-[#30363D] text-gray-200 text-sm rounded focus:ring-lol-gold focus:border-lol-gold p-2"
                >
                    {REGIONS.lol.map((r) => (
                        <option 
                            className="bg-black" 
                            key={r} 
                            value={r.toUpperCase()}
                        >
                            {r.replace(/[0-9]/g, '').toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            {/* Leaderboard Content */}
            {!loading && allEntries.length > 0 && (
                <>
                    <div className="overflow-x-auto">
                        {/* Header */}
                        <div className="flex text-xs uppercase border-y border-[#30363D] text-gray-300">
                            <div className="w-20 px-6 py-3">Rank</div>
                            <div className="flex-1 px-6 py-3">Summoner</div>
                            <div className="w-32 px-6 py-3">LP</div>
                            <div className="w-32 px-6 py-3">Win Rate</div>
                            <div className="w-24 px-6 py-3">Wins</div>
                            <div className="w-24 px-6 py-3">Losses</div>
                        </div>

                        {/* Rows */}
                        <div className="text-sm text-gray-300">
                            {allEntries.map((entry, index) => {
                                const rank = ((page - 1) * pageSize) + index + 1;
                                return (
                                    <div 
                                        key={entry.summonerId} 
                                        className="flex items-center border-b border-[#30363D] hover:bg-[#1C2128] transition-colors py-6"
                                    >
                                        <div className="w-20 px-6 text-gray-400 text-lg font-medium">
                                            #{rank}
                                        </div>

                                        <div className="flex-1 px-6 flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-lol-dark border border-lol-gold/20">
                                                <Image
                                                    src={getProfileIconUrl(entry.profileIconId || 29, currentPatch)}
                                                    alt={`${entry.summonerName}'s profile icon`}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>

                                            <Link 
                                                href={entry.gameName && entry.tagLine 
                                                    ? `/lol/search-player/${encodeURIComponent(entry.gameName)}-${encodeURIComponent(entry.tagLine)}?region=${region}`
                                                    : `/lol/search-player/${encodeURIComponent(entry.summonerName)}?region=${region}`}
                                                className="text-lol-gold hover:text-lol-gold/80 text-lg"
                                            >
                                                {entry.gameName ? `${entry.gameName} #${entry.tagLine}` : entry.summonerName}
                                            </Link>
                                        </div>

                                        <div className="w-32 px-6 text-lg">
                                            {entry.leaguePoints} LP
                                        </div>

                                        <div className="w-32 px-6 text-lg">
                                            {calculateWinRate(entry.wins, entry.wins + entry.losses)}
                                        </div>

                                        <div className="w-24 px-6 text-lg">
                                            {entry.wins}
                                        </div>

                                        <div className="w-24 px-6 text-lg">
                                            {entry.losses}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 gap-2">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gradient-to-br from-black to-lol-dark border border-[#30363D] rounded hover:bg-[#30363D] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <span className="px-4 py-2 text-sm font-medium text-gray-300 bg-gradient-to-br from-black to-lol-dark border border-[#30363D] rounded">
                            Page {page} of {totalPages}
                        </span>
                        
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gradient-to-br from-black to-lol-dark border border-[#30363D] rounded hover:bg-[#30363D] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}