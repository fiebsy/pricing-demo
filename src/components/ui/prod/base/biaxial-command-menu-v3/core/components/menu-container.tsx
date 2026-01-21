/**
 * Biaxial Command Menu V3 - Menu Container Component
 *
 * Wrapper for menu content with optional clip-path animation.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { EASING_EXPO_OUT } from '@/components/ui/prod/base/menu/config'
import type { BackgroundOption } from '../types'
import { getBackgroundClass, getMenuContainerClipPath } from '../utils'

export interface MenuContainerProps {
  /** Whether the menu is expanded */
  expanded: boolean
  /** Enable clip-path animation */
  animateMenuContainer: boolean
  /** Expansion origin for animation */
  expandOrigin: 'top' | 'center' | 'bottom'
  /** Animation duration in ms */
  duration: number
  /** Animation delay in ms */
  delay: number
  /** Container inset from edges */
  inset: number
  /** Border radius string */
  borderRadius: string
  /** Menu background option */
  menuBackground: BackgroundOption
  /** Border width in px */
  borderWidth?: number
  /** Border color variant */
  borderColor?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'brand'
  /** Enable squircle corners */
  squircle?: boolean
  /** Enable debug mode */
  debug?: boolean
  /** Child content */
  children: React.ReactNode
}

export const MenuContainer: React.FC<MenuContainerProps> = ({
  expanded,
  animateMenuContainer,
  expandOrigin,
  duration,
  delay,
  inset,
  borderRadius,
  menuBackground,
  borderWidth,
  borderColor = 'secondary',
  squircle,
  debug,
  children,
}) => {
  const baseStyles: React.CSSProperties = {
    top: inset,
    bottom: inset,
    left: inset,
    right: inset,
    borderRadius,
    ...(borderWidth &&
      borderWidth > 0 && {
        borderWidth,
        borderStyle: 'solid' as const,
        borderColor: `var(--color-border-${borderColor})`,
      }),
    ...(debug && {
      outline: '2px solid red',
      outlineOffset: '-2px',
    }),
  }

  // If menu container animation is enabled - use clip-path for true biaxial expansion
  if (animateMenuContainer) {
    const menuClipPath = getMenuContainerClipPath(expanded, expandOrigin)

    return (
      <div
        className={cn(
          'absolute overflow-hidden',
          squircle && 'corner-squircle',
          getBackgroundClass(menuBackground)
        )}
        style={{
          ...baseStyles,
          clipPath: menuClipPath,
          transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
        }}
      >
        {children}
      </div>
    )
  }

  // Default: no animation on menu container
  return (
    <div
      className={cn(
        'absolute overflow-hidden',
        squircle && 'corner-squircle',
        getBackgroundClass(menuBackground)
      )}
      style={baseStyles}
    >
      {children}
    </div>
  )
}

MenuContainer.displayName = 'MenuContainer'
