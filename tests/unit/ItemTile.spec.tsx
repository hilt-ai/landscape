import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ItemTile } from '@/components/ItemTile';
import { TEST_IDS } from '@/lib/test-ids';
import { Item, ItemMembership } from '@/lib/types';

const mockItem: Item = {
  slug: 'test-item',
  company: 'Test Item',
  description:
    'This is a test item description that explains what this item does.',
  website: 'https://example.com',
  github_repo: 'https://github.com/example/test-item',
  crunchbase: 'https://crunchbase.com/organization/test-item',
  location: 'Test Organization',
  category: ['Networking', 'Security', 'Observability'] as (
    | 'Networking'
    | 'Observability'
    | 'Profiling'
    | 'Security'
    | 'Other'
  )[],
  status: ['Member'],
  logo: 'test-item.svg',
  added: '2024-01-01',
};

const mockMembership: ItemMembership = {
  isMember: false,
  isPlatinumMember: false,
  isEbpfContributor: false,
  isLarge: false,
};

describe('ItemTile', () => {
  it('should render item tile with all content', () => {
    render(<ItemTile item={mockItem} membership={mockMembership} index={0} />);

    const tile = screen.getByTestId(TEST_IDS.itemTile);
    expect(tile).toBeInTheDocument();
    expect(tile).toHaveAttribute('data-item-slug', 'test-item');
  });

  it('should display item logo with correct attributes', () => {
    render(<ItemTile item={mockItem} membership={mockMembership} index={0} />);

    const logo = screen.getByTestId(TEST_IDS.itemLogo);
    expect(logo).toHaveAttribute('alt', 'Test Item logo');
    expect(logo).toBeInTheDocument();
  });

  it('should display item logo with correct src', () => {
    render(<ItemTile item={mockItem} membership={mockMembership} index={0} />);

    const logo = screen.getByTestId(TEST_IDS.itemLogo);
    expect(logo).toHaveAttribute(
      'src',
      expect.stringContaining('/data/logos/test-item.svg')
    );
    expect(logo).toHaveAttribute('alt', 'Test Item logo');
  });

  it('should display item tile with correct grid classes', () => {
    render(<ItemTile item={mockItem} membership={mockMembership} index={0} />);

    const tile = screen.getByTestId(TEST_IDS.itemTile);
    const container = tile.parentElement;
    expect(container).toHaveClass('col-span-1', 'row-span-1');
  });

  it('should display membership badges when item has membership', () => {
    const platinumMembership = {
      isMember: false,
      isPlatinumMember: true,
      isEbpfContributor: false,
      isLarge: true,
    };
    render(
      <ItemTile item={mockItem} membership={platinumMembership} index={0} />
    );

    expect(screen.getByText('Platinum')).toBeInTheDocument();
  });

  it('should not display membership badges when item has no membership', () => {
    const nonFeaturedItem = { ...mockItem };
    render(
      <ItemTile item={nonFeaturedItem} membership={mockMembership} index={0} />
    );

    expect(screen.queryByText('Platinum')).not.toBeInTheDocument();
    expect(screen.queryByText('Member')).not.toBeInTheDocument();
    expect(screen.queryByText('Contributor')).not.toBeInTheDocument();
  });

  it('should display non-featured item with correct grid classes', () => {
    render(<ItemTile item={mockItem} membership={mockMembership} index={0} />);

    const tile = screen.getByTestId(TEST_IDS.itemTile);
    const container = tile.parentElement;
    expect(container).toHaveClass('col-span-1', 'row-span-1');
  });

  it('should display item tile with correct styling', () => {
    render(<ItemTile item={mockItem} membership={mockMembership} index={0} />);

    const tile = screen.getByTestId(TEST_IDS.itemTile);
    expect(tile).toHaveClass('bg-white', 'border', 'rounded-lg');
  });

  it('should handle items with minimal data', () => {
    const minimalItem = {
      ...mockItem,
      github_repo: null,
      crunchbase: null,
      location: null,
    };

    render(
      <ItemTile item={minimalItem} membership={mockMembership} index={0} />
    );

    const tile = screen.getByTestId(TEST_IDS.itemTile);
    expect(tile).toBeInTheDocument();
    expect(tile).toHaveAttribute('data-item-slug', 'test-item');
  });

  it('should handle items without tags', () => {
    const itemWithoutTags = { ...mockItem, category: [] };

    render(
      <ItemTile item={itemWithoutTags} membership={mockMembership} index={0} />
    );

    const tile = screen.getByTestId(TEST_IDS.itemTile);
    expect(tile).toBeInTheDocument();
  });

  it('should apply proper CSS classes for grid layout', () => {
    render(<ItemTile item={mockItem} membership={mockMembership} index={0} />);

    const tile = screen.getByTestId(TEST_IDS.itemTile);
    const container = tile.parentElement;
    expect(container).toHaveClass('col-span-1', 'row-span-1');
    expect(tile).toHaveClass('bg-white', 'border', 'rounded-lg');
  });

  it('should have proper accessibility attributes', () => {
    render(<ItemTile item={mockItem} membership={mockMembership} index={0} />);

    const tile = screen.getByTestId(TEST_IDS.itemTile);
    expect(tile).toHaveAttribute('data-item-slug', 'test-item');

    const logo = screen.getByTestId(TEST_IDS.itemLogo);
    expect(logo).toHaveAttribute('alt', 'Test Item logo');
  });
});
