import type { OneShotCampaign } from '../types';

export const respawnCamping: OneShotCampaign = {
  id: 'oneshot-respawn-camping',
  type: 'oneshot',
  title: 'Respawn Camping',
  tagline: 'Dead monsters come back in 10 minutes. Clear rooms fast or the first goblins return angrier than ever.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'survival'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The Eternal Dungeon is cursed with a respawn enchantment. Any creature killed inside reappears at its original location exactly ten minutes later. Angrier. Stronger. With memories of who killed them. The party must clear rooms, solve puzzles, and defeat the boss before the first room\'s monsters respawn and start hunting them. The dungeon has eight rooms. Ten minutes per room means eighty minutes total. They have sixty before the goblins come back. And the goblins remember.',
  hook: 'The party clears the first room of goblins. Easy. They move on. Ten minutes later, a commotion from behind: the goblins are back. Alive. Angry. Pointing in the party\'s direction. "THAT IS THEM. THAT IS THE ONES WHO KILLED US." The party is now on a clock they did not know existed.',
  twist: 'The boss knows about the respawn. The boss is USING it. It deliberately lets itself get killed, respawns stronger, and fights again. The boss has been "killed" forty-seven times by previous parties, respawning each time with accumulated rage. It is now forty-seven times angrier than its base state. The party must find a way to kill the boss AND break the respawn enchantment simultaneously, or the boss just keeps coming back, angrier each time.',
  climax: 'The respawn crystal is in the boss\'s chamber. The boss guards it because destroying the crystal means it dies permanently and it LIKES being immortal. The party must destroy the crystal while fighting a boss that has respawned forty-seven times, as every monster in the dungeon simultaneously respawns and converges on the final room. A wave defense while smashing a crystal while dodging a boss that will not stay dead.',
  scenes: [
    {
      title: 'The First Clear',
      summary: 'The party clears rooms efficiently, unaware of the respawn timer. Confidence is high. Then room one\'s goblins come back.',
      challenge: 'combat',
      keyEvents: [
        'Rooms one through three cleared quickly. Standard dungeon fare. The party feels good.',
        'A sound from behind. Footsteps. Angry footsteps. "HEY. HEY! WE REMEMBER YOU."',
        'The goblins from room one are back. They are pointing. They are upset. They know exactly who killed them.',
        'The party realizes: ten-minute respawn. They have been in the dungeon for twelve minutes. The clock is already running.',
      ],
    },
    {
      title: 'The Respawn Rush',
      summary: 'The party races through rooms as the respawn timer creates a wave of enemies behind them. Speed versus thoroughness.',
      challenge: 'exploration',
      keyEvents: [
        'Room four has a puzzle. The puzzle takes five minutes. Behind them, room two\'s skeletons respawn.',
        'The party leaves room five\'s treasure because looting takes time and the wave is building.',
        'A respawned goblin chief appears with a crudely drawn wanted poster of the party. "DEAD. AGAIN. BRING PROOF."',
        'Room seven: the party can hear every previous room\'s monsters converging behind them. The dungeon is a funnel.',
      ],
    },
    {
      title: 'The Crystal Smash',
      summary: 'The boss, the crystal, and every respawned monster in the dungeon converge on the final room. Wave defense meets boss fight meets demolition.',
      challenge: 'combat',
      keyEvents: [
        'The respawn crystal: a massive pulsing gem in the center of the boss room. It hums with each respawn.',
        'The boss: killed forty-seven times, respawned forty-seven times, carrying forty-seven grudges. It is FURIOUS.',
        'Monsters pour in from the corridor. Goblins, skeletons, oozes, all previously "killed," all very upset.',
        'The crystal shatters. Every respawned monster drops dead simultaneously. The boss screams, flickers, and dissolves. Permanent death. The dungeon goes quiet. For the first time in centuries.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Goblin Sergeant Krix', role: 'recurring enemy / grudge holder', personality: 'The first goblin the party killed. Respawns angrier each time. Keeps a tally of how many times he has died. "SEVENTEEN. SEVENTEEN TIMES YOU HAVE KILLED ME. I AM KEEPING COUNT."' },
    { name: 'The Respawn Boss (Lord Endure)', role: 'villain / immortality addict', personality: 'A death knight who discovered the respawn crystal and became addicted to dying and coming back stronger. Has been "killed" forty-seven times. Each death made him angrier. He is now a 47x-angry death knight. He considers dying a hobby.' },
  ],
  keyLocations: [
    { name: 'The Eternal Dungeon', description: 'An eight-room dungeon with a ten-minute respawn timer. Every cleared room refills behind the party. Every monster remembers.', significance: 'The ticking clock. The party must always move forward because backwards is full of angry dead things that are alive again.' },
    { name: 'The Respawn Crystal Chamber', description: 'The final room. A massive crystal pulses in the center, reanimating everything in the dungeon. Destroying it ends the cycle.', significance: 'The climax. Where the respawn loop is broken and everything dies for real.' },
  ],
  dataSystems: ['encounterWaves', 'combatNarration', 'trapGenerator'],
};
