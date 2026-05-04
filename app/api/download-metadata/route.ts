import { NextResponse } from 'next/server';

import {
  defaultDownloadMetadata,
  getDownloadMetadataFromGitHub,
} from '@/config/app-links';

export async function GET() {
  try {
    const metadata = await getDownloadMetadataFromGitHub();

    return NextResponse.json(metadata, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Failed to load download metadata:', error);

    return NextResponse.json(defaultDownloadMetadata, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
      },
    });
  }
}
