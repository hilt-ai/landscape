import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  loadCategories,
  validateData,
  getItemMembership,
} from '@/lib/data-loader';

vi.mock('fs', () => ({
  default: {
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
  },
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
}));

vi.mock('path', () => ({
  default: {
    join: vi.fn((...args) => args.join('/')),
    resolve: vi.fn((...args) => args.join('/')),
  },
  join: vi.fn((...args) => args.join('/')),
  resolve: vi.fn((...args) => args.join('/')),
}));

describe('Data Loader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loadCategories', () => {
    it('should return empty array when categories file does not exist', async () => {
      const mockFs = await import('fs');

      vi.mocked(mockFs.existsSync).mockReturnValue(false);

      const categories = await loadCategories();
      expect(categories).toEqual([]);
    });
  });

  describe('getItemMembership', () => {
    it('should return correct membership for regular member', () => {
      const item = {
        slug: 'test',
        company: 'Test Company',
        category: ['Networking'] as (
          | 'Networking'
          | 'Observability'
          | 'Profiling'
          | 'Security'
          | 'Other'
        )[],
        status: ['Member'] as (
          | 'Platinum Member'
          | 'eBPF Contributor'
          | 'Member'
        )[],
      };

      const membership = getItemMembership(item);
      expect(membership.isPlatinumMember).toBe(false);
      expect(membership.isMember).toBe(true);
      expect(membership.isEbpfContributor).toBe(false);
      expect(membership.isLarge).toBe(false);
    });

    it('should return correct membership for eBPF contributor', () => {
      const item = {
        slug: 'test',
        company: 'Test Company',
        category: ['Networking'] as (
          | 'Networking'
          | 'Observability'
          | 'Profiling'
          | 'Security'
          | 'Other'
        )[],
        status: ['eBPF Contributor'] as (
          | 'Platinum Member'
          | 'eBPF Contributor'
          | 'Member'
        )[],
      };

      const membership = getItemMembership(item);
      expect(membership.isPlatinumMember).toBe(false);
      expect(membership.isMember).toBe(false);
      expect(membership.isEbpfContributor).toBe(true);
      expect(membership.isLarge).toBe(false);
    });

    it('should handle multiple statuses', () => {
      const item = {
        slug: 'test',
        company: 'Test Company',
        category: ['Networking'] as (
          | 'Networking'
          | 'Observability'
          | 'Profiling'
          | 'Security'
          | 'Other'
        )[],
        status: ['Platinum Member', 'eBPF Contributor'] as (
          | 'Platinum Member'
          | 'eBPF Contributor'
          | 'Member'
        )[],
      };

      const membership = getItemMembership(item);
      expect(membership.isPlatinumMember).toBe(true);
      expect(membership.isMember).toBe(false);
      expect(membership.isEbpfContributor).toBe(true);
      expect(membership.isLarge).toBe(true);
    });

    it('should return default membership for items with no status', () => {
      const item = {
        slug: 'test',
        company: 'Test Company',
        category: ['Networking'] as (
          | 'Networking'
          | 'Observability'
          | 'Profiling'
          | 'Security'
          | 'Other'
        )[],
      };

      const membership = getItemMembership(item);
      expect(membership.isPlatinumMember).toBe(false);
      expect(membership.isMember).toBe(false);
      expect(membership.isEbpfContributor).toBe(false);
      expect(membership.isLarge).toBe(false);
    });

    it('should return default membership for items with empty status array', () => {
      const item = {
        slug: 'test',
        company: 'Test Company',
        category: ['Networking'] as (
          | 'Networking'
          | 'Observability'
          | 'Profiling'
          | 'Security'
          | 'Other'
        )[],
        status: [] as ('Platinum Member' | 'eBPF Contributor' | 'Member')[],
      };

      const membership = getItemMembership(item);
      expect(membership.isPlatinumMember).toBe(false);
      expect(membership.isMember).toBe(false);
      expect(membership.isEbpfContributor).toBe(false);
      expect(membership.isLarge).toBe(false);
    });
  });

  describe('validateData', () => {
    it('should validate items against categories', async () => {
      const mockItems = [
        {
          slug: 'cilium',
          company: 'Isovalent (Cilium)',
          category: ['Networking', 'Security'] as (
            | 'Networking'
            | 'Observability'
            | 'Profiling'
            | 'Security'
            | 'Other'
          )[],
          status: ['Platinum Member'] as (
            | 'Platinum Member'
            | 'eBPF Contributor'
            | 'Member'
          )[],
          description: 'eBPF-based networking',
          website: 'https://cilium.io',
        },
      ];

      const mockCategories = [
        'Networking',
        'Security',
        'Observability',
        'Profiling',
        'Other',
      ];

      const result = validateData(mockItems, mockCategories);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect duplicate slugs', async () => {
      const mockItems = [
        {
          slug: 'duplicate',
          company: 'Test 1',
          description: 'Test description 1',
          website: 'https://example1.com',
          category: ['Networking'] as (
            | 'Networking'
            | 'Observability'
            | 'Profiling'
            | 'Security'
            | 'Other'
          )[],
          status: ['Member'] as (
            | 'Platinum Member'
            | 'eBPF Contributor'
            | 'Member'
          )[],
        },
        {
          slug: 'duplicate',
          company: 'Test 2',
          description: 'Test description 2',
          website: 'https://example2.com',
          category: ['Observability'] as (
            | 'Networking'
            | 'Observability'
            | 'Profiling'
            | 'Security'
            | 'Other'
          )[],
          status: ['Member'] as (
            | 'Platinum Member'
            | 'eBPF Contributor'
            | 'Member'
          )[],
        },
      ];

      const mockCategories = [
        'Networking',
        'Observability',
        'Profiling',
        'Security',
        'Other',
      ];

      const result = validateData(mockItems, mockCategories);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('duplicate');
    });

    it('should validate items with no status', async () => {
      const mockItems = [
        {
          slug: 'test',
          company: 'Test Company',
          description: 'Test description',
          website: 'https://example.com',
          category: ['Networking'] as (
            | 'Networking'
            | 'Observability'
            | 'Profiling'
            | 'Security'
            | 'Other'
          )[],
        },
      ];

      const mockCategories = [
        'Networking',
        'Observability',
        'Profiling',
        'Security',
        'Other',
      ];

      const result = validateData(mockItems, mockCategories);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
