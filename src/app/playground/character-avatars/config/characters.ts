/**
 * All 94 characters with realm/faction metadata.
 * Matches the images in public/character-avatars/.
 */

import type { CharacterEntry } from './types'

export const CHARACTERS: CharacterEntry[] = [
  // Marvel - Avengers (11)
  { name: 'Tony Stark', slug: 'tony-stark', realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', origin: 'Iron Man' },
  { name: 'Thor', slug: 'thor', realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', origin: 'Thor' },
  { name: 'Black Widow', slug: 'black-widow', realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', origin: 'The Avengers' },
  { name: 'Hulk', slug: 'hulk', realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', origin: 'The Avengers' },
  { name: 'Spider-Man', slug: 'spider-man', realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', origin: 'Spider-Man' },
  { name: 'Wanda', slug: 'wanda', realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', origin: 'WandaVision' },
  { name: 'Hawkeye', slug: 'hawkeye', realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', origin: 'The Avengers' },
  { name: 'Cap America', slug: 'cap-america', realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', origin: 'Captain America' },
  { name: 'War Machine', slug: 'war-machine', realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', origin: 'Iron Man 2' },
  { name: 'Vision', slug: 'vision', realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', origin: 'Age of Ultron' },
  { name: 'Falcon', slug: 'falcon', realm: 'marvel', realmLabel: 'Marvel', faction: 'avengers', factionLabel: 'Avengers', origin: 'Winter Soldier' },
  // Marvel - X-Men (9)
  { name: 'Wolverine', slug: 'wolverine', realm: 'marvel', realmLabel: 'Marvel', faction: 'x-men', factionLabel: 'X-Men', origin: 'X-Men' },
  { name: 'Storm', slug: 'storm', realm: 'marvel', realmLabel: 'Marvel', faction: 'x-men', factionLabel: 'X-Men', origin: 'X-Men' },
  { name: 'Deadpool', slug: 'deadpool', realm: 'marvel', realmLabel: 'Marvel', faction: 'x-men', factionLabel: 'X-Men', origin: 'Deadpool' },
  { name: 'Magneto', slug: 'magneto', realm: 'marvel', realmLabel: 'Marvel', faction: 'x-men', factionLabel: 'X-Men', origin: 'X-Men' },
  { name: 'Jean Grey', slug: 'jean-grey', realm: 'marvel', realmLabel: 'Marvel', faction: 'x-men', factionLabel: 'X-Men', origin: 'X-Men' },
  { name: 'Cyclops', slug: 'cyclops', realm: 'marvel', realmLabel: 'Marvel', faction: 'x-men', factionLabel: 'X-Men', origin: 'X-Men' },
  { name: 'Gambit', slug: 'gambit', realm: 'marvel', realmLabel: 'Marvel', faction: 'x-men', factionLabel: 'X-Men', origin: 'X-Men' },
  { name: 'Mystique', slug: 'mystique', realm: 'marvel', realmLabel: 'Marvel', faction: 'x-men', factionLabel: 'X-Men', origin: 'X-Men' },
  { name: 'Beast', slug: 'beast', realm: 'marvel', realmLabel: 'Marvel', faction: 'x-men', factionLabel: 'X-Men', origin: 'X-Men' },
  // Marvel - Guardians (8)
  { name: 'Star-Lord', slug: 'star-lord', realm: 'marvel', realmLabel: 'Marvel', faction: 'guardians', factionLabel: 'Guardians', origin: 'Guardians of the Galaxy' },
  { name: 'Groot', slug: 'groot', realm: 'marvel', realmLabel: 'Marvel', faction: 'guardians', factionLabel: 'Guardians', origin: 'Guardians of the Galaxy' },
  { name: 'Rocket', slug: 'rocket', realm: 'marvel', realmLabel: 'Marvel', faction: 'guardians', factionLabel: 'Guardians', origin: 'Guardians of the Galaxy' },
  { name: 'Gamora', slug: 'gamora', realm: 'marvel', realmLabel: 'Marvel', faction: 'guardians', factionLabel: 'Guardians', origin: 'Guardians of the Galaxy' },
  { name: 'Drax', slug: 'drax', realm: 'marvel', realmLabel: 'Marvel', faction: 'guardians', factionLabel: 'Guardians', origin: 'Guardians of the Galaxy' },
  { name: 'Nebula', slug: 'nebula', realm: 'marvel', realmLabel: 'Marvel', faction: 'guardians', factionLabel: 'Guardians', origin: 'Guardians of the Galaxy' },
  { name: 'Mantis', slug: 'mantis', realm: 'marvel', realmLabel: 'Marvel', faction: 'guardians', factionLabel: 'Guardians', origin: 'Guardians Vol. 2' },
  { name: 'Yondu', slug: 'yondu', realm: 'marvel', realmLabel: 'Marvel', faction: 'guardians', factionLabel: 'Guardians', origin: 'Guardians of the Galaxy' },
  // Marvel - Rogues Gallery (7)
  { name: 'Thanos', slug: 'thanos', realm: 'marvel', realmLabel: 'Marvel', faction: 'rogues-gallery', factionLabel: 'Rogues Gallery', origin: 'Infinity War' },
  { name: 'Loki', slug: 'loki', realm: 'marvel', realmLabel: 'Marvel', faction: 'rogues-gallery', factionLabel: 'Rogues Gallery', origin: 'Thor' },
  { name: 'Killmonger', slug: 'killmonger', realm: 'marvel', realmLabel: 'Marvel', faction: 'rogues-gallery', factionLabel: 'Rogues Gallery', origin: 'Black Panther' },
  { name: 'Hela', slug: 'hela', realm: 'marvel', realmLabel: 'Marvel', faction: 'rogues-gallery', factionLabel: 'Rogues Gallery', origin: 'Thor: Ragnarok' },
  { name: 'Green Goblin', slug: 'green-goblin', realm: 'marvel', realmLabel: 'Marvel', faction: 'rogues-gallery', factionLabel: 'Rogues Gallery', origin: 'Spider-Man' },
  { name: 'Kingpin', slug: 'kingpin', realm: 'marvel', realmLabel: 'Marvel', faction: 'rogues-gallery', factionLabel: 'Rogues Gallery', origin: 'Daredevil' },
  { name: 'Ultron', slug: 'ultron', realm: 'marvel', realmLabel: 'Marvel', faction: 'rogues-gallery', factionLabel: 'Rogues Gallery', origin: 'Age of Ultron' },
  // Anime - Dragon Ball (12)
  { name: 'Goku', slug: 'goku', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'Dragon Ball Z' },
  { name: 'Vegeta', slug: 'vegeta', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'Dragon Ball Z' },
  { name: 'Gohan', slug: 'gohan', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'Dragon Ball Z' },
  { name: 'Piccolo', slug: 'piccolo', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'Dragon Ball' },
  { name: 'Frieza', slug: 'frieza', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'Dragon Ball Z' },
  { name: 'Cell', slug: 'cell', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'Dragon Ball Z' },
  { name: 'Beerus', slug: 'beerus', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'Dragon Ball Super' },
  { name: 'Krillin', slug: 'krillin', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'Dragon Ball' },
  { name: 'Trunks', slug: 'trunks', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'Dragon Ball Z' },
  { name: 'Bulma', slug: 'bulma', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'Dragon Ball' },
  { name: 'Broly', slug: 'broly', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'DBS: Broly' },
  { name: 'Android 18', slug: 'android-18', realm: 'anime', realmLabel: 'Anime', faction: 'dragon-ball', factionLabel: 'Dragon Ball', origin: 'Dragon Ball Z' },
  // Anime - Pokemon (12)
  { name: 'Ash Ketchum', slug: 'ash-ketchum', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon' },
  { name: 'Pikachu', slug: 'pikachu', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon' },
  { name: 'Mewtwo', slug: 'mewtwo', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon: The Movie' },
  { name: 'Charizard', slug: 'charizard', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon' },
  { name: 'Misty', slug: 'misty', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon' },
  { name: 'Brock', slug: 'brock', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon' },
  { name: 'Team Rocket', slug: 'team-rocket', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon' },
  { name: 'Gary Oak', slug: 'gary-oak', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon' },
  { name: 'Prof Oak', slug: 'prof-oak', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon' },
  { name: 'Meowth', slug: 'meowth', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon' },
  { name: 'Snorlax', slug: 'snorlax', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon' },
  { name: 'Eevee', slug: 'eevee', realm: 'anime', realmLabel: 'Anime', faction: 'pokemon', factionLabel: 'Pokemon', origin: 'Pokemon' },
  // Westeros - House Stark (10)
  { name: 'Jon Snow', slug: 'jon-snow', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-stark', factionLabel: 'House Stark', origin: 'Game of Thrones' },
  { name: 'Arya', slug: 'arya', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-stark', factionLabel: 'House Stark', origin: 'Game of Thrones' },
  { name: 'Sansa', slug: 'sansa', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-stark', factionLabel: 'House Stark', origin: 'Game of Thrones' },
  { name: 'Ned', slug: 'ned', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-stark', factionLabel: 'House Stark', origin: 'Game of Thrones' },
  { name: 'Bran', slug: 'bran', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-stark', factionLabel: 'House Stark', origin: 'Game of Thrones' },
  { name: 'Robb', slug: 'robb', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-stark', factionLabel: 'House Stark', origin: 'Game of Thrones' },
  { name: 'The Hound', slug: 'the-hound', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-stark', factionLabel: 'House Stark', origin: 'Game of Thrones' },
  { name: 'Catelyn', slug: 'catelyn', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-stark', factionLabel: 'House Stark', origin: 'Game of Thrones' },
  { name: 'Rickon', slug: 'rickon', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-stark', factionLabel: 'House Stark', origin: 'Game of Thrones' },
  { name: 'Hodor', slug: 'hodor', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-stark', factionLabel: 'House Stark', origin: 'Game of Thrones' },
  // Westeros - House Targaryen (9)
  { name: 'Daenerys', slug: 'daenerys', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-targaryen', factionLabel: 'House Targaryen', origin: 'Game of Thrones' },
  { name: 'Daemon', slug: 'daemon', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-targaryen', factionLabel: 'House Targaryen', origin: 'House of the Dragon' },
  { name: 'Rhaenyra', slug: 'rhaenyra', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-targaryen', factionLabel: 'House Targaryen', origin: 'House of the Dragon' },
  { name: 'Viserys', slug: 'viserys', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-targaryen', factionLabel: 'House Targaryen', origin: 'House of the Dragon' },
  { name: 'Missandei', slug: 'missandei', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-targaryen', factionLabel: 'House Targaryen', origin: 'Game of Thrones' },
  { name: 'Grey Worm', slug: 'grey-worm', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-targaryen', factionLabel: 'House Targaryen', origin: 'Game of Thrones' },
  { name: 'Aegon', slug: 'aegon', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-targaryen', factionLabel: 'House Targaryen', origin: 'House of the Dragon' },
  { name: 'Rhaenys', slug: 'rhaenys', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-targaryen', factionLabel: 'House Targaryen', origin: 'House of the Dragon' },
  { name: 'Jorah', slug: 'jorah', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-targaryen', factionLabel: 'House Targaryen', origin: 'Game of Thrones' },
  // Westeros - House Lannister (9)
  { name: 'Tyrion', slug: 'tyrion', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-lannister', factionLabel: 'House Lannister', origin: 'Game of Thrones' },
  { name: 'Cersei', slug: 'cersei', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-lannister', factionLabel: 'House Lannister', origin: 'Game of Thrones' },
  { name: 'Jaime', slug: 'jaime', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-lannister', factionLabel: 'House Lannister', origin: 'Game of Thrones' },
  { name: 'Tywin', slug: 'tywin', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-lannister', factionLabel: 'House Lannister', origin: 'Game of Thrones' },
  { name: 'Joffrey', slug: 'joffrey', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-lannister', factionLabel: 'House Lannister', origin: 'Game of Thrones' },
  { name: 'Bronn', slug: 'bronn', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-lannister', factionLabel: 'House Lannister', origin: 'Game of Thrones' },
  { name: 'The Mountain', slug: 'the-mountain', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-lannister', factionLabel: 'House Lannister', origin: 'Game of Thrones' },
  { name: 'Myrcella', slug: 'myrcella', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-lannister', factionLabel: 'House Lannister', origin: 'Game of Thrones' },
  { name: 'Tommen', slug: 'tommen', realm: 'westeros', realmLabel: 'Westeros', faction: 'house-lannister', factionLabel: 'House Lannister', origin: 'Game of Thrones' },
  // Westeros - Night's Watch (9)
  { name: 'Sam', slug: 'sam', realm: 'westeros', realmLabel: 'Westeros', faction: 'nights-watch', factionLabel: "Night's Watch", origin: 'Game of Thrones' },
  { name: 'Tormund', slug: 'tormund', realm: 'westeros', realmLabel: 'Westeros', faction: 'nights-watch', factionLabel: "Night's Watch", origin: 'Game of Thrones' },
  { name: 'Ygritte', slug: 'ygritte', realm: 'westeros', realmLabel: 'Westeros', faction: 'nights-watch', factionLabel: "Night's Watch", origin: 'Game of Thrones' },
  { name: 'Mance', slug: 'mance', realm: 'westeros', realmLabel: 'Westeros', faction: 'nights-watch', factionLabel: "Night's Watch", origin: 'Game of Thrones' },
  { name: 'Ghost', slug: 'ghost', realm: 'westeros', realmLabel: 'Westeros', faction: 'nights-watch', factionLabel: "Night's Watch", origin: 'Game of Thrones' },
  { name: 'Aemon', slug: 'aemon', realm: 'westeros', realmLabel: 'Westeros', faction: 'nights-watch', factionLabel: "Night's Watch", origin: 'Game of Thrones' },
  { name: 'Jeor Mormont', slug: 'jeor-mormont', realm: 'westeros', realmLabel: 'Westeros', faction: 'nights-watch', factionLabel: "Night's Watch", origin: 'Game of Thrones' },
  { name: 'Melisandre', slug: 'melisandre', realm: 'westeros', realmLabel: 'Westeros', faction: 'nights-watch', factionLabel: "Night's Watch", origin: 'Game of Thrones' },
  { name: 'Davos', slug: 'davos', realm: 'westeros', realmLabel: 'Westeros', faction: 'nights-watch', factionLabel: "Night's Watch", origin: 'Game of Thrones' },
]

/** Slugs that have PNG files (PokéAPI official artwork sprites) */
const PNG_SLUGS = new Set(['pikachu', 'mewtwo', 'charizard', 'meowth', 'snorlax', 'eevee'])

/** Returns the avatar image path for a character slug */
export function getCharacterAvatarPath(slug: string): string {
  const ext = PNG_SLUGS.has(slug) ? 'png' : 'jpg'
  return `/character-avatars/${slug}.${ext}`
}
