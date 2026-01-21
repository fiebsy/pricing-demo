/**
 * ButtonAnimation - Chip Component
 *
 * Reusable chip/pill button used for both parent and child items.
 * Built on the base Button component with consistent sizing and interaction.
 *
 * @module prod/base/button-animation/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { Button } from '@/components/ui/prod/base/button'

import type { ChipProps } from '../types'
import { SIZE_HEIGHT_CLASSES } from '../config'

// ============================================================================
// REMOVE BUTTON
// ============================================================================

interface RemoveButtonProps {
  label: string
  onRemove: () => void
}

/**
 * Accessible remove button with X icon.
 * Handles click isolation and keyboard interaction.
 */
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
// TEXT CONTENT
// ============================================================================

interface TextContentProps {
  label: string
  number?: string
}

/**
 * Chip text content with optional number prefix.
 */
function TextContent({ label, number }: TextContentProps) {
  return (
    <>
      {number && (
        <span className="mr-1.5 font-mono text-xs opacity-50">{number}</span>
      )}
      <span className="select-none">{label}</span>
    </>
  )
}

// ============================================================================
// CHIP COMPONENT
// ============================================================================

/**
 * Chip component for expandable navigation items.
 *
 * Renders as either a button or anchor based on props.
 * Supports optional remove button for expanded state.
 *
 * @example
 * ```tsx
 * // Parent chip (collapsed)
 * <Chip
 *   label="Design"
 *   variant="tertiary"
 *   size="md"
 *   roundness="default"
 *   onSelect={() => handleSelect('design')}
 * />
 *
 * // Parent chip (expanded with remove)
 * <Chip
 *   label="Design"
 *   variant="shine"
 *   size="md"
 *   roundness="default"
 *   showRemove
 *   onSelect={() => handleSelect('design')}
 *   onRemove={() => handleCollapse()}
 * />
 *
 * // Child chip
 * <Chip
 *   label="Figma"
 *   number="1a"
 *   variant="link-gray"
 *   size="md"
 *   roundness="default"
 *   onSelect={() => handleSelectChild('figma')}
 * />
 * ```
 */
export function Chip({
  label,
  variant,
  size,
  roundness,
  number,
  asLink,
  href,
  showRemove = false,
  onSelect,
  onRemove,
}: ChipProps) {
  // Fixed height class ensures consistent chip heights
  const heightClass = SIZE_HEIGHT_CLASSES[size]

  // Trailing element (remove button when expanded)
  const trailingElement =
    showRemove && onRemove ? (
      <RemoveButton label={label} onRemove={onRemove} />
    ) : undefined

  // Link variant - renders as anchor
  if (asLink && href) {
    return (
      <Button
        variant={variant}
        size={size}
        roundness={roundness}
        iconTrailing={trailingElement}
        className={heightClass}
        asChild
        href={href}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault()
          onSelect()
        }}
      >
        <TextContent label={label} number={number} />
      </Button>
    )
  }

  // Button variant (default)
  return (
    <Button
      variant={variant}
      size={size}
      roundness={roundness}
      iconTrailing={trailingElement}
      className={heightClass}
      onClick={onSelect}
    >
      <TextContent label={label} number={number} />
    </Button>
  )
}
