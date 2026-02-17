/**
 * Cursor Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/cursor
 * @package motion-plus
 */

// ============================================================================
// Cursor Mode
// ============================================================================

export type CursorMode = 'replace' | 'follow'

// ============================================================================
// Cursor Styling
// ============================================================================

export interface CursorStyleConfig {
  /** Background color */
  background: string
  /** Border radius (requires style prop for Motion layout animations) */
  borderRadius: number
  /** Width in pixels (auto when null) */
  width: number | null
  /** Height in pixels (auto when null) */
  height: number | null
  /** Mix blend mode */
  mixBlendMode: 'normal' | 'difference' | 'multiply' | 'screen' | 'overlay'
}

// ============================================================================
// Center & Offset
// ============================================================================

export interface CursorCenter {
  x: number
  y: number
}

export interface CursorOffset {
  x: number
  y: number
}

// ============================================================================
// Magnetic Configuration
// ============================================================================

export interface MagneticConfig {
  /** Enable magnetic snapping */
  enabled: boolean
  /** Snap strength (0-1) */
  snap: number
  /** Morph to target shape */
  morph: boolean
  /** Padding around morphed cursor */
  padding: number
}

// ============================================================================
// Spring Configuration
// ============================================================================

export interface SpringConfig {
  /** Enable spring animation */
  enabled: boolean
  /** Spring stiffness */
  stiffness: number
  /** Spring damping */
  damping: number
  /** Spring mass */
  mass: number
}

// ============================================================================
// Variants Configuration
// ============================================================================

export interface CursorVariantsConfig {
  /** Scale on pointer hover */
  pointerScale: number
  /** Scale when pressed */
  pressedScale: number
  /** Background on pointer hover (empty = no change) */
  pointerBackground: string
  /** Apply blur on press */
  pressedBlur: boolean
}

// ============================================================================
// Magnetic Pull Configuration (for elements pulling toward cursor)
// ============================================================================

export interface MagneticPullConfig {
  /** Enable magnetic pull on demo elements */
  enabled: boolean
  /** Pull strength (0-1, where 0.1 = subtle, 0.5 = strong) */
  strength: number
}

// ============================================================================
// Full Configuration
// ============================================================================

export interface CursorConfig {
  /** Show custom cursor (false = use native browser cursor) */
  showCursor: boolean
  /** Cursor mode: replace browser cursor or follow it */
  mode: CursorMode
  /** Styling options */
  style: CursorStyleConfig
  /** Center point (hit point) */
  center: CursorCenter
  /** Pixel offset from center */
  offset: CursorOffset
  /** Match text size when hovering selectable text */
  matchTextSize: boolean
  /** Magnetic snapping configuration (cursor snaps TO element) */
  magnetic: MagneticConfig
  /** Magnetic pull configuration (element pulls TOWARD cursor) */
  magneticPull: MagneticPullConfig
  /** Spring animation configuration */
  spring: SpringConfig
  /** Variant animations */
  variants: CursorVariantsConfig
}

// ============================================================================
// Preset Types
// ============================================================================

export interface CursorPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'interactive' | 'creative' | 'custom'
  data: CursorConfig
}
