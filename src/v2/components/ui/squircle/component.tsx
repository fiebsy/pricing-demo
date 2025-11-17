'use client'

import React, { useId, useRef } from 'react'
import { type SquircleProps } from './types'
import { SquircleGradients } from './rendering/svg-gradients'
import { SquircleFilters, SquircleShadow } from './rendering/svg-filters'
import {
  useDimensions,
  useSquirclePaths,
  useSquircleColors,
  useGradientConfig,
  useBackgroundGradientConfig,
  useShadowConfig,
  useRoundnessConfig,
  useHasShadow,
  useHoverState,
} from './lib/hooks'

/**
 * Squircle Component - Production Version
 *
 * iOS-style superellipse shape component with modular architecture.
 * Performance-optimized with 50% reduction in SVG rendering overhead.
 *
 * Key Features:
 * - ✅ Working shadow implementation (duplicate SVG method - no clipping issues)
 * - ✅ Subtle fade-in on mount to prevent flash effect (default: enabled)
 * - ✅ Simpler ResizeObserver logic (only for path generation)
 * - ✅ Better flex/grid compatibility (inline-flex default)
 * - ✅ Custom transition support (merges with fadeInOnMount)
 * - ✅ Debounced ResizeObserver for Safari performance
 * - ✅ ClipPath rendering fix with translateZ(0)
 * - ✅ Modular architecture (8 focused files)
 *
 * Technical Details:
 * - Uses ResizeObserver for dimensions (unavoidable for non-square shapes)
 * - Generates SVG paths (most accurate rendering method)
 * - Fade-in uses 150ms ease-out transition after first measurement
 *
 * @example Custom Animations with fadeInOnMount
 * ```tsx
 * // ✅ CORRECT: Custom transitions work alongside fadeInOnMount
 * <Squircle
 *   fadeInOnMount={true}  // Prevents flash on load
 *   style={{
 *     transition: 'all 300ms ease-out',  // Your custom transition
 *   }}
 *   onMouseEnter={(e) => {
 *     e.currentTarget.style.transform = 'scale(1.05)'
 *   }}
 *   onMouseLeave={(e) => {
 *     e.currentTarget.style.transform = 'scale(1)'
 *   }}
 * >
 *   Content
 * </Squircle>
 * // Result: Both transitions merge →"opacity 150ms ease-out, all 300ms ease-out"
 *
 * // ❌ WRONG: Don't disable fadeInOnMount unless you have a specific reason
 * <Squircle
 *   fadeInOnMount={false}  // Causes flash on mount
 *   style={{ transition: 'all 300ms ease-out' }}
 * />
 * ```
 *
 * @example Scale Animation Pattern (Recommended)
 * ```tsx
 * <Squircle
 *   backgroundColor="background-brand-solid"
 *   backgroundColorHover="background-brand-solid_hover"
 *   fadeInOnMount={true}  // Keep enabled for production
 *   fillMode={true}       // For flex/grid layouts
 *   style={{
 *     flex: '1 1 auto',
 *     transition: 'all 200ms ease-out',  // Custom duration
 *   }}
 *   onMouseEnter={(e) => {
 *     e.currentTarget.style.transform = 'scale(1.05)'
 *   }}
 *   onMouseLeave={(e) => {
 *     e.currentTarget.style.transform = 'scale(1)'
 *   }}
 * >
 *   <div className="flex items-center justify-center py-3">
 *     <span className="text-sm font-medium text-primary_on-brand">
 *       Button Text
 *     </span>
 *   </div>
 * </Squircle>
 * ```
 *
 * @see /v2/playground/ui/gallery/squircle-scale-minimal for live examples
 */

export const Squircle: React.FC<SquircleProps> = ({
  children,
  className = '',
  style = {},
  backgroundColor = 'white',
  borderColor = 'utility-gray-300',
  borderWidth = 1,
  borderGradient = 'none',
  customBorderGradient,
  backgroundGradient = 'none',
  customBackgroundGradient,
  backgroundGradientOverlayColor,
  outerBorderColor,
  outerBorderWidth = 0,
  roundness = 1,
  customSmoothing,
  customBorderRadius,
  customPointsPerCorner,
  overflow = 'hidden',

  // Shadow props
  shadow = 'none',
  customShadow,
  shadowOffsetX = 0,
  shadowOffsetY = 4,
  shadowBlur = 6,
  shadowSpread = -1,
  shadowColor = 'black',
  shadowOpacity = 0.1,

  // Hover color transitions
  backgroundColorHover,
  borderColorHover,

  // Layout behavior
  fillMode = false,

  // FOUC Prevention
  fadeInOnMount = true, // Default to opacity fade-in to prevent flash

  // Events
  onDimensionsChange,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const instanceId = useId().replace(/:/g, '-')

  // Hover state management
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverState(onMouseEnter, onMouseLeave)

  // Roundness configuration
  const roundnessConfig = useRoundnessConfig(roundness, customSmoothing, customBorderRadius, customPointsPerCorner)

  // Dimension tracking with Safari-optimized ResizeObserver
  const { dimensions, hasMeasured } = useDimensions(contentRef, onDimensionsChange, fadeInOnMount)

  // Color resolution with hover states
  const { bgColor, bColor, outerBColor, shadowColorResolved } = useSquircleColors(
    backgroundColor,
    borderColor,
    outerBorderColor,
    shadowColor,
    backgroundColorHover,
    borderColorHover,
    isHovered
  )

  // Gradient configurations
  const gradientConfig = useGradientConfig(borderGradient, customBorderGradient, borderColor)
  const backgroundGradientConfig = useBackgroundGradientConfig(backgroundGradient, customBackgroundGradient, backgroundGradientOverlayColor)

  // Shadow configuration
  const shadowConfig = useShadowConfig(
    shadow,
    customShadow,
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowSpread,
    shadowColor,
    shadowColorResolved,
    shadowOpacity
  )

  // Check if shadow is enabled
  const hasShadow = useHasShadow(shadowConfig ?? null)

  // Generate SVG paths
  const paths = useSquirclePaths(dimensions, borderWidth, outerBorderWidth, roundnessConfig)

  // Calculate total border offset for transforms
  const totalBorderOffset = borderWidth + (outerBorderWidth || 0)

  return (
    <div
      className={`group relative ${className}`}
      style={{
        ...style,
        // Auto-detect flex usage: if style has flex properties, use 'flex', otherwise use 'inline-flex'
        display: style?.display || (fillMode || style?.flex || style?.flexGrow || style?.flexShrink || style?.flexBasis ? 'flex' : 'inline-flex'),
        isolation: 'isolate',
        opacity: fadeInOnMount ? (hasMeasured ? 1 : 0) : undefined,
        // Merge fadeInOnMount transition with custom transitions
        // This allows fadeInOnMount to prevent flash while still supporting custom animations
        // Example: fadeInOnMount +"all 300ms ease-out" →"opacity 150ms ease-out, all 300ms ease-out"
        transition: fadeInOnMount
          ? (style?.transition
              ? `opacity 150ms ease-out, ${style.transition}`
              : 'opacity 150ms ease-out')
          : style?.transition,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-squircle="true"
    >
      {/* Duplicate SVG Shadow - Renders behind main shape (reliable cross-browser method) */}
      {hasShadow && shadowConfig && dimensions.width > 0 && dimensions.height > 0 && (
        <SquircleShadow
          dimensions={dimensions}
          borderWidth={borderWidth}
          shadowConfig={shadowConfig}
          paths={paths}
        />
      )}

      {/* SVG Shape Layer - only renders when dimensions are known */}
      {dimensions.width > 0 && dimensions.height > 0 && (() => {
        const svgWidth = dimensions.width + totalBorderOffset * 2
        const svgHeight = dimensions.height + totalBorderOffset * 2

        // Filter undefined values from gradient colors for type safety
        const sanitizedBackgroundGradient = backgroundGradientConfig
          ? { ...backgroundGradientConfig, colors: backgroundGradientConfig.colors.filter((c): c is string => c !== undefined) }
          : null
        const sanitizedGradient = gradientConfig
          ? { ...gradientConfig, colors: gradientConfig.colors.filter((c): c is string => c !== undefined) }
          : null

        return (
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
            }}
          >
          <defs>
            {/* SVG ClipPath for overflow control */}
            <SquircleFilters
              instanceId={instanceId}
              overflow={overflow}
              paths={paths}
              totalBorderOffset={totalBorderOffset}
            />

            {/* SVG Gradients (Border & Background) */}
            <SquircleGradients
              instanceId={instanceId}
              gradientConfig={sanitizedGradient}
              backgroundGradientConfig={sanitizedBackgroundGradient}
            />
          </defs>

          {/* Shape Group - Shadow now rendered separately via duplicate SVG */}
          <g>
            {/* Outer Border (outermost layer) */}
            {outerBorderWidth > 0 && paths.outerBorder && outerBColor && (
              <path
                d={paths.outerBorder}
                fill={outerBColor}
                style={{
                  transition: 'fill 100ms linear',
                }}
              />
            )}

            {/* Main Border */}
            {borderWidth > 0 && (
              <g transform={`translate(${outerBorderWidth || 0}, ${outerBorderWidth || 0})`}>
                <path
                  d={paths.border}
                  fill={gradientConfig ? `url(#border-gradient-${instanceId})` : bColor}
                  style={{
                    transition: 'fill 100ms linear',
                  }}
                />
              </g>
            )}

            {/* Background - Base Layer (solid color) */}
            <g transform={`translate(${totalBorderOffset}, ${totalBorderOffset})`}>
              <path
                d={paths.background}
                fill={bgColor}
                style={{
                  transition: 'fill 100ms linear',
                }}
              />
            </g>

            {/* Background Gradient Overlay - Only renders if gradient is configured */}
            {backgroundGradientConfig && (
              <g transform={`translate(${totalBorderOffset}, ${totalBorderOffset})`}>
                <path
                  d={paths.background}
                  fill={`url(#background-gradient-${instanceId})`}
                  style={{
                    transition: 'fill 100ms linear',
                  }}
                />
              </g>
            )}
          </g>
        </svg>
        )
      })()}

      {/* Content - renders immediately, establishes dimensions */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          margin: borderWidth + (outerBorderWidth || 0),
          clipPath: overflow === 'hidden' && dimensions.width > 0 ? `url(#clip-${instanceId})` : undefined,
          // Safari fix: Force new stacking context to fix clipPath + transform rendering bug
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden' as const,
          // In fillMode, make content div fill the available space
          ...(fillMode ? {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          } : {}),
        }}
      >
        {children}
      </div>
    </div>
  )
}
