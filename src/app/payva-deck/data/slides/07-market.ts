import type { PitchSlide } from '../types'

/**
 * Slide 7: Market Opportunity (Insight Card with stat)
 */
export const marketSlide: PitchSlide = {
  id: 'market-opportunity',
  type: 'stat',
  label: 'Market opportunity',
  variant: 'light',
  title: 'Market opportunity',
  subtitle: 'Origination projections',
  statConfig: {
    stats: [
      {
        value: '$10M–$15M',
        label: 'Monthly origination target',
      },
    ],
    layout: 'single',
  },
}
