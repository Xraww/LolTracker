'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { CompleteSummonerInfo, MatchData, LeagueEntryDTO } from '@/types/riot-api';
import MatchCard from './MatchCard';
import TeamDetails from './TeamDetails';
import MatchStats from './MatchStats';

interface MatchHistoryProps {
    summonerData: CompleteSummonerInfo;
    currentVersion: string;
}

const MatchHistory = ({ summonerData, currentVersion }: MatchHistoryProps) => {
    const { t } = useLanguage();
    const [isLoadingMatches, setIsLoadingMatches] = useState(false);
    const [matchError, setMatchError] = useState<string | null>(null);
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [expandedMatches, setExpandedMatches] = useState<Set<string>>(new Set());
    const [playerRanks, setPlayerRanks] = useState<{ [key: string]: { data: LeagueEntryDTO[], timestamp: number } }>({});
    const [itemNames, setItemNames] = useState<{ [key: string]: string }>({});
    const MATCHES_PER_PAGE = 15;
    const RANK_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

    // Fetch matches when page changes
    const fetchMatches = async () => {
        if (!summonerData?.summoner.puuid) return;
        
        setIsLoadingMatches(true);
        setMatchError(null);
        
        try {
            const start = (currentPage - 1) * MATCHES_PER_PAGE;
            const response = await fetch(`/api/lol/matches?puuid=${summonerData.summoner.puuid}&count=${MATCHES_PER_PAGE}&start=${start}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch matches');
            }
            
            setMatches(data);
            setHasMore(data.length === MATCHES_PER_PAGE);
        } catch (err) {
            setMatchError(err instanceof Error ? err.message : 'Failed to load match history');
            console.error('Error fetching matches:', err);
        } finally {
            setIsLoadingMatches(false);
        }
    };

    // Fetch item data
    const fetchItemData = async () => {
        try {
            const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/item.json`);
            const data = await response.json();
            setItemNames(Object.entries(data.data).reduce((acc: { [key: string]: string }, [id, item]: [string, any]) => {
                acc[id] = item.name;
                return acc;
            }, {}));
        } catch (error) {
            console.error('Error fetching item data:', error);
        }
    };

    // Fetch player ranks
    const fetchPlayerRanks = async (players: { riotIdGameName: string, riotIdTagline: string }[]) => {
        const now = Date.now();
        const uniquePlayers = players.filter((player, index, self) =>
            index === self.findIndex((p) => p.riotIdGameName === player.riotIdGameName && p.riotIdTagline === player.riotIdTagline)
        );

        // Filter out players whose ranks are already cached and not expired
        const playersToFetch = uniquePlayers.filter(player => {
            const key = `${player.riotIdGameName}-${player.riotIdTagline}`;
            const cachedData = playerRanks[key];
            return !cachedData || (now - cachedData.timestamp) > RANK_CACHE_DURATION;
        });

        if (playersToFetch.length === 0) return;

        // Batch requests in groups of 5 to avoid rate limits
        const batchSize = 5;
        for (let i = 0; i < playersToFetch.length; i += batchSize) {
            const batch = playersToFetch.slice(i, i + batchSize);
            const promises = batch.map(async (player) => {
                try {
                    const response = await fetch(`/api/lol/summoner?name=${encodeURIComponent(player.riotIdGameName)}&tag=${encodeURIComponent(player.riotIdTagline)}`);
                    const data = await response.json();
                    if (response.ok && data.ranked) {
                        return { 
                            key: `${player.riotIdGameName}-${player.riotIdTagline}`,
                            ranked: data.ranked 
                        };
                    }
                    return null;
                } catch (error) {
                    console.error('Error fetching player rank:', error);
                    return null;
                }
            });

            const results = await Promise.all(promises);
            const newRanks = results.reduce((acc, result) => {
                if (result) {
                    acc[result.key] = {
                        data: result.ranked,
                        timestamp: now
                    };
                }
                return acc;
            }, {} as { [key: string]: { data: LeagueEntryDTO[], timestamp: number } });

            setPlayerRanks(prev => ({ ...prev, ...newRanks }));

            // Add a small delay between batches to respect rate limits
            if (i + batchSize < playersToFetch.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    };

    // Toggle match expansion
    const toggleMatchExpansion = (matchId: string) => {
        setExpandedMatches(prev => {
            const newSet = new Set(prev);
            if (newSet.has(matchId)) {
                newSet.delete(matchId);
            } else {
                newSet.add(matchId);
                // Fetch ranks when expanding
                const match = matches.find(m => m.metadata.matchId === matchId);
                if (match) {
                    fetchPlayerRanks(match.info.participants);
                }
            }
            return newSet;
        });
    };

    // Effect hooks for data fetching
    useEffect(() => {
        if (summonerData) {
            fetchMatches();
        }
    }, [summonerData, currentPage]);

    useEffect(() => {
        fetchItemData();
    }, [currentVersion]);

    return (
        <div className="bg-gradient-to-br from-[#111111] to-black rounded-lg border border-[#C89B3C]/30 overflow-hidden">
            <div className="border-b border-[#C89B3C]/30 p-4">
                <h2 className="text-xl font-bold text-[#C89B3C]">{t.lol.profile.matchHistory}</h2>
            </div>
            <div className="p-4">
                <div className="space-y-4">
                    {isLoadingMatches ? (
                        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center border border-[#C89B3C]/20">
                            <div className="flex items-center space-x-2 text-[#C89B3C]">
                                <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-2 h-2 rounded-full animate-bounce" />
                            </div>
                        </div>
                    ) : matchError ? (
                        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 text-center border border-[#FF4655]/20 text-[#FF4655]">
                            {matchError}
                        </div>
                    ) : matches.length === 0 ? (
                        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 text-center border border-[#C89B3C]/20 text-gray-400">
                            {t.lol.profile.noMatches}
                        </div>
                    ) : (
                        matches.map((match) => {
                            const participant = match.info.participants.find(p => p.puuid === summonerData.summoner.puuid);
                            if (!participant) return null;

                            return (
                                <div key={match.metadata.matchId} className="flex flex-col">
                                    <MatchCard
                                        match={match}
                                        currentVersion={currentVersion}
                                        participantPuuid={summonerData.summoner.puuid}
                                        isExpanded={expandedMatches.has(match.metadata.matchId)}
                                        onToggleExpand={() => toggleMatchExpansion(match.metadata.matchId)}
                                        onFetchRanks={fetchPlayerRanks}
                                        playerRanks={playerRanks}
                                        itemNames={itemNames}
                                    />

                                    {expandedMatches.has(match.metadata.matchId) && (
                                        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-[#C89B3C]/20">
                                            {/* Ally Team */}
                                            <TeamDetails
                                                match={match}
                                                teamId={participant.teamId}
                                                currentVersion={currentVersion}
                                                participantPuuid={summonerData.summoner.puuid}
                                                playerRanks={playerRanks}
                                                itemNames={itemNames}
                                            />

                                            {/* Game Stats */}
                                            <MatchStats
                                                match={match}
                                                participantTeamId={participant.teamId}
                                            />

                                            {/* Enemy Team */}
                                            <TeamDetails
                                                match={match}
                                                teamId={participant.teamId === 100 ? 200 : 100}
                                                currentVersion={currentVersion}
                                                participantPuuid={summonerData.summoner.puuid}
                                                playerRanks={playerRanks}
                                                itemNames={itemNames}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="mt-6 flex items-center justify-center space-x-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1 || isLoadingMatches}
                        className={`px-4 py-2 rounded-lg border ${
                            currentPage === 1 || isLoadingMatches
                                ? 'border-[#C89B3C]/20 text-[#C89B3C]/40 cursor-not-allowed'
                                : 'border-[#C89B3C]/30 text-[#C89B3C] hover:bg-black/60 transition-colors'
                        }`}
                    >
                        {t.lol.profile.previous}
                    </button>
                    <span className="text-[#C89B3C]">{t.lol.profile.page} {currentPage}</span>
                    <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={!hasMore || isLoadingMatches}
                        className={`px-4 py-2 rounded-lg border ${
                            !hasMore || isLoadingMatches
                                ? 'border-[#C89B3C]/20 text-[#C89B3C]/40 cursor-not-allowed'
                                : 'border-[#C89B3C]/30 text-[#C89B3C] hover:bg-black/60 transition-colors'
                        }`}
                    >
                        {t.lol.profile.next}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchHistory; 