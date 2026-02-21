// Configuration file for application download links and version information

const desktopReleasesUrl = 'https://github.com/hunght/LearnifyTube/releases';
const androidReleasesUrl = 'https://github.com/learnifytube/learnify-mobile/releases';

type GitHubReleaseAsset = {
  name?: string;
  browser_download_url?: string;
};

type GitHubReleaseResponse = {
  tag_name: string;
  assets?: GitHubReleaseAsset[];
};

export type AppLinks = {
  windows: string;
  macos: string;
  linux: string;
  releases: string;
  macosIntel: string;
  linuxRpm: string;
  android: string;
  androidReleases: string;
};

// Function to build download URLs based on a version
export const buildAppLinks = (
  version: string,
  androidApkUrl: string = androidReleasesUrl,
): AppLinks => ({
  // Main platform download links
  windows: `${desktopReleasesUrl}/download/v${version}/LearnifyTube-${version}.Setup.exe`,
  macos: `${desktopReleasesUrl}/download/v${version}/LearnifyTube-${version}-arm64.dmg`,
  linux: `${desktopReleasesUrl}/download/v${version}/LearnifyTube_${version}_amd64.deb`,

  // Additional links
  releases: desktopReleasesUrl,
  android: androidApkUrl,
  androidReleases: androidReleasesUrl,

  // You can add other platform-specific links if needed
  macosIntel: `${desktopReleasesUrl}/download/v${version}/LearnifyTube-${version}-x64.dmg`,
  linuxRpm: `${desktopReleasesUrl}/download/v${version}/LearnifyTube-${version}-1.x86_64.rpm`,
});

// Client-side version getter that uses the API
export async function getLatestVersionFromApi(): Promise<string> {
  const response = await fetch(
    'https://api.github.com/repos/hunght/LearnifyTube/releases/latest',
  );

  if (!response.ok) {
    throw new Error('Failed to check desktop app updates.');
  }

  const release = (await response.json()) as GitHubReleaseResponse;
  const latestVersion = release.tag_name.replace(/^v/, '');

  return latestVersion;
}

// Client-side Android APK URL getter from latest mobile release
export async function getLatestAndroidApkUrlFromApi(): Promise<string> {
  const response = await fetch(
    'https://api.github.com/repos/learnifytube/learnify-mobile/releases/latest',
  );

  if (!response.ok) {
    throw new Error('Failed to check Android app updates.');
  }

  const release = (await response.json()) as GitHubReleaseResponse;
  const apkAsset = release.assets?.find(
    (asset) =>
      typeof asset.name === 'string' &&
      asset.name.toLowerCase().endsWith('.apk') &&
      typeof asset.browser_download_url === 'string',
  );

  return apkAsset?.browser_download_url || androidReleasesUrl;
}
