import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'eBPF Landscape',
    template: '%s | eBPF Landscape',
  },
  description:
    'A comprehensive directory of eBPF tools, projects and companies. Discover the ecosystem spanning networking, observability, security and profiling.',
  keywords: [
    'eBPF',
    'landscape',
    'tools',
    'projects',
    'resources',
    'networking',
    'security',
    'observability',
    'kernel',
    'linux',
    'performance',
    'monitoring',
    'tracing',
    'Cilium',
    'Falco',
    'BPF',
    'XDP',
    'TC',
  ],
  authors: [{ name: 'eBPF Community' }],
  creator: 'eBPF Community',
  publisher: 'eBPF Community',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: 'eBPF Landscape',
    title: 'eBPF Landscape',
    description:
      'A comprehensive directory of eBPF tools, projects and companies spanning networking, observability, security and profiling.',
    images: [
      {
        url: '/social-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'eBPF Landscape - Community directory of eBPF tools and projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ebpfio',
    creator: '@ebpfio',
    title: 'eBPF Landscape',
    description:
      'A comprehensive directory of eBPF tools, projects and companies spanning networking, observability, security and profiling.',
    images: ['/social-preview.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  category: 'technology',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      publisher: {
        '@type': 'Organization',
        name: 'eBPF Community',
        url: 'https://ebpf.io',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_CONFIG.url}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Dataset',
      '@id': `${SITE_CONFIG.url}/#dataset`,
      name: `${SITE_CONFIG.name} Dataset`,
      description:
        'A comprehensive, community-maintained dataset of companies and projects in the eBPF ecosystem, covering networking, observability, security, and profiling.',
      url: SITE_CONFIG.url,
      distribution: [
        {
          '@type': 'DataDownload',
          encodingFormat: 'application/json',
          contentUrl: `${SITE_CONFIG.url}/api/items`,
        },
        {
          '@type': 'DataDownload',
          encodingFormat: 'text/plain',
          contentUrl: `${SITE_CONFIG.url}/llms-full.txt`,
          name: 'LLM-optimised full dataset',
        },
      ],
      license: 'https://www.apache.org/licenses/LICENSE-2.0',
      creator: {
        '@type': 'Organization',
        name: 'eBPF Community',
        url: 'https://ebpf.io',
      },
      keywords: [
        'eBPF',
        'BPF',
        'Linux kernel',
        'networking',
        'observability',
        'security',
        'profiling',
      ],
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
