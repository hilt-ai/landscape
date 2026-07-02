'use client';

import { Search01Icon } from 'hugeicons-react';
import { Item, ItemMembership } from '@/lib/types';
import { CategoryCluster } from '@/components/CategoryCluster';
import { getTestId } from '@/lib/test-ids';

interface ItemsGridProps {
  items: Item[];
  itemMemberships: Map<string, ItemMembership>;
  orderedCategories?: string[];
  onItemClick?: (item: Item) => void;
  isLoading?: boolean;
}

export function ItemsGrid({
  items,
  itemMemberships,
  orderedCategories = [],
  onItemClick,
  isLoading = false,
}: ItemsGridProps) {
  if (isLoading) {
    return (
      <div {...getTestId('itemsGrid')}>
        <div className="mb-6">
          <div className="h-4 bg-stone-200 rounded w-48 animate-pulse"></div>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <div className="h-8 bg-stone-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-stone-200 rounded w-96 animate-pulse"></div>
          </div>
          <div
            className="grid gap-2 sm:gap-4 grid-flow-row-dense"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, 60px)',
              gridAutoRows: '60px',
            }}
          >
            <div
              {...getTestId('loadingSkeleton')}
              className="bg-white border border-stone-200 rounded-lg animate-pulse flex items-center justify-center col-span-2 row-span-2"
            >
              <div className="w-16 h-16 bg-stone-200 rounded"></div>
            </div>

            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                {...getTestId('loadingSkeleton')}
                className="bg-white border border-stone-200 rounded-lg animate-pulse flex items-center justify-center"
              >
                <div className="w-8 h-8 bg-stone-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <div className="h-8 bg-stone-200 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-4 bg-stone-200 rounded w-80 animate-pulse"></div>
          </div>
          <div
            className="grid gap-2 sm:gap-4 grid-flow-row-dense"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, 60px)',
              gridAutoRows: '60px',
            }}
          >
            <div
              {...getTestId('loadingSkeleton')}
              className="bg-white border border-stone-200 rounded-lg animate-pulse flex items-center justify-center col-span-2 row-span-2"
            >
              <div className="w-16 h-16 bg-stone-200 rounded"></div>
            </div>

            <div
              {...getTestId('loadingSkeleton')}
              className="bg-white border border-stone-200 rounded-lg animate-pulse flex items-center justify-center"
            >
              <div className="w-8 h-8 bg-stone-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <div className="h-8 bg-stone-200 rounded w-20 mb-2 animate-pulse"></div>
            <div className="h-4 bg-stone-200 rounded w-72 animate-pulse"></div>
          </div>
          <div
            className="grid gap-2 sm:gap-4 grid-flow-row-dense"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, 60px)',
              gridAutoRows: '60px',
            }}
          >
            <div
              {...getTestId('loadingSkeleton')}
              className="bg-white border border-stone-200 rounded-lg animate-pulse flex items-center justify-center"
            >
              <div className="w-8 h-8 bg-stone-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div {...getTestId('emptyState')} className="text-center py-12">
        <div className="text-stone-500 mb-4">
          <Search01Icon className="w-16 h-16 mx-auto mb-4" />
        </div>
        <h3 className="text-lg font-medium text-stone-800 mb-2">
          No items found
        </h3>
        <p className="text-stone-600">
          Try adjusting your search or filters to find what you&apos;re looking
          for.
        </p>
      </div>
    );
  }

  const groupedItems = items.reduce(
    (acc, item) => {
      item.category?.map((category: string) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
      });
      return acc;
    },
    {} as Record<string, Item[]>
  );

  const categoryDescriptions: Record<string, string> = {
    Networking:
      'Companies providing eBPF-based networking solutions for load balancing, firewalling, and traffic management',
    Observability:
      'Companies offering eBPF-based observability tools for system monitoring, tracing, and performance analysis',
    Profiling: 'Companies developing eBPF-based profiling and debugging tools',
    Security:
      'Companies leveraging eBPF for security solutions including threat detection and prevention',
    Other:
      'Companies working with eBPF in other domains or providing general eBPF-related services',
  };

  const categoriesWithItems = orderedCategories.filter((category) => {
    if (!category) return false;
    const items = groupedItems[category];
    return items && items.length > 0;
  });

  return (
    <div {...getTestId('itemsGrid')}>
      {categoriesWithItems.map((category) => {
        const categoryItems = groupedItems[category] || [];
        return (
          <CategoryCluster
            key={category}
            title={category.charAt(0).toUpperCase() + category.slice(1)}
            items={categoryItems}
            itemMemberships={itemMemberships}
            description={categoryDescriptions[category]}
            onItemClick={onItemClick || (() => {})}
          />
        );
      })}
    </div>
  );
}
