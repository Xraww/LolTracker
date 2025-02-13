# TRACKER.GG

Done for fun and learning purposes, the website is not online.
A League of Legends statistics tracking application built with Next.js, TypeScript and Tailwind CSS. Track summoner profiles, analyze match histories, explore champion, items, leaderboards.


## Features

- **Player Statistics**
  - Detailed summoner profiles
  - Match history with comprehensive analytics
  - Champion mastery tracking

- **Champion Database**
  - Complete champion roster
  - Detailed ability descriptions
  - Lore and information about each champion
  - Role-based filtering
  - Skin collections

- **Item Database**
  - Not complete item catalog
  - Detailed item statistics
  - Build paths and recipes
  - Cost analysis
  - Category filtering

- **Leaderboards**
  - Regional rankings
  - Updated regularly

- **Modern UI/UX**
  - Responsive design for all devices
  - Dark theme optimized
  - Smooth animations
  - Intuitive navigation

- **Additional Features**
  - Multi-language support
  - Real-time data updates
  - Performance optimization
  - SEO friendly

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework with server-side rendering
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better developer experience
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Riot Games API](https://developer.riotgames.com/) - League of Legends data source
- [FontAwesome](https://fontawesome.com/) - Icons
- [Heroicons](https://heroicons.com/) - Additional icon set

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 22.13 or later
- npm or yarn package manager
- A Riot Games API key (get one at [Riot Developer Portal](https://developer.riotgames.com/))

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Xraww/LolTracker.git
   cd LolTracker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Riot Games API key:
   ```env
   RIOT_API_KEY=your-api-key-here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable components
│   ├── context/            # React context providers
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
└── ...config files
```

## API Routes

The application uses the following Riot Games API endpoints:
- Summoner-V4
- Match-V5
- League-V4
- Champion-Mastery-V4
- Data Dragon

## Acknowledgments

- [Riot Games](https://www.riotgames.com/) for providing the API
- [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon) for game assets
- The League of Legends community

## Disclaimer

This website is not online and was created solely for learning purposes and fun.