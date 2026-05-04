import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Download LearnifyTube - Free YouTube Downloader for Windows, macOS, Linux & Android',
  description:
    'Download LearnifyTube for free. The smartest YouTube downloader for offline learning. Available for Windows, macOS (Apple Silicon & Intel), Linux, and Android. Open-source and privacy-focused.',
  keywords:
    'download LearnifyTube, youtube downloader download, free youtube downloader, download videos, desktop app, Android APK, Windows, macOS, Linux, Apple Silicon, offline learning',
  openGraph: {
    title: 'Download LearnifyTube - Free YouTube Downloader',
    description:
      'Download LearnifyTube for free. The smartest YouTube downloader for offline learning. Available for Windows, macOS, Linux, and Android.',
    type: 'website',
    url: 'https://learnifytube.com/download',
    images: [
      {
        url: 'https://learnifytube.com/logo-300.png',
        width: 300,
        height: 300,
        alt: 'LearnifyTube Logo',
      },
    ],
    siteName: 'LearnifyTube',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download LearnifyTube - Free YouTube Downloader',
    description:
      'Download LearnifyTube for free. Available for Windows, macOS, Linux, and Android. The smartest YouTube downloader for offline learning.',
    images: ['https://learnifytube.com/logo-300.png'],
    creator: '@buddy_beep_com',
  },
  alternates: {
    canonical: 'https://learnifytube.com/download',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
