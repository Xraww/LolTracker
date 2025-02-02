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
                            {t.lol.trackStats}
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-lol-gold text-valorant-dark font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(200,155,60,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                                {t.common.searchPlayer}
                            </button>
                            <button className="px-6 py-3 bg-transparent text-white border-2 border-white/80 font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
                                {t.common.leaderboard}
                            </button>
                        </div>
                        <div className="flex gap-5">
                            <div className="animate-float px-5 py-3 bg-white/10 backdrop-blur rounded-xl flex items-center gap-3 border border-white/20">
                                <FontAwesomeIcon icon={faChartLine} className="text-lol-gold text-lg"/>
                                <span className="text-white font-medium text-sm">{t.common.stats}</span>
                            </div>
                            <div className="animate-float delay-1000 px-5 py-3 bg-white/10 backdrop-blur rounded-xl flex items-center gap-3 border border-white/20">
                                <FontAwesomeIcon icon={faTrophy} className="text-lol-gold text-lg"/>
                                <span className="text-white font-medium text-sm">{t.common.leaderboard}</span>
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
                            {t.valorant.trackStats}
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-valorant-red text-white font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(255,70,84,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                                {t.common.searchPlayer}
                            </button>
                            <button className="px-6 py-3 bg-transparent text-white border-2 border-white/80 font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
                                {t.common.leaderboard}
                            </button>
                        </div>
                        <div className="flex gap-5">
                            <div className="animate-float px-5 py-3 bg-white/10 backdrop-blur rounded-xl flex items-center gap-3 border border-white/20">
                                <FontAwesomeIcon icon={faChartPie} className="text-valorant-red text-lg"/>
                                <span className="text-white font-medium text-sm">{t.valorant.agents}</span>
                            </div>
                            <div className="animate-float delay-1000 px-5 py-3 bg-white/10 backdrop-blur rounded-xl flex items-center gap-3 border border-white/20">
                                <FontAwesomeIcon icon={faTrophy} className="text-valorant-red text-lg"/>
                                <span className="text-white font-medium text-sm">{t.common.leaderboard}</span>
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
                        {t.home.hero.title}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                        {t.home.hero.subtitle}
                    </p>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-valorant-red text-white font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(255,70,84,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                            {t.common.searchPlayer}
                        </button>
                        <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                            {t.common.stats} <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
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
                                <h3 className="text-xl font-semibold mb-3">
                                    {t.home.features[feature.translationKey]}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {t.home.features[feature.descriptionKey]}
                                </p>
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
                        {t.home.stats.title}
                    </span>
                    <h2 className="text-4xl font-bold mb-4">{t.home.stats.subtitle}</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t.home.stats.description}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6 max-w-[1200px] mx-auto">
                    {stats.map((stat, index) => (
                        <div 
                            key={index} 
                            className={`p-8 ${
                                stat.featured 
                                    ? '-mt-6 bg-gradient-to-br from-lol-gold/20 to-black/60 backdrop-blur rounded-2xl border-2 border-lol-gold/30 hover:border-lol-gold/50 shadow-[0_0_15px_rgba(200,155,60,0.15)] transition-all duration-300 hover:-translate-y-2 relative' 
                                    : 'bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-lol-gold/30 transition-all duration-300 hover:-translate-y-1'
                            } group`}
                        >
                            {stat.featured && (
                                <div className="absolute -top-4 right-6 px-4 py-1.5 bg-gradient-to-r from-lol-gold/20 to-black/60 text-lol-gold text-sm rounded-full border border-lol-gold/30 font-semibold shadow-lg">
                                    {t.home.stats.popular}
                                </div>
                            )}
                            <FontAwesomeIcon icon={stat.icon} className="text-3xl mb-4 text-lol-gold" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {t.home.stats[stat.translationKey]}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {t.home.stats[stat.descriptionKey]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4 mt-12">
                    <button className="px-8 py-4 bg-lol-gold text-valorant-dark font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(200,155,60,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                        {t.common.startTracking}
                    </button>
                    <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                        {t.common.viewLeaderboards} <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
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
                            <h2 className="text-3xl font-bold">{t.home.metrics.trackYourJourney}</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            {metrics.map((metric, index) => (
                                <div 
                                    key={index}
                                    className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 text-center"
                                >
                                    <FontAwesomeIcon icon={metric.icon} className="text-2xl text-valorant-red mb-3" />
                                    <span className="block text-3xl font-bold mb-2">{metric.value}</span>
                                    <p className="text-gray-400">{t.home.metrics[metric.translationKey]}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="flex-1 flex flex-col gap-8 justify-center">
                        {features2.map((feature, index) => (
                            <div 
                                key={index}
                                className="p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex items-start gap-6"
                            >
                                <div className="p-4 bg-valorant-red/10 rounded-xl">
                                    <FontAwesomeIcon icon={feature.icon} className="text-2xl text-valorant-red" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">
                                        {t.home.features2[feature.translationKey]}
                                    </h4>
                                    <p className="text-gray-400 leading-relaxed">
                                        {t.home.features2[feature.descriptionKey]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fifth Section - CTA */}
            <section className="min-h-[40vh] w-full mx-auto bg-gradient-to-br from-black to-valorant-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lol-gold/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-16 text-center">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-bold mb-6 text-lol-gold">
                            {t.home.community.title}
                        </h2>
                        <p className="text-xl text-gray-300 mb-10">
                            {t.home.community.description}
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 border border-lol-gold/30 hover:border-lol-gold/50">
                            {t.common.joinDiscord}
                        </button>
                        <button className="px-8 py-4 bg-lol-gold text-valorant-dark font-semibold rounded-lg hover:shadow-[0_5px_15px_rgba(200,155,60,0.3)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
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
