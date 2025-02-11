'use client';

import { useLanguage } from "@/context/LanguageContext";
import { MatchData } from '@/types/riot-api';
import Link from 'next/link';
import { getItemName, getSummonerSpellById, getRuneById, getRuneStyleById } from './utils';

interface TeamDetailsProps {
    match: MatchData;
    teamId: number;
    currentVersion: string;
    participantPuuid: string;
    playerRanks: { [key: string]: { data: any[], timestamp: number } };
    itemNames: { [key: string]: string };
}

const TeamDetails = ({
    match,
    teamId,
    currentVersion,
    participantPuuid,
    playerRanks,
    itemNames
}: TeamDetailsProps) => {
    const { t } = useLanguage();

    const getRankDisplay = (player: { riotIdGameName: string, riotIdTagline: string }) => {
        const playerKey = `${player.riotIdGameName}-${player.riotIdTagline}`;
        const rankData = playerRanks[playerKey]?.data?.find(r => r.queueType === 'RANKED_SOLO_5x5');
        if (!rankData) return '';
        const highEloRanks = ['CHALLENGER', 'GRANDMASTER', 'MASTER'];
        return `${rankData.tier} ${highEloRanks.includes(rankData.tier) ? '' : rankData.rank} ${rankData.leaguePoints}LP`;
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    return (
        <div className="space-y-2">
            {match.info.participants
                .filter(p => p.teamId === teamId)
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
                                                    alt={getItemName(itemId, itemNames)}
                                                    title={getItemName(itemId, itemNames)}
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
    );
};

export default TeamDetails; 