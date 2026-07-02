import { describe, it, expect } from 'vitest';
import {
  parseSearchParams,
  buildSearchParams,
  updateSearchParams,
} from '@/lib/url-state';
import { SearchFilters } from '@/lib/types';

describe('URL State Utilities', () => {
  describe('parseSearchParams', () => {
    it('should parse all search parameters', () => {
      const searchParams = new URLSearchParams({
        q: 'cilium',
        category: 'Networking',
        status: 'Platinum Member',
        location: 'United States',
        sort: 'name-asc',
        view: 'grid',
      });

      const result = parseSearchParams(searchParams);

      expect(result).toEqual({
        filters: {
          query: 'cilium',
          category: 'Networking',
          status: 'Platinum Member',
          location: 'United States',
        },
        sort: 'name-asc',
        view: 'grid',
      });
    });

    it('should handle empty search params', () => {
      const searchParams = new URLSearchParams();
      const result = parseSearchParams(searchParams);

      expect(result).toEqual({
        filters: {
          query: undefined,
          category: undefined,
          status: undefined,
          location: undefined,
        },
        sort: 'name-asc',
        view: 'grid',
      });
    });

    it('should handle single status', () => {
      const searchParams = new URLSearchParams({
        status: 'Member',
      });

      const result = parseSearchParams(searchParams);
      expect(result.filters.status).toEqual('Member');
    });

    it('should handle empty status', () => {
      const searchParams = new URLSearchParams({
        status: '',
      });

      const result = parseSearchParams(searchParams);
      expect(result.filters.status).toBeUndefined();
    });

    it('should handle invalid sort option', () => {
      const searchParams = new URLSearchParams({
        sort: 'invalid',
      });

      const result = parseSearchParams(searchParams);
      expect(result.sort).toBe('name-asc');
    });

    it('should handle invalid view mode', () => {
      const searchParams = new URLSearchParams({
        view: 'invalid',
      });

      const result = parseSearchParams(searchParams);
      expect(result.view).toBe('grid');
    });
  });

  describe('buildSearchParams', () => {
    it('should build search params from filters', () => {
      const filters: SearchFilters = {
        query: 'cilium',
        category: 'Networking',
        status: 'Platinum Member',
        location: 'United States',
        sort: 'name-asc',
        view: 'grid',
      };

      const result = buildSearchParams(filters);
      const params = new URLSearchParams(result);

      expect(params.get('q')).toBe('cilium');
      expect(params.get('category')).toBe('Networking');
      expect(params.get('status')).toBe('Platinum Member');
      expect(params.get('location')).toBe('United States');
      expect(params.get('sort')).toBe('name-asc');
      expect(params.get('view')).toBe('grid');
    });

    it('should handle empty filters', () => {
      const filters: SearchFilters = {};
      const result = buildSearchParams(filters);
      const params = new URLSearchParams(result);

      expect(params.get('q')).toBeNull();
      expect(params.get('category')).toBeNull();
      expect(params.get('status')).toBeNull();
      expect(params.get('location')).toBeNull();
      expect(params.get('sort')).toBeNull();
      expect(params.get('view')).toBeNull();
    });

    it('should handle single status', () => {
      const filters: SearchFilters = {
        status: 'Member',
      };

      const result = buildSearchParams(filters);
      const params = new URLSearchParams(result);

      expect(params.get('status')).toBe('Member');
    });

    it('should skip undefined values', () => {
      const filters: SearchFilters = {
        query: 'test',
        category: undefined,
        status: undefined,
      };

      const result = buildSearchParams(filters);
      const params = new URLSearchParams(result);

      expect(params.get('q')).toBe('test');
      expect(params.get('category')).toBeNull();
      expect(params.get('status')).toBeNull();
    });
  });

  describe('updateSearchParams', () => {
    it('should update existing search params', () => {
      const currentParams = new URLSearchParams({
        q: 'old',
        category: 'Networking',
      });

      const updates: Partial<SearchFilters> = {
        query: 'new',
        view: 'list',
      };

      const result = updateSearchParams(currentParams, updates);
      const params = new URLSearchParams(result);

      expect(params.get('q')).toBe('new');
      expect(params.get('category')).toBe('Networking');
      expect(params.get('view')).toBe('list');
    });

    it('should remove params when set to undefined', () => {
      const currentParams = new URLSearchParams({
        q: 'test',
        category: 'Networking',
        status: 'Member',
      });

      const updates: Partial<SearchFilters> = {
        query: undefined,
        status: undefined,
      };

      const result = updateSearchParams(currentParams, updates);
      const params = new URLSearchParams(result);

      expect(params.get('q')).toBeNull();
      expect(params.get('category')).toBe('Networking');
      expect(params.get('status')).toBeNull();
    });

    it('should handle empty updates', () => {
      const currentParams = new URLSearchParams({
        q: 'test',
        category: 'Networking',
      });

      const updates: Partial<SearchFilters> = {};

      const result = updateSearchParams(currentParams, updates);
      const params = new URLSearchParams(result);

      expect(params.get('q')).toBe('test');
      expect(params.get('category')).toBe('Networking');
    });

    it('should handle empty current params', () => {
      const currentParams = new URLSearchParams();

      const updates: Partial<SearchFilters> = {
        query: 'new',
        view: 'grid',
      };

      const result = updateSearchParams(currentParams, updates);
      const params = new URLSearchParams(result);

      expect(params.get('q')).toBe('new');
      expect(params.get('view')).toBe('grid');
    });
  });
});
