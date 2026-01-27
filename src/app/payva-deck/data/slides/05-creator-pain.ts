import type { PitchSlide } from '../types'

/**
 * Slide 5: Creator Pain (Insight Card)
 */
export const creatorPainSlide: PitchSlide = {
  id: 'creator-pain',
  type: 'bullet',
  label: 'Creator pain',
  variant: 'light',
  title: 'Creator pain',
  subtitle: 'Merchant challenges',
  bulletConfig: {
    bullets: [
      { bold: 'Conversion struggles', text: 'from high upfront costs' },
      { bold: 'Cash flow gaps', text: 'from payment timing' },
      { bold: 'Limited approvals', text: 'waste acquisition spend' },
      { bold: 'Frustration with', text: 'retail BNPL providers' },
    ],
  },
}
