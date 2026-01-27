import type { PitchSlide } from '../types'

/**
 * Slide 3: Payva's Solution (Application Card - actionable)
 */
export const solutionSlide: PitchSlide = {
  id: 'solution',
  type: 'bullet',
  label: 'Our solution',
  variant: 'bordered',
  title: "Payva's solution",
  subtitle: 'BNPL built for creators',
  bulletConfig: {
    bullets: [
      { bold: 'Higher approval', text: 'rates' },
      { bold: 'Upfront payouts', text: 'to creators' },
      { bold: 'Industry-specific', text: 'risk mitigation' },
      { bold: 'Seamless platform', text: 'integration' },
    ],
  },
}
