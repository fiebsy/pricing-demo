'use client'

import * as React from 'react'
import { createContext, useContext, useMemo, forwardRef } from 'react'
import { cn } from '@/lib/utils'

import type {
  DisplayCardProps,
  DisplayCardHeaderProps,
  DisplayCardContentProps,
  LayerStyle,
} from './types'
import {
  getVariant,
  BORDER_RADIUS_OUTER,
  getInnerBorderRadius,
  INNER_CONTENT_PADDING,
  backgroundStyles,
} from './config'

// =============================================================================
// CONTEXT
// =============================================================================

interface DisplayCardContextValue {
  innerStyle: LayerStyle
  innerBorderRadius: number
  innerPadding: number
}

const DisplayCardContext = createContext<DisplayCardContextValue | null>(null)

const useDisplayCardContext = () => {
  const context = useContext(DisplayCardContext)
  if (!context) {
    throw new Error('DisplayCard compound components must be used within DisplayCard')
  }
  return context
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getBackgroundClass = (value: string): string => {
  return backgroundStyles[value] ?? 'bg-primary'
}

const buildShineClass = (
  type: string,
  intensity: string,
  shadow: string
): string => {
  if (type === 'none') return ''
  let className = `shine-${type}`
  if (intensity !== 'normal') className += `-${intensity}`
  if (shadow !== 'none') className += `-shadow-${shadow}`
  return className
}

const buildDepthClass = (
  intensity: string,
  color: string,
  direction: string
): string => {
  if (intensity === 'none') return ''
  let className = `subtle-depth-${intensity}-${color}`
  if (direction !== 'bottom') className += `-${direction}`
  return className
}

const buildLayerClasses = (style: LayerStyle, borderRadius: number): string => {
  const shineClass = buildShineClass(style.shine, style.shineIntensity, style.shineShadow)
  const depthClass = buildDepthClass(style.depth, style.depthColor, style.depthDirection)
  const cornerClass = borderRadius > 0 ? 'corner-squircle' : ''

  return cn(getBackgroundClass(style.background), depthClass, cornerClass, shineClass)
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const DisplayCardRoot = forwardRef<HTMLDivElement, DisplayCardProps>(
  (
    {
      variant = 'default',
      width = 'auto',
      outerStyle,
      innerStyle,
      padding,
      className,
      children,
    },
    ref
  ) => {
    const variantConfig = getVariant(variant)

    // Merge variant with overrides
    const resolvedOuter: LayerStyle = { ...variantConfig.outer, ...outerStyle }
    const resolvedInner: LayerStyle = { ...variantConfig.inner, ...innerStyle }
    const resolvedPadding = padding ?? variantConfig.padding

    const innerBorderRadius = getInnerBorderRadius(resolvedPadding)
    const outerClasses = buildLayerClasses(resolvedOuter, BORDER_RADIUS_OUTER)

    // Width style
    const widthStyle = useMemo(() => {
      if (width === 'auto') return {}
      if (width === 'full') return { width: '100%' }
      return { width: `${width}px`, maxWidth: '100%' }
    }, [width])

    const contextValue = useMemo<DisplayCardContextValue>(
      () => ({
        innerStyle: resolvedInner,
        innerBorderRadius,
        innerPadding: INNER_CONTENT_PADDING,
      }),
      [resolvedInner, innerBorderRadius]
    )

    return (
      <DisplayCardContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(outerClasses, className)}
          style={{
            padding: `${resolvedPadding}px`,
            borderRadius: `${BORDER_RADIUS_OUTER}px`,
            ...widthStyle,
          }}
        >
          {children}
        </div>
      </DisplayCardContext.Provider>
    )
  }
)

DisplayCardRoot.displayName = 'DisplayCard'

// =============================================================================
// HEADER COMPONENT
// =============================================================================

const DisplayCardHeader = forwardRef<HTMLDivElement, DisplayCardHeaderProps>(
  ({ className, children }, ref) => {
    const { innerPadding } = useDisplayCardContext()

    return (
      <div
        ref={ref}
        className={cn('text-primary font-medium text-sm', className)}
        style={{
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: innerPadding,
          paddingRight: innerPadding,
        }}
      >
        {children}
      </div>
    )
  }
)

DisplayCardHeader.displayName = 'DisplayCard.Header'

// =============================================================================
// CONTENT COMPONENT
// =============================================================================

const DisplayCardContent = forwardRef<HTMLDivElement, DisplayCardContentProps>(
  ({ className, padding, children }, ref) => {
    const { innerStyle, innerBorderRadius, innerPadding } = useDisplayCardContext()
    const innerClasses = buildLayerClasses(innerStyle, innerBorderRadius)
    const resolvedPadding = padding ?? innerPadding

    return (
      <div
        ref={ref}
        className={cn(innerClasses, className)}
        style={{
          padding: `${resolvedPadding}px`,
          borderRadius: `${innerBorderRadius}px`,
        }}
      >
        {children}
      </div>
    )
  }
)

DisplayCardContent.displayName = 'DisplayCard.Content'

// =============================================================================
// COMPOUND EXPORT
// =============================================================================

export const DisplayCard = Object.assign(DisplayCardRoot, {
  Header: DisplayCardHeader,
  Content: DisplayCardContent,
})

export { useDisplayCardContext }
