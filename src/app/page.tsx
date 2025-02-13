'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faChevronRight, 
    faCube, 
    faSquarePollVertical, 
    faChartLine, 
    faTrophy, 
    faChartPie, 
    faUsers 
} from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from 'next/image';

const features = [
    {
        icon: faChartLine,
        translationKey: 'matchAnalytics' as const,
        descriptionKey: 'matchAnalyticsDesc' as const,
    },
    {
        icon: faTrophy,
        translationKey: 'rankings' as const,
        descriptionKey: 'rankingsDesc' as const,
    },
    {
        icon: faChartPie,
        translationKey: 'gameStats' as const,
        descriptionKey: 'gameStatsDesc' as const,
    },
    {
        icon: faUsers,
        translationKey: 'proScene' as const,
        descriptionKey: 'proSceneDesc' as const,
    }
] as const;

export default function Home() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-[50px] md:gap-[100px] relative w-full">
            {/* Hero Section */}
            <section className="min-h-screen w-full flex justify-center items-center overflow-hidden relative mt-16 md:mt-0">
                {/* Background with multiple gradients for depth */}
                <div className="absolute inset-0 w-full bg-gradient-to-b from-black via-lol-dark to-black"></div>

                <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 text-center w-full max-w-[700px] mx-auto px-4">
                    <Image 
                        src="/images/game/lol/logo.png" 
                        alt="League of Legends" 
                        width={320}
                        height={160}
                        className="w-[200px] md:w-[280px] lg:w-[320px] object-contain transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_30px_rgba(200,155,60,0.2)]"
                        priority
                    />
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-[600px] leading-relaxed font-medium">
                        {t.lol.trackStats}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
                        <Link 
                            href="/lol/search-player"
                            className="w-full sm:w-auto group relative px-6 md:px-8 py-4 bg-lol-gold overflow-hidden rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,155,60,0.3)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                            <span className="relative font-semibold text-black text-base md:text-lg">
                                {t.common.searchPlayer}
                            </span>
                        </Link>
                        <Link 
                            href="/lol/leaderboard"
                            className="w-full sm:w-auto group relative px-6 md:px-8 py-4 rounded-lg transition-all duration-300 border-2 border-white/20 hover:border-lol-gold/50"
                        >
                            <div className="absolute inset-0 bg-lol-gold/0 group-hover:bg-lol-gold/10 transition-colors duration-300"></div>
                            <span className="relative font-semibold text-white text-base md:text-lg">
                                {t.common.leaderboard}
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-[900px]">
                        <div className="flex flex-col items-center gap-2 px-4 sm:px-6 py-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
                            <FontAwesomeIcon icon={faChartLine} className="text-lol-gold text-xl md:text-2xl"/>
                            <span className="text-white/90 font-medium text-base md:text-lg">{t.common.stats}</span>
                            <span className="text-sm text-gray-400">Real-time tracking</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 px-4 sm:px-6 py-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
                            <FontAwesomeIcon icon={faChartPie} className="text-lol-gold text-xl md:text-2xl"/>
                            <span className="text-white/90 font-medium text-base md:text-lg">Champions</span>
                            <span className="text-sm text-gray-400">Performance analysis</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 px-4 sm:px-6 py-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 sm:col-span-2 lg:col-span-1">
                            <FontAwesomeIcon icon={faUsers} className="text-lol-gold text-xl md:text-2xl"/>
                            <span className="text-white/90 font-medium text-base md:text-lg">Community</span>
                            <span className="text-sm text-gray-400">Join other players</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Section - Features Overview */}
            <section className="min-h-[80vh] w-full">
                <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="w-full bg-gradient-to-[135deg] from-black to-lol-dark relative overflow-hidden rounded-[20px] md:rounded-[40px]">                
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 p-6 sm:p-8 md:p-12 lg:p-16">
                            <div className="flex-1 flex flex-col justify-center relative z-10">
                                <span className="text-lol-gold text-base sm:text-lg md:text-xl uppercase tracking-[3px] font-semibold mb-4 md:mb-6">
                                    Explore
                                </span>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                                    {t.home.hero.title}
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-xl leading-relaxed">
                                    {t.home.hero.subtitle}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="w-full sm:w-auto px-6 md:px-8 py-4 bg-lol-gold text-black font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(200,155,60,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                                        {t.common.searchPlayer}
                                    </button>
                                    <button className="w-full sm:w-auto px-6 md:px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                        {t.common.stats} <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 flex items-center">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
                                    {features.map((feature, index) => (
                                        <div 
                                            key={index}
                                            className="p-6 md:p-8 bg-white/5 rounded-xl md:rounded-2xl border border-white/10 hover:border-white/20 transition-colors group"
                                        >
                                            <FontAwesomeIcon 
                                                icon={feature.icon} 
                                                className="text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4 text-lol-gold transition-colors"
                                            />
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 md:mb-3">
                                                {t.home.features[feature.translationKey]}
                                            </h3>
                                            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                                                {t.home.features[feature.descriptionKey]}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Third Section - Statistics */}
            <section className="min-h-[60vh] w-full bg-gradient-to-br from-black to-lol-dark relative overflow-hidden px-4 md:px-8 py-8 md:py-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lol-gold/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="relative z-10 text-center mb-8 md:mb-16">
                    <span className="text-lol-gold text-base sm:text-lg md:text-xl uppercase tracking-[3px] font-semibold mb-2 md:mb-4 block">
                        {t.home.stats.title}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">{t.home.stats.subtitle}</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                        {t.home.stats.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-[1200px] mx-auto">
                    {stats.map((stat, index) => (
                        <div 
                            key={index} 
                            className={`p-6 md:p-8 ${
                                stat.featured 
                                    ? 'sm:-mt-6 bg-gradient-to-br from-lol-gold/20 to-black/60 backdrop-blur rounded-xl md:rounded-2xl border-2 border-lol-gold/30 hover:border-lol-gold/50 shadow-[0_0_15px_rgba(200,155,60,0.15)] transition-all duration-300 hover:-translate-y-2 relative' 
                                    : 'bg-white/5 backdrop-blur rounded-xl md:rounded-2xl border border-white/10 hover:border-lol-gold/30 transition-all duration-300 hover:-translate-y-1'
                            } group`}
                        >
                            {stat.featured && (
                                <div className="absolute -top-4 right-4 md:right-6 px-3 md:px-4 py-1 md:py-1.5 bg-gradient-to-r from-lol-gold/20 to-black/60 text-lol-gold text-xs md:text-sm rounded-full border border-lol-gold/30 font-semibold shadow-lg">
                                    {t.home.stats.popular}
                                </div>
                            )}
                            <FontAwesomeIcon icon={stat.icon} className="text-2xl md:text-3xl mb-3 md:mb-4 text-lol-gold" />
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold mb-2">
                                    {t.home.stats[stat.translationKey]}
                                </h3>
                                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                                    {t.home.stats[stat.descriptionKey]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8 md:mt-12">
                    <button className="w-full sm:w-auto px-6 md:px-8 py-4 bg-lol-gold text-black font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(200,155,60,0.3)] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 mx-4 sm:mx-0">
                        {t.common.viewLeaderboards} <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                    </button>
                </div>
            </section>

            {/* Fourth Section - Stats Showcase */}
            <section className="min-h-[60vh] w-full mx-auto relative overflow-hidden px-4 md:px-8">
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="w-full bg-gradient-to-br from-black to-lol-dark rounded-[20px] md:rounded-[40px] p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lol-gold/5 via-transparent to-transparent pointer-events-none" />
                        
                        <div className="stats-showcase flex flex-col lg:flex-row gap-8 lg:gap-16 relative z-10">
                            {/* Stats Box */}
                            <div className="flex-1 bg-white/5 backdrop-blur rounded-xl md:rounded-2xl border border-white/10 p-6 md:p-8">
                                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                    <FontAwesomeIcon icon={faChartLine} className="text-2xl md:text-3xl text-lol-gold" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{t.home.metrics.trackYourJourney}</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                    {metrics.map((metric, index) => (
                                        <div 
                                            key={index}
                                            className="p-4 md:p-6 bg-white/5 rounded-xl md:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 text-center"
                                        >
                                            <FontAwesomeIcon icon={metric.icon} className="text-xl md:text-2xl text-lol-gold mb-2 md:mb-3" />
                                            <span className="block text-2xl md:text-3xl font-bold mb-1 md:mb-2">{metric.value}</span>
                                            <p className="text-sm md:text-base text-gray-400">{t.home.metrics[metric.translationKey]}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="flex-1 flex flex-col gap-4 md:gap-8">
                                {features2.map((feature, index) => (
                                    <div 
                                        key={index}
                                        className="p-4 md:p-6 bg-white/5 backdrop-blur rounded-xl md:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex items-start gap-4 md:gap-6"
                                    >
                                        <div className="p-3 md:p-4 bg-lol-gold/10 rounded-lg md:rounded-xl">
                                            <FontAwesomeIcon icon={feature.icon} className="text-xl md:text-2xl text-lol-gold" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
                                                {t.home.features2[feature.translationKey]}
                                            </h4>
                                            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                                                {t.home.features2[feature.descriptionKey]}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fifth Section - CTA */}
            <section className="min-h-[40vh] w-full bg-gradient-to-br from-black to-lol-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lol-gold/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 sm:p-8 md:p-16 text-center">
                    <div className="max-w-3xl px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-lol-gold">
                            {t.home.community.title}
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10">
                            {t.home.community.description}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4">
                        <button className="w-full sm:w-auto px-6 md:px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 border border-lol-gold/30 hover:border-lol-gold/50">
                            {t.common.joinDiscord}
                        </button>
                        <button className="w-full sm:w-auto px-6 md:px-8 py-4 bg-lol-gold text-black font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(200,155,60,0.3)] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            {t.common.signUp} <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

const stats = [
    {
        icon: faSquarePollVertical,
        translationKey: 'performanceTracking' as const,
        descriptionKey: 'performanceTrackingDesc' as const,
    },
    {
        icon: faTrophy,
        translationKey: 'rankProgress' as const,
        descriptionKey: 'rankProgressDesc' as const,
        featured: true
    },
    {
        icon: faChartPie,
        translationKey: 'gameplayAnalysis' as const,
        descriptionKey: 'gameplayAnalysisDesc' as const,
    }
];

const metrics = [
    { icon: faTrophy, translationKey: 'playersTracked' as const, value: "10M+" },
    { icon: faChartPie, translationKey: 'matchesAnalyzed' as const, value: "50M+" },
    { icon: faUsers, translationKey: 'dailyUsers' as const, value: "5K+" },
    { icon: faChartLine, translationKey: 'statsRecorded' as const, value: "1B+" },
    { icon: faSquarePollVertical, translationKey: 'profilesCreated' as const, value: "2K+" },
    { icon: faCube, translationKey: 'liveTracking' as const, value: "24/7" }
];

const features2 = [
    {
        icon: faChartLine,
        translationKey: 'realTimeStats' as const,
        descriptionKey: 'realTimeStatsDesc' as const,
    },
    {
        icon: faSquarePollVertical,
        translationKey: 'globalRankings' as const,
        descriptionKey: 'globalRankingsDesc' as const,
    },
    {
        icon: faChartPie,
        translationKey: 'detailedAnalysis' as const,
        descriptionKey: 'detailedAnalysisDesc' as const,
    }
];
