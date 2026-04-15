import type { OneShotCampaign } from '../types';

export const theCollapsingDungeon: OneShotCampaign = {
  id: 'oneshot-collapsing-dungeon',
  type: 'oneshot',
  title: 'The Collapsing Dungeon',
  tagline: 'Ten rooms to the exit. Each one collapses five minutes after you enter. Do the math.',
  tone: 'survival',
  themes: ['survival', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 2.5,
  settingSummary:
    'An ancient dungeon is structurally failing. The keystones are crumbling. Each room begins collapsing within five minutes of the party entering. The exit is ten rooms away. Every room has an obstacle. Backtracking is not an option.',
  hook: 'The ceiling groans. Dust falls. A crack races across the floor. Behind the party, the room they just left implodes into rubble. A countdown begins. It will not stop.',
  twist:
    'The dungeon is collapsing because something is waking up beneath it. The lowest level holds a bound titan, and its stirring is what shakes the foundations. The exit path leads directly over its prison.',
  climax:
    'The final room is the titan\'s prison chamber. The floor is cracking as it pushes upward. The exit is across the chamber. Sprint across a floor that is actively breaking apart over a waking god, or find a way to put it back to sleep.',
  scenes: [
    {
      title: 'Scene 1: Rooms 1-4',
      summary: 'The first stretch. Each room has a puzzle or obstacle. Five minutes per room. The party learns the pace or dies.',
      challenge: 'puzzle',
      keyEvents: [
        'Room 1: Locked door. Puzzle lock. Timer starts. Rubble falls.',
        'Room 2: Flooded corridor. Swim fast or drown in collapsing stone.',
        'Room 3: A trapped hallway. Disarm or tank the damage. No time for both.',
        'Room 4: A chasm. The bridge is half-collapsed. Jump, climb, or get creative.',
      ],
    },
    {
      title: 'Scene 2: Rooms 5-8',
      summary: 'The collapse accelerates. Rooms fall faster. Encounters appear. The dungeon is not empty.',
      challenge: 'combat',
      keyEvents: [
        'Room 5: Undead guardians that do not care about falling rocks.',
        'Room 6: A treasure room. Grabbing anything costs seconds. Seconds matter.',
        'Room 7: The floor is giving way. Platforming across crumbling stone.',
        'Room 8: A sealed door. The key is in the room that just collapsed behind them.',
      ],
    },
    {
      title: 'Scene 3: The Prison Chamber',
      summary: 'The final room. A titan stirs below. The exit is visible across a breaking floor. Cross it before the whole dungeon goes.',
      challenge: 'exploration',
      keyEvents: [
        'The chamber is massive. The floor cracks with each step. Something breathes below.',
        'A massive eye opens in the floor. The titan sees the party.',
        'Sprint across or find the binding runes to reinforce the prison.',
        'The exit. Daylight. The dungeon collapses behind them. The mountain shakes.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'The Bound Titan',
      role: 'environmental threat',
      personality: 'Not a speaking character. A force. Its breathing shakes rooms. Its eye is the size of a wagon. It does not attack - it simply wakes up, and the world breaks.',
    },
  ],
  keyLocations: [
    {
      name: 'The Collapsing Halls',
      description: 'Ancient stone corridors cracking apart in real time. Dust, falling debris, and a countdown that never stops.',
      significance: 'The entire one-shot. Every room is a timed challenge.',
    },
    {
      name: 'The Prison Chamber',
      description: 'A vast underground vault. Binding runes glow faintly on the cracking floor. Something enormous shifts below.',
      significance: 'The final obstacle and the source of the collapse.',
    },
  ],
  dataSystems: ['trapCorridor', 'puzzleLock', 'combatNarration', 'environmentalHazard'],
};
