// =============================================================================
// Radius Preview Select Control
// =============================================================================
// Inline select styled to match InlineSlider — label on left, radius preview
// square and value on the right. Uses Base UI Select for accessible dropdown.
// =============================================================================

'use client'

import { useState } from 'react'
import { Select } from '@base-ui/react/select'
import { cx } from '@/components/utils/cx'
import { inlineSelectStyles as styles } from '@/components/ui/core/primitives/select'
import { ScrollablePopupContent } from './scrollable-popup-content'
import type { RadiusOption } from '../tokens/radius'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface RadiusPreviewSelectProps {
  /** Label displayed on the left */
  label: string
  /** Current value */
  value: string
  /** Radius options */
  options: RadiusOption[]
  /** Change handler */
  onChange: (value: string) => void
  /** Preview square size */
  previewSize?: 'sm' | 'md' | 'lg'
  /** Whether the control is disabled */
  disabled?: boolean
  /** Additional class name */
  className?: string
}

// -----------------------------------------------------------------------------
// Radius Preview Square
// -----------------------------------------------------------------------------

interface RadiusPreviewProps {
  pixels: number
  size: 'sm' | 'md' | 'lg'
}

function RadiusPreview({ pixels, size }: RadiusPreviewProps) {
  const sizeMap = {
    sm: 14,
    md: 16,
    lg: 20,
  }
  const squareSize = sizeMap[size]

  // For "full" radius, cap at the square size (shows as quarter circle)
  const effectiveRadius = Math.min(pixels, squareSize)

  return (
    <span
      className="inline-block shrink-0 border-t-2 border-l-2 border-primary"
      style={{
        width: squareSize,
        height: squareSize,
        borderTopLeftRadius: effectiveRadius,
        background: 'linear-gradient(to bottom left, var(--color-bg-tertiary), transparent)',
      }}
    />
  )
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function RadiusPreviewSelect({
  label,
  value,
  options,
  onChange,
  previewSize = 'sm',
  disabled = false,
  className,
}: RadiusPreviewSelectProps) {
  const [open, setOpen] = useState(false)
  const safeValue = value || options[0]?.value || ''
  const selectedOption = options.find((opt) => opt.value === safeValue)

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

        {/* Radius preview + selected value on right */}
        <span className="flex items-center gap-1.5">
          {selectedOption && (
            <RadiusPreview pixels={selectedOption.pixels} size={previewSize} />
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
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={styles.popupItem}
                >
                  <span className="flex items-center gap-2">
                    <RadiusPreview pixels={option.pixels} size={previewSize} />
                    <Select.ItemText>
                      <span className="flex items-center gap-1.5">
                        <span>{option.label}</span>
                        <span className="text-tertiary text-[10px] tabular-nums">
                          {option.pixels === 9999 ? '∞' : `${option.pixels}px`}
                        </span>
                      </span>
                    </Select.ItemText>
                  </span>
                  <Select.ItemIndicator className={styles.itemIndicator}>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
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
