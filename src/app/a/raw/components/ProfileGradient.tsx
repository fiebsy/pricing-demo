'use client'

import {
  config,
  gradientSurfaceColorVars,
  gradientShadowColorVars,
  gradientHighlightColorVars,
} from '../config'

/**
 * ProfileGradient - Frosted glass background effect
 *
 * Renders the decorative gradient background with:
 * - Semantic color CSS variables
 * - Potency multiplier calculation
 * - Edge glow overlay
 * - Mask gradient for fade
 */
export function ProfileGradient() {
  const {
    gradientOpacity,
    gradientSurfaceColor,
    gradientShadowColor,
    gradientHighlightColor,
    gradientPotency,
    gradientShadowBlur,
    gradientShadowSpread,
    gradientShadowOpacity,
    gradientHighlightSize,
    gradientHighlightOpacity,
    gradientEdgeGlowEnabled,
    gradientEdgeGlowHeight,
    gradientEdgeGlowOpacity,
    gradientFadeDistance,
    gradientBorderRadius,
    gradientHeight,
  } = config

  // Apply potency multiplier to opacity values (capped at 100%)
  const potencyMultiplier = gradientPotency / 100
  const effectiveShadowOpacity = Math.min(gradientShadowOpacity * potencyMultiplier, 100)
  const effectiveHighlightOpacity = Math.min(gradientHighlightOpacity * potencyMultiplier, 100)

  // Get semantic color values
  const surfaceColor = gradientSurfaceColorVars[gradientSurfaceColor]
  const shadowColor = gradientShadowColorVars[gradientShadowColor]
  const highlightColor = gradientHighlightColorVars[gradientHighlightColor]

  // Build shadow string using semantic colors
  const outerShadow = `0 4px ${gradientShadowBlur}px ${gradientShadowSpread}px color-mix(in srgb, ${shadowColor} ${effectiveShadowOpacity}%, transparent)`
  const insetHighlight =
    gradientHighlightSize > 0
      ? `inset 0 ${gradientHighlightSize}px ${gradientHighlightSize}px 0 color-mix(in srgb, ${highlightColor} ${effectiveHighlightOpacity}%, transparent)`
      : ''

  const boxShadow = [outerShadow, insetHighlight].filter(Boolean).join(', ')

  const gradientStyle: React.CSSProperties = {
    opacity: gradientOpacity / 100,
    backgroundColor: surfaceColor,
    boxShadow,
    maskImage: `linear-gradient(black 0%, transparent ${gradientFadeDistance}px)`,
    height: gradientHeight,
    borderRadius: gradientBorderRadius,
  }

  // Edge glow style - lighter gradient at the top edge
  const effectiveEdgeGlowOpacity = Math.min(gradientEdgeGlowOpacity * potencyMultiplier, 100)

  const edgeGlowStyle: React.CSSProperties = {
    background: `linear-gradient(180deg,
      color-mix(in srgb, ${highlightColor} ${effectiveEdgeGlowOpacity}%, transparent) 0%,
      transparent 100%
    )`,
    height: gradientEdgeGlowHeight,
    borderRadius: `${gradientBorderRadius}px ${gradientBorderRadius}px 0 0`,
  }

  return (
    <div className="max-w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 -left-10 -right-10 -top-10 z-0"
        style={gradientStyle}
      >
        {/* Top edge glow overlay */}
        {gradientEdgeGlowEnabled && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0"
            style={edgeGlowStyle}
          />
        )}
      </div>
    </div>
  )
}
