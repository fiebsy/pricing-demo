/**
 * Pricing Select Menu Demo
 *
 * Demo wrapper that uses the isolated PricingSelectMenu component.
 * Supports A/B variant switching with shared tier state.
 */

'use client'

import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'

import {
  PricingSelectMenu,
  AnimatedSlotContent,
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
  // In upgrade mode, hide Pro base tier (tier-100) - matches biaxial-expand behavior
  const availableTiers = useMemo(() => {
    const tierIds = config.selectMenu.availableTiers
    const upgradeMode = config.selectMenu.upgradeMode
    return PRICING_TIERS.filter((tier) => {
      if (!tierIds.includes(tier.id)) return false
      // In upgrade mode, hide Pro base tier (tier-100)
      if (upgradeMode && tier.id === 'tier-100') return false
      return true
    })
  }, [config.selectMenu.availableTiers, config.selectMenu.upgradeMode])

  // Ensure selected tier stays valid when available tiers change
  useEffect(() => {
    if (!availableTiers.find((t) => t.id === selectedTier.id)) {
      setSelectedTier(availableTiers[0] || PRICING_TIERS[0])
    }
  }, [availableTiers, selectedTier.id])

  // Compute effective expanded state:
  // - Variant B: always expanded (like a static card)
  // - Variant A: normal expand/collapse behavior
  // - autoOpen: playground debug setting to keep expanded
  const isVariantA = pricingVariant === 'A'
  const effectiveExpanded = !isVariantA ? true : autoOpen ? true : expanded

  // Auto-open effect for Variant A
  useEffect(() => {
    if (autoOpen && isVariantA) {
      setExpanded(true)
    }
  }, [autoOpen, isVariantA])

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
    <PricingSelectMenu.Root
      config={menuConfig}
      expanded={effectiveExpanded}
      onExpandedChange={setExpanded}
    >
      <PricingSelectMenu.Backdrop />
      <PricingSelectMenu.Content>
        <PricingSelectMenu.Trigger>
          <AnimatedSlotContent
            variantKey={isVariantA ? 'trigger-a' : 'trigger-b'}
            transition={transitionConfig}
          >
            {isVariantA ? (
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
          </AnimatedSlotContent>
        </PricingSelectMenu.Trigger>
        <PricingSelectMenu.ContentWrapper>
          <PricingSelectMenu.BottomSlot>
            <AnimatedSlotContent
              variantKey={isVariantA ? 'bottom-a' : 'bottom-b'}
              transition={transitionConfig}
            >
              {isVariantA ? (
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
            </AnimatedSlotContent>
          </PricingSelectMenu.BottomSlot>
        </PricingSelectMenu.ContentWrapper>
      </PricingSelectMenu.Content>
    </PricingSelectMenu.Root>
  )
}
