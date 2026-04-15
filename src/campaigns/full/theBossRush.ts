import type { FullCampaign } from '../types';

export const theBossRush: FullCampaign = {
  id: 'full-the-boss-rush',
  type: 'full',
  title: 'The Boss Rush',
  tagline: 'A wizard compressed 100 dungeons into one room. Each dungeon lasts 60 seconds. He is speedrunning the parallel room. He is on dungeon 87.',
  tone: 'shenanigans',
  themes: ['dungeon_crawl', 'comedy', 'epic'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 10,
  settingSummary:
    'The Compressed Gauntlet is a magical construct created by Archmagus Velocitus, a wizard obsessed with efficiency. He took 100 legendary dungeons - each one a weeks-long adventure - and compressed them into single rooms connected by doors. Each room contains one boss fight. Each fight lasts 60 seconds before the room collapses and the next door opens. There are no rests. No prep. No time to think. Just door after door after door. The Gauntlet exists inside a pocket dimension shaped like a long hallway. Two parallel tracks run side by side, separated by a glass wall. The party is on Track A. Velocitus himself is speedrunning Track B.',
  hook: 'A bounty posted in every tavern across the realm: "THE COMPRESSED GAUNTLET. 100 Bosses. 100 Minutes. Winner Takes the Infinity Hoard. Current Record: Unfinished." The party arrives to find a single door in the middle of a field. Inside: a hallway with two tracks. Track A (theirs) and Track B (occupied). Through the glass wall, they can see a lone wizard already fighting. A magical scoreboard floats above: "VELOCITUS - DUNGEON 87. CHALLENGERS - DUNGEON 0." A booming voice says: "BEGIN." The first door opens. An ancient red dragon fills the room. The timer reads: 60.',
  twist:
    'Velocitus did not create the Gauntlet for treasure. He created it to find someone who could FINISH it. He has run it 347 times and always fails at Dungeon 99 - a boss he literally cannot beat alone. The Gauntlet was designed for a party, not a solo run. He needs the challengers to catch up so he can break through the glass wall and join them for the final fight. Every taunt, every scoreboard update, every competitive jab through the glass is him desperately hoping they are good enough to actually make it. Dungeon 99 is a mirror match against perfect copies of the runners. One person cannot beat themselves. A party can cover each other\'s weaknesses.',
  climax:
    'The party reaches Dungeon 99 at the same time as Velocitus. The glass wall shatters. He joins the party for the first time, breathless, out of spell slots, running on pure adrenaline. Dungeon 99: perfect mirror copies of every runner. The copies know every trick, every spell, every tactic. The only way to win is to fight each other\'s copies - your mirror knows YOU, not your allies. Dungeon 100 is the real surprise: it is empty. Just a room with a table, chairs, and the Infinity Hoard. And sandwiches. Velocitus collapses into a chair and says "Finally. I have been trying to have lunch for six years."',
  acts: [
    {
      title: 'Act 1: Dungeons 1-33 (The Sprint)',
      summary:
        'The opening blitz. Bosses come fast and range from terrifying to absurd. An ancient dragon in 60 seconds. A gelatinous cube the size of the room. A lich who barely finishes his monologue before time runs out. A very sad goblin who just wants to talk. An angry goose. The party learns the rhythm: assess, engage, survive, next door.',
      keyEvents: [
        'Dungeon 1: Ancient Red Dragon. 60 seconds. No warmup. The party learns immediately that this is not a joke.',
        'Dungeon 7: A Very Sad Goblin. He does not want to fight. He wants to talk about his feelings. The timer still counts down. Do you fight him or listen?',
        'Dungeon 13: A Very Angry Goose. CR 0. Somehow the hardest fight so far. It dodges everything. It bites. It HONKS. Spiral begins: the bosses alternate between genuinely terrifying and absurdly anticlimactic. The emotional whiplash is the design.',
        'Dungeon 27: A boss that is just a locked door. The entire 60 seconds is picking the lock while nothing attacks. The rogue\'s moment to shine.',
        'Through the glass: Velocitus is ahead by 54 dungeons. He fights with terrifying efficiency. He also talks to himself constantly.',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: Dungeons 34-66 (The Grind)',
      summary:
        'The middle stretch. The bosses get harder and weirder. Resources are running low with no rests. The party must get creative with rationing spells, sharing potions, and using the environment. Velocitus starts slowing down - his lead shrinks. The glass wall shows him struggling. He starts leaving notes pressed against the glass between fights.',
      keyEvents: [
        'Dungeon 40: A boss that can only be defeated by complimenting it. The Insecurity Elemental crumbles when told it has nice eyes.',
        'Dungeon 48: Gravity reverses every 10 seconds. The boss is fine with this. The party is not.',
        'Dungeon 55: The boss is a swarm of 10,000 rats in the shape of a man. His name is Gerald.',
        'Dungeon 61: Velocitus presses a note against the glass: "PLEASE BE FAST. I NEED YOU AT 99." The party sees him fail Dungeon 66 for the first time. He restarts it. His hands are shaking.',
        'The party catches up. The scoreboard gap shrinks from 54 to 20 to 8.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: Dungeons 67-100 (The Wall)',
      summary:
        'The final push. Every boss is a genuine threat. The party is running on fumes. Velocitus is right alongside them now, matching pace. At Dungeon 99, the glass shatters and the truth is revealed. The mirror fight is the ultimate test. Dungeon 100 is the payoff - and it is not what anyone expected.',
      keyEvents: [
        'Dungeon 75: A beholder that takes up the entire room. No cover. No hiding. Just a giant eye and 60 seconds of terror.',
        'Dungeon 88: A tarrasque. In a room. For 60 seconds. The party does not need to kill it. They need to SURVIVE it.',
        'Dungeon 98: The scoreboard reads TIED. Velocitus looks at the party through the glass. He mouths: "Together."',
        'Dungeon 99: Glass shatters. Velocitus joins. Mirror copies appear. The only winning move: fight someone else\'s copy.',
        'Dungeon 100: An empty room. A table. Sandwiches. The Infinity Hoard in a modest chest. Velocitus cries. "Six years. I have been trying to eat lunch for six years." Chaos callback: Gerald the rat swarm appears in Room 100 too. He brought a covered dish. He was rooting for them all 347 runs.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Archmagus Velocitus',
      role: 'rival / eventual ally / exhausted genius',
      personality:
        'A wizard who has not slept properly in six years. He created the most efficient dungeon in history and then got stuck in it. He is brilliant, competitive, desperate, and very hungry. He talks to himself during fights. He names his spell slots. He is on first-name terms with several of the bosses. "Gerald! I told you last run, the rat thing is NOT intimidating!"',
      secret:
        'He designed the Gauntlet as a party challenge. He tried to solo it because he has no friends. 347 failed runs. He could have just... asked people to join him. He did not think of that.',
    },
    {
      name: 'The Scoreboard',
      role: 'narrator / referee / sentient construct',
      personality:
        'A magical floating scoreboard that provides play-by-play commentary with the energy of a sports announcer who has been awake for centuries. "AND THE CHALLENGERS TAKE DOWN THE BEHOLDER IN 43 SECONDS! VELOCITUS DID IT IN 38! THE RIVALRY INTENSIFIES!"',
    },
    {
      name: 'Gerald (10,000 Rats)',
      role: 'recurring boss / fan favorite',
      personality:
        'A swarm of rats that has achieved collective consciousness and chosen the name Gerald. Gerald is polite. Gerald just wants to be taken seriously as a boss. Gerald has been beaten by Velocitus 347 times and is starting to take it personally.',
      secret:
        'Gerald is the only boss who remembers every run. He has been keeping a journal. He roots for the party.',
    },
    {
      name: 'The Very Sad Goblin',
      role: 'boss (Dungeon 7) / emotional ambush',
      personality:
        'A goblin named Sniv who was placed in the Gauntlet against his will. He does not want to fight. He wants to talk about how his tribe kicked him out for being "too philosophical." The 60-second timer makes this heartbreaking. You cannot help him. You can only listen for a minute.',
    },
  ],
  keyLocations: [
    {
      name: 'The Compressed Gauntlet',
      description:
        'A pocket dimension shaped like a long hallway with 100 doors on each side. Two parallel tracks separated by an unbreakable glass wall. Each door leads to a room containing one compressed dungeon boss. The rooms are featureless cubes until the door opens, then they generate terrain appropriate to the boss.',
      significance:
        'The entire campaign takes place here. 100 rooms. 100 bosses. No exits until completion.',
    },
    {
      name: 'The Glass Wall',
      description:
        'A transparent barrier between Track A and Track B. Soundproof but visible. Notes can be pressed against it. It shows Velocitus running his parallel gauntlet. It shatters at Dungeon 99.',
      significance:
        'The emotional core of the campaign. Watching Velocitus struggle alone while the party fights together. The moment it breaks is the climax.',
    },
    {
      name: 'Dungeon 100: The Lunch Room',
      description:
        'An empty, peaceful room with a wooden table, comfortable chairs, a modest treasure chest, and a plate of sandwiches that are somehow still fresh. After 99 rooms of chaos, the silence is deafening.',
      significance:
        'The anticlimactic perfection of the ending. The real treasure was not the Infinity Hoard. It was getting to sit down.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'monsterGenerator',
    'bossEncounter',
    'initiativeTracker',
    'plotTwistEngine',
    'fantasyInsults',
    'dungeonDressing',
    'environmentalHazard',
  ],
};
