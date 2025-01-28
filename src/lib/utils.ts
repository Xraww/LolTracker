import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Fonction pour fusionner les classes Tailwind de manière optimisée
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Fonction pour formater les dates
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Fonction pour calculer le KDA
export function calculateKDA(kills: number, deaths: number, assists: number): string {
    const kda = deaths === 0 ? 'Perfect' : ((kills + assists) / deaths).toFixed(2);
    return kda;
}

// Fonction pour formater les grands nombres
export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Fonction pour calculer le win rate
export function calculateWinRate(wins: number, totalGames: number): string {
    return ((wins / totalGames) * 100).toFixed(1) + '%';
} 