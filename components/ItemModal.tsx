'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  GithubIcon,
  Building01Icon,
  ImageNotFound01Icon,
  CopyLinkIcon,
  Location01Icon,
  PlayIcon,
  Edit01Icon,
  Mail01Icon,
  DollarCircleIcon,
  Calendar01Icon,
  Cancel01Icon,
  Agreement02Icon,
} from 'hugeicons-react';
import { Item } from '@/lib/types';

interface ItemModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getStatusBadges = () => {
    if (!item.status || item.status.length === 0) {
      return null;
    }

    return item.status
      .map((status) => {
        switch (status) {
          case 'Platinum Member':
            return (
              <span
                key={status}
                className="px-2 py-1 text-xs bg-yellow-300 text-stone-900 rounded font-medium"
              >
                Platinum Member
              </span>
            );
          case 'Member':
            return (
              <span
                key={status}
                className="px-2 py-1 text-xs bg-stone-900 text-white rounded font-medium"
              >
                Member
              </span>
            );
          case 'eBPF Contributor':
            return (
              <span
                key={status}
                className="px-2 py-1 text-xs bg-blue-400 text-white rounded font-medium"
              >
                eBPF Contributor
              </span>
            );
          default:
            return null;
        }
      })
      .filter(Boolean);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl pointer-events-auto">
          <div className="flex items-start justify-between p-6 border-b border-stone-200">
            <div className="flex items-start space-x-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded">
                    <ImageNotFound01Icon className="w-8 h-8 text-stone-400" />
                  </div>
                ) : (
                  <Image
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
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">
                    {item.company}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {getStatusBadges()}
                  </div>
                </div>

                {item.category && item.category.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.category.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 text-sm bg-stone-100 text-stone-700 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                {item.description && (
                  <p className="text-lg text-stone-600 mb-2">
                    {item.description}
                  </p>
                )}

                {item.location && (
                  <div className="flex items-center text-sm text-stone-500">
                    <Location01Icon className="w-4 h-4 mr-1" />
                    {item.location}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 transition-colors"
              aria-label="Close modal"
            >
              <Cancel01Icon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-stone-900 mb-2">
                Description
              </h3>
              <p className="text-stone-700">{item.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-stone-900 mb-3">
                Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {item.website && (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <CopyLinkIcon className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}

                {item.github_repo && (
                  <a
                    href={item.github_repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}

                {item.linkedin && (
                  <a
                    href={item.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Building01Icon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {item.crunchbase && (
                  <a
                    href={item.crunchbase}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    <Building01Icon className="w-4 h-4" />
                    <span>Crunchbase</span>
                  </a>
                )}

                {item.youtube && (
                  <a
                    href={item.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <PlayIcon className="w-4 h-4" />
                    <span>YouTube</span>
                  </a>
                )}

                {item.blog && (
                  <a
                    href={item.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    <Edit01Icon className="w-4 h-4" />
                    <span>Blog</span>
                  </a>
                )}

                {item.contact && (
                  <a
                    href={`mailto:${item.contact}`}
                    className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    <Mail01Icon className="w-4 h-4" />
                    <span>Contact</span>
                  </a>
                )}
              </div>
            </div>

            {(item.funding_status || item.year_founded || item.acquired) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-stone-900 mb-3">
                  Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {item.funding_status && (
                    <div className="bg-stone-50 p-3 rounded">
                      <div className="flex items-center text-sm text-stone-600 mb-1">
                        <DollarCircleIcon className="w-4 h-4 mr-1" />
                        Funding Status
                      </div>
                      <div className="font-semibold text-stone-900">
                        {item.funding_status}
                      </div>
                    </div>
                  )}

                  {item.year_founded && (
                    <div className="bg-stone-50 p-3 rounded">
                      <div className="flex items-center text-sm text-stone-600 mb-1">
                        <Calendar01Icon className="w-4 h-4 mr-1" />
                        Founded
                      </div>
                      <div className="font-semibold text-stone-900">
                        {item.year_founded}
                      </div>
                    </div>
                  )}

                  {item.acquired && (
                    <div className="bg-stone-50 p-3 rounded">
                      <div className="flex items-center text-sm text-stone-600 mb-1">
                        <Agreement02Icon className="w-4 h-4 mr-1" />
                        Acquired
                      </div>
                      <div className="font-semibold text-stone-900">
                        {item.acquired.by}{' '}
                        {item.acquired.year ? `(${item.acquired.year})` : ''}
                      </div>
                      {item.acquired.amount && (
                        <div className="text-sm text-stone-600">
                          {item.acquired.amount}
                        </div>
                      )}
                      {item.acquired.url && (
                        <a
                          href={item.acquired.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm mt-1 inline-block"
                        >
                          Details
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end p-6 border-t border-stone-200">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 text-white rounded-[34px] hover:bg-stone-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
