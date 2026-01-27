/**
 * Button Audit Playground - Control Panel Configuration
 *
 * Builds the UnifiedControlPanel configuration from config state.
 *
 * @module playground/button-audit/panels
 */

import type { PanelConfig, Section } from '@/components/ui/prod/base/control-panel'
import type { ButtonAuditConfig, ButtonAuditPreset } from '../config/types'
import {
  VARIANT_OPTIONS,
  SIZE_OPTIONS,
  ROUNDNESS_OPTIONS,
  DISPLAY_MODE_OPTIONS,
  CONTENT_MODE_OPTIONS,
  BACKGROUND_OPTIONS,
} from '../config/options'

// =============================================================================
// SECTION BUILDERS
// =============================================================================

function buildButtonSection(config: ButtonAuditConfig): Section {
  return {
    id: 'button',
    label: 'Button',
    title: 'Button Properties',
    groups: [
      {
        title: 'Style',
        controls: [
          {
            id: 'button.variant',
            type: 'select',
            label: 'Variant',
            value: config.button.variant,
            options: [...VARIANT_OPTIONS],
          },
          {
            id: 'button.size',
            type: 'select',
            label: 'Size',
            value: config.button.size,
            options: [...SIZE_OPTIONS],
          },
          {
            id: 'button.roundness',
            type: 'select',
            label: 'Roundness',
            value: config.button.roundness,
            options: [...ROUNDNESS_OPTIONS],
          },
        ],
      },
      {
        title: 'Content',
        controls: [
          {
            id: 'button.text',
            type: 'text',
            label: 'Text',
            value: config.button.text,
          },
          {
            id: 'button.showIconLeading',
            type: 'toggle',
            label: 'Leading Icon',
            value: config.button.showIconLeading,
          },
          {
            id: 'button.showIconTrailing',
            type: 'toggle',
            label: 'Trailing Icon',
            value: config.button.showIconTrailing,
          },
        ],
      },
      {
        title: 'State',
        controls: [
          {
            id: 'button.isLoading',
            type: 'toggle',
            label: 'Loading',
            value: config.button.isLoading,
          },
          {
            id: 'button.showTextWhileLoading',
            type: 'toggle',
            label: 'Text While Loading',
            value: config.button.showTextWhileLoading,
          },
          {
            id: 'button.disabled',
            type: 'toggle',
            label: 'Disabled',
            value: config.button.disabled,
          },
        ],
      },
    ],
  }
}

function buildDisplaySection(config: ButtonAuditConfig): Section {
  return {
    id: 'display',
    label: 'Display',
    title: 'Display Settings',
    groups: [
      {
        title: 'View Mode',
        controls: [
          {
            id: 'display.mode',
            type: 'select',
            label: 'Mode',
            value: config.display.mode,
            options: [...DISPLAY_MODE_OPTIONS],
          },
          {
            id: 'display.contentMode',
            type: 'select',
            label: 'Content',
            value: config.display.contentMode,
            options: [...CONTENT_MODE_OPTIONS],
          },
          {
            id: 'display.backgroundColor',
            type: 'select',
            label: 'Background',
            value: config.display.backgroundColor,
            options: [...BACKGROUND_OPTIONS],
          },
        ],
      },
      {
        title: 'Overlays',
        controls: [
          {
            id: 'display.showLabels',
            type: 'toggle',
            label: 'Show Labels',
            value: config.display.showLabels,
          },
          {
            id: 'display.showPaddingOverlay',
            type: 'toggle',
            label: 'Padding Overlay',
            value: config.display.showPaddingOverlay,
          },
          {
            id: 'display.showMeasurements',
            type: 'toggle',
            label: 'Measurements',
            value: config.display.showMeasurements,
          },
        ],
      },
    ],
  }
}

function buildGridSection(config: ButtonAuditConfig): Section {
  return {
    id: 'grid',
    label: 'Grid',
    title: 'Grid Settings',
    groups: [
      {
        title: 'Layout',
        controls: [
          {
            id: 'grid.columns',
            type: 'slider',
            label: 'Columns',
            value: config.grid.columns,
            min: 1,
            max: 6,
            step: 1,
            formatLabel: (v: number) => `${v}`,
          },
          {
            id: 'grid.gap',
            type: 'slider',
            label: 'Gap',
            value: config.grid.gap,
            min: 8,
            max: 48,
            step: 4,
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

export function buildButtonAuditPanelConfig(
  config: ButtonAuditConfig,
  presets: ButtonAuditPreset[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildButtonSection(config),
      buildDisplaySection(config),
      buildGridSection(config),
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
