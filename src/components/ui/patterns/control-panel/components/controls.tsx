// =============================================================================
// Control Components
// =============================================================================
// Individual control primitives for the unified control panel.
// Optimized for simplicity and reusability.
// =============================================================================

'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { cx } from '@/components/utils/cx'

// Using deprecated primitives until prod/base/ Select/Slider are ready
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/deprecated/base/primitives/select'
import { Slider } from '@/components/ui/deprecated/base/primitives/slider'

// Prod components
import { Checkbox } from '@/components/ui/prod/base/checkbox'

import type {
  ColorControl as ColorControlType,
  ColorSelectControl as ColorSelectControlType,
  Control,
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
      <label className="text-secondary block font-mono text-xs">{label}</label>
      {children}
      {description && <p className="text-tertiary mt-1 font-mono text-xs">{description}</p>}
    </div>
  )
}

interface ControlGridProps {
  columns?: 1 | 2
  children: ReactNode
}

export function ControlGrid({ columns = 1, children }: ControlGridProps) {
  return (
    <div className={cx('grid gap-4', columns === 2 ? 'grid-cols-2' : 'grid-cols-1')}>
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
// Slider Control
// -----------------------------------------------------------------------------

interface SliderControlProps {
  control: SliderControlType
  onChange: (value: number) => void
}

export function SliderControl({ control, onChange }: SliderControlProps) {
  const { value, min, max, step, formatLabel, disabled } = control
  const [inputValue, setInputValue] = useState(() => formatLabel?.(value) ?? `${value}`)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!isTyping) {
      setInputValue(formatLabel?.(value) ?? `${value}`)
    }
  }, [value, formatLabel, isTyping])

  const handleInputCommit = () => {
    setIsTyping(false)
    const match = inputValue.match(/-?\d+\.?\d*/)
    if (match) {
      const parsed = parseFloat(match[0])
      const clamped = Math.max(min, Math.min(max, Math.round(parsed / step) * step))
      onChange(clamped)
      setInputValue(formatLabel?.(clamped) ?? `${clamped}`)
    } else {
      setInputValue(formatLabel?.(value) ?? `${value}`)
    }
  }

  return (
    <div className={cx('flex items-center gap-3', disabled && 'pointer-events-none opacity-50')}>
      <div className="flex-1">
        <Slider
          value={[value]}
          onChange={(val: number | number[]) => {
            const newValue = Array.isArray(val) ? val[0] : val
            if (newValue !== undefined) onChange(newValue)
          }}
          minValue={min}
          maxValue={max}
          step={step}
          labelFormatter={formatLabel ?? ((v: number) => `${v}`)}
          isDisabled={disabled}
        />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setIsTyping(true)
          setInputValue(e.target.value)
        }}
        onBlur={handleInputCommit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleInputCommit()
          } else if (e.key === 'Escape') {
            setIsTyping(false)
            setInputValue(formatLabel?.(value) ?? `${value}`)
            e.currentTarget.blur()
          }
        }}
        disabled={disabled}
        className="text-secondary border-primary bg-primary focus:ring-brand focus:border-brand w-20 rounded border px-2 py-1 text-right font-mono text-xs font-medium focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  )
}

// -----------------------------------------------------------------------------
// Select Control
// -----------------------------------------------------------------------------

interface SelectControlProps {
  control: SelectControlType
  onChange: (value: string) => void
}

export function SelectControl({ control, onChange }: SelectControlProps) {
  const { value, options, showColorSwatch, disabled } = control
  const safeValue = value || options[0]?.value || ''
  const selectedOption = options.find((opt) => opt.value === safeValue)

  return (
    <Select value={safeValue || undefined} onValueChange={disabled ? undefined : onChange} disabled={disabled}>
      <SelectTrigger
        className={cx('h-8 w-full px-2 py-1 font-mono text-xs', disabled && 'cursor-not-allowed opacity-50')}
      >
        <span className="flex items-center gap-2">
          {showColorSwatch && selectedOption?.color && (
            <ColorSwatch color={selectedOption.color} size="xs" />
          )}
          <span className="truncate">{selectedOption?.label || 'Select...'}</span>
        </span>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="font-mono text-xs">
            <span className="flex items-center gap-2">
              {showColorSwatch && option.color && <ColorSwatch color={option.color} size="xs" />}
              <span>{option.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// -----------------------------------------------------------------------------
// Color Select Control
// -----------------------------------------------------------------------------

interface ColorSelectControlProps {
  control: ColorSelectControlType
  onChange: (value: string) => void
}

export function ColorSelectControl({ control, onChange }: ColorSelectControlProps) {
  const { value, options, swatchSize = 'sm', disabled } = control
  const safeValue = value || options[0]?.value || ''
  const selectedOption = options.find((opt) => opt.value === safeValue)

  return (
    <Select value={safeValue || undefined} onValueChange={disabled ? undefined : onChange} disabled={disabled}>
      <SelectTrigger
        className={cx('h-9 w-full px-2 py-1.5 font-mono text-xs', disabled && 'cursor-not-allowed opacity-50')}
      >
        <span className="flex items-center gap-2.5">
          {selectedOption?.color && <ColorSwatch color={selectedOption.color} size={swatchSize} />}
          <span className="truncate">{selectedOption?.label || 'Select color...'}</span>
        </span>
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="py-2">
            <span className="flex items-center gap-2.5">
              {option.color && <ColorSwatch color={option.color} size={swatchSize} />}
              <span className="flex flex-col">
                <span className="font-mono text-xs">{option.label}</span>
                {option.description && (
                  <span className="text-tertiary text-[10px]">{option.description}</span>
                )}
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// -----------------------------------------------------------------------------
// Toggle Control
// -----------------------------------------------------------------------------

interface ToggleControlProps {
  control: ToggleControlType
  onChange: (value: boolean) => void
  inline?: boolean
}

export function ToggleControl({ control, onChange, inline = false }: ToggleControlProps) {
  const { value, label, disabled } = control

  if (inline) {
    return (
      <div className={cx('flex items-center justify-between', disabled && 'opacity-50')}>
        <span className="text-secondary font-mono text-xs">{label}</span>
        <Checkbox size="sm" checked={value} onCheckedChange={onChange} disabled={disabled} />
      </div>
    )
  }

  return <Checkbox size="sm" checked={value} onCheckedChange={onChange} disabled={disabled} />
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
      {showValue && <span className="text-secondary font-mono text-xs">{value}</span>}
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
        'text-primary border-primary bg-primary focus:ring-brand focus:border-brand w-full rounded border px-3 py-2 font-mono text-xs focus:ring-2 focus:outline-none',
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

  const renderControl = () => {
    switch (control.type) {
      case 'slider':
        return <SliderControl control={control} onChange={handleChange as (v: number) => void} />
      case 'select':
        return <SelectControl control={control} onChange={handleChange as (v: string) => void} />
      case 'color-select':
        return <ColorSelectControl control={control} onChange={handleChange as (v: string) => void} />
      case 'toggle':
        return <ToggleControl control={control} onChange={handleChange as (v: boolean) => void} />
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
