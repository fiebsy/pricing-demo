/**
 * Pricing Select Menu Demo
 *
 * Pure rendering component that uses the isolated PricingSelectMenu component.
 * Supports A/B variant switching with shared tier state.
 */

'use client'

import * as React from 'react'
import { useEffect, useMemo } from 'react'

import {
  PricingSelectMenu,
  AnimatedSlotContent,
  usePricingSelect,
} from '@/components/ui/features/pricing-select-menu'

import type { PricingSelectMenuPlaygroundConfig, PricingVariantId } from '../config/types'
import { PRICING_TIERS } from '../config/sample-data'
import { playgroundConfigToMenuConfig } from '../utils/config-transformer'

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
  // Use the production hook for state management
  const {
    expanded,
    setExpanded,
    effectiveExpanded: baseEffectiveExpanded,
    selectedTier,
    handleTierSelect,
    availableTiers,
    isVariantA,
  } = usePricingSelect({
    tiers: PRICING_TIERS,
    variant: pricingVariant,
    availableTierIds: config.selectMenu.availableTiers,
    upgradeMode: config.selectMenu.upgradeMode,
  })

  // Playground-specific: autoOpen overrides effective expanded for debugging
  const effectiveExpanded = autoOpen && isVariantA ? true : baseEffectiveExpanded

  // Auto-open effect for Variant A (playground feature)
  useEffect(() => {
    if (autoOpen && isVariantA) {
      setExpanded(true)
    }
  }, [autoOpen, isVariantA, setExpanded])

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
                dropdownIcon={config.selectMenu.dropdownIcon}
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
