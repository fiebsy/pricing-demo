/**
 * Sliding Ratings Panel - Preset Definitions
 *
 * Preset configurations for quick switching between styles.
 *
 * @module playground/sliding-ratings/config
 */

import type { SlidingRatingsConfig, SlidingRatingsPreset } from './types'

// =============================================================================
// DEFAULT CONFIG
// =============================================================================

export const DEFAULT_SLIDING_RATINGS_CONFIG: SlidingRatingsConfig = {
  // Panel Styling
  panel: {
    background: 'secondary',
    showBackground: true,
    border: true,
    borderColor: 'primary',
    borderRadius: 16,
    useSquircle: true,
    padding: 0,
    shine: 'shine-2',
    shineIntensity: '-subtle',
    shadow: 'lg',
    width: 360,
  },

  // Category Row Styling
  categoryRow: {
    showProgressBar: true,
    showNetworkBenchmark: true,
    showImproveButton: true,
    improveButtonPosition: 'inline',
    showIcon: true,
    progressBarSize: 'md',
    hoverEffect: true,
  },

  // Sub-Score Styling
  subScore: {
    showProgressBar: true,
    showNetworkBenchmark: true,
    showImproveButton: true,
    improveButtonPosition: 'inline',
    progressBarSize: 'sm',
    textSize: 'sm',
    hoverEffect: true,
  },

  // Back Button Styling
  backButton: {
    style: 'minimal',
    contentType: 'icon-text',
    position: 'left',
    showSeparator: true,
    useButton: true,
    shineStyle: 'shine-1',
    animateDirection: 'left',
  },

  // Improve Button Styling
  improveButton: {
    contentType: 'icon-text',
    useButton: true,
    shineStyle: 'shine-1',
  },

  // Animation
  animation: {
    panelTransitionMode: 'slide',
    slideDuration: 300,
    slideOffset: 34,
    stripWidth: 295,
    autoSyncSlideSettings: true,
    panelExitScale: 0.7,
    panelEnterScale: 0.7,
    panelScaleOrigin: 'top-left',
    animateHeight: true,
    heightDuration: 300,
    enableItemFade: true,
    opacityDuration: 175,
    enableItemStagger: false,
    itemStagger: 30,
    enableCrossfade: true,
  },

  // Layout
  layout: {
    categoryGap: 0,
    subScoreGap: 0,
    headerPaddingX: 8,
    headerPaddingY: 4,
    rowPaddingX: 12,
    rowPaddingY: 12,
  },

  // Separators
  separators: {
    showCategoryDividers: true,
    showSubScoreDividers: false,
    dividerColor: 'secondary',
    dividerStyle: 'solid',
  },
}

// =============================================================================
// PRESETS
// =============================================================================

export const SLIDING_RATINGS_PRESETS: SlidingRatingsPreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard sliding panel configuration',
    category: 'default',
    data: DEFAULT_SLIDING_RATINGS_CONFIG,
  },
]

// =============================================================================
// HELPERS
// =============================================================================

export function getPresetById(id: string): SlidingRatingsPreset | undefined {
  return SLIDING_RATINGS_PRESETS.find((p) => p.id === id)
}

export function getPresetConfig(id: string): SlidingRatingsConfig {
  const preset = getPresetById(id)
  return preset?.data ?? DEFAULT_SLIDING_RATINGS_CONFIG
}
