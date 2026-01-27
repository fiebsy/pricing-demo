import type { PitchSlide } from '../types'

/**
 * Slide 6: Why Now (Insight Card with stat)
 */
export const whyNowSlide: PitchSlide = {
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
        label: 'by 2027',
        subtext: 'Goldman Sachs',
      },
    ],
    layout: 'single',
  },
}
