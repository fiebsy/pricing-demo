/**
 * Sliding Ratings Panel - Control Panel Configuration
 *
 * Builds the UnifiedControlPanel configuration from config state.
 *
 * @module playground/sliding-ratings/panels
 */

import type { PanelConfig, Section } from '@/components/ui/prod/base/control-panel'
import type { SlidingRatingsConfig, SlidingRatingsPreset } from '../config/types'
import {
  BACKGROUND_OPTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  SHADOW_OPTIONS,
  BORDER_COLOR_OPTIONS,
  DIVIDER_STYLE_OPTIONS,
  PROGRESS_BAR_SIZE_OPTIONS,
  TEXT_SIZE_OPTIONS,
  PANEL_TRANSITION_MODE_OPTIONS,
  SCALE_ORIGIN_OPTIONS,
  IMPROVE_BUTTON_POSITION_OPTIONS,
  BACK_BUTTON_STYLE_OPTIONS,
  BACK_BUTTON_POSITION_OPTIONS,
  BUTTON_CONTENT_TYPE_OPTIONS,
  ANIMATE_DIRECTION_OPTIONS,
  SHINE_STYLE_OPTIONS,
} from '../config/options'

// =============================================================================
// SECTION BUILDERS
// =============================================================================

function buildPanelSection(config: SlidingRatingsConfig): Section {
  return {
    id: 'panel',
    label: 'Panel',
    title: 'Panel Styling',
    groups: [
      {
        title: 'Background & Shine',
        controls: [
          {
            id: 'panel.background',
            type: 'select',
            label: 'Background',
            value: config.panel.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'panel.showBackground',
            type: 'toggle',
            label: 'Show Background',
            value: config.panel.showBackground,
          },
          {
            id: 'panel.shine',
            type: 'select',
            label: 'Shine Type',
            value: config.panel.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'panel.shineIntensity',
            type: 'select',
            label: 'Shine Intensity',
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
        title: 'Border & Shape',
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
            id: 'panel.useSquircle',
            type: 'toggle',
            label: 'Corner Squircle',
            value: config.panel.useSquircle,
          },
        ],
      },
      {
        title: 'Dimensions',
        controls: [
          {
            id: 'panel.width',
            type: 'slider',
            label: 'Width',
            value: config.panel.width,
            min: 160,
            max: 480,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'panel.padding',
            type: 'slider',
            label: 'Padding',
            value: config.panel.padding,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildCategorySection(config: SlidingRatingsConfig): Section {
  return {
    id: 'category',
    label: 'Categories',
    title: 'Category Row Styling',
    groups: [
      {
        title: 'Display',
        controls: [
          {
            id: 'categoryRow.showIcon',
            type: 'toggle',
            label: 'Show Icon',
            value: config.categoryRow.showIcon,
          },
          {
            id: 'categoryRow.showProgressBar',
            type: 'toggle',
            label: 'Show Progress Bar',
            value: config.categoryRow.showProgressBar,
          },
          {
            id: 'categoryRow.showNetworkBenchmark',
            type: 'toggle',
            label: 'Show Benchmark',
            value: config.categoryRow.showNetworkBenchmark,
          },
          {
            id: 'categoryRow.hoverEffect',
            type: 'toggle',
            label: 'Hover Effect',
            value: config.categoryRow.hoverEffect,
          },
        ],
      },
      {
        title: 'Improve Button',
        controls: [
          {
            id: 'categoryRow.showImproveButton',
            type: 'toggle',
            label: 'Show Improve Button',
            value: config.categoryRow.showImproveButton,
          },
          {
            id: 'categoryRow.improveButtonPosition',
            type: 'select',
            label: 'Position',
            value: config.categoryRow.improveButtonPosition,
            options: [...IMPROVE_BUTTON_POSITION_OPTIONS],
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'categoryRow.progressBarSize',
            type: 'select',
            label: 'Progress Bar Size',
            value: config.categoryRow.progressBarSize,
            options: [...PROGRESS_BAR_SIZE_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildSubScoreSection(config: SlidingRatingsConfig): Section {
  return {
    id: 'subScore',
    label: 'Sub-Scores',
    title: 'Sub-Score Styling',
    groups: [
      {
        title: 'Display',
        controls: [
          {
            id: 'subScore.showProgressBar',
            type: 'toggle',
            label: 'Show Progress Bar',
            value: config.subScore.showProgressBar,
          },
          {
            id: 'subScore.showNetworkBenchmark',
            type: 'toggle',
            label: 'Show Benchmark',
            value: config.subScore.showNetworkBenchmark,
          },
          {
            id: 'subScore.hoverEffect',
            type: 'toggle',
            label: 'Hover Effect',
            value: config.subScore.hoverEffect,
          },
        ],
      },
      {
        title: 'Improve Button',
        controls: [
          {
            id: 'subScore.showImproveButton',
            type: 'toggle',
            label: 'Show Improve Button',
            value: config.subScore.showImproveButton,
          },
          {
            id: 'subScore.improveButtonPosition',
            type: 'select',
            label: 'Position',
            value: config.subScore.improveButtonPosition,
            options: [...IMPROVE_BUTTON_POSITION_OPTIONS],
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'subScore.progressBarSize',
            type: 'select',
            label: 'Progress Bar Size',
            value: config.subScore.progressBarSize,
            options: [...PROGRESS_BAR_SIZE_OPTIONS],
          },
          {
            id: 'subScore.textSize',
            type: 'select',
            label: 'Text Size',
            value: config.subScore.textSize,
            options: [...TEXT_SIZE_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildBackButtonSection(config: SlidingRatingsConfig): Section {
  return {
    id: 'backButton',
    label: 'Back Button',
    title: 'Back Button Styling',
    groups: [
      {
        title: 'Style',
        controls: [
          {
            id: 'backButton.style',
            type: 'select',
            label: 'Style',
            value: config.backButton.style,
            options: [...BACK_BUTTON_STYLE_OPTIONS],
          },
          {
            id: 'backButton.contentType',
            type: 'select',
            label: 'Content Type',
            value: config.backButton.contentType,
            options: [...BUTTON_CONTENT_TYPE_OPTIONS],
          },
          {
            id: 'backButton.position',
            type: 'select',
            label: 'Position',
            value: config.backButton.position,
            options: [...BACK_BUTTON_POSITION_OPTIONS],
          },
          {
            id: 'backButton.showSeparator',
            type: 'toggle',
            label: 'Show Separator',
            value: config.backButton.showSeparator,
          },
        ],
      },
      {
        title: 'Button Options',
        controls: [
          {
            id: 'backButton.useButton',
            type: 'toggle',
            label: 'Use Button Component',
            value: config.backButton.useButton,
          },
          {
            id: 'backButton.shineStyle',
            type: 'select',
            label: 'Shine Style',
            value: config.backButton.shineStyle,
            options: [...SHINE_STYLE_OPTIONS],
          },
          {
            id: 'backButton.animateDirection',
            type: 'select',
            label: 'Animate Direction',
            value: config.backButton.animateDirection,
            options: [...ANIMATE_DIRECTION_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildImproveButtonSection(config: SlidingRatingsConfig): Section {
  return {
    id: 'improveButton',
    label: 'Improve Button',
    title: 'Improve Button Styling',
    groups: [
      {
        title: 'Content',
        controls: [
          {
            id: 'improveButton.contentType',
            type: 'select',
            label: 'Content Type',
            value: config.improveButton.contentType,
            options: [...BUTTON_CONTENT_TYPE_OPTIONS],
          },
        ],
      },
      {
        title: 'Button Options',
        controls: [
          {
            id: 'improveButton.useButton',
            type: 'toggle',
            label: 'Use Button Component',
            value: config.improveButton.useButton,
          },
          {
            id: 'improveButton.shineStyle',
            type: 'select',
            label: 'Shine Style',
            value: config.improveButton.shineStyle,
            options: [...SHINE_STYLE_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildAnimationSection(config: SlidingRatingsConfig): Section {
  return {
    id: 'animation',
    label: 'Animation',
    title: 'Animation Settings',
    groups: [
      {
        title: 'Panel Transition',
        controls: [
          {
            id: 'animation.panelTransitionMode',
            type: 'select',
            label: 'Transition Mode',
            value: config.animation.panelTransitionMode,
            options: [...PANEL_TRANSITION_MODE_OPTIONS],
          },
          {
            id: 'animation.slideDuration',
            type: 'slider',
            label: 'Slide Duration',
            value: config.animation.slideDuration,
            min: 100,
            max: 600,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.autoSyncSlideSettings',
            type: 'toggle',
            label: 'Auto-Sync Offset & Width',
            value: config.animation.autoSyncSlideSettings,
          },
          {
            id: 'animation.stripWidth',
            type: 'slider',
            label: 'Strip Width',
            value: config.animation.stripWidth,
            min: 140,
            max: 300,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
          {
            id: 'animation.slideOffset',
            type: 'slider',
            label: 'Slide Offset',
            value: config.animation.slideOffset,
            min: 25,
            max: 75,
            step: 1,
            formatLabel: (v: number) => `${v}%`,
            disabled: config.animation.autoSyncSlideSettings,
          },
        ],
      },
      {
        title: 'Scale Animation',
        controls: [
          {
            id: 'animation.panelExitScale',
            type: 'slider',
            label: 'Exit Scale',
            value: config.animation.panelExitScale,
            min: 0.7,
            max: 1,
            step: 0.02,
            formatLabel: (v: number) => v.toFixed(2),
          },
          {
            id: 'animation.panelEnterScale',
            type: 'slider',
            label: 'Enter Scale',
            value: config.animation.panelEnterScale,
            min: 0.7,
            max: 1,
            step: 0.02,
            formatLabel: (v: number) => v.toFixed(2),
          },
          {
            id: 'animation.panelScaleOrigin',
            type: 'select',
            label: 'Scale Origin',
            value: config.animation.panelScaleOrigin,
            options: [...SCALE_ORIGIN_OPTIONS],
          },
        ],
      },
      {
        title: 'Height & Timing',
        controls: [
          {
            id: 'animation.animateHeight',
            type: 'toggle',
            label: 'Animate Height',
            value: config.animation.animateHeight,
          },
          {
            id: 'animation.heightDuration',
            type: 'slider',
            label: 'Height Duration',
            value: config.animation.heightDuration,
            min: 100,
            max: 600,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
            disabled: config.animation.autoSyncSlideSettings,
          },
        ],
      },
      {
        title: 'Item Effects',
        controls: [
          {
            id: 'animation.enableItemFade',
            type: 'toggle',
            label: 'Enable Item Fade',
            value: config.animation.enableItemFade,
          },
          {
            id: 'animation.opacityDuration',
            type: 'slider',
            label: 'Opacity Duration',
            value: config.animation.opacityDuration,
            min: 100,
            max: 400,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.enableItemStagger',
            type: 'toggle',
            label: 'Enable Stagger',
            value: config.animation.enableItemStagger,
          },
          {
            id: 'animation.itemStagger',
            type: 'slider',
            label: 'Stagger Delay',
            value: config.animation.itemStagger,
            min: 10,
            max: 80,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.enableCrossfade',
            type: 'toggle',
            label: 'Enable Crossfade',
            value: config.animation.enableCrossfade,
          },
        ],
      },
    ],
  }
}

function buildSeparatorsSection(config: SlidingRatingsConfig): Section {
  return {
    id: 'separators',
    label: 'Dividers',
    title: 'Separator Styling',
    groups: [
      {
        title: 'Visibility',
        controls: [
          {
            id: 'separators.showCategoryDividers',
            type: 'toggle',
            label: 'Category Dividers',
            value: config.separators.showCategoryDividers,
          },
          {
            id: 'separators.showSubScoreDividers',
            type: 'toggle',
            label: 'Sub-Score Dividers',
            value: config.separators.showSubScoreDividers,
          },
        ],
      },
      {
        title: 'Style',
        controls: [
          {
            id: 'separators.dividerColor',
            type: 'select',
            label: 'Color',
            value: config.separators.dividerColor,
            options: [...BORDER_COLOR_OPTIONS],
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

function buildLayoutSection(config: SlidingRatingsConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout Settings',
    groups: [
      {
        title: 'Header Padding',
        controls: [
          {
            id: 'layout.headerPaddingX',
            type: 'slider',
            label: 'Horizontal',
            value: config.layout.headerPaddingX,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.headerPaddingY',
            type: 'slider',
            label: 'Vertical',
            value: config.layout.headerPaddingY,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Row Padding',
        controls: [
          {
            id: 'layout.rowPaddingX',
            type: 'slider',
            label: 'Horizontal',
            value: config.layout.rowPaddingX,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.rowPaddingY',
            type: 'slider',
            label: 'Vertical',
            value: config.layout.rowPaddingY,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Gaps',
        controls: [
          {
            id: 'layout.categoryGap',
            type: 'slider',
            label: 'Category Gap',
            value: config.layout.categoryGap,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.subScoreGap',
            type: 'slider',
            label: 'Sub-Score Gap',
            value: config.layout.subScoreGap,
            min: 0,
            max: 12,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// MAIN BUILDER
// =============================================================================

export function buildSlidingRatingsPanelConfig(
  config: SlidingRatingsConfig,
  presets: SlidingRatingsPreset[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildPanelSection(config),
      buildAnimationSection(config),
      buildCategorySection(config),
      buildSubScoreSection(config),
      buildBackButtonSection(config),
      buildImproveButtonSection(config),
      buildSeparatorsSection(config),
      buildLayoutSection(config),
    ],
    presetConfig: {
      presets: presets.map((p) => ({
        id: p.id,
        name: p.name,
        data: p.data,
      })),
      activePresetId,
      showCopyButton: true,
    },
    showReset: true,
  }
}
