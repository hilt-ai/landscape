import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ItemsList } from '@/components/ItemsList';
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
    category: ['Networking'],
    status: ['Member'],
    location: 'United States',
  },
  {
    slug: 'test-item-2',
    company: 'Test Item 2',
    description: 'This is another test item description.',
    website: 'https://example.com/2',
    github_repo: null,
    crunchbase: null,
    category: ['Security'],
    status: ['Member'],
    location: 'United States',
  },
];

describe('ItemsList', () => {
  it('should render list with items', () => {
    render(
      <ItemsList items={mockItems} itemMemberships={mockItemMemberships} />
    );

    const list = screen.getByTestId(TEST_IDS.itemsList);
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('space-y-4');
  });

  it('should render all items', () => {
    render(
      <ItemsList items={mockItems} itemMemberships={mockItemMemberships} />
    );

    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
  });

  it('should show loading skeleton when loading', () => {
    render(
      <ItemsList items={[]} itemMemberships={new Map()} isLoading={true} />
    );

    const list = screen.getByTestId(TEST_IDS.itemsList);
    expect(list).toBeInTheDocument();

    const skeletons = screen.getAllByTestId(TEST_IDS.loadingSkeleton);
    expect(skeletons).toHaveLength(10);
  });

  it('should show empty state when no items', () => {
    render(<ItemsList items={[]} itemMemberships={new Map()} />);

    const emptyState = screen.getByTestId(TEST_IDS.emptyState);
    expect(emptyState).toBeInTheDocument();
    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(
      screen.getByText(/Try adjusting your search or filters/)
    ).toBeInTheDocument();
  });

  it('should not show empty state when loading', () => {
    render(
      <ItemsList items={[]} itemMemberships={new Map()} isLoading={true} />
    );

    expect(screen.queryByTestId(TEST_IDS.emptyState)).not.toBeInTheDocument();
  });
});
