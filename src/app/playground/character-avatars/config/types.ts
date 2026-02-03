/**
 * Character Avatars Playground - Types
 *
 * Configuration for displaying character avatar headshots
 * fetched from TMDB credits.
 */

export type AvatarShape = 'circle' | 'rounded'

export type RealmFilter = 'all' | 'marvel' | 'anime' | 'westeros'

export interface CharacterAvatarsConfig {
  // Filter
  realmFilter: RealmFilter

  // Avatar sizing
  width: number         // px
  height: number        // px
  borderRadius: number  // px (ignored when shape is 'circle')
  shape: AvatarShape    // 'circle' overrides borderRadius to 50%

  // Grid layout
  gap: number           // px between avatar cards
  columns: number       // grid columns
  paddingX: number      // px horizontal padding on the grid container
  paddingY: number      // px vertical padding on the grid container

  // Display
  showLabel: boolean    // show character name under avatar
  labelGap: number      // px gap between avatar and label
  showBadge: boolean    // show realm/faction color badge
}

export interface CharacterEntry {
  name: string
  slug: string
  realm: string
  realmLabel: string
  faction: string
  factionLabel: string
  origin: string
}

export interface CharacterAvatarsPresetMeta {
  id: string
  name: string
  description?: string
  data: CharacterAvatarsConfig
}
