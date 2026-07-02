interface CrunchbaseFundingRound {
  year: string;
  count: number;
  amount: number; // in billions
}

interface CrunchbaseFundingAmount {
  year: string;
  amount: number; // in billions
}

interface CrunchbaseResponse {
  fundingRoundsByYear: CrunchbaseFundingRound[];
  fundingAmountByYear: CrunchbaseFundingAmount[];
  acquisitionsByYear: CrunchbaseFundingRound[]; // reuse count shape
  acquisitionsAmountByYear: CrunchbaseFundingAmount[];
  companiesFoundedByYear: CrunchbaseFundingRound[]; // use count per year
}

export async function getCrunchbaseFundingData(): Promise<CrunchbaseResponse> {
  try {
    const response = await fetch('/api/crunchbase', {
      cache: 'force-cache',
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch {
    // Return mock data as fallback
    return {
      fundingRoundsByYear: [
        { year: '2021', count: 45, amount: 2.1 },
        { year: '2022', count: 52, amount: 3.2 },
        { year: '2023', count: 38, amount: 2.8 },
        { year: '2024', count: 41, amount: 4.5 },
        { year: '2025', count: 28, amount: 3.1 },
      ],
      fundingAmountByYear: [
        { year: '2021', amount: 2.1 },
        { year: '2022', amount: 3.2 },
        { year: '2023', amount: 2.8 },
        { year: '2024', amount: 4.5 },
        { year: '2025', amount: 3.1 },
      ],
      acquisitionsByYear: [
        { year: '2021', count: 220, amount: 15.0 },
        { year: '2022', count: 300, amount: 16.0 },
        { year: '2023', count: 240, amount: 8.0 },
        { year: '2024', count: 210, amount: 15.5 },
        { year: '2025', count: 160, amount: 13.5 },
      ],
      acquisitionsAmountByYear: [
        { year: '2021', amount: 150.0 },
        { year: '2022', amount: 200.0 },
        { year: '2023', amount: 80.0 },
        { year: '2024', amount: 150.0 },
        { year: '2025', amount: 130.0 },
      ],
      companiesFoundedByYear: [
        { year: '2019', count: 18, amount: 0 },
        { year: '2020', count: 22, amount: 0 },
        { year: '2021', count: 35, amount: 0 },
        { year: '2022', count: 28, amount: 0 },
        { year: '2023', count: 24, amount: 0 },
        { year: '2024', count: 19, amount: 0 },
        { year: '2025', count: 12, amount: 0 },
      ],
    };
  }
}

export function getCrunchbaseApiStatus(): {
  hasApiKey: boolean;
  message: string;
} {
  const hasApiKey = !!process.env.CRUNCHBASE_API_KEY;

  return {
    hasApiKey,
    message: hasApiKey
      ? 'Crunchbase API key configured. Real data will be fetched.'
      : 'CRUNCHBASE_API_KEY environment variable not set. Using mock data.',
  };
}
