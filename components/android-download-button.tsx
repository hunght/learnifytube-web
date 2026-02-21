'use client';

import { useState } from 'react';
import { FaAndroid } from 'react-icons/fa';
import { getLatestAndroidApkUrlFromApi } from '@/config/app-links';

const ANDROID_RELEASES_FALLBACK =
  'https://github.com/learnifytube/learnify-mobile/releases';

export function AndroidDownloadButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const apkUrl = await getLatestAndroidApkUrlFromApi();
      window.open(apkUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.open(ANDROID_RELEASES_FALLBACK, '_blank', 'noopener,noreferrer');
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
