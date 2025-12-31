import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

import { Providers } from '@/components/providers';
import { siteConfig } from '@/config/site';
import dynamic from 'next/dynamic';

import { PostHogProvider } from './posthogProvider';

// Dynamically import Toaster with SSR disabled to avoid context issues during static generation
const Toaster = dynamic(() => import('@/components/ui/toaster').then((mod) => ({ default: mod.Toaster })), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[3.5rem]" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
        )}
      >
        <PostHogProvider>
          <Providers>{children}</Providers>

          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  );
}
