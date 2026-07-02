'use client';

interface ContentSkeletonProps {
  className?: string;
}

export function ContentSkeleton({ className }: ContentSkeletonProps) {
  return (
    <div className={`hidden lg:block ${className}`}>
      <div className="sticky top-24 w-64">
        <div className="mb-4">
          <div className="h-4 bg-stone-200 rounded w-32 animate-pulse"></div>
        </div>
        <nav className="space-y-1">
          {Array.from({ length: 8 }).map((_, index) => {
            const widths = [
              '75%',
              '85%',
              '65%',
              '80%',
              '70%',
              '90%',
              '78%',
              '82%',
            ];
            const width = widths[index % widths.length];
            const marginLeft = `${(index % 3) * 12}px`;

            return (
              <div
                key={index}
                className="h-8 bg-stone-200 rounded animate-pulse"
                style={{
                  width,
                  marginLeft,
                }}
              ></div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function MainContentSkeleton() {
  return (
    <div className="flex-1 min-w-0">
      <div className="prose max-w-none">
        <div className="mb-8">
          <div className="h-10 bg-stone-200 rounded w-3/4 animate-pulse mb-4"></div>
          <div className="h-4 bg-stone-200 rounded w-full animate-pulse mb-2"></div>
          <div className="h-4 bg-stone-200 rounded w-5/6 animate-pulse"></div>
        </div>

        {Array.from({ length: 6 }).map((_, sectionIndex) => (
          <div key={sectionIndex} className="mb-12">
            <div className="mb-6">
              <div className="h-8 bg-stone-200 rounded w-1/2 animate-pulse mb-4"></div>
            </div>

            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, paragraphIndex) => (
                <div key={paragraphIndex} className="space-y-2">
                  <div className="h-4 bg-stone-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-stone-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-stone-200 rounded w-3/4 animate-pulse"></div>
                </div>
              ))}
            </div>

            {sectionIndex % 3 === 0 && (
              <div className="mt-6">
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-stone-200 rounded-full animate-pulse flex-shrink-0"></div>
                      <div className="flex-1 space-y-1">
                        <div className="h-4 bg-stone-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-stone-200 rounded w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sectionIndex % 3 === 1 && (
              <div className="mt-6">
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-stone-200 rounded-full animate-pulse flex-shrink-0 mt-2"></div>
                      <div className="flex-1 space-y-1">
                        <div className="h-4 bg-stone-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-stone-200 rounded w-2/3 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="h-6 bg-stone-200 rounded w-1/4 animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-12 bg-stone-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
