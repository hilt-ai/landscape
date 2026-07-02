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
    'A comprehensive landscape of eBPF tools, projects, and resources. Discover the ecosystem of eBPF-based solutions for networking, security, observability, and more.',
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
      'A comprehensive landscape of eBPF tools, projects, and resources. Discover the ecosystem of eBPF-based solutions.',
    images: [
      {
        url: '/social-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'eBPF Landscape - Comprehensive tools and resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ebpfio',
    creator: '@ebpfio',
    title: 'eBPF Landscape',
    description:
      'A comprehensive landscape of eBPF tools, projects, and resources. Discover the ecosystem of eBPF-based solutions.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
