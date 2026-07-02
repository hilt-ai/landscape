'use client';

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react';
import { cn } from '@/lib/utils';
import { getTestId } from '@/lib/test-ids';

interface TocItem {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isScrollingRef = useRef(false);

  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;

      setActiveId(id);

      const headerHeight = 64;
      const elementRect = element.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const elementPosition =
        currentScrollY + elementRect.top - headerHeight - 20;

      const currentUrl = new URL(window.location.href);
      currentUrl.hash = id;
      window.history.replaceState(null, '', currentUrl.toString());

      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  }, []);

  const copyLinkToClipboard = useCallback(async (id: string) => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      await navigator.clipboard.writeText(url);
    } catch {
      // Failed to copy link to clipboard
    }
  }, []);

  useLayoutEffect(() => {
    const headings = document.querySelectorAll(
      'main h1, main h2, main h3, main h4, main h5, main h6'
    );
    const filteredHeadings = Array.from(headings).filter(
      (heading) =>
        !heading.textContent?.toLowerCase().includes('table of contents')
    );

    const items: TocItem[] = filteredHeadings.map((heading) => {
      const element = heading as HTMLElement;
      const id =
        element.id ||
        element.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ||
        '';

      if (!element.id) {
        element.id = id;
      }

      const existingWrapper =
        element.parentElement?.classList.contains('group') &&
        element.parentElement?.style.display === 'flex';

      if (!existingWrapper) {
        const handleHeadingClick = (e: Event) => {
          e.preventDefault();
          scrollToHeading(id);
        };

        const handleAnchorClick = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          copyLinkToClipboard(id);
          scrollToHeading(id);
        };

        element.style.cursor = 'pointer';
        element.addEventListener('click', handleHeadingClick);

        const anchorLink = document.createElement('a');
        anchorLink.href = `#${id}`;
        anchorLink.className =
          'inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 hover:text-stone-600 align-middle';

        const headingSize = element.tagName.charAt(1);
        const svgSize =
          headingSize === '1'
            ? 'w-6 h-6'
            : headingSize === '2'
              ? 'w-5 h-5'
              : 'w-4 h-4';

        const svg = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg'
        );
        svg.setAttribute('class', `inline-block ${svgSize}`);
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('viewBox', '0 0 24 24');
        const path = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-width', '2');
        path.setAttribute(
          'd',
          'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
        );
        svg.appendChild(path);
        anchorLink.appendChild(svg);
        anchorLink.setAttribute(
          'aria-label',
          `Copy link to ${element.textContent}`
        );
        anchorLink.addEventListener('click', handleAnchorClick);

        element.className = `${element.className} group cursor-pointer`;

        const wrapper = document.createElement('div');
        wrapper.className = 'group relative';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'baseline';
        wrapper.style.gap = '0.5rem';
        wrapper.style.margin = '0';
        wrapper.style.padding = '0';

        element.parentNode?.insertBefore(wrapper, element);
        wrapper.appendChild(element);
        wrapper.appendChild(anchorLink);
      }

      return {
        id,
        text: element.textContent || '',
        level: parseInt(element.tagName.charAt(1)),
        element,
      };
    });

    queueMicrotask(() => setTocItems(items));

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        let mostVisible = entries[0];
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > mostVisible.intersectionRatio
          ) {
            mostVisible = entry;
          }
        }

        if (mostVisible && mostVisible.isIntersecting) {
          setActiveId(mostVisible.target.id);
        }
      },
      {
        rootMargin: '-100px 0px -70% 0px',
        threshold: [0, 0.1, 0.5, 1.0],
      }
    );

    items.forEach((item) => {
      observerRef.current?.observe(item.element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [scrollToHeading, copyLinkToClipboard]);

  useEffect(() => {
    let outerTimer: ReturnType<typeof setTimeout>;
    let innerTimer: ReturnType<typeof setTimeout>;

    const handleHashAnchor = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        outerTimer = setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            isScrollingRef.current = true;

            const headerHeight = 64;
            const elementRect = element.getBoundingClientRect();
            const currentScrollY = window.scrollY;
            const elementPosition =
              currentScrollY + elementRect.top - headerHeight - 20;

            window.scrollTo({
              top: Math.max(0, elementPosition),
              behavior: 'smooth',
            });

            innerTimer = setTimeout(() => {
              isScrollingRef.current = false;
            }, 1000);
          }
        }, 200);
      }
    };

    handleHashAnchor();

    window.addEventListener('hashchange', handleHashAnchor);

    return () => {
      window.removeEventListener('hashchange', handleHashAnchor);
      clearTimeout(outerTimer);
      clearTimeout(innerTimer);
    };
  }, [tocItems]);

  return (
    <div
      className={cn('hidden lg:block', className)}
      {...getTestId('tableOfContents')}
    >
      <div className="sticky top-24 w-64">
        <h3 className="text-sm font-semibold text-stone-900 mb-4">
          Table of Contents
        </h3>
        <nav className="space-y-1">
          {tocItems.length === 0
            ? Array.from({ length: 6 }).map((_, index) => {
                const widthClasses = [
                  'w-3/4',
                  'w-5/6',
                  'w-2/3',
                  'w-4/5',
                  'w-3/5',
                  'w-11/12',
                ];
                const marginClasses = ['ml-0', 'ml-3', 'ml-6'];
                const widthClass = widthClasses[index % widthClasses.length];
                const marginClass = marginClasses[index % marginClasses.length];

                return (
                  <div
                    key={index}
                    className={`h-8 bg-stone-200 rounded animate-pulse ${widthClass} ${marginClass}`}
                  ></div>
                );
              })
            : tocItems.map((item) => {
                const paddingClasses = [
                  'pl-3',
                  'pl-6',
                  'pl-9',
                  'pl-12',
                  'pl-15',
                  'pl-18',
                ];
                const paddingClass =
                  paddingClasses[
                    Math.min(item.level - 1, paddingClasses.length - 1)
                  ];

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToHeading(item.id)}
                    className={cn(
                      'block w-full text-left py-2 text-sm rounded-md transition-colors',
                      paddingClass,
                      'hover:bg-stone-100 hover:text-stone-900',
                      activeId === item.id
                        ? 'bg-stone-100 text-stone-900 font-medium'
                        : 'text-stone-600'
                    )}
                  >
                    {item.text}
                  </button>
                );
              })}
        </nav>
      </div>
    </div>
  );
}
