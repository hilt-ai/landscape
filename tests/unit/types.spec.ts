import { describe, it, expect } from 'vitest';
import { ItemSchema, CategoryEnum, StatusEnum } from '@/lib/types';

describe('Data Schemas', () => {
  describe('ItemSchema', () => {
    it('should validate a complete item', () => {
      const validItem = {
        slug: 'cilium',
        company: 'Isovalent (Cilium)',
        category: ['Networking', 'Security', 'Observability'],
        status: ['Platinum Member', 'eBPF Contributor'],
        description: 'eBPF-based networking, security, and observability',
        website: 'https://cilium.io',
        github_repo: 'https://github.com/cilium/cilium',
        linkedin: 'https://linkedin.com/company/isovalent',
        location: 'United States',
        year_founded: 2016,
        funding_status: 'Series A',
      };

      const result = ItemSchema.safeParse(validItem);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.slug).toBe('cilium');
        expect(result.data.company).toBe('Isovalent (Cilium)');
      }
    });

    it('should validate minimal required fields', () => {
      const minimalItem = {
        slug: 'bpf-tools',
        company: 'BPF Tools Company',
        category: ['Other'],
        status: ['Member'],
      };

      const result = ItemSchema.safeParse(minimalItem);
      expect(result.success).toBe(true);
    });

    it('should validate items with no status', () => {
      const itemWithoutStatus = {
        slug: 'bpf-tools',
        company: 'BPF Tools Company',
        category: ['Other'],
      };

      const result = ItemSchema.safeParse(itemWithoutStatus);
      expect(result.success).toBe(true);
    });

    it('should validate items with empty status array', () => {
      const itemWithEmptyStatus = {
        slug: 'bpf-tools',
        company: 'BPF Tools Company',
        category: ['Other'],
        status: [],
      };

      const result = ItemSchema.safeParse(itemWithEmptyStatus);
      expect(result.success).toBe(true);
    });

    it('should reject invalid slug format', () => {
      const invalidItem = {
        slug: 'Invalid Slug!',
        company: 'Test Company',
        category: ['Other'],
        status: ['Member'],
      };

      const result = ItemSchema.safeParse(invalidItem);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['slug']);
      }
    });

    it('should reject invalid URLs', () => {
      const invalidItem = {
        slug: 'test',
        company: 'Test Company',
        category: ['Other'],
        status: ['Member'],
        website: 'not-a-url',
      };

      const result = ItemSchema.safeParse(invalidItem);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['website']);
      }
    });

    it('should reject missing required fields', () => {
      const incompleteItem = {
        slug: 'test',
        company: 'Test Company',
        status: ['Member'],
      };

      const result = ItemSchema.safeParse(incompleteItem);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((issue) => issue.path.includes('category'))
        ).toBe(true);
      }
    });

    it('should reject invalid category values', () => {
      const invalidItem = {
        slug: 'test',
        company: 'Test Company',
        category: ['Invalid Category'],
        status: ['Member'],
      };

      const result = ItemSchema.safeParse(invalidItem);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((issue) => issue.path.includes('category'))
        ).toBe(true);
      }
    });

    it('should reject invalid status values', () => {
      const invalidItem = {
        slug: 'test',
        company: 'Test Company',
        category: ['Other'],
        status: ['Invalid Status'],
      };

      const result = ItemSchema.safeParse(invalidItem);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((issue) => issue.path.includes('status'))
        ).toBe(true);
      }
    });
  });

  describe('CategoryEnum', () => {
    it('should validate valid category values', () => {
      const validCategories = [
        'Networking',
        'Observability',
        'Profiling',
        'Security',
        'Other',
      ];

      for (const category of validCategories) {
        const result = CategoryEnum.safeParse(category);
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid category values', () => {
      const invalidCategory = 'Invalid Category';
      const result = CategoryEnum.safeParse(invalidCategory);
      expect(result.success).toBe(false);
    });
  });

  describe('StatusEnum', () => {
    it('should validate valid status values', () => {
      const validStatuses = ['Platinum Member', 'eBPF Contributor', 'Member'];

      for (const status of validStatuses) {
        const result = StatusEnum.safeParse(status);
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid status values', () => {
      const invalidStatus = 'Invalid Status';
      const result = StatusEnum.safeParse(invalidStatus);
      expect(result.success).toBe(false);
    });
  });
});
