/**
 * Download logo and backdrop alternatives for origin comparison.
 * Saves to public/origins-logos/ and public/origins-backdrops/
 *
 * Usage:
 *   TMDB_API_KEY=xxx node scripts/fetch-origin-alternatives.mjs
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LOGOS_DIR = join(__dirname, '..', 'public', 'origins-logos')
const BACKDROPS_DIR = join(__dirname, '..', 'public', 'origins-backdrops')

const API_KEY = process.env.TMDB_API_KEY
if (!API_KEY) {
  console.error('Missing TMDB_API_KEY env var.')
  process.exit(1)
}

const BASE = 'https://api.themoviedb.org/3'
const IMG_BASE = 'https://image.tmdb.org/t/p'

const ORIGINS = [
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
  ['Dragon Ball Z', 'dragon-ball-z', 'Dragon Ball Z', 'tv'],
  ['Dragon Ball', 'dragon-ball', 'Dragon Ball', 'tv'],
  ['Dragon Ball Super', 'dragon-ball-super', 'Dragon Ball Super', 'tv'],
  ['DBS: Broly', 'dbs-broly', 'Dragon Ball Super: Broly', 'movie'],
  ['Pokemon', 'pokemon', 'Pokemon', 'tv'],
  ['Pokemon: The Movie', 'pokemon-the-movie', "Pokémon: The First Movie", 'movie'],
  ['Game of Thrones', 'game-of-thrones', 'Game of Thrones', 'tv'],
  ['House of the Dragon', 'house-of-the-dragon', 'House of the Dragon', 'tv'],
]

async function searchTMDB(query, type) {
  const endpoint = type === 'tv' ? 'search/tv' : 'search/movie'
  const url = `${BASE}/${endpoint}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Search failed (${res.status}): ${query}`)
  const data = await res.json()
  return data.results?.[0] ?? null
}

async function getImages(id, type) {
  const mediaType = type === 'tv' ? 'tv' : 'movie'
  const url = `${BASE}/${mediaType}/${id}/images?api_key=${API_KEY}&include_image_language=en,null`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Images fetch failed (${res.status})`)
  return await res.json()
}

async function downloadImage(path, size, outPath) {
  const url = `${IMG_BASE}/${size}${path}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  await writeFile(outPath, buffer)
  return statSync(outPath).size / 1024
}

async function main() {
  for (const dir of [LOGOS_DIR, BACKDROPS_DIR]) {
    if (!existsSync(dir)) await mkdir(dir, { recursive: true })
  }

  console.log('Fetching logos and backdrops for comparison...\n')

  let logoOk = 0, logoFail = 0, bdOk = 0, bdFail = 0

  for (const [origin, slug, query, type] of ORIGINS) {
    const result = await searchTMDB(query, type)
    if (!result) {
      console.log(`  SKIP  ${origin} — not found`)
      logoFail++
      bdFail++
      continue
    }

    const images = await getImages(result.id, type)

    // Logo — prefer English, smallest useful size (w185)
    const logo = images.logos?.[0]
    if (logo?.file_path) {
      try {
        const ext = logo.file_path.endsWith('.svg') ? 'svg' : 'png'
        const outPath = join(LOGOS_DIR, `${slug}.${ext}`)
        const kb = await downloadImage(logo.file_path, 'w185', outPath)
        console.log(`  LOGO  ${origin} → ${slug}.${ext} (${kb.toFixed(1)}KB)`)
        logoOk++
      } catch (err) {
        console.log(`  LOGO  ${origin} — FAIL: ${err.message}`)
        logoFail++
      }
    } else {
      console.log(`  LOGO  ${origin} — none available`)
      logoFail++
    }

    // Backdrop — smallest size (w300)
    const backdrop = images.backdrops?.[0]
    if (backdrop?.file_path) {
      try {
        const outPath = join(BACKDROPS_DIR, `${slug}.jpg`)
        const kb = await downloadImage(backdrop.file_path, 'w300', outPath)
        console.log(`  BACK  ${origin} → ${slug}.jpg (${kb.toFixed(1)}KB)`)
        bdOk++
      } catch (err) {
        console.log(`  BACK  ${origin} — FAIL: ${err.message}`)
        bdFail++
      }
    } else {
      console.log(`  BACK  ${origin} — none available`)
      bdFail++
    }

    console.log('')
  }

  console.log(`Logos: ${logoOk} downloaded, ${logoFail} missing/failed`)
  console.log(`Backdrops: ${bdOk} downloaded, ${bdFail} missing/failed`)
}

main()
