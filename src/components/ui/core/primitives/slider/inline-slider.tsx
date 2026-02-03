'use client'

import { useEffect, useState } from 'react'
import { cx } from '@/components/utils/cx'
import { sliderConfig, inlineSliderStyles as styles } from './config'
import type { InlineSliderProps } from './types'

/**
 * InlineSlider
 * 
 * A compact slider with the label displayed inside the fill area
 * and an editable value on the right. Supports drag interaction.
 * 
 * @example
 * ```tsx
 * <InlineSlider
 *   label="Volume"
 *   value={75}
 *   onChange={setValue}
 *   formatLabel={(v) => `${v}%`}
 * />
 * ```
 */
export function InlineSlider({
  label,
  value,
  min = sliderConfig.defaultMin,
  max = sliderConfig.defaultMax,
  step = sliderConfig.defaultStep,
  onChange,
  formatLabel,
  icon,
  disabled,
  className,
}: InlineSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100
  const [inputValue, setInputValue] = useState(() => formatLabel?.(value) ?? `${value}`)
  const [isEditing, setIsEditing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!isEditing) {
      setInputValue(formatLabel?.(value) ?? `${value}`)
    }
  }, [value, formatLabel, isEditing])

  const handleInputCommit = () => {
    setIsEditing(false)
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

  const handleDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return
    e.preventDefault()
    const container = e.currentTarget.closest('[data-slider-container]') as HTMLElement
    if (!container) return
    const rect = container.getBoundingClientRect()
    setIsDragging(true)

    const updateValue = (clientX: number) => {
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const newValue = min + (x / rect.width) * (max - min)
      const stepped = Math.round(newValue / step) * step
      const clamped = Math.max(min, Math.min(max, stepped))
      onChange(clamped)
    }
    updateValue(e.clientX)

    const onMove = (moveEvent: PointerEvent) => updateValue(moveEvent.clientX)
    const onUp = () => {
      setIsDragging(false)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
  }

  return (
    <div
      data-slider-container
      className={cx(
        styles.container,
        disabled && styles.disabled,
        className
      )}
    >
      {/* Fill with draggable edge */}
      <div
        className={cx(
          styles.fillWrapper,
          isDragging && styles.fillWrapperActive,
        )}
        style={{ width: `${percentage}%` }}
      >
        {/* Fill background */}
        <div className={cx(
          styles.fillBackground,
          isDragging && styles.fillBackgroundActive,
        )} />
        
        {/* Draggable edge indicator - vertical line with wide grab area */}
        <div
          className={styles.dragHandle}
          onPointerDown={handleDrag}
        >
          <div className={cx(
            styles.dragIndicator,
            isDragging && styles.dragIndicatorActive,
          )} />
        </div>
      </div>

      {/* Icon + Label - positioned on top */}
      <div className={cx(
        styles.labelContainer,
        isDragging && styles.labelContainerActive,
      )}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{label}</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Editable value on right */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setIsEditing(true)
          setInputValue(e.target.value)
        }}
        onBlur={handleInputCommit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleInputCommit()
            e.currentTarget.blur()
          } else if (e.key === 'Escape') {
            setIsEditing(false)
            setInputValue(formatLabel?.(value) ?? `${value}`)
            e.currentTarget.blur()
          }
        }}
        disabled={disabled}
        className={styles.input}
      />
    </div>
  )
}
