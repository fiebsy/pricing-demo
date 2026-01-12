/**
 * Menu - Main Component
 *
 * Base menu component with reveal animation, panel navigation,
 * and configurable appearance. Built on Base UI primitives.
 *
 * This is the foundation for FilterMenu and other menu derivatives.
 *
 * @module prod/base/menu/menu
 */

'use client'

import React, { useState, useCallback, useMemo, useRef, useLayoutEffect, useEffect, cloneElement, isValidElement } from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cn } from '@/lib/utils'

// CSS-driven panel transitions (no JS during animation)
import './menu-transitions.css'
import type {
  MenuProps,
  MenuItem,
  MenuSide,
  MenuAlign,
  PanelState,
} from './types'
import {
  DEFAULT_APPEARANCE,
  DEFAULT_ANIMATION,
  DEFAULT_MENU_WIDTH,
  DEFAULT_SIDE_OFFSET,
  REVEAL_ANIMATION,
  USE_LEGACY_ANIMATION,
  Z_INDEX,
  getPopupClasses,
  getGradientStyles,
  getItemRadius,
  getRevealAnimationClasses,
  EASING_EXPO_OUT,
} from './config'
import { MenuItem as MenuItemComponent } from './menu-item'
import { MenuBackButton } from './menu-back-button'

// ============================================================================
// Reveal Animation Hook (Legacy - kept for easy revert)
// ============================================================================

/**
 * Legacy reveal animation using CSS keyframe injection.
 * Only used when USE_LEGACY_ANIMATION is true.
 * Kept for easy revert if Tailwind animations cause issues.
 */
function useRevealAnimationLegacy(isOpen: boolean, sideOffset: number) {
  const idRef = useRef(`menu-${Math.random().toString(36).substr(2, 9)}`)
  const uniqueClass = `menu-popup-${idRef.current}`

  const animationCss = useMemo(() => {
    if (!isOpen) return ''

    // Use centralized reveal animation config
    const { duration, scaleStart, scaleEnd, slideOffsetRatio } = REVEAL_ANIMATION
    const easing = EASING_EXPO_OUT
    const slideOffset = Math.round(sideOffset * slideOffsetRatio)

    const keyframe = `menu-reveal-${idRef.current}`
    const opacityKeyframe = `menu-opacity-${idRef.current}`

    return `
      .${uniqueClass}[data-side="bottom"][data-open] {
        transform-origin: var(--transform-origin) !important;
        animation: ${keyframe}-bottom ${duration}ms ${easing} both,
                   ${opacityKeyframe} ${duration}ms ${easing} both !important;
      }
      .${uniqueClass}[data-side="top"][data-open] {
        transform-origin: var(--transform-origin) !important;
        animation: ${keyframe}-top ${duration}ms ${easing} both,
                   ${opacityKeyframe} ${duration}ms ${easing} both !important;
      }
      @keyframes ${keyframe}-bottom {
        from { transform: scale(${scaleStart}) translateY(-${slideOffset}px); }
        to { transform: scale(${scaleEnd}) translateY(0); }
      }
      @keyframes ${keyframe}-top {
        from { transform: scale(${scaleStart}) translateY(${slideOffset}px); }
        to { transform: scale(${scaleEnd}) translateY(0); }
      }
      @keyframes ${opacityKeyframe} {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `
  }, [isOpen, sideOffset, uniqueClass])

  return { uniqueClass, animationCss }
}

// ============================================================================
// Component
// ============================================================================

/**
 * Menu - Base dropdown menu component
 *
 * Features:
 * - Reveal animation (scale + slide + fade)
 * - Panel navigation with sliding strip
 * - Height animation between panels
 * - Configurable appearance (shine, shadow, squircle, gradient)
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
  onOpenChange: externalOnOpenChange,
  onSelect: externalOnSelect,
  appearance,
  animation,
  className,
}) => {
  // ============================================================================
  // State
  // ============================================================================

  const [isOpen, setIsOpen] = useState(false)
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

  // Reveal animation - conditionally use legacy or Tailwind approach
  const legacyAnimation = useRevealAnimationLegacy(isOpen, sideOffset)
  const revealClasses = useMemo(() => getRevealAnimationClasses(), [])

  // Close menu on scroll to prevent animation issues with sticky positioning
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      setIsOpen(false)
      externalOnOpenChange?.(false)
    }

    // Use capture phase to catch scroll before it causes position updates
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true })
    return () => window.removeEventListener('scroll', handleScroll, { capture: true })
  }, [isOpen, externalOnOpenChange])

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

  // ============================================================================
  // Height Measurement
  // ============================================================================
  //
  // Height animation between panels requires accurate measurements of both
  // root and submenu panel heights. This is tricky because:
  //
  // 1. Initial open: rootHeight must be measured synchronously before the
  //    first render to avoid a flash of auto-height.
  //
  // 2. Navigate to submenu: submenuHeight is measured after 2 animation frames
  //    to ensure the submenu content has rendered (see Submenu Animation Trigger).
  //
  // 3. Navigate back: rootHeight must be re-measured in navigateBack() because
  //    the root panel may have been at 0 opacity during crossfade, and we need
  //    the current accurate height for a smooth transition.
  //
  // ResizeObserver handles ongoing changes (e.g., dynamic content), but the
  // synchronous measurements ensure we have valid heights at critical moments.
  // ============================================================================

  useLayoutEffect(() => {
    if (!isOpen) return

    // Immediate synchronous measurement for initial height
    // This prevents height animation from starting at 0
    if (rootPanelRef.current) {
      const rect = rootPanelRef.current.getBoundingClientRect()
      if (rect.height > 0) {
        setRootHeight(rect.height)
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
  }, [isOpen, submenu]) // Re-run when submenu changes to observe new panel

  // Note: Submenu animation is now triggered directly in navigateToSubmenu
  // with a single RAF for faster response

  // ============================================================================
  // Reset on Close
  // ============================================================================

  useEffect(() => {
    if (!isOpen && wasOpenRef.current) {
      const timeout = setTimeout(() => {
        setSubmenu(null)
        setIsAnimatingToSubmenu(false)
        setIsAnimatingBack(false)
      }, 200)
      return () => clearTimeout(timeout)
    }
    wasOpenRef.current = isOpen
  }, [isOpen])

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      externalOnOpenChange?.(open)
    },
    [externalOnOpenChange]
  )

  const navigateToSubmenu = useCallback((menuId: string) => {
    const submenuItem = items.find(
      (item) => item.id === menuId && item.type === 'submenu'
    )
    if (submenuItem && submenuItem.type === 'submenu') {
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
        if (submenuPanelRef.current) {
          const rect = submenuPanelRef.current.getBoundingClientRect()
          if (rect.height > 0) {
            setSubmenuHeight(rect.height)
          }
        }
        setIsAnimatingToSubmenu(true)
      })
    }
  }, [items])

  const navigateBack = useCallback(() => {
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
    // Clean up after animation completes
    setTimeout(() => {
      setSubmenu(null)
      setIsAnimatingBack(false)
    }, mergedAnimation.duration)
  }, [mergedAnimation.duration])

  const handleSelect = useCallback((item?: MenuItem) => {
    if (item && item.type !== 'separator' && item.type !== 'label' && item.type !== 'submenu' && item.type !== 'checkbox') {
      externalOnSelect?.(item)
    }
    handleOpenChange(false)
  }, [handleOpenChange, externalOnSelect])

  // ============================================================================
  // Animation State
  // ============================================================================

  const inSubmenu = isAnimatingToSubmenu && !isAnimatingBack
  const targetHeight = inSubmenu ? submenuHeight : rootHeight
  const canAnimateHeight = mergedAnimation.animateHeight && targetHeight > 0

  // CSS custom properties for transitions (memoized to prevent style reconciliation)
  const animationCssVars = useMemo(() => ({
    '--menu-slide-duration': `${mergedAnimation.duration}ms`,
    '--menu-slide-easing': mergedAnimation.easing,
    '--menu-fade-duration': `${mergedAnimation.opacityDuration}ms`,
    '--menu-fade-easing': mergedAnimation.opacityEasing,
    '--menu-quick-out-duration': `${mergedAnimation.quickOutDuration}ms`,
    '--menu-fade-in-delay': `${mergedAnimation.fadeInDelay}ms`,
    '--menu-stagger-delay': `${mergedAnimation.staggerDelay}ms`,
    '--menu-height-transition': canAnimateHeight
      ? `height ${mergedAnimation.duration}ms ${mergedAnimation.easing}`
      : 'none',
    '--menu-target-height': targetHeight > 0 ? `${targetHeight}px` : 'auto',
  } as React.CSSProperties), [
    mergedAnimation.duration,
    mergedAnimation.easing,
    mergedAnimation.opacityDuration,
    mergedAnimation.opacityEasing,
    mergedAnimation.quickOutDuration,
    mergedAnimation.fadeInDelay,
    mergedAnimation.staggerDelay,
    canAnimateHeight,
    targetHeight,
  ])

  // ============================================================================
  // Render
  // ============================================================================

  const popupClasses = getPopupClasses(mergedAppearance)
  const gradientStyles = getGradientStyles(mergedAppearance)
  const itemRadius = getItemRadius(mergedAppearance.borderRadius)

  return (
    <>
      {/* Inject reveal animation CSS (legacy mode only) */}
      {USE_LEGACY_ANIMATION && isOpen && legacyAnimation.animationCss && (
        <style>{legacyAnimation.animationCss}</style>
      )}

      <BaseMenu.Root open={isOpen} onOpenChange={handleOpenChange} modal={false}>
        <BaseMenu.Trigger nativeButton={false} render={<span className="outline-none focus:outline-none" />}>
          {/* Inject isActive prop into trigger when menu is open */}
          {isValidElement(trigger)
            ? cloneElement(trigger as React.ReactElement<{ isActive?: boolean }>, { isActive: isOpen })
            : trigger}
        </BaseMenu.Trigger>

        <BaseMenu.Portal>
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
              className={cn(
                'overflow-hidden',
                // Use legacy animation (CSS keyframe injection)
                USE_LEGACY_ANIMATION ? legacyAnimation.uniqueClass : revealClasses,
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
              {/* Animation Container - CSS handles all transitions via data attributes */}
              <div
                style={animationCssVars}
                data-menu-view={inSubmenu ? 'submenu' : 'root'}
                data-menu-direction={direction}
                data-menu-mode={mergedAnimation.opacityMode}
              >
                {/* Height Wrapper - animates between panel heights */}
                <div className="menu-height-wrapper relative overflow-hidden">
                  {/* Sliding Strip - 200% width, translateX for panel switching */}
                  <div className="menu-sliding-strip flex items-start w-[200%]">
                    {/* Panel A - Root Menu */}
                    <div
                      ref={rootPanelRef}
                      className="menu-panel-root w-1/2 flex-shrink-0 p-1"
                    >
                      {header}
                      <div className="flex flex-col gap-1">
                        {items.map((item) => (
                          <MenuItemComponent
                            key={item.id}
                            item={item}
                            onSubmenuClick={navigateToSubmenu}
                            onSelect={() => handleSelect(item)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Panel B - Submenu */}
                    <div
                      ref={submenuPanelRef}
                      className="menu-panel-submenu w-1/2 flex-shrink-0 p-1"
                    >
                      {submenu && (
                        <>
                          <MenuBackButton
                            title={submenu.title}
                            onBack={navigateBack}
                          />
                          <div className="flex flex-col gap-1">
                            {submenu.items.map((item) => (
                              <MenuItemComponent
                                key={item.id}
                                item={item}
                                onSubmenuClick={navigateToSubmenu}
                                onSelect={() => handleSelect(item)}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </BaseMenu.Root>
    </>
  )
}

Menu.displayName = 'Menu'
