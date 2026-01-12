/**
 * AnimatedPanel - Motion-animated menu panel
 *
 * Handles the sliding panel animation for root/submenu transitions.
 * Uses the state-based animation pattern for mounted components.
 *
 * @module prod/base/filter/filter-menu-motion/components/animated-panel
 */

'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import { motion } from 'motion/react'

import type { MotionAnimationConfig } from '../types'
import { getSlideTransition } from '../animation-config'

// ============================================================================
// PROPS
// ============================================================================

export interface AnimatedPanelProps {
  /** Whether this panel is currently active (visible) */
  isActive: boolean
  /** Animation configuration */
  animationConfig: MotionAnimationConfig
  /** Whether this is the submenu panel (affects scale direction) */
  isSubmenu?: boolean
  /** Panel content */
  children: React.ReactNode
  /** Additional className */
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * AnimatedPanel - A panel that scales during slide transitions.
 *
 * The scale animation creates depth perception:
 * - Active panel scales to 1 (full size)
 * - Inactive panel scales down slightly (panelExitScale/panelEnterScale)
 * - Transform origin varies based on panel position in strip
 */
export const AnimatedPanel = forwardRef<HTMLDivElement, AnimatedPanelProps>(
  function AnimatedPanel(
    { isActive, animationConfig, isSubmenu = false, children, className },
    ref
  ) {
    // Determine scale based on active state
    const scale = isActive
      ? 1
      : isSubmenu
        ? animationConfig.panelEnterScale
        : animationConfig.panelExitScale

    // Transform origin: opposite side of slide direction
    // Root panel (left) scales from right, Submenu (right) scales from left
    const getTransformOrigin = () => {
      if (animationConfig.panelScaleOrigin === 'center') {
        return 'center center'
      }
      if (isSubmenu) {
        // Submenu is on right, scale from left (toward root)
        return animationConfig.panelScaleOrigin === 'left'
          ? 'left center'
          : 'right center'
      }
      // Root is on left, scale from right (toward submenu)
      return animationConfig.panelScaleOrigin === 'left'
        ? 'right center'
        : 'left center'
    }

    return (
      <motion.div
        ref={ref}
        initial={false}
        animate={{ scale }}
        transition={getSlideTransition(animationConfig)}
        style={{ transformOrigin: getTransformOrigin() }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }
)

AnimatedPanel.displayName = 'AnimatedPanel'
