'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu01Icon, Remove01Icon } from 'hugeicons-react';
import { SearchBar } from '@/components/SearchBar';
import { ViewToggle } from '@/components/ViewToggle';
import { NavigationLink } from '@/components/NavigationLink';
import { MobileMenu } from '@/components/MobileMenu';
import { getTestId } from '@/lib/test-ids';
import { A11Y } from '@/lib/constants';
import { ViewMode } from '@/lib/types';

interface HeaderProps {
  searchQuery?: string;
  onSearch?: (query: string) => void;
  onViewToggle?: () => void;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
  viewMode?: ViewMode;
  showSearchAndViewToggle?: boolean;
}

export function Header({
  searchQuery = '',
  onSearch,
  onViewToggle,
  onMobileMenuToggle,
  isMobileMenuOpen = false,
  viewMode = 'grid',
  showSearchAndViewToggle = true,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <header
      {...getTestId('header')}
      role="banner"
      className={`sticky top-0 z-50 bg-white border-b border-stone-200 transition-shadow ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 mr-0 sm:mr-8">
            <Link
              href="/"
              {...getTestId('logo')}
              className="flex items-end space-x-2 -translate-y-1"
            >
              <Image
                src="/ebpf-logo-black.svg"
                alt="eBPF Landscape"
                width={106}
                height={36}
                className="h-9 w-[106px]"
              />
              <span className="hidden sm:block text-xl font-bold text-stone-900">
                Landscape
              </span>
            </Link>
          </div>

          <nav
            {...getTestId('navigation')}
            className="hidden md:flex items-center space-x-8"
          >
            <NavigationLink href="/">Home</NavigationLink>
            <NavigationLink href="/stats">Stats</NavigationLink>
            <NavigationLink href="/contribute">Contribute</NavigationLink>
          </nav>

          <div className="flex-1 max-w-lg mx-2 sm:mx-4">
            {showSearchAndViewToggle ? (
              <SearchBar
                onSearch={onSearch}
                placeholder={A11Y.searchPlaceholder}
                initialValue={searchQuery}
              />
            ) : (
              <div className="h-10" />
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4 min-w-[90px]">
            {showSearchAndViewToggle ? (
              <>
                <ViewToggle currentView={viewMode} onToggle={onViewToggle} />
              </>
            ) : (
              <div className="w-16 h-10" />
            )}
          </div>

          <button
            type="button"
            {...getTestId('mobileMenuButton')}
            onClick={onMobileMenuToggle}
            aria-label={A11Y.mobileMenu}
            aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            className="md:hidden p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex-shrink-0"
          >
            {isMobileMenuOpen ? (
              <Remove01Icon className="w-6 h-6" />
            ) : (
              <Menu01Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={onMobileMenuToggle || (() => {})}
          viewMode={viewMode}
          onViewToggle={onViewToggle}
          showSearchAndViewToggle={showSearchAndViewToggle}
        />
      </div>
    </header>
  );
}
