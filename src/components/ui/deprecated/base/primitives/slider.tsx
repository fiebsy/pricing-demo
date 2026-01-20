/**
 * Slider Component
 *
 * Range slider using @base-ui/react.
 */

'use client'

import * as React from 'react'
import { Slider as BaseSlider } from '@base-ui/react/slider'
import { cx } from '@/components/utils/cx'

interface SliderProps {
  value: number[]
  onChange: (value: number | number[]) => void
  minValue?: number
  maxValue?: number
  step?: number
  isDisabled?: boolean
  labelFormatter?: (value: number) => string
  className?: string
}

export function Slider({
  value,
  onChange,
  minValue = 0,
  maxValue = 100,
  step = 1,
  isDisabled = false,
  className,
}: SliderProps) {
  const handleValueChange = React.useCallback(
    (newValue: number | readonly number[]) => {
      if (typeof newValue === 'number') {
        onChange([newValue])
      } else {
        onChange([...newValue])
      }
    },
    [onChange]
  )

  return (
    <BaseSlider.Root
      value={value}
      onValueChange={handleValueChange}
      min={minValue}
      max={maxValue}
      step={step}
      disabled={isDisabled}
      className={cx(
        'relative flex w-full touch-none select-none items-center',
        isDisabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <BaseSlider.Control className="relative flex h-5 w-full items-center">
        <BaseSlider.Track className="bg-tertiary relative h-1.5 w-full grow rounded-full">
          <BaseSlider.Indicator className="bg-brand-solid absolute h-full rounded-full" />
          <BaseSlider.Thumb
            className={cx(
              'block size-4 rounded-full bg-primary shadow-md',
              'ring-1 ring-inset ring-fg-quaternary/80',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand',
              'transition-colors',
              !isDisabled && 'cursor-grab active:cursor-grabbing'
            )}
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}
