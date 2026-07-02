import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FiltersBar } from '@/components/FiltersBar';
import { SortOption } from '@/lib/types';
import { TEST_IDS } from '@/lib/test-ids';

const mockOnFiltersChange = vi.fn();
const mockOnSortChange = vi.fn();
const mockOnClearFilters = vi.fn();

const defaultProps = {
  filters: {
    query: '',
    category: '',
    status: '',
    location: '',
  },
  sort: 'name-asc' as SortOption,
  onFiltersChange: mockOnFiltersChange,
  onSortChange: mockOnSortChange,
  onClearFilters: mockOnClearFilters,
  availableCategories: ['Observability', 'Security', 'Networking'],
  availableLocations: ['San Francisco', 'New York', 'London'],
  availableStatuses: ['Platinum Member', 'Member', 'eBPF Contributor'],
};

describe('FiltersBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all filter controls', () => {
    render(<FiltersBar {...defaultProps} />);

    expect(screen.getByTestId(TEST_IDS.filtersBar)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.categoryFilter)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.statusFilter)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.locationFilter)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.sortMenu)).toBeInTheDocument();
    expect(screen.queryByTestId(TEST_IDS.clearFilters)).not.toBeInTheDocument();
  });

  it('should display current filter values', () => {
    const filtersWithValues = {
      ...defaultProps,
      filters: {
        query: '',
        category: 'Observability',
        status: 'Member',
        location: 'San Francisco',
      },
    };

    render(<FiltersBar {...filtersWithValues} />);

    expect(screen.getByDisplayValue('Observability')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Member')).toBeInTheDocument();
    expect(screen.getByDisplayValue('San Francisco')).toBeInTheDocument();
  });

  it('should call onFiltersChange when category filter changes', async () => {
    const user = userEvent.setup();
    render(<FiltersBar {...defaultProps} />);

    const categorySelect = screen.getByTestId(TEST_IDS.categoryFilter);
    await user.selectOptions(categorySelect, 'Security');

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      category: 'Security',
    });
  });

  it('should call onFiltersChange when status filter changes', async () => {
    const user = userEvent.setup();
    render(<FiltersBar {...defaultProps} />);

    const statusSelect = screen.getByTestId(TEST_IDS.statusFilter);
    await user.selectOptions(statusSelect, 'Platinum Member');

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      status: 'Platinum Member',
    });
  });

  it('should call onFiltersChange when location filter changes', async () => {
    const user = userEvent.setup();
    render(<FiltersBar {...defaultProps} />);

    const locationSelect = screen.getByTestId(TEST_IDS.locationFilter);
    await user.selectOptions(locationSelect, 'New York');

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      location: 'New York',
    });
  });

  it('should call onSortChange when sort option changes', async () => {
    const user = userEvent.setup();
    render(<FiltersBar {...defaultProps} />);

    const sortSelect = screen.getByTestId(TEST_IDS.sortMenu);
    await user.selectOptions(sortSelect, 'name-desc');

    expect(mockOnSortChange).toHaveBeenCalledWith('name-desc');
  });

  it('should call onClearFilters when clear button is clicked', async () => {
    const user = userEvent.setup();
    const propsWithActiveFilters = {
      ...defaultProps,
      filters: {
        query: '',
        category: 'Observability',
        status: '',
        location: '',
      },
    };
    render(<FiltersBar {...propsWithActiveFilters} />);

    const clearButton = screen.getByTestId(TEST_IDS.clearFilters);
    await user.click(clearButton);

    expect(mockOnClearFilters).toHaveBeenCalled();
  });

  it('should show clear button only when filters are active', () => {
    const { rerender } = render(<FiltersBar {...defaultProps} />);

    expect(screen.queryByTestId(TEST_IDS.clearFilters)).not.toBeInTheDocument();

    const filtersWithValues = {
      ...defaultProps,
      filters: {
        query: '',
        category: 'Observability',
        status: '',
        location: '',
      },
    };

    rerender(<FiltersBar {...filtersWithValues} />);
    expect(screen.getByTestId(TEST_IDS.clearFilters)).toBeInTheDocument();
  });

  it('should handle empty available options gracefully', () => {
    const propsWithEmptyOptions = {
      ...defaultProps,
      availableCategories: [],
      availableLocations: [],
      availableStatuses: [],
    };

    render(<FiltersBar {...propsWithEmptyOptions} />);

    expect(screen.getByTestId(TEST_IDS.categoryFilter)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.statusFilter)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.locationFilter)).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<FiltersBar {...defaultProps} />);

    const categoryFilter = screen.getByTestId(TEST_IDS.categoryFilter);
    const statusFilter = screen.getByTestId(TEST_IDS.statusFilter);
    const locationFilter = screen.getByTestId(TEST_IDS.locationFilter);
    const sortMenu = screen.getByTestId(TEST_IDS.sortMenu);

    expect(categoryFilter).toHaveAttribute('aria-label', 'Filter by category');
    expect(statusFilter).toHaveAttribute('aria-label', 'Filter by status');
    expect(locationFilter).toHaveAttribute('aria-label', 'Filter by location');
    expect(sortMenu).toHaveAttribute('aria-label', 'Sort items');
  });

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<FiltersBar {...defaultProps} />);

    const categoryFilter = screen.getByTestId(TEST_IDS.categoryFilter);
    const statusFilter = screen.getByTestId(TEST_IDS.statusFilter);

    await user.tab();
    await user.tab();
    expect(categoryFilter).toHaveFocus();

    await user.tab();
    expect(statusFilter).toHaveFocus();
  });
});
