/**
 * Delphi walkthrough slide data
 *
 * Update slide content here without touching other files.
 */

export interface GridSection {
  heading: string
  items: Array<{
    text: string
    highlight?: string
  }>
}

export interface DualImageConfig {
  legacy: {
    src: string
    alt: string
    label?: string
  }
  new: {
    src: string
    alt: string
    label?: string
    href?: string
  }
}

export interface Slide {
  id: string
  title: string
  subtitle: string
  description: string
  /** Slide type determines which variant component renders */
  type: 'text' | 'image' | 'text-grid' | 'dual-image' | 'button'
  /** Image source for 'image' type slides */
  imageSrc?: string
  /** Link URL for 'button' type slides */
  buttonHref?: string
  /** Button text for 'button' type slides */
  buttonText?: string
  /** Configuration for dual-image slides */
  dualImage?: DualImageConfig
  /** Sections for text-grid slides */
  gridSections?: GridSection[]
  /** Secondary description with reduced opacity */
  descriptionSecondary?: string
}

export const SLIDES: Slide[] = [
  {
    id: 'slide-1',
    title: 'Design Challenge',
    subtitle: '',
    description: '',
    type: 'text-grid',
    gridSections: [
      {
        heading: 'Challenge',
        items: [
          { text: 'Improve Preview/Edit/Train/Steer' },
          { text: 'Speed up "share-readiness"' },
        ],
      },
    ],
  },
  {
    id: 'slide-1b',
    title: 'Bottleneck',
    subtitle: '',
    description: '',
    type: 'text-grid',
    gridSections: [
      {
        heading: 'Bottleneck',
        items: [
          { text: 'Adding context' },
          { text: 'Getting a benchmark' },
        ],
      },
    ],
  },
  {
    id: 'slide-1c',
    title: 'Solution A',
    subtitle: 'Solution A',
    description: '',
    type: 'text-grid',
    gridSections: [
      {
        heading: 'Constraints',
        items: [
          { text: 'Avoid complexity' },
          { text: 'Limit to available data' },
        ],
      },
      {
        heading: 'Process',
        items: [
          { text: 'Improve questions list' },
          { text: 'Inject into layout' },
        ],
      },
    ],
  },
  {
    id: 'slide-4',
    title: 'Rejected Response',
    subtitle: '',
    description: 'Delphi flags uncertainty.',
    descriptionSecondary: 'This tells me backend can tag confidence and identify knowledge gaps.',
    type: 'image',
    imageSrc: '/deck/chat-rejected-response.png',
  },
  {
    id: 'slide-5',
    title: 'Blueprint',
    subtitle: 'Solution A',
    description: '',
    type: 'text-grid',
    gridSections: [
      {
        heading: 'Blueprint',
        items: [
          { text: 'Compress add/preview/improve/validate flow' },
          { text: 'Speed up improvement before churn' },
        ],
      },
    ],
  },
  {
    id: 'slide-5c',
    title: 'Questions List Component',
    subtitle: '',
    description: '',
    type: 'button',
    buttonHref: 'http://localhost:3002/a',
    buttonText: 'Solution A',
  },
  {
    id: 'slide-5d',
    title: 'Eval',
    subtitle: 'Solution A',
    description: '',
    type: 'text-grid',
    gridSections: [
      {
        heading: 'Eval',
        items: [
          { text: 'More "improve" clicks' },
          { text: 'Fewer low-confidence flags' },
          { text: 'Usage + better answers = success' },
        ],
      },
    ],
  },
  {
    id: 'slide-6a',
    title: 'Solution B',
    subtitle: 'Solution B',
    description: '',
    type: 'text-grid',
    gridSections: [
      {
        heading: 'Task',
        items: [
          { text: 'Preview profile' },
          { text: 'Answer questions' },
          { text: 'Improve it' },
        ],
      },
      {
        heading: 'Process',
        items: [
          { text: 'Keep users "in the game"' },
          { text: 'Make the tedious part fun' },
        ],
      },
    ],
  },
  {
    id: 'slide-6b',
    title: 'Inspiration',
    subtitle: '',
    description: 'Data you upload boosts different skill attributes. Like leveling up a character.',
    type: 'image',
    imageSrc: '/deck/video-game-character.png',
  },
  {
    id: 'slide-6c',
    title: 'Profile Preview',
    subtitle: '',
    description: '',
    type: 'button',
    buttonHref: 'http://localhost:3002/b',
    buttonText: 'Solution B',
  },
]

export const STORAGE_KEY = 'delphi-slide-index'
