'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ViewMode } from '@/lib/types';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchQuery = searchParams.get('q') || '';
  const viewMode = (searchParams.get('view') as ViewMode) || 'grid';

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const handleViewToggle = useCallback(() => {
    const viewOrder: ViewMode[] = ['grid', 'list', 'card'];
    const currentIndex = viewOrder.indexOf(viewMode);
    const nextIndex = (currentIndex + 1) % viewOrder.length;
    const newViewMode = viewOrder[nextIndex];

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('view', newViewMode);
    router.push(`?${newParams.toString()}`);
  }, [viewMode, searchParams, router]);

  const handleSearch = useCallback(
    (query: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (query) {
        newParams.set('q', query);
      } else {
        newParams.delete('q');
      }
      router.push(`?${newParams.toString()}`);
    },
    [searchParams, router]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
        viewMode={viewMode}
        onViewToggle={handleViewToggle}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        showSearchAndViewToggle={true}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
