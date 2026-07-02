import { Item } from './types';
import { getCrunchbaseFundingData } from './crunchbase';

export interface StatsData {
  totalCompanies: number;
  platinumMembers: number;
  contributors: number;
  members: number;
  categoryDistribution: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  statusDistribution: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
  companiesWithGithub: number;
  companiesWithLinkedIn: number;
  companiesWithWebsite: number;
  averageDescriptionLength: number;
  fundingRoundsByYear: Array<{ year: string; count: number }>;
  fundingAmountByYear: Array<{ year: string; amount: number }>;
  acquisitionsByYear: Array<{ year: string; count: number }>;
  acquisitionsAmountByYear: Array<{ year: string; amount: number }>;
  companiesFoundedByYear: Array<{ year: string; count: number }>;
}

export async function generateStatsData(items: Item[]): Promise<StatsData> {
  const totalCompanies = items.length;

  // Category distribution
  const categoryCounts = new Map<string, number>();
  items.forEach((item) => {
    item.category.forEach((cat) => {
      categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
    });
  });

  const categoryDistribution = Array.from(categoryCounts.entries())
    .map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / totalCompanies) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Status distribution and counts
  const statusCounts = new Map<string, number>();
  let platinumMembers = 0;
  let contributors = 0;
  let members = 0;

  items.forEach((item) => {
    if (item.status && item.status.length > 0) {
      item.status.forEach((status) => {
        statusCounts.set(status, (statusCounts.get(status) || 0) + 1);

        if (status === 'Platinum Member') platinumMembers++;
        if (status === 'eBPF Contributor') contributors++;
        if (status === 'Member') members++;
      });
    } else {
      statusCounts.set('No Status', (statusCounts.get('No Status') || 0) + 1);
    }
  });

  const statusDistribution = Array.from(statusCounts.entries())
    .map(([status, count]) => ({
      status,
      count,
      percentage: Math.round((count / totalCompanies) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Social media presence
  const companiesWithGithub = items.filter((item) => item.github_repo).length;
  const companiesWithLinkedIn = items.filter((item) => item.linkedin).length;
  const companiesWithWebsite = items.filter((item) => item.website).length;

  // Average description length
  const descriptions = items
    .filter((item) => item.description)
    .map((item) => item.description!.length);
  const averageDescriptionLength =
    descriptions.length > 0
      ? Math.round(
          descriptions.reduce((sum, len) => sum + len, 0) / descriptions.length
        )
      : 0;

  // Companies founded by year
  const foundedCounts = new Map<string, number>();
  items.forEach((item) => {
    if (item.year_founded) {
      const year = String(item.year_founded);
      foundedCounts.set(year, (foundedCounts.get(year) || 0) + 1);
    }
  });
  const companiesFoundedByYear = Array.from(foundedCounts.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => Number(a.year) - Number(b.year));

  // Get real funding data from Crunchbase API
  const crunchbaseData = await getCrunchbaseFundingData();

  return {
    totalCompanies,
    platinumMembers,
    contributors,
    members,
    categoryDistribution,
    statusDistribution,
    companiesWithGithub,
    companiesWithLinkedIn,
    companiesWithWebsite,
    averageDescriptionLength,
    fundingRoundsByYear: crunchbaseData.fundingRoundsByYear,
    fundingAmountByYear: crunchbaseData.fundingAmountByYear,
    acquisitionsByYear: crunchbaseData.acquisitionsByYear,
    acquisitionsAmountByYear: crunchbaseData.acquisitionsAmountByYear,
    companiesFoundedByYear,
  };
}

export function getUniqueCategories(items: Item[]): string[] {
  const categories = new Set<string>();
  items.forEach((item) => {
    item.category.forEach((cat) => categories.add(cat));
  });
  return Array.from(categories).sort();
}

export function getUniqueStatuses(items: Item[]): string[] {
  const statuses = new Set<string>();
  items.forEach((item) => {
    if (item.status && item.status.length > 0) {
      item.status.forEach((status) => statuses.add(status));
    }
  });
  return Array.from(statuses).sort();
}
