import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/Header';
import { TEST_IDS } from '@/lib/test-ids';

const mockOnSearch = vi.fn();
const mockOnViewToggle = vi.fn();
const mockOnMobileMenuToggle = vi.fn();

const defaultProps = {
  searchQuery: '',
  onSearch: mockOnSearch,
  onViewToggle: mockOnViewToggle,
  onMobileMenuToggle: mockOnMobileMenuToggle,
  isMobileMenuOpen: false,
  viewMode: 'grid' as const,
};

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render header with logo and navigation', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByTestId(TEST_IDS.header)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.logo)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.navigation)).toBeInTheDocument();
  });

  it('should render search bar', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByTestId(TEST_IDS.searchInput)).toBeInTheDocument();
  });

  it('should render view toggle', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByTestId(TEST_IDS.viewToggle)).toBeInTheDocument();
  });

  it('should render mobile menu button', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByTestId(TEST_IDS.mobileMenuButton)).toBeInTheDocument();
  });

  it('should display current search query', () => {
    const propsWithQuery = {
      ...defaultProps,
      searchQuery: 'test query',
    };

    render(<Header {...propsWithQuery} />);

    expect(screen.getByTestId(TEST_IDS.searchInput)).toBeInTheDocument();
  });

  it('should call onSearch when search input changes', async () => {
    const user = userEvent.setup();
    render(<Header {...defaultProps} />);

    const searchInput = screen.getByTestId(TEST_IDS.searchInput);

    await user.type(searchInput, 'new query');

    await waitFor(
      () => {
        expect(mockOnSearch).toHaveBeenCalledWith('new query');
      },
      { timeout: 1000 }
    );
  });

  it('should call onViewToggle when view toggle is clicked', async () => {
    const user = userEvent.setup();
    render(<Header {...defaultProps} />);

    const viewToggle = screen.getByTestId(TEST_IDS.viewToggle);
    await user.click(viewToggle);

    expect(mockOnViewToggle).toHaveBeenCalled();
  });

  it('should call onMobileMenuToggle when mobile menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header {...defaultProps} />);

    const mobileMenuButton = screen.getByTestId(TEST_IDS.mobileMenuButton);
    await user.click(mobileMenuButton);

    expect(mockOnMobileMenuToggle).toHaveBeenCalled();
  });

  it('should show mobile menu when isMobileMenuOpen is true', () => {
    const propsWithOpenMenu = {
      ...defaultProps,
      isMobileMenuOpen: true,
    };

    render(<Header {...propsWithOpenMenu} />);

    expect(screen.getByTestId(TEST_IDS.mobileMenu)).toBeInTheDocument();
  });

  it('should hide mobile menu when isMobileMenuOpen is false', () => {
    render(<Header {...defaultProps} />);

    expect(screen.queryByTestId(TEST_IDS.mobileMenu)).not.toBeInTheDocument();
  });

  it('should display correct view mode in toggle', () => {
    const { rerender } = render(<Header {...defaultProps} />);

    const viewToggle = screen.getByTestId(TEST_IDS.viewToggle);
    expect(viewToggle).toBeInTheDocument();

    const propsWithListMode = {
      ...defaultProps,
      viewMode: 'list' as const,
    };
    rerender(<Header {...propsWithListMode} />);
    expect(viewToggle).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<Header {...defaultProps} />);

    const header = screen.getByTestId(TEST_IDS.header);
    const logo = screen.getByTestId(TEST_IDS.logo);
    const searchInput = screen.getByTestId(TEST_IDS.searchInput);
    const viewToggle = screen.getByTestId(TEST_IDS.viewToggle);
    const mobileMenuButton = screen.getByTestId(TEST_IDS.mobileMenuButton);

    expect(header).toHaveAttribute('role', 'banner');
    const logoImg = logo.querySelector('img');
    expect(logoImg).toHaveAttribute('alt', 'eBPF Landscape');
    expect(searchInput).toHaveAttribute('placeholder', 'Search eBPF landscape');
    expect(viewToggle).toHaveAttribute('aria-label', 'Toggle view mode');
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Header {...defaultProps} />);

    const searchInput = screen.getByTestId(TEST_IDS.searchInput);
    const viewToggle = screen.getByTestId(TEST_IDS.viewToggle);

    await user.click(searchInput);
    expect(searchInput).toHaveFocus();

    await user.tab();
    await waitFor(() => {
      expect(viewToggle).toHaveFocus();
    });
  });

  it('should be responsive and hide/show elements on mobile', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByTestId(TEST_IDS.navigation)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.viewToggle)).toBeInTheDocument();

    expect(screen.getByTestId(TEST_IDS.mobileMenuButton)).toBeInTheDocument();
  });
});
