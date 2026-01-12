/**
 * Skwircle Badge Component
 *
 * A pre-configured badge variant of Skwircle with color and size helpers.
 * Uses config from ./config/badge.ts for styling presets.
 *
 * @example Basic
 * ```tsx
 * const colorConfig = getBadgeColorConfig('badge', 'success')
 *
 * <SkwircleBadge
 *   backgroundColor={colorConfig.backgroundColor}
 *   borderColor={colorConfig.borderColor}
 * >
 *   <span style={getBadgeTextStyle(colorConfig)}>Success</span>
 * </SkwircleBadge>
 * ```
 *
 * @example Full config
 * ```tsx
 * const colorConfig = getBadgeColorConfig('badge', 'brand')
 * const padding = getBadgePaddingStyle('md', 'leading')
 * const iconStyle = getBadgeIconStyle(colorConfig)
 * const textStyle = getBadgeTextStyle(colorConfig)
 *
 * <SkwircleBadge backgroundColor={colorConfig.backgroundColor} borderColor={colorConfig.borderColor}>
 *   <span className="flex items-center text-sm" style={padding}>
 *     <span style={iconStyle}><Icon /></span>
 *     <span style={textStyle}>Label</span>
 *   </span>
 * </SkwircleBadge>
 * ```
 */

'use client'

import * as React from 'react'
import type { SkwircleProps } from '../types'

// Re-export badge config for easy access
export {
  BADGE_SIZE_CONFIGS,
  BADGE_TYPE_CONFIGS,
  BADGE_COLOR_CONFIGS,
  BADGE_COLOR_MODERN_GRAY,
  getBadgeSizeConfig,
  getBadgeTypeConfig,
  getBadgeColorConfig,
  getBadgePaddingStyle,
  getBadgeIconStyle,
  getBadgeTextStyle,
  type BadgeSize,
  type BadgeType,
  type BadgeColor,
  type BadgeSizeConfig,
  type BadgeTypeConfig,
  type BadgeColorConfig,
} from '../config/badge'

export interface SkwircleBadgeProps extends Omit<SkwircleProps, 'variant'> {}

/**
 * Internal component - gets the base Skwircle injected
 */
export const createSkwircleBadge = (
  SkwircleBase: React.FC<SkwircleProps>
): React.FC<SkwircleBadgeProps> => {
  const SkwircleBadge: React.FC<SkwircleBadgeProps> = (props) => {
    return <SkwircleBase variant="badge" {...props} />
  }
  SkwircleBadge.displayName = 'Skwircle.Badge'
  return SkwircleBadge
}
