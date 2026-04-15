import type { OneShotCampaign } from '../types';

export const theImpossibleRoll: OneShotCampaign = {
  id: 'oneshot-the-impossible-roll',
  type: 'oneshot',
  title: 'The Impossible Roll',
  tagline: 'Every challenge requires a DC 30 check. At level 1. The party must stack every bonus, exploit every rule, and cheer every success.',
  tone: 'shenanigans',
  themes: ['dungeon_crawl', 'comedy', 'survival'],
  playerCount: { min: 3, max: 6 },
  level: 1,
  estimatedHours: 2.5,
  settingSummary:
    'The Dungeon of Impossible Standards was built by a perfectionist archmage who believed nothing should be easy. Every door, lock, trap, and monster in his dungeon requires a DC 30 ability check to interact with. Open a door? DC 30 Strength. Pick a lock? DC 30 Dexterity. Identify a rune? DC 30 Arcana. At level 1, the highest a character can roll is about 25 with a natural 20 and maxed bonuses. The gap must be bridged through Help actions, Guidance, Bardic Inspiration, environmental advantages, and creative interpretation of the rules. Every success is a genuine triumph against impossible odds. Every failure is spectacular.',
  hook: 'The party enters the dungeon. The first challenge: a door. A sign reads "Push to open. DC 30 Strength check required." The fighter has +5 to Strength checks. They need a natural 25. Dice go to 20. The party looks at each other. Someone says: "Okay. Everyone help push." Help action: +advantage. Guidance from the cleric: +d4. The bard\'s Bardic Inspiration: +d6. The rogue finds oil to grease the hinges: +2 situational. Enhanced tools from the wizard: +1. The fighter rolls with advantage, adds every bonus, and needs a 17 or higher. They roll. The entire table holds its breath.',
  twist:
    'The archmage who built this dungeon is ALSO level 1. He is a commoner with genius-level intelligence who designed the perfect dungeon but is physically incapable of navigating it himself. He is trapped in the treasure room because every door between him and the exit is DC 30. He has been in the treasure room for 20 years. He has everything he could want (the treasure) and cannot get out. The party is not just clearing the dungeon - they are rescuing a man who outsmarted himself.',
  climax:
    'The final challenge: a door with three locks, each requiring a DC 30 check in a DIFFERENT ability (Strength, Dexterity, Intelligence). All three must succeed in a single round. The party must split their buff resources across three characters simultaneously. No Help action can be used twice in one round. Every bonus matters. Every +1 is life or death. If any single check fails, the round resets. Behind the door: the archmage, sitting on a pile of gold, who looks up and says "Oh thank the gods. I ran out of books to read in year twelve. Can you open the door FROM THIS SIDE? It is also DC 30. I have a +0."',
  scenes: [
    {
      title: 'Scene 1: The DC 30 Problem',
      summary:
        'The party encounters the first DC 30 challenges and must learn to stack bonuses. Every help action, spell bonus, environmental advantage, and creative rule interpretation is necessary. Early failures teach the system. Early successes feel incredible.',
      challenge: 'puzzle',
      keyEvents: [
        'The door: DC 30 Strength. The party stacks Help, Guidance, Bardic Inspiration, and a situational bonus from greasing the hinges. The fighter rolls. If they hit 30: euphoria. If not: the door laughs at them (it is enchanted to do that).',
        'A tripwire trap: DC 30 Dexterity to disarm. The rogue needs every bonus the party can provide. The wizard casts Guidance. The bard inspires. Someone holds a torch at the perfect angle for +1 visibility bonus.',
        'A rune on the wall: DC 30 Arcana to read. The wizard has +5. They need a 25. The party finds a reference book in a side room (+2), the cleric channels Guidance (+d4), and the rogue remembers a similar rune from a previous job (+1 narrative bonus from the DM).',
        'The party develops a system: identify the check, pool every possible bonus, calculate the minimum roll needed, and hold their breath.',
      ],
    },
    {
      title: 'Scene 2: Creative Stacking',
      summary:
        'The party gets creative with bonus sources. Environmental manipulation, improvised tools, flashback skills, and rules lawyering (in the fun way). Every room is a puzzle of "how do we get +12 more to this check?"',
      challenge: 'exploration',
      keyEvents: [
        'A DC 30 Athletics check to climb a wall. The party builds a human pyramid (+5), uses rope from a previous room (+2), the cleric blesses the climber (+d4), and the bard plays a motivational song (+d6).',
        'A DC 30 Persuasion check to convince a door guardian. The party writes a script, rehearses it (+2 preparation), the rogue provides blackmail material found in a side room (+3), and the fighter stands behind the speaker looking intimidating (+2).',
        'A combat encounter: every attack roll needs to beat AC 30. The party sets up flanking, advantage, True Strike, Guidance on attack, Bardic Inspiration, and enchants the weapon with oil of sharpness found in a chest. One hit. ONE hit is all they need.',
        'The failures are as memorable as the successes: a natural 1 on a DC 30 check is SO bad that the dungeon itself flinches.',
      ],
    },
    {
      title: 'Scene 3: The Triple Lock',
      summary:
        'The final door requires three simultaneous DC 30 checks in different abilities. The party must allocate all their buffs perfectly across three characters. Behind the door: the archmage who built this nightmare and cannot escape his own creation.',
      challenge: 'puzzle',
      keyEvents: [
        'The door: three locks. Strength, Dexterity, Intelligence. All in one round. Help actions cannot double up. Buff spells must be distributed.',
        'The party plans: who gets Guidance? Who gets Bardic Inspiration? Who gets environmental bonuses? Every +1 is assigned with the gravity of a war council.',
        'The rolls. Three dice. Three breath-holds. Any failure resets everything. The math is tight. A natural 15+ is needed on every die.',
        'Behind the door: Archmage Percival, level 1 commoner, sitting on a pile of gold, reading the same book for the 400th time. "Oh wonderful. Can you also open it from this side? I have tried. I cannot. I designed it too well."',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Archmage Percival',
      role: 'dungeon builder / trapped genius / rescue target',
      personality:
        'A commoner-level human with 20 Intelligence and 8 everything else. He designed the perfect dungeon and then could not leave it. He is not bitter - he is embarrassed. "In my defense, the dungeon works EXACTLY as intended. The flaw was putting myself inside it."',
      secret: 'He has had 20 years to redesign the dungeon from inside. He has made it HARDER. He could not help himself.',
    },
    {
      name: 'The Laughing Door',
      role: 'obstacle / sentient jerk',
      personality:
        'The first door in the dungeon, enchanted to laugh when anyone fails the DC 30 check. It has laughed at hundreds of adventurers. It has never been opened. The party opening it would be the most shocking event in its existence.',
    },
    {
      name: 'Sergeant Bramble',
      role: 'quest giver / concerned guard',
      personality:
        'A town guard who has watched dozens of adventuring parties enter the dungeon and return defeated. He has a betting pool with other guards on whether anyone will ever clear it. He bet yes, 20 years ago. His optimism is starting to crack. "You are level ONE? ...My money. My poor, poor money."',
    },
  ],
  keyLocations: [
    {
      name: 'The Dungeon of Impossible Standards',
      description:
        'A dungeon where every single check is DC 30. The architecture is beautiful and meticulously designed. Every trap is perfect. Every lock is master-grade. Every door is reinforced. It is the most well-built dungeon in existence and nearly impossible to navigate.',
      significance: 'The entire adventure. Every room is a DC 30 puzzle requiring creative bonus stacking.',
    },
    {
      name: 'The Treasure Room (Percival\'s Prison)',
      description:
        'A room filled with gold, gems, and magical items. Also one very bored archmage who has been trapped for 20 years. The door locks from both sides at DC 30. The treasure is useless to a man who cannot open a door.',
      significance: 'The final destination and emotional payoff. The party rescues a genius from his own brilliance.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'puzzleLock',
    'trapDisarm',
    'dungeonDressing',
    'fantasyInsults',
    'socialEncounter',
  ],
};
