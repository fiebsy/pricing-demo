import type { PitchSlide } from '../types'

/**
 * Slide 14: The Ask (Takeaway Card - direct CTA)
 */
export const theAskSlide: PitchSlide = {
  id: 'the-ask',
  type: 'stat',
  label: 'The ask',
  variant: 'dark',
  title: 'The ask',
  subtitle: 'Series A',
  statConfig: {
    stats: [
      { value: '$XMM', label: 'Raising' },
      { value: 'XX months', label: 'Runway' },
    ],
    layout: 'stacked',
  },
}
