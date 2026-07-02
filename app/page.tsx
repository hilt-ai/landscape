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
  title: 'eBPF Landscape - Browse eBPF Tools, Projects & Resources',
  description:
    'Browse eBPF tools, companies and projects spanning networking, observability, security and profiling. Community-maintained directory of the eBPF ecosystem.',
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
    title: 'eBPF Landscape - Browse eBPF Tools, Projects & Resources',
    description:
      'Browse eBPF tools, companies and projects spanning networking, observability, security and profiling. Community-maintained directory of the eBPF ecosystem.',
    url: SITE_CONFIG.url,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'eBPF Landscape - Browse eBPF tools, projects and resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eBPF Landscape - Browse eBPF Tools, Projects & Resources',
    description:
      'Browse eBPF tools, companies and projects spanning networking, observability, security and profiling.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};
