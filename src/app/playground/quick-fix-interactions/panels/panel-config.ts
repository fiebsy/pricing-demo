/**
 * Quick Fix Interactions - Panel Configuration
 *
 * Builds the UnifiedControlPanel configuration from the current config.
 *
 * @module playground/quick-fix-interactions/panels
 */

import type { PanelConfig, Section } from '@/components/ui/prod/base/control-panel'
import type { QuickFixInteractionsConfig, QuickFixPresetMeta } from '../config/types'
import {
  BACKGROUND_OPTIONS,
  BORDER_COLOR_OPTIONS,
  SHADOW_OPTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  CORNER_SHAPE_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  TEXT_COLOR_OPTIONS,
  ICON_SIZE_OPTIONS,
  SUCCESS_COLOR_OPTIONS,
  ERROR_COLOR_OPTIONS,
  BULLET_STYLE_OPTIONS,
  BUTTON_STYLE_OPTIONS,
  BUTTON_SIZE_OPTIONS,
  BUTTON_ROUNDNESS_OPTIONS,
  BUTTON_DISPLAY_MODE_OPTIONS,
  BUTTON_VARIANT_OPTIONS,
  PREVIEW_MODE_OPTIONS,
  LABEL_POSITION_OPTIONS,
  ISLAND_BACKGROUND_OPTIONS,
  ANIMATION_DIRECTION_OPTIONS,
} from '../config/options'

// =============================================================================
// MAIN BUILDER
// =============================================================================

export function buildQuickFixPanelConfig(
  config: QuickFixInteractionsConfig,
  presets: QuickFixPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildPreviewSection(config),
      buildCardSection(config),
      buildSwipeSection(config),
      buildButtonsSection(config),
      buildProgressSection(config),
      buildCompletionSection(config),
      buildToastSection(config),
      buildIslandSection(config),
      buildFlowOptionsSection(config),
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

// =============================================================================
// PREVIEW SECTION
// =============================================================================

function buildPreviewSection(config: QuickFixInteractionsConfig): Section {
  return {
    id: 'preview',
    label: 'Preview',
    title: 'Preview Mode',
    groups: [
      {
        title: 'Display Mode',
        controls: [
          {
            id: 'previewMode',
            type: 'select',
            label: 'Preview',
            value: config.previewMode,
            options: [...PREVIEW_MODE_OPTIONS],
          },
        ],
      },
    ],
  }
}

// =============================================================================
// CARD SECTION
// =============================================================================

function buildCardSection(config: QuickFixInteractionsConfig): Section {
  return {
    id: 'card',
    label: 'Card',
    title: 'Card Appearance',
    groups: [
      {
        title: 'Sizing',
        controls: [
          {
            id: 'card.width',
            type: 'slider',
            label: 'Width',
            value: config.card.width,
            min: 240,
            max: 400,
            step: 8,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'card.height',
            type: 'slider',
            label: 'Height',
            value: config.card.height,
            min: 120,
            max: 280,
            step: 8,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'card.padding',
            type: 'slider',
            label: 'Padding',
            value: config.card.padding,
            min: 12,
            max: 40,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'card.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.card.borderRadius,
            min: 8,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Stack',
        controls: [
          {
            id: 'card.stackOffset',
            type: 'slider',
            label: 'Stack Offset',
            value: config.card.stackOffset,
            min: 4,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'card.stackScale',
            type: 'slider',
            label: 'Scale Reduction',
            value: config.card.stackScale * 100,
            min: 0,
            max: 10,
            step: 1,
            formatLabel: (v: number) => `${v}%`,
          },
          {
            id: 'card.visibleCards',
            type: 'slider',
            label: 'Visible Cards',
            value: config.card.visibleCards,
            min: 1,
            max: 5,
            step: 1,
          },
        ],
      },
      {
        title: 'Shine & Corner',
        controls: [
          {
            id: 'card.shine',
            type: 'select',
            label: 'Shine Type',
            value: config.card.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'card.shineIntensity',
            type: 'select',
            label: 'Shine Intensity',
            value: config.card.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
          },
          {
            id: 'card.cornerShape',
            type: 'select',
            label: 'Corner Shape',
            value: config.card.cornerShape,
            options: [...CORNER_SHAPE_OPTIONS],
          },
        ],
      },
      {
        title: 'Appearance',
        controls: [
          {
            id: 'card.background',
            type: 'select',
            label: 'Background',
            value: config.card.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'card.shadow',
            type: 'select',
            label: 'Shadow',
            value: config.card.shadow,
            options: [...SHADOW_OPTIONS],
          },
          {
            id: 'card.border',
            type: 'toggle',
            label: 'Show Border',
            value: config.card.border,
          },
          {
            id: 'card.borderColor',
            type: 'select',
            label: 'Border Color',
            value: config.card.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Typography',
        controls: [
          {
            id: 'card.fontSize',
            type: 'select',
            label: 'Font Size',
            value: config.card.fontSize,
            options: [...FONT_SIZE_OPTIONS],
          },
          {
            id: 'card.fontWeight',
            type: 'select',
            label: 'Font Weight',
            value: config.card.fontWeight,
            options: [...FONT_WEIGHT_OPTIONS],
          },
          {
            id: 'card.textColor',
            type: 'select',
            label: 'Text Color',
            value: config.card.textColor,
            options: [...TEXT_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

// =============================================================================
// SWIPE SECTION
// =============================================================================

function buildSwipeSection(config: QuickFixInteractionsConfig): Section {
  return {
    id: 'swipe',
    label: 'Swipe',
    title: 'Swipe Behavior',
    groups: [
      {
        title: 'Thresholds',
        controls: [
          {
            id: 'swipe.swipeThreshold',
            type: 'slider',
            label: 'Swipe Threshold',
            value: config.swipe.swipeThreshold,
            min: 50,
            max: 200,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'swipe.velocityThreshold',
            type: 'slider',
            label: 'Velocity Threshold',
            value: config.swipe.velocityThreshold * 100,
            min: 0,
            max: 100,
            step: 10,
            formatLabel: (v: number) => `${v / 100}`,
          },
        ],
      },
      {
        title: 'Exit Animation',
        controls: [
          {
            id: 'swipe.exitDistance',
            type: 'slider',
            label: 'Exit Distance',
            value: config.swipe.exitDistance,
            min: 200,
            max: 600,
            step: 50,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'swipe.exitRotation',
            type: 'slider',
            label: 'Exit Rotation',
            value: config.swipe.exitRotation,
            min: 0,
            max: 45,
            step: 5,
            formatLabel: (v: number) => `${v}°`,
          },
          {
            id: 'swipe.exitDuration',
            type: 'slider',
            label: 'Exit Duration',
            value: config.swipe.exitDuration,
            min: 100,
            max: 500,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'swipe.returnDuration',
            type: 'slider',
            label: 'Return Duration',
            value: config.swipe.returnDuration,
            min: 100,
            max: 500,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Drag Feedback',
        controls: [
          {
            id: 'swipe.maxRotation',
            type: 'slider',
            label: 'Max Rotation',
            value: config.swipe.maxRotation,
            min: 0,
            max: 30,
            step: 5,
            formatLabel: (v: number) => `${v}°`,
          },
          {
            id: 'swipe.rotationFactor',
            type: 'slider',
            label: 'Rotation Sensitivity',
            value: config.swipe.rotationFactor * 1000,
            min: 10,
            max: 100,
            step: 10,
            formatLabel: (v: number) => `${(v / 1000).toFixed(2)}`,
          },
          {
            id: 'swipe.scaleOnDrag',
            type: 'slider',
            label: 'Scale on Drag',
            value: config.swipe.scaleOnDrag * 100,
            min: 95,
            max: 110,
            step: 1,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
      {
        title: 'Overlay',
        controls: [
          {
            id: 'swipe.showOverlay',
            type: 'toggle',
            label: 'Show Overlay',
            value: config.swipe.showOverlay,
          },
          {
            id: 'swipe.overlayOpacity',
            type: 'slider',
            label: 'Overlay Opacity',
            value: config.swipe.overlayOpacity,
            min: 5,
            max: 50,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// BUTTONS SECTION
// =============================================================================

function buildButtonsSection(config: QuickFixInteractionsConfig): Section {
  return {
    id: 'buttons',
    label: 'Buttons',
    title: 'Action Buttons',
    groups: [
      {
        title: 'Display Mode',
        controls: [
          {
            id: 'actionButtons.displayMode',
            type: 'select',
            label: 'Mode',
            value: config.actionButtons.displayMode,
            options: [...BUTTON_DISPLAY_MODE_OPTIONS],
          },
          {
            id: 'actionButtons.useProdButton',
            type: 'toggle',
            label: 'Use Prod Button',
            value: config.actionButtons.useProdButton,
          },
        ],
      },
      {
        title: 'Prod Button Options',
        controls: [
          {
            id: 'actionButtons.prodButtonSize',
            type: 'select',
            label: 'Size',
            value: config.actionButtons.prodButtonSize,
            options: [...BUTTON_SIZE_OPTIONS],
          },
          {
            id: 'actionButtons.prodButtonRoundness',
            type: 'select',
            label: 'Roundness',
            value: config.actionButtons.prodButtonRoundness,
            options: [...BUTTON_ROUNDNESS_OPTIONS],
          },
          {
            id: 'actionButtons.prodTrueVariant',
            type: 'select',
            label: 'True Variant',
            value: config.actionButtons.prodTrueVariant,
            options: [...BUTTON_VARIANT_OPTIONS],
          },
          {
            id: 'actionButtons.prodFalseVariant',
            type: 'select',
            label: 'False Variant',
            value: config.actionButtons.prodFalseVariant,
            options: [...BUTTON_VARIANT_OPTIONS],
          },
        ],
      },
      {
        title: 'Labels',
        controls: [
          {
            id: 'actionButtons.trueLabel',
            type: 'text',
            label: 'True Label',
            value: config.actionButtons.trueLabel,
          },
          {
            id: 'actionButtons.falseLabel',
            type: 'text',
            label: 'False Label',
            value: config.actionButtons.falseLabel,
          },
        ],
      },
      {
        title: 'Custom Sizing',
        controls: [
          {
            id: 'actionButtons.size',
            type: 'slider',
            label: 'Button Size',
            value: config.actionButtons.size,
            min: 40,
            max: 80,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'actionButtons.iconSize',
            type: 'select',
            label: 'Icon Size',
            value: config.actionButtons.iconSize,
            options: [...ICON_SIZE_OPTIONS],
          },
          {
            id: 'actionButtons.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.actionButtons.borderRadius,
            min: 8,
            max: 40,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Custom Colors',
        controls: [
          {
            id: 'actionButtons.trueBackground',
            type: 'select',
            label: 'True BG',
            value: config.actionButtons.trueBackground,
            options: [...SUCCESS_COLOR_OPTIONS],
          },
          {
            id: 'actionButtons.falseBackground',
            type: 'select',
            label: 'False BG',
            value: config.actionButtons.falseBackground,
            options: [...ERROR_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Feedback',
        controls: [
          {
            id: 'actionButtons.hoverScale',
            type: 'slider',
            label: 'Hover Scale',
            value: config.actionButtons.hoverScale * 100,
            min: 100,
            max: 120,
            step: 1,
            formatLabel: (v: number) => `${v}%`,
          },
          {
            id: 'actionButtons.pressScale',
            type: 'slider',
            label: 'Press Scale',
            value: config.actionButtons.pressScale * 100,
            min: 85,
            max: 100,
            step: 1,
            formatLabel: (v: number) => `${v}%`,
          },
          {
            id: 'actionButtons.showRipple',
            type: 'toggle',
            label: 'Show Ripple',
            value: config.actionButtons.showRipple,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// PROGRESS SECTION
// =============================================================================

function buildProgressSection(config: QuickFixInteractionsConfig): Section {
  return {
    id: 'progress',
    label: 'Progress',
    title: 'Progress Indicator',
    groups: [
      {
        title: 'Bar Appearance',
        controls: [
          {
            id: 'progress.height',
            type: 'slider',
            label: 'Height',
            value: config.progress.height,
            min: 2,
            max: 12,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'progress.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.progress.borderRadius,
            min: 0,
            max: 6,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Animation',
        controls: [
          {
            id: 'progress.animateFill',
            type: 'toggle',
            label: 'Animate Fill',
            value: config.progress.animateFill,
          },
          {
            id: 'progress.fillDuration',
            type: 'slider',
            label: 'Fill Duration',
            value: config.progress.fillDuration,
            min: 100,
            max: 500,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Labels',
        controls: [
          {
            id: 'progress.showCount',
            type: 'toggle',
            label: 'Show Count',
            value: config.progress.showCount,
          },
          {
            id: 'progress.showLabel',
            type: 'toggle',
            label: 'Show Label',
            value: config.progress.showLabel,
          },
          {
            id: 'progress.labelPosition',
            type: 'select',
            label: 'Label Position',
            value: config.progress.labelPosition,
            options: [...LABEL_POSITION_OPTIONS],
          },
        ],
      },
    ],
  }
}

// =============================================================================
// COMPLETION SECTION
// =============================================================================

function buildCompletionSection(config: QuickFixInteractionsConfig): Section {
  return {
    id: 'completion',
    label: 'Complete',
    title: 'Completion State',
    groups: [
      {
        title: 'Success Icon',
        controls: [
          {
            id: 'completion.iconSize',
            type: 'slider',
            label: 'Icon Size',
            value: config.completion.iconSize,
            min: 48,
            max: 96,
            step: 8,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Memory Bullets',
        controls: [
          {
            id: 'completion.bulletStyle',
            type: 'select',
            label: 'Bullet Style',
            value: config.completion.bulletStyle,
            options: [...BULLET_STYLE_OPTIONS],
          },
          {
            id: 'completion.bulletSpacing',
            type: 'slider',
            label: 'Spacing',
            value: config.completion.bulletSpacing,
            min: 4,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'CTA Button',
        controls: [
          {
            id: 'completion.buttonStyle',
            type: 'select',
            label: 'Style',
            value: config.completion.buttonStyle,
            options: [...BUTTON_STYLE_OPTIONS],
          },
          {
            id: 'completion.buttonSize',
            type: 'select',
            label: 'Size',
            value: config.completion.buttonSize,
            options: [
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
            ],
          },
        ],
      },
    ],
  }
}

// =============================================================================
// TOAST SECTION
// =============================================================================

function buildToastSection(config: QuickFixInteractionsConfig): Section {
  return {
    id: 'toast',
    label: 'Toast',
    title: 'Success Toast',
    groups: [
      {
        title: 'Layout',
        controls: [
          {
            id: 'toast.padding',
            type: 'slider',
            label: 'Padding',
            value: config.toast.padding,
            min: 8,
            max: 24,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'toast.gap',
            type: 'slider',
            label: 'Gap',
            value: config.toast.gap,
            min: 8,
            max: 20,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'toast.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.toast.borderRadius,
            min: 8,
            max: 24,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Shine & Corner',
        controls: [
          {
            id: 'toast.shine',
            type: 'select',
            label: 'Shine Type',
            value: config.toast.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'toast.shineIntensity',
            type: 'select',
            label: 'Shine Intensity',
            value: config.toast.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
          },
          {
            id: 'toast.cornerShape',
            type: 'select',
            label: 'Corner Shape',
            value: config.toast.cornerShape,
            options: [...CORNER_SHAPE_OPTIONS],
          },
        ],
      },
      {
        title: 'Background',
        controls: [
          {
            id: 'toast.background',
            type: 'select',
            label: 'Background',
            value: config.toast.background,
            options: [...BACKGROUND_OPTIONS],
          },
        ],
      },
      {
        title: 'Icon',
        controls: [
          {
            id: 'toast.iconContainerSize',
            type: 'slider',
            label: 'Container Size',
            value: config.toast.iconContainerSize,
            min: 28,
            max: 56,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'toast.iconSize',
            type: 'slider',
            label: 'Icon Size',
            value: config.toast.iconSize,
            min: 14,
            max: 28,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Title',
        controls: [
          {
            id: 'toast.titleSize',
            type: 'select',
            label: 'Size',
            value: config.toast.titleSize,
            options: [...FONT_SIZE_OPTIONS],
          },
          {
            id: 'toast.titleWeight',
            type: 'select',
            label: 'Weight',
            value: config.toast.titleWeight,
            options: [...FONT_WEIGHT_OPTIONS],
          },
          {
            id: 'toast.titleColor',
            type: 'select',
            label: 'Color',
            value: config.toast.titleColor,
            options: [...TEXT_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Subtitle',
        controls: [
          {
            id: 'toast.subtitleSize',
            type: 'select',
            label: 'Size',
            value: config.toast.subtitleSize,
            options: [...FONT_SIZE_OPTIONS],
          },
          {
            id: 'toast.subtitleWeight',
            type: 'select',
            label: 'Weight',
            value: config.toast.subtitleWeight,
            options: [...FONT_WEIGHT_OPTIONS],
          },
          {
            id: 'toast.subtitleColor',
            type: 'select',
            label: 'Color',
            value: config.toast.subtitleColor,
            options: [...TEXT_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Animation',
        controls: [
          {
            id: 'toast.animationDirection',
            type: 'select',
            label: 'Direction',
            value: config.toast.animationDirection,
            options: [...ANIMATION_DIRECTION_OPTIONS],
          },
          {
            id: 'toast.animationDuration',
            type: 'slider',
            label: 'Duration',
            value: config.toast.animationDuration,
            min: 150,
            max: 500,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// ISLAND SECTION
// =============================================================================

function buildIslandSection(config: QuickFixInteractionsConfig): Section {
  return {
    id: 'island',
    label: 'Island',
    title: 'Status Island',
    groups: [
      {
        title: 'Layout',
        controls: [
          {
            id: 'island.padding',
            type: 'slider',
            label: 'Padding',
            value: config.island.padding,
            min: 6,
            max: 20,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'island.gap',
            type: 'slider',
            label: 'Gap',
            value: config.island.gap,
            min: 8,
            max: 24,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'island.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.island.borderRadius,
            min: 12,
            max: 9999,
            step: 12,
            formatLabel: (v: number) => v >= 9999 ? 'Full' : `${v}px`,
          },
        ],
      },
      {
        title: 'Background',
        controls: [
          {
            id: 'island.background',
            type: 'select',
            label: 'Background',
            value: config.island.background,
            options: [...ISLAND_BACKGROUND_OPTIONS],
          },
          {
            id: 'island.backdropBlur',
            type: 'slider',
            label: 'Backdrop Blur',
            value: config.island.backdropBlur,
            min: 0,
            max: 24,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'island.border',
            type: 'toggle',
            label: 'Show Border',
            value: config.island.border,
          },
          {
            id: 'island.borderColor',
            type: 'select',
            label: 'Border Color',
            value: config.island.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Sections',
        controls: [
          {
            id: 'island.showUpload',
            type: 'toggle',
            label: 'Show Upload',
            value: config.island.showUpload,
          },
          {
            id: 'island.showScore',
            type: 'toggle',
            label: 'Show Score',
            value: config.island.showScore,
          },
          {
            id: 'island.showConfidence',
            type: 'toggle',
            label: 'Show Confidence',
            value: config.island.showConfidence,
          },
          {
            id: 'island.showNotifications',
            type: 'toggle',
            label: 'Show Notifications',
            value: config.island.showNotifications,
          },
          {
            id: 'island.showNotificationPanel',
            type: 'toggle',
            label: 'Notification Panel',
            value: config.island.showNotificationPanel,
          },
        ],
      },
      {
        title: 'Confidence Wheel',
        controls: [
          {
            id: 'island.wheelSize',
            type: 'slider',
            label: 'Wheel Size',
            value: config.island.wheelSize,
            min: 20,
            max: 40,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'island.wheelStrokeWidth',
            type: 'slider',
            label: 'Stroke Width',
            value: config.island.wheelStrokeWidth * 10,
            min: 15,
            max: 40,
            step: 5,
            formatLabel: (v: number) => `${v / 10}px`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// FLOW OPTIONS SECTION
// =============================================================================

function buildFlowOptionsSection(config: QuickFixInteractionsConfig): Section {
  return {
    id: 'flowOptions',
    label: 'Options',
    title: 'Flow Method Options',
    groups: [
      {
        title: 'Card Layout',
        controls: [
          {
            id: 'flowOptions.cardPadding',
            type: 'slider',
            label: 'Padding',
            value: config.flowOptions.cardPadding,
            min: 8,
            max: 24,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'flowOptions.cardBorderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.flowOptions.cardBorderRadius,
            min: 8,
            max: 20,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'flowOptions.cardGap',
            type: 'slider',
            label: 'Gap',
            value: config.flowOptions.cardGap,
            min: 8,
            max: 24,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Shine & Corner',
        controls: [
          {
            id: 'flowOptions.shine',
            type: 'select',
            label: 'Shine Type',
            value: config.flowOptions.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'flowOptions.shineIntensity',
            type: 'select',
            label: 'Shine Intensity',
            value: config.flowOptions.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
          },
          {
            id: 'flowOptions.cornerShape',
            type: 'select',
            label: 'Corner Shape',
            value: config.flowOptions.cornerShape,
            options: [...CORNER_SHAPE_OPTIONS],
          },
        ],
      },
      {
        title: 'Icon',
        controls: [
          {
            id: 'flowOptions.iconSize',
            type: 'slider',
            label: 'Icon Size',
            value: config.flowOptions.iconSize,
            min: 16,
            max: 28,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'flowOptions.iconCircleSize',
            type: 'slider',
            label: 'Circle Size',
            value: config.flowOptions.iconCircleSize,
            min: 32,
            max: 56,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Typography',
        controls: [
          {
            id: 'flowOptions.labelSize',
            type: 'select',
            label: 'Label Size',
            value: config.flowOptions.labelSize,
            options: [...FONT_SIZE_OPTIONS],
          },
          {
            id: 'flowOptions.descriptionSize',
            type: 'select',
            label: 'Description Size',
            value: config.flowOptions.descriptionSize,
            options: [
              { label: 'XS', value: 'text-xs' },
              { label: 'SM', value: 'text-sm' },
            ],
          },
        ],
      },
    ],
  }
}
