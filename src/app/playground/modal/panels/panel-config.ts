/**
 * Modal Control Panel Configuration
 *
 * Builds the panel config for UnifiedControlPanel
 */

import type { PanelConfig, Section, ControlGroup } from '@/components/ui/patterns/control-panel'
import type { ModalPlaygroundConfig, ModalPresetMeta, StageId } from '../config/types'
import { STAGE_IDS, STAGE_LABELS } from '../config/stages'
import {
  CORNER_SHAPE_OPTIONS,
  BACKGROUND_OPTIONS,
  SHINE_OPTIONS,
  DEPTH_OPTIONS,
  SHADOW_OPTIONS,
  DROP_SHADOW_OPTIONS,
  BORDER_COLOR_OPTIONS,
  TEXT_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
  TEXT_SIZE_OPTIONS,
  WEIGHT_OPTIONS,
  BUTTON_VARIANT_OPTIONS,
  BUTTON_SIZE_OPTIONS,
  BUTTON_COUNT_OPTIONS,
  BUTTON_LAYOUT_OPTIONS,
  BUTTON_RADIUS_OPTIONS,
  CLOSE_BUTTON_POSITION_OPTIONS,
  CLOSE_BUTTON_SIZE_OPTIONS,
  ICON_STROKE_WIDTH_OPTIONS,
  BACKGROUND_MODE_OPTIONS,
  CLOSE_BUTTON_RADIUS_OPTIONS,
  CLOSE_BUTTON_BG_COLOR_OPTIONS,
  ANIMATION_PRESET_OPTIONS,
  PAGE_BACKGROUND_OPTIONS,
  TEXT_TRANSITION_MODE_OPTIONS,
  TEXT_EASING_OPTIONS,
  CONTENT_TYPE_OPTIONS,
  LAYOUT_ANIMATION_STYLE_OPTIONS,
  LAYOUT_EASING_OPTIONS,
  ANIMATION_SYNC_MODE_OPTIONS,
  PRO_CARD_TEXT_STYLE_OPTIONS,
  PRO_CARD_BACKGROUND_OPTIONS,
  GLOW_COLOR_OPTIONS,
  PRO_CARD_FONT_WEIGHT_OPTIONS,
  FLUID_TIMING_OPTIONS,
  CHECKMARK_STYLE_OPTIONS,
  ASSET_TYPE_OPTIONS,
  COIN_STACK_STATE_OPTIONS,
  ASSET_ALIGNMENT_OPTIONS,
} from '../config/options'

// ============================================================================
// Panel Builder
// ============================================================================

export function buildModalPanelConfig(
  config: ModalPlaygroundConfig,
  presets: ModalPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildContainerSection(config),
      buildHeaderSection(config),
      buildContentTopSection(config),
      buildContentBottomSection(config),
      buildProCardSection(config),
      buildChecklistSection(config),
      buildButtonsSection(config),
      buildCloseButtonSection(config),
      buildBackdropSection(config),
      buildAnimationSection(config),
      buildTextTransitionSection(config),
      buildStagesSection(config),
      buildDemoSection(config),
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

function buildContainerSection(config: ModalPlaygroundConfig): Section {
  return {
    id: 'container',
    label: 'Container',
    title: 'Container Styling',
    groups: [
      {
        title: 'Dimensions',
        controls: [
          {
            id: 'container.width',
            type: 'slider',
            label: 'Width',
            value: config.container.width,
            min: 280,
            max: 640,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'container.minHeight',
            type: 'slider',
            label: 'Min Height',
            value: config.container.minHeight,
            min: 120,
            max: 600,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Spacing',
        controls: [
          {
            id: 'container.padding',
            type: 'slider',
            label: 'Padding',
            value: config.container.padding,
            min: 12,
            max: 48,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'container.gap',
            type: 'slider',
            label: 'Gap',
            value: config.container.gap,
            min: 8,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'container.pushButtonsToBottom',
            type: 'toggle',
            label: 'Push Buttons to Bottom',
            value: config.container.pushButtonsToBottom,
          },
          {
            id: 'container.showSeparator',
            type: 'toggle',
            label: 'Show Separator',
            value: config.container.showSeparator,
          },
        ],
      },
      {
        title: 'Corners',
        controls: [
          {
            id: 'container.borderRadius',
            type: 'slider',
            label: 'Radius',
            value: config.container.borderRadius,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'container.cornerShape',
            type: 'select',
            label: 'Shape',
            value: config.container.cornerShape,
            options: [...CORNER_SHAPE_OPTIONS],
          },
        ],
      },
      {
        title: 'Surface',
        controls: [
          {
            id: 'container.background',
            type: 'color-select',
            label: 'Background',
            value: config.container.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'container.shine',
            type: 'select',
            label: 'Shine',
            value: config.container.shine,
            options: [...SHINE_OPTIONS],
          },
          {
            id: 'container.depth',
            type: 'select',
            label: 'Depth',
            value: config.container.depth,
            options: [...DEPTH_OPTIONS],
          },
          {
            id: 'container.shadow',
            type: 'select',
            label: 'Shadow',
            value: config.container.shadow,
            options: [...SHADOW_OPTIONS],
          },
          {
            id: 'container.dropShadow',
            type: 'select',
            label: 'Drop Shadow',
            value: config.container.dropShadow,
            options: [...DROP_SHADOW_OPTIONS],
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'container.borderWidth',
            type: 'slider',
            label: 'Width',
            value: config.container.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'container.borderColor',
            type: 'color-select',
            label: 'Color',
            value: config.container.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildHeaderSection(config: ModalPlaygroundConfig): Section {
  const assetConfig = config.header.asset
  const isCoinStack = assetConfig?.type === 'coin-stack'

  return {
    id: 'header',
    label: 'Header',
    title: 'Header Content',
    groups: [
      {
        title: 'Asset',
        controls: [
          {
            id: 'header.showAsset',
            type: 'toggle',
            label: 'Show Asset',
            value: config.header.showAsset,
          },
        ],
      },
      ...(config.header.showAsset
        ? [
            {
              title: 'Asset Options',
              controls: [
                {
                  id: 'header.asset.type',
                  type: 'select' as const,
                  label: 'Type',
                  value: assetConfig?.type ?? 'placeholder',
                  options: [...ASSET_TYPE_OPTIONS],
                },
                {
                  id: 'header.asset.height',
                  type: 'slider' as const,
                  label: 'Height',
                  value: assetConfig?.height ?? config.header.assetHeight,
                  min: 32,
                  max: 120,
                  step: 8,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'header.asset.alignment',
                  type: 'select' as const,
                  label: 'Alignment',
                  value: assetConfig?.alignment ?? 'center',
                  options: [...ASSET_ALIGNMENT_OPTIONS],
                },
                {
                  id: 'header.asset.offsetX',
                  type: 'slider' as const,
                  label: 'Offset X',
                  value: assetConfig?.offsetX ?? 0,
                  min: -50,
                  max: 50,
                  step: 2,
                  formatLabel: (v: number) => `${v}px`,
                },
              ],
            },
            // Coin Stack specific controls
            ...(isCoinStack
              ? [
                  {
                    title: 'Coin Stack',
                    controls: [
                      {
                        id: 'header.asset.coinStack.width',
                        type: 'slider' as const,
                        label: 'Width',
                        value: assetConfig?.coinStack?.width ?? 100,
                        min: 50,
                        max: 200,
                        step: 10,
                        formatLabel: (v: number) => `${v}px`,
                      },
                      {
                        id: 'header.asset.coinStack.stateId',
                        type: 'select' as const,
                        label: 'Default State',
                        value: String(assetConfig?.coinStack?.stateId ?? 1),
                        options: [...COIN_STACK_STATE_OPTIONS],
                      },
                      {
                        id: 'header.asset.coinStack.transitionEnabled',
                        type: 'toggle' as const,
                        label: 'Animate Transitions',
                        value: assetConfig?.coinStack?.transitionEnabled ?? true,
                      },
                      // Only show duration/bounce when transitions are enabled
                      ...(assetConfig?.coinStack?.transitionEnabled !== false
                        ? [
                            {
                              id: 'header.asset.coinStack.transitionDuration',
                              type: 'slider' as const,
                              label: 'Duration',
                              value: assetConfig?.coinStack?.transitionDuration ?? 0.4,
                              min: 0.1,
                              max: 1.0,
                              step: 0.05,
                              formatLabel: (v: number) => `${v.toFixed(2)}s`,
                            },
                            {
                              id: 'header.asset.coinStack.transitionBounce',
                              type: 'slider' as const,
                              label: 'Bounce',
                              value: assetConfig?.coinStack?.transitionBounce ?? 0.15,
                              min: 0,
                              max: 0.5,
                              step: 0.05,
                              formatLabel: (v: number) => v.toFixed(2),
                            },
                          ]
                        : []),
                    ],
                  },
                ]
              : []),
          ]
        : []),
      {
        title: 'Title',
        controls: [
          {
            id: 'header.titleContent',
            type: 'text',
            label: 'Text',
            value: config.header.titleContent,
            placeholder: 'Modal title...',
          },
        ],
      },
      {
        title: 'Title Typography',
        controls: [
          {
            id: 'header.title.size',
            type: 'select',
            label: 'Size',
            value: config.header.title.size,
            options: [...TITLE_SIZE_OPTIONS],
          },
          {
            id: 'header.title.weight',
            type: 'select',
            label: 'Weight',
            value: config.header.title.weight,
            options: [...WEIGHT_OPTIONS],
          },
          {
            id: 'header.title.color',
            type: 'color-select',
            label: 'Color',
            value: config.header.title.color,
            options: [...TEXT_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Subheader',
        controls: [
          {
            id: 'header.subheader.show',
            type: 'toggle',
            label: 'Show Subheader',
            value: config.header.subheader.show,
          },
        ],
      },
      ...(config.header.subheader.show
        ? [
            {
              title: 'Subheader Content',
              controls: [
                {
                  id: 'header.subheaderContent',
                  type: 'text' as const,
                  label: 'Text',
                  value: config.header.subheaderContent,
                  placeholder: 'Subheader text...',
                },
              ],
            },
            {
              title: 'Subheader Typography',
              controls: [
                {
                  id: 'header.subheader.size',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.header.subheader.size,
                  options: [...TEXT_SIZE_OPTIONS],
                },
                {
                  id: 'header.subheader.weight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: config.header.subheader.weight,
                  options: [...WEIGHT_OPTIONS],
                },
                {
                  id: 'header.subheader.color',
                  type: 'color-select' as const,
                  label: 'Color',
                  value: config.header.subheader.color,
                  options: [...TEXT_COLOR_OPTIONS],
                },
              ],
            },
          ]
        : []),
    ],
  }
}

function buildContentTopSection(config: ModalPlaygroundConfig): Section {
  return {
    id: 'contentTop',
    label: 'Content A',
    title: 'Content Section A',
    groups: [
      {
        title: 'Visibility',
        controls: [
          {
            id: 'contentTop.show',
            type: 'toggle',
            label: 'Show Section',
            value: config.contentTop.show,
          },
        ],
      },
      ...(config.contentTop.show
        ? [
            {
              title: 'Layout',
              controls: [
                {
                  id: 'contentTop.height',
                  type: 'slider' as const,
                  label: 'Height',
                  value: config.contentTop.height,
                  min: 24,
                  max: 120,
                  step: 8,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'contentTop.lineCount',
                  type: 'slider' as const,
                  label: 'Lines',
                  value: config.contentTop.lineCount,
                  min: 1,
                  max: 6,
                  step: 1,
                  formatLabel: (v: number) => `${v}`,
                },
                {
                  id: 'contentTop.lineGap',
                  type: 'slider' as const,
                  label: 'Line Gap',
                  value: config.contentTop.lineGap,
                  min: 4,
                  max: 16,
                  step: 2,
                  formatLabel: (v: number) => `${v}px`,
                },
              ],
            },
            {
              title: 'Typography',
              controls: [
                {
                  id: 'contentTop.text.size',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.contentTop.text.size,
                  options: [...TEXT_SIZE_OPTIONS],
                },
                {
                  id: 'contentTop.text.weight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: config.contentTop.text.weight,
                  options: [...WEIGHT_OPTIONS],
                },
                {
                  id: 'contentTop.text.color',
                  type: 'color-select' as const,
                  label: 'Color',
                  value: config.contentTop.text.color,
                  options: [...TEXT_COLOR_OPTIONS],
                },
              ],
            },
          ]
        : []),
    ],
  }
}

function buildContentBottomSection(config: ModalPlaygroundConfig): Section {
  return {
    id: 'contentBottom',
    label: 'Content B',
    title: 'Content Section B',
    groups: [
      {
        title: 'Visibility',
        controls: [
          {
            id: 'contentBottom.show',
            type: 'toggle',
            label: 'Show Section',
            value: config.contentBottom.show,
          },
        ],
      },
      ...(config.contentBottom.show
        ? [
            {
              title: 'Layout',
              controls: [
                {
                  id: 'contentBottom.height',
                  type: 'slider' as const,
                  label: 'Height',
                  value: config.contentBottom.height,
                  min: 24,
                  max: 120,
                  step: 8,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'contentBottom.lineCount',
                  type: 'slider' as const,
                  label: 'Lines',
                  value: config.contentBottom.lineCount,
                  min: 1,
                  max: 6,
                  step: 1,
                  formatLabel: (v: number) => `${v}`,
                },
                {
                  id: 'contentBottom.lineGap',
                  type: 'slider' as const,
                  label: 'Line Gap',
                  value: config.contentBottom.lineGap,
                  min: 4,
                  max: 16,
                  step: 2,
                  formatLabel: (v: number) => `${v}px`,
                },
              ],
            },
            {
              title: 'Typography',
              controls: [
                {
                  id: 'contentBottom.text.size',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.contentBottom.text.size,
                  options: [...TEXT_SIZE_OPTIONS],
                },
                {
                  id: 'contentBottom.text.weight',
                  type: 'select' as const,
                  label: 'Weight',
                  value: config.contentBottom.text.weight,
                  options: [...WEIGHT_OPTIONS],
                },
                {
                  id: 'contentBottom.text.color',
                  type: 'color-select' as const,
                  label: 'Color',
                  value: config.contentBottom.text.color,
                  options: [...TEXT_COLOR_OPTIONS],
                },
              ],
            },
          ]
        : []),
    ],
  }
}

function buildProCardSection(config: ModalPlaygroundConfig): Section {
  const proCard = config.proCard
  return {
    id: 'proCard',
    label: 'Pro Card',
    title: 'Pro Card Styling',
    groups: [
      {
        title: 'Content',
        controls: [
          {
            id: 'proCard.title',
            type: 'text',
            label: 'Title',
            value: proCard.title,
            placeholder: 'Pro',
          },
          {
            id: 'proCard.multiplier',
            type: 'slider',
            label: 'Multiplier',
            value: proCard.multiplier,
            min: 2,
            max: 10,
            step: 1,
            formatLabel: (v: number) => `${v}x`,
          },
          {
            id: 'proCard.height',
            type: 'slider',
            label: 'Height',
            value: proCard.height,
            min: 40,
            max: 300,
            step: 8,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Typography',
        controls: [
          {
            id: 'proCard.text.fontSize',
            type: 'slider',
            label: 'Font Size',
            value: proCard.text?.fontSize === 'auto' ? 36 : (proCard.text?.fontSize ?? 36),
            min: 20,
            max: 72,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'proCard.text.fontWeight',
            type: 'select',
            label: 'Font Weight',
            value: proCard.text?.fontWeight ?? '700',
            options: [...PRO_CARD_FONT_WEIGHT_OPTIONS],
          },
          {
            id: 'proCard.text.letterSpacing',
            type: 'slider',
            label: 'Letter Spacing',
            value: proCard.text?.letterSpacing ?? -0.02,
            min: -0.1,
            max: 0.1,
            step: 0.01,
            formatLabel: (v: number) => `${v.toFixed(2)}em`,
          },
        ],
      },
      {
        title: 'Colors',
        controls: [
          {
            id: 'proCard.text.titleGradient',
            type: 'select',
            label: 'Title Color',
            value: proCard.text?.titleGradient ?? proCard.gradient ?? 'arcade-blue',
            options: [...PRO_CARD_TEXT_STYLE_OPTIONS],
          },
          {
            id: 'proCard.text.multiplierGradient',
            type: 'select',
            label: 'Multiplier Color',
            value: proCard.text?.multiplierGradient ?? proCard.gradient ?? 'arcade-blue',
            options: [...PRO_CARD_TEXT_STYLE_OPTIONS],
          },
        ],
      },
      {
        title: 'Container',
        controls: [
          {
            id: 'proCard.container.background',
            type: 'color-select',
            label: 'Background',
            value: proCard.container.background,
            options: [...PRO_CARD_BACKGROUND_OPTIONS],
          },
          {
            id: 'proCard.container.shine',
            type: 'select',
            label: 'Shine',
            value: proCard.container.shine,
            options: [...SHINE_OPTIONS],
          },
          {
            id: 'proCard.container.borderRadius',
            type: 'slider',
            label: 'Radius',
            value: proCard.container.borderRadius,
            min: 0,
            max: 24,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'proCard.container.padding',
            type: 'slider',
            label: 'Padding',
            value: proCard.container.padding,
            min: 8,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Glow',
        controls: [
          {
            id: 'proCard.glow.enabled',
            type: 'toggle',
            label: 'Enable Glow',
            value: proCard.glow.enabled,
          },
          ...(proCard.glow.enabled
            ? [
                {
                  id: 'proCard.glow.hideOnMobile',
                  type: 'toggle' as const,
                  label: 'Hide on Mobile',
                  value: proCard.glow.hideOnMobile,
                },
                {
                  id: 'proCard.glow.color',
                  type: 'color-select' as const,
                  label: 'Color',
                  value: proCard.glow.color,
                  options: [...GLOW_COLOR_OPTIONS],
                },
                {
                  id: 'proCard.glow.blur',
                  type: 'slider' as const,
                  label: 'Blur',
                  value: proCard.glow.blur,
                  min: 8,
                  max: 48,
                  step: 4,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'proCard.glow.opacity',
                  type: 'slider' as const,
                  label: 'Opacity',
                  value: proCard.glow.opacity,
                  min: 0,
                  max: 100,
                  step: 10,
                  formatLabel: (v: number) => `${v}%`,
                },
              ]
            : []),
        ],
      },
    ],
  }
}

function buildChecklistSection(config: ModalPlaygroundConfig): Section {
  const checklist = config.checklist
  return {
    id: 'checklist',
    label: 'Checklist',
    title: 'Checklist Styling',
    groups: [
      {
        title: 'Content',
        controls: [
          {
            id: 'checklist.title',
            type: 'text',
            label: 'Title',
            value: checklist.title,
            placeholder: 'Checklist title...',
          },
        ],
      },
      {
        title: 'Items',
        controls: [
          {
            id: 'checklist.items.0',
            type: 'text',
            label: 'Item 1',
            value: checklist.items[0] ?? '',
            placeholder: 'First item...',
          },
          {
            id: 'checklist.items.1',
            type: 'text',
            label: 'Item 2',
            value: checklist.items[1] ?? '',
            placeholder: 'Second item...',
          },
          {
            id: 'checklist.items.2',
            type: 'text',
            label: 'Item 3',
            value: checklist.items[2] ?? '',
            placeholder: 'Third item...',
          },
        ],
      },
      {
        title: 'Title Typography',
        controls: [
          {
            id: 'checklist.titleSize',
            type: 'select',
            label: 'Size',
            value: checklist.titleSize,
            options: [...TEXT_SIZE_OPTIONS],
          },
          {
            id: 'checklist.titleWeight',
            type: 'select',
            label: 'Weight',
            value: checklist.titleWeight,
            options: [...WEIGHT_OPTIONS],
          },
          {
            id: 'checklist.titleColor',
            type: 'color-select',
            label: 'Color',
            value: checklist.titleColor,
            options: [...TEXT_COLOR_OPTIONS].slice(0, 3), // Only primary, secondary, tertiary
          },
        ],
      },
      {
        title: 'Item Typography',
        controls: [
          {
            id: 'checklist.itemSize',
            type: 'select',
            label: 'Size',
            value: checklist.itemSize,
            options: [...TEXT_SIZE_OPTIONS],
          },
          {
            id: 'checklist.itemWeight',
            type: 'select',
            label: 'Weight',
            value: checklist.itemWeight,
            options: [...WEIGHT_OPTIONS],
          },
          {
            id: 'checklist.itemColor',
            type: 'color-select',
            label: 'Color',
            value: checklist.itemColor,
            options: [...TEXT_COLOR_OPTIONS].slice(0, 3),
          },
          {
            id: 'checklist.checkColor',
            type: 'color-select',
            label: 'Check Color',
            value: checklist.checkColor,
            options: [...TEXT_COLOR_OPTIONS].slice(0, 3),
          },
        ],
      },
      {
        title: 'Spacing',
        controls: [
          {
            id: 'checklist.gap',
            type: 'slider',
            label: 'Gap',
            value: checklist.gap,
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

function buildButtonsSection(config: ModalPlaygroundConfig): Section {
  return {
    id: 'buttons',
    label: 'Buttons',
    title: 'Action Buttons',
    groups: [
      {
        title: 'Button Count',
        controls: [
          {
            id: 'buttons.buttonCount',
            type: 'select',
            label: 'Count',
            value: String(config.buttons.buttonCount),
            options: [...BUTTON_COUNT_OPTIONS],
          },
        ],
      },
      {
        title: 'Primary Button',
        controls: [
          {
            id: 'buttons.primary.variant',
            type: 'select',
            label: 'Variant',
            value: config.buttons.primary.variant,
            options: [...BUTTON_VARIANT_OPTIONS],
          },
          {
            id: 'buttons.primary.size',
            type: 'select',
            label: 'Size',
            value: config.buttons.primary.size,
            options: [...BUTTON_SIZE_OPTIONS],
          },
          {
            id: 'buttons.primary.label',
            type: 'text',
            label: 'Label',
            value: config.buttons.primary.label,
            placeholder: 'Button text...',
          },
        ],
      },
      ...(config.buttons.buttonCount === 2
        ? [
            {
              title: 'Secondary Button',
              controls: [
                {
                  id: 'buttons.secondary.variant',
                  type: 'select' as const,
                  label: 'Variant',
                  value: config.buttons.secondary.variant,
                  options: [...BUTTON_VARIANT_OPTIONS],
                },
                {
                  id: 'buttons.secondary.size',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.buttons.secondary.size,
                  options: [...BUTTON_SIZE_OPTIONS],
                },
                {
                  id: 'buttons.secondary.label',
                  type: 'text' as const,
                  label: 'Label',
                  value: config.buttons.secondary.label,
                  placeholder: 'Button text...',
                },
              ],
            },
          ]
        : []),
      {
        title: 'Layout',
        controls: [
          {
            id: 'buttons.layout',
            type: 'select',
            label: 'Direction',
            value: config.buttons.layout,
            options: [...BUTTON_LAYOUT_OPTIONS],
          },
          {
            id: 'buttons.gap',
            type: 'slider',
            label: 'Gap',
            value: config.buttons.gap,
            min: 4,
            max: 24,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'buttons.buttonRadius',
            type: 'select',
            label: 'Corner Radius',
            value: config.buttons.buttonRadius,
            options: [...BUTTON_RADIUS_OPTIONS],
          },
        ],
      },
      {
        title: 'Fluid Animations',
        controls: [
          {
            id: 'buttons.fluid.enabled',
            type: 'toggle',
            label: 'Enable Fluid',
            value: config.buttons.fluid.enabled,
          },
        ],
      },
      ...(config.buttons.fluid.enabled
        ? [
            {
              title: 'Fluid Timing',
              controls: [
                {
                  id: 'buttons.fluid.timing',
                  type: 'select' as const,
                  label: 'Preset',
                  value: config.buttons.fluid.timing,
                  options: [...FLUID_TIMING_OPTIONS],
                },
                {
                  id: 'buttons.fluid.gap',
                  type: 'slider' as const,
                  label: 'Gap',
                  value: config.buttons.fluid.gap,
                  min: 4,
                  max: 24,
                  step: 4,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'buttons.fluid.exitBlur',
                  type: 'toggle' as const,
                  label: 'Exit Blur',
                  value: config.buttons.fluid.exitBlur,
                },
              ],
            },
            {
              title: 'State Transitions',
              controls: [
                {
                  id: 'buttons.fluid.checkmarkStyle',
                  type: 'select' as const,
                  label: 'Checkmark Style',
                  value: config.buttons.fluid.checkmarkStyle,
                  options: [...CHECKMARK_STYLE_OPTIONS],
                },
                {
                  id: 'buttons.fluid.textSlideDuration',
                  type: 'slider' as const,
                  label: 'Text Slide',
                  value: config.buttons.fluid.textSlideDuration,
                  min: 100,
                  max: 400,
                  step: 25,
                  formatLabel: (v: number) => `${v}ms`,
                },
                {
                  id: 'buttons.fluid.checkmarkDrawDuration',
                  type: 'slider' as const,
                  label: 'Checkmark Draw',
                  value: config.buttons.fluid.checkmarkDrawDuration,
                  min: 150,
                  max: 500,
                  step: 25,
                  formatLabel: (v: number) => `${v}ms`,
                },
              ],
            },
          ]
        : []),
    ],
  }
}

function buildCloseButtonSection(config: ModalPlaygroundConfig): Section {
  return {
    id: 'closeButton',
    label: 'Close',
    title: 'Close Button',
    groups: [
      {
        title: 'Visibility',
        controls: [
          {
            id: 'closeButton.show',
            type: 'toggle',
            label: 'Show Close',
            value: config.closeButton.show,
          },
        ],
      },
      ...(config.closeButton.show
        ? [
            {
              title: 'Position',
              controls: [
                {
                  id: 'closeButton.position',
                  type: 'select' as const,
                  label: 'Position',
                  value: config.closeButton.position,
                  options: [...CLOSE_BUTTON_POSITION_OPTIONS],
                },
                {
                  id: 'closeButton.offset',
                  type: 'slider' as const,
                  label: 'Offset',
                  value: config.closeButton.offset,
                  min: 8,
                  max: 32,
                  step: 4,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'closeButton.size',
                  type: 'select' as const,
                  label: 'Size',
                  value: config.closeButton.size,
                  options: [...CLOSE_BUTTON_SIZE_OPTIONS],
                },
              ],
            },
            {
              title: 'Icon',
              controls: [
                {
                  id: 'closeButton.iconStrokeWidth',
                  type: 'select' as const,
                  label: 'Stroke',
                  value: String(config.closeButton.iconStrokeWidth),
                  options: [...ICON_STROKE_WIDTH_OPTIONS],
                },
                {
                  id: 'closeButton.iconColor',
                  type: 'color-select' as const,
                  label: 'Color',
                  value: config.closeButton.iconColor,
                  options: [...TEXT_COLOR_OPTIONS],
                },
              ],
            },
            {
              title: 'Background',
              controls: [
                {
                  id: 'closeButton.backgroundMode',
                  type: 'select' as const,
                  label: 'Mode',
                  value: config.closeButton.backgroundMode,
                  options: [...BACKGROUND_MODE_OPTIONS],
                },
              ],
            },
            ...(config.closeButton.backgroundMode !== 'none'
              ? [
                  {
                    title: 'Background Style',
                    controls: [
                      {
                        id: 'closeButton.backgroundColor',
                        type: 'color-select' as const,
                        label: 'Color',
                        value: config.closeButton.backgroundColor,
                        options: [...CLOSE_BUTTON_BG_COLOR_OPTIONS],
                      },
                      {
                        id: 'closeButton.backgroundOpacity',
                        type: 'slider' as const,
                        label: 'Opacity',
                        value: config.closeButton.backgroundOpacity,
                        min: 0,
                        max: 100,
                        step: 10,
                        formatLabel: (v: number) => `${v}%`,
                      },
                      {
                        id: 'closeButton.backgroundRadius',
                        type: 'select' as const,
                        label: 'Radius',
                        value: config.closeButton.backgroundRadius,
                        options: [...CLOSE_BUTTON_RADIUS_OPTIONS],
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

function buildBackdropSection(config: ModalPlaygroundConfig): Section {
  return {
    id: 'backdrop',
    label: 'Backdrop',
    title: 'Backdrop Effects',
    groups: [
      {
        title: 'Visual Effects',
        controls: [
          {
            id: 'backdrop.blur',
            type: 'slider',
            label: 'Blur',
            value: config.backdrop.blur,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'backdrop.opacity',
            type: 'slider',
            label: 'Opacity',
            value: config.backdrop.opacity,
            min: 0,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
      {
        title: 'Behavior',
        controls: [
          {
            id: 'backdrop.dismissable',
            type: 'toggle',
            label: 'Click to Dismiss',
            value: config.backdrop.dismissable,
          },
        ],
      },
    ],
  }
}

function buildAnimationSection(config: ModalPlaygroundConfig): Section {
  const isSynced = config.animation.syncMode === 'synced'

  return {
    id: 'animation',
    label: 'Animation',
    title: 'Animation Settings',
    groups: [
      {
        title: 'Entry/Exit',
        controls: [
          {
            id: 'animation.preset',
            type: 'select',
            label: 'Preset',
            value: config.animation.preset,
            options: [...ANIMATION_PRESET_OPTIONS],
          },
        ],
      },
      {
        title: 'Animation Sync',
        controls: [
          {
            id: 'animation.syncMode',
            type: 'select',
            label: 'Mode',
            value: config.animation.syncMode,
            options: [...ANIMATION_SYNC_MODE_OPTIONS],
          },
        ],
      },
      // Master timing controls (only when synced)
      ...(isSynced
        ? [
            {
              title: 'Master Timing',
              controls: [
                {
                  id: 'animation.master.duration',
                  type: 'slider' as const,
                  label: 'Duration',
                  value: config.animation.master.duration,
                  min: 0.15,
                  max: 0.8,
                  step: 0.05,
                  formatLabel: (v: number) => `${v.toFixed(2)}s`,
                },
                {
                  id: 'animation.master.bounce',
                  type: 'slider' as const,
                  label: 'Bounce',
                  value: config.animation.master.bounce,
                  min: 0,
                  max: 0.4,
                  step: 0.02,
                  formatLabel: (v: number) => v.toFixed(2),
                },
                {
                  id: 'animation.master.stagger',
                  type: 'slider' as const,
                  label: 'Line Stagger',
                  value: config.animation.master.stagger,
                  min: 0,
                  max: 0.1,
                  step: 0.005,
                  formatLabel: (v: number) => `${Math.round(v * 1000)}ms`,
                },
              ],
            },
          ]
        : [
            // Independent timing controls
            {
              title: 'Timing',
              controls: [
                {
                  id: 'animation.duration',
                  type: 'slider' as const,
                  label: 'Duration',
                  value: config.animation.duration,
                  min: 100,
                  max: 800,
                  step: 50,
                  formatLabel: (v: number) => `${v}ms`,
                },
                {
                  id: 'animation.bounce',
                  type: 'slider' as const,
                  label: 'Bounce',
                  value: config.animation.bounce,
                  min: 0,
                  max: 0.5,
                  step: 0.05,
                  formatLabel: (v: number) => v.toFixed(2),
                },
                {
                  id: 'animation.delay',
                  type: 'slider' as const,
                  label: 'Delay',
                  value: config.animation.delay,
                  min: 0,
                  max: 300,
                  step: 25,
                  formatLabel: (v: number) => `${v}ms`,
                },
              ],
            },
          ]),
      // Custom preset controls (only when independent and using custom preset)
      ...(!isSynced && config.animation.preset === 'custom'
        ? [
            {
              title: 'Custom Scale',
              controls: [
                {
                  id: 'animation.scale.initial',
                  type: 'slider' as const,
                  label: 'Initial Scale',
                  value: config.animation.scale.initial,
                  min: 0.5,
                  max: 1.2,
                  step: 0.05,
                  formatLabel: (v: number) => v.toFixed(2),
                },
                {
                  id: 'animation.scale.animate',
                  type: 'slider' as const,
                  label: 'Final Scale',
                  value: config.animation.scale.animate,
                  min: 0.8,
                  max: 1.2,
                  step: 0.05,
                  formatLabel: (v: number) => v.toFixed(2),
                },
              ],
            },
            {
              title: 'Custom Translate Y',
              controls: [
                {
                  id: 'animation.translateY.initial',
                  type: 'slider' as const,
                  label: 'Initial Y',
                  value: config.animation.translateY.initial,
                  min: -200,
                  max: 200,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'animation.translateY.animate',
                  type: 'slider' as const,
                  label: 'Final Y',
                  value: config.animation.translateY.animate,
                  min: -100,
                  max: 100,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
              ],
            },
          ]
        : []),
      // Layout morphing controls (only when independent)
      ...(!isSynced
        ? [
            {
              title: 'Layout Morphing',
              controls: [
                {
                  id: 'animation.layout.style',
                  type: 'select' as const,
                  label: 'Style',
                  value: config.animation.layout.style,
                  options: [...LAYOUT_ANIMATION_STYLE_OPTIONS],
                },
                {
                  id: 'animation.layout.duration',
                  type: 'slider' as const,
                  label: 'Duration',
                  value: config.animation.layout.duration,
                  min: 0.1,
                  max: 1.0,
                  step: 0.05,
                  formatLabel: (v: number) => `${v.toFixed(2)}s`,
                },
                ...(config.animation.layout.style === 'spring'
                  ? [
                      {
                        id: 'animation.layout.bounce',
                        type: 'slider' as const,
                        label: 'Bounce',
                        value: config.animation.layout.bounce,
                        min: 0,
                        max: 0.5,
                        step: 0.05,
                        formatLabel: (v: number) => v.toFixed(2),
                      },
                    ]
                  : [
                      {
                        id: 'animation.layout.easing',
                        type: 'select' as const,
                        label: 'Easing',
                        value: config.animation.layout.easing,
                        options: [...LAYOUT_EASING_OPTIONS],
                      },
                    ]),
              ],
            },
          ]
        : []),
    ],
  }
}

function buildTextTransitionSection(config: ModalPlaygroundConfig): Section {
  const isSynced = config.animation.syncMode === 'synced'
  const isEnabled = config.textTransition.enabled

  return {
    id: 'textTransition',
    label: 'Text',
    title: 'Text Transitions',
    groups: [
      {
        title: 'Animation',
        controls: [
          {
            id: 'textTransition.enabled',
            type: 'toggle',
            label: 'Enable Animation',
            value: config.textTransition.enabled,
          },
        ],
      },
      ...(isEnabled
        ? [
            {
              title: 'Mode',
              controls: [
                {
                  id: 'textTransition.mode',
                  type: 'select' as const,
                  label: 'Mode',
                  value: config.textTransition.mode,
                  options: [...TEXT_TRANSITION_MODE_OPTIONS],
                },
              ],
            },
            {
              title: 'Settings',
              controls: [
                {
                  id: 'textTransition.yOffset',
                  type: 'slider' as const,
                  label: 'Y Offset',
                  value: config.textTransition.yOffset,
                  min: 4,
                  max: 20,
                  step: 2,
                  formatLabel: (v: number) => `${v}px`,
                },
                // When synced, show info that timing uses master config
                // When independent, show easing and duration controls
                ...(isSynced
                  ? [
                      {
                        id: 'textTransition.easing',
                        type: 'select' as const,
                        label: 'Timing',
                        value: 'spring',
                        options: [{ label: 'Using master timing', value: 'spring' }],
                        disabled: true,
                      },
                    ]
                  : [
                      {
                        id: 'textTransition.easing',
                        type: 'select' as const,
                        label: 'Easing',
                        value: config.textTransition.easing,
                        options: [...TEXT_EASING_OPTIONS],
                      },
                      ...(config.textTransition.easing !== 'spring'
                        ? [
                            {
                              id: 'textTransition.duration',
                              type: 'slider' as const,
                              label: 'Duration',
                              value: config.textTransition.duration,
                              min: 100,
                              max: 400,
                              step: 25,
                              formatLabel: (v: number) => `${v}ms`,
                            },
                          ]
                        : []),
                    ]),
              ],
            },
          ]
        : []),
    ],
  }
}

function buildStagesSection(config: ModalPlaygroundConfig): Section {
  // Build groups for each stage (1-4) with nested Content A/B/Buttons
  const stageGroups: ControlGroup[] = STAGE_IDS.map((stageId) => {
    const stage = config.stages[stageId]
    const prefix = `stages.${stageId}`

    return {
      title: STAGE_LABELS[stageId],
      defaultCollapsed: stageId !== 1,
      // Title and subheader fields stay inline in parent
      controls: [
        {
          id: `${prefix}.headerTitle`,
          type: 'text',
          label: 'Title',
          value: stage.headerTitle,
          placeholder: 'Modal title...',
        },
        ...(config.header.subheader.show
          ? [
              {
                id: `${prefix}.headerSubheader`,
                type: 'text' as const,
                label: 'Subheader',
                value: stage.headerSubheader ?? config.header.subheaderContent,
                placeholder: 'Subheader text...',
              },
            ]
          : []),
      ],
      // Content A, Content B, and Buttons as nested accordions
      nestedGroups: [
        // Content A
        {
          title: 'Content A',
          defaultCollapsed: true,
          controls: [
            {
              id: `${prefix}.contentA.show`,
              type: 'toggle',
              label: 'Show',
              value: stage.contentA.show !== false,
            },
            {
              id: `${prefix}.contentA.type`,
              type: 'select',
              label: 'Type',
              value: stage.contentA.type,
              options: [...CONTENT_TYPE_OPTIONS],
            },
            {
              id: `${prefix}.contentA.height`,
              type: 'slider',
              label: 'Height',
              value: stage.contentA.height,
              min: 16,
              max: 300,
              step: 8,
              formatLabel: (v: number) => `${v}px`,
            },
            // Wireframe-specific controls
            ...(stage.contentA.type === 'wireframe'
              ? [
                  {
                    id: `${prefix}.contentA.lineCount`,
                    type: 'slider' as const,
                    label: 'Lines',
                    value: stage.contentA.lineCount ?? 3,
                    min: 1,
                    max: 6,
                    step: 1,
                    formatLabel: (v: number) => `${v}`,
                  },
                ]
              : stage.contentA.type === 'text'
                ? [
                    {
                      id: `${prefix}.contentA.text`,
                      type: 'text' as const,
                      label: 'Text',
                      value: stage.contentA.text ?? '',
                      placeholder: 'Enter content text...',
                    },
                  ]
                : []),
            // Pro Card uses global config from Pro Card section
          ],
        },
        // Content B
        {
          title: 'Content B',
          defaultCollapsed: true,
          controls: [
            {
              id: `${prefix}.contentB.show`,
              type: 'toggle',
              label: 'Show',
              value: stage.contentB.show !== false,
            },
            {
              id: `${prefix}.contentB.type`,
              type: 'select',
              label: 'Type',
              value: stage.contentB.type,
              options: [...CONTENT_TYPE_OPTIONS],
            },
            {
              id: `${prefix}.contentB.height`,
              type: 'slider',
              label: 'Height',
              value: stage.contentB.height,
              min: 16,
              max: 300,
              step: 8,
              formatLabel: (v: number) => `${v}px`,
            },
            // Wireframe-specific controls
            ...(stage.contentB.type === 'wireframe'
              ? [
                  {
                    id: `${prefix}.contentB.lineCount`,
                    type: 'slider' as const,
                    label: 'Lines',
                    value: stage.contentB.lineCount ?? 2,
                    min: 1,
                    max: 6,
                    step: 1,
                    formatLabel: (v: number) => `${v}`,
                  },
                ]
              : stage.contentB.type === 'text'
                ? [
                    {
                      id: `${prefix}.contentB.text`,
                      type: 'text' as const,
                      label: 'Text',
                      value: stage.contentB.text ?? '',
                      placeholder: 'Enter content text...',
                    },
                  ]
                : []),
            // Pro Card uses global config from Pro Card section
          ],
        },
        // Buttons
        {
          title: 'Buttons',
          defaultCollapsed: true,
          controls: [
            // Primary button state controls
            {
              id: `${prefix}.buttons.primary.text`,
              type: 'text',
              label: 'Primary Text',
              value: stage.buttons.primary.text,
              placeholder: 'Primary button...',
            },
            {
              id: `${prefix}.buttons.primary.showText`,
              type: 'toggle',
              label: 'Show Text',
              value: stage.buttons.primary.showText,
            },
            {
              id: `${prefix}.buttons.primary.showSpinner`,
              type: 'toggle',
              label: 'Show Spinner',
              value: stage.buttons.primary.showSpinner,
            },
            {
              id: `${prefix}.buttons.primary.showCheckmark`,
              type: 'toggle',
              label: 'Show Checkmark',
              value: stage.buttons.primary.showCheckmark,
            },
            // Secondary button (null = hidden)
            {
              id: `${prefix}.buttons.secondary`,
              type: 'text',
              label: 'Secondary',
              value: stage.buttons.secondary ?? '',
              placeholder: 'Leave empty to hide',
            },
          ],
        },
        // Layout
        {
          title: 'Layout',
          defaultCollapsed: true,
          controls: [
            {
              id: `${prefix}.pushButtonsToBottom`,
              type: 'toggle',
              label: 'Push Buttons to Bottom',
              value: stage.pushButtonsToBottom ?? config.container.pushButtonsToBottom,
            },
          ],
        },
        // Asset (per-stage coin stack state)
        ...(config.header.showAsset && config.header.asset?.type === 'coin-stack'
          ? [
              {
                title: 'Asset',
                defaultCollapsed: true,
                controls: [
                  {
                    id: `${prefix}.asset.coinStackStateId`,
                    type: 'select' as const,
                    label: 'Coin State',
                    value: String(stage.asset?.coinStackStateId ?? config.header.asset?.coinStack?.stateId ?? 1),
                    options: [...COIN_STACK_STATE_OPTIONS],
                  },
                ],
              },
            ]
          : []),
      ],
    }
  })

  return {
    id: 'stages',
    label: 'Stages',
    title: 'Per-Stage Content',
    groups: stageGroups,
  }
}

function buildDemoSection(config: ModalPlaygroundConfig): Section {
  return {
    id: 'demo',
    label: 'Debug',
    title: 'Debug Settings',
    groups: [
      {
        title: 'Page',
        controls: [
          {
            id: 'demo.pageBackground',
            type: 'color-select',
            label: 'Background',
            value: config.demo.pageBackground,
            options: [...PAGE_BACKGROUND_OPTIONS],
          },
        ],
      },
      {
        title: 'Debug Options',
        controls: [
          {
            id: 'demo.showDebug',
            type: 'toggle',
            label: 'Show Debug',
            value: config.demo.showDebug,
          },
          {
            id: 'demo.slowMo',
            type: 'toggle',
            label: 'Slow Motion (4x)',
            value: config.demo.slowMo,
          },
          {
            id: 'demo.autoOpen',
            type: 'toggle',
            label: 'Auto Open',
            value: config.demo.autoOpen,
          },
          {
            id: 'demo.showContainerOutlines',
            type: 'toggle',
            label: 'Show Outlines',
            value: config.demo.showContainerOutlines,
          },
        ],
      },
    ],
  }
}
