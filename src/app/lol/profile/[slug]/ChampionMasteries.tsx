'use client';

import { useLanguage } from "@/context/LanguageContext";

const ChampionMasteries = () => {
    const { t } = useLanguage();

    return (
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
    );
};

export default ChampionMasteries; 