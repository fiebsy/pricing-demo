'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import { cn } from '@/lib/utils'
import type { HugeIconData, HugeIconProps, IconContainerProps } from './types'
import {
  resolveSize,
  resolveColorClass,
  getVariantStrokeWidth,
  containerStyles,
} from './config'

/**
 * Extracts valid icon data from various import formats
 */
function extractIconData(icon: unknown): HugeIconData | null {
  if (!icon) return null

  // Handle default export wrapper: { default: [...] }
  const unwrapped = (icon as { default?: unknown })?.default ?? icon

  // Validate it's an array
  if (!Array.isArray(unwrapped)) {
    // Try nested structures
    if (typeof unwrapped === 'object' && unwrapped !== null) {
      const obj = unwrapped as Record<string, unknown>
      if ('icon' in obj && Array.isArray(obj.icon)) {
        return obj.icon as HugeIconData
      }
      if ('default' in obj && Array.isArray(obj.default)) {
        return obj.default as HugeIconData
      }
    }
    return null
  }

  // Validate array structure: should be array of [tag, attrs] tuples
  if (unwrapped.length > 0 && !Array.isArray(unwrapped[0])) {
    return null
  }

  return unwrapped as HugeIconData
}

/**
 * HugeIcon - Wrapper for Huge Icons PRO
 *
 * Huge Icons is the standard icon library for PAYVA V2. This wrapper handles
 * the array format that @hugeicons-pro exports and provides a consistent API
 * with size presets, semantic colors, stroke width presets, and variant support.
 *
 * Stroke Width Behavior:
 * - stroke/duotone/twotone: strokeWidth applies (default: 'regular' = 1.5)
 * - solid/bulk: strokeWidth auto-set to 0 (filled icons)
 *
 * @example
 * ```tsx
 * import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
 * import { HugeIcon } from '@/components/ui/prod/base/icon'
 *
 * // Basic usage with presets
 * <HugeIcon icon={Cancel01Icon} size="md" color="secondary" />
 *
 * // With numeric values
 * <HugeIcon icon={Cancel01Icon} size={24} strokeWidth={2} />
 *
 * // Solid/bulk icons (strokeWidth automatically set to 0)
 * import Alert02Icon from '@hugeicons-pro/core-solid-rounded/Alert02Icon'
 * <HugeIcon icon={Alert02Icon} variant="solid" color="error" />
 *
 * // Duotone/twotone icons (strokeWidth applies!)
 * import Star01Icon from '@hugeicons-pro/core-duotone-rounded/Star01Icon'
 * <HugeIcon icon={Star01Icon} variant="duotone" strokeWidth="medium" />
 *
 * // With all options
 * <HugeIcon
 *   icon={Cancel01Icon}
 *   size="lg"
 *   color="primary"
 *   strokeWidth="medium"
 *   className="transition-colors hover:text-error-primary"
 * />
 * ```
 *
 * @see https://hugeicons.com - Browse 40,000+ icons
 */
export function HugeIcon({
  icon,
  size = 'md',
  color = 'current',
  strokeWidth = 'regular',
  variant = 'stroke',
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
  ...props
}: HugeIconProps) {
  const iconData = extractIconData(icon)

  if (!iconData) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('HugeIcon: Invalid icon data provided', {
        iconType: typeof icon,
        icon: icon,
      })
    }
    return null
  }

  // Resolve values from presets or pass through numbers
  const resolvedSize = resolveSize(size)
  const resolvedStrokeWidth = getVariantStrokeWidth(variant, strokeWidth)
  const colorClass = resolveColorClass(color)

  return (
    <HugeiconsIcon
      icon={iconData as Parameters<typeof HugeiconsIcon>[0]['icon']}
      size={resolvedSize}
      color="currentColor"
      strokeWidth={resolvedStrokeWidth}
      className={cn('shrink-0', colorClass, className)}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : ariaHidden}
      {...props}
    />
  )
}

HugeIcon.displayName = 'HugeIcon'

/**
 * Icon - HugeIcon with optional container wrapper
 *
 * Use this when you need proper containment for solid/bulk icons,
 * which require relative positioning and overflow-hidden to render correctly.
 *
 * @example
 * ```tsx
 * import Alert02Icon from '@hugeicons-pro/core-solid-rounded/Alert02Icon'
 * import { Icon } from '@/components/ui/prod/base/icon'
 *
 * // Solid icon with container (recommended for solid/bulk variants)
 * <Icon
 *   icon={Alert02Icon}
 *   variant="solid"
 *   size="md"
 *   color="error"
 *   withContainer
 * />
 * ```
 */
export function Icon({
  withContainer = false,
  containerClassName,
  size = 'md',
  ...props
}: IconContainerProps) {
  const resolvedSize = resolveSize(size)

  if (withContainer) {
    return (
      <div
        className={cn(containerStyles, containerClassName)}
        style={{ width: resolvedSize, height: resolvedSize }}
      >
        <HugeIcon size={size} {...props} />
      </div>
    )
  }

  return <HugeIcon size={size} {...props} />
}

Icon.displayName = 'Icon'
