import { SITE_CONFIG } from '@/lib/constants';

export const dynamic = 'force-static';

export function GET() {
  const schema = {
    openapi: '3.1.0',
    info: {
      title: `${SITE_CONFIG.name} API`,
      version: '3.0.0',
      description:
        'REST API for the eBPF Landscape — a community-maintained directory of companies and projects in the eBPF ecosystem.',
      contact: {
        url: SITE_CONFIG.github,
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0',
      },
    },
    servers: [{ url: SITE_CONFIG.url, description: 'Production' }],
    paths: {
      '/api/items': {
        get: {
          operationId: 'listItems',
          summary: 'List all landscape entries',
          description:
            'Returns the full list of eBPF ecosystem companies and projects, the ordered category list, and metadata.',
          responses: {
            '200': {
              description: 'Success',
              headers: {
                'Cache-Control': {
                  schema: { type: 'string' },
                  description:
                    'public, s-maxage=3600, stale-while-revalidate=86400',
                },
              },
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ItemsResponse' },
                },
              },
            },
            '429': {
              description:
                'Rate limit exceeded (100 requests per 15 minutes per IP)',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            '500': {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
        head: {
          operationId: 'checkItems',
          summary: 'Check API availability',
          responses: {
            '200': { description: 'API is available' },
          },
        },
      },
    },
    components: {
      schemas: {
        Category: {
          type: 'string',
          enum: [
            'Networking',
            'Observability',
            'Profiling',
            'Security',
            'End User',
            'Other',
          ],
        },
        Status: {
          type: 'string',
          enum: ['Platinum Member', 'eBPF Contributor', 'Member'],
        },
        Acquisition: {
          type: 'object',
          required: ['by', 'year'],
          properties: {
            by: {
              type: 'string',
              description: 'Name of the acquiring company',
            },
            year: { type: 'integer', description: 'Year of acquisition' },
            url: {
              type: 'string',
              format: 'uri',
              nullable: true,
              description: 'Link to announcement',
            },
            amount: {
              type: 'string',
              nullable: true,
              description: 'Acquisition amount (e.g. "$1.2B")',
            },
          },
        },
        Item: {
          type: 'object',
          required: ['slug', 'company', 'category'],
          properties: {
            slug: {
              type: 'string',
              description: 'Unique kebab-case identifier',
            },
            company: {
              type: 'string',
              description: 'Full company or project name',
            },
            category: {
              type: 'array',
              items: { $ref: '#/components/schemas/Category' },
              description: 'One or more categories',
            },
            status: {
              type: 'array',
              items: { $ref: '#/components/schemas/Status' },
              description: 'Membership / contributor tiers',
            },
            description: { type: 'string', nullable: true, maxLength: 500 },
            location: { type: 'string', nullable: true },
            website: { type: 'string', format: 'uri', nullable: true },
            github_repo: { type: 'string', format: 'uri', nullable: true },
            linkedin: { type: 'string', format: 'uri', nullable: true },
            youtube: { type: 'string', format: 'uri', nullable: true },
            blog: { type: 'string', format: 'uri', nullable: true },
            crunchbase: { type: 'string', format: 'uri', nullable: true },
            contact: { type: 'string', format: 'email', nullable: true },
            year_founded: { type: 'integer', nullable: true },
            funding_status: { type: 'string', nullable: true },
            logo: {
              type: 'string',
              description: 'Logo filename in /public/data/logos/',
            },
            added: {
              type: 'string',
              format: 'date',
              description: 'Date added to landscape',
            },
            acquired: { $ref: '#/components/schemas/Acquisition' },
          },
        },
        ItemsResponse: {
          type: 'object',
          required: ['items', 'categories', 'meta'],
          properties: {
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/Item' },
            },
            categories: {
              type: 'array',
              items: { type: 'string' },
              description: 'Ordered list of category names',
            },
            meta: {
              type: 'object',
              required: ['totalItems', 'lastUpdated', 'version'],
              properties: {
                totalItems: { type: 'integer' },
                lastUpdated: { type: 'string', format: 'date-time' },
                version: { type: 'string' },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          required: ['error'],
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
  };

  return Response.json(schema, {
    headers: {
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
