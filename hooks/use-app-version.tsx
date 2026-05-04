'use client';

import { useState, useEffect } from 'react';
import {
  defaultDownloadMetadata,
  getDownloadMetadataFromApi,
} from '@/config/app-links';

export function useAppVersion() {
  const [desktopVersion, setDesktopVersion] = useState<string | null>(
    defaultDownloadMetadata.desktopVersion,
  );
  const [androidVersion, setAndroidVersion] = useState<string | null>(
    defaultDownloadMetadata.androidVersion,
  );
  const [links, setLinks] = useState(defaultDownloadMetadata.links);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchVersion() {
      try {
        const metadata = await getDownloadMetadataFromApi();

        if (!mounted) {
          return;
        }

        setDesktopVersion(metadata.desktopVersion);
        setAndroidVersion(metadata.androidVersion);
        setLinks(metadata.links);
      } catch (reason) {
        console.error('Failed to load download metadata:', reason);

        if (!mounted) {
          return;
        }

        setError(reason instanceof Error ? reason : new Error('Unknown error'));
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchVersion();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    version: desktopVersion,
    desktopVersion,
    androidVersion,
    links,
    loading,
    error,
  };
}
