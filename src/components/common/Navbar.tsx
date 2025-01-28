'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <nav className="w-full">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    GG Tracker
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-8">
                    <Link 
                        href="/valorant"
                        className={`${
                            isActive('/valorant')
                                ? 'text-red-500 font-semibold'
                                : 'text-gray-400 hover:text-white transition-colors'
                        }`}
                    >
                        Valorant
                    </Link>
                    <Link 
                        href="/lol"
                        className={`${
                            isActive('/lol')
                                ? 'text-blue-500 font-semibold'
                                : 'text-gray-400 hover:text-white transition-colors'
                        }`}
                    >
                        League of Legends
                    </Link>
                </div>

                {/* Auth Button - À implémenter plus tard */}
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Connexion
                </button>
            </div>
        </nav>
    );
};

export default Navbar; 