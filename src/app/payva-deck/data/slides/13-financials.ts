import type { PitchSlide } from '../types'

/**
 * Slide 13: Financial Highlights (Chart slide)
 */
export const financialsSlide: PitchSlide = {
  id: 'financials',
  type: 'chart',
  label: 'Financials',
  variant: 'light',
  title: 'Financial highlights',
  subtitle: 'Revenue & net income',
  chartConfig: {
    chartType: 'bar',
    data: [
      { label: '2024', value: 1.9, displayValue: '$1.9M' },
      { label: '2025', value: 5, displayValue: '$5M' },
      { label: '2026', value: 30, displayValue: '$30M' },
      { label: '2027', value: 75, displayValue: '$75M' },
    ],
    contextText: 'Projected revenue growth through 2027',
  },
}
