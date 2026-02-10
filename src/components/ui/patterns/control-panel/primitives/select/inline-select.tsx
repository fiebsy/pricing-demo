'use client'

import { useState } from 'react'
import { Select } from '@base-ui/react/select'
import { cx } from '../../utils'
import { inlineSelectStyles as styles } from './config'
import type { InlineSelectProps } from './types'

/**
 * InlineSelect
 *
 * A compact select styled to match InlineSlider — label on the left,
 * selected value on the right, dropdown on click.
 * Uses Base UI Select for accessible dropdown behavior.
 *
 * @example
 * ```tsx
 * <InlineSelect
 *   label="Shadow"
 *   value="medium"
 *   options={[
 *     { label: 'None', value: 'none' },
 *     { label: 'Medium', value: 'medium' },
 *     { label: 'Large', value: 'large' },
 *   ]}
 *   onChange={setValue}
 * />
 * ```
 */
export function InlineSelect({
  label,
  value,
  options,
  onChange,
  disabled,
  className,
}: InlineSelectProps) {
  const [open, setOpen] = useState(false)
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <Select.Root
      value={value}
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

        {/* Selected value on right — uses Select.Value for Base UI state */}
        <Select.Value className={styles.value}>
          {selectedOption?.label || 'Select...'}
        </Select.Value>

        {/* Chevron indicator */}
        <Select.Icon className={styles.chevron}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2.5 3.75L5 6.25L7.5 3.75"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
          <Select.Popup className={styles.popup}>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={styles.popupItem}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className={styles.itemIndicator}>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
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
