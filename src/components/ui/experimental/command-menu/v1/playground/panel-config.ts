/**
 * Biaxial Command Menu Playground - Panel Config Builder
 *
 * Builds the UnifiedControlPanel configuration.
 */

import type { PanelConfig } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from './types'
import { PRESETS } from './presets'
import {
  SHINE_OPTIONS,
  SHADOW_OPTIONS,
  BACKGROUND_OPTIONS,
  GRADIENT_OPTIONS,
  GRADIENT_COLOR_OPTIONS,
  AREA_BACKGROUND_OPTIONS,
} from './options'

// ============================================================================
// PANEL CONFIG BUILDER
// ============================================================================

export function buildPanelConfig(
  state: PlaygroundState,
  activePresetId: string | null
): PanelConfig {
  return {
    defaultActiveTab: 'input',
    presetConfig: {
      presets: PRESETS,
      activePresetId,
      showCopyButton: true,
      copyLabel: 'Copy Config',
    },
    sections: [
      // -----------------------------------------------------------------------
      // INPUT SECTION
      // -----------------------------------------------------------------------
      {
        id: 'input',
        label: 'Input',
        title: 'Input Settings',
        groups: [
          {
            title: 'Size',
            controls: [
              {
                id: 'config.inputWidth',
                label: 'Width',
                type: 'slider',
                value: state.config.inputWidth,
                min: 160,
                max: 400,
                step: 10,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.inputHeight',
                label: 'Height',
                type: 'slider',
                value: state.config.inputHeight,
                min: 32,
                max: 64,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Expanded State',
            controls: [
              {
                id: 'config.inputPaddingExpanded',
                label: 'H-Padding',
                type: 'slider',
                value: state.config.inputPaddingExpanded,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.inputTopPaddingExpanded',
                label: 'Top Padding',
                type: 'slider',
                value: state.config.inputTopPaddingExpanded,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.inputBackground',
                label: 'Background',
                type: 'select',
                value: state.config.inputBackground ?? 'tertiary',
                options: [...AREA_BACKGROUND_OPTIONS],
              },
            ],
          },
        ],
      },
      // -----------------------------------------------------------------------
      // MENU SECTION
      // -----------------------------------------------------------------------
      {
        id: 'menu',
        label: 'Menu',
        title: 'Menu Settings',
        groups: [
          {
            title: 'Size',
            controls: [
              {
                id: 'config.panelWidth',
                label: 'Panel Width',
                type: 'slider',
                value: state.config.panelWidth,
                min: 240,
                max: 560,
                step: 20,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.maxPanelHeight',
                label: 'Max Height',
                type: 'slider',
                value: state.config.maxPanelHeight,
                min: 200,
                max: 600,
                step: 20,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Appearance',
            controls: [
              {
                id: 'config.menuBackground',
                label: 'Background',
                type: 'select',
                value: state.config.menuBackground ?? 'primary',
                options: [...AREA_BACKGROUND_OPTIONS],
              },
              {
                id: 'config.syncMenuContainerRadius',
                label: 'Sync Radius',
                type: 'toggle',
                value: state.config.syncMenuContainerRadius,
                description: 'Sync container radius to backdrop menu radius',
              },
              {
                id: 'config.menuTopBorderRadius',
                label: 'Top Radius',
                type: 'slider',
                value: state.config.menuTopBorderRadius ?? 0,
                min: 0,
                max: 16,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
                disabled: state.config.syncMenuContainerRadius,
              },
              {
                id: 'config.menuContainerBottomRadius',
                label: 'Bottom Radius',
                type: 'slider',
                value:
                  state.config.menuContainerBottomRadius ??
                  state.config.menuBorderRadius ??
                  state.config.borderRadius,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
                disabled: state.config.syncMenuContainerRadius,
              },
              {
                id: 'config.menuContainerInset',
                label: 'Container Inset',
                type: 'slider',
                value: state.config.menuContainerInset,
                min: 0,
                max: 12,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.menuBorderWidth',
                label: 'Border',
                type: 'slider',
                value: state.config.menuBorderWidth ?? 0,
                min: 0,
                max: 4,
                step: 0.5,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.menuBorderColor',
                label: 'Border Color',
                type: 'select',
                value: state.config.menuBorderColor ?? 'secondary',
                options: [
                  { label: 'Primary', value: 'primary' },
                  { label: 'Secondary', value: 'secondary' },
                  { label: 'Tertiary', value: 'tertiary' },
                  { label: 'Quaternary', value: 'quaternary' },
                  { label: 'Brand', value: 'brand' },
                ],
              },
              {
                id: 'config.menuShine',
                label: 'Shine',
                type: 'select',
                value: state.config.menuShine ?? 'none',
                options: [{ label: 'None', value: 'none' }, ...SHINE_OPTIONS],
              },
              {
                id: 'config.contentTopOffset',
                label: 'Top Offset',
                type: 'slider',
                value: state.config.contentTopOffset,
                min: -12,
                max: 12,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.contentBottomOffset',
                label: 'Bottom Offset',
                type: 'slider',
                value: state.config.contentBottomOffset ?? 0,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Overflow Fade',
            controls: [
              {
                id: 'config.menuOverflowGradient',
                label: 'Enable',
                type: 'toggle',
                value: state.config.menuOverflowGradient ?? false,
              },
              {
                id: 'config.menuOverflowGradientHeight',
                label: 'Height',
                type: 'slider',
                value: state.config.menuOverflowGradientHeight ?? 16,
                min: 8,
                max: 48,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Gradient Inset',
            controls: [
              {
                id: 'config.gradientInsetTop',
                label: 'Top',
                type: 'slider',
                value: state.config.gradientInsetTop ?? 0,
                min: 0,
                max: 16,
                step: 0.5,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.gradientInsetBottom',
                label: 'Bottom',
                type: 'slider',
                value: state.config.gradientInsetBottom ?? 0,
                min: 0,
                max: 16,
                step: 0.5,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.gradientInsetLeft',
                label: 'Left',
                type: 'slider',
                value: state.config.gradientInsetLeft ?? 0,
                min: 0,
                max: 16,
                step: 0.5,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.gradientInsetRight',
                label: 'Right',
                type: 'slider',
                value: state.config.gradientInsetRight ?? 0,
                min: 0,
                max: 16,
                step: 0.5,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Container Padding',
            controls: [
              {
                id: 'config.innerPaddingTop',
                label: 'Top',
                type: 'slider',
                value: state.config.innerPaddingTop,
                min: 0,
                max: 16,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.innerPaddingBottom',
                label: 'Bottom',
                type: 'slider',
                value: state.config.innerPaddingBottom,
                min: 0,
                max: 16,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.innerPaddingLeft',
                label: 'Left',
                type: 'slider',
                value: state.config.innerPaddingLeft,
                min: 0,
                max: 16,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.innerPaddingRight',
                label: 'Right',
                type: 'slider',
                value: state.config.innerPaddingRight,
                min: 0,
                max: 16,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Scrollbar Position',
            controls: [
              {
                id: 'config.scrollbarMarginTop',
                label: 'Top Margin',
                type: 'slider',
                value: state.config.scrollbarMarginTop,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.scrollbarMarginBottom',
                label: 'Bottom Margin',
                type: 'slider',
                value: state.config.scrollbarMarginBottom,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.syncGradientToScrollbar',
                label: 'Sync Gradients',
                type: 'toggle',
                value: state.config.syncGradientToScrollbar,
                description: 'Auto-sync gradient insets to scrollbar margins',
              },
            ],
          },
          {
            title: 'Scroll Content Padding',
            controls: [
              {
                id: 'config.scrollPaddingTop',
                label: 'Top',
                type: 'slider',
                value: state.config.scrollPaddingTop,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.scrollPaddingBottom',
                label: 'Bottom',
                type: 'slider',
                value: state.config.scrollPaddingBottom,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Items',
            controls: [
              {
                id: 'config.itemHeight',
                label: 'Item Height',
                type: 'slider',
                value: state.config.itemHeight,
                min: 28,
                max: 56,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.itemGap',
                label: 'Item Gap',
                type: 'slider',
                value: state.config.itemGap,
                min: 0,
                max: 12,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Debug',
            controls: [
              {
                id: 'config.debug',
                label: 'Show Layers',
                type: 'toggle',
                value: state.config.debug ?? false,
                description:
                  'Red=container, Blue=scroll, Green=content, Yellow=gradients',
              },
            ],
          },
        ],
      },
      // -----------------------------------------------------------------------
      // BACKDROP SECTION
      // -----------------------------------------------------------------------
      {
        id: 'backdrop',
        label: 'Backdrop',
        title: 'Backdrop Settings',
        groups: [
          {
            title: 'Shape',
            controls: [
              {
                id: 'config.borderRadius',
                label: 'Border Radius',
                type: 'slider',
                value: state.config.borderRadius,
                min: 8,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.topBorderRadius',
                label: 'Top Radius',
                type: 'slider',
                value: state.config.topBorderRadius ?? state.config.borderRadius,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.menuBorderRadius',
                label: 'Menu Radius',
                type: 'slider',
                value: state.config.menuBorderRadius ?? state.config.borderRadius,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'config.appearance.squircle',
                label: 'Squircle',
                type: 'toggle',
                value: state.config.appearance.squircle ?? true,
              },
              {
                id: 'config.backdropTopOffset',
                label: 'Top Extension',
                type: 'slider',
                value: state.config.backdropTopOffset ?? 0,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Surface',
            controls: [
              {
                id: 'config.appearance.background',
                label: 'Background',
                type: 'select',
                value: state.config.appearance.background ?? 'primary',
                options: [...BACKGROUND_OPTIONS],
              },
              {
                id: 'config.appearance.shine',
                label: 'Shine',
                type: 'select',
                value: state.config.appearance.shine ?? 'shine-2-subtle',
                options: [...SHINE_OPTIONS],
              },
              {
                id: 'config.appearance.shadow',
                label: 'Shadow',
                type: 'select',
                value: state.config.appearance.shadow ?? '2xl',
                options: [...SHADOW_OPTIONS],
              },
            ],
          },
          {
            title: 'Gradient',
            controls: [
              {
                id: 'config.appearance.gradient',
                label: 'Pattern',
                type: 'select',
                value: state.config.appearance.gradient ?? 'subtle-depth-md',
                options: [...GRADIENT_OPTIONS],
              },
              {
                id: 'config.appearance.gradientColor',
                label: 'Color',
                type: 'select',
                value: state.config.appearance.gradientColor ?? 'tertiary',
                options: [...GRADIENT_COLOR_OPTIONS],
              },
            ],
          },
        ],
      },
      // -----------------------------------------------------------------------
      // ANIMATION SECTION
      // -----------------------------------------------------------------------
      {
        id: 'animation',
        label: 'Animation',
        title: 'Animation Settings',
        groups: [
          {
            title: 'Timing',
            controls: [
              {
                id: 'config.duration',
                label: 'Expand Duration',
                type: 'slider',
                value: state.config.duration,
                min: 100,
                max: 500,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'config.collapseDuration',
                label: 'Collapse Duration',
                type: 'slider',
                value: state.config.collapseDuration,
                min: 50,
                max: 300,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
          {
            title: 'Content Fade',
            controls: [
              {
                id: 'config.contentFadeDuration',
                label: 'Fade Duration',
                type: 'slider',
                value: state.config.contentFadeDuration,
                min: 0,
                max: 200,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'config.contentFadeDelay',
                label: 'Fade Delay',
                type: 'slider',
                value: state.config.contentFadeDelay,
                min: 0,
                max: 100,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },
    ],
    showReset: true,
    resetLabel: 'Reset',
  }
}

// ============================================================================
// NESTED VALUE UPDATER
// ============================================================================

export function updateNestedValue(
  obj: PlaygroundState,
  path: string,
  value: unknown
): PlaygroundState {
  const keys = path.split('.')
  const newObj = JSON.parse(JSON.stringify(obj)) as PlaygroundState
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = newObj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!
    current = current[key]
  }

  const finalKey = keys[keys.length - 1]!
  current[finalKey] = value

  return newObj
}
