'use client'

import { isValidElement } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import type { FeaturedIconProps } from './types'
import { iconSizes, iconPixelSizes, themeStyles } from './config'

/**
 * Check if an icon should use the HugeIcon wrapper
 * HugeIcons and function components need the wrapper
 * Already-rendered React elements can be rendered directly
 */
function shouldUseHugeIcon(icon: unknown): boolean {
  if (!icon) return false
  // If it's already a React element (JSX), render it directly
  if (isValidElement(icon)) return false
  // Everything else (functions, arrays, objects) should use HugeIcon wrapper
  return true
}

/**
 * FeaturedIcon - A decorative icon container with multiple theme variants
 *
 * Used for empty states, feature highlights, and visual emphasis.
 * Supports HugeIcons (recommended), React components, or pre-rendered elements.
 *
 * @example
 * ```tsx
 * import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'
 * import { FeaturedIcon } from '@/components/ui/prod/features/featured-icon'
 *
 * // With HugeIcon (recommended)
 * <FeaturedIcon icon={Search01Icon} color="gray" theme="modern" size="lg" />
 *
 * // With custom element
 * <FeaturedIcon icon={<CustomIcon />} color="brand" theme="light" />
 * ```
 */
export function FeaturedIcon({
  size = 'sm',
  theme = 'light',
  color = 'brand',
  icon,
  className,
  children,
  ...props
}: FeaturedIconProps) {
  const styles = themeStyles[theme]

  return (
    <div
      {...props}
      data-featured-icon
      className={cn(
        'relative flex shrink-0 items-center justify-center',
        iconSizes[size],
        styles.base,
        styles.sizes[size],
        styles.colors[color],
        className
      )}
    >
      {/* Render HugeIcon array or function component via wrapper */}
      {shouldUseHugeIcon(icon) && (
        <HugeIcon
          icon={icon}
          size={iconPixelSizes[size]}
          className="z-1"
          data-icon
        />
      )}

      {/* Render pre-created React element directly */}
      {!shouldUseHugeIcon(icon) && isValidElement(icon) && (
        <div className="z-1" data-icon>
          {icon}
        </div>
      )}

      {children}
    </div>
  )
}
