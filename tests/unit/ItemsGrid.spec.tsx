import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ItemsGrid } from '@/components/ItemsGrid';
import { TEST_IDS } from '@/lib/test-ids';
import { Item, ItemMembership } from '@/lib/types';

const mockItemMemberships = new Map<string, ItemMembership>([
  [
    'test-item-1',
    {
      isMember: false,
      isPlatinumMember: false,
      isEbpfContributor: false,
      isLarge: false,
    },
  ],
  [
    'test-item-2',
    {
      isMember: false,
      isPlatinumMember: false,
      isEbpfContributor: false,
      isLarge: false,
    },
  ],
]);

const mockItems: Item[] = [
  {
    slug: 'test-item-1',
    company: 'Test Item 1',
    description: 'This is a test item description.',
    website: 'https://example.com/1',
    github_repo: null,
    crunchbase: null,
    location: null,
    category: ['Networking'],
    status: ['Member'],
    logo: 'test-item-1.svg',
  },
  {
    slug: 'test-item-2',
    company: 'Test Item 2',
    description: 'This is another test item description.',
    website: 'https://example.com/2',
    github_repo: null,
    crunchbase: null,
    location: null,
    category: ['Security'],
    status: ['Member'],
    logo: 'test-item-2.svg',
  },
];

describe('ItemsGrid', () => {
  it('should render grid with items', () => {
    render(
      <ItemsGrid
        items={mockItems}
        itemMemberships={mockItemMemberships}
        orderedCategories={['Networking', 'Security']}
      />
    );

    const grid = screen.getByTestId(TEST_IDS.itemsGrid);
    expect(grid).toBeInTheDocument();
  });

  it('should render all items', () => {
    render(
      <ItemsGrid
        items={mockItems}
        itemMemberships={mockItemMemberships}
        orderedCategories={['Networking', 'Security']}
      />
    );

    const tiles = screen.getAllByTestId(TEST_IDS.itemTile);
    expect(tiles).toHaveLength(2);
  });

  it('should show loading skeleton when loading', () => {
    render(
      <ItemsGrid items={[]} itemMemberships={new Map()} isLoading={true} />
    );

    const grid = screen.getByTestId(TEST_IDS.itemsGrid);
    expect(grid).toBeInTheDocument();

    const skeletons = screen.getAllByTestId(TEST_IDS.loadingSkeleton);
    expect(skeletons).toHaveLength(9);
  });

  it('should show empty state when no items', () => {
    render(<ItemsGrid items={[]} itemMemberships={new Map()} />);

    const emptyState = screen.getByTestId(TEST_IDS.emptyState);
    expect(emptyState).toBeInTheDocument();
    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(
      screen.getByText(/Try adjusting your search or filters/)
    ).toBeInTheDocument();
  });

  it('should not show empty state when loading', () => {
    render(
      <ItemsGrid items={[]} itemMemberships={new Map()} isLoading={true} />
    );

    expect(screen.queryByTestId(TEST_IDS.emptyState)).not.toBeInTheDocument();
  });
});
