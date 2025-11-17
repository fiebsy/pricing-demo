import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { generateSquirclePathV3, getColorValue } from './utils'
import { GRADIENT_BORDER_PRESETS, BACKGROUND_GRADIENT_PRESETS, ROUNDNESS_LEVELS, SHADOW_PRESETS } from './constants'
import type {
  RoundnessConfig,
  GradientBorderConfig,
  CustomShadowConfig,
  BorderGradientPreset,
  BackgroundGradientPreset
} from '../types'

/**
 * Hook to track element dimensions using ResizeObserver
 * Safari optimized with debouncing to prevent excessive path regeneration
 */
export function useDimensions(
  contentRef: React.RefObject<HTMLDivElement | null>,
  onDimensionsChange?: (width: number, height: number) => void,
  fadeInOnMount?: boolean
) {
  const resizeTimeoutRef = useRef<number | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hasMeasured, setHasMeasured] = useState(!fadeInOnMount)

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const resizeObserver = new ResizeObserver((entries) => {
      // Cancel any pending update
      if (resizeTimeoutRef.current !== null) {
        cancelAnimationFrame(resizeTimeoutRef.current)
      }

      // Schedule update for next frame (Safari optimization)
      resizeTimeoutRef.current = requestAnimationFrame(() => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          const newWidth = Math.ceil(width)
          const newHeight = Math.ceil(height)

          // Only update if change is significant (> 1px) to prevent excessive recalculation
          const widthDiff = Math.abs(newWidth - dimensions.width)
          const heightDiff = Math.abs(newHeight - dimensions.height)

          if (widthDiff > 1 || heightDiff > 1 || (newWidth > 0 && dimensions.width === 0)) {
            setDimensions({ width: newWidth, height: newHeight })
            onDimensionsChange?.(newWidth, newHeight)

            // Trigger fade-in after first measurement (on next frame to avoid double render)
            if (fadeInOnMount && !hasMeasured) {
              requestAnimationFrame(() => {
                setHasMeasured(true)
              })
            }
          }
        }
        resizeTimeoutRef.current = null
      })
    })

    resizeObserver.observe(element)
    return () => {
      resizeObserver.disconnect()
      if (resizeTimeoutRef.current !== null) {
        cancelAnimationFrame(resizeTimeoutRef.current)
      }
    }
  }, [dimensions.width, dimensions.height, onDimensionsChange, fadeInOnMount, hasMeasured, contentRef])

  return { dimensions, hasMeasured }
}

/**
 * Hook to generate SVG paths for squircle shapes
 * Memoized to prevent unnecessary recalculation
 */
export function useSquirclePaths(
  dimensions: { width: number; height: number },
  borderWidth: number,
  outerBorderWidth: number,
  roundnessConfig: RoundnessConfig
) {
  return useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) {
      return { background: '', border: '', outerBorder: '' }
    }

    // Calculate total offset including outer border
    const totalBorderOffset = borderWidth + (outerBorderWidth || 0)

    // Outer border path (outermost layer)
    const outerBorderPath = (outerBorderWidth && outerBorderWidth > 0) ? generateSquirclePathV3(
      dimensions.width + totalBorderOffset * 2,
      dimensions.height + totalBorderOffset * 2,
      roundnessConfig,
      0,
      0,
      'balanced'
    ) : ''

    // Main border path
    const outerWidth = dimensions.width + borderWidth * 2
    const outerHeight = dimensions.height + borderWidth * 2

    const borderPath = generateSquirclePathV3(
      outerWidth,
      outerHeight,
      roundnessConfig,
      0,
      0,
      'balanced'
    )

    // Background path (innermost)
    const innerBorderRadius = Math.max(1, roundnessConfig.borderRadius - borderWidth)
    const innerConfig = {
      ...roundnessConfig,
      borderRadius: innerBorderRadius,
    }

    const backgroundPath = generateSquirclePathV3(
      dimensions.width,
      dimensions.height,
      innerConfig,
      0,
      0,
      'balanced'
    )

    return { background: backgroundPath, border: borderPath, outerBorder: outerBorderPath }
  }, [dimensions, borderWidth, outerBorderWidth, roundnessConfig])
}

/**
 * Hook to resolve and manage color values with hover states
 */
export function useSquircleColors(
  backgroundColor: string,
  borderColor: string,
  outerBorderColor: string | undefined,
  shadowColor: string,
  backgroundColorHover: string | undefined,
  borderColorHover: string | undefined,
  isHovered: boolean
) {
  return useMemo(() => ({
    bgColor: getColorValue(isHovered && backgroundColorHover ? backgroundColorHover : backgroundColor),
    bColor: getColorValue(isHovered && borderColorHover ? borderColorHover : borderColor),
    outerBColor: outerBorderColor ? getColorValue(outerBorderColor) : undefined,
    shadowColorResolved: getColorValue(shadowColor),
  }), [backgroundColor, borderColor, outerBorderColor, shadowColor, backgroundColorHover, borderColorHover, isHovered])
}

/**
 * Hook to get gradient border configuration with dynamic border color
 */
export function useGradientConfig(
  borderGradient: BorderGradientPreset,
  customBorderGradient: GradientBorderConfig | undefined,
  borderColor: string
) {
  return useMemo(() => {
    if (borderGradient === 'custom' && customBorderGradient) {
      return customBorderGradient
    } else if (borderGradient === 'none') {
      return null
    } else {
      const preset = GRADIENT_BORDER_PRESETS[borderGradient]
      if (!preset) return null

      // Replace preset colors with actual borderColor (using opacity for variation)
      return {
        ...preset,
        colors: preset.colors.map(() => borderColor), // Use selected border color
        useOpacityGradient: true, // Flag to use opacity variation
      }
    }
  }, [borderGradient, customBorderGradient, borderColor])
}

/**
 * Hook to get background gradient configuration with overlay color support
 */
export function useBackgroundGradientConfig(
  backgroundGradient: BackgroundGradientPreset,
  customBackgroundGradient: GradientBorderConfig | undefined,
  backgroundGradientOverlayColor: string | undefined
) {
  return useMemo(() => {
    if (backgroundGradient === 'custom' && customBackgroundGradient) {
      // Use overlay color if provided, otherwise use the gradient's color
      const overlayColor = backgroundGradientOverlayColor || customBackgroundGradient.colors[0]
      return {
        ...customBackgroundGradient,
        colors: [overlayColor],
      }
    } else if (backgroundGradient === 'none') {
      return null
    } else {
      const preset = BACKGROUND_GRADIENT_PRESETS[backgroundGradient]
      if (!preset) return null

      // Use overlay color if provided, otherwise use preset's color
      const overlayColor = backgroundGradientOverlayColor || preset.colors[0]
      return {
        ...preset,
        colors: [overlayColor],
      }
    }
  }, [backgroundGradient, customBackgroundGradient, backgroundGradientOverlayColor])
}

/**
 * Hook to get shadow configuration
 */
export function useShadowConfig(
  shadow: string,
  customShadow: CustomShadowConfig | undefined,
  shadowOffsetX: number,
  shadowOffsetY: number,
  shadowBlur: number,
  shadowSpread: number,
  shadowColor: string,
  shadowColorResolved: string,
  shadowOpacity: number
) {
  return useMemo(() => {
    if (shadow === 'custom' && customShadow) {
      return customShadow
    } else if (shadow === 'none') {
      return SHADOW_PRESETS.none
    } else {
      const preset = SHADOW_PRESETS[shadow] || SHADOW_PRESETS.none
      if (!preset) return SHADOW_PRESETS.none
      return {
        offsetX: shadowOffsetX !== 0 ? shadowOffsetX : preset.offsetX,
        offsetY: shadowOffsetY !== 4 ? shadowOffsetY : preset.offsetY,
        blur: shadowBlur !== 6 ? shadowBlur : preset.blur,
        spread: shadowSpread !== -1 ? shadowSpread : preset.spread,
        color: shadowColor !== 'black' ? shadowColorResolved : preset.color,
        opacity: shadowOpacity !== 0.1 ? shadowOpacity : preset.opacity,
      }
    }
  }, [shadow, customShadow, shadowOffsetX, shadowOffsetY, shadowBlur, shadowSpread, shadowColor, shadowColorResolved, shadowOpacity])
}

/**
 * Hook to get roundness configuration
 */
export function useRoundnessConfig(
  roundness: 0 | 1 | 2 | 3 | 4 | 5,
  customSmoothing?: number,
  customBorderRadius?: number,
  customPointsPerCorner?: number
) {
  return useMemo(() => {
    if (roundness === 0 && (customSmoothing || customBorderRadius || customPointsPerCorner)) {
      return {
        smoothing: customSmoothing ?? 2.0,
        borderRadius: customBorderRadius ?? 12,
        pointsPerCorner: customPointsPerCorner ?? 20,
        performance: 'balanced' as const,
        adaptiveQuality: false,
      }
    }
    return {
      ...ROUNDNESS_LEVELS[roundness],
      performance: 'balanced' as const,
      adaptiveQuality: false,
    }
  }, [roundness, customSmoothing, customBorderRadius, customPointsPerCorner])
}

/**
 * Hook to check if shadow is enabled
 */
export function useHasShadow(shadowConfig: CustomShadowConfig | null) {
  return useMemo(() => {
    return shadowConfig && shadowConfig.opacity > 0
  }, [shadowConfig])
}

/**
 * Hook to manage hover state
 */
export function useHoverState(
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void,
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true)
      onMouseEnter?.(e)
    },
    [onMouseEnter]
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false)
      onMouseLeave?.(e)
    },
    [onMouseLeave]
  )

  return { isHovered, handleMouseEnter, handleMouseLeave }
}
