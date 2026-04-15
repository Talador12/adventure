import type { FullCampaign } from '../types';

export const benjaminDungeon: FullCampaign = {
  id: 'full-benjamin-dungeon',
  type: 'full',
  title: 'Benjamin Dungeon',
  tagline: 'You start old, wise, and frail. Each session you get younger. By the end, you are children with no idea what you are doing.',
  tone: 'serious',
  themes: ['classic_fantasy', 'mystery', 'social'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 1, end: 20 },
  estimatedSessions: 16,
  settingSummary:
    'The party begins as elderly adventurers in their 70s and 80s - legendary heroes long retired. Session 1, they are wise and powerful but physically fragile. Each session they lose roughly five years. By mid-campaign they are in their prime - strong, fast, sharp. By the end they are children, physically powerful beyond reason (their stats keep climbing) but losing memories, wisdom, and identity with every session. NPCs react to them differently at every age. Quests that required wisdom now require trust. The world does not change. They do.',
  hook:
    'The party reunites at the funeral of their old mentor, Sage Aldric. They are gray, stooped, and retired. At the wake, a sealed letter from Aldric reads: "I discovered why we age. I found the Thread. They are unwinding it. You must stop them before they reach the beginning. Forgive me - to give you the strength for this quest, I had to take your years. You will understand when you are young enough to forget." The next morning, each party member has lost five years.',
  twist:
    'They are not aging backward. They are dying. A parasitic entity called the Unraveler is consuming their life-threads from the end backward, eating their experiences, memories, and identity. It feeds on lived life. The "youth" is an emptying, not a filling. Aldric discovered it feeding on him and sacrificed his remaining thread to slow it down - but it attached to the party at the funeral. The only cure: choose an age and anchor there permanently, sacrificing everything after that point.',
  climax:
    'The Unraveler reaches the party core memories - childhood. They are physically powerful (level 20 stats in child bodies) but have forgotten nearly everything. They fight the Unraveler with raw instinct, improvisation, and the one thing it cannot eat: the emotional bonds between them, which exist outside linear time. Victory requires each player to choose their anchor age, permanently becoming that version of themselves and losing everything after.',
  acts: [
    {
      title: 'Act 1: Wisdom Without Strength (Ages 70-50)',
      summary:
        'The party investigates as elderly heroes. They know everything but can barely climb stairs. Social encounters favor them - everyone respects their age and legend. Combat is dangerous because a bad fall could end them. They research the Thread and discover the Unraveler.',
      keyEvents: [
        'Aldric funeral and the sealed letter. The party has not been together in 20 years.',
        'First de-aging: waking up five years younger. Relief at first, then unease.',
        'Visiting Aldric research: journals describe "the Thread" - the metaphysical cord of a life, anchored at birth, growing with experience',
        'An old enemy returns. At 70, the party talked them down. At 60, they have to fight. The shift in problem-solving begins.',
        'The first lost memory: a player cannot remember the name of a place they visited last session. The DM takes a note card away.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Prime (Ages 50-25)',
      summary:
        'The party hits their physical peak. Faster, stronger, sharper. But wisdom fades. They forget strategies, lose context for decisions, and start making impulsive choices. NPCs who respected the elders now see capable strangers. The party must re-earn trust and access.',
      keyEvents: [
        'Physical peak: stats improve every session. The players are mechanically stronger than ever.',
        'An NPC who helped them as elders does not recognize them as adults. "The heroes I knew were wise. You are just... strong."',
        'Tracking the Unraveler to the Threadspire - a metaphysical structure where all life-threads are anchored',
        'A party member forgets a critical piece of information from Act 1. The player literally does not have the note card anymore.',
        'The revelation: they are not getting younger. Their threads are being eaten. Youth is what a life looks like from the inside when you remove the endings.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Children (Ages 25-8)',
      summary:
        'The party are teenagers, then children. Godlike physical stats, no wisdom, no memories beyond a few years. They must fight the Unraveler with nothing but instinct, creativity, and the bonds between them. Each player chooses their anchor age - the moment they stop and keep forever.',
      keyEvents: [
        'The party as teenagers: powerful, reckless, arguing constantly. Every plan is "hit it harder."',
        'A moment of clarity: one player briefly remembers everything and screams. Then it is gone.',
        'The party as children: level 20 stats, no idea what spells do, pressing buttons to see what happens',
        'Confronting the Unraveler: a formless hunger that speaks in the party own forgotten memories, quoting their lost experiences',
        'The anchor choice: each player picks an age. The campaign ends with them at those ages, missing everything after, but alive.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Sage Aldric',
      role: 'dead mentor / catalyst',
      personality:
        'The party former mentor, dead before the campaign starts. Known through letters, journals, and the memories of others. Brilliant, guilty, and ultimately self-sacrificing. He found the Unraveler feeding on himself and spent his last years trying to stop it.',
      secret: 'He deliberately infected the party at the funeral so they would have the youth and strength to fight what he could not.',
    },
    {
      name: 'Wren Ashvale',
      role: 'keeper of the Threadspire',
      personality:
        'An ageless being who maintains the Threadspire where all life-threads are anchored. Speaks in knots and tangles. Cannot intervene directly but can show the party their own threads - fraying, shortening, eaten from the ends.',
    },
    {
      name: 'The Unraveler',
      role: 'antagonist',
      personality:
        'A parasitic entity that feeds on lived experience. Not evil in a moral sense - it is hungry. It speaks using the memories it has consumed, quoting the party own past back at them. The horror: it knows them better than they know themselves.',
    },
    {
      name: 'Tilla Greenglade',
      role: 'ally / emotional anchor',
      personality:
        'A young woman who was rescued by the party when they were legendary elders. She recognizes them at every age because she was watching their eyes, not their faces. "You always looked at me the same way. That is how I know."',
    },
  ],
  keyLocations: [
    {
      name: 'Aldric Study',
      description: 'A cluttered scholar tower filled with journals, string diagrams, and a locked chest containing Aldric final confession. Smells like pipe smoke and regret.',
      significance: 'The starting point. Where all the clues live and where the party history is documented.',
    },
    {
      name: 'The Threadspire',
      description: 'A metaphysical tower between planes where every living life-thread is anchored. Looks like a loom the size of a mountain, thrumming with light. Some threads are dark and frayed.',
      significance: 'Where the Unraveler feeds and where the final confrontation happens.',
    },
    {
      name: 'The Playground',
      description: 'An ordinary village playground that becomes the Act 3 staging ground. The child-aged party strategizes on swings and monkey bars, arguing about tactics they cannot remember.',
      significance: 'The emotional climax location. Heroes planning a god-level fight on a seesaw.',
    },
  ],
  dataSystems: ['npcGenerator', 'combatNarration', 'plotTwistEngine', 'riddleGenerator', 'emotionalBeat'],
};
