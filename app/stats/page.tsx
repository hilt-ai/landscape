import { loadItems } from '@/lib/data-loader';
import { generateStatsData } from '@/lib/stats';
// import { getCrunchbaseApiStatus } from '@/lib/crunchbase';
import {
  ContentPage,
  ContentHeading,
  ContentParagraph,
} from '@/components/ContentPage';
import { StatsChart } from '@/components/StatsChart';

export const dynamic = 'force-dynamic';

export default async function StatsPage() {
  const items = await loadItems();
  const stats = await generateStatsData(items);
  // const apiStatus = getCrunchbaseApiStatus();

  return (
    <ContentPage title="eBPF Landscape Statistics">
      <ContentParagraph className="text-lg">
        Comprehensive statistics and insights about the eBPF ecosystem,
        including company distribution, growth trends, and market analysis.
      </ContentParagraph>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft">
          <div className="text-3xl font-bold text-stone-900 mb-2">
            {stats.totalCompanies}
          </div>
          <div className="text-stone-600 font-medium">Total Companies</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft">
          <div className="text-3xl font-bold text-stone-900 mb-2">
            {stats.platinumMembers}
          </div>
          <div className="text-stone-600 font-medium">Platinum Members</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft">
          <div className="text-3xl font-bold text-stone-900 mb-2">
            {stats.contributors}
          </div>
          <div className="text-stone-600 font-medium">Contributors</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft">
          <div className="text-3xl font-bold text-stone-900 mb-2">
            {stats.members}
          </div>
          <div className="text-stone-600 font-medium">Members</div>
        </div>
      </div>

      {/* Category Distribution */}
      <ContentHeading>Distribution by Category</ContentHeading>
      <ContentParagraph>
        The eBPF ecosystem spans multiple categories, with companies often
        operating across multiple domains.
      </ContentParagraph>
      <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft mb-12">
        <StatsChart data={stats.categoryDistribution} type="bar" height={300} />
      </div>

      {/* Status Distribution */}
      <ContentHeading>Membership Status Distribution</ContentHeading>
      <ContentParagraph>
        Breakdown of companies by their membership status in the eBPF ecosystem.
      </ContentParagraph>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft">
          <StatsChart
            data={stats.statusDistribution.map((s) => ({
              ...s,
              name: s.status,
            }))}
            type="pie"
            height={300}
            dataKey="count"
            nameKey="name"
            colorMap={{
              'No Status': '#6b7280',
              'eBPF Contributor': '#51a2ff',
              'Platinum Member': '#ffe020',
              Member: '#000000',
            }}
          />
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft">
          <div className="space-y-4">
            {stats.statusDistribution.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        item.status === 'Platinum Member'
                          ? '#ffe020'
                          : item.status === 'eBPF Contributor'
                            ? '#51a2ff'
                            : item.status === 'Member'
                              ? '#000000'
                              : '#6b7280',
                    }}
                  />
                  <span className="text-stone-700 font-medium">
                    {item.status}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-stone-900 font-bold">{item.count}</div>
                  <div className="text-stone-500 text-sm">
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funding Rounds */}
      {/* <ContentHeading>Funding Rounds</ContentHeading>
      {!apiStatus.hasApiKey && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="text-yellow-800 text-sm">
              <strong>Note:</strong> {apiStatus.message}
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-stone-900 mb-4">
            Number of funding rounds per year
          </h3>
          <StatsChart
            data={stats.fundingRoundsByYear}
            type="bar"
            height={300}
            dataKey="count"
            xKey="year"
          />
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-stone-900 mb-4">
            Amount raised in funding rounds per year (billions)
          </h3>
          <StatsChart
            data={stats.fundingAmountByYear}
            type="bar"
            height={300}
            dataKey="amount"
            xKey="year"
          />
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft mb-12">
        <h3 className="text-lg font-semibold text-stone-900 mb-4">
          Number of companies founded per year
        </h3>
        <StatsChart
          data={stats.companiesFoundedByYear}
          type="bar"
          height={320}
          dataKey="count"
          xKey="year"
        />
      </div> */}

      {/* Acquisitions */}
      {/* <ContentHeading>Acquisitions</ContentHeading>
      <ContentParagraph>
        eBPF ecosystem funding activity over time, showing the number of funding
        rounds and amounts raised.
      </ContentParagraph>
      {!apiStatus.hasApiKey && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="text-yellow-800 text-sm">
              <strong>Note:</strong> {apiStatus.message}
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-stone-900 mb-4">
            Number of acquisitions per year
          </h3>
          <StatsChart
            data={stats.acquisitionsByYear}
            type="bar"
            height={300}
            dataKey="count"
            xKey="year"
          />
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-stone-900 mb-4">
            Acquisitions cost per year (excluding undisclosed)
          </h3>
          <StatsChart
            data={stats.acquisitionsAmountByYear}
            type="bar"
            height={300}
            dataKey="amount"
            xKey="year"
          />
        </div>
      </div> */}
    </ContentPage>
  );
}
