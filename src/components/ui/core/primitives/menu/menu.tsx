/**
 * Menu - Spring Animation Component
 *
 * Uses motion/react for physics-based spring animations on height and slide.
 * Built on Base UI primitives with configurable appearance and behavior.
 *
 * @module prod/base/menu
 */

'use client'

import React, { useState, useCallback, useMemo, useEffect, cloneElement, isValidElement } from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { motion, AnimatePresence } from 'motion/react'

import { cn } from '@/lib/utils'

import type {
  MenuProps,
  MenuItem,
  MenuSide,
  MenuAlign,
  TriggerState,
} from './types'
import {
  DEFAULT_APPEARANCE,
  DEFAULT_MENU_WIDTH,
  DEFAULT_SIDE_OFFSET,
  DEFAULT_UNIFIED_HOVER,
  Z_INDEX,
  getPopupClasses,
  getGradientStyles,
  getItemRadius,
} from './config'
import { useMenuAnimation } from './hooks'
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
  // Open State
  // ============================================================================

  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  // ============================================================================
  // Animation Hook
  // ============================================================================

  const {
    // Motion values
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
    mergedFeatures,
  } = useMenuAnimation({
    isOpen,
    items,
    side,
    sideOffset,
    animation,
    features,
  })

  // ============================================================================
  // Configuration
  // ============================================================================

  const mergedAppearance = useMemo(
    () => ({ ...DEFAULT_APPEARANCE, ...appearance }),
    [appearance]
  )

  const mergedUnifiedHover = useMemo(
    () => ({
      ...DEFAULT_UNIFIED_HOVER,
      ...unifiedHover,
      enabled: unifiedHover?.enabled ?? mergedFeatures.unifiedHover ?? false,
    }),
    [unifiedHover, mergedFeatures.unifiedHover]
  )

  // Close menu on scroll to prevent animation issues with sticky positioning
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      if (!isControlled) {
        setInternalOpen(false)
      }
      externalOnOpenChange?.(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true })
    return () => window.removeEventListener('scroll', handleScroll, { capture: true })
  }, [isOpen, isControlled, externalOnOpenChange])

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

  const handleSelect = useCallback((item?: MenuItem) => {
    if (item && item.type !== 'separator' && item.type !== 'label' && item.type !== 'submenu' && item.type !== 'checkbox') {
      externalOnSelect?.(item)
    }
    handleOpenChange(false)
  }, [handleOpenChange, externalOnSelect])

  // ============================================================================
  // Trigger Rendering
  // ============================================================================

  const triggerState: TriggerState = useMemo(() => ({
    isOpen,
    toggle,
  }), [isOpen, toggle])

  const renderedTrigger = useMemo(() => {
    if (typeof trigger === 'function') {
      return trigger(triggerState)
    }
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
                {/* Animation Container */}
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
                          panelId="root"
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

                      {/* Panel B - Submenu */}
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
                                panelId="submenu"
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
