/**
 * SlidingPanelContainer - Animated height and slide container
 *
 * Manages the complex height animation and horizontal slide
 * for panel transitions. This is the key to smooth submenu navigation.
 *
 * Height Animation Strategy:
 * - Use Motion's layout animation for automatic height transitions
 * - Track active panel to know which height to use
 * - Use motion.div with animate prop for smooth transitions
 *
 * @module prod/base/filter/filter-menu-motion/components/sliding-panel-container
 */

'use client'

import * as React from 'react'
import { useRef, useLayoutEffect, useEffect, useState, useCallback } from 'react'
import { motion } from 'motion/react'

import type { MotionAnimationConfig } from '../types'
import { getSlideTransition, EASE_OUT_EXPO } from '../animation-config'

// ============================================================================
// PROPS
// ============================================================================

export interface SlidingPanelContainerProps {
  /** Whether currently showing submenu (true) or root (false) */
  inSubmenu: boolean
  /** Whether the menu is open */
  isOpen: boolean
  /** Animation configuration */
  animationConfig: MotionAnimationConfig
  /** Root panel content */
  rootPanel: React.ReactNode
  /** Submenu panel content */
  submenuPanel: React.ReactNode
  /** Key to track submenu content changes (e.g., submenu ID) */
  submenuKey?: string | null
  /** Debug mode for console logging */
  debug?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * SlidingPanelContainer - Manages the sliding strip animation.
 *
 * Architecture:
 * ```
 * ┌──────────────────────────────────────┐
 * │  Height-animated container           │
 * │  ┌────────────────────────────────┐  │
 * │  │  Sliding strip (200% width)    │  │
 * │  │  ┌──────────┐ ┌──────────┐     │  │
 * │  │  │  Root    │ │ Submenu  │     │  │
 * │  │  │  Panel   │ │ Panel    │     │  │
 * │  │  └──────────┘ └──────────┘     │  │
 * │  └────────────────────────────────┘  │
 * └──────────────────────────────────────┘
 * ```
 *
 * - Strip slides left (x: -50%) to show submenu
 * - Container height animates to match active panel
 * - Both panels stay mounted for smooth transitions
 */
export function SlidingPanelContainer({
  inSubmenu,
  isOpen,
  animationConfig,
  rootPanel,
  submenuPanel,
  submenuKey,
  debug = true,
}: SlidingPanelContainerProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const submenuRef = useRef<HTMLDivElement>(null)

  // Track measured heights
  const [rootHeight, setRootHeight] = useState<number | 'auto'>('auto')
  const [submenuHeight, setSubmenuHeight] = useState<number | 'auto'>('auto')

  // Measure panel heights
  const measurePanels = useCallback(() => {
    if (rootRef.current) {
      const h = rootRef.current.scrollHeight
      if (debug) console.log('[SlidingPanel] 📏 Root height:', h)
      setRootHeight(h)
    }
    if (submenuRef.current) {
      const h = submenuRef.current.scrollHeight
      if (debug) console.log('[SlidingPanel] 📏 Submenu height:', h)
      setSubmenuHeight(h)
    }
  }, [debug])

  // Measure on mount and when content changes
  useLayoutEffect(() => {
    if (!isOpen) return

    // Use double RAF to ensure DOM is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        measurePanels()
      })
    })
  }, [isOpen, measurePanels])

  // Re-measure when submenu content changes
  useEffect(() => {
    if (!isOpen || !inSubmenu) return

    if (debug) console.log('[SlidingPanel] 🔄 Submenu changed:', submenuKey)

    const timeoutId = setTimeout(() => {
      measurePanels()
    }, 50)

    return () => clearTimeout(timeoutId)
  }, [isOpen, inSubmenu, submenuKey, measurePanels, debug])

  // Use ResizeObserver to track panel size changes
  useEffect(() => {
    if (!isOpen) return

    const observer = new ResizeObserver(() => {
      measurePanels()
    })

    if (rootRef.current) observer.observe(rootRef.current)
    if (submenuRef.current) observer.observe(submenuRef.current)

    return () => observer.disconnect()
  }, [isOpen, measurePanels])

  // Determine target height
  const targetHeight = inSubmenu ? submenuHeight : rootHeight

  if (debug && isOpen) {
    console.log('[SlidingPanel] 🎯 Target height:', targetHeight, { inSubmenu, rootHeight, submenuHeight })
  }

  // Height transition config
  const heightTransition = {
    duration: animationConfig.heightDuration / 1000,
    ease: EASE_OUT_EXPO,
  }

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={false}
      animate={{
        height: animationConfig.animateHeight ? targetHeight : 'auto',
      }}
      transition={heightTransition}
    >
      {/* Sliding strip - 200% width, slides to show panels */}
      <motion.div
        initial={false}
        animate={{ x: inSubmenu ? '-50%' : '0%' }}
        transition={getSlideTransition(animationConfig)}
        className="flex w-[200%] items-start"
      >
        {/* Root panel (left side) */}
        <div ref={rootRef} className="w-1/2 flex-shrink-0 p-1">
          {rootPanel}
        </div>

        {/* Submenu panel (right side) */}
        <div ref={submenuRef} className="w-1/2 flex-shrink-0 p-1">
          {submenuPanel}
        </div>
      </motion.div>
    </motion.div>
  )
}

SlidingPanelContainer.displayName = 'SlidingPanelContainer'
