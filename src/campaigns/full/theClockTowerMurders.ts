import type { FullCampaign } from '../types';

export const theClockTowerMurders: FullCampaign = {
  id: 'full-clock-tower-murders',
  type: 'full',
  title: 'The Clock Tower Murders',
  tagline: 'One murder per hour. Twelve chimes. The victims died a century ago.',
  tone: 'mystery',
  themes: ['mystery', 'urban', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The city of Thornwall has a clock tower that has not worked in a century. Last night, it started chiming again. At each chime, someone in the city dies — collapsed in the street, no wounds, no poison, just dead. By the third chime, the pattern is clear: one death per hour, twelve chimes total. The party has nine hours to solve it before the clock strikes midnight.',
  hook: 'The party is in Thornwall when the first chime rings at noon. A merchant drops dead in the market square. An hour later, the second chime — a noblewoman collapses at a garden party. The city guard is overwhelmed. The mayor offers the party anything they want if they can stop it. "I do not know what is happening, but the clock is counting down to something."',
  twist:
    'The murders are not happening now. They happened exactly one hundred years ago, and a time loop is replaying them. The original twelve victims were killed in a single night by a serial murderer who was never caught. The clock tower is the anchor for the loop — it was enchanted by the murderer to replay the deaths every century as a monument to their work. The party can interact with echoes of the past but cannot change it. They can only identify the original killer, whose descendant is alive in present-day Thornwall and preparing to repeat the cycle.',
  climax:
    'The twelfth chime approaches. The party has identified the original killer through the pattern of the century-old murders. The descendant is in the clock tower, performing the ritual to make the deaths permanent this time — killing twelve new people who mirror the original victims. The party must stop the descendant, break the time loop, and decide what to do with the truth about Thornwall\'s most prominent family.',
  acts: [
    {
      title: 'Act 1: The Chimes Begin',
      summary:
        'Deaths one through four. The party investigates the victims, looking for connections. Each death scene contains a clue — but the clues only make sense as a set. The clock tower is locked and warded.',
      keyEvents: [
        'Chime one: a merchant dies mid-sentence — no cause of death',
        'Chime two: a noblewoman at a garden party — witnesses saw nothing',
        'Chime three: a dock worker — found sitting upright, eyes open, dead',
        'The pattern emerges: each victim occupies a social role, and the deaths form a geographic spiral toward the clock tower',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Echoes of the Past',
      summary:
        'The party discovers the time loop. Ghost-like echoes of the original murders appear at each death site. The past bleeds through, and the party can witness the century-old killings — watching the original murderer work.',
      keyEvents: [
        'First echo: a translucent figure dies at the same spot as the modern merchant, wearing century-old clothes',
        'Research: city records confirm twelve unsolved deaths exactly one hundred years ago',
        'Following the echoes: each ghost death reveals the original killer\'s method and motive',
        'The killer\'s calling card: a clock gear left at each original scene, now appearing at the modern ones',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Twelfth Chime',
      summary:
        'The killer\'s identity is clear. Their descendant is in the clock tower. The party must break in, stop the ritual, and confront a family legacy of murder.',
      keyEvents: [
        'The clock tower wards broken — inside, a century of obsessive documentation',
        'The descendant revealed: a respected citizen who has been planning this for decades',
        'The ritual: the twelfth chime will make the loop permanent, killing twelve every century forever',
        'Confrontation at midnight: stop the chime, stop the descendant, break the loop',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Mayor Cressida Hale',
      role: 'quest giver',
      personality:
        'A pragmatic leader who is terrified and hiding it well. She cares about her city and will give the party anything they need. Does not handle the supernatural well.',
    },
    {
      name: 'Archivist Pell',
      role: 'information ally',
      personality:
        'The city archivist who has spent forty years cataloging Thornwall\'s history. He knows about the original murders and has always suspected they were connected. Dry, meticulous, and thrilled to finally be useful.',
    },
    {
      name: 'Edric Vane',
      role: 'the descendant / antagonist',
      personality:
        'A well-liked civic leader. Charming, generous, involved in every community project. Nobody would suspect him. He has spent his entire adult life preparing for this night.',
      secret: 'He does not see himself as a murderer. He sees himself as completing his ancestor\'s masterwork — a spell that proves mortals can control time itself.',
    },
  ],
  keyLocations: [
    {
      name: 'The Clock Tower',
      description: 'A massive stone tower in Thornwall\'s center. Silent for a century. Now chiming. The interior is warded against entry.',
      significance: 'The anchor for the time loop and the location of the final confrontation.',
    },
    {
      name: 'Thornwall City',
      description: 'A prosperous trade city with cobblestone streets and guild halls. The twelve death sites form a spiral pattern through its districts.',
      significance: 'The entire investigation plays out across the city.',
    },
    {
      name: 'The City Archive',
      description: 'Basement records of Thornwall\'s history going back three centuries. Dusty, cramped, and full of answers.',
      significance: 'Where the party connects the modern deaths to the century-old murders.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'npcSchedule',
    'cataclysmCountdown',
    'hauntedLocation',
    'secretSociety',
    'trapDesign',
    'socialEncounter',
    'urbanEncounter',
  ],
};
