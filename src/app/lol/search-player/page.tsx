'use client';

import { useState } from 'react';
import { SiRiotgames } from 'react-icons/si';
import { BiSearch } from 'react-icons/bi';
import { useLanguage } from "@/context/LanguageContext";

export default function SearchPlayer() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // La logique de recherche sera implémentée plus tard
    };

    return (
        <div className="min-h-screen bg-gradient-to-[135deg] from-[#0A1428] to-[#091428] text-white relative flex items-center justify-center overflow-hidden px-4 py-8 md:p-0">
            {/* League of Legends themed background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Runic circle - inspired by LoL's magical elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px]">
                    {/* Outer circle */}
                    <div className="absolute inset-0 border-2 border-[#C89B3C]/20 rounded-full animate-slow-spin" />
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
                    <div className="flex max-w-[600px] mx-auto bg-[#091428]/90 border border-[#C89B3C]/30 rounded-full p-1 sm:p-2 shadow-lg shadow-black/20 items-center transition-all duration-300 hover:border-[#C89B3C]/60 hover:shadow-[#C89B3C]/10 hover:-translate-y-0.5">
                        <SiRiotgames className="text-[#C89B3C] text-xl sm:text-2xl ml-3 sm:ml-6 opacity-80" />
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.lol.searchPlayerPage.placeholder}
                            className="flex-1 px-3 sm:px-6 py-3 sm:py-4 bg-transparent text-[#F0E6D2] text-base sm:text-lg font-medium placeholder:text-[#C8AA6E]/40 focus:outline-none"
                        />
                        <button 
                            type="submit"
                            className="bg-[#C89B3C] px-4 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:bg-[#D5B168] hover:-translate-y-0.5 mr-0.5 sm:mr-1 text-[#091428]"
                        >
                            <BiSearch className="text-xl sm:text-2xl" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}