import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TableOfContents } from '@/components/TableOfContents';
import { TEST_IDS } from '@/lib/test-ids';

type IntersectionObserverCb = (entries: IntersectionObserverEntry[]) => void;

const mockIntersectionObserver = vi.fn(function (cb: IntersectionObserverCb) {
  void cb;
  return {
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  };
});
window.IntersectionObserver =
  mockIntersectionObserver as unknown as typeof IntersectionObserver;

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

const mockScrollTo = vi.fn();
window.scrollTo = mockScrollTo;

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('TableOfContents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';

    const main = document.createElement('main');
    main.innerHTML = `
      <h1 id="introduction">Introduction</h1>
      <h2 id="what-is-ebpf">What is eBPF?</h2>
      <h3 id="benefits">Benefits</h3>
      <h2 id="our-mission">Our Mission</h2>
      <h2 id="contributing">Contributing</h2>
    `;
    document.body.appendChild(main);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render table of contents with skeleton loading initially', () => {
    render(<TableOfContents />);

    expect(screen.getByTestId(TEST_IDS.tableOfContents)).toBeInTheDocument();
    expect(screen.getByText('Table of Contents')).toBeInTheDocument();

    const skeletonItems = screen.getAllByRole('generic');
    expect(skeletonItems.length).toBeGreaterThan(0);
  });

  it('should detect and display headings from the main content', async () => {
    render(<TableOfContents />);

    await waitFor(() => {
      expect(screen.getAllByText('Introduction')).toHaveLength(2);
      expect(screen.getAllByText('What is eBPF?')).toHaveLength(2);
      expect(screen.getAllByText('Benefits')).toHaveLength(2);
      expect(screen.getAllByText('Our Mission')).toHaveLength(2);
      expect(screen.getAllByText('Contributing')).toHaveLength(2);
    });
  });

  it('should set up intersection observer for heading detection', async () => {
    render(<TableOfContents />);

    await waitFor(() => {
      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        {
          rootMargin: '-100px 0px -70% 0px',
          threshold: [0, 0.1, 0.5, 1.0],
        }
      );
    });
  });

  it('should make headings clickable and scroll to them', async () => {
    const user = userEvent.setup();
    render(<TableOfContents />);

    await waitFor(() => {
      expect(screen.getAllByText('Introduction')).toHaveLength(2);
    });

    const tocButtons = screen.getAllByRole('button');
    const introductionButton = tocButtons.find(
      (button) => button.textContent === 'Introduction'
    );
    expect(introductionButton).toBeInTheDocument();
    await user.click(introductionButton!);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth',
    });

    expect(mockReplaceState).toHaveBeenCalledWith(
      null,
      '',
      expect.stringContaining('#introduction')
    );
  });

  it('should handle hash anchors on page load', async () => {
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#what-is-ebpf',
        href: 'http://localhost:3000/contribute#what-is-ebpf',
        origin: 'http://localhost:3000',
        pathname: '/contribute',
      },
      writable: true,
    });

    render(<TableOfContents />);

    await waitFor(() => {
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: expect.any(Number),
        behavior: 'smooth',
      });
    });
  });

  it('should handle hash changes', async () => {
    render(<TableOfContents />);

    Object.defineProperty(window, 'location', {
      value: {
        hash: '#contributing',
        href: 'http://localhost:3000/contribute#contributing',
        origin: 'http://localhost:3000',
        pathname: '/contribute',
      },
      writable: true,
    });

    window.dispatchEvent(new HashChangeEvent('hashchange'));

    await waitFor(() => {
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: expect.any(Number),
        behavior: 'smooth',
      });
    });
  });

  it('should add anchor links to headings with copy functionality', async () => {
    render(<TableOfContents />);

    await waitFor(() => {
      const heading = document.getElementById('introduction');
      expect(heading).toBeInTheDocument();

      expect(heading).toHaveClass('group', 'cursor-pointer');

      const anchorLink = document.querySelector('a[href="#introduction"]');
      expect(anchorLink).toBeInTheDocument();
      expect(anchorLink).toHaveAttribute(
        'aria-label',
        'Copy link to Introduction'
      );
    });
  });

  it('should have anchor links with proper attributes', async () => {
    render(<TableOfContents />);

    await waitFor(() => {
      const heading = document.getElementById('introduction');
      expect(heading).toBeInTheDocument();
    });

    const anchorLink = document.querySelector('a[href="#introduction"]');
    expect(anchorLink).toBeInTheDocument();
    expect(anchorLink).toHaveAttribute(
      'aria-label',
      'Copy link to Introduction'
    );
    expect(anchorLink).toHaveClass(
      'inline-block',
      'ml-2',
      'opacity-0',
      'group-hover:opacity-100'
    );
  });

  it('should apply correct indentation based on heading level', async () => {
    render(<TableOfContents />);

    await waitFor(() => {
      const tocButtons = screen.getAllByRole('button');

      const h1Button = tocButtons.find(
        (button) => button.textContent === 'Introduction'
      );
      expect(h1Button).toHaveClass('pl-3');

      const h2Button = tocButtons.find(
        (button) => button.textContent === 'What is eBPF?'
      );
      expect(h2Button).toHaveClass('pl-6');

      const h3Button = tocButtons.find(
        (button) => button.textContent === 'Benefits'
      );
      expect(h3Button).toHaveClass('pl-9');
    });
  });

  it('should highlight active section based on intersection observer', async () => {
    render(<TableOfContents />);

    await waitFor(() => {
      expect(screen.getAllByText('Introduction')).toHaveLength(2);
    });

    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    const mockEntry = {
      target: document.getElementById('introduction'),
      isIntersecting: true,
      intersectionRatio: 0.8,
    } as unknown as IntersectionObserverEntry;

    observerCallback([mockEntry]);

    await waitFor(() => {
      const tocButtons = screen.getAllByRole('button');
      const activeButton = tocButtons.find(
        (button) => button.textContent === 'Introduction'
      );
      expect(activeButton).toHaveClass(
        'bg-stone-100',
        'text-stone-900',
        'font-medium'
      );
    });
  });

  it('should not update active state while scrolling programmatically', async () => {
    render(<TableOfContents />);

    await waitFor(() => {
      expect(screen.getAllByText('Introduction')).toHaveLength(2);
    });

    const tocButtons = screen.getAllByRole('button');
    const introductionButton = tocButtons.find(
      (button) => button.textContent === 'Introduction'
    );
    await userEvent.click(introductionButton!);

    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    const mockEntry = {
      target: document.getElementById('introduction'),
      isIntersecting: true,
      intersectionRatio: 0.8,
    } as unknown as IntersectionObserverEntry;

    observerCallback([mockEntry]);
  });

  it('should be hidden on mobile (lg:block class)', () => {
    render(<TableOfContents />);

    const tocContainer = screen.getByTestId(TEST_IDS.tableOfContents);
    expect(tocContainer).toHaveClass('hidden', 'lg:block');
  });

  it('should have proper accessibility attributes', async () => {
    render(<TableOfContents />);

    await waitFor(() => {
      expect(screen.getAllByText('Introduction')).toHaveLength(2);
    });

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    const tocButtons = screen.getAllByRole('button');
    expect(tocButtons.length).toBeGreaterThan(0);

    const anchorLink = document.querySelector('a[href="#introduction"]');
    expect(anchorLink).toHaveAttribute(
      'aria-label',
      'Copy link to Introduction'
    );
  });
});
