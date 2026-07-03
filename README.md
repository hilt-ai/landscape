# eBPF Landscape

A comprehensive directory of eBPF based companies. This project provides a modern, searchable interface for discovering eBPF-related technologies and organizations.

## Features

- **Comprehensive Directory**: Browse eBPF companies
- **Advanced Filtering**: Filter by status, membership, category, location, and more
- **Multiple View Modes**: Grid, list, and card views for different browsing preferences
- **Detailed Information**: Modal popups with comprehensive project details
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Statistics Dashboard**: Comprehensive analytics and insights about the eBPF ecosystem
- **Acquisition Tracking**: Visual indicators for acquired companies with detailed acquisition information

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data Structure

The project uses YAML files to define items, following a simplified structure focused on companies rather than products:

### Item Fields

Each item in `data/items/*.yml` can include the following fields:

#### Required Fields

- `slug`: Unique identifier (kebab-case)
- `company`: Full company name
- `category`: Array of categories (Networking, Observability, Profiling, Security, End User, Other)

#### Optional Fields

- `status`: Array of statuses (Platinum Member, eBPF Contributor, Member) - Optional, omit for default state
- `location`: Country or location
- `description`: Company description (up to 500 characters)
- `website`: Main website URL
- `github_repo`: GitHub repository URL
- `linkedin`: LinkedIn company page
- `youtube`: YouTube channel URL
- `blog`: Company blog URL
- `contact`: Contact email address
- `year_founded`: Year the company was founded
- `funding_status`: Current funding status
- `crunchbase`: Crunchbase company page
- `logo`: Logo filename (stored in `public/data/logos/` - optional, defaults to `{slug}.svg`)
- `added`: Date added to landscape (YYYY-MM-DD)
- `acquired`: Optional acquisition information
  - `by`: Acquiring company name
  - `year`: Year of acquisition
  - `url`: Optional link to acquisition announcement
  - `amount`: Optional acquisition amount

### Membership System

The project supports a membership system with three tiers that provide different visual treatments:

1. **Platinum Members**: Premium tier with 2x2 grid size, yellow border, and "Platinum Member" badge
2. **Members**: Standard tier with black border and "Member" badge
3. **eBPF Contributors**: Recognition tier with blue border and "eBPF Contributor" badge

**Note:** Status is self-contained within each company's YAML file. Companies can have multiple statuses (e.g. both Platinum Member and eBPF Contributor), and the system will display the appropriate badges and styling.

**Default State:** If a company has no status field or an empty status array, it will be displayed in its default state without any membership badges or special styling.

### Acquisition System

Companies that have been acquired are visually indicated in the grid with:

- **Large/Featured Tiles**: Yellow roundel with handshake icon in top-right corner
- **Small Tiles**: Small yellow dot in top-right corner
- **Modal Details**: Full acquisition information including acquirer, year, amount, and announcement link

### Filter Options

The application supports comprehensive filtering:

- **Category**: Networking, Observability, Profiling, Security, Other
- **Status**: Platinum Member, eBPF Contributor, Member
- **Location**: Geographic filtering
- **Search**: Text-based search across company names, descriptions, and categories

## Statistics Dashboard

The application includes a comprehensive statistics page (`/stats`) featuring:

- **Overview Metrics**: Total companies, Platinum Members, Contributors, and Members
- **Category Distribution**: Visual breakdown of companies by category
- **Membership Status**: Donut chart showing membership distribution
- **Funding Analytics**: Funding rounds and amounts over time (with Crunchbase integration)
- **Acquisition Analytics**: Acquisition trends and costs over time
- **Company Growth**: Companies founded per year

### Crunchbase Integration

The statistics dashboard can optionally integrate with Crunchbase for real-time funding and acquisition data:

1. Get a Crunchbase API key from [Crunchbase Data](https://data.crunchbase.com/)
2. Add `CRUNCHBASE_API_KEY=api_key_here` to `.env.local`
3. Restart the development server

Without an API key, the dashboard displays realistic mock data for development and demonstration purposes.

## Contributing

See the [Contribute page](https://ebpflandscape.netlify.app/contribute) for detailed information on how to add new items to the landscape.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Icons**: HugeIcons React
- **Data Validation**: Zod
- **Testing**: Vitest
- **Search**: FlexSearch for fast client-side search
- **Data Format**: YAML files for easy editing
- **Charts**: Recharts for interactive data visualizations
- **External APIs**: Crunchbase integration for funding/acquisition data
