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
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { useStackContext, useLevelContext, LevelContext } from '../context'
import { AnimatedItem } from './animated-item'
import { LevelAllItem } from './level-all-item'
import type { StackItem, StackLevelProps } from '../types'
import { getChildEntryOffset, getChildDelay, getExitAnimation, getTransition } from '../utils/animations'
import { ROOT_ANCHOR_ID, Z_INDEX, getAnchoredZIndex, createLevelAllId, isLevelAllId } from '../config'

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
    getIsCollapsing, // Function to get live collapse state
  } = useStackContext()
  
  const { level, anchorCount } = useLevelContext()
  
  // Track which item was just selected for promotion animation
  const [promotingId, setPromotingId] = useState<string | null>(null)
  const previousActiveIdRef = useRef<string | undefined>(undefined)

  // Hover suppression — prevent hover flash on newly appearing child items.
  // Uses a data attribute to suppress hover visuals via CSS, keeping items fully
  // clickable. When the attribute is removed, the button's existing CSS transition
  // (duration-100) smoothly fades in the hover state if the cursor is already there.
  const hoverDelay = animationConfig.hoverDelay
  const [isHoverSuppressed, setIsHoverSuppressed] = useState(level > 0 && hoverDelay > 0)

  useEffect(() => {
    if (level === 0 || hoverDelay <= 0) {
      setIsHoverSuppressed(false)
      return
    }
    setIsHoverSuppressed(true)
    const timer = setTimeout(
      () => setIsHoverSuppressed(false),
      (hoverDelay * 1000) / animationConfig.timeScale
    )
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, hoverDelay])
  
  // Separate root anchor from regular items at root level
  const anchorItem = level === 0 ? items.find((i) => i.id === ROOT_ANCHOR_ID) : null
  const regularItems = level === 0 ? items.filter((i) => i.id !== ROOT_ANCHOR_ID) : items
  
  // Debug logging
  useEffect(() => {
    if (showDebug && typeof window !== 'undefined') {
      console.log(`[StackLevel] L${level} items=[${items.map(i => i.id)}] active=${activePath[level] ?? 'none'}`)
    }
  }, [level, items, activePath, showDebug])
  
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
  
  // Time scale for slow-mo — scales all hardcoded internal durations
  const timeScale = animationConfig.timeScale

  // Detect promotion - only when a NEW item with children is selected
  useEffect(() => {
    if (activeId !== previousActiveIdRef.current && activeId) {
      const item = items.find(i => i.id === activeId)
      if (level > 0 && item?.children?.length) {
        setPromotingId(activeId)
        setTimeout(() => setPromotingId(null), 400 / timeScale)
      }
    }
    previousActiveIdRef.current = activeId
  }, [activeId, level, items, timeScale])
  
  // Calculate anchored offset for peek-behind effect
  const getAnchoredOffset = (depth: number) => {
    return styleConfig.peekOffset * depth
  }

  // Clip-path expression based on clipSide
  const clipExpr = `calc(var(--clip-progress) * (100% - ${styleConfig.clipOffset}px))`
  const clipPathValue = styleConfig.clipSide === 'left'
    ? `inset(0px ${clipExpr} 0px 0px)`
    : styleConfig.clipSide === 'right'
      ? `inset(0px 0px 0px ${clipExpr})`
      : `inset(0px ${clipExpr} 0px ${clipExpr})`
  
  // Entry animation
  const entryOffset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getChildEntryOffset(animationConfig)
  
  // Level-all button state
  // The Level-All should only appear when:
  // 1. showLevelAll is enabled
  // 2. We're not at root level (level > 0)  
  // 3. We haven't drilled deeper into a child with its own children
  //    (i.e., hide Level-All when this level's active item has children being shown)
  const childrenAreBeingShown = hasActiveAtThisLevel && activeItem?.children && activeItem.children.length > 0
  const showLevelAll = styleConfig.showLevelAll && level > 0 && !childrenAreBeingShown
  const levelAllId = createLevelAllId(level)
  // Level-all is active when: we're at this level but no specific child is selected
  // This means the parent at level-1 is expanded and showing children, but user hasn't drilled deeper
  const levelAllIsActive = showLevelAll && !hasActiveAtThisLevel
  
  // Create virtual level-all item and prepend to items so it renders as a sibling
  const levelAllItem: StackItem = { id: levelAllId, label: styleConfig.levelAllLabel }
  const itemsWithLevelAll = showLevelAll ? [levelAllItem, ...regularItems] : regularItems
  
  // Calculate offset for items to clear anchored items (needed for both Level-All and regular items)
  const rootAnchorVisible = level === 0 && hasActiveAtThisLevel && activeId !== ROOT_ANCHOR_ID
  const totalAnchorCount = anchorCount + (rootAnchorVisible ? 1 : 0)
  const baseParentOffset = totalAnchorCount > 0 ? styleConfig.peekOffset * totalAnchorCount : 0

  // Read collapse state once for all items in this level.
  // During collapse, we skip stagger delays so all items animate simultaneously
  // (matching the fluid L0 demotion behavior).
  const isCollapsingNow = getIsCollapsing()

  return (
    <>
      {/* Root Anchor (All button) - only at level 0 */}
      {anchorItem && (() => {
        const isAnchored = hasActiveAtThisLevel && activeId !== ROOT_ANCHOR_ID
        const anchorOffset = getAnchoredOffset(0)

        const anchorTransition = getTransition(animationConfig)

        // Delay clip on entry only — lets position animation lead visually
        const anchorClipOverride = styleConfig.clipDelay > 0 && isAnchored
          ? { '--clip-progress': { ...getTransition(animationConfig), delay: styleConfig.clipDelay } }
          : {}

        return (
          <motion.div
            key={anchorItem.id}
            className={isAnchored ? 'absolute top-0 left-0 inline-flex' : 'inline-flex'}
            style={{
              zIndex: isAnchored ? getAnchoredZIndex(0) : 100,
              ...(styleConfig.clipAnchored && !showDebug ? { clipPath: clipPathValue } : {}),
            }}
            initial={shouldReduceMotion ? undefined : { opacity: 0, '--clip-progress': 0 }}
            animate={{
              opacity: 1,
              x: isAnchored ? anchorOffset : 0,
              '--clip-progress': isAnchored ? 1 : 0,
            }}
            transition={{ ...anchorTransition, ...anchorClipOverride }}
          >
            {isAnchored && showDebug && styleConfig.clipAnchored && (
              <>
                <div
                  className="pointer-events-none absolute top-0 h-full w-px bg-red-500"
                  style={{
                    [styleConfig.clipSide === 'right' ? 'right' : 'left']: `${styleConfig.clipOffset}px`,
                    zIndex: 9999,
                  }}
                />
                {styleConfig.clipSide === 'center' && (
                  <div
                    className="pointer-events-none absolute top-0 h-full w-px bg-red-500"
                    style={{ right: `${styleConfig.clipOffset}px`, zIndex: 9999 }}
                  />
                )}
              </>
            )}
            <AnimatedItem
              item={anchorItem}
              index={0}
              levelIndices={[0]}
              isAnchored={isAnchored}
            />
          </motion.div>
        )
      })()}
      
      {/* Regular Items (including Level-All as first item when enabled) */}
      <AnimatePresence mode="popLayout">
        {itemsWithLevelAll.map((item, index) => {
          // Check if this is the level-all virtual item
          const isLevelAllItem = isLevelAllId(item.id)
          
          // For level-all item, use special rendering but same positioning as children
          // Lower z-index (90) so it appears behind other children (100) during overlaps
          if (isLevelAllItem) {
            const animationDelay = isCollapsingNow ? 0 : getChildDelay(0, animationConfig)

            // Exit for Level-All — inherits transition from main animation controls.
            // popLayout takes exiting items out of flow immediately.
            const levelAllExit = shouldReduceMotion
              ? undefined
              : getExitAnimation(animationConfig)
            
            const levelAllTransition = getTransition(animationConfig, animationDelay)
            
            return (
              <motion.div
                key={item.id}
                className={isHoverSuppressed ? 'inline-flex [&_button]:!pointer-events-none' : 'inline-flex'}
                style={{ zIndex: 90 }}
                data-hover-suppressed={isHoverSuppressed || undefined}
                initial={shouldReduceMotion ? undefined : { opacity: 0, ...entryOffset, scale: animationConfig.entryScale }}
                animate={{ opacity: 1, x: baseParentOffset, y: 0, scale: 1 }}
                exit={levelAllExit}
                transition={levelAllTransition}
              >
                <LevelAllItem
                  levelAllId={item.id}
                  isActive={levelAllIsActive}
                />
              </motion.div>
            )
          }
          
          // Regular item rendering (adjust index to account for level-all)
          const adjustedIndex = showLevelAll ? index - 1 : index
          const isActive = item.id === activeId
          const itemIndex = anchorItem ? adjustedIndex + 1 : adjustedIndex
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
          
          // Animation delay (use original index in itemsWithLevelAll for proper stagger)
          // Skip stagger during collapse — all items should animate simultaneously
          // This is why L0 demotion feels fluid (L0 items never get stagger since level=0)
          const isInitialEntry = level > 0 && !isActive && !isCollapsingNow
          const animationDelay = isInitialEntry ? getChildDelay(index, animationConfig) : 0
          
          // Debug logging
          if (showDebug && typeof window !== 'undefined') {
            console.log(`[Item] ${item.id} L${level} anchored=${isAnchored} collapse=${isCollapsingNow} delay=${(animationDelay * 1000).toFixed(0)}ms`)
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
          const clipProgress = isAnchored ? 1 : 0

          const animateState = skipAnyAnimation
            ? {
                // Item stays exactly where it is with instant transition (duration: 0)
                // but we still track the position explicitly for proper animation on collapse
                opacity: 1,
                x: activeParentOffset,
                y: 0,
                scale: 1,
                '--clip-progress': clipProgress,
              }
            : isAnchored
              ? {
                  opacity: 1,
                  x: anchoredOffset,
                  y: 0,
                  scale: 1,
                  '--clip-progress': clipProgress,
                }
              : isPromoting
                ? {
                    opacity: 1,
                    x: activeParentOffset,
                    y: 0,
                    scale: [1, animationConfig.promotionScale, 1],
                    '--clip-progress': clipProgress,
                  }
                : {
                    opacity: 1,
                    x: activeParentOffset,
                    y: 0,
                    scale: 1,
                    '--clip-progress': clipProgress,
                  }
          
          // L0 siblings re-appearing during collapse should fade in without
          // positional offset or scale shift — they were just hidden, not new.
          const isCollapseReentry = isCollapsingNow && level === 0 && !isActive

          // Skip all animation for leaf nodes when configured - stays in place
          const leafInitial = skipAnyAnimation
            ? undefined // Don't set initial - let it stay where it is
            : shouldReduceMotion
              ? undefined
              : isCollapseReentry
                ? { opacity: 0, '--clip-progress': 0 } // Fade only — no slide/scale
                : { opacity: 0, ...entryOffset, scale: animationConfig.entryScale, '--clip-progress': 0 }
          
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
          
          // Exit animation — inherits transition from main animation controls.
          // popLayout takes exiting items out of flow immediately.
          const exitAnimation = shouldReduceMotion
            ? undefined
            : getExitAnimation(animationConfig)

          // Delay clip on entry only — lets position animation lead visually
          const itemClipOverride = styleConfig.clipDelay > 0 && isAnchored
            ? { '--clip-progress': { ...getTransition(animationConfig), delay: styleConfig.clipDelay } }
            : {}

          // Debug: Log exit animation being used
          if (showDebug && typeof window !== 'undefined' && !isActive) {
            console.log(`🚪 [EXIT] ${item.id}: scale=${animationConfig.exitScale}, collapsing=${isCollapsingNow}`)
          }

          return (
            <motion.div
              key={item.id}
              className={cn(
                shouldUseAbsolute ? 'absolute top-0 left-0 inline-flex' : 'inline-flex',
                isHoverSuppressed && !isAnchored && '[&_button]:!pointer-events-none'
              )}
              style={{
                zIndex: isAnchored
                  ? getAnchoredZIndex(anchoredDepth)
                  : isPromoting
                    ? Z_INDEX.PROMOTING
                    : isActive
                      ? Z_INDEX.ACTIVE + 10 + level * 10
                      : Z_INDEX.ACTIVE + level * 10,
                ...(styleConfig.clipAnchored && !showDebug ? { clipPath: clipPathValue } : {}),
              }}
              data-hover-suppressed={isHoverSuppressed && !isAnchored || undefined}
              initial={leafInitial}
              animate={animateState}
              exit={exitAnimation}
              transition={{ ...leafTransition, ...itemClipOverride }}
              data-item-expected-offset={shouldUseAbsolute ? anchoredOffset : 0}
            >
              {isAnchored && showDebug && styleConfig.clipAnchored && (
                <div
                  className="pointer-events-none absolute top-0 h-full w-px bg-red-500"
                  style={{
                    [styleConfig.clipSide === 'left' ? 'left' : 'right']: `${styleConfig.clipOffset}px`,
                    zIndex: 9999,
                  }}
                />
              )}
              <AnimatedItem
                item={item}
                index={itemIndex}
                levelIndices={itemLevelIndices}
                isAnchored={isAnchored ?? false}
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
