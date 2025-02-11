import { API_ENDPOINTS, Region, getRegionalFromRegion } from '@/lib/api-config';
import { fetchRiotApi } from '@/lib/api-utils';
import { CompleteSummonerInfo, RiotAccountDTO, SummonerDTO, LeagueEntryDTO } from '@/types/riot-api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const gameName = searchParams.get('name');
        const tagLine = searchParams.get('tag');
        const region = searchParams.get('region') as Region;

        if (!gameName || !tagLine || !region) {
            return NextResponse.json(
                { error: 'Game name, tag, and region are required' },
                { status: 400 }
            );
        }

        // 1. Get Riot Account information
        const regionalRoute = getRegionalFromRegion(region);
        const accountResponse = await fetchRiotApi<RiotAccountDTO>(
            regionalRoute,
            API_ENDPOINTS.ACCOUNT.BY_RIOT_ID(gameName, tagLine)
        );

        if (!accountResponse.success) {
            return NextResponse.json(
                { 
                    error: accountResponse.error.status.message,
                    details: `Failed to fetch account data for ${gameName}#${tagLine}`
                },
                { status: accountResponse.error.status.status_code }
            );
        }

        // 2. Get Summoner information using PUUID
        const summonerResponse = await fetchRiotApi<SummonerDTO>(
            region,
            API_ENDPOINTS.SUMMONER.BY_PUUID(accountResponse.data.puuid)
        );

        if (!summonerResponse.success) {
            return NextResponse.json(
                { 
                    error: summonerResponse.error.status.message,
                    details: `Failed to fetch summoner data for PUUID: ${accountResponse.data.puuid}, gameName: ${gameName}, tagLine: ${tagLine}, region: ${region}`
                },
                { status: summonerResponse.error.status.status_code }
            );
        }

        // 3. Get Ranked information using Summoner ID
        const rankedResponse = await fetchRiotApi<LeagueEntryDTO[]>(
            region,
            API_ENDPOINTS.LEAGUE.BY_SUMMONER(summonerResponse.data.id)
        );

        // Construct the complete response
        const completeInfo: CompleteSummonerInfo = {
            account: accountResponse.data,
            summoner: summonerResponse.data,
            ranked: rankedResponse.success ? rankedResponse.data : undefined
        };

        return NextResponse.json(completeInfo);
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 