/**
 * StackingNav - Stack Level Component
 *
 * Renders items at a specific level with proper animations.
 * Uses flex flow for natural positioning with anchored items using absolute positioning.
 *
 * KEY POSITIONING MODEL:
 * - Anchored items: absolute position (peek-behind stack)
 * - Active parent: inline-flex (normal flow)
 * - Children: inline-flex (flow naturally to the right of parent)
 *
 * @module features/stacking-nav/components
 */

'use client'

import { useRef, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { useStackContext, useLevelContext, LevelContext } from '../context'
import { AnimatedItem } from './animated-item'
import { LevelAllItem } from './level-all-item'
import type { StackItem, StackLevelProps } from '../types'
import { getChildEntryOffset, getChildDelay, getExitAnimation, getTransition } from '../utils/animations'
import { ROOT_ANCHOR_ID, getAnchoredZIndex, createLevelAllId } from '../config'

/**
 * Renders items at a specific level of the navigation tree.
 */
export function StackLevel({
  items,
  parentLevelIndices = [],
}: StackLevelProps) {
  const {
    activePath,
    animationConfig,
    styleConfig,
    shouldReduceMotion,
    showDebug,
  } = useStackContext()
  
  const { level, anchorCount } = useLevelContext()
  
  // Track which item was just selected for promotion animation
  const [promotingId, setPromotingId] = useState<string | null>(null)
  const previousActiveIdRef = useRef<string | undefined>(undefined)
  
  // Separate root anchor from regular items at root level
  const anchorItem = level === 0 ? items.find((i) => i.id === ROOT_ANCHOR_ID) : null
  const regularItems = level === 0 ? items.filter((i) => i.id !== ROOT_ANCHOR_ID) : items
  
  // Enhanced debug logging
  useEffect(() => {
    if (showDebug && typeof window !== 'undefined') {
      console.group(`🔍 [StackLevel] Level ${level} Render`)
      console.log('Items:', items.map(i => i.id))
      console.log('Active Path:', activePath)
      console.log('Active ID at this level:', activePath[level])
      console.log('Has active at this level:', activePath[level] !== undefined)
      console.log('Has child in path:', activePath.length > level + 1)
      console.log('Anchor item:', anchorItem?.id || 'none')
      
      // Visual positioning table
      console.log('%c=== POSITIONING STATE ===', 'font-weight: bold; color: #3b82f6')
      const positionData = items.map(item => ({
        item: item.id,
        level,
        isActive: item.id === activePath[level],
        hasChildren: !!(item.children?.length),
        wouldBeAnchored: item.id === activePath[level] && activePath.length > level + 1 && !!(item.children?.length),
        expectedPosition: 'TBD'
      }))
      console.table(positionData)
      
      console.groupEnd()
    }
  }, [level, items, activePath, anchorItem, showDebug])
  
  // State at this level
  const activeId = activePath[level]
  const activeItem = items.find((i) => i.id === activeId)
  const hasActiveAtThisLevel = activeId !== undefined
  const hasActiveChild = activePath.length > level + 1
  
  // Check if the active item at this level is a leaf node (for skipLeafAnimation behavior)
  const activeItemIsLeaf = activeItem && (!activeItem.children || activeItem.children.length === 0)
  
  // Check if the active child in the path (one level deeper) is a leaf node
  // This is used to prevent anchoring the parent when a leaf is selected
  const activeChildIsLeaf = (() => {
    if (!hasActiveChild || !activeItem?.children) return false
    const childActiveId = activePath[level + 1]
    const childItem = activeItem.children.find(c => c.id === childActiveId)
    return childItem && (!childItem.children || childItem.children.length === 0)
  })()
  
  // When skipLeafAnimation is enabled and we're dealing with leaf selections,
  // we want different behavior: don't anchor parents, don't hide siblings
  const skipLeafBehavior = animationConfig.skipLeafAnimation && (activeItemIsLeaf || activeChildIsLeaf)
  
  // Detect promotion - only when a NEW item with children is selected
  useEffect(() => {
    if (activeId !== previousActiveIdRef.current && activeId) {
      const item = items.find(i => i.id === activeId)
      if (level > 0 && item?.children?.length) {
        setPromotingId(activeId)
        setTimeout(() => setPromotingId(null), 400)
      }
    }
    previousActiveIdRef.current = activeId
  }, [activeId, level, items])
  
  // Calculate anchored offset for peek-behind effect
  const getAnchoredOffset = (depth: number) => {
    return styleConfig.peekOffset * depth
  }
  
  // Entry animation
  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getChildEntryOffset(animationConfig)
  
  // Level-all button state
  // Shows as "active" when no child at this level is selected yet
  const showLevelAll = styleConfig.showLevelAll && level > 0
  const levelAllId = createLevelAllId(level)
  // Level-all is active when: we're at this level but no specific child is selected
  // This means the parent at level-1 is expanded and showing children, but user hasn't drilled deeper
  const levelAllIsActive = showLevelAll && !hasActiveAtThisLevel
  
  return (
    <>
      {/* Root Anchor (All button) - only at level 0 */}
      {anchorItem && (() => {
        const isAnchored = hasActiveAtThisLevel && activeId !== ROOT_ANCHOR_ID
        const anchorOffset = getAnchoredOffset(0)

        return (
          <motion.div
            key={anchorItem.id}
            layout="position"
            className={isAnchored ? 'absolute top-0 left-0 inline-flex' : 'inline-flex'}
            style={{
              zIndex: isAnchored ? getAnchoredZIndex(0) : 100,
            }}
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={{
              opacity: 1,
              x: isAnchored ? anchorOffset : 0,
            }}
            transition={getTransition(animationConfig)}
          >
            <AnimatedItem
              item={anchorItem}
              index={0}
              levelIndices={[0]}
              isAnchored={isAnchored}
            />
          </motion.div>
        )
      })()}
      
      {/* Level-All Button - appears at child levels (L1+) with no animation */}
      {showLevelAll && (
        <div className="inline-flex" style={{ zIndex: 100 }}>
          <LevelAllItem
            levelAllId={levelAllId}
            isActive={levelAllIsActive}
          />
        </div>
      )}
      
      {/* Regular Items */}
      <AnimatePresence mode="popLayout">
        {regularItems.map((item, index) => {
          const isActive = item.id === activeId
          const itemIndex = anchorItem ? index + 1 : index
          const itemLevelIndices = [...parentLevelIndices, itemIndex]
          
          // Check if this specific item is a leaf node
          const isLeafNode = !item.children || item.children.length === 0
          
          // Hide non-active siblings when something is active
          // EXCEPTION: When skipLeafAnimation is enabled and the active item is a leaf,
          // we keep siblings visible so the leaf stays in its natural position
          const shouldHideSibling = hasActiveAtThisLevel && !isActive && 
            !(animationConfig.skipLeafAnimation && activeItemIsLeaf)
          if (shouldHideSibling) return null
          
          // Determine if this item should be anchored
          // EXCEPTION: When skipLeafAnimation is enabled and the active child is a leaf,
          // don't anchor this item - the leaf should stay in place
          const isAnchored = isActive && hasActiveChild && item.children && item.children.length > 0 &&
            !(animationConfig.skipLeafAnimation && activeChildIsLeaf)
          
          // Check if promoting
          const isPromoting = item.id === promotingId || false
          
          // Skip animation for leaf nodes if configured
          // When a leaf is selected with skipLeafAnimation, it stays in place with no animation
          const shouldSkipAnimation = animationConfig.skipLeafAnimation && isLeafNode && isActive
          
          // Also skip animation for parent items when their active child is a leaf with skipLeafAnimation
          // This prevents the parent from moving when a leaf child is selected
          const shouldSkipParentAnimation = animationConfig.skipLeafAnimation && activeChildIsLeaf && isActive && !isLeafNode
          
          // Calculate anchored depth
          const anchoredDepth = level === 0 ? 1 : level + 1
          
          // Position strategy
          const shouldUseAbsolute = isAnchored
          
          // Animation delay
          const isInitialEntry = level > 0 && !isActive
          const animationDelay = isInitialEntry ? getChildDelay(index, animationConfig) : 0
          
          // Debug logging
          if (showDebug && typeof window !== 'undefined') {
            console.group(`📍 [Item] ${item.id}`)
            console.log('Level:', level)
            console.log('State:', {
              isActive,
              hasActiveChild,
              isAnchored,
              hasChildren: item.children?.length || 0,
              isPromoting,
            })
            console.log('Position Strategy:', {
              positioning: shouldUseAbsolute ? 'absolute (anchored)' : 'inline-flex (flow)',
              anchoredDepth: isAnchored ? anchoredDepth : 'N/A',
              anchoredOffset: isAnchored ? `${getAnchoredOffset(anchoredDepth)}px` : 'N/A',
            })
            console.groupEnd()
          }
          
          // Calculate anchored offset
          const anchoredOffset = getAnchoredOffset(anchoredDepth)
          
          // Calculate offset for active parent to clear anchored items
          const rootAnchorVisible = level === 0 && hasActiveAtThisLevel && activeId !== ROOT_ANCHOR_ID
          const totalAnchorCount = anchorCount + (rootAnchorVisible ? 1 : 0)
          const activeParentOffset = totalAnchorCount > 0 ? getAnchoredOffset(totalAnchorCount) : 0
          
          // When skipLeafAnimation is enabled and a leaf is selected at this level,
          // ALL items at this level should skip animation to prevent any movement
          const levelHasActiveLeaf = animationConfig.skipLeafAnimation && activeItemIsLeaf
          const skipAllAnimationAtLevel = levelHasActiveLeaf
          
          // Combine all skip conditions
          const skipAnyAnimation = shouldSkipAnimation || skipAllAnimationAtLevel || shouldSkipParentAnimation
          
          // Calculate animate state - leaf nodes stay in place when skipLeafAnimation is enabled
          // IMPORTANT: Always set explicit x/y positions even when skipping animation.
          // Using undefined would cause framer-motion to lose position tracking, breaking
          // subsequent animations when transitioning back to normal state (e.g., on collapse).
          const animateState = skipAnyAnimation
            ? {
                // Item stays exactly where it is with instant transition (duration: 0)
                // but we still track the position explicitly for proper animation on collapse
                opacity: 1,
                x: activeParentOffset,
                y: 0,
                scale: 1,
              }
            : isAnchored 
              ? { 
                  opacity: 1, 
                  x: anchoredOffset,
                  y: 0,
                  scale: 1,
                }
              : isPromoting
                ? {
                    opacity: 1,
                    x: activeParentOffset,
                    y: 0,
                    scale: [1, animationConfig.promotionScale, 1],
                  }
                : { 
                    opacity: 1, 
                    x: activeParentOffset,
                    y: 0,
                    scale: 1,
                  }
          
          // Skip all animation for leaf nodes when configured - stays in place
          const leafInitial = skipAnyAnimation
            ? undefined // Don't set initial - let it stay where it is
            : (shouldReduceMotion ? undefined : { opacity: 0, ...entryOffset, scale: animationConfig.entryScale })
          
          const leafTransition = skipAnyAnimation
            ? { duration: 0 }
            : {
                ...getTransition(animationConfig, animationDelay),
                scale: isPromoting ? {
                  duration: animationConfig.promotionDuration,
                  times: [0, 0.5, 1],
                  ease: 'easeInOut',
                } : undefined,
              }
          
          return (
            <motion.div
              key={item.id}
              // IMPORTANT: Always track layout for non-anchored items so collapse animations work.
              // The transition duration (instant vs normal) controls whether changes animate,
              // but we need layout tracking enabled to know WHERE to animate from/to.
              layout={!isAnchored ? 'position' : false}
              className={shouldUseAbsolute ? 'absolute top-0 left-0 inline-flex' : 'inline-flex'}
              style={{
                zIndex: isAnchored ? getAnchoredZIndex(anchoredDepth) : 100,
              }}
              initial={leafInitial}
              animate={animateState}
              exit={shouldReduceMotion || skipAnyAnimation ? undefined : getExitAnimation(animationConfig)}
              transition={leafTransition}
              data-item-expected-offset={shouldUseAbsolute ? anchoredOffset : 0}
            >
              <AnimatedItem
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
      
      {/* Children of Active Item */}
      {activeItem?.children && activeItem.children.length > 0 && (() => {
        const rootAnchorCount = level === 0 && activeId !== ROOT_ANCHOR_ID ? 1 : 0
        // When skipLeafAnimation is enabled and the active child is a leaf, 
        // the current item doesn't become anchored, so don't add to anchor count
        const currentItemBecomesAnchor = hasActiveChild && activeItem.children && activeItem.children.length > 0 &&
          !(animationConfig.skipLeafAnimation && activeChildIsLeaf) ? 1 : 0
        const childAnchorCount = anchorCount + rootAnchorCount + currentItemBecomesAnchor
        
        return (
          <LevelContext.Provider
            value={{
              level: level + 1,
              parentId: activeItem.id,
              isParentAnchored: hasActiveChild,
              anchorCount: childAnchorCount,
            }}
          >
            <StackLevel
              items={activeItem.children}
              parentLevelIndices={[
                ...parentLevelIndices,
                anchorItem
                  ? regularItems.findIndex((i) => i.id === activeId) + 1
                  : regularItems.findIndex((i) => i.id === activeId),
              ]}
            />
          </LevelContext.Provider>
        )
      })()}
    </>
  )
}
