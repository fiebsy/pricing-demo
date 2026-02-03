'use client'

import { useEffect, useState } from 'react'
import { cx } from '@/components/utils/cx'
import { sliderConfig, inlineSliderStyles as baseStyles, tickSliderStyles as styles } from './config'
import type { InlineSliderProps } from './types'

/**
 * TickSlider
 *
 * A variant of InlineSlider that shows tick marks for each step
 * when there are 10 or fewer steps. The fill snaps between ticks
 * with a gentle locking feel.
 */
export function TickSlider({
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

  const stepCount = Math.round((max - min) / step)
  const showTicks = stepCount > 0 && stepCount <= 10

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
        baseStyles.container,
        disabled && baseStyles.disabled,
        className
      )}
    >
      {/* Tick marks - clipped to avoid label and value areas */}
      {showTicks && (
        <div className={cx(
          styles.tickClip,
          isDragging && styles.tickClipActive,
        )}>
          <div className={cx(
            styles.tickContainer,
            isDragging && styles.tickContainerActive,
          )}>
            {Array.from({ length: stepCount + 1 }, (_, i) => {
              if (i === 0 || i === stepCount) return null
              if (!isDragging) {
                const activeIndex = Math.round((value - min) / step)
                if (i === activeIndex) return null
              }
              const tickPercent = (i / stepCount) * 100
              return (
                <div
                  key={i}
                  className={styles.tick}
                  style={{ left: `${tickPercent}%` }}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Fill with draggable edge */}
      <div
        className={cx(
          baseStyles.fillWrapper,
          isDragging && styles.fillWrapperSnap,
        )}
        style={{ width: `${percentage}%` }}
      >
        {/* Fill background */}
        <div className={cx(
          baseStyles.fillBackground,
          isDragging && baseStyles.fillBackgroundActive,
        )} />

        {/* Draggable edge indicator */}
        <div
          className={baseStyles.dragHandle}
          onPointerDown={handleDrag}
        >
          <div className={cx(
            baseStyles.dragIndicator,
            isDragging && baseStyles.dragIndicatorActive,
          )} />
        </div>
      </div>

      {/* Icon + Label */}
      <div className={cx(
        baseStyles.labelContainer,
        isDragging && baseStyles.labelContainerActive,
      )}>
        {icon && <span className={baseStyles.icon}>{icon}</span>}
        <span className={baseStyles.label}>{label}</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Editable value */}
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
        className={baseStyles.input}
      />
    </div>
  )
}
