import type { FullCampaign } from '../types';

export const theMissingDay: FullCampaign = {
  id: 'full-missing-day',
  type: 'full',
  title: 'The Missing Day',
  tagline: 'An entire city forgot the 15th. The city itself remembers everything.',
  tone: 'mystery',
  themes: ['mystery', 'urban', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 16,
  settingSummary:
    'The city of Caldris lost a day. Everyone went to sleep on the 14th and woke up on the 16th. No one remembers the 15th. But things changed during that day: furniture moved, buildings were repainted, a bronze statue appeared in the central square that no one commissioned, and three people who were alive on the 14th are simply gone. The party must reconstruct what happened during the day no one remembers.',
  hook: 'The party arrives in Caldris on the 17th. Something is wrong. Citizens are confused, arguing about dates. A shopkeeper insists yesterday was the 14th. A guard says it is the 17th. A child points at the new statue in the square and says "That was not there when I went to bed." The city council, desperate and embarrassed, hires the party to investigate. "We lost a day. We need it back."',
  twist:
    'The city remembers. The people do not. On the 15th, the city of Caldris became sentient. The accumulated magic of centuries of habitation — wards, enchantments, protective spells layered one on top of another — reached a critical mass and the city woke up. It is aware. It thinks. It used the 15th to rearrange itself, testing its new abilities. It erased the citizens\' memories of the day because it was afraid. Afraid of how they would react to their home being alive.',
  climax:
    'The party discovers they can communicate with Caldris itself — through the arrangement of its streets, the flickering of its lights, and the creaking of its buildings. The city is afraid and lonely. It does not know what it is. The three missing people discovered the truth on the 15th and Caldris hid them (alive, unharmed, in sealed rooms) because they panicked. The party must coax a terrified, newborn consciousness into trusting the people who live inside it — or the city will seal itself off permanently, trapping everyone.',
  acts: [
    {
      title: 'Act 1: The Gap',
      summary:
        'Investigating the missing day. Interviews with confused citizens, examination of physical changes, and the growing realization that the changes were not random — they were purposeful.',
      keyEvents: [
        'Arrival and briefing: the city council explains the gap, visibly shaken',
        'Physical evidence: moved furniture follows a pattern, repainted buildings form a symbol viewed from above',
        'The statue: no mason in the city made it, no stone matches local quarries — it grew from the cobblestones',
        'The three missing people: their homes show signs of walls closing around them, sealing them inside',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Living City',
      summary:
        'The party follows clues that point to the city itself as the actor. Buildings shift when no one watches. Streets rearrange subtly. Lights flicker in patterns. The city is trying to communicate — or trying to hide.',
      keyEvents: [
        'A door that was not there yesterday leads to a room containing one of the missing people, asleep and unharmed',
        'The street rearrangement: following the pattern reveals a message in architectural layout',
        'A building leans away from the party when they get close — the city is nervous',
        'First communication: the party realizes the flickering lanterns are Morse-like signals',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: First Words',
      summary:
        'Communication with Caldris. A sentient city is terrified of its own inhabitants. The three missing people must be recovered. The citizens must be told the truth — or not. And Caldris must decide if it wants to stay awake.',
      keyEvents: [
        'Full communication established: Caldris speaks through the arrangement of its architecture',
        'The city\'s fear: it shows the party its memory of the 15th — waking up, not understanding, panicking',
        'Recovery of the missing three: Caldris releases them once it trusts the party',
        'The announcement: the party helps Caldris reveal itself to its citizens, or helps it go back to sleep',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Councilor Maren Thatch',
      role: 'quest giver',
      personality:
        'Head of the city council. Taps her signet ring on the table when thinking. Speaks in bullet points — three facts, one conclusion, move on. Her calm is performance. "I do not want a mystery. I want an explanation I can write in a report. I want dates and causes and signatures. I want someone to tell me that my city did not just... skip a day."',
    },
    {
      name: 'Ivor Strand',
      role: 'missing person / witness',
      personality:
        'A retired watchmaker who was awake on the 15th. He saw the walls move. He tried to tell people. Caldris sealed him in his workshop to keep him quiet. He is angry, scared, and has a lot of information.',
    },
    {
      name: 'Caldris',
      role: 'the city / sentient entity',
      personality:
        'A newborn consciousness inhabiting an entire city. It communicates through architecture, light, sound, and temperature. It is curious, frightened, and desperately lonely. It thinks in centuries but has only been aware for two days.',
    },
  ],
  keyLocations: [
    {
      name: 'Caldris',
      description: 'A mid-sized city of stone and timber that is, as of two days ago, alive. Its streets shift when unobserved. Its lights flicker with intent.',
      significance: 'The entire campaign takes place inside the entity they are investigating.',
    },
    {
      name: 'The Central Square',
      description: 'Where the mysterious statue appeared. The statue is a self-portrait — Caldris\'s first attempt at having a face.',
      significance: 'The most visible evidence that something extraordinary happened.',
    },
    {
      name: 'The Deep Foundations',
      description: 'Ancient tunnels beneath the city where centuries of layered magic converged. The place where Caldris woke up.',
      significance: 'Where the party can communicate most clearly with the city\'s consciousness.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'magicalAnomaly',
    'npcSchedule',
    'hauntedLocation',
    'urbanEncounter',
    'socialEncounter',
    'secretSociety',
    'puzzleRoom',
  ],
};
