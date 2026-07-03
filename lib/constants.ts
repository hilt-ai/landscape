export const SITE_CONFIG = {
  name: 'eBPF Landscape',
  description:
    'A comprehensive landscape of eBPF based companies',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ebpflandscape.netlify.app',
  github: 'https://github.com/ebpffoundation/landscape',
  twitter: '@ebpf_io',
} satisfies {
  name: string;
  description: string;
  url: string;
  github: string;
  twitter: string;
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const FEATURES = {
  search: true,
  filters: true,
  keyboardShortcuts: true,
  mobileMenu: true,
  gridLayout: true,
  listLayout: true,
  tags: true,
  categories: true,
  subcategories: true,
} as const;

export const DEFAULTS = {
  view: 'grid' as const,
  sort: 'name-asc' as const,
  itemsPerPage: 50,
  searchDebounceMs: 300,
  animationDuration: 200,
} as const;

export const GRID_CONFIG = {
  minTileSize: '8rem',
  maxTileSize: '16rem',
  gap: '1rem',
  denseFlow: true,
} as const;

export const SEARCH_CONFIG = {
  minQueryLength: 2,
  maxResults: 100,
  maxSuggestions: 5,
  debounceMs: 300,
} as const;

export const KEYBOARD_SHORTCUTS = {
  focusSearch: '/',
  toggleGrid: 'g',
  toggleList: 'l',
  clearFocus: 'Escape',
  openMobileMenu: 'm',
} as const;

export const API_ENDPOINTS = {
  items: '/api/items',
  search: '/api/search',
  categories: '/api/categories',
} as const;

export const PATHS = {
  data: 'data',
  items: 'data/items',
  logos: 'public/data/logos',
  categories: 'data/categories.yml',
  tags: 'data/tags.yml',
  searchIndex: 'public/search-index.json',
} as const;

export const VALIDATION = {
  maxDescriptionLength: 240,
  maxNameLength: 100,
  maxTagsPerItem: 10,
  maxLogoSize: 200 * 1024,
  maxLogoDimensions: 512,
  allowedLogoFormats: ['svg', 'png', 'jpg', 'jpeg'],
} as const;

export const A11Y = {
  skipLinkText: 'Skip to main content',
  searchLabel: 'Search eBPF landscape',
  searchPlaceholder: 'Search eBPF landscape',
  mobileMenuLabel: 'Open mobile menu',
  mobileMenu: 'Mobile menu',
  closeMenuLabel: 'Close mobile menu',
  viewToggleLabel: 'Toggle view mode',
  filterLabel: 'Filter items',
  sortLabel: 'Sort items',
} as const;

export const ANIMATIONS = {
  fast: 150,
  normal: 200,
  slow: 300,
  verySlow: 500,
} as const;

export const Z_INDEX = {
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
} as const;
