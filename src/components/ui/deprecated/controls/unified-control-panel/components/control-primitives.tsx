/**
 * Control Primitives
 *
 * Individual control components for the unified control panel
 */

'use client'

import React, { ReactNode, useEffect, useState, memo, useCallback } from 'react'
import { cx } from '@/components/utils/cx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Slider,
} from '@/components/ui/base/primitives'

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

export const SectionHeader = memo(({ title }: SectionHeaderProps) => (
  <h4 className="text-secondary border-secondary -mx-4 mb-4 border-b px-4 pb-2 font-mono text-xs font-semibold tracking-wider uppercase">
    {title}
  </h4>
))
SectionHeader.displayName = 'SectionHeader'

interface ControlGroupProps {
  label: string
  description?: string
  children: ReactNode
}

export const ControlGroup = memo(({ label, description, children }: ControlGroupProps) => (
  <div className="space-y-2">
    <label className="text-secondary block font-mono text-xs">{label}</label>
    {children}
    {description && <p className="text-tertiary mt-1 font-mono text-xs">{description}</p>}
  </div>
))
ControlGroup.displayName = 'ControlGroup'

// -----------------------------------------------------------------------------
// Color Swatch Component
// -----------------------------------------------------------------------------

interface ColorSwatchProps {
  color: string
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

export const ColorSwatch = memo(({ color, size = 'sm', className }: ColorSwatchProps) => {
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
})
ColorSwatch.displayName = 'ColorSwatch'

// -----------------------------------------------------------------------------
// Slider Control
// -----------------------------------------------------------------------------

interface SliderControlProps {
  config: SliderControlConfig
  onChange: (value: number) => void
  disabled?: boolean
}

export const SliderControl = memo(({ config, onChange, disabled = false }: SliderControlProps) => {
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

  const parseInputValue = useCallback((input: string): number | null => {
    if (formatLabel) {
      const match = input.match(/-?\d+\.?\d*/)
      return match ? parseFloat(match[0]) : null
    }
    const parsed = parseFloat(input)
    return isNaN(parsed) ? null : parsed
  }, [formatLabel])

  const validateAndClamp = useCallback((num: number): number => {
    return Math.max(min, Math.min(max, Math.round(num / step) * step))
  }, [min, max, step])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true)
    setInputValue(e.target.value)
  }, [])

  const handleInputCommit = useCallback(() => {
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
  }, [parseInputValue, validateAndClamp, inputValue, onChange, formatLabel, value])

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleInputCommit()
    } else if (e.key === 'Escape') {
      setIsTyping(false)
      const formatted = formatLabel ? formatLabel(value) : `${value}`
      setInputValue(formatted)
      e.currentTarget.blur()
    }
  }, [handleInputCommit, formatLabel, value])

  const handleSliderChange = useCallback((val: number | number[]) => {
    const newValue = Array.isArray(val) ? val[0] : val
    if (newValue !== undefined) onChange(newValue)
  }, [onChange])

  return (
    <div className={cx('flex items-center gap-3', disabled && 'pointer-events-none opacity-50')}>
      <div className="flex-1">
        <Slider
          value={[value]}
          onChange={handleSliderChange}
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
})
SliderControl.displayName = 'SliderControl'

// -----------------------------------------------------------------------------
// Select Control
// -----------------------------------------------------------------------------

interface SelectControlProps {
  config: SelectControlConfig
  onChange: (value: string) => void
  disabled?: boolean
}

export const SelectControl = memo(({ config, onChange, disabled = false }: SelectControlProps) => {
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
})
SelectControl.displayName = 'SelectControl'

// -----------------------------------------------------------------------------
// Color Select Control
// -----------------------------------------------------------------------------

interface ColorSelectControlProps {
  config: ColorSelectControlConfig
  onChange: (value: string) => void
  disabled?: boolean
}

export const ColorSelectControl = memo(({ config, onChange, disabled = false }: ColorSelectControlProps) => {
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
})
ColorSelectControl.displayName = 'ColorSelectControl'

// -----------------------------------------------------------------------------
// Checkbox Control
// -----------------------------------------------------------------------------

interface CheckboxControlProps {
  config: CheckboxControlConfig
  onChange: (value: boolean) => void
  disabled?: boolean
}

export const CheckboxControl = memo(({ config, onChange, disabled = false }: CheckboxControlProps) => {
  const { value } = config
  return <Checkbox size="sm" isSelected={value} onChange={onChange} isDisabled={disabled} />
})
CheckboxControl.displayName = 'CheckboxControl'

// -----------------------------------------------------------------------------
// Inline Toggle Control
// -----------------------------------------------------------------------------

interface InlineToggleControlProps {
  config: InlineToggleControlConfig
  onChange: (value: boolean) => void
  disabled?: boolean
}

export const InlineToggleControl = memo(({ config, onChange, disabled = false }: InlineToggleControlProps) => {
  const { label, value } = config

  return (
    <div className={cx('flex items-center justify-between', disabled && 'opacity-50')}>
      <span className="text-secondary font-mono text-xs">{label}</span>
      <Checkbox size="sm" isSelected={value} onChange={onChange} isDisabled={disabled} />
    </div>
  )
})
InlineToggleControl.displayName = 'InlineToggleControl'

// -----------------------------------------------------------------------------
// Text Control
// -----------------------------------------------------------------------------

interface TextControlProps {
  config: TextControlConfig
  onChange: (value: string) => void
  disabled?: boolean
}

export const TextControl = memo(({ config, onChange, disabled = false }: TextControlProps) => {
  const { value, placeholder, maxLength } = config

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      className={cx(
        'text-primary border-primary bg-primary focus:ring-brand focus:border-brand w-full rounded border px-3 py-2 font-mono text-xs focus:ring-2 focus:outline-none',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    />
  )
})
TextControl.displayName = 'TextControl'

// -----------------------------------------------------------------------------
// Color Control
// -----------------------------------------------------------------------------

interface ColorControlProps {
  config: ColorControlConfig
  onChange: (value: string) => void
  disabled?: boolean
}

export const ColorControl = memo(({ config, onChange, disabled = false }: ColorControlProps) => {
  const { value, showValue = true } = config

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <div className={cx('flex items-center gap-2', disabled && 'opacity-50')}>
      <input
        type="color"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cx(
          'bg-secondary border-primary h-8 w-full cursor-pointer rounded border',
          disabled && 'cursor-not-allowed'
        )}
      />
      {showValue && <span className="text-secondary font-mono text-xs">{value}</span>}
    </div>
  )
})
ColorControl.displayName = 'ColorControl'

// -----------------------------------------------------------------------------
// Color Array Control
// -----------------------------------------------------------------------------

interface ColorArrayControlProps {
  config: ColorArrayControlConfig
  onChange: (value: string[]) => void
  disabled?: boolean
}

export const ColorArrayControl = memo(({ config, onChange, disabled = false }: ColorArrayControlProps) => {
  const { value, count } = config

  const handleColorChange = useCallback((index: number, newColor: string) => {
    const newColors = [...value]
    newColors[index] = newColor
    onChange(newColors)
  }, [value, onChange])

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
})
ColorArrayControl.displayName = 'ColorArrayControl'

// -----------------------------------------------------------------------------
// Control Registry
// -----------------------------------------------------------------------------

import { useControlRegistry, registerControl, type ControlComponent } from '../registry/control-registry'

/**
 * Built-in control type to component mapping
 * Used as fallback if registry lookup fails
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BUILT_IN_CONTROLS: Record<string, ControlComponent<any>> = {
  slider: SliderControl,
  select: SelectControl,
  checkbox: CheckboxControl,
  color: ColorControl,
  'color-array': ColorArrayControl,
  'inline-toggle': InlineToggleControl,
  'color-select': ColorSelectControl,
  text: TextControl,
}

// Register built-in controls with the registry
Object.entries(BUILT_IN_CONTROLS).forEach(([type, component]) => {
  registerControl(type, component)
})

// -----------------------------------------------------------------------------
// Control Renderer
// -----------------------------------------------------------------------------

interface ControlRendererProps {
  config: ControlConfig
  onChange: (value: unknown) => void
}

export const ControlRenderer = memo(({ config, onChange }: ControlRendererProps) => {
  const registry = useControlRegistry()
  const disabled = config.disabled || false

  // Try registry first, then fall back to built-in
  const Component = registry.get(config.type) || BUILT_IN_CONTROLS[config.type]

  if (!Component) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[ControlRenderer] Unknown control type: "${config.type}"`)
    }
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Component config={config as any} onChange={onChange} disabled={disabled} />
})
ControlRenderer.displayName = 'ControlRenderer'

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

export const ControlGrid = memo(({ columns = 1, children }: ControlGridProps) => (
  <div className={cx('grid gap-4', gridClasses[columns])}>{children}</div>
))
ControlGrid.displayName = 'ControlGrid'
