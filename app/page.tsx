import { sortPosts } from '@/lib/utils';
import { posts } from '#site/content';
import { PostItem } from '@/components/post-item';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

import { JsonLd } from 'react-schemaorg';
import { WebSite, SoftwareApplication, VideoObject } from 'schema-dts';
import { Metadata } from 'next';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { DownloadButton } from '@/components/download-button';
import { DownloadNowButton } from '@/components/download-now-button';
import { PlatformDownloads } from '@/components/platform-downloads';

import { siteConfig } from '@/config/site';
import { GitHubButton } from '@/components/github-button';
import { EmailSubscriptionForm } from '@/components/email-subscription-form';

const description =
  'LearnifyTube: The ultimate offline language learning video player. Download YouTube videos with dual subtitles, flashcards, spaced repetition, and AI-powered study tools.';

export const metadata: Metadata = {
  title: 'LearnifyTube: Offline Language Learning Video Player',
  description: description,
  keywords:
    'language learning, youtube downloader, dual subtitles, flashcards, spaced repetition, offline learning, video player, anki alternative',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'LearnifyTube - Offline Language Learning Video Player',
    description: description,
    type: 'website',
    url: 'https://learnifytube.com',
    images: [
      {
        url: 'https://learnifytube.com/logo-300.png',
        width: 300,
        height: 300,
        alt: 'LearnifyTube Logo',
      },
    ],
    siteName: 'LearnifyTube',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnifyTube - Offline Language Learning Video Player',
    description: description,
    images: [
      {
        url: 'https://learnifytube.com/logo-300.png',
        alt: 'LearnifyTube Logo',
      },
    ],
    creator: '@buddy_beep_com',
    site: '@buddy_beep_com',
  },
  alternates: {
    canonical: 'https://learnifytube.com',
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

// Feature data based on roadmap analysis
const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    ),
    title: 'Precise Playback Control',
    description: 'Fine-grained speed control from 0.25x to 2.0x. Full keyboard shortcuts for hands-free learning. J/K/L navigation just like YouTube.',
    color: 'bg-blue-500',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <line x1="9" y1="10" x2="15" y2="10"></line>
      </svg>
    ),
    title: 'Dual Subtitles',
    description: 'Display two languages simultaneously. Click any word for instant translation. Perfect for comparing native and target language.',
    color: 'bg-green-500',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="M10 4v4"></path>
        <path d="M2 8h20"></path>
        <path d="M6 4v4"></path>
      </svg>
    ),
    title: 'Spaced Repetition Flashcards',
    description: 'Built-in SM-2 algorithm like Anki. Create cards from any subtitle. Track your learning with SRS calendar and progress charts.',
    color: 'bg-purple-500',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    ),
    title: 'AI-Powered Learning',
    description: 'Auto-generate video summaries and quizzes. Multiple choice, true/false, and fill-in-the-blank questions from any video content.',
    color: 'bg-amber-500',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
    title: 'Accessibility First',
    description: 'OpenDyslexic font support. Scalable UI with compact, comfortable, and spacious modes. Full dark mode for comfortable viewing.',
    color: 'bg-teal-500',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <path d="M9 14l2 2 4-4"></path>
      </svg>
    ),
    title: 'Smart Organization',
    description: 'Import entire YouTube playlists and channels. Create custom playlists. Track watch progress and learning analytics across all videos.',
    color: 'bg-rose-500',
  },
];

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 3);

  return (
    <>
      {/* Structured Data for SEO */}
      <JsonLd<VideoObject>
        item={{
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: 'LearnifyTube - Offline Language Learning Video Player',
          description: 'Watch how LearnifyTube helps you learn languages from videos',
          thumbnailUrl: 'https://learnifytube.com/logo-300.png',
          uploadDate: '2026-01-22T00:00:00+00:00',
          duration: 'PT2M30S',
        }}
      />
      <JsonLd<WebSite>
        item={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'LearnifyTube',
          url: 'https://learnifytube.com',
          description: description,
          inLanguage: 'en-US',
          sameAs: [
            siteConfig.links.github,
            siteConfig.links.twitter,
            siteConfig.links.discord,
          ],
        }}
      />
      <JsonLd<SoftwareApplication>
        item={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'LearnifyTube',
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Windows, macOS, Linux',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '25',
          },
          downloadUrl: 'https://learnifytube.com/download',
        }}
      />

      <div className="min-h-dvh relative flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="hero-section py-12 md:py-20" aria-label="Main hero section">
            <div className="container mx-auto px-4">
              <div className="text-center">
                {/* Headline */}
                <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                  <span className="text-foreground">Learn languages from </span>
                  <span className="bg-brand-gradient bg-clip-text text-transparent">any video</span>
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                  The offline video player built for language learners. Dual subtitles, instant translation, flashcards with spaced repetition, and AI-powered study tools.
                </p>

                {/* CTA Buttons */}
                <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <DownloadButton />
                  <GitHubButton
                    href="https://github.com/hunght/LearnifyTube"
                    type="star"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    Star on GitHub
                  </GitHubButton>
                </div>

                {/* Platform Downloads */}
                <div className="mb-12 flex justify-center">
                  <PlatformDownloads />
                </div>

                {/* Demo Video with Terminal Chrome */}
                <div className="mx-auto max-w-5xl">
                  <div className="relative">
                    {/* Gradient glow behind video */}
                    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 blur-2xl"></div>

                    {/* Terminal window */}
                    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-2xl dark:border-slate-700">
                      {/* Terminal header with macOS buttons */}
                      <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800 px-4 py-3">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="ml-4 text-sm text-slate-400">LearnifyTube Demo</span>
                      </div>
                      {/* Video */}
                      <div className="aspect-video w-full">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full"
                        >
                          <source src="/demo.webm" type="video/webm" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section bg-slate-800 py-16 text-white" aria-label="Key features section">
            <div className="container mx-auto px-4">
              <div className="mb-6 text-center">
                <span className="inline-block rounded-full bg-blue-500/20 px-4 py-1 text-sm font-medium text-blue-400">
                  POWERFUL FEATURES
                </span>
              </div>
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    Everything you need to learn from videos
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                  Compared against Language Reactor, LLPlayer, and Knowclip – LearnifyTube covers 80% of essential language learning features, plus extras they don&apos;t have.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:border-slate-600 hover:bg-slate-800"
                  >
                    <div className={`mb-4 inline-flex rounded-lg ${feature.color} p-3 text-white`}>
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Coming Soon Badge */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                  </span>
                  <span className="text-sm font-medium text-amber-400">Coming Soon: A-B Repeat Looping for shadowing practice</span>
                </div>
              </div>
            </div>
          </section>

          {/* Open Source Section */}
          <section className="open-source-section bg-slate-50 py-16 dark:bg-slate-900" aria-label="Open Source Section">
            <div className="container mx-auto px-4">
              <div className="mb-10 text-center">
                <h2 className="mb-4 text-3xl font-bold">
                  Open Source & Privacy-First
                </h2>
                <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                  Your learning data stays on your device. No accounts, no cloud sync, no tracking.
                  LearnifyTube is 100% open source and community-driven.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                <Card className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4 dark:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-xl">Contribute</CardTitle>
                    <CardDescription>
                      Help us build the best language learning video player. Code, ideas, and feedback welcome.
                    </CardDescription>
                  </CardHeader>
                  <div className="mt-auto pt-4">
                    <a
                      href="https://github.com/hunght/LearnifyTube"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      View on GitHub
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </Card>

                <Card className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-blue-100 p-4 dark:bg-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <path d="M12 18v-6"></path>
                      <path d="M8 18v-1"></path>
                      <path d="M16 18v-3"></path>
                    </svg>
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-xl">Documentation</CardTitle>
                    <CardDescription>
                      Learn about all features, keyboard shortcuts, and how to get the most out of LearnifyTube.
                    </CardDescription>
                  </CardHeader>
                  <div className="mt-auto pt-4">
                    <a
                      href="https://github.com/hunght/LearnifyTube#readme"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Read Docs
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </Card>

                <Card className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-4 dark:bg-green-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-xl">Community</CardTitle>
                    <CardDescription>
                      Join language learners and developers. Share tips, request features, get help.
                    </CardDescription>
                  </CardHeader>
                  <div className="mt-auto pt-4">
                    <a
                      href={siteConfig.links.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Join Discord
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <div className="mb-4 inline-flex items-center justify-center space-x-2">
                  <GitHubButton
                    href="https://github.com/hunght/LearnifyTube/stargazers"
                    type="star"
                    className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                  >
                    <span className="text-sm font-medium">Star</span>
                  </GitHubButton>

                  <GitHubButton
                    href="https://github.com/hunght/LearnifyTube/fork"
                    type="fork"
                    className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                  >
                    <span className="text-sm font-medium">Fork</span>
                  </GitHubButton>

                  <GitHubButton
                    href="https://github.com/hunght/LearnifyTube/issues"
                    type="issue"
                    className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                  >
                    <span className="text-sm font-medium">Issues</span>
                  </GitHubButton>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  LearnifyTube is licensed under the{' '}
                  <a
                    href="https://github.com/hunght/LearnifyTube/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    MIT License
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Blog Section */}
          <section className="blog-section container mx-auto px-4 py-16" aria-label="Latest blog posts">
            <h2 className="mb-12 text-center text-3xl font-bold" id="latest-posts">
              Latest Posts
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <PostItem
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                />
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section bg-gradient-to-r from-blue-600 to-green-600 py-16" aria-label="Call to action">
            <div className="container mx-auto px-4 text-center">
              <h2 className="mb-6 text-3xl font-bold text-white" id="cta-heading">
                Start Learning from Videos Today
              </h2>
              <p className="mb-8 text-lg text-white/80">
                Join thousands of language learners using LearnifyTube for immersive, offline video learning.
              </p>
              <DownloadNowButton size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                Download Free
              </DownloadNowButton>

              {/* Email Subscription */}
              <div className="mt-8 text-center">
                <p className="mb-4 text-sm font-medium text-white/80">
                  Get notified about new features
                </p>
                <div className="mx-auto max-w-md">
                  <EmailSubscriptionForm />
                </div>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
