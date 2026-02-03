// =============================================================================
// Color Enhanced Select Control
// =============================================================================
// Enhanced dropdown with larger, more prominent color swatches.
// Groups options by category with subtle dividers.
// =============================================================================

'use client'

import { useEffect, useState, Fragment } from 'react'
import { cx } from '@/components/utils/cx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/deprecated/base/primitives/select'
import type { SemanticColorOption } from '../tokens/colors'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ColorEnhancedSelectProps {
  /** Current value */
  value: string
  /** Color options */
  options: SemanticColorOption[]
  /** Change handler */
  onChange: (value: string) => void
  /** Swatch size */
  swatchSize?: 'sm' | 'md' | 'lg'
  /** Show category group headers */
  showGroups?: boolean
  /** Whether the control is disabled */
  disabled?: boolean
  /** Additional class name */
  className?: string
}

// -----------------------------------------------------------------------------
// Color Swatch with CSS Variable Resolution
// -----------------------------------------------------------------------------

interface EnhancedSwatchProps {
  cssVar: string
  size: 'sm' | 'md' | 'lg'
  className?: string
}

function EnhancedSwatch({ cssVar, size, className }: EnhancedSwatchProps) {
  const [resolvedColor, setResolvedColor] = useState<string>('#888')

  useEffect(() => {
    // Resolve CSS variable to actual color
    const computed = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
    if (computed) {
      setResolvedColor(computed)
    }
  }, [cssVar])

  const sizeClasses = {
    sm: 'size-4 rounded',
    md: 'size-5 rounded-md',
    lg: 'size-6 rounded-md',
  }

  return (
    <span
      className={cx(
        'inline-block shrink-0 border border-black/10 shadow-sm',
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: resolvedColor }}
      title={`var(${cssVar})`}
    />
  )
}

// -----------------------------------------------------------------------------
// Group Label Component
// -----------------------------------------------------------------------------

interface GroupLabelProps {
  label: string
}

function GroupLabel({ label }: GroupLabelProps) {
  return (
    <div className="text-tertiary px-2 py-1 text-[10px] font-medium uppercase tracking-wider">
      {label}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ColorEnhancedSelect({
  value,
  options,
  onChange,
  swatchSize = 'md',
  showGroups = true,
  disabled = false,
  className,
}: ColorEnhancedSelectProps) {
  const safeValue = value || options[0]?.value || ''
  const selectedOption = options.find((opt) => opt.value === safeValue)

  // Group options by category if showGroups is enabled
  const groupedOptions = showGroups
    ? {
        neutral: options.filter((c) => c.category === 'neutral'),
        brand: options.filter((c) => c.category === 'brand'),
        status: options.filter((c) => c.category === 'status'),
        other: options.filter((c) => !c.category),
      }
    : null

  const renderOption = (option: SemanticColorOption) => (
    <SelectItem key={option.value} value={option.value} className="py-2">
      <span className="flex items-center gap-3">
        <EnhancedSwatch cssVar={option.cssVar} size={swatchSize} />
        <span className="flex flex-col">
          <span className="text-xs">{option.label}</span>
          {option.description && (
            <span className="text-tertiary text-[10px]">{option.description}</span>
          )}
        </span>
      </span>
    </SelectItem>
  )

  const renderGroupedContent = () => {
    if (!groupedOptions) return options.map(renderOption)

    const groups = [
      { key: 'neutral', label: 'Neutral', items: groupedOptions.neutral },
      { key: 'brand', label: 'Brand', items: groupedOptions.brand },
      { key: 'status', label: 'Status', items: groupedOptions.status },
      { key: 'other', label: 'Other', items: groupedOptions.other },
    ].filter((g) => g.items.length > 0)

    return groups.map((group, index) => (
      <Fragment key={group.key}>
        {index > 0 && <div className="bg-secondary my-1 h-px" />}
        <div>
          <GroupLabel label={group.label} />
          {group.items.map(renderOption)}
        </div>
      </Fragment>
    ))
  }

  return (
    <Select
      value={safeValue || undefined}
      onValueChange={disabled ? undefined : onChange}
      disabled={disabled}
    >
      <SelectTrigger
        className={cx(
          'h-9 w-full px-2.5 py-1.5 text-xs',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <span className="flex items-center gap-2.5">
          {selectedOption && (
            <EnhancedSwatch cssVar={selectedOption.cssVar} size={swatchSize} />
          )}
          <span className="truncate">{selectedOption?.label || 'Select color...'}</span>
        </span>
      </SelectTrigger>
      <SelectContent className="max-h-[350px]">
        {renderGroupedContent()}
      </SelectContent>
    </Select>
  )
}
