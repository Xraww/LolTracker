'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const games = [
    {
        name: 'Valorant',
        logo: '/images/games/valorant/Logomark/V_Logomark_Red.png',
        menuItems: [
            { name: 'Leaderboard', path: '/valorant/leaderboard' },
            { name: 'Search Player', path: '/valorant/search-player' },
            { name: 'Stats', path: '/valorant/stats' },
            { name: 'Agents', path: '/valorant/agents' },
            { name: 'Weapons', path: '/valorant/weapons' }
        ],
        activeColor: 'text-valorant-red',
        activeBg: 'bg-valorant-red/10'
    },
    {
        name: 'League of Legends',
        logo: '/images/games/lol/logo.png',
        menuItems: [
            { name: 'Leaderboard', path: '/lol/leaderboard' },
            { name: 'Search Player', path: '/lol/search-player' },
            { name: 'Stats', path: '/lol/stats' },
            { name: 'Champions', path: '/lol/champions' },
            { name: 'Items', path: '/lol/items' }
        ],
        activeColor: 'text-lol-gold',
        activeBg: 'bg-lol-gold/10'
    }
];

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
                    {games.map((game, index) => (
                        <div key={index} className="relative p-2 group">
                            <Image 
                                src={game.logo}
                                alt={game.name}
                                width={70}
                                height={70}
                                className="w-auto cursor-pointer transition-transform hover:scale-105"
                            />
                            <div className="absolute top-full left-0 min-w-[200px] bg-black/95 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col gap-3 opacity-0 invisible translate-y-[-10px] transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                                {game.menuItems.map((item, itemIndex) => (
                                    <Link 
                                        key={itemIndex}
                                        href={item.path}
                                        className={`px-2 py-2 rounded-md transition-all ${
                                            isActive(item.path) 
                                                ? `${game.activeColor} ${game.activeBg}` 
                                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <button className="h-[38px] px-5 flex items-center gap-2 rounded-md font-semibold text-sm text-white bg-[#5865F2] transition-all hover:bg-[#4752c4]">
                        <FontAwesomeIcon icon={faDiscord} />
                        Discord
                    </button>
                    <button className="w-[38px] h-[38px] flex items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-white/40 hover:bg-white/5">
                        <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header; 
