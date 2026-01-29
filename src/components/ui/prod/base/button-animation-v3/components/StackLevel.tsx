/**
 * ButtonAnimation V3 - Stack Level Component
 *
 * Renders items at a specific level with proper animations.
 * Uses flex flow for natural positioning with anchored items using absolute positioning.
 *
 * KEY POSITIONING MODEL:
 * - Anchored items: absolute position (peek-behind stack)
 * - Active parent: inline-flex (normal flow)
 * - Children: inline-flex (flow naturally to the right of parent)
 *
 * @module prod/base/button-animation-v3/components
 */

'use client'

import { useRef, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { useStackContext, useLevelContext, LevelContext } from '../context'
import { AnimatedItem } from './AnimatedItem'
import type { StackItem, StackLevelProps } from '../types'
import { getChildEntryOffset, getChildDelay, getExitAnimation } from '../utils/animations'
import { ROOT_ANCHOR_ID, getAnchoredZIndex } from '../config'

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
  
  // Separate "All" from regular items at root
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
  // Each anchored level adds peekOffset to position
  const getAnchoredOffset = (depth: number) => {
    return styleConfig.peekOffset * depth
  }
  
  // Entry animation
  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getChildEntryOffset(animationConfig)
  
  return (
    <>
      {/* Root Anchor (All button) - only at level 0 */}
      {anchorItem && (() => {
        const isAnchored = hasActiveAtThisLevel && activeId !== ROOT_ANCHOR_ID
        const anchorOffset = getAnchoredOffset(0) // 0px for the All button
        
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
            transition={{
              type: 'spring',
              stiffness: animationConfig.stiffness,
              damping: animationConfig.damping,
            }}
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
      
      {/* Regular Items */}
      <AnimatePresence mode="popLayout">
        {regularItems.map((item, index) => {
          const isActive = item.id === activeId
          const itemIndex = anchorItem ? index + 1 : index
          const itemLevelIndices = [...parentLevelIndices, itemIndex]
          
          // Hide non-active siblings when something is active
          if (hasActiveAtThisLevel && !isActive) return null
          
          // Determine if this item should be anchored (pushed back in peek stack)
          // An item is anchored if: it's active AND its children are showing AND it has children
          const isAnchored = isActive && hasActiveChild && item.children && item.children.length > 0
          
          // Check if promoting (child becoming parent)
          const isPromoting = item.id === promotingId || false
          
          // Calculate anchored offset for peek-behind positioning
          // At level 0: "Design" becomes anchored at depth 1 (since "All" is at depth 0)
          // At level N: item becomes anchored at depth N+1
          const anchoredDepth = level === 0 ? 1 : level + 1
          
          // POSITIONING STRATEGY:
          // - Anchored items: absolute positioning with peek offset
          // - Non-anchored active items: inline-flex (normal flow)
          // - Children flow naturally to the right via flex container
          const shouldUseAbsolute = isAnchored
          
          // Animation configuration
          // Use consistent animation timing regardless of level for promotion
          // Only apply stagger delay for initial child entry (not for active items)
          const isInitialEntry = level > 0 && !isActive
          const animationDelay = isInitialEntry ? getChildDelay(index, animationConfig) : 0
          
          // Debug logging
          if (showDebug && typeof window !== 'undefined') {
            console.group(`📍 [Button] ${item.id}`)
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
            console.log('Animation:', {
              isInitialEntry,
              animationDelay: `${animationDelay}s`,
            })
            console.groupEnd()
          }
          
          // Calculate anchored offset for this item
          const anchoredOffset = getAnchoredOffset(anchoredDepth)
          
          // Calculate offset for active parent to clear anchored items above
          // The active parent needs to be positioned after all the anchored items
          // At level 0, we also need to account for the root anchor (All) if it's showing
          const rootAnchorVisible = level === 0 && hasActiveAtThisLevel && activeId !== ROOT_ANCHOR_ID
          const totalAnchorCount = anchorCount + (rootAnchorVisible ? 1 : 0)
          const activeParentOffset = totalAnchorCount > 0 ? getAnchoredOffset(totalAnchorCount) : 0
          
          // Calculate animate state based on whether item is anchored
          // Anchored items use x transform to slide to their peek position
          // Active parent uses x transform to clear anchored items
          const animateState = isAnchored 
            ? { 
                opacity: 1, 
                x: anchoredOffset, // Slide to anchored position
                y: 0,
                scale: 1,
              }
            : isPromoting
              ? {
                  opacity: 1,
                  x: activeParentOffset, // Keep offset during promotion
                  y: 0,
                  scale: [1, animationConfig.promotionScale, 1], // Scale up then back
                }
              : { 
                  opacity: 1, 
                  x: activeParentOffset, // Offset to clear anchored items
                  y: 0,
                  scale: 1,
                }
          
          return (
            <motion.div
              key={item.id}
              layout={!isAnchored ? 'position' : false}
              className={shouldUseAbsolute ? 'absolute top-0 left-0 inline-flex' : 'inline-flex'}
              style={{
                zIndex: isAnchored ? getAnchoredZIndex(anchoredDepth) : 100,
              }}
              initial={shouldReduceMotion ? undefined : { opacity: 0, ...entryOffset, scale: 0.95 }}
              animate={animateState}
              exit={shouldReduceMotion ? undefined : getExitAnimation(animationConfig)}
              transition={{
                delay: animationDelay,
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
                // Promotion animation uses specific timing
                scale: isPromoting ? {
                  duration: animationConfig.promotionDuration,
                  times: [0, 0.5, 1],
                  ease: 'easeInOut',
                } : undefined,
              }}
              data-button-expected-offset={shouldUseAbsolute ? anchoredOffset : 0}
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
      
      {/* Children of Active Item - INLINE FLEX (flow naturally to the right) */}
      {activeItem?.children && activeItem.children.length > 0 && (() => {
        // Calculate anchor count for children
        // We need to count all the anchors that will be visible:
        // 1. All previous anchors (passed down via anchorCount)
        // 2. The root anchor (All) if we're at level 0 and something is selected
        // 3. The current active item if it's becoming anchored (has active child)
        const rootAnchorCount = level === 0 && activeId !== ROOT_ANCHOR_ID ? 1 : 0
        const currentItemBecomesAnchor = hasActiveChild && activeItem.children && activeItem.children.length > 0 ? 1 : 0
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