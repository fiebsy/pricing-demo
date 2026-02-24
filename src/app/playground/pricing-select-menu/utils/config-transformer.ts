/**
 * Config Transformer
 *
 * Transforms playground configuration to component configuration.
 * Handles slow-mo multiplier and variant-specific dimensions.
 */

import type { PricingSelectMenuConfig } from '@/components/ui/features/pricing-select-menu'
import type { PricingSelectMenuPlaygroundConfig, PricingVariantId } from '../config/types'

// ============================================================================
// SLOW-MO MULTIPLIER
// ============================================================================

const SLOW_MO_MULTIPLIER = 5

export function getSlowMoMultiplier(slowMoEnabled: boolean): number {
  return slowMoEnabled ? SLOW_MO_MULTIPLIER : 1
}

// ============================================================================
// VARIANT DIMENSIONS
// ============================================================================

export function getVariantTriggerHeight(
  config: PricingSelectMenuPlaygroundConfig,
  variant: PricingVariantId
): number {
  return variant === 'B' ? config.layout.triggerHeightB : config.layout.triggerHeight
}

export function getVariantMaxBottomHeight(
  config: PricingSelectMenuPlaygroundConfig,
  variant: PricingVariantId
): number {
  return variant === 'B' ? config.layout.maxBottomHeightB : config.layout.maxBottomHeight
}

// ============================================================================
// CONFIG TRANSFORMER
// ============================================================================

export function playgroundConfigToMenuConfig(
  playgroundConfig: PricingSelectMenuPlaygroundConfig,
  variant: PricingVariantId
): Partial<PricingSelectMenuConfig> {
  const slowMoMultiplier = getSlowMoMultiplier(playgroundConfig.demo.slowMo)
  const triggerHeight = getVariantTriggerHeight(playgroundConfig, variant)
  const maxBottomHeight = getVariantMaxBottomHeight(playgroundConfig, variant)

  return {
    layout: {
      triggerWidth: playgroundConfig.layout.triggerWidth,
      triggerHeight,
      panelWidth: playgroundConfig.layout.panelWidth,
      maxBottomHeight,
      borderRadius: playgroundConfig.layout.borderRadius,
      bottomGap: playgroundConfig.layout.bottomGap,
    },
    animation: {
      duration: playgroundConfig.animation.duration * slowMoMultiplier,
      collapseDuration: playgroundConfig.animation.collapseDuration * slowMoMultiplier,
      easing: playgroundConfig.animation.easing,
      animateSlotContainers: playgroundConfig.animation.animateSlotContainers,
      slotContainerDelay: playgroundConfig.animation.slotContainerDelay * slowMoMultiplier,
      slotContainerDurationOffset:
        playgroundConfig.animation.slotContainerDurationOffset * slowMoMultiplier,
      expandOrigin: playgroundConfig.animation.expandOrigin,
    },
    appearance: {
      borderRadius: playgroundConfig.appearance.borderRadius,
      shadow: playgroundConfig.appearance.shadow,
      shine: playgroundConfig.appearance.shine,
      background:
        playgroundConfig.appearance.background === 'none'
          ? 'primary'
          : playgroundConfig.appearance.background,
      gradient: playgroundConfig.appearance.gradient,
      gradientColor: playgroundConfig.appearance.gradientColor,
      squircle: playgroundConfig.appearance.squircle,
      triggerHoverBackground: playgroundConfig.selectMenu.triggerHoverBackground,
    },
    bottomSlot: {
      enabled: playgroundConfig.bottomSlot.enabled,
      heightMode: playgroundConfig.bottomSlot.heightMode,
      height: playgroundConfig.bottomSlot.height,
      scrollable: playgroundConfig.bottomSlot.scrollable,
      background: playgroundConfig.bottomSlot.background,
      shine:
        playgroundConfig.bottomSlot.shine === 'none'
          ? undefined
          : playgroundConfig.bottomSlot.shine,
      borderRadius: playgroundConfig.bottomSlot.borderRadius,
      inset: playgroundConfig.bottomSlot.inset,
      borderWidth: playgroundConfig.bottomSlot.borderWidth,
      borderColor: playgroundConfig.bottomSlot.borderColor,
    },
    debug: playgroundConfig.demo.showDebug,
  }
}
