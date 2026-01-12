/**
 * Close Button Primitive
 *
 * A 40px touch target close button that visually appears smaller.
 * Uses negative margins to maintain layout based on icon size while
 * providing an accessible touch target.
 *
 * @module base-ui/filter/primitives/close-button
 */

'use client'

import { Button as AriaButton } from 'react-aria-components'
import { MultiplicationSignIcon } from '@hugeicons-pro/core-stroke-rounded'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { TOUCH_TARGET_SIZE } from '../constants'

// ============================================================================
// Types
// ============================================================================

/** Hugeicon component type */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HugeIconComponent = any

export interface CloseButtonProps {
  /** Called when button is pressed */
  onPress: () => void
  /** Icon size in pixels (default 14) */
  iconSize?: number
  /** Custom close icon component */
  icon?: HugeIconComponent
  /** Icon stroke width (default 2.5 for stroke icons, use 0 for solid/bulk) */
  strokeWidth?: number
  /** Current opacity (for animation sync) */
  opacity?: number
  /** CSS transition string (for animation sync) */
  transition?: string
  /** Additional class names */
  className?: string
}

// ============================================================================
// Component
// ============================================================================

/**
 * CloseButton - Accessible close button with 40px touch target
 *
 * Renders a close icon that appears at `iconSize` but has a full
 * 40px touch target for accessibility. Uses negative margins to
 * prevent the touch target from affecting layout.
 */
export const CloseButton: React.FC<CloseButtonProps> = ({
  onPress,
  iconSize = 14,
  icon,
  strokeWidth,
  opacity = 1,
  transition,
  className,
}) => {
  const IconComponent = icon ?? MultiplicationSignIcon
  // For solid/bulk icons use strokeWidth 0; for stroke icons use 2.5
  const finalStrokeWidth = strokeWidth ?? (icon ? 0 : 2.5)

  // Calculate negative margins to center the touch target around the icon
  const marginOffset = -((TOUCH_TARGET_SIZE - iconSize) / 2)

  return (
    <AriaButton
      onPress={onPress}
      className={cn(
        'flex-shrink-0 flex items-center justify-center rounded-full',
        'text-tertiary hover:text-primary',
        'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand',
        className
      )}
      style={{
        width: TOUCH_TARGET_SIZE,
        height: TOUCH_TARGET_SIZE,
        marginTop: marginOffset,
        marginBottom: marginOffset,
        marginLeft: marginOffset,
        marginRight: marginOffset,
        opacity,
        transition: transition ? `${transition}, color 100ms ease` : 'color 100ms ease',
      }}
    >
      <HugeIcon icon={IconComponent} size={iconSize} strokeWidth={finalStrokeWidth} />
    </AriaButton>
  )
}

CloseButton.displayName = 'CloseButton'
