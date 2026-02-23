/**
 * Modal V2 Stage Definitions
 *
 * 5-phase flow:
 * - Stages 1-3: PricingSelect component
 * - Stages 4-5: ProCard component
 */

import type { Stage, StageId } from './types'

/** All available stage IDs */
export const STAGE_IDS: StageId[] = [1, 2, 3, 4, 5]

/** Stage definitions */
export const STAGES: Stage[] = [
  {
    id: 1,
    label: 'Upgrade',
    header: {
      title: 'Out of credits',
      subtext: 'You need 80 more credits to generate this video. Upgrade to keep going.',
      assetStateId: 1,
    },
    content: {
      type: 'pricing',
      pricingVariant: 'A',
    },
    buttons: {
      primary: { text: 'Upgrade', showText: true },
    },
  },
  {
    id: 2,
    label: 'Review',
    header: {
      title: 'Upgrade to Pro 2x',
      subtext: 'Confirm your selection below',
      assetStateId: 1,
    },
    content: {
      type: 'pricing',
      pricingVariant: 'B',
    },
    buttons: {
      primary: { text: 'Upgrade', showText: true },
      secondary: { text: 'Back' },
    },
  },
  {
    id: 3,
    label: 'Processing',
    header: {
      title: 'Review Your Upgrade',
      subtext: 'Confirm your selection below',
      assetStateId: 1,
    },
    content: {
      type: 'pricing',
      pricingVariant: 'B',
    },
    buttons: {
      primary: { text: 'Upgrading', loading: true, showText: true },
      secondary: { text: 'Back' },
    },
  },
  {
    id: 4,
    label: 'Success',
    header: {
      title: 'Upgrade Complete',
      subtext: "You're all set to start creating",
      assetStateId: 2,
    },
    content: {
      type: 'success',
    },
    buttons: {
      primary: { checkmark: true, showText: false },
    },
  },
  {
    id: 5,
    label: 'Complete',
    header: {
      title: 'Upgrade Complete',
      subtext: "You're all set to start creating",
      assetStateId: 2,
    },
    content: {
      type: 'success',
    },
    buttons: {
      primary: { text: "Let's create", showText: true },
    },
  },
]

/** Get stage by ID */
export function getStageById(id: StageId): Stage {
  return STAGES.find((s) => s.id === id) ?? STAGES[0]
}

/** Get stage label by ID */
export function getStageLabel(id: StageId): string {
  const stage = getStageById(id)
  return stage.label
}
