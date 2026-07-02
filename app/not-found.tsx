'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home01Icon } from 'hugeicons-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        viewMode="grid"
        onViewToggle={() => {}}
        onSearch={() => {}}
        searchQuery=""
        showSearchAndViewToggle={false}
      />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="relative w-64 h-64 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-20"></div>
              <div className="relative flex items-center justify-center h-full">
                <div className="text-8xl font-bold text-red-300 opacity-60">
                  404
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-stone-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-stone-600 mb-8 max-w-lg mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The
            page might have been moved, deleted, or you might have entered the
            wrong URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-yellow-300 text-stone-900 font-semibold rounded-[34px] hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
            >
              <Home01Icon className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            <Link
              href="javascript:history.back()"
              className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-semibold rounded-[34px] hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
            >
              <span className="mr-2">←</span>
              Go Back
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
