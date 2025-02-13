'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/translations/en';
import { fr } from '@/translations/fr';

type Language = 'en' | 'fr';
type Translations = typeof en | typeof fr;

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}


const translations = {
    en,
    fr,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    // Initialiser avec la langue du navigateur ou en par défaut
    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            const savedLang = localStorage.getItem('language') as Language;

            if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
                return savedLang;
            }
            
            return 'en';
        }
        return 'en';
    });

    // Sauvegarder la langue dans le localStorage
    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    const value = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}; 