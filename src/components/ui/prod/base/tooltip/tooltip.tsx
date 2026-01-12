'use client'

import type { ReactElement } from 'react'
import { isValidElement, cloneElement } from 'react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { cn } from '@/lib/utils'

import type { TooltipProps } from './types'
import {
  popupStyles,
  paddingStyles,
  titleStyles,
  descriptionStyles,
  arrowStyles,
  defaults,
} from './config'

// Import keyframe animations
import './tooltip-transitions.css'

/**
 * Merge event handlers from two sources
 * Ensures both the original handler and tooltip handler are called
 */
function mergeEventHandlers<T extends (...args: unknown[]) => void>(
  original: T | undefined,
  additional: T | undefined
): T | undefined {
  if (!original && !additional) return undefined
  if (!original) return additional
  if (!additional) return original

  return ((...args: unknown[]) => {
    original(...args)
    additional(...args)
  }) as T
}

/**
 * Merge props from tooltip trigger with child props
 * Event handlers are composed so both fire, other props from tooltip take precedence
 */
function mergeProps(
  childProps: Record<string, unknown>,
  tooltipProps: Record<string, unknown>
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...childProps }

  for (const key of Object.keys(tooltipProps)) {
    const childValue = childProps[key]
    const tooltipValue = tooltipProps[key]

    // Merge event handlers (on* props)
    if (
      key.startsWith('on') &&
      typeof childValue === 'function' &&
      typeof tooltipValue === 'function'
    ) {
      merged[key] = mergeEventHandlers(
        childValue as (...args: unknown[]) => void,
        tooltipValue as (...args: unknown[]) => void
      )
    } else {
      // For non-event props, tooltip props take precedence
      merged[key] = tooltipValue
    }
  }

  return merged
}

export const Tooltip = ({
  title,
  description,
  arrow = defaults.arrow,
  delay = defaults.delay,
  closeDelay = defaults.closeDelay,
  side = defaults.side,
  align = defaults.align,
  sideOffset = defaults.sideOffset,
  disabled,
  open,
  defaultOpen,
  onOpenChange,
  children,
}: TooltipProps) => {
  return (
    <BaseTooltip.Provider delay={delay} closeDelay={closeDelay}>
      <BaseTooltip.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        disabled={disabled}
      >
        <BaseTooltip.Trigger
          render={(tooltipProps) => {
            if (isValidElement(children)) {
              const childElement = children as ReactElement<Record<string, unknown>>
              const childProps = childElement.props || {}

              // Merge props so event handlers are composed, not overwritten
              const mergedProps = mergeProps(childProps, tooltipProps as Record<string, unknown>)

              return cloneElement(childElement, mergedProps)
            }
            return <span {...tooltipProps}>{children}</span>
          }}
        />

        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            side={side}
            align={align}
            sideOffset={sideOffset}
            className="z-[9999]"
          >
            <BaseTooltip.Popup
              className={cn(
                popupStyles,
                description ? paddingStyles.withDescription : paddingStyles.titleOnly
              )}
            >
              <span className={titleStyles}>{title}</span>

              {description && (
                <span className={descriptionStyles}>{description}</span>
              )}

              {arrow && (
                <BaseTooltip.Arrow className={arrowStyles}>
                  <ArrowSvg />
                </BaseTooltip.Arrow>
              )}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  )
}

Tooltip.displayName = 'Tooltip'

/**
 * Custom arrow SVG for squircle-style appearance.
 */
const ArrowSvg = () => (
  <svg viewBox="0 0 100 100" className="size-full">
    <path d="M0,0 L35.858,35.858 Q50,50 64.142,35.858 L100,0 Z" />
  </svg>
)
