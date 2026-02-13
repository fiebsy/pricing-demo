// =============================================================================
// Color Enhanced Select Control
// =============================================================================
// Inline select styled to match InlineSlider — label on left, color swatch
// and value on the right. Dropdown groups options by category.
// Uses Base UI Select for accessible dropdown.
// =============================================================================

'use client'

import { useEffect, useState, Fragment } from 'react'
import { Select } from '@base-ui/react/select'
import { cx } from '../utils'
import { inlineSelectStyles as styles } from '../primitives/select'
import { ScrollablePopupContent } from './scrollable-popup-content'
import type { SemanticColorOption } from '../tokens/colors'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ColorEnhancedSelectProps {
  /** Label displayed on the left */
  label: string
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

/** Fallback color shown when CSS variable doesn't resolve */
const FALLBACK_COLOR = '#888888'

/** Track warned variables to avoid console spam */
const warnedVariables = new Set<string>()

interface EnhancedSwatchProps {
  cssVar: string
  size: 'sm' | 'md' | 'lg'
  className?: string
}

function EnhancedSwatch({ cssVar, size, className }: EnhancedSwatchProps) {
  const [resolvedColor, setResolvedColor] = useState<string>(FALLBACK_COLOR)

  useEffect(() => {
    // Resolve CSS variable to actual color
    const computed = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()

    if (computed) {
      setResolvedColor(computed)
    } else {
      // Dev warning for unresolved CSS variables
      if (process.env.NODE_ENV === 'development' && !warnedVariables.has(cssVar)) {
        warnedVariables.add(cssVar)
        console.warn(
          `[ColorEnhancedSelect] CSS variable "${cssVar}" did not resolve.\n` +
          `Check that this variable exists in theme.css.\n` +
          `Using fallback color: ${FALLBACK_COLOR}`
        )
      }
      setResolvedColor(FALLBACK_COLOR)
    }
  }, [cssVar])

  const sizeClasses = {
    sm: 'size-3.5 rounded',
    md: 'size-4 rounded',
    lg: 'size-5 rounded-md',
  }

  // Visual indicator for unresolved variables in development
  const isUnresolved = resolvedColor === FALLBACK_COLOR
  const devIndicator = process.env.NODE_ENV === 'development' && isUnresolved

  return (
    <span
      className={cx(
        'inline-block shrink-0 border shadow-sm',
        sizeClasses[size],
        devIndicator ? 'border-dashed border-red-400' : 'border-black/10',
        className
      )}
      style={{ backgroundColor: resolvedColor }}
      title={devIndicator ? `UNRESOLVED: var(${cssVar})` : `var(${cssVar})`}
    />
  )
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ColorEnhancedSelect({
  label,
  value,
  options,
  onChange,
  swatchSize = 'sm',
  showGroups = true,
  disabled = false,
  className,
}: ColorEnhancedSelectProps) {
  const [open, setOpen] = useState(false)
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
    <Select.Item
      key={option.value}
      value={option.value}
      className={styles.popupItem}
    >
      <span className="flex items-center gap-2">
        <EnhancedSwatch cssVar={option.cssVar} size={swatchSize} />
        <Select.ItemText>{option.label}</Select.ItemText>
      </span>
      <Select.ItemIndicator className={styles.itemIndicator}>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
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
          <div className={styles.popupLabel}>{group.label}</div>
          {group.items.map(renderOption)}
        </div>
      </Fragment>
    ))
  }

  return (
    <Select.Root
      value={safeValue}
      onValueChange={(v) => v !== null && onChange(v)}
      open={open}
      onOpenChange={setOpen}
      disabled={disabled}
    >
      <Select.Trigger
        className={cx(
          styles.container,
          disabled && styles.disabled,
          className
        )}
      >
        {/* Label on left */}
        <span className={styles.labelContainer}>
          <span className={styles.label}>{label}</span>
        </span>

        {/* Spacer */}
        <span className="flex-1" />

        {/* Color swatch + selected value on right */}
        <span className="flex items-center gap-1.5">
          {selectedOption && (
            <EnhancedSwatch cssVar={selectedOption.cssVar} size={swatchSize} />
          )}
          <Select.Value className={styles.value}>
            {selectedOption?.label || 'Select...'}
          </Select.Value>
        </span>

        {/* Chevron indicator */}
        <Select.Icon className={styles.chevron}>
          <ChevronIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner
          alignItemWithTrigger={false}
          side="bottom"
          align="end"
          sideOffset={4}
          collisionPadding={8}
          className="z-[99]"
        >
          <Select.Popup className={cx(styles.popup, 'p-0')}>
            <ScrollablePopupContent className="overscroll-contain p-1">
              {renderGroupedContent()}
            </ScrollablePopupContent>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

// -----------------------------------------------------------------------------
// Icons
// -----------------------------------------------------------------------------

function ChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M2.5 3.75L5 6.25L7.5 3.75"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path
        d="M13.5 4.5L6.5 11.5L3 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
