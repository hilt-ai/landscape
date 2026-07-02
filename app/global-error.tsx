'use client';

import { useEffect, useState } from 'react';
import { Remove01Icon, Home01Icon } from 'hugeicons-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Global application error occurred
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-white text-stone-900 font-sans">
        <div className="min-h-screen flex flex-col">
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
                    <Remove01Icon className="w-32 h-32 text-red-400 opacity-60" />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-stone-900 mb-4">
                Application Error
              </h1>
              <p className="text-xl text-stone-600 mb-8 max-w-lg mx-auto">
                A critical error occurred in the application. Please try
                refreshing the page or contact support if the problem persists.
              </p>

              {process.env.NODE_ENV === 'development' && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                  <h3 className="text-sm font-semibold text-red-800 mb-2">
                    Error Details (Development)
                  </h3>
                  <pre className="text-xs text-red-700 overflow-auto">
                    {error.message}
                    {error.digest && `\nDigest: ${error.digest}`}
                  </pre>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center px-6 py-3 bg-yellow-300 text-stone-900 font-semibold rounded-[34px] hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
                >
                  <Remove01Icon className="w-5 h-5 mr-2" />
                  Try Again
                </button>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-semibold rounded-[34px] hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
                >
                  <Home01Icon className="w-5 h-5 mr-2" />
                  Go Home
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-stone-200">
                <h2 className="text-lg font-semibold text-stone-900 mb-4">
                  Need Help?
                </h2>
                <p className="text-stone-600 mb-4">
                  If this problem persists, please report it to our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://github.com/ebpffoundation/landscape/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    Report Issue
                  </a>
                  <a
                    href="https://ebpf.io/slack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    Get Support
                  </a>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
