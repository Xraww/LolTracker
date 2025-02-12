import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getCurrentLoLVersion } from '@/lib/api-utils';

interface ChampionDetails {
    id: string;
    key: string;
    name: string;
    title: string;
    image: {
        full: string;
    };
    lore: string;
    allytips: string[];
    enemytips: string[];
    tags: string[];
    partype: string;
    info: {
        attack: number;
        defense: number;
        magic: number;
        difficulty: number;
    };
    spells: {
        id: string;
        name: string;
        description: string;
        costType: string;
        cost: number[];
        image: {
            full: string;
        };
    }[];
    passive: {
        name: string;
        description: string;
        image: {
            full: string;
        };
    };
    skins: {
        id: string;
        name: string;
        num: number;
    }[];
}

async function getChampionDetails(id: string, patch: string): Promise<ChampionDetails> {
    try {
        const response = await fetch(
            `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion/${id}.json`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );
        if (!response.ok) {
            throw new Error('Failed to fetch champion details');
        }
        const data = await response.json();
        return data.data[id];
    } catch (error) {
        console.error('Error fetching champion details:', error);
        throw error;
    }
}

// Function to clean spell descriptions
function cleanDescription(description: string): string {
    return description
        .replace(/<br><br>/g, '. ')  // Replace double br with period and space
        .replace(/<br\s*\/?>\s*<br\s*\/?>/g, '. ')  // Replace any variation of double br
        .replace(/<br\s*\/?>/g, '. ') // Replace single br with period and space
        .replace(/<i>(.*?)<\/i>/g, '$1') // Remove i tags but keep their content
        .replace(/\s+/g, ' ')
        .replace(/\.\s*\./g, '.') // Clean up multiple periods
        .trim();
}

export default async function ChampionDetails({params,}: {params: { id: string };}) {
    const { id } = await params
    const currentPatch = await getCurrentLoLVersion();
    const champion = await getChampionDetails(id, currentPatch);

    return (
        <div className="container max-w-[1400px] mx-auto p-4 pt-24">
            {/* Back Button */}
            <Link href="/lol/champion" className="inline-flex items-center text-white hover:text-lol-gold mb-6">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Champions
            </Link>

            {/* Champion Header */}
            <div className="flex items-center gap-6 mb-8">
                <div className="relative w-32 h-32">
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/${champion.image.full}`}
                        alt={champion.name}
                        className="rounded-full border-4 border-yellow-500"
                    />
                </div>

                <div>
                    <h1 className="text-4xl font-bold">{champion.name}</h1>
                    <p className="text-xl text-gray-400">{champion.title.charAt(0).toUpperCase() + champion.title.slice(1)}</p>

                    <div className="flex gap-2 mt-2">
                        {champion.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Champion Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-black to-lol-dark rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Combat Stats</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-gray-400">Attack</p>
                                <span className="text-gray-400 text-sm">{champion.info.attack * 10}%</span>
                            </div>

                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-yellow-500 rounded-full h-2" style={{ width: `${champion.info.attack * 10}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-gray-400">Defense</p>
                                <span className="text-gray-400 text-sm">{champion.info.defense * 10}%</span>
                            </div>

                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-yellow-500 rounded-full h-2" style={{ width: `${champion.info.defense * 10}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-gray-400">Magic</p>
                                <span className="text-gray-400 text-sm">{champion.info.magic * 10}%</span>
                            </div>

                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-yellow-500 rounded-full h-2" style={{ width: `${champion.info.magic * 10}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-gray-400">Difficulty</p>
                                <span className="text-gray-400 text-sm">{champion.info.difficulty * 10}%</span>
                            </div>

                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-yellow-500 rounded-full h-2" style={{ width: `${champion.info.difficulty * 10}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Champion Lore */}
            <div className="bg-gradient-to-br from-black to-lol-dark rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Lore</h2>
                <p className="text-gray-300 leading-relaxed">{cleanDescription(champion.lore)}</p>
            </div>

            {/* Abilities */}
            <div className="bg-gradient-to-br from-black to-lol-dark rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6">Abilities - Source: <span className="text-gray-400">{champion.partype}</span></h2>
                
                {/* Passive */}
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2">
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/passive/${champion.passive.image.full}`}
                            alt={champion.passive.name}
                            className="w-12 h-12 rounded-lg border border-yellow-500"
                        />

                        <h3 className="text-xl font-bold">{champion.passive.name} (Passive)</h3>
                    </div>

                    <p className="text-gray-300">{cleanDescription(champion.passive.description)}</p>
                </div>

                {/* Active Abilities */}
                {champion.spells.map((spell, index) => (
                    <div key={spell.id} className="mb-6 last:mb-0">
                        <div className="flex items-center gap-4 mb-2">
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/spell/${spell.image.full}`}
                                alt={spell.name}
                                className="w-12 h-12 rounded-lg border border-yellow-500"
                            />

                            <h3 className="text-xl font-bold">{spell.name} ({['Q', 'W', 'E', 'R'][index]})</h3>
                        </div>

                        <p className="text-gray-300">{cleanDescription(spell.description)}</p>
                    </div>
                ))}
            </div>

            {/* Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {champion.allytips && champion.allytips.length > 0 && (
                    <div className="bg-gradient-to-br from-black to-lol-dark rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Playing as {champion.name}</h2>

                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {champion.allytips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {champion.enemytips && champion.enemytips.length > 0 && (
                    <div className="bg-gradient-to-br from-black to-lol-dark rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Playing against {champion.name}</h2>

                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {champion.enemytips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Skins */}
            {champion.skins && champion.skins.length > 1 && (
                <div className="bg-gradient-to-br from-black to-lol-dark rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">Available Skins</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {champion.skins
                            .filter(skin => skin.name !== "default") // Skip default skin
                            .map((skin) => (
                                <div key={skin.id} className="relative group">
                                    <img
                                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`}
                                        alt={skin.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg">
                                        <p className="text-white font-semibold">{skin.name}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}