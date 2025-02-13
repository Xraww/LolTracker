'use client';

import { CompleteSummonerInfo } from '@/types/riot-api';
import { getProfileIconUrl } from '@/lib/api-utils';
import Image from 'next/image';

interface ProfileHeaderProps {
    summonerData: CompleteSummonerInfo;
    currentVersion: string;
}

const ProfileHeader = ({ summonerData, currentVersion }: ProfileHeaderProps) => {
    return (
        <div className="bg-gradient-to-br from-black to-lol-dark border-b border-[#C89B3C]/30">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center">
                    
                    {/* Profile Icon and Level */}
                    <div className="relative mb-4">
                        <Image 
                            src={getProfileIconUrl(summonerData.summoner.profileIconId, currentVersion)}
                            alt="Profile Icon"
                            width={128}
                            height={128}
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
                                            <Image 
                                                src={`/images/game/lol/rank/${rank.tier.toLowerCase()}.png`}
                                                alt={`${rank.tier} Rank`}
                                                width={32}
                                                height={32}
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
    );
};

export default ProfileHeader; 