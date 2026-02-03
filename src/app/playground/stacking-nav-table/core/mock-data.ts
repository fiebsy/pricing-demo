/**
 * Stacking Nav + Table Playground - Mock Data
 *
 * ~94 hand-crafted characters across 3 realms (Marvel, Anime,
 * Westeros) with Gen Z humor throughout.
 *
 * Every faction has at least 1 character per energy type to
 * avoid empty table states at L3.
 *
 * POWER LEVELS (threatLevel):
 * - S-Tier: God-level, reality-warping, universal threat
 * - A-Tier: Superhuman, can solo armies, major threat
 * - B-Tier: Peak human or minor powers, skilled but limited
 * - Meme-Tier: Comedic/weak, memorable for reasons other than power
 *
 * TREND DATA (livesRescued):
 * - Range: -100 to +100 (signed sparkline)
 * - Positive = lives saved (heroes)
 * - Negative = lives taken/endangered (villains)
 */

import {
  type Character,
  CharacterEnergy,
  ThreatLevel,
} from '../config/types'

// =============================================================================
// CHARACTER ARCHETYPES (for trend generation)
// =============================================================================

type CharacterArchetype =
  | 'pure-hero'        // +50 to +95, stable positive
  | 'anti-hero'        // -20 to +60, volatile, crosses zero
  | 'villain'          // -90 to -20, negative with occasional spikes
  | 'redeemed'         // -40 → +60, upward trend
  | 'fallen'           // +60 → -40, downward trend
  | 'neutral'          // -10 to +30, near zero, flat
  | 'mass-casualty'    // -60 to -100 with -100 spikes
  | 'incompetent'      // -20 to +5, near-zero negative, comedic

// =============================================================================
// SEEDED RANDOM (for deterministic trends)
// =============================================================================

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

const randomInRange = (min: number, max: number, seed: number): number => {
  return min + seededRandom(seed) * (max - min)
}

// =============================================================================
// ARCHETYPE-BASED TREND GENERATORS
// =============================================================================

function generatePureHeroTrend(seed: number): number[] {
  // +50 to +95, high positive, stable
  const trend: number[] = []
  let val = randomInRange(65, 85, seed)
  for (let d = 0; d < 30; d++) {
    const delta = randomInRange(-5, 6, seed + 100 + d)
    val = Math.max(50, Math.min(95, val + delta))
    trend.push(Math.round(val))
  }
  return trend
}

function generateAntiHeroTrend(seed: number): number[] {
  // -20 to +60, volatile, crosses zero frequently
  const trend: number[] = []
  let val = randomInRange(10, 40, seed)
  for (let d = 0; d < 30; d++) {
    const delta = randomInRange(-15, 18, seed + 100 + d)
    val = Math.max(-20, Math.min(60, val + delta))
    trend.push(Math.round(val))
  }
  return trend
}

function generateVillainTrend(seed: number): number[] {
  // -90 to -20, negative with occasional smaller negative spikes
  const trend: number[] = []
  let val = randomInRange(-60, -35, seed)
  for (let d = 0; d < 30; d++) {
    const delta = randomInRange(-12, 8, seed + 100 + d)
    val = Math.max(-90, Math.min(-20, val + delta))
    trend.push(Math.round(val))
  }
  return trend
}

function generateRedeemedTrend(seed: number): number[] {
  // -40 → +60, upward trend crossing zero
  const trend: number[] = []
  const startVal = randomInRange(-40, -20, seed)
  const endVal = randomInRange(40, 60, seed + 1)
  for (let d = 0; d < 30; d++) {
    const progress = d / 29
    const baseVal = startVal + (endVal - startVal) * progress
    const noise = randomInRange(-8, 8, seed + 100 + d)
    trend.push(Math.round(Math.max(-50, Math.min(70, baseVal + noise))))
  }
  return trend
}

function generateFallenTrend(seed: number): number[] {
  // +60 → -40, downward trend crossing zero (Daenerys mad queen arc)
  const trend: number[] = []
  const startVal = randomInRange(60, 80, seed)
  const endVal = randomInRange(-60, -30, seed + 1)
  for (let d = 0; d < 30; d++) {
    const progress = d / 29
    const baseVal = startVal + (endVal - startVal) * progress
    const noise = randomInRange(-6, 6, seed + 100 + d)
    trend.push(Math.round(Math.max(-80, Math.min(85, baseVal + noise))))
  }
  return trend
}

function generateNeutralTrend(seed: number): number[] {
  // -10 to +30, near zero, relatively flat
  const trend: number[] = []
  let val = randomInRange(5, 15, seed)
  for (let d = 0; d < 30; d++) {
    const delta = randomInRange(-4, 5, seed + 100 + d)
    val = Math.max(-10, Math.min(30, val + delta))
    trend.push(Math.round(val))
  }
  return trend
}

function generateMassCasualtyTrend(seed: number): number[] {
  // -60 to -100 with occasional -100 spikes (Thanos snap moments)
  const trend: number[] = []
  let val = randomInRange(-70, -55, seed)
  for (let d = 0; d < 30; d++) {
    // Occasional mass casualty events (spikes to -100)
    const isCatastrophe = seededRandom(seed + 200 + d) < 0.15
    if (isCatastrophe) {
      trend.push(-100)
      val = -85 // Recovery baseline
    } else {
      const delta = randomInRange(-10, 6, seed + 100 + d)
      val = Math.max(-95, Math.min(-50, val + delta))
      trend.push(Math.round(val))
    }
  }
  return trend
}

function generateIncompetentTrend(seed: number): number[] {
  // -20 to +5, near-zero negative, comedic failures
  const trend: number[] = []
  let val = randomInRange(-10, 0, seed)
  for (let d = 0; d < 30; d++) {
    const delta = randomInRange(-6, 5, seed + 100 + d)
    val = Math.max(-20, Math.min(5, val + delta))
    trend.push(Math.round(val))
  }
  return trend
}

function generateTrend(archetype: CharacterArchetype, seed: number): number[] {
  switch (archetype) {
    case 'pure-hero':
      return generatePureHeroTrend(seed)
    case 'anti-hero':
      return generateAntiHeroTrend(seed)
    case 'villain':
      return generateVillainTrend(seed)
    case 'redeemed':
      return generateRedeemedTrend(seed)
    case 'fallen':
      return generateFallenTrend(seed)
    case 'neutral':
      return generateNeutralTrend(seed)
    case 'mass-casualty':
      return generateMassCasualtyTrend(seed)
    case 'incompetent':
      return generateIncompetentTrend(seed)
    default:
      return generateNeutralTrend(seed)
  }
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
  archetype: CharacterArchetype
  /** Optional manual power score override (1-100) */
  powerScore?: number
}

// ---------------------------------------------------------------------------
// MARVEL (~35 characters)
// ---------------------------------------------------------------------------

const MARVEL_AVENGERS: CharacterDef[] = [
  { name: 'Tony Stark', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Iron Man', description: 'God complex king', archetype: 'pure-hero', powerScore: 75 },
  { name: 'Thor', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Thor', description: 'Thunder himbo', archetype: 'pure-hero', powerScore: 95 },
  { name: 'Black Widow', energy: E.SideQuest, threatLevel: T.BTier, origin: 'The Avengers', description: 'All carry, zero credit', archetype: 'redeemed', powerScore: 38 },
  { name: 'Hulk', energy: E.MainCharacter, threatLevel: T.STier, origin: 'The Avengers', description: 'Anger management arc', archetype: 'anti-hero', powerScore: 94 },
  { name: 'Spider-Man', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Spider-Man', description: 'Has homework tho', archetype: 'pure-hero', powerScore: 70 },
  { name: 'Wanda', energy: E.VillainArc, threatLevel: T.STier, origin: 'The Avengers', description: 'Gaslit the multiverse', archetype: 'fallen', powerScore: 99 },
  { name: 'Hawkeye', energy: E.NPCEnergy, threatLevel: T.MemeTier, origin: 'The Avengers', description: 'Bow at an alien fight', archetype: 'pure-hero', powerScore: 12 },
  { name: 'Cap America', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Captain America', description: 'Does the group work', archetype: 'pure-hero', powerScore: 65 },
  { name: 'War Machine', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Iron Man', description: 'Always second billing', archetype: 'pure-hero', powerScore: 52 },
  { name: 'Vision', energy: E.NPCEnergy, threatLevel: T.STier, origin: 'The Avengers', description: 'Wore a sweater, died', archetype: 'pure-hero', powerScore: 88 },
  { name: 'Falcon', energy: E.VillainArc, threatLevel: T.BTier, origin: 'Captain America', description: 'New Cap, same drama', archetype: 'pure-hero', powerScore: 42 },
]

const MARVEL_XMEN: CharacterDef[] = [
  { name: 'Wolverine', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'X-Men', description: 'Angrier than your wifi', archetype: 'anti-hero', powerScore: 78 },
  { name: 'Storm', energy: E.MainCharacter, threatLevel: T.STier, origin: 'X-Men', description: 'Controls weather + mood', archetype: 'pure-hero', powerScore: 92 },
  { name: 'Deadpool', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Deadpool', description: 'Living intrusive thought', archetype: 'anti-hero', powerScore: 73 },
  { name: 'Magneto', energy: E.VillainArc, threatLevel: T.STier, origin: 'X-Men', description: 'Villain with a point', archetype: 'anti-hero', powerScore: 96 },
  { name: 'Jean Grey', energy: E.MainCharacter, threatLevel: T.STier, origin: 'X-Men', description: 'Dies, returns stronger', archetype: 'fallen', powerScore: 100 },
  { name: 'Cyclops', energy: E.NPCEnergy, threatLevel: T.ATier, origin: 'X-Men', description: 'Substitute teacher aura', archetype: 'pure-hero', powerScore: 68 },
  { name: 'Gambit', energy: E.SideQuest, threatLevel: T.ATier, origin: 'X-Men', description: 'Flirting is the power', archetype: 'anti-hero', powerScore: 71 },
  { name: 'Mystique', energy: E.VillainArc, threatLevel: T.BTier, origin: 'X-Men', description: 'Trust issues incarnate', archetype: 'villain', powerScore: 45 },
  { name: 'Beast', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'X-Men', description: 'Gym bro with tenure', archetype: 'pure-hero', powerScore: 48 },
]

const MARVEL_GUARDIANS: CharacterDef[] = [
  { name: 'Star-Lord', energy: E.MainCharacter, threatLevel: T.BTier, origin: 'Guardians of the Galaxy', description: 'Peaked in the 80s', archetype: 'anti-hero' },
  { name: 'Groot', energy: E.NPCEnergy, threatLevel: T.ATier, origin: 'Guardians of the Galaxy', description: 'Three words, iconic', archetype: 'pure-hero' },
  { name: 'Rocket', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Guardians of the Galaxy', description: 'Tiny, angry, relatable', archetype: 'anti-hero' },
  { name: 'Gamora', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Guardians of the Galaxy', description: 'Deadliest woman alive', archetype: 'redeemed' },
  { name: 'Drax', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Guardians of the Galaxy', description: 'Standing still era', archetype: 'anti-hero' },
  { name: 'Nebula', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Guardians of the Galaxy', description: 'Daddy issues arc', archetype: 'redeemed' },
  { name: 'Mantis', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Guardians of the Galaxy', description: 'Put Ego to sleep', archetype: 'pure-hero' },
  { name: 'Yondu', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Guardians of the Galaxy', description: 'Space dad energy', archetype: 'redeemed' },
]

const MARVEL_ROGUES: CharacterDef[] = [
  { name: 'Thanos', energy: E.VillainArc, threatLevel: T.STier, origin: 'The Avengers', description: 'Eco-activist gone wrong', archetype: 'mass-casualty', powerScore: 98 },
  { name: 'Loki', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Thor', description: 'Switches sides often', archetype: 'redeemed', powerScore: 76 },
  { name: 'Killmonger', energy: E.MainCharacter, threatLevel: T.BTier, origin: 'Black Panther', description: 'Villain who was right', archetype: 'villain', powerScore: 54 },
  { name: 'Hela', energy: E.VillainArc, threatLevel: T.STier, origin: 'Thor', description: 'Chose absolute violence', archetype: 'villain', powerScore: 97 },
  { name: 'Green Goblin', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Spider-Man', description: 'Split personality CEO', archetype: 'villain', powerScore: 62 },
  { name: 'Kingpin', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Daredevil', description: 'White suit, dark crimes', archetype: 'villain', powerScore: 35 },
  { name: 'Ultron', energy: E.NPCEnergy, threatLevel: T.STier, origin: 'The Avengers', description: 'AI chose chaos day one', archetype: 'mass-casualty', powerScore: 93 },
]

// ---------------------------------------------------------------------------
// ANIME (~24 characters: Dragon Ball + Pokemon)
// ---------------------------------------------------------------------------

const ANIME_DRAGON_BALL: CharacterDef[] = [
  { name: 'Goku', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Dragon Ball', description: 'Left family to fight', archetype: 'anti-hero', powerScore: 99 },
  { name: 'Vegeta', energy: E.VillainArc, threatLevel: T.STier, origin: 'Dragon Ball', description: 'Inferiority complex arc', archetype: 'redeemed', powerScore: 98 },
  { name: 'Gohan', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Dragon Ball', description: 'Peak was Cell Saga', archetype: 'pure-hero', powerScore: 95 },
  { name: 'Piccolo', energy: E.SideQuest, threatLevel: T.STier, origin: 'Dragon Ball', description: 'Better dad than Goku', archetype: 'redeemed', powerScore: 91 },
  { name: 'Frieza', energy: E.VillainArc, threatLevel: T.STier, origin: 'Dragon Ball', description: '5 minutes took 10 eps', archetype: 'mass-casualty', powerScore: 96 },
  { name: 'Cell', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Dragon Ball', description: 'Perfect and knows it', archetype: 'villain', powerScore: 78 },
  { name: 'Beerus', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Dragon Ball', description: 'Cat nap destroys planets', archetype: 'neutral', powerScore: 100 },
  { name: 'Krillin', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Dragon Ball', description: 'Dying is his power', archetype: 'pure-hero', powerScore: 35 },
  { name: 'Trunks', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Dragon Ball', description: 'Time travel drip', archetype: 'pure-hero', powerScore: 72 },
  { name: 'Bulma', energy: E.SideQuest, threatLevel: T.MemeTier, origin: 'Dragon Ball', description: 'Brains behind the brawn', archetype: 'neutral', powerScore: 3 },
  { name: 'Broly', energy: E.VillainArc, threatLevel: T.STier, origin: 'Dragon Ball', description: 'Pure rage, zero chill', archetype: 'anti-hero', powerScore: 97 },
  { name: 'Android 18', energy: E.NPCEnergy, threatLevel: T.ATier, origin: 'Dragon Ball', description: 'Married the short one', archetype: 'redeemed', powerScore: 65 },
]

const ANIME_POKEMON: CharacterDef[] = [
  { name: 'Ash Ketchum', energy: E.MainCharacter, threatLevel: T.BTier, origin: 'Pokemon', description: 'Forever 10 years old', archetype: 'pure-hero' },
  { name: 'Pikachu', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Pokemon', description: 'Refused to evolve, icon', archetype: 'pure-hero' },
  { name: 'Mewtwo', energy: E.VillainArc, threatLevel: T.STier, origin: 'Pokemon', description: 'Existential crisis clone', archetype: 'redeemed' },
  { name: 'Charizard', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Pokemon', description: 'Disobeyed Ash for fun', archetype: 'anti-hero' },
  { name: 'Misty', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Pokemon', description: 'Bike grudge for seasons', archetype: 'neutral' },
  { name: 'Brock', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Pokemon', description: 'Eyes closed, heart open', archetype: 'neutral' },
  { name: 'Team Rocket', energy: E.VillainArc, threatLevel: T.MemeTier, origin: 'Pokemon', description: 'Blasting off again', archetype: 'incompetent' },
  { name: 'Gary Oak', energy: E.VillainArc, threatLevel: T.BTier, origin: 'Pokemon', description: 'Smell ya later energy', archetype: 'neutral' },
  { name: 'Prof Oak', energy: E.NPCEnergy, threatLevel: T.MemeTier, origin: 'Pokemon', description: 'Forgot his own grandson', archetype: 'neutral' },
  { name: 'Meowth', energy: E.SideQuest, threatLevel: T.MemeTier, origin: 'Pokemon', description: 'Learned English, chose crime', archetype: 'incompetent' },
  { name: 'Snorlax', energy: E.NPCEnergy, threatLevel: T.ATier, origin: 'Pokemon', description: 'Mood is nap, always', archetype: 'neutral' },
  { name: 'Eevee', energy: E.MainCharacter, threatLevel: T.BTier, origin: 'Pokemon', description: 'Identity crisis but cute', archetype: 'pure-hero' },
]

// ---------------------------------------------------------------------------
// WESTEROS (~35 characters)
// ---------------------------------------------------------------------------

const WESTEROS_STARK: CharacterDef[] = [
  { name: 'Jon Snow', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Knows nothing, fails up', archetype: 'pure-hero' },
  { name: 'Arya', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Tiny assassin energy', archetype: 'anti-hero' },
  { name: 'Sansa', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Trauma speedrun genius', archetype: 'redeemed' },
  { name: 'Ned', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Too honorable, found out', archetype: 'pure-hero' },
  { name: 'Bran', energy: E.VillainArc, threatLevel: T.STier, origin: 'Game of Thrones', description: 'Omniscient yet boring', archetype: 'neutral' },
  { name: 'Robb', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Lost war for a wedding', archetype: 'pure-hero' },
  { name: 'The Hound', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Just wants chicken', archetype: 'redeemed' },
  { name: 'Catelyn', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Mom instincts, bad luck', archetype: 'neutral' },
  { name: 'Rickon', energy: E.NPCEnergy, threatLevel: T.MemeTier, origin: 'Game of Thrones', description: 'Zigzag was right there', archetype: 'neutral' },
  { name: 'Hodor', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'One word, all the tears', archetype: 'pure-hero' },
]

const WESTEROS_TARGARYEN: CharacterDef[] = [
  { name: 'Daenerys', energy: E.VillainArc, threatLevel: T.STier, origin: 'Game of Thrones', description: 'Girlboss to war criminal', archetype: 'fallen' },
  { name: 'Daemon', energy: E.MainCharacter, threatLevel: T.STier, origin: 'House of the Dragon', description: 'Red flag with a dragon', archetype: 'anti-hero' },
  { name: 'Rhaenyra', energy: E.MainCharacter, threatLevel: T.STier, origin: 'House of the Dragon', description: 'Born to rule, proving it', archetype: 'anti-hero' },
  { name: 'Viserys', energy: E.NPCEnergy, threatLevel: T.BTier, origin: 'House of the Dragon', description: 'Kept peace, started war', archetype: 'neutral' },
  { name: 'Missandei', energy: E.SideQuest, threatLevel: T.MemeTier, origin: 'Game of Thrones', description: 'Deserved so much better', archetype: 'neutral' },
  { name: 'Grey Worm', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Stoic with depth', archetype: 'pure-hero' },
  { name: 'Aegon', energy: E.VillainArc, threatLevel: T.ATier, origin: 'House of the Dragon', description: 'Failson every timeline', archetype: 'villain' },
  { name: 'Rhaenys', energy: E.MainCharacter, threatLevel: T.STier, origin: 'House of the Dragon', description: 'Queen who never was', archetype: 'anti-hero' },
  { name: 'Jorah', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Friendzoned to death', archetype: 'redeemed' },
]

const WESTEROS_LANNISTER: CharacterDef[] = [
  { name: 'Tyrion', energy: E.MainCharacter, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Never let him cook', archetype: 'anti-hero' },
  { name: 'Cersei', energy: E.VillainArc, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Revenge is the wine', archetype: 'villain' },
  { name: 'Jaime', energy: E.SideQuest, threatLevel: T.STier, origin: 'Game of Thrones', description: 'Arc written then deleted', archetype: 'redeemed' },
  { name: 'Tywin', energy: E.VillainArc, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Scary, no sword needed', archetype: 'villain' },
  { name: 'Joffrey', energy: E.NPCEnergy, threatLevel: T.MemeTier, origin: 'Game of Thrones', description: 'Most punchable face ever', archetype: 'villain' },
  { name: 'Bronn', energy: E.SideQuest, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Pure capitalism energy', archetype: 'anti-hero' },
  { name: 'The Mountain', energy: E.MainCharacter, threatLevel: T.STier, origin: 'Game of Thrones', description: 'Less words than Groot', archetype: 'villain' },
  { name: 'Myrcella', energy: E.NPCEnergy, threatLevel: T.MemeTier, origin: 'Game of Thrones', description: 'Only nice Lannister, died', archetype: 'neutral' },
  { name: 'Tommen', energy: E.NPCEnergy, threatLevel: T.MemeTier, origin: 'Game of Thrones', description: 'Window speedrun any%', archetype: 'neutral' },
]

const WESTEROS_NIGHTS_WATCH: CharacterDef[] = [
  { name: 'Sam', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Nerd saved everyone', archetype: 'pure-hero' },
  { name: 'Tormund', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Himbo with a crush', archetype: 'anti-hero' },
  { name: 'Ygritte', energy: E.VillainArc, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'We all think it too', archetype: 'anti-hero' },
  { name: 'Mance', energy: E.MainCharacter, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'United clans, died', archetype: 'anti-hero' },
  { name: 'Ghost', energy: E.NPCEnergy, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Deserved more screen', archetype: 'pure-hero' },
  { name: 'Aemon', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Secret Targ, chose duty', archetype: 'pure-hero' },
  { name: 'Jeor Mormont', energy: E.NPCEnergy, threatLevel: T.ATier, origin: 'Game of Thrones', description: 'Cared, nobody listened', archetype: 'pure-hero' },
  { name: 'Melisandre', energy: E.VillainArc, threatLevel: T.STier, origin: 'Game of Thrones', description: 'Fire magic, plot device', archetype: 'anti-hero' },
  { name: 'Davos', energy: E.SideQuest, threatLevel: T.BTier, origin: 'Game of Thrones', description: 'Smuggled his way to love', archetype: 'pure-hero' },
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

/** Simple hash function for deterministic randomness from name */
function hashName(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash)
}

// Score ranges for each tier (min, max)
const POWER_SCORE_RANGE: Record<ThreatLevel, [number, number]> = {
  [ThreatLevel.STier]: [85, 100],
  [ThreatLevel.ATier]: [55, 84],
  [ThreatLevel.BTier]: [25, 54],
  [ThreatLevel.MemeTier]: [1, 24],
}

/** Generate power score based on name and threat level */
function generatePowerScore(name: string, threatLevel: ThreatLevel): number {
  const [min, max] = POWER_SCORE_RANGE[threatLevel]
  const hash = hashName(name)
  return min + (hash % (max - min + 1))
}

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
        powerScore: def.powerScore ?? generatePowerScore(def.name, def.threatLevel),
        origin: def.origin,
        description: def.description,
        trend: generateTrend(def.archetype, idx * 100 + 9),
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
