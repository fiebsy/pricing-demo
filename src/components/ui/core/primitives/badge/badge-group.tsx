'use client'

import { isValidElement, createElement } from 'react'
import type { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'

import { HugeIcon } from '@/components/ui/core/primitives/icon'
import type { BadgeGroupProps, BadgeIconProp } from './types'
import {
  badgeGroupThemeStyles,
  badgeGroupColorStyles,
  badgeGroupSizeStyles,
  badgeGroupCommonStyles,
} from './config'

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Check if a value is a HugeIcon array format
 */
function isHugeIconArray(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    Array.isArray(value[0]) &&
    typeof value[0][0] === 'string'
  )
}

/**
 * Check if a value is a React component function
 */
function isReactComponent(value: unknown): value is FC<{ className?: string }> {
  return typeof value === 'function'
}

/**
 * Render an icon prop consistently
 */
function renderIcon(icon: BadgeIconProp | undefined, className: string): ReactNode {
  if (!icon) return null

  // Already a React element
  if (isValidElement(icon)) {
    return icon
  }

  // HugeIcon array - needs wrapper
  if (isHugeIconArray(icon)) {
    return <HugeIcon icon={icon} size={14} strokeWidth={2} className={className} />
  }

  // React component function
  if (isReactComponent(icon)) {
    return createElement(icon, { className })
  }

  return null
}

// ============================================================================
// BADGE GROUP COMPONENT
// ============================================================================

/**
 * BadgeGroup component - compound badge with addon section.
 * Used for badges that need a highlighted sub-section (like "New" + "Feature").
 *
 * @example
 * ```tsx
 * // Leading addon (default)
 * <BadgeGroup addonText="New" color="brand">
 *   Feature
 * </BadgeGroup>
 *
 * // Trailing addon with icon
 * <BadgeGroup addonText="View" align="trailing" iconTrailing={ArrowRightIcon}>
 *   Updates
 * </BadgeGroup>
 *
 * // Modern theme with dot
 * <BadgeGroup addonText="Beta" theme="modern" color="warning">
 *   Dashboard
 * </BadgeGroup>
 * ```
 */
export function BadgeGroup({
  children,
  addonText,
  size = 'md',
  color = 'brand',
  theme = 'light',
  align = 'leading',
  className,
  iconTrailing,
}: BadgeGroupProps) {
  const themeConfig = badgeGroupThemeStyles[theme]
  const colorConfig = badgeGroupColorStyles[theme][color] ?? {}
  const sizeConfig = badgeGroupSizeStyles[align][size]

  // Use default arrow icon if no icon provided
  const IconTrailing = iconTrailing ?? ArrowRight01Icon

  const rootClasses = cn(
    badgeGroupCommonStyles,
    themeConfig.root,
    sizeConfig.root,
    colorConfig.root,
    // Adjust padding when no children
    !children && !IconTrailing && 'pr-1',
    className
  )

  const addonClasses = cn(
    'inline-flex items-center',
    themeConfig.addon,
    sizeConfig.addon,
    colorConfig.addon
  )

  const dotClasses = cn('inline-block size-2 shrink-0 rounded-full', sizeConfig.dot, colorConfig.dot)

  const iconClasses = cn(themeConfig.icon, sizeConfig.icon, colorConfig.icon)

  // Trailing alignment: [dot?] children [addon + icon]
  if (align === 'trailing') {
    return (
      <div className={rootClasses}>
        {/* Dot for modern theme */}
        {theme === 'modern' && <span className={dotClasses} />}

        {/* Main content */}
        {children}

        {/* Addon section with trailing icon */}
        <span className={addonClasses}>
          {addonText}
          {renderIcon(IconTrailing, iconClasses)}
        </span>
      </div>
    )
  }

  // Leading alignment (default): [addon + dot?] children [icon]
  return (
    <div className={rootClasses}>
      {/* Addon section */}
      <span className={addonClasses}>
        {/* Dot for modern theme inside addon */}
        {theme === 'modern' && <span className={dotClasses} />}
        {addonText}
      </span>

      {/* Main content */}
      {children}

      {/* Trailing icon */}
      {renderIcon(IconTrailing, iconClasses)}
    </div>
  )
}

BadgeGroup.displayName = 'BadgeGroup'
