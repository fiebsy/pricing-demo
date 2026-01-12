/**
 * SlidingPanelContainer - Animated height and slide container
 *
 * Manages the complex height animation and horizontal slide
 * for panel transitions. Supports two transition modes:
 * - 'slide': Both panels in a strip, slides horizontally
 * - 'popLayout': AnimatePresence with popLayout for exit animations
 *
 * @module prod/base/filter/filter-menu-motion/components/sliding-panel-container
 */

'use client'

import { useRef, useLayoutEffect, useEffect, useState, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import type { MotionAnimationConfig } from '../types'
import { getSlideTransition, EASE_OUT_EXPO, SCALE_ORIGIN_MAP } from '../animation-config'

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
  rootPanel: ReactNode
  /** Submenu panel content */
  submenuPanel: ReactNode
  /** Key to track submenu content changes (e.g., submenu ID) */
  submenuKey?: string | null
  /** Debug mode for console logging */
  debug?: boolean
}

// ============================================================================
// HEIGHT MEASUREMENT HOOK
// ============================================================================

function useHeightMeasurement(
  isOpen: boolean,
  inSubmenu: boolean,
  submenuKey: string | null | undefined,
  debug: boolean
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const submenuRef = useRef<HTMLDivElement>(null)
  const [rootHeight, setRootHeight] = useState<number | 'auto'>('auto')
  const [submenuHeight, setSubmenuHeight] = useState<number | 'auto'>('auto')

  const measurePanels = useCallback(() => {
    if (rootRef.current) {
      const h = rootRef.current.scrollHeight
      if (debug) console.log('[Panel] 📏 Root height:', h)
      setRootHeight(h)
    }
    if (submenuRef.current) {
      const h = submenuRef.current.scrollHeight
      if (debug) console.log('[Panel] 📏 Submenu height:', h)
      setSubmenuHeight(h)
    }
  }, [debug])

  useLayoutEffect(() => {
    if (!isOpen) return
    requestAnimationFrame(() => {
      requestAnimationFrame(() => measurePanels())
    })
  }, [isOpen, measurePanels])

  useEffect(() => {
    if (!isOpen || !inSubmenu) return
    if (debug) console.log('[Panel] 🔄 Submenu changed:', submenuKey)
    const timeoutId = setTimeout(measurePanels, 50)
    return () => clearTimeout(timeoutId)
  }, [isOpen, inSubmenu, submenuKey, measurePanels, debug])

  useEffect(() => {
    if (!isOpen) return
    const observer = new ResizeObserver(measurePanels)
    if (rootRef.current) observer.observe(rootRef.current)
    if (submenuRef.current) observer.observe(submenuRef.current)
    return () => observer.disconnect()
  }, [isOpen, measurePanels])

  return { rootRef, submenuRef, rootHeight, submenuHeight }
}

// ============================================================================
// SLIDE MODE
// ============================================================================

function SlideMode({
  inSubmenu,
  animationConfig,
  rootPanel,
  submenuPanel,
  rootRef,
  submenuRef,
  targetHeight,
}: {
  inSubmenu: boolean
  animationConfig: MotionAnimationConfig
  rootPanel: ReactNode
  submenuPanel: ReactNode
  rootRef: React.RefObject<HTMLDivElement | null>
  submenuRef: React.RefObject<HTMLDivElement | null>
  targetHeight: number | 'auto'
}) {
  // slideOffset controls overlap: 50 = no overlap, <50 = overlap, >50 = gap
  const { slideOffset, stripWidth } = animationConfig
  // Overlap mode needs different handling - panels stack instead of side-by-side
  const useOverlap = slideOffset < 50

  if (useOverlap) {
    // Stacked panels with translate for overlap effect
    return (
      <motion.div
        className="relative"
        initial={false}
        animate={{ height: animationConfig.animateHeight ? targetHeight : 'auto' }}
        transition={{ duration: animationConfig.heightDuration / 1000, ease: EASE_OUT_EXPO }}
      >
        {/* Root panel - slides out to left */}
        <motion.div
          ref={rootRef}
          initial={false}
          animate={{
            x: inSubmenu ? `${-100 + (50 - slideOffset)}%` : '0%',
            opacity: inSubmenu ? 0 : 1,
          }}
          transition={getSlideTransition(animationConfig)}
          className="absolute inset-0 p-1"
          style={{ zIndex: inSubmenu ? 0 : 1 }}
        >
          {rootPanel}
        </motion.div>
        {/* Submenu panel - slides in from right */}
        <motion.div
          ref={submenuRef}
          initial={false}
          animate={{
            x: inSubmenu ? '0%' : `${100 - (50 - slideOffset)}%`,
            opacity: inSubmenu ? 1 : 0,
          }}
          transition={getSlideTransition(animationConfig)}
          className="p-1"
          style={{ zIndex: inSubmenu ? 1 : 0 }}
        >
          {submenuPanel}
        </motion.div>
      </motion.div>
    )
  }

  // Standard side-by-side strip mode
  const panelWidthPercent = 100 / stripWidth * 100 // Each panel as % of strip

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={false}
      animate={{ height: animationConfig.animateHeight ? targetHeight : 'auto' }}
      transition={{ duration: animationConfig.heightDuration / 1000, ease: EASE_OUT_EXPO }}
    >
      <motion.div
        initial={false}
        animate={{ x: inSubmenu ? `${-slideOffset}%` : '0%' }}
        transition={getSlideTransition(animationConfig)}
        className="flex items-start"
        style={{ width: `${stripWidth}%` }}
      >
        <div ref={rootRef} className="flex-shrink-0 p-1" style={{ width: `${panelWidthPercent}%` }}>
          {rootPanel}
        </div>
        <div ref={submenuRef} className="flex-shrink-0 p-1" style={{ width: `${panelWidthPercent}%` }}>
          {submenuPanel}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// POPLAYOUT MODE
// ============================================================================

function PopLayoutMode({
  inSubmenu,
  animationConfig,
  rootPanel,
  submenuPanel,
  rootRef,
  submenuRef,
  targetHeight,
  submenuKey,
}: {
  inSubmenu: boolean
  animationConfig: MotionAnimationConfig
  rootPanel: ReactNode
  submenuPanel: ReactNode
  rootRef: React.RefObject<HTMLDivElement | null>
  submenuRef: React.RefObject<HTMLDivElement | null>
  targetHeight: number | 'auto'
  submenuKey: string | null | undefined
}) {
  const { slideDuration, panelExitScale, panelEnterScale, panelScaleOrigin, enableCrossfade } =
    animationConfig
  const duration = slideDuration / 1000
  const transformOrigin = SCALE_ORIGIN_MAP[panelScaleOrigin]

  const rootVariants = {
    initial: { scale: panelEnterScale, opacity: enableCrossfade ? 0 : 1, x: -20 },
    animate: { scale: 1, opacity: 1, x: 0 },
    exit: { scale: panelExitScale, opacity: enableCrossfade ? 0 : 1, x: -20 },
  }

  const submenuVariants = {
    initial: { scale: panelEnterScale, opacity: enableCrossfade ? 0 : 1, x: 20 },
    animate: { scale: 1, opacity: 1, x: 0 },
    exit: { scale: panelExitScale, opacity: enableCrossfade ? 0 : 1, x: 20 },
  }

  const transition = {
    duration,
    ease: EASE_OUT_EXPO,
  }

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={false}
      animate={{ height: animationConfig.animateHeight ? targetHeight : 'auto' }}
      transition={{ duration: animationConfig.heightDuration / 1000, ease: EASE_OUT_EXPO }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {inSubmenu ? (
          <motion.div
            key={`submenu-${submenuKey}`}
            ref={submenuRef}
            variants={submenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            style={{ transformOrigin }}
            className="p-1"
          >
            {submenuPanel}
          </motion.div>
        ) : (
          <motion.div
            key="root"
            ref={rootRef}
            variants={rootVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            style={{ transformOrigin }}
            className="p-1"
          >
            {rootPanel}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * SlidingPanelContainer - Manages panel transition animations.
 *
 * Supports two transition modes:
 * - 'slide': Horizontal sliding strip with configurable width and offset
 * - 'popLayout': AnimatePresence with scale/fade transitions
 */
export function SlidingPanelContainer({
  inSubmenu,
  isOpen,
  animationConfig,
  rootPanel,
  submenuPanel,
  submenuKey,
  debug = false,
}: SlidingPanelContainerProps) {
  const { rootRef, submenuRef, rootHeight, submenuHeight } = useHeightMeasurement(
    isOpen,
    inSubmenu,
    submenuKey,
    debug
  )

  const targetHeight = inSubmenu ? submenuHeight : rootHeight

  if (debug && isOpen) {
    console.log('[Panel] 🎯 Target height:', targetHeight, { inSubmenu, rootHeight, submenuHeight })
  }

  if (animationConfig.panelTransitionMode === 'popLayout') {
    return (
      <PopLayoutMode
        inSubmenu={inSubmenu}
        animationConfig={animationConfig}
        rootPanel={rootPanel}
        submenuPanel={submenuPanel}
        rootRef={rootRef}
        submenuRef={submenuRef}
        targetHeight={targetHeight}
        submenuKey={submenuKey}
      />
    )
  }

  return (
    <SlideMode
      inSubmenu={inSubmenu}
      animationConfig={animationConfig}
      rootPanel={rootPanel}
      submenuPanel={submenuPanel}
      rootRef={rootRef}
      submenuRef={submenuRef}
      targetHeight={targetHeight}
    />
  )
}

SlidingPanelContainer.displayName = 'SlidingPanelContainer'
