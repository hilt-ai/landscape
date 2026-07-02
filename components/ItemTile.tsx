'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  CopyLinkIcon,
  GithubIcon,
  Building01Icon,
  ImageNotFound01Icon,
  Cancel01Icon,
  Agreement02Icon,
} from 'hugeicons-react';
import { Item, ItemMembership } from '@/lib/types';
import { getTestId } from '@/lib/test-ids';

interface ItemTileProps {
  item: Item;
  membership: ItemMembership;
  index: number;
  onItemClick?: (item: Item) => void;
}

export function ItemTile({ item, membership, onItemClick }: ItemTileProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<
    'left' | 'center' | 'right'
  >('center');
  const tileRef = useRef<HTMLDivElement>(null);

  const isFeatured =
    membership.isPlatinumMember || membership.isEbpfContributor;
  const gridSpan = membership.isLarge
    ? 'col-span-4 row-span-4'
    : isFeatured
      ? 'col-span-2 row-span-2'
      : 'col-span-1 row-span-1';
  const logoSize = membership.isLarge
    ? 'w-52 h-52'
    : isFeatured
      ? 'w-20 h-20'
      : 'w-10 h-10';

  const getBorderClasses = () => {
    if (membership.isPlatinumMember) {
      return 'border-yellow-300 border-2';
    } else if (membership.isEbpfContributor) {
      return 'border-blue-400 border-2';
    } else if (membership.isMember) {
      return 'border-stone-900 border-2';
    } else {
      return 'border-stone-300 border-dashed border-2';
    }
  };

  const computeTooltipPosition = () => {
    if (!tileRef.current) return;
    const tileRect = tileRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (viewportWidth < 640) {
      setTooltipPosition('center');
    } else if (tileRect.left + 320 > viewportWidth - 20) {
      setTooltipPosition('right');
    } else if (tileRect.left - 320 < 20) {
      setTooltipPosition('left');
    } else {
      setTooltipPosition('center');
    }
  };

  const getTooltipPositionClasses = () => {
    const viewportWidth =
      typeof window !== 'undefined' ? window.innerWidth : 1024;

    if (viewportWidth < 640) {
      return 'left-1/2 transform -translate-x-1/2';
    }

    switch (tooltipPosition) {
      case 'left':
        return 'left-0 transform-none';
      case 'right':
        return 'right-0 transform-none';
      default:
        return 'left-1/2 transform -translate-x-1/2';
    }
  };

  return (
    <div className={`relative group ${gridSpan}`}>
      <div
        ref={tileRef}
        {...getTestId('itemTile')}
        className={`relative w-full h-full bg-white border rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-lg cursor-pointer ${getBorderClasses()}`}
        data-item-slug={item.slug}
        onClick={() => onItemClick?.(item)}
        onMouseEnter={() => {
          if (typeof window !== 'undefined' && window.innerWidth >= 640) {
            computeTooltipPosition();
            setShowTooltip(true);
          }
        }}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className={`relative ${logoSize} flex-shrink-0`}>
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded">
              <ImageNotFound01Icon
                className={`${membership.isLarge ? 'w-8 h-8' : 'w-4 h-4'} text-stone-400`}
              />
            </div>
          ) : (
            <Image
              {...getTestId('itemLogo')}
              src={`/data/logos/${item.logo || `${item.slug}.svg`}`}
              alt={`${item.company} logo`}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-300"
              sizes={membership.isLarge ? '64px' : '32px'}
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {membership.isPlatinumMember && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <span className="px-2 py-0.5 text-xs bg-yellow-300 text-stone-900 rounded font-medium">
              Platinum
            </span>
          </div>
        )}

        {/* TODO: Decide if we want these to be larger and have the label tags re-enabled. */}
        {/* {membership.isMember && !membership.isPlatinumMember && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <span className="px-2 py-0.5 text-xs bg-stone-900 text-white rounded font-medium">
              Member
            </span>
          </div>
        )} */}

        {membership.isEbpfContributor && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <span className="px-2 py-0.5 text-xs bg-blue-700 text-white rounded font-medium">
              Contributor
            </span>
          </div>
        )}
      </div>

      {item.acquired && (
        <div
          className="absolute top-2 right-2 pointer-events-none"
          title={`Acquired by ${item.acquired.by}${item.acquired.year ? ` (${item.acquired.year})` : ''}`}
        >
          {membership.isLarge || isFeatured ? (
            <div className="w-6 h-6 rounded-full bg-yellow-300 text-stone-900 border border-yellow-300 shadow flex items-center justify-center">
              <Agreement02Icon className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-300 border border-yellow-300" />
          )}
        </div>
      )}

      {showTooltip && (
        <div
          className={`absolute z-50 w-80 p-4 bg-white border border-stone-200 rounded-lg shadow-lg top-full mt-1 ${getTooltipPositionClasses()} hidden sm:block`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div
            className={`absolute -top-2 w-4 h-4 bg-white border-l border-t border-stone-200 rotate-45 ${
              tooltipPosition === 'left'
                ? 'left-4'
                : tooltipPosition === 'right'
                  ? 'right-4'
                  : 'left-1/2 transform -translate-x-1/2'
            }`}
          ></div>

          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 p-1 text-stone-400 hover:text-stone-600 transition-colors"
            aria-label="Close tooltip"
          >
            <Cancel01Icon className="w-4 h-4" />
          </button>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded">
                    <ImageNotFound01Icon className="w-6 h-6 text-stone-400" />
                  </div>
                ) : (
                  <Image
                    src={`/data/logos/${item.logo || `${item.slug}.svg`}`}
                    alt={`${item.company} logo`}
                    fill
                    className="object-contain"
                    sizes="48px"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
              <div>
                <h3
                  {...getTestId('itemName')}
                  className="text-lg font-semibold text-stone-900"
                >
                  {item.company}
                </h3>
                {item.location && (
                  <p className="text-sm text-stone-600">{item.location}</p>
                )}
                {item.acquired && (
                  <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-300 text-stone-900 text-xs font-medium">
                    <Agreement02Icon className="w-3.5 h-3.5 mr-1" />
                    Acquired by {item.acquired.by}
                    {item.acquired.year ? ` (${item.acquired.year})` : ''}
                  </div>
                )}
              </div>
            </div>

            <p
              {...getTestId('itemDescription')}
              className="text-sm text-stone-700"
            >
              {item.description}
            </p>

            {item.category && item.category.length > 0 && (
              <div {...getTestId('itemTags')} className="flex flex-wrap gap-1">
                {item.category.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 text-xs bg-stone-100 text-stone-700 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            <div
              {...getTestId('itemLinks')}
              className="flex space-x-3 pt-2 border-t border-stone-100"
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
        </div>
      )}
    </div>
  );
}
