'use client';

import { useMemo } from 'react';
import { ArrowDown01Icon } from 'hugeicons-react';
import { SearchFilters, SortOption } from '@/lib/types';
import { getTestId } from '@/lib/test-ids';
import { MobileFilters } from '@/components/MobileFilters';

interface FiltersBarProps {
  filters: SearchFilters;
  sort: SortOption;
  onFiltersChange: (updates: Partial<SearchFilters>) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  availableCategories: string[];
  availableLocations: string[];
  availableStatuses: string[];
}

export function FiltersBar({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onClearFilters,
  availableCategories,
  availableLocations,
  availableStatuses,
}: FiltersBarProps) {
  const hasActiveFilters = useMemo(() => {
    return !!(filters.status || filters.category || filters.location);
  }, [filters]);

  return (
    <>
      <MobileFilters
        filters={filters}
        sort={sort}
        onFiltersChange={onFiltersChange}
        onSortChange={onSortChange}
        onClearFilters={onClearFilters}
        availableCategories={availableCategories}
        availableLocations={availableLocations}
        availableStatuses={availableStatuses}
      />

      <div
        {...getTestId('filtersBar')}
        className="hidden md:flex flex-wrap items-center gap-4 p-4 bg-stone-50 border-b border-stone-200"
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="category-filter"
            className="text-sm font-medium text-stone-700"
          >
            Category
          </label>
          <div className="relative">
            <select
              id="category-filter"
              {...getTestId('categoryFilter')}
              value={filters.category || ''}
              onChange={(e) =>
                onFiltersChange({ category: e.target.value || undefined })
              }
              aria-label="Filter by category"
              className="appearance-none px-3 pr-10 py-2 bg-white border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent w-full cursor-pointer"
            >
              <option value="">All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ArrowDown01Icon className="h-4 w-4 text-stone-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="status-filter"
            className="text-sm font-medium text-stone-700"
          >
            Status
          </label>
          <div className="relative">
            <select
              id="status-filter"
              {...getTestId('statusFilter')}
              value={filters.status || ''}
              onChange={(e) =>
                onFiltersChange({ status: e.target.value || undefined })
              }
              aria-label="Filter by status"
              className="appearance-none px-3 pr-10 py-2 bg-white border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent w-full cursor-pointer"
            >
              <option value="">All Statuses</option>
              {availableStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ArrowDown01Icon className="h-4 w-4 text-stone-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="location-filter"
            className="text-sm font-medium text-stone-700"
          >
            Location
          </label>
          <div className="relative">
            <select
              id="location-filter"
              {...getTestId('locationFilter')}
              value={filters.location || ''}
              onChange={(e) =>
                onFiltersChange({ location: e.target.value || undefined })
              }
              aria-label="Filter by location"
              className="appearance-none px-3 pr-10 py-2 bg-white border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent w-full cursor-pointer"
            >
              <option value="">All Locations</option>
              {availableLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ArrowDown01Icon className="h-4 w-4 text-stone-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="sort-menu"
            className="text-sm font-medium text-stone-700"
          >
            Sort
          </label>
          <div className="relative">
            <select
              id="sort-menu"
              {...getTestId('sortMenu')}
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort items"
              className="appearance-none px-3 pr-10 py-2 bg-white border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent w-full cursor-pointer"
            >
              <option value="name-asc">Company (A-Z)</option>
              <option value="name-desc">Company (Z-A)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ArrowDown01Icon className="h-4 w-4 text-stone-500" />
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium text-stone-700">&nbsp;</div>
            <button
              type="button"
              {...getTestId('clearFilters')}
              onClick={onClearFilters}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-[34px] transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300"
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
