/**
 * Universal Expand Playground - Panel Configuration
 *
 * Creates the UnifiedControlPanel config from PlaygroundConfig.
 */

import type { UnifiedControlPanelProps } from '@/components/ui/patterns/control-panel'
import type { PlaygroundConfig } from '../config/types'
import type { Control, ControlGroup } from '@/components/ui/patterns/control-panel'
import {
  BACKGROUND_OPTIONS,
  BACKDROP_BACKGROUND_OPTIONS,
  BORDER_COLOR_OPTIONS,
  SHINE_OPTIONS,
  DIMENSION_MODE_OPTIONS,
  EXPAND_ORIGIN_OPTIONS,
  BACKDROP_MODE_OPTIONS,
  SHADOW_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  GRADIENT_OPTIONS,
  GRADIENT_COLOR_OPTIONS,
} from '../config/options'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

// =============================================================================
// SLOT SECTION HELPER
// =============================================================================

type SlotPrefix = 'top' | 'bottom' | 'left' | 'right'

function createSlotSection(
  slot: SlotPrefix,
  title: string,
  config: PlaygroundConfig
): ControlGroup[] {
  const isVertical = slot === 'top' || slot === 'bottom'
  const dimensionLabel = isVertical ? 'Height' : 'Width'
  const enabled = config[`${slot}Enabled`]

  // Basic enable toggle is always shown
  const enableGroup: ControlGroup = {
    title: 'Enable',
    controls: [
      {
        id: `${slot}Enabled`,
        type: 'toggle' as const,
        label: `Enable ${title} Slot`,
        value: enabled,
      },
    ],
  }

  // If not enabled, only show the enable toggle
  if (!enabled) {
    return [enableGroup]
  }

  // Full controls when enabled
  return [
    enableGroup,
    {
      title: 'Dimension',
      controls: [
        {
          id: `${slot}DimensionMode`,
          type: 'select' as const,
          label: 'Mode',
          value: config[`${slot}DimensionMode`],
          options: DIMENSION_MODE_OPTIONS,
        },
        {
          id: `${slot}FixedDimension`,
          type: 'slider' as const,
          label: `Fixed ${dimensionLabel}`,
          value: config[`${slot}FixedDimension`],
          min: 32,
          max: 500,
          step: 8,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: `${slot}MaxDimension`,
          type: 'slider' as const,
          label: `Max ${dimensionLabel}`,
          value: config[`${slot}MaxDimension`],
          min: 50,
          max: 600,
          step: 10,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: `${slot}MinDimension`,
          type: 'slider' as const,
          label: `Min ${dimensionLabel}`,
          value: config[`${slot}MinDimension`],
          min: 32,
          max: 300,
          step: 8,
          formatLabel: (v: number) => `${v}px`,
        },
      ],
    },
    {
      title: 'Appearance',
      controls: [
        {
          id: `${slot}Background`,
          type: 'select' as const,
          label: 'Background',
          value: config[`${slot}Background`],
          options: BACKGROUND_OPTIONS,
        },
        {
          id: `${slot}Shine`,
          type: 'select' as const,
          label: 'Shine',
          value: config[`${slot}Shine`],
          options: SHINE_OPTIONS,
        },
        {
          id: `${slot}BorderRadius`,
          type: 'slider' as const,
          label: 'Border Radius',
          value: config[`${slot}BorderRadius`],
          min: 0,
          max: 24,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: `${slot}Inset`,
          type: 'slider' as const,
          label: 'Inset',
          value: config[`${slot}Inset`],
          min: 0,
          max: 16,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: `${slot}BorderWidth`,
          type: 'slider' as const,
          label: 'Border Width',
          value: config[`${slot}BorderWidth`],
          min: 0,
          max: 4,
          step: 0.5,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: `${slot}BorderColor`,
          type: 'select' as const,
          label: 'Border Color',
          value: config[`${slot}BorderColor`],
          options: BORDER_COLOR_OPTIONS,
        },
      ],
    },
    {
      title: 'Animation',
      controls: [
        {
          id: `${slot}DelayOffset`,
          type: 'slider' as const,
          label: 'Delay Offset',
          value: config[`${slot}DelayOffset`],
          min: -100,
          max: 100,
          step: 10,
          formatLabel: (v: number) => `${v}ms`,
        },
        {
          id: `${slot}DurationOffset`,
          type: 'slider' as const,
          label: 'Duration Offset',
          value: config[`${slot}DurationOffset`],
          min: -200,
          max: 200,
          step: 25,
          formatLabel: (v: number) => `${v}ms`,
        },
        {
          id: `${slot}ExpandOrigin`,
          type: 'select' as const,
          label: 'Expand Origin',
          value: config[`${slot}ExpandOrigin`],
          options: EXPAND_ORIGIN_OPTIONS,
        },
      ],
    },
    {
      title: 'Scroll',
      controls: [
        {
          id: `${slot}OverflowGradient`,
          type: 'toggle' as const,
          label: 'Overflow Gradient',
          value: config[`${slot}OverflowGradient`],
        },
        {
          id: `${slot}GradientHeight`,
          type: 'slider' as const,
          label: 'Gradient Height',
          value: config[`${slot}GradientHeight`],
          min: 8,
          max: 48,
          step: 4,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: `${slot}PaddingTop`,
          type: 'slider' as const,
          label: 'Padding Top',
          value: config[`${slot}PaddingTop`],
          min: 0,
          max: 24,
          step: 4,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: `${slot}PaddingBottom`,
          type: 'slider' as const,
          label: 'Padding Bottom',
          value: config[`${slot}PaddingBottom`],
          min: 0,
          max: 24,
          step: 4,
          formatLabel: (v: number) => `${v}px`,
        },
      ],
    },
  ]
}

// =============================================================================
// MAIN PANEL CONFIG
// =============================================================================

export function createPanelConfig(
  config: PlaygroundConfig
): UnifiedControlPanelConfig {
  return {
    sections: [
      // Layout Section
      {
        id: 'layout',
        title: 'Layout',
        tabLabel: 'Layout',
        groups: [
          {
            title: 'Trigger Size',
            controls: [
              {
                id: 'triggerWidth',
                type: 'slider',
                label: 'Width',
                value: config.triggerWidth,
                min: 160,
                max: 400,
                step: 10,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'triggerHeight',
                type: 'slider',
                label: 'Height',
                value: config.triggerHeight,
                min: 32,
                max: 64,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Panel',
            controls: [
              {
                id: 'panelWidth',
                type: 'slider',
                label: 'Width',
                value: config.panelWidth,
                min: 240,
                max: 600,
                step: 20,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'borderRadius',
                type: 'slider',
                label: 'Border Radius',
                value: config.borderRadius,
                min: 8,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Gaps',
            controls: [
              {
                id: 'gapTop',
                type: 'slider',
                label: 'Top',
                value: config.gapTop,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'gapBottom',
                type: 'slider',
                label: 'Bottom',
                value: config.gapBottom,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'gapLeft',
                type: 'slider',
                label: 'Left',
                value: config.gapLeft,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'gapRight',
                type: 'slider',
                label: 'Right',
                value: config.gapRight,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },

      // Animation Section
      {
        id: 'animation',
        title: 'Animation',
        tabLabel: 'Timing',
        groups: [
          {
            title: 'Duration',
            controls: [
              {
                id: 'duration',
                type: 'slider',
                label: 'Expand',
                value: config.duration,
                min: 100,
                max: 600,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'collapseDuration',
                type: 'slider',
                label: 'Collapse',
                value: config.collapseDuration,
                min: 50,
                max: 400,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
          {
            title: 'Backdrop',
            controls: [
              {
                id: 'backdropMode',
                type: 'select',
                label: 'Mode',
                value: config.backdropMode,
                options: BACKDROP_MODE_OPTIONS,
              },
              {
                id: 'backdropDelay',
                type: 'slider',
                label: 'Delay',
                value: config.backdropDelay,
                min: 0,
                max: 200,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'backdropDurationOffset',
                type: 'slider',
                label: 'Duration Offset',
                value: config.backdropDurationOffset,
                min: -200,
                max: 200,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
          {
            title: 'Slot Containers',
            controls: [
              {
                id: 'animateSlotContainers',
                type: 'toggle',
                label: 'Animate Containers',
                value: config.animateSlotContainers,
              },
              {
                id: 'slotContainerDelay',
                type: 'slider',
                label: 'Delay',
                value: config.slotContainerDelay,
                min: 0,
                max: 200,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'slotContainerDurationOffset',
                type: 'slider',
                label: 'Duration Offset',
                value: config.slotContainerDurationOffset,
                min: -200,
                max: 200,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },

      // Appearance Section
      {
        id: 'appearance',
        title: 'Appearance',
        tabLabel: 'Style',
        groups: [
          {
            title: 'Background',
            controls: [
              {
                id: 'background',
                type: 'select',
                label: 'Color',
                value: config.background,
                options: BACKDROP_BACKGROUND_OPTIONS,
              },
              {
                id: 'backdropBorderRadius',
                type: 'select',
                label: 'Border Radius',
                value: config.backdropBorderRadius,
                options: BORDER_RADIUS_OPTIONS,
              },
            ],
          },
          {
            title: 'Effects',
            controls: [
              {
                id: 'shadow',
                type: 'select',
                label: 'Shadow',
                value: config.shadow,
                options: SHADOW_OPTIONS,
              },
              {
                id: 'shine',
                type: 'select',
                label: 'Shine',
                value: config.shine,
                options: SHINE_OPTIONS,
              },
              {
                id: 'squircle',
                type: 'toggle',
                label: 'Squircle Corners',
                value: config.squircle,
              },
            ],
          },
          {
            title: 'Gradient',
            controls: [
              {
                id: 'gradient',
                type: 'select',
                label: 'Style',
                value: config.gradient,
                options: GRADIENT_OPTIONS,
              },
              {
                id: 'gradientColor',
                type: 'select',
                label: 'Color',
                value: config.gradientColor,
                options: GRADIENT_COLOR_OPTIONS,
              },
            ],
          },
        ],
      },

      // Top Slot Section
      {
        id: 'top',
        title: 'Top Slot',
        tabLabel: 'Top',
        groups: createSlotSection('top', 'Top', config),
      },

      // Bottom Slot Section
      {
        id: 'bottom',
        title: 'Bottom Slot',
        tabLabel: 'Bottom',
        groups: createSlotSection('bottom', 'Bottom', config),
      },

      // Left Slot Section
      {
        id: 'left',
        title: 'Left Slot',
        tabLabel: 'Left',
        groups: createSlotSection('left', 'Left', config),
      },

      // Right Slot Section
      {
        id: 'right',
        title: 'Right Slot',
        tabLabel: 'Right',
        groups: createSlotSection('right', 'Right', config),
      },

      // Debug Section
      {
        id: 'debug',
        title: 'Debug',
        tabLabel: 'Debug',
        groups: [
          {
            title: 'Debug Mode',
            controls: [
              {
                id: 'debug',
                type: 'toggle',
                label: 'Show Debug Info',
                value: config.debug,
              },
            ],
          },
          {
            title: 'Trigger Slot',
            controls: [
              {
                id: 'triggerSlotEnabled',
                type: 'toggle',
                label: 'Enabled',
                value: config.triggerSlotEnabled,
              },
              {
                id: 'triggerSlotBackground',
                type: 'select',
                label: 'Background',
                value: config.triggerSlotBackground,
                options: BACKGROUND_OPTIONS,
              },
              {
                id: 'triggerSlotInset',
                type: 'slider',
                label: 'Inset',
                value: config.triggerSlotInset,
                min: 0,
                max: 16,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },
    ],
    defaultActiveTab: 'layout',
    position: {
      top: '16px',
      bottom: '16px',
      right: '16px',
      width: '320px',
    },
    showReset: true,
    resetLabel: 'Reset All',
  }
}
