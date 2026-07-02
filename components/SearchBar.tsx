'use client';

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react';
import { Search01Icon, Cancel01Icon } from 'hugeicons-react';
import { cn } from '@/lib/utils';
import { getTestId } from '@/lib/test-ids';
import { A11Y } from '@/lib/constants';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

export function SearchBar({
  onSearch,
  placeholder = A11Y.searchLabel,
  className,
  initialValue = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onSearchRef = useRef(onSearch);
  useLayoutEffect(() => {
    onSearchRef.current = onSearch;
  });

  const stableOnSearch = useCallback((q: string) => {
    onSearchRef.current?.(q);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      stableOnSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, stableOnSearch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && !isFocused) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]);

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className={cn('relative max-w-max', className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'w-full max-w-64 h-10 pl-10 pr-10 py-2 text-sm',
            'bg-white border border-stone-300 rounded-lg',
            'text-stone-900 placeholder:text-stone-500',
            'focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent',
            'transition-all duration-200'
          )}
          {...getTestId('searchInput')}
        />

        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search01Icon className="h-4 w-4 text-stone-500" />
        </div>

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-stone-500 hover:text-stone-700 transition-colors"
            aria-label="Clear search"
            {...getTestId('searchClear')}
          >
            <Cancel01Icon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
