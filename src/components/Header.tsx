'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-black/95 to-[rgb(20,20,20)]/95 backdrop-blur-md border-b border-white/10 z-50">
            <nav className="max-w-[1400px] mx-auto py-3 px-4 flex items-center justify-between gap-8">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-0.5">
                    <span className="text-valorant-red text-3xl font-black">GG</span>
                    <span className="text-white/90 text-3xl font-black">.</span>
                    <span className="text-white/90 text-3xl font-black">TRACKER</span>
                </Link>

                {/* Center Navigation */}
                <div className="flex items-center gap-12">
                    {/* Valorant */}
                    <div className="relative p-2 group">
                        <Image 
                            src="/images/games/valorant/Logomark/V_Logomark_Red.png" 
                            alt="Valorant" 
                            width={70} 
                            height={70}
                            className="w-auto cursor-pointer transition-transform hover:scale-105"
                        />
                        <div className="absolute top-full left-0 min-w-[200px] bg-black/95 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col gap-3 opacity-0 invisible translate-y-[-10px] transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                            <Link 
                                href="/valorant/leaderboard"
                                className={`px-2 py-2 rounded-md transition-all ${isActive('/valorant/leaderboard') ? 'text-valorant-red bg-valorant-red/10' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                            >
                                Leaderboard
                            </Link>
                            <Link 
                                href="/valorant/stats"
                                className={`px-2 py-2 rounded-md transition-all ${isActive('/valorant/stats') ? 'text-valorant-red bg-valorant-red/10' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                            >
                                Stats
                            </Link>
                        </div>
                    </div>

                    {/* League of Legends */}
                    <div className="relative p-2 group">
                        <Image 
                            src="/images/games/lol/logo.png" 
                            alt="League of Legends" 
                            width={70} 
                            height={70}
                            className="w-auto cursor-pointer transition-transform hover:scale-105"
                        />
                        <div className="absolute top-full left-0 min-w-[200px] bg-black/95 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col gap-3 opacity-0 invisible translate-y-[-10px] transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                            <Link 
                                href="/lol/leaderboard"
                                className={`px-2 py-2 rounded-md transition-all ${isActive('/lol/leaderboard') ? 'text-lol-gold bg-lol-gold/10' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                            >
                                Leaderboard
                            </Link>
                            <Link 
                                href="/lol/stats"
                                className={`px-2 py-2 rounded-md transition-all ${isActive('/lol/stats') ? 'text-lol-gold bg-lol-gold/10' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                            >
                                Stats
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* <Link 
                        href="/esports"
                        className="h-[38px] px-5 flex items-center gap-2 rounded-md font-semibold text-sm text-white border border-white/20 transition-all hover:border-white/40 hover:bg-white/5"
                    >
                        Esports
                    </Link> */}
                    <button className="h-[38px] px-5 flex items-center gap-2 rounded-md font-semibold text-sm text-white bg-[#5865F2] transition-all hover:bg-[#4752c4]">
                        <FontAwesomeIcon icon={faDiscord} />
                        Discord
                    </button>
                    <button className="w-[38px] h-[38px] flex items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-white/40 hover:bg-white/5">
                        <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                    </button>
                </div>
            </nav>

            {/* Settings Button */}
            {/* <button className="fixed bottom-8 right-8 w-[45px] h-[45px] flex items-center justify-center rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xl transition-all hover:border-white/40 hover:bg-black/90">
                <FontAwesomeIcon icon={faCog} />
            </button> */}
        </header>
    );
};

export default Header; 
