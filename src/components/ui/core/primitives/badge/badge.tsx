'use client'

import React, { forwardRef, isValidElement, createElement, cloneElement } from 'react'
import type { FC, ReactNode, ReactElement } from 'react'
import { cn } from '@/lib/utils'

import { HugeIcon } from '@/components/ui/prod/base/icon'
import type { BadgeProps, BadgeIconProp } from './types'
import {
  colorStyles,
  commonStyles,
  modernColorOverrides,
  removeButtonStyles,
  shapeStyles,
  shapeSizeOverrides,
  sizeStyles,
  sizeWithDotStyles,
  sizeWithLeadingStyles,
  sizeWithTrailingStyles,
  styleVariantStyles,
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

  // Already a React element - clone and merge className
  if (isValidElement(icon)) {
    const element = icon as ReactElement<{ className?: string }>
    return cloneElement(element, {
      className: cn(className, element.props.className),
    })
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
// COMPONENTS
// ============================================================================

/**
 * Dot indicator component
 */
function Dot({ className }: { className?: string }) {
  return <span className={cn('rounded-full shrink-0', className)} />
}

/**
 * Remove/close icon
 */
function RemoveIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={cn('size-3', className)}
      aria-hidden="true"
    >
      <path d="M3 3l6 6M9 3l-6 6" />
    </svg>
  )
}

// ============================================================================
// BADGE COMPONENT
// ============================================================================

/**
 * Badge component for status indicators, labels, and tags.
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge>Label</Badge>
 *
 * // With color
 * <Badge color="success">Active</Badge>
 *
 * // With dot indicator
 * <Badge color="warning" dot>Pending</Badge>
 *
 * // With icon
 * <Badge iconLeading={CheckIcon} color="success">Completed</Badge>
 *
 * // Removable
 * <Badge onRemove={() => handleRemove()}>Tag</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      color = 'gray',
      size = 'md',
      shape = 'pill',
      style = 'default',
      dot = false,
      iconLeading,
      iconTrailing,
      onRemove,
      className,
      children,
    },
    ref
  ) => {
    // Use modern color overrides if style is "modern" and override exists
    const baseColorConfig = colorStyles[color]
    const colorConfig = style === 'modern' && modernColorOverrides[color]
      ? modernColorOverrides[color]
      : baseColorConfig
    const sizeConfig = sizeStyles[size]

    const hasTrailing = iconTrailing || onRemove

    return (
      <span
        ref={ref}
        className={cn(
          commonStyles,
          shapeStyles[shape],
          shapeSizeOverrides[shape]?.[size],
          styleVariantStyles[style],
          sizeConfig.root,
          colorConfig.root,
          dot && sizeWithDotStyles[size],
          !dot && iconLeading && sizeWithLeadingStyles[size],
          hasTrailing && sizeWithTrailingStyles[size],
          className
        )}
      >
        {/* Dot indicator */}
        {dot && <Dot className={cn(sizeConfig.dot, colorConfig.dot)} />}

        {/* Leading icon */}
        {!dot && renderIcon(iconLeading, cn(sizeConfig.icon, colorConfig.icon))}

        {/* Content */}
        {React.Children.map(children, (child) => {
          if (typeof child === 'string' || typeof child === 'number') {
            return <span>{child}</span>
          }
          return child
        })}

        {/* Trailing icon */}
        {!onRemove && renderIcon(iconTrailing, cn(sizeConfig.icon, colorConfig.icon))}

        {/* Remove button */}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove"
            className={cn(removeButtonStyles, colorConfig.removeButton)}
          >
            <RemoveIcon />
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
