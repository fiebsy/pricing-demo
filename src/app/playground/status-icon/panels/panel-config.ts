/**
 * Status Icon Control Panel Configuration
 *
 * Builds the panel config for UnifiedControlPanel
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { StatusIconConfig, StatusIconPresetMeta } from '../config/types'
import {
  LINE_CAP_OPTIONS,
  DASH_PATTERN_OPTIONS,
  FILL_TYPE_OPTIONS,
  ICON_NAME_OPTIONS,
  ICON_VARIANT_OPTIONS,
  ICON_STROKE_WIDTH_OPTIONS,
  STROKE_COLOR_OPTIONS,
  FILL_COLOR_OPTIONS,
  ICON_COLOR_OPTIONS,
  TEXT_COLOR_OPTIONS,
  TEXT_SIZE_OPTIONS,
  TEXT_WEIGHT_OPTIONS,
  TEXT_POSITION_OPTIONS,
} from '../config/options'

// ============================================================================
// Panel Builder
// ============================================================================

export function buildStatusIconPanelConfig(
  config: StatusIconConfig,
  presets: StatusIconPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildSizeSection(config),
      buildStrokeSection(config),
      buildFillSection(config),
      buildIconSection(config),
      buildTextSection(config),
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

function buildSizeSection(config: StatusIconConfig): Section {
  return {
    id: 'size',
    label: 'Size',
    title: 'Dimensions',
    groups: [
      {
        title: 'Diameter',
        controls: [
          {
            id: 'size.diameter',
            type: 'slider',
            label: 'Diameter',
            value: config.size.diameter,
            min: 12,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildStrokeSection(config: StatusIconConfig): Section {
  return {
    id: 'stroke',
    label: 'Stroke',
    title: 'Stroke Styling',
    groups: [
      {
        title: 'Width & Color',
        controls: [
          {
            id: 'stroke.width',
            type: 'slider',
            label: 'Width',
            value: config.stroke.width,
            min: 1,
            max: 6,
            step: 0.5,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'stroke.color',
            type: 'color-select',
            label: 'Color',
            value: config.stroke.color,
            options: [...STROKE_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Dash Pattern',
        controls: [
          {
            id: 'stroke.dashed',
            type: 'toggle',
            label: 'Dashed',
            value: config.stroke.dashed,
          },
        ],
      },
      ...(config.stroke.dashed
        ? [
            {
              title: 'Dash Options',
              controls: [
                {
                  id: 'stroke.dashArray',
                  type: 'select' as const,
                  label: 'Pattern',
                  value: config.stroke.dashArray,
                  options: [...DASH_PATTERN_OPTIONS],
                },
                {
                  id: 'stroke.lineCap',
                  type: 'select' as const,
                  label: 'Line Cap',
                  value: config.stroke.lineCap,
                  options: [...LINE_CAP_OPTIONS],
                },
              ],
            },
            ...(config.stroke.dashArray === 'custom'
              ? [
                  {
                    title: 'Custom Pattern',
                    controls: [
                      {
                        id: 'stroke.customDash',
                        type: 'slider' as const,
                        label: 'Dash Length',
                        value: config.stroke.customDash ?? 4,
                        min: 0.5,
                        max: 20,
                        step: 0.5,
                        formatLabel: (v: number) => `${v}px`,
                      },
                      {
                        id: 'stroke.customGap',
                        type: 'slider' as const,
                        label: 'Gap Length',
                        value: config.stroke.customGap ?? 2,
                        min: 0.5,
                        max: 20,
                        step: 0.5,
                        formatLabel: (v: number) => `${v}px`,
                      },
                    ],
                  },
                ]
              : []),
          ]
        : []),
    ],
  }
}

function buildFillSection(config: StatusIconConfig): Section {
  const { fill } = config

  // Build solid options group when fill type is 'solid'
  const solidGroup =
    fill.type === 'solid'
      ? [
          {
            title: 'Solid Options',
            controls: [
              {
                id: 'fill.color',
                type: 'color-select' as const,
                label: 'Color',
                value: fill.color,
                options: [...FILL_COLOR_OPTIONS],
              },
            ],
          },
        ]
      : []

  // Build full options group when fill type is 'full'
  const fullGroup =
    fill.type === 'full'
      ? [
          {
            title: 'Full Options',
            controls: [
              {
                id: 'fill.color',
                type: 'color-select' as const,
                label: 'Color',
                value: fill.color,
                options: [...FILL_COLOR_OPTIONS],
              },
            ],
          },
        ]
      : []

  // Build pie options group when fill type is 'pie'
  const pieGroup =
    fill.type === 'pie'
      ? [
          {
            title: 'Pie Options',
            controls: [
              {
                id: 'fill.percentage',
                type: 'slider' as const,
                label: 'Percentage',
                value: fill.percentage,
                min: 0,
                max: 100,
                step: 5,
                formatLabel: (v: number) => `${v}%`,
              },
              {
                id: 'fill.color',
                type: 'color-select' as const,
                label: 'Color',
                value: fill.color,
                options: [...FILL_COLOR_OPTIONS],
              },
            ],
          },
        ]
      : []

  return {
    id: 'fill',
    label: 'Fill',
    title: 'Interior Fill',
    groups: [
      {
        title: 'Fill Type',
        controls: [
          {
            id: 'fill.type',
            type: 'select',
            label: 'Type',
            value: fill.type,
            options: [...FILL_TYPE_OPTIONS],
          },
        ],
      },
      ...solidGroup,
      ...fullGroup,
      ...pieGroup,
    ],
  }
}

function buildIconSection(config: StatusIconConfig): Section {
  const { icon } = config

  // Build size & weight controls based on variant
  const sizeAndWeightControls = [
    {
      id: 'icon.size',
      type: 'slider' as const,
      label: 'Size',
      value: icon.size,
      min: 6,
      max: 24,
      step: 1,
      formatLabel: (v: number) => `${v}px`,
    },
    // Only show strokeWidth for stroke variant
    ...(icon.variant === 'stroke'
      ? [
          {
            id: 'icon.strokeWidth',
            type: 'select' as const,
            label: 'Thickness',
            value: String(icon.strokeWidth),
            options: ICON_STROKE_WIDTH_OPTIONS.map((opt) => ({
              label: opt.label,
              value: String(opt.value),
            })),
          },
        ]
      : []),
  ]

  const iconOptionsGroup = icon.show
    ? [
        {
          title: 'Icon Selection',
          controls: [
            {
              id: 'icon.iconName',
              type: 'select' as const,
              label: 'Icon',
              value: icon.iconName,
              options: [...ICON_NAME_OPTIONS],
            },
            {
              id: 'icon.variant',
              type: 'select' as const,
              label: 'Variant',
              value: icon.variant,
              options: [...ICON_VARIANT_OPTIONS],
            },
            {
              id: 'icon.color',
              type: 'color-select' as const,
              label: 'Color',
              value: icon.color,
              options: [...ICON_COLOR_OPTIONS],
            },
          ],
        },
        {
          title: 'Icon Size & Weight',
          controls: sizeAndWeightControls,
        },
      ]
    : []

  return {
    id: 'icon',
    label: 'Icon',
    title: 'Icon Overlay',
    groups: [
      {
        title: 'Visibility',
        controls: [
          {
            id: 'icon.show',
            type: 'toggle',
            label: 'Show Icon',
            value: icon.show,
          },
        ],
      },
      ...iconOptionsGroup,
    ],
  }
}

function buildTextSection(config: StatusIconConfig): Section {
  return {
    id: 'text',
    label: 'Text',
    title: 'Companion Text',
    groups: [
      {
        title: 'Visibility',
        controls: [
          {
            id: 'text.show',
            type: 'toggle',
            label: 'Show Text',
            value: config.text.show,
          },
        ],
      },
      ...(config.text.show
        ? [
            {
              title: 'Content',
              controls: [
                {
                  id: 'text.content',
                  type: 'text' as const,
                  label: 'Text',
                  value: config.text.content,
                  placeholder: 'Status label...',
                },
              ],
            },
            {
              title: 'Typography',
              controls: [
                {
                  id: 'text.size',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.text.size,
                  options: [...TEXT_SIZE_OPTIONS],
                },
                {
                  id: 'text.weight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: config.text.weight,
                  options: [...TEXT_WEIGHT_OPTIONS],
                },
                {
                  id: 'text.color',
                  type: 'color-select' as const,
                  label: 'Color',
                  value: config.text.color,
                  options: [...TEXT_COLOR_OPTIONS],
                },
              ],
            },
            {
              title: 'Layout',
              controls: [
                {
                  id: 'text.position',
                  type: 'select' as const,
                  label: 'Position',
                  value: config.text.position,
                  options: [...TEXT_POSITION_OPTIONS],
                },
                {
                  id: 'text.gap',
                  type: 'slider' as const,
                  label: 'Gap',
                  value: config.text.gap,
                  min: 4,
                  max: 16,
                  step: 2,
                  formatLabel: (v: number) => `${v}px`,
                },
              ],
            },
          ]
        : []),
    ],
  }
}
