'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faChevronRight, 
    faCube, 
    faSquarePollVertical, 
    faList, 
    faChartLine, 
    faTrophy, 
    faChartPie, 
    faUsers 
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    return (
        <div className="pt-[150px] flex flex-col gap-[100px] relative">
            {/* Background Gradients */}
            {/* <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-valorant-red/30 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 -right-4 w-72 h-72 bg-lol-gold/30 rounded-full blur-[128px]" />
            </div> */}

            {/* First Section - Game Selection */}
            <section className="h-[80vh] flex justify-center items-center overflow-hidden relative">
                {/* LoL Side */}
                <div className="w-1/2 h-full bg-gradient-radial from-lol-gold/10 to-valorant-dark/90 flex items-center justify-center p-10">
                    <div className="flex flex-col items-center gap-8 text-center max-w-[500px]">
                        <img 
                            src="/images/games/lol/logo.png" 
                            alt="League of Legends" 
                            className="h-[120px] object-contain transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_20px_rgba(200,155,60,0.3)]"
                        />
                        <p className="text-xl text-gray-100 max-w-[400px] leading-relaxed">
                            Track your performance, analyze matches, and climb the ranks.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-lol-gold text-valorant-dark font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(200,155,60,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                                Search Player
                            </button>
                            <button className="px-6 py-3 bg-transparent text-white border-2 border-white/80 font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
                                Leaderboard
                            </button>
                        </div>
                        <div className="flex gap-5">
                            <div className="animate-float px-5 py-3 bg-white/10 backdrop-blur rounded-xl flex items-center gap-3 border border-white/20">
                                <FontAwesomeIcon icon={faChartLine} className="text-lol-gold text-lg"/>
                                <span className="text-white font-medium text-sm">Match History</span>
                            </div>
                            <div className="animate-float delay-1000 px-5 py-3 bg-white/10 backdrop-blur rounded-xl flex items-center gap-3 border border-white/20">
                                <FontAwesomeIcon icon={faTrophy} className="text-lol-gold text-lg"/>
                                <span className="text-white font-medium text-sm">Rankings</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-px h-4/5 my-auto bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                {/* Valorant Side */}
                <div className="w-1/2 h-full bg-gradient-radial from-valorant-red/10 to-valorant-dark/90 flex items-center justify-center p-10">
                    <div className="flex flex-col items-center gap-8 text-center max-w-[500px]">
                        <img 
                            src="/images/games/valorant/Logomark/V_Logomark_Red.png" 
                            alt="Valorant" 
                            className="h-[120px] object-contain transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_20px_rgba(255,70,84,0.3)]"
                        />
                        <p className="text-xl text-gray-100 max-w-[400px] leading-relaxed">
                            Master your agent performance and track your competitive progress.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-valorant-red text-white font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(255,70,84,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                                Search Player
                            </button>
                            <button className="px-6 py-3 bg-transparent text-white border-2 border-white/80 font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
                                Leaderboard
                            </button>
                        </div>
                        <div className="flex gap-5">
                            <div className="animate-float px-5 py-3 bg-white/10 backdrop-blur rounded-xl flex items-center gap-3 border border-white/20">
                                <FontAwesomeIcon icon={faChartPie} className="text-valorant-red text-lg"/>
                                <span className="text-white font-medium text-sm">Agent Stats</span>
                            </div>
                            <div className="animate-float delay-1000 px-5 py-3 bg-white/10 backdrop-blur rounded-xl flex items-center gap-3 border border-white/20">
                                <FontAwesomeIcon icon={faTrophy} className="text-valorant-red text-lg"/>
                                <span className="text-white font-medium text-sm">Rankings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Section - Features Overview */}
            <section className="h-[80vh] w-[80vw] mx-auto rounded-[40px] bg-gradient-to-[135deg] from-black/95 to-[rgb(20,20,20)]/90 relative overflow-hidden flex">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-valorant-red/10 to-transparent pointer-events-none" />
                
                <div className="flex-1 p-16 flex flex-col justify-center relative z-10">
                    <span className="text-valorant-red text-xl uppercase tracking-[3px] font-semibold mb-6">
                        Explore
                    </span>
                        <h2 className="text-5xl font-bold mb-6">
                            Track Your Progress Across Games
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                            Dive into our platform to analyze your performance in both League of Legends and Valorant. 
                            Get detailed statistics, competitive rankings, and stay ahead of the meta.
                    </p>
                    <div className="flex gap-4">
                            <button className="px-8 py-4 bg-valorant-red text-white font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(255,70,84,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                            Compare Players
                        </button>
                            <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                                Explore Stats <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-16 flex items-center">
                    <div className="grid grid-cols-2 gap-6 w-full">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors group"
                            >
                                <FontAwesomeIcon 
                                    icon={feature.icon} 
                                    className="text-3xl mb-4 text-valorant-red transition-colors"
                                />
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Third Section - Statistics */}
            <section className="min-h-[60vh] w-full mx-auto bg-gradient-to-br from-black to-valorant-dark relative overflow-hidden p-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lol-gold/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="relative z-10 text-center mb-16">
                    <span className="text-lol-gold text-xl uppercase tracking-[3px] font-semibold mb-4 block">
                        Statistics
                    </span>
                    <h2 className="text-4xl font-bold mb-4">In-Depth Gaming Analytics</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Access comprehensive statistics for both League of Legends and Valorant 
                        to enhance your competitive gameplay.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6 max-w-[1200px] mx-auto">
                    <div className="p-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-lol-gold/30 transition-all duration-300 hover:-translate-y-1 group">
                        <FontAwesomeIcon icon={faSquarePollVertical} className="text-3xl mb-4 text-lol-gold" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Performance Tracking</h3>
                            <p className="text-gray-400 leading-relaxed">Real-time match analysis and detailed performance metrics for both games</p>
                        </div>
                    </div>

                    <div className="p-8 -mt-6 bg-gradient-to-br from-lol-gold/20 to-black/60 backdrop-blur rounded-2xl border-2 border-lol-gold/30 hover:border-lol-gold/50 shadow-[0_0_15px_rgba(200,155,60,0.15)] transition-all duration-300 hover:-translate-y-2 group relative">
                        <div className="absolute -top-4 right-6 px-4 py-1.5 bg-gradient-to-r from-lol-gold/20 to-black/60 text-lol-gold text-sm rounded-full border border-lol-gold/30 font-semibold shadow-lg">
                            Popular
                        </div>
                        <FontAwesomeIcon icon={faTrophy} className="text-3xl mb-4 text-lol-gold" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Rank Progress</h3>
                            <p className="text-gray-400 leading-relaxed">Track your competitive journey from Iron to Radiant or Challenger</p>
                        </div>
                    </div>

                    <div className="p-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-lol-gold/30 transition-all duration-300 hover:-translate-y-1 group">
                        <FontAwesomeIcon icon={faChartPie} className="text-3xl mb-4 text-lol-gold" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Gameplay Analysis</h3>
                            <p className="text-gray-400 leading-relaxed">Deep insights into your Champion and Agent performance</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-12">
                    <button className="px-8 py-4 bg-lol-gold text-valorant-dark font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(200,155,60,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                        Start Tracking
                    </button>
                    <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                        View Leaderboards <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                    </button>
                </div>
            </section>

            {/* Fourth Section - Stats Showcase */}
            <section className="min-h-[60vh] w-[80vw] mx-auto rounded-[40px] bg-gradient-to-br from-black to-valorant-dark relative overflow-hidden p-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-valorant-red/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="stats-showcase flex gap-16 relative z-10">
                    {/* Stats Box */}
                    <div className="flex-1 bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <FontAwesomeIcon icon={faChartLine} className="text-3xl text-valorant-red" />
                            <h2 className="text-3xl font-bold">Track Your Journey</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 text-center">
                                <FontAwesomeIcon icon={faTrophy} className="text-2xl text-valorant-red mb-3" />
                                <span className="block text-3xl font-bold mb-2">10M+</span>
                                <p className="text-gray-400">Players Tracked</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 text-center">
                                <FontAwesomeIcon icon={faChartPie} className="text-2xl text-valorant-red mb-3" />
                                <span className="block text-3xl font-bold mb-2">50M+</span>
                                <p className="text-gray-400">Matches Analyzed</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 text-center">
                                <FontAwesomeIcon icon={faUsers} className="text-2xl text-valorant-red mb-3" />
                                <span className="block text-3xl font-bold mb-2">100K+</span>
                                <p className="text-gray-400">Daily Users</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 text-center">
                                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-valorant-red mb-3" />
                                <span className="block text-3xl font-bold mb-2">1B+</span>
                                <p className="text-gray-400">Stats Recorded</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 text-center">
                                <FontAwesomeIcon icon={faSquarePollVertical} className="text-2xl text-valorant-red mb-3" />
                                <span className="block text-3xl font-bold mb-2">2M+</span>
                                <p className="text-gray-400">Profiles Created</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 text-center">
                                <FontAwesomeIcon icon={faCube} className="text-2xl text-valorant-red mb-3" />
                                <span className="block text-3xl font-bold mb-2">24/7</span>
                                <p className="text-gray-400">Live Tracking</p>
                            </div>
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="flex-1 flex flex-col gap-8 justify-center">
                        <div className="p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex items-start gap-6">
                            <div className="p-4 bg-valorant-red/10 rounded-xl">
                                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-valorant-red" />
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold mb-2">Real-time Stats</h4>
                                <p className="text-gray-400 leading-relaxed">Track your performance as you play with instant updates and detailed analytics</p>
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex items-start gap-6">
                            <div className="p-4 bg-valorant-red/10 rounded-xl">
                                <FontAwesomeIcon icon={faSquarePollVertical} className="text-2xl text-valorant-red" />
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold mb-2">Global Rankings</h4>
                                <p className="text-gray-400 leading-relaxed">Compare yourself with players worldwide and track your progress</p>
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex items-start gap-6">
                            <div className="p-4 bg-valorant-red/10 rounded-xl">
                                <FontAwesomeIcon icon={faChartPie} className="text-2xl text-valorant-red" />
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold mb-2">Detailed Analysis</h4>
                                <p className="text-gray-400 leading-relaxed">Get insights into your gameplay with comprehensive statistics</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fifth Section - CTA */}
            <section className="min-h-[40vh] w-full mx-auto bg-gradient-to-br from-black to-valorant-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lol-gold/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-16 text-center">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-bold mb-6 text-lol-gold">
                            Join our League of Legends Community
                        </h2>
                        <p className="text-xl text-gray-300 mb-10">
                            Connect with fellow players, share strategies, and stay ahead of the curve 
                            with our comprehensive tools and insights.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 border border-lol-gold/30 hover:border-lol-gold/50">
                            Join Discord
                        </button>
                        <button className="px-8 py-4 bg-lol-gold text-valorant-dark font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(200,155,60,0.3)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                            Sign Up <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

const features = [
    {
        icon: faChartLine,
        title: "Match Analytics",
        description: "Track your performance with detailed match history and statistics"
    },
    {
        icon: faTrophy,
        title: "Competitive Rankings",
        description: "Compare yourself with top players and track your rank progression"
    },
    {
        icon: faChartPie,
        title: "Game Stats",
        description: "Champions and Agents statistics with win rates and trends"
    },
    {
        icon: faUsers,
        title: "Pro Scene",
        description: "Follow professional matches and player performances"
    }
];

const stats = [
    {
        icon: faSquarePollVertical,
        title: "Performance Tracking",
        description: "Real-time match analysis and detailed performance metrics for both games"
    },
    {
        icon: faTrophy,
        title: "Rank Progress",
        description: "Track your competitive journey from Iron to Radiant or Challenger",
        featured: true
    },
    {
        icon: faChartPie,
        title: "Gameplay Analysis",
        description: "Deep insights into your Champion and Agent performance"
    }
];

const metrics = [
    { icon: faTrophy, value: "10M+", label: "Players Tracked" },
    { icon: faChartPie, value: "50M+", label: "Matches Analyzed" },
    { icon: faUsers, value: "100K+", label: "Daily Users" },
    { icon: faChartLine, value: "1B+", label: "Stats Recorded" },
    { icon: faSquarePollVertical, value: "2M+", label: "Profiles Created" },
    { icon: faCube, value: "24/7", label: "Live Tracking" }
];

const features2 = [
    {
        icon: faChartLine,
        title: "Real-time Stats",
        description: "Track your performance as you play with instant updates and detailed analytics"
    },
    {
        icon: faSquarePollVertical,
        title: "Global Rankings",
        description: "Compare yourself with players worldwide and track your progress"
    },
    {
        icon: faChartPie,
        title: "Detailed Analysis",
        description: "Get insights into your gameplay with comprehensive statistics"
    }
];
