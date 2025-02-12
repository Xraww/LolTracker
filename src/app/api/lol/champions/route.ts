import { NextResponse } from 'next/server';

interface Champion {
    id: string;
    name: string;
    title: string;
    roles: string[];
    image: {
        full: string;
    };
    tags: string[];
}

interface ChampionResponse {
    data: {
        [key: string]: Champion;
    };
}

// Manual role assignments for champions
const CHAMPION_ROLES: { [key: string]: string } = {
    // Top laners
    'Aatrox': 'TOP',
    'Ambessa': 'TOP',
    'Camille': 'TOP',
    "Chogath": 'TOP',
    'Darius': 'TOP',
    "DrMundo": 'TOP',
    'Fiora': 'TOP',
    'Gangplank': 'TOP',
    'Garen': 'TOP',
    'Gnar': 'TOP',
    'Gragas': 'TOP',
    'Gwen': 'TOP',
    'Illaoi': 'TOP',
    'Irelia': 'TOP',
    'Jax': 'TOP',
    'Jayce': 'TOP',
    'Kayle': 'TOP',
    'Kennen': 'TOP',
    'Kled': 'TOP',
    'Malphite': 'TOP',
    'Mordekaiser': 'TOP',
    'Nasus': 'TOP',
    'Olaf': 'TOP',
    'Ornn': 'TOP',
    'Pantheon': 'TOP',
    'Poppy': 'TOP',
    'Quinn': 'TOP',
    'Renekton': 'TOP',
    'Riven': 'TOP',
    'Rumble': 'TOP',
    'Sett': 'TOP',
    'Shen': 'TOP',
    'Singed': 'TOP',
    'Sion': 'TOP',
    'Teemo': 'TOP',
    'TahmKench': 'TOP',
    'Tryndamere': 'TOP',
    'Urgot': 'TOP',
    'Volibear': 'TOP',
    'Yorick': 'TOP',
    'KSante': 'TOP',

    // Junglers
    'Amumu': 'JUNGLE',
    'Belveth': 'JUNGLE',
    'Briar': 'JUNGLE',
    'Diana': 'JUNGLE',
    'Ekko': 'JUNGLE',
    'Elise': 'JUNGLE',
    'Evelynn': 'JUNGLE',
    'Fiddlesticks': 'JUNGLE',
    'Graves': 'JUNGLE',
    'Hecarim': 'JUNGLE',
    'Ivern': 'JUNGLE',
    'JarvanIV': 'JUNGLE',
    'Karthus': 'JUNGLE',
    'Kayn': 'JUNGLE',
    'Khazix': 'JUNGLE',
    'Kindred': 'JUNGLE',
    'LeeSin': 'JUNGLE',
    'Lillia': 'JUNGLE',
    'Maokai': 'JUNGLE',
    'MasterYi': 'JUNGLE',
    'Nidalee': 'JUNGLE',
    'Nocturne': 'JUNGLE',
    'Nunu': 'JUNGLE',
    'Rammus': 'JUNGLE',
    'RekSai': 'JUNGLE',
    'Rengar': 'JUNGLE',
    'Sejuani': 'JUNGLE',
    'Shaco': 'JUNGLE',
    'Shyvana': 'JUNGLE',
    'Skarner': 'JUNGLE',
    'Trundle': 'JUNGLE',
    'Udyr': 'JUNGLE',
    'Vi': 'JUNGLE',
    'Viego': 'JUNGLE',
    'Warwick': 'JUNGLE',
    'MonkeyKing': 'JUNGLE',
    'XinZhao': 'JUNGLE',
    'Zac': 'JUNGLE',
    
    // Mid laners
    'Ahri': 'MID',
    'Akali': 'MID',
    'Anivia': 'MID',
    'Annie': 'MID',
    'Aurelion Sol': 'MID',
    'Azir': 'MID',
    'Cassiopeia': 'MID',
    'Corki': 'MID',
    'Fizz': 'MID',
    'Galio': 'MID',
    'Kassadin': 'MID',
    'Katarina': 'MID',
    'LeBlanc': 'MID',
    'Lissandra': 'MID',
    'Malzahar': 'MID',
    'Neeko': 'MID',
    'Orianna': 'MID',
    'Qiyana': 'MID',
    'Ryze': 'MID',
    'Swain': 'MID',
    'Sylas': 'MID',
    'Syndra': 'MID',
    'Taliyah': 'MID',
    'Talon': 'MID',
    'TwistedFate': 'MID',
    'Veigar': 'MID',
    'Viktor': 'MID',
    'Vladimir': 'MID',
    'Xerath': 'MID',
    'Yasuo': 'MID',
    'Yone': 'MID',
    'Zed': 'MID',
    'Ziggs': 'MID',
    'Zoe': 'MID',

    // ADCs
    'Aphelios': 'ADC',
    'Ashe': 'ADC',
    'Caitlyn': 'ADC',
    'Draven': 'ADC',
    'Ezreal': 'ADC',
    'Jhin': 'ADC',
    'Jinx': 'ADC',
    'Kaisa': 'ADC',
    'Kalista': 'ADC',
    'KogMaw': 'ADC',
    'Lucian': 'ADC',
    'MissFortune': 'ADC',
    'Nilah': 'ADC',
    'Samira': 'ADC',
    'Senna': 'ADC',
    'Sivir': 'ADC',
    'Tristana': 'ADC',
    'Twitch': 'ADC',
    'Varus': 'ADC',
    'Vayne': 'ADC',
    'Xayah': 'ADC',
    'Zeri': 'ADC',

    // Supports
    'Alistar': 'SUPPORT',
    'Bard': 'SUPPORT',
    'Blitzcrank': 'SUPPORT',
    'Brand': 'SUPPORT',
    'Braum': 'SUPPORT',
    'Janna': 'SUPPORT',
    'Karma': 'SUPPORT',
    'Leona': 'SUPPORT',
    'Lulu': 'SUPPORT',
    'Lux': 'SUPPORT',
    'Milio': 'SUPPORT',
    'Morgana': 'SUPPORT',
    'Nami': 'SUPPORT',
    'Nautilus': 'SUPPORT',
    'Pyke': 'SUPPORT',
    'Rakan': 'SUPPORT',
    'Rell': 'SUPPORT',
    'Renata': 'SUPPORT',
    'Seraphine': 'SUPPORT',
    'Sona': 'SUPPORT',
    'Soraka': 'SUPPORT',
    'Taric': 'SUPPORT',
    'Thresh': 'SUPPORT',
    'Velkoz': 'SUPPORT',
    'Yuumi': 'SUPPORT',
    'Zilean': 'SUPPORT',
    'Zyra': 'SUPPORT',
};

export async function GET() {
    try {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/15.3.1/data/en_US/champion.json');
        const data: ChampionResponse = await response.json();

        const champions = Object.values(data.data);
        const championsByRole: { [key: string]: Champion[] } = {
            TOP: [],
            JUNGLE: [],
            MID: [],
            ADC: [],
            SUPPORT: []
        };

        champions.forEach(champion => {
            // Use manual role assignment instead of tag-based logic
            const role = CHAMPION_ROLES[champion.id] || 'MID'; // Default to MID if no role assigned
            championsByRole[role].push(champion);
        });

        return NextResponse.json(championsByRole);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch champion data' },
            { status: 500 }
        );
    }
} 