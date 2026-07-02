'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const handleViewToggle = useCallback(() => {
    const newViewMode = viewMode === 'grid' ? 'list' : 'grid';
    setViewMode(newViewMode);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('view', newViewMode);
    router.push(`?${newParams.toString()}`);
  }, [viewMode, searchParams, router]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);

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
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
