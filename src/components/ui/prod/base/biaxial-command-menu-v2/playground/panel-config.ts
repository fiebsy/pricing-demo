/**
 * Biaxial Command Menu V2 Playground - Panel Config Builder
 *
 * Includes Animation Sync section for exploring timing relationships.
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
  BACKDROP_MODE_OPTIONS,
  EXPAND_ORIGIN_OPTIONS,
} from './options'

// ============================================================================
// PANEL CONFIG BUILDER
// ============================================================================

export function buildPanelConfig(
  state: PlaygroundState,
  activePresetId: string | null
): PanelConfig {
  return {
    defaultActiveTab: 'sync',
    presetConfig: {
      presets: PRESETS,
      activePresetId,
      showCopyButton: true,
      copyLabel: 'Copy Config',
    },
    sections: [
      // -----------------------------------------------------------------------
      // ANIMATION SYNC SECTION (NEW - First Tab)
      // -----------------------------------------------------------------------
      {
        id: 'sync',
        label: 'Sync',
        title: 'Animation Sync',
        groups: [
          {
            title: 'Backdrop Animation',
            controls: [
              {
                id: 'config.animationSync.backdropMode',
                label: 'Mode',
                type: 'select',
                value: state.config.animationSync.backdropMode,
                options: [...BACKDROP_MODE_OPTIONS],
              },
              {
                id: 'config.animationSync.backdropDelay',
                label: 'Delay',
                type: 'slider',
                value: state.config.animationSync.backdropDelay,
                min: -100,
                max: 100,
                step: 5,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'config.animationSync.backdropDurationOffset',
                label: 'Duration Offset',
                type: 'slider',
                value: state.config.animationSync.backdropDurationOffset,
                min: -100,
                max: 100,
                step: 5,
                formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}ms`,
              },
            ],
          },
          {
            title: 'Menu Container',
            controls: [
              {
                id: 'config.animationSync.animateMenuContainer',
                label: 'Enable Animation',
                type: 'toggle',
                value: state.config.animationSync.animateMenuContainer,
                description: 'Menu grows from collapsed to expanded',
              },
              {
                id: 'config.animationSync.expandOrigin',
                label: 'Expand Origin',
                type: 'select',
                value: state.config.animationSync.expandOrigin,
                options: [...EXPAND_ORIGIN_OPTIONS],
                disabled: !state.config.animationSync.animateMenuContainer,
              },
              {
                id: 'config.animationSync.menuContainerDelay',
                label: 'Delay',
                type: 'slider',
                value: state.config.animationSync.menuContainerDelay,
                min: 0,
                max: 150,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
                disabled: !state.config.animationSync.animateMenuContainer,
              },
              {
                id: 'config.animationSync.menuContainerDurationOffset',
                label: 'Duration Offset',
                type: 'slider',
                value: state.config.animationSync.menuContainerDurationOffset,
                min: -100,
                max: 100,
                step: 10,
                formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}ms`,
                disabled: !state.config.animationSync.animateMenuContainer,
              },
            ],
          },
          {
            title: 'Base Timing',
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
              {
                id: 'config.contentFadeDuration',
                label: 'Content Fade',
                type: 'slider',
                value: state.config.contentFadeDuration,
                min: 0,
                max: 200,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'config.contentFadeDelay',
                label: 'Content Delay',
                type: 'slider',
                value: state.config.contentFadeDelay,
                min: 0,
                max: 150,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },
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
            title: 'Items',
            controls: [
              {
                id: 'config.itemHeight',
                label: 'Item Height',
                type: 'slider',
                value: state.config.itemHeight,
                min: 24,
                max: 64,
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
              {
                id: 'config.itemsTopGap',
                label: 'Items Top Gap',
                type: 'slider',
                value: state.config.itemsTopGap ?? 0,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
                description: 'Gap above first item in each group',
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
                id: 'config.contentTopOffset',
                label: 'Top Offset',
                type: 'slider',
                value: state.config.contentTopOffset,
                min: -12,
                max: 12,
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
            title: 'Debug',
            controls: [
              {
                id: 'config.debug',
                label: 'Show Layers',
                type: 'toggle',
                value: state.config.debug ?? false,
                description: 'Red=container, Blue=scroll, Green=content',
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
