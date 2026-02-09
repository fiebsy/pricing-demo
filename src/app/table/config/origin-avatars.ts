/**
 * Origin-to-image mapping for the stacking-nav-table playground.
 *
 * Maps each origin string (e.g. "DBS: Broly") to its poster thumbnail
 * path in public/origins/.
 */

// Explicit overrides for origins whose names don't kebab-case cleanly
const SLUG_OVERRIDES: Record<string, string> = {
  'DBS: Broly': 'dbs-broly',
  'Guardians Vol. 2': 'guardians-vol-2',
  'Age of Ultron': 'age-of-ultron',
  'Infinity War': 'infinity-war',
  'Winter Soldier': 'winter-soldier',
  'Iron Man 2': 'iron-man-2',
  'Pokemon: The Movie': 'pokemon-the-movie',
  'Thor: Ragnarok': 'thor-ragnarok',
}

/** Convert an origin string to a kebab-case filename slug */
function toSlug(origin: string): string {
  if (SLUG_OVERRIDES[origin]) return SLUG_OVERRIDES[origin]
  return origin
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Returns the slug for an origin */
export function getOriginSlug(origin: string): string {
  return toSlug(origin)
}

/** Returns the image path for an origin's poster thumbnail */
export function getOriginImagePath(origin: string): string {
  return `/origins/${toSlug(origin)}.jpg`
}
