import type { OneShotCampaign } from '../types';

export const theLastConfession: OneShotCampaign = {
  id: 'oneshot-last-confession',
  type: 'oneshot',
  title: 'The Last Confession',
  tagline: 'A priest heard a murder confession. Sacred oath: he cannot tell you. But his "hypothetical" questions are very specific.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'Father Aldric heard a confession of murder. His sacred oath forbids him from revealing it. But a killer walks free. He cannot tell the party who confessed or what they said. He can, however, ask extremely specific hypothetical questions that guide the investigation without technically breaking his vow.',
  hook: 'Father Aldric approaches the party in the market. "I cannot tell you anything. But hypothetically, if someone disposed of a weapon in the old well on Merchant Street, and hypothetically, if that someone had access to the victim\'s home through the bakery next door... what would you do with that information?"',
  twist:
    'The person who confessed is not the killer. They confessed to a murder they believe they committed while blackout drunk, but they were set up. The real killer planted evidence and manipulated the drunk into believing they did it. Father Aldric unknowingly carries a false confession.',
  climax:
    'The party follows the priest\'s clues to the wrong person, then realizes the confession was false. The real killer is exposed through the planted evidence trail. Father Aldric must grapple with whether his oath protected a victim or a crime.',
  scenes: [
    {
      title: 'Scene 1: The Hypotheticals',
      summary: 'Father Aldric guides the party through careful non-statements. Every "hypothetical" is a real clue wrapped in plausible deniability.',
      challenge: 'puzzle',
      keyEvents: [
        '"Hypothetically, the victim was seen arguing with someone at the Rusty Anchor three days ago."',
        '"If I were investigating, I might check the old well on Merchant Street for a weapon."',
        'The party follows each hypothetical. They are precise. They lead somewhere real.',
        'The weapon is in the well. A dagger with initials. The investigation narrows.',
      ],
    },
    {
      title: 'Scene 2: The Suspect',
      summary: 'The clues point to a specific person. The evidence is strong. But something feels wrong.',
      challenge: 'exploration',
      keyEvents: [
        'The suspect: a local drunk named Harren. History of violence. Motive. Opportunity.',
        'Harren has fragments of memory: an argument, a knife, blood on his hands.',
        'But the evidence is too clean. Too convenient. A drunk who commits a perfect frame.',
        'The dagger was bought two weeks ago. Harren cannot afford a dagger. Who bought it?',
      ],
    },
    {
      title: 'Scene 3: The Frame',
      summary: 'The real killer is revealed through the planted evidence. Father Aldric faces a crisis of faith.',
      challenge: 'social',
      keyEvents: [
        'The dagger was purchased by the victim\'s business partner. Paid in cash. Traced by the merchant.',
        'The partner drugged Harren, placed the knife in his hand, and staged the scene.',
        'Father Aldric learns the confession was false. His oath protected a manipulation.',
        'The real killer confronted. Justice or flight. The party decides.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Father Aldric',
      role: 'priest / reluctant guide',
      personality: 'Devout, tormented, and creative with language. His oath is absolute but he finds every loophole in the phrasing to help without technically breaking it.',
    },
    {
      name: 'Harren',
      role: 'false confessor',
      personality: 'A broken drunk who genuinely believes he committed murder. He confessed out of guilt for a crime he did not commit. His grief is real even if the crime is not.',
    },
  ],
  keyLocations: [
    {
      name: 'The Chapel of the Dawn',
      description: 'A small stone chapel where Father Aldric struggles with the weight of what he knows and cannot say.',
      significance: 'Where the investigation begins through carefully worded non-disclosures.',
    },
    {
      name: 'The Old Well',
      description: 'A disused well on Merchant Street containing a planted murder weapon.',
      significance: 'The first physical clue and the beginning of the frame.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator'],
};
