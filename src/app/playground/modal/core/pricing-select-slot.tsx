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
  type PricingSelectMenuConfig,
  type PricingTier,
} from '@/components/ui/features/pricing-select-menu'

import type { ContentSlotConfig, PricingSelectConfig } from '../config/types'
import { PRICING_TIERS } from './pricing-tiers'

// ============================================================================
// DEFAULT CONFIGS (for variant B display)
// ============================================================================

const DEFAULT_VARIANT_B_TRIGGER = {
  planRow: {
    show: true,
    leftText: '',
    rightSource: 'additionalCredits' as const,
    leftFontSize: 'sm' as const,
    leftFontWeight: 'medium' as const,
    leftTextColor: 'primary' as const,
    leftOpacity: '100' as const,
    rightFontSize: 'sm' as const,
    rightFontWeight: 'normal' as const,
    rightTextColor: 'tertiary' as const,
    rightOpacity: '60' as const,
  },
  paddingX: 20,
  paddingTop: 16,
  paddingBottom: 12,
}

const DEFAULT_VARIANT_B_BOTTOM = {
  dueRow: {
    show: true,
    leftText: 'Due today',
    rightSource: 'upgradeFee' as const,
    leftFontSize: 'sm' as const,
    leftFontWeight: 'normal' as const,
    leftTextColor: 'tertiary' as const,
    leftOpacity: '100' as const,
    rightFontSize: 'sm' as const,
    rightFontWeight: 'semibold' as const,
    rightTextColor: 'primary' as const,
    rightOpacity: '100' as const,
  },
  subtext: {
    show: true,
    template: 'Then {price}/mo. Cancel anytime.',
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '60' as const,
  },
  rowGap: 4,
  paddingX: 16,
  paddingTop: 12,
  paddingBottom: 12,
}

const DEFAULT_TRIGGER_TYPOGRAPHY = {
  label: {
    text: '',
    show: false,
    fontSize: 'sm' as const,
    fontWeight: 'semibold' as const,
    textColor: 'primary' as const,
  },
  price: {
    prefix: '$',
    show: true,
    fontSize: '3xl' as const,
    fontWeight: 'medium' as const,
    textColor: 'primary' as const,
  },
  priceSuffix: {
    text: 'due today',
    show: true,
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '60' as const,
  },
  subtext: {
    text: '',
    show: false,
    fontSize: 'xs' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '60' as const,
  },
  priceRowAlign: 'center' as const,
  priceRowGap: 8,
  rowGap: 4,
}

const DEFAULT_SYNCED_SUBTEXT = {
  syncWithSelection: true,
  separator: '',
  gap: 4,
  planName: {
    show: true,
    displayMode: 'text' as const,
    fontSize: 'sm' as const,
    fontWeight: 'medium' as const,
    textColor: 'tertiary' as const,
    opacity: '100' as const,
    badgeColor: 'brand' as const,
  },
  credits: {
    show: true,
    displayMode: 'text' as const,
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '60' as const,
    badgeColor: 'gray' as const,
  },
}

const DEFAULT_ITEM_TYPOGRAPHY = {
  label: {
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'primary' as const,
  },
  price: {
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '100' as const,
  },
}

const DEFAULT_MENU_ITEM_LABEL = {
  layout: 'inline' as const,
  separator: '',
  gap: 6,
  planName: {
    show: true,
    displayMode: 'text' as const,
    fontSize: 'sm' as const,
    fontWeight: 'medium' as const,
    textColor: 'primary' as const,
    opacity: '100' as const,
    badgeColor: 'brand' as const,
  },
  credits: {
    show: true,
    displayMode: 'text' as const,
    fontSize: 'sm' as const,
    fontWeight: 'normal' as const,
    textColor: 'tertiary' as const,
    opacity: '60' as const,
    badgeColor: 'gray' as const,
  },
}

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
                upgradeMode={globalConfig.upgradeMode}
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
                  upgradeMode={globalConfig.upgradeMode}
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
