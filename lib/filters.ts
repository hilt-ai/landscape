import { Item, SearchFilters, SortOption } from '@/lib/types';

/**
 * Apply filters to items (alias for filterItems for compatibility)
 */
export function applyFilters(items: Item[], filters: SearchFilters): Item[] {
  return filterItems(items, filters);
}

/**
 * Apply sorting to items (alias for sortItems for compatibility)
 */
export function applySort(items: Item[], sortOption: SortOption): Item[] {
  return sortItems(items, sortOption);
}

/**
 * Filter items based on search criteria
 */
export function filterItems(items: Item[], filters: SearchFilters): Item[] {
  let filtered = [...items];

  if (filters.query) {
    const query = filters.query.toLowerCase().trim();
    filtered = filtered.filter((item) => {
      const searchableText = [
        item.company,
        item.description || '',
        ...item.category,
        item.location || '',
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }

  if (filters.category) {
    filtered = filtered.filter((item) =>
      item.category.includes(
        filters.category! as
          | 'Networking'
          | 'Observability'
          | 'Profiling'
          | 'Security'
          | 'End User'
          | 'Other'
      )
    );
  }

  if (filters.status) {
    filtered = filtered.filter(
      (item) =>
        item.status &&
        item.status.includes(
          filters.status! as 'Platinum Member' | 'eBPF Contributor' | 'Member'
        )
    );
  }

  if (filters.location) {
    filtered = filtered.filter((item) =>
      item.location?.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  return filtered;
}

/**
 * Sort items based on sort option
 */
export function sortItems(items: Item[], sortOption: SortOption): Item[] {
  const sorted = [...items];

  switch (sortOption) {
    case 'name-asc':
      return sorted.sort((a, b) => a.company.localeCompare(b.company));

    case 'name-desc':
      return sorted.sort((a, b) => b.company.localeCompare(a.company));

    default:
      return sorted.sort((a, b) => a.company.localeCompare(b.company));
  }
}

/**
 * Get unique values for filter options
 */
export function getFilterOptions(items: Item[], orderedCategories: string[]) {
  const categories = new Set<string>();
  const locations = new Set<string>();
  const statuses = new Set<string>();

  for (const item of items) {
    for (const category of item.category) {
      categories.add(category);
    }
    if (item.location) {
      locations.add(item.location);
    }
    if (item.status) {
      for (const status of item.status) {
        statuses.add(status);
      }
    }
  }

  const availableCategories = orderedCategories.filter((category) =>
    categories.has(category)
  );

  return {
    categories: availableCategories,
    locations: Array.from(locations).sort(),
    statuses: Array.from(statuses).sort(),
  };
}

/**
 * Check if filters are active
 */
export function hasActiveFilters(filters: SearchFilters): boolean {
  return !!(
    filters.query ||
    filters.status ||
    filters.category ||
    filters.location
  );
}

/**
 * Clear all filters
 */
export function clearFilters(): SearchFilters {
  return {};
}

/**
 * Get filter summary for display
 */
export function getFilterSummary(filters: SearchFilters): string[] {
  const summary: string[] = [];

  if (filters.query) {
    summary.push(`Search: "${filters.query}"`);
  }

  if (filters.status) {
    summary.push(`Status: ${filters.status}`);
  }

  if (filters.category) {
    summary.push(`Category: ${filters.category}`);
  }

  if (filters.location) {
    summary.push(`Location: ${filters.location}`);
  }

  return summary;
}
