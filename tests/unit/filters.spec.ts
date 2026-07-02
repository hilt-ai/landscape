import { describe, it, expect } from 'vitest';
import { filterItems, sortItems } from '@/lib/filters';
import { SearchFilters, SortOption } from '@/lib/types';
import { Item } from '@/lib/types';

describe('Filters', () => {
  const mockItems: Item[] = [
    {
      slug: 'cilium',
      company: 'Cilium',
      description: 'eBPF-based networking, security, and observability',
      website: 'https://cilium.io',
      github_repo: 'https://github.com/cilium/cilium',
      category: ['Networking', 'Security', 'Observability'],
      status: ['Platinum Member'],
      location: 'United States',
      added: '2020-01-01',
    },
    {
      slug: 'bpf-tools',
      company: 'BPF Tools',
      description: 'Collection of BPF tools for development',
      website: 'https://github.com/iovisor/bcc',
      category: ['Profiling'],
      status: ['eBPF Contributor'],
      location: 'United States',
      added: '2019-01-01',
    },
    {
      slug: 'falco',
      company: 'Falco',
      description: 'Runtime security monitoring with eBPF',
      website: 'https://falco.org',
      github_repo: 'https://github.com/falcosecurity/falco',
      category: ['Security'],
      status: ['Member'],
      location: 'Italy',
      added: '2021-01-01',
    },
  ];

  describe('filterItems', () => {
    it('should filter by category', () => {
      const filters: SearchFilters = {
        category: 'Networking',
      };

      const result = filterItems(mockItems, filters);
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('cilium');
    });

    it('should filter by status', () => {
      const filters: SearchFilters = {
        status: 'Platinum Member',
      };

      const result = filterItems(mockItems, filters);
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('cilium');
    });

    it('should filter by location', () => {
      const filters: SearchFilters = {
        location: 'United States',
      };

      const result = filterItems(mockItems, filters);
      expect(result).toHaveLength(2);
      expect(result.map((item) => item.slug)).toEqual(['cilium', 'bpf-tools']);
    });

    it('should filter by multiple categories', () => {
      const filters: SearchFilters = {
        category: 'Security',
      };

      const result = filterItems(mockItems, filters);
      expect(result).toHaveLength(2);
      expect(result.map((item) => item.slug)).toEqual(['cilium', 'falco']);
    });

    it('should filter by query in company name', () => {
      const filters: SearchFilters = {
        query: 'cilium',
      };

      const result = filterItems(mockItems, filters);
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('cilium');
    });

    it('should filter by query in description', () => {
      const filters: SearchFilters = {
        query: 'runtime',
      };

      const result = filterItems(mockItems, filters);
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('falco');
    });

    it('should filter by query in category', () => {
      const filters: SearchFilters = {
        query: 'profiling',
      };

      const result = filterItems(mockItems, filters);
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('bpf-tools');
    });

    it('should combine multiple filters', () => {
      const filters: SearchFilters = {
        category: 'Security',
        status: 'Member',
      };

      const result = filterItems(mockItems, filters);
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('falco');
    });

    it('should return all items when no filters applied', () => {
      const filters: SearchFilters = {};

      const result = filterItems(mockItems, filters);
      expect(result).toHaveLength(3);
    });

    it('should handle case-insensitive query', () => {
      const filters: SearchFilters = {
        query: 'CILIUM',
      };

      const result = filterItems(mockItems, filters);
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('cilium');
    });

    it('should handle partial query matches', () => {
      const filters: SearchFilters = {
        query: 'cil',
      };

      const result = filterItems(mockItems, filters);
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('cilium');
    });
  });

  describe('sortItems', () => {
    it('should sort by company name ascending', () => {
      const result = sortItems(mockItems, 'name-asc');
      expect(result.map((item) => item.company)).toEqual([
        'BPF Tools',
        'Cilium',
        'Falco',
      ]);
    });

    it('should sort by company name descending', () => {
      const result = sortItems(mockItems, 'name-desc');
      expect(result.map((item) => item.company)).toEqual([
        'Falco',
        'Cilium',
        'BPF Tools',
      ]);
    });

    it('should sort by name-asc first', () => {
      const result = sortItems(mockItems, 'name-asc');
      expect(result.map((item) => item.slug)).toEqual([
        'bpf-tools',
        'cilium',
        'falco',
      ]);
    });

    it('should default to company name ascending for invalid sort option', () => {
      const result = sortItems(mockItems, 'invalid' as SortOption);
      expect(result.map((item) => item.company)).toEqual([
        'BPF Tools',
        'Cilium',
        'Falco',
      ]);
    });
  });
});
