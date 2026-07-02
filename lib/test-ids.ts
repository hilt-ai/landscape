export const TEST_IDS = {
  header: 'header',
  logo: 'header-logo',
  searchInput: 'search-input',
  searchButton: 'search-button',
  mobileMenuButton: 'mobile-menu-button',
  mobileMenu: 'mobile-menu',
  viewToggle: 'view-toggle',
  themeToggle: 'theme-toggle',

  navigation: 'navigation',
  navItem: 'nav-item',
  breadcrumbs: 'breadcrumbs',

  filtersBar: 'filters-bar',
  mobileFilters: 'mobile-filters',
  groupFilter: 'group-filter',
  subcategoryFilter: 'subcategory-filter',
  statusFilter: 'status-filter',
  membershipFilter: 'membership-filter',
  categoryFilter: 'category-filter',
  locationFilter: 'location-filter',
  tagsFilter: 'tags-filter',
  sortMenu: 'sort-menu',
  clearFilters: 'clear-filters',

  categoryCluster: 'category-cluster',

  mainContent: 'main-content',
  itemsGrid: 'items-grid',
  itemsList: 'items-list',
  itemsCard: 'items-card',
  itemTile: 'item-tile',
  itemRow: 'item-row',
  itemCard: 'item-card',
  emptyState: 'empty-state',
  tableOfContents: 'table-of-contents',

  itemLogo: 'item-logo',
  itemName: 'item-name',
  itemDescription: 'item-description',
  itemTags: 'item-tags',
  itemLinks: 'item-links',
  itemHomepage: 'item-homepage',
  itemRepository: 'item-repository',
  itemCrunchbase: 'item-crunchbase',

  footer: 'footer',
  footerLinks: 'footer-links',
  footerSocial: 'footer-social',

  loadingSpinner: 'loading-spinner',
  loadingSkeleton: 'loading-skeleton',

  errorMessage: 'error-message',
  errorRetry: 'error-retry',

  skipLink: 'skip-link',
  visuallyHidden: 'visually-hidden',

  modal: 'modal',
  modalOverlay: 'modal-overlay',
  modalClose: 'modal-close',

  tooltip: 'tooltip',

  searchResults: 'search-results',
  searchSuggestions: 'search-suggestions',
  searchClear: 'search-clear',

  pagination: 'pagination',
  paginationNext: 'pagination-next',
  paginationPrev: 'pagination-prev',
  paginationPage: 'pagination-page',

  itemsCount: 'items-count',
  filteredCount: 'filtered-count',

  keyboardShortcuts: 'keyboard-shortcuts',
  shortcutHelp: 'shortcut-help',
} as const;

export function getTestId(id: keyof typeof TEST_IDS): {
  'data-testid': string;
} {
  return { 'data-testid': TEST_IDS[id] };
}

export function getTestSelector(id: keyof typeof TEST_IDS): string {
  return `[data-testid="${TEST_IDS[id]}"]`;
}
