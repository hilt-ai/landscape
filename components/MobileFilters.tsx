'use client';

import { useState, useMemo } from 'react';
import { ArrowDown01Icon } from 'hugeicons-react';
import { SearchFilters, SortOption } from '@/lib/types';
import { getTestId } from '@/lib/test-ids';

interface MobileFiltersProps {
  filters: SearchFilters;
  sort: SortOption;
  onFiltersChange: (updates: Partial<SearchFilters>) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  availableCategories: string[];
  availableLocations: string[];
  availableStatuses: string[];
}

export function MobileFilters({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onClearFilters,
  availableCategories,
  availableLocations,
  availableStatuses,
}: MobileFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = useMemo(() => {
    return !!(filters.status || filters.category || filters.location);
  }, [filters]);

  const activeFilters = useMemo(() => {
    const pills = [];

    if (filters.category) {
      pills.push({
        type: 'category',
        label: filters.category,
        onRemove: () => onFiltersChange({ category: undefined }),
      });
    }

    if (filters.status) {
      pills.push({
        type: 'status',
        label: filters.status,
        onRemove: () => onFiltersChange({ status: undefined }),
      });
    }

    if (filters.location) {
      pills.push({
        type: 'location',
        label: filters.location,
        onRemove: () => onFiltersChange({ location: undefined }),
      });
    }

    return pills;
  }, [filters, onFiltersChange]);

  return (
    <div
      {...getTestId('mobileFilters')}
      className="md:hidden bg-stone-50 border-b border-stone-200"
    >
      {!isExpanded && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-stone-700">Filters</h3>
            <button
              onClick={() => setIsExpanded(true)}
              className="text-yellow-300 hover:text-yellow-700 text-sm transition-colors"
            >
              {hasActiveFilters ? 'Edit' : 'Add Filters'}
            </button>
          </div>

          {hasActiveFilters ? (
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <div
                  key={`${filter.type}-${index}`}
                  className="flex items-center gap-1 px-3 py-1 bg-stone-200 text-stone-800 rounded-full text-sm"
                >
                  <span>{filter.label}</span>
                  <button
                    onClick={filter.onRemove}
                    className="ml-1 text-stone-500 hover:text-stone-700 transition-colors"
                    aria-label={`Remove ${filter.label} filter`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={onClearFilters}
                className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-sm transition-colors"
              >
                Clear All
              </button>
            </div>
          ) : (
            <p className="text-stone-500 text-sm">No filters applied</p>
          )}
        </div>
      )}

      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-stone-700">Filters</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-stone-500 hover:text-stone-700 transition-colors"
              aria-label="Close filters"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div>
            <label
              htmlFor="mobile-category-filter"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="mobile-category-filter"
                value={filters.category || ''}
                onChange={(e) =>
                  onFiltersChange({ category: e.target.value || undefined })
                }
                className="appearance-none w-full px-3 pr-10 py-2 bg-white border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent cursor-pointer"
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

          <div>
            <label
              htmlFor="mobile-status-filter"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="mobile-status-filter"
                value={filters.status || ''}
                onChange={(e) =>
                  onFiltersChange({ status: e.target.value || undefined })
                }
                className="appearance-none w-full px-3 pr-10 py-2 bg-white border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent cursor-pointer"
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

          <div>
            <label
              htmlFor="mobile-location-filter"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Location
            </label>
            <div className="relative">
              <select
                id="mobile-location-filter"
                value={filters.location || ''}
                onChange={(e) =>
                  onFiltersChange({ location: e.target.value || undefined })
                }
                className="appearance-none w-full px-3 pr-10 py-2 bg-white border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent cursor-pointer"
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

          <div>
            <label
              htmlFor="mobile-sort-menu"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Sort
            </label>
            <div className="relative">
              <select
                id="mobile-sort-menu"
                value={sort}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="appearance-none w-full px-3 pr-10 py-2 bg-white border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent cursor-pointer"
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
            <button
              onClick={onClearFilters}
              className="w-full px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-[34px] transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
