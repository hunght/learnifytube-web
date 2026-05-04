'use client';

import { useState } from 'react';
import { FaAndroid } from 'react-icons/fa';
import { getDownloadMetadataFromApi, releasesUrl } from '@/config/app-links';

export function AndroidDownloadButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const metadata = await getDownloadMetadataFromApi();
      const apkUrl = metadata.links.android || metadata.links.androidReleases;

      window.open(apkUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.open(releasesUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={className}
      aria-label="Download LearnifyTube Android app"
      {...props}
    >
      {loading ? (
        <>
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden
          />
          Preparing download…
        </>
      ) : (
        <>
          <FaAndroid className="h-4 w-4" aria-hidden="true" />
          Download Android Client
        </>
      )}
    </button>
  );
}
