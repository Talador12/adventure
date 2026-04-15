import type { OneShotCampaign } from '../types';

export const allBards: OneShotCampaign = {
  id: 'oneshot-all-bards',
  type: 'oneshot',
  title: 'All Bards',
  tagline: 'Every class is a bard. The fighter narrates attacks. The wizard sings spells. The BBEG is the only non-bard and is deeply confused.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 3,
  settingSummary:
    'The Bardic Quarantine Zone was created when an artifact called the Muse Stone detonated in a dungeon. Everything within a half-mile radius was converted to bard. Fighters became combat bards who must narrate every attack. Wizards became arcane bards who must sing their incantations. Clerics became divine bards who heal through hymns. Rogues became performance bards who must dramatically monologue their stealth. Even the monsters were affected: goblins sing their battle cries, skeletons rattle rhythmically, and the dungeon boss - a death knight - was somehow immune and is the only non-bard in the entire zone. He is profoundly confused by everything happening around him.',
  hook: 'The party enters the dungeon and crosses the Quarantine threshold. Immediately, the fighter feels a compulsion to DESCRIBE their sword draw in iambic pentameter. The wizard\'s fireball spell now requires an aria. The cleric\'s heal is a power ballad. The rogue tries to hide and instead delivers a dramatic soliloquy about the nature of shadows. "TO SKULK, OR NOT TO SKULK." A goblin jumps out, sings its attack ("STAB STAB STABBITY STAB!"), and the dungeon crawl begins. In song.',
  twist:
    'The death knight, Sir Graves, was not immune to the Muse Stone. He was immune because he has NO creativity. Zero. He is the most literal, imagination-free being in existence. He cannot understand metaphor. He does not get jokes. Sarcasm is invisible to him. The Muse Stone could not make him a bard because there is nothing inside him to inspire. This is also why the Muse Stone is in his dungeon - it was drawn to him, trying desperately to spark even a single creative thought, and the effort of trying caused it to explode. Sir Graves is immune to the party\'s bardic abilities because performance literally does not register to him.',
  climax:
    'The party faces Sir Graves. All their attacks require performance. His immunity means performances do not damage him. The solution: they must make him FEEL something. Anything. If they can provoke a single creative thought - make him laugh, cry, appreciate beauty, anything - the Muse Stone\'s magic can finally affect him and the Quarantine lifts. The party must put on the performance of their lives for an audience of one who does not know what entertainment is.',
  scenes: [
    {
      title: 'Scene 1: The Bardification',
      summary:
        'The party crosses the Quarantine threshold and becomes bards. Every action requires performance. Combat encounters against bardified goblins who sing their attacks. The mechanics are the same but the flavor is completely musical.',
      challenge: 'combat',
      keyEvents: [
        'The fighter swings a sword and involuntarily narrates: "MY BLADE ARCS THROUGH THE MORNING AIR, A CRESCENT MOON OF STEEL—" They cannot stop.',
        'The wizard casts Magic Missile. It requires singing. Three missiles launch on three different notes. It sounds terrible.',
        'Bardified goblins attack in harmony. Their battle cry is a three-part choral arrangement of "KILL THEM." It is disturbingly beautiful.',
        'The rogue attempts stealth and delivers a dramatic monologue about darkness that echoes through the entire dungeon.',
      ],
    },
    {
      title: 'Scene 2: The Performance Dungeon',
      summary:
        'Deeper rooms require specific types of performance. A puzzle door opens only to a specific song. A trap disarms through interpretive dance. A guardian only lets you pass if your improv scene is convincing.',
      challenge: 'puzzle',
      keyEvents: [
        'A door with musical notation carved into it. Play the song to open. The wizard\'s spellcasting voice is the only one in key.',
        'A pressure plate hallway that requires rhythmic stepping - essentially a dance number through a trap gauntlet.',
        'A sphinx guardian who asks not riddles but for improv scenes. "Give me a scene where you are both at a bakery, but one of you is secretly a dragon. GO."',
        'The party finds Sir Graves\' journal. Every entry is a flat statement of fact. "Killed 3 adventurers today. They were singing. I do not understand singing."',
      ],
    },
    {
      title: 'Scene 3: The Toughest Audience',
      summary:
        'The death knight fight. Standard attacks fail because he is immune to bardic energy. The party must perform something that makes him FEEL for the first time. Comedy, tragedy, a heartfelt ballad - anything that sparks creativity in a being who has never had an original thought.',
      challenge: 'social',
      keyEvents: [
        'The party attacks Sir Graves. Narrated sword swings bounce off him. Sung spells fizzle. Performance-heals do not work on allies within his aura. He is baffled.',
        '"Why are you SINGING at me? Speak normally. Use WORDS. Factual words. This is a DUNGEON, not a THEATER."',
        'The party must try different performances: comedy, tragedy, music, drama. Each failure chips at his immunity slightly. Each attempt that genuinely reaches for emotion gets closer.',
        'The breakthrough: one genuine, sincere performance that makes Sir Graves feel something. A single tear. The Muse Stone activates. The Quarantine lifts. Sir Graves says quietly: "That was... not unpleasant."',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Sir Graves, the Unimaginative Death Knight',
      role: 'final boss / critic',
      personality:
        'A death knight with zero creativity, zero imagination, and zero understanding of art. He speaks in flat declarative sentences. Metaphor confuses him. Jokes make him angry (not because they are offensive, but because he does not understand the structure). "You said the sword was hungry. Swords do not eat. This is incorrect."',
      secret: 'He was a bard in life. He was so bad at it that he renounced all creativity when he became undead. The Muse Stone is trying to remind him.',
    },
    {
      name: 'Goblin Chorus',
      role: 'enemies / backup singers',
      personality:
        'A group of goblins who were bardified and honestly love it. They fight in musical numbers. Their choreography is surprisingly tight. They have been rehearsing. "We were just goblins before. Now we are ARTISTS."',
    },
    {
      name: 'The Muse Stone',
      role: 'artifact / plot catalyst',
      personality:
        'A sentient stone that desperately wants to inspire creativity. It bardified the entire zone because it could not inspire Sir Graves and overloaded trying. It is exhausted, cracked, and apologetic. "I just wanted him to hum a tune. ONE tune. And then everything exploded."',
    },
  ],
  keyLocations: [
    {
      name: 'The Bardic Quarantine Zone',
      description:
        'A half-mile radius around the dungeon where everything has been converted to bard. Birds sing in harmony. Rats tap dance. The wind whistles recognizable melodies. It is beautiful and deeply unsettling.',
      significance: 'The entire adventure takes place within this zone where everything is performance.',
    },
    {
      name: 'Sir Graves\' Throne Room',
      description:
        'A stark, plain room with zero decoration. No banners, no tapestries, no art. A stone throne and a stone floor. The most creatively dead room in a dungeon full of involuntary performers.',
      significance: 'The final encounter where the party must crack the toughest audience of their careers.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'socialEncounter',
    'puzzleLock',
    'fantasyInsults',
    'dungeonDressing',
    'riddleGenerator',
  ],
};
