import type { OneShotCampaign } from '../types';

export const theInternship: OneShotCampaign = {
  id: 'oneshot-the-internship',
  type: 'oneshot',
  title: 'The Internship',
  tagline: 'The job market is rough. The evil overlord is hiring. Benefits include dental and a moral crisis.',
  tone: 'comedic',
  themes: ['comedy', 'intrigue', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 3,
  settingSummary:
    'Lord Dreadmore\'s Fortress of Eternal Night is the largest employer in the region. The economy is bad. The party took internships because nothing else was available. They are not evil. They do not want to be evil. But the onboarding packet was 90 pages long and nobody read the clause about "alignment adjustment upon hire." Their tasks are mundane: sort cursed artifacts, file dungeon maintenance reports, feed the prisoners (they are picky eaters), and attend mandatory team building. The team building is in the torture chamber. It has been converted to an escape room. The irony is not lost on anyone.',
  hook: 'Day one. The party reports to HR (Human Remains). They are issued name badges, a company handbook ("So You Have Chosen Evil: A Guide for New Hires"), and a tour schedule. Their supervisor is a perfectly nice lich named Linda who just wants everyone to fill out their timesheets correctly. The work itself is not evil in an exciting way. It is evil in a bureaucratic way. Sorting cursed artifacts is basically warehouse work. Feeding prisoners is basically catering. The escape room team building is actually kind of fun.',
  twist:
    'The party discovers that the fortress is planning a major attack on the nearby kingdom. The battle plans are filed in the same records room where they sort artifacts. They now have insider information that could save thousands of lives. But using it would blow their cover, get them killed, and also technically violate their NDA. The moral dilemma is real. The NDA is magically binding.',
  climax:
    'The party must smuggle the battle plans out of the fortress without being caught. Every department they have visited becomes an obstacle: the records room is warded, the prisoner kitchen is between them and the exit, and the mandatory team building escape room is now a real trap they must escape. Linda the lich suspects something. She does not want to report them. She just wants them to fill out their timesheets first.',
  scenes: [
    {
      title: 'Scene 1: Orientation',
      summary:
        'The party tours the fortress, meets their coworkers, and begins their tasks. Everything is simultaneously mundane and horrifying.',
      challenge: 'social',
      keyEvents: [
        'HR onboarding: the paperwork includes a soul waiver (buried on page 67)',
        'The tour: the armory ("do not touch"), the summoning chamber ("definitely do not touch"), the break room ("the coffee is cursed but in a normal way")',
        'Task 1: sort cursed artifacts by danger level. One of them bites.',
        'Task 2: feed the prisoners. One demands a vegan option. The cook is a demon who does not know what vegan means.',
      ],
    },
    {
      title: 'Scene 2: Team Building',
      summary:
        'Mandatory team building in the converted torture chamber. The escape room is surprisingly well-designed. During the exercise, the party stumbles across the battle plans.',
      challenge: 'puzzle',
      keyEvents: [
        'The escape room: puzzles include "defuse the cursed orb" and "negotiate with the trapped imp"',
        'The party bonds with evil coworkers who are surprisingly normal people in terrible jobs',
        'Discovery: a misfiled document in the records room reveals the upcoming attack plan',
        'Moral crisis: the NDA is magically binding. Breaking it causes 2d10 psychic damage per violation.',
      ],
    },
    {
      title: 'Scene 3: The Resignation',
      summary:
        'The party attempts to smuggle the battle plans out. Every department is now an obstacle. Linda suspects. The escape is tense, funny, and involves the prisoners helping in exchange for better food.',
      challenge: 'exploration',
      keyEvents: [
        'The records room ward: bypassed using the filing system the party learned in Scene 1',
        'The prisoner kitchen: the prisoners agree to cause a distraction in exchange for the vegan option',
        'Linda confronts the party at the exit. She sighs. "Just fill out your resignation forms. I have enough paperwork."',
        'Escape: the party gets out with the plans. The NDA triggers. 2d10 psychic damage. Worth it.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Linda',
      role: 'supervisor / reluctant antagonist',
      personality:
        'A lich who works in middle management because she needs structure. She is not evil in a dramatic way. She is evil in a "please submit your TPS reports by Friday" way. She likes the party. She does not want to report them. She just wants clean timesheets. "I do not make the rules. I just enforce them. And file them. Correctly."',
    },
    {
      name: 'Lord Dreadmore',
      role: 'background villain',
      personality:
        'The evil overlord. The party never meets him directly. He communicates through all-staff memos that are simultaneously threatening and motivational. "Team, our Q3 conquest numbers are disappointing. I believe in us. Do better or suffer."',
    },
    {
      name: 'Grix',
      role: 'coworker / ally',
      personality:
        'A goblin in the records department who has worked here for thirty years and hates it. He helps the party navigate the filing system because he wants someone - anyone - to use it correctly before he retires. "The battle plans? Section 7, Subsection C, Drawer 4. I filed them myself. I file everything. Nobody appreciates filing."',
    },
  ],
  keyLocations: [
    {
      name: 'The Fortress of Eternal Night',
      description: 'A massive evil fortress that functions exactly like a corporate office. There are cubicles. In a dungeon. The lighting is bad. The coffee is worse.',
      significance: 'The entire one-shot setting.',
    },
    {
      name: 'The Converted Torture Chamber',
      description: 'A former torture chamber now used for team building exercises. The escape room puzzles use repurposed restraints and cursed locks. HR calls it "innovative workspace design."',
      significance: 'The team building location and where the battle plans are discovered.',
    },
    {
      name: 'The Records Room',
      description: 'An enormous filing room containing every evil plan, requisition form, and employee review ever written. It is meticulously organized by Grix. The battle plans are in Section 7.',
      significance: 'Where the critical intelligence is stored.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'trapDesigner',
    'riddleGenerator',
    'combatNarration',
    'plotTwistEngine',
    'dungeonRoomDressing',
  ],
};
