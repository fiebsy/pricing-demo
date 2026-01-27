/**
 * Question Command Menu V4 - Flow Config Hook
 *
 * Computes effective configuration by merging base config with flow state overrides.
 * This avoids duplicating configuration across states - only specify what changes.
 */

'use client'

import { useMemo } from 'react'
import { useV4Context } from '../state'
import type { ActionButtonConfig, SlotPosition, TriggerButtonConfig } from '../types'
import type { FlowStateId, FlowSlotOverride } from '../types/flow'

// =============================================================================
// TYPES
// =============================================================================

export interface EffectiveSlotConfig {
  enabled: boolean
  minHeight?: number
  maxHeight?: number
}

export interface UseFlowConfigReturn {
  /** Current flow state ID */
  flowStateId: FlowStateId
  /** Whether top slot should be enabled (base + override) */
  effectiveTopEnabled: boolean
  /** Whether bottom slot should be enabled (base + override) */
  effectiveBottomEnabled: boolean
  /** Effective slot config for top */
  effectiveTopConfig: EffectiveSlotConfig
  /** Effective slot config for bottom */
  effectiveBottomConfig: EffectiveSlotConfig
  /** Effective bottom slot buttons with overrides applied */
  effectiveButtons: ActionButtonConfig[]
  /** Effective trigger row buttons with overrides applied */
  effectiveTriggerButtons: TriggerButtonConfig[]
  /** Effective placeholder text */
  effectivePlaceholder: string
  /** Get effective enabled state for any slot */
  getEffectiveSlotEnabled: (position: SlotPosition) => boolean
  /** Get effective slot config for any position */
  getEffectiveSlotConfig: (position: SlotPosition) => EffectiveSlotConfig
}

// =============================================================================
// HOOK
// =============================================================================

export function useFlowConfig(): UseFlowConfigReturn {
  const { config, state } = useV4Context()

  return useMemo(() => {
    const flowStateId = state.flowState.type
    const flowConfig = config.flowConfigs?.[flowStateId]

    // -------------------------------------------------------------------------
    // Compute effective slot configs
    // -------------------------------------------------------------------------
    const computeEffectiveSlotConfig = (position: SlotPosition): EffectiveSlotConfig => {
      const baseSlotConfig = config.slots[position]
      const slotOverride: FlowSlotOverride | undefined = flowConfig?.slots?.[position]

      return {
        enabled: slotOverride?.enabled ?? baseSlotConfig.enabled,
        minHeight: slotOverride?.minHeight ?? baseSlotConfig.minHeight,
        maxHeight: slotOverride?.maxHeight ?? baseSlotConfig.maxHeight,
      }
    }

    const effectiveTopConfig = computeEffectiveSlotConfig('top')
    const effectiveBottomConfig = computeEffectiveSlotConfig('bottom')

    // -------------------------------------------------------------------------
    // Compute effective buttons
    // -------------------------------------------------------------------------
    const computeEffectiveButtons = (): ActionButtonConfig[] => {
      const baseButtons = config.contentConfigs.buttons.buttons
      const buttonOverrides = flowConfig?.buttons ?? []

      return baseButtons.map((btn) => {
        const override = buttonOverrides.find((o) => o.id === btn.id)
        if (!override) return btn

        return {
          ...btn,
          label: override.label ?? btn.label,
          enabled: override.enabled ?? btn.enabled,
          isLoading: override.isLoading ?? btn.isLoading,
          disabled: override.disabled ?? btn.disabled,
        }
      })
    }

    const effectiveButtons = computeEffectiveButtons()

    // -------------------------------------------------------------------------
    // Compute effective trigger buttons
    // -------------------------------------------------------------------------
    const computeEffectiveTriggerButtons = (): TriggerButtonConfig[] => {
      const baseButtons = config.trigger.buttons ?? []
      const triggerOverrides = flowConfig?.triggerButtons ?? []

      return baseButtons.map((btn) => {
        const override = triggerOverrides.find((o) => o.id === btn.id)
        if (!override) return btn

        return {
          ...btn,
          label: override.label ?? btn.label,
          enabled: override.enabled ?? btn.enabled,
        }
      })
    }

    const effectiveTriggerButtons = computeEffectiveTriggerButtons()

    // -------------------------------------------------------------------------
    // Compute effective placeholder
    // -------------------------------------------------------------------------
    const effectivePlaceholder = flowConfig?.placeholder ?? config.placeholder

    // -------------------------------------------------------------------------
    // Helper functions
    // -------------------------------------------------------------------------
    const getEffectiveSlotEnabled = (position: SlotPosition): boolean => {
      return position === 'top' ? effectiveTopConfig.enabled : effectiveBottomConfig.enabled
    }

    const getEffectiveSlotConfig = (position: SlotPosition): EffectiveSlotConfig => {
      return position === 'top' ? effectiveTopConfig : effectiveBottomConfig
    }

    return {
      flowStateId,
      effectiveTopEnabled: effectiveTopConfig.enabled,
      effectiveBottomEnabled: effectiveBottomConfig.enabled,
      effectiveTopConfig,
      effectiveBottomConfig,
      effectiveButtons,
      effectiveTriggerButtons,
      effectivePlaceholder,
      getEffectiveSlotEnabled,
      getEffectiveSlotConfig,
    }
  }, [config, state.flowState])
}
