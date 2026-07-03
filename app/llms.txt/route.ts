import { loadItems, loadCategories } from '@/lib/data-loader';
import { SITE_CONFIG } from '@/lib/constants';

export const dynamic = 'force-static';

export function GET() {
  const items = loadItems();
  const categories = loadCategories();

  const categoryList = categories.map((c) => `- **${c}**`).join('\n');
  const itemCount = items.length;
  const memberCount = items.filter((i) => i.status?.length).length;

  const content = `# ${SITE_CONFIG.name}

> A comprehensive, community-maintained directory of ${itemCount} companies in the eBPF ecosystem. eBPF is a Linux kernel technology that enables safe, efficient programs to run in kernel space for networking, observability, security, performance, and other use cases.

## Site

- [Home](${SITE_CONFIG.url}): Interactive landscape grid with search, filters, and multiple view modes
- [Stats](${SITE_CONFIG.url}/stats): Analytics and charts on the eBPF ecosystem
- [Contribute](${SITE_CONFIG.url}/contribute): Guide for adding or updating entries

## Data

The landscape tracks ${itemCount} organisations across ${categories.length} categories, ${memberCount} of which hold formal membership status (Platinum Member, Member, or eBPF Contributor).

### Categories

${categoryList}

### Entry Schema

Each entry includes: company name, category (one or more), optional status (Platinum Member / Member / eBPF Contributor), location, description, website, GitHub, LinkedIn, year founded, funding status, Crunchbase link, and optional acquisition details.

## API

- [Items API](${SITE_CONFIG.url}/api/items): \`GET /api/items\` — returns the full dataset as JSON (items array + categories array + meta)
- [OpenAPI Schema](${SITE_CONFIG.url}/openapi.json): Machine-readable OpenAPI 3.1 schema for the API
- [Full LLM dataset](${SITE_CONFIG.url}/llms-full.txt): Complete Markdown dump of all entries, suitable for large-context ingestion

## Source

- Repository: ${SITE_CONFIG.github}
- Data files: \`data/items/*.yml\` (one YAML file per company)
- Categories: \`data/categories.yml\`

## Optional

- [Sitemap](${SITE_CONFIG.url}/sitemap.xml)
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
