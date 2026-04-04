import type { FullCampaign } from '../types';

export const bloodInTheWater: FullCampaign = {
  id: 'full-blood-in-the-water',
  type: 'full',
  title: 'Blood in the Water',
  tagline: 'The pirate queen is dead. Her fleet is up for grabs. So is her curse.',
  tone: 'epic',
  themes: ['nautical', 'dark_fantasy', 'war'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 4, end: 13 },
  estimatedSessions: 18,
  settingSummary:
    'The Crimson Sea — a lawless stretch of ocean ruled for decades by Pirate Queen Thessaly the Red. She\'s dead, and her enchanted fleet of 30 ships — each magically bound to obey her bloodline — now sits crewless and waiting. Every pirate lord, naval power, and mercenary company wants that fleet. The party has Thessaly\'s compass, and it\'s pointing somewhere no one else can follow.',
  hook: 'The party rescues a drowning woman who presses a golden compass into their hands before dying. The compass needle spins to point at them. Within hours, pirates, navy ships, and something from the deep all start pursuing the party.',
  twist:
    'Thessaly isn\'t dead — she faked her death to escape a blood curse that was slowly turning her into a sea monster. The compass leads to the only cure. If the party finds it, they can save her and inherit the fleet. If they take too long, she completes the transformation and becomes the new terror of the deep.',
  climax:
    'Racing against Thessaly\'s transformation and rival fleets, the party must navigate the Drowned Maze — an underwater ruin — to find the Tide Stone that breaks the curse. In the finale, they face transformed Thessaly (who may or may not still be in control of herself) and must decide: save the pirate queen, claim the fleet, or sink it all.',
  acts: [
    {
      title: 'Act 1: The Compass',
      summary:
        'The party gains the compass, acquires a ship, and begins to navigate the Crimson Sea while being hunted by everyone who wants the fleet.',
      keyEvents: [
        'The drowning woman and the golden compass',
        'First pursuit — pirate lord sends hunters',
        'Acquiring a ship (bought, stolen, or earned)',
        'The compass points into the Maw — a permanent storm no one returns from',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Crimson Sea',
      summary:
        'The party navigates pirate politics, fights or allies with rival captains, and discovers that Thessaly is alive but transforming. The compass reveals a path through the Maw.',
      keyEvents: [
        'Pirate council at Freeport — 5 pirate lords argue over the fleet',
        'Discovery of Thessaly\'s survival — she\'s hiding, scared, half-monster',
        'Alliance or betrayal with a rival captain',
        'The compass unlocks — shows the path through the Maw',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Drowned Maze',
      summary:
        'Through the Maw, into the Drowned Maze. Underwater ruins, ancient sea-magic, and the Tide Stone. Thessaly is almost gone. The rival fleet is right behind.',
      keyEvents: [
        'The Maw — surviving the supernatural storm',
        'The Drowned Maze — underwater dungeon with air pockets and pressure puzzles',
        'Thessaly confrontation — monster or woman, the party must choose quickly',
        'The Tide Stone — use it, keep it, or destroy it',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'Thessaly the Red',
      role: 'hidden quest giver / potential final boss',
      personality:
        'Imperious, sharp-tongued, secretly terrified. She built an empire and now she\'s losing herself to something she can\'t fight with a sword. Still tries to give orders even while hiding in a cave.',
      secret: 'The blood curse came from her own mother — the previous pirate queen. It\'s a family tradition no one survives.',
    },
    {
      name: 'Captain Vex "Silvertooth"',
      role: 'rival / potential ally',
      personality:
        'A charming, amoral half-elf pirate with silver dental implants who would stab you in the back but would feel genuinely bad about it afterward.',
    },
    {
      name: 'Admiral Keth',
      role: 'antagonist',
      personality:
        'The naval commander hunting the fleet. By-the-book, incorruptible, believes piracy is a disease. Respects the party if they\'re honorable but will not compromise.',
    },
    {
      name: 'Barnacle',
      role: 'ally / ship NPC',
      personality:
        'A sea-hag who\'s reformed (mostly). Lives in the party\'s ship hull. Provides navigation advice, sea lore, and unsolicited opinions about everyone\'s love life.',
    },
  ],
  keyLocations: [
    {
      name: 'Freeport',
      description:
        'A floating city of lashed-together ships — the neutral ground where pirate lords meet. No fighting on Freeport (enforced by an ancient kraken pact).',
      significance: 'Political hub and recruitment ground.',
    },
    {
      name: 'The Maw',
      description:
        'A permanent supernatural storm that sinks any ship without a magical guide. Inside it, time moves differently.',
      significance: 'Barrier to the Drowned Maze — only the compass can navigate it.',
    },
    {
      name: 'The Drowned Maze',
      description:
        'An ancient merfolk temple-complex, now flooded and twisted. Air pockets, pressure locks, and guardians that have been waiting for centuries.',
      significance: 'Where the Tide Stone — and Thessaly\'s cure — lies.',
    },
  ],
  dataSystems: [
    'navalCombat',
    'shipCrewManagement',
    'shipCargo',
    'shipwreckGenerator',
    'caravanAmbush',
    'factionWar',
    'lycanthropy',
    'treasureMap',
    'encounterWaves',
  ],
};
