/**
 * PricingSelectSlot Component
 *
 * Dedicated slot for rendering PricingSelectMenu within the modal.
 * Switches between A/B variants based on stage configuration.
 *
 * - Variant A: Expandable dropdown for tier selection (Stage 1)
 * - Variant B: Static card showing selected tier (Stages 2-3)
 */

'use client'

import * as React from 'react'
import { useMemo, useEffect, useState } from 'react'

import {
  PricingSelectMenu,
  UPGRADE_FLOW_PRESET,
  AnimatedSlotContent,
  type PricingSelectMenuConfig,
  type PricingTier,
  type VariantTransitionConfig,
} from '@/components/ui/features/pricing-select-menu'

import type { ContentSlotConfig, PricingSelectConfig } from '../config/types'
import { PRICING_TIERS } from './pricing-tiers'

// ============================================================================
// COMPONENT
// ============================================================================

interface PricingSelectSlotProps {
  /** Per-stage slot configuration */
  config: ContentSlotConfig
  /** Global pricing select configuration */
  globalConfig: PricingSelectConfig
  /** Currently selected tier (lifted state) */
  selectedTier: PricingTier
  /** Tier selection handler (lifted state) */
  onTierSelect: (tier: PricingTier) => void
  /** Container width for 'fill' mode calculation */
  containerWidth?: number
}

// Font size classes
const FONT_SIZE_CLASSES = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
} as const

// Font weight classes
const FONT_WEIGHT_CLASSES = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
} as const

// Text color classes
const TEXT_COLOR_CLASSES = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
} as const

export function PricingSelectSlot({
  config,
  globalConfig,
  selectedTier,
  onTierSelect,
  containerWidth,
}: PricingSelectSlotProps) {
  const isVariantA = config.pricingVariant === 'A'

  // Calculate effective panel width
  const effectivePanelWidth = useMemo(() => {
    if (globalConfig.panelWidth === 'fill' && containerWidth) {
      return containerWidth
    }
    return typeof globalConfig.panelWidth === 'number' ? globalConfig.panelWidth : 352
  }, [globalConfig.panelWidth, containerWidth])

  // Local expanded state for Variant A
  const [expanded, setExpanded] = useState(false)

  // Filter available tiers based on config
  const availableTiers = useMemo(() => {
    const tierIds = globalConfig.availableTiers
    const upgradeMode = globalConfig.upgradeMode
    return PRICING_TIERS.filter((tier) => {
      if (!tierIds.includes(tier.id)) return false
      if (upgradeMode && tier.id === 'tier-100') return false
      return true
    })
  }, [globalConfig.availableTiers, globalConfig.upgradeMode])

  // Ensure selected tier stays valid when available tiers change
  useEffect(() => {
    if (!availableTiers.find((t) => t.id === selectedTier.id)) {
      onTierSelect(availableTiers[0] || PRICING_TIERS[0])
    }
  }, [availableTiers, selectedTier.id, onTierSelect])

  // Effective expanded state:
  // - Variant B: always expanded (static card)
  // - Variant A: normal expand/collapse behavior
  const effectiveExpanded = !isVariantA ? true : expanded

  // Handle tier selection
  const handleTierSelect = (tier: PricingTier) => {
    onTierSelect(tier)
    setExpanded(false)
  }

  // Build menu config based on variant
  const menuConfig = useMemo<Partial<PricingSelectMenuConfig>>(() => {
    const variantDimensions = isVariantA ? globalConfig.variantA : globalConfig.variantB
    const triggerHeight = variantDimensions.triggerHeight
    const maxBottomHeight = isVariantA
      ? globalConfig.variantA.maxBottomHeight
      : globalConfig.variantB.bottomHeight

    return {
      layout: {
        triggerWidth: effectivePanelWidth,
        triggerHeight,
        panelWidth: effectivePanelWidth,
        maxBottomHeight,
        borderRadius: globalConfig.appearance.borderRadius,
        bottomGap: 0,
      },
      appearance: {
        borderRadius: 'xl',
        shadow: 'none',
        shine: globalConfig.appearance.shine as 'none' | 'shine-0' | 'shine-1' | 'shine-2' | 'shine-3',
        background: globalConfig.appearance.background,
        gradient: 'subtle-depth-md',
        gradientColor: 'tertiary',
        squircle: false,
        triggerHoverBackground: 'tertiary',
      },
      bottomSlot: {
        enabled: true,
        heightMode: 'dynamic',
        height: maxBottomHeight,
        scrollable: isVariantA,
        background: 'primary',
        shine: undefined,
        borderRadius: 12,
        inset: 4,
        borderWidth: 1,
        borderColor: 'primary',
      },
    }
  }, [globalConfig, isVariantA, effectivePanelWidth])

  // Build transition config for AnimatedSlotContent
  const transitionConfig: VariantTransitionConfig = {
    enabled: globalConfig.transition.enabled,
    type: 'spring',
    duration: globalConfig.transition.duration,
    bounce: globalConfig.transition.bounce,
    yOffset: globalConfig.transition.yOffset,
  }

  // Header config
  const headerConfig = globalConfig.header

  // Calculate container height from global pricing config
  // Header only shows in variant A
  const headerHeight = (headerConfig?.show && isVariantA) ? (headerConfig.marginBottom + 20) : 0
  const variantDimensions = isVariantA ? globalConfig.variantA : globalConfig.variantB

  // For Variant A: trigger height + header
  // For Variant B: trigger + bottom slot (no header)
  const calculatedHeight = isVariantA
    ? variantDimensions.triggerHeight + headerHeight
    : variantDimensions.triggerHeight + globalConfig.variantB.bottomHeight

  return (
    <div
      className="w-full flex flex-col items-start"
      style={{
        height: isVariantA ? undefined : calculatedHeight,
        minHeight: isVariantA ? calculatedHeight : undefined,
        overflow: 'visible',
        position: 'relative',
        zIndex: effectiveExpanded ? 100 : 'auto',
      }}
    >
      {/* Header - only show in variant A */}
      {headerConfig?.show && isVariantA && (
        <div
          className={`${FONT_SIZE_CLASSES[headerConfig.fontSize]} ${FONT_WEIGHT_CLASSES[headerConfig.fontWeight]} ${TEXT_COLOR_CLASSES[headerConfig.textColor]}`}
          style={{
            opacity: headerConfig.opacity / 100,
            marginBottom: headerConfig.marginBottom,
          }}
        >
          {headerConfig.text}
        </div>
      )}
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
                  showDropdownIcon={true}
                  dropdownIconRotates={true}
                  triggerTypography={UPGRADE_FLOW_PRESET.typography.trigger}
                  syncedSubtext={UPGRADE_FLOW_PRESET.typography.syncedSubtext}
                  triggerPaddingX={20}
                  triggerPaddingTop={0}
                  triggerPaddingBottom={0}
                  upgradeMode={globalConfig.upgradeMode}
                />
              ) : (
                <PricingSelectMenu.TriggerContentB
                  selectedTier={selectedTier}
                  variantBConfig={UPGRADE_FLOW_PRESET.variantB.trigger}
                />
              )}
            </AnimatedSlotContent>
          </PricingSelectMenu.Trigger>
          <PricingSelectMenu.ContentWrapper>
            <PricingSelectMenu.BottomSlot>
              <AnimatedSlotContent
                variantKey={isVariantA ? 'options-list' : 'bottom-b'}
                transition={transitionConfig}
              >
                {isVariantA ? (
                  <PricingSelectMenu.OptionsList
                    tiers={availableTiers}
                    selectedId={selectedTier.id}
                    onSelect={handleTierSelect}
                    showHeader={true}
                    headerLabel="Plans"
                    headerTextColor="tertiary"
                    headerFontWeight="medium"
                    headerFontSize="xs"
                    headerOpacity="40"
                    headerUppercase={false}
                    headerPaddingBottom={0}
                    containerPadding={4}
                    itemPaddingX={12}
                    itemPaddingY={12}
                    itemBorderRadius={8}
                    itemGap={0}
                    itemHoverBackground="tertiary"
                    showSelectedIndicator={false}
                    itemTypography={UPGRADE_FLOW_PRESET.typography.items}
                    menuItemLabel={UPGRADE_FLOW_PRESET.typography.menuItemLabel}
                    upgradeMode={globalConfig.upgradeMode}
                  />
                ) : (
                  <PricingSelectMenu.BottomContentB
                    selectedTier={selectedTier}
                    variantBConfig={UPGRADE_FLOW_PRESET.variantB.bottom}
                  />
                )}
              </AnimatedSlotContent>
            </PricingSelectMenu.BottomSlot>
          </PricingSelectMenu.ContentWrapper>
        </PricingSelectMenu.Content>
      </PricingSelectMenu.Root>
    </div>
  )
}
