// Pre-built campaign templates — starter adventures with lore, encounters, and quests.
// DM picks a template when creating a campaign to get a ready-to-play setup.

import type { Quest } from '../types/game';

export interface CampaignTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  sceneName: string;
  openingNarration: string;
  quests: Quest[];
  suggestedLevel: string;
  tags: string[];
}

export const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  {
    id: 'lost-mine',
    name: 'The Lost Mine of Crystalreach',
    description: 'A classic dungeon crawl. The party discovers a map to an abandoned dwarven mine rumored to hold a magical forge.',
    icon: '⛏️',
    sceneName: 'The Rusty Pickaxe Tavern',
    openingNarration: 'Rain hammers the windows of the Rusty Pickaxe, a cramped tavern at the edge of Crystalreach. A hooded dwarf slides a yellowed parchment across the table — a map, hand-drawn, with a mine entrance circled in dried blood. "My grandfather\'s mine," she whispers. "Something woke up down there. I need it cleared. Five hundred gold, and whatever you find is yours."',
    quests: [
      { id: 'q1', title: 'Clear the Mine Entrance', description: 'Defeat the goblins guarding the collapsed mine entrance.', completed: false, priority: 'main', location: 'Mine Entrance', mapX: 65, mapY: 30 },
      { id: 'q2', title: 'Find the Forge', description: 'Navigate the mine tunnels to locate the legendary Crystalforge.', completed: false, priority: 'main', location: 'Deep Tunnels', mapX: 50, mapY: 60 },
      { id: 'q3', title: 'The Missing Miners', description: 'Three miners went missing last month. Find out what happened to them.', completed: false, priority: 'side', location: 'East Shaft', mapX: 75, mapY: 50 },
    ],
    suggestedLevel: '1-4',
    tags: ['dungeon', 'classic', 'combat'],
  },
  {
    id: 'cursed-forest',
    name: 'The Whispering Woods',
    description: 'An investigation adventure. Strange whispers draw travelers into the forest, and none return. The druids blame a corruption spreading from an ancient shrine.',
    icon: '🌲',
    sceneName: 'Edge of the Whispering Woods',
    openingNarration: 'The trees at the forest\'s edge lean inward, branches interlocking like fingers. A chill wind carries something that almost sounds like words — names, perhaps, or warnings. The village elder wrings her hands. "It started three moons ago. First the animals fled. Then the whispers began. Now people walk into the woods at night and don\'t come back."',
    quests: [
      { id: 'q1', title: 'Investigate the Whispers', description: 'Enter the Whispering Woods and find the source of the supernatural voices.', completed: false, priority: 'main', location: 'Deep Woods', mapX: 45, mapY: 40 },
      { id: 'q2', title: 'The Ancient Shrine', description: 'Locate the corrupted druid shrine at the heart of the forest.', completed: false, priority: 'main', location: 'Shrine', mapX: 50, mapY: 70 },
      { id: 'q3', title: 'Rescue the Sleepwalkers', description: 'Find and wake the villagers who wandered into the woods in a trance.', completed: false, priority: 'side', location: 'Clearing', mapX: 30, mapY: 55 },
    ],
    suggestedLevel: '2-5',
    tags: ['mystery', 'forest', 'investigation'],
  },
  {
    id: 'dragon-siege',
    name: 'Siege of Ashfall Keep',
    description: 'A high-stakes siege. A young red dragon has claimed the mountain fortress of Ashfall Keep. The local lord needs heroes to reclaim it before the dragon\'s army grows.',
    icon: '🐉',
    sceneName: 'War Camp Outside Ashfall Keep',
    openingNarration: 'Smoke rises from the shattered battlements of Ashfall Keep, silhouetted against the blood-red sunset. The war camp buzzes with tension — soldiers sharpen swords, siege engineers argue over blueprints, and a priest tends to the burned. General Thorne slams a gauntleted fist on the map table. "The dragon sleeps by day and hunts by night. We attack at dawn, or not at all. I need a strike team inside those walls before sunrise."',
    quests: [
      { id: 'q1', title: 'Breach the Walls', description: 'Find a way inside Ashfall Keep — through the sewers, over the walls, or through the collapsed tower.', completed: false, priority: 'main', location: 'Keep Walls', mapX: 55, mapY: 25 },
      { id: 'q2', title: 'Slay the Dragon', description: 'Confront and defeat the young red dragon Scorch in the great hall.', completed: false, priority: 'main', location: 'Great Hall', mapX: 50, mapY: 55 },
      { id: 'q3', title: 'Free the Prisoners', description: 'Kobold servants have locked the keep\'s original garrison in the dungeons.', completed: false, priority: 'side', location: 'Dungeons', mapX: 40, mapY: 70 },
      { id: 'q4', title: 'Destroy the Egg Clutch', description: 'The dragon is nesting. If the eggs hatch, the region is doomed.', completed: false, priority: 'main', location: 'Treasury Vault', mapX: 65, mapY: 65 },
    ],
    suggestedLevel: '5-8',
    tags: ['combat', 'siege', 'dragon', 'epic'],
  },
  {
    id: 'heist',
    name: 'The Golden Masquerade',
    description: 'A social intrigue heist. The party must infiltrate a noble\'s masquerade ball to steal a cursed artifact from the vault beneath the palace.',
    icon: '🎭',
    sceneName: 'The Gilded Lily Casino, Night Before the Ball',
    openingNarration: 'Crystal chandeliers scatter rainbow light across the casino floor. Your contact — a half-elf in a silver mask — slides four invitations across the velvet table. "The Amulet of Vecna is in Duke Ravencourt\'s vault, three floors below the ballroom. You have until midnight. After that, the wards reset and the vault seals for another year." She pauses. "Oh, and the Duke has a pet basilisk guarding the lower levels. Try not to make eye contact."',
    quests: [
      { id: 'q1', title: 'Infiltrate the Ball', description: 'Gain entry to the masquerade using the invitations and blend in with the nobility.', completed: false, priority: 'main', location: 'Palace Ballroom', mapX: 50, mapY: 25 },
      { id: 'q2', title: 'Find the Vault', description: 'Locate the hidden entrance to the underground vault.', completed: false, priority: 'main', location: 'Wine Cellar', mapX: 45, mapY: 55 },
      { id: 'q3', title: 'Steal the Amulet', description: 'Bypass the vault\'s magical wards and retrieve the Amulet of Vecna.', completed: false, priority: 'main', location: 'The Vault', mapX: 50, mapY: 80 },
      { id: 'q4', title: 'The Duke\'s Secret', description: 'Something about the Duke isn\'t right. Investigate his private study.', completed: false, priority: 'side', location: 'Private Study', mapX: 70, mapY: 35 },
    ],
    suggestedLevel: '3-7',
    tags: ['intrigue', 'heist', 'social', 'urban'],
  },
  {
    id: 'underdark',
    name: 'Into the Underdark',
    description: 'A survival expedition into the subterranean world. Navigate Drow patrols, mind flayer colonies, and the strange ecology of the lightless depths.',
    icon: '🕳️',
    sceneName: 'The Descent — Collapsed Mine Shaft',
    openingNarration: 'The mine shaft drops away into absolute darkness. Your torch barely illuminates the first fifty feet of a chasm that seems to have no bottom. A dwarf prospector found this passage last week — and something found him. His journal describes "a city of purple light, miles below the surface." The Underdark.',
    quests: [
      { id: 'q1', title: 'Survive the Descent', description: 'Navigate the treacherous passage from the surface to the Underdark proper.', completed: false, priority: 'main', location: 'The Chasm', mapX: 50, mapY: 20 },
      { id: 'q2', title: 'The Drow Outpost', description: 'A Drow patrol has spotted your torchlight. Evade or negotiate passage.', completed: false, priority: 'main', location: 'Drow Outpost', mapX: 35, mapY: 45 },
      { id: 'q3', title: 'The Fungal Forest', description: 'A cavern filled with towering mushrooms and bioluminescent spores.', completed: false, priority: 'side', location: 'Fungal Forest', mapX: 60, mapY: 55 },
      { id: 'q4', title: 'Mind Flayer Colony', description: 'Infiltrate the Elder Brain\'s lair before it detects you.', completed: false, priority: 'main', location: 'Illithid Colony', mapX: 50, mapY: 80 },
    ],
    suggestedLevel: '5-10',
    tags: ['underdark', 'survival', 'horror', 'exploration'],
  },
  {
    id: 'pirate',
    name: 'The Sunken Throne',
    description: 'A seafaring adventure. Chase rumors of a drowned kingdom\'s treasure across tropical islands, pirate havens, and into the depths of the sea.',
    icon: '🏴‍☠️',
    sceneName: 'Port Stormhaven — The Salty Siren Tavern',
    openingNarration: 'The harbor reeks of salt and tar. Ships from a dozen nations crowd the docks of Port Stormhaven. A one-eyed tiefling slides a barnacle-encrusted crown across the table. "Found this in a shipwreck off the Coral Teeth. There\'s a whole throne room down there — and a vault that\'s still sealed. I need a crew."',
    quests: [
      { id: 'q1', title: 'Hire a Ship', description: 'Find a captain willing to sail to the Coral Teeth — a reef where ships go to die.', completed: false, priority: 'main', location: 'Port Stormhaven', mapX: 25, mapY: 30 },
      { id: 'q2', title: 'The Coral Teeth', description: 'Navigate the deadly reef and locate the sunken palace entrance.', completed: false, priority: 'main', location: 'Coral Teeth Reef', mapX: 60, mapY: 45 },
      { id: 'q3', title: 'The Sunken Throne Room', description: 'Dive into the drowned palace and reach the sealed vault.', completed: false, priority: 'main', location: 'Sunken Palace', mapX: 55, mapY: 70 },
      { id: 'q4', title: 'Pirate Rivals', description: 'Captain Bloodtide is following you. Deal with the competition.', completed: false, priority: 'side', location: 'Open Sea', mapX: 40, mapY: 55 },
    ],
    suggestedLevel: '3-7',
    tags: ['nautical', 'exploration', 'treasure', 'pirates'],
  },
  {
    id: 'planar',
    name: 'The Shattered Gate',
    description: 'A planar crisis one-shot. A portal to the Nine Hells has cracked open in the town square. Close the gate before the archdemon arrives.',
    icon: '🌀',
    sceneName: 'Meridian Town Square — The Rift',
    openingNarration: 'The sky cracks like glass. A vertical fissure, twenty feet tall and burning with infernal fire, hangs in the air above the town fountain. Imps pour from it like wasps from a kicked nest. A warlock staggers toward you, blood streaming from her eyes. "I tried to close it. The binding requires three anchors scattered across town. Find them before Zariel\'s vanguard comes through."',
    quests: [
      { id: 'q1', title: 'Secure the Square', description: 'Drive back the initial wave of imps and lesser devils.', completed: false, priority: 'main', location: 'Town Square', mapX: 50, mapY: 30 },
      { id: 'q2', title: 'The Three Anchors', description: 'Find the binding anchors in the temple, the library, and the blacksmith.', completed: false, priority: 'main', location: 'Town', mapX: 40, mapY: 50 },
      { id: 'q3', title: 'Close the Gate', description: 'Place all three anchors and perform the binding ritual.', completed: false, priority: 'main', location: 'The Rift', mapX: 50, mapY: 30 },
      { id: 'q4', title: 'Save the Survivors', description: 'Civilians are trapped in burning buildings. Get them to safety.', completed: false, priority: 'side', location: 'Residential District', mapX: 70, mapY: 60 },
    ],
    suggestedLevel: '5-9',
    tags: ['one-shot', 'planar', 'combat', 'time-pressure'],
  },
];
