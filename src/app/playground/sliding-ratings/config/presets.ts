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
    padding: 16,
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
    showIcon: true,
    progressBarSize: 'md',
    hoverEffect: true,
  },

  // Sub-Score Styling
  subScore: {
    showProgressBar: true,
    showNetworkBenchmark: true,
    progressBarSize: 'sm',
    textSize: 'sm',
  },

  // Back Button Styling
  backButton: {
    style: 'minimal',
    showIcon: true,
    position: 'left',
  },

  // Animation
  animation: {
    panelTransitionMode: 'slide',
    slideDuration: 300,
    slideOffset: 50,
    stripWidth: 200,
    panelExitScale: 0.86,
    panelEnterScale: 0.86,
    panelScaleOrigin: 'top-left',
    animateHeight: true,
    heightDuration: 300,
    enableItemFade: true,
    opacityDuration: 225,
    enableItemStagger: false,
    itemStagger: 30,
    enableCrossfade: true,
  },

  // Layout
  layout: {
    categoryGap: 0,
    subScoreGap: 0,
    headerPadding: 12,
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
    description: 'Standard sliding panel with subtle shine',
    category: 'default',
    data: DEFAULT_SLIDING_RATINGS_CONFIG,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, no effects',
    category: 'minimal',
    data: {
      ...DEFAULT_SLIDING_RATINGS_CONFIG,
      panel: {
        background: 'primary',
        showBackground: true,
        border: true,
        borderColor: 'secondary',
        borderRadius: 12,
        padding: 12,
        shine: 'none',
        shineIntensity: '',
        shadow: 'none',
        width: 340,
      },
      categoryRow: {
        ...DEFAULT_SLIDING_RATINGS_CONFIG.categoryRow,
        showImproveButton: false,
        hoverEffect: false,
      },
      animation: {
        ...DEFAULT_SLIDING_RATINGS_CONFIG.animation,
        slideDuration: 200,
        panelExitScale: 1,
        panelEnterScale: 1,
        enableItemFade: false,
        enableCrossfade: false,
      },
    },
  },
  {
    id: 'elevated',
    name: 'Elevated',
    description: 'Premium look with depth and shadow',
    category: 'enhanced',
    data: {
      ...DEFAULT_SLIDING_RATINGS_CONFIG,
      panel: {
        background: 'secondary',
        showBackground: true,
        border: false,
        borderColor: 'primary',
        borderRadius: 24,
        padding: 20,
        shine: 'shine-2',
        shineIntensity: '',
        shadow: 'lg',
        width: 380,
      },
      animation: {
        ...DEFAULT_SLIDING_RATINGS_CONFIG.animation,
        slideDuration: 350,
        panelExitScale: 0.9,
        panelEnterScale: 0.9,
        enableItemStagger: true,
        itemStagger: 40,
      },
    },
  },
  {
    id: 'pop-layout',
    name: 'Pop Layout',
    description: 'Uses popLayout mode for transitions',
    category: 'enhanced',
    data: {
      ...DEFAULT_SLIDING_RATINGS_CONFIG,
      animation: {
        ...DEFAULT_SLIDING_RATINGS_CONFIG.animation,
        panelTransitionMode: 'popLayout',
        slideDuration: 250,
        panelExitScale: 0.95,
        panelEnterScale: 0.95,
        panelScaleOrigin: 'center',
      },
    },
  },
  {
    id: 'fast',
    name: 'Fast',
    description: 'Quick, snappy transitions',
    category: 'custom',
    data: {
      ...DEFAULT_SLIDING_RATINGS_CONFIG,
      animation: {
        ...DEFAULT_SLIDING_RATINGS_CONFIG.animation,
        slideDuration: 150,
        heightDuration: 150,
        opacityDuration: 100,
        panelExitScale: 0.95,
        panelEnterScale: 0.95,
      },
    },
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
