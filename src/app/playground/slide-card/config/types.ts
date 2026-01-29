/**
 * SlideCard Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/slide-card
 */

export interface SlideCardConfig {
  // Card styling
  card: {
    background: string           // primary | secondary | tertiary | quaternary | brand-*
    backgroundGradient: boolean  // Enable gradient background
    gradientFrom: string        // Gradient start color
    gradientTo: string          // Gradient end color
    shine: string              // shine-none | shine-0 | shine-1 | shine-2 | shine-3 | shine-brand
    shineIntensity: string     // (none) | -subtle | -intense
    shadow: string             // none | xs | sm | md | lg | xl | 2xl
    depth: string              // none | depth-gradient-1 | depth-gradient-2 | depth-gradient-3
    corner: string             // round | squircle | bevel | scoop
    borderRadius: number       // 0-48 px
    padding: number            // 0-64 px
    border: boolean            // Show border
    borderColor: string        // primary | secondary | tertiary | brand
    borderWidth: number        // 1-4 px
  }

  // Animation configuration
  animation: {
    enabled: boolean           // Enable entrance animation
    type: 'fade' | 'scale' | 'slideUp' | 'slideDown'  // Animation type
    duration: number           // Animation duration in ms
    delay: number              // Animation delay in ms
    easing: string            // Animation easing function
  }

  // Content configuration
  content: {
    type: 'chart' | 'stat' | 'team' | 'logo' | 'custom'  // Content type demo
    showPlaceholder: boolean  // Show placeholder content
    chartTopPadding?: number  // Top padding for chart bars (pixels)
    barColor?: string  // Bar color for chart (semantic or gray shade)
    barShine?: string  // Shine effect for bars
    barCorner?: string  // Corner style for bars
  }

  // Layout configuration
  layout: {
    width: string             // auto | full | fixed
    minWidth: number          // Minimum width in px
    maxWidth: number          // Maximum width in px
    height: string            // auto | full | fixed
    minHeight: number         // Minimum height in px
  }
}

export interface SlideCardPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'elevated' | 'brand' | 'glass' | 'custom'
  data: SlideCardConfig
}