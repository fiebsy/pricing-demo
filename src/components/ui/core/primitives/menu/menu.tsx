/**
 * Menu - Spring Animation Component
 *
 * Uses motion/react for physics-based spring animations on height and slide.
 * Built on Base UI primitives with configurable appearance and behavior.
 *
 * @module prod/base/menu
 */

'use client'

import React, { useState, useCallback, useMemo, useRef, useLayoutEffect, useEffect, cloneElement, isValidElement } from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { motion, useMotionValue, useTransform, useReducedMotion, animate, AnimatePresence } from 'motion/react'

import { cn } from '@/lib/utils'

import type {
  MenuProps,
  MenuItem,
  MenuSide,
  MenuAlign,
  PanelState,
  TriggerState,
} from './types'
import {
  DEFAULT_APPEARANCE,
  DEFAULT_ANIMATION,
  DEFAULT_FEATURES,
  DEFAULT_MENU_WIDTH,
  DEFAULT_SIDE_OFFSET,
  Z_INDEX,
  getPopupClasses,
  getGradientStyles,
  getItemRadius,
  getSpringConfig,
  getSpringSettlingTime,
  createRevealVariants,
  createReducedMotionVariants,
  createRevealTransition,
  DEFAULT_UNIFIED_HOVER,
} from './config'
import { MenuItem as MenuItemComponent } from './menu-item'
import { MenuBackButton } from './menu-back-button'
import { UnifiedHoverProvider, UnifiedHoverContainer } from './unified-hover'

// ============================================================================
// Component
// ============================================================================

/**
 * Menu - Base dropdown menu component
 *
 * Features:
 * - Reveal animation (scale + slide + fade)
 * - Panel navigation with sliding strip (spring-animated)
 * - Height animation between panels (spring-animated)
 * - Configurable appearance (shine, shadow, squircle, gradient)
 * - Feature toggles for submenu, height animation, reveal animation
 * - Render prop trigger for custom trigger state handling
 */
export const Menu: React.FC<MenuProps> = ({
  items,
  trigger,
  header,
  width = DEFAULT_MENU_WIDTH,
  side = 'bottom',
  align = 'start',
  sideOffset = DEFAULT_SIDE_OFFSET,
  alignOffset = 0,
  open: controlledOpen,
  onOpenChange: externalOnOpenChange,
  onSelect: externalOnSelect,
  appearance,
  animation,
  features,
  unifiedHover,
  className,
}) => {
  // ============================================================================
  // State
  // ============================================================================

  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const [submenu, setSubmenu] = useState<PanelState | null>(null)
  const [isAnimatingToSubmenu, setIsAnimatingToSubmenu] = useState(false)
  const [isAnimatingBack, setIsAnimatingBack] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  // Measured heights for smooth transitions
  const [rootHeight, setRootHeight] = useState(0)
  const [submenuHeight, setSubmenuHeight] = useState(0)

  // Refs
  const rootPanelRef = useRef<HTMLDivElement>(null)
  const submenuPanelRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)
  const animationTokenRef = useRef(0)
  const backTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // ============================================================================
  // Configuration
  // ============================================================================

  const mergedAppearance = useMemo(
    () => ({ ...DEFAULT_APPEARANCE, ...appearance }),
    [appearance]
  )

  const mergedAnimation = useMemo(
    () => ({ ...DEFAULT_ANIMATION, ...animation }),
    [animation]
  )

  const mergedFeatures = useMemo(
    () => ({ ...DEFAULT_FEATURES, ...features }),
    [features]
  )

  const mergedUnifiedHover = useMemo(
    () => ({
      ...DEFAULT_UNIFIED_HOVER,
      ...unifiedHover,
      // Also check features.unifiedHover as a shorthand toggle
      enabled: unifiedHover?.enabled ?? mergedFeatures.unifiedHover ?? false,
    }),
    [unifiedHover, mergedFeatures.unifiedHover]
  )

  // Detect reduced motion preference (moved up for use in variants)
  const prefersReducedMotion = useReducedMotion()

  // Memoized reveal variants (direction-aware, configurable)
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

  // Memoized transition (with slow-mo support, configurable duration)
  const revealTransition = useMemo(() => {
    if (prefersReducedMotion) return { duration: 0 }
    const slowMoScale = mergedAnimation.slowMoEnabled ? 10 : 1
    return createRevealTransition(mergedAnimation.revealDuration, slowMoScale)
  }, [prefersReducedMotion, mergedAnimation.slowMoEnabled, mergedAnimation.revealDuration])

  // Close menu on scroll to prevent animation issues with sticky positioning
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      if (!isControlled) {
        setInternalOpen(false)
      }
      externalOnOpenChange?.(false)
    }

    // Use capture phase to catch scroll before it causes position updates
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true })
    return () => window.removeEventListener('scroll', handleScroll, { capture: true })
  }, [isOpen, isControlled, externalOnOpenChange])

  // Get spring config from preset or custom values
  // When reduced motion is preferred, use instant transitions (very high stiffness/damping)
  // When slow motion is enabled, scale spring parameters for 10% speed
  const springConfig = useMemo(
    () => {
      if (prefersReducedMotion) {
        // Instant transition: very stiff spring with high damping = no oscillation, near-instant
        return { stiffness: 10000, damping: 1000, mass: 1 }
      }

      const baseConfig = getSpringConfig(mergedAnimation)

      // Slow motion debug feature: scale spring parameters
      // Quadratic multiplier on stiffness makes slow motion pronounced
      // Linear damping scaling maintains animation feel
      if (mergedAnimation.slowMoEnabled) {
        const scale = 0.1 // 10% speed
        const springMultiplier = scale * scale // Quadratic
        return {
          stiffness: baseConfig.stiffness * springMultiplier,
          damping: baseConfig.damping * scale,
          mass: baseConfig.mass,
        }
      }

      return baseConfig
    },
    [mergedAnimation, prefersReducedMotion]
  )

  // ============================================================================
  // Spring Animations
  // ============================================================================

  // Slide position: 0 = root panel, -50 = submenu panel (percentage)
  // Using useMotionValue + animate() instead of useSpring so we can update config dynamically
  const slideX = useMotionValue(0)

  // Container height: animates between root and submenu heights
  const containerHeight = useMotionValue(rootHeight || 100)

  // Transform slideX to percentage string for CSS
  const slideXTransform = useTransform(slideX, (v) => `${v}%`)

  // ============================================================================
  // Height Measurement
  // ============================================================================

  useLayoutEffect(() => {
    if (!isOpen) return

    // Immediate synchronous measurement for initial height
    if (rootPanelRef.current) {
      const rect = rootPanelRef.current.getBoundingClientRect()
      if (rect.height > 0) {
        setRootHeight(rect.height)
        containerHeight.set(rect.height)
      }
    }

    // ResizeObserver for ongoing height changes (dynamic content)
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

  const inSubmenu = isAnimatingToSubmenu && !isAnimatingBack
  const targetHeight = inSubmenu ? submenuHeight : rootHeight
  const canAnimateHeight = mergedFeatures.animateHeight && mergedAnimation.animateHeight && targetHeight > 0

  // Update spring values when navigation state changes
  useEffect(() => {
    // Animate slide position with current spring config
    animate(slideX, inSubmenu ? -50 : 0, { type: 'spring', ...springConfig })

    // Animate height if enabled
    if (canAnimateHeight && targetHeight > 0) {
      animate(containerHeight, targetHeight, { type: 'spring', ...springConfig })
    }
  }, [inSubmenu, targetHeight, canAnimateHeight, slideX, containerHeight, springConfig])

  // ============================================================================
  // Reset on Close
  // ============================================================================

  useEffect(() => {
    if (!isOpen && wasOpenRef.current) {
      // Clear any pending back timeout
      if (backTimeoutRef.current) {
        clearTimeout(backTimeoutRef.current)
        backTimeoutRef.current = null
      }

      const timeout = setTimeout(() => {
        setSubmenu(null)
        setIsAnimatingToSubmenu(false)
        setIsAnimatingBack(false)
        // Reset springs to initial position
        slideX.set(0)
        // Reset height state so it gets freshly measured on reopen
        setRootHeight(0)
        setSubmenuHeight(0)
      }, 200)
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
  // Handlers
  // ============================================================================

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setInternalOpen(open)
      }
      externalOnOpenChange?.(open)
    },
    [isControlled, externalOnOpenChange]
  )

  const toggle = useCallback(() => {
    handleOpenChange(!isOpen)
  }, [handleOpenChange, isOpen])

  const navigateToSubmenu = useCallback((menuId: string) => {
    if (!mergedFeatures.submenu) return

    const submenuItem = items.find(
      (item) => item.id === menuId && item.type === 'submenu'
    )
    if (submenuItem && submenuItem.type === 'submenu') {
      // Cancel any pending back timeout
      if (backTimeoutRef.current) {
        clearTimeout(backTimeoutRef.current)
        backTimeoutRef.current = null
      }

      // Increment token to invalidate any pending animations
      const currentToken = ++animationTokenRef.current

      // Batch all state updates together (React 18+ auto-batches)
      setDirection('forward')
      setIsAnimatingBack(false)
      setSubmenu({
        id: menuId,
        title: submenuItem.label,
        items: submenuItem.items,
      })
      // Trigger animation immediately on next frame (single RAF, not double)
      requestAnimationFrame(() => {
        // Guard: Only proceed if this is still the current animation
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
    // Cancel any pending back timeout
    if (backTimeoutRef.current) {
      clearTimeout(backTimeoutRef.current)
    }

    // Increment token to invalidate pending forward animations
    const currentToken = ++animationTokenRef.current

    // Re-measure root height synchronously before animation
    if (rootPanelRef.current) {
      const rect = rootPanelRef.current.getBoundingClientRect()
      if (rect.height > 0) {
        setRootHeight(rect.height)
      }
    }
    // Batch state updates
    setDirection('back')
    setIsAnimatingBack(true)
    setIsAnimatingToSubmenu(false)

    // For spring animations, use approximate settling time based on damping
    // Use minimal delay when reduced motion is preferred
    // Scale settling time for slow motion
    const slowMoScale = mergedAnimation.slowMoEnabled ? 0.1 : 1
    const settleTime = prefersReducedMotion ? 50 : getSpringSettlingTime(springConfig.damping) / slowMoScale

    // Clean up after animation completes
    backTimeoutRef.current = setTimeout(() => {
      // Guard: Only cleanup if this is still the current animation
      if (animationTokenRef.current !== currentToken) return

      setSubmenu(null)
      setIsAnimatingBack(false)
      backTimeoutRef.current = null
    }, settleTime)
  }, [springConfig.damping, prefersReducedMotion, mergedAnimation.slowMoEnabled])

  const handleSelect = useCallback((item?: MenuItem) => {
    if (item && item.type !== 'separator' && item.type !== 'label' && item.type !== 'submenu' && item.type !== 'checkbox') {
      externalOnSelect?.(item)
    }
    handleOpenChange(false)
  }, [handleOpenChange, externalOnSelect])

  // ============================================================================
  // Opacity & Blur Animation Config
  // ============================================================================

  // Determine base transition settings for opacity (and blur if enabled)
  const baseTransition = useMemo(() => {
    // Instant transition when reduced motion is preferred
    if (prefersReducedMotion) {
      return {
        type: 'tween' as const,
        duration: 0,
      }
    }

    // Slow motion scale for tween duration (spring already has scaled config)
    const slowMoScale = mergedAnimation.slowMoEnabled ? 0.1 : 1

    if (mergedAnimation.syncOpacityToSpring) {
      // Use spring for opacity too (springConfig already has slow-mo scaling applied)
      return {
        type: 'spring' as const,
        ...springConfig,
      }
    }
    // Use tween with configured duration, scaled for slow motion
    return {
      type: 'tween' as const,
      duration: (mergedAnimation.opacityDuration / 1000) / slowMoScale,
      ease: 'easeInOut' as const,
    }
  }, [mergedAnimation.syncOpacityToSpring, mergedAnimation.opacityDuration, mergedAnimation.slowMoEnabled, springConfig, prefersReducedMotion])

  // Build panel transition - if blur is enabled, apply same timing to filter property
  const panelTransition = useMemo(() => {
    if (mergedAnimation.blurOnFade && !prefersReducedMotion) {
      return {
        opacity: baseTransition,
        filter: baseTransition,
      }
    }
    return baseTransition
  }, [baseTransition, mergedAnimation.blurOnFade, prefersReducedMotion])

  // Build animate props for root panel
  const rootPanelAnimate = useMemo(() => {
    const base = { opacity: inSubmenu ? 0 : 1 }
    if (mergedAnimation.blurOnFade && !prefersReducedMotion) {
      return {
        ...base,
        filter: inSubmenu ? `blur(${mergedAnimation.blurAmount}px)` : 'blur(0px)',
      }
    }
    return base
  }, [inSubmenu, mergedAnimation.blurOnFade, mergedAnimation.blurAmount, prefersReducedMotion])

  // Build animate props for submenu panel
  const submenuPanelAnimate = useMemo(() => {
    const base = { opacity: inSubmenu ? 1 : 0 }
    if (mergedAnimation.blurOnFade && !prefersReducedMotion) {
      return {
        ...base,
        filter: inSubmenu ? 'blur(0px)' : `blur(${mergedAnimation.blurAmount}px)`,
      }
    }
    return base
  }, [inSubmenu, mergedAnimation.blurOnFade, mergedAnimation.blurAmount, prefersReducedMotion])

  // ============================================================================
  // Trigger Rendering
  // ============================================================================

  const triggerState: TriggerState = useMemo(() => ({
    isOpen,
    toggle,
  }), [isOpen, toggle])

  const renderedTrigger = useMemo(() => {
    // If trigger is a render prop function, call it with state
    if (typeof trigger === 'function') {
      return trigger(triggerState)
    }
    // Otherwise, inject data-active attribute into trigger element
    if (isValidElement(trigger)) {
      return cloneElement(trigger as React.ReactElement<{ 'data-active'?: boolean }>, {
        'data-active': isOpen || undefined,
      })
    }
    return trigger
  }, [trigger, triggerState, isOpen])

  // ============================================================================
  // Render
  // ============================================================================

  const popupClasses = getPopupClasses(mergedAppearance)
  const gradientStyles = getGradientStyles(mergedAppearance)
  const itemRadius = getItemRadius(mergedAppearance.borderRadius)

  // Filter items to exclude submenus when submenu feature is disabled
  const filteredItems = useMemo(() => {
    if (mergedFeatures.submenu) return items
    return items.filter((item) => item.type !== 'submenu')
  }, [items, mergedFeatures.submenu])

  return (
    <BaseMenu.Root open={isOpen} onOpenChange={handleOpenChange} modal={false}>
      <BaseMenu.Trigger nativeButton={false} render={<span className="outline-none focus:outline-none" />}>
        {renderedTrigger}
      </BaseMenu.Trigger>

      <AnimatePresence>
        {isOpen && (
          <BaseMenu.Portal keepMounted>
            <BaseMenu.Positioner
              side={side as MenuSide}
              align={align as MenuAlign}
              sideOffset={sideOffset}
              alignOffset={alignOffset}
              collisionPadding={8}
              style={{ zIndex: Z_INDEX.MENU_POSITIONER }}
            >
              <BaseMenu.Popup
                data-menu-popup=""
                data-state={isOpen ? 'open' : 'closed'}
                data-side={side}
                data-squircle={mergedAppearance.squircle || undefined}
                render={
                  revealVariants ? (
                    <motion.div
                      variants={revealVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={revealTransition}
                      style={{
                        transformOrigin: 'var(--transform-origin)',
                        willChange: 'transform, opacity',
                      }}
                    />
                  ) : undefined
                }
                className={cn(
                  'group/menu overflow-hidden',
                  // Accessibility: respect reduced motion preference
                  'motion-reduce:animate-none motion-reduce:transition-none',
                  popupClasses,
                  className
                )}
                style={{
                  width,
                  '--menu-item-radius': `${itemRadius}px`,
                  ...gradientStyles,
                } as React.CSSProperties}
              >
                {/* Animation Container - uses motion/react springs */}
                <div
                  data-menu-view={inSubmenu ? 'submenu' : 'root'}
                  data-menu-direction={direction}
                >
                  {/* Height Wrapper - spring-animated height */}
                  <motion.div
                    className="menu-height-wrapper relative overflow-hidden"
                    style={{
                      height: canAnimateHeight ? containerHeight : 'auto',
                    }}
                  >
                    {/* Sliding Strip - spring-animated translateX */}
                    <motion.div
                      className="menu-sliding-strip flex items-start w-[200%]"
                      style={{ x: slideXTransform }}
                    >
                      {/* Panel A - Root Menu */}
                      <motion.div
                        ref={rootPanelRef}
                        className="menu-panel-root w-1/2 flex-shrink-0 p-1"
                        animate={rootPanelAnimate}
                        transition={panelTransition}
                      >
                        {header}
                        <UnifiedHoverProvider
                          enabled={mergedUnifiedHover.enabled}
                          config={mergedUnifiedHover}
                          isActive={!inSubmenu}
                        >
                          <UnifiedHoverContainer className="relative flex flex-col gap-1">
                            {filteredItems.map((item) => (
                              <MenuItemComponent
                                key={item.id}
                                item={item}
                                onSubmenuClick={mergedFeatures.submenu ? navigateToSubmenu : undefined}
                                onSelect={() => handleSelect(item)}
                                unifiedHoverEnabled={mergedUnifiedHover.enabled}
                              />
                            ))}
                          </UnifiedHoverContainer>
                        </UnifiedHoverProvider>
                      </motion.div>

                      {/* Panel B - Submenu (only rendered when submenu feature is enabled) */}
                      {mergedFeatures.submenu && (
                        <motion.div
                          ref={submenuPanelRef}
                          className="menu-panel-submenu w-1/2 flex-shrink-0 p-1"
                          animate={submenuPanelAnimate}
                          transition={panelTransition}
                        >
                          {submenu && (
                            <>
                              <MenuBackButton
                                title={submenu.title}
                                onBack={navigateBack}
                              />
                              <UnifiedHoverProvider
                                enabled={mergedUnifiedHover.enabled}
                                config={mergedUnifiedHover}
                                isActive={inSubmenu}
                              >
                                <UnifiedHoverContainer className="relative flex flex-col gap-1">
                                  {submenu.items.map((item) => (
                                    <MenuItemComponent
                                      key={item.id}
                                      item={item}
                                      onSubmenuClick={navigateToSubmenu}
                                      onSelect={() => handleSelect(item)}
                                      unifiedHoverEnabled={mergedUnifiedHover.enabled}
                                    />
                                  ))}
                                </UnifiedHoverContainer>
                              </UnifiedHoverProvider>
                            </>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </BaseMenu.Popup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        )}
      </AnimatePresence>
    </BaseMenu.Root>
  )
}

Menu.displayName = 'Menu'
