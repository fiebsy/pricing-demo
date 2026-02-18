/**
 * Menu - Animation Hook
 *
 * Encapsulates animation concerns for the Menu component:
 * - Spring-animated slide and height transitions
 * - Reveal animation variants for open/close
 * - Panel navigation state and handlers
 * - Reduced motion support
 *
 * @module prod/base/menu/hooks/use-menu-animation
 */

'use client'

import { useState, useCallback, useMemo, useRef, useLayoutEffect, useEffect } from 'react'
import type { RefObject } from 'react'
import { useMotionValue, useTransform, useReducedMotion, animate } from 'motion/react'
import type { MotionValue, Variants, Transition } from 'motion/react'

import type {
  MenuItem,
  PanelState,
  AnimationConfig,
  MenuFeatures,
  MenuSide,
} from '../types'
import {
  DEFAULT_ANIMATION,
  DEFAULT_FEATURES,
  ANIMATION_TIMING,
  getSpringConfig,
  getSpringSettlingTime,
  createRevealVariants,
  createReducedMotionVariants,
  createRevealTransition,
} from '../config'

// ============================================================================
// Types
// ============================================================================

export interface UseMenuAnimationProps {
  /** Whether menu is currently open */
  isOpen: boolean
  /** Menu items (used to find submenu data) */
  items: MenuItem[]
  /** Menu side position (affects reveal direction) */
  side: MenuSide
  /** Offset from trigger (affects reveal slide distance) */
  sideOffset: number
  /** Animation configuration */
  animation?: AnimationConfig
  /** Feature toggles */
  features?: MenuFeatures
}

export interface UseMenuAnimationReturn {
  // ---- Motion Values ----
  /** Slide position motion value (0 = root, -50 = submenu) */
  slideX: MotionValue<number>
  /** Slide transform as percentage string */
  slideXTransform: MotionValue<string>
  /** Container height motion value */
  containerHeight: MotionValue<number>

  // ---- State ----
  /** Whether currently showing submenu */
  inSubmenu: boolean
  /** Animation direction ('forward' | 'back') */
  direction: 'forward' | 'back'
  /** Whether height animation is enabled and ready */
  canAnimateHeight: boolean
  /** Current submenu data (if in submenu) */
  submenu: PanelState | null

  // ---- Panel Refs ----
  /** Ref for root panel element */
  rootPanelRef: RefObject<HTMLDivElement | null>
  /** Ref for submenu panel element */
  submenuPanelRef: RefObject<HTMLDivElement | null>

  // ---- Handlers ----
  /** Navigate to a submenu by ID */
  navigateToSubmenu: (menuId: string) => void
  /** Navigate back to root panel */
  navigateBack: () => void

  // ---- Computed Animation Props ----
  /** Animate props for root panel (opacity) */
  rootPanelAnimate: { opacity: number }
  /** Animate props for submenu panel (opacity) */
  submenuPanelAnimate: { opacity: number }
  /** Transition config for panel crossfade */
  panelTransition: object
  /** Reveal animation variants (or undefined if disabled) */
  revealVariants: Variants | undefined
  /** Reveal animation transition */
  revealTransition: Transition

  // ---- Config ----
  /** Merged animation config */
  mergedAnimation: Required<AnimationConfig>
  /** Merged features config */
  mergedFeatures: Required<MenuFeatures>
  /** Whether reduced motion is preferred */
  prefersReducedMotion: boolean | null
}

// ============================================================================
// Hook
// ============================================================================

export function useMenuAnimation({
  isOpen,
  items,
  side,
  sideOffset,
  animation,
  features,
}: UseMenuAnimationProps): UseMenuAnimationReturn {
  // ============================================================================
  // Configuration
  // ============================================================================

  const mergedAnimation = useMemo(
    () => ({ ...DEFAULT_ANIMATION, ...animation }),
    [animation]
  )

  const mergedFeatures = useMemo(
    () => ({ ...DEFAULT_FEATURES, ...features }),
    [features]
  )

  const prefersReducedMotion = useReducedMotion()

  // ============================================================================
  // Navigation State
  // ============================================================================

  const [submenu, setSubmenu] = useState<PanelState | null>(null)
  const [isAnimatingToSubmenu, setIsAnimatingToSubmenu] = useState(false)
  const [isAnimatingBack, setIsAnimatingBack] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  // Measured heights for smooth transitions
  const [rootHeight, setRootHeight] = useState(0)
  const [submenuHeight, setSubmenuHeight] = useState(0)

  // ============================================================================
  // Refs
  // ============================================================================

  const rootPanelRef = useRef<HTMLDivElement>(null)
  const submenuPanelRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)
  const animationTokenRef = useRef(0)
  const backTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // ============================================================================
  // Spring Configuration
  // ============================================================================

  const springConfig = useMemo(() => {
    if (prefersReducedMotion) {
      return { stiffness: 10000, damping: 1000, mass: 1 }
    }
    return getSpringConfig(mergedAnimation)
  }, [mergedAnimation, prefersReducedMotion])

  // ============================================================================
  // Motion Values
  // ============================================================================

  const slideX = useMotionValue(0)
  const containerHeight = useMotionValue(rootHeight || 100)
  const slideXTransform = useTransform(slideX, (v) => `${v}%`)

  // ============================================================================
  // Computed State
  // ============================================================================

  const inSubmenu = isAnimatingToSubmenu && !isAnimatingBack

  const targetHeight = inSubmenu ? submenuHeight : rootHeight
  const canAnimateHeight = mergedFeatures.animateHeight && mergedAnimation.animateHeight && targetHeight > 0

  // ============================================================================
  // Height Measurement
  // ============================================================================

  useLayoutEffect(() => {
    if (!isOpen) return

    if (rootPanelRef.current) {
      const rect = rootPanelRef.current.getBoundingClientRect()
      if (rect.height > 0) {
        setRootHeight(rect.height)
        containerHeight.set(rect.height)
      }
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
        if (entry.target === rootPanelRef.current) {
          setRootHeight(height)
        } else if (entry.target === submenuPanelRef.current) {
          setSubmenuHeight(height)
        }
      }
    })

    if (rootPanelRef.current) observer.observe(rootPanelRef.current)
    if (submenuPanelRef.current) observer.observe(submenuPanelRef.current)

    return () => observer.disconnect()
  }, [isOpen, submenu, containerHeight])

  // ============================================================================
  // Animation State Updates
  // ============================================================================

  useEffect(() => {
    animate(slideX, inSubmenu ? -50 : 0, { type: 'spring', ...springConfig })

    if (canAnimateHeight && targetHeight > 0) {
      animate(containerHeight, targetHeight, { type: 'spring', ...springConfig })
    }
  }, [inSubmenu, targetHeight, canAnimateHeight, slideX, containerHeight, springConfig])

  // ============================================================================
  // Reset on Close
  // ============================================================================

  useEffect(() => {
    if (!isOpen && wasOpenRef.current) {
      if (backTimeoutRef.current) {
        clearTimeout(backTimeoutRef.current)
        backTimeoutRef.current = null
      }

      const timeout = setTimeout(() => {
        setSubmenu(null)
        setIsAnimatingToSubmenu(false)
        setIsAnimatingBack(false)
        slideX.set(0)
        setRootHeight(0)
        setSubmenuHeight(0)
      }, ANIMATION_TIMING.RESET_DELAY_MS)

      return () => clearTimeout(timeout)
    }
    wasOpenRef.current = isOpen
  }, [isOpen, slideX])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (backTimeoutRef.current) {
        clearTimeout(backTimeoutRef.current)
      }
    }
  }, [])

  // ============================================================================
  // Navigation Handlers
  // ============================================================================

  const navigateToSubmenu = useCallback((menuId: string) => {
    if (!mergedFeatures.submenu) return

    const submenuItem = items.find(
      (item) => item.id === menuId && item.type === 'submenu'
    )
    if (submenuItem && submenuItem.type === 'submenu') {
      if (backTimeoutRef.current) {
        clearTimeout(backTimeoutRef.current)
        backTimeoutRef.current = null
      }

      const currentToken = ++animationTokenRef.current

      setDirection('forward')
      setIsAnimatingBack(false)
      setSubmenu({
        id: menuId,
        title: submenuItem.label,
        items: submenuItem.items,
      })

      requestAnimationFrame(() => {
        if (animationTokenRef.current !== currentToken) return

        if (submenuPanelRef.current) {
          const rect = submenuPanelRef.current.getBoundingClientRect()
          if (rect.height > 0) {
            setSubmenuHeight(rect.height)
          }
        }
        setIsAnimatingToSubmenu(true)
      })
    }
  }, [items, mergedFeatures.submenu])

  const navigateBack = useCallback(() => {
    if (backTimeoutRef.current) {
      clearTimeout(backTimeoutRef.current)
    }

    const currentToken = ++animationTokenRef.current

    if (rootPanelRef.current) {
      const rect = rootPanelRef.current.getBoundingClientRect()
      if (rect.height > 0) {
        setRootHeight(rect.height)
      }
    }

    setDirection('back')
    setIsAnimatingBack(true)
    setIsAnimatingToSubmenu(false)

    const settleTime = prefersReducedMotion ? 50 : getSpringSettlingTime(springConfig.damping)

    backTimeoutRef.current = setTimeout(() => {
      if (animationTokenRef.current !== currentToken) return

      setSubmenu(null)
      setIsAnimatingBack(false)
      backTimeoutRef.current = null
    }, settleTime)
  }, [springConfig.damping, prefersReducedMotion])

  // ============================================================================
  // Reveal Animation
  // ============================================================================

  const revealVariants = useMemo(() => {
    if (!mergedFeatures.revealAnimation) return undefined
    const animateOnClose = mergedAnimation.animateOnClose
    if (prefersReducedMotion) return createReducedMotionVariants(animateOnClose)
    return createRevealVariants({
      side,
      sideOffset,
      scale: mergedAnimation.revealScale,
      slideRatio: mergedAnimation.revealSlideRatio,
      animateOnClose,
    })
  }, [
    side,
    sideOffset,
    prefersReducedMotion,
    mergedFeatures.revealAnimation,
    mergedAnimation.revealScale,
    mergedAnimation.revealSlideRatio,
    mergedAnimation.animateOnClose,
  ])

  const revealTransition = useMemo(() => {
    if (prefersReducedMotion) return { duration: 0 }
    return createRevealTransition(mergedAnimation.revealDuration)
  }, [prefersReducedMotion, mergedAnimation.revealDuration])

  // ============================================================================
  // Panel Crossfade Animation
  // ============================================================================

  const panelTransition = useMemo(() => {
    if (prefersReducedMotion) {
      return { type: 'tween' as const, duration: 0 }
    }
    return { type: 'spring' as const, ...springConfig }
  }, [springConfig, prefersReducedMotion])

  const rootPanelAnimate = useMemo(() => {
    return { opacity: inSubmenu ? 0 : 1 }
  }, [inSubmenu])

  const submenuPanelAnimate = useMemo(() => {
    return { opacity: inSubmenu ? 1 : 0 }
  }, [inSubmenu])

  // ============================================================================
  // Return
  // ============================================================================

  return {
    // Motion values
    slideX,
    slideXTransform,
    containerHeight,

    // State
    inSubmenu,
    direction,
    canAnimateHeight,
    submenu,

    // Panel refs
    rootPanelRef,
    submenuPanelRef,

    // Handlers
    navigateToSubmenu,
    navigateBack,

    // Animation props
    rootPanelAnimate,
    submenuPanelAnimate,
    panelTransition,
    revealVariants,
    revealTransition,

    // Config
    mergedAnimation,
    mergedFeatures,
    prefersReducedMotion,
  }
}
