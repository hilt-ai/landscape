import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ItemRow } from '@/components/ItemRow';
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
  category: ['Networking', 'Security'],
  status: ['Member'],
  location: 'United States',
  logo: 'test-item',
};

const mockMembership: ItemMembership = {
  isMember: false,
  isPlatinumMember: false,
  isEbpfContributor: false,
  isLarge: false,
};

describe('ItemRow', () => {
  it('should render item row with all content', () => {
    render(<ItemRow item={mockItem} membership={mockMembership} index={0} />);

    const row = screen.getByTestId(TEST_IDS.itemRow);
    expect(row).toBeInTheDocument();
    expect(row).toHaveAttribute('data-item-slug', 'test-item');
  });

  it('should display item company and description', () => {
    render(<ItemRow item={mockItem} membership={mockMembership} index={0} />);

    expect(screen.getByTestId(TEST_IDS.itemName)).toHaveTextContent(
      'Test Item'
    );
    expect(screen.getByTestId(TEST_IDS.itemDescription)).toHaveTextContent(
      'This is a test item description'
    );
  });

  it('should display tags', () => {
    render(<ItemRow item={mockItem} membership={mockMembership} index={0} />);

    const tagsContainer = screen.getByTestId(TEST_IDS.itemTags);
    expect(tagsContainer).toBeInTheDocument();

    expect(screen.getByText('Networking')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('should display membership badges when item has membership', () => {
    const platinumMembership = {
      isMember: false,
      isPlatinumMember: true,
      isEbpfContributor: false,
      isLarge: true,
    };
    render(
      <ItemRow item={mockItem} membership={platinumMembership} index={0} />
    );

    expect(screen.getByText('Platinum')).toBeInTheDocument();
  });

  it('should not display membership badges when item has no membership', () => {
    const nonFeaturedItem = { ...mockItem };
    render(
      <ItemRow item={nonFeaturedItem} membership={mockMembership} index={0} />
    );

    expect(screen.queryByText('Platinum')).not.toBeInTheDocument();
    expect(screen.queryByText('Member')).not.toBeInTheDocument();
    expect(screen.queryByText('Contributor')).not.toBeInTheDocument();
  });

  it('should display location and categories', () => {
    render(<ItemRow item={mockItem} membership={mockMembership} index={0} />);

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Networking')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('should render all links with proper attributes', () => {
    render(<ItemRow item={mockItem} membership={mockMembership} index={0} />);

    const homepageLink = screen.getByTestId(TEST_IDS.itemHomepage);
    expect(homepageLink).toHaveAttribute('href', 'https://example.com');
    expect(homepageLink).toHaveAttribute('target', '_blank');
    expect(homepageLink).toHaveAttribute('rel', 'noopener noreferrer');

    const repoLink = screen.getByTestId(TEST_IDS.itemRepository);
    expect(repoLink).toHaveAttribute(
      'href',
      'https://github.com/example/test-item'
    );
    expect(repoLink).toHaveAttribute('target', '_blank');

    const crunchbaseLink = screen.getByTestId(TEST_IDS.itemCrunchbase);
    expect(crunchbaseLink).toHaveAttribute(
      'href',
      'https://crunchbase.com/organization/test-item'
    );
    expect(crunchbaseLink).toHaveAttribute('target', '_blank');
  });

  it('should handle items without optional links', () => {
    const minimalItem = {
      ...mockItem,
      github_repo: null,
      crunchbase: null,
      location: null,
    };

    render(
      <ItemRow item={minimalItem} membership={mockMembership} index={0} />
    );

    expect(screen.getByTestId(TEST_IDS.itemHomepage)).toBeInTheDocument();
    expect(
      screen.queryByTestId(TEST_IDS.itemRepository)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(TEST_IDS.itemCrunchbase)
    ).not.toBeInTheDocument();
  });

  it('should handle items without categories', () => {
    const itemWithoutCategories = { ...mockItem, category: [] };

    render(
      <ItemRow
        item={itemWithoutCategories}
        membership={mockMembership}
        index={0}
      />
    );

    expect(screen.queryByTestId(TEST_IDS.itemTags)).not.toBeInTheDocument();
  });

  it('should limit displayed categories to 4 with overflow indicator', () => {
    const itemWithManyCategories = {
      ...mockItem,
      category: [
        'Networking',
        'Security',
        'Observability',
        'Profiling',
        'Other',
      ] as (
        | 'Networking'
        | 'Observability'
        | 'Profiling'
        | 'Security'
        | 'Other'
      )[],
    };

    render(
      <ItemRow
        item={itemWithManyCategories}
        membership={mockMembership}
        index={0}
      />
    );

    expect(screen.getByText('Networking')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('Observability')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
    expect(screen.queryByText('Profiling')).not.toBeInTheDocument();
    expect(screen.queryByText('Other')).not.toBeInTheDocument();
    expect(screen.queryByText('Additional')).not.toBeInTheDocument();
  });

  it('should apply proper CSS classes for list layout', () => {
    render(<ItemRow item={mockItem} membership={mockMembership} index={0} />);

    const row = screen.getByTestId(TEST_IDS.itemRow);
    expect(row).toHaveClass(
      'group',
      'bg-white',
      'border',
      'border-stone-200',
      'rounded-lg'
    );
  });

  it('should have proper accessibility attributes', () => {
    render(<ItemRow item={mockItem} membership={mockMembership} index={0} />);

    const homepageLink = screen.getByTestId(TEST_IDS.itemHomepage);
    expect(homepageLink).toHaveAttribute(
      'aria-label',
      'Visit Test Item homepage'
    );

    const repoLink = screen.getByTestId(TEST_IDS.itemRepository);
    expect(repoLink).toHaveAttribute('aria-label', 'View Test Item repository');

    const crunchbaseLink = screen.getByTestId(TEST_IDS.itemCrunchbase);
    expect(crunchbaseLink).toHaveAttribute(
      'aria-label',
      'View Test Item on Crunchbase'
    );
  });

  it('should handle items without location', () => {
    const itemWithoutLocation = { ...mockItem, location: null };

    render(
      <ItemRow
        item={itemWithoutLocation}
        membership={mockMembership}
        index={0}
      />
    );

    expect(screen.getByText('Networking')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });
});
