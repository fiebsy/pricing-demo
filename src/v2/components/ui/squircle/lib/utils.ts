import { V2_SEMANTIC_COLORS } from './constants'
import { type RoundnessConfig } from '../types'

// Helper function to get color value from the map or return raw value
export const getColorValue = (color: string | undefined): string => {
  if (!color) return 'transparent'
  return V2_SEMANTIC_COLORS[color] || color
}

// Enhanced path generation with adaptive quality
export const generateSquirclePathV3 = (
  width: number,
  height: number,
  config: RoundnessConfig,
  offset: number = 0,
  cornerInset: number = 0,
  performanceMode: 'high' | 'balanced' | 'smooth' | 'ultra-smooth' = 'balanced'
): string => {
  const w = width - offset * 2
  const h = height - offset * 2
  const { smoothing, borderRadius } = config
  let { pointsPerCorner } = config

  // Adaptive quality based on size and performance mode
  if (config.adaptiveQuality) {
    const size = Math.min(w, h)
    const sizeMultiplier = Math.max(0.5, Math.min(2, size / 100))

    switch (performanceMode) {
      case 'high':
        pointsPerCorner = Math.max(20, Math.round(pointsPerCorner * 0.5 * sizeMultiplier))
        break
      case 'balanced':
        pointsPerCorner = Math.max(30, Math.round(pointsPerCorner * 0.8 * sizeMultiplier))
        break
      case 'smooth':
        pointsPerCorner = Math.max(40, Math.round(pointsPerCorner * 1.2 * sizeMultiplier))
        break
      case 'ultra-smooth':
        pointsPerCorner = Math.max(60, Math.round(pointsPerCorner * 1.5 * sizeMultiplier))
        break
    }
  }

  // Calculate the actual radius to use (bounded by the smaller dimension)
  const maxRadius = Math.min(w, h) / 2
  const r = Math.min(borderRadius, maxRadius)

  // Rounding helper for cleaner SVG paths - increased precision for smoother curves
  const round = (num: number) => Math.round(num * 1000) / 1000

  // Generate corner points for a superellipse corner
  const generateCornerPoints = (
    centerX: number,
    centerY: number,
    radiusX: number,
    radiusY: number,
    startAngle: number,
    endAngle: number
  ) => {
    let points = ''
    const numPoints = pointsPerCorner
    const angleStep = (endAngle - startAngle) / (numPoints - 1)

    // Exponent for superellipse formula (higher = more square-like)
    const exponent = smoothing

    for (let i = 0; i < numPoints; i++) {
      const angle = startAngle + angleStep * i
      const cosAngle = Math.cos(angle)
      const sinAngle = Math.sin(angle)

      // Superellipse formula for iOS-style rounded corners
      const factor = Math.pow(
        Math.pow(Math.abs(cosAngle), exponent) + Math.pow(Math.abs(sinAngle), exponent),
        1 / exponent
      )

      let x = centerX + (radiusX * cosAngle) / factor
      let y = centerY + (radiusY * sinAngle) / factor

      // Apply corner micro-adjustment for smoother borders
      if (cornerInset > 0) {
        const insetX = Math.sign(x - centerX) * cornerInset
        const insetY = Math.sign(y - centerY) * cornerInset
        x = x + insetX
        y = y + insetY
      }

      // Performance optimization: skip some points for high performance mode
      if (performanceMode === 'high' && numPoints > 60 && i % 3 === 1 && i > 5 && i < numPoints - 5) {
        continue
      }

      points += `L ${round(x + offset)},${round(y + offset)} `
    }

    return points
  }

  // Build the path using corner points
  const path = [
    // Start at top left, after the corner curve
    `M ${round(r + offset)},${round(offset)}`,

    // Line to start of top right corner
    `L ${round(w - r + offset)},${round(offset)}`,

    // Top right corner
    generateCornerPoints(w - r, r, r, r, -Math.PI / 2, 0),

    // Line to start of bottom right corner
    `L ${round(w + offset)},${round(h - r + offset)}`,

    // Bottom right corner
    generateCornerPoints(w - r, h - r, r, r, 0, Math.PI / 2),

    // Line to start of bottom left corner
    `L ${round(r + offset)},${round(h + offset)}`,

    // Bottom left corner
    generateCornerPoints(r, h - r, r, r, Math.PI / 2, Math.PI),

    // Line to start of top left corner
    `L ${round(offset)},${round(r + offset)}`,

    // Top left corner
    generateCornerPoints(r, r, r, r, Math.PI, (3 * Math.PI) / 2),

    // Close the path
    'Z',
  ].join(' ')

  return path
}
