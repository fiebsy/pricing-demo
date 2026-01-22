/**
 * Ratings Panel Playground - Type Definitions
 *
 * Configuration interfaces for the ratings panel playground.
 * Supports Mind/Voice tabs, category accordions, and styling options.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/ratings-panel
 */

// =============================================================================
// SCORE TYPES (imported from profile)
// =============================================================================

export type SectionType = 'mind' | 'voice' | 'appearance'
export type MindCategory = 'career' | 'growth' | 'skills' | 'business'
export type VoiceCategory = 'tone' | 'style' | 'personality' | 'responses'
export type AppearanceCategory = 'visual' | 'branding' | 'presentation' | 'media'
export type CategoryType = MindCategory | VoiceCategory | AppearanceCategory

export interface ScoreValue {
  current: number
  networkAverage: number
}

export interface SubScoreItem {
  id: string
  label: string
  score: ScoreValue
}

export interface CategoryScoreData {
  categoryId: CategoryType
  label: string
  icon: string
  aggregate: ScoreValue
  subScores: SubScoreItem[]
}

export interface SectionData {
  sectionId: SectionType
  label: string
  icon: string
  aggregate: ScoreValue
  categories: CategoryScoreData[]
}

export interface ProfileScores {
  overall: ScoreValue
  sections: SectionData[]
}

// =============================================================================
// BADGE DISPLAY OPTIONS
// =============================================================================

export type BadgeDisplayMode = 'none' | 'score' | 'status' | 'delta'
// Note: 'auto' is a playground-only option that maps to actual colors based on score
export type BadgeColorOption = 'gray' | 'success' | 'warning' | 'error' | 'brand' | 'info' | 'auto'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'
export type BadgeShape = 'pill' | 'rounded' | 'squircle'

export type BadgeStyle = 'default' | 'modern'

export interface BadgeConfig {
  displayMode: BadgeDisplayMode
  color: BadgeColorOption
  size: BadgeSize
  shape: BadgeShape
  style: BadgeStyle
  showDot: boolean
}

// =============================================================================
// ANIMATED LINE OPTIONS
// =============================================================================

export interface AnimatedLineConfig {
  enabled: boolean
  color: string
  strokeWidth: number
  cornerRadius: number
  lineDuration: number
  staggerDelay: number
}

// =============================================================================
// PLAYGROUND CONFIG
// =============================================================================

export type TabSize = 'sm' | 'md' | 'lg' | 'xl'

export interface RatingsConfig {
  // Panel Styling
  panel: {
    background: string
    showBackground: boolean
    border: boolean
    borderColor: string
    borderRadius: number
    padding: number
    shine: string
    shineIntensity: string
    shadow: string
    maxWidth: number | null
  }

  // Section Tabs (Mind/Voice)
  sectionTabs: {
    style: 'pill' | 'underline'
    showOverallScore: boolean
    progressWheelSize: number
    progressStrokeWidth: number
    activeBackground: string
    showAppearance: boolean
    // Underline style options
    underlineColor: string
    underlineHeight: number
    // Tab sizing
    tabSize: TabSize
    // Labels (allow customization)
    mindLabel: string
    voiceLabel: string
  }

  // Separators
  separators: {
    showSectionDivider: boolean
    showCategoryDividers: boolean
    dividerColor: string
    dividerStyle: 'solid' | 'dashed' | 'dotted'
  }

  // Category Display
  categories: {
    showProgressBar: boolean
    showNetworkBenchmark: boolean
    showImproveButton: boolean
    expandedByDefault: CategoryType | null
    progressBarSize: 'sm' | 'md' | 'lg'
    collapseOthersOnExpand: boolean
  }

  // Sub-Score Display
  subScores: {
    showAnimatedLine: boolean
    animatedLine: AnimatedLineConfig
    badge: BadgeConfig
    staggerDelay: number
    animationDuration: number
  }

  // Data
  data: {
    activeSection: SectionType
    expandedCategory: CategoryType | null
  }
}

// =============================================================================
// PRESET TYPE
// =============================================================================

export interface RatingsPreset {
  id: string
  name: string
  description: string
  category: 'default' | 'minimal' | 'enhanced' | 'brand' | 'custom'
  data: RatingsConfig
}
