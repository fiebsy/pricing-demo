/**
 * Stacking Nav + Table Playground - Navigation Items
 *
 * 4-level multiverse hierarchy:
 * L0: All Characters
 * L1: Realm (Marvel, Anime, Westeros)
 * L2: Faction (realm-specific, e.g. Avengers, X-Men, Dragon Ball, Pokemon)
 * L3: Energy (Main, Villain, Side, NPC)
 */

import type { StackItem } from '@/components/ui/features/stacking-nav'
import { CharacterEnergy } from './types'

// =============================================================================
// ENERGY CHILDREN (shared L3 across all factions)
// =============================================================================

const ENERGY_CHILDREN: StackItem[] = [
  { id: CharacterEnergy.MainCharacter, label: 'Main' },
  { id: CharacterEnergy.VillainArc, label: 'Villain' },
  { id: CharacterEnergy.SideQuest, label: 'Side' },
  { id: CharacterEnergy.NPCEnergy, label: 'NPC' },
]

// =============================================================================
// FACTION CHILDREN (realm-specific L2)
// =============================================================================

const MARVEL_FACTIONS: StackItem[] = [
  { id: 'avengers', label: 'Avengers', children: ENERGY_CHILDREN },
  { id: 'x-men', label: 'X-Men', children: ENERGY_CHILDREN },
  { id: 'guardians', label: 'Guardians', children: ENERGY_CHILDREN },
  { id: 'rogues-gallery', label: 'Rogues', children: ENERGY_CHILDREN },
]

const ANIME_FACTIONS: StackItem[] = [
  { id: 'dragon-ball', label: 'Dragon Ball', children: ENERGY_CHILDREN },
  { id: 'pokemon', label: 'Pokemon', children: ENERGY_CHILDREN },
]

const WESTEROS_FACTIONS: StackItem[] = [
  { id: 'house-stark', label: 'Stark', children: ENERGY_CHILDREN },
  { id: 'house-targaryen', label: 'Targaryen', children: ENERGY_CHILDREN },
  { id: 'house-lannister', label: 'Lannister', children: ENERGY_CHILDREN },
  { id: 'nights-watch', label: 'Watch', children: ENERGY_CHILDREN },
]

// =============================================================================
// NAVIGATION HIERARCHY
// =============================================================================

export const DIRECTORY_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'marvel',
    label: 'Marvel',
    children: MARVEL_FACTIONS,
  },
  {
    id: 'anime',
    label: 'Anime',
    children: ANIME_FACTIONS,
  },
  {
    id: 'westeros',
    label: 'Westeros',
    children: WESTEROS_FACTIONS,
  },
]

// =============================================================================
// LABEL LOOKUPS
// =============================================================================

export const NAV_LABELS: Record<string, string> = {
  all: 'All Characters',
  // L1 - Realms
  marvel: 'Marvel',
  anime: 'Anime',
  westeros: 'Westeros',
  // L2 - Factions
  avengers: 'Avengers',
  'x-men': 'X-Men',
  guardians: 'Guardians',
  'rogues-gallery': 'Rogues',
  'dragon-ball': 'Dragon Ball',
  pokemon: 'Pokemon',
  'house-stark': 'Stark',
  'house-targaryen': 'Targaryen',
  'house-lannister': 'Lannister',
  'nights-watch': 'Watch',
  // L3 - Energies
  [CharacterEnergy.MainCharacter]: 'Main',
  [CharacterEnergy.VillainArc]: 'Villain',
  [CharacterEnergy.SideQuest]: 'Side',
  [CharacterEnergy.NPCEnergy]: 'NPC',
}
