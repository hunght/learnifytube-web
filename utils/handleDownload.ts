import type { AppLinks } from '@/config/app-links';

// Allow passing custom app links or fallback to default
export const handleDownload = () => {
  // Redirect to the download page where auto-detection happens
  window.location.href = '/download';
};

export const getPlatformDownloadUrl = (customAppLinks: AppLinks): string => {
  if (typeof window === 'undefined') {
    return customAppLinks.releases;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.indexOf('android') !== -1) {
    return customAppLinks.android || customAppLinks.androidReleases;
  } else if (userAgent.indexOf('windows') !== -1) {
    return customAppLinks.windows;
  } else if (userAgent.indexOf('mac') !== -1) {
    if (userAgent.indexOf('arm') !== -1) {
      return customAppLinks.macos;
    } else {
      return customAppLinks.macosIntel || customAppLinks.macos;
    }
  } else if (userAgent.indexOf('linux') !== -1) {
    return customAppLinks.linux;
  }

  return customAppLinks.releases;
};
