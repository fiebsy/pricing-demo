/**
 * Origin Images Comparison Playground - Types
 *
 * Configuration for comparing poster, logo, and backdrop
 * TMDB image types at various thumbnail sizes.
 */

export type ImageType = 'poster' | 'logo' | 'backdrop'
export type DisplayMode = 'comparison' | 'card'
export type LabelPosition = 'bottom' | 'right'

export interface OriginImagesConfig {
  // Display mode
  displayMode: DisplayMode   // 'comparison' = side-by-side types, 'card' = single asset with caption

  // Which image types to show (comparison mode uses all, card mode uses cardImageType)
  showPoster: boolean
  showLogo: boolean
  showBackdrop: boolean
  cardImageType: ImageType   // which asset to display in card mode

  // Thumbnail sizing
  width: number          // px
  height: number         // px
  borderRadius: number   // px

  // Grid layout
  gap: number            // px between origin cards
  columns: number        // grid columns
  paddingX: number       // px horizontal padding on the grid container
  paddingY: number       // px vertical padding on the grid container

  // Display
  showLabel: boolean     // show origin name under thumbnails
  labelPosition: LabelPosition  // 'bottom' or 'right' of the image
  labelGap: number       // px gap between image and label
  logoBg: boolean        // show bg behind transparent logos
  logoBgColor: string    // semantic bg class for logo background
  logoPaddingX: number   // px horizontal padding inside the logo background
  logoPaddingY: number   // px vertical padding inside the logo background
  logoShine: string      // shine utility class for logo background
  logoSquircle: boolean  // use corner-squircle on logo background
  logoInvert: number     // 0–1 invert filter strength (fixes white-on-light)
  showBackdropBehind: boolean  // show backdrop image behind the card
  backdropShine: string        // shine utility class for backdrop container
  backdropOpacity: number      // 0–1 opacity of the backdrop image
  labelColor: string           // semantic text class for the label
  labelOpacity: number         // 0–1 opacity for the label text
  labelWeight: number          // font-weight for the label text
}

export interface OriginEntry {
  name: string
  slug: string
}

export interface OriginImagesPresetMeta {
  id: string
  name: string
  description?: string
  data: OriginImagesConfig
}
