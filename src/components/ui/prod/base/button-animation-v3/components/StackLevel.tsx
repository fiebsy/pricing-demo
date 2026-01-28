/**
 * ButtonAnimation V3 - Stack Level Component
 *
 * Renders items at a specific level with proper animations.
 * Anchored items stay fixed, new active items offset to the right.
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
  } = useStackContext()
  
  const { level } = useLevelContext()
  
  // Track which item was just selected for promotion animation
  const [promotingId, setPromotingId] = useState<string | null>(null)
  const previousActiveIdRef = useRef<string | undefined>(undefined)
  
  // Separate "All" from regular items at root
  const anchorItem = level === 0 ? items.find((i) => i.id === ROOT_ANCHOR_ID) : null
  const regularItems = level === 0 ? items.filter((i) => i.id !== ROOT_ANCHOR_ID) : items
  
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
  
  // Calculate positions
  // Key: Anchored items stay at 0, active items offset by 4px per level
  const getItemPosition = (isAnchored: boolean, itemLevel: number) => {
    if (isAnchored) {
      // Anchored items never move from their original position
      return 0
    } else if (itemLevel > 0) {
      // Active items offset 4px to the right per level
      return 4 * itemLevel
    }
    return 0
  }
  
  // Entry animation
  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getChildEntryOffset(animationConfig)
  
  return (
    <>
      {/* Root Anchor (All button) */}
      {anchorItem && (() => {
        const isAnchored = hasActiveAtThisLevel && activeId !== ROOT_ANCHOR_ID
        
        return (
          <motion.div
            key={anchorItem.id}
            className={isAnchored ? 'absolute top-0 left-0 inline-flex' : 'inline-flex'}
            style={{
              zIndex: isAnchored ? getAnchoredZIndex(0) : 100,
            }}
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
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
          
          // Determine if anchored
          const isAnchored = isActive && hasActiveChild
          
          // Check if promoting (with memoized check)
          const isPromoting = item.id === promotingId
          
          // Position calculation
          const position = getItemPosition(isAnchored, level + 1)
          
          return (
            <motion.div
              key={item.id}
              layout={!isAnchored ? 'position' : false}
              className={isAnchored ? 'absolute top-0 left-0 inline-flex' : 'inline-flex'}
              style={{
                transform: position > 0 ? `translateX(${position}px)` : undefined,
                zIndex: isAnchored ? getAnchoredZIndex(level + 1) : 100,
              }}
              initial={shouldReduceMotion ? undefined : { opacity: 0, ...entryOffset }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={shouldReduceMotion ? undefined : getExitAnimation(animationConfig)}
              transition={{
                delay: level > 0 ? getChildDelay(index, animationConfig) : 0,
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
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
      {activeItem?.children && activeItem.children.length > 0 && (
        <LevelContext.Provider
          value={{
            level: level + 1,
            parentId: activeItem.id,
            isParentAnchored: hasActiveChild,
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
      )}
    </>
  )
}