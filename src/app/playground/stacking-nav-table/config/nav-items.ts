/**
 * Stacking Nav + Table Playground - Navigation Items
 *
 * 4-level corporate directory hierarchy:
 * L0: All employees
 * L1: Company (Acme Corp, Globex, Initech)
 * L2: Department (Engineering, Design, Sales, etc.)
 * L3: Team (Frontend, Backend, DevOps, etc.)
 */

import type { StackItem } from '@/components/ui/features/stacking-nav'

// =============================================================================
// NAVIGATION HIERARCHY
// =============================================================================

export const DIRECTORY_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'acme',
    label: 'Acme Corp', // 9 chars
    children: [
      {
        id: 'acme-eng',
        label: 'Engineer', // 8 chars
        children: [
          { id: 'acme-eng-fe', label: 'Frontend' },    // 8 chars
          { id: 'acme-eng-be', label: 'Backend' },     // 7 chars
          { id: 'acme-eng-devops', label: 'DevOps' },  // 6 chars
        ],
      },
      {
        id: 'acme-design',
        label: 'Design', // 6 chars
        children: [
          { id: 'acme-design-product', label: 'Product' },  // 7 chars
          { id: 'acme-design-brand', label: 'Brand' },      // 5 chars
        ],
      },
      {
        id: 'acme-sales',
        label: 'Sales', // 5 chars
        children: [
          { id: 'acme-sales-ent', label: 'Enterprs' },   // 8 chars
          { id: 'acme-sales-smb', label: 'SMB' },        // 3 chars
        ],
      },
      {
        id: 'acme-ops',
        label: 'Operatns', // 8 chars
        children: [
          { id: 'acme-ops-hr', label: 'HR' },            // 2 chars
          { id: 'acme-ops-finance', label: 'Finance' },   // 7 chars
        ],
      },
    ],
  },
  {
    id: 'globex',
    label: 'Globex', // 6 chars
    children: [
      {
        id: 'globex-eng',
        label: 'Engineer', // 8 chars
        children: [
          { id: 'globex-eng-platform', label: 'Platform' },  // 8 chars
          { id: 'globex-eng-mobile', label: 'Mobile' },      // 6 chars
          { id: 'globex-eng-data', label: 'Data' },          // 4 chars
        ],
      },
      {
        id: 'globex-product',
        label: 'Product', // 7 chars
        children: [
          { id: 'globex-product-growth', label: 'Growth' },    // 6 chars
          { id: 'globex-product-core', label: 'Core' },        // 4 chars
        ],
      },
      {
        id: 'globex-mktg',
        label: 'Marketng', // 8 chars
        children: [
          { id: 'globex-mktg-content', label: 'Content' },    // 7 chars
          { id: 'globex-mktg-demand', label: 'Demand' },      // 6 chars
        ],
      },
    ],
  },
  {
    id: 'initech',
    label: 'Initech', // 7 chars
    children: [
      {
        id: 'initech-eng',
        label: 'Engineer', // 8 chars
        children: [
          { id: 'initech-eng-infra', label: 'Infra' },        // 5 chars
          { id: 'initech-eng-security', label: 'Security' },  // 8 chars
          { id: 'initech-eng-qa', label: 'QA' },              // 2 chars
        ],
      },
      {
        id: 'initech-support',
        label: 'Support', // 7 chars
        children: [
          { id: 'initech-support-tier1', label: 'Tier 1' },   // 6 chars
          { id: 'initech-support-tier2', label: 'Tier 2' },   // 6 chars
        ],
      },
      {
        id: 'initech-legal',
        label: 'Legal', // 5 chars
        children: [
          { id: 'initech-legal-contracts', label: 'Contract' }, // 8 chars
          { id: 'initech-legal-compliance', label: 'Complnc' }, // 7 chars
        ],
      },
    ],
  },
]

// =============================================================================
// LABEL LOOKUPS
// =============================================================================

/**
 * Maps nav item IDs to display labels for breadcrumb rendering.
 * Includes full names (not truncated versions used in nav buttons).
 */
export const NAV_LABELS: Record<string, string> = {
  all: 'All Employees',
  // L1 - Companies
  acme: 'Acme Corp',
  globex: 'Globex',
  initech: 'Initech',
  // L2 - Departments
  'acme-eng': 'Engineering',
  'acme-design': 'Design',
  'acme-sales': 'Sales',
  'acme-ops': 'Operations',
  'globex-eng': 'Engineering',
  'globex-product': 'Product',
  'globex-mktg': 'Marketing',
  'initech-eng': 'Engineering',
  'initech-support': 'Support',
  'initech-legal': 'Legal',
  // L3 - Teams
  'acme-eng-fe': 'Frontend',
  'acme-eng-be': 'Backend',
  'acme-eng-devops': 'DevOps',
  'acme-design-product': 'Product Design',
  'acme-design-brand': 'Brand Design',
  'acme-sales-ent': 'Enterprise Sales',
  'acme-sales-smb': 'SMB Sales',
  'acme-ops-hr': 'Human Resources',
  'acme-ops-finance': 'Finance',
  'globex-eng-platform': 'Platform',
  'globex-eng-mobile': 'Mobile',
  'globex-eng-data': 'Data Engineering',
  'globex-product-growth': 'Growth',
  'globex-product-core': 'Core Product',
  'globex-mktg-content': 'Content Marketing',
  'globex-mktg-demand': 'Demand Gen',
  'initech-eng-infra': 'Infrastructure',
  'initech-eng-security': 'Security',
  'initech-eng-qa': 'QA',
  'initech-support-tier1': 'Tier 1 Support',
  'initech-support-tier2': 'Tier 2 Support',
  'initech-legal-contracts': 'Contracts',
  'initech-legal-compliance': 'Compliance',
}
