/**
 * Ratings Panel Playground - Presets
 *
 * Pre-configured presets for quick testing and iteration.
 *
 * @module playground/ratings-panel/config
 */

import type { RatingsConfig, RatingsPreset } from './types'

// =============================================================================
// DEFAULT CONFIG
// =============================================================================

export const DEFAULT_RATINGS_CONFIG: RatingsConfig = {
  // Panel Styling
  panel: {
    background: 'transparent',
    showBackground: true,
    border: false,
    borderColor: 'primary',
    borderRadius: 16,
    padding: 16,
    shine: 'none',
    shineIntensity: '',
    shadow: 'none',
    maxWidth: null,
  },

  // Section Tabs (Mind/Voice)
  sectionTabs: {
    style: 'underline',
    showOverallScore: false,
    progressWheelSize: 20,
    progressStrokeWidth: 2,
    activeBackground: 'tertiary',
    showAppearance: false,
    underlineColor: 'brand-primary',
    underlineHeight: 3,
    tabSize: 'md',
    mindLabel: 'Mind',
    voiceLabel: 'Voice',
  },

  // Separators
  separators: {
    showSectionDivider: false,
    showCategoryDividers: false,
    dividerColor: 'primary',
    dividerStyle: 'solid',
  },

  // Category Display
  categories: {
    showProgressBar: true,
    showNetworkBenchmark: true,
    showImproveButton: true,
    expandedByDefault: 'career',
    progressBarSize: 'sm',
    collapseOthersOnExpand: false,
  },

  // Sub-Score Display
  subScores: {
    showAnimatedLine: false,
    animatedLine: {
      enabled: false,
      color: '--color-border-primary',
      strokeWidth: 1.5,
      cornerRadius: 8,
      lineDuration: 0.3,
      staggerDelay: 0.05,
      rowHeight: 40,
      firstRowMultiplier: 0.5,
    },
    badge: {
      displayMode: 'none',
      color: 'auto',
      size: 'xs',
      shape: 'pill',
      style: 'default',
      showDot: false,
    },
    staggerDelay: 50,
    animationDuration: 150,
    collapseOthersOnSelect: false,
  },

  // Panel Animation
  animation: {
    slideOffset: 50,
    stripWidth: 200,
    autoSyncSlideStrip: true,
    slideDuration: 300,
    panelExitScale: 0.86,
    panelEnterScale: 0.86,
  },

  // Data
  data: {
    activeSection: 'mind',
    expandedCategory: null,
    selectedSubScore: null,
  },
}

// =============================================================================
// PRESETS
// =============================================================================

export const RATINGS_PRESETS: RatingsPreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Underline tabs, no dividers, clean look',
    category: 'default',
    data: DEFAULT_RATINGS_CONFIG,
  },
  {
    id: 'pill-tabs',
    name: 'Pill Tabs',
    description: 'Pill-style tabs with progress wheels',
    category: 'default',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      sectionTabs: {
        ...DEFAULT_RATINGS_CONFIG.sectionTabs,
        style: 'pill',
        showOverallScore: true,
        progressWheelSize: 24,
        progressStrokeWidth: 2,
        activeBackground: 'brand-primary/10',
      },
    },
  },
  {
    id: 'large-tabs',
    name: 'Large Tabs',
    description: 'Extra large tab buttons',
    category: 'enhanced',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      sectionTabs: {
        ...DEFAULT_RATINGS_CONFIG.sectionTabs,
        tabSize: 'xl',
      },
    },
  },
  {
    id: 'accordion-mode',
    name: 'Accordion Mode',
    description: 'Only one category expanded at a time',
    category: 'enhanced',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      categories: {
        ...DEFAULT_RATINGS_CONFIG.categories,
        collapseOthersOnExpand: true,
      },
    },
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Narrow width with small tabs',
    category: 'minimal',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      panel: {
        ...DEFAULT_RATINGS_CONFIG.panel,
        maxWidth: 320,
        padding: 12,
      },
      sectionTabs: {
        ...DEFAULT_RATINGS_CONFIG.sectionTabs,
        tabSize: 'sm',
      },
    },
  },
  {
    id: 'enhanced-lines',
    name: 'Enhanced + Lines',
    description: 'Animated lines connecting sub-scores',
    category: 'enhanced',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      panel: {
        ...DEFAULT_RATINGS_CONFIG.panel,
        shine: 'shine-1',
        shineIntensity: '-subtle',
        shadow: 'sm',
        borderRadius: 20,
      },
      subScores: {
        ...DEFAULT_RATINGS_CONFIG.subScores,
        showAnimatedLine: true,
        animatedLine: {
          enabled: true,
          color: '--color-border-secondary',
          strokeWidth: 1,
          cornerRadius: 8,
          lineDuration: 0.3,
          staggerDelay: 0.05,
          rowHeight: 40,
          firstRowMultiplier: 0.5,
        },
      },
      categories: {
        ...DEFAULT_RATINGS_CONFIG.categories,
        expandedByDefault: 'career',
      },
      data: {
        ...DEFAULT_RATINGS_CONFIG.data,
        expandedCategory: 'career',
      },
    },
  },
  {
    id: 'with-badges',
    name: 'With Badges',
    description: 'Score badges on sub-items',
    category: 'enhanced',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      subScores: {
        ...DEFAULT_RATINGS_CONFIG.subScores,
        badge: {
          displayMode: 'score',
          color: 'auto',
          size: 'xs',
          shape: 'pill',
          style: 'default',
          showDot: false,
        },
      },
    },
  },
  {
    id: 'modern-badges',
    name: 'Modern Badges',
    description: 'Elevated badge style with shadows',
    category: 'enhanced',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      subScores: {
        ...DEFAULT_RATINGS_CONFIG.subScores,
        badge: {
          displayMode: 'score',
          color: 'auto',
          size: 'sm',
          shape: 'squircle',
          style: 'modern',
          showDot: false,
        },
      },
      data: {
        ...DEFAULT_RATINGS_CONFIG.data,
        expandedCategory: 'career',
      },
    },
  },
  {
    id: 'delta-badges',
    name: 'Delta Badges',
    description: 'Show +/- vs network average',
    category: 'enhanced',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      subScores: {
        ...DEFAULT_RATINGS_CONFIG.subScores,
        badge: {
          displayMode: 'delta',
          color: 'auto',
          size: 'xs',
          shape: 'rounded',
          style: 'default',
          showDot: false,
        },
      },
    },
  },
  {
    id: 'with-dividers',
    name: 'With Dividers',
    description: 'Category dividers enabled',
    category: 'enhanced',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      separators: {
        showSectionDivider: true,
        showCategoryDividers: true,
        dividerColor: 'primary',
        dividerStyle: 'solid',
      },
    },
  },
  {
    id: 'dashed-dividers',
    name: 'Dashed Dividers',
    description: 'Dashed line separators',
    category: 'enhanced',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      separators: {
        showSectionDivider: true,
        showCategoryDividers: true,
        dividerColor: 'secondary',
        dividerStyle: 'dashed',
      },
    },
  },
  {
    id: 'brand-elevated',
    name: 'Brand Elevated',
    description: 'Premium brand styling',
    category: 'brand',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      panel: {
        ...DEFAULT_RATINGS_CONFIG.panel,
        background: 'secondary',
        showBackground: true,
        shine: 'shine-2',
        shineIntensity: '-subtle',
        shadow: 'lg',
        borderRadius: 24,
        border: false,
        padding: 20,
        maxWidth: 480,
      },
      sectionTabs: {
        ...DEFAULT_RATINGS_CONFIG.sectionTabs,
        style: 'pill',
        progressWheelSize: 28,
        progressStrokeWidth: 3,
        tabSize: 'lg',
      },
    },
  },
  {
    id: 'full-featured',
    name: 'Full Featured',
    description: 'All features enabled',
    category: 'enhanced',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      panel: {
        ...DEFAULT_RATINGS_CONFIG.panel,
        background: 'secondary',
        showBackground: true,
        shine: 'shine-1',
        shineIntensity: '-subtle',
        shadow: 'sm',
        borderRadius: 20,
        maxWidth: 400,
      },
      sectionTabs: {
        ...DEFAULT_RATINGS_CONFIG.sectionTabs,
        style: 'underline',
        tabSize: 'lg',
      },
      subScores: {
        ...DEFAULT_RATINGS_CONFIG.subScores,
        showAnimatedLine: true,
        animatedLine: {
          enabled: true,
          color: '--color-border-secondary',
          strokeWidth: 1,
          cornerRadius: 8,
          lineDuration: 0.3,
          staggerDelay: 0.05,
          rowHeight: 40,
          firstRowMultiplier: 0.5,
        },
        badge: {
          displayMode: 'delta',
          color: 'auto',
          size: 'xs',
          shape: 'pill',
          style: 'modern',
          showDot: false,
        },
      },
      categories: {
        ...DEFAULT_RATINGS_CONFIG.categories,
        expandedByDefault: 'career',
        collapseOthersOnExpand: true,
      },
      data: {
        ...DEFAULT_RATINGS_CONFIG.data,
        expandedCategory: 'career',
        selectedSubScore: null,
      },
    },
  },
  {
    id: 'focus-mode',
    name: 'Focus Mode',
    description: 'Click sub-scores to focus on one at a time',
    category: 'enhanced',
    data: {
      ...DEFAULT_RATINGS_CONFIG,
      panel: {
        ...DEFAULT_RATINGS_CONFIG.panel,
        background: 'secondary',
        showBackground: true,
        shine: 'shine-1',
        shineIntensity: '-subtle',
        shadow: 'sm',
        borderRadius: 20,
      },
      subScores: {
        ...DEFAULT_RATINGS_CONFIG.subScores,
        showAnimatedLine: true,
        animatedLine: {
          enabled: true,
          color: '--color-border-secondary',
          strokeWidth: 1,
          cornerRadius: 8,
          lineDuration: 0.3,
          staggerDelay: 0.05,
          rowHeight: 40,
          firstRowMultiplier: 0.5,
        },
        collapseOthersOnSelect: true,
      },
      categories: {
        ...DEFAULT_RATINGS_CONFIG.categories,
        expandedByDefault: 'career',
        collapseOthersOnExpand: true,
      },
      data: {
        ...DEFAULT_RATINGS_CONFIG.data,
        expandedCategory: 'career',
        selectedSubScore: null,
      },
    },
  },
]

// =============================================================================
// PRESET OPTIONS (for select dropdown)
// =============================================================================

export const PRESET_OPTIONS = RATINGS_PRESETS.map((preset) => ({
  label: preset.name,
  value: preset.id,
  description: preset.description,
}))

// =============================================================================
// HELPERS
// =============================================================================

export function getPreset(presetId: string): RatingsPreset | undefined {
  return RATINGS_PRESETS.find((p) => p.id === presetId)
}

export function getPresetConfig(presetId: string): RatingsConfig {
  const preset = getPreset(presetId)
  return preset?.data ?? DEFAULT_RATINGS_CONFIG
}

export function getPresetsByCategory(category: RatingsPreset['category']): RatingsPreset[] {
  return RATINGS_PRESETS.filter((p) => p.category === category)
}
