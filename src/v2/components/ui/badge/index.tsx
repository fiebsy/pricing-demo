'use client'

import React from 'react'
import { HugeIcon } from '@/v2/components/ui/icon/huge-icons/huge-icons'
import { Squircle } from '@/v2/components/ui/squircle'
import { cx } from '@/v2/utils/cx'
import { CircleIcon } from '@hugeicons-pro/core-solid-rounded'

import { BADGE_SIZE_CONFIG, BADGE_TYPE_CONFIG, getBadgeColors, getBadgeRoundness, getBadgeShadow } from './config'
import type { BadgeIconOnlyProps, BadgeProps, BadgeWithIconProps, BadgeWithDotProps } from './types'

/**
 * Squircle Badge Component - Production-ready badge with Hugeicons support
 *
 * Built on Squircle + Hugeicons with semantic design tokens and asymmetric padding.
 *
 * @example
 * ```tsx
 * // Direct children pattern (most flexible)
 * <Badge size="sm" color="brand">
 *   <HugeIcon icon={FireSecurityIcon} size={12} strokeWidth={2} />
 *   <span>Badge</span>
 * </Badge>
 *
 * // Helper for icon + text
 * <Badge.WithIcon size="sm" color="brand" icon={FireSecurityIcon}>
 *   Badge
 * </Badge.WithIcon>
 *
 * // Icon only
 * <Badge.Icon size="sm" color="brand" icon={StarIcon} />
 * ```
 */
const BadgeComponent: React.FC<BadgeProps> = ({ size = 'md', type = 'badge', color = 'gray', roundness, shadow, children, className, onDimensionsChange }) => {
  const sizeConfig = BADGE_SIZE_CONFIG[size]
  const typeConfig = BADGE_TYPE_CONFIG[type]
  const colorConfig = getBadgeColors(type, color)
  const effectiveRoundness = getBadgeRoundness(type, roundness)
  const effectiveShadow = getBadgeShadow(type, shadow)

  // Analyze children to detect icons and calculate padding
  const childArray = React.Children.toArray(children)
  const hasIcon = childArray.some((child) => React.isValidElement(child) && child.type === HugeIcon)

  let iconPosition: 'left' | 'right' | 'none' = 'none'
  if (hasIcon) {
    // Check if first child is an icon
    const firstChild = childArray[0]
    if (React.isValidElement(firstChild) && firstChild.type === HugeIcon) {
      iconPosition = 'left'
    } else {
      iconPosition = 'right'
    }
  }

  // Calculate padding based on icon presence and position
  const paddingStyle = {
    paddingLeft: `${iconPosition === 'left' ? sizeConfig.padding.icon : iconPosition === 'right' ? sizeConfig.padding.text : sizeConfig.padding.text}px`,
    paddingRight: `${iconPosition === 'left' ? sizeConfig.padding.text : iconPosition === 'right' ? sizeConfig.padding.icon : sizeConfig.padding.text}px`,
    paddingTop: `${sizeConfig.padding.vertical}px`,
    paddingBottom: `${sizeConfig.padding.vertical}px`,
    gap: hasIcon ? `${sizeConfig.gap}px` : undefined,
  }

  // Wrap HugeIcon children in spans with muted color for visual hierarchy
  const styledChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === HugeIcon) {
      return <span style={{ color: `var(--color-${colorConfig.iconColor})` }}>{child}</span>
    }
    return child
  })

  return (
    <Squircle
      backgroundColor={colorConfig.backgroundColor}
      borderColor={colorConfig.borderColor}
      borderWidth={typeConfig.borderWidth}
      roundness={effectiveRoundness}
      shadow={effectiveShadow}
      customShadowLayer={effectiveShadow !== 'none'}
      shadowMethod="duplicate"
      performance="high"
      overflow="hidden"
      fadeInOnMount={true}
      className={cx('inline-block', className)}
      onDimensionsChange={onDimensionsChange}
    >
      <div
        className={cx('flex items-center font-medium whitespace-nowrap', sizeConfig.textSize)}
        style={{
          ...paddingStyle,
          color: `var(--color-${colorConfig.textColor})`,
        }}
      >
        {styledChildren}
      </div>
    </Squircle>
  )
}

/**
 * Badge with icon helper component
 * Simplifies icon + text pattern
 */
const BadgeWithIcon: React.FC<BadgeWithIconProps> = ({
  size = 'md',
  type = 'badge',
  color = 'gray',
  icon,
  iconPosition = 'leading',
  iconSize,
  iconStrokeWidth = 2,
  roundness,
  shadow,
  children,
  className,
  onDimensionsChange,
}) => {
  const sizeConfig = BADGE_SIZE_CONFIG[size]
  const effectiveIconSize = iconSize || sizeConfig.iconSize

  return (
    <BadgeComponent size={size} type={type} color={color} roundness={roundness} shadow={shadow} className={className} onDimensionsChange={onDimensionsChange}>
      {iconPosition === 'leading' && <HugeIcon icon={icon} size={effectiveIconSize} strokeWidth={iconStrokeWidth} />}
      <span>{children}</span>
      {iconPosition === 'trailing' && <HugeIcon icon={icon} size={effectiveIconSize} strokeWidth={iconStrokeWidth} />}
    </BadgeComponent>
  )
}

/**
 * Icon-only badge component
 */
const BadgeIcon: React.FC<BadgeIconOnlyProps> = ({
  size = 'md',
  type = 'badge',
  color = 'gray',
  icon,
  iconSize,
  iconStrokeWidth = 2,
  roundness,
  shadow,
  className,
  onDimensionsChange,
}) => {
  const sizeConfig = BADGE_SIZE_CONFIG[size]
  const typeConfig = BADGE_TYPE_CONFIG[type]
  const colorConfig = getBadgeColors(type, color)
  const effectiveRoundness = getBadgeRoundness(type, roundness)
  const effectiveShadow = getBadgeShadow(type, shadow)
  const effectiveIconSize = iconSize || sizeConfig.iconSize

  return (
    <Squircle
      backgroundColor={colorConfig.backgroundColor}
      borderColor={colorConfig.borderColor}
      borderWidth={typeConfig.borderWidth}
      roundness={effectiveRoundness}
      shadow={effectiveShadow}
      customShadowLayer={effectiveShadow !== 'none'}
      shadowMethod="duplicate"
      performance="high"
      overflow="hidden"
      fadeInOnMount={true}
      className={cx('inline-block', className)}
      onDimensionsChange={onDimensionsChange}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: `${sizeConfig.padding.vertical}px`,
          paddingBottom: `${sizeConfig.padding.vertical}px`,
          paddingLeft: `${sizeConfig.padding.text}px`,
          paddingRight: `${sizeConfig.padding.text}px`,
          lineHeight: 0, // Remove line-height spacing
          color: `var(--color-${colorConfig.iconColor})`, // Icon-only uses icon color
        }}
      >
        <HugeIcon icon={icon} size={effectiveIconSize} strokeWidth={iconStrokeWidth} />
      </div>
    </Squircle>
  )
}

/**
 * Badge with dot component
 * Uses solid CircleIcon for status indication
 */
const BadgeWithDot: React.FC<BadgeWithDotProps> = ({
  size = 'sm',
  type = 'modern',
  color = 'gray',
  dotColor = 'blue',
  dotSize,
  roundness,
  shadow,
  children,
  className,
  onDimensionsChange,
}) => {
  const sizeConfig = BADGE_SIZE_CONFIG[size]
  const typeConfig = BADGE_TYPE_CONFIG[type]
  const colorConfig = getBadgeColors(type, color)
  const dotColorConfig = getBadgeColors(type, dotColor)
  const effectiveRoundness = getBadgeRoundness(type, roundness)
  const effectiveShadow = getBadgeShadow(type, shadow)
  const effectiveDotSize = dotSize || 8 // Default 8px dot size

  return (
    <Squircle
      backgroundColor={colorConfig.backgroundColor}
      borderColor={colorConfig.borderColor}
      borderWidth={typeConfig.borderWidth}
      roundness={effectiveRoundness}
      shadow={effectiveShadow}
      customShadowLayer={effectiveShadow !== 'none'}
      shadowMethod="duplicate"
      performance="high"
      overflow="hidden"
      fadeInOnMount={true}
      className={className}
      onDimensionsChange={onDimensionsChange}
    >
      <div
        className={cx('flex items-center font-medium whitespace-nowrap', sizeConfig.textSize)}
        style={{
          paddingLeft: `${sizeConfig.padding.icon}px`,
          paddingRight: `${sizeConfig.padding.text}px`,
          paddingTop: `${sizeConfig.padding.vertical}px`,
          paddingBottom: `${sizeConfig.padding.vertical}px`,
          gap: `${sizeConfig.gap}px`,
          color: `var(--color-${colorConfig.textColor})`,
        }}
      >
        <span style={{ color: `var(--color-${dotColorConfig.iconColor})` }}>
          <HugeIcon icon={CircleIcon} size={effectiveDotSize} />
        </span>
        <span>{children}</span>
      </div>
    </Squircle>
  )
}

// Combine all Badge variants into a single export with proper typing
export const Badge = Object.assign(BadgeComponent, {
  WithIcon: BadgeWithIcon,
  Icon: BadgeIcon,
  WithDot: BadgeWithDot,
}) as React.FC<BadgeProps> & {
  WithIcon: React.FC<BadgeWithIconProps>
  Icon: React.FC<BadgeIconOnlyProps>
  WithDot: React.FC<BadgeWithDotProps>
}
