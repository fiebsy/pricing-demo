// =============================================================================
// Font Weight Select Control
// =============================================================================
// Inline select styled to match InlineSlider — label on left, weight preview
// and value on the right. Uses Base UI Select for accessible dropdown.
// =============================================================================

'use client'

import { useState } from 'react'
import { Select } from '@base-ui/react/select'
import { cx } from '../utils'
import { inlineSelectStyles as styles } from '../primitives/select'
import { ScrollablePopupContent } from './scrollable-popup-content'
import type { FontWeightOption } from '../tokens/typography'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface FontWeightSelectProps {
  /** Label displayed on the left */
  label: string
  /** Current value */
  value: string
  /** Font weight options */
  options: FontWeightOption[]
  /** Change handler */
  onChange: (value: string) => void
  /** Preview text to render in each weight */
  previewText?: string
  /** Whether the control is disabled */
  disabled?: boolean
  /** Additional class name */
  className?: string
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function FontWeightSelect({
  label,
  value,
  options,
  onChange,
  previewText = 'Aa',
  disabled = false,
  className,
}: FontWeightSelectProps) {
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

        {/* Weight preview + selected value on right */}
        <span className="flex items-center gap-1.5">
          <span
            className="text-primary text-sm leading-none"
            style={{ fontWeight: selectedOption?.weight ?? 400 }}
          >
            {previewText}
          </span>
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
                    {/* Weight preview in option */}
                    <span
                      className="text-primary w-6 text-center text-sm"
                      style={{ fontWeight: option.weight }}
                    >
                      {previewText}
                    </span>
                    <Select.ItemText>
                      <span className="flex items-center gap-1.5">
                        <span>{option.label}</span>
                        <span className="text-tertiary text-[10px] tabular-nums">
                          {option.weight}
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
