/**
 * ButtonAnimation V2 - Stack Level Component
 *
 * Positioning strategy:
 * - ANCHORED items (have children expanded below): absolute, peek left
 * - ACTIVE items at current level: normal flow (flex)
 * - When nothing selected: all items in normal flow
 *
 * @module prod/base/button-animation-v2/components
 */

'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import {
  useStackContext,
  useLevelContext,
  LevelContext,
} from '../context'
import { getTransition, getChildTransition, getEntryOffset, getChildDelay } from '../animation'
import { ROOT_ANCHOR_ID } from '../config'
import { StackItemComponent } from './stack-item'
import type { StackItem } from '../types'

// ============================================================================
// TYPES
// ============================================================================

export interface StackLevelProps {
  items: StackItem[]
  parentLevelIndices?: number[]
}

// ============================================================================
// Z-INDEX
// ============================================================================

/**
 * Z-index strategy:
 * - Anchored items: 10, 20, 30... (deeper = higher, but all below active)
 * - Active items: 100 (always on top)
 */
function getAnchoredZIndex(depth: number): number {
  return 10 + depth * 10
}

const ACTIVE_Z_INDEX = 100

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function StackLevel({
  items,
  parentLevelIndices = [],
}: StackLevelProps) {
  const { activePath, animationConfig, styleConfig } = useStackContext()
  const { level } = useLevelContext()
  const shouldReduceMotion = useReducedMotion() ?? false

  // Separate "All" from regular items at root
  const anchorItem = level === 0 ? items.find((i) => i.id === ROOT_ANCHOR_ID) : null
  const regularItems = level === 0 ? items.filter((i) => i.id !== ROOT_ANCHOR_ID) : items

  // State at this level
  const activeId = activePath[level]
  const activeItem = items.find((i) => i.id === activeId)
  const hasActiveAtThisLevel = activeId !== undefined
  const hasActiveChild = activePath.length > level + 1

  const transition = getTransition(animationConfig)
  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getEntryOffset(animationConfig.entryDirection, animationConfig.entryDistance)

  /**
   * Calculate the left offset for anchored items.
   *
   * Two modes:
   * - 'anchored': Incumbent shifts LEFT by (peekOffset * levelsFromActive)
   *   peekOffset is negative, so deeper levels are closer to 0
   *   e.g., peekOffset=-8, 3 levels deep: All=-24, Design=-16, Figma=-8, Active=0
   *
   * - 'incoming': Anchored items layer to the RIGHT by depth
   *   peekOffset is positive, so deeper levels are further right
   *   e.g., peekOffset=+8, 3 levels deep: All=0, Design=+8, Figma=+16, Active in flow
   */
  const getAnchoredOffset = (itemDepth: number) => {
    if (styleConfig.offsetTarget === 'incoming') {
      // Layer anchored items by depth (deeper = further right)
      return styleConfig.peekOffset * itemDepth
    }
    // Original behavior: offset by levels from active (shallower = further left)
    const levelsFromActive = activePath.length - itemDepth
    return styleConfig.peekOffset * levelsFromActive
  }

  return (
    <>
      {/* "ALL" BUTTON */}
      {anchorItem && (() => {
        const isAnchored = hasActiveAtThisLevel && activeId !== ROOT_ANCHOR_ID

        return (
          <motion.div
            key={anchorItem.id}
            className={isAnchored ? 'absolute top-0 inline-flex' : 'inline-flex'}
            style={{
              left: isAnchored ? getAnchoredOffset(0) : undefined,
              zIndex: isAnchored ? getAnchoredZIndex(0) : ACTIVE_Z_INDEX,
            }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition}
          >
            <StackItemComponent
              item={anchorItem}
              index={0}
              levelIndices={[0]}
              isAnchored={isAnchored}
            />
          </motion.div>
        )
      })()}

      {/* REGULAR ITEMS at this level */}
      <AnimatePresence mode="popLayout">
        {regularItems.map((item, index) => {
          const isActive = item.id === activeId
          const itemIndex = anchorItem ? index + 1 : index
          const itemLevelIndices = [...parentLevelIndices, itemIndex]
          const itemDepth = level + 1

          // Hide non-active siblings when something is active
          if (hasActiveAtThisLevel && !isActive) return null

          // Is this item anchored? (active AND has children expanded)
          const isAnchored = isActive && hasActiveChild

          // In 'incoming' mode, active items also need offset based on depth
          const activeOffset =
            !isAnchored && styleConfig.offsetTarget === 'incoming'
              ? styleConfig.peekOffset * itemDepth
              : undefined

          return (
            <motion.div
              key={item.id}
              layout={isAnchored ? false : 'position'}
              className={isAnchored ? 'absolute top-0 inline-flex' : 'inline-flex'}
              style={{
                left: isAnchored ? getAnchoredOffset(itemDepth) : undefined,
                marginLeft: activeOffset,
                zIndex: isAnchored ? getAnchoredZIndex(itemDepth) : ACTIVE_Z_INDEX,
              }}
              initial={shouldReduceMotion ? false : { opacity: 0, ...entryOffset }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{
                opacity: 0,
                transition: { duration: animationConfig.exitDuration },
              }}
              transition={transition}
            >
              <StackItemComponent
                item={item}
                index={itemIndex}
                levelIndices={itemLevelIndices}
                isAnchored={isAnchored}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* CHILDREN of active item */}
      {activeItem?.children && activeItem.children.length > 0 && (
        <ChildrenLevel
          items={activeItem.children}
          parentId={activeItem.id}
          parentLevelIndices={[
            ...parentLevelIndices,
            anchorItem
              ? regularItems.findIndex((i) => i.id === activeId) + 1
              : regularItems.findIndex((i) => i.id === activeId),
          ]}
        />
      )}
    </>
  )
}

// ============================================================================
// CHILDREN LEVEL
// ============================================================================

interface ChildrenLevelProps {
  items: StackItem[]
  parentId: string
  parentLevelIndices: number[]
}

function ChildrenLevel({
  items,
  parentId,
  parentLevelIndices,
}: ChildrenLevelProps) {
  const { level } = useLevelContext()
  const { activePath, animationConfig, styleConfig } = useStackContext()
  const shouldReduceMotion = useReducedMotion() ?? false

  const nextLevel = level + 1
  const activeId = activePath[nextLevel]
  const activeItem = items.find((i) => i.id === activeId)
  const hasActiveAtThisLevel = activeId !== undefined
  const hasActiveChild = activePath.length > nextLevel + 1

  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getEntryOffset(animationConfig.entryDirection, animationConfig.entryDistance)

  /**
   * Calculate the left offset for anchored items.
   * Same logic as StackLevel - see comments there.
   */
  const getAnchoredOffset = (itemDepth: number) => {
    if (styleConfig.offsetTarget === 'incoming') {
      return styleConfig.peekOffset * itemDepth
    }
    const levelsFromActive = activePath.length - itemDepth
    return styleConfig.peekOffset * levelsFromActive
  }

  return (
    <LevelContext.Provider
      value={{ level: nextLevel, parentId, isParentAnchored: true }}
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const isActive = item.id === activeId
          const itemLevelIndices = [...parentLevelIndices, index]
          const itemDepth = nextLevel + 1

          // Hide non-active siblings
          if (hasActiveAtThisLevel && !isActive) return null

          const isAnchored = isActive && hasActiveChild
          // Terminal item = the deepest active item (just clicked, no children expanded)
          // It shouldn't animate - just instantly show as active
          const isTerminal = isActive && !hasActiveChild

          const delay = hasActiveAtThisLevel
            ? 0
            : getChildDelay(
                index,
                items.length,
                0,
                animationConfig.stagger,
                animationConfig.entryOrder,
                animationConfig.staggerDirection
              )

          // In 'incoming' mode, active items also need offset based on depth
          const activeOffset =
            !isAnchored && styleConfig.offsetTarget === 'incoming'
              ? styleConfig.peekOffset * itemDepth
              : undefined

          // Terminal items skip all animation - they just stay in place
          const skipAnimation = isTerminal || shouldReduceMotion

          // Child gap - apply margin between visible children
          const isLastVisibleChild = index === items.length - 1 || (hasActiveAtThisLevel && isActive)
          const childGapMargin = isLastVisibleChild ? 0 : styleConfig.childGap

          // Disable layout animation for terminal and anchored items
          const layoutMode = isAnchored || isTerminal ? false : 'position'

          return (
            <motion.div
              key={item.id}
              layout={layoutMode}
              className={isAnchored ? 'absolute top-0 inline-flex' : 'inline-flex'}
              style={{
                left: isAnchored ? getAnchoredOffset(itemDepth) : undefined,
                marginLeft: activeOffset,
                marginRight: !isAnchored ? childGapMargin : undefined,
                zIndex: isAnchored ? getAnchoredZIndex(itemDepth) : ACTIVE_Z_INDEX,
              }}
              initial={skipAnimation ? false : { opacity: 0, ...entryOffset }}
              animate={
                skipAnimation
                  ? undefined // No animate prop = no animation
                  : {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: getChildTransition(animationConfig, delay),
                    }
              }
              exit={{
                opacity: 0,
                transition: { duration: animationConfig.exitDuration },
              }}
            >
              <StackItemComponent
                item={item}
                index={index}
                levelIndices={itemLevelIndices}
                isAnchored={isAnchored}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Recursive children */}
      {activeItem?.children && activeItem.children.length > 0 && (
        <ChildrenLevel
          items={activeItem.children}
          parentId={activeItem.id}
          parentLevelIndices={[...parentLevelIndices, items.findIndex((i) => i.id === activeId)]}
        />
      )}
    </LevelContext.Provider>
  )
}
