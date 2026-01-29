import type { PitchSlide } from '../types'

/**
 * Slide 12: Team (Insight Card)
 */
export const teamSlide: PitchSlide = {
  id: 'team',
  type: 'team',
  label: 'Team',
  variant: 'light',
  title: 'Team',
  subtitle: 'Leadership',
  teamConfig: {
    members: [
      { 
        name: 'Christopher Gravagna', 
        role: 'Co-founder & Co-CEO',
        imageSrc: '/payva-deck/chris-photo-bw.png'
      },
      { 
        name: 'Chase Craft', 
        role: 'Co-founder & Co-CEO',
        imageSrc: '/payva-deck/chase-photo-bw.png'
      },
      { 
        name: 'Jay Phillips', 
        role: 'CTO',
        imageSrc: '/payva-deck/jay-photo-bw.png'
      },
      { 
        name: 'Neil Fleischman', 
        role: 'Chief of Staff',
        imageSrc: '/payva-deck/neil-photo.png'
      },
      { 
        name: 'Gerard Adams', 
        role: 'Advisor',
        imageSrc: '/payva-deck/gerard-photo.png'
      },
    ],
  },
}
