import type { PitchSlide } from '../types'

/**
 * Slide 9: Portfolio Performance (Chart slide)
 */
export const portfolioSlide: PitchSlide = {
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
      { label: '2026', value: 150, displayValue: '150M' },
      { label: '2027', value: 400, displayValue: '400M' },
    ],
    contextText: 'Year-over-year growth',
  },
}
