'use client';

import { useState, useEffect } from 'react';
import {
  getLatestVersionFromApi,
  buildAppLinks,
  getLatestAndroidApkUrlFromApi,
} from '@/config/app-links';

const fallbackVersion = '1.0.163';
export function useAppVersion() {
  const [version, setVersion] = useState(fallbackVersion);
  const [links, setLinks] = useState(buildAppLinks(fallbackVersion));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchVersion() {
      const [versionResult, androidApkResult] = await Promise.allSettled([
        getLatestVersionFromApi(),
        getLatestAndroidApkUrlFromApi(),
      ]);

      const latestVersion =
        versionResult.status === 'fulfilled'
          ? versionResult.value
          : fallbackVersion;
      const latestAndroidApkUrl =
        androidApkResult.status === 'fulfilled'
          ? androidApkResult.value
          : undefined;

      setVersion(latestVersion);
      setLinks(buildAppLinks(latestVersion, latestAndroidApkUrl));

      if (versionResult.status === 'rejected') {
        const reason = versionResult.reason;
        console.error('Failed to load download metadata:', reason);
        setError(reason instanceof Error ? reason : new Error('Unknown error'));
      } else if (androidApkResult.status === 'rejected') {
        const reason = androidApkResult.reason;
        console.error('Failed to load download metadata:', reason);
        setError(reason instanceof Error ? reason : new Error('Unknown error'));
      }

      setLoading(false);
    }

    fetchVersion();
  }, []);

  return { version, links, loading, error };
}
