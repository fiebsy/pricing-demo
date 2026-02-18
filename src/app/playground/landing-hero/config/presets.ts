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
// Default Configuration (Skwircle Video)
// ============================================================================

export const DEFAULT_LANDING_HERO_CONFIG: LandingHeroConfig = {
  background: {
    showPattern: true,
    patternType: 'diagonal',
    patternOpacity: 0.04,
    showGlow: true,
    glowColor: 'brand-solid',
    glowSize: 300,
    glowOpacity: 0.3,
    glowSpread: 50,
    glowShape: 'blob-3',
    glowPosition: 'asset',
    glowBlur: 0,
    showSecondaryBlob: true,
    secondaryBlobColor: 'gray',
    secondaryBlobSize: 220,
    secondaryBlobOpacity: 0.3,
    secondaryBlobSpread: 65,
    secondaryBlobBlur: 0,
    secondaryBlobOffsetX: 0,
    secondaryBlobOffsetY: 10,
  },
  image: {
    mediaType: 'video',
    shine: 'shine-2',
    shineIntensity: '-intense',
    shadow: 'none',
    outerCorner: 'squircle',
    outerBorderRadius: 0,
    innerBorderRadius: 32,
    squircleLevel: 'pill',
    padding: 0,
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
    description: 'Skwircle video with dual blobs',
    data: DEFAULT_LANDING_HERO_CONFIG,
  },
  {
    id: 'classic',
    name: 'Classic',
    category: 'default',
    description: 'Original landing page styling with image',
    data: {
      background: {
        showPattern: true,
        patternType: 'diagonal',
        patternOpacity: 0.04,
        showGlow: true,
        glowColor: 'brand-solid',
        glowSize: 300,
        glowOpacity: 0.35,
        glowSpread: 50,
        glowShape: 'blob-3',
        glowPosition: 'asset',
        glowBlur: 0,
        showSecondaryBlob: false,
        secondaryBlobColor: 'info',
        secondaryBlobSize: 200,
        secondaryBlobOpacity: 0.3,
        secondaryBlobSpread: 70,
        secondaryBlobBlur: 0,
        secondaryBlobOffsetX: 50,
        secondaryBlobOffsetY: -30,
      },
      image: {
        mediaType: 'image',
        shine: 'shine-3',
        shineIntensity: '',
        shadow: '2xl',
        outerCorner: 'squircle',
        outerBorderRadius: 24,
        innerBorderRadius: 20,
        squircleLevel: 'pill',
        padding: 4,
        backdropBlur: 'none',
      },
      interaction: {
        scaleOnClick: 0.9,
        hoverShineIntense: true,
      },
    },
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
        glowSpread: 70,
        glowShape: 'circle',
        glowPosition: 'center',
        glowBlur: 0,
        showSecondaryBlob: false,
        secondaryBlobColor: 'info',
        secondaryBlobSize: 200,
        secondaryBlobOpacity: 0.3,
        secondaryBlobSpread: 70,
        secondaryBlobBlur: 0,
        secondaryBlobOffsetX: 50,
        secondaryBlobOffsetY: -30,
      },
      image: {
        mediaType: 'image',
        shine: 'shine-1',
        shineIntensity: '-subtle',
        shadow: 'md',
        outerCorner: 'round',
        outerBorderRadius: 16,
        innerBorderRadius: 12,
        squircleLevel: 'pill',
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
        glowOpacity: 0.6,
        glowSpread: 40,
        glowShape: 'blob',
        glowPosition: 'asset',
        glowBlur: 0,
        showSecondaryBlob: false,
        secondaryBlobColor: 'info',
        secondaryBlobSize: 200,
        secondaryBlobOpacity: 0.3,
        secondaryBlobSpread: 70,
        secondaryBlobBlur: 0,
        secondaryBlobOffsetX: 50,
        secondaryBlobOffsetY: -30,
      },
      image: {
        mediaType: 'image',
        shine: 'shine-3',
        shineIntensity: '-intense',
        shadow: '2xl',
        outerCorner: 'squircle',
        outerBorderRadius: 32,
        innerBorderRadius: 24,
        squircleLevel: 'pill',
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
        glowSize: 350,
        glowOpacity: 0.5,
        glowSpread: 45,
        glowShape: 'blob-2',
        glowPosition: 'asset',
        glowBlur: 0,
        showSecondaryBlob: false,
        secondaryBlobColor: 'info',
        secondaryBlobSize: 200,
        secondaryBlobOpacity: 0.3,
        secondaryBlobSpread: 70,
        secondaryBlobBlur: 0,
        secondaryBlobOffsetX: 50,
        secondaryBlobOffsetY: -30,
      },
      image: {
        mediaType: 'image',
        shine: 'shine-brand',
        shineIntensity: '',
        shadow: 'xl',
        outerCorner: 'squircle',
        outerBorderRadius: 24,
        innerBorderRadius: 20,
        squircleLevel: 'pill',
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
        glowSpread: 70,
        glowShape: 'circle',
        glowPosition: 'center',
        glowBlur: 0,
        showSecondaryBlob: false,
        secondaryBlobColor: 'info',
        secondaryBlobSize: 200,
        secondaryBlobOpacity: 0.3,
        secondaryBlobSpread: 70,
        secondaryBlobBlur: 0,
        secondaryBlobOffsetX: 50,
        secondaryBlobOffsetY: -30,
      },
      image: {
        mediaType: 'image',
        shine: 'none',
        shineIntensity: '',
        shadow: 'lg',
        outerCorner: 'round',
        outerBorderRadius: 20,
        innerBorderRadius: 16,
        squircleLevel: 'pill',
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
