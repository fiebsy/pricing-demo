/**
 * Centralized slide configuration for the Payva pitch deck.
 * All slide content in one place for easy editing and consistency.
 */

import type { SlideConfig, SlideLayout, SlideTheme } from './types'

/**
 * Helper function to create a slide with type safety and validation
 */
function createSlide<T extends SlideLayout>(config: SlideConfig<T>): SlideConfig<T> {
  return config
}

/**
 * Visual rhythm patterns - automatically applied based on position
 */
const VISUAL_RHYTHM = {
  alternating: ['light', 'dark', 'light', 'dark'] as const,
  progressive: ['dark', 'light', 'light', 'bordered', 'light'] as const,
  consistent: ['light', 'light', 'light', 'light'] as const,
}

/**
 * Complete pitch deck configuration
 * Edit slide content here - layout and styling handled automatically
 */
export const DECK_CONFIG = {
  // Global deck settings
  settings: {
    visualRhythm: 'progressive' as keyof typeof VISUAL_RHYTHM,
    defaultTheme: 'professional' as SlideTheme,
    animations: true,
    slideNumbers: true,
  },

  // All slides in presentation order
  slides: [
    // 1. Title Slide
    createSlide({
      id: 'title',
      layout: 'hero',
      theme: 'impact',
      variant: 'dark', // Can be overridden by visual rhythm
      content: {
        title: 'Payva',
        subtitle: 'Grow Now. Pay Later.',
        description: 'Modern financing for digital creators',
      },
    }),

    // 2. Problem Slide
    createSlide({
      id: 'problem',
      layout: 'two-column',
      theme: 'insight',
      label: 'The problem',
      content: {
        title: 'The problem',
        subtitle: 'Not built for digital economy',
        bullets: [
          { bold: 'Conversion struggles', text: 'from upfront costs' },
          { bold: 'Cash flow gaps', text: 'from payment timing' },
          { bold: 'Customers face', text: 'rigid payment plans' },
          { bold: 'Limited approvals', text: 'waste acquisition spend' },
        ],
        supporting: 'Traditional financing wasn\'t built for digital goods',
      },
    }),

    // 3. Solution Slide
    createSlide({
      id: 'solution',
      layout: 'two-column',
      theme: 'insight',
      label: 'The solution',
      content: {
        title: 'The solution',
        subtitle: 'Seamless modern financing',
        bullets: [
          { bold: 'Instant approvals', text: 'maximizing conversion' },
          { bold: 'Flexible repayment', text: 'customers love' },
          { bold: 'Immediate payouts', text: 'for creators' },
          { bold: 'Risk protection', text: 'Payva takes the loss' },
        ],
        supporting: 'Financing built for the digital economy',
      },
    }),

    // 4. Why Now Slide
    createSlide({
      id: 'why-now',
      layout: 'two-column',
      theme: 'evidence',
      label: 'Why now',
      content: {
        title: 'Why now?',
        subtitle: 'Market timing',
        bullets: [
          { 
            bold: 'Flexible repayment is normalized', 
            text: 'Klarna & Affirm paved the way'
          },
          { 
            bold: 'High-value purchases are returning', 
            text: 'Interest rates stabilizing'
          },
          { 
            bold: 'BNPL revenue is projected to double', 
            text: 'Growing from $250B to $480B by 2027'
          },
          { 
            bold: 'Creator economy at inflection point', 
            text: 'Consumers adapted to digital goods'
          },
        ],
      },
    }),

    // 5. Market Opportunity Slide
    createSlide({
      id: 'market-opportunity',
      layout: 'centered-stat',
      theme: 'punchline',
      label: 'Market opportunity',
      content: {
        title: 'Market opportunity',
        subtitle: 'Origination projections',
        stat: {
          value: '$10M–$15M',
          label: 'Monthly origination target',
        },
      },
    }),

    // 6. Traction Slide
    createSlide({
      id: 'traction',
      layout: 'two-column-stats',
      theme: 'punchline',
      label: 'Traction',
      content: {
        title: 'Traction',
        subtitle: 'Growth trajectory',
        stats: [
          { value: '3→36', label: 'Team growth in 2 years' },
          { value: '$2M→$85M', label: 'in origination in 24 months' },
          { value: '$250B→$480B', label: 'BNPL revenue by 2027', subtext: 'Source: Juniper Research' },
        ],
      },
    }),

    // 7. Portfolio Performance Slide
    createSlide({
      id: 'portfolio',
      layout: 'chart',
      theme: 'evidence',
      label: 'Portfolio',
      content: {
        title: 'Portfolio performance',
        subtitle: 'Year-over-year growth',
        chartType: 'bar',
        data: [
          { label: '2024', value: 19, displayValue: '19M' },
          { label: '2025', value: 64, displayValue: '64M' },
          { label: '2026', value: 200, displayValue: '200M' },
        ],
        contextText: 'Year-over-year growth',
      },
    }),

    // 8. Business Model Slide
    createSlide({
      id: 'business-model',
      layout: 'two-column-stats',
      theme: 'insight',
      label: 'Business model',
      content: {
        title: 'Business model',
        subtitle: 'Revenue streams',
        stats: [
          { 
            value: '2-5%', 
            label: 'Platform success fee',
            subtext: 'Per transaction'
          },
          { 
            value: '10-20%', 
            label: 'Customer APR',
            subtext: 'Risk-based pricing'
          },
        ],
      },
    }),

    // 9. Distribution Slide
    createSlide({
      id: 'distribution',
      layout: 'grid',
      theme: 'evidence',
      label: 'Distribution',
      content: {
        title: 'Distribution partners',
        subtitle: 'Platform integrations',
        gridType: 'logos',
        columns: 3,
        items: [
          { name: 'Stan', displayText: 'STAN' },
          { name: 'Discord', displayText: 'DISCORD' },
          { name: 'Telegram', displayText: 'TELEGRAM' },
          { name: 'Twitch', displayText: 'TWITCH' },
          { name: 'Patreon', displayText: 'PATREON' },
          { name: 'OnlyFans', displayText: 'ONLYFANS' },
        ],
        supporting: 'Integration ready across creator platforms',
      },
    }),

    // 10. Team Slide
    createSlide({
      id: 'team',
      layout: 'grid',
      theme: 'insight',
      label: 'Team',
      content: {
        title: 'Team',
        subtitle: 'Leadership',
        gridType: 'team',
        columns: 3,
        items: [
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
    }),

    // 11. Financials Slide
    createSlide({
      id: 'financials',
      layout: 'chart',
      theme: 'evidence',
      label: 'Financials',
      content: {
        title: 'Financial projections',
        subtitle: '3-year outlook',
        chartType: 'bar',
        data: [
          { label: '2024', value: 2, displayValue: '$2M' },
          { label: '2025', value: 25, displayValue: '$25M' },
          { label: '2026', value: 85, displayValue: '$85M' },
        ],
        contextText: 'Revenue projections based on current growth trajectory',
      },
    }),

    // 12. Closing Slide
    createSlide({
      id: 'closing',
      layout: 'hero',
      theme: 'impact',
      variant: 'dark',
      content: {
        title: 'Let\'s build the future',
        subtitle: 'of creator financing together',
        ctaUrl: 'payva.com',
      },
    }),
  ],
}

/**
 * Get visual variant for a slide based on its position and rhythm pattern
 */
export function getSlideVariant(index: number, pattern: keyof typeof VISUAL_RHYTHM = 'progressive') {
  const rhythm = VISUAL_RHYTHM[pattern]
  return rhythm[index % rhythm.length]
}

/**
 * Validate deck configuration
 */
export function validateDeckConfig() {
  const errors: string[] = []
  const { slides } = DECK_CONFIG

  // Check for duplicate IDs
  const ids = new Set<string>()
  slides.forEach((slide, index) => {
    if (ids.has(slide.id)) {
      errors.push(`Duplicate slide ID: ${slide.id} at index ${index}`)
    }
    ids.add(slide.id)
  })

  // Validate required fields based on layout
  slides.forEach((slide, index) => {
    if (!slide.content.title) {
      errors.push(`Slide ${index + 1} (${slide.id}) is missing a title`)
    }

    // Layout-specific validation
    switch (slide.layout) {
      case 'two-column':
        if (!('bullets' in slide.content) || !slide.content.bullets?.length) {
          errors.push(`Slide ${index + 1} (${slide.id}) with two-column layout needs bullets`)
        }
        break
      case 'chart':
        if (!('data' in slide.content) || !slide.content.data?.length) {
          errors.push(`Slide ${index + 1} (${slide.id}) with chart layout needs data`)
        }
        break
      case 'grid':
        if (!('items' in slide.content) || !slide.content.items?.length) {
          errors.push(`Slide ${index + 1} (${slide.id}) with grid layout needs items`)
        }
        break
    }
  })

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Export individual slides for backward compatibility
 */
export const SLIDES = DECK_CONFIG.slides

// Storage key for persisting slide position
export const STORAGE_KEY = 'payva-deck-slide-index'