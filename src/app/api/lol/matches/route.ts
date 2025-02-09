import { API_ENDPOINTS, DEFAULT_REGION, Region, getRegionalFromRegion } from '@/lib/api-config';
import { fetchRiotApi } from '@/lib/api-utils';
import { MatchData } from '@/types/riot-api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const puuid = searchParams.get('puuid');
        const region = (searchParams.get('region') as Region) || DEFAULT_REGION;
        const count = parseInt(searchParams.get('count') || '10');
        const start = parseInt(searchParams.get('start') || '0');

        if (!puuid) {
            return NextResponse.json(
                { error: 'PUUID is required' },
                { status: 400 }
            );
        }

        // 1. Get match IDs for the player
        const regionalRoute = getRegionalFromRegion(region);
        const matchIdsResponse = await fetchRiotApi<string[]>(
            regionalRoute,
            `${API_ENDPOINTS.MATCH.BY_PUUID(puuid)}?start=${start}&count=${count}`
        );

        if (!matchIdsResponse.success) {
            return NextResponse.json(
                { 
                    error: matchIdsResponse.error.status.message,
                    details: `Failed to fetch match IDs for PUUID: ${puuid}`
                },
                { status: matchIdsResponse.error.status.status_code }
            );
        }

        // 2. Get details for each match
        const matchPromises = matchIdsResponse.data.map(matchId =>
            fetchRiotApi<MatchData>(
                regionalRoute,
                API_ENDPOINTS.MATCH.BY_ID(matchId)
            )
        );

        const matchResponses = await Promise.all(matchPromises);
        const matches = matchResponses
            .filter(response => response.success)
            .map(response => (response.success ? response.data : null))
            .filter(Boolean);

        return NextResponse.json(matches);
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 