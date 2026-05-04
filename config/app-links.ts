import { siteConfig } from './site';

const releasesApiUrl =
  'https://api.github.com/repos/learnifytube/LearnifyTube/releases';
const desktopTagPattern = /^v\d+\.\d+\.\d+$/i;
const androidTagPattern = /^mobile-v\d+\.\d+\.\d+$/i;
const githubApiHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

export const productRepoUrl = siteConfig.links.github;
export const releasesUrl = `${productRepoUrl}/releases`;

type GitHubReleaseAsset = {
  name?: string;
  browser_download_url?: string;
};

type GitHubReleaseResponse = {
  tag_name: string;
  draft?: boolean;
  prerelease?: boolean;
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

export type DownloadMetadata = {
  desktopVersion: string | null;
  androidVersion: string | null;
  links: AppLinks;
};

const isPublishedRelease = (release: GitHubReleaseResponse) =>
  !release.draft && !release.prerelease;

const stripTagPrefix = (
  tagName: string | undefined,
  prefix: string,
): string | null => {
  if (!tagName?.toLowerCase().startsWith(prefix.toLowerCase())) {
    return null;
  }

  return tagName.slice(prefix.length);
};

const parseSemver = (value: string | null): [number, number, number] | null => {
  if (!value) return null;

  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(value);
  if (!match) return null;

  return [Number(match[1]), Number(match[2]), Number(match[3])];
};

const compareSemverDesc = (a: string | null, b: string | null): number => {
  const parsedA = parseSemver(a);
  const parsedB = parseSemver(b);

  if (!parsedA && !parsedB) return 0;
  if (!parsedA) return 1;
  if (!parsedB) return -1;

  for (let index = 0; index < 3; index += 1) {
    if (parsedA[index] !== parsedB[index]) {
      return parsedB[index] - parsedA[index];
    }
  }

  return 0;
};

const findAssetUrl = (
  assets: GitHubReleaseAsset[] | undefined,
  matcher: (name: string) => boolean,
): string | undefined =>
  assets?.find((asset) => {
    if (
      typeof asset.name !== 'string' ||
      typeof asset.browser_download_url !== 'string'
    ) {
      return false;
    }

    return matcher(asset.name);
  })?.browser_download_url;

const buildDesktopFallbackUrl = (
  version: string | null | undefined,
  filename: string,
): string => {
  if (!version) {
    return releasesUrl;
  }

  return `${releasesUrl}/download/v${version}/${filename}`;
};

const findLatestRelease = async (
  tagPattern: RegExp,
  tagPrefix: string,
): Promise<GitHubReleaseResponse | null> => {
  const matchingReleases: GitHubReleaseResponse[] = [];

  for (let page = 1; page <= 5; page += 1) {
    const response = await fetch(
      `${releasesApiUrl}?per_page=100&page=${page}`,
      {
        headers: githubApiHeaders,
        next: { revalidate: 900 },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to load GitHub releases (status ${response.status}).`,
      );
    }

    const releases = (await response.json()) as GitHubReleaseResponse[];

    if (releases.length === 0) {
      break;
    }

    matchingReleases.push(
      ...releases.filter(
        (release) =>
          isPublishedRelease(release) && tagPattern.test(release.tag_name),
      ),
    );
  }

  return (
    matchingReleases.sort((a, b) =>
      compareSemverDesc(
        stripTagPrefix(a.tag_name, tagPrefix),
        stripTagPrefix(b.tag_name, tagPrefix),
      ),
    )[0] ?? null
  );
};

export const buildAppLinks = (
  desktopVersion: string | null = null,
  androidApkUrl: string = releasesUrl,
  desktopAssets?: GitHubReleaseAsset[],
): AppLinks => ({
  windows:
    findAssetUrl(
      desktopAssets,
      (name) => name.endsWith('.Setup.exe') && !name.endsWith('.nupkg'),
    ) ??
    buildDesktopFallbackUrl(
      desktopVersion,
      desktopVersion ? `LearnifyTube-${desktopVersion}.Setup.exe` : '',
    ),
  macos:
    findAssetUrl(desktopAssets, (name) => name.endsWith('-arm64.dmg')) ??
    buildDesktopFallbackUrl(
      desktopVersion,
      desktopVersion ? `LearnifyTube-${desktopVersion}-arm64.dmg` : '',
    ),
  linux:
    findAssetUrl(desktopAssets, (name) => name.endsWith('.deb')) ??
    buildDesktopFallbackUrl(
      desktopVersion,
      desktopVersion ? `learnifytube-electron_${desktopVersion}_amd64.deb` : '',
    ),
  releases: releasesUrl,
  macosIntel:
    findAssetUrl(desktopAssets, (name) => name.endsWith('-x64.dmg')) ??
    buildDesktopFallbackUrl(
      desktopVersion,
      desktopVersion ? `LearnifyTube-${desktopVersion}-x64.dmg` : '',
    ),
  linuxRpm:
    findAssetUrl(desktopAssets, (name) => name.endsWith('.rpm')) ??
    buildDesktopFallbackUrl(
      desktopVersion,
      desktopVersion
        ? `learnifytube-electron-${desktopVersion}-1.x86_64.rpm`
        : '',
    ),
  android: androidApkUrl || releasesUrl,
  androidReleases: releasesUrl,
});

export const defaultDownloadMetadata: DownloadMetadata = {
  desktopVersion: null,
  androidVersion: null,
  links: buildAppLinks(),
};

export const getAssetFileName = (
  downloadUrl: string | null | undefined,
): string => {
  if (!downloadUrl) {
    return '';
  }

  const fallback = downloadUrl
    .split('#')[0]
    .split('?')[0]
    .split('/')
    .filter(Boolean)
    .pop();

  try {
    const pathname = new URL(downloadUrl).pathname;
    return decodeURIComponent(pathname.split('/').filter(Boolean).pop() ?? '');
  } catch {
    return fallback ? decodeURIComponent(fallback) : '';
  }
};

export async function getDownloadMetadataFromGitHub(): Promise<DownloadMetadata> {
  const [desktopRelease, androidRelease] = await Promise.all([
    findLatestRelease(desktopTagPattern, 'v'),
    findLatestRelease(androidTagPattern, 'mobile-v'),
  ]);

  const desktopVersion = stripTagPrefix(desktopRelease?.tag_name, 'v');
  const androidVersion = stripTagPrefix(androidRelease?.tag_name, 'mobile-v');
  const androidApkUrl =
    findAssetUrl(androidRelease?.assets, (name) =>
      name.toLowerCase().endsWith('.apk'),
    ) ?? releasesUrl;

  return {
    desktopVersion,
    androidVersion,
    links: buildAppLinks(desktopVersion, androidApkUrl, desktopRelease?.assets),
  };
}

let downloadMetadataPromise: Promise<DownloadMetadata> | null = null;

export async function getDownloadMetadataFromApi(): Promise<DownloadMetadata> {
  if (!downloadMetadataPromise) {
    downloadMetadataPromise = fetch('/api/download-metadata', {
      cache: 'no-store',
    }).then(async (response) => {
      if (response.ok) {
        return (await response.json()) as DownloadMetadata;
      }

      // Static/PWA deployments can miss the Next API route. Fall back to
      // GitHub directly so the web client does not keep showing stale metadata.
      return getDownloadMetadataFromGitHub();
    });
  }

  try {
    return await downloadMetadataPromise;
  } catch (error) {
    downloadMetadataPromise = null;
    throw error;
  }
}

export async function getLatestVersionFromApi(): Promise<string> {
  const metadata = await getDownloadMetadataFromApi();

  if (!metadata.desktopVersion) {
    throw new Error('Failed to check desktop app updates.');
  }

  return metadata.desktopVersion;
}

export async function getLatestAndroidApkUrlFromApi(): Promise<string> {
  const metadata = await getDownloadMetadataFromApi();
  return metadata.links.android || metadata.links.androidReleases;
}
