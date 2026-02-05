// =============================================================================
// Control Components
// =============================================================================
// Individual control primitives for the unified control panel.
// Optimized for simplicity and reusability.
// =============================================================================

'use client'

import { Children, useEffect, useState, type ReactNode } from 'react'
import { Select } from '@base-ui/react/select'
import { cx } from '@/components/utils/cx'

// React Aria
import { Switch } from 'react-aria-components'

// Core primitives
import { InlineSlider, TickSlider } from '@/components/ui/core/primitives/slider'
import { InlineSelect, inlineSelectStyles } from '@/components/ui/core/primitives/select'

// Enhanced controls
import { FontWeightSelect } from '../controls/font-weight-select'
import { ColorEnhancedSelect } from '../controls/color-enhanced-select'
import { RadiusPreviewSelect } from '../controls/radius-preview-select'
import { ScrollablePopupContent } from '../controls/scrollable-popup-content'

import type {
  ColorControl as ColorControlType,
  ColorSelectControl as ColorSelectControlType,
  ColorEnhancedSelectControl as ColorEnhancedSelectControlType,
  Control,
  FontWeightSelectControl as FontWeightSelectControlType,
  InlineSliderControl as InlineSliderControlType,
  RadiusSelectControl as RadiusSelectControlType,
  SelectControl as SelectControlType,
  SliderControl as SliderControlType,
  TextControl as TextControlType,
  ToggleControl as ToggleControlType,
} from '../types'

// -----------------------------------------------------------------------------
// Layout Components
// -----------------------------------------------------------------------------

interface ControlGroupWrapperProps {
  label: string
  description?: string
  children: ReactNode
}

export function ControlGroupWrapper({ label, description, children }: ControlGroupWrapperProps) {
  return (
    <div className="space-y-2">
      <label className="text-tertiary block text-[11px] font-medium">{label}</label>
      {children}
      {description && <p className="text-tertiary mt-1 text-xs">{description}</p>}
    </div>
  )
}

interface ControlGridProps {
  columns?: 1 | 2
  children: ReactNode
}

export function ControlGrid({ columns = 1, children }: ControlGridProps) {
  const childArray = Children.toArray(children)

  // For single column, add separators between controls
  if (columns === 1) {
    return (
      <div className="divide-y divide-secondary">
        {childArray.map((child, index) => (
          <div key={index} className="px-3 py-3">
            {child}
          </div>
        ))}
      </div>
    )
  }

  // For multi-column, keep grid layout without dividers
  return (
    <div className="grid grid-cols-2 gap-4 p-3">
      {children}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Color Swatch
// -----------------------------------------------------------------------------

interface ColorSwatchProps {
  color: string
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

export function ColorSwatch({ color, size = 'sm', className }: ColorSwatchProps) {
  const [resolvedColor, setResolvedColor] = useState(color)

  useEffect(() => {
    if (color.startsWith('var(') || color.startsWith('--')) {
      const varName = color.replace('var(', '').replace(')', '').trim()
      const computed = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
      if (computed) {
        setResolvedColor(computed)
      }
    } else {
      setResolvedColor(color)
    }
  }, [color])

  const sizeClasses = {
    xs: 'size-3 rounded',
    sm: 'size-4 rounded',
    md: 'size-5 rounded-md',
  }

  return (
    <span
      className={cx(
        'inline-block shrink-0 border border-black/10 shadow-sm',
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: resolvedColor }}
      title={color}
    />
  )
}

// -----------------------------------------------------------------------------
// Slider Control (uses InlineSlider internally)
// -----------------------------------------------------------------------------

interface SliderControlProps {
  control: SliderControlType
  onChange: (value: number) => void
}

export function SliderControl({ control, onChange }: SliderControlProps) {
  const { label, value, min, max, step, formatLabel, disabled } = control

  return (
    <InlineSlider
      label={label}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      formatLabel={formatLabel}
      disabled={disabled}
    />
  )
}

// -----------------------------------------------------------------------------
// Inline Slider Control (Re-exported from primitives)
// -----------------------------------------------------------------------------

export { InlineSlider }
export type { InlineSliderProps } from '@/components/ui/core/primitives/slider'

// -----------------------------------------------------------------------------
// Select Control
// -----------------------------------------------------------------------------

interface SelectControlProps {
  control: SelectControlType
  onChange: (value: string) => void
}

export function SelectControl({ control, onChange }: SelectControlProps) {
  const { label, value, options, disabled } = control
  const safeValue = value || options[0]?.value || ''

  return (
    <InlineSelect
      label={label}
      value={safeValue}
      options={options}
      onChange={onChange}
      disabled={disabled}
    />
  )
}

// -----------------------------------------------------------------------------
// Color Select Control (inline layout with Base UI Select)
// -----------------------------------------------------------------------------

interface ColorSelectControlProps {
  control: ColorSelectControlType
  onChange: (value: string) => void
}

export function ColorSelectControl({ control, onChange }: ColorSelectControlProps) {
  const { label, value, options, swatchSize = 'sm', disabled } = control
  const [open, setOpen] = useState(false)
  const safeValue = value || options[0]?.value || ''
  const selectedOption = options.find((opt) => opt.value === safeValue)
  const styles = inlineSelectStyles

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
          disabled && styles.disabled
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
          {selectedOption?.color && <ColorSwatch color={selectedOption.color} size={swatchSize} />}
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
                    {option.color && <ColorSwatch color={option.color} size={swatchSize} />}
                    <Select.ItemText>{option.label}</Select.ItemText>
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

// -----------------------------------------------------------------------------
// Toggle Control
// -----------------------------------------------------------------------------

interface ToggleControlProps {
  control: ToggleControlType
  onChange: (value: boolean) => void
}

export function ToggleControl({ control, onChange }: ToggleControlProps) {
  const { value, label, disabled } = control
  const checked = value ?? false

  return (
    <Switch
      isSelected={checked}
      onChange={onChange}
      isDisabled={disabled}
      className={cx(
        'group flex h-7 w-full cursor-pointer items-center justify-between rounded-md bg-tertiary px-2.5',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        disabled && 'pointer-events-none opacity-50'
      )}
    >
      <span className="text-secondary whitespace-nowrap text-[11px] font-medium">{label}</span>
      <span
        className={cx(
          'flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-150',
          'motion-reduce:transition-none',
          checked ? 'bg-fg-tertiary/80 shine-2-subtle' : 'bg-quaternary shine-2-subtle'
        )}
      >
        <span
          className={cx(
            'size-4 rounded-full transition-transform duration-150 ease-out',
            'motion-reduce:transition-none',
            checked ? 'bg-white shine-2' : 'bg-primary/80 shine-2-subtle',
            checked && 'translate-x-4'
          )}
        />
      </span>
    </Switch>
  )
}

// -----------------------------------------------------------------------------
// Color Control
// -----------------------------------------------------------------------------

interface ColorControlProps {
  control: ColorControlType
  onChange: (value: string) => void
}

export function ColorControl({ control, onChange }: ColorControlProps) {
  const { value, showValue = true, disabled } = control

  return (
    <div className={cx('flex items-center gap-2', disabled && 'opacity-50')}>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cx(
          'bg-secondary border-primary h-8 w-full cursor-pointer rounded border',
          disabled && 'cursor-not-allowed'
        )}
      />
      {showValue && <span className="text-secondary text-xs tabular-nums">{value}</span>}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Text Control
// -----------------------------------------------------------------------------

interface TextControlProps {
  control: TextControlType
  onChange: (value: string) => void
}

export function TextControl({ control, onChange }: TextControlProps) {
  const { value, placeholder, maxLength, disabled } = control

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      className={cx(
        'text-primary border-primary bg-primary focus:ring-brand focus:border-brand w-full rounded border px-3 py-2 text-xs focus:outline-none focus:ring-2',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    />
  )
}

// -----------------------------------------------------------------------------
// Control Renderer
// -----------------------------------------------------------------------------

interface ControlRendererProps {
  control: Control
  sectionId: string
  onChange: (controlId: string, value: unknown) => void
}

export function ControlRenderer({ control, sectionId, onChange }: ControlRendererProps) {
  const handleChange = (value: unknown) => onChange(control.id, value)

  // Custom controls render directly without wrapper
  if (control.type === 'custom') {
    return <div key={control.id}>{control.render()}</div>
  }

  // Slider controls render without wrapper (label is inside slider)
  // Auto-pick TickSlider when step count is ≤ 10
  if (control.type === 'slider' || control.type === 'inline-slider') {
    const sliderControl = control as SliderControlType | InlineSliderControlType
    const sliderMin = sliderControl.min ?? 0
    const sliderMax = sliderControl.max ?? 100
    const sliderStep = sliderControl.step ?? 1
    const stepCount = Math.round((sliderMax - sliderMin) / sliderStep)
    const Slider = stepCount > 0 && stepCount <= 10 ? TickSlider : InlineSlider

    return (
      <Slider
        label={sliderControl.label}
        value={sliderControl.value}
        min={sliderControl.min}
        max={sliderControl.max}
        step={sliderControl.step}
        onChange={handleChange as (v: number) => void}
        formatLabel={sliderControl.formatLabel}
        disabled={sliderControl.disabled}
      />
    )
  }

  // Select controls render without wrapper (label is inside InlineSelect)
  if (control.type === 'select') {
    return <SelectControl control={control} onChange={handleChange as (v: string) => void} />
  }

  // Toggle controls render without wrapper (label is inside ToggleControl)
  if (control.type === 'toggle') {
    return <ToggleControl control={control} onChange={handleChange as (v: boolean) => void} />
  }

  // Enhanced control types with visual previews (inline layout, no wrapper)
  if (control.type === 'font-weight-select') {
    const fwControl = control as FontWeightSelectControlType
    return (
      <FontWeightSelect
        label={control.label}
        value={fwControl.value}
        options={fwControl.options}
        onChange={handleChange as (v: string) => void}
        previewText={fwControl.previewText}
        disabled={fwControl.disabled}
      />
    )
  }

  if (control.type === 'color-enhanced-select') {
    const ceControl = control as ColorEnhancedSelectControlType
    return (
      <ColorEnhancedSelect
        label={control.label}
        value={ceControl.value}
        options={ceControl.options}
        onChange={handleChange as (v: string) => void}
        swatchSize={ceControl.swatchSize}
        showGroups={ceControl.showGroups}
        disabled={ceControl.disabled}
      />
    )
  }

  if (control.type === 'radius-select') {
    const rControl = control as RadiusSelectControlType
    return (
      <RadiusPreviewSelect
        label={control.label}
        value={rControl.value}
        options={rControl.options}
        onChange={handleChange as (v: string) => void}
        previewSize={rControl.previewSize}
        disabled={rControl.disabled}
      />
    )
  }

  // Color select with inline layout (no wrapper)
  if (control.type === 'color-select') {
    return <ColorSelectControl control={control} onChange={handleChange as (v: string) => void} />
  }

  // Remaining controls that need the wrapper
  const renderControl = () => {
    switch (control.type) {
      case 'color':
        return <ColorControl control={control} onChange={handleChange as (v: string) => void} />
      case 'text':
        return <TextControl control={control} onChange={handleChange as (v: string) => void} />
      default:
        return null
    }
  }

  return (
    <ControlGroupWrapper label={control.label} description={control.description}>
      {renderControl()}
    </ControlGroupWrapper>
  )
}
