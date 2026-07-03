import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';
import { TEST_IDS } from '@/lib/test-ids';

describe('Footer', () => {
  it('should render footer with proper structure', () => {
    render(<Footer />);

    const footer = screen.getByTestId(TEST_IDS.footer);
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute('role', 'contentinfo');
  });

  it('should display brand section with logo and description', () => {
    render(<Footer />);

    expect(screen.getByAltText('eBPF Landscape')).toBeInTheDocument();
    expect(
      screen.getByText(/A comprehensive landscape of eBPF based companies/)
    ).toBeInTheDocument();
  });

  it('should render quick links section', () => {
    render(<Footer />);

    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Contribute' })
    ).toBeInTheDocument();
  });

  it('should render community section with external links', () => {
    render(<Footer />);

    expect(screen.getByText('Community')).toBeInTheDocument();

    const eBPFLink = screen.getByRole('link', { name: 'eBPF.io' });
    expect(eBPFLink).toHaveAttribute('href', 'https://ebpf.io');
    expect(eBPFLink).toHaveAttribute('target', '_blank');
    expect(eBPFLink).toHaveAttribute('rel', 'noopener noreferrer');

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/ebpffoundation/landscape'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('should display copyright with current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} eBPF Community. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('should render social media links', () => {
    render(<Footer />);

    const githubLink = screen.getByLabelText('GitHub repository');
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/ebpffoundation/landscape'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');

    const twitterLink = screen.getByLabelText('Twitter');
    expect(twitterLink).toHaveAttribute(
      'href',
      'https://twitter.com/eBPFsummit'
    );
    expect(twitterLink).toHaveAttribute('target', '_blank');
  });

  it('should have proper accessibility attributes', () => {
    render(<Footer />);

    const footer = screen.getByTestId(TEST_IDS.footer);
    expect(footer).toHaveAttribute('role', 'contentinfo');

    const externalLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('target') === '_blank');

    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('should apply custom className when provided', () => {
    const customClass = 'custom-footer-class';
    render(<Footer className={customClass} />);

    const footer = screen.getByTestId(TEST_IDS.footer);
    expect(footer).toHaveClass(customClass);
  });

  it('should be responsive with proper grid layout', () => {
    render(<Footer />);

    const footer = screen.getByTestId(TEST_IDS.footer);
    const gridContainer = footer.querySelector('.grid');

    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-4');
  });

  it('should have proper hover states for links', () => {
    render(<Footer />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveClass('hover:text-white', 'transition-colors');
  });
});
