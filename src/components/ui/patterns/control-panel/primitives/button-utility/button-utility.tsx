'use client'

import type { Ref } from 'react'
import { forwardRef, isValidElement } from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cn } from '../../utils'
import { HugeIcon } from '../icon'
import type { ButtonUtilityProps, ButtonUtilitySize } from './types'
import {
  baseStyles,
  colorStyles,
  activeStyles,
  activeHoverOverrideStyles,
  shapeStyles,
  iconSizeStyles,
  iconStyles,
} from './config'

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
 * Checks if a given value is a valid React component.
 */
function isReactComponent(component: unknown): component is React.FC<{ className?: string }> {
  if (typeof component === 'function') return true
  if (
    typeof component === 'object' &&
    component !== null &&
    (component as { $$typeof?: symbol }).$$typeof &&
    (component as { $$typeof?: symbol }).$$typeof?.toString() === 'Symbol(react.forward_ref)'
  ) {
    return true
  }
  return false
}

/**
 * Map button utility size to HugeIcon size in pixels
 * xs: 16px (size-4), sm: 20px (size-5)
 */
const iconSizeMap: Record<ButtonUtilitySize, number> = {
  xs: 16,
  sm: 20,
}

/**
 * ButtonUtility - Icon-only utility button
 *
 * A compact button designed for icon-only actions like settings, close, etc.
 * Supports both button and anchor elements via the `href` prop.
 *
 * This is a simplified version that uses the native `title` attribute for
 * tooltips instead of a full Tooltip component.
 *
 * @example
 * ```tsx
 * <ButtonUtility icon={Settings01Icon} tooltip="Settings" />
 * <ButtonUtility icon={Close01Icon} color="tertiary" />
 * <ButtonUtility icon={LinkIcon} href="/settings" tooltip="Go to settings" />
 * ```
 */
export const ButtonUtility = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonUtilityProps>(
  (
    {
      tooltip,
      className,
      isDisabled,
      isActive,
      disableHoverWhenActive = true,
      disableShine = false,
      icon: Icon,
      size = 'sm',
      color = 'secondary',
      shape = 'square',
      ...otherProps
    },
    ref
  ) => {
    const href = 'href' in otherProps ? otherProps.href : undefined
    const isLink = Boolean(href)

    // Whether to disable hover effects when active
    const shouldDisableHover = isActive && disableHoverWhenActive

    const buttonClassName = cn(
      // Base styles
      baseStyles,

      // Shape
      shapeStyles[shape],

      // Color (only when not active)
      !isActive && colorStyles[color],

      // Active state styles
      isActive && activeStyles[color],

      // Hover overrides (when active and disableHoverWhenActive is true)
      shouldDisableHover && activeHoverOverrideStyles[color],

      // Icon styles
      iconStyles,
      iconSizeStyles[size],

      className
    )

    // Render the icon
    const iconContent = (() => {
      // HugeIcon array format - needs HugeIcon wrapper
      if (isHugeIconArray(Icon)) {
        return (
          <HugeIcon
            icon={Icon}
            size={iconSizeMap[size]}
            strokeWidth={1.5}
            data-icon
          />
        )
      }
      // React component (function/class)
      if (isReactComponent(Icon)) {
        return <Icon data-icon />
      }
      // Already a valid React element
      if (isValidElement(Icon)) {
        return Icon
      }
      return null
    })()

    // For links, use a native anchor element
    if (isLink) {
      const { href: linkHref, ...linkProps } = otherProps as { href?: string }

      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={isDisabled ? undefined : linkHref}
          title={tooltip}
          aria-label={tooltip}
          data-active={isActive ? true : undefined}
          data-disabled={isDisabled ? true : undefined}
          className={buttonClassName}
          {...linkProps}
        >
          {/* Background layer with shine - fades in on hover, always visible when active */}
          {!disableShine && (
            <div
              className={cn(
                'absolute inset-0 -z-10 rounded-[inherit] pointer-events-none transition-opacity duration-150',
                'bg-secondary shine-1',
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                // Lock hover when active and disableHoverWhenActive is true
                shouldDisableHover && 'group-hover:opacity-100'
              )}
            />
          )}
          {iconContent}
        </a>
      )
    }

    // For buttons, use Base UI Button
    const { type = 'button', ...buttonProps } = otherProps as { type?: 'button' | 'submit' | 'reset' }

    return (
      <BaseButton
        ref={ref as Ref<HTMLButtonElement>}
        type={type}
        disabled={isDisabled}
        title={tooltip}
        aria-label={tooltip}
        data-active={isActive ? true : undefined}
        className={buttonClassName}
        {...buttonProps}
      >
        {/* Background layer with shine - fades in on hover, always visible when active */}
        {!disableShine && (
          <div
            className={cn(
              'absolute inset-0 -z-10 rounded-[inherit] pointer-events-none transition-opacity duration-150',
              'bg-secondary shine-1',
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
              // Lock hover when active and disableHoverWhenActive is true
              shouldDisableHover && 'group-hover:opacity-100'
            )}
          />
        )}
        {iconContent}
      </BaseButton>
    )
  }
)

ButtonUtility.displayName = 'ButtonUtility'
