'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";

const Header = () => {
    const { t } = useLanguage();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const menuItems = [
        { name: t.header.leaderboard, path: '/lol/leaderboard' },
        { name: t.header.searchPlayer, path: '/lol/search-player' },
        { name: t.header.champions, path: '/lol/champion' },
        { name: t.header.items, path: '/lol/items' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => {
        return pathname === path;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
    };

    return (
        <header 
            className={`fixed top-0 left-0 w-full bg-black border-b border-white/10 z-[100] transition-all duration-300 ${
                scrolled ? 'shadow-lg' : ''
            }`}
        >
            <nav className="max-w-[1400px] mx-auto py-3 px-4 md:px-6 flex items-center justify-between relative">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-0.5 z-[100]">
                    <span className="text-lol-gold text-2xl md:text-3xl font-black">GG</span>
                    <span className="text-white/90 text-2xl md:text-3xl font-black">.</span>
                    <span className="text-white/90 text-2xl md:text-3xl font-black">TRACKER</span>
                </Link>

                {/* Hamburger Menu Button (Mobile) */}
                <button 
                    className="md:hidden z-[100] w-10 h-10 flex items-center justify-center text-lol-gold hover:text-white transition-colors bg-black border border-lol-gold/50 hover:border-white/50 rounded-lg"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <FontAwesomeIcon 
                        icon={isMenuOpen ? faXmark : faBars} 
                        className="text-2xl"
                    />
                </button>

                {/* Mobile Menu */}
                <div 
                    className={`md:hidden fixed inset-0 bg-black transition-all duration-300 ${
                        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                >
                    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
                        {menuItems.map((item, index) => (
                            <Link 
                                key={index}
                                href={item.path}
                                className={`text-xl font-semibold transition-all duration-300 ${
                                    isActive(item.path) 
                                        ? 'text-lol-gold' 
                                        : 'text-white/80 hover:text-white'
                                }`}
                                onClick={toggleMenu}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="flex flex-col gap-4 mt-6 w-full max-w-[280px]">
                            <button className="w-full h-[45px] flex items-center justify-center gap-2 rounded-lg font-semibold text-white bg-[#5865F2] hover:bg-[#4752c4] transition-colors">
                                <FontAwesomeIcon icon={faDiscord} />
                                Discord
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    {menuItems.map((item, index) => (
                        <Link 
                            key={index}
                            href={item.path}
                            className={`px-3 lg:px-4 py-2 rounded-md text-sm lg:text-base transition-all ${
                                isActive(item.path) 
                                    ? 'text-lol-gold bg-lol-gold/10' 
                                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right Section (Desktop) */}
                <div className="hidden md:flex items-center gap-3 lg:gap-4">
                    <button className="h-[38px] px-4 lg:px-5 flex items-center gap-2 rounded-md font-semibold text-sm text-white bg-[#5865F2] hover:bg-[#4752c4] transition-colors">
                        <FontAwesomeIcon icon={faDiscord} />
                        <span className="hidden lg:inline">Discord</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header; 
