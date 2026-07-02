'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  CopyLinkIcon,
  GithubIcon,
  Building01Icon,
  ImageNotFound01Icon,
} from 'hugeicons-react';
import { Item, ItemMembership } from '@/lib/types';
import { getTestId } from '@/lib/test-ids';

interface ItemsCardProps {
  items: Item[];
  itemMemberships: Map<string, ItemMembership>;
  onItemClick?: (item: Item) => void;
  isLoading?: boolean;
}

interface ItemCardProps {
  item: Item;
  membership: ItemMembership;
  onItemClick?: (item: Item) => void;
}

function ItemCard({ item, membership, onItemClick }: ItemCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      {...getTestId('itemCard')}
      className={`bg-white border rounded-lg p-6 hover:shadow-lg transition-all duration-200 flex flex-col h-full cursor-pointer ${
        membership.isPlatinumMember
          ? 'border-yellow-300 border-2'
          : membership.isEbpfContributor
            ? 'border-blue-400 border-2'
            : membership.isMember
              ? 'border-stone-900 border-2'
              : 'border-stone-300 border-2 border-dashed hover:border-stone-400'
      }`}
      data-item-slug={item.slug}
      onClick={() => onItemClick?.(item)}
    >
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded">
              <ImageNotFound01Icon className="w-8 h-8 text-stone-400" />
            </div>
          ) : (
            <Image
              {...getTestId('itemLogo')}
              src={`/data/logos/${item.logo || `${item.slug}.svg`}`}
              alt={`${item.company} logo`}
              fill
              className="object-contain"
              sizes="64px"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3
              {...getTestId('itemName')}
              className="text-lg font-semibold text-stone-900 truncate"
            >
              {item.company}
            </h3>
          </div>
          {item.location && (
            <p className="text-sm text-stone-600 truncate">{item.location}</p>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <p
          {...getTestId('itemDescription')}
          className="text-sm text-stone-700 mb-4 line-clamp-3"
        >
          {item.description}
        </p>

        {item.category && item.category.length > 0 && (
          <div {...getTestId('itemTags')} className="flex flex-wrap gap-2 mb-4">
            {item.category.slice(0, 6).map((category) => (
              <span
                key={category}
                className="px-2 py-1 text-xs bg-stone-100 text-stone-700 rounded-full"
              >
                {category}
              </span>
            ))}
            {item.category.length > 6 && (
              <span className="px-2 py-1 text-xs bg-stone-100 text-stone-500 rounded-full">
                +{item.category.length - 6} more
              </span>
            )}
          </div>
        )}

        <div className="mt-auto mb-4 flex flex-wrap gap-2">
          {membership.isPlatinumMember && (
            <span className="px-2 py-0.5 text-xs bg-yellow-300 text-stone-900 rounded font-medium">
              Platinum Member
            </span>
          )}
          {membership.isMember && !membership.isPlatinumMember && (
            <span className="px-2 py-0.5 text-xs bg-stone-900 text-white rounded font-medium">
              Member
            </span>
          )}
          {membership.isEbpfContributor && (
            <span className="px-2 py-0.5 text-xs bg-blue-400 text-white rounded font-medium">
              eBPF Contributor
            </span>
          )}
        </div>
      </div>

      <div
        {...getTestId('itemLinks')}
        className="flex flex-wrap gap-3 pt-4 border-t border-stone-100 mt-auto"
      >
        <a
          {...getTestId('itemHomepage')}
          href={item.website || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          aria-label={`Visit ${item.company} homepage`}
        >
          <CopyLinkIcon className="w-4 h-4" />
          <span>Website</span>
        </a>

        {item.github_repo && (
          <a
            {...getTestId('itemRepository')}
            href={item.github_repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-stone-600 hover:text-stone-800 transition-colors"
            aria-label={`View ${item.company} repository`}
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        )}

        {item.crunchbase && (
          <a
            {...getTestId('itemCrunchbase')}
            href={item.crunchbase}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-stone-600 hover:text-stone-800 transition-colors"
            aria-label={`View ${item.company} on Crunchbase`}
          >
            <Building01Icon className="w-4 h-4" />
            <span>Crunchbase</span>
          </a>
        )}
      </div>
    </div>
  );
}

export function ItemsCard({
  items,
  itemMemberships,
  onItemClick = () => {},
  isLoading = false,
}: ItemsCardProps) {
  if (isLoading) {
    return (
      <div {...getTestId('itemsCard')}>
        <div className="mb-6">
          <div className="h-4 bg-stone-200 rounded w-48 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              {...getTestId('loadingSkeleton')}
              className="bg-white border border-stone-200 rounded-lg p-6 animate-pulse"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-stone-200 rounded flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-stone-200 rounded w-3/4"></div>
                  <div className="h-4 bg-stone-200 rounded w-1/2"></div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="h-4 bg-stone-200 rounded w-full"></div>
                <div className="h-4 bg-stone-200 rounded w-5/6"></div>
                <div className="h-4 bg-stone-200 rounded w-4/6"></div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-6 bg-stone-200 rounded-full w-16"></div>
                <div className="h-6 bg-stone-200 rounded-full w-20"></div>
                <div className="h-6 bg-stone-200 rounded-full w-14"></div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-stone-100">
                <div className="h-4 bg-stone-200 rounded w-16"></div>
                <div className="h-4 bg-stone-200 rounded w-12"></div>
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
          <ImageNotFound01Icon className="w-16 h-16 mx-auto mb-4" />
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
    <div
      {...getTestId('itemsCard')}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((item) => (
        <ItemCard
          key={item.slug}
          item={item}
          membership={itemMemberships.get(item.slug)!}
          onItemClick={onItemClick || (() => {})}
        />
      ))}
    </div>
  );
}
