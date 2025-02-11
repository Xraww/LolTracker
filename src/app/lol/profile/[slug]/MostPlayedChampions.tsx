'use client';

import { useLanguage } from "@/context/LanguageContext";

const MostPlayedChampions = () => {
    const { t } = useLanguage();

    return (
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
    );
};

export default MostPlayedChampions; 