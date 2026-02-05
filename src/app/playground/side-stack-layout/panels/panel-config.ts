import type { UnifiedControlPanelProps } from '@/components/ui/patterns/control-panel'
import type { PlaygroundConfig } from '../config/types'
import {
  CSS_EASING_OPTIONS,
  SIDE_STACK_MODE_OPTIONS,
  TRIGGER_COLOR_OPTIONS,
  SLOT_COLOR_OPTIONS,
  PAGE_BACKGROUND_OPTIONS,
} from '../config/options'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

export function createPanelConfig(config: PlaygroundConfig): UnifiedControlPanelConfig {
  return {
    sections: [
      {
        id: 'animation',
        title: 'Animation',
        tabLabel: 'Animation',
        groups: [
          {
            title: 'Config Preset',
            controls: [
              {
                id: 'configPreset',
                type: 'select',
                label: 'Preset',
                value: config.configPreset,
                options: [
                  { value: 'default', label: 'Default (Balanced)' },
                  { value: 'snappy', label: 'Snappy (Quick)' },
                  { value: 'bouncy', label: 'Bouncy (Playful)' },
                  { value: 'smooth', label: 'Smooth (Gentle)' },
                  { value: 'custom', label: 'Custom' },
                ],
              },
            ],
          },
          {
            title: 'Timing',
            controls: [
              {
                id: 'animationDuration',
                type: 'slider',
                label: 'Expand Duration',
                value: config.animationDuration,
                min: 100,
                max: 800,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'collapseDuration',
                type: 'slider',
                label: 'Collapse Duration',
                value: config.collapseDuration,
                min: 100,
                max: 600,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
          {
            title: 'Easing',
            controls: [
              {
                id: 'animationEasing',
                type: 'select',
                label: 'Easing Curve',
                value: config.animationEasing,
                options: CSS_EASING_OPTIONS,
              },
            ],
          },
        ],
      },
      {
        id: 'slots',
        title: 'Slot Animation',
        tabLabel: 'Slots',
        groups: [
          {
            title: 'Mode',
            controls: [
              {
                id: 'sideStackMode',
                type: 'select',
                label: 'Stack Mode',
                value: config.sideStackMode,
                options: [...SIDE_STACK_MODE_OPTIONS],
              },
            ],
          },
          {
            title: 'Clip Animation',
            controls: [
              {
                id: 'animateSlotContainers',
                type: 'toggle',
                label: 'Enable Clip Animation',
                value: config.animateSlotContainers,
              },
              {
                id: 'slotContainerDurationOffset',
                type: 'slider',
                label: 'Duration Offset',
                value: config.slotContainerDurationOffset,
                min: 0,
                max: 200,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
          {
            title: 'Content Timing',
            controls: [
              {
                id: 'slotEntryDelay',
                type: 'slider',
                label: 'Entry Delay',
                value: config.slotEntryDelay,
                min: 0,
                max: 200,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'slotEntryDuration',
                type: 'slider',
                label: 'Entry Duration',
                value: config.slotEntryDuration,
                min: 100,
                max: 500,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },
      {
        id: 'layout',
        title: 'Layout',
        tabLabel: 'Layout',
        groups: [
          {
            title: 'Containers',
            controls: [
              {
                id: 'containerCount',
                type: 'slider',
                label: 'Count',
                value: config.containerCount,
                min: 2,
                max: 6,
                step: 1,
                formatLabel: (v: number) => `${v}`,
              },
              {
                id: 'containerGap',
                type: 'slider',
                label: 'Gap Between',
                value: config.containerGap,
                min: 8,
                max: 48,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Trigger',
            controls: [
              {
                id: 'triggerWidth',
                type: 'slider',
                label: 'Width',
                value: config.triggerWidth,
                min: 40,
                max: 120,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'triggerHeight',
                type: 'slider',
                label: 'Height',
                value: config.triggerHeight,
                min: 40,
                max: 120,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Side Slots',
            controls: [
              {
                id: 'leftSlotWidth',
                type: 'slider',
                label: 'Left Width',
                value: config.leftSlotWidth,
                min: 40,
                max: 160,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'rightSlotWidth',
                type: 'slider',
                label: 'Right Width',
                value: config.rightSlotWidth,
                min: 40,
                max: 160,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'slotInset',
                type: 'slider',
                label: 'Inset',
                value: config.slotInset,
                min: 0,
                max: 12,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },
      {
        id: 'appearance',
        title: 'Appearance',
        tabLabel: 'Style',
        groups: [
          {
            title: 'Colors',
            controls: [
              {
                id: 'triggerColor',
                type: 'select',
                label: 'Trigger',
                value: config.triggerColor,
                options: [...TRIGGER_COLOR_OPTIONS],
              },
              {
                id: 'leftSlotColor',
                type: 'select',
                label: 'Left Slot',
                value: config.leftSlotColor,
                options: [...SLOT_COLOR_OPTIONS],
              },
              {
                id: 'rightSlotColor',
                type: 'select',
                label: 'Right Slot',
                value: config.rightSlotColor,
                options: [...SLOT_COLOR_OPTIONS],
              },
              {
                id: 'pageBackground',
                type: 'select',
                label: 'Background',
                value: config.pageBackground,
                options: [...PAGE_BACKGROUND_OPTIONS],
              },
            ],
          },
          {
            title: 'Border Radius',
            controls: [
              {
                id: 'borderRadius',
                type: 'slider',
                label: 'Slots',
                value: config.borderRadius,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'containerBorderRadius',
                type: 'slider',
                label: 'Container',
                value: config.containerBorderRadius,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Display',
            controls: [
              {
                id: 'showContainerBorder',
                type: 'toggle',
                label: 'Container Border',
                value: config.showContainerBorder,
              },
              {
                id: 'showSlotLabels',
                type: 'toggle',
                label: 'Slot Labels',
                value: config.showSlotLabels,
              },
            ],
          },
        ],
      },
      {
        id: 'debug',
        title: 'Debug',
        tabLabel: 'Debug',
        groups: [
          {
            title: 'Inspection',
            controls: [
              {
                id: 'showDebug',
                type: 'toggle',
                label: 'Debug Info',
                value: config.showDebug,
              },
              {
                id: 'slowMoEnabled',
                type: 'toggle',
                label: 'Slow-Mo (10x)',
                value: config.slowMoEnabled,
              },
              {
                id: 'reduceMotion',
                type: 'toggle',
                label: 'Reduce Motion',
                value: config.reduceMotion,
              },
            ],
          },
        ],
      },
    ],
    defaultActiveTab: 'animation',
    position: {
      top: '16px',
      bottom: '16px',
      right: '16px',
      width: '320px',
    },
    showReset: true,
    resetLabel: 'Reset All',
  }
}
