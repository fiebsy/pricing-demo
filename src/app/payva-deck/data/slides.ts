/**
 * Pitch deck slide data
 *
 * All 15 investor deck slides with type-safe configurations.
 */

export type SlideType =
  | 'title'
  | 'bullet'
  | 'stat'
  | 'chart'
  | 'team'
  | 'logo-grid'
  | 'closing'

export interface BulletItem {
  text: string
  subtext?: string
  bold?: string
}

export interface StatItem {
  value: string
  label: string
  subtext?: string
}

export interface ChartDataPoint {
  label: string
  value: number
  displayValue?: string
}

export interface TeamMember {
  name: string
  role: string
  imageSrc?: string
}

export interface LogoItem {
  name: string
  src?: string
}

export interface PitchSlide {
  id: string
  type: SlideType
  title: string
  subtitle?: string
  description?: string
  bulletConfig?: {
    bullets: BulletItem[]
    supporting?: string
  }
  statConfig?: {
    stats: StatItem[]
    layout: 'horizontal' | 'stacked' | 'single'
  }
  chartConfig?: {
    chartType: 'bar'
    data: ChartDataPoint[]
  }
  teamConfig?: {
    members: TeamMember[]
  }
  logoConfig?: {
    logos: LogoItem[]
    columns?: number
    note?: string
  }
}

export const SLIDES: PitchSlide[] = [
  // Slide 1: Title
  {
    id: 'title',
    type: 'title',
    title: 'Payva',
    subtitle: 'Grow Now. Pay Later.',
    description:
      'The BNPL built for creators, coaches, and digital content platforms',
  },

  // Slide 2: The Problem
  {
    id: 'problem',
    type: 'bullet',
    title: 'The Problem',
    subtitle: "Traditional financing wasn't built for the digital economy",
    bulletConfig: {
      bullets: [
        {
          text: 'Creators struggle with cash flow, declined payments, and chasing invoices',
        },
        { text: 'Customers face rejections and rigid payment plans' },
        {
          text: 'Platforms lose revenue due to checkout friction and low approvals',
        },
      ],
    },
  },

  // Slide 3: Payva's Solution
  {
    id: 'solution',
    type: 'bullet',
    title: "Payva's Solution",
    subtitle: 'BNPL Built for Creators',
    bulletConfig: {
      bullets: [
        { text: 'Higher approval rates' },
        { text: 'Upfront payouts to creators' },
        { text: 'Industry-specific risk mitigation' },
        { text: 'Seamless platform integration' },
      ],
    },
  },

  // Slide 4: Platform Pain
  {
    id: 'platform-pain',
    type: 'bullet',
    title: 'Platform Pain',
    subtitle: 'Why Digital Creator Platforms Use Payva',
    bulletConfig: {
      bullets: [
        { text: 'Limited financing solutions available' },
        { text: 'Low approval rates from traditional BNPL' },
        { text: 'Lost revenue potential from cart abandonment' },
      ],
      supporting:
        'What they want: higher conversions, seamless integration, industry-specific partner',
    },
  },

  // Slide 5: Creator Pain
  {
    id: 'creator-pain',
    type: 'bullet',
    title: 'Creator Pain',
    subtitle: 'Merchant Challenges',
    bulletConfig: {
      bullets: [
        { text: 'Conversion struggles from high upfront costs' },
        { text: 'Cash flow gaps from payment timing' },
        { text: 'Limited approvals waste acquisition spend' },
        { text: 'Frustration with retail BNPL providers' },
      ],
    },
  },

  // Slide 6: Why Now
  {
    id: 'why-now',
    type: 'stat',
    title: 'Why Now',
    subtitle: 'Creator Economy Growth',
    statConfig: {
      stats: [
        {
          value: '$250B → $480B',
          label: 'by 2027',
          subtext: 'Goldman Sachs',
        },
      ],
      layout: 'single',
    },
    description:
      'Life coaching market expansion. Digital education growth. Major BNPL providers exiting this space.',
  },

  // Slide 7: Market Opportunity
  {
    id: 'market-opportunity',
    type: 'stat',
    title: 'Market Opportunity',
    subtitle: 'Origination Projections',
    statConfig: {
      stats: [
        {
          value: '$10M–$15M',
          label: 'Monthly origination target',
        },
      ],
      layout: 'single',
    },
  },

  // Slide 8: Traction
  {
    id: 'traction',
    type: 'stat',
    title: 'Traction',
    subtitle: 'Growth Trajectory',
    statConfig: {
      stats: [
        { value: '2×', label: 'Monthly origination growth' },
        { value: '3 → 23', label: 'Team growth in 2 years' },
        { value: '$6M → $12M', label: 'in 7-10 months' },
      ],
      layout: 'horizontal',
    },
  },

  // Slide 9: Portfolio Performance
  {
    id: 'portfolio',
    type: 'chart',
    title: 'Portfolio Performance',
    subtitle: 'Year-over-Year Growth',
    chartConfig: {
      chartType: 'bar',
      data: [
        { label: '2024', value: 33, displayValue: '$XMM' },
        { label: '2025', value: 100, displayValue: '3× growth' },
        { label: '2026', value: 200, displayValue: '2× projected' },
      ],
    },
  },

  // Slide 10: Business Model
  {
    id: 'business-model',
    type: 'bullet',
    title: 'Business Model',
    subtitle: 'Embedded Financing Economics',
    bulletConfig: {
      bullets: [
        {
          bold: 'Funding',
          text: 'Advances capital upfront, repaid by customer payments',
        },
        {
          bold: 'Servicing',
          text: 'Pays out creators over time as customers pay',
        },
        { text: 'Recourse-backed invoice factoring protects capital' },
      ],
    },
  },

  // Slide 11: Distribution
  {
    id: 'distribution',
    type: 'logo-grid',
    title: 'Distribution',
    subtitle: 'Platform Integrations',
    logoConfig: {
      logos: [
        { name: 'FanBasis' },
        { name: 'CopeCart' },
        { name: 'Winible' },
      ],
      columns: 3,
      note: 'Payva embeds financing directly into checkout',
    },
  },

  // Slide 12: Team
  {
    id: 'team',
    type: 'team',
    title: 'Team',
    subtitle: 'Leadership',
    teamConfig: {
      members: [
        { name: 'Christopher Gravagna', role: 'Co-founder & Co-CEO' },
        { name: 'Chase Craft', role: 'Co-founder & Co-CEO' },
        { name: 'Jay Phillips', role: 'CTO' },
        { name: 'Kimmie Calkins', role: 'Chief Accounting Officer' },
        { name: 'Rosanna Sevillano', role: 'VP of Risk Management' },
      ],
    },
  },

  // Slide 13: Financial Highlights
  {
    id: 'financials',
    type: 'chart',
    title: 'Financial Highlights',
    subtitle: 'Revenue & Net Income',
    chartConfig: {
      chartType: 'bar',
      data: [
        { label: '2024', value: 40, displayValue: '$XMM' },
        { label: '2025', value: 70, displayValue: '$XMM' },
        { label: '2026', value: 100, displayValue: '$XMM' },
      ],
    },
  },

  // Slide 14: The Ask
  {
    id: 'the-ask',
    type: 'stat',
    title: 'The Ask',
    subtitle: 'Series A',
    statConfig: {
      stats: [
        { value: '$XMM', label: 'Raising' },
        { value: 'XX months', label: 'Runway' },
      ],
      layout: 'horizontal',
    },
  },

  // Slide 15: Closing
  {
    id: 'closing',
    type: 'closing',
    title: 'Payva',
    description:
      'Payva unlocks growth for creators, customers, and platforms — with embedded financing purpose-built for the digital creator economy.',
  },
]

export const STORAGE_KEY = 'payva-deck-slide-index'
