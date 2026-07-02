import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'eBPF Landscape',
    short_name: 'eBPF Landscape',
    description:
      'A comprehensive landscape of eBPF tools, projects, and resources',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffe020',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['technology', 'developer', 'productivity'],
    lang: 'en',
    dir: 'ltr',
  };
}
