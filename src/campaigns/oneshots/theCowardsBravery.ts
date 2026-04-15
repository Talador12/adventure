import type { OneShotCampaign } from '../types';

export const theCowardsBravery: OneShotCampaign = {
  id: 'oneshot-the-cowards-bravery',
  type: 'oneshot',
  title: 'The Coward\'s Bravery',
  tagline: 'A dungeon that can only be completed by running away from every encounter. Fighting makes things worse. Fleeing is the only strategy.',
  tone: 'shenanigans',
  themes: ['dungeon_crawl', 'comedy', 'survival'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Hydra Halls are a dungeon where every monster has Hydra rules: kill one, two more spawn. Not just hydras - EVERYTHING. Kill a goblin, two goblins appear. Kill a rat, two rats appear. Kill a skeleton, two skeletons rise from the floor. Fighting makes the dungeon exponentially more dangerous. The only way through is to avoid, evade, distract, and flee from every single encounter. The party must become professional, strategic cowards. Running is a skill. Running well is mastery.',
  hook: 'The party enters the Hydra Halls and fights the first goblin. It dies. Two goblins appear where it fell. The fighter kills one of those. Two more replace it. The wizard fireballs the group. Eight goblins stand in the ashes. The cleric realizes the pattern first: "STOP FIGHTING. STOP. EVERY KILL MAKES IT WORSE." The party is now facing 15 goblins where there was 1. The only path forward is the one they have never practiced: strategic retreat.',
  twist:
    'The Hydra Halls were built as a TRAINING dungeon for diplomats, not warriors. The original purpose was to teach young nobles that violence escalates and withdrawal is often the wisest strategy. The treasure at the end is not gold - it is a Writ of Diplomatic Authority, one of the most politically powerful documents in the realm. The dungeon\'s builder, a pacifist archmage, designed it so only those who learn to NOT fight can claim the prize. The exit only opens for a party with zero kills.',
  climax:
    'The final room contains a massive elder hydra blocking the treasure. The party has (hopefully) not killed anything to get here. The hydra has 50 heads. If they kill a head, 2 grow back. If they kill 2, 4 grow back. But the hydra is not aggressive - it is a guardian that only attacks if attacked first. The treasure is between its legs. The party must sneak, distract, or talk their way past a 50-headed hydra without harming a single head. If any head is harmed, the hydra becomes aggressive. The barbarian has been holding in their rage for the entire dungeon. This is their personal Everest.',
  scenes: [
    {
      title: 'Scene 1: The Exponential Problem',
      summary:
        'The party learns the hard way that killing anything spawns double. The first few encounters go wrong before they realize the rule. Then they must adapt: every encounter is now an escape challenge, not a combat challenge.',
      challenge: 'combat',
      keyEvents: [
        'Kill one goblin, two appear. Kill two, four appear. The party learns this costs 15 goblins.',
        'The cleric realizes the pattern. "IF WE STOP, they stop spawning. They are not chasing us. They just EXIST. STOP MAKING MORE."',
        'A rat encounter: normally trivial. Here, killing one rat starts a chain reaction. The party must let a single rat walk past without touching it. The barbarian vibrates with restraint.',
        'The party discovers they can distract, redirect, and evade without triggering spawns. Loud noises draw enemies away. Food lures them. Running is always an option.',
      ],
    },
    {
      title: 'Scene 2: The Art of Running Away',
      summary:
        'The party develops fleeing into a science. Scouting routes. Creating distractions. Using spells for utility instead of damage. The dungeon is full of encounters the party must navigate around, through, or away from.',
      challenge: 'exploration',
      keyEvents: [
        'A corridor blocked by skeletons. Fighting them doubles them. The wizard uses Minor Illusion to lure them down a side passage.',
        'A room with a sleeping ogre. The party must cross silently. The barbarian\'s heavy armor makes this a group effort: everyone helps muffle the clanking.',
        'A patrol of hobgoblins. The rogue scouts a ventilation shaft bypass. The fighter - who has NEVER climbed through a vent - must do so in full plate.',
        'The party finds a previous adventurer\'s journal. "Day 1: Killed a goblin. Day 2: Killed 40 goblins. Day 3: There are 10,000 goblins. Day 4: I live here now."',
      ],
    },
    {
      title: 'Scene 3: The 50-Headed Problem',
      summary:
        'The final room: a massive hydra with 50 heads, the treasure between its legs. Zero aggression unless provoked. The party must get past it without a single point of damage to claim the Writ.',
      challenge: 'social',
      keyEvents: [
        'The hydra fills the room. 50 heads watch the party enter. It does not attack. It watches. Every head blinks independently. It is unsettling.',
        'The treasure is visible between its legs. The only path is through, under, or around a creature with 50 points of observation.',
        'Options: distract 50 heads simultaneously (coordinated party effort), put the hydra to sleep (requires affecting ALL heads), or befriend it (each head has slightly different preferences).',
        'Success: the party claims the Writ of Diplomatic Authority without a single kill in the entire dungeon. The exit opens. The hydra goes back to sleep. The barbarian finally exhales.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Archmagus Pacifica (Plaque Only)',
      role: 'dungeon builder (long dead)',
      personality:
        'A pacifist archmage who built the Hydra Halls to teach that violence escalates. Her plaques throughout the dungeon offer guidance: "The wise warrior fights no battle. The wiser warrior fights no war. The wisest warrior is not a warrior at all. They are a diplomat. Exit is to the left."',
    },
    {
      name: 'Gerald the Previous Adventurer',
      role: 'cautionary tale / journal author',
      personality:
        'A fighter who entered the Hydra Halls and kept fighting. His journal charts the exponential catastrophe over 7 days. He survived by eventually hiding in a closet. He has been in the closet for 3 years. He lives there now. He has made it cozy. He has a blanket.',
      secret: 'He could leave at any time through the closet\'s back panel. He just likes the closet now.',
    },
    {
      name: 'The 50-Headed Hydra',
      role: 'final guardian / not actually hostile',
      personality:
        'A massive hydra that is more curious than aggressive. Each head has a slightly different personality: one is sleepy, one is hungry, one is philosophical, one is nervous. They communicate in overlapping hisses. They have been guarding the treasure for centuries. They are bored.',
    },
  ],
  keyLocations: [
    {
      name: 'The Hydra Halls',
      description:
        'A dungeon where every killed creature spawns double. The halls are littered with evidence of previous parties who fought: rooms with hundreds of goblin corpses, corridors overrun with rats, a chamber where someone killed a single spider and the ceiling is now entirely spiders.',
      significance: 'The entire adventure. Every room is a "do not fight" challenge.',
    },
    {
      name: 'The Guardian\'s Chamber',
      description:
        'A massive chamber dominated by a 50-headed hydra. The treasure sits on a pedestal between its legs. The hydra is calm, watchful, and only dangerous if provoked.',
      significance: 'The climax: get the treasure without violence for the first time in the entire dungeon.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'socialEncounter',
    'explorationHazard',
    'environmentalHazard',
    'trapDisarm',
    'fantasyInsults',
  ],
};
