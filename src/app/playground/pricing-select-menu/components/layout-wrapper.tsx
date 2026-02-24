/**
 * LayoutWrapper Component
 *
 * Wraps playground content with configurable dimensions, overflow, and header.
 * Used for testing component behavior in constrained containers.
 * Supports measuring its own width for fill mode.
 */

'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { WrapperConfig, TextColorOption, FontSizeOption, FontWeightOption, OpacityOption } from '../config/types'
import {
  getTextColorClass,
  getFontSizeClass,
  getFontWeightClass,
  getOpacityClass,
} from '../utils/style-mappers'

interface LayoutWrapperProps {
  config: WrapperConfig
  computedHeight?: number
  onWidthChange?: (width: number) => void
  children: React.ReactNode
}

export function LayoutWrapper({ config, computedHeight, onWidthChange, children }: LayoutWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Measure width and report changes
  useEffect(() => {
    if (!config.enabled || !onWidthChange) return

    const element = wrapperRef.current
    if (!element) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        onWidthChange(entry.contentRect.width)
      }
    })

    observer.observe(element)

    // Initial measurement
    onWidthChange(element.getBoundingClientRect().width)

    return () => observer.disconnect()
  }, [config.enabled, onWidthChange])

  if (!config.enabled) return <>{children}</>

  const getWidth = () => {
    switch (config.widthMode) {
      case 'fixed': return config.width
      case 'full': return '100%'
      default: return 'fit-content'
    }
  }

  const style: React.CSSProperties = {
    width: getWidth(),
    ...(computedHeight && { height: computedHeight }),
    overflow: config.overflow,
  }

  return (
    <div
      ref={wrapperRef}
      className={cn(config.showBorderLines && 'border-2 border-red-500')}
      style={style}
    >
      {config.header.show && (
        <div
          className={cn(
            getTextColorClass(config.header.textColor as TextColorOption),
            getFontSizeClass(config.header.fontSize as FontSizeOption),
            getFontWeightClass(config.header.fontWeight as FontWeightOption),
            getOpacityClass(config.header.opacity as OpacityOption)
          )}
          style={{ marginBottom: config.header.marginBottom }}
        >
          {config.header.text}
        </div>
      )}
      {children}
    </div>
  )
}
