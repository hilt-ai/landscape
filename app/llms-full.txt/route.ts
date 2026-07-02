import { loadItems, loadCategories } from '@/lib/data-loader';
import { SITE_CONFIG } from '@/lib/constants';

export const dynamic = 'force-static';

export function GET() {
  const items = loadItems();
  const categories = loadCategories();

  const lines: string[] = [
    `# ${SITE_CONFIG.name} — Full Dataset`,
    '',
    `> Complete machine-readable dump of all ${items.length} entries in the eBPF Landscape as of build time. Each entry represents a company or project in the eBPF ecosystem.`,
    '',
    '## Categories',
    '',
    ...categories.map((c) => `- ${c}`),
    '',
    '## Entries',
    '',
  ];

  for (const item of items) {
    lines.push(`### ${item.company}`);
    lines.push('');
    lines.push(`- **Slug**: ${item.slug}`);
    lines.push(`- **Categories**: ${item.category.join(', ')}`);

    if (item.status?.length) {
      lines.push(`- **Status**: ${item.status.join(', ')}`);
    }
    if (item.description) {
      lines.push(`- **Description**: ${item.description}`);
    }
    if (item.location) {
      lines.push(`- **Location**: ${item.location}`);
    }
    if (item.website) {
      lines.push(`- **Website**: ${item.website}`);
    }
    if (item.github_repo) {
      lines.push(`- **GitHub**: ${item.github_repo}`);
    }
    if (item.year_founded) {
      lines.push(`- **Founded**: ${item.year_founded}`);
    }
    if (item.funding_status) {
      lines.push(`- **Funding**: ${item.funding_status}`);
    }
    if (item.crunchbase) {
      lines.push(`- **Crunchbase**: ${item.crunchbase}`);
    }
    if (item.acquired) {
      const acq = item.acquired;
      const acqStr = acq.amount
        ? `Acquired by ${acq.by} in ${acq.year} (${acq.amount})`
        : `Acquired by ${acq.by} in ${acq.year}`;
      lines.push(`- **Acquired**: ${acqStr}`);
    }

    lines.push('');
  }

  lines.push('---');
  lines.push(
    `*Generated from ${SITE_CONFIG.github} — see /llms.txt for a summary.*`
  );

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
