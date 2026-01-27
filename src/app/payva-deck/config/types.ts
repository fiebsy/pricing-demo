/**
 * Type definitions for the unified slide configuration system
 */

// ============================================
// Layout Types
// ============================================

/**
 * Standard layout types that cover all slide variations
 */
export type SlideLayout = 
  | 'hero'              // Centered large text (title, closing)
  | 'two-column'        // Title left, content right (bullets, simple stats)
  | 'two-column-stats'  // Title left, stat cards right
  | 'centered-stat'     // Title + single large stat below
  | 'chart'             // Title + chart visualization
  | 'grid'              // Grid of cards (team, logos)
  | 'custom'            // Escape hatch for unique layouts

// ============================================
// Theme Types
// ============================================

/**
 * Semantic themes that define the purpose/tone of a slide
 */
export type SlideTheme = 
  | 'impact'       // High-impact opening/closing (dark backgrounds)
  | 'insight'      // Key insights and revelations
  | 'evidence'     // Supporting data and proof points
  | 'punchline'    // Major metrics and achievements
  | 'professional' // Default professional look

/**
 * Visual variants for slide backgrounds
 */
export type SlideVariant = 'dark' | 'light' | 'bordered'

// ============================================
// Content Types
// ============================================

export interface BulletItem {
  bold?: string
  text: string
  subtext?: string
}

export interface StatItem {
  value: string
  label: string
  subtext?: string
}

export interface ChartDataPoint {
  label: string
  value: number
  displayValue?: string
}

export interface TeamMember {
  name: string
  role: string
  imageSrc?: string
}

export interface LogoItem {
  name: string
  src?: string
  displayText?: string
}

// ============================================
// Layout-Specific Content Types
// ============================================

interface BaseContent {
  title: string
  subtitle?: string
}

interface HeroContent extends BaseContent {
  description?: string
  ctaUrl?: string
}

interface TwoColumnContent extends BaseContent {
  bullets: BulletItem[]
  supporting?: string
}

interface TwoColumnStatsContent extends BaseContent {
  stats: StatItem[]
  supporting?: string
}

interface CenteredStatContent extends BaseContent {
  stat: StatItem
}

interface ChartContent extends BaseContent {
  chartType: 'bar' | 'line' | 'area'
  data: ChartDataPoint[]
  contextText?: string
}

interface GridContent extends BaseContent {
  gridType: 'team' | 'logos' | 'cards'
  columns?: 2 | 3 | 4
  items: TeamMember[] | LogoItem[]
  supporting?: string
}

interface CustomContent extends BaseContent {
  [key: string]: any
}

// ============================================
// Layout Content Mapping
// ============================================

type LayoutContentMap = {
  'hero': HeroContent
  'two-column': TwoColumnContent
  'two-column-stats': TwoColumnStatsContent
  'centered-stat': CenteredStatContent
  'chart': ChartContent
  'grid': GridContent
  'custom': CustomContent
}

// ============================================
// Main Slide Configuration Type
// ============================================

export interface SlideConfig<T extends SlideLayout = SlideLayout> {
  // Core properties
  id: string
  layout: T
  
  // Styling
  theme?: SlideTheme
  variant?: SlideVariant
  
  // Header elements
  label?: string  // Top-left badge label
  
  // Content based on layout
  content: LayoutContentMap[T]
  
  // Metadata
  hidden?: boolean
  notes?: string
}

// ============================================
// Deck Configuration Type
// ============================================

export interface DeckSettings {
  visualRhythm: 'alternating' | 'progressive' | 'consistent'
  defaultTheme: SlideTheme
  animations: boolean
  slideNumbers: boolean
}

export interface DeckConfig {
  settings: DeckSettings
  slides: SlideConfig[]
}

// ============================================
// Style Configuration Types
// ============================================

export interface TypographyStyles {
  heroTitle: string
  sectionTitle: string
  subtitle: string
  body: string
  bodyBold: string
  supporting: string
  statValue: string
  statLabel: string
  cardTitle: string
  cardRole: string
}

export interface SpacingStyles {
  layout: {
    twoColumn: string
    stacked: string
    grid: string
  }
  cards: {
    horizontal: string
    vertical: string
  }
  padding: {
    default: string
    compact: string
    large: string
  }
}

export interface ThemeStyles {
  colors: {
    primary: string
    secondary: string
    tertiary: string
    quaternary: string
  }
  backgrounds: {
    light: string
    dark: string
    bordered: string
  }
}

// ============================================
// Component Props Types
// ============================================

export interface UniversalSlideProps {
  slide: SlideConfig
  slideNumber: number
  totalSlides: number
  isLightMode?: boolean
  className?: string
}

export interface SlideRendererProps {
  layout: SlideLayout
  content: any
  theme?: SlideTheme
  variant?: SlideVariant
  isAnimated?: boolean
}