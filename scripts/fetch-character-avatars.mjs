/**
 * Multi-API script to download character avatar images.
 *
 * Sources:
 *   - TMDB:    Marvel + Westeros actor headshots (70 characters)
 *   - Jikan:   Dragon Ball + Pokemon humans — anime character art (18 characters)
 *   - PokéAPI: Pokemon creatures — official artwork sprites (6 characters)
 *
 * Usage:
 *   node scripts/fetch-character-avatars.mjs
 *
 * Reads TMDB_API_KEY from .env.local (or env var override).
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = join(__dirname, '..')
const OUT_DIR = join(ROOT_DIR, 'public', 'character-avatars')

// ---------------------------------------------------------------------------
// Load .env.local
// ---------------------------------------------------------------------------

async function loadEnvLocal() {
  const envPath = join(ROOT_DIR, '.env.local')
  if (!existsSync(envPath)) return
  const content = await readFile(envPath, 'utf-8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const value = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
}

await loadEnvLocal()

const API_KEY = process.env.TMDB_API_KEY
if (!API_KEY) {
  console.error('Missing TMDB_API_KEY. Add it to .env.local or pass as env var.')
  process.exit(1)
}

// ---------------------------------------------------------------------------
// API base URLs
// ---------------------------------------------------------------------------

const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_IMG = 'https://image.tmdb.org/t/p/w185'
const JIKAN_BASE = 'https://api.jikan.moe/v4'
const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ---------------------------------------------------------------------------
// Character → source routing
// ---------------------------------------------------------------------------

/** Which API to use for each character */
function getSource(name, realm, faction) {
  if (realm !== 'anime') return 'tmdb'

  // Pokemon creatures → PokéAPI
  if (POKEAPI_SLUGS[name]) return 'pokeapi'

  // All other anime (Dragon Ball + Pokemon humans) → Jikan
  return 'jikan'
}

// ---------------------------------------------------------------------------
// Character → TMDB credit name overrides
// ---------------------------------------------------------------------------

const CREDIT_NAME_OVERRIDES = {
  'Cap America': 'Steve Rogers',
  'Wanda': 'Wanda Maximoff',
  'Falcon': 'Sam Wilson',
  'War Machine': 'James Rhodes',
  'Vision': 'Vision',
  'Hawkeye': 'Clint Barton',
  'Black Widow': 'Natasha Romanoff',
  'Hulk': 'Bruce Banner',
  'Spider-Man': 'Peter Parker',
  'Star-Lord': 'Peter Quill',
  'Groot': 'Groot',
  'Rocket': 'Rocket',
  'Gamora': 'Gamora',
  'Drax': 'Drax',
  'Nebula': 'Nebula',
  'Mantis': 'Mantis',
  'Yondu': 'Yondu',
  'Wolverine': 'Logan',
  'Storm': 'Storm',
  'Deadpool': 'Wade Wilson',
  'Magneto': 'Erik Lehnsherr',
  'Jean Grey': 'Jean Grey',
  'Cyclops': 'Scott Summers',
  'Gambit': 'Remy LeBeau',
  'Mystique': 'Mystique',
  'Beast': 'Hank McCoy',
  'Thanos': 'Thanos',
  'Loki': 'Loki',
  'Killmonger': 'Erik Killmonger',
  'Hela': 'Hela',
  'Green Goblin': 'Green Goblin',
  'Kingpin': 'Wilson Fisk',
  'Ultron': 'Ultron',
  'Ned': 'Eddard Stark',
  'The Hound': 'Sandor Clegane',
  'The Mountain': 'Gregor Clegane',
  'Sam': 'Samwell Tarly',
  'Arya': 'Arya Stark',
  'Sansa': 'Sansa Stark',
  'Bran': 'Brandon Stark',
  'Robb': 'Robb Stark',
  'Catelyn': 'Catelyn Stark',
  'Rickon': 'Rickon Stark',
  'Hodor': 'Hodor',
  'Daenerys': 'Daenerys Targaryen',
  'Daemon': 'Daemon Targaryen',
  'Rhaenyra': 'Rhaenyra Targaryen',
  'Viserys': 'Viserys',
  'Missandei': 'Missandei',
  'Grey Worm': 'Grey Worm',
  'Aegon': 'Aegon',
  'Rhaenys': 'Rhaenys',
  'Jorah': 'Jorah Mormont',
  'Tyrion': 'Tyrion Lannister',
  'Cersei': 'Cersei Lannister',
  'Jaime': 'Jaime Lannister',
  'Tywin': 'Tywin Lannister',
  'Joffrey': 'Joffrey',
  'Bronn': 'Bronn',
  'Myrcella': 'Myrcella',
  'Tommen': 'Tommen',
  'Tormund': 'Tormund',
  'Ygritte': 'Ygritte',
  'Mance': 'Mance Rayder',
  'Ghost': 'Ghost',
  'Aemon': 'Aemon',
  'Jeor Mormont': 'Jeor Mormont',
  'Melisandre': 'Melisandre',
  'Davos': 'Davos Seaworth',
  'Jon Snow': 'Jon Snow',
  'Tony Stark': 'Tony Stark',
  'Thor': 'Thor',
}

// ---------------------------------------------------------------------------
// Jikan name overrides (MAL search names)
// ---------------------------------------------------------------------------

const JIKAN_NAME_OVERRIDES = {
  'Android 18': 'Android 18',
  'Prof Oak': 'Professor Oak',
  'Team Rocket': 'Musashi', // Jessie's Japanese name — better MAL match
  'Ash Ketchum': 'Satoshi',
  'Gary Oak': 'Shigeru',
  'Misty': 'Kasumi',
  'Brock': 'Takeshi',
}

// ---------------------------------------------------------------------------
// PokéAPI slug mapping (lowercase pokemon names)
// ---------------------------------------------------------------------------

const POKEAPI_SLUGS = {
  'Pikachu': 'pikachu',
  'Mewtwo': 'mewtwo',
  'Charizard': 'charizard',
  'Meowth': 'meowth',
  'Snorlax': 'snorlax',
  'Eevee': 'eevee',
}

// ---------------------------------------------------------------------------
// Character definitions: [name, slug, origin query, media type, realm, faction]
// ---------------------------------------------------------------------------

const CHARACTERS = [
  // Marvel - Avengers
  ['Tony Stark', 'tony-stark', 'Iron Man', 'movie', 'marvel', 'avengers'],
  ['Thor', 'thor', 'Thor', 'movie', 'marvel', 'avengers'],
  ['Black Widow', 'black-widow', 'The Avengers', 'movie', 'marvel', 'avengers'],
  ['Hulk', 'hulk', 'The Avengers', 'movie', 'marvel', 'avengers'],
  ['Spider-Man', 'spider-man', 'Spider-Man', 'movie', 'marvel', 'avengers'],
  ['Wanda', 'wanda', 'WandaVision', 'tv', 'marvel', 'avengers'],
  ['Hawkeye', 'hawkeye', 'The Avengers', 'movie', 'marvel', 'avengers'],
  ['Cap America', 'cap-america', 'Captain America: The First Avenger', 'movie', 'marvel', 'avengers'],
  ['War Machine', 'war-machine', 'Iron Man 2', 'movie', 'marvel', 'avengers'],
  ['Vision', 'vision', 'Avengers: Age of Ultron', 'movie', 'marvel', 'avengers'],
  ['Falcon', 'falcon', 'Captain America: The Winter Soldier', 'movie', 'marvel', 'avengers'],
  // Marvel - X-Men
  ['Wolverine', 'wolverine', 'X-Men', 'movie', 'marvel', 'x-men'],
  ['Storm', 'storm', 'X-Men', 'movie', 'marvel', 'x-men'],
  ['Deadpool', 'deadpool', 'Deadpool', 'movie', 'marvel', 'x-men'],
  ['Magneto', 'magneto', 'X-Men', 'movie', 'marvel', 'x-men'],
  ['Jean Grey', 'jean-grey', 'X-Men', 'movie', 'marvel', 'x-men'],
  ['Cyclops', 'cyclops', 'X-Men', 'movie', 'marvel', 'x-men'],
  ['Gambit', 'gambit', 'X-Men Origins: Wolverine', 'movie', 'marvel', 'x-men'],
  ['Mystique', 'mystique', 'X-Men', 'movie', 'marvel', 'x-men'],
  ['Beast', 'beast', 'X-Men', 'movie', 'marvel', 'x-men'],
  // Marvel - Guardians
  ['Star-Lord', 'star-lord', 'Guardians of the Galaxy', 'movie', 'marvel', 'guardians'],
  ['Groot', 'groot', 'Guardians of the Galaxy', 'movie', 'marvel', 'guardians'],
  ['Rocket', 'rocket', 'Guardians of the Galaxy', 'movie', 'marvel', 'guardians'],
  ['Gamora', 'gamora', 'Guardians of the Galaxy', 'movie', 'marvel', 'guardians'],
  ['Drax', 'drax', 'Guardians of the Galaxy', 'movie', 'marvel', 'guardians'],
  ['Nebula', 'nebula', 'Guardians of the Galaxy', 'movie', 'marvel', 'guardians'],
  ['Mantis', 'mantis', 'Guardians of the Galaxy Vol. 2', 'movie', 'marvel', 'guardians'],
  ['Yondu', 'yondu', 'Guardians of the Galaxy', 'movie', 'marvel', 'guardians'],
  // Marvel - Rogues Gallery
  ['Thanos', 'thanos', 'Avengers: Infinity War', 'movie', 'marvel', 'rogues-gallery'],
  ['Loki', 'loki', 'Thor', 'movie', 'marvel', 'rogues-gallery'],
  ['Killmonger', 'killmonger', 'Black Panther', 'movie', 'marvel', 'rogues-gallery'],
  ['Hela', 'hela', 'Thor: Ragnarok', 'movie', 'marvel', 'rogues-gallery'],
  ['Green Goblin', 'green-goblin', 'Spider-Man', 'movie', 'marvel', 'rogues-gallery'],
  ['Kingpin', 'kingpin', 'Daredevil', 'tv', 'marvel', 'rogues-gallery'],
  ['Ultron', 'ultron', 'Avengers: Age of Ultron', 'movie', 'marvel', 'rogues-gallery'],
  // Anime - Dragon Ball
  ['Goku', 'goku', 'Dragon Ball Z', 'tv', 'anime', 'dragon-ball'],
  ['Vegeta', 'vegeta', 'Dragon Ball Z', 'tv', 'anime', 'dragon-ball'],
  ['Gohan', 'gohan', 'Dragon Ball Z', 'tv', 'anime', 'dragon-ball'],
  ['Piccolo', 'piccolo', 'Dragon Ball', 'tv', 'anime', 'dragon-ball'],
  ['Frieza', 'frieza', 'Dragon Ball Z', 'tv', 'anime', 'dragon-ball'],
  ['Cell', 'cell', 'Dragon Ball Z', 'tv', 'anime', 'dragon-ball'],
  ['Beerus', 'beerus', 'Dragon Ball Super', 'tv', 'anime', 'dragon-ball'],
  ['Krillin', 'krillin', 'Dragon Ball', 'tv', 'anime', 'dragon-ball'],
  ['Trunks', 'trunks', 'Dragon Ball Z', 'tv', 'anime', 'dragon-ball'],
  ['Bulma', 'bulma', 'Dragon Ball', 'tv', 'anime', 'dragon-ball'],
  ['Broly', 'broly', 'Dragon Ball Super: Broly', 'movie', 'anime', 'dragon-ball'],
  ['Android 18', 'android-18', 'Dragon Ball Z', 'tv', 'anime', 'dragon-ball'],
  // Anime - Pokemon
  ['Ash Ketchum', 'ash-ketchum', 'Pokemon', 'tv', 'anime', 'pokemon'],
  ['Pikachu', 'pikachu', 'Pokemon', 'tv', 'anime', 'pokemon'],
  ['Mewtwo', 'mewtwo', "Pokémon: The First Movie", 'movie', 'anime', 'pokemon'],
  ['Charizard', 'charizard', 'Pokemon', 'tv', 'anime', 'pokemon'],
  ['Misty', 'misty', 'Pokemon', 'tv', 'anime', 'pokemon'],
  ['Brock', 'brock', 'Pokemon', 'tv', 'anime', 'pokemon'],
  ['Team Rocket', 'team-rocket', 'Pokemon', 'tv', 'anime', 'pokemon'],
  ['Gary Oak', 'gary-oak', 'Pokemon', 'tv', 'anime', 'pokemon'],
  ['Prof Oak', 'prof-oak', 'Pokemon', 'tv', 'anime', 'pokemon'],
  ['Meowth', 'meowth', 'Pokemon', 'tv', 'anime', 'pokemon'],
  ['Snorlax', 'snorlax', 'Pokemon', 'tv', 'anime', 'pokemon'],
  ['Eevee', 'eevee', 'Pokemon', 'tv', 'anime', 'pokemon'],
  // Westeros - Stark
  ['Jon Snow', 'jon-snow', 'Game of Thrones', 'tv', 'westeros', 'house-stark'],
  ['Arya', 'arya', 'Game of Thrones', 'tv', 'westeros', 'house-stark'],
  ['Sansa', 'sansa', 'Game of Thrones', 'tv', 'westeros', 'house-stark'],
  ['Ned', 'ned', 'Game of Thrones', 'tv', 'westeros', 'house-stark'],
  ['Bran', 'bran', 'Game of Thrones', 'tv', 'westeros', 'house-stark'],
  ['Robb', 'robb', 'Game of Thrones', 'tv', 'westeros', 'house-stark'],
  ['The Hound', 'the-hound', 'Game of Thrones', 'tv', 'westeros', 'house-stark'],
  ['Catelyn', 'catelyn', 'Game of Thrones', 'tv', 'westeros', 'house-stark'],
  ['Rickon', 'rickon', 'Game of Thrones', 'tv', 'westeros', 'house-stark'],
  ['Hodor', 'hodor', 'Game of Thrones', 'tv', 'westeros', 'house-stark'],
  // Westeros - Targaryen
  ['Daenerys', 'daenerys', 'Game of Thrones', 'tv', 'westeros', 'house-targaryen'],
  ['Daemon', 'daemon', 'House of the Dragon', 'tv', 'westeros', 'house-targaryen'],
  ['Rhaenyra', 'rhaenyra', 'House of the Dragon', 'tv', 'westeros', 'house-targaryen'],
  ['Viserys', 'viserys', 'House of the Dragon', 'tv', 'westeros', 'house-targaryen'],
  ['Missandei', 'missandei', 'Game of Thrones', 'tv', 'westeros', 'house-targaryen'],
  ['Grey Worm', 'grey-worm', 'Game of Thrones', 'tv', 'westeros', 'house-targaryen'],
  ['Aegon', 'aegon', 'House of the Dragon', 'tv', 'westeros', 'house-targaryen'],
  ['Rhaenys', 'rhaenys', 'House of the Dragon', 'tv', 'westeros', 'house-targaryen'],
  ['Jorah', 'jorah', 'Game of Thrones', 'tv', 'westeros', 'house-targaryen'],
  // Westeros - Lannister
  ['Tyrion', 'tyrion', 'Game of Thrones', 'tv', 'westeros', 'house-lannister'],
  ['Cersei', 'cersei', 'Game of Thrones', 'tv', 'westeros', 'house-lannister'],
  ['Jaime', 'jaime', 'Game of Thrones', 'tv', 'westeros', 'house-lannister'],
  ['Tywin', 'tywin', 'Game of Thrones', 'tv', 'westeros', 'house-lannister'],
  ['Joffrey', 'joffrey', 'Game of Thrones', 'tv', 'westeros', 'house-lannister'],
  ['Bronn', 'bronn', 'Game of Thrones', 'tv', 'westeros', 'house-lannister'],
  ['The Mountain', 'the-mountain', 'Game of Thrones', 'tv', 'westeros', 'house-lannister'],
  ['Myrcella', 'myrcella', 'Game of Thrones', 'tv', 'westeros', 'house-lannister'],
  ['Tommen', 'tommen', 'Game of Thrones', 'tv', 'westeros', 'house-lannister'],
  // Westeros - Night's Watch
  ['Sam', 'sam', 'Game of Thrones', 'tv', 'westeros', 'nights-watch'],
  ['Tormund', 'tormund', 'Game of Thrones', 'tv', 'westeros', 'nights-watch'],
  ['Ygritte', 'ygritte', 'Game of Thrones', 'tv', 'westeros', 'nights-watch'],
  ['Mance', 'mance', 'Game of Thrones', 'tv', 'westeros', 'nights-watch'],
  ['Ghost', 'ghost', 'Game of Thrones', 'tv', 'westeros', 'nights-watch'],
  ['Aemon', 'aemon', 'Game of Thrones', 'tv', 'westeros', 'nights-watch'],
  ['Jeor Mormont', 'jeor-mormont', 'Game of Thrones', 'tv', 'westeros', 'nights-watch'],
  ['Melisandre', 'melisandre', 'Game of Thrones', 'tv', 'westeros', 'nights-watch'],
  ['Davos', 'davos', 'Game of Thrones', 'tv', 'westeros', 'nights-watch'],
]

// =========================================================================
// TMDB fetcher (unchanged for Marvel + Westeros)
// =========================================================================

const tmdbCache = new Map()

async function searchTMDB(query, type) {
  const cacheKey = `${type}:${query}`
  if (tmdbCache.has(cacheKey)) return tmdbCache.get(cacheKey)

  const endpoint = type === 'tv' ? 'search/tv' : 'search/movie'
  const url = `${TMDB_BASE}/${endpoint}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`TMDB search failed (${res.status}): ${query}`)
  const data = await res.json()
  const result = data.results?.[0] ?? null
  tmdbCache.set(cacheKey, result)
  return result
}

const creditsCache = new Map()

async function fetchCredits(tmdbId, type) {
  const cacheKey = `${type}:${tmdbId}`
  if (creditsCache.has(cacheKey)) return creditsCache.get(cacheKey)

  const mediaType = type === 'tv' ? 'tv' : 'movie'
  const creditsPath = type === 'tv' ? 'aggregate_credits' : 'credits'
  const url = `${TMDB_BASE}/${mediaType}/${tmdbId}/${creditsPath}?api_key=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Credits fetch failed (${res.status}): ${mediaType}/${tmdbId}`)
  const data = await res.json()
  creditsCache.set(cacheKey, data)
  return data
}

function normalizeCredit(name) {
  return name
    .replace(/'[^']*'/g, ' ')
    .replace(/\b(sir|lord|lady|ser|prince|princess|king|queen)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function matchesCharacter(creditName, searchName) {
  if (!creditName || creditName.length < 2) return false
  const credit = normalizeCredit(creditName)
  return credit.includes(searchName) || searchName.includes(credit)
}

function findCharacterInCredits(credits, characterName, type) {
  const searchName = (CREDIT_NAME_OVERRIDES[characterName] ?? characterName).toLowerCase()
  const cast = credits.cast ?? []

  if (type === 'tv') {
    for (const member of cast) {
      const roles = member.roles ?? []
      for (const role of roles) {
        if (matchesCharacter(role.character, searchName)) {
          return member.profile_path
        }
      }
    }
  } else {
    for (const member of cast) {
      if (matchesCharacter(member.character, searchName)) {
        return member.profile_path
      }
    }
  }

  return null
}

async function fetchTMDB(name, slug, originQuery, type) {
  const searchResult = await searchTMDB(originQuery, type)
  if (!searchResult) throw new Error(`No TMDB result for "${originQuery}"`)

  const credits = await fetchCredits(searchResult.id, type)
  const profilePath = findCharacterInCredits(credits, name, type)
  if (!profilePath) throw new Error(`No credits match for "${CREDIT_NAME_OVERRIDES[name] ?? name}"`)

  const url = `${TMDB_IMG}${profilePath}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Image download failed (${res.status}): ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const outPath = join(OUT_DIR, `${slug}.jpg`)
  await writeFile(outPath, buffer)
  return { path: outPath, ext: 'jpg' }
}

// =========================================================================
// Jikan fetcher (Dragon Ball + Pokemon humans)
// =========================================================================

async function fetchJikan(name, slug, retries = 2) {
  const searchName = JIKAN_NAME_OVERRIDES[name] ?? name
  const url = `${JIKAN_BASE}/characters?q=${encodeURIComponent(searchName)}&limit=5`
  const res = await fetch(url)
  if (res.status === 429 && retries > 0) {
    await sleep(1500)
    return fetchJikan(name, slug, retries - 1)
  }
  if (!res.ok) throw new Error(`Jikan search failed (${res.status}): ${searchName}`)
  const data = await res.json()

  const match = data.data?.[0]
  if (!match) throw new Error(`No Jikan result for "${searchName}"`)

  const imageUrl = match.images?.jpg?.image_url
  if (!imageUrl) throw new Error(`No image for Jikan character "${match.name}"`)

  const imgRes = await fetch(imageUrl)
  if (!imgRes.ok) throw new Error(`Jikan image download failed (${imgRes.status}): ${imageUrl}`)
  const buffer = Buffer.from(await imgRes.arrayBuffer())
  const outPath = join(OUT_DIR, `${slug}.jpg`)
  await writeFile(outPath, buffer)
  return { path: outPath, ext: 'jpg' }
}

// =========================================================================
// PokéAPI fetcher (Pokemon creatures)
// =========================================================================

async function fetchPokeAPI(name, slug) {
  const pokemonSlug = POKEAPI_SLUGS[name]
  if (!pokemonSlug) throw new Error(`No PokéAPI slug for "${name}"`)

  const url = `${POKEAPI_BASE}/pokemon/${pokemonSlug}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`PokéAPI fetch failed (${res.status}): ${pokemonSlug}`)
  const data = await res.json()

  const imageUrl = data.sprites?.other?.['official-artwork']?.front_default
  if (!imageUrl) throw new Error(`No official artwork for "${pokemonSlug}"`)

  const imgRes = await fetch(imageUrl)
  if (!imgRes.ok) throw new Error(`PokéAPI image download failed (${imgRes.status}): ${imageUrl}`)
  const buffer = Buffer.from(await imgRes.arrayBuffer())
  const outPath = join(OUT_DIR, `${slug}.png`)
  await writeFile(outPath, buffer)
  return { path: outPath, ext: 'png' }
}

// =========================================================================
// Main
// =========================================================================

async function main() {
  if (!existsSync(OUT_DIR)) {
    await mkdir(OUT_DIR, { recursive: true })
  }

  const counts = { tmdb: 0, jikan: 0, pokeapi: 0 }
  for (const [name,,,, realm, faction] of CHARACTERS) {
    counts[getSource(name, realm, faction)]++
  }

  console.log(`Fetching avatars for ${CHARACTERS.length} characters`)
  console.log(`  TMDB: ${counts.tmdb} | Jikan: ${counts.jikan} | PokéAPI: ${counts.pokeapi}\n`)

  let success = 0
  let failed = 0

  for (const [name, slug, originQuery, type, realm, faction] of CHARACTERS) {
    const source = getSource(name, realm, faction)

    try {
      let result

      switch (source) {
        case 'tmdb':
          result = await fetchTMDB(name, slug, originQuery, type)
          break

        case 'jikan':
          result = await fetchJikan(name, slug)
          // Respect Jikan rate limit: ~3 req/sec
          await sleep(500)
          break

        case 'pokeapi':
          result = await fetchPokeAPI(name, slug)
          break
      }

      const kb = statSync(result.path).size / 1024
      console.log(`  OK    ${name} → ${slug}.${result.ext} (${source}, ${kb.toFixed(1)}KB)`)
      success++
    } catch (err) {
      console.log(`  FAIL  ${name} [${source}] — ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed`)
}

main()
