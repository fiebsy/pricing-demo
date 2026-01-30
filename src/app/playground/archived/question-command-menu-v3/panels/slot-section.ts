/**
 * Question Command Menu V3 - Slot Section Builder
 *
 * Builds a complete slot configuration section.
 * Reused for BOTH top and bottom slots - same controls, different prefix.
 */

import type { Section } from '@/components/ui/patterns/control-panel'
import type { PlaygroundState, SlotPosition } from '../config/types'
import {
  buildSlotEnableGroup,
  buildSlotHeightGroup,
  buildSlotAppearanceGroup,
  buildSlotBorderGroup,
  buildSlotAnimationGroup,
  buildSlotScrollGroup,
} from './shared-groups'

// ============================================================================
// MAIN SECTION BUILDER
// ============================================================================

export function buildSlotSection(
  state: PlaygroundState,
  position: SlotPosition
): Section {
  const slotConfig = state.config.slots[position]
  const prefix = `config.slots.${position}`
  const label = position === 'top' ? 'Top Slot' : 'Bottom Slot'
  const title = `${label} Settings`

  return {
    id: position,
    label,
    title,
    groups: [
      buildSlotEnableGroup(prefix, slotConfig),
      buildSlotHeightGroup(prefix, slotConfig),
      buildSlotAppearanceGroup(prefix, slotConfig),
      buildSlotBorderGroup(prefix, slotConfig),
      buildSlotScrollGroup(prefix, slotConfig),
      buildSlotAnimationGroup(prefix, slotConfig),
    ],
  }
}

// ============================================================================
// CONVENIENCE BUILDERS
// ============================================================================

export function buildTopSlotSection(state: PlaygroundState): Section {
  return buildSlotSection(state, 'top')
}

export function buildBottomSlotSection(state: PlaygroundState): Section {
  return buildSlotSection(state, 'bottom')
}
