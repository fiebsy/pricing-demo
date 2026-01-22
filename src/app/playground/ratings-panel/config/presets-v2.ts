/**
 * Ratings Panel V2 Presets
 *
 * Advanced configuration schema for future implementation.
 * Includes animation transitions, layout controls, and back button config.
 *
 * @status planned
 * @module playground/ratings-panel/config
 */

// =============================================================================
// V2 CONFIG SCHEMA (Target)
// =============================================================================

export interface RatingsConfigV2 {
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

  categoryRow: {
    showProgressBar: boolean
    showNetworkBenchmark: boolean
    showImproveButton: boolean
    improveButtonPosition: 'inline' | 'below'
    showIcon: boolean
    progressBarSize: 'sm' | 'md' | 'lg'
    hoverEffect: boolean
  }

  subScore: {
    showProgressBar: boolean
    showNetworkBenchmark: boolean
    showImproveButton: boolean
    improveButtonPosition: 'inline' | 'below'
    progressBarSize: 'sm' | 'md' | 'lg'
    textSize: 'xs' | 'sm' | 'md'
    hoverEffect: boolean
  }

  backButton: {
    style: 'minimal' | 'standard' | 'prominent'
    showIcon: boolean
    position: 'left' | 'center'
    showSeparator: boolean
  }

  animation: {
    panelTransitionMode: 'slide' | 'fade' | 'scale' | 'none'
    slideDuration: number
    slideOffset: number
    stripWidth: number
    panelExitScale: number
    panelEnterScale: number
    panelScaleOrigin: 'top-left' | 'top-center' | 'top-right' | 'center'
    animateHeight: boolean
    heightDuration: number
    enableItemFade: boolean
    opacityDuration: number
    enableItemStagger: boolean
    itemStagger: number
    enableCrossfade: boolean
  }

  layout: {
    categoryGap: number
    subScoreGap: number
    headerPadding: number
    rowPaddingX: number
    rowPaddingY: number
    headerPaddingX: number
    headerPaddingY: number
  }

  separators: {
    showCategoryDividers: boolean
    showSubScoreDividers: boolean
    dividerColor: string
    dividerStyle: 'solid' | 'dashed' | 'dotted'
  }
}

// =============================================================================
// STORED PRESETS
// =============================================================================

export const V2_PRESETS: Record<string, RatingsConfigV2> = {
  /**
   * User's primary preset - slide transitions with shine panel
   */
  'user-primary': {
    panel: {
      background: 'secondary',
      showBackground: true,
      border: true,
      borderColor: 'primary',
      borderRadius: 16,
      padding: 0,
      shine: 'shine-2',
      shineIntensity: '-subtle',
      shadow: 'lg',
      width: 360,
    },
    categoryRow: {
      showProgressBar: true,
      showNetworkBenchmark: true,
      showImproveButton: false,
      improveButtonPosition: 'below',
      showIcon: true,
      progressBarSize: 'md',
      hoverEffect: true,
    },
    subScore: {
      showProgressBar: true,
      showNetworkBenchmark: true,
      showImproveButton: false,
      improveButtonPosition: 'inline',
      progressBarSize: 'sm',
      textSize: 'sm',
      hoverEffect: true,
    },
    backButton: {
      style: 'minimal',
      showIcon: true,
      position: 'left',
      showSeparator: true,
    },
    animation: {
      panelTransitionMode: 'slide',
      slideDuration: 300,
      slideOffset: 50,
      stripWidth: 200,
      panelExitScale: 0.86,
      panelEnterScale: 0.86,
      panelScaleOrigin: 'top-left',
      animateHeight: true,
      heightDuration: 200,
      enableItemFade: true,
      opacityDuration: 250,
      enableItemStagger: false,
      itemStagger: 30,
      enableCrossfade: true,
    },
    layout: {
      categoryGap: 0,
      subScoreGap: 0,
      headerPadding: 12,
      rowPaddingX: 14,
      rowPaddingY: 12,
      headerPaddingX: 14,
      headerPaddingY: 4,
    },
    separators: {
      showCategoryDividers: true,
      showSubScoreDividers: false,
      dividerColor: 'secondary',
      dividerStyle: 'solid',
    },
  },
}

// =============================================================================
// DEFAULT V2 CONFIG
// =============================================================================

export const DEFAULT_V2_CONFIG = V2_PRESETS['user-primary']
