import { Index } from 'flexsearch';
import { Item, SearchResult } from '@/lib/types';

interface SearchDocument {
  id: number;
  slug: string;
  name: string;
  description: string;
  tags: string[];
  group: string;
  subcategory: string | null;
  organization: string | null;
  searchableText: string;
}

let searchIndex: Index | null = null;
let itemsCache: Item[] = [];

/**
 * Build search index from items
 */
export async function buildSearchIndex(items: Item[]): Promise<Index> {
  searchIndex = new Index({
    tokenize: 'forward',
    resolution: 3,
  });

  const documents: SearchDocument[] = items.map((item, index) => {
    const searchableText = [
      item.company,
      item.description,
      ...(item.category || []),
      item.location || '',
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return {
      id: index,
      slug: item.slug,
      name: item.company,
      description: item.description || '',
      tags: item.category || [],
      group: item.category[0] || 'Other',
      subcategory: null,
      organization: item.location || null,
      searchableText,
    };
  });

  for (const doc of documents) {
    searchIndex.add(doc.id, doc.searchableText);
  }

  itemsCache = items;

  return searchIndex;
}

/**
 * Search items using the built index
 */
export async function searchItems(
  query: string,
  items: Item[]
): Promise<SearchResult[]> {
  if (!searchIndex || itemsCache.length === 0) {
    await buildSearchIndex(items);
  }

  if (!searchIndex || !query.trim()) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();

  const results = await searchIndex.search(normalizedQuery, {
    limit: 100,
    suggest: true,
  });

  const searchResults: SearchResult[] = results
    .map((id: string | number) => {
      const itemId = typeof id === 'string' ? parseInt(id, 10) : id;
      const item = itemsCache[itemId];
      if (!item) return null;

      const score = calculateRelevanceScore(item, normalizedQuery);

      const highlights = generateHighlights(item, normalizedQuery);

      return {
        item,
        score,
        highlights,
      };
    })
    .filter(Boolean) as SearchResult[];

  return searchResults.sort((a, b) => b.score - a.score);
}

/**
 * Calculate relevance score for search result
 */
function calculateRelevanceScore(item: Item, query: string): number {
  let score = 0;
  const queryLower = query.toLowerCase();

  if (item.company.toLowerCase() === queryLower) {
    score += 100;
  } else if (item.company.toLowerCase().includes(queryLower)) {
    score += 80;
  }

  if (item.slug.toLowerCase().includes(queryLower)) {
    score += 70;
  }

  if (item.description?.toLowerCase().includes(queryLower)) {
    score += 50;
  }

  const categoryMatches = item.category.filter((category) =>
    category.toLowerCase().includes(queryLower)
  ).length;
  score += categoryMatches * 30;

  if (item.location?.toLowerCase().includes(queryLower)) {
    score += 20;
  }

  if (item.status?.includes('Platinum Member')) {
    score += 5;
  }

  return score;
}

/**
 * Generate highlights for search result
 */
function generateHighlights(
  item: Item,
  query: string
): SearchResult['highlights'] {
  const queryLower = query.toLowerCase();
  const highlights: SearchResult['highlights'] = {};

  if (item.company.toLowerCase().includes(queryLower)) {
    highlights.company = [item.company];
  }

  if (item.description?.toLowerCase().includes(queryLower)) {
    highlights.description = [item.description];
  }

  const matchingCategories = item.category.filter((category) =>
    category.toLowerCase().includes(queryLower)
  );
  if (matchingCategories.length > 0) {
    highlights.category = matchingCategories;
  }

  return highlights;
}

/**
 * Get search suggestions based on partial query
 */
export async function getSearchSuggestions(
  query: string,
  items: Item[],
  limit = 5
): Promise<string[]> {
  if (!query.trim() || query.length < 2) {
    return [];
  }

  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();

  for (const item of items) {
    if (item.company.toLowerCase().includes(queryLower)) {
      suggestions.add(item.company);
    }

    for (const category of item.category) {
      if (category.toLowerCase().includes(queryLower)) {
        suggestions.add(category);
      }
    }

    if (item.location?.toLowerCase().includes(queryLower)) {
      suggestions.add(item.location);
    }

    if (suggestions.size >= limit) {
      break;
    }
  }

  return Array.from(suggestions).slice(0, limit);
}

/**
 * Clear search index cache
 */
export function clearSearchIndex(): void {
  searchIndex = null;
  itemsCache = [];
}
