export const en = {
    common: {
        search: 'Search',
        leaderboard: 'Leaderboard',
        stats: 'Stats',
        searchPlayer: 'Search Player',
        explore: 'Explore',
        viewLeaderboards: 'View Leaderboards',
        joinDiscord: 'Join Discord',
        signUp: 'Sign Up',
        noResults: 'No items found matching your criteria',
    },
    home: {
        hero: {
            title: 'Track Your Progress in League of Legends',
            subtitle: 'Master your performance in League of Legends',
        },
        features: {
            matchAnalytics: 'Match Analytics',
            matchAnalyticsDesc: 'Track your performance with detailed match history and statistics',
            rankings: 'Competitive Rankings',
            rankingsDesc: 'Compare yourself with top players and track your rank progression',
            gameStats: 'Game Stats',
            gameStatsDesc: 'Champion statistics with win rates and trends',
            proScene: 'Pro Scene',
            proSceneDesc: 'Follow professional matches and player performances',
        },
        stats: {
            title: 'Statistics',
            subtitle: 'In-Depth Gaming Analytics',
            description: 'Access comprehensive statistics for League of Legends to enhance your competitive gameplay',
            performanceTracking: 'Performance Tracking',
            performanceTrackingDesc: 'Real-time match analysis and detailed performance metrics',
            rankProgress: 'Rank Progress',
            rankProgressDesc: 'Track your competitive journey from Iron to Challenger',
            gameplayAnalysis: 'Gameplay Analysis',
            gameplayAnalysisDesc: 'Deep insights into your Champion performance',
            popular: 'Popular',
        },
        metrics: {
            trackYourJourney: 'Track Your Journey',
            playersTracked: 'Players Tracked',
            matchesAnalyzed: 'Matches Analyzed',
            dailyUsers: 'Daily Users',
            statsRecorded: 'Stats Recorded',
            profilesCreated: 'Profiles Created',
            liveTracking: 'Live Tracking',
        },
        features2: {
            realTimeStats: 'Real-time Stats',
            realTimeStatsDesc: 'Track your performance with instant updates',
            globalRankings: 'Global Rankings',
            globalRankingsDesc: 'Compare yourself with players worldwide and track your progress',
            detailedAnalysis: 'Detailed Analysis',
            detailedAnalysisDesc: 'Get insights into your gameplay with comprehensive statistics',
        },
        community: {
            title: 'Join our League of Legends Community',
            description: 'Connect with fellow players, share strategies, and stay ahead of the curve with our comprehensive tools and insights',
        },
    },
    lol: {
        searchPlayerPage: {
            title: "Player Search",
            description: "Enter a Riot ID to search for a player's profile and stats",
            placeholder: "Enter Riot ID (e.g., Player#TAG)",
            errors: {
                emptySearch: "Please enter a Riot ID",
                invalidFormat: "Invalid format. Please use format: Name#Tag",
                generic: "An error occurred while fetching player data",
                notFound: "Player not found"
            }
        },
        champions: 'Champions',
        items: 'Items',
        itemsPage: {
            title: 'League of Legends Items',
            filters: {
                all: 'All',
                starter: 'Starter Items',
                basic: 'Basic Items',
                epic: 'Epic Items',
                legendary: 'Legendary Items',
                boots: 'Boots',
                consumable: 'Potions & Consumables',
                trinket: 'Trinkets',
                fighter: 'Fighter',
                tank: 'Tank',
                mage: 'Mage',
                assassin: 'Assassin',
                marksman: 'Marksman',
                support: 'Support',
                sortBy: {
                    nameAZ: 'Name (A-Z)',
                    priceLowHigh: 'Price (Low to High)',
                    priceHighLow: 'Price (High to Low)'
                }
            }
        },
        searchPlaceholder: 'Search summoner...',
        trackStats: 'Track detailed statistics, match history and rankings for any League of Legends player.',
        profile: {
            matchHistory: 'Match History - Ranked Solo/Duo',
            noMatches: 'No matches found',
            loading: 'Loading...',
            victory: 'Victory',
            defeat: 'Defeat',
            ago: 'ago',
            justNow: 'just now',
            csPerMin: '/min',
            totalGames: 'Total Games',
            previous: 'Previous',
            next: 'Next',
            page: 'Page',
            mostPlayedChampions: {
                title: 'Most Played Champions (Last 100 matches)',
                season: 'Season {number}',
                games: 'games',
                viewAll: 'View All Champions'
            },
            championMasteries: {
                title: 'Champion Masteries',
                points: 'pts',
                name: 'Mastery'
            },
            stats: {
                kills: 'Kills',
                dragons: 'Dragons',
                barons: 'Barons',
                heralds: 'Heralds',
                towers: 'Towers',
                grubs: 'Grubs',
                goldDiff: 'Gold Diff',
                damage: 'Damage',
                cs: 'CS'
            }
        },
    },
    footer: {
        about: {
            title: 'About Us',
            description: 'Providing the best gaming statistics and analysis for League of Legends players.',
        },
        leagueOfLegends: {
            title: 'League of Legends',
            searchPlayer: 'Search Player',
            leaderboard: 'Leaderboard',
            proMatches: 'Pro Matches',
            championsStats: 'Champions Stats',
        },
        community: {
            title: 'Community',
            discord: 'Join Discord',
            twitter: 'Twitter',
            github: 'GitHub',
            reddit: 'Reddit',
        },
        resources: {
            title: 'Resources',
            blog: 'Blog',
            api: 'API',
            support: 'Support',
            contact: 'Contact',
        },
        bottom: {
            rights: '© {year} GG.Tracker - Xraww. All rights reserved.',
            privacyPolicy: 'Privacy Policy',
            termsOfService: 'Terms of Service',
        },
    },
} as const; 