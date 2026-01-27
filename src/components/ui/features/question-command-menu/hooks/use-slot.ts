/**
 * Question Command Menu V4 - Slot Hooks
 *
 * Convenience hooks for slot-related operations.
 */

'use client'

import { useMemo } from 'react'
import { useV4Context } from '../state'
import type { SlotPosition } from '../types'

/**
 * Get content instance for a slot position
 */
export function useSlotContent(position: SlotPosition) {
  const { getContentForSlot, hasContentForSlot } = useV4Context()

  return useMemo(
    () => ({
      content: getContentForSlot(position),
      hasContent: hasContentForSlot(position),
    }),
    [getContentForSlot, hasContentForSlot, position]
  )
}

/**
 * Get unified slot config for a position
 */
export function useSlotConfig(position: SlotPosition) {
  const { getSlotConfig } = useV4Context()
  return useMemo(() => getSlotConfig(position), [getSlotConfig, position])
}

/**
 * Check if a slot is effectively visible (enabled + has content + slot open state)
 */
export function useSlotVisible(position: SlotPosition) {
  const { config, hasContentForSlot, state } = useV4Context()

  return useMemo(() => {
    const slotConfig = config.slots[position]
    const isOpen = position === 'top' ? state.topSlotOpen : state.bottomSlotOpen
    return slotConfig.enabled && hasContentForSlot(position) && isOpen
  }, [config.slots, hasContentForSlot, position, state.topSlotOpen, state.bottomSlotOpen])
}
