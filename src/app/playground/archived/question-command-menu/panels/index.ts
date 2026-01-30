/**
 * Question Command Menu Playground - Panel Configuration
 *
 * Creates the UnifiedControlPanel configuration for the playground.
 *
 * @module playground/question-command-menu/panels
 */

import type { UnifiedControlPanelProps, Section } from '@/components/ui/patterns/control-panel'
import type { PlaygroundConfig } from '../types'
import { PRESETS } from '../constants'

type PanelConfig = UnifiedControlPanelProps['config']

// =============================================================================
// LAYOUT SECTION
// =============================================================================

export function createLayoutSection(config: PlaygroundConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout Settings',
    groups: [
      {
        title: 'Trigger',
        controls: [
          {
            id: 'triggerWidth',
            type: 'slider',
            label: 'Width',
            value: config.triggerWidth,
            min: 240,
            max: 480,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'triggerHeight',
            type: 'slider',
            label: 'Height',
            value: config.triggerHeight,
            min: 40,
            max: 64,
            step: 2,
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
            min: 320,
            max: 560,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'maxBottomHeight',
            type: 'slider',
            label: 'Max Bottom Height',
            value: config.maxBottomHeight,
            min: 80,
            max: 480,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.borderRadius,
            min: 12,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Spacing',
        controls: [
          {
            id: 'topGap',
            type: 'slider',
            label: 'Top Gap',
            value: config.topGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'bottomGap',
            type: 'slider',
            label: 'Bottom Gap',
            value: config.bottomGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// ANIMATION SECTION
// =============================================================================

export function createAnimationSection(config: PlaygroundConfig): Section {
  return {
    id: 'animation',
    label: 'Animation',
    title: 'Animation Settings',
    groups: [
      {
        title: 'Timing',
        controls: [
          {
            id: 'animationPreset',
            type: 'select',
            label: 'Preset',
            value: config.animationPreset,
            options: [
              { value: 'snappy', label: 'Snappy' },
              { value: 'smooth', label: 'Smooth' },
              { value: 'bouncy', label: 'Bouncy' },
            ],
          },
          {
            id: 'expandDuration',
            type: 'slider',
            label: 'Expand Duration',
            value: config.expandDuration,
            min: 100,
            max: 600,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'collapseDuration',
            type: 'slider',
            label: 'Collapse Duration',
            value: config.collapseDuration,
            min: 50,
            max: 400,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Effects',
        controls: [
          {
            id: 'animateSlots',
            type: 'toggle',
            label: 'Animate Slots',
            value: config.animateSlots,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// TOP SLOT SECTION
// =============================================================================

export function createTopSlotSection(config: PlaygroundConfig): Section {
  return {
    id: 'topSlot',
    label: 'Top',
    title: 'Top Slot (Answer Preview)',
    groups: [
      {
        title: 'Settings',
        controls: [
          {
            id: 'topSlotEnabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.topSlotEnabled,
          },
          {
            id: 'topSlotHeight',
            type: 'slider',
            label: 'Height',
            value: config.topSlotHeight,
            min: 120,
            max: 320,
            step: 10,
            disabled: !config.topSlotEnabled,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'topSlotBackground',
            type: 'select',
            label: 'Background',
            value: config.topSlotBackground,
            options: [
              { value: 'none', label: 'None' },
              { value: 'primary', label: 'Primary' },
              { value: 'secondary', label: 'Secondary' },
              { value: 'tertiary', label: 'Tertiary' },
            ],
            disabled: !config.topSlotEnabled,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// BOTTOM SLOT SECTION
// =============================================================================

export function createBottomSlotSection(config: PlaygroundConfig): Section {
  return {
    id: 'bottomSlot',
    label: 'Bottom',
    title: 'Bottom Slot (List/Actions)',
    groups: [
      {
        title: 'Settings',
        controls: [
          {
            id: 'bottomSlotEnabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.bottomSlotEnabled,
          },
          {
            id: 'bottomSlotBackground',
            type: 'select',
            label: 'Background',
            value: config.bottomSlotBackground,
            options: [
              { value: 'none', label: 'None' },
              { value: 'primary', label: 'Primary' },
              { value: 'secondary', label: 'Secondary' },
              { value: 'tertiary', label: 'Tertiary' },
            ],
            disabled: !config.bottomSlotEnabled,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// BEHAVIOR SECTION
// =============================================================================

export function createBehaviorSection(config: PlaygroundConfig): Section {
  return {
    id: 'behavior',
    label: 'Q&A',
    title: 'Q&A Behavior',
    groups: [
      {
        title: 'Simulation',
        controls: [
          {
            id: 'responseType',
            type: 'select',
            label: 'Response Type',
            value: config.responseType,
            options: [
              { value: 'good', label: 'Good (92%)' },
              { value: 'lousy', label: 'Lousy (55%)' },
              { value: 'unsure', label: 'Unsure (25%)' },
            ],
          },
          {
            id: 'responseDelay',
            type: 'slider',
            label: 'Response Delay',
            value: config.responseDelay,
            min: 0,
            max: 2000,
            step: 100,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Limits',
        controls: [
          {
            id: 'maxQuestions',
            type: 'slider',
            label: 'Max Questions',
            value: config.maxQuestions,
            min: 1,
            max: 10,
            step: 1,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// OPTIONS SECTION (Presets)
// =============================================================================

export function createOptionsSection(activePresetId: string | null): Section {
  return {
    id: 'options',
    label: 'Presets',
    title: 'Preset Configuration',
    groups: [
      {
        title: 'Load Preset',
        controls: [
          {
            id: 'preset',
            type: 'select',
            label: 'Preset',
            value: activePresetId || 'default',
            options: PRESETS.map((preset) => ({
              value: preset.id,
              label: preset.name,
              description: preset.description,
            })),
          },
        ],
      },
    ],
  }
}

// =============================================================================
// BUILD FULL CONFIG
// =============================================================================

export function buildPanelConfig(
  config: PlaygroundConfig,
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      createLayoutSection(config),
      createAnimationSection(config),
      createTopSlotSection(config),
      createBottomSlotSection(config),
      createBehaviorSection(config),
      createOptionsSection(activePresetId),
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

// =============================================================================
// HELPER: Update config value
// =============================================================================

export function updateConfigValue(
  config: PlaygroundConfig,
  key: string,
  value: unknown
): PlaygroundConfig {
  return {
    ...config,
    [key]: value,
  }
}
