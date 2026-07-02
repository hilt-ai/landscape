'use client';

import { cn } from '@/lib/utils';
import { getTestId } from '@/lib/test-ids';
import { A11Y } from '@/lib/constants';
import { ViewMode } from '@/lib/types';

interface ViewToggleProps {
  currentView: ViewMode;
  onToggle?: (view: ViewMode) => void;
  className?: string;
}

export function ViewToggle({
  currentView,
  onToggle,
  className,
}: ViewToggleProps) {
  const handleToggle = () => {
    const viewOrder: ViewMode[] = ['grid', 'list', 'card'];
    const currentIndex = viewOrder.indexOf(currentView);
    const nextIndex = (currentIndex + 1) % viewOrder.length;
    const newView = viewOrder[nextIndex];
    onToggle?.(newView);
  };

  return (
    <div className={cn('flex items-center', className)}>
      <button
        onClick={handleToggle}
        className={cn(
          'flex items-center space-x-2 px-3 py-2 rounded-lg',
          'bg-white border border-stone-300',
          'text-stone-700 hover:text-stone-900',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-yellow-300'
        )}
        aria-label={A11Y.viewToggleLabel}
        {...getTestId('viewToggle')}
      >
        <svg
          className={cn(
            'h-4 w-4 transition-colors',
            currentView === 'grid' ? 'text-yellow-300' : 'text-stone-500'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>

        <svg
          className={cn(
            'h-4 w-4 transition-colors',
            currentView === 'list' ? 'text-yellow-300' : 'text-stone-500'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>

        <svg
          className={cn(
            'h-4 w-4 transition-colors',
            currentView === 'card' ? 'text-yellow-300' : 'text-stone-500'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </button>
    </div>
  );
}
