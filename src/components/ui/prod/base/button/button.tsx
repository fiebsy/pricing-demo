'use client'

import { forwardRef, isValidElement, createElement } from 'react'
import type { FC, ReactNode } from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cn } from '@/lib/utils'

import { HugeIcon } from '@/components/ui/prod/base/icon'
import type { ButtonProps, IconProp } from './types'
import {
  commonStyles,
  iconOnlySizeStyles,
  iconStyles,
  loadingStyles,
  roundnessStyles,
  sizeStyles,
  variantStyles,
} from './config'

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Check if a value is a HugeIcon array format
 * HugeIcons export arrays like: [["circle", {...}], ["path", {...}]]
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
function renderIcon(icon: IconProp | undefined, position: 'leading' | 'trailing'): ReactNode {
  if (!icon) return null

  // Already a React element
  if (isValidElement(icon)) {
    return icon
  }

  // HugeIcon array - needs HugeIcon wrapper
  if (isHugeIconArray(icon)) {
    return (
      <HugeIcon
        icon={icon}
        size={20}
        strokeWidth={1.5}
        data-icon={position}
        className={iconStyles}
      />
    )
  }

  // React component function
  if (isReactComponent(icon)) {
    return createElement(icon, {
      'data-icon': position,
      className: iconStyles,
    } as Record<string, unknown>)
  }

  return null
}

// ============================================================================
// LOADING SPINNER
// ============================================================================

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      data-icon="loading"
      className={cn(loadingStyles.spinner, className)}
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-30"
      />
      {/* Spinning arc */}
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="12.5 50"
        strokeLinecap="round"
        className="origin-center animate-spin"
      />
    </svg>
  )
}

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

/**
 * Button component built on Base UI primitives.
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary">Save Changes</Button>
 *
 * // With icons
 * <Button iconLeading={PlusIcon}>Add Item</Button>
 *
 * // Loading state
 * <Button isLoading>Saving...</Button>
 *
 * // As a link
 * <Button href="/settings" asChild>Settings</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      roundness = 'default',
      iconLeading,
      iconTrailing,
      isLoading = false,
      showTextWhileLoading = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isIconOnly = (iconLeading || iconTrailing) && !children
    const isLinkVariant = variant === 'link-gray' || variant === 'link-color' || variant === 'link-destructive'

    // Extract disabled from props (only exists on button element, not anchor)
    const disabled = 'disabled' in props ? props.disabled : false
    const isDisabled = disabled || isLoading

    // Determine if we should render as a link
    const href = 'href' in props ? props.href : undefined
    const asChild = 'asChild' in props ? props.asChild : false

    // For link buttons, we'll render an anchor
    if (href && asChild) {
      const { href: _, asChild: __, ...anchorProps } = props as { href: string; asChild: boolean }
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={isDisabled ? undefined : href}
          aria-disabled={isDisabled}
          data-disabled={isDisabled || undefined}
          className={cn(
            commonStyles,
            sizeStyles[size],
            roundnessStyles[roundness],
            isIconOnly && iconOnlySizeStyles[size],
            variantStyles[variant],
            isLoading && 'pointer-events-none',
            className
          )}
          {...anchorProps}
        >
          {renderIcon(iconLeading, 'leading')}
          {children && (
            <span data-text className={cn(!isLinkVariant && 'px-0.5')}>
              {children}
            </span>
          )}
          {renderIcon(iconTrailing, 'trailing')}
        </a>
      )
    }

    return (
      <BaseButton
        ref={ref}
        disabled={isDisabled}
        className={cn(
          commonStyles,
          sizeStyles[size],
          roundnessStyles[roundness],
          isIconOnly && iconOnlySizeStyles[size],
          variantStyles[variant],
          isLoading && 'relative',
          className
        )}
        {...(props as Record<string, unknown>)}
      >
        {/* Loading overlay */}
        {isLoading && !showTextWhileLoading && (
          <span className={loadingStyles.overlay}>
            <LoadingSpinner />
          </span>
        )}

        {/* Leading icon */}
        <span className={cn('transition-inherit-all', isLoading && !showTextWhileLoading && 'invisible')}>
          {renderIcon(iconLeading, 'leading')}
        </span>

        {/* Inline loading spinner (when showing text) */}
        {isLoading && showTextWhileLoading && <LoadingSpinner />}

        {/* Text content */}
        {children && (
          <span
            data-text
            className={cn(
              !isLinkVariant && 'px-0.5',
              isLoading && !showTextWhileLoading && 'invisible'
            )}
          >
            {children}
          </span>
        )}

        {/* Trailing icon */}
        <span className={cn('transition-inherit-all', isLoading && !showTextWhileLoading && 'invisible')}>
          {renderIcon(iconTrailing, 'trailing')}
        </span>
      </BaseButton>
    )
  }
)

Button.displayName = 'Button'
