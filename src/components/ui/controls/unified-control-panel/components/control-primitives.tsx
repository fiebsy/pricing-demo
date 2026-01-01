/**
 * Control Primitives
 *
 * Individual control components for the unified control panel
 */

'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { cx } from '@/components/utils/cx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/primitives/select'
import { Checkbox } from '@/components/ui/primitives/checkbox'
import { Slider } from '@/components/ui/primitives/slider'

import type {
  CheckboxControlConfig,
  ColorArrayControlConfig,
  ColorControlConfig,
  ColorSelectControlConfig,
  ControlConfig,
  InlineToggleControlConfig,
  SelectControlConfig,
  SliderControlConfig,
  TextControlConfig,
} from '../types'

// -----------------------------------------------------------------------------
// Layout Components
// -----------------------------------------------------------------------------

interface SectionHeaderProps {
  title: string
}

export const SectionHeader = ({ title }: SectionHeaderProps) => (
  <h4 className="text-secondary border-secondary -mx-4 mb-4 border-b px-4 pb-2 font-mono text-xs font-semibold tracking-wider uppercase">
    {title}
  </h4>
)

interface ControlGroupProps {
  label: string
  description?: string
  children: ReactNode
}

export const ControlGroup = ({ label, description, children }: ControlGroupProps) => (
  <div className="space-y-2">
    <label className="text-secondary block font-mono text-xs">{label}</label>
    {children}
    {description && <p className="text-tertiary mt-1 font-mono text-xs">{description}</p>}
  </div>
)

// -----------------------------------------------------------------------------
// Color Swatch Component
// -----------------------------------------------------------------------------

interface ColorSwatchProps {
  color: string
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

export const ColorSwatch = ({ color, size = 'sm', className }: ColorSwatchProps) => {
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
  config: SliderControlConfig
  onChange: (value: number) => void
  disabled?: boolean
}

export const SliderControl = ({ config, onChange, disabled = false }: SliderControlProps) => {
  const { value, min, max, step, formatLabel } = config
  const [inputValue, setInputValue] = useState<string>(() => {
    return formatLabel ? formatLabel(value) : `${value}`
  })
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!isTyping) {
      const formatted = formatLabel ? formatLabel(value) : `${value}`
      setInputValue(formatted)
    }
  }, [value, formatLabel, isTyping])

  const parseInputValue = (input: string): number | null => {
    if (formatLabel) {
      const match = input.match(/-?\d+\.?\d*/)
      return match ? parseFloat(match[0]) : null
    }
    const parsed = parseFloat(input)
    return isNaN(parsed) ? null : parsed
  }

  const validateAndClamp = (num: number): number => {
    return Math.max(min, Math.min(max, Math.round(num / step) * step))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true)
    setInputValue(e.target.value)
  }

  const handleInputCommit = () => {
    setIsTyping(false)
    const parsed = parseInputValue(inputValue)
    if (parsed !== null) {
      const clamped = validateAndClamp(parsed)
      onChange(clamped)
      const formatted = formatLabel ? formatLabel(clamped) : `${clamped}`
      setInputValue(formatted)
    } else {
      const formatted = formatLabel ? formatLabel(value) : `${value}`
      setInputValue(formatted)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleInputCommit()
    } else if (e.key === 'Escape') {
      setIsTyping(false)
      const formatted = formatLabel ? formatLabel(value) : `${value}`
      setInputValue(formatted)
      e.currentTarget.blur()
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
          isDisabled={disabled}
        />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputCommit}
        onKeyDown={handleInputKeyDown}
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
  config: SelectControlConfig
  onChange: (value: string) => void
  disabled?: boolean
}

export const SelectControl = ({ config, onChange, disabled = false }: SelectControlProps) => {
  const { value, options, showColorSwatch } = config

  const safeValue = (() => {
    if (value === undefined || value === null || value === '') {
      return options?.[0]?.value || ''
    }
    return String(value)
  })()

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
          <SelectValue placeholder="Select..." />
        </span>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="font-mono text-xs">
            <span className="flex items-center gap-2">
              {showColorSwatch && option.color && (
                <ColorSwatch color={option.color} size="xs" />
              )}
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
  config: ColorSelectControlConfig
  onChange: (value: string) => void
  disabled?: boolean
}

export const ColorSelectControl = ({ config, onChange, disabled = false }: ColorSelectControlProps) => {
  const { value, options, swatchSize = 'sm' } = config

  const safeValue = (() => {
    if (value === undefined || value === null || value === '') {
      return options?.[0]?.value || ''
    }
    return String(value)
  })()

  const selectedOption = options.find((opt) => opt.value === safeValue)

  return (
    <Select value={safeValue || undefined} onValueChange={disabled ? undefined : onChange} disabled={disabled}>
      <SelectTrigger
        className={cx(
          'h-9 w-full px-2 py-1.5 font-mono text-xs',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <span className="flex items-center gap-2.5">
          {selectedOption?.color && <ColorSwatch color={selectedOption.color} size={swatchSize} />}
          <span className="truncate">
            <SelectValue placeholder="Select color..." />
          </span>
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
// Checkbox Control
// -----------------------------------------------------------------------------

interface CheckboxControlProps {
  config: CheckboxControlConfig
  onChange: (value: boolean) => void
  disabled?: boolean
}

export const CheckboxControl = ({ config, onChange, disabled = false }: CheckboxControlProps) => {
  const { value } = config
  return <Checkbox size="sm" isSelected={value} onChange={onChange} isDisabled={disabled} />
}

// -----------------------------------------------------------------------------
// Inline Toggle Control
// -----------------------------------------------------------------------------

interface InlineToggleControlProps {
  config: InlineToggleControlConfig
  onChange: (value: boolean) => void
  disabled?: boolean
}

export const InlineToggleControl = ({ config, onChange, disabled = false }: InlineToggleControlProps) => {
  const { label, value } = config

  return (
    <div className={cx('flex items-center justify-between', disabled && 'opacity-50')}>
      <span className="text-secondary font-mono text-xs">{label}</span>
      <Checkbox size="sm" isSelected={value} onChange={onChange} isDisabled={disabled} />
    </div>
  )
}

// -----------------------------------------------------------------------------
// Text Control
// -----------------------------------------------------------------------------

interface TextControlProps {
  config: TextControlConfig
  onChange: (value: string) => void
  disabled?: boolean
}

export const TextControl = ({ config, onChange, disabled = false }: TextControlProps) => {
  const { value, placeholder, maxLength } = config

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
// Color Control
// -----------------------------------------------------------------------------

interface ColorControlProps {
  config: ColorControlConfig
  onChange: (value: string) => void
  disabled?: boolean
}

export const ColorControl = ({ config, onChange, disabled = false }: ColorControlProps) => {
  const { value, showValue = true } = config

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
// Color Array Control
// -----------------------------------------------------------------------------

interface ColorArrayControlProps {
  config: ColorArrayControlConfig
  onChange: (value: string[]) => void
  disabled?: boolean
}

export const ColorArrayControl = ({ config, onChange, disabled = false }: ColorArrayControlProps) => {
  const { value, count } = config

  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...value]
    newColors[index] = newColor
    onChange(newColors)
  }

  return (
    <div className={cx('grid grid-cols-2 gap-4', disabled && 'opacity-50')}>
      {Array.from({ length: count }).map((_, index) => (
        <ControlGroup key={index} label={`Color ${index + 1}`}>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value[index] || value[0]}
              onChange={(e) => handleColorChange(index, e.target.value)}
              disabled={disabled}
              className={cx(
                'bg-secondary border-primary h-8 w-full cursor-pointer rounded border',
                disabled && 'cursor-not-allowed'
              )}
            />
          </div>
        </ControlGroup>
      ))}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Control Renderer
// -----------------------------------------------------------------------------

interface ControlRendererProps {
  config: ControlConfig
  onChange: (value: unknown) => void
}

export const ControlRenderer = ({ config, onChange }: ControlRendererProps) => {
  const disabled = config.disabled || false

  switch (config.type) {
    case 'slider':
      return <SliderControl config={config} onChange={onChange as (value: number) => void} disabled={disabled} />
    case 'select':
      return <SelectControl config={config} onChange={onChange as (value: string) => void} disabled={disabled} />
    case 'checkbox':
      return <CheckboxControl config={config} onChange={onChange as (value: boolean) => void} disabled={disabled} />
    case 'color':
      return <ColorControl config={config} onChange={onChange as (value: string) => void} disabled={disabled} />
    case 'color-array':
      return <ColorArrayControl config={config} onChange={onChange as (value: string[]) => void} disabled={disabled} />
    case 'inline-toggle':
      return <InlineToggleControl config={config} onChange={onChange as (value: boolean) => void} disabled={disabled} />
    case 'color-select':
      return <ColorSelectControl config={config} onChange={onChange as (value: string) => void} disabled={disabled} />
    case 'text':
      return <TextControl config={config} onChange={onChange as (value: string) => void} disabled={disabled} />
    default:
      return null
  }
}

// -----------------------------------------------------------------------------
// Grid Layout Wrapper
// -----------------------------------------------------------------------------

interface ControlGridProps {
  columns?: 1 | 2 | 3 | 4
  children: ReactNode
}

const gridClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
} as const

export const ControlGrid = ({ columns = 1, children }: ControlGridProps) => (
  <div className={cx('grid gap-4', gridClasses[columns])}>{children}</div>
)
