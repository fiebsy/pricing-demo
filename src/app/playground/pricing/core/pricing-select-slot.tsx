/**
 * PricingSelectSlot Component
 *
 * Renders PricingSelectMenu within the modal Content A slot.
 * Switches between A/B variants based on flow:
 *
 * - Flow A: Variant A (expandable dropdown for tier selection)
 * - Flow B: Variant B (static card showing selected tier)
 *
 * Selected tier persists across flow transitions for continuity.
 */

'use client'

import { useMemo, useState, useRef } from 'react'

import {
  PricingSelectMenu,
  UPGRADE_FLOW_PRESET,
  AnimatedSlotContent,
  type PricingSelectMenuConfig,
  type PricingTier,
} from '@/components/ui/features/pricing-select-menu'

import type { FlowId, PricingSelectConfig } from '../config/types'
import { PRICING_TIERS } from './pricing-tiers'

// ============================================================================
// TYPES
// ============================================================================

interface PricingSelectSlotProps {
  /** Active flow (determines A/B variant) */
  activeFlow: FlowId
  /** Currently selected tier (lifted state) */
  selectedTier: PricingTier
  /** Tier selection handler (lifted state) */
  onTierSelect: (tier: PricingTier) => void
  /** Container width for panel sizing */
  containerWidth?: number
  /** Enable upgrade mode (filters out base tier) */
  upgradeMode?: boolean
  /** Pricing select configuration from playground */
  pricingSelectConfig?: PricingSelectConfig
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PricingSelectSlot({
  activeFlow,
  selectedTier,
  onTierSelect,
  containerWidth,
  upgradeMode = true,
  pricingSelectConfig,
}: PricingSelectSlotProps) {
  // Map flow to variant: flow-a → 'A', flow-b → 'B'
  const isVariantA = activeFlow === 'flow-a'

  // Local expanded state for Variant A
  const [expanded, setExpanded] = useState(false)

  // Track previous flow for synchronous state adjustment
  const [prevActiveFlow, setPrevActiveFlow] = useState(activeFlow)
  const prevIsVariantARef = useRef(isVariantA)

  // Synchronous state update when flow changes (runs BEFORE render completes)
  // This pattern prevents animation conflicts by ensuring expanded state
  // matches the new variant before any CSS transitions can trigger
  if (prevActiveFlow !== activeFlow) {
    setPrevActiveFlow(activeFlow)

    const wasVariantA = prevIsVariantARef.current
    const switchingToB = wasVariantA && !isVariantA
    const switchingToA = !wasVariantA && isVariantA

    if (switchingToB) {
      // A → B: Set expanded=true so effectiveExpanded stays true (no animation)
      setExpanded(true)
    } else if (switchingToA) {
      // B → A: Reset to collapsed so menu starts fresh
      setExpanded(false)
    }

    prevIsVariantARef.current = isVariantA
  }

  // Calculate effective panel width
  const effectivePanelWidth = containerWidth ?? UPGRADE_FLOW_PRESET.dimensions.panelWidth

  // Get the base/current tier (Pro - tier-100)
  const currentPlanTier = useMemo(() => {
    return PRICING_TIERS.find((tier) => tier.id === 'tier-100')
  }, [])

  // Filter available tiers based on upgrade mode
  const availableTiers = useMemo(() => {
    return PRICING_TIERS.filter((tier) => {
      if (upgradeMode && tier.id === 'tier-100') return false
      return true
    })
  }, [upgradeMode])

  // Effective expanded state:
  // - Variant A: normal expand/collapse behavior
  // - Variant B: always expanded (static card)
  const effectiveExpanded = isVariantA ? expanded : true

  // Handle tier selection (auto-collapse in Variant A)
  const handleTierSelect = (tier: PricingTier) => {
    onTierSelect(tier)
    setExpanded(false)
  }

  // Build menu config based on variant using preset + playground config overrides
  const menuConfig = useMemo<Partial<PricingSelectMenuConfig>>(() => {
    const { dimensions, appearance: presetAppearance, bottomSlot: presetBottomSlot } = UPGRADE_FLOW_PRESET

    const triggerHeight = isVariantA
      ? dimensions.variantA.triggerHeight
      : dimensions.variantB.triggerHeight
    const maxBottomHeight = isVariantA
      ? dimensions.variantA.maxBottomHeight
      : dimensions.variantB.bottomHeight

    // Merge playground config with preset defaults
    const appearance = pricingSelectConfig
      ? {
          ...presetAppearance,
          background: pricingSelectConfig.appearance.background,
          shine: pricingSelectConfig.appearance.shine,
          shadow: pricingSelectConfig.appearance.shadow,
          borderRadius: pricingSelectConfig.appearance.borderRadius,
          squircle: pricingSelectConfig.appearance.squircle,
          gradient: pricingSelectConfig.appearance.gradient,
          gradientColor: pricingSelectConfig.appearance.gradientColor,
          triggerHoverBackground: pricingSelectConfig.triggerHoverBackground,
        }
      : presetAppearance

    const animation = pricingSelectConfig
      ? {
          duration: pricingSelectConfig.animation.duration,
          collapseDuration: pricingSelectConfig.animation.collapseDuration,
          easing: pricingSelectConfig.animation.easing,
          animateSlotContainers: false,
          slotContainerDelay: 0,
          slotContainerDurationOffset: 100,
          expandOrigin: 'top' as const,
        }
      : UPGRADE_FLOW_PRESET.animation

    const bottomSlot = pricingSelectConfig
      ? {
          ...presetBottomSlot,
          background: pricingSelectConfig.bottomSlot.background,
          shine: pricingSelectConfig.bottomSlot.shine,
          borderRadius: pricingSelectConfig.bottomSlot.borderRadius,
          inset: pricingSelectConfig.bottomSlot.inset,
          borderWidth: pricingSelectConfig.bottomSlot.borderWidth,
          borderColor: pricingSelectConfig.bottomSlot.borderColor,
          height: maxBottomHeight,
          scrollable: isVariantA,
        }
      : {
          ...presetBottomSlot,
          height: maxBottomHeight,
          scrollable: isVariantA,
        }

    return {
      animation,
      layout: {
        triggerWidth: effectivePanelWidth,
        triggerHeight,
        panelWidth: effectivePanelWidth,
        maxBottomHeight,
        borderRadius: dimensions.borderRadius,
        bottomGap: 0,
      },
      appearance,
      bottomSlot,
    }
  }, [isVariantA, effectivePanelWidth, pricingSelectConfig])

  // Calculate container height for layout
  const { dimensions } = UPGRADE_FLOW_PRESET
  const calculatedHeight = isVariantA
    ? dimensions.variantA.triggerHeight
    : dimensions.variantB.triggerHeight + dimensions.variantB.bottomHeight

  return (
    <div
      className="w-full flex flex-col items-center"
      style={{
        height: isVariantA ? undefined : calculatedHeight,
        minHeight: isVariantA ? dimensions.variantA.triggerHeight : undefined,
        overflow: 'visible',
        position: 'relative',
        zIndex: effectiveExpanded ? 100 : 'auto',
      }}
    >
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
              transition={UPGRADE_FLOW_PRESET.variantB.transition}
            >
              {isVariantA ? (
                <PricingSelectMenu.TriggerContentA
                  selectedTier={selectedTier}
                  dropdownIcon={UPGRADE_FLOW_PRESET.dropdownIcon}
                  triggerTypography={UPGRADE_FLOW_PRESET.typography.trigger}
                  syncedSubtext={UPGRADE_FLOW_PRESET.typography.syncedSubtext}
                  triggerPaddingX={UPGRADE_FLOW_PRESET.triggerPadding.x}
                  triggerPaddingTop={UPGRADE_FLOW_PRESET.triggerPadding.top}
                  triggerPaddingBottom={UPGRADE_FLOW_PRESET.triggerPadding.bottom}
                  upgradeMode={upgradeMode}
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
                transition={UPGRADE_FLOW_PRESET.variantB.transition}
              >
                {isVariantA ? (
                  <PricingSelectMenu.OptionsList
                    tiers={availableTiers}
                    selectedId={selectedTier.id}
                    onSelect={handleTierSelect}
                    showHeader={UPGRADE_FLOW_PRESET.optionsList.showHeader}
                    headerLabel={UPGRADE_FLOW_PRESET.optionsList.headerLabel}
                    headerTextColor={UPGRADE_FLOW_PRESET.optionsList.headerTextColor}
                    headerFontWeight={UPGRADE_FLOW_PRESET.optionsList.headerFontWeight}
                    headerFontSize={UPGRADE_FLOW_PRESET.optionsList.headerFontSize}
                    headerOpacity={UPGRADE_FLOW_PRESET.optionsList.headerOpacity}
                    headerUppercase={UPGRADE_FLOW_PRESET.optionsList.headerUppercase}
                    headerPaddingBottom={UPGRADE_FLOW_PRESET.optionsList.headerPaddingBottom}
                    containerPadding={UPGRADE_FLOW_PRESET.optionsList.containerPadding}
                    itemPaddingX={UPGRADE_FLOW_PRESET.optionsList.itemPaddingX}
                    itemPaddingY={UPGRADE_FLOW_PRESET.optionsList.itemPaddingY}
                    itemBorderRadius={UPGRADE_FLOW_PRESET.optionsList.itemBorderRadius}
                    itemGap={UPGRADE_FLOW_PRESET.optionsList.itemGap}
                    itemHoverBackground={UPGRADE_FLOW_PRESET.optionsList.itemHoverBackground}
                    showSelectedIndicator={UPGRADE_FLOW_PRESET.optionsList.showSelectedIndicator}
                    itemTypography={UPGRADE_FLOW_PRESET.typography.items}
                    menuItemLabel={UPGRADE_FLOW_PRESET.typography.menuItemLabel}
                    upgradeMode={upgradeMode}
                    currentPlan={upgradeMode ? currentPlanTier : undefined}
                    currentPlanSuffix="(current plan)"
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

// Re-export for convenience
export { PRICING_TIERS }
export type { PricingTier }
