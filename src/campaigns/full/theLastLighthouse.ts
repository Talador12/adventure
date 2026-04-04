import type { FullCampaign } from '../types';

export const theLastLighthouse: FullCampaign = {
  id: 'full-last-lighthouse',
  type: 'full',
  title: 'The Last Lighthouse',
  tagline: 'Something in the deep is rising. The light is all that holds it back.',
  tone: 'survival',
  themes: ['nautical', 'survival', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 16,
  settingSummary:
    'The Shattered Coast — a chain of islands battered by supernatural storms. An ancient network of lighthouses once held back the darkness from the deep, but all have gone dark except one. The party must relight the beacons while something massive stirs beneath the waves.',
  hook: 'A storm-wrecked ship deposits the party on a desolate island with a dying lighthouse keeper. With her last breath, she tells them the light must never go out — and something beneath the water screams in response.',
  twist:
    'The lighthouses don\'t just hold back a monster — they hold back an entire civilization. An aboleth empire sleeps beneath the sea floor, and the lights are the seal. The aboleths are waking because one of the lighthouse keepers has been intentionally dimming the lights, believing the aboleths promised him immortality.',
  climax:
    'The final lighthouse — the one that anchors all others — is under siege from below. The party must defend it during a massive assault while simultaneously confronting the traitorous keeper. If all lights fail, the aboleth empire rises.',
  acts: [
    {
      title: 'Act 1: Shipwrecked',
      summary:
        'The party arrives on the Shattered Coast, learns about the lighthouses, and begins relighting them. Each island has its own danger and its own keeper — or what\'s left of one.',
      keyEvents: [
        'Shipwreck on Beacon Isle — the dying keeper\'s warning',
        'First island exploration — resource scarcity and hostile fauna',
        'Relight the first dark lighthouse — something in the water recoils',
        'Discover the keeper\'s log network — coded messages between islands',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Island Hopping',
      summary:
        'The party sails between islands, relighting lighthouses and uncovering the aboleth threat. Each island is worse than the last. Some keepers survived; some didn\'t. One is working for the enemy.',
      keyEvents: [
        'Navigate the storm belt — survival checks against supernatural weather',
        'Island of the drowned — ghosts of sailors guard a lighthouse',
        'Deep one raiding party attacks at night',
        'The traitorous keeper\'s island — everything seems perfect (it\'s not)',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Rising',
      summary:
        'The aboleths fully stir. The sea itself becomes hostile. The party must reach and defend the Anchor Light while the entire ocean tries to stop them.',
      keyEvents: [
        'The sea turns dark — aboleth influence corrupts the water',
        'Underwater dungeon — the party must dive to repair a lighthouse foundation',
        'The traitorous keeper confronted — he\'s half-transformed, pitiful',
        'Final siege — defend the Anchor Light through the longest night',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Keeper Mara (deceased)',
      role: 'quest giver',
      personality:
        'A weathered old woman whose dying words set the story in motion. Her ghost may appear at lighthouses to offer guidance.',
    },
    {
      name: 'Captain Haddock',
      role: 'ally / transport',
      personality:
        'A grizzled halfling ship captain who is terrified of the deep water but sails it anyway because "someone has to." Drinks too much. Heart of gold.',
    },
    {
      name: 'Keeper Aldric',
      role: 'traitor',
      personality:
        'A seemingly kind old man on a pristine island. Too welcoming, too generous. His smile doesn\'t reach his eyes.',
      secret: 'Has been communicating with the aboleths via a psychic pool in his basement. Believes they promised to make him immortal. They promised nothing — they just showed him visions he interpreted as promises.',
    },
    {
      name: 'The Voice Below',
      role: 'antagonist',
      personality:
        'The elder aboleth coordinating the awakening. Communicates through dreams and corrupted water. Its thoughts feel like drowning.',
    },
  ],
  keyLocations: [
    {
      name: 'Beacon Isle',
      description:
        'The first island — rocky, wind-blasted, with a crumbling lighthouse that still flickers.',
      significance: 'Where the adventure begins and the party learns the stakes.',
    },
    {
      name: 'The Storm Belt',
      description:
        'A ring of supernatural storms surrounding the island chain. Navigation is deadly without lighthouse guidance.',
      significance: 'Natural barrier that makes island-hopping a challenge.',
    },
    {
      name: 'The Anchor Light',
      description:
        'The largest lighthouse, built on a sea stack in the center of the chain. Its light reaches all other islands.',
      significance: 'The final battlefield — if this falls, they all fall.',
    },
  ],
  dataSystems: [
    'navalCombat',
    'shipCrewManagement',
    'wildernessSurvival',
    'weatherProgression',
    'hauntedLocation',
    'encounterWaves',
    'siegeDefense',
    'naturalDisaster',
    'shipwreckGenerator',
  ],
};
