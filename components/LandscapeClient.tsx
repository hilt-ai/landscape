'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { FiltersBar } from '@/components/FiltersBar';
import { ItemsGrid } from '@/components/ItemsGrid';
import { ItemsList } from '@/components/ItemsList';
import { ItemsCard } from '@/components/ItemsCard';
import { ItemModal } from '@/components/ItemModal';
import { getTestId } from '@/lib/test-ids';
import {
  SearchFilters,
  SortOption,
  ViewMode,
  Item,
  ItemMembership,
} from '@/lib/types';
import { applyFilters, applySort, getFilterOptions } from '@/lib/filters';
import { updateSearchParams } from '@/lib/url-state';

interface LandscapeClientProps {
  initialItems: Item[];
  initialSort: SortOption;
  initialView: ViewMode;
  itemMemberships: Map<string, ItemMembership>;
  orderedCategories: string[];
}

export function LandscapeClient({
  initialItems,
  initialSort,
  initialView,
  itemMemberships,
  orderedCategories,
}: LandscapeClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [items] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const view = (searchParams.get('view') as ViewMode) || initialView;
  const sort = (searchParams.get('sort') as SortOption) || initialSort;
  const filters = useMemo<SearchFilters>(
    () => ({
      query: searchParams.get('q') || undefined,
      category: searchParams.get('category') || undefined,
      status: searchParams.get('status') || undefined,
      location: searchParams.get('location') || undefined,
    }),
    [searchParams]
  );

  const filteredItems = applyFilters(items, filters);
  const sortedItems = applySort(filteredItems, sort);

  const filterOptions = getFilterOptions(items, orderedCategories);
  const {
    categories: availableCategories,
    locations: availableLocations,
    statuses: availableStatuses,
  } = filterOptions;

  const updateURL = useCallback(
    (updates: Partial<SearchFilters>) => {
      const newParams = updateSearchParams(searchParams, updates);
      const newURL = newParams ? `?${newParams}` : '/';
      router.push(newURL);
    },
    [router, searchParams]
  );

  const handleViewToggle = useCallback(() => {
    const viewOrder: ViewMode[] = ['grid', 'list', 'card'];
    const currentIndex = viewOrder.indexOf(view);
    const nextIndex = (currentIndex + 1) % viewOrder.length;
    const newView = viewOrder[nextIndex];
    updateURL({ view: newView });
  }, [view, updateURL]);

  const handleFiltersChange = useCallback(
    (updates: Partial<SearchFilters>) => {
      updateURL(updates);
    },
    [updateURL]
  );

  const handleSortChange = useCallback(
    (newSort: SortOption) => {
      updateURL({ sort: newSort });
    },
    [updateURL]
  );

  const handleClearFilters = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleOpenModal = useCallback((item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
        const activeElement = document.activeElement;
        if (
          activeElement?.tagName !== 'INPUT' &&
          activeElement?.tagName !== 'TEXTAREA'
        ) {
          event.preventDefault();
          const searchInput = document.querySelector(
            '[data-testid="search-input"]'
          ) as HTMLInputElement;
          searchInput?.focus();
        }
      }

      if (event.key === 'v' && !event.ctrlKey && !event.metaKey) {
        const activeElement = document.activeElement;
        if (
          activeElement?.tagName !== 'INPUT' &&
          activeElement?.tagName !== 'TEXTAREA'
        ) {
          event.preventDefault();
          handleViewToggle();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleViewToggle]);

  return (
    <div className="bg-white">
      <main
        {...getTestId('mainContent')}
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 bg-white"
      >
        <FiltersBar
          filters={filters}
          sort={sort}
          availableCategories={availableCategories}
          availableLocations={availableLocations}
          availableStatuses={availableStatuses}
          onFiltersChange={handleFiltersChange}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />

        <div className="mt-6 mb-6">
          <p className="text-stone-600">
            Showing {sortedItems.length} of {items.length} items
            {filters.query && ` for "${filters.query}"`}
          </p>
        </div>

        {view === 'list' ? (
          <ItemsList
            items={sortedItems}
            itemMemberships={itemMemberships}
            onItemClick={handleOpenModal}
          />
        ) : view === 'card' ? (
          <ItemsCard
            items={sortedItems}
            itemMemberships={itemMemberships}
            onItemClick={handleOpenModal}
          />
        ) : (
          <ItemsGrid
            items={sortedItems}
            itemMemberships={itemMemberships}
            orderedCategories={orderedCategories}
            onItemClick={handleOpenModal}
          />
        )}
      </main>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
