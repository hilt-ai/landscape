'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  ContentSkeleton,
  MainContentSkeleton,
} from '@/components/ContentSkeleton';

export function ContentLayoutSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex gap-8">
            <ContentSkeleton />

            <MainContentSkeleton />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
