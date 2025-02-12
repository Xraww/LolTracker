'use client';

import { useState, useEffect } from 'react';
import { getCurrentLoLVersion } from '@/lib/api-utils';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Champion {
    id: string;
    name: string;
    title: string;
    image: {
        full: string;
    };
}

interface ChampionsByRole {
    TOP: Champion[];
    JUNGLE: Champion[];
    MID: Champion[];
    ADC: Champion[];
    SUPPORT: Champion[];
}

const ROLE_NAMES = {
    TOP: 'Top Lane',
    JUNGLE: 'Jungle',
    MID: 'Mid Lane',
    ADC: 'Bot Lane',
    SUPPORT: 'Support'
};

export default function Champions() {
    const [champions, setChampions] = useState<ChampionsByRole | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPatch, setCurrentPatch] = useState('15.3.1');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchVersion = async () => {
            const patch = await getCurrentLoLVersion();
            setCurrentPatch(patch);
        };

        fetchVersion();
    }, []);

    useEffect(() => {
        const fetchChampions = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/lol/champions');
                const data = await response.json();
                setChampions(data);
            } catch (error) {
                console.error('Failed to fetch champions:', error);
            }
            setLoading(false);
        };

        fetchChampions();
    }, []);

    const filterChampions = (champions: ChampionsByRole) => {
        if (!searchQuery) return champions;

        const query = searchQuery.toLowerCase();
        const filtered: ChampionsByRole = {
            TOP: [],
            JUNGLE: [],
            MID: [],
            ADC: [],
            SUPPORT: []
        };

        Object.keys(champions).forEach((role) => {
            filtered[role as keyof ChampionsByRole] = champions[role as keyof ChampionsByRole].filter(
                champion => 
                    champion.name.toLowerCase().includes(query) ||
                    champion.title.toLowerCase().includes(query)
            );
        });

        return filtered;
    };

    if (loading || !champions) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center py-8">Loading champions...</div>
            </div>
        );
    }

    const filteredChampions = filterChampions(champions);

    return (
        <div className="container max-w-[1400px] mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">League of Legends Champions</h1>
            
            {/* Search Input */}
            <div className="relative mb-8">
                <div className="relative max-w-2xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search champions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-12 bg-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lol-gold focus:border-transparent"
                    />

                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>
            
            <div className="space-y-8">
                {(Object.keys(ROLE_NAMES) as (keyof typeof ROLE_NAMES)[]).map((role) => (
                    <div key={role} className="rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">{ROLE_NAMES[role]}</h2>

                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {filteredChampions[role].length} Champions
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {filteredChampions[role].map((champion) => (
                                <Link 
                                    key={champion.id}
                                    href={`/lol/champion/${champion.id}`}
                                    className="bg-white bg-gradient-to-br from-black to-lol-dark rounded-lg p-3 flex flex-col items-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:text-lol-gold"
                                >
                                    <img
                                        src={`https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/${champion.id}.png`}
                                        alt={champion.name}
                                        className="w-16 h-16 rounded-full mb-2"
                                    />
                                    
                                    <h3 className="text-sm font-medium text-center">{champion.name}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{champion.title.charAt(0).toUpperCase() + champion.title.slice(1)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}