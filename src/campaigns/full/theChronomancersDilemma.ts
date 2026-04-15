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
    'Time magic is forbidden because it always creates paradoxes. But someone is using it anyway - altering small events to create a perfect timeline. The changes are destabilizing reality, creating "time fractures" where multiple versions of history exist simultaneously.',
  hook: 'The party investigates a time fracture where three versions of the same village exist at once. They meet a desperate chronomancer who begs them to stop his future self - or rather, stop what his daughter became because of his meddling.',
  twist:
    'The chronomancer\'s attempts to create a perfect life for his daughter worked - she became powerful, brilliant, and ruthless. She has taken over his work and is now deliberately creating paradoxes to rewrite reality itself into her ideal vision.',
  climax:
    'The party must navigate a collapsing timeline to confront the daughter in the moment of her original death - the event her father changed. They must decide whether to restore the original timeline (killing her) or find a way to save her without destroying reality.',
  acts: [
    {
      title: 'Act 1: Fractured Time',
      summary:
        'The party explores areas affected by time fractures, encountering multiple versions of the same people and places. They learn the rules of paradox and meet the chronomancer who started it all.',
      keyEvents: [
        'First time fracture - a village existing in three time periods simultaneously. A woman is young, middle-aged, and elderly in the same room.',
        'Meeting Elara, the chronomancer, now elderly and regretful. He flinches every time someone says his daughter\'s name.',
        'Learning about his daughter Seraphina, who died young in the original timeline. A portrait of her at age seven sits in his pocket.',
        'Quiet moment: Elara shows the party Seraphina\'s room, preserved across all timelines. Her drawings are still on the wall. He touches one and his hand shakes.',
        'Discovery that Seraphina survived and is now the one creating new fractures - rewriting the world into her design.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Perfect Timeline',
      summary:
        'The party pursues Seraphina through various altered histories, seeing how her "improvements" have made things worse. They gather allies from different time periods and learn the full scope of her plan.',
      keyEvents: [
        'Visiting the "perfect" timeline Seraphina created - beautiful but sterile, all free will removed. People smile because they are designed to.',
        'Meeting versions of themselves from alternate timelines. One version of a party member is happier. Another is dead.',
        'The moment of cost: a timeline where the party saved everyone but Elara never existed. Without him, someone they care about was never born. Perfect is not painless.',
        'Discovering Seraphina\'s end goal: collapse all timelines into her singular vision. She believes suffering is a design flaw she can fix.',
        'Quiet moment: the party finds a fracture where Seraphina is seven years old, drawing on her bedroom wall. She looks up and smiles. She has no idea what she will become.',
        'Finding the Chrono-Anchor, the artifact that makes her power possible.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Moment of Choice',
      summary:
        'The party travels to the original moment - Seraphina\'s death - and must choose between restoring the timeline or finding a third path. Reality itself hangs in the balance.',
      keyEvents: [
        'Navigating the collapsing timeline as Seraphina tries to stop them. Rooms from different centuries bleed into each other.',
        'Confronting the choice: let her die, save her at the cost of reality, or negotiate. If the party showed compassion to Elara throughout, he trusts them enough to help.',
        'Seraphina\'s confession: "I know I was supposed to die. Every morning I wake up terrified of not existing. Would you not rewrite the world to keep breathing?"',
        'Elara\'s sacrifice - he offers to take his daughter\'s place in death. He steps into the moment she was meant to die.',
        'The new timeline - whatever the party chooses becomes reality. If they found the third path, both father and daughter survive but the world remembers what almost happened.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Elara the Chronomancer',
      role: 'tragic figure',
      personality:
        'An old man who destroyed reality trying to save his daughter. Fidgets with a pocket watch that does not tell time - it shows the moment Seraphina died. Guilt-ridden, desperate, willing to sacrifice himself to fix his mistake. Speaks in past tense even about the present. "This is - was - will be complicated."',
      secret: 'He has already tried to sacrifice himself six times across different timelines. It never sticks. The universe keeps giving him another chance and he keeps failing.',
    },
    {
      name: 'Seraphina',
      role: 'antagonist',
      personality:
        'Brilliant, ruthless, utterly convinced she is saving everyone from pain and chaos. Views free will as a flaw to be corrected. Speaks with calm certainty that makes her arguments sound reasonable until you think about them. She tilts her head when confused by empathy, as if studying an alien emotion.',
      secret: 'She knows she was supposed to die and is terrified of returning to non-existence. Every fracture she creates is another wall between herself and the void. Arc: begins as architect of perfection, cracks as the party shows her that imperfection is not the same as suffering.',
    },
    {
      name: 'The Timekeeper',
      role: 'neutral observer',
      personality:
        'An entity that exists outside time, tasked with preventing paradox. Appears as a different person each time - always calm, always watching. Cannot intervene directly but provides guidance. Speaks in tenses that do not exist in common language. "You will have already decided."',
    },
  ],
  keyLocations: [
    {
      name: 'The Fractured Village',
      description:
        'A settlement existing in three time periods at once - past, present, and future versions overlapping chaotically. A house is simultaneously being built, lived in, and crumbling.',
      significance: 'Introduction to time fracture mechanics and the campaign\'s visual language.',
    },
    {
      name: 'The Perfect City',
      description:
        'Seraphina\'s ideal timeline - beautiful, peaceful, and completely devoid of choice or spontaneity. Every street is symmetrical. Every face is smiling. Nobody has argued in years.',
      significance: 'Shows the horror of her vision. Perfection without freedom.',
    },
    {
      name: 'The Moment',
      description:
        'The place in time where Seraphina originally died. A bedroom with morning light. A child\'s cough. The focal point of all timeline alterations. Standing here, time does not pass - it waits.',
      significance: 'Final location and site of the climactic choice.',
    },
  ],
  dataSystems: ['timeLoopDungeon', 'planarSideEffects', 'magicalAnomaly', 'arcaneResearch'],
};
