/**
 * FilterMenuMotion - Main Component
 *
 * A filter menu component with Motion Dev animations.
 * Built on Base UI Menu primitives with integrated motion/react.
 *
 * Architecture:
 * - Uses Base UI Menu for accessibility and keyboard navigation
 * - Uses Motion Dev for animations (render prop pattern)
 * - Sliding panel approach for submenu navigation
 * - State-based animation for mounted components
 *
 * Key patterns from documentation:
 * - AnimatePresence with keepMounted for exit animations
 * - initial={false} to prevent animation on first render
 * - render prop to compose motion.div with Base UI components
 *
 * @module prod/base/filter/filter-menu-motion
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useMemo, useEffect, cloneElement, isValidElement } from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

// Internal imports
import type { FilterMenuMotionProps, PanelState, MotionAnimationConfig } from './types'
import {
  DEFAULT_MOTION_ANIMATION,
  DEFAULT_WIDTH,
  DEFAULT_SIDE_OFFSET,
  getMotionTransition,
  createPopupVariants,
} from './animation-config'
import { DEFAULT_FILTER_ITEMS } from './default-items'
import { transformItemsWithFilterState } from './utils'
import {
  AnimatedMenuItem,
  SlidingPanelContainer,
  FilterMenuHeader,
  BackButton,
  FilterTrigger,
  AnimatedPanel,
} from './components'

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook to manage submenu navigation state.
 */
function useSubmenuNavigation(
  wrappedItems: ReturnType<typeof transformItemsWithFilterState>,
  animationConfig: MotionAnimationConfig,
  isOpen: boolean
) {
  const [submenu, setSubmenu] = useState<PanelState | null>(null)
  const [inSubmenu, setInSubmenu] = useState(false)

  // Navigate to a submenu
  const navigateToSubmenu = useCallback(
    (menuId: string) => {
      const submenuItem = wrappedItems.find(
        (item) => item.id === menuId && item.type === 'submenu'
      )
      if (submenuItem && submenuItem.type === 'submenu') {
        // Set submenu content first
        setSubmenu({
          id: menuId,
          title: submenuItem.label,
          items: submenuItem.items,
        })
        // Delay slide to allow React to render content
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setInSubmenu(true)
          })
        })
      }
    },
    [wrappedItems]
  )

  // Navigate back to root
  const navigateBack = useCallback(() => {
    setInSubmenu(false)
    // Keep submenu content for exit animation, clear after
    setTimeout(() => {
      setSubmenu(null)
    }, animationConfig.slideDuration)
  }, [animationConfig.slideDuration])

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setSubmenu(null)
        setInSubmenu(false)
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  return {
    submenu,
    inSubmenu,
    navigateToSubmenu,
    navigateBack,
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * FilterMenuMotion - Filter menu with Motion Dev animations.
 *
 * Uses state-based animation pattern for mounted components:
 * - Both panels stay mounted in the DOM
 * - Animation driven by inSubmenu state
 * - initial={false} prevents animation on first render
 */
export function FilterMenuMotion({
  items = DEFAULT_FILTER_ITEMS,
  onFilterSelect,
  activeFilterIds = [],
  trigger,
  width = DEFAULT_WIDTH,
  side = 'bottom',
  align = 'start',
  sideOffset = DEFAULT_SIDE_OFFSET,
  onOpenChange: externalOnOpenChange,
  animation,
  className,
}: FilterMenuMotionProps) {
  // Merge animation config with defaults
  const animationConfig = useMemo(
    () => ({ ...DEFAULT_MOTION_ANIMATION, ...animation }),
    [animation]
  )

  // Respect reduced motion preference
  const shouldReduceMotion = useReducedMotion()

  // Open state
  const [isOpen, setIsOpen] = useState(false)

  // Create set for O(1) lookup
  const activeIdsSet = useMemo(
    () => new Set(activeFilterIds),
    [activeFilterIds]
  )

  // Transform items to inject selected state
  const wrappedItems = useMemo(
    () => transformItemsWithFilterState(items, activeIdsSet, onFilterSelect),
    [items, activeIdsSet, onFilterSelect]
  )

  // Submenu navigation
  const { submenu, inSubmenu, navigateToSubmenu, navigateBack } =
    useSubmenuNavigation(wrappedItems, animationConfig, isOpen)

  // Handlers
  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      externalOnOpenChange?.(open)
    },
    [externalOnOpenChange]
  )

  const handleSelect = useCallback(() => {
    handleOpenChange(false)
  }, [handleOpenChange])

  // Trigger
  const resolvedTrigger = trigger ?? <FilterTrigger isOpen={isOpen} />

  // Popup variants
  const popupVariants = shouldReduceMotion
    ? undefined
    : createPopupVariants(animationConfig, side === 'bottom' ? 'bottom' : 'top')

  // -------------------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------------------

  return (
    <BaseMenu.Root open={isOpen} onOpenChange={handleOpenChange} modal={false}>
      <BaseMenu.Trigger render={<span className="outline-none focus:outline-none" />}>
        {isValidElement(resolvedTrigger)
          ? cloneElement(resolvedTrigger as React.ReactElement<{ isActive?: boolean }>, {
              isActive: isOpen,
            })
          : resolvedTrigger}
      </BaseMenu.Trigger>

      <AnimatePresence>
        {isOpen && (
          <BaseMenu.Portal keepMounted>
            <BaseMenu.Positioner
              side={side}
              align={align}
              sideOffset={sideOffset}
              collisionPadding={8}
              style={{ zIndex: 9999 }}
            >
              <BaseMenu.Popup
                render={
                  <motion.div
                    variants={popupVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={getMotionTransition(animationConfig, animationConfig.revealDuration)}
                    style={{ transformOrigin: 'var(--transform-origin)' }}
                  />
                }
                className={cn(
                  'rounded-2xl corner-squircle',
                  'bg-primary shine-2-subtle-shadow-lg',
                  'motion-reduce:animate-none motion-reduce:transition-none',
                  className
                )}
                style={{ width }}
              >
                <SlidingPanelContainer
                  inSubmenu={inSubmenu}
                  isOpen={isOpen}
                  animationConfig={animationConfig}
                  submenuKey={submenu?.id ?? null}
                  rootPanel={
                    <RootPanel
                      items={wrappedItems}
                      isVisible={!inSubmenu}
                      animationConfig={animationConfig}
                      shouldReduceMotion={shouldReduceMotion}
                      onSubmenuClick={navigateToSubmenu}
                      onSelect={handleSelect}
                    />
                  }
                  submenuPanel={
                    <SubmenuPanel
                      submenu={submenu}
                      isVisible={inSubmenu}
                      animationConfig={animationConfig}
                      shouldReduceMotion={shouldReduceMotion}
                      onBack={navigateBack}
                      onSubmenuClick={navigateToSubmenu}
                      onSelect={handleSelect}
                    />
                  }
                />
              </BaseMenu.Popup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        )}
      </AnimatePresence>
    </BaseMenu.Root>
  )
}

FilterMenuMotion.displayName = 'FilterMenuMotion'

// ============================================================================
// PANEL COMPONENTS
// ============================================================================

interface RootPanelProps {
  items: ReturnType<typeof transformItemsWithFilterState>
  isVisible: boolean
  animationConfig: MotionAnimationConfig
  shouldReduceMotion: boolean | null
  onSubmenuClick: (id: string) => void
  onSelect: () => void
}

function RootPanel({
  items,
  isVisible,
  animationConfig,
  shouldReduceMotion,
  onSubmenuClick,
  onSelect,
}: RootPanelProps) {
  return (
    <AnimatedPanel
      isActive={isVisible}
      animationConfig={animationConfig}
      isSubmenu={false}
    >
      <FilterMenuHeader />
      <div className="flex flex-col gap-1">
        {items.map((item, index) => (
          <AnimatedMenuItem
            key={item.id}
            item={item}
            index={index}
            animationConfig={animationConfig}
            shouldReduceMotion={shouldReduceMotion}
            isVisible={isVisible}
            onSubmenuClick={onSubmenuClick}
            onSelect={onSelect}
          />
        ))}
      </div>
    </AnimatedPanel>
  )
}

interface SubmenuPanelProps {
  submenu: PanelState | null
  isVisible: boolean
  animationConfig: MotionAnimationConfig
  shouldReduceMotion: boolean | null
  onBack: () => void
  onSubmenuClick: (id: string) => void
  onSelect: () => void
}

function SubmenuPanel({
  submenu,
  isVisible,
  animationConfig,
  shouldReduceMotion,
  onBack,
  onSubmenuClick,
  onSelect,
}: SubmenuPanelProps) {
  return (
    <AnimatedPanel
      isActive={isVisible}
      animationConfig={animationConfig}
      isSubmenu
    >
      {submenu && (
        <>
          <BackButton
            title={submenu.title}
            onBack={onBack}
            isVisible={isVisible}
            animationConfig={animationConfig}
            shouldReduceMotion={shouldReduceMotion}
          />
          <div className="flex flex-col gap-1">
            {submenu.items.map((item, index) => (
              <AnimatedMenuItem
                key={item.id}
                item={item}
                index={index}
                animationConfig={animationConfig}
                shouldReduceMotion={shouldReduceMotion}
                isVisible={isVisible}
                isInSubmenu
                onSubmenuClick={onSubmenuClick}
                onSelect={onSelect}
              />
            ))}
          </div>
        </>
      )}
    </AnimatedPanel>
  )
}
