import type { PanelConfig, Section } from '@/components/ui/prod/base/control-panel'
import type { DeckSlideCardConfig, DeckSlideCardPresetMeta } from '../config/types'
import {
  BACKGROUND_OPTIONS,
  GRADIENT_COLORS,
  GRADIENT_DIRECTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  SHADOW_OPTIONS,
  DEPTH_OPTIONS,
  CORNER_OPTIONS,
  BORDER_COLOR_OPTIONS,
  TEXT_COLOR_OPTIONS,
  TEXT_SIZE_OPTIONS,
  CONTENT_TYPE_OPTIONS,
  WIDTH_OPTIONS,
  HEIGHT_OPTIONS,
  ASPECT_RATIO_OPTIONS,
} from '../config/options'

export function buildDeckSlideCardPanelConfig(
  config: DeckSlideCardConfig,
  presets: DeckSlideCardPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildOuterSection(config),
      buildContentSection(config),
      buildLayoutSection(config),
      buildExportSection(config),
    ],
    presetConfig: {
      presets: presets.map((p) => ({
        id: p.id,
        name: p.name,
        data: p.data,
      })),
      activePresetId,
      showCopyButton: true, // REQUIRED
    },
    showReset: true,
  }
}

function buildOuterSection(config: DeckSlideCardConfig): Section {
  const isGradient = config.outer.background === 'gradient'
  
  return {
    id: 'outer',
    label: 'Outer',
    title: 'Card Styling',
    groups: [
      {
        title: 'Background',
        controls: [
          {
            id: 'outer.background',
            type: 'select',
            label: 'Type',
            value: config.outer.background,
            options: [...BACKGROUND_OPTIONS],
          },
          ...(isGradient ? [
            {
              id: 'outer.gradientFrom',
              type: 'select' as const,
              label: 'From Color',
              value: config.outer.gradientFrom || 'tertiary',
              options: [...GRADIENT_COLORS],
            },
            {
              id: 'outer.gradientTo',
              type: 'select' as const,
              label: 'To Color',
              value: config.outer.gradientTo || 'quaternary',
              options: [...GRADIENT_COLORS],
            },
            {
              id: 'outer.gradientDirection',
              type: 'select' as const,
              label: 'Direction',
              value: config.outer.gradientDirection || 'to-br',
              options: [...GRADIENT_DIRECTIONS],
            },
          ] : []),
        ],
      },
      {
        title: 'Shine Effect',
        controls: [
          {
            id: 'outer.shine',
            type: 'select',
            label: 'Type',
            value: config.outer.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'outer.shineIntensity',
            type: 'select',
            label: 'Intensity',
            value: config.outer.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
          },
        ],
      },
      {
        title: 'Shadow & Depth',
        controls: [
          {
            id: 'outer.shadow',
            type: 'select',
            label: 'Shadow',
            value: config.outer.shadow,
            options: [...SHADOW_OPTIONS],
          },
          {
            id: 'outer.depth',
            type: 'select',
            label: 'Depth Gradient',
            value: config.outer.depth,
            options: [...DEPTH_OPTIONS],
          },
        ],
      },
      {
        title: 'Shape & Corners',
        controls: [
          {
            id: 'outer.corner',
            type: 'select',
            label: 'Corner Style',
            value: config.outer.corner,
            options: [...CORNER_OPTIONS],
          },
          {
            id: 'outer.borderRadius',
            type: 'slider',
            label: 'Radius',
            value: config.outer.borderRadius,
            min: 0,
            max: 48,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'outer.border',
            type: 'toggle',
            label: 'Show Border',
            value: config.outer.border,
          },
          {
            id: 'outer.borderColor',
            type: 'select',
            label: 'Border Color',
            value: config.outer.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
            disabled: !config.outer.border,
          },
          {
            id: 'outer.borderWidth',
            type: 'slider',
            label: 'Border Width',
            value: config.outer.borderWidth,
            min: 1,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
            disabled: !config.outer.border,
          },
        ],
      },
      {
        title: 'Spacing',
        controls: [
          {
            id: 'outer.padding',
            type: 'slider',
            label: 'Padding',
            value: config.outer.padding,
            min: 0,
            max: 64,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildContentSection(config: DeckSlideCardConfig): Section {
  const contentType = config.content.type
  
  return {
    id: 'content',
    label: 'Content',
    title: 'Content Configuration',
    groups: [
      {
        title: 'Content Type',
        controls: [
          {
            id: 'content.type',
            type: 'select',
            label: 'Type',
            value: contentType,
            options: [...CONTENT_TYPE_OPTIONS],
          },
        ],
      },
      ...(contentType === 'stat' ? [
        {
          title: 'Stat Values',
          controls: [
            {
              id: 'content.statValue',
              type: 'text' as const,
              label: 'Value',
              value: config.content.statValue || '',
              placeholder: '$250B → $480B',
            },
            {
              id: 'content.statLabel',
              type: 'text' as const,
              label: 'Label',
              value: config.content.statLabel || '',
              placeholder: 'Creator economy growth',
            },
            {
              id: 'content.statSubtext',
              type: 'text' as const,
              label: 'Subtext',
              value: config.content.statSubtext || '',
              placeholder: 'Optional supporting text',
            },
            {
              id: 'content.showArrow',
              type: 'toggle' as const,
              label: 'Show Arrow Icon',
              value: config.content.showArrow ?? true,
            },
          ],
        },
      ] : []),
      {
        title: 'Text Colors',
        controls: [
          {
            id: 'content.titleColor',
            type: 'select',
            label: 'Title/Value',
            value: config.content.titleColor,
            options: [...TEXT_COLOR_OPTIONS],
          },
          {
            id: 'content.labelColor',
            type: 'select',
            label: 'Label',
            value: config.content.labelColor,
            options: [...TEXT_COLOR_OPTIONS],
          },
          {
            id: 'content.subtextColor',
            type: 'select',
            label: 'Subtext',
            value: config.content.subtextColor,
            options: [...TEXT_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Typography Scale',
        controls: [
          {
            id: 'content.titleSize',
            type: 'select',
            label: 'Title Size',
            value: config.content.titleSize,
            options: [...TEXT_SIZE_OPTIONS],
          },
          {
            id: 'content.labelSize',
            type: 'select',
            label: 'Label Size',
            value: config.content.labelSize,
            options: [...TEXT_SIZE_OPTIONS],
          },
          {
            id: 'content.subtextSize',
            type: 'select',
            label: 'Subtext Size',
            value: config.content.subtextSize,
            options: [...TEXT_SIZE_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildLayoutSection(config: DeckSlideCardConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout & Sizing',
    groups: [
      {
        title: 'Dimensions',
        controls: [
          {
            id: 'layout.width',
            type: 'select',
            label: 'Width',
            value: config.layout.width,
            options: [...WIDTH_OPTIONS],
          },
          {
            id: 'layout.minWidth',
            type: 'slider',
            label: 'Min Width',
            value: config.layout.minWidth || 320,
            min: 200,
            max: 600,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
            disabled: config.layout.width === 'full',
          },
          {
            id: 'layout.height',
            type: 'select',
            label: 'Height',
            value: config.layout.height,
            options: [...HEIGHT_OPTIONS],
          },
          {
            id: 'layout.minHeight',
            type: 'slider',
            label: 'Min Height',
            value: config.layout.minHeight || 180,
            min: 100,
            max: 400,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
            disabled: config.layout.height === 'full',
          },
        ],
      },
      {
        title: 'Aspect Ratio',
        controls: [
          {
            id: 'layout.aspectRatio',
            type: 'select',
            label: 'Ratio',
            value: config.layout.aspectRatio || 'auto',
            options: [...ASPECT_RATIO_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildExportSection(config: DeckSlideCardConfig): Section {
  return {
    id: 'export',
    label: 'Export',
    title: 'Export & Print Settings',
    groups: [
      {
        title: 'Print Optimization',
        controls: [
          {
            id: 'export.printOptimized',
            type: 'toggle',
            label: 'Print Optimized',
            value: config.export.printOptimized,
            description: 'Apply print-specific CSS overrides',
          },
          {
            id: 'export.forceLight',
            type: 'toggle',
            label: 'Force Light Mode',
            value: config.export.forceLight,
            description: 'Always render in light mode for export',
          },
          {
            id: 'export.viewportScaling',
            type: 'toggle',
            label: 'Viewport Scaling',
            value: config.export.viewportScaling,
            description: 'Use viewport-relative units (vw/vh)',
          },
        ],
      },
    ],
  }
}