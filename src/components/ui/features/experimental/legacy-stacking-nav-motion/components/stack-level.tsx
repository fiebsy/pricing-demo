/**
 * StackingNav - Stack Level Component (Orchestrator)
 *
 * Thin orchestrator (~150 lines) that reads context, calls hooks,
 * computes level-wide state, and delegates rendering to:
 *   - RootAnchor (root "All" button)
 *   - LevelAllRenderer (virtual "All" at child levels)
 *   - ItemRenderer (regular items)
 *
 * @module features/stacking-nav/components
 */

'use client'

import { AnimatePresence } from 'motion/react'

import { useStackContext, useLevelContext, LevelContext } from '../context'
import { ROOT_ANCHOR_ID, createLevelAllId, isLevelAllId } from '../config'
import { usePromotion } from '../hooks/use-promotion'
import { useHoverSuppression } from '../hooks/use-hover-suppression'
import { computeItemState } from '../utils/item-state'
import { debugTable } from '../utils/debug'
import type { StackItem, StackLevelProps } from '../types'

import { RootAnchor } from './root-anchor'
import { LevelAllRenderer } from './level-all-renderer'
import { ItemRenderer } from './item-renderer'

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
    getIsCollapsing,
  } = useStackContext()

  const { level, anchorCount } = useLevelContext()

  // ---- Level-wide state ---------------------------------------------------
  const activeId = activePath[level]
  const activeItem = items.find((i) => i.id === activeId)
  const hasActiveAtThisLevel = activeId !== undefined
  const hasActiveChild = activePath.length > level + 1

  const activeItemIsLeaf =
    activeItem != null && (!activeItem.children || activeItem.children.length === 0)

  const activeChildIsLeaf = (() => {
    if (!hasActiveChild || !activeItem?.children) return false
    const childActiveId = activePath[level + 1]
    const childItem = activeItem.children.find((c) => c.id === childActiveId)
    return childItem != null && (!childItem.children || childItem.children.length === 0)
  })()

  // ---- Hooks --------------------------------------------------------------
  const { promotingId } = usePromotion(activeId, level, items, animationConfig)
  const { isHoverSuppressed } = useHoverSuppression(level, items, animationConfig)

  const timeScale = animationConfig.timeScale
  const isCollapsingNow = getIsCollapsing()

  // ---- Root anchor separation ---------------------------------------------
  const anchorItem = level === 0 ? items.find((i) => i.id === ROOT_ANCHOR_ID) : null
  const regularItems = level === 0 ? items.filter((i) => i.id !== ROOT_ANCHOR_ID) : items

  // ---- Level-All virtual item ---------------------------------------------
  const childrenAreBeingShown =
    hasActiveAtThisLevel && activeItem?.children != null && activeItem.children.length > 0
  const showLevelAll = styleConfig.showLevelAll && level > 0 && !childrenAreBeingShown
  const levelAllId = createLevelAllId(level)
  const levelAllIsActive = showLevelAll && !hasActiveAtThisLevel
  const levelAllItem: StackItem = { id: levelAllId, label: styleConfig.levelAllLabel }
  const itemsWithLevelAll = showLevelAll ? [levelAllItem, ...regularItems] : regularItems

  // ---- Anchor offset shared by Level-All + items --------------------------
  const rootAnchorVisible = level === 0 && hasActiveAtThisLevel && activeId !== ROOT_ANCHOR_ID
  const totalAnchorCount = anchorCount + (rootAnchorVisible ? 1 : 0)
  const baseParentOffset = totalAnchorCount > 0 ? styleConfig.peekOffset * totalAnchorCount : 0

  // ---- Debug logging ------------------------------------------------------
  if (showDebug && typeof window !== 'undefined') {
    debugTable('level', `L${level}`, items.map((item) => ({
      item: item.id,
      level,
      isActive: item.id === activeId,
      hasChildren: !!(item.children?.length),
      wouldBeAnchored:
        item.id === activeId &&
        activePath.length > level + 1 &&
        !!(item.children?.length),
    })))
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
          timeScale={timeScale}
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
                isHoverSuppressed={isHoverSuppressed}
                baseParentOffset={baseParentOffset}
                animationConfig={animationConfig}
                shouldReduceMotion={shouldReduceMotion}
                isCollapsingNow={isCollapsingNow}
                timeScale={timeScale}
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
              isHoverSuppressed={isHoverSuppressed}
              timeScale={timeScale}
              showDebug={showDebug}
            />
          )
        })}
      </AnimatePresence>

      {/* Children of Active Item */}
      {activeItem?.children && activeItem.children.length > 0 && (() => {
        const rootAnchorCount = level === 0 && activeId !== ROOT_ANCHOR_ID ? 1 : 0
        const currentItemBecomesAnchor =
          hasActiveChild &&
          activeItem.children != null &&
          activeItem.children.length > 0 &&
          !(animationConfig.skipLeafAnimation && activeChildIsLeaf)
            ? 1
            : 0
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
