/**
 * Question Command Menu V4 - Shared Control Groups
 *
 * Reusable control group builders that work for BOTH slots.
 * This is the key to eliminating duplication.
 */

import type { ControlGroup } from '@/components/ui/patterns/control-panel'
import type { UnifiedSlotConfig } from '../../types'

type SlotConfig = UnifiedSlotConfig
import {
  HEIGHT_MODE_OPTIONS,
  BACKGROUND_WITH_NONE_OPTIONS,
  SHINE_OPTIONS,
  BORDER_COLOR_OPTIONS,
  EXPAND_ORIGIN_OPTIONS,
} from '../../config/options'

// ============================================================================
// SLOT ENABLE GROUP
// ============================================================================

export function buildSlotEnableGroup(
  prefix: string,
  config: SlotConfig
): ControlGroup {
  return {
    title: 'Enable',
    controls: [
      {
        id: `${prefix}.enabled`,
        label: 'Enable Slot',
        type: 'toggle',
        value: config.enabled,
      },
    ],
  }
}

// ============================================================================
// SLOT HEIGHT GROUP
// ============================================================================

export function buildSlotHeightGroup(
  prefix: string,
  config: SlotConfig
): ControlGroup {
  const isFixed = config.heightMode === 'fixed'
  const isDynamic = config.heightMode === 'dynamic'

  return {
    title: 'Height',
    controls: [
      {
        id: `${prefix}.heightMode`,
        label: 'Height Mode',
        type: 'select',
        value: config.heightMode,
        options: [...HEIGHT_MODE_OPTIONS],
      },
      // Only show fixedHeight when mode is fixed
      ...(isFixed
        ? [
            {
              id: `${prefix}.fixedHeight`,
              label: 'Fixed Height',
              type: 'slider' as const,
              value: config.fixedHeight ?? 48,
              min: 32,
              max: 400,
              step: 4,
              formatLabel: (v: number) => `${v}px`,
            },
          ]
        : []),
      // Show maxHeight/minHeight when mode is dynamic
      ...(isDynamic
        ? [
            {
              id: `${prefix}.maxHeight`,
              label: 'Max Height',
              type: 'slider' as const,
              value: config.maxHeight ?? 340,
              min: 100,
              max: 600,
              step: 20,
              formatLabel: (v: number) => `${v}px`,
            },
            {
              id: `${prefix}.minHeight`,
              label: 'Min Height',
              type: 'slider' as const,
              value: config.minHeight ?? 48,
              min: 32,
              max: 200,
              step: 8,
              formatLabel: (v: number) => `${v}px`,
            },
          ]
        : []),
    ],
  }
}

// ============================================================================
// SLOT APPEARANCE GROUP
// ============================================================================

export function buildSlotAppearanceGroup(
  prefix: string,
  config: SlotConfig
): ControlGroup {
  return {
    title: 'Appearance',
    controls: [
      {
        id: `${prefix}.appearance.background`,
        label: 'Background',
        type: 'select',
        value: config.appearance.background,
        options: [...BACKGROUND_WITH_NONE_OPTIONS],
      },
      {
        id: `${prefix}.appearance.shine`,
        label: 'Shine',
        type: 'select',
        value: config.appearance.shine,
        options: [...SHINE_OPTIONS],
      },
      {
        id: `${prefix}.appearance.borderRadius`,
        label: 'Border Radius',
        type: 'slider',
        value: config.appearance.borderRadius,
        min: 0,
        max: 24,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: `${prefix}.appearance.inset`,
        label: 'Inset',
        type: 'slider',
        value: config.appearance.inset,
        min: 0,
        max: 16,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
    ],
  }
}

// ============================================================================
// SLOT BORDER GROUP
// ============================================================================

export function buildSlotBorderGroup(
  prefix: string,
  config: SlotConfig
): ControlGroup {
  return {
    title: 'Border',
    controls: [
      {
        id: `${prefix}.appearance.borderWidth`,
        label: 'Border Width',
        type: 'slider',
        value: config.appearance.borderWidth,
        min: 0,
        max: 4,
        step: 1,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: `${prefix}.appearance.borderColor`,
        label: 'Border Color',
        type: 'select',
        value: config.appearance.borderColor,
        options: [...BORDER_COLOR_OPTIONS],
      },
    ],
  }
}

// ============================================================================
// SLOT ANIMATION GROUP
// ============================================================================

export function buildSlotAnimationGroup(
  prefix: string,
  config: SlotConfig
): ControlGroup {
  return {
    title: 'Animation',
    controls: [
      {
        id: `${prefix}.animation.delayOffset`,
        label: 'Delay Offset',
        type: 'slider',
        value: config.animation.delayOffset,
        min: -100,
        max: 200,
        step: 25,
        formatLabel: (v: number) => `${v}ms`,
      },
      {
        id: `${prefix}.animation.durationOffset`,
        label: 'Duration Offset',
        type: 'slider',
        value: config.animation.durationOffset,
        min: -200,
        max: 200,
        step: 25,
        formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}ms`,
      },
      {
        id: `${prefix}.animation.expandOrigin`,
        label: 'Expand Origin',
        type: 'select',
        value: config.animation.expandOrigin,
        options: [...EXPAND_ORIGIN_OPTIONS],
      },
    ],
  }
}

// ============================================================================
// SLOT SCROLL GROUP
// ============================================================================

export function buildSlotScrollGroup(
  prefix: string,
  config: SlotConfig
): ControlGroup {
  return {
    title: 'Scroll & Overflow',
    controls: [
      {
        id: `${prefix}.scroll.overflowGradient`,
        label: 'Overflow Gradient',
        type: 'toggle',
        value: config.scroll.overflowGradient,
      },
      {
        id: `${prefix}.scroll.gradientHeight`,
        label: 'Gradient Height',
        type: 'slider',
        value: config.scroll.gradientHeight,
        min: 8,
        max: 48,
        step: 4,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: `${prefix}.scroll.paddingTop`,
        label: 'Scroll Padding Top',
        type: 'slider',
        value: config.scroll.paddingTop,
        min: 0,
        max: 32,
        step: 4,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: `${prefix}.scroll.paddingBottom`,
        label: 'Scroll Padding Bottom',
        type: 'slider',
        value: config.scroll.paddingBottom,
        min: 0,
        max: 32,
        step: 4,
        formatLabel: (v: number) => `${v}px`,
      },
    ],
  }
}
