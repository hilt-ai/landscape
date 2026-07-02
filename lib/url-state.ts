import { SearchFilters, ViewMode, SortOption } from '@/lib/types';

export type { SearchFilters, ViewMode, SortOption };

/**
 * Parse URL search parameters into SearchFilters
 */
export function parseSearchParams(searchParams: URLSearchParams): {
  filters: SearchFilters;
  sort: SortOption;
  view: ViewMode;
} {
  const query = searchParams.get('q') || undefined;
  const category = searchParams.get('category') || undefined;
  const status = searchParams.get('status') || undefined;
  const location = searchParams.get('location') || undefined;
  const sort = (searchParams.get('sort') as SortOption) || 'name-asc';
  const view = (searchParams.get('view') as ViewMode) || 'grid';

  const validSortOptions: SortOption[] = ['name-asc', 'name-desc'];
  const validSort = validSortOptions.includes(sort) ? sort : 'name-asc';

  const validViewModes: ViewMode[] = ['grid', 'list', 'card'];
  const validView = validViewModes.includes(view) ? view : 'grid';

  return {
    filters: {
      query,
      category,
      status,
      location,
    },
    sort: validSort,
    view: validView,
  };
}

/**
 * Build URL search parameters from SearchFilters
 */
export function buildSearchParams(filters: SearchFilters): string {
  const params = new URLSearchParams();

  if (filters.query) {
    params.set('q', filters.query);
  }

  if (filters.category) {
    params.set('category', filters.category);
  }

  if (filters.status) {
    params.set('status', filters.status);
  }

  if (filters.location) {
    params.set('location', filters.location);
  }

  if (filters.sort) {
    params.set('sort', filters.sort);
  }

  if (filters.view) {
    params.set('view', filters.view);
  }

  return params.toString();
}

/**
 * Update search parameters with new values
 */
export function updateSearchParams(
  currentParams: URLSearchParams,
  updates: Partial<SearchFilters>
): string {
  const newParams = new URLSearchParams(currentParams);

  if ('query' in updates) {
    if (updates.query && updates.query.trim()) {
      newParams.set('q', updates.query);
    } else {
      newParams.delete('q');
    }
  }

  if ('category' in updates) {
    if (updates.category && updates.category.trim()) {
      newParams.set('category', updates.category);
    } else {
      newParams.delete('category');
    }
  }

  if ('status' in updates) {
    if (updates.status && updates.status.trim()) {
      newParams.set('status', updates.status);
    } else {
      newParams.delete('status');
    }
  }

  if ('location' in updates) {
    if (updates.location && updates.location.trim()) {
      newParams.set('location', updates.location);
    } else {
      newParams.delete('location');
    }
  }

  if ('sort' in updates) {
    if (updates.sort && updates.sort.trim()) {
      newParams.set('sort', updates.sort);
    } else {
      newParams.delete('sort');
    }
  }

  if ('view' in updates) {
    if (updates.view && updates.view.trim()) {
      newParams.set('view', updates.view);
    } else {
      newParams.delete('view');
    }
  }

  return newParams.toString();
}

/**
 * Get current URL pathname without search params
 */
export function getCurrentPathname(): string {
  if (typeof window === 'undefined') {
    return '/';
  }
  return window.location.pathname;
}

/**
 * Create URL with updated search parameters
 */
export function createUrlWithParams(pathname: string, params: string): string {
  if (!params) {
    return pathname;
  }
  return `${pathname}?${params}`;
}

/**
 * Navigate to URL with search parameters (client-side only)
 */
export function navigateWithParams(pathname: string, params: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const url = createUrlWithParams(pathname, params);
  window.history.pushState({}, '', url);
}

/**
 * Replace current URL with search parameters (client-side only)
 */
export function replaceWithParams(pathname: string, params: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const url = createUrlWithParams(pathname, params);
  window.history.replaceState({}, '', url);
}

/**
 * Get default filters for a group
 */
export function getDefaultFiltersForCategory(category: string): SearchFilters {
  return {
    category,
    view: 'grid',
    sort: 'name-asc',
  };
}

/**
 * Clear all filters except view
 */
export function clearFiltersExceptView(
  currentFilters: SearchFilters
): SearchFilters {
  return {
    view: currentFilters.view || 'grid',
  };
}

/**
 * Check if filters have changed
 */
export function filtersHaveChanged(
  oldFilters: SearchFilters,
  newFilters: SearchFilters
): boolean {
  const keys = [
    'query',
    'category',
    'status',
    'location',
    'sort',
    'view',
  ] as const;

  for (const key of keys) {
    const oldValue = oldFilters[key];
    const newValue = newFilters[key];

    if (oldValue !== newValue) {
      return true;
    }
  }

  return false;
}
