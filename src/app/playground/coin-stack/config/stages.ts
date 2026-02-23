/**
 * Stage Configuration
 *
 * Defines the two-tier stage system for coin-stack transitions.
 * Stage 1: Classic preset (black/white, no effects)
 * Stage 2: Arcade Blue preset (blue gradient, glow, shine)
 */

import type { StageId, StageTransitionConfig } from './types'

/** All available stage IDs */
export const STAGE_IDS: StageId[] = [1, 2]

/** Stage display names for UI */
export const STAGE_LABELS: Record<StageId, string> = {
  1: 'Stage 1',
  2: 'Stage 2',
}

/** Mapping of stages to preset IDs */
export const DEFAULT_STAGES: Record<StageId, { presetId: string }> = {
  1: { presetId: 'default' },
  2: { presetId: 'arcade-blue' },
}

/** Default transition configuration */
export const DEFAULT_TRANSITION: StageTransitionConfig = {
  duration: 0.4,
  bounce: 0.15,
}

/** Get stage label by ID */
export function getStageLabel(id: StageId): string {
  return STAGE_LABELS[id]
}
