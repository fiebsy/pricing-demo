'use client'

import type { Ref } from 'react'
import { forwardRef, isValidElement } from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cn } from '@/lib/utils'
import { isReactComponent } from '@/lib/is-react-component'
import { Tooltip } from '@/components/ui/prod/base/tooltip'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import type { TooltipSide } from '@/components/ui/prod/base/tooltip'
import type { Placement } from 'react-aria'

import type { ButtonUtilityProps, ButtonUtilitySize } from './types'
import {
  baseStyles,
  colorStyles,
  activeStyles,
  activeHoverOverrideStyles,
  shapeStyles,
  iconSizeStyles,
  iconStyles,
  tooltipOffsets,
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
 * Map button utility size to HugeIcon size in pixels
 * xs: 16px (size-4), sm: 20px (size-5)
 */
const iconSizeMap: Record<ButtonUtilitySize, number> = {
  xs: 16,
  sm: 20,
}

/**
 * Maps react-aria Placement to Base UI TooltipSide
 * Base UI uses 'side' + 'align' instead of combined placement
 */
function mapPlacementToSide(placement: Placement): TooltipSide {
  // Extract the primary side from placement
  // e.g., 'top start' -> 'top', 'bottom' -> 'bottom'
  const side = placement.split(' ')[0]
  switch (side) {
    case 'top':
    case 'bottom':
    case 'left':
    case 'right':
      return side
    case 'start':
      return 'left'
    case 'end':
      return 'right'
    default:
      return 'top'
  }
}

/**
 * ButtonUtility - Icon-only utility button
 *
 * A compact button designed for icon-only actions like settings, close, etc.
 * Supports both button and anchor elements via the `href` prop.
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
      tooltipPlacement = 'top',
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

      const content = (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={isDisabled ? undefined : linkHref}
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

      if (tooltip) {
        return (
          <Tooltip
            title={tooltip}
            side={mapPlacementToSide(tooltipPlacement)}
            disabled={isDisabled}
            sideOffset={tooltipOffsets[size]}
          >
            {content}
          </Tooltip>
        )
      }

      return content
    }

    // For buttons, use Base UI Button
    const { type = 'button', ...buttonProps } = otherProps as { type?: 'button' | 'submit' | 'reset' }

    const content = (
      <BaseButton
        ref={ref as Ref<HTMLButtonElement>}
        type={type}
        disabled={isDisabled}
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

    if (tooltip) {
      return (
        <Tooltip
          title={tooltip}
          side={mapPlacementToSide(tooltipPlacement)}
          disabled={isDisabled}
          sideOffset={tooltipOffsets[size]}
        >
          {content}
        </Tooltip>
      )
    }

    return content
  }
)

ButtonUtility.displayName = 'ButtonUtility'
