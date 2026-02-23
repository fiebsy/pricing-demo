/**
 * Pricing Select Menu Demo
 *
 * Demo wrapper that uses the isolated PricingSelectMenu component.
 * Supports A/B variant switching with shared tier state.
 */

'use client'

import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import {
  PricingSelectMenu,
  type PricingSelectMenuConfig,
  type PricingTier,
} from '@/components/ui/features/pricing-select-menu'

import type {
  PricingSelectMenuPlaygroundConfig,
  PricingVariantId,
} from '../config/types'
import { PRICING_TIERS } from '../config/sample-data'

// ============================================================================
// CONFIG TRANSFORMER
// ============================================================================

function playgroundConfigToMenuConfig(
  playgroundConfig: PricingSelectMenuPlaygroundConfig,
  variant: PricingVariantId
): Partial<PricingSelectMenuConfig> {
  // Slow-mo multiplier for debugging animations
  const slowMoMultiplier = playgroundConfig.demo.slowMo ? 5 : 1

  // Use variant-specific heights
  const triggerHeight =
    variant === 'B'
      ? playgroundConfig.layout.triggerHeightB
      : playgroundConfig.layout.triggerHeight

  const maxBottomHeight =
    variant === 'B'
      ? playgroundConfig.layout.maxBottomHeightB
      : playgroundConfig.layout.maxBottomHeight

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
      contentFadeDuration: playgroundConfig.animation.contentFadeDuration * slowMoMultiplier,
      contentFadeDelay: playgroundConfig.animation.contentFadeDelay * slowMoMultiplier,
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

// ============================================================================
// DEMO COMPONENT
// ============================================================================

interface PricingSelectDemoProps {
  config: PricingSelectMenuPlaygroundConfig
  autoOpen?: boolean
  pricingVariant: PricingVariantId
}

export function PricingSelectDemo({
  config,
  autoOpen = false,
  pricingVariant,
}: PricingSelectDemoProps) {
  const [expanded, setExpanded] = useState(false)
  const [selectedTier, setSelectedTier] = useState<PricingTier>(PRICING_TIERS[0])

  // Filter available tiers based on config
  const availableTiers = useMemo(() => {
    return PRICING_TIERS.filter((tier) =>
      config.selectMenu.availableTiers.includes(tier.id)
    )
  }, [config.selectMenu.availableTiers])

  // Auto-open effect
  useEffect(() => {
    if (autoOpen) {
      setExpanded(true)
    }
  }, [autoOpen])

  // Handle tier selection
  const handleTierSelect = (tier: PricingTier) => {
    setSelectedTier(tier)
    setExpanded(false)
  }

  // Transform playground config to component config
  const menuConfig = useMemo(
    () => playgroundConfigToMenuConfig(config, pricingVariant),
    [config, pricingVariant]
  )

  // Variant transition config
  const transitionConfig = config.variantB.transition

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pricingVariant}
        initial={
          transitionConfig.enabled
            ? { opacity: 0, y: transitionConfig.yOffset }
            : false
        }
        animate={{ opacity: 1, y: 0 }}
        exit={
          transitionConfig.enabled
            ? { opacity: 0, y: -transitionConfig.yOffset }
            : undefined
        }
        transition={
          transitionConfig.enabled
            ? transitionConfig.type === 'spring'
              ? {
                  type: 'spring',
                  duration: transitionConfig.duration,
                  bounce: transitionConfig.bounce,
                }
              : { type: 'tween', duration: transitionConfig.duration }
            : { duration: 0 }
        }
      >
        <PricingSelectMenu.Root
          config={menuConfig}
          expanded={expanded}
          onExpandedChange={setExpanded}
        >
          <PricingSelectMenu.Backdrop />
          <PricingSelectMenu.Content>
            <PricingSelectMenu.Trigger>
              {pricingVariant === 'A' ? (
                <PricingSelectMenu.TriggerContentA
                  selectedTier={selectedTier}
                  showDropdownIcon={config.selectMenu.showDropdownIcon}
                  dropdownIconRotates={config.selectMenu.dropdownIconRotates}
                  triggerTypography={config.selectMenu.triggerTypography}
                  syncedSubtext={config.selectMenu.syncedSubtext}
                  triggerPaddingX={config.selectMenu.triggerPaddingX}
                  triggerPaddingTop={config.selectMenu.triggerPaddingTop}
                  triggerPaddingBottom={config.selectMenu.triggerPaddingBottom}
                  triggerStyle={config.trigger}
                  upgradeMode={config.selectMenu.upgradeMode}
                />
              ) : (
                <PricingSelectMenu.TriggerContentB
                  selectedTier={selectedTier}
                  variantBConfig={config.variantB.trigger}
                  triggerStyle={config.trigger}
                />
              )}
            </PricingSelectMenu.Trigger>
            <PricingSelectMenu.ContentWrapper>
              <PricingSelectMenu.BottomSlot>
                {pricingVariant === 'A' ? (
                  <PricingSelectMenu.OptionsList
                    tiers={availableTiers}
                    selectedId={selectedTier.id}
                    onSelect={handleTierSelect}
                    showHeader={config.selectMenu.showHeader}
                    headerLabel={config.selectMenu.headerLabel}
                    headerTextColor={config.selectMenu.headerTextColor}
                    headerFontWeight={config.selectMenu.headerFontWeight}
                    headerFontSize={config.selectMenu.headerFontSize}
                    headerOpacity={config.selectMenu.headerOpacity}
                    headerUppercase={config.selectMenu.headerUppercase}
                    headerPaddingBottom={config.selectMenu.headerPaddingBottom}
                    containerPadding={config.selectMenu.containerPadding}
                    itemPaddingX={config.selectMenu.itemPaddingX}
                    itemPaddingY={config.selectMenu.itemPaddingY}
                    itemBorderRadius={config.selectMenu.itemBorderRadius}
                    itemGap={config.selectMenu.itemGap}
                    itemHoverBackground={config.selectMenu.itemHoverBackground}
                    showSelectedIndicator={config.selectMenu.showSelectedIndicator}
                    itemTypography={config.selectMenu.itemTypography}
                    menuItemLabel={config.selectMenu.menuItemLabel}
                    upgradeMode={config.selectMenu.upgradeMode}
                  />
                ) : (
                  <PricingSelectMenu.BottomContentB
                    selectedTier={selectedTier}
                    variantBConfig={config.variantB.bottomSlot}
                  />
                )}
              </PricingSelectMenu.BottomSlot>
            </PricingSelectMenu.ContentWrapper>
          </PricingSelectMenu.Content>
        </PricingSelectMenu.Root>
      </motion.div>
    </AnimatePresence>
  )
}
