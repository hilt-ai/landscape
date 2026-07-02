import { z } from 'zod';

const urlSchema = z.url();

const slugSchema = z
  .string()
  .regex(
    /^[a-z0-9-]+$/,
    'Slug must be kebab-case (lowercase letters, numbers, and hyphens only)'
  );

export const CategoryEnum = z.enum([
  'Networking',
  'Observability',
  'Profiling',
  'Security',
  'End User',
  'Other',
]);

export const StatusEnum = z.enum([
  'Platinum Member',
  'eBPF Contributor',
  'Member',
]);

export const ItemSchema = z.object({
  slug: slugSchema,
  company: z.string().min(1).max(100),
  category: z.array(CategoryEnum).min(1),
  status: z.array(StatusEnum).optional(),

  location: z.string().nullable().optional(),
  description: z.string().max(500).nullable().optional(),
  website: urlSchema.nullable().optional(),
  github_repo: urlSchema.nullable().optional(),
  linkedin: urlSchema.nullable().optional(),
  stats: urlSchema.nullable().optional(),
  year_founded: z
    .number()
    .min(1800)
    .max(new Date().getFullYear())
    .nullable()
    .optional(),
  crunchbase: urlSchema.nullable().optional(),
  youtube: urlSchema.nullable().optional(),
  blog: urlSchema.nullable().optional(),
  contact: z.string().email().nullable().optional(),
  funding_status: z.string().nullable().optional(),
  added: z.string().optional(),
  logo: z.string().optional(),
  acquired: z
    .object({
      by: z.string().min(1),
      year: z.number().min(1900).max(new Date().getFullYear()),
      url: urlSchema.nullable().optional(),
      amount: z.string().nullable().optional(),
    })
    .optional(),
});

export type Item = z.infer<typeof ItemSchema>;
export type Category = z.infer<typeof CategoryEnum>;
export type Status = z.infer<typeof StatusEnum>;

export interface ItemMembership {
  isMember: boolean;
  isPlatinumMember: boolean;
  isEbpfContributor: boolean;
  isLarge: boolean;
}

export type ViewMode = 'grid' | 'list' | 'card';
export type SortOption = 'name-asc' | 'name-desc';

export interface SearchFilters {
  query?: string;
  sort?: SortOption;
  view?: ViewMode;

  status?: string;
  category?: string;
  location?: string;
}

export interface SearchResult {
  item: Item;
  score: number;
  highlights: {
    company?: string[];
    description?: string[];
    category?: string[];
  };
}

export interface ItemsResponse {
  items: Item[];
  total: number;
  categories: Category[];
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
}
