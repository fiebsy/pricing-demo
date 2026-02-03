/**
 * StackingNav - Animated Item Component
 *
 * Individual item with state-aware animations.
 * Uses Button's iconTrailing prop for proper spacing.
 *
 * @module features/stacking-nav/components
 */

'use client'

import * as React from 'react'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { Button } from '@/components/ui/core/primitives/button'
import { cn } from '@/lib/utils'

import { useStackContext, useLevelContext } from '../context'
import { getNumberLabel, ROOT_ANCHOR_ID, HEIGHT_CLASSES } from '../config'
import { debug } from '../utils/debug'
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
  let variant: 'primary' | 'secondary' | 'tertiary' | 'shine' | 'tab' | 'link-gray' | 'link-color' = 'tertiary'
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
    debug('demotion', `${item.id} at L${level}`, {
      timestamp: `${performance.now().toFixed(2)}ms`,
      currentPath: activePath,
      collapseToLevel: level,
      expectedNewPath: activePath.slice(0, level),
    })
    collapseToLevel(level)
  }, [level, collapseToLevel, item.id, activePath])

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
        data-item-state={
          isPromoting ? 'promoting' :
          isAnchored ? 'anchored' :
          isSelected ? 'active' :
          isChildItem ? 'child' :
          isExpanded ? 'active' :
          'idle'
        }
        data-item-anchored={isAnchored}
        data-item-anchor-depth={isAnchored ? activePath.indexOf(item.id) : undefined}
      >
        {numberLabel && (
          <span className="mr-1.5 font-mono text-xs opacity-50">{numberLabel}</span>
        )}
        <span className="select-none">{item.label}</span>
      </Button>
      
      {/* Debug Status Badge - Above with arrow pointing down */}
      {(showNumbers || showDebug) && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 pointer-events-none flex flex-col items-center">
          {/* Badge */}
          <div className={cn(
            'px-1.5 py-0.5 rounded-md text-[10px] font-mono font-semibold border shadow-sm',
            isPromoting ? 'bg-purple-500 text-white border-purple-600' :
            isAnchored ? 'bg-yellow-500 text-black border-yellow-600' :
            isSelected ? 'bg-green-500 text-white border-green-600' :
            isExpanded ? 'bg-blue-500 text-white border-blue-600' :
            isChildItem ? 'bg-gray-500 text-white border-gray-600' :
            'bg-gray-300 text-gray-700 border-gray-400'
          )}>
            <div className="flex flex-col items-center gap-0.5">
              <div>
                {isPromoting ? 'PROMOTING' :
                 isAnchored ? 'ANCHORED' :
                 isSelected ? 'ACTIVE' :
                 isExpanded ? 'EXPANDED' :
                 isChildItem ? 'CHILD' :
                 'IDLE'}
              </div>
              <div className="text-[8px] opacity-80">
                L{level}
                {isAnchored && ` D${activePath.indexOf(item.id)}`}
              </div>
            </div>
          </div>
          {/* Arrow and line pointing down */}
          <div className="flex flex-col items-center">
            <div className={cn(
              'w-px h-2',
              isPromoting ? 'bg-purple-500/60' :
              isAnchored ? 'bg-yellow-500/60' :
              isSelected ? 'bg-green-500/60' :
              isExpanded ? 'bg-blue-500/60' :
              isChildItem ? 'bg-gray-500/60' :
              'bg-gray-400/60'
            )} />
            <div className={cn(
              'w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent',
              isPromoting ? 'border-t-purple-500/60' :
              isAnchored ? 'border-t-yellow-500/60' :
              isSelected ? 'border-t-green-500/60' :
              isExpanded ? 'border-t-blue-500/60' :
              isChildItem ? 'border-t-gray-500/60' :
              'border-t-gray-400/60'
            )} />
          </div>
        </div>
      )}
      
      {/* Position Debug Info - Below with arrow pointing up */}
      {showDebug && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 pointer-events-none flex flex-col items-center">
          {/* Arrow pointing up */}
          <div className="flex flex-col items-center">
            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[5px] border-l-transparent border-r-transparent border-b-black/60" />
            <div className="w-px h-1 bg-black/60" />
          </div>
          {/* ID label */}
          <div className="px-1 py-0.5 bg-black/80 text-white text-[8px] font-mono rounded whitespace-nowrap">
            {item.id}
          </div>
        </div>
      )}
    </div>
  )
})
