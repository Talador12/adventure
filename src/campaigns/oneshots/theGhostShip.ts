import type { OneShotCampaign } from '../types';

export const theGhostShip: OneShotCampaign = {
  id: 'oneshot-ghost-ship',
  type: 'oneshot',
  title: 'The Ghost Ship',
  tagline: 'The ship sank 200 years ago. It just surfaced. The crew doesn\'t know they\'re dead.',
  tone: 'horror',
  themes: ['horror', 'nautical', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 6,
  estimatedHours: 4,
  settingSummary:
    'A perfectly preserved galleon surfaces in the harbor — no damage, no decay, crew going about their duties. They think it\'s 200 years ago. They don\'t know they\'re dead. The party boards to investigate and discovers a ship trapped in a time loop: it sinks every night at midnight and resurfaces at dawn, crew reset. Something is keeping the loop running, and the crew\'s ghosts are starting to remember.',
  hook: 'A ship that sank 200 years ago bobs in the harbor. The crew waves at passing boats. The harbormaster sends the party: "Talk to them. Find out what\'s happening. And for gods\' sake, don\'t tell them they\'re dead."',
  twist: 'The captain kept a phylactery in his cabin — not his own, but a lich\'s. The lich paid for transport 200 years ago and the ship sank with its phylactery aboard. The lich has been maintaining the time loop to keep its phylactery safe. Every midnight, the ship sinks, the phylactery is untouchable on the ocean floor, and every dawn it surfaces for maintenance. The crew are collateral damage.',
  climax: 'Midnight approaches. The party must find the phylactery, break the loop, and escape before the ship sinks — while convincing the captain to let go of his ship and his 200-year denial. If the phylactery is destroyed, the loop breaks and the crew finally passes on. If the party keeps it, they have a lich\'s phylactery — and a very angry lich coming for it.',
  scenes: [
    {
      title: 'Scene 1: All Hands on Deck',
      summary: 'Boarding the ghost ship. The crew is friendly, helpful, and have no idea that 200 years have passed or that they\'re dead.',
      challenge: 'social',
      keyEvents: [
        'Boarding: the crew welcomes visitors, offers rum, asks about "the war" (which ended 200 years ago)',
        'Small anomalies: a sailor walks through a wall, the compass spins, the sunset happens too fast',
        'The captain\'s logbook: the last entry is 200 years old. The ink is still wet.',
        'A crew member touches the party and their hand passes through — they freeze, confused, then forget',
      ],
    },
    {
      title: 'Scene 2: The Loop',
      summary: 'The party discovers the time loop as anomalies increase. Midnight approaches. Crew members start remembering fragments.',
      challenge: 'exploration',
      keyEvents: [
        'Time acceleration: the sky cycles through sunset at 10x speed',
        'A sailor remembers drowning — screams, then forgets',
        'The captain\'s locked cabin: heavy wards, the phylactery\'s faint glow visible under the door',
        'The ship groans — it\'s starting to sink',
      ],
    },
    {
      title: 'Scene 3: Midnight',
      summary: 'The ship sinks. The party must get the phylactery, make their choice, and escape as the ocean claims the vessel for the 73,000th time.',
      challenge: 'combat',
      keyEvents: [
        'The captain blocks the cabin: "My ship. My cargo. You will NOT take it."',
        'Water rushes in — combat on a sinking ship, knee-deep then waist-deep',
        'The phylactery found: cold, evil, and the anchor of the loop',
        'The choice: destroy (freeing the crew, angering a lich) or take (leverage, danger)',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Captain Harlan Voss', role: 'ghost captain / tragic figure', personality: 'A proud captain in deep denial. He knows something is wrong but admitting it means his ship is gone, his crew is dead, and 200 years have passed. "My ship is FINE. The weather is FINE. Everything is FINE."' },
    { name: 'First Mate Kira', role: 'ghost / closest to remembering', personality: 'The first mate who keeps having flashes of drowning. She\'s the most likely to accept the truth. "I had a dream about water. A lot of water. It felt real."' },
    { name: 'The Lich (unseen)', role: 'true antagonist', personality: 'The owner of the phylactery. Not present but felt — the wards on the cabin, the time loop, the wrongness of the ship. If the phylactery is taken, the lich will come.' },
  ],
  keyLocations: [
    { name: 'The Ghost Ship (The Wavecutter)', description: 'A perfectly preserved galleon that shouldn\'t exist. Below deck, the water line is visible through transparent walls.', significance: 'The entire one-shot takes place here.' },
    { name: 'The Captain\'s Cabin', description: 'Warded, locked, and containing a glowing phylactery on the desk. The captain will defend it with ghostly fury.', significance: 'Where the phylactery and the final confrontation are.' },
    { name: 'The Cargo Hold', description: 'Below the waterline. As midnight approaches, water seeps in through walls that are becoming transparent.', significance: 'Where the sinking becomes real and escape becomes urgent.' },
  ],
  dataSystems: ['hauntedLocation', 'navalCombat', 'shipwreckGenerator', 'encounterWaves', 'trapCorridor', 'deathSaveDrama'],
};
