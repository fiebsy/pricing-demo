/**
 * StackingNav V2 - Animated Item Component
 *
 * Individual item with state-aware animations.
 * Uses Button's iconTrailing prop for proper spacing.
 *
 * @module features/stacking-nav-v2/components
 */

'use client'

import * as React from 'react'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { Button } from '@/components/ui/core/primitives/button'
import { cn } from '@/lib/utils'

import { useStackContext, useLevelContext } from '../context'
import { getNumberLabel, ROOT_ANCHOR_ID, HEIGHT_CLASSES } from '../config'
import { NavigationPhase } from '../state/navigation-phase'
import type { StackItem } from '../types'

// =============================================================================
// REMOVE BUTTON COMPONENT
// =============================================================================

interface RemoveButtonProps {
  label: string
  onRemove: () => void
}

function RemoveButton({ label, onRemove }: RemoveButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onRemove()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      onRemove()
    }
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'rounded-full p-0.5',
        'opacity-60 transition-opacity',
        'hover:opacity-100',
        'focus-visible:opacity-100',
        'motion-reduce:transition-none'
      )}
      aria-label={`Remove ${label}`}
    >
      <HugeIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
    </span>
  )
}

// =============================================================================
// ANIMATED ITEM COMPONENT
// =============================================================================

interface AnimatedItemProps {
  item: StackItem
  index: number
  levelIndices: number[]
  isAnchored: boolean
  isPromoting?: boolean
}

/**
 * Individual item component with state-aware styling.
 * Uses Button's iconTrailing for proper alignment.
 */
export const AnimatedItem = React.memo(function AnimatedItem({
  item,
  levelIndices,
  isAnchored,
  isPromoting = false,
}: AnimatedItemProps) {
  const {
    activePath,
    styleConfig,
    showNumbers,
    showDebug,
    selectItem,
    collapseToLevel,
    phase,
  } = useStackContext()

  const { level } = useLevelContext()

  const hasChildren = Boolean(item.children?.length)

  // Determine item state
  const isInActivePath = activePath[level] === item.id
  const isExpanded = isInActivePath && hasChildren && !isAnchored
  const isSelected = isInActivePath && !hasChildren
  const isChildItem = level > 0 && !isInActivePath
  const isRootAnchor = level === 0 && item.id === ROOT_ANCHOR_ID

  // Determine variant
  let variant:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'shine'
    | 'tab'
    | 'link-gray'
    | 'link-color' = 'tertiary'
  if (isRootAnchor && !isAnchored) {
    variant = 'shine'
  } else if (isAnchored) {
    variant = styleConfig.anchoredVariant
  } else if (isExpanded) {
    variant = styleConfig.expandedVariant
  } else if (isSelected) {
    // Use selectedLeafVariant for leaf nodes that are selected
    variant = styleConfig.selectedLeafVariant
  } else if (isChildItem) {
    variant = styleConfig.childVariant
  }

  // Handle click
  const handleSelect = React.useCallback(() => {
    if (!isAnchored) {
      selectItem(level, item.id, hasChildren)
    }
  }, [isAnchored, level, item.id, hasChildren, selectItem])

  // Handle remove (demotion)
  const handleRemove = React.useCallback(() => {
    collapseToLevel(level)
  }, [level, collapseToLevel])

  // Number label
  const numberLabel = showNumbers ? getNumberLabel(levelIndices) : undefined

  // Trailing element (close button for expanded items)
  const trailingElement = isExpanded ? (
    <RemoveButton label={item.label} onRemove={handleRemove} />
  ) : undefined

  // Shadow for anchored items
  const anchoredShadow = isAnchored
    ? 'shadow-[4px_0_8px_-2px_rgba(0,0,0,0.3)]'
    : ''

  // Height class for consistent sizing
  const heightClass = HEIGHT_CLASSES[styleConfig.buttonSize]

  // Determine display state for debug badge
  const displayState = isPromoting
    ? 'promoting'
    : isAnchored
      ? 'anchored'
      : isSelected
        ? 'active'
        : isChildItem
          ? 'child'
          : isExpanded
            ? 'active'
            : 'idle'

  // Phase-based transition indicator
  const isTransitioning =
    phase === NavigationPhase.PROMOTING ||
    phase === NavigationPhase.EXPANDING ||
    phase === NavigationPhase.COLLAPSING

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={styleConfig.buttonSize}
        roundness={styleConfig.buttonRoundness}
        iconTrailing={trailingElement}
        onClick={handleSelect}
        disabled={isAnchored}
        className={cn(
          'relative',
          // Only transition colors/opacity - NOT layout properties
          // Layout is handled by Motion's layout animation
          'transition-[background-color,border-color,color,box-shadow,opacity] duration-150',
          heightClass,
          anchoredShadow,
          isAnchored && 'pointer-events-none'
        )}
        style={{
          opacity: isAnchored ? styleConfig.anchoredOpacity : 1,
        }}
        // Active state for tab variant underline
        data-active={isSelected || undefined}
        // Debug data attributes
        data-item-id={item.id}
        data-item-label={item.label}
        data-item-level={level}
        data-item-state={displayState}
        data-item-anchored={isAnchored}
        data-item-anchor-depth={
          isAnchored ? activePath.indexOf(item.id) : undefined
        }
      >
        {numberLabel && (
          <span className="mr-1.5 font-mono text-xs opacity-50">
            {numberLabel}
          </span>
        )}
        <span className="select-none">{item.label}</span>
      </Button>

      {/* Debug Status Badge - Single unified label above item */}
      {(showNumbers || showDebug) && (
        <div className="pointer-events-none absolute bottom-full left-1/2 mb-1 flex -translate-x-1/2 flex-col items-center">
          {/* Unified Badge */}
          <div
            className={cn(
              'rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-semibold shadow-sm',
              // Transition states take priority (with pulse animation)
              isPromoting && phase === NavigationPhase.PROMOTING
                ? 'animate-pulse border-purple-600 bg-purple-500 text-white'
                : phase === NavigationPhase.COLLAPSING && isChildItem
                  ? 'animate-pulse border-orange-600 bg-orange-500 text-white'
                  : phase === NavigationPhase.EXPANDING && isChildItem
                    ? 'animate-pulse border-cyan-600 bg-cyan-500 text-white'
                    : // Stable states (no pulse)
                      isAnchored
                      ? 'border-yellow-600 bg-yellow-500 text-black'
                      : isSelected
                        ? 'border-green-600 bg-green-500 text-white'
                        : isExpanded
                          ? 'border-blue-600 bg-blue-500 text-white'
                          : isChildItem
                            ? 'border-gray-600 bg-gray-500 text-white'
                            : 'border-gray-400 bg-gray-300 text-gray-700'
            )}
          >
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1">
                {/* Arrow indicator for transitions */}
                {isTransitioning && (
                  <span className="text-[8px]">
                    {isPromoting && phase === NavigationPhase.PROMOTING && '↑'}
                    {phase === NavigationPhase.COLLAPSING && isAnchored && '↓'}
                    {phase === NavigationPhase.COLLAPSING && isChildItem && '←'}
                    {phase === NavigationPhase.EXPANDING && isChildItem && '→'}
                  </span>
                )}
                <span>
                  {/* Transition labels take priority */}
                  {isPromoting && phase === NavigationPhase.PROMOTING
                    ? 'PROMOTING'
                    : phase === NavigationPhase.COLLAPSING && isAnchored
                      ? 'COLLAPSING'
                      : phase === NavigationPhase.COLLAPSING && isChildItem
                        ? 'REENTRY'
                        : phase === NavigationPhase.EXPANDING && isChildItem
                          ? 'ENTERING'
                          : /* Stable state labels */
                            isAnchored
                            ? 'ANCHORED'
                            : isSelected
                              ? 'ACTIVE'
                              : isExpanded
                                ? 'EXPANDED'
                                : isChildItem
                                  ? 'CHILD'
                                  : 'IDLE'}
                </span>
              </div>
              <div className="text-[8px] opacity-80">
                L{level}
                {isAnchored && ` D${activePath.indexOf(item.id)}`}
              </div>
            </div>
          </div>
          {/* Arrow and line pointing down */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'h-2 w-px',
                isPromoting && phase === NavigationPhase.PROMOTING
                  ? 'bg-purple-500/60'
                  : phase === NavigationPhase.COLLAPSING
                    ? 'bg-orange-500/60'
                    : phase === NavigationPhase.EXPANDING && isChildItem
                      ? 'bg-cyan-500/60'
                      : isAnchored
                        ? 'bg-yellow-500/60'
                        : isSelected
                          ? 'bg-green-500/60'
                          : isExpanded
                            ? 'bg-blue-500/60'
                            : isChildItem
                              ? 'bg-gray-500/60'
                              : 'bg-gray-400/60'
              )}
            />
            <div
              className={cn(
                'h-0 w-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent',
                isPromoting && phase === NavigationPhase.PROMOTING
                  ? 'border-t-purple-500/60'
                  : phase === NavigationPhase.COLLAPSING
                    ? 'border-t-orange-500/60'
                    : phase === NavigationPhase.EXPANDING && isChildItem
                      ? 'border-t-cyan-500/60'
                      : isAnchored
                        ? 'border-t-yellow-500/60'
                        : isSelected
                          ? 'border-t-green-500/60'
                          : isExpanded
                            ? 'border-t-blue-500/60'
                            : isChildItem
                              ? 'border-t-gray-500/60'
                              : 'border-t-gray-400/60'
              )}
            />
          </div>
        </div>
      )}

      {/* Position Debug Info - Below with arrow pointing up */}
      {showDebug && (
        <div className="pointer-events-none absolute left-1/2 top-full mt-1 flex -translate-x-1/2 flex-col items-center">
          {/* Arrow pointing up */}
          <div className="flex flex-col items-center">
            <div className="h-0 w-0 border-b-[5px] border-l-[4px] border-r-[4px] border-b-black/60 border-l-transparent border-r-transparent" />
            <div className="h-1 w-px bg-black/60" />
          </div>
          {/* ID label */}
          <div className="whitespace-nowrap rounded bg-black/80 px-1 py-0.5 font-mono text-[8px] text-white">
            {item.id}
          </div>
        </div>
      )}
    </div>
  )
})
