/**
 * Badge Component
 *
 * A high-level badge component built on Skwircle primitive.
 * Provides compound components for common badge patterns.
 *
 * @example Basic
 * ```tsx
 * <Badge color="success">Active</Badge>
 * ```
 *
 * @example With Icon
 * ```tsx
 * <Badge.WithIcon icon={CheckIcon} color="success">Verified</Badge.WithIcon>
 * ```
 *
 * @example With Dot
 * ```tsx
 * <Badge.WithDot dotColor="success">Online</Badge.WithDot>
 * ```
 */

'use client'

import * as React from 'react'
import { Skwircle } from '../../'
import {
  getBadgeColorConfig,
  getBadgeTypeConfig,
  getBadgeSizeConfig,
  getBadgePaddingStyle,
  getBadgeIconStyle,
  getBadgeTextStyle,
  type BadgeColor,
  type BadgeType,
  type BadgeSize,
} from '../../config/badge'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'

// =============================================================================
// TYPES
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HugeIconType = any

interface BadgeBaseProps {
  children?: React.ReactNode
  color?: BadgeColor
  type?: BadgeType
  size?: BadgeSize
  className?: string
}

interface BadgeWithIconProps extends BadgeBaseProps {
  icon: HugeIconType
}

interface BadgeIconOnlyProps extends Omit<BadgeBaseProps, 'children'> {
  icon: HugeIconType
}

interface BadgeWithDotProps extends Omit<BadgeBaseProps, 'color'> {
  dotColor?: 'success' | 'warning' | 'error' | 'gray'
}

// =============================================================================
// DOT COLOR MAPPING
// =============================================================================

const DOT_COLORS: Record<string, string> = {
  success: 'bg-success-solid',
  warning: 'bg-warning-solid',
  error: 'bg-error-solid',
  gray: 'bg-quaternary',
}

// =============================================================================
// BASE BADGE
// =============================================================================

const BadgeBase: React.FC<BadgeBaseProps> = ({
  children,
  color = 'gray',
  type = 'badge',
  size = 'sm',
  className = '',
}) => {
  const typeConfig = getBadgeTypeConfig(type)
  const colorConfig = getBadgeColorConfig(type, color)
  const sizeConfig = getBadgeSizeConfig(size)
  const paddingStyle = getBadgePaddingStyle(size, 'none')
  const textStyle = getBadgeTextStyle(colorConfig)

  return (
    <Skwircle
      variant="badge"
      roundness={typeConfig.roundness}
      elevation={typeConfig.elevation}
      borderWidth={typeConfig.borderWidth}
      backgroundColor={colorConfig.backgroundColor}
      borderColor={colorConfig.borderColor}
      className={className}
    >
      <span
        className={`flex items-center font-medium ${sizeConfig.textClass}`}
        style={{ ...paddingStyle, ...textStyle }}
      >
        {children}
      </span>
    </Skwircle>
  )
}

// =============================================================================
// BADGE WITH ICON
// =============================================================================

const BadgeWithIcon: React.FC<BadgeWithIconProps> = ({
  children,
  icon,
  color = 'gray',
  type = 'badge',
  size = 'sm',
  className = '',
}) => {
  const typeConfig = getBadgeTypeConfig(type)
  const colorConfig = getBadgeColorConfig(type, color)
  const sizeConfig = getBadgeSizeConfig(size)
  const paddingStyle = getBadgePaddingStyle(size, 'leading')
  const iconStyle = getBadgeIconStyle(colorConfig)
  const textStyle = getBadgeTextStyle(colorConfig)

  return (
    <Skwircle
      variant="badge"
      roundness={typeConfig.roundness}
      elevation={typeConfig.elevation}
      borderWidth={typeConfig.borderWidth}
      backgroundColor={colorConfig.backgroundColor}
      borderColor={colorConfig.borderColor}
      className={className}
    >
      <span
        className={`flex items-center font-medium ${sizeConfig.textClass}`}
        style={paddingStyle}
      >
        <span style={iconStyle}>
          <HugeIcon
            icon={icon}
            size={sizeConfig.iconSize}
            strokeWidth={sizeConfig.iconStroke}
          />
        </span>
        <span style={textStyle}>{children}</span>
      </span>
    </Skwircle>
  )
}

// =============================================================================
// BADGE ICON ONLY
// =============================================================================

const BadgeIconOnly: React.FC<BadgeIconOnlyProps> = ({
  icon,
  color = 'gray',
  type = 'badge',
  size = 'sm',
  className = '',
}) => {
  const typeConfig = getBadgeTypeConfig(type)
  const colorConfig = getBadgeColorConfig(type, color)
  const sizeConfig = getBadgeSizeConfig(size)
  const iconStyle = getBadgeIconStyle(colorConfig)

  return (
    <Skwircle
      variant="badge"
      roundness={typeConfig.roundness}
      elevation={typeConfig.elevation}
      borderWidth={typeConfig.borderWidth}
      backgroundColor={colorConfig.backgroundColor}
      borderColor={colorConfig.borderColor}
      className={className}
    >
      <span
        className="flex items-center justify-center"
        style={{
          padding: `${sizeConfig.paddingVertical}px ${sizeConfig.paddingIcon}px`,
          ...iconStyle,
        }}
      >
        <HugeIcon
          icon={icon}
          size={sizeConfig.iconSize}
          strokeWidth={sizeConfig.iconStroke}
        />
      </span>
    </Skwircle>
  )
}

// =============================================================================
// BADGE WITH DOT
// =============================================================================

const BadgeWithDot: React.FC<BadgeWithDotProps> = ({
  children,
  dotColor = 'gray',
  type = 'badge',
  size = 'sm',
  className = '',
}) => {
  const typeConfig = getBadgeTypeConfig(type)
  const colorConfig = getBadgeColorConfig(type, 'gray')
  const sizeConfig = getBadgeSizeConfig(size)
  const paddingStyle = getBadgePaddingStyle(size, 'leading')
  const textStyle = getBadgeTextStyle(colorConfig)
  const dotClassName = DOT_COLORS[dotColor] || DOT_COLORS.gray

  return (
    <Skwircle
      variant="badge"
      roundness={typeConfig.roundness}
      elevation={typeConfig.elevation}
      borderWidth={typeConfig.borderWidth}
      backgroundColor={colorConfig.backgroundColor}
      borderColor={colorConfig.borderColor}
      className={className}
    >
      <span
        className={`flex items-center font-medium ${sizeConfig.textClass}`}
        style={paddingStyle}
      >
        <span
          className={`rounded-full ${dotClassName}`}
          style={{ width: sizeConfig.iconSize * 0.5, height: sizeConfig.iconSize * 0.5 }}
        />
        <span style={textStyle}>{children}</span>
      </span>
    </Skwircle>
  )
}

// =============================================================================
// COMPOUND COMPONENT
// =============================================================================

interface BadgeComponent extends React.FC<BadgeBaseProps> {
  WithIcon: typeof BadgeWithIcon
  Icon: typeof BadgeIconOnly
  WithDot: typeof BadgeWithDot
}

export const Badge = BadgeBase as BadgeComponent
Badge.WithIcon = BadgeWithIcon
Badge.Icon = BadgeIconOnly
Badge.WithDot = BadgeWithDot
