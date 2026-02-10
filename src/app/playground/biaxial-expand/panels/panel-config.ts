/**
 * Panel Configuration for BiaxialExpand Playground
 *
 * Modular builder for UnifiedControlPanel sections.
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { BiaxialExpandPlaygroundConfig, BiaxialExpandPresetMeta } from '../config/types'
import {
  DEMO_VARIANT_OPTIONS,
  PAGE_BACKGROUND_OPTIONS,
  BACKGROUND_OPTIONS,
  BORDER_COLOR_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  SHINE_OPTIONS,
  GRADIENT_PATTERN_OPTIONS,
  GRADIENT_COLOR_OPTIONS,
  BACKDROP_MODE_OPTIONS,
  EXPAND_ORIGIN_OPTIONS,
  EXPAND_ORIGIN_X_OPTIONS,
  POSITION_MODE_OPTIONS,
  HEIGHT_MODE_OPTIONS,
  SLOT_SHINE_OPTIONS,
  VERTICAL_ALIGN_OPTIONS,
} from '../config/options'

// ============================================================================
// MAIN BUILDER
// ============================================================================

export function buildBiaxialExpandPanelConfig(
  config: BiaxialExpandPlaygroundConfig,
  presets: BiaxialExpandPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildDemoSection(config),
      buildLayoutSection(config),
      buildTriggerSection(config),
      buildAnimationSection(config),
      buildAppearanceSection(config),
      buildTopSlotSection(config),
      buildBottomSlotSection(config),
      buildLeftSlotSection(config),
      buildRightSlotSection(config),
      buildDebugSection(config),
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
// SECTION BUILDERS
// ============================================================================

function buildDemoSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'demo',
    label: 'Demo',
    title: 'Demo Settings',
    groups: [
      {
        title: 'Variant',
        controls: [
          {
            id: 'demo.variant',
            type: 'select',
            label: 'Demo Type',
            value: config.demo.variant,
            options: [...DEMO_VARIANT_OPTIONS],
          },
          {
            id: 'demo.pageBackground',
            type: 'select',
            label: 'Page Background',
            value: config.demo.pageBackground,
            options: [...PAGE_BACKGROUND_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildLayoutSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout Configuration',
    groups: [
      {
        title: 'Panel',
        controls: [
          {
            id: 'layout.panelWidth',
            type: 'slider',
            label: 'Width',
            value: config.layout.panelWidth,
            min: 200,
            max: 800,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.layout.borderRadius,
            min: 0,
            max: 40,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Positioning',
        controls: [
          {
            id: 'layout.expandOriginX',
            type: 'select',
            label: 'Horizontal Origin',
            value: config.layout.expandOriginX,
            options: [...EXPAND_ORIGIN_X_OPTIONS],
          },
          {
            id: 'layout.positionMode',
            type: 'select',
            label: 'Position Mode',
            value: config.layout.positionMode,
            options: [...POSITION_MODE_OPTIONS],
          },
        ],
      },
      {
        title: 'Heights',
        controls: [
          {
            id: 'layout.maxTopHeight',
            type: 'slider',
            label: 'Max Top',
            value: config.layout.maxTopHeight,
            min: 0,
            max: 400,
            step: 20,
            formatLabel: (v: number) => v === 0 ? 'None' : `${v}px`,
          },
          {
            id: 'layout.maxBottomHeight',
            type: 'slider',
            label: 'Max Bottom',
            value: config.layout.maxBottomHeight,
            min: 0,
            max: 600,
            step: 20,
            formatLabel: (v: number) => v === 0 ? 'None' : `${v}px`,
          },
        ],
      },
      {
        title: 'Widths',
        controls: [
          {
            id: 'layout.maxLeftWidth',
            type: 'slider',
            label: 'Max Left',
            value: config.layout.maxLeftWidth,
            min: 0,
            max: 400,
            step: 20,
            formatLabel: (v: number) => v === 0 ? 'None' : `${v}px`,
          },
          {
            id: 'layout.maxRightWidth',
            type: 'slider',
            label: 'Max Right',
            value: config.layout.maxRightWidth,
            min: 0,
            max: 400,
            step: 20,
            formatLabel: (v: number) => v === 0 ? 'None' : `${v}px`,
          },
        ],
      },
      {
        title: 'Gaps',
        controls: [
          {
            id: 'layout.topGap',
            type: 'slider',
            label: 'Top Gap',
            value: config.layout.topGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.bottomGap',
            type: 'slider',
            label: 'Bottom Gap',
            value: config.layout.bottomGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.leftGap',
            type: 'slider',
            label: 'Left Gap',
            value: config.layout.leftGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.rightGap',
            type: 'slider',
            label: 'Right Gap',
            value: config.layout.rightGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.backdropTopOffset',
            type: 'slider',
            label: 'Backdrop Top Offset',
            value: config.layout.backdropTopOffset,
            min: 0,
            max: 20,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildTriggerSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'trigger',
    label: 'Trigger',
    title: 'Trigger Configuration',
    groups: [
      {
        title: 'Size',
        controls: [
          {
            id: 'layout.triggerWidth',
            type: 'slider',
            label: 'Width',
            value: config.layout.triggerWidth,
            min: 120,
            max: 600,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.triggerHeight',
            type: 'slider',
            label: 'Height',
            value: config.layout.triggerHeight,
            min: 32,
            max: 100,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Collapsed Style',
        controls: [
          {
            id: 'trigger.collapsed.background',
            type: 'select',
            label: 'Background',
            value: config.trigger.collapsed.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'trigger.collapsed.shine',
            type: 'select',
            label: 'Shine',
            value: config.trigger.collapsed.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'trigger.collapsed.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.trigger.collapsed.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'trigger.collapsed.borderWidth',
            type: 'slider',
            label: 'Border Width',
            value: config.trigger.collapsed.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'trigger.collapsed.borderColor',
            type: 'select',
            label: 'Border Color',
            value: config.trigger.collapsed.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Expanded Style',
        controls: [
          {
            id: 'trigger.expanded.background',
            type: 'select',
            label: 'Background',
            value: config.trigger.expanded.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'trigger.expanded.shine',
            type: 'select',
            label: 'Shine',
            value: config.trigger.expanded.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'trigger.expanded.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.trigger.expanded.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'trigger.expanded.borderWidth',
            type: 'slider',
            label: 'Border Width',
            value: config.trigger.expanded.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'trigger.expanded.borderColor',
            type: 'select',
            label: 'Border Color',
            value: config.trigger.expanded.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildAnimationSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'animation',
    label: 'Animation',
    title: 'Animation Configuration',
    groups: [
      {
        title: 'Timing',
        controls: [
          {
            id: 'animation.duration',
            type: 'slider',
            label: 'Expand Duration',
            value: config.animation.duration,
            min: 100,
            max: 800,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.collapseDuration',
            type: 'slider',
            label: 'Collapse Duration',
            value: config.animation.collapseDuration,
            min: 50,
            max: 400,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Content Fade',
        controls: [
          {
            id: 'animation.contentFadeDuration',
            type: 'slider',
            label: 'Duration',
            value: config.animation.contentFadeDuration,
            min: 0,
            max: 400,
            step: 25,
            formatLabel: (v: number) => v === 0 ? 'Off' : `${v}ms`,
          },
          {
            id: 'animation.contentFadeDelay',
            type: 'slider',
            label: 'Delay',
            value: config.animation.contentFadeDelay,
            min: 0,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Backdrop',
        controls: [
          {
            id: 'animation.backdropMode',
            type: 'select',
            label: 'Mode',
            value: config.animation.backdropMode,
            options: [...BACKDROP_MODE_OPTIONS],
          },
          {
            id: 'animation.backdropDelay',
            type: 'slider',
            label: 'Delay',
            value: config.animation.backdropDelay,
            min: 0,
            max: 200,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.backdropDurationOffset',
            type: 'slider',
            label: 'Duration Offset',
            value: config.animation.backdropDurationOffset,
            min: -200,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Slot Containers',
        controls: [
          {
            id: 'animation.animateSlotContainers',
            type: 'toggle',
            label: 'Animate',
            value: config.animation.animateSlotContainers,
          },
          {
            id: 'animation.slotContainerDelay',
            type: 'slider',
            label: 'Delay',
            value: config.animation.slotContainerDelay,
            min: 0,
            max: 200,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.slotContainerDurationOffset',
            type: 'slider',
            label: 'Duration Offset',
            value: config.animation.slotContainerDurationOffset,
            min: -200,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Expand Origin',
        controls: [
          {
            id: 'animation.expandOrigin',
            type: 'select',
            label: 'Bottom Slot',
            value: config.animation.expandOrigin,
            options: [...EXPAND_ORIGIN_OPTIONS],
          },
          {
            id: 'animation.topExpandOrigin',
            type: 'select',
            label: 'Top Slot',
            value: config.animation.topExpandOrigin,
            options: [...EXPAND_ORIGIN_OPTIONS],
          },
          {
            id: 'animation.leftExpandOrigin',
            type: 'select',
            label: 'Left Slot',
            value: config.animation.leftExpandOrigin,
            options: [...EXPAND_ORIGIN_X_OPTIONS],
          },
          {
            id: 'animation.rightExpandOrigin',
            type: 'select',
            label: 'Right Slot',
            value: config.animation.rightExpandOrigin,
            options: [...EXPAND_ORIGIN_X_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildAppearanceSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'appearance',
    label: 'Style',
    title: 'Appearance',
    groups: [
      {
        title: 'Container',
        controls: [
          {
            id: 'appearance.background',
            type: 'select',
            label: 'Background',
            value: config.appearance.background,
            options: BACKGROUND_OPTIONS.filter(o => o.value !== 'none'),
          },
          {
            id: 'appearance.borderRadius',
            type: 'select',
            label: 'Border Radius',
            value: config.appearance.borderRadius,
            options: [...BORDER_RADIUS_OPTIONS],
          },
          {
            id: 'appearance.squircle',
            type: 'toggle',
            label: 'Squircle Corners',
            value: config.appearance.squircle,
          },
        ],
      },
      {
        title: 'Effects',
        controls: [
          {
            id: 'appearance.shadow',
            type: 'select',
            label: 'Shadow',
            value: config.appearance.shadow,
            options: [...SHADOW_OPTIONS],
          },
          {
            id: 'appearance.shine',
            type: 'select',
            label: 'Shine',
            value: config.appearance.shine,
            options: [...SHINE_OPTIONS],
          },
        ],
      },
      {
        title: 'Gradient',
        controls: [
          {
            id: 'appearance.gradient',
            type: 'select',
            label: 'Pattern',
            value: config.appearance.gradient,
            options: [...GRADIENT_PATTERN_OPTIONS],
          },
          {
            id: 'appearance.gradientColor',
            type: 'select',
            label: 'Color',
            value: config.appearance.gradientColor,
            options: [...GRADIENT_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildTopSlotSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'topSlot',
    label: 'Top Slot',
    title: 'Top Slot Configuration',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'topSlot.enabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.topSlot.enabled,
          },
          {
            id: 'topSlot.drivesPanelHeight',
            type: 'toggle',
            label: 'Drives Panel Height',
            value: config.topSlot.drivesPanelHeight ?? false,
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'topSlot.heightMode',
            type: 'select',
            label: 'Height Mode',
            value: config.topSlot.heightMode,
            options: [...HEIGHT_MODE_OPTIONS],
          },
          {
            id: 'topSlot.height',
            type: 'slider',
            label: 'Height',
            value: config.topSlot.height,
            min: 32,
            max: 200,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Style',
        controls: [
          {
            id: 'topSlot.background',
            type: 'select',
            label: 'Background',
            value: config.topSlot.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'topSlot.shine',
            type: 'select',
            label: 'Shine',
            value: config.topSlot.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'topSlot.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.topSlot.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'topSlot.inset',
            type: 'slider',
            label: 'Inset',
            value: config.topSlot.inset,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'topSlot.borderWidth',
            type: 'slider',
            label: 'Width',
            value: config.topSlot.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'topSlot.borderColor',
            type: 'select',
            label: 'Color',
            value: config.topSlot.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildBottomSlotSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'bottomSlot',
    label: 'Bottom Slot',
    title: 'Bottom Slot Configuration',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'bottomSlot.enabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.bottomSlot.enabled,
          },
          {
            id: 'bottomSlot.drivesPanelHeight',
            type: 'toggle',
            label: 'Drives Panel Height',
            value: config.bottomSlot.drivesPanelHeight ?? true,
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'bottomSlot.heightMode',
            type: 'select',
            label: 'Height Mode',
            value: config.bottomSlot.heightMode,
            options: [...HEIGHT_MODE_OPTIONS],
          },
          {
            id: 'bottomSlot.height',
            type: 'slider',
            label: 'Height',
            value: config.bottomSlot.height,
            min: 50,
            max: 400,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Style',
        controls: [
          {
            id: 'bottomSlot.background',
            type: 'select',
            label: 'Background',
            value: config.bottomSlot.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'bottomSlot.shine',
            type: 'select',
            label: 'Shine',
            value: config.bottomSlot.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'bottomSlot.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.bottomSlot.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'bottomSlot.inset',
            type: 'slider',
            label: 'Inset',
            value: config.bottomSlot.inset,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'bottomSlot.borderWidth',
            type: 'slider',
            label: 'Width',
            value: config.bottomSlot.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'bottomSlot.borderColor',
            type: 'select',
            label: 'Color',
            value: config.bottomSlot.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildLeftSlotSection(config: BiaxialExpandPlaygroundConfig): Section {
  // Determine which height control to show
  const showDrivingHeight = config.leftSlot.drivesPanelHeight
  const showMaxHeight = !config.leftSlot.drivesPanelHeight && config.leftSlot.verticalAlign !== 'full'

  return {
    id: 'leftSlot',
    label: 'Left Slot',
    title: 'Left Slot Configuration',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'leftSlot.enabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.leftSlot.enabled,
          },
          {
            id: 'leftSlot.drivesPanelHeight',
            type: 'toggle',
            label: 'Drives Panel Height',
            value: config.leftSlot.drivesPanelHeight ?? false,
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'layout.maxLeftWidth',
            type: 'slider',
            label: 'Width',
            value: config.layout.maxLeftWidth,
            min: 40,
            max: 400,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          // Show Driving Height when driving panel height
          ...(showDrivingHeight
            ? [
                {
                  id: 'leftSlot.drivingHeight',
                  type: 'slider' as const,
                  label: 'Height',
                  value: config.leftSlot.drivingHeight ?? 200,
                  min: 50,
                  max: 500,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
          // Show Max Height when NOT driving and NOT full align
          ...(showMaxHeight
            ? [
                {
                  id: 'leftSlot.maxHeight',
                  type: 'slider' as const,
                  label: 'Max Height',
                  value: config.leftSlot.maxHeight ?? 300,
                  min: 50,
                  max: 500,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Alignment',
        controls: [
          {
            id: 'leftSlot.verticalAlign',
            type: 'select',
            label: 'Vertical Align',
            value: config.leftSlot.verticalAlign,
            options: [...VERTICAL_ALIGN_OPTIONS],
          },
        ],
      },
      {
        title: 'Style',
        controls: [
          {
            id: 'leftSlot.background',
            type: 'select',
            label: 'Background',
            value: config.leftSlot.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'leftSlot.shine',
            type: 'select',
            label: 'Shine',
            value: config.leftSlot.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'leftSlot.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.leftSlot.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'leftSlot.inset',
            type: 'slider',
            label: 'Inset',
            value: config.leftSlot.inset,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'leftSlot.borderWidth',
            type: 'slider',
            label: 'Width',
            value: config.leftSlot.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'leftSlot.borderColor',
            type: 'select',
            label: 'Color',
            value: config.leftSlot.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildRightSlotSection(config: BiaxialExpandPlaygroundConfig): Section {
  // Determine which height control to show
  const showDrivingHeight = config.rightSlot.drivesPanelHeight
  const showMaxHeight = !config.rightSlot.drivesPanelHeight && config.rightSlot.verticalAlign !== 'full'

  return {
    id: 'rightSlot',
    label: 'Right Slot',
    title: 'Right Slot Configuration',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'rightSlot.enabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.rightSlot.enabled,
          },
          {
            id: 'rightSlot.drivesPanelHeight',
            type: 'toggle',
            label: 'Drives Panel Height',
            value: config.rightSlot.drivesPanelHeight ?? false,
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'layout.maxRightWidth',
            type: 'slider',
            label: 'Width',
            value: config.layout.maxRightWidth,
            min: 40,
            max: 400,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          // Show Driving Height when driving panel height
          ...(showDrivingHeight
            ? [
                {
                  id: 'rightSlot.drivingHeight',
                  type: 'slider' as const,
                  label: 'Height',
                  value: config.rightSlot.drivingHeight ?? 200,
                  min: 50,
                  max: 500,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
          // Show Max Height when NOT driving and NOT full align
          ...(showMaxHeight
            ? [
                {
                  id: 'rightSlot.maxHeight',
                  type: 'slider' as const,
                  label: 'Max Height',
                  value: config.rightSlot.maxHeight ?? 300,
                  min: 50,
                  max: 500,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Alignment',
        controls: [
          {
            id: 'rightSlot.verticalAlign',
            type: 'select',
            label: 'Vertical Align',
            value: config.rightSlot.verticalAlign,
            options: [...VERTICAL_ALIGN_OPTIONS],
          },
        ],
      },
      {
        title: 'Style',
        controls: [
          {
            id: 'rightSlot.background',
            type: 'select',
            label: 'Background',
            value: config.rightSlot.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'rightSlot.shine',
            type: 'select',
            label: 'Shine',
            value: config.rightSlot.shine,
            options: [...SLOT_SHINE_OPTIONS],
          },
          {
            id: 'rightSlot.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.rightSlot.borderRadius,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'rightSlot.inset',
            type: 'slider',
            label: 'Inset',
            value: config.rightSlot.inset,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'rightSlot.borderWidth',
            type: 'slider',
            label: 'Width',
            value: config.rightSlot.borderWidth,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'rightSlot.borderColor',
            type: 'select',
            label: 'Color',
            value: config.rightSlot.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildDebugSection(config: BiaxialExpandPlaygroundConfig): Section {
  return {
    id: 'debug',
    label: 'Debug',
    title: 'Debug Options',
    groups: [
      {
        title: 'Animation',
        controls: [
          {
            id: 'demo.slowMo',
            type: 'toggle',
            label: 'Slow Motion (5x)',
            value: config.demo.slowMo,
          },
        ],
      },
      {
        title: 'Visibility',
        controls: [
          {
            id: 'demo.showDebug',
            type: 'toggle',
            label: 'Show Debug Outlines',
            value: config.demo.showDebug,
          },
        ],
      },
    ],
  }
}
