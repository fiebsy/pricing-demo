import type { PitchSlide } from '../types'

/**
 * Slide 8: Traction (Punchline Card - impact metrics)
 */
export const tractionSlide: PitchSlide = {
  id: 'traction',
  type: 'stat',
  label: 'Traction',
  variant: 'light',
  title: 'Traction',
  subtitle: 'Growth trajectory',
  statConfig: {
    stats: [
      { value: '3-36', label: 'Team growth in 2 years' },
      { value: '50-500', label: 'Creator growth in 2 years' },
      { value: '$2M-$85M', label: 'in origination in 24 months' },
    ],
    layout: 'stacked',
  },
}
