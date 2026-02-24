import type { CoinStackConfig, CoinStackPreset } from './types'

// Default configuration - matches original SVG
export const DEFAULT_CONFIG: CoinStackConfig = {
  size: {
    width: 200,
  },
  bottomTier: {
    faceColor: 'white',
    useGradient: false,
    gradient: {
      enabled: false,
      type: 'linear',
      direction: 'to-bottom',
      startColor: 'gray-100',
      endColor: 'gray-300',
      startOpacity: 100,
      endOpacity: 100,
    },
    strokeColor: 'black',
    strokeWidth: 2,
    shadowColor: 'black',
    shadowOpacity: 100,
  },
  topTier: {
    faceColor: 'white',
    useGradient: false,
    gradient: {
      enabled: false,
      type: 'linear',
      direction: 'to-bottom',
      startColor: 'gray-100',
      endColor: 'gray-300',
      startOpacity: 100,
      endOpacity: 100,
    },
    strokeColor: 'black',
    strokeWidth: 2,
    shadowColor: 'black',
    shadowOpacity: 100,
  },
  effects: {
    dropShadow: 'none',
    dropShadowColor: 'black',
    dropShadowOpacity: 30,
    innerGlow: 'none',
    innerGlowColor: 'white',
    shineOverlay: 'none',
  },
  demo: {
    pageBackground: 'secondary',
    showDebug: false,
  },
}

// Presets (subset needed for demo)
export const PRESETS: CoinStackPreset[] = [
  {
    id: 'default',
    name: 'Classic',
    description: 'Original black/white from SVG',
    config: DEFAULT_CONFIG,
  },
  {
    id: 'arcade-blue-solid',
    name: 'Arcade Blue Solid',
    description: 'Clean solid blue with arcade styling',
    config: {
      ...DEFAULT_CONFIG,
      bottomTier: {
        faceColor: 'sky-300',
        useGradient: true,
        gradient: {
          enabled: true,
          type: 'linear',
          direction: 'to-bottom',
          startColor: 'sky-300',
          endColor: 'white',
          startOpacity: 100,
          endOpacity: 100,
        },
        strokeColor: 'blue-400',
        strokeWidth: 1,
        shadowColor: 'blue-600',
        shadowOpacity: 100,
      },
      topTier: {
        faceColor: 'sky-300',
        useGradient: true,
        gradient: {
          enabled: true,
          type: 'linear',
          direction: 'to-right',
          startColor: 'white',
          endColor: 'sky-300',
          startOpacity: 100,
          endOpacity: 100,
        },
        strokeColor: 'blue-500',
        strokeWidth: 1,
        shadowColor: 'blue-600',
        shadowOpacity: 80,
      },
      effects: {
        dropShadow: 'lg',
        dropShadowColor: 'blue-500',
        dropShadowOpacity: 30,
        innerGlow: 'subtle',
        innerGlowColor: 'white',
        shineOverlay: 'medium',
      },
    },
  },
  {
    id: 'arcade-blue',
    name: 'Arcade Blue',
    description: 'Soft blue gradient inspired by arcade aesthetics',
    config: {
      ...DEFAULT_CONFIG,
      bottomTier: {
        faceColor: 'sky-300',
        useGradient: true,
        gradient: {
          enabled: true,
          type: 'linear',
          direction: 'to-bottom',
          startColor: 'sky-300',
          endColor: 'white',
          startOpacity: 100,
          endOpacity: 100,
        },
        strokeColor: 'blue-400',
        strokeWidth: 1,
        shadowColor: 'blue-500',
        shadowOpacity: 70,
      },
      topTier: {
        faceColor: 'sky-300',
        useGradient: true,
        gradient: {
          enabled: true,
          type: 'linear',
          direction: 'to-bottom',
          startColor: 'white',
          endColor: 'sky-300',
          startOpacity: 100,
          endOpacity: 100,
        },
        strokeColor: 'blue-400',
        strokeWidth: 1,
        shadowColor: 'blue-400',
        shadowOpacity: 60,
      },
      effects: {
        dropShadow: 'lg',
        dropShadowColor: 'blue-500',
        dropShadowOpacity: 30,
        innerGlow: 'subtle',
        innerGlowColor: 'white',
        shineOverlay: 'medium',
      },
    },
  },
]

// Get preset by ID
export function getPresetById(id: string): CoinStackPreset | undefined {
  return PRESETS.find((preset) => preset.id === id)
}
