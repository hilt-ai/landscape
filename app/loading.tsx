'use client';

import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ItemsGrid } from '@/components/ItemsGrid';
import { ItemsList } from '@/components/ItemsList';
import { ItemsCard } from '@/components/ItemsCard';
import { ContentLayoutSkeleton } from '@/components/ContentLayoutSkeleton';

function LoadingContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'grid';

  const isContentPage =
    pathname === '/contribute' || pathname.startsWith('/docs');

  if (isContentPage) {
    return <ContentLayoutSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="hidden md:flex flex-wrap items-center gap-4 p-4 bg-stone-50 border-b border-stone-200 mb-8">
              <div className="flex flex-col gap-1">
                <div className="h-4 bg-stone-200 rounded w-16 animate-pulse"></div>
                <div className="h-10 bg-stone-200 rounded w-32 animate-pulse"></div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="h-4 bg-stone-200 rounded w-12 animate-pulse"></div>
                <div className="h-10 bg-stone-200 rounded w-32 animate-pulse"></div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="h-4 bg-stone-200 rounded w-16 animate-pulse"></div>
                <div className="h-10 bg-stone-200 rounded w-32 animate-pulse"></div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="h-4 bg-stone-200 rounded w-12 animate-pulse"></div>
                <div className="h-10 bg-stone-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>

            {view === 'list' ? (
              <ItemsList
                items={[]}
                itemMemberships={new Map()}
                isLoading={true}
              />
            ) : view === 'card' ? (
              <ItemsCard
                items={[]}
                itemMemberships={new Map()}
                isLoading={true}
              />
            ) : (
              <ItemsGrid
                items={[]}
                itemMemberships={new Map()}
                isLoading={true}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Loading() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="animate-pulse">
                <div className="h-4 bg-stone-200 rounded w-48 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white border border-stone-200 rounded-lg p-6 animate-pulse"
                    >
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-16 h-16 bg-stone-200 rounded flex-shrink-0"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-6 bg-stone-200 rounded w-3/4"></div>
                          <div className="h-4 bg-stone-200 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-stone-200 rounded w-5/6 mb-4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <LoadingContent />
    </Suspense>
  );
}
