/**
 * Universal Expand - Biaxial Adapter
 *
 * Backward compatibility adapter for converting BiaxialExpandConfig
 * to UniversalExpandConfig. Allows existing BiaxialExpand presets
 * and configurations to work with the new Universal Expand system.
 */

import type { BiaxialExpandConfig, SlotConfig as BiaxialSlotConfig } from '@/components/ui/core/primitives/biaxial-expand/types'
import type {
  UniversalExpandConfig,
  UnifiedSlotConfig,
  ExpandOrigin,
  DimensionMode,
  SlotAppearance,
  SlotAnimation,
  SlotScroll,
} from '../types'
import { DEFAULT_UNIVERSAL_EXPAND_CONFIG } from '../constants'
import { deepMerge } from '../utils'

// ============================================================================
// ORIGIN MAPPING
// ============================================================================

/**
 * Map legacy expand origin to new format.
 */
function mapExpandOrigin(legacy: 'top' | 'center' | 'bottom' | undefined): ExpandOrigin {
  switch (legacy) {
    case 'top': return 'start'
    case 'bottom': return 'end'
    case 'center':
    default:
      return 'center'
  }
}

// ============================================================================
// SLOT CONVERSION
// ============================================================================

/**
 * Convert BiaxialExpand SlotConfig to UnifiedSlotConfig.
 */
function convertSlotConfig(
  biaxialSlot: BiaxialSlotConfig | undefined,
  position: 'top' | 'bottom',
  biaxialConfig: BiaxialExpandConfig
): UnifiedSlotConfig {
  const defaultSlot = DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots[position]

  if (!biaxialSlot) {
    return { ...defaultSlot, enabled: false }
  }

  // Determine dimension mode
  let dimensionMode: DimensionMode = 'fixed'
  if (biaxialSlot.heightMode === 'auto') {
    dimensionMode = 'auto'
  } else if (biaxialSlot.heightMode === 'dynamic') {
    dimensionMode = 'dynamic'
  }

  // Get fixed dimension from config
  const fixedDimension = biaxialSlot.height ??
    (position === 'top' ? biaxialConfig.layout.maxTopHeight : biaxialConfig.layout.maxBottomHeight) ??
    defaultSlot.fixedDimension

  // Build appearance
  const appearance: SlotAppearance = {
    background: biaxialSlot.background ?? defaultSlot.appearance.background,
    shine: (biaxialSlot.shine ?? 'none') as SlotAppearance['shine'],
    borderRadius: biaxialSlot.borderRadius ?? defaultSlot.appearance.borderRadius,
    inset: biaxialSlot.appearance?.inset ?? biaxialSlot.inset ?? defaultSlot.appearance.inset,
    borderWidth: biaxialSlot.borderWidth ?? defaultSlot.appearance.borderWidth,
    borderColor: biaxialSlot.borderColor ?? defaultSlot.appearance.borderColor,
  }

  // Build animation - use appropriate origin based on position
  const legacyOrigin = position === 'top'
    ? biaxialConfig.animation.topExpandOrigin
    : biaxialConfig.animation.expandOrigin

  // Note: delayOffset and durationOffset were removed from BiaxialExpand
  // Use default values from universal config
  const animation: SlotAnimation = {
    delayOffset: defaultSlot.animation.delayOffset,
    durationOffset: defaultSlot.animation.durationOffset,
    expandOrigin: mapExpandOrigin(legacyOrigin),
  }

  // Build scroll config (default values, BiaxialExpand doesn't have these)
  const scroll: SlotScroll = {
    ...defaultSlot.scroll,
  }

  return {
    enabled: biaxialSlot.enabled ?? false,
    dimensionMode,
    fixedDimension,
    maxDimension: position === 'top'
      ? biaxialConfig.layout.maxTopHeight
      : biaxialConfig.layout.maxBottomHeight,
    minDimension: defaultSlot.minDimension,
    appearance,
    animation,
    scroll,
  }
}

// ============================================================================
// CONFIG CONVERSION
// ============================================================================

/**
 * Convert a BiaxialExpandConfig to UniversalExpandConfig.
 *
 * This allows existing BiaxialExpand configurations to work seamlessly
 * with the new Universal Expand component.
 */
export function convertBiaxialConfig(
  biaxialConfig: BiaxialExpandConfig
): UniversalExpandConfig {
  // Convert animation config
  const animation = {
    ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.animation,
    duration: biaxialConfig.animation.duration,
    collapseDuration: biaxialConfig.animation.collapseDuration,
    contentFadeDuration: biaxialConfig.animation.contentFadeDuration,
    contentFadeDelay: biaxialConfig.animation.contentFadeDelay,
    backdropMode: biaxialConfig.animation.backdropMode,
    backdropDelay: biaxialConfig.animation.backdropDelay,
    backdropDurationOffset: biaxialConfig.animation.backdropDurationOffset,
    animateSlotContainers: biaxialConfig.animation.animateSlotContainers,
    slotContainerDelay: biaxialConfig.animation.slotContainerDelay,
    slotContainerDurationOffset: biaxialConfig.animation.slotContainerDurationOffset,
  }

  // Convert layout config
  const layout = {
    ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.layout,
    triggerWidth: biaxialConfig.layout.triggerWidth,
    triggerHeight: biaxialConfig.layout.triggerHeight,
    panelWidth: biaxialConfig.layout.panelWidth,
    borderRadius: biaxialConfig.layout.borderRadius,
    gaps: {
      top: biaxialConfig.layout.topGap ?? 0,
      bottom: biaxialConfig.layout.bottomGap,
      left: 0,
      right: 0,
    },
  }

  // Convert slot configs
  const slots = {
    top: convertSlotConfig(biaxialConfig.topSlot, 'top', biaxialConfig),
    bottom: convertSlotConfig(biaxialConfig.bottomSlot, 'bottom', biaxialConfig),
    left: { ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.left, enabled: false },
    right: { ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.right, enabled: false },
  }

  // Convert trigger slot
  const triggerSlot = {
    enabled: biaxialConfig.triggerSlot?.enabled ?? true,
    background: biaxialConfig.triggerSlot?.background ?? 'none' as const,
    inset: biaxialConfig.triggerSlot?.inset ?? 0,
  }

  return {
    animation,
    layout,
    appearance: biaxialConfig.appearance,
    collapsedBackground: biaxialConfig.collapsedBackground,
    slots,
    triggerSlot,
    confidenceLevel: biaxialConfig.confidenceLevel,
    debug: biaxialConfig.debug,
  }
}

/**
 * Create a UniversalExpandConfig from BiaxialExpandConfig with overrides.
 */
export function fromBiaxialConfig(
  biaxialConfig: Partial<BiaxialExpandConfig>,
  overrides?: Partial<UniversalExpandConfig>
): Partial<UniversalExpandConfig> {
  // Import default biaxial config
  const { DEFAULT_BIAXIAL_EXPAND_CONFIG } = require('@/components/ui/core/primitives/biaxial-expand/constants')

  // Merge with defaults to get complete biaxial config
  const completeBiaxial = deepMerge(DEFAULT_BIAXIAL_EXPAND_CONFIG, biaxialConfig)

  // Convert to universal config
  const universalConfig = convertBiaxialConfig(completeBiaxial)

  // Apply overrides if provided
  return overrides ? deepMerge(universalConfig, overrides) : universalConfig
}
