import {
  loadItems,
  loadCategories,
  getItemMembership,
} from '@/lib/data-loader';
import { parseSearchParams } from '@/lib/url-state';
import { LandscapeClient } from '@/components/LandscapeClient';
import { ClientLayout } from '@/components/ClientLayout';
import { SITE_CONFIG } from '@/lib/constants';

export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const items = await loadItems();
  const orderedCategories = await loadCategories();

  const itemMemberships = new Map();
  for (const item of items) {
    itemMemberships.set(item.slug, getItemMembership(item));
  }

  const resolvedSearchParams = await searchParams;
  const { sort, view } = parseSearchParams(
    new URLSearchParams(resolvedSearchParams as Record<string, string>)
  );

  return (
    <ClientLayout>
      <LandscapeClient
        initialItems={items}
        initialSort={sort}
        initialView={view}
        itemMemberships={itemMemberships}
        orderedCategories={orderedCategories}
      />
    </ClientLayout>
  );
}

export const metadata = {
  title: 'eBPF Landscape',
  description:
    'Discover the comprehensive ecosystem of eBPF tools, projects, and resources. Explore networking, security, observability, and performance solutions built with eBPF technology.',
  keywords: [
    'eBPF tools',
    'eBPF projects',
    'eBPF resources',
    'networking tools',
    'security monitoring',
    'observability',
    'performance analysis',
    'kernel programming',
    'Cilium',
    'Falco',
    'BPF tools',
  ],
  openGraph: {
    title: 'eBPF Landscape - Comprehensive Tools & Resources',
    description:
      'Discover the comprehensive ecosystem of eBPF tools, projects, and resources. Explore networking, security, observability, and performance solutions.',
    url: SITE_CONFIG.url,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'eBPF Landscape - Comprehensive tools and resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eBPF Landscape - Comprehensive Tools & Resources',
    description:
      'Discover the comprehensive ecosystem of eBPF tools, projects, and resources.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};
