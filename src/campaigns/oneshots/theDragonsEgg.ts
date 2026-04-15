import type { OneShotCampaign } from '../types';

export const theDragonsEgg: OneShotCampaign = {
  id: 'oneshot-dragons-egg',
  type: 'oneshot',
  title: 'The Dragon\'s Egg',
  tagline: 'Steal a dragon egg without waking the dragon. The egg is also the alarm system.',
  tone: 'heist',
  themes: ['heist', 'classic_fantasy', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'An ancient red dragon sleeps in a volcanic cavern atop a hoard of gold. Among the hoard is a single egg - the dragon\'s only offspring. The egg is connected to the dragon\'s dreams: if the egg is disturbed, the dragon wakes. If the dragon wakes, everyone in the mountain dies. The party must steal the egg using only stealth, cunning, and very careful hands.',
  hook: 'The dragonologist is frantic: "The egg will hatch in three days. When it does, that volcano becomes a nursery for two red dragons instead of one. The region is doomed. Steal the egg before it hatches. Do NOT wake the mother. She sleeps on a pile of gold that amplifies every vibration. One coin out of place and she opens her eyes."',
  twist: 'The egg is already hatching. The dragonologist lied about having three days - it is hatching tonight. The party arrives to find cracks forming. They cannot steal a hatching egg without it screaming. They must now steal a baby dragon - which is awake, hungry, and thinks the first thing it sees is its mother.',
  climax: 'The egg cracks open as the party reaches it. A tiny red dragon hatchling looks up at whoever is closest. It chirps. The mother stirs. The party has seconds to grab the hatchling, keep it quiet, and escape the cavern before the mountain erupts in dragonfire.',
  scenes: [
    {
      title: 'Scene 1: The Approach',
      summary: 'Scaling the volcanic mountain and entering the dragon\'s lair. Every step closer raises the stakes.',
      challenge: 'exploration',
      keyEvents: [
        'The volcano: active, hot, venting steam through cracks in the rock',
        'The entrance: a cave mouth with the smell of sulfur and the distant sound of breathing',
        'The hoard cave: visible from a ledge - a mountain of gold with a sleeping dragon on top',
        'The egg: visible among the coins, pulsing with warmth, positioned directly under the dragon\'s wing',
      ],
    },
    {
      title: 'Scene 2: The Hoard',
      summary: 'Navigating a sea of gold coins without making a sound. Every step is a stealth check. Every coin is a potential alarm.',
      challenge: 'puzzle',
      keyEvents: [
        'The gold: ankle-deep, shifting, and amplifying every vibration to the sleeping dragon',
        'The dragon\'s sleep: deep but restless - she murmurs, shifts, and her tail sweeps randomly',
        'Moving through the hoard: barefoot, slow, redistributing weight with every step',
        'Reaching the egg: it is warm, cracked, and visibly moving - this changes everything',
      ],
    },
    {
      title: 'Scene 3: The Hatchling',
      summary: 'The egg hatches. The baby dragon is adorable and LOUD. The mother is waking up. Run.',
      challenge: 'combat',
      keyEvents: [
        'The crack: the egg splits open and a tiny red dragon tumbles out, chirping',
        'Imprinting: the hatchling sees the closest party member and follows them - loudly',
        'The mother stirs: one eye opens, then both - the mountain shakes',
        'The escape: sprint through the cavern with a baby dragon, dodge the mother\'s fire, and survive',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Dr. Fenn Ashwick', role: 'quest giver', personality: 'Speaks in footnotes - interrupts himself to clarify details nobody asked about. "The egg - well, technically it is an ootheca with a single embryo - needs to be removed before - did I mention she is an ancient? Fascinating specimen. Do not touch the gold."', secret: 'He wants to study the hatchling, not destroy it. He believes he can raise a dragon peacefully.' },
    { name: 'Scoria', role: 'the dragon', personality: 'Not a character you talk to. A force of nature you survive. Her breathing fills the cavern like a bellows. When she shifts in her sleep, gold coins cascade like an avalanche. One eye opens and the temperature in the room rises thirty degrees.' },
    { name: 'The Hatchling', role: 'the cargo', personality: 'The size of a housecat with the confidence of something that will eventually be the size of a castle. Chirps when curious. Hiccups small jets of flame. Follows whoever it imprinted on with absolute devotion and zero stealth.' },
  ],
  keyLocations: [
    { name: 'The Volcanic Cavern', description: 'A massive cave inside an active volcano. The floor is covered in gold coins. A red dragon sleeps at the center. The heat is unbearable.', significance: 'Where the heist happens.' },
    { name: 'The Hoard', description: 'Thousands of gold coins, gems, and artifacts spread across the cavern floor. Every surface reflects firelight. Every step makes noise.', significance: 'The obstacle between the party and the egg.' },
    { name: 'The Escape Tunnel', description: 'A narrow lava tube leading out of the mountain. Too small for the mother dragon. Just wide enough for running adventurers and a baby dragon.', significance: 'The only way out when things go wrong.' },
  ],
  dataSystems: ['heistPlanner', 'encounterWaves', 'combatNarration', 'chaseSequence'],
};
