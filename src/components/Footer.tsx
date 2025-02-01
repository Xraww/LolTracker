'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="mt-20 w-full bg-gradient-to-br from-black to-valorant-dark text-white py-16">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-12">
                {/* About Section */}
                <div className="col-span-1">
                    <h4 className="text-xl font-bold mb-4 text-lol-gold">{t.footer.about.title}</h4>
                    <p className="text-gray-400 leading-relaxed">
                        {t.footer.about.description}
                    </p>
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="text-gray-400 hover:text-lol-gold transition-colors">
                            <FontAwesomeIcon icon={faDiscord} className="text-xl" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-lol-gold transition-colors">
                            <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-lol-gold transition-colors">
                            <FontAwesomeIcon icon={faGithub} className="text-xl" />
                        </a>
                    </div>
                </div>

                {/* League of Legends Section */}
                <div className="col-span-1">
                    <h4 className="text-xl font-bold mb-4 text-lol-gold">{t.footer.leagueOfLegends.title}</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.leagueOfLegends.searchPlayer}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.leagueOfLegends.leaderboard}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.leagueOfLegends.proMatches}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.leagueOfLegends.championsStats}
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Valorant Section */}
                <div className="col-span-1">
                    <h4 className="text-xl font-bold mb-4 text-valorant-red">{t.footer.valorant.title}</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.valorant.searchPlayer}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.valorant.leaderboard}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.valorant.proMatches}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.valorant.agentsStats}
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Resources Section */}
                <div className="col-span-1">
                    <h4 className="text-xl font-bold mb-4 text-white">{t.footer.resources.title}</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.resources.blog}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.resources.api}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.resources.support}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                {t.footer.resources.contact}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-white/10">
                <div className="flex justify-between items-center text-gray-400 text-sm">
                    <p>{t.footer.bottom.rights.replace('{year}', new Date().getFullYear().toString())}</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">
                            {t.footer.bottom.privacyPolicy}
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            {t.footer.bottom.termsOfService}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
} 