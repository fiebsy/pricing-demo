/**
 * Landing Hero Presets
 *
 * Preset categories:
 * - default: Current landing page styling
 * - minimal: Clean, understated
 * - dramatic: Bold effects
 * - brand: Brand-focused
 * - clean: No decorations
 */

import type { LandingHeroConfig, LandingHeroPresetMeta } from './types'

// ============================================================================
// Default Configuration (matches current landing page)
// ============================================================================

export const DEFAULT_LANDING_HERO_CONFIG: LandingHeroConfig = {
  background: {
    showPattern: true,
    patternType: 'diagonal',
    patternOpacity: 0.04,
    showGlow: true,
    glowColor: 'brand-solid',
    glowSize: 200,
    glowOpacity: 0.2,
    glowShape: 'circle',
    glowPosition: 'asset',
  },
  image: {
    shine: 'shine-3',
    shineIntensity: '',
    shadow: '2xl',
    outerCorner: 'squircle',
    outerBorderRadius: 24,
    innerBorderRadius: 20,
    padding: 4,
    backdropBlur: 'none',
  },
  interaction: {
    scaleOnClick: 0.9,
    hoverShineIntense: true,
  },
}

// ============================================================================
// Presets
// ============================================================================

export const LANDING_HERO_PRESETS: LandingHeroPresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Current landing page styling',
    data: DEFAULT_LANDING_HERO_CONFIG,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'minimal',
    description: 'No pattern, no glow, subtle shadow',
    data: {
      background: {
        showPattern: false,
        patternType: 'none',
        patternOpacity: 0,
        showGlow: false,
        glowColor: 'brand-solid',
        glowSize: 280,
        glowOpacity: 0,
        glowShape: 'circle',
        glowPosition: 'center',
      },
      image: {
        shine: 'shine-1',
        shineIntensity: '-subtle',
        shadow: 'md',
        outerCorner: 'round',
        outerBorderRadius: 16,
        innerBorderRadius: 12,
        padding: 4,
        backdropBlur: 'none',
      },
      interaction: {
        scaleOnClick: 0.95,
        hoverShineIntense: false,
      },
    },
  },
  {
    id: 'dramatic',
    name: 'Dramatic',
    category: 'dramatic',
    description: 'Large blob glow, intense shine, heavy shadow',
    data: {
      background: {
        showPattern: true,
        patternType: 'dots',
        patternOpacity: 0.08,
        showGlow: true,
        glowColor: 'brand-solid',
        glowSize: 400,
        glowOpacity: 0.35,
        glowShape: 'blob',
        glowPosition: 'asset',
      },
      image: {
        shine: 'shine-3',
        shineIntensity: '-intense',
        shadow: '2xl',
        outerCorner: 'squircle',
        outerBorderRadius: 32,
        innerBorderRadius: 24,
        padding: 6,
        backdropBlur: 'md',
      },
      interaction: {
        scaleOnClick: 0.85,
        hoverShineIntense: true,
      },
    },
  },
  {
    id: 'brand',
    name: 'Brand Focus',
    category: 'brand',
    description: 'Brand colors, pattern overlay, blob glow',
    data: {
      background: {
        showPattern: true,
        patternType: 'grid',
        patternOpacity: 0.06,
        showGlow: true,
        glowColor: 'brand',
        glowSize: 320,
        glowOpacity: 0.3,
        glowShape: 'blob-2',
        glowPosition: 'asset',
      },
      image: {
        shine: 'shine-brand',
        shineIntensity: '',
        shadow: 'xl',
        outerCorner: 'squircle',
        outerBorderRadius: 24,
        innerBorderRadius: 20,
        padding: 4,
        backdropBlur: 'sm',
      },
      interaction: {
        scaleOnClick: 0.9,
        hoverShineIntense: true,
      },
    },
  },
  {
    id: 'clean',
    name: 'Clean',
    category: 'clean',
    description: 'No decorations, clean image presentation',
    data: {
      background: {
        showPattern: false,
        patternType: 'none',
        patternOpacity: 0,
        showGlow: false,
        glowColor: 'brand-solid',
        glowSize: 280,
        glowOpacity: 0,
        glowShape: 'circle',
        glowPosition: 'center',
      },
      image: {
        shine: 'none',
        shineIntensity: '',
        shadow: 'lg',
        outerCorner: 'round',
        outerBorderRadius: 20,
        innerBorderRadius: 16,
        padding: 4,
        backdropBlur: 'none',
      },
      interaction: {
        scaleOnClick: 0.95,
        hoverShineIntense: false,
      },
    },
  },
]

// ============================================================================
// Helpers
// ============================================================================

export const getPresetById = (id: string): LandingHeroPresetMeta | undefined =>
  LANDING_HERO_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): LandingHeroPresetMeta[] =>
  LANDING_HERO_PRESETS.filter((p) => p.category === category)
