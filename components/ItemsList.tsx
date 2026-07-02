'use client';

import { Search01Icon } from 'hugeicons-react';
import { Item, ItemMembership } from '@/lib/types';
import { ItemRow } from '@/components/ItemRow';
import { getTestId } from '@/lib/test-ids';

interface ItemsListProps {
  items: Item[];
  itemMemberships: Map<string, ItemMembership>;
  onItemClick?: (item: Item) => void;
  isLoading?: boolean;
}

export function ItemsList({
  items,
  itemMemberships,
  onItemClick = () => {},
  isLoading = false,
}: ItemsListProps) {
  if (isLoading) {
    return (
      <div {...getTestId('itemsList')}>
        <div className="mb-6">
          <div className="h-4 bg-stone-200 rounded w-48 animate-pulse"></div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              {...getTestId('loadingSkeleton')}
              className="bg-white border border-stone-200 rounded-lg p-4 animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-stone-200 rounded flex-shrink-0"></div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="h-5 bg-stone-200 rounded w-1/4 mb-1"></div>

                      <div className="space-y-1 mb-2">
                        <div className="h-3 bg-stone-200 rounded w-full"></div>
                        <div className="h-3 bg-stone-200 rounded w-3/4"></div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        <div className="h-5 bg-stone-200 rounded-full w-12"></div>
                        <div className="h-5 bg-stone-200 rounded-full w-16"></div>
                        <div className="h-5 bg-stone-200 rounded-full w-14"></div>
                        <div className="h-5 bg-stone-200 rounded-full w-10"></div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="h-4 bg-stone-200 rounded w-20"></div>
                        <div className="h-4 bg-stone-200 rounded w-16"></div>
                        <div className="h-4 bg-stone-200 rounded w-12"></div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <div className="w-5 h-5 bg-stone-200 rounded"></div>
                      <div className="w-5 h-5 bg-stone-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {index % 3 === 0 && (
                  <div className="flex-shrink-0">
                    <div className="h-5 bg-stone-200 rounded-full w-16"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
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

  return (
    <div {...getTestId('itemsList')} className="space-y-4">
      {items.map((item, index) => (
        <ItemRow
          key={item.slug}
          item={item}
          membership={itemMemberships.get(item.slug)!}
          index={index}
          onItemClick={onItemClick || (() => {})}
        />
      ))}
    </div>
  );
}
