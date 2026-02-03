/**
 * Character Avatars - Presets
 */

import type { CharacterAvatarsConfig, CharacterAvatarsPresetMeta } from './types'

export const DEFAULT_CONFIG: CharacterAvatarsConfig = {
  realmFilter: 'all',
  width: 64,
  height: 64,
  borderRadius: 12,
  shape: 'rounded',
  gap: 24,
  columns: 8,
  paddingX: 24,
  paddingY: 24,
  showLabel: true,
  labelGap: 6,
  showBadge: true,
}

export const PRESETS: CharacterAvatarsPresetMeta[] = [
  {
    id: 'headshot-grid',
    name: 'Headshot Grid',
    description: 'Default rounded headshots with names',
    data: DEFAULT_CONFIG,
  },
  {
    id: 'circle-avatars',
    name: 'Circle Avatars',
    description: 'Circular profile pictures',
    data: {
      realmFilter: 'all',
      width: 56,
      height: 56,
      borderRadius: 28,
      shape: 'circle',
      gap: 20,
      columns: 8,
      paddingX: 24,
      paddingY: 24,
      showLabel: true,
      labelGap: 6,
      showBadge: false,
    },
  },
  {
    id: 'table-size',
    name: 'Table Size (20px)',
    description: 'Match the 20px size used in data tables',
    data: {
      realmFilter: 'all',
      width: 20,
      height: 20,
      borderRadius: 4,
      shape: 'rounded',
      gap: 8,
      columns: 12,
      paddingX: 24,
      paddingY: 24,
      showLabel: true,
      labelGap: 4,
      showBadge: false,
    },
  },
  {
    id: 'contact-cards',
    name: 'Contact Cards',
    description: 'Large cards with badges, great for browsing',
    data: {
      realmFilter: 'all',
      width: 80,
      height: 80,
      borderRadius: 16,
      shape: 'rounded',
      gap: 28,
      columns: 6,
      paddingX: 32,
      paddingY: 32,
      showLabel: true,
      labelGap: 8,
      showBadge: true,
    },
  },
]
