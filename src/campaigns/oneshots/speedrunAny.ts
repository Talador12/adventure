import type { OneShotCampaign } from '../types';

export const speedrunAny: OneShotCampaign = {
  id: 'oneshot-speedrun-any-percent',
  type: 'oneshot',
  title: 'Speedrun Any%',
  tagline: 'A time wizard challenges you to clear a dungeon in 10 real-time minutes. Glitches in reality can be exploited.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 2,
  settingSummary:
    'Chronomancer Tick operates the Temporal Dungeon, a speed-running facility where adventurers compete for the fastest clear time. The current world record is 8 minutes 47 seconds, held by a halfling monk who exploited a reality glitch to skip three rooms. The dungeon has been speed-run so many times that reality itself has degraded: walls clip, rooms load wrong, and certain spots let you fall through the floor into later sections. The DM uses an actual real-world timer. The dungeon has ten rooms but any-percent rules say you only need to touch the final boss.',
  hook: 'Chronomancer Tick appears in a flash: "Welcome, runners. Today\'s seed is favorable. Wind from the east, goblin density is low, and the floor glitch in room four is still active. The record is 8:47. Your time starts... NOW." A giant hourglass flips. The timer begins. TEN MINUTES. REAL TIME.',
  twist: 'The dungeon adapts to speed-runners. It has seen every trick. Room-skipping? The dungeon spawns a wall. Floor glitches? They move between runs. The current record holder is here today, running alongside the party, and she is FAST. The dungeon is not just a challenge - it is a competition with a veteran speed-runner who knows every exploit.',
  climax: 'The final boss room. The boss has a health bar that takes exactly 3 minutes to deplete through normal combat. The party has 90 seconds left. They must find a skip: a one-shot kill, an exploit, a creative solution that bypasses the health bar entirely. The record holder is right behind them. It is a photo finish.',
  scenes: [
    {
      title: 'Rooms 1-4: The Opening Split',
      summary: 'Speed through the first rooms. Traps are known quantities. Monsters are obstacles, not fights. The party must decide: clear rooms or exploit skips?',
      challenge: 'exploration',
      keyEvents: [
        'Room one: goblins. A speed-runner does not fight goblins. A speed-runner runs PAST goblins.',
        'Room two: a locked door. A speed-runner does not pick locks. A speed-runner breaks the door while running.',
        'Room three: a pit trap. The floor-clip exploit is supposed to be here. It moved. Improvise.',
        'Room four: the rival speed-runner passes the party on the left. She waves without slowing down.',
      ],
    },
    {
      title: 'Rooms 5-8: The Mid Split',
      summary: 'The dungeon fights back against speed-running. Walls shift. Skips close. The party must adapt in real time while the clock ticks.',
      challenge: 'puzzle',
      keyEvents: [
        'A wall spawns where a skip used to be. The dungeon is patching exploits mid-run.',
        'Room six: a puzzle that normally takes 10 minutes. The speed-runner solution: ignore it and blow through the wall.',
        'The rival speed-runner hits a dead end where a skip closed. She is behind the party now. Momentum shifts.',
        'A new glitch discovered: reality stutters in a corner and the party can clip through to room nine. Do they risk it?',
      ],
    },
    {
      title: 'The Boss Room',
      summary: 'Ninety seconds on the clock. The boss has a three-minute health bar. Normal combat will not work. Find the skip or lose.',
      challenge: 'combat',
      keyEvents: [
        'The boss: a golem with a massive health bar. It moves slowly. It hits hard. It was designed to be a time sink.',
        'The speed-runner approach: do not fight the boss. Find the environmental kill. A chandelier, a pit, a trap that can be redirected.',
        'The rival speed-runner arrives. She goes for the chandelier. The party goes for the pit. Both are valid strats.',
        'FINISH. Timer stops. The golem falls. The party checks the clock. Did they beat 8:47? Regardless: they will want to run it again.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Chronomancer Tick', role: 'dungeon operator / commentator', personality: 'An excitable time mage who commentates runs like a sports announcer. "AND THEY SKIP ROOM THREE! BOLD MOVE! The goblins are CONFUSED!" Genuinely passionate about speed-running as an art form.' },
    { name: 'Sable the Record Holder', role: 'rival / speed-runner', personality: 'A halfling monk who holds the world record. Calm, precise, and knows every pixel of this dungeon. Runs with her eyes half-closed because she has memorized the layout. "Good luck. You will need it."' },
  ],
  keyLocations: [
    { name: 'The Temporal Dungeon', description: 'A dungeon degraded by thousands of speed-runs. Reality is thin. Walls clip. Rooms load wrong. It is a perfectly designed obstacle course with perfectly designed exploits.', significance: 'The race track. Every room is a time decision.' },
    { name: 'The Boss Arena', description: 'A circular room with a golem, a chandelier, a pit, and a timer display showing the current run time in giant glowing numbers.', significance: 'The final challenge. Where the run is won or lost in seconds.' },
  ],
  dataSystems: ['chaseSequence', 'trapGenerator', 'combatNarration'],
};
