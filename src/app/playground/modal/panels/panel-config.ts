/**
 * Modal Control Panel Configuration
 *
 * Builds the panel config for UnifiedControlPanel
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { ModalPlaygroundConfig, ModalPresetMeta } from '../config/types'
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
      buildButtonsSection(config),
      buildCloseButtonSection(config),
      buildBackdropSection(config),
      buildAnimationSection(config),
      buildTextTransitionSection(config),
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
                  id: 'header.assetHeight',
                  type: 'slider' as const,
                  label: 'Height',
                  value: config.header.assetHeight,
                  min: 32,
                  max: 120,
                  step: 8,
                  formatLabel: (v: number) => `${v}px`,
                },
              ],
            },
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
          {
            id: 'buttons.cornerSquircle',
            type: 'toggle',
            label: 'Corner Squircle',
            value: config.buttons.cornerSquircle,
          },
        ],
      },
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
  return {
    id: 'animation',
    label: 'Animation',
    title: 'Animation Settings',
    groups: [
      {
        title: 'Preset',
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
        title: 'Timing',
        controls: [
          {
            id: 'animation.duration',
            type: 'slider',
            label: 'Duration',
            value: config.animation.duration,
            min: 100,
            max: 800,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.bounce',
            type: 'slider',
            label: 'Bounce',
            value: config.animation.bounce,
            min: 0,
            max: 0.5,
            step: 0.05,
            formatLabel: (v: number) => v.toFixed(2),
          },
          {
            id: 'animation.delay',
            type: 'slider',
            label: 'Delay',
            value: config.animation.delay,
            min: 0,
            max: 300,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      ...(config.animation.preset === 'custom'
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
    ],
  }
}

function buildTextTransitionSection(config: ModalPlaygroundConfig): Section {
  return {
    id: 'textTransition',
    label: 'Text',
    title: 'Text Transitions',
    groups: [
      {
        title: 'Mode',
        controls: [
          {
            id: 'textTransition.mode',
            type: 'select',
            label: 'Mode',
            value: config.textTransition.mode,
            options: [...TEXT_TRANSITION_MODE_OPTIONS],
          },
        ],
      },
      {
        title: 'Animation',
        controls: [
          {
            id: 'textTransition.easing',
            type: 'select',
            label: 'Easing',
            value: config.textTransition.easing,
            options: [...TEXT_EASING_OPTIONS],
          },
          {
            id: 'textTransition.yOffset',
            type: 'slider',
            label: 'Y Offset',
            value: config.textTransition.yOffset,
            min: 4,
            max: 20,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
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
        ],
      },
    ],
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
