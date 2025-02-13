'use client';

import { useLanguage } from "@/context/LanguageContext";
import { MatchData } from '@/types/riot-api';
import Link from 'next/link';
import { formatTimeAgo, getItemName, getSummonerSpellById, getRuneById, getRuneStyleById } from './utils';
import Image from 'next/image';

interface MatchCardProps {
    match: MatchData;
    currentVersion: string;
    participantPuuid: string;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onFetchRanks: (players: { riotIdGameName: string, riotIdTagline: string }[]) => void;
    playerRanks: { [key: string]: { data: any[], timestamp: number } };
    itemNames: { [key: string]: string };
    region: string;
}

const MatchCard = ({
    match,
    currentVersion,
    participantPuuid,
    isExpanded,
    onToggleExpand,
    onFetchRanks,
    playerRanks,
    itemNames,
    region
}: MatchCardProps) => {
    const { t } = useLanguage();
    const participant = match.info.participants.find(p => p.puuid === participantPuuid);
    
    if (!participant) return null;

    const kda = ((participant.kills + participant.assists) / Math.max(1, participant.deaths)).toFixed(2);
    const cs = participant.totalMinionsKilled + participant.neutralMinionsKilled;
    const csPerMin = ((cs / match.info.gameDuration) * 60).toFixed(1);
    const primaryRune = participant.perks?.styles[0]?.selections[0]?.perk;
    const secondaryRuneStyle = participant.perks?.styles[1]?.style;

    return (
        <div className="flex flex-col">
            <div className={`bg-black/40 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4 border border-[#C89B3C]/20 hover:bg-black/60 transition-colors ${
                participant.win ? 'border-l-4 border-l-[#00FF00]' : 'border-l-4 border-l-[#FF4655]'
            }`}>
                {/* Champion Icon and Summoner Spells */}
                <div className="relative flex">
                    <div className="relative">
                        <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${participant.championName}.png`}
                            alt={participant.championName}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-lg border border-[#C89B3C]/30"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black/60 rounded-full border border-[#C89B3C] flex items-center justify-center text-xs font-bold">
                            {participant.champLevel}
                        </div>
                    </div>
                    
                    {/* Summoner Spells */}
                    <div className="flex flex-col justify-between ml-1 my-0.5">
                        <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${getSummonerSpellById(participant.summoner1Id)}.png`}
                            alt="Summoner Spell 1"
                            width={28}
                            height={28}
                            className="w-7 h-7 rounded border border-[#C89B3C]/30"
                        />
                        <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${getSummonerSpellById(participant.summoner2Id)}.png`}
                            alt="Summoner Spell 2"
                            width={28}
                            height={28}
                            className="w-7 h-7 rounded border border-[#C89B3C]/30"
                        />
                    </div>

                    {/* Runes */}
                    <div className="flex flex-col justify-between ml-1 my-0.5 relative">
                        {primaryRune && (
                            <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${getRuneById(primaryRune).path}/${getRuneById(primaryRune).key}/${getRuneById(primaryRune).imageName}.png`}
                                alt="Primary Rune"
                                width={28}
                                height={28}
                                className="w-7 h-7 rounded-full border border-[#C89B3C]/30 bg-black/60"
                            />
                        )}
                        {secondaryRuneStyle && (
                            <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${getRuneStyleById(secondaryRuneStyle).id}_${getRuneStyleById(secondaryRuneStyle).name}.png`}
                                alt="Secondary Rune Style"
                                width={28}
                                height={28}
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
                                            <Link href={`/lol/profile/${encodeURIComponent(p.riotIdGameName)}-${encodeURIComponent(p.riotIdTagline)}?region=${region}`}>
                                                <Image
                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${p.championName}.png`}
                                                    alt={p.championName}
                                                    title={`${p.championName} - ${p.riotIdGameName}`}
                                                    width={32}
                                                    height={32}
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
                                            <Link href={`/lol/profile/${encodeURIComponent(p.riotIdGameName)}-${encodeURIComponent(p.riotIdTagline)}?region=${region}`}>
                                                <Image
                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${p.championName}.png`}
                                                    alt={p.championName}
                                                    title={`${p.championName} - ${p.riotIdGameName}`}
                                                    width={32}
                                                    height={32}
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
                                        <Image
                                            src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${itemId}.png`}
                                            alt={getItemName(itemId, itemNames)}
                                            title={getItemName(itemId, itemNames)}
                                            width={24}
                                            height={24}
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
                                    <Image
                                        src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${participant.item6}.png`}
                                        alt={getItemName(participant.item6, itemNames)}
                                        title={getItemName(participant.item6, itemNames)}
                                        width={24}
                                        height={24}
                                        className="w-full h-full rounded"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Expand Arrow */}
                        <div className="flex items-center ml-auto">
                            <div 
                                onClick={onToggleExpand}
                                className="text-[#C89B3C] opacity-50 hover:opacity-100 transition-opacity cursor-pointer select-none"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
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
        </div>
    );
};

export default MatchCard; 