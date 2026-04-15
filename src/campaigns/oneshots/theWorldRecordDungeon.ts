import type { OneShotCampaign } from '../types';

export const theWorldRecordDungeon: OneShotCampaign = {
  id: 'oneshot-the-world-record-dungeon',
  type: 'oneshot',
  title: 'The World Record Dungeon',
  tagline: 'A dungeon designed for world records. Fastest clear. Most goblins punched in 60 seconds. Everything timed and scored. Current record holders are heckling.',
  tone: 'shenanigans',
  themes: ['dungeon_crawl', 'comedy', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The Colosseum of Records is a dungeon that has been converted into a competitive arena with a magical leaderboard tracking world records for every conceivable dungeon activity. Fastest room clear. Most damage in a single hit. Longest tightrope walk over lava. Most creative kill. Best one-liner before a finishing blow. Every action is timed, scored, and ranked against thousands of previous competitors. Current record holders sit in enchanted spectator seats above each room and heckle anyone who tries to beat their scores. The prize: your name on the leaderboard. The real prize: the heckling stops.',
  hook: 'The party enters the Colosseum and is greeted by a magical scoreboard that reads: "WELCOME, CHALLENGERS. YOUR CURRENT RANKING: UNRANKED. RECORDS TO BEAT: 847. CURRENT SPECTATORS: 312." The first room has a simple challenge: defeat 5 goblins. The current record for fastest clear is 8.3 seconds, held by someone named "DESTRUCTO THE MAGNIFICENT." Destructo is sitting in a floating chair above the room, eating grapes. He looks down at the party and says: "Eight point three seconds. Good luck."',
  twist:
    'The leaderboard is rigged. The "current record holders" are illusions created by the dungeon\'s architect, a failed adventurer named Morris who could never beat a single dungeon. He built the Colosseum and populated it with fake records under fake names to make real adventurers feel inadequate. Every record is set just above what a normal party can achieve. The heckling is designed to tilt them. Morris watches from a hidden room, enjoying the frustration he could never cause as an adventurer. If the party discovers the fraud, Morris must defend his fake empire.',
  climax:
    'The party reaches the final room: "THE ULTIMATE RECORD - Complete the entire Colosseum in under 60 minutes." The current record is 59 minutes 59 seconds, held by "THE SHADOW" (also Morris, also fake). The party has been running the dungeon for roughly 55 minutes. They have 5 minutes for the final room: a gauntlet of every previous challenge combined. If they beat the record, the leaderboard glitches and Morris\'s hidden room is revealed. He is sitting in pajamas surrounded by empty potion bottles and fake trophy sketches. He has never cleared a real dungeon. This is all he has. The party decides: expose the fraud, or let him have his fake empire and beat a real record anyway.',
  scenes: [
    {
      title: 'Scene 1: The Qualifiers',
      summary:
        'The first rooms of the Colosseum. Simple challenges with tight records to beat. Each room has a spectating "record holder" who heckles the party. The party learns the scoring system and that everything - even trash talk - is ranked.',
      challenge: 'combat',
      keyEvents: [
        'Room 1: Defeat 5 goblins. Record: 8.3 seconds. Destructo heckles from above. The party tries to beat it. Even getting close feels impossible.',
        'Room 2: Cross a lava pit on a tightrope. Record: 12 seconds. "THE ACROBAT" watches from above. "Your balance is... adequate. For a toddler."',
        'Room 3: Pick a lock under time pressure. Record: 4.1 seconds. "FINGERS MALONE" cackles when the rogue fumbles.',
        'A hidden category appears: "BEST COMEBACK TO A HECKLER." The party realizes EVERYTHING is scored. Insulting back earns points.',
      ],
    },
    {
      title: 'Scene 2: The Main Event',
      summary:
        'Harder challenges with increasingly absurd records. Most creative use of a cantrip. Longest time holding a door shut against a troll. Best dramatic entrance into a room. The scoring system gets weirder and the hecklers get louder.',
      challenge: 'puzzle',
      keyEvents: [
        'Challenge: "Most Goblins Punched in 60 Seconds." The barbarian enters a room full of goblins on conveyor belts. It is goblin whack-a-mole.',
        'Challenge: "Most Creative Spell Use." The wizard must solve a problem using only Prestidigitation. Current record: "made a goblin sneeze so hard it knocked itself out."',
        'Challenge: "Best One-Liner Before a Finishing Blow." Judged by an enchanted panel of spectral critics. They are harsh.',
        'The party notices: every "record holder" has suspiciously perfect records. Just barely unbeatable. And none of them will answer questions about how they did it.',
      ],
    },
    {
      title: 'Scene 3: The Ultimate Record',
      summary:
        'The final timed gauntlet. 5 minutes for a combined challenge. If beaten, the truth is revealed: the leaderboard is fake, Morris is exposed, and the party makes a choice.',
      challenge: 'combat',
      keyEvents: [
        'The final gauntlet: combat, puzzle, acrobatics, and a one-liner, all in 5 minutes. The party has been training in every room for this exact combination.',
        'They beat the record. The leaderboard glitches. "Record holders" flicker and disappear - they were illusions.',
        'Morris\'s hidden room opens. He is in pajamas. He has never cleared a dungeon. He built this because he wanted to feel like he mattered in the adventuring world.',
        'The party chooses: expose him (the leaderboard resets, real records begin), let him keep it (the fake empire continues but the party knows), or give him a real record (they coach Morris through one actual dungeon challenge and his name goes on the board for real).',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Morris the Fraud',
      role: 'dungeon architect / secret villain / sad man',
      personality:
        'A failed adventurer who could not clear a level 1 dungeon and built a fake competitive dungeon to cope. He is pathetic in a way that is hard to be angry about. He speaks through illusions with manufactured confidence and alone in his room with none.',
      secret: 'He failed his adventuring academy entrance exam three times. He built the Colosseum with his inheritance. It is all he has.',
    },
    {
      name: 'Destructo the Magnificent (Illusion)',
      role: 'fake record holder / heckler',
      personality:
        'An illusion of a brawny warrior who holds the combat speed records. He heckles with the energy of a retired athlete who peaked in high school. "Eight point THREE seconds. I did not even TRY. I was eating a SANDWICH." He is not real. He has never eaten a sandwich.',
    },
    {
      name: 'The Enchanted Scoreboard',
      role: 'narrator / judge / instigator',
      personality:
        'A sentient magical leaderboard that tracks everything. It announces records with the energy of a monster truck rally announcer. It does not know the records are fake. It genuinely believes in the competition. "NEW PERSONAL BEST! Still 47th place though!"',
    },
  ],
  keyLocations: [
    {
      name: 'The Colosseum of Records',
      description:
        'A dungeon converted into a competitive arena. Each room is a timed challenge with floating spectator seats, magical scoreboards, and enchanted timing crystals. The architecture is half dungeon, half sports stadium.',
      significance: 'The entire adventure. Every room is a competition with a fake record to beat.',
    },
    {
      name: 'Morris\'s Hidden Room',
      description:
        'A small, sad room behind the leaderboard wall. Pajamas on the floor. Empty potion bottles. Sketches of trophies he will never earn. A single real trophy: "Most Creative Dungeon Design - Regulon City Fair, Third Place."',
      significance: 'The emotional core. Where the truth is revealed and the party makes their choice.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'trapDisarm',
    'puzzleLock',
    'fantasyInsults',
    'dungeonDressing',
    'initiativeTracker',
  ],
};
