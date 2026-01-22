/**
 * Sliding Ratings Panel - Type Definitions
 *
 * Configuration interfaces for the sliding ratings panel playground.
 * Combines filter-menu-motion sliding behavior with ratings categories.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/sliding-ratings
 */

// =============================================================================
// SCORE TYPES (reused from ratings-panel)
// =============================================================================

export type CategoryId = 'career' | 'growth' | 'skills' | 'business'

export interface ScoreValue {
  current: number
  networkAverage: number
}

export interface SubScoreItem {
  id: string
  label: string
  score: ScoreValue
}

export interface CategoryData {
  id: CategoryId
  label: string
  icon: string
  aggregate: ScoreValue
  subScores: SubScoreItem[]
}

// =============================================================================
// ANIMATION CONFIG (adapted from filter-menu-motion)
// =============================================================================

export type PanelTransitionMode = 'slide' | 'popLayout'

export type ScaleOrigin =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'

export interface AnimationConfig {
  // Panel transitions
  panelTransitionMode: PanelTransitionMode
  slideDuration: number
  slideOffset: number
  stripWidth: number
  panelExitScale: number
  panelEnterScale: number
  panelScaleOrigin: ScaleOrigin

  // Height animation
  animateHeight: boolean
  heightDuration: number

  // Item animations
  enableItemFade: boolean
  opacityDuration: number
  enableItemStagger: boolean
  itemStagger: number
  enableCrossfade: boolean
}

// =============================================================================
// PLAYGROUND CONFIG
// =============================================================================

export interface SlidingRatingsConfig {
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
    width: number
  }

  // Category Row Styling
  categoryRow: {
    showProgressBar: boolean
    showNetworkBenchmark: boolean
    showImproveButton: boolean
    showIcon: boolean
    progressBarSize: 'sm' | 'md' | 'lg'
    hoverEffect: boolean
  }

  // Sub-Score Styling
  subScore: {
    showProgressBar: boolean
    showNetworkBenchmark: boolean
    progressBarSize: 'sm' | 'md' | 'lg'
    textSize: 'xs' | 'sm' | 'md'
  }

  // Back Button Styling
  backButton: {
    style: 'minimal' | 'pill' | 'ghost'
    showIcon: boolean
    position: 'left' | 'center'
  }

  // Animation
  animation: AnimationConfig

  // Layout
  layout: {
    categoryGap: number
    subScoreGap: number
    headerPadding: number
  }

  // Separators
  separators: {
    showCategoryDividers: boolean
    showSubScoreDividers: boolean
    dividerColor: string
    dividerStyle: 'solid' | 'dashed' | 'dotted'
  }
}

// =============================================================================
// PRESET TYPE
// =============================================================================

export interface SlidingRatingsPreset {
  id: string
  name: string
  description: string
  category: 'default' | 'minimal' | 'enhanced' | 'brand' | 'custom'
  data: SlidingRatingsConfig
}
