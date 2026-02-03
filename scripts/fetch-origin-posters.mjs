/**
 * One-time script to download poster thumbnails from TMDB for all 25
 * unique origins used in the stacking-nav-table playground.
 *
 * Usage:
 *   TMDB_API_KEY=xxx node scripts/fetch-origin-posters.mjs
 *
 * Get a free API key at https://www.themoviedb.org/settings/api
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'origins')

const API_KEY = process.env.TMDB_API_KEY
if (!API_KEY) {
  console.error('Missing TMDB_API_KEY env var. Get one at https://www.themoviedb.org/settings/api')
  process.exit(1)
}

const BASE = 'https://api.themoviedb.org/3'
const IMG_BASE = 'https://image.tmdb.org/t/p/w92'

// ---------------------------------------------------------------------------
// Origin definitions: [origin string, slug, TMDB search query, media type]
// ---------------------------------------------------------------------------

const ORIGINS = [
  // Marvel
  ['Iron Man', 'iron-man', 'Iron Man', 'movie'],
  ['Thor', 'thor', 'Thor', 'movie'],
  ['The Avengers', 'the-avengers', 'The Avengers', 'movie'],
  ['Spider-Man', 'spider-man', 'Spider-Man', 'movie'],
  ['WandaVision', 'wandavision', 'WandaVision', 'tv'],
  ['Captain America', 'captain-america', 'Captain America: The First Avenger', 'movie'],
  ['Iron Man 2', 'iron-man-2', 'Iron Man 2', 'movie'],
  ['Age of Ultron', 'age-of-ultron', 'Avengers: Age of Ultron', 'movie'],
  ['Winter Soldier', 'winter-soldier', 'Captain America: The Winter Soldier', 'movie'],
  ['X-Men', 'x-men', 'X-Men', 'movie'],
  ['Deadpool', 'deadpool', 'Deadpool', 'movie'],
  ['Guardians of the Galaxy', 'guardians-of-the-galaxy', 'Guardians of the Galaxy', 'movie'],
  ['Guardians Vol. 2', 'guardians-vol-2', 'Guardians of the Galaxy Vol. 2', 'movie'],
  ['Infinity War', 'infinity-war', 'Avengers: Infinity War', 'movie'],
  ['Black Panther', 'black-panther', 'Black Panther', 'movie'],
  ['Thor: Ragnarok', 'thor-ragnarok', 'Thor: Ragnarok', 'movie'],
  ['Daredevil', 'daredevil', 'Daredevil', 'tv'],
  // Anime
  ['Dragon Ball Z', 'dragon-ball-z', 'Dragon Ball Z', 'tv'],
  ['Dragon Ball', 'dragon-ball', 'Dragon Ball', 'tv'],
  ['Dragon Ball Super', 'dragon-ball-super', 'Dragon Ball Super', 'tv'],
  ['DBS: Broly', 'dbs-broly', 'Dragon Ball Super: Broly', 'movie'],
  ['Pokemon', 'pokemon', 'Pokemon', 'tv'],
  ['Pokemon: The Movie', 'pokemon-the-movie', "Pokémon: The First Movie", 'movie'],
  // Westeros
  ['Game of Thrones', 'game-of-thrones', 'Game of Thrones', 'tv'],
  ['House of the Dragon', 'house-of-the-dragon', 'House of the Dragon', 'tv'],
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function searchTMDB(query, type) {
  const endpoint = type === 'tv' ? 'search/tv' : 'search/movie'
  const url = `${BASE}/${endpoint}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`TMDB search failed (${res.status}): ${query}`)
  const data = await res.json()
  return data.results?.[0] ?? null
}

async function downloadImage(posterPath, slug) {
  const url = `${IMG_BASE}${posterPath}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Image download failed (${res.status}): ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const outPath = join(OUT_DIR, `${slug}.jpg`)
  await writeFile(outPath, buffer)
  return outPath
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!existsSync(OUT_DIR)) {
    await mkdir(OUT_DIR, { recursive: true })
  }

  console.log(`Fetching posters for ${ORIGINS.length} origins...\n`)

  let success = 0
  let failed = 0

  for (const [origin, slug, query, type] of ORIGINS) {
    try {
      const result = await searchTMDB(query, type)
      if (!result?.poster_path) {
        console.log(`  SKIP  ${origin} — no poster found`)
        failed++
        continue
      }
      const outPath = await downloadImage(result.poster_path, slug)
      const kb = (await import('node:fs')).statSync(outPath).size / 1024
      console.log(`  OK    ${origin} → ${slug}.jpg (${kb.toFixed(1)}KB)`)
      success++
    } catch (err) {
      console.log(`  FAIL  ${origin} — ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed`)
}

main()
