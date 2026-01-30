/**
 * ButtonAnimation V2 - Enhanced Stack Level Component
 *
 * Improved stack level with better child-to-parent animations.
 * Fixes the issue where children don't animate correctly when becoming parents.
 *
 * @module prod/base/button-animation-v2/components
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import {
  useStackContext,
  useLevelContext,
  LevelContext,
} from '../context'
import { getTransition, getChildTransition, getEntryOffset, getChildDelay } from '../animation'
import { ROOT_ANCHOR_ID } from '../config'
import { EnhancedStackItem } from './stack-item-enhanced'
import type { StackItem } from '../types'

// ============================================================================
// TYPES
// ============================================================================

export interface EnhancedStackLevelProps {
  items: StackItem[]
  parentLevelIndices?: number[]
}

// ============================================================================
// Z-INDEX
// ============================================================================

function getAnchoredZIndex(depth: number): number {
  return 10 + depth * 10
}

const ACTIVE_Z_INDEX = 100

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function EnhancedStackLevel({
  items,
  parentLevelIndices = [],
}: EnhancedStackLevelProps) {
  const { activePath, animationConfig, styleConfig } = useStackContext()
  const { level } = useLevelContext()
  const shouldReduceMotion = useReducedMotion() ?? false
  
  // Track which item is transitioning from child to parent
  const [promotingItemId, setPromotingItemId] = useState<string | null>(null)
  const previousActiveIdRef = useRef<string | undefined>(undefined)

  // Separate "All" from regular items at root
  const anchorItem = level === 0 ? items.find((i) => i.id === ROOT_ANCHOR_ID) : null
  const regularItems = level === 0 ? items.filter((i) => i.id !== ROOT_ANCHOR_ID) : items

  // State at this level
  const activeId = activePath[level]
  const activeItem = items.find((i) => i.id === activeId)
  const hasActiveAtThisLevel = activeId !== undefined
  const hasActiveChild = activePath.length > level + 1

  // Detect when a child is becoming a parent
  useEffect(() => {
    if (previousActiveIdRef.current !== activeId && activeId) {
      // This item just became active
      setPromotingItemId(activeId)
      setTimeout(() => setPromotingItemId(null), 400)
    }
    previousActiveIdRef.current = activeId
  }, [activeId])

  const transition = getTransition(animationConfig)
  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getEntryOffset(animationConfig.entryDirection, animationConfig.entryDistance)

  const getAnchoredOffset = (itemDepth: number) => {
    if (styleConfig.offsetTarget === 'incoming') {
      return styleConfig.peekOffset * itemDepth
    }
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
            <EnhancedStackItem
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
          const isPromoting = item.id === promotingItemId

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
              <EnhancedStackItem
                item={item}
                index={itemIndex}
                levelIndices={itemLevelIndices}
                isAnchored={isAnchored}
                isPromoting={isPromoting}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* CHILDREN of active item */}
      {activeItem?.children && activeItem.children.length > 0 && (
        <EnhancedChildrenLevel
          key={`children-${activeItem.id}`}
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

function EnhancedChildrenLevel({
  items,
  parentId,
  parentLevelIndices,
}: ChildrenLevelProps) {
  const { level } = useLevelContext()
  const { activePath, animationConfig, styleConfig } = useStackContext()
  const shouldReduceMotion = useReducedMotion() ?? false
  
  // Track promoting item
  const [promotingItemId, setPromotingItemId] = useState<string | null>(null)
  const previousActiveIdRef = useRef<string | undefined>(undefined)

  // Generate unique mount ID
  const [mountId] = useState(() => Math.random().toString(36).slice(2))

  const nextLevel = level + 1
  const activeId = activePath[nextLevel]
  const activeItem = items.find((i) => i.id === activeId)
  const hasActiveAtThisLevel = activeId !== undefined
  const hasActiveChild = activePath.length > nextLevel + 1

  // Detect promotion
  useEffect(() => {
    if (previousActiveIdRef.current !== activeId && activeId) {
      setPromotingItemId(activeId)
      setTimeout(() => setPromotingItemId(null), 400)
    }
    previousActiveIdRef.current = activeId
  }, [activeId])

  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getEntryOffset(animationConfig.entryDirection, animationConfig.entryDistance)

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
          const isTerminal = isActive && !hasActiveChild
          const isPromoting = item.id === promotingItemId

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

          const activeOffset =
            !isAnchored && styleConfig.offsetTarget === 'incoming'
              ? styleConfig.peekOffset * itemDepth
              : undefined

          const skipAnimation = shouldReduceMotion
          const isLastVisibleChild = index === items.length - 1 || (hasActiveAtThisLevel && isActive)
          const childGapMargin = isLastVisibleChild ? 0 : styleConfig.childGap
          const layoutMode = isAnchored ? false : 'position'

          // Special animation for terminal items (just clicked)
          const terminalTransition = {
            duration: animationConfig.terminalDuration,
            ease: [0.25, 0.1, 0.25, 1] as const,
          }

          return (
            <motion.div
              key={`${mountId}-${item.id}-${isTerminal ? 'active' : 'idle'}`}
              layout={layoutMode}
              className={isAnchored ? 'absolute top-0 inline-flex' : 'inline-flex'}
              style={{
                left: isAnchored ? getAnchoredOffset(itemDepth) : undefined,
                marginLeft: activeOffset,
                marginRight: !isAnchored ? childGapMargin : undefined,
                zIndex: isAnchored ? getAnchoredZIndex(itemDepth) : ACTIVE_Z_INDEX,
              }}
              initial={
                skipAnimation
                  ? false
                  : isTerminal
                  ? { scale: 1, opacity: 1 }
                  : { opacity: 0, ...entryOffset }
              }
              animate={
                skipAnimation
                  ? undefined
                  : isTerminal
                  ? {
                      scale: [1, animationConfig.terminalScale, 1],
                      opacity: 1,
                      transition: terminalTransition,
                    }
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
              <EnhancedStackItem
                item={item}
                index={index}
                levelIndices={itemLevelIndices}
                isAnchored={isAnchored}
                isPromoting={isPromoting}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Recursive children */}
      {activeItem?.children && activeItem.children.length > 0 && (
        <EnhancedChildrenLevel
          key={`children-${activeItem.id}`}
          items={activeItem.children}
          parentId={activeItem.id}
          parentLevelIndices={[...parentLevelIndices, items.findIndex((i) => i.id === activeId)]}
        />
      )}
    </LevelContext.Provider>
  )
}