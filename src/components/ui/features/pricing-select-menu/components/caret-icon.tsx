/**
 * Caret Icon Component
 *
 * Custom caret icon with configurable size, color, direction, and rotation.
 * Based on the demo design system caret.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { CaretDirection, TextColorOption } from '../types'
import { TEXT_COLOR_CLASSES } from '../constants'

export interface CaretIconProps {
  /** Size of the icon in pixels */
  size?: number
  /** Color using semantic text color tokens */
  color?: TextColorOption
  /** Initial direction of the caret */
  direction?: CaretDirection
  /** Whether the caret is in the "open" rotated state */
  isOpen?: boolean
  /** Whether to animate rotation when open state changes */
  rotatesOnOpen?: boolean
  /** Additional className */
  className?: string
}

export const CaretIcon: React.FC<CaretIconProps> = ({
  size = 18,
  color = 'tertiary',
  direction = 'down',
  isOpen = false,
  rotatesOnOpen = true,
  className,
}) => {
  // Calculate rotation based on direction and open state
  // - 'down' default: 0deg, when open & rotates: 180deg (points up)
  // - 'right' default: -90deg, when open & rotates: 0deg (points down)
  const getRotation = () => {
    if (direction === 'down') {
      return isOpen && rotatesOnOpen ? 180 : 0
    } else {
      // 'right' direction
      return isOpen && rotatesOnOpen ? 0 : -90
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={cn(
        'shrink-0 transition-transform duration-200',
        TEXT_COLOR_CLASSES[color],
        className
      )}
      style={{
        transform: `rotate(${getRotation()}deg)`,
      }}
    >
      <path
        d="M4.5 6.75L9 11.25L13.5 6.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

CaretIcon.displayName = 'CaretIcon'
