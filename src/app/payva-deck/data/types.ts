/**
 * Type definitions for pitch deck slides
 */

export type SlideType =
  | 'title'
  | 'bullet'
  | 'stat'
  | 'chart'
  | 'team'
  | 'logo-grid'
  | 'closing'

/**
 * Slide variant for visual rhythm in dark mode.
 * In light mode, all variants render as white backgrounds.
 * In dark mode, variants provide alternating visual rhythm.
 */
export type SlideVariant = 'dark' | 'light' | 'bordered'

export interface BulletItem {
  text: string
  subtext?: string
  bold?: string
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

export interface ClosingConfig {
  /** CTA URL displayed at bottom of closing slide */
  ctaUrl?: string
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
  isTextCard?: boolean
}

export interface PitchSlide {
  id: string
  type: SlideType
  title: string
  subtitle?: string
  description?: string
  /** Header label for slide anatomy (e.g., "THE PROBLEM") */
  label?: string
  /** Visual variant for dark mode rhythm (dark/light/bordered) */
  variant?: SlideVariant
  bulletConfig?: {
    bullets: BulletItem[]
    supporting?: string
  }
  statConfig?: {
    stats: StatItem[]
    layout: 'horizontal' | 'stacked' | 'single'
    supporting?: string
  }
  chartConfig?: {
    chartType: 'bar'
    data: ChartDataPoint[]
    /** Context text displayed below chart */
    contextText?: string
  }
  teamConfig?: {
    members: TeamMember[]
  }
  logoConfig?: {
    logos: LogoItem[]
    columns?: number
    supporting?: string
  }
  closingConfig?: ClosingConfig
}
