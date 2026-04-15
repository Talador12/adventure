import type { OneShotCampaign } from '../types';

export const theArtificialDifficulty: OneShotCampaign = {
  id: 'oneshot-the-artificial-difficulty',
  type: 'oneshot',
  title: 'The Artificial Difficulty',
  tagline: 'A petty deity runs the dungeon and keeps making it harder in real time because the party is doing too well.',
  tone: 'shenanigans',
  themes: ['dungeon_crawl', 'comedy', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The Dungeon of Demorax was built by a minor deity who takes personal offense when adventurers succeed. Demorax watches from a control room at the center of the dungeon, adjusting difficulty in real time through levers, buttons, and increasingly desperate improvisation. Room too easy? More enemies spawn mid-fight. Puzzle solved fast? The walls move. Trap disarmed cleanly? A new trap appears behind it. He commentates the entire thing like a frustrated game designer watching his creation get speedrun. "No no no, they were NOT supposed to find that shortcut. Adding a wall. Adding TWO walls."',
  hook: 'The party enters the dungeon and clears the first room easily - three goblins, no problem. Then a voice echoes from the ceiling: "Okay. OKAY. Fine. You are... competent. Let us try FOUR goblins." A fourth goblin drops from a trapdoor in the ceiling. The party handles it. "FIVE goblins?" A fifth appears. This continues. The voice belongs to Demorax, and he is not going to let the party feel good about themselves for even one second.',
  twist:
    'Demorax is not a minor deity - he is a former adventurer who ascended to godhood by completing the hardest dungeon ever made. He became a god of dungeons and immediately realized: adventurers today are too strong. The power creep is real. He builds dungeons to HUMBLE them. But no one has ever actually failed his dungeon. Every party eventually wins, and it drives him insane. He does not want them dead. He wants them to STRUGGLE. He wants them to sweat. He wants them to know they EARNED the victory.',
  climax:
    'The party reaches the control room. Demorax is surrounded by levers, buttons, and a massive crystal ball showing every room in the dungeon. He panics and throws everything at them: the floor becomes lava, the ceiling drops, enemies teleport in from other rooms, and gravity reverses. It is total chaos. The party must reach Demorax through his own gauntlet of last-second modifications. When they finally reach him, he is out of levers to pull. He looks at them with exhausted respect. "Fine. You win. You ALWAYS win. Take the treasure. I hope it was at least HARD."',
  scenes: [
    {
      title: 'Scene 1: The Adjustment Period',
      summary:
        'The first rooms of the dungeon, where Demorax begins modifying encounters in real time. Enemies spawn mid-fight. Terrain shifts. The voice commentates with increasing frustration.',
      challenge: 'combat',
      keyEvents: [
        'Room 1: 3 goblins. Easy. Demorax adds a 4th. Then a 5th. Then an ogre. "Is THIS enough? Am I getting WARM?"',
        'Room 2: a puzzle. The wizard solves it in 20 seconds. Demorax moves the walls. "The puzzle was not DONE. I added a SECOND part. With MATH."',
        'Room 3: a trap hallway. The rogue disarms every trap. Demorax adds traps BEHIND the party. "Oh you can only disarm traps going FORWARD? Interesting."',
        'Demorax\'s commentary grows increasingly personal. "The fighter has good AC. Let us see how good. ADDING RUST MONSTERS."',
      ],
    },
    {
      title: 'Scene 2: Escalation',
      summary:
        'Demorax gets desperate and starts combining mechanics: enemies in puzzle rooms, traps during combat, social encounters during environmental hazards. The dungeon becomes a layered nightmare of stacking challenges.',
      challenge: 'puzzle',
      keyEvents: [
        'A puzzle room where the solution changes every 30 seconds because Demorax keeps editing it. "You were too CLOSE. New puzzle. DIFFERENT puzzle."',
        'Combat in a room where the floor tiles rearrange. Enemies know the pattern. The party does not. Demorax is coaching the enemies. "To your LEFT. No YOUR left. THE GOBLIN\'S LEFT."',
        'A social encounter with a door guardian that Demorax keeps interrupting. "Do NOT let them in. They are TOO GOOD. Ask harder questions. Ask them CALCULUS."',
        'The party finds Demorax\'s notes in a side room. Hundreds of pages of dungeon difficulty balancing. Margin notes: "They will NEVER solve this." (They solved it.) "This trap is UNBEATABLE." (It was beaten.) "WHY DO THEY KEEP WINNING."',
      ],
    },
    {
      title: 'Scene 3: The Control Room',
      summary:
        'The party breaches Demorax\'s control room. He throws every remaining lever at once. The room becomes a gauntlet of stacked hazards. When the party finally reaches him, he has nothing left.',
      challenge: 'combat',
      keyEvents: [
        'The control room: walls of levers, buttons, dials. Demorax pulls everything at once. Floor = lava. Ceiling = descending. Gravity = reversed. Enemies = all of them.',
        'The party must navigate a room that is actively being modified WHILE they cross it. Demorax is narrating his own destruction. "SPINNING BLADE WALL. ACID PIT. WAIT, NOT THERE. MOVE THE ACID PIT."',
        'The party reaches Demorax. He is out of levers. He stares at them. They stare at him. He has 1 lever left. It says "SELF DESTRUCT (Do Not Pull)." He pulls it. The room fills with confetti.',
        'Demorax hands over the treasure. "You win. Again. Like everyone always does. Was it at least SLIGHTLY difficult? Even a LITTLE? ...No? Fine. Get out."',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Demorax, God of Artificial Difficulty',
      role: 'dungeon master deity / frustrated designer',
      personality:
        'A minor deity who takes dungeon difficulty as a personal matter of honor. He narrates encounters like a Twitch streamer losing his mind. He is not malicious - he is a perfectionist who cannot accept that adventurers keep winning. "I SPENT THREE MONTHS on that puzzle. THREE MONTHS. You solved it by ACCIDENT."',
      secret: 'He was the greatest adventurer of his age. He cleared every dungeon in existence. He became a god because nothing could challenge him. He builds hard dungeons because he misses the feeling of struggling.',
    },
    {
      name: 'The Coaching Goblins',
      role: 'enemies / bewildered employees',
      personality:
        'Goblins receiving real-time instructions from Demorax via a magical earpiece. They are trying their best. The instructions are contradictory and panicked. "He says flank left. No, flank right. No, RUN. He says just RUN."',
    },
  ],
  keyLocations: [
    {
      name: 'The Dungeon of Demorax',
      description:
        'A dungeon that changes in real time. Walls move, floors shift, enemies teleport, and the difficulty ratchets up every time the party succeeds. Levers and mechanisms are visible in the walls - the infrastructure of a deity micromanaging his creation.',
      significance: 'The entire adventure. Every room is a live-edited challenge.',
    },
    {
      name: 'The Control Room',
      description:
        'Demorax\'s nerve center. A circular room filled with levers, buttons, crystal monitors, and a frustrated deity pulling everything at once. The room itself is a hazard because he keeps modifying it mid-fight.',
      significance: 'The climax location where the party faces the dungeon designer himself.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'trapDisarm',
    'puzzleLock',
    'environmentalHazard',
    'dungeonDressing',
    'fantasyInsults',
    'monsterGenerator',
  ],
};
