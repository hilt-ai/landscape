import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { parse } from 'yaml';
import { ItemSchema, Item, Category, ItemMembership } from '@/lib/types';

const DATA_DIR = resolve(process.cwd(), 'data');
const ITEMS_DIR = join(DATA_DIR, 'items');
const CATEGORIES_FILE = join(DATA_DIR, 'categories.yml');

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Load all items from YAML files in the data/items directory
 */
export function loadItems(): Item[] {
  if (!existsSync(ITEMS_DIR)) {
    return [];
  }

  const files = readdirSync(ITEMS_DIR).filter(
    (file) => file.endsWith('.yml') || file.endsWith('.yaml')
  );
  const items: Item[] = [];

  for (const file of files) {
    try {
      if (!/^[a-zA-Z0-9-_]+\.ya?ml$/.test(file)) {
        continue;
      }

      const filePath = join(ITEMS_DIR, file);
      const content = readFileSync(filePath, 'utf-8');

      if (content.length > 50 * 1024) {
        continue;
      }

      const data = parse(content);

      const result = ItemSchema.safeParse(data);
      if (result.success) {
        items.push(result.data);
      } else {
        // Invalid item in file
      }
    } catch {
      // Failed to load item from file
    }
  }

  return items;
}

/**
 * Load categories from categories.yml
 */
export function loadCategories(): Category[] {
  if (!existsSync(CATEGORIES_FILE)) {
    return [];
  }

  try {
    const content = readFileSync(CATEGORIES_FILE, 'utf-8');
    const data = parse(content);

    if (data.categories && Array.isArray(data.categories)) {
      return data.categories.map((cat: { name: string }) => cat.name);
    }

    return [];
  } catch {
    return [];
  }
}

/**
 * Get membership information for an item (now self-contained in item data)
 */
export function getItemMembership(item: Item): ItemMembership {
  if (!item.status || item.status.length === 0) {
    return {
      isMember: false,
      isPlatinumMember: false,
      isEbpfContributor: false,
      isLarge: false,
    };
  }

  const isMember = item.status.includes('Member');
  const isPlatinumMember = item.status.includes('Platinum Member');
  const isEbpfContributor = item.status.includes('eBPF Contributor');

  return {
    isMember: isMember && !isPlatinumMember,
    isPlatinumMember,
    isEbpfContributor,
    isLarge: isPlatinumMember && isEbpfContributor,
  };
}

/**
 * Validate items against categories and check for duplicates
 */
export function validateData(
  items: Item[],
  categories: string[]
): ValidationResult {
  const errors: string[] = [];

  const slugSet = new Set<string>();
  for (const item of items) {
    if (slugSet.has(item.slug)) {
      errors.push(`Duplicate slug found: ${item.slug}`);
    }
    slugSet.add(item.slug);
  }

  for (const item of items) {
    for (const category of item.category) {
      if (!categories.includes(category)) {
        errors.push(
          `Item "${item.slug}" references non-existent category: ${category}`
        );
      }
    }

    if (item.status && item.status.length > 0) {
      const validStatuses = ['Platinum Member', 'eBPF Contributor', 'Member'];
      for (const status of item.status) {
        if (!validStatuses.includes(status)) {
          errors.push(`Item "${item.slug}" has invalid status: ${status}`);
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get all unique categories from items
 */
export function extractCategories(items: Item[]): string[] {
  const categorySet = new Set<string>();

  for (const item of items) {
    for (const category of item.category) {
      categorySet.add(category);
    }
  }

  return Array.from(categorySet).sort();
}

/**
 * Get items grouped by category in the order defined in categories.yml
 */
export function groupItemsByCategory(items: Item[]): Map<string, Item[]> {
  const groups = new Map<string, Item[]>();

  const orderedCategories = loadCategories();

  for (const category of orderedCategories) {
    groups.set(category, []);
  }

  for (const item of items) {
    for (const category of item.category) {
      if (groups.has(category)) {
        groups.get(category)!.push(item);
      }
    }
  }

  return groups;
}

/**
 * Get items filtered by status
 */
export function filterItemsByStatus(items: Item[], status: string): Item[] {
  return items.filter(
    (item) =>
      item.status &&
      item.status.includes(
        status as 'Platinum Member' | 'eBPF Contributor' | 'Member'
      )
  );
}
