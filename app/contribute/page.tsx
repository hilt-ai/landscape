import {
  ContentPage,
  ContentHeading,
  ContentParagraph,
  ContentList,
  ContentCodeBlock,
  ContentAlert,
  ContentButton,
} from '@/components/ContentPage';

export const dynamic = 'force-dynamic';

export default function ContributePage() {
  return (
    <ContentPage title="Contribute to eBPF Landscape">
      <ContentParagraph className="text-lg">
        The eBPF Landscape is a community-driven project that relies on
        contributions from people like you. There are many ways to contribute,
        from adding new projects to improving existing entries.
      </ContentParagraph>

      <ContentHeading>How to Contribute</ContentHeading>

      <ContentHeading level={3}>1. Adding New Projects</ContentHeading>
      <ContentParagraph>
        To add a new eBPF project to the landscape:
      </ContentParagraph>
      <ContentList
        type="ordered"
        items={[
          'Fork the repository',
          'Create a new YAML file in the data/items/ directory',
          'Follow the schema defined in lib/types.ts',
          'Submit a pull request with your changes',
        ]}
      />

      <ContentHeading level={3}>2. Updating Existing Entries</ContentHeading>
      <ContentParagraph>
        Help keep the landscape current by updating existing project
        information:
      </ContentParagraph>
      <ContentList
        items={[
          'Update project descriptions',
          'Add new tags or categories',
          'Update URLs and links',
          'Add new features or capabilities',
        ]}
      />

      <ContentHeading level={3}>3. Improving the Website</ContentHeading>
      <ContentParagraph>
        Help improve the user experience and functionality:
      </ContentParagraph>
      <ContentList
        items={[
          'Fix bugs or issues',
          'Add new features',
          'Improve accessibility',
          'Enhance mobile experience',
          'Optimize performance',
        ]}
      />

      <ContentHeading>Project Structure</ContentHeading>
      <ContentParagraph>
        The project is built with modern web technologies:
      </ContentParagraph>
      <ContentList
        items={[
          'Next.js 15: React framework with App Router',
          'TypeScript: Type-safe development',
          'TailwindCSS: Utility-first CSS framework',
          'Zod: Schema validation for data integrity',
          'Vitest: Unit and integration testing',
        ]}
      />

      <ContentHeading>Data Format</ContentHeading>
      <ContentParagraph>
        Each company entry is defined in a YAML file with a simplified structure
        focused on companies rather than products. Here&apos;s a comprehensive
        example with all available fields:
      </ContentParagraph>
      <ContentCodeBlock>
        {`slug: company-name
company: Company Name
category: [Networking, Observability]
status: [Platinum Member, eBPF Contributor]
description: Detailed description of the company (up to 500 characters)
website: https://example.com
github_repo: https://github.com/company/project
linkedin: https://linkedin.com/company/project
youtube: https://youtube.com/c/project
blog: https://blog.example.com
contact: info@example.com
location: United States
year_founded: 2020
funding_status: Series A
crunchbase: https://crunchbase.com/organization/project`}
      </ContentCodeBlock>

      <ContentHeading level={3}>Required Fields</ContentHeading>
      <ContentList
        items={[
          'slug: Unique identifier (kebab-case)',
          'company: Full company name',
          'category: Array of categories (Networking, Observability, Profiling, Security, Other)',
          'status: Array of statuses (Platinum Member, eBPF Contributor, Member) - Optional, omit for default state',
        ]}
      />

      <ContentHeading level={3}>Optional Fields</ContentHeading>
      <ContentList
        items={[
          'location: Country or location',
          'description: Company description (up to 500 characters)',
          'website: Main website URL',
          'github_repo: GitHub repository URL',
          'linkedin: LinkedIn company page',
          'youtube: YouTube channel URL',
          'blog: Company blog URL',
          'contact: Contact email address',
          'year_founded: Year the company was founded',
          'funding_status: Current funding status',
          'crunchbase: Crunchbase company page',
          'logo: Logo filename (stored in public/data/logos/ - optional, defaults to {slug}.svg)',
        ]}
      />
      <ContentParagraph>
        All optional fields are recommended for a complete entry. The more
        information you provide, the better users can discover and understand
        the company.
      </ContentParagraph>

      <ContentHeading>Adding Logos</ContentHeading>
      <ContentParagraph>
        Company logos should be added to the <code>public/data/logos/</code>{' '}
        directory:
      </ContentParagraph>
      <ContentList
        items={[
          'Use SVG format for best quality and scalability',
          'Name the file using the company slug (e.g. company-name.svg)',
          'If no logo field is specified in the YAML, the system will look for {slug}.svg',
          'Keep file sizes reasonable (under 50KB recommended)',
          'Ensure logos are high quality and recognizable at small sizes',
        ]}
      />
      <ContentParagraph>
        <strong>Example:</strong> For a company with slug
        &ldquo;example-corp&rdquo;, the logo should be named{' '}
        <code>example-corp.svg</code> and placed in{' '}
        <code>public/data/logos/</code>.
      </ContentParagraph>

      <ContentHeading>Status System</ContentHeading>
      <ContentParagraph>
        The eBPF Landscape supports a status system with three tiers that
        provide different visual treatments:
      </ContentParagraph>
      <ContentList
        items={[
          'Platinum Member: Premium tier with 2x2 grid size, yellow border, and "Platinum Member" badge',
          'Member: Standard tier with black border and "Member" badge',
          'eBPF Contributor: Recognition tier with blue border and "eBPF Contributor" badge',
        ]}
      />
      <ContentParagraph>
        <strong>Note:</strong> Status is self-contained within each
        company&apos;s YAML file. Companies can have multiple statuses (e.g.
        both Platinum Member and eBPF Contributor), and the system will display
        the appropriate badges and styling.
      </ContentParagraph>
      <ContentParagraph>
        <strong>Default State:</strong> If a company has no status field or an
        empty status array, it will be displayed in its default state without
        any membership badges or special styling.
      </ContentParagraph>

      <ContentHeading>Development Setup</ContentHeading>
      <ContentParagraph>
        To set up the development environment:
      </ContentParagraph>
      <ContentList
        type="ordered"
        items={[
          'Clone the repository: git clone https://github.com/isovalent/mktg-ebpf-landscape',
          'Install dependencies: npm install',
          'Run the development server: npm run dev',
          'Run tests: npm test',
        ]}
      />

      <ContentHeading>Guidelines</ContentHeading>
      <ContentList
        items={[
          'Follow the existing code style and conventions',
          'Write tests for new functionality',
          'Ensure all tests pass before submitting',
          'Write clear commit messages',
          'Update documentation as needed',
        ]}
      />

      <ContentHeading>Getting Help</ContentHeading>
      <ContentParagraph>If you need help or have questions:</ContentParagraph>
      <ContentList
        items={[
          'Open an issue on GitHub',
          'Join the eBPF Slack community',
          'Check the existing documentation',
          'Review previous pull requests for examples',
        ]}
      />

      <ContentAlert type="warning" title="Ready to Contribute?">
        <ContentParagraph>
          Start by forking the repository and creating your first pull request.
          Every contribution, no matter how small, helps make the eBPF ecosystem
          more discoverable and accessible.
        </ContentParagraph>
        <ContentButton href="https://github.com/isovalent/mktg-ebpf-landscape">
          Fork on GitHub
        </ContentButton>
      </ContentAlert>
    </ContentPage>
  );
}
