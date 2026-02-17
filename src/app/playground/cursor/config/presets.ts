/**
 * Cursor Presets
 *
 * Preset categories:
 * - default: Standard starting point
 * - minimal: Clean, understated
 * - interactive: With magnetic/spring effects
 * - creative: Unique visual styles
 * - custom: User-defined variations
 */

import type { CursorConfig, CursorPresetMeta } from './types'

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_CURSOR_CONFIG: CursorConfig = {
  showCursor: false,
  mode: 'replace',
  style: {
    background: 'var(--color-text-secondary)',
    borderRadius: 999,
    width: 20,
    height: 20,
    mixBlendMode: 'normal',
  },
  center: { x: 0.5, y: 0.5 },
  offset: { x: 0, y: 0 },
  matchTextSize: true,
  magnetic: {
    enabled: false,
    snap: 0.8,
    morph: true,
    padding: 5,
  },
  magneticPull: {
    enabled: true,
    strength: 0.1,
  },
  spring: {
    enabled: false,
    stiffness: 500,
    damping: 30,
    mass: 1,
  },
  variants: {
    pointerScale: 1.5,
    pressedScale: 0.8,
    pointerBackground: '',
    pressedBlur: false,
  },
}

// ============================================================================
// Presets
// ============================================================================

export const CURSOR_PRESETS: CursorPresetMeta[] = [
  {
    id: 'default',
    name: 'Magnetic Pull Only',
    category: 'default',
    description: 'Native cursor + magnetic pull on elements',
    data: DEFAULT_CURSOR_CONFIG,
  },
  {
    id: 'custom-cursor',
    name: 'Custom Cursor',
    category: 'default',
    description: 'Custom cursor replacement',
    data: {
      ...DEFAULT_CURSOR_CONFIG,
      showCursor: true,
      magneticPull: {
        enabled: false,
        strength: 0.1,
      },
    },
  },
  {
    id: 'dot',
    name: 'Minimal Dot',
    category: 'minimal',
    description: 'Small dot cursor',
    data: {
      ...DEFAULT_CURSOR_CONFIG,
      showCursor: true,
      magneticPull: { enabled: false, strength: 0.1 },
      style: {
        ...DEFAULT_CURSOR_CONFIG.style,
        width: 8,
        height: 8,
      },
      variants: {
        ...DEFAULT_CURSOR_CONFIG.variants,
        pointerScale: 2,
        pressedScale: 0.5,
      },
    },
  },
  {
    id: 'follow-trail',
    name: 'Follow Trail',
    category: 'creative',
    description: 'Smooth trailing cursor',
    data: {
      ...DEFAULT_CURSOR_CONFIG,
      showCursor: true,
      mode: 'follow',
      magneticPull: { enabled: false, strength: 0.1 },
      style: {
        ...DEFAULT_CURSOR_CONFIG.style,
        width: 24,
        height: 24,
        background: 'var(--color-brand-primary)',
      },
      center: { x: 0, y: 0 },
      spring: {
        enabled: true,
        stiffness: 500,
        damping: 30,
        mass: 2,
      },
    },
  },
  {
    id: 'magnetic-snap',
    name: 'Cursor Snap',
    category: 'interactive',
    description: 'Cursor snaps to elements',
    data: {
      ...DEFAULT_CURSOR_CONFIG,
      showCursor: true,
      magneticPull: { enabled: false, strength: 0.1 },
      magnetic: {
        enabled: true,
        snap: 0.8,
        morph: true,
        padding: 8,
      },
      style: {
        ...DEFAULT_CURSOR_CONFIG.style,
        width: 24,
        height: 24,
      },
    },
  },
  {
    id: 'difference',
    name: 'Invert (Difference)',
    category: 'creative',
    description: 'Inverts colors under cursor',
    data: {
      ...DEFAULT_CURSOR_CONFIG,
      showCursor: true,
      magneticPull: { enabled: false, strength: 0.1 },
      style: {
        ...DEFAULT_CURSOR_CONFIG.style,
        background: '#ffffff',
        width: 32,
        height: 32,
        mixBlendMode: 'difference',
      },
    },
  },
  {
    id: 'ios-pointer',
    name: 'iOS Pointer',
    category: 'interactive',
    description: 'iPadOS-style: cursor snap + element pull',
    data: {
      ...DEFAULT_CURSOR_CONFIG,
      showCursor: true,
      magnetic: {
        enabled: true,
        snap: 1,
        morph: true,
        padding: 4,
      },
      magneticPull: {
        enabled: true,
        strength: 0.1,
      },
      style: {
        ...DEFAULT_CURSOR_CONFIG.style,
        width: 24,
        height: 24,
        background: 'rgba(128, 128, 128, 0.5)',
        mixBlendMode: 'multiply',
        borderRadius: 10,
      },
      variants: {
        pointerScale: 1,
        pressedScale: 0.95,
        pointerBackground: '',
        pressedBlur: false,
      },
    },
  },
  {
    id: 'strong-pull',
    name: 'Strong Pull',
    category: 'interactive',
    description: 'Elements strongly pulled (30%)',
    data: {
      ...DEFAULT_CURSOR_CONFIG,
      magneticPull: {
        enabled: true,
        strength: 0.3,
      },
    },
  },
]

// ============================================================================
// Helpers
// ============================================================================

export const getPresetById = (id: string): CursorPresetMeta | undefined =>
  CURSOR_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): CursorPresetMeta[] =>
  CURSOR_PRESETS.filter((p) => p.category === category)
