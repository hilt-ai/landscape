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

interface ItemRowProps {
  item: Item;
  membership: ItemMembership;
  index: number;
  onItemClick?: (item: Item) => void;
}

export function ItemRow({ item, membership, onItemClick }: ItemRowProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      {...getTestId('itemRow')}
      className="group bg-white border border-stone-200 rounded-lg p-4 hover:border-yellow-300 transition-all duration-200 hover:shadow-lg hover:shadow-yellow-300/10 cursor-pointer"
      data-item-slug={item.slug}
      onClick={() => onItemClick?.(item)}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="relative w-12 h-12">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded">
                <ImageNotFound01Icon className="w-6 h-6 text-stone-400" />
              </div>
            ) : (
              <Image
                {...getTestId('itemLogo')}
                src={`/data/logos/${item.logo || `${item.slug}.svg`}`}
                alt={`${item.company} logo`}
                fill
                className="object-contain"
                sizes="48px"
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3
                {...getTestId('itemName')}
                className="text-lg font-semibold text-stone-900 group-hover:text-stone-900 transition-colors truncate"
              >
                {item.company}
              </h3>

              <p
                {...getTestId('itemDescription')}
                className="text-sm text-stone-600 mt-1 line-clamp-2"
              >
                {item.description}
              </p>

              {item.category && item.category.length > 0 && (
                <div
                  {...getTestId('itemTags')}
                  className="flex flex-wrap gap-1 mt-2"
                >
                  {item.category.slice(0, 3).map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 text-xs bg-stone-100 text-stone-700 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  {item.category.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-stone-100 text-stone-700 rounded-full">
                      +{item.category.length - 3}
                    </span>
                  )}
                </div>
              )}

              {item.location && (
                <div className="flex items-center space-x-4 mt-2 text-xs text-stone-500">
                  <span>{item.location}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-2">
                {membership.isPlatinumMember && (
                  <span className="px-2 py-0.5 text-xs bg-yellow-300 text-stone-900 rounded font-medium">
                    Platinum
                  </span>
                )}
                {membership.isMember && !membership.isPlatinumMember && (
                  <span className="px-2 py-0.5 text-xs bg-stone-900 text-white rounded font-medium">
                    Member
                  </span>
                )}
                {membership.isEbpfContributor && (
                  <span className="px-2 py-0.5 text-xs bg-blue-400 text-white rounded font-medium">
                    Contributor
                  </span>
                )}
              </div>
            </div>

            <div
              {...getTestId('itemLinks')}
              className="flex items-center space-x-2 ml-4"
            >
              <a
                {...getTestId('itemHomepage')}
                href={item.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
                aria-label={`Visit ${item.company} homepage`}
              >
                <CopyLinkIcon className="w-5 h-5" />
              </a>

              {item.github_repo && (
                <a
                  {...getTestId('itemRepository')}
                  href={item.github_repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-stone-700 transition-colors"
                  aria-label={`View ${item.company} repository`}
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              )}

              {item.crunchbase && (
                <a
                  {...getTestId('itemCrunchbase')}
                  href={item.crunchbase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-stone-700 transition-colors"
                  aria-label={`View ${item.company} on Crunchbase`}
                >
                  <Building01Icon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
