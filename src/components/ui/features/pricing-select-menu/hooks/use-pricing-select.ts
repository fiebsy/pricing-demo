/**
 * usePricingSelect Hook
 *
 * Production-ready state management for the PricingSelectMenu component.
 * Supports controlled/uncontrolled patterns for all state values.
 */

'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import type { PricingTier, PricingVariantId, SlotDimensions } from '../types'
import { filterAvailableTiers } from '../utils/tier-utils'

// ============================================================================
// TYPES
// ============================================================================

export interface UsePricingSelectOptions {
  /** All available pricing tiers */
  tiers: PricingTier[]
  /** Initial tier selection (uncontrolled) */
  initialTier?: PricingTier
  /** Current variant (controlled) */
  variant?: PricingVariantId
  /** Callback when variant changes */
  onVariantChange?: (variant: PricingVariantId) => void
  /** Expanded state (controlled) */
  expanded?: boolean
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Selected tier (controlled) */
  selectedTier?: PricingTier
  /** Callback when tier is selected */
  onTierSelect?: (tier: PricingTier) => void
  /** Enable upgrade mode (filters out base tier) */
  upgradeMode?: boolean
  /** List of available tier IDs */
  availableTierIds?: string[]
  /** Variant-specific dimension configuration */
  dimensions?: {
    variantA?: {
      triggerHeight?: number
      maxBottomHeight?: number
    }
    variantB?: {
      triggerHeight?: number
      bottomHeight?: number
    }
    panelWidth?: number
  }
}

export interface UsePricingSelectReturn {
  /** Current variant */
  variant: PricingVariantId
  /** Set variant (for uncontrolled mode) */
  setVariant: (variant: PricingVariantId) => void
  /** Whether menu is expanded */
  expanded: boolean
  /** Set expanded (for uncontrolled mode) */
  setExpanded: (expanded: boolean) => void
  /** Effective expanded state (Variant B is always expanded) */
  effectiveExpanded: boolean
  /** Currently selected tier */
  selectedTier: PricingTier
  /** Set selected tier (for uncontrolled mode) */
  setSelectedTier: (tier: PricingTier) => void
  /** Handle tier selection (auto-collapses in Variant A) */
  handleTierSelect: (tier: PricingTier) => void
  /** Filtered list of available tiers */
  availableTiers: PricingTier[]
  /** Whether current variant is A */
  isVariantA: boolean
  /** Computed dimensions for current variant */
  dimensions: SlotDimensions
}

// ============================================================================
// DEFAULT DIMENSIONS
// ============================================================================

const DEFAULT_VARIANT_A_DIMENSIONS = {
  triggerHeight: 88,
  maxBottomHeight: 180,
}

const DEFAULT_VARIANT_B_DIMENSIONS = {
  triggerHeight: 48,
  bottomHeight: 72,
}

const DEFAULT_PANEL_WIDTH = 320

// ============================================================================
// HOOK
// ============================================================================

export function usePricingSelect(options: UsePricingSelectOptions): UsePricingSelectReturn {
  const {
    tiers,
    initialTier,
    variant: controlledVariant,
    onVariantChange,
    expanded: controlledExpanded,
    onExpandedChange,
    selectedTier: controlledSelectedTier,
    onTierSelect,
    upgradeMode = false,
    availableTierIds,
    dimensions: dimensionConfig,
  } = options

  // ============================================================================
  // INTERNAL STATE (for uncontrolled mode)
  // ============================================================================

  const [internalVariant, setInternalVariant] = useState<PricingVariantId>('A')
  const [internalExpanded, setInternalExpanded] = useState(false)
  const [internalSelectedTier, setInternalSelectedTier] = useState<PricingTier>(
    () => initialTier || tiers[0]
  )

  // ============================================================================
  // CONTROLLED/UNCONTROLLED RESOLUTION
  // ============================================================================

  const variant = controlledVariant ?? internalVariant
  const expanded = controlledExpanded ?? internalExpanded
  const selectedTier = controlledSelectedTier ?? internalSelectedTier

  const isVariantA = variant === 'A'

  // ============================================================================
  // STATE SETTERS (handle both controlled and uncontrolled)
  // ============================================================================

  const setVariant = useCallback(
    (newVariant: PricingVariantId) => {
      if (controlledVariant === undefined) {
        setInternalVariant(newVariant)
      }
      onVariantChange?.(newVariant)
    },
    [controlledVariant, onVariantChange]
  )

  const setExpanded = useCallback(
    (newExpanded: boolean) => {
      if (controlledExpanded === undefined) {
        setInternalExpanded(newExpanded)
      }
      onExpandedChange?.(newExpanded)
    },
    [controlledExpanded, onExpandedChange]
  )

  const setSelectedTier = useCallback(
    (tier: PricingTier) => {
      if (controlledSelectedTier === undefined) {
        setInternalSelectedTier(tier)
      }
      onTierSelect?.(tier)
    },
    [controlledSelectedTier, onTierSelect]
  )

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  // Effective expanded: Variant B is always expanded (static card)
  const effectiveExpanded = isVariantA ? expanded : true

  // Filter available tiers based on config
  const availableTiers = useMemo(() => {
    const tierIds = availableTierIds || tiers.map((t) => t.id)
    return filterAvailableTiers(tiers, {
      availableTierIds: tierIds,
      upgradeMode,
    })
  }, [tiers, availableTierIds, upgradeMode])

  // Compute dimensions for current variant
  const dimensions = useMemo<SlotDimensions>(() => {
    const variantAConfig = { ...DEFAULT_VARIANT_A_DIMENSIONS, ...dimensionConfig?.variantA }
    const variantBConfig = { ...DEFAULT_VARIANT_B_DIMENSIONS, ...dimensionConfig?.variantB }
    const panelWidth = dimensionConfig?.panelWidth ?? DEFAULT_PANEL_WIDTH

    if (isVariantA) {
      return {
        triggerHeight: variantAConfig.triggerHeight,
        bottomHeight: variantAConfig.maxBottomHeight,
        panelWidth,
      }
    }

    return {
      triggerHeight: variantBConfig.triggerHeight,
      bottomHeight: variantBConfig.bottomHeight,
      panelWidth,
    }
  }, [isVariantA, dimensionConfig])

  // ============================================================================
  // TIER SELECTION HANDLER (auto-collapse for Variant A)
  // ============================================================================

  const handleTierSelect = useCallback(
    (tier: PricingTier) => {
      setSelectedTier(tier)
      // Auto-collapse after selection in Variant A
      if (isVariantA) {
        setExpanded(false)
      }
    },
    [setSelectedTier, setExpanded, isVariantA]
  )

  // ============================================================================
  // ENSURE SELECTED TIER REMAINS VALID
  // ============================================================================

  useEffect(() => {
    if (availableTiers.length > 0 && !availableTiers.find((t) => t.id === selectedTier.id)) {
      setSelectedTier(availableTiers[0])
    }
  }, [availableTiers, selectedTier.id, setSelectedTier])

  // ============================================================================
  // RETURN
  // ============================================================================

  return {
    variant,
    setVariant,
    expanded,
    setExpanded,
    effectiveExpanded,
    selectedTier,
    setSelectedTier,
    handleTierSelect,
    availableTiers,
    isVariantA,
    dimensions,
  }
}
