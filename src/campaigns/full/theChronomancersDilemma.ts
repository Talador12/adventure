import type { FullCampaign } from '../types';

export const theChronomancersDilemma: FullCampaign = {
  id: 'full-chronomancers-dilemma',
  type: 'full',
  title: "The Chronomancer's Dilemma",
  tagline: 'He traveled back in time to save his daughter. Now she is the villain he must stop.',
  tone: 'serious',
  themes: ['planar', 'mystery', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 13 },
  estimatedSessions: 14,
  settingSummary:
    'Time magic is forbidden because it always creates paradoxes. But someone is using it anyway—altering small events to create a perfect timeline. The changes are destabilizing reality, creating "time fractures" where multiple versions of history exist simultaneously.',
  hook: 'The party investigates a time fracture where three versions of the same village exist at once. They meet a desperate chronomancer who begs them to stop his future self—or rather, stop what his daughter became because of his meddling.',
  twist:
    'The chronomancer\'s attempts to create a perfect life for his daughter worked—she became powerful, brilliant, and ruthless. She has taken over his work and is now deliberately creating paradoxes to rewrite reality itself into her ideal vision.',
  climax:
    'The party must navigate a collapsing timeline to confront the daughter in the moment of her original death—the event her father changed. They must decide whether to restore the original timeline (killing her) or find a way to save her without destroying reality.',
  acts: [
    {
      title: 'Act 1: Fractured Time',
      summary:
        'The party explores areas affected by time fractures, encountering multiple versions of the same people and places. They learn the rules of paradox and meet the chronomancer who started it all.',
      keyEvents: [
        'First time fracture—a village existing in three time periods simultaneously',
        'Meeting Elara, the chronomancer, now elderly and regretful',
        'Learning about his daughter Seraphina, who died young in the original timeline',
        'Discovery that Seraphina survived and is now the one creating new fractures',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Perfect Timeline',
      summary:
        'The party pursues Seraphina through various altered histories, seeing how her "improvements" have made things worse. They gather allies from different time periods and learn the full scope of her plan.',
      keyEvents: [
        'Visiting the "perfect" timeline Seraphina created—beautiful but sterile, all free will removed',
        'Meeting versions of themselves from alternate timelines',
        'Discovering Seraphina\'s end goal: collapse all timelines into her singular vision',
        'Finding the Chrono-Anchor, the artifact that makes her power possible',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Moment of Choice',
      summary:
        'The party travels to the original moment—Seraphina\'s death—and must choose between restoring the timeline or finding a third path. Reality itself hangs in the balance.',
      keyEvents: [
        'Navigating the collapsing timeline as Seraphina tries to stop them',
        'Confronting the choice: let her die, save her at the cost of reality, or negotiate',
        'Elara\'s sacrifice—he offers to take his daughter\'s place in death',
        'The new timeline—whatever the party chooses becomes reality',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Elara the Chronomancer',
      role: 'tragic figure',
      personality:
        'An old man who destroyed reality trying to save his daughter. Guilt-ridden, desperate, willing to sacrifice himself to fix his mistake.',
    },
    {
      name: 'Seraphina',
      role: 'antagonist',
      personality:
        'Brilliant, ruthless, utterly convinced she is saving everyone from pain and chaos. Views free will as a flaw to be corrected.',
      secret: 'She knows she was supposed to die and is terrified of returning to non-existence.',
    },
    {
      name: 'The Timekeeper',
      role: 'neutral observer',
      personality:
        'An entity that exists outside time, tasked with preventing paradox. Cannot intervene directly but provides guidance to the party.',
    },
  ],
  keyLocations: [
    {
      name: 'The Fractured Village',
      description:
        'A settlement existing in three time periods at once—past, present, and future versions overlapping chaotically.',
      significance: 'Introduction to time fracture mechanics.',
    },
    {
      name: 'The Perfect City',
      description:
        'Seraphina\'s ideal timeline—beautiful, peaceful, and completely devoid of choice or spontaneity.',
      significance: 'Shows the horror of her vision.',
    },
    {
      name: 'The Moment',
      description:
        'The place in time where Seraphina originally died. The focal point of all timeline alterations.',
      significance: 'Final location and site of the climactic choice.',
    },
  ],
  dataSystems: ['timeLoopDungeon', 'planarSideEffects', 'magicalAnomaly', 'arcaneResearch'],
};
