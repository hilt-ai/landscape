import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Container } from '@/components/Container';

describe('Container', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Container>
        <div>Test content</div>
      </Container>
    );

    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('should apply default size classes', () => {
    const { container } = render(
      <Container>
        <div>Test content</div>
      </Container>
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('max-w-7xl');
  });

  it('should apply custom size classes', () => {
    const { container } = render(
      <Container size="sm">
        <div>Test content</div>
      </Container>
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('max-w-3xl');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Test content</div>
      </Container>
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('custom-class');
  });

  it('should apply all size variants correctly', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
    const expectedClasses = [
      'max-w-3xl',
      'max-w-4xl',
      'max-w-7xl',
      'max-w-8xl',
      'max-w-none',
    ];

    sizes.forEach((size, index) => {
      const { container } = render(
        <Container size={size}>
          <div>Test content</div>
        </Container>
      );

      const containerElement = container.firstChild as HTMLElement;
      expect(containerElement).toHaveClass(expectedClasses[index]);
    });
  });
});
