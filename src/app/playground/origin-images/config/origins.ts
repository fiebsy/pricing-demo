/**
 * All 25 unique origins with pre-computed slugs.
 * Matches the images in public/origins/, public/origins-logos/, public/origins-backdrops/
 */

import type { OriginEntry } from './types'

export const ORIGINS: OriginEntry[] = [
  // Marvel
  { name: 'Iron Man', slug: 'iron-man' },
  { name: 'Thor', slug: 'thor' },
  { name: 'The Avengers', slug: 'the-avengers' },
  { name: 'Spider-Man', slug: 'spider-man' },
  { name: 'WandaVision', slug: 'wandavision' },
  { name: 'Captain America', slug: 'captain-america' },
  { name: 'Iron Man 2', slug: 'iron-man-2' },
  { name: 'Age of Ultron', slug: 'age-of-ultron' },
  { name: 'Winter Soldier', slug: 'winter-soldier' },
  { name: 'X-Men', slug: 'x-men' },
  { name: 'Deadpool', slug: 'deadpool' },
  { name: 'Guardians of the Galaxy', slug: 'guardians-of-the-galaxy' },
  { name: 'Guardians Vol. 2', slug: 'guardians-vol-2' },
  { name: 'Infinity War', slug: 'infinity-war' },
  { name: 'Black Panther', slug: 'black-panther' },
  { name: 'Thor: Ragnarok', slug: 'thor-ragnarok' },
  { name: 'Daredevil', slug: 'daredevil' },
  // Anime
  { name: 'Dragon Ball Z', slug: 'dragon-ball-z' },
  { name: 'Dragon Ball', slug: 'dragon-ball' },
  { name: 'Dragon Ball Super', slug: 'dragon-ball-super' },
  { name: 'DBS: Broly', slug: 'dbs-broly' },
  { name: 'Pokemon', slug: 'pokemon' },
  { name: 'Pokemon: The Movie', slug: 'pokemon-the-movie' },
  // Westeros
  { name: 'Game of Thrones', slug: 'game-of-thrones' },
  { name: 'House of the Dragon', slug: 'house-of-the-dragon' },
]
