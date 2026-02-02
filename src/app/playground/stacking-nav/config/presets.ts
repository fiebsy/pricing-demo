import {
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
} from '@/components/ui/features/stacking-nav'
import type { PlaygroundConfig, ConfigPreset } from './types'

// =============================================================================
// HELPERS
// =============================================================================

/** Convert seconds to ms for playground sliders */
const toMs = (s: number) => Math.round(s * 1000)

/**
 * Build a full playground config from the prod defaults.
 * Animation durations are stored in ms for slider controls;
 * page.tsx converts them back to seconds before passing to the component.
 */
function configFromProdDefaults(): Omit<PlaygroundConfig, 'configPreset' | 'navVariant'> {
  const a = DEFAULT_ANIMATION_CONFIG
  const s = DEFAULT_STYLE_CONFIG

  return {
    // Animation type
    animationType: a.type,

    // Spring
    springStiffness: a.stiffness,
    springDamping: a.damping,
    springPreset: 'smooth',

    // Tween (ms)
    tweenDuration: toMs(a.duration),
    tweenEase: a.ease,

    // Promotion (ms)
    promotionDuration: toMs(a.promotionDuration),
    promotionScale: a.promotionScale,

    // Child entry (ms)
    childStagger: toMs(a.stagger),
    entryDirection: 'custom',
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

    // Style — pulled directly from prod defaults
    buttonSize: s.buttonSize,
    buttonRoundness: s.buttonRoundness,
    expandedVariant: s.expandedVariant,
    childVariant: s.childVariant,
    anchoredVariant: s.anchoredVariant,
    selectedLeafVariant: s.selectedLeafVariant,
    peekOffset: s.peekOffset,
    anchoredOpacity: s.anchoredOpacity,
    clipAnchored: s.clipAnchored,
    clipOffset: s.clipOffset,
    clipSide: s.clipSide,
    clipDelay: s.clipDelay * 1000,
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
    showDebug: false,
    pageBackground: 'primary',

    // Debug
    timeScale: a.timeScale,
  }
}

// =============================================================================
// FULL CONFIG PRESETS
// =============================================================================

/** Default preset — derived from prod DEFAULT_ANIMATION_CONFIG + DEFAULT_STYLE_CONFIG */
const PRESET_DEFAULT = configFromProdDefaults()

/** Spring preset - physics-based spring animation */
const PRESET_SPRING: Omit<PlaygroundConfig, 'configPreset' | 'navVariant'> = {
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
  clipAnchored: true,
  clipOffset: 8,
  clipSide: 'left',
  clipDelay: 0,
  gap: 'md',
  showNumbers: false,
  showDebug: false,
  pageBackground: 'primary',
  showLevelAll: false,
  levelAllLabel: 'All',
  levelAllActiveVariant: 'tab',
  levelAllInactiveVariant: 'tertiary',
  hoverDelay: 200,
  timeScale: 1,
}

export const CONFIG_PRESETS: Record<ConfigPreset, Omit<PlaygroundConfig, 'configPreset' | 'navVariant'> | null> = {
  default: PRESET_DEFAULT,
  spring: PRESET_SPRING,
  custom: null,
}

export const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  configPreset: 'default',
  ...PRESET_DEFAULT,
  navVariant: 'orders',
}
