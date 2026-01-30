/**
 * ButtonAnimation V2 - Stack Item Component
 *
 * Individual item in the stack. Handles its own rendering
 * based on context state.
 *
 * @module prod/base/button-animation-v2/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { Button } from '@/components/ui/core/primitives/button'

import { useStackContext, useLevelContext } from '../context'
import { SIZE_HEIGHT_CLASSES, getNumberLabel, ROOT_ANCHOR_ID } from '../config'
import type { StackItem as StackItemType, ButtonVariant } from '../types'

// ============================================================================
// REMOVE BUTTON
// ============================================================================

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
        'focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1',
        'motion-reduce:transition-none'
      )}
      aria-label={`Remove ${label}`}
    >
      <HugeIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
    </span>
  )
}

// ============================================================================
// STACK ITEM COMPONENT
// ============================================================================

export interface StackItemComponentProps {
  item: StackItemType
  /** Index in the current level's item list */
  index: number
  /** Array of indices leading to this item (for numbering) */
  levelIndices: number[]
  /** Whether this item is rendered as an anchored (peek-behind) item */
  isAnchored?: boolean
}

/**
 * Individual item in the stack.
 * Determines its own state (collapsed/expanded/anchored/selected)
 * based on context.
 */
export function StackItemComponent({
  item,
  index,
  levelIndices,
  isAnchored = false,
}: StackItemComponentProps) {
  const {
    activePath,
    styleConfig,
    showNumbers,
    selectItem,
    collapseToLevel,
  } = useStackContext()

  const { level } = useLevelContext()

  const hasChildren = Boolean(item.children?.length)

  // Determine item state
  const isInActivePath = activePath[level] === item.id
  const isExpanded = isInActivePath && hasChildren && !isAnchored
  const isSelected = isInActivePath && !hasChildren
  // Child items are items at level > 0 that aren't in the active path
  // (they're sibling options shown when a parent is expanded)
  const isChildItem = level > 0 && !isInActivePath
  // Root anchor (All button) at base level
  const isRootAnchor = level === 0 && item.id === ROOT_ANCHOR_ID

  // Determine variant
  let variant: ButtonVariant = styleConfig.collapsedVariant
  if (isRootAnchor && !isAnchored) {
    // All button at base level always uses shine
    variant = 'shine'
  } else if (isAnchored) {
    variant = styleConfig.anchoredVariant
  } else if (isExpanded) {
    variant = styleConfig.expandedVariant
  } else if (isSelected) {
    variant = styleConfig.selectedVariant
  } else if (isChildItem) {
    variant = styleConfig.childVariant
  }

  const heightClass = SIZE_HEIGHT_CLASSES[styleConfig.size]

  const handleSelect = () => {
    selectItem(level, item.id, hasChildren)
  }

  const handleRemove = () => {
    collapseToLevel(level)
  }

  // Number label
  const numberLabel = showNumbers ? getNumberLabel(levelIndices) : undefined

  const trailingElement =
    isExpanded ? (
      <RemoveButton label={item.label} onRemove={handleRemove} />
    ) : undefined

  // Shadow for anchored items to create depth effect
  const anchoredShadow = isAnchored
    ? 'shadow-[4px_0_8px_-2px_rgba(0,0,0,0.3)]'
    : ''

  return (
    <Button
      variant={variant}
      size={styleConfig.size}
      roundness={styleConfig.roundness}
      iconTrailing={trailingElement}
      className={cn(heightClass, anchoredShadow)}
      onClick={handleSelect}
    >
      {numberLabel && (
        <span className="mr-1.5 font-mono text-xs opacity-50">{numberLabel}</span>
      )}
      <span className="select-none">{item.label}</span>
    </Button>
  )
}
