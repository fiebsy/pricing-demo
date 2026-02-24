/**
 * useComputedConfig Hook
 *
 * Encapsulates derived layout values from playground configuration.
 */

import { useMemo } from 'react'
import type { PricingSelectMenuPlaygroundConfig, PricingVariantId } from '../config/types'

interface UseComputedConfigResult {
  /** Config with computed widths based on wrapper and sync settings */
  effectiveConfig: PricingSelectMenuPlaygroundConfig
  /** Container height for Variant B (static card mode), undefined for Variant A */
  computedContainerHeight: number | undefined
}

export function useComputedConfig(
  config: PricingSelectMenuPlaygroundConfig,
  pricingVariant: PricingVariantId,
  measuredWrapperWidth?: number
): UseComputedConfigResult {
  // Calculate effective widths based on wrapper and sync settings
  const effectiveConfig = useMemo(() => {
    let panelWidth = config.layout.panelWidth
    let triggerWidth = config.layout.triggerWidth

    // Panel width mode: 'fill' uses measured wrapper width
    if (config.layout.panelWidthMode === 'fill' && measuredWrapperWidth) {
      panelWidth = measuredWrapperWidth
    }
    // Legacy behavior: If wrapper is enabled with fixed width, panel fills wrapper width
    else if (config.layout.wrapper.enabled && config.layout.wrapper.widthMode === 'fixed') {
      panelWidth = config.layout.wrapper.width
    }

    // Sync trigger width to panel width if enabled
    if (config.layout.syncTriggerWidth) {
      triggerWidth = panelWidth
    }

    return {
      ...config,
      layout: {
        ...config.layout,
        panelWidth,
        triggerWidth,
      },
    }
  }, [config, measuredWrapperWidth])

  // Adaptive container height based on variant-specific height modes
  const computedContainerHeight = useMemo(() => {
    if (!config.layout.wrapper.enabled) return undefined

    const isVariantB = pricingVariant === 'B'
    const heightMode = isVariantB
      ? config.layout.wrapper.heightModeB
      : config.layout.wrapper.heightModeA
    const configuredHeight = isVariantB
      ? config.layout.wrapper.heightB
      : config.layout.wrapper.heightA

    // Auto mode = no fixed height
    if (heightMode !== 'fixed') return undefined

    // For Variant B with fixed height, calculate based on content
    if (isVariantB) {
      const contentHeight =
        config.layout.triggerHeightB +
        config.layout.bottomGap +
        config.layout.maxBottomHeightB

      // Header height (if shown): ~20px for text-sm + marginBottom
      const headerHeight = config.layout.wrapper.header.show
        ? config.layout.wrapper.header.marginBottom + 20
        : 0

      return contentHeight + headerHeight
    }

    // For Variant A with fixed height, use configured height
    return configuredHeight
  }, [config, pricingVariant])

  return { effectiveConfig, computedContainerHeight }
}
