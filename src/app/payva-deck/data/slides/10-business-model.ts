import type { PitchSlide } from '../types'

/**
 * Slide 10: Business Model (Spec Table)
 */
export const businessModelSlide: PitchSlide = {
  id: 'business-model',
  type: 'bullet',
  label: 'Business model',
  variant: 'light',
  title: 'Business model',
  subtitle: 'Embedded financing economics',
  bulletConfig: {
    bullets: [
      { bold: 'Upfront:', text: 'capital upfront, customer repays' },
      { bold: 'Pay as Collected:', text: 'payouts when customers pay' },
    ],
    supporting: 'Recourse model: Aligns creator accountability with capital protection',
  },
}
