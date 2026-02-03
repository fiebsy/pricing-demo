/**
 * StackingNav V2 - Stack Level Component (Orchestrator)
 *
 * Simplified orchestrator that reads phase state from context.
 * No hook calls for timing - all timing from phase coordinator.
 *
 * @module features/stacking-nav-v2/components
 */

'use client'

import { AnimatePresence } from 'motion/react'

import { useStackContext, useLevelContext, LevelContext } from '../context'
import { ROOT_ANCHOR_ID, createLevelAllId, isLevelAllId } from '../config'
import { computeItemState } from '../utils/item-state'
import { debugTable } from '../utils/debug'
import type { StackItem, StackLevelProps } from '../types'

import { RootAnchor } from './root-anchor'
import { LevelAllRenderer } from './level-all-renderer'
import { ItemRenderer } from './item-renderer'

/**
 * Renders items at a specific level of the navigation tree.
 * V2: Reads phase state from context instead of using independent hooks.
 */
export function StackLevel({ items, parentLevelIndices = [] }: StackLevelProps) {
  const {
    activePath,
    animationConfig,
    styleConfig,
    shouldReduceMotion,
    showDebug,
    // Phase coordinator state (V2)
    isCollapsing,
    promotingId,
    isHoverSuppressed,
  } = useStackContext()

  const { level, anchorCount, isParentPromoting, parentAnchoredOffset } =
    useLevelContext()

  // ---- Level-wide state ---------------------------------------------------
  const activeId = activePath[level]
  const activeItem = items.find((i) => i.id === activeId)
  const hasActiveAtThisLevel = activeId !== undefined
  const hasActiveChild = activePath.length > level + 1

  const activeItemIsLeaf =
    activeItem != null &&
    (!activeItem.children || activeItem.children.length === 0)

  const activeChildIsLeaf = (() => {
    if (!hasActiveChild || !activeItem?.children) return false
    const childActiveId = activePath[level + 1]
    const childItem = activeItem.children.find((c) => c.id === childActiveId)
    return (
      childItem != null && (!childItem.children || childItem.children.length === 0)
    )
  })()

  // ---- Get hover suppression for this level (from phase coordinator) ------
  const hoverSuppressed = isHoverSuppressed(level)

  // ---- Read collapse state from phase coordinator -------------------------
  const isCollapsingNow = isCollapsing

  // ---- Detect promoting phase ------------------------------------------------
  // isParentPromoting comes from LevelContext - set by parent when rendering children.
  // This is synchronously available on first render, unlike promotingId from phase coordinator.
  // Use parent's promotion state OR the phase coordinator's state (for async catch-up).
  const isPromotingPhase = isParentPromoting || promotingId !== null

  // ---- Root anchor separation ---------------------------------------------
  const anchorItem =
    level === 0 ? items.find((i) => i.id === ROOT_ANCHOR_ID) : null
  const regularItems =
    level === 0 ? items.filter((i) => i.id !== ROOT_ANCHOR_ID) : items

  // ---- Level-All virtual item ---------------------------------------------
  const childrenAreBeingShown =
    hasActiveAtThisLevel &&
    activeItem?.children != null &&
    activeItem.children.length > 0
  const showLevelAll =
    styleConfig.showLevelAll && level > 0 && !childrenAreBeingShown
  const levelAllId = createLevelAllId(level)
  const levelAllIsActive = showLevelAll && !hasActiveAtThisLevel
  const levelAllItem: StackItem = {
    id: levelAllId,
    label: styleConfig.levelAllLabel,
  }
  const itemsWithLevelAll = showLevelAll
    ? [levelAllItem, ...regularItems]
    : regularItems

  // ---- Anchor offset shared by Level-All + items --------------------------
  const rootAnchorVisible =
    level === 0 && hasActiveAtThisLevel && activeId !== ROOT_ANCHOR_ID
  const totalAnchorCount = anchorCount + (rootAnchorVisible ? 1 : 0)
  const baseParentOffset =
    totalAnchorCount > 0 ? styleConfig.peekOffset * totalAnchorCount : 0

  // ---- Debug logging ------------------------------------------------------
  if (showDebug && typeof window !== 'undefined') {
    debugTable(
      'level',
      `L${level}`,
      items.map((item) => ({
        item: item.id,
        level,
        isActive: item.id === activeId,
        hasChildren: !!(item.children?.length),
        wouldBeAnchored:
          item.id === activeId &&
          activePath.length > level + 1 &&
          !!(item.children?.length),
      }))
    )
  }

  // ---- Render -------------------------------------------------------------
  return (
    <>
      {/* Root Anchor */}
      {anchorItem && (
        <RootAnchor
          anchorItem={anchorItem}
          isAnchored={hasActiveAtThisLevel && activeId !== ROOT_ANCHOR_ID}
          animationConfig={animationConfig}
          styleConfig={styleConfig}
          shouldReduceMotion={shouldReduceMotion}
          isCollapsingNow={isCollapsingNow}
        />
      )}

      {/* Regular Items + Level-All */}
      <AnimatePresence mode="popLayout">
        {itemsWithLevelAll.map((item, index) => {
          if (isLevelAllId(item.id)) {
            return (
              <LevelAllRenderer
                key={item.id}
                itemId={item.id}
                isActive={levelAllIsActive}
                isHoverSuppressed={hoverSuppressed}
                baseParentOffset={baseParentOffset}
                animationConfig={animationConfig}
                shouldReduceMotion={shouldReduceMotion}
                isCollapsingNow={isCollapsingNow}
                isPromotingPhase={isPromotingPhase}
                parentAnchoredOffset={parentAnchoredOffset}
              />
            )
          }

          // Regular item — compute state via pure function
          const adjustedIndex = showLevelAll ? index - 1 : index
          const itemIndex = anchorItem ? adjustedIndex + 1 : adjustedIndex
          const itemLevelIndices = [...parentLevelIndices, itemIndex]

          const state = computeItemState({
            item,
            index,
            level,
            activePath,
            animationConfig,
            styleConfig,
            anchorCount,
            promotingId,
            isCollapsingNow,
            activeItemIsLeaf,
            activeChildIsLeaf,
            showLevelAll,
            isPromotingPhase,
          })

          if (state.shouldHide) return null

          return (
            <ItemRenderer
              key={item.id}
              item={item}
              itemIndex={itemIndex}
              itemLevelIndices={itemLevelIndices}
              state={state}
              animationConfig={animationConfig}
              shouldReduceMotion={shouldReduceMotion}
              isCollapsingNow={isCollapsingNow}
              isHoverSuppressed={hoverSuppressed}
              parentAnchoredOffset={parentAnchoredOffset}
            />
          )
        })}
      </AnimatePresence>

      {/* Children of Active Item */}
      {activeItem?.children &&
        activeItem.children.length > 0 &&
        (() => {
          const rootAnchorCount =
            level === 0 && activeId !== ROOT_ANCHOR_ID ? 1 : 0
          const currentItemBecomesAnchor =
            hasActiveChild &&
            activeItem.children != null &&
            activeItem.children.length > 0 &&
            !(animationConfig.skipLeafAnimation && activeChildIsLeaf)
              ? 1
              : 0
          const childAnchorCount =
            anchorCount + rootAnchorCount + currentItemBecomesAnchor

          // Children should know if parent is promoting (for sync timing)
          // Promotion occurs when level > 0 and active item has children
          const parentIsPromoting = level > 0 && !isCollapsingNow

          // Calculate parent's anchored offset (where parent ends up)
          // This is used by entryFromParent so children start at parent's end position
          const parentAnchoredDepth = level === 0 ? 1 : level + 1
          const parentAnchoredOffset = styleConfig.peekOffset * parentAnchoredDepth

          return (
            <LevelContext.Provider
              value={{
                level: level + 1,
                parentId: activeItem.id,
                isParentAnchored: hasActiveChild,
                anchorCount: childAnchorCount,
                isParentPromoting: parentIsPromoting,
                parentAnchoredOffset,
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
