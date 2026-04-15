import type { OneShotCampaign } from '../types';

export const theGhostFlotilla: OneShotCampaign = {
  id: 'oneshot-the-ghost-flotilla',
  type: 'oneshot',
  title: 'The Ghost Flotilla',
  tagline: 'Thirty ships. Full cargo. Zero crew. The fog is getting thicker and your skin feels wrong.',
  tone: 'horror',
  themes: ['nautical', 'horror', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 6,
  estimatedHours: 3,
  settingSummary:
    'A wall of fog sits on the open ocean — unmoving, unnatural, and thirty ships deep. The party\'s pirate crew spots masts in the mist and cannot resist. Inside the fog, they find an entire fleet drifting in formation: merchant vessels, warships, fishing boats, all intact, all empty. Cargo holds burst with treasure. Meals sit half-eaten on tables. A chess game waits mid-move. Something took every crew at the same instant. The fog is cold, wet, and alive.',
  hook: 'The lookout calls "ships in the fog" and the captain grins. Salvage rights on thirty vessels would make them rich for life. The party boards the nearest ship to investigate and the fog closes behind them. Their own ship is gone — or just invisible. The silence is the loudest thing they have ever heard.',
  twist:
    'The ships are not empty. The crews ARE the fog. A sea hag cursed this fleet two centuries ago for killing her children — dolphins caught in their nets. She dissolved every sailor into mist. They exist as fog now: conscious, suffering, and hungry. When the fog touches living skin, it absorbs. The treasure is bait. The fog is the trap. The hag died long ago but the curse sustains itself on new victims.',
  climax:
    'The fog contracts — the flotilla is shrinking as the mist pulls inward. The party must find the hag\'s anchor (a coral crown on the flagship) and destroy it before the fog absorbs them. The crew-fog fights back: ghostly hands form in the mist, voices beg for help, and the ships rearrange themselves to block escape routes. Breaking the crown releases the souls but also releases the fog — a wall of anguished mist rolling toward the nearest port city. The party must decide: destroy the crown and risk the port, or find another way to lay two thousand souls to rest.',
  scenes: [
    {
      title: 'Scene 1: The Salvage',
      summary: 'The party boards the first ship and explores the flotilla. Everything is preserved. Everything is wrong. The fog closes in.',
      challenge: 'exploration',
      keyEvents: [
        'Boarding: treasure everywhere, meals still warm, a pipe still smoking on a table',
        'Captain\'s log on the first ship: entries stop mid-sentence. The last word is "fog"',
        'Second ship: a child\'s toy on the deck, a cradle in the cabin, both empty',
        'The fog thickens: the party\'s ship is no longer visible. Compass spins.',
      ],
    },
    {
      title: 'Scene 2: The Dissolution',
      summary: 'The fog becomes aggressive. Ghostly forms appear. The party learns what happened and begins searching for the anchor.',
      challenge: 'puzzle',
      keyEvents: [
        'A handprint appears on a party member\'s arm — cold, damp, and it does not wipe off',
        'Voices in the fog: "help us" and "join us" and "we are so cold"',
        'Discovery: a ship\'s log from 200 years ago describes the hag\'s curse and the coral crown',
        'The flagship is visible in the center of the flotilla — the fog is thickest there',
      ],
    },
    {
      title: 'Scene 3: The Crown',
      summary: 'The party reaches the flagship and confronts the fog itself. The coral crown must be destroyed while ghostly sailors try to absorb them.',
      challenge: 'combat',
      keyEvents: [
        'The flagship deck: the fog is so thick it is nearly liquid. Breathing is drinking mist.',
        'The coral crown sits on a throne of barnacles. Touching it triggers the crew-fog to attack.',
        'Combat against fog wraiths — they reform when dispersed, the only way to stop them is the crown',
        'The choice: destroy the crown (releases fog toward port) or use it to command the fog (power at a price)',
      ],
    },
    {
      title: 'Scene 4: The Clearing',
      summary: 'The crown is dealt with. The fog lifts or does not. The flotilla sits in calm water, treasure still gleaming. The party has minutes to loot before the ships begin to sink.',
      challenge: 'exploration',
      keyEvents: [
        'The fog lifts: two thousand ghostly figures become visible for one heartbeat before dissolving into sea spray',
        'The ships groan — without the curse, two centuries of decay hits at once',
        'Looting run: grab what you can before the flotilla sinks into the deep',
        'The party\'s ship reappears. The crew is pale, shaken, and very glad to leave.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Captain Dresh', role: 'party\'s captain / practical authority', personality: 'A pirate captain who has seen strange things but nothing like this. Her bravado cracks exactly once — when the fog whispers her mother\'s name. After that she is all business and wants OFF these ships.' },
    { name: 'The Fog Voices', role: 'antagonist / tragic victims', personality: 'Two thousand dissolved sailors speaking as one. They are not evil. They are in agony. They grab at the living not to harm but because they remember what warmth felt like. Their collective voice sounds like wind through rigging.' },
    { name: 'Navigator Pel', role: 'NPC crew / exposition', personality: 'The party\'s navigator who recognizes the flagship from old charts. "That is the Coral Throne. It disappeared two hundred years ago with an entire merchant convoy. Nobody found the wreckage." His hands shake while he talks.' },
  ],
  keyLocations: [
    { name: 'The Flotilla', description: 'Thirty ships drifting in fog formation. Each one perfectly preserved, each one a time capsule from the moment the crews vanished.', significance: 'The entire one-shot takes place here. Each ship is a room in a floating dungeon.' },
    { name: 'The Flagship (Coral Throne)', description: 'The largest vessel at the center of the flotilla. The fog is nearly solid here. A throne of living coral sits on the quarterdeck with a crown fused to its back.', significance: 'Where the curse anchors and where the climax takes place.' },
    { name: 'The Cargo Holds', description: 'Overflowing with two centuries of accumulated treasure from every ship the fog has swallowed since.', significance: 'The bait. The motivation to go deeper. The reward if the party survives long enough to carry it out.' },
  ],
  dataSystems: ['hauntedLocation', 'navalCombat', 'shipwreckGenerator', 'weatherHazard', 'trapCorridor', 'deathSaveDrama'],
};
