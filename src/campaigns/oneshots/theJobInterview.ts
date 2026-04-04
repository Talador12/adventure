import type { OneShotCampaign } from '../types';

export const theJobInterview: OneShotCampaign = {
  id: 'oneshot-job-interview',
  type: 'oneshot',
  title: 'The Job Interview',
  tagline: 'You applied to be adventurers. The interview process is... thorough.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  level: 1,
  estimatedHours: 3,
  settingSummary:
    'The Adventurers\' Guild is hiring. The interview process involves a written exam, a practical skills assessment (dungeon), a group exercise (fight a dragon), a personality quiz (truth serum), and an exit interview with the Guild Master (who is a beholder). The other applicants are your competition. The dungeon is HR-approved.',
  hook: 'The party arrives at the Adventurers\' Guild office. There\'s a waiting room with uncomfortable chairs and a water cooler. A goblin receptionist hands them application forms. "Please fill these out in triplicate. The practical starts in 20 minutes. Benefits include dental."',
  twist:
    'The Guild doesn\'t actually need adventurers — they need someone to do their taxes. The "interview process" is the Guild Master\'s elaborate prank on applicants because he\'s bored. The dragon is his pet. The dungeon is his basement. Anyone who survives and doesn\'t quit in frustration is hired... as an accountant.',
  climax:
    'The Guild Master (a beholder named Gerald) reveals the truth during the exit interview. The party can accept the accounting job (surprisingly well-paid), demand a real adventuring position (Gerald laughs but agrees if they impress him with one more challenge), or storm out (Gerald respects this most and offers them a contract on the spot).',
  scenes: [
    {
      title: 'Scene 1: The Application',
      summary:
        'Waiting room, paperwork, and the written exam. Questions include "On a scale of 1-10, how afraid of dragons are you?" and "Describe a time you resolved a conflict (combat doesn\'t count)."',
      challenge: 'social',
      keyEvents: [
        'The waiting room — meet rival applicants (a barbarian who brought a resume, a wizard with references)',
        'The written exam — absurd questions with no right answers',
        'The personality quiz — conducted under truth serum (revealing and embarrassing)',
        'The goblin receptionist gives secret tips: "Just don\'t mention cheese. Trust me."',
      ],
    },
    {
      title: 'Scene 2: The Practical',
      summary:
        'The HR-approved dungeon. Safety rails on the pit traps. Monsters with liability waivers. A mimic that\'s been told not to eat anyone (it tries anyway).',
      challenge: 'combat',
      keyEvents: [
        'The dungeon entrance has a "Days Since Last Accident: 0" sign',
        'Traps with warning labels — "CAUTION: This pit trap has been rated Medium difficulty"',
        'A monster encounter — the monsters are union employees doing their job',
        'The final room: a "dragon" (Gerald\'s pet pseudodragon wearing a costume)',
      ],
    },
    {
      title: 'Scene 3: The Exit Interview',
      summary:
        'Gerald the beholder conducts the exit interview. Every eye stalk is pointed at a different applicant. He asks why they want to work here. He already knows everything about them.',
      challenge: 'social',
      keyEvents: [
        'Gerald\'s office — a beholder behind a desk with reading glasses on three stalks',
        'The interview: probing, insightful, occasionally terrifying questions',
        'The reveal: "We actually need accountants. Surprise."',
        'The party\'s response determines their job title (and their first real quest)',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Gerald',
      role: 'Guild Master / beholder',
      personality:
        'A beholder who retired from villainy to run an adventuring guild. Wears a tiny monocle on his central eye. Dry wit. Genuinely good at HR.',
      secret: 'He\'s testing for personality, not skill. He wants adventurers who are funny under pressure.',
    },
    {
      name: 'Patches',
      role: 'goblin receptionist',
      personality:
        'An overworked goblin who has seen 500 interview cycles. Dead inside but tries to help applicants she likes. "The trick to the dungeon? Walk, don\'t run. Also the mimic is in room 3."',
    },
    {
      name: 'Brox the Resume Barbarian',
      role: 'rival applicant / comic relief',
      personality:
        'A barbarian who prepared a leather-bound resume, practiced a firm handshake, and keeps asking about the 401(k). "I HAVE EXCELLENT REFERENCES."',
    },
  ],
  keyLocations: [
    {
      name: 'The Waiting Room',
      description:
        'Uncomfortable chairs, a water cooler, motivational posters ("Hang In There" but the cat is fighting a goblin), and a stack of outdated Quest Monthly magazines.',
      significance: 'Opening scene and character introductions.',
    },
    {
      name: 'The HR Dungeon',
      description:
        'A dungeon that\'s been through a safety audit. Warning signs everywhere. The monsters have employee badges.',
      significance: 'The practical assessment and main adventure.',
    },
    {
      name: 'Gerald\'s Office',
      description:
        'A corner office with motivational posters, a desk too small for a beholder, and a nameplate reading "Gerald — Guild Master, CPA."',
      significance: 'The final interview and reveal.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'trapDisarm',
    'combatNarration',
    'fantasyInsults',
    'puzzleLock',
  ],
};
