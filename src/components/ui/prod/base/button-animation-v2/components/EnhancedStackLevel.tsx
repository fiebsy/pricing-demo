/**
 * ButtonAnimation V2 - Enhanced Stack Level Component
 *
 * Refactored stack level using the new state machine and AnimatedButton.
 * Provides better animation control and state management.
 *
 * @module prod/base/button-animation-v2/components
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'motion/react'
import { useReducedMotion } from 'motion/react'

import {
  useStackContext,
  useLevelContext,
  LevelContext,
} from '../context'
import { AnimatedButton } from './AnimatedButton'
import { ROOT_ANCHOR_ID } from '../config'
import { AnimationPhaseManager } from '../core/animation-phases'
import { ButtonState } from '../core/state-machine'
import type { StackItem } from '../types'

// ============================================================================
// PROPS
// ============================================================================

export interface EnhancedStackLevelProps {
  /** Items at this level */
  items: StackItem[]
  /** Parent level indices for numbering */
  parentLevelIndices?: number[]
  /** Parent element ID */
  parentId?: string | null
}

// ============================================================================
// ENHANCED STACK LEVEL
// ============================================================================

/**
 * Stack level component using the new state system.
 * Coordinates animations across all buttons at this level.
 */
export function EnhancedStackLevel({
  items,
  parentLevelIndices = [],
  parentId = null,
}: EnhancedStackLevelProps) {
  const { activePath, styleConfig } = useStackContext()
  const { level } = useLevelContext()
  const shouldReduceMotion = useReducedMotion() ?? false
  const phaseManager = AnimationPhaseManager.getInstance()
  
  // Separate "All" from regular items at root
  const anchorItem = level === 0 ? items.find((i) => i.id === ROOT_ANCHOR_ID) : null
  const regularItems = level === 0 
    ? items.filter((i) => i.id !== ROOT_ANCHOR_ID) 
    : items
  
  // State at this level
  const activeId = activePath[level]
  const activeItem = items.find((i) => i.id === activeId)
  const hasActiveAtThisLevel = activeId !== undefined
  const hasActiveChild = activePath.length > level + 1
  
  // Calculate how many items are anchored at this level and above
  const anchoredCount = Math.max(0, activePath.slice(0, level).length)
  
  // Track animation states
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set())
  
  // ============================================================================
  // ANIMATION COORDINATION
  // ============================================================================
  
  /**
   * Handles coordinated animations when active item changes.
   */
  useEffect(() => {
    if (!hasActiveAtThisLevel) return
    
    // Coordinate animations for all items at this level
    const transitions: Array<{
      elementId: string
      fromState: ButtonState
      toState: ButtonState
    }> = []
    
    // Handle siblings of active item
    regularItems.forEach(item => {
      if (item.id !== activeId) {
        // Siblings should exit or hide
        transitions.push({
          elementId: item.id,
          fromState: ButtonState.CHILD_IDLE,
          toState: ButtonState.CHILD_EXITING,
        })
      }
    })
    
    if (transitions.length > 0) {
      phaseManager.createCoordinatedPhase('expanding', transitions)
    }
  }, [activeId, hasActiveAtThisLevel])
  
  /**
   * Callback when a button animation completes.
   */
  const handleAnimationComplete = useCallback((itemId: string, state: ButtonState) => {
    setAnimatingItems(prev => {
      const next = new Set(prev)
      next.delete(itemId)
      return next
    })
    
    // Log for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Animation Complete] ${itemId} -> ${state}`)
    }
  }, [])
  
  // ============================================================================
  // RENDER HELPERS
  // ============================================================================
  
  /**
   * Gets sibling IDs for coordinated animations.
   */
  const getSiblingIds = (excludeId?: string): string[] => {
    return regularItems
      .filter(item => item.id !== excludeId)
      .map(item => item.id)
  }
  
  /**
   * Determines if an item should be rendered.
   */
  const shouldRenderItem = (item: StackItem): boolean => {
    // Always render active item
    if (item.id === activeId) return true
    
    // At root level, always show all items when nothing is active
    if (level === 0 && !hasActiveAtThisLevel) return true
    
    // For deeper levels, only show when no active item at this level
    if (level > 0 && !hasActiveAtThisLevel) return true
    
    // Hide non-active items when something is active
    return false
  }
  
  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <>
      {/* ROOT ANCHOR BUTTON ("All") */}
      {anchorItem && (
        <AnimatedButton
          item={anchorItem}
          index={0}
          levelIndices={[0]}
          siblingIds={getSiblingIds(anchorItem.id)}
          parentId={null}
          onAnimationComplete={(state) => handleAnimationComplete(anchorItem.id, state)}
        />
      )}
      
      {/* REGULAR ITEMS */}
      <AnimatePresence mode="popLayout">
        {regularItems.map((item, index) => {
          if (!shouldRenderItem(item)) return null
          
          const itemIndex = anchorItem ? index + 1 : index
          const itemLevelIndices = [...parentLevelIndices, itemIndex]
          const isActive = item.id === activeId
          
          return (
            <AnimatedButton
              key={item.id}
              item={item}
              index={itemIndex}
              levelIndices={itemLevelIndices}
              siblingIds={getSiblingIds(item.id)}
              parentId={parentId}
              onAnimationComplete={(state) => handleAnimationComplete(item.id, state)}
            />
          )
        })}
      </AnimatePresence>
      
      {/* CHILDREN OF ACTIVE ITEM */}
      {activeItem?.children && activeItem.children.length > 0 && (
        <ChildrenLevel
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

/**
 * Renders children of an active parent.
 * Uses context provider for proper level tracking.
 */
function ChildrenLevel({
  items,
  parentId,
  parentLevelIndices,
}: ChildrenLevelProps) {
  const { level } = useLevelContext()
  const { activePath, styleConfig } = useStackContext()
  const phaseManager = AnimationPhaseManager.getInstance()
  
  // Generate unique mount ID for proper AnimatePresence behavior
  const [mountId] = useState(() => Math.random().toString(36).slice(2))
  
  const nextLevel = level + 1
  const activeId = activePath[nextLevel]
  const activeItem = items.find((i) => i.id === activeId)
  const hasActiveAtThisLevel = activeId !== undefined
  
  // Track which items are animating
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set())
  
  /**
   * Callback when a child animation completes.
   */
  const handleAnimationComplete = useCallback((itemId: string, state: ButtonState) => {
    setAnimatingItems(prev => {
      const next = new Set(prev)
      next.delete(itemId)
      return next
    })
  }, [])
  
  /**
   * Gets sibling IDs for this level.
   */
  const getSiblingIds = (excludeId?: string): string[] => {
    return items
      .filter(item => item.id !== excludeId)
      .map(item => item.id)
  }
  
  /**
   * Determines if a child should be rendered.
   */
  const shouldRenderChild = (item: StackItem): boolean => {
    // Always render active child
    if (item.id === activeId) return true
    
    // Show all children when none are active
    if (!hasActiveAtThisLevel) return true
    
    // Hide non-active children
    return false
  }
  
  // Calculate anchored count for children
  const childAnchoredCount = hasActiveAtThisLevel 
    ? activePath.slice(0, nextLevel).length 
    : 0
  
  return (
    <LevelContext.Provider
      value={{ 
        level: nextLevel, 
        parentId, 
        isParentAnchored: true,
        anchoredCount: childAnchoredCount
      }}
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          if (!shouldRenderChild(item)) return null
          
          const itemLevelIndices = [...parentLevelIndices, index]
          const uniqueKey = `${mountId}-${item.id}`
          
          // Apply child gap margin
          const isLastVisible = index === items.length - 1 || 
            (hasActiveAtThisLevel && item.id === activeId)
          const marginRight = isLastVisible ? 0 : styleConfig.childGap
          
          return (
            <div
              key={uniqueKey}
              style={{ marginRight }}
              className="inline-flex"
            >
              <AnimatedButton
                item={item}
                index={index}
                levelIndices={itemLevelIndices}
                siblingIds={getSiblingIds(item.id)}
                parentId={parentId}
                onAnimationComplete={(state) => handleAnimationComplete(item.id, state)}
              />
            </div>
          )
        })}
      </AnimatePresence>
      
      {/* RECURSIVE CHILDREN */}
      {activeItem?.children && activeItem.children.length > 0 && (
        <ChildrenLevel
          key={`children-${activeItem.id}`}
          items={activeItem.children}
          parentId={activeItem.id}
          parentLevelIndices={[
            ...parentLevelIndices, 
            items.findIndex((i) => i.id === activeId)
          ]}
        />
      )}
    </LevelContext.Provider>
  )
}