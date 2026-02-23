/**
 * Modal Stage Helpers
 *
 * Stage content is now stored in ModalPlaygroundConfig.stages.
 * This file provides helper constants for stage IDs and labels.
 */

import type { StageId } from './types'

/** All available stage IDs */
export const STAGE_IDS: StageId[] = [1, 2, 3, 4, 5]

/** Stage display names for UI */
export const STAGE_LABELS: Record<StageId, string> = {
  1: 'Upgrade',
  2: 'Review',
  3: 'Processing',
  4: 'Success',
  5: 'Complete',
}

/** Get stage label by ID */
export function getStageLabel(id: StageId): string {
  return STAGE_LABELS[id]
}
