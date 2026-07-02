import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should call onSearch with debounced input', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByTestId('search-input');

    await user.type(input, 'test query');

    await waitFor(
      () => {
        expect(mockOnSearch).toHaveBeenCalledWith('test query');
      },
      { timeout: 1000 }
    );
  });

  it('should show clear button when there is text', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByTestId('search-input');
    await user.type(input, 'test');

    const clearButton = screen.getByTestId('search-clear');
    expect(clearButton).toBeInTheDocument();
  });

  it('should clear input when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByTestId('search-input');
    await user.type(input, 'test');

    const clearButton = screen.getByTestId('search-clear');
    await user.click(clearButton);

    expect(input).toHaveValue('');
  });

  it('should focus input when / key is pressed', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByTestId('search-input');

    document.body.focus();

    await user.keyboard('/');

    expect(input).toHaveFocus();
  });

  it('should not focus input when / is typed in input', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByTestId('search-input');
    await user.type(input, 'test/');

    expect(input).toHaveValue('test/');
  });

  it('should not show keyboard shortcut hint (removed)', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(screen.queryByText('/')).not.toBeInTheDocument();
  });

  it('should not show keyboard shortcut hint when focused', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByTestId('search-input');
    await user.click(input);

    const kbd = screen.queryByText('/');
    expect(kbd).not.toBeInTheDocument();
  });

  it('should not show keyboard shortcut hint when there is text', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByTestId('search-input');
    await user.type(input, 'test');

    const kbd = screen.queryByText('/');
    expect(kbd).not.toBeInTheDocument();
  });

  it('should apply custom placeholder', () => {
    render(
      <SearchBar onSearch={mockOnSearch} placeholder="Custom placeholder" />
    );

    const input = screen.getByTestId('search-input');
    expect(input).toHaveAttribute('placeholder', 'Custom placeholder');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <SearchBar onSearch={mockOnSearch} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
