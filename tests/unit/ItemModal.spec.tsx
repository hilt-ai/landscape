import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ItemModal } from '@/components/ItemModal';
import type { Item } from '@/lib/types';

describe('ItemModal', () => {
  const baseItem: Item = {
    slug: 'acme',
    company: 'Acme Corp',
    category: ['Security'],
    status: ['Member'],
    location: null,
    description: 'Test',
    website: null,
    github_repo: null,
    linkedin: null,
    stats: null,
    year_founded: 2020,
    crunchbase: null,
    youtube: null,
    blog: null,
    contact: null,
    funding_status: 'Acquired',
    added: '2024-01-01',
    logo: 'acme.svg',
  } as unknown as Item;

  it('renders Acquired box when acquired is present', () => {
    const item: Item = {
      ...baseItem,
      acquired: {
        by: 'Example Inc',
        year: 2024,
        url: 'https://example.com/acq',
        amount: 'Undisclosed',
      },
    } as Item;

    render(<ItemModal item={item} isOpen={true} onClose={() => {}} />);

    expect(screen.getAllByText('Acquired').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Example Inc/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });
});
