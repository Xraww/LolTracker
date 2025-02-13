export const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return '1m';
};

export const getItemName = (itemId: number, itemNames: { [key: string]: string }): string => {
    return itemId > 0 ? (itemNames[itemId] || `Item ${itemId}`) : '';
};

export const getSummonerSpellById = (spellId: number): string => {
    const spellMap: { [key: number]: string } = {
        21: 'SummonerBarrier',
        1: 'SummonerBoost',
        14: 'SummonerDot',
        3: 'SummonerExhaust',
        4: 'SummonerFlash',
        6: 'SummonerHaste',
        7: 'SummonerHeal',
        13: 'SummonerMana',
        30: 'SummonerPoroRecall',
        31: 'SummonerPoroThrow',
        11: 'SummonerSmite',
        39: 'SummonerSnowURFSnowball_Mark',
        32: 'SummonerSnowball',
        12: 'SummonerTeleport',
        54: 'Summoner_UltBookPlaceholder',
        55: 'Summoner_UltBookSmitePlaceholder',
    };
    return spellMap[spellId] || 'SummonerFlash';
};

export const getRuneById = (runeId: number): { path: string, key: string, imageName: string } => {
    const runeMap: { [key: number]: { path: string, key: string, imageName: string } } = {
        // Precision
        8005: { path: 'Precision', key: 'PressTheAttack', imageName: 'PressTheAttack' },
        8008: { path: 'Precision', key: 'LethalTempo', imageName: 'LethalTempoTemp' },
        8021: { path: 'Precision', key: 'FleetFootwork', imageName: 'FleetFootwork' },
        8010: { path: 'Precision', key: 'Conqueror', imageName: 'Conqueror' },
        // Domination
        8112: { path: 'Domination', key: 'Electrocute', imageName: 'Electrocute' },
        8124: { path: 'Domination', key: 'Predator', imageName: 'Predator' },
        8128: { path: 'Domination', key: 'DarkHarvest', imageName: 'DarkHarvest' },
        9923: { path: 'Domination', key: 'HailOfBlades', imageName: 'HailOfBlades' },
        // Sorcery
        8214: { path: 'Sorcery', key: 'SummonAery', imageName: 'SummonAery' },
        8229: { path: 'Sorcery', key: 'ArcaneComet', imageName: 'ArcaneComet' },
        8230: { path: 'Sorcery', key: 'PhaseRush', imageName: 'PhaseRush' },
        // Resolve
        8437: { path: 'Resolve', key: 'GraspOfTheUndying', imageName: 'GraspOfTheUndying' },
        8439: { path: 'Resolve', key: 'VeteranAftershock', imageName: 'VeteranAftershock' },
        8465: { path: 'Resolve', key: 'Guardian', imageName: 'Guardian' },
        // Inspiration
        8351: { path: 'Inspiration', key: 'GlacialAugment', imageName: 'GlacialAugment' },
        8360: { path: 'Inspiration', key: 'UnsealedSpellbook', imageName: 'UnsealedSpellbook' },
        8369: { path: 'Inspiration', key: 'FirstStrike', imageName: 'FirstStrike' },
    };
    return runeMap[runeId] || { path: 'Precision', key: 'PressTheAttack', imageName: 'PressTheAttack' };
};

export const getRuneStyleById = (styleId: number): { id: string, name: string } => {
    const styleMap: { [key: number]: { id: string, name: string } } = {
        8000: { id: '7201', name: 'Precision' },
        8100: { id: '7200', name: 'Domination' },
        8200: { id: '7202', name: 'Sorcery' },
        8300: { id: '7203', name: 'Whimsy' },
        8400: { id: '7204', name: 'Resolve' },
    };
    return styleMap[styleId] || { id: '7201', name: 'Precision' };
}; 