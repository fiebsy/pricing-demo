/**
 * Deck Slide Card Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/features/deck-slide-card
 */

export interface DeckSlideCardConfig {
  // Outer layer styling
  outer: {
    background: string           // Semantic: primary | secondary | tertiary | quaternary | brand-*
    gradientFrom?: string        // Gradient start color
    gradientTo?: string          // Gradient end color
    gradientDirection?: string   // Gradient direction: to-br | to-bl | to-tr | to-tl | to-b | to-t | to-r | to-l
    shine: string               // shine-none | shine-0 | shine-1 | shine-2 | shine-3 | shine-brand
    shineIntensity: string      // (none) | -subtle | -intense
    shadow: string              // none | xs | sm | md | lg
    depth: string               // none | depth-gradient-1 | depth-gradient-2 | depth-gradient-3
    corner: string              // round | squircle | bevel | scoop
    borderRadius: number        // 0-48 px
    padding: number             // 0-64 px
    border: boolean             // Show border
    borderColor: string         // Semantic: primary | secondary | tertiary
    borderWidth: number         // 1-4 px
  }

  // Content configuration
  content: {
    type: 'stat' | 'bullet' | 'team' | 'chart' | 'custom'
    // Stat card specific
    statValue?: string
    statLabel?: string
    statSubtext?: string
    showArrow?: boolean
    // Text colors
    titleColor: string
    labelColor: string
    subtextColor: string
    // Typography scale
    titleSize: string
    labelSize: string
    subtextSize: string
  }

  // Layout configuration
  layout: {
    width: string               // auto | full | fixed
    minWidth?: number          // Min width in px
    height: string             // auto | full | fixed
    minHeight?: number         // Min height in px
    aspectRatio?: string       // 1/1 | 4/3 | 16/9 | auto
  }

  // Export/Print specific
  export: {
    printOptimized: boolean    // Apply print-specific overrides
    forceLight: boolean        // Force light mode for export
    viewportScaling: boolean   // Use viewport-relative units
  }
}

export interface DeckSlideCardPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'elevated' | 'brand' | 'print' | 'custom'
  data: DeckSlideCardConfig
}

export interface SampleContent {
  stat?: {
    value: string
    label: string
    subtext?: string
  }
  bullet?: {
    title: string
    items: string[]
  }
  team?: {
    name: string
    role: string
    image?: string
  }
  chart?: {
    title: string
    value: string
    change?: string
  }
}