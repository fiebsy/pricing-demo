/**
 * PricingContent Component
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
  type PricingSelectMenuConfig,
  type PricingTier,
} from '@/components/ui/features/pricing-select-menu'

import type { PricingVariant, PricingSelectConfig } from '../config/types'
import { PRICING_TIERS } from './pricing-tiers'
import {
  DEFAULT_VARIANT_B_TRIGGER,
  DEFAULT_VARIANT_B_BOTTOM,
  DEFAULT_TRIGGER_TYPOGRAPHY,
  DEFAULT_SYNCED_SUBTEXT,
  DEFAULT_ITEM_TYPOGRAPHY,
  DEFAULT_MENU_ITEM_LABEL,
} from '../config/defaults'

// ============================================================================
// Props
// ============================================================================

interface PricingContentProps {
  /** Pricing variant: A (dropdown) or B (static card) */
  variant: PricingVariant
  /** Pricing select configuration */
  config: PricingSelectConfig
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

// ============================================================================
// Component
// ============================================================================

export function PricingContent({
  variant,
  config,
  selectedTier,
  onTierSelect,
  containerWidth,
}: PricingContentProps) {
  const isVariantA = variant === 'A'

  // Calculate effective panel width
  const effectivePanelWidth = useMemo(() => {
    if (config.panelWidth === 'fill' && containerWidth) {
      return containerWidth
    }
    return typeof config.panelWidth === 'number' ? config.panelWidth : 352
  }, [config.panelWidth, containerWidth])

  // Local expanded state for Variant A
  const [expanded, setExpanded] = useState(false)

  // Filter available tiers based on config
  const availableTiers = useMemo(() => {
    const tierIds = config.availableTiers
    const upgradeMode = config.upgradeMode
    return PRICING_TIERS.filter((tier) => {
      if (!tierIds.includes(tier.id)) return false
      if (upgradeMode && tier.id === 'tier-100') return false
      return true
    })
  }, [config.availableTiers, config.upgradeMode])

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
    const triggerHeight = isVariantA ? config.variantATriggerHeight : config.variantBTriggerHeight
    const maxBottomHeight = isVariantA ? config.variantAMaxBottomHeight : config.variantBBottomHeight

    return {
      layout: {
        triggerWidth: effectivePanelWidth,
        triggerHeight,
        panelWidth: effectivePanelWidth,
        maxBottomHeight,
        borderRadius: config.borderRadius,
        bottomGap: 0,
      },
      appearance: {
        borderRadius: 'xl',
        shadow: 'none',
        shine: config.shine as 'none' | 'shine-0' | 'shine-1' | 'shine-2' | 'shine-3',
        background: config.background,
        gradient: 'subtle-depth-md',
        gradientColor: 'tertiary',
        squircle: false,
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
  }, [config, isVariantA, effectivePanelWidth])

  // Calculate container height
  const headerHeight = config.headerShow ? (config.headerMarginBottom + 20) : 0
  const calculatedHeight = isVariantA
    ? config.variantATriggerHeight + headerHeight
    : config.variantBTriggerHeight + config.variantBBottomHeight + headerHeight

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
      {/* Header */}
      {config.headerShow && (
        <div
          className={`${FONT_SIZE_CLASSES['sm']} ${FONT_WEIGHT_CLASSES['medium']} ${TEXT_COLOR_CLASSES['tertiary']}`}
          style={{
            opacity: 0.8,
            marginBottom: config.headerMarginBottom,
          }}
        >
          {config.headerText}
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
            {isVariantA ? (
              <PricingSelectMenu.TriggerContentA
                selectedTier={selectedTier}
                showDropdownIcon={true}
                dropdownIconRotates={true}
                triggerTypography={DEFAULT_TRIGGER_TYPOGRAPHY}
                syncedSubtext={DEFAULT_SYNCED_SUBTEXT}
                triggerPaddingX={20}
                triggerPaddingTop={0}
                triggerPaddingBottom={0}
                upgradeMode={config.upgradeMode}
              />
            ) : (
              <PricingSelectMenu.TriggerContentB
                selectedTier={selectedTier}
                variantBConfig={DEFAULT_VARIANT_B_TRIGGER}
              />
            )}
          </PricingSelectMenu.Trigger>
          <PricingSelectMenu.ContentWrapper>
            <PricingSelectMenu.BottomSlot>
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
                  itemTypography={DEFAULT_ITEM_TYPOGRAPHY}
                  menuItemLabel={DEFAULT_MENU_ITEM_LABEL}
                  upgradeMode={config.upgradeMode}
                />
              ) : (
                <PricingSelectMenu.BottomContentB
                  selectedTier={selectedTier}
                  variantBConfig={DEFAULT_VARIANT_B_BOTTOM}
                />
              )}
            </PricingSelectMenu.BottomSlot>
          </PricingSelectMenu.ContentWrapper>
        </PricingSelectMenu.Content>
      </PricingSelectMenu.Root>
    </div>
  )
}
