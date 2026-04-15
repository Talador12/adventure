import type { FullCampaign } from '../types';

export const theBookBurners: FullCampaign = {
  id: 'full-book-burners',
  type: 'full',
  title: 'The Book Burners',
  tagline: 'They are burning the libraries. The high priestess can read every book she destroys.',
  tone: 'political',
  themes: ['political', 'intrigue', 'dark_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'The Theocracy of the Radiant Word has ruled the city of Solenne for fifteen years. In that time, every library has been sealed, every school closed, every healer labeled a witch. Knowledge is heresy. Questioning is blasphemy. Reading is a crime punishable by blinding. The Purifiers - the church\'s enforcers - burn books in public squares while crowds cheer, because the crowds have been taught that books brought the plague that killed their children ten years ago. It is a lie. But it is a lie that has been told so many times it has become truth for an entire generation.',
  hook: 'A blind scholar named Oram finds the party in a cellar beneath a condemned bookshop. He still smells like smoke. "They burned the Grand Archive today. Four hundred years of medical texts, agricultural research, histories, poems. All of it. Ash." He holds out a singed leather satchel containing three books. "These are the last. I need them out of the city. I need people who can build a network to save what remains. I need you to help me remember what they are trying to make us forget."',
  twist:
    'High Priestess Thessaly - the architect of the book-burning campaign - is the most well-read person in Solenne. She has a private library of thousands of volumes hidden beneath the cathedral. She reads voraciously and always has. She did not burn the books out of ignorance. She burned them because one specific volume in the Grand Archive contained proof that the Radiant Word\'s founding prophecy was fabricated - that her god, the Radiant One, was invented by the first priests to consolidate power. Every book in Solenne had to burn so that one truth would never surface. She would rather destroy all knowledge than face the possibility that her entire life was built on a lie.',
  climax:
    'The party discovers Thessaly\'s hidden library and the forbidden book. They must get it to the public. Thessaly will burn her own cathedral before she lets that book leave. The climax is not a battle of swords but a battle of information: smuggling copies through Purifier checkpoints, broadcasting the truth in a city that has been conditioned to reject it, and confronting Thessaly - not as a monster, but as a woman who chose comfortable fiction over devastating truth and took an entire city with her.',
  acts: [
    {
      title: 'Act 1: The Burning',
      summary:
        'The party enters Solenne and witnesses what a society looks like when knowledge becomes a crime. They join the underground book-smuggling network and begin to understand the machinery of organized ignorance.',
      keyEvents: [
        'Arriving in Solenne: book burnings in the square, crowds cheering, Purifiers everywhere',
        'Oram\'s cellar network: a handful of scholars, teachers, and healers hiding what they can',
        'First Purifier encounter: the enforcers are not thugs - they are true believers, which is worse',
        'Smuggling the first books out of the city through sewers and sympathetic gate guards',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Network',
      summary:
        'Building the underground. The party trains smugglers, protects scholars, and discovers that the book-burning has a specific target - one volume the church desperately wants destroyed. The trail leads to Thessaly herself.',
      keyEvents: [
        'Expanding the network: safe houses, coded messages, dead drops in market stalls',
        'A healer is publicly blinded for treating the sick with herbal medicine',
        'Discovering the pattern: the burnings are not random - every archive with pre-Theocracy records is targeted first',
        'Finding Thessaly\'s hidden library beneath the cathedral: thousands of books, well-maintained, well-read',
        'The forbidden volume: proof that the Radiant One was fabricated by the church\'s founders',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Light',
      summary:
        'Getting the truth out. Thessaly knows the party has found her secret. She orders a final purge - burn everything, including the underground network. The party must spread the truth faster than she can destroy it.',
      keyEvents: [
        'Thessaly orders the Purifiers to sweep the city: every cellar, every hidden room',
        'The party copies the forbidden book and distributes it through the smuggling network',
        'Confronting Thessaly: she is not ranting - she is weeping. She read the book thirty years ago and has been burning ever since.',
        'The people of Solenne read the truth - and many reject it, because believing a lie is easier than rebuilding a worldview',
        'Epilogue: the slow, imperfect process of a city relearning how to think for itself',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Oram (blind scholar)',
      role: 'quest giver / ally',
      personality:
        'Blinded by Purifiers three years ago. Still teaches in hidden cellars. Memorized entire books before they burned. Gentle, patient, and completely unwilling to let a civilization forget itself. "They can take my eyes. They cannot take the words I already read."',
    },
    {
      name: 'High Priestess Thessaly',
      role: 'primary antagonist',
      personality:
        'The most dangerous kind of villain: one who knows the truth and chooses the lie. She is not stupid. She is not even cruel by nature. She is a woman who built her life on a faith she discovered was false and decided the world could not handle the same discovery. Her tragedy is that she might be right.',
      secret: 'She still prays every night. To a god she knows does not exist. Because she cannot stop.',
    },
    {
      name: 'Purifier-Captain Jorek',
      role: 'antagonist / potential convert',
      personality:
        'A true believer in the Radiant Word. Burns books with genuine conviction. Not a sadist - a zealot. He believes he is saving souls. If confronted with the truth, he will not deny it easily. But his entire identity is at stake.',
    },
    {
      name: 'Nelle (street kid)',
      role: 'ally / hope',
      personality:
        'A thirteen-year-old who taught herself to read from scraps the Purifiers missed. Hungry for knowledge in a city that starves it. She represents what the theocracy fears most: someone who learned to think without permission.',
    },
  ],
  keyLocations: [
    {
      name: 'The Ash Square',
      description: 'The public burning ground. A permanent bonfire pit surrounded by benches. Citizens bring books voluntarily now. They call it devotion.',
      significance: 'The visible symbol of what Solenne has become.',
    },
    {
      name: 'Thessaly\'s Hidden Library',
      description: 'Beneath the Cathedral of the Radiant Word: a vast, temperature-controlled vault holding thousands of volumes. Everything the city thinks was destroyed.',
      significance: 'Where the party discovers Thessaly\'s hypocrisy and the forbidden book.',
    },
    {
      name: 'The Cellar Network',
      description: 'A series of connected basements beneath condemned buildings. Scholars teach, books are copied, and knowledge survives in the dark.',
      significance: 'The resistance\'s home base.',
    },
  ],
  dataSystems: [
    'factionReputation',
    'npcRelationshipWeb',
    'courtIntrigue',
    'socialEncounter',
    'moralDilemma',
    'secretSociety',
    'encounterWaves',
    'partyMoraleTracker',
  ],
};
