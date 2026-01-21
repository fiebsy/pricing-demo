/**
 * Biaxial Command Menu Playground - Presets
 *
 * Pre-configured menu states for quick testing and demonstration.
 */

import type { Preset } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from './types'
import { DEFAULT_COMMAND_CONFIG } from '../core/constants'

// ============================================================================
// PRESETS
// ============================================================================

export const PRESETS: Preset<PlaygroundState>[] = [
  {
    id: 'default',
    name: 'Default',
    data: {
      config: DEFAULT_COMMAND_CONFIG,
    },
  },
  {
    id: 'inset-menu',
    name: 'Inset Menu',
    data: {
      config: {
        ...DEFAULT_COMMAND_CONFIG,
        borderRadius: 18,
        menuBorderRadius: 18,
        maxPanelHeight: 380,
        menuBorderWidth: 1,
        menuBorderColor: 'primary',
        contentTopOffset: 6,
        inputBackground: 'none',
        menuBackground: 'secondary',
        menuOverflowGradient: true,
        menuOverflowGradientHeight: 24,
        gradientInsetRight: 9,
        scrollPaddingBottom: 20,
        scrollbarMarginBottom: 4,
        syncGradientToScrollbar: true,
        syncMenuContainerRadius: true,
        menuContainerInset: 3,
        appearance: {
          ...DEFAULT_COMMAND_CONFIG.appearance,
          background: 'tertiary',
        },
      },
    },
  },
  {
    id: 'deep-inset',
    name: 'Deep Inset',
    data: {
      config: {
        ...DEFAULT_COMMAND_CONFIG,
        borderRadius: 20,
        menuBorderRadius: 20,
        maxPanelHeight: 380,
        menuBorderWidth: 1,
        menuBorderColor: 'primary',
        contentTopOffset: 6,
        inputBackground: 'none',
        menuBackground: 'secondary',
        menuOverflowGradient: true,
        menuOverflowGradientHeight: 28,
        gradientInsetRight: 12,
        scrollPaddingBottom: 24,
        scrollbarMarginBottom: 6,
        syncGradientToScrollbar: true,
        syncMenuContainerRadius: true,
        // Higher inset demonstrates adaptive radius calculation
        menuContainerInset: 8,
        appearance: {
          ...DEFAULT_COMMAND_CONFIG.appearance,
          background: 'tertiary',
        },
      },
    },
  },
  {
    id: 'elevated',
    name: 'Elevated',
    data: {
      config: {
        ...DEFAULT_COMMAND_CONFIG,
        duration: 250,
        collapseDuration: 125,
        contentFadeDuration: 0,
        contentFadeDelay: 0,
        inputHeight: 40,
        inputWidth: 280,
        panelWidth: 320,
        maxPanelHeight: 380,
        innerPaddingTop: 4,
        innerPaddingBottom: 4,
        innerPaddingLeft: 12,
        innerPaddingRight: 4,
        itemHeight: 48,
        itemGap: 2,
        borderRadius: 18,
        menuBorderRadius: 18,
        menuTopBorderRadius: 16,
        menuContainerBottomRadius: 16,
        menuBorderWidth: 1,
        menuBorderColor: 'primary',
        contentTopOffset: 6,
        contentBottomOffset: 0,
        inputPaddingExpanded: 14,
        inputTopPaddingExpanded: 0,
        backdropTopOffset: 6,
        inputBackground: 'none',
        menuBackground: 'secondary',
        menuOverflowGradient: true,
        menuOverflowGradientHeight: 24,
        gradientInsetRight: 9,
        scrollPaddingTop: 8,
        scrollPaddingBottom: 10,
        syncGradientToScrollbar: true,
        syncMenuContainerRadius: true,
        menuContainerInset: 4,
        appearance: {
          borderRadius: '2xl',
          shadow: '2xl',
          shine: 'shine-3',
          background: 'secondary',
          gradient: 'subtle-depth-lg',
          gradientColor: 'tertiary',
          squircle: true,
        },
      },
    },
  },
]

// ============================================================================
// DEFAULT STATE
// ============================================================================

export const DEFAULT_STATE: PlaygroundState = PRESETS[0]!.data
