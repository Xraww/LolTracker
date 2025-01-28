'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="mt-20 w-full bg-gradient-to-br from-black to-valorant-dark text-white py-16">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-12">
                {/* About Section */}
                <div className="col-span-1">
                    <h4 className="text-xl font-bold mb-4 text-lol-gold">About Us</h4>
                    <p className="text-gray-400 leading-relaxed">
                        Providing the best gaming statistics and analysis for League of Legends and Valorant players.
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
                    <h4 className="text-xl font-bold mb-4 text-lol-gold">League of Legends</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Search Player</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Leaderboard</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Pro Matches</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Champions Stats</a>
                        </li>
                    </ul>
                </div>

                {/* Valorant Section */}
                <div className="col-span-1">
                    <h4 className="text-xl font-bold mb-4 text-valorant-red">Valorant</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Search Player</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Leaderboard</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Pro Matches</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Agents Stats</a>
                        </li>
                    </ul>
                </div>

                {/* Resources Section */}
                <div className="col-span-1">
                    <h4 className="text-xl font-bold mb-4 text-white">Resources</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">API</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-white/10">
                <div className="flex justify-between items-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} GG.Tracker - Xraww. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
} 