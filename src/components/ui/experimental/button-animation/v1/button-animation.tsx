/**
 * ButtonAnimation Component
 *
 * S-tier AnimatePresence popLayout demo with proper sequencing:
 * 1. Click parent → siblings exit with popLayout
 * 2. "All" button stays anchored, fades behind expanded parent
 * 3. Parent settles into position
 * 4. Children cascade in with configurable stagger/direction
 *
 * Performance optimizations:
 * - layout="position" (faster than full layout)
 * - GPU-accelerated properties only (opacity, x, y)
 * - No scale animations (expensive repaints)
 * - High damping springs (fast settling)
 *
 * Accessibility:
 * - Respects prefers-reduced-motion via useReducedMotion
 * - Keyboard navigation on remove buttons
 * - ARIA labels on interactive elements
 *
 * @module prod/base/button-animation
 */

'use client'

import * as React from 'react'
import { useMemo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

import type {
  ButtonAnimationProps,
  ParentAnimationConfig,
  ChildAnimationConfig,
  StyleConfig,
} from './types'

import {
  DEFAULT_PARENT_CONFIG,
  DEFAULT_CHILD_CONFIG,
  DEFAULT_STYLE_CONFIG,
  DEFAULT_NAV_ITEMS,
  GAP_CLASSES,
  ALL_BUTTON_ID,
  CHILD_LETTERS,
} from './config'

import { ButtonAnimationContext } from './context'
import { useAnimationState } from './hooks'
import { Chip } from './components'
import { getTransition, getEntryOffset, getChildDelay } from './animation'

// ============================================================================
// INTERNAL COMPONENTS
// ============================================================================

/**
 * Inline reset button shown when state is modified.
 */
interface ResetButtonProps {
  onReset: () => void
}

function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <motion.button
      key="reset"
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onReset}
      className={cn(
        'inline-flex h-10 items-center rounded-xl px-3',
        'bg-tertiary text-tertiary text-sm font-medium',
        'hover:bg-quaternary transition-colors',
        'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
        'motion-reduce:transition-none'
      )}
    >
      ↺ Reset
    </motion.button>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ButtonAnimation - Expandable navigation with cascading animations.
 *
 * Features:
 * - Parent chips expand to reveal child options
 * - "All" button anchors in place with fade effect
 * - Staggered child entry with configurable direction
 * - Child selection state (toggleable)
 * - Full reduced motion support
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ButtonAnimation />
 *
 * // With custom items
 * <ButtonAnimation
 *   items={[
 *     { id: 'all', label: 'All' },
 *     { id: 'cat-1', label: 'Category', children: [
 *       { id: 'item-1', label: 'Item One' },
 *       { id: 'item-2', label: 'Item Two' },
 *     ]},
 *   ]}
 * />
 *
 * // With custom animation config
 * <ButtonAnimation
 *   parentConfig={{ stiffness: 600, damping: 30 }}
 *   childConfig={{ stagger: 0.05, entryDirection: 'right' }}
 *   styleConfig={{ parentVariant: 'secondary' }}
 * />
 * ```
 */
export function ButtonAnimation({
  items = DEFAULT_NAV_ITEMS,
  parentConfig: parentConfigProp,
  childConfig: childConfigProp,
  styleConfig: styleConfigProp,
  showNumbers = false,
  showInlineReset = false,
  onReset,
  className,
}: ButtonAnimationProps) {
  // ---------------------------------------------------------------------------
  // CONFIGURATION MERGING
  // ---------------------------------------------------------------------------

  const parentConfig: ParentAnimationConfig = useMemo(
    () => ({ ...DEFAULT_PARENT_CONFIG, ...parentConfigProp }),
    [parentConfigProp]
  )

  const childConfig: ChildAnimationConfig = useMemo(
    () => ({ ...DEFAULT_CHILD_CONFIG, ...childConfigProp }),
    [childConfigProp]
  )

  const styleConfig: StyleConfig = useMemo(
    () => ({ ...DEFAULT_STYLE_CONFIG, ...styleConfigProp }),
    [styleConfigProp]
  )

  // ---------------------------------------------------------------------------
  // ACCESSIBILITY
  // ---------------------------------------------------------------------------

  const shouldReduceMotion = useReducedMotion() ?? false

  // ---------------------------------------------------------------------------
  // STATE MANAGEMENT
  // ---------------------------------------------------------------------------

  const {
    expandedId,
    selectedChildId,
    phase,
    handleSelectParent,
    handleCollapse,
    handleSelectChild,
    handleReset,
    isModified,
  } = useAnimationState({
    items,
    parentConfig,
    onReset,
  })

  // ---------------------------------------------------------------------------
  // DERIVED DATA
  // ---------------------------------------------------------------------------

  // Get expanded item's children
  const expandedItem = items.find((item) => item.id === expandedId)
  const children = expandedItem?.children ?? []

  // Separate "All" button from other parents
  const allButton = items.find((item) => item.id === ALL_BUTTON_ID)
  const regularParents = items.filter((item) => item.id !== ALL_BUTTON_ID)

  // ---------------------------------------------------------------------------
  // HELPERS
  // ---------------------------------------------------------------------------

  /**
   * Get parent index for numbering (All=0, others 1-based).
   */
  const getParentIndex = (id: string): number => {
    if (id === ALL_BUTTON_ID) return 0
    return items.findIndex((item) => item.id === id)
  }

  // Animation values (respect reduced motion)
  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getEntryOffset(childConfig.entryDirection, childConfig.entryDistance)

  // ---------------------------------------------------------------------------
  // CONTEXT VALUE
  // ---------------------------------------------------------------------------

  const contextValue = useMemo(
    () => ({
      expandedId,
      selectedChildId,
      phase,
      styleConfig,
      parentConfig,
      childConfig,
      shouldReduceMotion,
      onSelectParent: handleSelectParent,
      onCollapse: handleCollapse,
      onSelectChild: handleSelectChild,
      onReset: handleReset,
      getParentIndex,
    }),
    [
      expandedId,
      selectedChildId,
      phase,
      styleConfig,
      parentConfig,
      childConfig,
      shouldReduceMotion,
      handleSelectParent,
      handleCollapse,
      handleSelectChild,
      handleReset,
    ]
  )

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <ButtonAnimationContext.Provider value={contextValue}>
      <div
        className={cn(
          'relative flex flex-wrap items-start justify-start',
          GAP_CLASSES[styleConfig.gap],
          className
        )}
      >
        {/* Reset button - shown when state is modified and inline reset is enabled */}
        <AnimatePresence mode="popLayout">
          {showInlineReset && isModified && (
            <ResetButton onReset={handleReset} />
          )}
        </AnimatePresence>

        {/* "All" button - stays anchored in place when another parent is expanded */}
        {allButton && (
          <motion.div
            key={ALL_BUTTON_ID}
            className={cn(
              'inline-flex',
              // When expanded, become absolute and sit behind the expanded button
              expandedId &&
                expandedId !== ALL_BUTTON_ID &&
                'absolute top-0 z-0'
            )}
            style={{
              // Offset so "All" peeks out from behind overlapping buttons
              marginLeft:
                expandedId && expandedId !== ALL_BUTTON_ID
                  ? 0
                  : styleConfig.allButtonOffset,
              left:
                expandedId && expandedId !== ALL_BUTTON_ID
                  ? styleConfig.allButtonOffset
                  : undefined,
            }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{
              opacity: expandedId && expandedId !== ALL_BUTTON_ID ? 0.6 : 1,
            }}
            transition={getTransition(parentConfig)}
          >
            <Chip
              label={allButton.label}
              number={showNumbers ? '0' : undefined}
              variant={styleConfig.allButtonVariant}
              size={styleConfig.size}
              roundness={styleConfig.roundness}
              asLink={styleConfig.asLink}
              href={allButton.href || `#${allButton.id}`}
              showRemove={false}
              onSelect={() => handleSelectParent(allButton.id)}
            />
          </motion.div>
        )}

        {/* Regular parent chips */}
        <AnimatePresence mode="popLayout">
          {regularParents.map((item) => {
            const isExpanded = item.id === expandedId
            // Hide non-expanded parents when something is expanded
            if (expandedId && !isExpanded) return null

            const parentNum = getParentIndex(item.id)

            return (
              <motion.div
                key={item.id}
                layout="position"
                className={cn('inline-flex', isExpanded && 'z-10')}
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: parentConfig.exitDuration },
                }}
                transition={getTransition(parentConfig)}
              >
                <Chip
                  label={item.label}
                  number={showNumbers ? `${parentNum}` : undefined}
                  variant={
                    isExpanded
                      ? styleConfig.parentExpandedVariant
                      : styleConfig.parentVariant
                  }
                  size={styleConfig.size}
                  roundness={styleConfig.roundness}
                  asLink={styleConfig.asLink}
                  href={item.href || `#${item.id}`}
                  showRemove={isExpanded}
                  onSelect={() => handleSelectParent(item.id)}
                  onRemove={handleCollapse}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Children chips */}
        <AnimatePresence mode="popLayout">
          {phase === 'entering-children' &&
            children.map((child, i) => {
              const delay = getChildDelay(
                i,
                children.length,
                childConfig.delay,
                childConfig.stagger,
                childConfig.entryOrder,
                childConfig.staggerDirection
              )
              const parentNum = expandedId ? getParentIndex(expandedId) : 0
              const childLetter = CHILD_LETTERS[i] || i.toString()

              return (
                <motion.div
                  key={child.id}
                  layout="position"
                  className="inline-flex"
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, ...entryOffset }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: getTransition(childConfig, delay),
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: childConfig.exitDuration },
                  }}
                >
                  <Chip
                    label={child.label}
                    number={showNumbers ? `${parentNum}${childLetter}` : undefined}
                    variant={
                      selectedChildId === child.id
                        ? styleConfig.childSelectedVariant
                        : styleConfig.childVariant
                    }
                    size={styleConfig.size}
                    roundness={styleConfig.roundness}
                    asLink={styleConfig.asLink}
                    href={child.href || `#${child.id}`}
                    showRemove={false}
                    onSelect={() => handleSelectChild(child.id)}
                  />
                </motion.div>
              )
            })}
        </AnimatePresence>
      </div>
    </ButtonAnimationContext.Provider>
  )
}
