'use client';

import { useState } from 'react';
import { SiRiotgames } from 'react-icons/si';
import { BiSearch } from 'react-icons/bi';

export default function SearchPlayer() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // La logique de recherche sera implémentée plus tard
    };

    return (
        <div className="min-h-screen bg-gradient-to-[135deg] from-[#0F1923] to-[#1A1A1A] text-white relative flex items-center justify-center overflow-hidden">
            {/* Valorant-style geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Top-right corner shape */}
                <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#FF4654]/5 rotate-45 transform origin-top-right" />
                
                {/* Bottom-left corner shape */}
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#FF4654]/5 -rotate-45 transform origin-bottom-left" />
                
                {/* Diagonal lines */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[20%] left-0 w-full h-[2px] bg-gradient-to-r from-[#FF4654]/0 via-[#FF4654]/10 to-[#FF4654]/0 rotate-[35deg]" />
                    <div className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-[#FF4654]/0 via-[#FF4654]/5 to-[#FF4654]/0 -rotate-[35deg]" />
                    <div className="absolute top-[60%] left-0 w-full h-[2px] bg-gradient-to-r from-[#FF4654]/0 via-[#FF4654]/10 to-[#FF4654]/0 rotate-[35deg]" />
                </div>

                {/* Animated pulse circles */}
                <div className="absolute top-[20%] right-[20%] w-4 h-4">
                    <div className="absolute inset-0 bg-[#FF4654]/20 rounded-full animate-ping" />
                    <div className="absolute inset-0 bg-[#FF4654]/40 rounded-full animate-pulse" />
                </div>
                <div className="absolute bottom-[30%] left-[25%] w-3 h-3">
                    <div className="absolute inset-0 bg-[#FF4654]/20 rounded-full animate-ping [animation-delay:0.5s]" />
                    <div className="absolute inset-0 bg-[#FF4654]/40 rounded-full animate-pulse [animation-delay:0.5s]" />
                </div>
            </div>

            {/* Main Container */}
            <div className="w-full max-w-[800px] mx-auto text-center relative z-10 p-8">
                {/* Header */}
                <div className="mb-16 relative py-8">
                    <h1 className="text-[3.5rem] mb-6 bg-gradient-to-r from-[#FF4654] to-[#FF7F8C] bg-clip-text text-transparent font-extrabold tracking-[-1px] uppercase relative">
                        Search a player
                        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#FF4654]/30" />
                        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#FF4654]/30" />
                    </h1>
                    <p className="text-xl text-white/80 max-w-[600px] mx-auto leading-relaxed">
                        Track detailed statistics, match history and rankings for any<br />
                        Valorant player.
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-10">
                    <div className="flex max-w-[600px] mx-auto bg-[#0F1923]/90 border border-[#FF4654]/30 rounded-full p-2 shadow-lg shadow-black/20 items-center transition-all duration-300 hover:border-[#FF4654]/60 hover:shadow-[#FF4654]/10 hover:-translate-y-0.5">
                        <SiRiotgames className="text-[#FF4654] text-2xl ml-6 opacity-80" />
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search player..."
                            className="flex-1 px-6 py-4 bg-transparent text-white text-lg font-medium placeholder:text-white/40 focus:outline-none"
                        />
                        <button 
                            type="submit"
                            className="bg-gradient-to-r from-[#FF4654] to-[#FF7F8C] px-8 py-4 rounded-full transition-all duration-300 hover:from-[#FF5E6A] hover:to-[#FF97A2] hover:-translate-y-0.5 mr-1"
                        >
                            <BiSearch className="text-2xl" />
                        </button>
                    </div>
                </form>

                {/* Examples */}
                <div className="flex items-center justify-center gap-4 text-white/60">
                    <p className="text-[0.95rem]">Examples: </p>
                    <div className="flex gap-3">
                        {['TenZ', 'ScreaM', 'yay'].map((player, index) => (
                            <span 
                                key={index}
                                className="px-5 py-2 bg-[#0F1923]/60 border border-[#FF4654]/30 rounded-full text-sm cursor-pointer transition-all duration-200 font-medium hover:bg-[#FF4654]/10 hover:border-[#FF4654]/60 hover:text-[#FF4654] hover:-translate-y-0.5"
                            >
                                {player}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}