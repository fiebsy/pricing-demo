import type { PitchSlide } from '../types'

/**
 * Slide 2: The Problem (Insight Card)
 */
export const problemSlide: PitchSlide = {
  id: 'problem',
  type: 'bullet',
  label: 'The problem',
  variant: 'light',
  title: 'The problem',
  subtitle: 'Not built for digital economy',
  bulletConfig: {
    bullets: [
      { bold: 'Conversion struggles', text: 'from upfront costs' },
      { bold: 'Cash flow gaps', text: 'from payment timing' },
      { bold: 'Customers face', text: 'rigid payment plans' },
      { bold: 'Limited approvals', text: 'waste acquisition spend' },
    ],
    supporting: 'Traditional financing wasn\'t built for digital goods',
  },
}
