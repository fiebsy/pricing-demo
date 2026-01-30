/**
 * Radial Blur Control Panel Configuration
 */

import type {
  PanelConfig,
  Section,
} from '@/components/ui/patterns/control-panel'
import type { RadialBlurConfig, RadialBlurPresetMeta } from '../config/types'
import { STATE_OPTIONS, BG_COLOR_OPTIONS, SHINE_STYLE_OPTIONS } from '../config/options'

export function buildRadialBlurPanelConfig(
  config: RadialBlurConfig,
  presets: RadialBlurPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildDemoSection(config),
      buildLayoutSection(config),
      buildHeightSection(config),
      buildStyleSection(config),
      buildMessagesSection(config),
      buildInputSection(config),
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

function buildDemoSection(config: RadialBlurConfig): Section {
  return {
    id: 'demo',
    label: 'Demo',
    title: 'Demo Controls',
    groups: [
      {
        title: 'State',
        controls: [
          {
            id: 'demoState',
            type: 'select',
            label: 'Current State',
            value: config.demoState,
            options: [...STATE_OPTIONS],
          },
          {
            id: 'height.default',
            type: 'slider',
            label: 'Default Height',
            value: config.height.default,
            min: 10,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
    ],
  }
}

function buildLayoutSection(config: RadialBlurConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Chat Layout',
    groups: [
      {
        title: 'Dimensions',
        controls: [
          {
            id: 'layout.maxWidth',
            type: 'slider',
            label: 'Chat Width',
            value: config.layout.maxWidth,
            min: 400,
            max: 1200,
            step: 50,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildHeightSection(config: RadialBlurConfig): Section {
  return {
    id: 'height',
    label: 'Height',
    title: 'Blur Height Coverage',
    groups: [
      {
        title: 'Coverage by State',
        controls: [
          {
            id: 'height.default',
            type: 'slider',
            label: 'Default State',
            value: config.height.default,
            min: 10,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
          {
            id: 'height.expanded',
            type: 'slider',
            label: 'Expanded State',
            value: config.height.expanded,
            min: 50,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
      {
        title: 'Fade',
        controls: [
          {
            id: 'height.fadeEdge',
            type: 'slider',
            label: 'Fade Softness',
            value: config.height.fadeEdge,
            min: 10,
            max: 80,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
    ],
  }
}

function buildStyleSection(config: RadialBlurConfig): Section {
  return {
    id: 'style',
    label: 'Style',
    title: 'Visual Style',
    groups: [
      {
        title: 'Blur Effect',
        controls: [
          {
            id: 'style.blurAmount',
            type: 'slider',
            label: 'Blur Amount',
            value: config.style.blurAmount,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'style.overlayOpacity',
            type: 'slider',
            label: 'Overlay Opacity',
            value: config.style.overlayOpacity,
            min: 0,
            max: 50,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
      {
        title: 'Shape',
        controls: [
          {
            id: 'style.ellipseWidth',
            type: 'slider',
            label: 'Ellipse Width',
            value: config.style.ellipseWidth,
            min: 150,
            max: 500,
            step: 25,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
    ],
  }
}

function buildMessagesSection(config: RadialBlurConfig): Section {
  return {
    id: 'messages',
    label: 'Messages',
    title: 'Message Bubbles',
    groups: [
      {
        title: 'Blur Effect',
        controls: [
          {
            id: 'messages.useBlurBubbles',
            type: 'toggle',
            label: 'Enable Blur Bubbles',
            value: config.messages.useBlurBubbles,
          },
          {
            id: 'messages.bubbleBlur',
            type: 'slider',
            label: 'Bubble Blur',
            value: config.messages.bubbleBlur,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Assistant Bubble',
        controls: [
          {
            id: 'messages.bubbleBgColor',
            type: 'select',
            label: 'Background',
            value: config.messages.bubbleBgColor,
            options: [...BG_COLOR_OPTIONS],
          },
          {
            id: 'messages.bubbleOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.messages.bubbleOpacity,
            min: 10,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
      {
        title: 'User Bubble',
        controls: [
          {
            id: 'messages.userBubbleBgColor',
            type: 'select',
            label: 'Background',
            value: config.messages.userBubbleBgColor,
            options: [...BG_COLOR_OPTIONS],
          },
          {
            id: 'messages.userBubbleOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.messages.userBubbleOpacity,
            min: 10,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
      {
        title: 'Scroll Fade',
        controls: [
          {
            id: 'messages.fadeTopHeight',
            type: 'slider',
            label: 'Top Fade Height',
            value: config.messages.fadeTopHeight,
            min: 60,
            max: 240,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'messages.fadeBottomHeight',
            type: 'slider',
            label: 'Bottom Fade Height',
            value: config.messages.fadeBottomHeight,
            min: 20,
            max: 120,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Bubble Shape',
        controls: [
          {
            id: 'messages.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.messages.borderRadius,
            min: 4,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'messages.useAsymmetricCorners',
            type: 'toggle',
            label: 'Asymmetric Corners',
            value: config.messages.useAsymmetricCorners,
          },
          {
            id: 'messages.useSquircle',
            type: 'toggle',
            label: 'Corner Squircle',
            value: config.messages.useSquircle,
          },
          {
            id: 'messages.shineStyle',
            type: 'select',
            label: 'Shine Effect',
            value: config.messages.shineStyle,
            options: [...SHINE_STYLE_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildInputSection(config: RadialBlurConfig): Section {
  return {
    id: 'input',
    label: 'Input',
    title: 'Input Field',
    groups: [
      {
        title: 'Background',
        controls: [
          {
            id: 'input.bgColor',
            type: 'select',
            label: 'Background Color',
            value: config.input.bgColor,
            options: [...BG_COLOR_OPTIONS],
          },
          {
            id: 'input.bgOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.input.bgOpacity,
            min: 10,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
          {
            id: 'input.blurAmount',
            type: 'slider',
            label: 'Blur Amount',
            value: config.input.blurAmount,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Shape',
        controls: [
          {
            id: 'input.minHeight',
            type: 'slider',
            label: 'Min Height',
            value: config.input.minHeight,
            min: 36,
            max: 56,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'input.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.input.borderRadius,
            min: 4,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'input.useSquircle',
            type: 'toggle',
            label: 'Corner Squircle',
            value: config.input.useSquircle,
          },
          {
            id: 'input.shineStyle',
            type: 'select',
            label: 'Shine Effect',
            value: config.input.shineStyle,
            options: [...SHINE_STYLE_OPTIONS],
          },
        ],
      },
      {
        title: 'Focus State',
        controls: [
          {
            id: 'input.showFocusRing',
            type: 'toggle',
            label: 'Show Focus Ring',
            value: config.input.showFocusRing,
          },
          {
            id: 'input.focusShineStyle',
            type: 'select',
            label: 'Focus Shine',
            value: config.input.focusShineStyle,
            options: [...SHINE_STYLE_OPTIONS],
          },
        ],
      },
      {
        title: 'Icon Buttons',
        controls: [
          {
            id: 'input.useButtonUtility',
            type: 'toggle',
            label: 'Use ButtonUtility',
            value: config.input.useButtonUtility,
          },
          {
            id: 'input.showTooltips',
            type: 'toggle',
            label: 'Show Tooltips',
            value: config.input.showTooltips,
          },
          {
            id: 'input.iconSize',
            type: 'slider',
            label: 'Icon Size',
            value: config.input.iconSize,
            min: 14,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'input.iconButtonSize',
            type: 'slider',
            label: 'Button Size',
            value: config.input.iconButtonSize,
            min: 28,
            max: 48,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'input.iconButtonRadius',
            type: 'slider',
            label: 'Button Radius',
            value: config.input.iconButtonRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => v >= 24 ? 'Full' : `${v}px`,
          },
          {
            id: 'input.iconButtonGap',
            type: 'slider',
            label: 'Button Gap',
            value: config.input.iconButtonGap,
            min: 0,
            max: 12,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'input.hoverShineStyle',
            type: 'select',
            label: 'Hover Shine',
            value: config.input.hoverShineStyle,
            options: [...SHINE_STYLE_OPTIONS],
          },
        ],
      },
      {
        title: 'Control Buttons',
        controls: [
          {
            id: 'input.controlButtonsOffsetX',
            type: 'slider',
            label: 'Offset X',
            value: config.input.controlButtonsOffsetX,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'input.controlButtonsGap',
            type: 'slider',
            label: 'Gap',
            value: config.input.controlButtonsGap,
            min: 0,
            max: 12,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'input.controlButtonSize',
            type: 'select',
            label: 'Button Size',
            value: config.input.controlButtonSize,
            options: [
              { label: 'Extra Small', value: 'xs' },
              { label: 'Small', value: 'sm' },
            ],
          },
          {
            id: 'input.controlButtonRadius',
            type: 'slider',
            label: 'Button Radius',
            value: config.input.controlButtonRadius,
            min: 0,
            max: 999,
            step: 4,
            formatLabel: (v: number) => v >= 999 ? 'Full' : `${v}px`,
          },
          {
            id: 'input.controlButtonsReversed',
            type: 'toggle',
            label: 'Reverse Order',
            value: config.input.controlButtonsReversed,
          },
          {
            id: 'input.closeButtonIcon',
            type: 'select',
            label: 'Close Icon',
            value: config.input.closeButtonIcon,
            options: [
              { label: 'Minus Circle', value: 'minus-circle' },
              { label: 'Minus', value: 'minus' },
              { label: 'X', value: 'x' },
              { label: 'X Circle', value: 'x-circle' },
            ],
          },
          {
            id: 'input.expandButtonIcon',
            type: 'select',
            label: 'Expand Icon',
            value: config.input.expandButtonIcon,
            options: [
              { label: 'Expand', value: 'expand' },
              { label: 'Arrows Expand', value: 'arrows-expand' },
              { label: 'Maximize', value: 'maximize' },
            ],
          },
        ],
      },
      {
        title: 'Control Container',
        controls: [
          {
            id: 'input.controlContainerEnabled',
            type: 'toggle',
            label: 'Enable Container',
            value: config.input.controlContainerEnabled,
          },
          {
            id: 'input.controlContainerBgColor',
            type: 'select',
            label: 'Background',
            value: config.input.controlContainerBgColor,
            options: [...BG_COLOR_OPTIONS],
          },
          {
            id: 'input.controlContainerBgOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.input.controlContainerBgOpacity,
            min: 10,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
          {
            id: 'input.controlContainerBlurAmount',
            type: 'slider',
            label: 'Blur',
            value: config.input.controlContainerBlurAmount,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'input.controlContainerBorderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.input.controlContainerBorderRadius,
            min: 0,
            max: 999,
            step: 4,
            formatLabel: (v: number) => v >= 999 ? 'Full' : `${v}px`,
          },
          {
            id: 'input.controlContainerPadding',
            type: 'slider',
            label: 'Padding',
            value: config.input.controlContainerPadding,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'input.controlContainerShineStyle',
            type: 'select',
            label: 'Shine',
            value: config.input.controlContainerShineStyle,
            options: [...SHINE_STYLE_OPTIONS],
          },
          {
            id: 'input.controlContainerUseSquircle',
            type: 'toggle',
            label: 'Corner Squircle',
            value: config.input.controlContainerUseSquircle,
          },
        ],
      },
      {
        title: 'Send Button',
        controls: [
          {
            id: 'input.sendButtonBgColor',
            type: 'select',
            label: 'Background',
            value: config.input.sendButtonBgColor,
            options: [...BG_COLOR_OPTIONS],
          },
          {
            id: 'input.sendButtonOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.input.sendButtonOpacity,
            min: 10,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
    ],
  }
}
