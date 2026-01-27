import type { PitchSlide } from '../types'

/**
 * Slide 11: Distribution (Logo grid)
 */
export const distributionSlide: PitchSlide = {
  id: 'distribution',
  type: 'logo-grid',
  label: 'Distribution',
  variant: 'light',
  title: 'Distribution',
  subtitle: 'Platform integrations',
  logoConfig: {
    logos: [
      { 
        name: 'FanBasis',
        src: '/payva-deck/fanbasis-logo.svg'
      },
      { 
        name: 'CopeCart',
        src: '/payva-deck/copecart-logo.svg'
      },
      {
        name: 'Affiliate Partners',
        displayText: '50+',
        isTextCard: true
      },
    ],
    columns: 3,
    supporting: 'All partnerships are inbound - zero outbound marketing',
  },
}
