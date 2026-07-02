import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ViewToggle } from '@/components/ViewToggle';

describe('ViewToggle', () => {
  const mockOnToggle = vi.fn();

  it('should render toggle button', () => {
    render(<ViewToggle currentView="grid" onToggle={mockOnToggle} />);

    const button = screen.getByTestId('view-toggle');
    expect(button).toBeInTheDocument();
  });

  it('should show grid view as active when currentView is grid', () => {
    render(<ViewToggle currentView="grid" onToggle={mockOnToggle} />);

    const button = screen.getByTestId('view-toggle');
    const gridIcon = button.querySelector('svg:nth-child(1)');
    const listIcon = button.querySelector('svg:nth-child(2)');
    const cardIcon = button.querySelector('svg:nth-child(3)');

    expect(gridIcon).toHaveClass('text-yellow-300');
    expect(listIcon).toHaveClass('text-stone-500');
    expect(cardIcon).toHaveClass('text-stone-500');
  });

  it('should show list view as active when currentView is list', () => {
    render(<ViewToggle currentView="list" onToggle={mockOnToggle} />);

    const button = screen.getByTestId('view-toggle');
    const gridIcon = button.querySelector('svg:nth-child(1)');
    const listIcon = button.querySelector('svg:nth-child(2)');
    const cardIcon = button.querySelector('svg:nth-child(3)');

    expect(gridIcon).toHaveClass('text-stone-500');
    expect(listIcon).toHaveClass('text-yellow-300');
    expect(cardIcon).toHaveClass('text-stone-500');
  });

  it('should call onToggle when clicked', async () => {
    const user = userEvent.setup();
    render(<ViewToggle currentView="grid" onToggle={mockOnToggle} />);

    const button = screen.getByTestId('view-toggle');
    await user.click(button);

    expect(mockOnToggle).toHaveBeenCalledWith('list');
  });

  it('should toggle from grid to list', async () => {
    const user = userEvent.setup();
    render(<ViewToggle currentView="grid" onToggle={mockOnToggle} />);

    const button = screen.getByTestId('view-toggle');
    await user.click(button);

    expect(mockOnToggle).toHaveBeenCalledWith('list');
  });

  it('should toggle from list to card', async () => {
    const user = userEvent.setup();
    render(<ViewToggle currentView="list" onToggle={mockOnToggle} />);

    const button = screen.getByTestId('view-toggle');
    await user.click(button);

    expect(mockOnToggle).toHaveBeenCalledWith('card');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ViewToggle
        currentView="grid"
        onToggle={mockOnToggle}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should have proper accessibility attributes', () => {
    render(<ViewToggle currentView="grid" onToggle={mockOnToggle} />);

    const button = screen.getByTestId('view-toggle');
    expect(button).toHaveAttribute('aria-label', 'Toggle view mode');
  });
});
