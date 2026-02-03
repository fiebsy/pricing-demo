/**
 * Stacking Nav + Table Motion Playground - Mock Data
 *
 * ~94 hand-crafted characters across 3 realms (Marvel, Anime,
 * Westeros) with Gen Z humor throughout.
 *
 * Every faction has at least 1 character per energy type to
 * avoid empty table states at L3.
 */

import {
  type Character,
  CharacterEnergy,
  ThreatLevel,
} from '../config/types'

// =============================================================================
// SEEDED RANDOM (trend sparklines only)
// =============================================================================

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

const randomInRange = (min: number, max: number, seed: number): number => {
  return min + seededRandom(seed) * (max - min)
}

// =============================================================================
// TREND GENERATOR
// =============================================================================

function generateTrend(seed: number): number[] {
  const trend: number[] = []
  let val = randomInRange(30, 70, seed)
  for (let d = 0; d < 30; d++) {
    const delta = randomInRange(-8, 10, seed + 100 + d)
    val = Math.max(5, Math.min(100, val + delta))
    trend.push(Math.round(val))
  }
  return trend
}

// =============================================================================
// CHARACTER DEFINITIONS
// =============================================================================

const E = CharacterEnergy
const T = ThreatLevel

interface CharacterDef {
  name: string
  energy: CharacterEnergy
  threatLevel: ThreatLevel
  origin: string
  description: string
}

// ---------------------------------------------------------------------------
// MARVEL (~35 characters)
// ---------------------------------------------------------------------------

const MARVEL_AVENGERS: CharacterDef[] = [
  { name: 'Tony Stark', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Iron Man', description: 'God complex king' },
  { name: 'Thor', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Thor', description: 'Thunder himbo' },
  { name: 'Black Widow', energy: E.SideQuest, threatLevel: T.ATier, origin: 'The Avengers', description: 'All carry, zero credit' },
  { name: 'Hulk', energy: E.MainCharacter, threatLevel: T.STier, origin: 'The Avengers', description: 'Anger management arc' },
  { name: 'Spider-Man', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Spider-Man', description: 'Has homework tho' },
  { name: 'Wanda', energy: E.VillainArc, threatLevel: T.STier, origin: 'The Avengers', description: 'Gaslit the multiverse' },
  { name: 'Hawkeye', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'The Avengers', description: 'Bow at an alien fight' },
  { name: 'Cap America', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Captain America', description: 'Does the group work' },
  { name: 'War Machine', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Iron Man', description: 'Always second billing' },
  { name: 'Vision', energy: E.NPCEnergy, threatLevel: T.ATier, origin: 'The Avengers', description: 'Wore a sweater, died' },
  { name: 'Falcon', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Captain America', description: 'New Cap, same drama' },
]

const MARVEL_XMEN: CharacterDef[] = [
  { name: 'Wolverine', energy: E.MainCharacter, threatLevel: T.STier, origin: 'X-Men', description: 'Angrier than your wifi' },
  { name: 'Storm', energy: E.MainCharacter, threatLevel: T.STier, origin: 'X-Men', description: 'Controls weather + mood' },
  { name: 'Deadpool', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Deadpool', description: 'Living intrusive thought' },
  { name: 'Magneto', energy: E.VillainArc, threatLevel: T.STier, origin: 'X-Men', description: 'Villain with a point' },
  { name: 'Jean Grey', energy: E.MainCharacter, threatLevel: T.STier, origin: 'X-Men', description: 'Dies, returns stronger' },
  { name: 'Cyclops', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'X-Men', description: 'Substitute teacher aura' },
  { name: 'Gambit', energy: E.SideQuest, threatLevel: T.ATier, origin: 'X-Men', description: 'Flirting is the power' },
  { name: 'Mystique', energy: E.VillainArc, threatLevel: T.ATier, origin: 'X-Men', description: 'Trust issues incarnate' },
  { name: 'Beast', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'X-Men', description: 'Gym bro with tenure' },
]

const MARVEL_GUARDIANS: CharacterDef[] = [
  { name: 'Star-Lord', energy: E.MainCharacter, threatLevel: T.BTier, origin: 'Guardians of the Galaxy', description: 'Peaked in the 80s' },
  { name: 'Groot', energy: E.NPCEnergy, threatLevel: T.ATier, origin: 'Guardians of the Galaxy', description: 'Three words, iconic' },
  { name: 'Rocket', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Guardians of the Galaxy', description: 'Tiny, angry, relatable' },
  { name: 'Gamora', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Guardians of the Galaxy', description: 'Deadliest woman alive' },
  { name: 'Drax', energy: E.NPCEnergy, threatLevel: T.MemeTier, origin: 'Guardians of the Galaxy', description: 'Standing still era' },
  { name: 'Nebula', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Guardians of the Galaxy', description: 'Daddy issues arc' },
  { name: 'Mantis', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Guardians of the Galaxy', description: 'Put Ego to sleep' },
  { name: 'Yondu', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Guardians of the Galaxy', description: 'Space dad energy' },
]

const MARVEL_ROGUES: CharacterDef[] = [
  { name: 'Thanos', energy: E.VillainArc, threatLevel: T.STier, origin: 'The Avengers', description: 'Eco-activist gone wrong' },
  { name: 'Loki', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Thor', description: 'Switches sides often' },
  { name: 'Killmonger', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Black Panther', description: 'Villain who was right' },
  { name: 'Hela', energy: E.VillainArc, threatLevel: T.STier, origin: 'Thor', description: 'Chose absolute violence' },
  { name: 'Green Goblin', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Spider-Man', description: 'Split personality CEO' },
  { name: 'Kingpin', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Daredevil', description: 'White suit, dark crimes' },
  { name: 'Ultron', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'The Avengers', description: 'AI chose chaos day one' },
]

// ---------------------------------------------------------------------------
// ANIME (~24 characters: Dragon Ball + Pokemon)
// ---------------------------------------------------------------------------

const ANIME_DRAGON_BALL: CharacterDef[] = [
  { name: 'Goku', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Dragon Ball', description: 'Left family to fight' },
  { name: 'Vegeta', energy: E.VillainArc, threatLevel: T.STier, origin: 'Dragon Ball', description: 'Inferiority complex arc' },
  { name: 'Gohan', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Dragon Ball', description: 'Peak was Cell Saga' },
  { name: 'Piccolo', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Dragon Ball', description: 'Better dad than Goku' },
  { name: 'Frieza', energy: E.VillainArc, threatLevel: T.STier, origin: 'Dragon Ball', description: '5 minutes took 10 eps' },
  { name: 'Cell', energy: E.VillainArc, threatLevel: T.STier, origin: 'Dragon Ball', description: 'Perfect and knows it' },
  { name: 'Beerus', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Dragon Ball', description: 'Cat nap destroys planets' },
  { name: 'Krillin', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Dragon Ball', description: 'Dying is his power' },
  { name: 'Trunks', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Dragon Ball', description: 'Time travel drip' },
  { name: 'Bulma', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Dragon Ball', description: 'Brains behind the brawn' },
  { name: 'Broly', energy: E.VillainArc, threatLevel: T.STier, origin: 'Dragon Ball', description: 'Pure rage, zero chill' },
  { name: 'Android 18', energy: E.NPCEnergy, threatLevel: T.ATier, origin: 'Dragon Ball', description: 'Married the short one' },
]

const ANIME_POKEMON: CharacterDef[] = [
  { name: 'Ash Ketchum', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Pokemon', description: 'Forever 10 years old' },
  { name: 'Pikachu', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Pokemon', description: 'Refused to evolve, icon' },
  { name: 'Mewtwo', energy: E.VillainArc, threatLevel: T.STier, origin: 'Pokemon', description: 'Existential crisis clone' },
  { name: 'Charizard', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Pokemon', description: 'Disobeyed Ash for fun' },
  { name: 'Misty', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Pokemon', description: 'Bike grudge for seasons' },
  { name: 'Brock', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Pokemon', description: 'Eyes closed, heart open' },
  { name: 'Team Rocket', energy: E.VillainArc, threatLevel: T.MemeTier, origin: 'Pokemon', description: 'Blasting off again' },
  { name: 'Gary Oak', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Pokemon', description: 'Smell ya later energy' },
  { name: 'Prof Oak', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Pokemon', description: 'Forgot his own grandson' },
  { name: 'Meowth', energy: E.SideQuest, threatLevel: T.MemeTier, origin: 'Pokemon', description: 'Learned English, chose crime' },
  { name: 'Snorlax', energy: E.NPCEnergy, threatLevel: T.ATier, origin: 'Pokemon', description: 'Mood is nap, always' },
  { name: 'Eevee', energy: E.MainCharacter, threatLevel: T.BTier, origin: 'Pokemon', description: 'Identity crisis but cute' },
]

// ---------------------------------------------------------------------------
// WESTEROS (~35 characters)
// ---------------------------------------------------------------------------

const WESTEROS_STARK: CharacterDef[] = [
  { name: 'Jon Snow', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Knows nothing, fails up' },
  { name: 'Arya', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Game of Thrones', description: 'Tiny assassin energy' },
  { name: 'Sansa', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Trauma speedrun genius' },
  { name: 'Ned', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Too honorable, found out' },
  { name: 'Bran', energy: E.VillainArc, threatLevel: T.MemeTier, origin: 'Game of Thrones', description: 'Omniscient yet boring' },
  { name: 'Robb', energy: E.MainCharacter, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Lost war for a wedding' },
  { name: 'The Hound', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Just wants chicken' },
  { name: 'Catelyn', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Mom instincts, bad luck' },
  { name: 'Rickon', energy: E.NPCEnergy, threatLevel: T.MemeTier, origin: 'Game of Thrones', description: 'Zigzag was right there' },
  { name: 'Hodor', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'One word, all the tears' },
]

const WESTEROS_TARGARYEN: CharacterDef[] = [
  { name: 'Daenerys', energy: E.VillainArc, threatLevel: T.STier, origin: 'Game of Thrones', description: 'Girlboss to war criminal' },
  { name: 'Daemon', energy: E.MainCharacter, threatLevel: T.STier, origin: 'House of the Dragon', description: 'Red flag with a dragon' },
  { name: 'Rhaenyra', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'House of the Dragon', description: 'Born to rule, proving it' },
  { name: 'Viserys', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'House of the Dragon', description: 'Kept peace, started war' },
  { name: 'Missandei', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Deserved so much better' },
  { name: 'Grey Worm', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Stoic with depth' },
  { name: 'Aegon', energy: E.VillainArc, threatLevel: T.BTier, origin: 'House of the Dragon', description: 'Failson every timeline' },
  { name: 'Rhaenys', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'House of the Dragon', description: 'Queen who never was' },
  { name: 'Jorah', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Friendzoned to death' },
]

const WESTEROS_LANNISTER: CharacterDef[] = [
  { name: 'Tyrion', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Never let him cook' },
  { name: 'Cersei', energy: E.VillainArc, threatLevel: T.STier, origin: 'Game of Thrones', description: 'Revenge is the wine' },
  { name: 'Jaime', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Arc written then deleted' },
  { name: 'Tywin', energy: E.VillainArc, threatLevel: T.STier, origin: 'Game of Thrones', description: 'Scary, no sword needed' },
  { name: 'Joffrey', energy: E.NPCEnergy, threatLevel: T.MemeTier, origin: 'Game of Thrones', description: 'Most punchable face ever' },
  { name: 'Bronn', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Pure capitalism energy' },
  { name: 'The Mountain', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Game of Thrones', description: 'Less words than Groot' },
  { name: 'Myrcella', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Only nice Lannister, died' },
  { name: 'Tommen', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Window speedrun any%' },
]

const WESTEROS_NIGHTS_WATCH: CharacterDef[] = [
  { name: 'Sam', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Nerd saved everyone' },
  { name: 'Tormund', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Himbo with a crush' },
  { name: 'Ygritte', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'We all think it too' },
  { name: 'Mance', energy: E.MainCharacter, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'United clans, died' },
  { name: 'Ghost', energy: E.NPCEnergy, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Deserved more screen' },
  { name: 'Aemon', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Secret Targ, chose duty' },
  { name: 'Jeor Mormont', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Cared, nobody listened' },
  { name: 'Melisandre', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Fire magic, plot device' },
  { name: 'Davos', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Smuggled his way to love' },
]

// =============================================================================
// FACTION REGISTRY
// =============================================================================

interface FactionDef {
  realm: string
  realmLabel: string
  faction: string
  factionLabel: string
  characters: CharacterDef[]
}

const ALL_FACTIONS: FactionDef[] = [
  // Marvel
  { realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', characters: MARVEL_AVENGERS },
  { realm: 'marvel', realmLabel: 'Marvel', faction: 'x-men', factionLabel: 'X-Men', characters: MARVEL_XMEN },
  { realm: 'marvel', realmLabel: 'Marvel', faction: 'guardians', factionLabel: 'Guardians', characters: MARVEL_GUARDIANS },
  { realm: 'marvel', realmLabel: 'Marvel', faction: 'rogues-gallery', factionLabel: 'Rogues Gallery', characters: MARVEL_ROGUES },
  // Anime
  { realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', characters: ANIME_DRAGON_BALL },
  { realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', characters: ANIME_POKEMON },
  // Westeros
  { realm: 'westeros', realmLabel: 'Westeros', faction: 'house-stark', factionLabel: 'House Stark', characters: WESTEROS_STARK },
  { realm: 'westeros', realmLabel: 'Westeros', faction: 'house-targaryen', factionLabel: 'House Targaryen', characters: WESTEROS_TARGARYEN },
  { realm: 'westeros', realmLabel: 'Westeros', faction: 'house-lannister', factionLabel: 'House Lannister', characters: WESTEROS_LANNISTER },
  { realm: 'westeros', realmLabel: 'Westeros', faction: 'nights-watch', factionLabel: "Night's Watch", characters: WESTEROS_NIGHTS_WATCH },
]

// =============================================================================
// HELPERS
// =============================================================================

/** "Tony Stark" → "tony-stark" */
const toSlug = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, '-')

// =============================================================================
// DATA GENERATOR
// =============================================================================

const generateCharacters = (): Character[] => {
  const characters: Character[] = []
  let idx = 0

  for (const factionDef of ALL_FACTIONS) {
    for (const def of factionDef.characters) {
      characters.push({
        id: 1000 + idx,
        name: def.name,
        slug: toSlug(def.name),
        realm: factionDef.realm,
        realmLabel: factionDef.realmLabel,
        faction: factionDef.faction,
        factionLabel: factionDef.factionLabel,
        energy: def.energy,
        threatLevel: def.threatLevel,
        origin: def.origin,
        description: def.description,
        trend: generateTrend(idx * 100 + 9),
      })
      idx++
    }
  }

  return characters
}

// =============================================================================
// LAZY INITIALIZATION
// =============================================================================

let _characters: Character[] | null = null

export const CHARACTER_DATA: Character[] = new Proxy([] as Character[], {
  get(target, prop) {
    if (_characters === null) {
      _characters = generateCharacters()
    }
    return Reflect.get(_characters, prop)
  },
  set(target, prop, value) {
    if (_characters === null) {
      _characters = generateCharacters()
    }
    return Reflect.set(_characters, prop, value)
  },
})

export { generateCharacters }
