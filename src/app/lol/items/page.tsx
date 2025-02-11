'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getCurrentLoLVersion } from '@/lib/api-utils';

interface Item {
    id: string;
    name: string;
    description: string;
    gold: {
        base: number;
        total: number;
        sell: number;
        purchasable: boolean;
    };
    image: {
        full: string;
    };
    tags: string[];
    maps: {
        [key: string]: boolean;
    };
    stats: {
        FlatHPPoolMod?: number;
        FlatMPPoolMod?: number;
        FlatPhysicalDamageMod?: number;
        FlatMagicDamageMod?: number;
        PercentAttackSpeedMod?: number;
        FlatArmorMod?: number;
        FlatSpellBlockMod?: number;
        FlatMovementSpeedMod?: number;
        PercentMovementSpeedMod?: number;
        FlatCritChanceMod?: number;
        PercentLifeStealMod?: number;
    };
    from?: string[];
}

// Helper function to format stats
const formatStat = (key: string, value: number): string => {
    const statMappings: { [key: string]: string } = {
        FlatHPPoolMod: 'Health',
        FlatMPPoolMod: 'Mana',
        FlatPhysicalDamageMod: 'Attack Damage',
        FlatMagicDamageMod: 'Ability Power',
        PercentAttackSpeedMod: '% Attack Speed',
        FlatArmorMod: 'Armor',
        FlatSpellBlockMod: 'Magic Resist',
        FlatMovementSpeedMod: 'Movement Speed',
        PercentMovementSpeedMod: '% Movement Speed',
        FlatCritChanceMod: '% Critical Strike Chance',
        PercentLifeStealMod: '% Life Steal'
    };

    const statName = statMappings[key] || key;
    const isPercent = key.includes('Percent');
    const formattedValue = isPercent ? `${(value * 100).toFixed(0)}` : value.toString();
    
    return `${formattedValue} ${statName}`;
};

interface ParsedItemDescription {
    stats: string[];
    passives: { name: string; description: string }[];
}

// Helper function to parse item description
const parseItemDescription = (description: string): ParsedItemDescription => {
    const result: ParsedItemDescription = {
        stats: [],
        passives: []
    };

    if (!description) return result;

    // Extract stats section first
    const statsMatch = description.match(/<stats>(.*?)<\/stats>/);
    if (statsMatch) {
        const statsText = statsMatch[1]
            .replace(/<attention>/g, '')
            .replace(/<\/attention>/g, '')
            .split('<br>')
            .map(stat => stat.trim())
            .filter(Boolean);
        
        result.stats = statsText;
    }

    // Extract passive/active abilities using regex
    const passiveRegex = /<passive>(.*?)<\/passive>(.*?)(?=<passive>|<active>|$)/g;
    const activeRegex = /<active>(.*?)<\/active>(.*?)(?=<passive>|<active>|$)/g;
    const mythicRegex = /<mythicPassive>(.*?)<\/mythicPassive>/g;

    let match;

    // Extract passive abilities
    while ((match = passiveRegex.exec(description)) !== null) {
        const name = match[1].trim();
        let desc = match[2]
            .replace(/<mainText>|<\/mainText>/g, '')
            .replace(/<br>/g, ' ')
            .replace(/<stats>.*?<\/stats>/g, '')
            .replace(/<attention>|<\/attention>/g, '')
            .replace(/<active>|<\/active>/g, '')
            .replace(/<passive>|<\/passive>/g, '')
            .replace(/<unique>|<\/unique>/g, '')
            .replace(/<rarityMythic>|<\/rarityMythic>/g, '')
            .replace(/<rarityLegendary>|<\/rarityLegendary>/g, '')
            .replace(/<scaleAP>|<\/scaleAP>/g, '')
            .replace(/<scaleAD>|<\/scaleAD>/g, '')
            .replace(/<scaleMana>|<\/scaleMana>/g, '')
            .replace(/<scaleHealth>|<\/scaleHealth>/g, '')
            .replace(/<scaleMR>|<\/scaleMR>/g, '')
            .replace(/<scaleArmor>|<\/scaleArmor>/g, '')
            .replace(/<scaleLevel>|<\/scaleLevel>/g, '')
            .replace(/<rules>|<\/rules>/g, '')
            .replace(/<flavorText>|<\/flavorText>/g, '')
            .replace(/<keywordMajor>|<\/keywordMajor>/g, '')
            .replace(/<keywordStealth>|<\/keywordStealth>/g, '')
            .replace(/<magicDamage>|<\/magicDamage>/g, '')
            .replace(/<physicalDamage>|<\/physicalDamage>/g, '')
            .replace(/<trueDamage>|<\/trueDamage>/g, '')
            .replace(/<healing>|<\/healing>/g, '')
            .replace(/<shield>|<\/shield>/g, '')
            .replace(/<status>|<\/status>/g, '')
            .replace(/<ornnBonus>|<\/ornnBonus>/g, '')
            .replace(/<li>|<\/li>/g, '\n• ')
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        result.passives.push({
            name: `PASSIVE - ${name}`,
            description: desc
        });
    }

    // Extract active abilities
    while ((match = activeRegex.exec(description)) !== null) {
        const name = match[1].trim();
        let desc = match[2]
            .replace(/<mainText>|<\/mainText>/g, '')
            .replace(/<br>/g, ' ')
            .replace(/<stats>.*?<\/stats>/g, '')
            .replace(/<attention>|<\/attention>/g, '')
            .replace(/<active>|<\/active>/g, '')
            .replace(/<passive>|<\/passive>/g, '')
            .replace(/<unique>|<\/unique>/g, '')
            .replace(/<rarityMythic>|<\/rarityMythic>/g, '')
            .replace(/<rarityLegendary>|<\/rarityLegendary>/g, '')
            .replace(/<scaleAP>|<\/scaleAP>/g, '')
            .replace(/<scaleAD>|<\/scaleAD>/g, '')
            .replace(/<scaleMana>|<\/scaleMana>/g, '')
            .replace(/<scaleHealth>|<\/scaleHealth>/g, '')
            .replace(/<scaleMR>|<\/scaleMR>/g, '')
            .replace(/<scaleArmor>|<\/scaleArmor>/g, '')
            .replace(/<scaleLevel>|<\/scaleLevel>/g, '')
            .replace(/<rules>|<\/rules>/g, '')
            .replace(/<flavorText>|<\/flavorText>/g, '')
            .replace(/<keywordMajor>|<\/keywordMajor>/g, '')
            .replace(/<keywordStealth>|<\/keywordStealth>/g, '')
            .replace(/<magicDamage>|<\/magicDamage>/g, '')
            .replace(/<physicalDamage>|<\/physicalDamage>/g, '')
            .replace(/<trueDamage>|<\/trueDamage>/g, '')
            .replace(/<healing>|<\/healing>/g, '')
            .replace(/<shield>|<\/shield>/g, '')
            .replace(/<status>|<\/status>/g, '')
            .replace(/<ornnBonus>|<\/ornnBonus>/g, '')
            .replace(/<li>|<\/li>/g, '\n• ')
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        result.passives.push({
            name: `ACTIVE - ${name}`,
            description: desc
        });
    }

    // Extract mythic passives
    while ((match = mythicRegex.exec(description)) !== null) {
        let desc = match[1]
            .replace(/<mainText>|<\/mainText>/g, '')
            .replace(/<br>/g, ' ')
            .replace(/<stats>.*?<\/stats>/g, '')
            .replace(/<attention>|<\/attention>/g, '')
            .replace(/<active>|<\/active>/g, '')
            .replace(/<passive>|<\/passive>/g, '')
            .replace(/<unique>|<\/unique>/g, '')
            .replace(/<rarityMythic>|<\/rarityMythic>/g, '')
            .replace(/<rarityLegendary>|<\/rarityLegendary>/g, '')
            .replace(/<scaleAP>|<\/scaleAP>/g, '')
            .replace(/<scaleAD>|<\/scaleAD>/g, '')
            .replace(/<scaleMana>|<\/scaleMana>/g, '')
            .replace(/<scaleHealth>|<\/scaleHealth>/g, '')
            .replace(/<scaleMR>|<\/scaleMR>/g, '')
            .replace(/<scaleArmor>|<\/scaleArmor>/g, '')
            .replace(/<scaleLevel>|<\/scaleLevel>/g, '')
            .replace(/<rules>|<\/rules>/g, '')
            .replace(/<flavorText>|<\/flavorText>/g, '')
            .replace(/<keywordMajor>|<\/keywordMajor>/g, '')
            .replace(/<keywordStealth>|<\/keywordStealth>/g, '')
            .replace(/<magicDamage>|<\/magicDamage>/g, '')
            .replace(/<physicalDamage>|<\/physicalDamage>/g, '')
            .replace(/<trueDamage>|<\/trueDamage>/g, '')
            .replace(/<healing>|<\/healing>/g, '')
            .replace(/<shield>|<\/shield>/g, '')
            .replace(/<status>|<\/status>/g, '')
            .replace(/<ornnBonus>|<\/ornnBonus>/g, '')
            .replace(/<li>|<\/li>/g, '\n• ')
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        result.passives.push({
            name: 'MYTHIC PASSIVE',
            description: desc
        });
    }

    return result;
};

export default function Items() {
    const { t } = useLanguage();
    const [items, setItems] = useState<Item[]>([]);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentVersion, setCurrentVersion] = useState('');
    const [filters, setFilters] = useState({search: '',});

    // Categories to display
    const categories = [
        { id: 'Starter', title: t.lol.itemsPage.filters.starter },
        { id: 'Consumable', title: t.lol.itemsPage.filters.consumable },
        { id: 'Trinket', title: t.lol.itemsPage.filters.trinket },
        { id: 'Boots', title: t.lol.itemsPage.filters.boots },
        { id: 'Basic', title: t.lol.itemsPage.filters.basic },
        { id: 'Epic', title: t.lol.itemsPage.filters.epic },
        { id: 'Legendary', title: t.lol.itemsPage.filters.legendary },
    ];

    // Manual item categories
    const itemCategories: Record<string, string[]> = {
        Starter: [
            '1101', // Scorchclaw Pup
            '1102', // Gustwalker Hatchling
            '1103', // Mosstomper Seedling
            '1082', // Dark Seal
            '1054', // Doran's Shield
            '1055', // Doran's Blade
            '1056', // Doran's Ring
            '1083', // Cull
            '2051', // Guardian's Horn
            '3070', // Tear of the Goddess
            '3112', // Guardian's Orb
            '3177', // Guardian's Blade
            '3184', // Guardian's Hammer
            '3865', // World Atlas
        ],
        Consumable: [
            '2003', // Health Potion
            '2031', // Refillable Potion
            '2033', // Corrupting Potion
            '2055', // Control Ward
            '2138', // Elixir of Iron
            '2139', // Elixir of Sorcery
            '2140', // Elixir of Wrath
        ],
        Trinket: [
            '3330', // Scarecrow Effigy
            '3340', // Stealth Ward
            '3363', // Farsight Alteration
            '3364', // Oracle Lens
        ],
        Basic: [
            // Basic items (usually components, cost < 1500)
            '1026', // Blasting Wand
            '1027', // Sapphire Crystal
            '1028', // Ruby Crystal
            '1029', // Cloth Armor
            '1036', // Long Sword
            '1037', // Pickaxe
            '1038', // B.F. Sword
            '1042', // Dagger
            '1052', // Amplifying Tome
            '1058', // Needlessly Large Rod
            '1018', // Cloak of Agility
            '1004', // Faerie Charm
            '2022', // Glowing Mote
            '1033', // Null-Magic Mantle
            '1006', // Rejuvenation Bead
        ],
        Epic: [
            // Epic items (intermediate items that build into legendaries)
            '3035', // Last Whisper
            '3044', // Phage
            '3051', // Hearthbound Axe
            '3057', // Sheen
            '3066', // Winged Moonplate
            '3076', // Bramble Vest
            '3082', // Warden's Mail
            '3086', // Zeal
            '3853', // Shard of True Ice
            '3857', // Pauldrons of Whiterock
            '3858', // Relic Shield
            '3859', // Targon's Buckler
            '3860', // Bulwark of the Mountain
            '3862', // Spectral Sickle
            '3863', // Harrowing Crescent
            '3864', // Black Mist Scythe
            '6670', // Noonquiver
            '6677', // Rageknife
            '3105', // Aegis of the Legion
            '6660', // Tiamat
            '4642', // Bandleglass Mirror
            '4630', // Blighting Jewel
            '3133', // Caulfield's Warhammer
            '1031', // Chain Vest
            '3123', // Executioner's Calling
            '3108', // Fiendish Codex
            '3024', // Glacial Buckler
            '3155', // Hexdrinker
            '3145', // Hextech Alternator
            '3067', // Kindlegem
            '1057', // Negatron Cloak
            '3916', // Oblivion Orb
            '1043', // Recurve Bow
            '3134', // Serrated Dirk
            '4632', // Verdant Barrier
        ],
        Legendary: [
            // Legendary/Mythic items (final items)
            '2065', // Shurelya's Battlesong
            '3001', // Evenshroud
            '3003', // Archangel's Staff
            '3004', // Manamune
            '3011', // Chemtech Putrifier
            '3026', // Guardian Angel
            '3031', // Infinity Edge
            '3033', // Mortal Reminder
            '3036', // Lord Dominik's Regards
            '3040', // Seraph's Embrace
            '3041', // Mejai's Soulstealer
            '3042', // Muramana
            '3046', // Phantom Dancer
            '3050', // Zeke's Convergence
            '3053', // Sterak's Gage
            '3065', // Spirit Visage
            '3068', // Sunfire Aegis
            '3071', // Black Cleaver
            '3072', // Bloodthirster
            '3074', // Ravenous Hydra
            '3075', // Thornmail
            '3083', // Warmog's Armor
            '3085', // Runaan's Hurricane
            '3089', // Rabadon's Deathcap
            '3091', // Wit's End
            '3094', // Rapid Firecannon
            '3095', // Stormrazor
            '3100', // Lich Bane
            '3102', // Banshee's Veil
            '3107', // Redemption
            '3109', // Knight's Vow
            '3110', // Frozen Heart
            '3115', // Nashor's Tooth
            '3116', // Rylai's Crystal Scepter
            '3119', // Winter's Approach
            '3121', // Fimbulwinter
            '3124', // Guinsoo's Rageblade
            '3135', // Void Staff
            '3139', // Mercurial Scimitar
            '3142', // Youmuu's Ghostblade
            '3143', // Randuin's Omen
            '3153', // Blade of the Ruined King
            '3156', // Maw of Malmortius
            '3157', // Zhonya's Hourglass
            '3161', // Spear of Shojin
            '3165', // Morellonomicon
            '3179', // Umbral Glaive
            '3181', // Hullbreaker
            '3193', // Gargoyle Stoneplate
            '3222', // Mikael's Blessing
            '3504', // Ardent Censer
            '3508', // Essence Reaver
            '3742', // Dead Man's Plate
            '3748', // Titanic Hydra
            '3814', // Edge of Night
            '4005', // Imperial Mandate
            '4401', // Force of Nature
            '4628', // Horizon Focus
            '4629', // Cosmic Drive
            '4637', // Demonic Embrace
            '4644', // Crown of the Shattered Queen
            '4645', // Shadowflame
            '6035', // Edge of Night
            '6333', // Death's Dance
            '6609', // Chempunk Chainsword
            '6616', // Staff of Flowing Water
            '6664', // Turbo Chemtank
            '6665', // Jak'Sho, The Protean
            '6667', // Radiant Virtue
            '6671', // Galeforce
            '6672', // Kraken Slayer
            '6673', // Immortal Shieldbow
            '6675', // Navori Quickblades
            '6676', // The Collector
            '6694', // Sunfire Aegis
            '6695', // Serpent's Fang
            '6696', // Silvermere Dawn
        ],
        Boots: [
            '1001', // Boots
            '3006', // Berserker's Greaves
            '3009', // Boots of Swiftness
            '3020', // Sorcerer's Shoes
            '3047', // Plated Steelcaps
            '3111', // Mercury's Treads
            '3117', // Mobility Boots
            '3158', // Ionian Boots of Lucidity
            '3001', // Evenshroud
            '3010', // Symbiotic Soles
            '3173', // Chainlaced Crushers
            '3177', // Synchronized Souls
            '3174', // Armored Advance
            '3175', // Spellslinger's Shoes
            '3172', // Gunmetal Greaves
            '3170', // Swiftmarch
            '3176', // Forever Forward
            '3171', // Crimson Lucidity
        ],
    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const version = await getCurrentLoLVersion();
                setCurrentVersion(version);
                const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`);
                const data = await response.json();
                
                // Track added items by name to prevent duplicates
                const addedItemNames = new Set<string>();
                
                const itemsArray = Object.entries(data.data)
                    .map(([id, item]: [string, any]) => ({
                        id,
                        ...item
                    }))
                    .filter(item => {
                        // Only include items that:
                        // 1. Are available in Summoner's Rift (map 11)
                        // 2. Are purchasable
                        // 3. Have a price or are trinkets/elixirs
                        // 4. Are not consumables (except for Control Ward, Elixirs, and Trinkets)
                        const allowedConsumables = [
                            '2003', // Health Potion
                            '2031', // Refillable Potion
                            '2033', // Corrupting Potion
                            '2055', // Control Ward
                            '2138', // Elixir of Iron
                            '2139', // Elixir of Sorcery
                            '2140', // Elixir of Wrath
                            '3340', // Stealth Ward (Yellow)
                            '3363', // Farsight Alteration (Blue)
                            '3364'  // Oracle Lens (Red)
                        ];

                        const isTrinketOrElixir = item.tags?.includes('Trinket') || 
                                                (item.tags?.includes('Consumable') && item.id && allowedConsumables.includes(item.id));

                        return item.maps['11'] === true && 
                               (item.gold?.purchasable !== false || isTrinketOrElixir) && 
                               (item.gold?.total > 0 || isTrinketOrElixir) &&
                               (!item.tags?.includes('Consumable') || allowedConsumables.includes(item.id)) &&
                               !item.requiredChampion && // Remove champion-specific items
                               !item.requiredAlly && // Remove items requiring specific allies
                               item.inStore !== false; // Ensure item is available in store
                    })
                    .reduce((acc: any[], item) => {
                        // Only add item if it hasn't been added yet
                        if (!addedItemNames.has(item.name)) {
                            addedItemNames.add(item.name);
                            acc.push(item);
                        }
                        return acc;
                    }, []);
                
                setItems(itemsArray);
                setFilteredItems(itemsArray);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Apply filters
    useEffect(() => {
        let result = [...items];

        // Apply search filter
        if (filters.search) {
            result = result.filter(item =>
                item.name.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        setFilteredItems(result);
    }, [filters, items]);

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="bg-gray-300 h-48 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">{t.lol.itemsPage.title}</h1>

            {/* Search Input */}
            <div className="max-w-md mx-auto bg-gradient-to-br from-black to-lol-dark rounded-lg mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t.common.search}
                        className="w-full px-4 py-4 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C89B3C] text-sm"
                        value={filters.search}
                        onChange={(e) => setFilters({ search: e.target.value })}
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Items by Category */}
            <div className="space-y-8">
                {categories.map(category => {
                    const categoryItems = filteredItems.filter(item => 
                        itemCategories[category.id].includes(item.id)
                    );

                    if (categoryItems.length === 0) return null;

                    return (
                        <div key={category.id} className="bg-gradient-to-br from-black to-lol-dark rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4 text-[#C89B3C] flex items-center justify-between">
                                <span>{category.title}</span>
                                <span className="text-sm bg-black/40 px-2 py-1 rounded border border-[#C89B3C]/30">
                                    {categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'}
                                </span>
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {categoryItems.map(item => {
                                    const parsedDescription = parseItemDescription(item.description);
                                    return (
                                        <div
                                            key={`${category.id}-${item.id}`}
                                            className="relative group"
                                        >
                                            {/* Item Icon */}
                                            <div className="w-16 h-16 rounded border border-[#C89B3C]/30 hover:border-[#C89B3C]/60 transition-all duration-300 relative overflow-hidden cursor-pointer">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#C89B3C]/20 to-black/50" />
                                                <img
                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${item.image.full}`}
                                                    alt={item.name}
                                                    className="w-full h-full relative z-10"
                                                />
                                            </div>

                                            {/* Hover Card */}
                                            <div className="absolute z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-[300px]"
                                                style={{
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    top: '100%',
                                                }}
                                            >
                                                {/* Invisible padding to prevent flickering */}
                                                <div className="absolute -top-2 inset-x-0 h-4 bg-transparent" />
                                                
                                                <div className="relative bg-gradient-to-br from-black to-lol-dark border border-[#C89B3C]/30 rounded-lg p-4 shadow-[0_0_15px_rgba(0,0,0,0.5)] mt-2">
                                                    {/* Triangle pointer */}
                                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rotate-45 border-l border-t border-[#C89B3C]/30" />

                                                    <div className="flex items-center space-x-4">
                                                        {/* Image with gold border */}
                                                        <div className="relative">
                                                            <div className="absolute inset-0 bg-gradient-to-br from-[#C89B3C]/20 to-black/50 rounded" />
                                                            <img
                                                                src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${item.image.full}`}
                                                                alt={item.name}
                                                                className="w-12 h-12 rounded relative z-10"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                                                            <p className="text-[#C89B3C]">
                                                                {item.gold.total} ({item.gold.sell})
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Build Path */}
                                                    {item.from && item.from.length > 0 && (
                                                        <div className="mt-3 p-2 bg-black/40 rounded border border-[#C89B3C]/30">
                                                            <p className="text-xs text-[#C89B3C] mb-2">Build Path:</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {item.from.map((componentId: string, index: number) => {
                                                                    const component = items.find(i => i.id === componentId);
                                                                    return component ? (
                                                                        <div key={`${category.id}-${item.id}-build-${componentId}-${index}`} className="flex items-center gap-2">
                                                                            <div className="relative w-8 h-8 rounded border border-[#C89B3C]/30">
                                                                                <div className="absolute inset-0 bg-gradient-to-br from-[#C89B3C]/20 to-black/50" />
                                                                                <img
                                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${component.image.full}`}
                                                                                    alt={component.name}
                                                                                    className="w-full h-full relative z-10 rounded"
                                                                                />
                                                                            </div>
                                                                            <span className="text-xs text-gray-400">{component.name}</span>
                                                                        </div>
                                                                    ) : null;
                                                                })}
                                                            </div>
                                                            <p className="text-xs text-gray-400 mt-2">
                                                                + {item.gold.base} gold
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Stats */}
                                                    <div className="mt-3 space-y-1">
                                                        {Object.entries(item.stats || {}).map(([key, value]) => (
                                                            value >= 1 && (
                                                                <p key={`${category.id}-${item.id}-stat-${key}`} className="text-sm text-blue-200/90">
                                                                    {formatStat(key, value)}
                                                                </p>
                                                            )
                                                        ))}
                                                        {parsedDescription.stats
                                                            .filter(stat => {
                                                                const statMatch = stat.match(/([0-9.]+)(%?\s*.+)/);
                                                                if (!statMatch) return false;
                                                                
                                                                const value = parseFloat(statMatch[1]);
                                                                if (value < 1) return false;

                                                                const normalizedStatName = statMatch[2]
                                                                    .replace(/\+/g, '')
                                                                    .replace(/\s*%\s*/g, '')
                                                                    .replace(/move speed/i, 'movement speed')
                                                                    .replace(/magic pen/i, 'magic penetration')
                                                                    .replace(/ability haste/i, 'ability haste')
                                                                    .replace(/health regen/i, 'health regeneration')
                                                                    .replace(/mana regen/i, 'mana regeneration')
                                                                    .replace(/crit(?:ical)?\s*(?:strike)?(?:\s*chance)?/i, 'critical strike chance')
                                                                    .replace(/armor pen(?:etration)?/i, 'armor penetration')
                                                                    .trim()
                                                                    .toLowerCase();

                                                                const hasMatchInItemStats = Object.entries(item.stats || {}).some(([key, statValue]) => {
                                                                    if (statValue < 1) return false;
                                                                    const formattedStat = formatStat(key, statValue);
                                                                    const formattedMatch = formattedStat.match(/([0-9.]+)(%?\s*.+)/);
                                                                    if (!formattedMatch) return false;

                                                                    const formattedValue = parseFloat(formattedMatch[1]);
                                                                    const formattedName = formattedMatch[2]
                                                                        .replace(/\+/g, '')
                                                                        .replace(/\s*%\s*/g, '')
                                                                        .trim()
                                                                        .toLowerCase();

                                                                    return Math.abs(value - formattedValue) < 0.01 && 
                                                                           normalizedStatName === formattedName;
                                                                });

                                                                return !hasMatchInItemStats;
                                                            })
                                                            .map((stat, index) => (
                                                                <p key={`${category.id}-${item.id}-desc-stat-${index}`} className="text-sm text-blue-200/90">
                                                                    {stat}
                                                                </p>
                                                            ))}
                                                    </div>

                                                    {/* Passives */}
                                                    {parsedDescription.passives.length > 0 && (
                                                        <div className="mt-3 space-y-2">
                                                            {parsedDescription.passives.map((passive, index) => (
                                                                <div key={`${category.id}-${item.id}-passive-${index}`}>
                                                                    <p className="text-sm font-semibold text-[#C89B3C]">
                                                                        {passive.name}
                                                                    </p>
                                                                    <p className="text-sm text-gray-400/90">
                                                                        {passive.description}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Tags */}
                                                    {item.tags && (
                                                        <div className="mt-3 flex flex-wrap gap-2">
                                                            {item.tags.map(tag => (
                                                                <span
                                                                    key={`${category.id}-${item.id}-tag-${tag}`}
                                                                    className="px-2 py-1 text-xs rounded bg-black/40 text-[#C89B3C] border border-[#C89B3C]/30"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* No Results Message */}
            {!categories.some(category => 
                filteredItems.some(item => itemCategories[category.id].includes(item.id))
            ) && (
                <div className="text-center py-8">
                    <p className="text-gray-400 text-lg">
                        {t.common.noResults}
                    </p>
                </div>
            )}
        </div>
    );
}