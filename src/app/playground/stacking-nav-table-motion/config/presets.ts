/**
 * Stacking Nav + Table Motion Playground - Presets
 *
 * Combined presets merging table defaults with motion animation defaults.
 */

import {
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
} from '@/components/ui/features/experimental/stacking-nav-motion'
import type { PlaygroundConfig, ConfigPreset } from './types'

// =============================================================================
// HELPERS
// =============================================================================

/** Convert seconds to ms for playground sliders */
const toMs = (s: number) => Math.round(s * 1000)

// =============================================================================
// TABLE DEFAULTS (from stacking-nav-table)
// =============================================================================

const TABLE_DEFAULTS = {
  // Data
  dataVariant: 'characters' as const,

  // Layout
  pageBackground: 'secondary_alt' as const,
  pageTopGap: 256,
  pageMaxWidth: 840,

  // Table Features
  enableSelection: false,
  showColumnControl: false,
  showCount: true,
  toolbarPaddingTop: 8,
  toolbarPaddingBottom: 16,
  toolbarPaddingLeft: 2,
  toolbarPaddingRight: 0,
  navToCountGap: 12,
  tableOpacity: 100,
  tableMuted: false,
  enableColumnReorder: true,

  // Borders
  borderRadius: 8,
  showOuterBorder: true,
  showRowBorders: false,
  showCellBorders: false,
  outerBorderColor: 'secondary' as const,
  rowBorderColor: 'secondary' as const,
  rowBorderOpacity: 40,
  cellBorderColor: 'secondary' as const,
  cellBorderOpacity: 35,

  // Badge
  badgeStyle: 'default' as const,
  badgeShape: 'squircle' as const,
  badgeNeutral: true,

  // Origin Avatar
  originAvatarWidth: 20,
  originAvatarHeight: 20,
  originImageType: 'poster' as const,
  originLogoBg: false,
  originLogoBgColor: 'bg-tertiary',
  originLogoPaddingX: 4,
  originLogoPaddingY: 3,
  originLogoShine: 'none',
  originLogoSquircle: false,
  originLogoInvert: 0,

  // Sparkline
  sparklineHeight: 24,
  sparklineStrokeWidth: 1.5,
  sparklineShowFill: true,
  sparklineShowDot: true,

  // Debug
  showNavDebug: false,
}

// =============================================================================
// MOTION DEFAULTS (from stacking-nav-motion component)
// =============================================================================

function motionConfigFromDefaults() {
  const a = DEFAULT_ANIMATION_CONFIG
  const s = DEFAULT_STYLE_CONFIG

  return {
    // Animation type
    animationType: a.type,

    // Spring
    springStiffness: a.stiffness,
    springDamping: a.damping,
    springPreset: 'smooth' as const,

    // Tween (ms)
    tweenDuration: toMs(a.duration),
    tweenEase: a.ease,

    // Promotion (ms)
    promotionDuration: toMs(a.promotionDuration),
    promotionScale: a.promotionScale,

    // Child entry (ms)
    childStagger: toMs(a.stagger),
    entryDirection: 'custom' as const,
    entryOffsetX: a.entryOffsetX,
    entryOffsetY: a.entryOffsetY,
    childEntryDelay: toMs(a.childEntryDelay),
    childEntryScale: a.entryScale,

    // Exit (ms)
    exitScale: a.exitScale,
    exitUseCustomTiming: a.exitUseCustomTiming,
    exitDuration: toMs(a.exitDuration),
    exitEase: a.exitEase,
    exitDelay: toMs(a.exitDelay),
    collapseLayoutDuration: toMs(a.collapseLayoutDuration),

    // Leaf
    skipLeafAnimation: a.skipLeafAnimation,

    // Style
    buttonSize: s.buttonSize,
    buttonRoundness: s.buttonRoundness,
    expandedVariant: s.expandedVariant,
    childVariant: s.childVariant,
    anchoredVariant: s.anchoredVariant,
    selectedLeafVariant: s.selectedLeafVariant,
    peekOffset: s.peekOffset,
    anchoredOpacity: s.anchoredOpacity,
    gap: s.gap,

    // Level All
    showLevelAll: s.showLevelAll,
    levelAllLabel: s.levelAllLabel,
    levelAllActiveVariant: s.levelAllActiveVariant,
    levelAllInactiveVariant: s.levelAllInactiveVariant,

    // Interaction (ms)
    hoverDelay: toMs(a.hoverDelay),

    // Display
    showNumbers: false,

    // Debug
    timeScale: a.timeScale,
  }
}

// =============================================================================
// COMBINED PRESETS
// =============================================================================

/** Default preset — easing-based animation */
const MOTION_DEFAULTS = motionConfigFromDefaults()

export const PRESET_DEFAULT: PlaygroundConfig = {
  configPreset: 'default',
  ...TABLE_DEFAULTS,
  ...MOTION_DEFAULTS,
}

/** Spring preset — physics-based animation */
export const PRESET_SPRING: PlaygroundConfig = {
  configPreset: 'spring',
  ...TABLE_DEFAULTS,
  ...MOTION_DEFAULTS,
  // Override with spring-specific values
  animationType: 'spring',
  springStiffness: 500,
  springDamping: 30,
  springPreset: 'smooth',
  tweenDuration: 300,
  tweenEase: 'easeOut',
  promotionDuration: 400,
  promotionScale: 1,
  childStagger: 25,
  entryDirection: 'up',
  entryOffsetX: 0,
  entryOffsetY: 12,
  childEntryDelay: 50,
  childEntryScale: 0.95,
  exitScale: 0.95,
  exitUseCustomTiming: false,
  exitDuration: 300,
  exitEase: 'easeIn',
  exitDelay: 0,
  collapseLayoutDuration: 150,
  skipLeafAnimation: false,
  buttonSize: 'md',
  buttonRoundness: 'default',
  expandedVariant: 'shine',
  childVariant: 'tertiary',
  anchoredVariant: 'secondary',
  selectedLeafVariant: 'primary',
  peekOffset: 8,
  anchoredOpacity: 0.6,
  gap: 'md',
  showLevelAll: false,
  levelAllLabel: 'All',
  levelAllActiveVariant: 'tab',
  levelAllInactiveVariant: 'tertiary',
  hoverDelay: 200,
  timeScale: 1,
}

export const CONFIG_PRESETS: Record<ConfigPreset, PlaygroundConfig | null> = {
  default: PRESET_DEFAULT,
  spring: PRESET_SPRING,
  custom: null,
}

export type PresetId = 'default' | 'spring'

export const PRESETS: Record<PresetId, PlaygroundConfig> = {
  default: PRESET_DEFAULT,
  spring: PRESET_SPRING,
}
