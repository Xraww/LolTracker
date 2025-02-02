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
        <div className="min-h-screen bg-gradient-to-[135deg] from-[#0A1428] to-[#091428] text-white relative flex items-center justify-center overflow-hidden">
            {/* League of Legends themed background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Runic circle - inspired by LoL's magical elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
                    {/* Outer circle */}
                    <div className="absolute inset-0 border-2 border-[#C89B3C]/20 rounded-full animate-slow-spin" />
                    {/* Inner circle */}
                    <div className="absolute inset-[120px] border border-[#785A28]/10 rounded-full animate-slow-spin" />
                </div>

                {/* Magical energy streams */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-[20%] w-[2px] h-[30%] bg-gradient-to-b from-transparent via-[#C89B3C]/20 to-transparent" />
                    <div className="absolute top-[40%] right-[15%] w-[2px] h-[40%] bg-gradient-to-b from-transparent via-[#C8AA6E]/20 to-transparent" />
                </div>

                {/* Runeterra map elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-[10%] left-[10%] w-[200px] h-[200px] bg-[radial-gradient(circle_at_center,#C89B3C10,transparent_70%)] animate-pulse" />
                    <div className="absolute bottom-[15%] right-[12%] w-[180px] h-[180px] bg-[radial-gradient(circle_at_center,#785A2810,transparent_70%)] animate-pulse [animation-delay:1s]" />
                </div>

                {/* Ancient runes floating */}
                <div className="absolute top-[20%] right-[25%] w-16 h-16 opacity-20 animate-float">
                    <div className="w-full h-full border-2 border-[#C89B3C] rotate-45" />
                </div>
                <div className="absolute bottom-[30%] left-[20%] w-12 h-12 opacity-20 animate-float-delayed">
                    <div className="w-full h-full border-2 border-[#C8AA6E] rotate-12" />
                </div>
            </div>

            {/* Main Container */}
            <div className="w-full max-w-[800px] mx-auto text-center relative z-10 p-8">
                {/* Header */}
                <div className="mb-16 relative py-8">
                    <h1 className="text-[3.5rem] mb-6 text-[#C89B3C] font-extrabold tracking-[-1px] uppercase relative">
                        {t.lol.searchPlayerPage.title}
                        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#C89B3C]/30" />
                        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#C89B3C]/30" />
                    </h1>
                    <p className="text-xl text-white/80 max-w-[600px] mx-auto leading-relaxed">
                        {t.lol.searchPlayerPage.description}
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-10">
                    <div className="flex max-w-[600px] mx-auto bg-[#091428]/90 border border-[#C89B3C]/30 rounded-full p-2 shadow-lg shadow-black/20 items-center transition-all duration-300 hover:border-[#C89B3C]/60 hover:shadow-[#C89B3C]/10 hover:-translate-y-0.5">
                        <SiRiotgames className="text-[#C89B3C] text-2xl ml-6 opacity-80" />
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.lol.searchPlayerPage.placeholder}
                            className="flex-1 px-6 py-4 bg-transparent text-[#F0E6D2] text-lg font-medium placeholder:text-[#C8AA6E]/40 focus:outline-none"
                        />
                        <button 
                            type="submit"
                            className="bg-[#C89B3C] px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#D5B168] hover:-translate-y-0.5 mr-1 text-[#091428]"
                        >
                            <BiSearch className="text-2xl" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}