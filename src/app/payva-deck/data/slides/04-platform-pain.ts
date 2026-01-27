import type { PitchSlide } from '../types'

/**
 * Slide 4: Platform Pain (Insight Card)
 */
export const platformPainSlide: PitchSlide = {
  id: 'platform-pain',
  type: 'bullet',
  label: 'Platform pain',
  variant: 'light',
  title: 'Platform pain',
  subtitle: 'Why digital creator platforms use Payva',
  bulletConfig: {
    bullets: [
      { bold: 'Limited financing', text: 'solutions available' },
      { bold: 'Low approval rates', text: 'from traditional BNPL' },
      { bold: 'Lost revenue', text: 'potential from cart abandonment' },
    ],
    supporting: 'They want: conversions, integration, partnership',
  },
}
