'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faTwitter, faReddit } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="mt-20 w-full bg-gradient-to-br from-black to-lol-dark text-white py-8 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
                    {/* About Section */}
                    <div className="col-span-1">
                        <h4 className="text-lg md:text-xl font-bold mb-4 text-lol-gold">{t.footer.about.title}</h4>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            {t.footer.about.description}
                        </p>
                        <div className="flex gap-4 mt-4 md:mt-6">
                            <a href="#" className="text-gray-400 hover:text-lol-gold transition-colors">
                                <FontAwesomeIcon icon={faDiscord} className="text-lg md:text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-lol-gold transition-colors">
                                <FontAwesomeIcon icon={faTwitter} className="text-lg md:text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-lol-gold transition-colors">
                                <FontAwesomeIcon icon={faGithub} className="text-lg md:text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* League of Legends Section */}
                    <div className="col-span-1">
                        <h4 className="text-lg md:text-xl font-bold mb-4 text-lol-gold">{t.footer.leagueOfLegends.title}</h4>
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

                    {/* Community Section */}
                    <div className="col-span-1">
                        <h4 className="text-lg md:text-xl font-bold mb-4 text-lol-gold">{t.footer.community.title}</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <FontAwesomeIcon icon={faDiscord} className="text-[#5865F2]" />
                                    {t.footer.community.discord}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <FontAwesomeIcon icon={faTwitter} className="text-[#1DA1F2]" />
                                    {t.footer.community.twitter}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <FontAwesomeIcon icon={faGithub} />
                                    {t.footer.community.github}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <FontAwesomeIcon icon={faReddit} className="text-[#FF4500]" />
                                    {t.footer.community.reddit}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div className="col-span-1">
                        <h4 className="text-lg md:text-xl font-bold mb-4 text-lol-gold">{t.footer.resources.title}</h4>
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
                <div className="pt-6 md:pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs md:text-sm space-y-4 md:space-y-0">
                        <p>{t.footer.bottom.rights.replace('{year}', new Date().getFullYear().toString())}</p>
                        <div className="flex gap-4 md:gap-6">
                            <a href="#" className="hover:text-white transition-colors">
                                {t.footer.bottom.privacyPolicy}
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                {t.footer.bottom.termsOfService}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 