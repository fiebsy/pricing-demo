/**
 * Ratings Panel Playground - Panel Configuration
 *
 * Builds UnifiedControlPanel configuration from current state.
 *
 * @module playground/ratings-panel/panels
 */

import type { Section, PanelConfig, Preset } from '@/components/ui/prod/base/control-panel'
import type { RatingsConfig, RatingsPreset } from '../config/types'
import {
  BACKGROUND_OPTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  SHADOW_OPTIONS,
  BORDER_COLOR_OPTIONS,
  BADGE_DISPLAY_MODE_OPTIONS,
  BADGE_COLOR_OPTIONS,
  BADGE_SIZE_OPTIONS,
  BADGE_SHAPE_OPTIONS,
  BADGE_STYLE_OPTIONS,
  PROGRESS_BAR_SIZE_OPTIONS,
  LINE_COLOR_OPTIONS,
  SECTION_OPTIONS,
  ACTIVE_TAB_BG_OPTIONS,
  TAB_STYLE_OPTIONS,
  UNDERLINE_COLOR_OPTIONS,
  DIVIDER_COLOR_OPTIONS,
  DIVIDER_STYLE_OPTIONS,
  TAB_SIZE_OPTIONS,
  MAX_WIDTH_OPTIONS,
} from '../config/options'

// =============================================================================
// PANEL SECTION
// =============================================================================

function buildPanelSection(config: RatingsConfig): Section {
  return {
    id: 'panel',
    label: 'Panel',
    title: 'Panel Styling',
    groups: [
      {
        title: 'Background',
        controls: [
          {
            id: 'panel.showBackground',
            type: 'toggle',
            label: 'Show Background',
            value: config.panel.showBackground,
          },
          {
            id: 'panel.background',
            type: 'select',
            label: 'Color',
            value: config.panel.background,
            options: [...BACKGROUND_OPTIONS],
          },
        ],
      },
      {
        title: 'Effects',
        controls: [
          {
            id: 'panel.shine',
            type: 'select',
            label: 'Shine',
            value: config.panel.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'panel.shineIntensity',
            type: 'select',
            label: 'Intensity',
            value: config.panel.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
          },
          {
            id: 'panel.shadow',
            type: 'select',
            label: 'Shadow',
            value: config.panel.shadow,
            options: [...SHADOW_OPTIONS],
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'panel.border',
            type: 'toggle',
            label: 'Show Border',
            value: config.panel.border,
          },
          {
            id: 'panel.borderColor',
            type: 'select',
            label: 'Border Color',
            value: config.panel.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Dimensions',
        controls: [
          {
            id: 'panel.maxWidth',
            type: 'select',
            label: 'Max Width',
            value: String(config.panel.maxWidth ?? 0),
            options: MAX_WIDTH_OPTIONS.map((o) => ({ ...o, value: String(o.value) })),
          },
          {
            id: 'panel.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.panel.borderRadius,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'panel.padding',
            type: 'slider',
            label: 'Padding',
            value: config.panel.padding,
            min: 8,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// SECTION TABS SECTION
// =============================================================================

function buildSectionTabsSection(config: RatingsConfig): Section {
  return {
    id: 'sectionTabs',
    label: 'Tabs',
    title: 'Section Tabs (Mind/Voice)',
    groups: [
      {
        title: 'Tab Style',
        controls: [
          {
            id: 'sectionTabs.style',
            type: 'select',
            label: 'Style',
            value: config.sectionTabs.style,
            options: [...TAB_STYLE_OPTIONS],
          },
          {
            id: 'sectionTabs.tabSize',
            type: 'select',
            label: 'Tab Size',
            value: config.sectionTabs.tabSize,
            options: [...TAB_SIZE_OPTIONS],
          },
          {
            id: 'sectionTabs.activeBackground',
            type: 'select',
            label: 'Active Background',
            value: config.sectionTabs.activeBackground,
            options: [...ACTIVE_TAB_BG_OPTIONS],
          },
        ],
      },
      {
        title: 'Tab Labels',
        controls: [
          {
            id: 'sectionTabs.mindLabel',
            type: 'text',
            label: 'Mind Label',
            value: config.sectionTabs.mindLabel,
          },
          {
            id: 'sectionTabs.voiceLabel',
            type: 'text',
            label: 'Voice Label',
            value: config.sectionTabs.voiceLabel,
          },
        ],
      },
      {
        title: 'Underline Options',
        controls: [
          {
            id: 'sectionTabs.underlineColor',
            type: 'select',
            label: 'Underline Color',
            value: config.sectionTabs.underlineColor,
            options: [...UNDERLINE_COLOR_OPTIONS],
          },
          {
            id: 'sectionTabs.underlineHeight',
            type: 'slider',
            label: 'Underline Height',
            value: config.sectionTabs.underlineHeight,
            min: 1,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Display',
        controls: [
          {
            id: 'sectionTabs.showOverallScore',
            type: 'toggle',
            label: 'Show Overall Score Badge',
            value: config.sectionTabs.showOverallScore,
          },
          {
            id: 'sectionTabs.showAppearance',
            type: 'toggle',
            label: 'Show Appearance Tab',
            value: config.sectionTabs.showAppearance,
          },
        ],
      },
      {
        title: 'Progress Wheel',
        controls: [
          {
            id: 'sectionTabs.progressWheelSize',
            type: 'slider',
            label: 'Size',
            value: config.sectionTabs.progressWheelSize,
            min: 16,
            max: 40,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'sectionTabs.progressStrokeWidth',
            type: 'slider',
            label: 'Stroke Width',
            value: config.sectionTabs.progressStrokeWidth,
            min: 1,
            max: 5,
            step: 0.01,
            formatLabel: (v: number) => `${v.toFixed(2)}px`,
          },
        ],
      },
      {
        title: 'Active Section',
        controls: [
          {
            id: 'data.activeSection',
            type: 'select',
            label: 'Active Tab',
            value: config.data.activeSection,
            options: [...SECTION_OPTIONS],
          },
        ],
      },
    ],
  }
}

// =============================================================================
// SEPARATORS SECTION
// =============================================================================

function buildSeparatorsSection(config: RatingsConfig): Section {
  return {
    id: 'separators',
    label: 'Dividers',
    title: 'Line Separators',
    groups: [
      {
        title: 'Visibility',
        controls: [
          {
            id: 'separators.showSectionDivider',
            type: 'toggle',
            label: 'Section Divider (below tabs)',
            value: config.separators.showSectionDivider,
          },
          {
            id: 'separators.showCategoryDividers',
            type: 'toggle',
            label: 'Category Dividers',
            value: config.separators.showCategoryDividers,
          },
        ],
      },
      {
        title: 'Styling',
        controls: [
          {
            id: 'separators.dividerColor',
            type: 'select',
            label: 'Color',
            value: config.separators.dividerColor,
            options: [...DIVIDER_COLOR_OPTIONS],
          },
          {
            id: 'separators.dividerStyle',
            type: 'select',
            label: 'Style',
            value: config.separators.dividerStyle,
            options: [...DIVIDER_STYLE_OPTIONS],
          },
        ],
      },
    ],
  }
}

// =============================================================================
// CATEGORIES SECTION
// =============================================================================

function buildCategoriesSection(config: RatingsConfig): Section {
  return {
    id: 'categories',
    label: 'Categories',
    title: 'Category Display',
    groups: [
      {
        title: 'Progress Bar',
        controls: [
          {
            id: 'categories.showProgressBar',
            type: 'toggle',
            label: 'Show Progress Bar',
            value: config.categories.showProgressBar,
          },
          {
            id: 'categories.progressBarSize',
            type: 'select',
            label: 'Size',
            value: config.categories.progressBarSize,
            options: [...PROGRESS_BAR_SIZE_OPTIONS],
          },
          {
            id: 'categories.showNetworkBenchmark',
            type: 'toggle',
            label: 'Show Network Benchmark',
            value: config.categories.showNetworkBenchmark,
          },
        ],
      },
      {
        title: 'Actions',
        controls: [
          {
            id: 'categories.showImproveButton',
            type: 'toggle',
            label: 'Show Improve Button',
            value: config.categories.showImproveButton,
          },
        ],
      },
      {
        title: 'Accordion Behavior',
        controls: [
          {
            id: 'categories.collapseOthersOnExpand',
            type: 'toggle',
            label: 'Collapse Others on Expand',
            value: config.categories.collapseOthersOnExpand,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// SUB-SCORES SECTION
// =============================================================================

function buildSubScoresSection(config: RatingsConfig): Section {
  return {
    id: 'subScores',
    label: 'Sub-Scores',
    title: 'Sub-Score Display',
    groups: [
      {
        title: 'Behavior',
        controls: [
          {
            id: 'subScores.collapseOthersOnSelect',
            type: 'toggle',
            label: 'Collapse Others on Select',
            value: config.subScores.collapseOthersOnSelect,
          },
        ],
      },
      {
        title: 'Animated Line',
        controls: [
          {
            id: 'subScores.showAnimatedLine',
            type: 'toggle',
            label: 'Enable Animated Lines',
            value: config.subScores.showAnimatedLine,
          },
          {
            id: 'subScores.animatedLine.color',
            type: 'select',
            label: 'Line Color',
            value: config.subScores.animatedLine.color,
            options: [...LINE_COLOR_OPTIONS],
          },
          {
            id: 'subScores.animatedLine.strokeWidth',
            type: 'slider',
            label: 'Stroke Width',
            value: config.subScores.animatedLine.strokeWidth,
            min: 0.5,
            max: 3,
            step: 0.01,
            formatLabel: (v: number) => `${v.toFixed(2)}px`,
          },
          {
            id: 'subScores.animatedLine.cornerRadius',
            type: 'slider',
            label: 'Corner Radius',
            value: config.subScores.animatedLine.cornerRadius,
            min: 4,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'subScores.animatedLine.rowHeight',
            type: 'slider',
            label: 'Row Height',
            value: config.subScores.animatedLine.rowHeight,
            min: 24,
            max: 56,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'subScores.animatedLine.firstRowMultiplier',
            type: 'slider',
            label: 'First Row Multiplier',
            value: config.subScores.animatedLine.firstRowMultiplier,
            min: 0.2,
            max: 1,
            step: 0.05,
            formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
          },
        ],
      },
      {
        title: 'Animation Timing',
        controls: [
          {
            id: 'subScores.animatedLine.lineDuration',
            type: 'slider',
            label: 'Line Duration',
            value: config.subScores.animatedLine.lineDuration,
            min: 0.1,
            max: 1,
            step: 0.05,
            formatLabel: (v: number) => `${v}s`,
          },
          {
            id: 'subScores.animatedLine.staggerDelay',
            type: 'slider',
            label: 'Stagger Delay',
            value: config.subScores.animatedLine.staggerDelay,
            min: 0,
            max: 0.2,
            step: 0.001,
            formatLabel: (v: number) => `${v.toFixed(3)}s`,
          },
          {
            id: 'subScores.staggerDelay',
            type: 'slider',
            label: 'Item Stagger (CSS)',
            value: config.subScores.staggerDelay,
            min: 0,
            max: 150,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Badge Display',
        controls: [
          {
            id: 'subScores.badge.displayMode',
            type: 'select',
            label: 'Display Mode',
            value: config.subScores.badge.displayMode,
            options: [...BADGE_DISPLAY_MODE_OPTIONS],
          },
          {
            id: 'subScores.badge.style',
            type: 'select',
            label: 'Style',
            value: config.subScores.badge.style,
            options: [...BADGE_STYLE_OPTIONS],
          },
          {
            id: 'subScores.badge.color',
            type: 'select',
            label: 'Color',
            value: config.subScores.badge.color,
            options: [...BADGE_COLOR_OPTIONS],
          },
          {
            id: 'subScores.badge.size',
            type: 'select',
            label: 'Size',
            value: config.subScores.badge.size,
            options: [...BADGE_SIZE_OPTIONS],
          },
          {
            id: 'subScores.badge.shape',
            type: 'select',
            label: 'Shape',
            value: config.subScores.badge.shape,
            options: [...BADGE_SHAPE_OPTIONS],
          },
          {
            id: 'subScores.badge.showDot',
            type: 'toggle',
            label: 'Show Dot',
            value: config.subScores.badge.showDot,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// ANIMATION SECTION
// =============================================================================

function buildAnimationSection(config: RatingsConfig): Section {
  return {
    id: 'animation',
    label: 'Animation',
    title: 'Panel Animation',
    groups: [
      {
        title: 'Slide & Strip (Auto-Sync)',
        controls: [
          {
            id: 'animation.autoSyncSlideStrip',
            type: 'toggle',
            label: 'Auto-Sync Slide ↔ Strip',
            value: config.animation.autoSyncSlideStrip,
          },
          {
            id: 'animation.slideOffset',
            type: 'slider',
            label: 'Slide Offset',
            value: config.animation.slideOffset,
            min: 0,
            max: 200,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'animation.stripWidth',
            type: 'slider',
            label: 'Strip Width',
            value: config.animation.stripWidth,
            min: 0,
            max: 400,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Timing',
        controls: [
          {
            id: 'animation.slideDuration',
            type: 'slider',
            label: 'Slide Duration',
            value: config.animation.slideDuration,
            min: 100,
            max: 600,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Scale',
        controls: [
          {
            id: 'animation.panelExitScale',
            type: 'slider',
            label: 'Exit Scale',
            value: config.animation.panelExitScale,
            min: 0.5,
            max: 1,
            step: 0.01,
            formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
          },
          {
            id: 'animation.panelEnterScale',
            type: 'slider',
            label: 'Enter Scale',
            value: config.animation.panelEnterScale,
            min: 0.5,
            max: 1,
            step: 0.01,
            formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// BUILD FULL PANEL CONFIG
// =============================================================================

export function buildRatingsPanelConfig(
  config: RatingsConfig,
  presets: RatingsPreset[],
  activePresetId: string | null
): PanelConfig {
  // Convert RatingsPreset[] to Preset[]
  const presetItems: Preset<RatingsConfig>[] = presets.map((p) => ({
    id: p.id,
    name: p.name,
    data: p.data,
  }))

  return {
    sections: [
      buildPanelSection(config),
      buildSectionTabsSection(config),
      buildSeparatorsSection(config),
      buildCategoriesSection(config),
      buildSubScoresSection(config),
      buildAnimationSection(config),
    ],
    defaultActiveTab: 'panel',
    position: {
      top: '16px',
      bottom: '16px',
      right: '16px',
      width: '320px',
    },
    showReset: true,
    resetLabel: 'Reset All',
    presetConfig: {
      presets: presetItems,
      activePresetId,
      showCopyButton: true,
    },
  }
}
