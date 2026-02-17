/**
 * Orders Page - Route Badge Icons
 *
 * Icon style resolver for the AutoRoute badge with stroke/solid/bulk variants.
 */

import FlashIconStroke from '@hugeicons-pro/core-stroke-rounded/FlashIcon'
import FlashIconSolid from '@hugeicons-pro/core-solid-rounded/FlashIcon'
import FlashIconBulk from '@hugeicons-pro/core-bulk-rounded/FlashIcon'
import FlashOffIconStroke from '@hugeicons-pro/core-stroke-rounded/FlashOffIcon'
import FlashOffIconSolid from '@hugeicons-pro/core-solid-rounded/FlashOffIcon'
import FlashOffIconBulk from '@hugeicons-pro/core-bulk-rounded/FlashOffIcon'
import type { AutoRouteBadgeIconStyle } from '../../types'

export const FLASH_ICONS = {
  stroke: FlashIconStroke,
  solid: FlashIconSolid,
  bulk: FlashIconBulk,
} as const

export const FLASH_OFF_ICONS = {
  stroke: FlashOffIconStroke,
  solid: FlashOffIconSolid,
  bulk: FlashOffIconBulk,
} as const

export function getFlashIcon(style: AutoRouteBadgeIconStyle) {
  return FLASH_ICONS[style]
}

export function getFlashOffIcon(style: AutoRouteBadgeIconStyle) {
  return FLASH_OFF_ICONS[style]
}
