import type { FullCampaign } from '../types';

export const theBlackTide: FullCampaign = {
  id: 'full-the-black-tide',
  type: 'full',
  title: 'The Black Tide',
  tagline: 'Your ship is gone. Your crew is scattered. You have a raft, a grudge, and an ocean that wants you dead.',
  tone: 'survival',
  themes: ['nautical', 'survival', 'war'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 18,
  settingSummary:
    'The Shattered Reach is a chain of uncharted islands in a sea that does not appear on any map. Volcanic, overgrown, riddled with caves and ruins from a civilization that worshipped something in the deep water. The sea itself is a character — unpredictable currents, bioluminescent storms, and a kraken the locals call the Black Tide that has claimed every shipping lane within a hundred miles. The party washes up here with nothing. The islands are the forge. The sea is the anvil. What they build from the wreckage determines whether they survive.',
  hook: 'The party\'s pirate ship, The Revenant, engages a naval frigate in the dark. Cannons fire. Hulls splinter. The Revenant goes down. The party wakes on a beach — no ship, no crew, no supplies. Just sand, jungle, and the distant sound of something very large moving through the water. Survival starts now.',
  twist:
    'The navy did not attack them. The collision was an accident — both ships were fleeing the kraken in the dark and ran into each other. The naval captain, Admiral Caro, is stranded on a neighboring island with the same problem: no ship, hostile wildlife, and a sea monster blocking the only way home. The party\'s sworn enemy is in the exact same situation. The kraken is not a random threat — it is a guardian placed by the island civilization to prevent outsiders from leaving with their secrets. The only way to get past it is to work together.',
  climax:
    'The party and Admiral Caro have built their ships and formed an uneasy alliance. The final run is through the kraken\'s territory — a narrow strait between two volcanic islands. The kraken attacks both ships. Cooperation is not optional: one ship plays bait while the other sails through, then they switch. If the alliance holds, both ships make it. If old grudges win, neither does.',
  acts: [
    {
      title: 'Act 1: Castaways',
      summary:
        'Survival on the islands. The party has nothing and must build everything. Finding fresh water, food, shelter. Building a raft, then a boat. Meeting the islands\' inhabitants — scattered tribes who have been here for generations and have their own relationship with the sea.',
      keyEvents: [
        'Waking on the beach: inventory check reveals almost nothing survived',
        'First night: something large surfaces offshore. Bioluminescent. Watching.',
        'Freshwater discovery in the volcanic caves — guarded by territorial creatures',
        'First contact with the island tribes: they speak a dead language and fear the open water',
        'The raft: lashed together from wreckage, barely seaworthy, terrifying to use',
        'Discovery that Admiral Caro\'s crew survived on the neighboring island',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Shipwright',
      summary:
        'Building a real ship. The party must recruit crew from the island inhabitants, salvage materials from the ruins, and navigate the political dynamics of the tribes. Meanwhile, the kraken grows more aggressive and the sea itself seems to be pushing them toward something.',
      keyEvents: [
        'Ruins exploration: the island civilization left shipyards, tools, and warnings carved in stone',
        'Crew recruitment: the tribes have sailors but will not help unless the party proves respect for the sea',
        'The kraken destroys the party\'s first real ship in the harbor. Back to square one.',
        'Contact with Caro: a message in a bottle, then a face-to-face meeting on neutral ground',
        'Caro reveals the truth: the collision was not a battle. Both ships were running.',
        'The tribes\' elder shares the kraken\'s purpose: it guards the strait. It was placed there deliberately.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Black Tide',
      summary:
        'The alliance with Caro, the final build, and the run through the strait. The kraken is the last obstacle between the party and the open sea. Getting past it requires everything they have built, everyone they have recruited, and a trust in their enemy that goes against every instinct.',
      keyEvents: [
        'Alliance negotiations with Caro: what happens after the strait? Do old grudges resume?',
        'The second ship launches: built from island ruins, crewed by tribal sailors and surviving pirates',
        'The strait approach: volcanic walls, narrow passage, the water turns black with ink',
        'The kraken attacks: tentacles the size of masts, an eye as big as a lifeboat',
        'The bait-and-switch: one ship draws the kraken while the other runs the strait, then they swap',
        'Through the strait: open sea. Two ships. A pirate and an admiral. Whatever comes next, they earned it.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Admiral Isolde Caro',
      role: 'enemy / forced ally',
      personality:
        'Professional, disciplined, and genuinely honorable — which makes her infuriating because the party cannot hate her. She treats the alliance as a military operation and expects the same from the party. She does not trust them. She does not need to. She needs them competent.',
      secret: 'She was ordered to sink The Revenant by a corrupt admiralty board. She refused. The collision was real. The battle was not.',
    },
    {
      name: 'Taku',
      role: 'island elder / guide',
      personality:
        'Ancient, patient, speaks in metaphors about the sea. He has lived on these islands his entire life and views the kraken not as a monster but as a neighbor. He will help the party only if they understand that the sea is not theirs to conquer.',
    },
    {
      name: 'Bones',
      role: 'surviving crew member / comic relief',
      personality:
        'The Revenant\'s cook. Survived because he was holding onto a barrel of rum. Refuses to believe the ship actually sank. "She\'s just resting. On the ocean floor. Temporarily." Terrible fighter. Excellent morale officer.',
    },
  ],
  keyLocations: [
    {
      name: 'The Shattered Reach',
      description:
        'A volcanic island chain surrounded by bioluminescent waters. The ruins of an ancient sea-worshipping civilization dot every island. The currents are unpredictable and the wildlife is territorial.',
      significance: 'The party\'s prison and their forge. Everything they need to escape is here, buried in the ruins.',
    },
    {
      name: 'The Strait of Ink',
      description:
        'A narrow channel between two active volcanoes where the water turns black. The kraken\'s territory. Bones of ships line the volcanic walls.',
      significance: 'The final obstacle. The only way back to the open sea.',
    },
    {
      name: 'The Sunken Shipyard',
      description:
        'An ancient drydock half-submerged in a lagoon. The island civilization built vessels here that could navigate the kraken\'s waters. The tools still work.',
      significance: 'Where the party builds their escape ship using techniques the ancients designed specifically for this sea.',
    },
  ],
  dataSystems: [
    'navalCombat',
    'shipwreckGenerator',
    'weatherHazard',
    'survivalForaging',
    'encounterWaves',
    'socialEncounter',
    'craftingSystem',
    'factionReputation',
  ],
};
