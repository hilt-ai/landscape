'use client';

import { useEffect } from 'react';
import { ViewToggle } from '@/components/ViewToggle';
import { NavigationLink } from '@/components/NavigationLink';
import { getTestId } from '@/lib/test-ids';
import { ViewMode } from '@/lib/types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  viewMode: ViewMode;
  onViewToggle?: () => void;
  showSearchAndViewToggle?: boolean;
}

export function MobileMenu({
  isOpen,
  onClose,
  viewMode,
  onViewToggle,
  showSearchAndViewToggle = true,
}: MobileMenuProps) {
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

  return (
    <>
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        {...getTestId('mobileMenu')}
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white border-l border-stone-200 z-50 transform translate-x-0 transition-transform duration-300 ease-in-out"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
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

          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <NavigationLink href="/" mobile onClick={onClose}>
                Home
              </NavigationLink>
              <NavigationLink href="/stats" mobile onClick={onClose}>
                Stats
              </NavigationLink>
              <NavigationLink href="/contribute" mobile onClick={onClose}>
                Contribute
              </NavigationLink>
            </div>
          </nav>

          <div className="p-4 border-t border-stone-200 space-y-4">
            {showSearchAndViewToggle && (
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  View Mode
                </label>
                <ViewToggle currentView={viewMode} onToggle={onViewToggle} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
