'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '@/context/LanguageContext';

const FrenchFlag = () => (
    <svg className="w-5 h-5" viewBox="0 0 640 480">
        <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="#fff" d="M0 0h640v480H0z"/>
            <path fill="#00267f" d="M0 0h213.3v480H0z"/>
            <path fill="#f31830" d="M426.7 0H640v480H426.7z"/>
        </g>
    </svg>
);

const BritishFlag = () => (
    <svg className="w-5 h-5" viewBox="0 0 640 480">
        <path fill="#012169" d="M0 0h640v480H0z"/>
        <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
        <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
        <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
        <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
    </svg>
);

const languages = [
    { code: 'en', name: 'English', Flag: BritishFlag },
    { code: 'fr', name: 'Français', Flag: FrenchFlag }
] as const;

const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = (langCode: 'en' | 'fr') => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    const selectedLanguage = languages.find(lang => lang.code === language);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {/* Language Menu */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 mb-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className="w-full px-4 py-3 flex items-center gap-3 text-white/80 hover:bg-white/10 transition-colors"
                        >
                            <lang.Flag />
                            <span className="flex-grow text-left">{lang.name}</span>
                            {language === lang.code && (
                                <FontAwesomeIcon 
                                    icon={faCheck} 
                                    className="text-valorant-red text-sm"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Language Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group w-[45px] h-[45px] flex items-center justify-center rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all hover:border-white/40 hover:bg-black/90"
                title={selectedLanguage?.name}
            >
                {selectedLanguage && (
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <selectedLanguage.Flag />
                    </div>
                )}
                <FontAwesomeIcon 
                    icon={faGlobe} 
                    className={`transition-all duration-300 ${isOpen ? 'rotate-180 opacity-0' : 'group-hover:opacity-0'}`}
                />
            </button>
        </div>
    );
};

export default LanguageSelector; 