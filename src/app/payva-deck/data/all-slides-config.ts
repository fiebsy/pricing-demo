/**
 * ALL SLIDES IN ONE PLACE - Edit this file to update any slide content
 * This is a consolidated view of all slide data for easy editing
 * while maintaining compatibility with existing components
 */

import type { PitchSlide } from './types'

/**
 * Complete slide deck configuration
 * Edit the content here and it will update across the entire deck
 */
export const ALL_SLIDES_CONFIG: PitchSlide[] = [
  // ============================================
  // SLIDE 1: TITLE
  // ============================================
  {
    id: 'title',
    type: 'title',
    variant: 'dark',
    title: 'Payva',
    subtitle: 'Grow Now. Pay Later.',
    description: 'Modern financing for digital creators',
  },

  // ============================================
  // SLIDE 2: THE PROBLEM
  // ============================================
  {
    id: 'problem',
    type: 'bullet',
    label: 'The problem',
    variant: 'light',
    title: 'The problem',
    subtitle: 'BNPL not built for digital economy',
    bulletConfig: {
      bullets: [
        { bold: 'Outdated lending', text: 'stuck on physical goods' },
        { bold: 'Monetization barriers', text: 'for high-value offers' },
        { bold: 'Payment flexibility', text: 'customers desperately need' },
        { bold: 'Creator-first', text: 'solutions don\'t exist' },
      ],
      supporting: 'The world is buying digital experiences, but creators still don\'t have a scalable way to offer financing.',
    },
  },

  // ============================================
  // SLIDE 3: THE SOLUTION
  // ============================================
  {
    id: 'solution',
    type: 'bullet',
    label: 'The solution',
    variant: 'light',
    title: 'Payva\'s solution',
    subtitle: 'BNPL built for creators',
    bulletConfig: {
      bullets: [
        { bold: 'Purpose-built BNPL', text: 'for digital goods' },
        { bold: 'Instant approval', text: 'with seamless checkout' },
        { bold: 'Upfront payment', text: 'creators paid immediately' },
        { bold: 'End-to-end management', text: 'underwriting through collections' },
      ],
      supporting: 'Payva is rebuilding financing infrastructure for digital goods — empowering creators to sell more and consumers to buy with confidence.',
    },
  },

  // ============================================
  // SLIDE 4: WHY NOW
  // ============================================
  {
    id: 'why-now',
    type: 'stat',
    label: 'Why now',
    variant: 'light',
    title: 'Why now',
    subtitle: 'Creator economy growth',
    statConfig: {
      stats: [
        {
          value: '$250B → $480B',
          label: 'Creator economy growth by 2027',
          subtext: '',
        },
      ],
      layout: 'single',
      supporting: 'Source: Goldman Sachs Research',
    },
  },

  // ============================================
  // SLIDE 5: TRACTION (was SLIDE 6 before removing market opportunity)
  // ============================================
  {
    id: 'traction',
    type: 'stat',
    label: 'Traction',
    variant: 'light',
    title: 'Traction',
    subtitle: 'Growth trajectory',
    statConfig: {
      stats: [
        { value: '3→36', label: 'Team growth in 2 years' },
        { value: '50→500', label: 'Creator growth' },
        { value: '$2M→$85M', label: 'in origination in 24 months' },
      ],
      layout: 'stacked',
    },
  },

  // ============================================
  // SLIDE 6: PORTFOLIO PERFORMANCE (was SLIDE 7 after removing market opportunity)
  // ============================================
  {
    id: 'portfolio',
    type: 'chart',
    label: 'Portfolio',
    variant: 'light',
    title: 'Portfolio performance',
    subtitle: 'Year-over-year growth',
    chartConfig: {
      chartType: 'bar',
      data: [
        { label: '2024', value: 19, displayValue: '19M' },
        { label: '2025', value: 64, displayValue: '64M' },
        { label: '2026', value: 200, displayValue: '200M' },
        { label: '2027', value: 500, displayValue: '500M' },
      ],
      contextText: 'Year-over-year growth',
    },
  },

  // ============================================
  // SLIDE 7: BUSINESS MODEL (was SLIDE 8 after removing market opportunity)
  // ============================================
  {
    id: 'business-model',
    type: 'bullet',
    label: 'Business model',
    variant: 'light',
    title: 'Business model',
    subtitle: 'How it works',
    bulletConfig: {
      bullets: [
        { bold: 'Upfront:', text: 'capital upfront, customer repays' },
        { bold: 'Pay as Collected:', text: 'payouts as customers pay' },
      ],
      supporting: 'Recourse model: Aligns creator accountability with capital protection',
    },
  },

  // ============================================
  // SLIDE 8: DISTRIBUTION PARTNERS (was SLIDE 9 after removing market opportunity)
  // ============================================
  {
    id: 'distribution',
    type: 'logo-grid',
    label: 'Distribution',
    variant: 'light',
    title: 'Distribution',
    subtitle: 'Platform integrations',
    logoConfig: {
      logos: [
        { 
          name: 'FanBasis', 
          src: '/payva-deck/fanbasis-logo.svg',
          displayText: 'FanBasis'  // Fallback text if image doesn't load
        },
        { 
          name: 'CopeCart', 
          src: '/payva-deck/copecart-logo.svg',
          displayText: 'CopeCart'  // Fallback text if image doesn't load
        },
        { 
          name: 'Affiliate Partners', 
          displayText: '50+',
          isTextCard: true  // This will display as text instead of an image
        },
      ],
      columns: 3,
      supporting: 'All partnerships are inbound - zero outbound marketing',
    },
  },

  // ============================================
  // SLIDE 9: TEAM (was SLIDE 10 after removing market opportunity)
  // ============================================
  {
    id: 'team',
    type: 'team',
    label: 'Team',
    variant: 'light',
    title: 'Team',
    subtitle: 'Leadership',
    teamConfig: {
      members: [
        { 
          name: 'Christopher Gravagna', 
          role: 'Co-founder & Co-CEO',
          imageSrc: '/payva-deck/chris-photo-bw.png'
        },
        { 
          name: 'Chase Craft', 
          role: 'Co-founder & Co-CEO',
          imageSrc: '/payva-deck/chase-photo-bw.png'
        },
        { 
          name: 'Jay Phillips', 
          role: 'CTO',
          imageSrc: '/payva-deck/jay-photo-bw.png'
        },
      ],
    },
  },

  // ============================================
  // SLIDE 10: FINANCIAL PROJECTIONS (was SLIDE 11 after removing market opportunity)
  // ============================================
  {
    id: 'financials',
    type: 'chart',
    label: 'Financials',
    variant: 'light',
    title: 'Financial projections',
    subtitle: '3-year revenue outlook',
    chartConfig: {
      chartType: 'bar',
      data: [
        { label: '2024', value: 2, displayValue: '$2M' },
        { label: '2025', value: 5, displayValue: '$5M' },
        { label: '2026', value: 20, displayValue: '$20M' },
      ],
      contextText: 'Revenue projections based on current growth trajectory',
    },
  },

  // ============================================
  // SLIDE 11: CLOSING (was SLIDE 12 after removing market opportunity)
  // ============================================
  {
    id: 'closing',
    type: 'closing',
    variant: 'dark',
    title: 'Payva',
    subtitle: '',
    description: 'Financing built for digital creator-led businesses',
    closingConfig: {
      ctaUrl: 'payva.com',
    },
  },
]

// ============================================
// QUICK EDIT GUIDE
// ============================================

/**
 * HOW TO EDIT SLIDES:
 * 
 * 1. CHANGE TEXT:
 *    - Just edit the strings directly in the objects above
 *    - Example: title: 'New Title Here'
 * 
 * 2. ADD/REMOVE BULLETS:
 *    - Add new objects to the bullets array
 *    - Format: { bold: 'Key term', text: 'explanation' }
 * 
 * 3. UPDATE STATS:
 *    - Change the value and label in statConfig.stats
 *    - Use → for transitions (e.g., '3→36')
 * 
 * 4. MODIFY CHARTS:
 *    - Edit the data array in chartConfig
 *    - Adjust value for bar height, displayValue for label
 * 
 * 5. VISUAL VARIANTS:
 *    - 'light' = white background
 *    - 'dark' = dark background (for impact)
 *    - 'bordered' = white with border
 * 
 * 6. LAYOUT TYPES FOR STATS:
 *    - 'single' = one large centered stat
 *    - 'horizontal' = stats side by side
 *    - 'stacked' = stats stacked vertically
 * 
 * After editing, the changes will automatically apply to:
 * - Screen view (navigation mode)
 * - Print view (/payva-deck/print)
 * - PDF export
 */

// Export for use in data/index.ts
export const STORAGE_KEY = 'payva-deck-slide-index'