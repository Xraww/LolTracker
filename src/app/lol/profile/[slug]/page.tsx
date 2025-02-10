'use client';

import { useState, useEffect, use } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { CompleteSummonerInfo, MatchData, LeagueEntryDTO } from '@/types/riot-api';
import { getCurrentLoLVersion, getProfileIconUrl } from '@/lib/api-utils';
import Link from 'next/link';

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
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [isLoadingMatches, setIsLoadingMatches] = useState(false);
    const [matchError, setMatchError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const MATCHES_PER_PAGE = 15;
    const [expandedMatches, setExpandedMatches] = useState<Set<string>>(new Set());
    const [playerRanks, setPlayerRanks] = useState<{ [key: string]: { data: LeagueEntryDTO[], timestamp: number } }>({});
    const RANK_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
    const [itemNames, setItemNames] = useState<{ [key: string]: string }>({});

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

    useEffect(() => {
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

        if (summonerData) {
            fetchMatches();
        }
    }, [summonerData, currentPage]);

    useEffect(() => {
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

        fetchItemData();
    }, [currentVersion]);

    const getParticipantFromMatch = (match: MatchData) => {
        return match.info.participants.find(
            p => p.puuid === summonerData?.summoner.puuid
        );
    };

    const getTimeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval}${unit.charAt(0)} ago`;
            }
        }
        
        return 'just now';
    };

    const getSummonerSpellById = (spellId: number): string => {
        const spellMap: { [key: number]: string } = {
            21: 'SummonerBarrier',
            1: 'SummonerBoost',
            14: 'SummonerDot',
            3: 'SummonerExhaust',
            4: 'SummonerFlash',
            6: 'SummonerHaste',
            7: 'SummonerHeal',
            13: 'SummonerMana',
            30: 'SummonerPoroRecall',
            31: 'SummonerPoroThrow',
            11: 'SummonerSmite',
            39: 'SummonerSnowURFSnowball_Mark',
            32: 'SummonerSnowball',
            12: 'SummonerTeleport',
            54: 'Summoner_UltBookPlaceholder',
            55: 'Summoner_UltBookSmitePlaceholder',
        };
        return spellMap[spellId] || 'SummonerFlash';
    };

    const getRuneById = (runeId: number): { path: string, key: string, imageName: string } => {
        const runeMap: { [key: number]: { path: string, key: string, imageName: string } } = {
            // Precision
            8005: { path: 'Precision', key: 'PressTheAttack', imageName: 'PressTheAttack' },
            8008: { path: 'Precision', key: 'LethalTempo', imageName: 'LethalTempoTemp' },
            8021: { path: 'Precision', key: 'FleetFootwork', imageName: 'FleetFootwork' },
            8010: { path: 'Precision', key: 'Conqueror', imageName: 'Conqueror' },
            // Domination
            8112: { path: 'Domination', key: 'Electrocute', imageName: 'Electrocute' },
            8124: { path: 'Domination', key: 'Predator', imageName: 'Predator' },
            8128: { path: 'Domination', key: 'DarkHarvest', imageName: 'DarkHarvest' },
            9923: { path: 'Domination', key: 'HailOfBlades', imageName: 'HailOfBlades' },
            // Sorcery
            8214: { path: 'Sorcery', key: 'SummonAery', imageName: 'SummonAery' },
            8229: { path: 'Sorcery', key: 'ArcaneComet', imageName: 'ArcaneComet' },
            8230: { path: 'Sorcery', key: 'PhaseRush', imageName: 'PhaseRush' },
            // Resolve
            8437: { path: 'Resolve', key: 'GraspOfTheUndying', imageName: 'GraspOfTheUndying' },
            8439: { path: 'Resolve', key: 'VeteranAftershock', imageName: 'VeteranAftershock' },
            8465: { path: 'Resolve', key: 'Guardian', imageName: 'Guardian' },
            // Inspiration
            8351: { path: 'Inspiration', key: 'GlacialAugment', imageName: 'GlacialAugment' },
            8360: { path: 'Inspiration', key: 'UnsealedSpellbook', imageName: 'UnsealedSpellbook' },
            8369: { path: 'Inspiration', key: 'FirstStrike', imageName: 'FirstStrike' },
        };
        return runeMap[runeId] || { path: 'Precision', key: 'PressTheAttack', imageName: 'PressTheAttack' };
    };

    const getRuneStyleById = (styleId: number): { id: string, name: string } => {
        const styleMap: { [key: number]: { id: string, name: string } } = {
            8000: { id: '7201', name: 'Precision' },
            8100: { id: '7200', name: 'Domination' },
            8200: { id: '7202', name: 'Sorcery' },
            8300: { id: '7203', name: 'Whimsy' },
            8400: { id: '7204', name: 'Resolve' },
        };
        return styleMap[styleId] || { id: '7201', name: 'Precision' };
    };

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

    const getRankDisplay = (player: { riotIdGameName: string, riotIdTagline: string }) => {
        const playerKey = `${player.riotIdGameName}-${player.riotIdTagline}`;
        const rankData = playerRanks[playerKey]?.data?.find(r => r.queueType === 'RANKED_SOLO_5x5');
        if (!rankData) return '';
        const highEloRanks = ['CHALLENGER', 'GRANDMASTER', 'MASTER'];
        return `${rankData.tier} ${highEloRanks.includes(rankData.tier) ? '' : rankData.rank} ${rankData.leaguePoints}LP`;
    };

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

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    const getItemName = (itemId: number): string => {
        return itemId > 0 ? (itemNames[itemId] || `Item ${itemId}`) : '';
    };

    const formatTimeAgo = (timestamp: number): string => {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d`;
        if (hours > 0) return `${hours}h`;
        if (minutes > 0) return `${minutes}m`;
        return '1m';
    };

    const getRankImage = (tier: string): string => {
        return `/images/game/lol/rank/${tier.toLowerCase()}.png`;
    };

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
            <div className="bg-gradient-to-br from-black to-lol-dark border-b border-[#C89B3C]/30">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center">
                        {/* Profile Icon and Level */}
                        <div className="relative mb-4">
                            <img 
                                src={getProfileIconUrl(summonerData.summoner.profileIconId, currentVersion)}
                                alt="Profile Icon"
                                className="w-32 h-32 rounded-full border-2 border-[#C89B3C]"
                            />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1E2328] px-4 py-1 rounded-full border border-[#C89B3C]/50 text-sm">
                                {summonerData.summoner.summonerLevel}
                            </div>
                        </div>

                        {/* Summoner Name and Tag */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-[#C89B3C]">
                                {summonerData.account.gameName}
                                <span className="text-xl text-[#C89B3C] ml-2 opacity-80">
                                    #{summonerData.account.tagLine}
                                </span>
                            </h1>
                        </div>

                        {/* Rank and Stats */}
                        {summonerData.ranked && summonerData.ranked.length > 0 && (
                            <div className="flex flex-col items-center space-y-4">
                                {summonerData.ranked.map((rank, index) => (
                                    rank.queueType === 'RANKED_SOLO_5x5' && (
                                        <div key={index} className="flex flex-col items-center space-y-3">
                                            {/* Rank Info */}
                                            <div className="flex items-center space-x-3 bg-[#1E2328]/50 px-6 py-2 rounded-full border border-[#C89B3C]/30">
                                                <img 
                                                    src={`/images/game/lol/rank/${rank.tier.toLowerCase()}.png`}
                                                    alt={`${rank.tier} Rank`}
                                                    className="w-8 h-8"
                                                />
                                                <span className="text-white text-lg">
                                                    {rank.tier === 'CHALLENGER' || rank.tier === 'GRANDMASTER' || rank.tier === 'MASTER' 
                                                        ? rank.tier 
                                                        : `${rank.tier} ${rank.rank}`
                                                    }
                                                </span>
                                                <span className="text-[#C89B3C] font-bold">
                                                    {rank.leaguePoints} LP
                                                </span>
                                            </div>

                                            {/* Win/Loss Stats */}
                                            <div className="w-64">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div>
                                                        <span className="text-[#00FF00] font-medium">{rank.wins}W</span>
                                                        <span className="text-gray-400 mx-1">/</span>
                                                        <span className="text-[#FF4655] font-medium">{rank.losses}L</span>
                                                    </div>
                                                    <div className="font-bold text-[#C89B3C]">
                                                        {Math.round((rank.wins / (rank.wins + rank.losses)) * 100)}%
                                                    </div>
                                                </div>
                                                <div className="w-full h-2 bg-[#1E2328] rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-[#C89B3C] to-[#C89B3C] rounded-full"
                                                        style={{
                                                            width: `${Math.round((rank.wins / (rank.wins + rank.losses)) * 100)}%`
                                                        }}
                                                    />
                                                </div>
                                                <div className="text-gray-400 text-sm mt-1 text-center">
                                                    Total Games: {rank.wins + rank.losses}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Match History */}
                    <div className="lg:col-span-2">
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
                                            const participant = getParticipantFromMatch(match);
                                            if (!participant) return null;

                                            const kda = ((participant.kills + participant.assists) / Math.max(1, participant.deaths)).toFixed(2);
                                            const cs = participant.totalMinionsKilled + participant.neutralMinionsKilled;
                                            const csPerMin = ((cs / match.info.gameDuration) * 60).toFixed(1);
                                            const primaryRune = participant.perks?.styles[0]?.selections[0]?.perk;
                                            const secondaryRuneStyle = participant.perks?.styles[1]?.style;
                                            
                                            return (
                                                <div key={match.metadata.matchId} className="flex flex-col">
                                                    <div className={`bg-black/40 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4 border border-[#C89B3C]/20 hover:bg-black/60 transition-colors ${
                                                        participant.win ? 'border-l-4 border-l-[#00FF00]' : 'border-l-4 border-l-[#FF4655]'
                                                    }`}>
                                                        {/* Champion Icon and Summoner Spells */}
                                                        <div className="relative flex">
                                                            <div className="relative">
                                                                <img
                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${participant.championName}.png`}
                                                                    alt={participant.championName}
                                                                    className="w-16 h-16 rounded-lg border border-[#C89B3C]/30"
                                                                />
                                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black/60 rounded-full border border-[#C89B3C] flex items-center justify-center text-xs font-bold">
                                                                    {participant.champLevel}
                                                                </div>
                                                            </div>
                                                            {/* Summoner Spells */}
                                                            <div className="flex flex-col justify-between ml-1 my-0.5">
                                                                <img
                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${getSummonerSpellById(participant.summoner1Id)}.png`}
                                                                    alt="Summoner Spell 1"
                                                                    className="w-7 h-7 rounded border border-[#C89B3C]/30"
                                                                />
                                                                <img
                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${getSummonerSpellById(participant.summoner2Id)}.png`}
                                                                    alt="Summoner Spell 2"
                                                                    className="w-7 h-7 rounded border border-[#C89B3C]/30"
                                                                />
                                                            </div>
                                                            {/* Runes */}
                                                            <div className="flex flex-col justify-between ml-1 my-0.5 relative">
                                                                {primaryRune && (
                                                                    <img
                                                                        src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${getRuneById(primaryRune).path}/${getRuneById(primaryRune).key}/${getRuneById(primaryRune).imageName}.png`}
                                                                        alt="Primary Rune"
                                                                        className="w-7 h-7 rounded-full border border-[#C89B3C]/30 bg-black/60"
                                                                    />
                                                                )}
                                                                {secondaryRuneStyle && (
                                                                    <img
                                                                        src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${getRuneStyleById(secondaryRuneStyle).id}_${getRuneStyleById(secondaryRuneStyle).name}.png`}
                                                                        alt="Secondary Rune Style"
                                                                        className="w-7 h-7 rounded-full border border-[#C89B3C]/30 bg-black/60"
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Match Info */}
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <div className={`font-medium ${participant.win ? 'text-[#00FF00]' : 'text-[#FF4655]'}`}>
                                                                    {participant.win ? t.lol.profile.victory : t.lol.profile.defeat}
                                                                </div>
                                                                <div className="text-sm text-gray-400">
                                                                    {match.info.gameEndTimestamp ? (
                                                                        <>
                                                                            {formatTimeAgo(match.info.gameEndTimestamp)} {t.lol.profile.ago}
                                                                        </>
                                                                    ) : (
                                                                        t.lol.profile.justNow
                                                                    )}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <div className="text-[#C89B3C] font-medium">{participant.championName}</div>
                                                                    <div className="text-sm text-gray-400">
                                                                        {Math.floor(match.info.gameDuration / 60)}m {match.info.gameDuration % 60}s
                                                                    </div>
                                                                </div>

                                                                {/* Team Compositions in the middle */}
                                                                <div className="flex items-center space-x-4 mx-6">
                                                                    {/* Ally Team */}
                                                                    <div className="flex items-center space-x-1">
                                                                        {match.info.participants
                                                                            .filter(p => p.teamId === participant.teamId)
                                                                            .map((p, idx) => (
                                                                                <div key={idx} className="relative">
                                                                                    <Link href={`/lol/profile/${encodeURIComponent(p.riotIdGameName)}-${encodeURIComponent(p.riotIdTagline)}`}>
                                                                                        <img
                                                                                            src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${p.championName}.png`}
                                                                                            alt={p.championName}
                                                                                            title={`${p.championName} - ${p.riotIdGameName}`}
                                                                                            className={`w-8 h-8 rounded-full border ${p.puuid === participant.puuid ? 'border-[#C89B3C]' : 'border-[#C89B3C]/30'} cursor-pointer hover:border-[#C89B3C] transition-colors`}
                                                                                        />
                                                                                    </Link>
                                                                                </div>
                                                                            ))}
                                                                    </div>

                                                                    {/* VS Text */}
                                                                    <div className="text-[#C89B3C] text-sm font-medium">VS</div>

                                                                    {/* Enemy Team */}
                                                                    <div className="flex items-center space-x-1">
                                                                        {match.info.participants
                                                                            .filter(p => p.teamId !== participant.teamId)
                                                                            .map((p, idx) => (
                                                                                <div key={idx}>
                                                                                    <Link href={`/lol/profile/${encodeURIComponent(p.riotIdGameName)}-${encodeURIComponent(p.riotIdTagline)}`}>
                                                                                        <img
                                                                                            src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${p.championName}.png`}
                                                                                            alt={p.championName}
                                                                                            title={`${p.championName} - ${p.riotIdGameName}`}
                                                                                            className="w-8 h-8 rounded-full border border-[#C89B3C]/30 cursor-pointer hover:border-[#C89B3C] transition-colors"
                                                                                        />
                                                                                    </Link>
                                                                                </div>
                                                                            ))}
                                                                    </div>
                                                                </div>

                                                                <div className="text-right">
                                                                    <div className="text-white">
                                                                        {participant.kills}/{participant.deaths}/{participant.assists}
                                                                        <span className="text-[#C89B3C] ml-2">({kda})</span>
                                                                    </div>
                                                                    <div className="text-sm text-gray-400">
                                                                        {cs} CS ({csPerMin}/min)
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Items */}
                                                            <div className="flex items-center mt-2">
                                                                {/* Main items */}
                                                                <div className="flex items-center space-x-1">
                                                                    {[
                                                                        participant.item0,
                                                                        participant.item1,
                                                                        participant.item2,
                                                                        participant.item3,
                                                                        participant.item4,
                                                                        participant.item5,
                                                                    ]
                                                                    .sort((a, b) => (b > 0 ? 1 : -1)) // Sort so that items > 0 come first
                                                                    .map((itemId, idx) => (
                                                                        <div 
                                                                            key={idx}
                                                                            className="w-6 h-6 bg-black/60 rounded border border-[#C89B3C]/30"
                                                                        >
                                                                            {itemId > 0 && (
                                                                                <img
                                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${itemId}.png`}
                                                                                    alt={getItemName(itemId)}
                                                                                    title={getItemName(itemId)}
                                                                                    className="w-full h-full rounded"
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {/* Trinket (with spacing) */}
                                                                <div className="ml-4">
                                                                    <div className="w-6 h-6 bg-black/60 rounded border border-[#C89B3C]/30">
                                                                        {participant.item6 > 0 && (
                                                                            <img
                                                                                src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${participant.item6}.png`}
                                                                                alt={getItemName(participant.item6)}
                                                                                title={getItemName(participant.item6)}
                                                                                className="w-full h-full rounded"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Expand Arrow */}
                                                                <div className="flex items-center ml-auto">
                                                                    <div 
                                                                        onClick={() => toggleMatchExpansion(match.metadata.matchId)}
                                                                        className="text-[#C89B3C] opacity-50 hover:opacity-100 transition-opacity cursor-pointer select-none"
                                                                    >
                                                                        <svg 
                                                                            xmlns="http://www.w3.org/2000/svg" 
                                                                            className={`h-5 w-5 transform transition-transform ${expandedMatches.has(match.metadata.matchId) ? 'rotate-180' : ''}`} 
                                                                            fill="none" 
                                                                            viewBox="0 0 24 24" 
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Expanded Match Details - Now in a separate div */}
                                                    {expandedMatches.has(match.metadata.matchId) && (
                                                        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-[#C89B3C]/20">
                                                            {/* Ally Team */}
                                                            <div className="space-y-2">
                                                                {match.info.participants
                                                                    .filter(p => p.teamId === participant.teamId)
                                                                    .map((p) => (
                                                                        <div key={p.puuid} className="flex items-center space-x-3 bg-black/30 rounded-lg p-2">
                                                                            <div className="relative">
                                                                                <img
                                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${p.championName}.png`}
                                                                                    alt={p.championName}
                                                                                    title={`${p.championName}`}
                                                                                    className="w-10 h-10 rounded-lg border border-[#C89B3C]/30"
                                                                                />
                                                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black/60 rounded-full border border-[#C89B3C] flex items-center justify-center text-xs font-bold">
                                                                                    {p.champLevel}
                                                                                </div>
                                                                            </div>
                                                                            {/* Player Info */}
                                                                            <div className="flex flex-col min-w-[150px]">
                                                                                <Link 
                                                                                    href={`/lol/profile/${encodeURIComponent(p.riotIdGameName)}-${encodeURIComponent(p.riotIdTagline)}`}
                                                                                    className="text-sm text-[#C89B3C] hover:underline"
                                                                                >
                                                                                    {p.riotIdGameName}
                                                                                </Link>
                                                                                <div className="flex items-center space-x-1">
                                                                                    <div className="text-xs text-gray-400">{getRankDisplay(p)}</div>
                                                                                </div>
                                                                            </div>
                                                                            {/* Summoner Spells */}
                                                                            <div className="flex space-x-1">
                                                                                <img
                                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${getSummonerSpellById(p.summoner1Id)}.png`}
                                                                                    alt="Spell 1"
                                                                                    className="w-5 h-5 rounded border border-[#C89B3C]/30"
                                                                                />
                                                                                <img
                                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${getSummonerSpellById(p.summoner2Id)}.png`}
                                                                                    alt="Spell 2"
                                                                                    className="w-5 h-5 rounded border border-[#C89B3C]/30"
                                                                                />
                                                                            </div>
                                                                            {/* Runes */}
                                                                            <div className="flex space-x-1 relative">
                                                                                {p.perks?.styles[0]?.selections[0]?.perk && (
                                                                                    <img
                                                                                        src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${getRuneById(p.perks.styles[0].selections[0].perk).path}/${getRuneById(p.perks.styles[0].selections[0].perk).key}/${getRuneById(p.perks.styles[0].selections[0].perk).imageName}.png`}
                                                                                        alt="Primary Rune"
                                                                                        className="w-5 h-5 rounded-full border border-[#C89B3C]/30 bg-black/60"
                                                                                    />
                                                                                )}
                                                                                {p.perks?.styles[1]?.style && (
                                                                                    <img
                                                                                        src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${getRuneStyleById(p.perks.styles[1].style).id}_${getRuneStyleById(p.perks.styles[1].style).name}.png`}
                                                                                        alt="Secondary Style"
                                                                                        className="w-5 h-5 rounded-full border border-[#C89B3C]/30 bg-black/60"
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                            {/* KDA and Stats */}
                                                                            <div className="flex-1 grid grid-cols-4 gap-4">
                                                                                <div>
                                                                                    <div className="text-sm">{p.kills}/{p.deaths}/{p.assists}</div>
                                                                                    <div className="text-xs text-[#C89B3C]">
                                                                                        {((p.kills + p.assists) / Math.max(1, p.deaths)).toFixed(2)} KDA
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <div className="text-sm">{formatNumber(p.totalDamageDealtToChampions)}</div>
                                                                                    <div className="text-xs text-gray-400">{t.lol.profile.stats.damage}</div>
                                                                                </div>
                                                                                <div>
                                                                                    <div className="text-sm">{p.totalMinionsKilled + p.neutralMinionsKilled} {t.lol.profile.stats.cs}</div>
                                                                                    <div className="text-xs text-gray-400">
                                                                                        {((p.totalMinionsKilled + p.neutralMinionsKilled) / (match.info.gameDuration / 60)).toFixed(1)}{t.lol.profile.csPerMin}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex items-center space-x-1">
                                                                                    {[p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6]
                                                                                        .sort((a, b) => (a > 0 ? -1 : 1))
                                                                                        .map((itemId, idx) => (
                                                                                            <div key={idx} className="relative w-6 h-6 bg-black/60 rounded">
                                                                                                {itemId > 0 && (
                                                                                                    <img
                                                                                                        src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${itemId}.png`}
                                                                                                        alt={getItemName(itemId)}
                                                                                                        title={getItemName(itemId)}
                                                                                                        className="absolute inset-0 w-full h-full object-cover rounded"
                                                                                                    />
                                                                                                )}
                                                                                            </div>
                                                                                        ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                            </div>

                                                            {/* Game Stats Separator */}
                                                            {(() => {
                                                                const allyTeam = match.info.participants.filter(p => p.teamId === participant.teamId);
                                                                const enemyTeam = match.info.participants.filter(p => p.teamId !== participant.teamId);
                                                                const allyGold = allyTeam.reduce((sum, p) => sum + p.goldEarned, 0);
                                                                const enemyGold = enemyTeam.reduce((sum, p) => sum + p.goldEarned, 0);
                                                                const goldDiff = allyGold - enemyGold;

                                                                return (
                                                                    <div className="bg-black/30 rounded-lg p-3 m-4">
                                                                        <div className="flex justify-between items-center text-sm">
                                                                            <div className="text-[#C89B3C]">
                                                                                {Math.floor(match.info.gameDuration / 60)}:{String(match.info.gameDuration % 60).padStart(2, '0')}
                                                                            </div>
                                                                            <div className="flex items-center space-x-8">
                                                                                <div className="text-center">
                                                                                    <div className="text-[#C89B3C]">
                                                                                        {allyTeam.reduce((sum, p) => sum + p.kills, 0)} - {enemyTeam.reduce((sum, p) => sum + p.kills, 0)}
                                                                                    </div>
                                                                                    <div className="text-xs text-gray-400">{t.lol.profile.stats.kills}</div>
                                                                                </div>
                                                                                <div className="text-center">
                                                                                    <div className="text-[#C89B3C]">
                                                                                        {match.info.teams.find(t => t.teamId === participant.teamId)?.objectives.dragon.kills || 0} - {match.info.teams.find(t => t.teamId !== participant.teamId)?.objectives.dragon.kills || 0}
                                                                                    </div>
                                                                                    <div className="text-xs text-gray-400">{t.lol.profile.stats.dragons}</div>
                                                                                </div>
                                                                                <div className="text-center">
                                                                                    <div className="text-[#C89B3C]">
                                                                                        {match.info.teams.find(t => t.teamId === participant.teamId)?.objectives.baron.kills || 0} - {match.info.teams.find(t => t.teamId !== participant.teamId)?.objectives.baron.kills || 0}
                                                                                    </div>
                                                                                    <div className="text-xs text-gray-400">{t.lol.profile.stats.barons}</div>
                                                                                </div>
                                                                                <div className="text-center">
                                                                                    <div className="text-[#C89B3C]">
                                                                                        {match.info.teams.find(t => t.teamId === participant.teamId)?.objectives.riftHerald.kills || 0} - {match.info.teams.find(t => t.teamId !== participant.teamId)?.objectives.riftHerald.kills || 0}
                                                                                    </div>
                                                                                    <div className="text-xs text-gray-400">{t.lol.profile.stats.heralds}</div>
                                                                                </div>
                                                                                <div className="text-center">
                                                                                    <div className="text-[#C89B3C]">
                                                                                        {match.info.teams.find(t => t.teamId === participant.teamId)?.objectives.tower.kills || 0} - {match.info.teams.find(t => t.teamId !== participant.teamId)?.objectives.tower.kills || 0}
                                                                                    </div>
                                                                                    <div className="text-xs text-gray-400">{t.lol.profile.stats.towers}</div>
                                                                                </div>
                                                                                <div className="text-center">
                                                                                    <div className="text-[#C89B3C]">
                                                                                        {match.info.teams.find(t => t.teamId === participant.teamId)?.objectives.horde?.kills || 0} - {match.info.teams.find(t => t.teamId !== participant.teamId)?.objectives.horde?.kills || 0}
                                                                                    </div>
                                                                                    <div className="text-xs text-gray-400">{t.lol.profile.stats.grubs}</div>
                                                                                </div>
                                                                                <div className="text-center">
                                                                                    <div className={`${goldDiff > 0 ? 'text-[#00FF00]' : 'text-[#FF4655]'}`}>
                                                                                        {goldDiff > 0 ? '+' : ''}{formatNumber(goldDiff)}
                                                                                    </div>
                                                                                    <div className="text-xs text-gray-400">{t.lol.profile.stats.goldDiff}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })()}

                                                            {/* Enemy Team */}
                                                            <div className="space-y-2">
                                                                {match.info.participants
                                                                    .filter(p => p.teamId !== participant.teamId)
                                                                    .map((p) => (
                                                                        <div key={p.puuid} className="flex items-center space-x-3 bg-black/30 rounded-lg p-2">
                                                                            <div className="relative">
                                                                                <img
                                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${p.championName}.png`}
                                                                                    alt={p.championName}
                                                                                    title={`${p.championName}`}
                                                                                    className="w-10 h-10 rounded-lg border border-[#C89B3C]/30"
                                                                                />
                                                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black/60 rounded-full border border-[#C89B3C] flex items-center justify-center text-xs font-bold">
                                                                                    {p.champLevel}
                                                                                </div>
                                                                            </div>
                                                                            {/* Player Info */}
                                                                            <div className="flex flex-col min-w-[150px]">
                                                                                <Link 
                                                                                    href={`/lol/profile/${encodeURIComponent(p.riotIdGameName)}-${encodeURIComponent(p.riotIdTagline)}`}
                                                                                    className="text-sm text-[#C89B3C] hover:underline"
                                                                                >
                                                                                    {p.riotIdGameName}
                                                                                </Link>
                                                                                <div className="flex items-center space-x-1">
                                                                                    <div className="text-xs text-gray-400">{getRankDisplay(p)}</div>
                                                                                </div>
                                                                            </div>
                                                                            {/* Summoner Spells */}
                                                                            <div className="flex space-x-1">
                                                                                <img
                                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${getSummonerSpellById(p.summoner1Id)}.png`}
                                                                                    alt="Spell 1"
                                                                                    className="w-5 h-5 rounded border border-[#C89B3C]/30"
                                                                                />
                                                                                <img
                                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${getSummonerSpellById(p.summoner2Id)}.png`}
                                                                                    alt="Spell 2"
                                                                                    className="w-5 h-5 rounded border border-[#C89B3C]/30"
                                                                                />
                                                                            </div>
                                                                            {/* Runes */}
                                                                            <div className="flex space-x-1 relative">
                                                                                {p.perks?.styles[0]?.selections[0]?.perk && (
                                                                                    <img
                                                                                        src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${getRuneById(p.perks.styles[0].selections[0].perk).path}/${getRuneById(p.perks.styles[0].selections[0].perk).key}/${getRuneById(p.perks.styles[0].selections[0].perk).imageName}.png`}
                                                                                        alt="Primary Rune"
                                                                                        className="w-5 h-5 rounded-full border border-[#C89B3C]/30 bg-black/60"
                                                                                    />
                                                                                )}
                                                                                {p.perks?.styles[1]?.style && (
                                                                                    <img
                                                                                        src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${getRuneStyleById(p.perks.styles[1].style).id}_${getRuneStyleById(p.perks.styles[1].style).name}.png`}
                                                                                        alt="Secondary Style"
                                                                                        className="w-5 h-5 rounded-full border border-[#C89B3C]/30 bg-black/60"
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                            {/* KDA and Stats */}
                                                                            <div className="flex-1 grid grid-cols-4 gap-4">
                                                                                <div>
                                                                                    <div className="text-sm">{p.kills}/{p.deaths}/{p.assists}</div>
                                                                                    <div className="text-xs text-[#C89B3C]">
                                                                                        {((p.kills + p.assists) / Math.max(1, p.deaths)).toFixed(2)} KDA
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <div className="text-sm">{formatNumber(p.totalDamageDealtToChampions)}</div>
                                                                                    <div className="text-xs text-gray-400">{t.lol.profile.stats.damage}</div>
                                                                                </div>
                                                                                <div>
                                                                                    <div className="text-sm">{p.totalMinionsKilled + p.neutralMinionsKilled} {t.lol.profile.stats.cs}</div>
                                                                                    <div className="text-xs text-gray-400">
                                                                                        {((p.totalMinionsKilled + p.neutralMinionsKilled) / (match.info.gameDuration / 60)).toFixed(1)}{t.lol.profile.csPerMin}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex items-center space-x-1">
                                                                                    {[p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6]
                                                                                        .sort((a, b) => (a > 0 ? -1 : 1))
                                                                                        .map((itemId, idx) => (
                                                                                            <div key={idx} className="relative w-6 h-6 bg-black/60 rounded">
                                                                                                {itemId > 0 && (
                                                                                                    <img
                                                                                                        src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${itemId}.png`}
                                                                                                        alt={getItemName(itemId)}
                                                                                                        title={getItemName(itemId)}
                                                                                                        className="absolute inset-0 w-full h-full object-cover rounded"
                                                                                                    />
                                                                                                )}
                                                                                            </div>
                                                                                        ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                            </div>
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
                    </div>

                    {/* Right Side Containers */}
                    <div className="space-y-6">
                        {/* Most Played Champions */}
                        <div className="bg-gradient-to-br from-[#111111] to-black rounded-lg border border-[#C89B3C]/30 overflow-hidden">
                            <div className="border-b border-[#C89B3C]/30 p-4">
                                <h2 className="text-xl font-bold text-[#C89B3C]">{t.lol.profile.mostPlayedChampions.title}</h2>
                                <p className="text-sm text-gray-400 mt-1">{t.lol.profile.mostPlayedChampions.season.replace('{number}', '13')}</p>
                            </div>
                            <div className="p-4">
                                <div className="space-y-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                                        <div key={index} className="bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1.5 border border-[#C89B3C]/20 hover:bg-black/60 transition-colors">
                                            <div className="flex items-center w-full">
                                                {/* Champion Icon */}
                                                <div className="w-8 h-8 bg-black/60 rounded-lg flex-shrink-0"></div>
                                                
                                                {/* Champion Name and Games */}
                                                <div className="flex-shrink-0 w-[30%] ml-2">
                                                    <div className="text-[#C89B3C] font-medium text-sm truncate">Champion</div>
                                                    <div className="text-xs text-gray-400">20 {t.lol.profile.mostPlayedChampions.games}</div>
                                                </div>

                                                {/* KDA */}
                                                <div className="flex-shrink-0 w-[30%]">
                                                    <div className="flex items-center justify-center space-x-1 mb-0.5">
                                                        <span className="text-gray-400 text-xs">KDA</span>
                                                        <span className="text-[#C89B3C] text-xs">4.2</span>
                                                    </div>
                                                    <div className="text-white text-xs text-center">3.2 / 1.8 / 4.5</div>
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
                                                                strokeDashoffset="39.58"
                                                                strokeLinecap="round"
                                                            />
                                                            <defs>
                                                                <linearGradient id="winrateGradient" x1="0" y1="0" x2="1" y2="0">
                                                                    <stop offset="0%" stopColor="#C89B3C" />
                                                                    <stop offset="100%" stopColor="#C8AA6E" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-[#C89B3C]">55%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* View All Button */}
                                <div className="mt-3 text-center">
                                    <button className="bg-black/40 hover:bg-black/60 text-[#C89B3C] border border-[#C89B3C]/30 rounded-lg px-4 py-1.5 text-sm transition-colors">
                                        {t.lol.profile.mostPlayedChampions.viewAll}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Champion Masteries */}
                        <div className="bg-gradient-to-br from-[#111111] to-black rounded-lg border border-[#C89B3C]/30 overflow-hidden">
                            <div className="border-b border-[#C89B3C]/30 p-4">
                                <h2 className="text-xl font-bold text-[#C89B3C]">{t.lol.profile.championMasteries.title}</h2>
                            </div>
                            <div className="p-4">
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((_, index) => (
                                        <div key={index} className="bg-black/40 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-4 border border-[#C89B3C]/20 hover:bg-black/60 transition-colors">
                                            {/* Champion Icon Placeholder */}
                                            <div className="relative">
                                                <div className="w-12 h-12 bg-black/60 rounded-lg"></div>
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black/60 rounded-full border border-[#C89B3C] flex items-center justify-center text-xs font-bold text-[#C89B3C]">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            {/* Champion Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-[#C89B3C]">{t.lol.profile.loading}</div>
                                                    <div className="text-sm text-gray-400">0 {t.lol.profile.championMasteries.points}</div>
                                                </div>
                                                {/* Mastery Level Progress Bar */}
                                                <div className="w-full h-1.5 bg-black/60 rounded-full mt-2 overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-[#C89B3C] to-[#C8AA6E] rounded-full" style={{ width: '0%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummonerProfile; 