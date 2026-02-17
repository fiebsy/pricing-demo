/**
 * Cursor Control Panel Configuration
 *
 * Builds the panel config for UnifiedControlPanel
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { CursorConfig, CursorPresetMeta } from '../config/types'
import {
  MODE_OPTIONS,
  BACKGROUND_OPTIONS,
  MIX_BLEND_OPTIONS,
} from '../config/options'

// ============================================================================
// Panel Builder
// ============================================================================

export function buildCursorPanelConfig(
  config: CursorConfig,
  presets: CursorPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildModeSection(config),
      buildStyleSection(config),
      buildPositionSection(config),
      buildMagneticSection(config),
      buildSpringSection(config),
      buildVariantsSection(config),
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

// ============================================================================
// Section Builders
// ============================================================================

function buildModeSection(config: CursorConfig): Section {
  return {
    id: 'mode',
    label: 'Mode',
    title: 'Cursor Mode',
    groups: [
      {
        title: 'Custom Cursor',
        controls: [
          {
            id: 'showCursor',
            type: 'toggle',
            label: 'Show Custom Cursor',
            value: config.showCursor,
            description: 'Off = native browser cursor',
          },
        ],
      },
      ...(config.showCursor
        ? [
            {
              title: 'Behavior',
              controls: [
                {
                  id: 'mode',
                  type: 'select' as const,
                  label: 'Mode',
                  value: config.mode,
                  options: [...MODE_OPTIONS],
                },
                {
                  id: 'matchTextSize',
                  type: 'toggle' as const,
                  label: 'Match Text Size',
                  value: config.matchTextSize,
                },
              ],
            },
          ]
        : []),
    ],
  }
}

function buildStyleSection(config: CursorConfig): Section {
  return {
    id: 'style',
    label: 'Style',
    title: 'Cursor Appearance',
    groups: [
      {
        title: 'Color',
        controls: [
          {
            id: 'style.background',
            type: 'select',
            label: 'Background',
            value: config.style.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'style.mixBlendMode',
            type: 'select',
            label: 'Blend Mode',
            value: config.style.mixBlendMode,
            options: [...MIX_BLEND_OPTIONS],
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'style.width',
            type: 'slider',
            label: 'Width',
            value: config.style.width ?? 20,
            min: 4,
            max: 64,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'style.height',
            type: 'slider',
            label: 'Height',
            value: config.style.height ?? 20,
            min: 4,
            max: 64,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Shape',
        controls: [
          {
            id: 'style.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.style.borderRadius,
            min: 0,
            max: 999,
            step: 1,
            formatLabel: (v: number) => v >= 999 ? 'Full' : `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildPositionSection(config: CursorConfig): Section {
  return {
    id: 'position',
    label: 'Position',
    title: 'Center & Offset',
    groups: [
      {
        title: 'Center Point',
        description: 'Which part of the cursor aligns with the pointer',
        controls: [
          {
            id: 'center.x',
            type: 'slider',
            label: 'Center X',
            value: config.center.x,
            min: 0,
            max: 1,
            step: 0.1,
            formatLabel: (v: number) => v === 0.5 ? 'Center' : `${v.toFixed(1)}`,
          },
          {
            id: 'center.y',
            type: 'slider',
            label: 'Center Y',
            value: config.center.y,
            min: 0,
            max: 1,
            step: 0.1,
            formatLabel: (v: number) => v === 0.5 ? 'Center' : `${v.toFixed(1)}`,
          },
        ],
      },
      {
        title: 'Pixel Offset',
        controls: [
          {
            id: 'offset.x',
            type: 'slider',
            label: 'Offset X',
            value: config.offset.x,
            min: -20,
            max: 20,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'offset.y',
            type: 'slider',
            label: 'Offset Y',
            value: config.offset.y,
            min: -20,
            max: 20,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildMagneticSection(config: CursorConfig): Section {
  return {
    id: 'magnetic',
    label: 'Magnetic',
    title: 'Magnetic Effects',
    groups: [
      {
        title: 'Cursor Snap (cursor → element)',
        description: 'Cursor snaps to interactive elements',
        controls: [
          {
            id: 'magnetic.enabled',
            type: 'toggle',
            label: 'Enable Snap',
            value: config.magnetic.enabled,
          },
        ],
      },
      ...(config.magnetic.enabled
        ? [
            {
              title: 'Snap Options',
              controls: [
                {
                  id: 'magnetic.snap',
                  type: 'slider' as const,
                  label: 'Snap Strength',
                  value: config.magnetic.snap,
                  min: 0,
                  max: 1,
                  step: 0.1,
                  formatLabel: (v: number) =>
                    v === 0 ? 'Free' : v === 1 ? 'Locked' : `${(v * 100).toFixed(0)}%`,
                },
                {
                  id: 'magnetic.morph',
                  type: 'toggle' as const,
                  label: 'Morph Shape',
                  value: config.magnetic.morph,
                },
                {
                  id: 'magnetic.padding',
                  type: 'slider' as const,
                  label: 'Padding',
                  value: config.magnetic.padding,
                  min: 0,
                  max: 20,
                  step: 1,
                  formatLabel: (v: number) => `${v}px`,
                },
              ],
            },
          ]
        : []),
      {
        title: 'Element Pull (element → cursor)',
        description: 'Elements pull toward the cursor on hover',
        controls: [
          {
            id: 'magneticPull.enabled',
            type: 'toggle',
            label: 'Enable Pull',
            value: config.magneticPull.enabled,
          },
        ],
      },
      ...(config.magneticPull.enabled
        ? [
            {
              title: 'Pull Options',
              controls: [
                {
                  id: 'magneticPull.strength',
                  type: 'slider' as const,
                  label: 'Pull Strength',
                  value: config.magneticPull.strength,
                  min: 0.05,
                  max: 0.5,
                  step: 0.05,
                  formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                },
              ],
            },
          ]
        : []),
    ],
  }
}

function buildSpringSection(config: CursorConfig): Section {
  return {
    id: 'spring',
    label: 'Spring',
    title: 'Spring Animation',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'spring.enabled',
            type: 'toggle',
            label: 'Spring',
            value: config.spring.enabled,
            description: 'Add spring physics to movement',
          },
        ],
      },
      ...(config.spring.enabled
        ? [
            {
              title: 'Physics',
              controls: [
                {
                  id: 'spring.stiffness',
                  type: 'slider' as const,
                  label: 'Stiffness',
                  value: config.spring.stiffness,
                  min: 100,
                  max: 1000,
                  step: 25,
                  formatLabel: (v: number) => `${v}`,
                },
                {
                  id: 'spring.damping',
                  type: 'slider' as const,
                  label: 'Damping',
                  value: config.spring.damping,
                  min: 5,
                  max: 60,
                  step: 1,
                  formatLabel: (v: number) => `${v}`,
                },
                {
                  id: 'spring.mass',
                  type: 'slider' as const,
                  label: 'Mass',
                  value: config.spring.mass,
                  min: 0.5,
                  max: 5,
                  step: 0.1,
                  formatLabel: (v: number) => `${v.toFixed(1)}`,
                },
              ],
            },
          ]
        : []),
    ],
  }
}

function buildVariantsSection(config: CursorConfig): Section {
  return {
    id: 'variants',
    label: 'States',
    title: 'State Variants',
    groups: [
      {
        title: 'Pointer Hover',
        description: 'When hovering links/buttons',
        controls: [
          {
            id: 'variants.pointerScale',
            type: 'slider',
            label: 'Scale',
            value: config.variants.pointerScale,
            min: 0.5,
            max: 3,
            step: 0.1,
            formatLabel: (v: number) => `${v.toFixed(1)}x`,
          },
          {
            id: 'variants.pointerBackground',
            type: 'select',
            label: 'Background',
            value: config.variants.pointerBackground || 'none',
            options: [
              { label: 'No Change', value: '' },
              ...BACKGROUND_OPTIONS,
            ],
          },
        ],
      },
      {
        title: 'Pressed',
        description: 'When mouse is clicked',
        controls: [
          {
            id: 'variants.pressedScale',
            type: 'slider',
            label: 'Scale',
            value: config.variants.pressedScale,
            min: 0.3,
            max: 1.5,
            step: 0.1,
            formatLabel: (v: number) => `${v.toFixed(1)}x`,
          },
          {
            id: 'variants.pressedBlur',
            type: 'toggle',
            label: 'Blur Effect',
            value: config.variants.pressedBlur,
          },
        ],
      },
    ],
  }
}
