import { NextResponse } from 'next/server';
import { Region, RIOT_API_BASE_URL } from '@/lib/api-config';
import { getRiotHeaders } from '@/lib/api-config';
import { cache } from '@/lib/cache-utils';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const puuid = searchParams.get('puuid');
        const region = searchParams.get('region') as Region;

        if (!puuid || !region) {
            return NextResponse.json({ error: 'Missing puuid or region parameter' }, { status: 400 });
        }

        // Check cache first
        const cacheKey = `masteries:${puuid}:${region}`;
        const cachedData = await cache.get(cacheKey);
        if (cachedData) {
            return NextResponse.json(cachedData);
        }

        // Fetch champion masteries from Riot API
        const response = await fetch(
            `${RIOT_API_BASE_URL[region]}/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`,
            {
                headers: getRiotHeaders(),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(
                { 
                    error: error.status.message,
                    details: `Failed to fetch champion masteries for PUUID: ${puuid}, region: ${region}`
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Cache the data for 5 minutes
        await cache.set(cacheKey, data, { ttl: 300 });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching champion masteries:', error);
        return NextResponse.json(
            { error: 'Failed to fetch champion masteries' },
            { status: 500 }
        );
    }
} 