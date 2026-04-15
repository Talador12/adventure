import type { OneShotCampaign } from '../types';

export const thePunishmentDungeon: OneShotCampaign = {
  id: 'oneshot-the-punishment-dungeon',
  type: 'oneshot',
  title: 'The Punishment Dungeon',
  tagline: 'Community service in a dungeon designed for jaywalkers. The offenders keep making it harder than it needs to be.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 2.5,
  settingSummary:
    'The City of Ironvale has a community service dungeon for low-risk offenders. Jaywalking, littering, excessive bardic noise, loitering with intent to loiter. The dungeon is embarrassingly easy: wide corridors, clearly marked exits, traps that announce themselves, and a minotaur at the end who is contractually obligated to lose. The party are the guards supervising today\'s batch of offenders. The offenders are determined to make this the worst shift of the party\'s careers.',
  hook: 'The party reports for guard duty at the Ironvale Community Service Dungeon. Their charges: a bard arrested for playing at 3 AM, a halfling caught littering (one apple core), a dragonborn cited for intimidating a street sign, and a gnome who jaywalked across an intersection that does not have a crosswalk. The dungeon should take 30 minutes. It will not.',
  twist: 'The offenders are not trying to escape. They are trying to make the dungeon MORE dangerous because they think it will reduce their sentence through "hazard credit." The bard provokes sleeping monsters. The halfling "accidentally" triggers extra traps. The dragonborn breathes fire at structural supports. The gnome has a law degree and is filing appeals in real time.',
  climax: 'The offenders have destabilized the dungeon so badly that the contractually obligated minotaur at the end is now genuinely trapped under rubble and needs actual rescuing. The easy dungeon is now a real dungeon. The guards must save the minotaur, wrangle the offenders, and file an incident report that explains how four misdemeanor criminals turned a safety-compliant facility into a disaster zone.',
  scenes: [
    {
      title: 'Orientation',
      summary: 'The party meets the offenders and enters the dungeon. Everything is labeled. Safety rails everywhere. The offenders are already complaining.',
      challenge: 'social',
      keyEvents: [
        'The dungeon entrance has a "Welcome to Community Service" banner and a motivational poster: "Every Trap You Survive Is Character Growth!"',
        'The bard asks if there is a complaints department. There is. It is a suggestion box shaped like a minotaur.',
        'The first "trap": a pit that is six inches deep with a sign that says "CAUTION: PIT." The offenders pretend to fall in dramatically.',
        'The gnome produces a legal brief arguing the dungeon violates the Ironvale Humane Sentencing Act, Section 14(b).',
      ],
    },
    {
      title: 'Hazard Credit',
      summary: 'The offenders begin deliberately making the dungeon more dangerous. The party must stop them while navigating a facility that is slowly becoming a real threat.',
      challenge: 'puzzle',
      keyEvents: [
        'The bard plays a lullaby to wake up the sleeping (decorative) basilisk. It wakes up. It is confused. It was not supposed to wake up.',
        'The halfling "accidentally" pulls a lever labeled DO NOT PULL. Real traps activate in the next corridor.',
        'The dragonborn breathes fire at a load-bearing column. The ceiling sags. This was a safety-compliant facility.',
        'The party realizes the offenders think making it dangerous reduces their sentence. It does not. The gnome insists it does. He cites case law.',
      ],
    },
    {
      title: 'The Minotaur Rescue',
      summary: 'The end-of-dungeon minotaur is trapped under rubble caused by the offenders. The party must execute a genuine rescue in what was supposed to be a joke dungeon.',
      challenge: 'combat',
      keyEvents: [
        'The minotaur\'s chamber: collapsed. The minotaur is pinned. He is in his work uniform (a polo shirt that says "Dungeon Staff").',
        '"I was just going to pretend-fight you and let you win! This is a COMMUNITY SERVICE dungeon! WHO BROKE MY CEILING?"',
        'The party coordinates the rescue. The offenders, finally realizing they went too far, actually help.',
        'Everyone escapes. The minotaur files a workplace safety complaint. The gnome offers to represent him pro bono.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Vex the Bard', role: 'offender / chaos agent', personality: 'Arrested for excessive bardic noise at 3 AM. Treats community service as an audience. Cannot stop performing. Thinks danger is content.' },
    { name: 'Pip the Halfling', role: 'offender / accidental saboteur', personality: 'Cited for littering one apple core. Bitter about the disproportionate punishment. "I threw ONE apple core and now I am in a DUNGEON."' },
    { name: 'Gormund the Dragonborn', role: 'offender / wrecking ball', personality: 'Cited for intimidating a street sign by staring at it aggressively. Does not understand why this is illegal. Solves every problem with fire breath.' },
    { name: 'Thimbleton Esq.', role: 'offender / lawyer', personality: 'A gnome lawyer who jaywalked. Filing legal challenges against the dungeon in real time. Has a briefcase. Produces documents from it at inappropriate moments.' },
  ],
  keyLocations: [
    { name: 'The Community Service Dungeon', description: 'A government-regulated dungeon with safety rails, clearly labeled traps, and a contractually obligated minotaur. Designed to be completed in 30 minutes by people who committed misdemeanors.', significance: 'The entire setting. Starts easy, becomes genuinely dangerous through offender interference.' },
    { name: 'The Minotaur\'s Chamber', description: 'The final room. A minotaur in a polo shirt sits in a throne that has a sign: "Boss Fight Area - Please Form Orderly Queue."', significance: 'The climax. Where the easy dungeon becomes a real rescue mission.' },
  ],
  dataSystems: ['socialEncounter', 'trapGenerator', 'combatNarration', 'dungeonRoom'],
};
