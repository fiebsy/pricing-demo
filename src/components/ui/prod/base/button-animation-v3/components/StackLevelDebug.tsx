/**
 * ButtonAnimation V3 - Stack Level Component with Comprehensive Debugging
 *
 * Enhanced version with detailed position tracking and debug output
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

// Debug tracking interface
interface DebugInfo {
  itemId: string
  level: number
  isAnchored: boolean
  isActive: boolean
  hasActiveChild: boolean
  calculatedOffset: number
  depth: number
  anchoredPath: string[]
  positioning: 'absolute' | 'relative' | 'flex'
  zIndex: number
  timestamp: number
}

// Global debug store for tracking all positions
const debugStore: Map<string, DebugInfo[]> = new Map()

// Debug logging utility
const logDebug = (info: DebugInfo) => {
  const history = debugStore.get(info.itemId) || []
  history.push(info)
  debugStore.set(info.itemId, history)
  
  console.log(`[DEBUG ${info.timestamp}] Button: ${info.itemId}`, {
    level: info.level,
    isAnchored: info.isAnchored,
    isActive: info.isActive,
    hasActiveChild: info.hasActiveChild,
    calculatedOffset: info.calculatedOffset,
    depth: info.depth,
    anchoredPath: info.anchoredPath,
    positioning: info.positioning,
    zIndex: info.zIndex
  })
}

// Export debug utilities
export const getDebugHistory = (itemId?: string) => {
  if (itemId) {
    return debugStore.get(itemId) || []
  }
  return Array.from(debugStore.entries())
}

export const clearDebugHistory = () => {
  debugStore.clear()
  console.log('[DEBUG] History cleared')
}

/**
 * Enhanced StackLevel with comprehensive debugging
 */
export function StackLevelDebug({
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
  
  // Debug: Log level state
  useEffect(() => {
    if (showDebug) {
      console.log(`[DEBUG Level ${level}] State Update:`, {
        level,
        activeId,
        hasActiveAtThisLevel,
        hasActiveChild,
        activePath,
        items: items.map(i => i.id)
      })
    }
  }, [level, activeId, hasActiveAtThisLevel, hasActiveChild, activePath, items, showDebug])
  
  // Detect promotion
  useEffect(() => {
    if (activeId !== previousActiveIdRef.current && activeId) {
      const item = items.find(i => i.id === activeId)
      if (level > 0 && item?.children?.length) {
        setPromotingId(activeId)
        if (showDebug) {
          console.log(`[DEBUG] Promotion detected for ${activeId} at level ${level}`)
        }
        setTimeout(() => setPromotingId(null), 400)
      }
    }
    previousActiveIdRef.current = activeId
  }, [activeId, level, items, showDebug])
  
  // Enhanced position calculation with debugging
  const getAnchoredOffset = (depth: number, itemId: string) => {
    const offset = styleConfig.peekOffset * depth
    
    if (showDebug) {
      console.log(`[DEBUG] Anchored offset calculation for ${itemId}:`, {
        depth,
        peekOffset: styleConfig.peekOffset,
        calculatedOffset: offset,
        formula: `${styleConfig.peekOffset} * ${depth} = ${offset}`
      })
    }
    
    return offset
  }
  
  const getActiveOffset = (itemId: string) => {
    const anchoredDepth = activePath.length
    const offset = styleConfig.peekOffset * anchoredDepth
    
    if (showDebug) {
      console.log(`[DEBUG] Active offset calculation for ${itemId}:`, {
        anchoredDepth,
        activePath,
        peekOffset: styleConfig.peekOffset,
        calculatedOffset: offset,
        formula: `${styleConfig.peekOffset} * ${anchoredDepth} = ${offset}`
      })
    }
    
    return offset
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
        const offset = isAnchored ? getAnchoredOffset(0, anchorItem.id) : 0
        const zIndex = isAnchored ? getAnchoredZIndex(0) : 100
        
        // Debug logging
        if (showDebug) {
          logDebug({
            itemId: anchorItem.id,
            level: 0,
            isAnchored,
            isActive: false,
            hasActiveChild: false,
            calculatedOffset: offset,
            depth: 0,
            anchoredPath: isAnchored ? [anchorItem.id] : [],
            positioning: isAnchored ? 'absolute' : 'flex',
            zIndex,
            timestamp: Date.now()
          })
        }
        
        return (
          <motion.div
            key={anchorItem.id}
            className={isAnchored ? 'absolute top-0 inline-flex' : 'inline-flex'}
            style={{
              left: isAnchored ? offset : undefined,
              zIndex,
              // Debug styling
              ...(showDebug && {
                outline: '2px solid red',
                outlineOffset: '2px',
              })
            }}
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            onAnimationComplete={() => {
              if (showDebug) {
                console.log(`[DEBUG] Animation complete for ${anchorItem.id}`)
              }
            }}
          >
            <AnimatedItem
              item={anchorItem}
              index={0}
              levelIndices={[0]}
              isAnchored={isAnchored}
            />
            {showDebug && (
              <div className="absolute -top-6 left-0 text-[10px] bg-red-500 text-white px-1 rounded">
                {anchorItem.id} | L0 | {isAnchored ? 'A' : 'F'} | {offset}px
              </div>
            )}
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
          
          // Check if promoting
          const isPromoting = item.id === promotingId
          
          // Calculate position with debugging
          const itemDepth = level + 1
          const itemOffset = isAnchored 
            ? getAnchoredOffset(itemDepth, item.id)
            : getActiveOffset(item.id)
          
          const positioning = isAnchored ? 'absolute' : (level > 0 ? 'absolute' : 'relative')
          const zIndex = isAnchored ? getAnchoredZIndex(itemDepth) : 100
          
          // Debug logging
          if (showDebug) {
            logDebug({
              itemId: item.id,
              level,
              isAnchored,
              isActive,
              hasActiveChild,
              calculatedOffset: itemOffset,
              depth: itemDepth,
              anchoredPath: isAnchored ? [...activePath.slice(0, level), item.id] : [],
              positioning,
              zIndex,
              timestamp: Date.now()
            })
            
            console.log(`[DEBUG] Rendering ${item.id}:`, {
              level,
              itemDepth,
              isActive,
              isAnchored,
              hasActiveChild,
              itemOffset,
              positioning,
              zIndex,
              activePath
            })
          }
          
          return (
            <motion.div
              key={item.id}
              layout={!isAnchored ? 'position' : false}
              className={isAnchored ? 'absolute top-0 inline-flex' : 'inline-flex'}
              style={{
                left: isAnchored ? itemOffset : (level > 0 ? itemOffset : undefined),
                marginLeft: !isAnchored && level === 0 ? itemOffset : undefined,
                zIndex,
                // Debug styling
                ...(showDebug && {
                  outline: isAnchored ? '2px solid blue' : '2px solid green',
                  outlineOffset: '2px',
                })
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
              onAnimationComplete={() => {
                if (showDebug) {
                  console.log(`[DEBUG] Animation complete for ${item.id} at position ${itemOffset}px`)
                }
              }}
            >
              <AnimatedItem
                item={item}
                index={itemIndex}
                levelIndices={itemLevelIndices}
                isAnchored={isAnchored}
                isPromoting={isPromoting}
              />
              {showDebug && (
                <div className="absolute -top-6 left-0 text-[10px] bg-blue-500 text-white px-1 rounded whitespace-nowrap">
                  {item.id} | L{level} | {isAnchored ? 'A' : (isActive ? 'ACT' : 'C')} | {itemOffset}px | D{itemDepth}
                </div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
      
      {/* Children of Active Item - RECURSIVE */}
      {activeItem?.children && activeItem.children.length > 0 && (
        <>
          {showDebug && (
            <div className="absolute top-8 left-0 text-[10px] bg-purple-500 text-white px-2 py-1 rounded">
              Entering Level {level + 1} (parent: {activeItem.id})
            </div>
          )}
          <LevelContext.Provider
            value={{
              level: level + 1,
              parentId: activeItem.id,
              isParentAnchored: hasActiveChild,
            }}
          >
            <StackLevelDebug
              items={activeItem.children}
              parentLevelIndices={[
                ...parentLevelIndices,
                anchorItem
                  ? regularItems.findIndex((i) => i.id === activeId) + 1
                  : regularItems.findIndex((i) => i.id === activeId),
              ]}
            />
          </LevelContext.Provider>
        </>
      )}
    </>
  )
}

// Debug console utilities
export const debugUtils = {
  printCurrentState: () => {
    console.group('Current Debug State')
    debugStore.forEach((history, itemId) => {
      const latest = history[history.length - 1]
      if (latest) {
        console.log(`${itemId}:`, {
          offset: latest.calculatedOffset,
          isAnchored: latest.isAnchored,
          level: latest.level,
          depth: latest.depth
        })
      }
    })
    console.groupEnd()
  },
  
  printHistory: (itemId: string) => {
    const history = debugStore.get(itemId)
    if (history) {
      console.table(history)
    } else {
      console.log(`No history for ${itemId}`)
    }
  },
  
  findOverlaps: () => {
    const positions = new Map<number, string[]>()
    debugStore.forEach((history, itemId) => {
      const latest = history[history.length - 1]
      if (latest && latest.isAnchored) {
        const offset = latest.calculatedOffset
        const itemsAtOffset = positions.get(offset) || []
        itemsAtOffset.push(itemId)
        positions.set(offset, itemsAtOffset)
      }
    })
    
    console.group('Position Analysis')
    positions.forEach((items, offset) => {
      if (items.length > 1) {
        console.warn(`⚠️ Overlap at ${offset}px:`, items)
      } else {
        console.log(`✅ ${offset}px:`, items[0])
      }
    })
    console.groupEnd()
  }
}

// Attach to window for console access
if (typeof window !== 'undefined') {
  (window as any).buttonAnimationDebug = debugUtils
}