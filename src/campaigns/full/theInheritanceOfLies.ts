import type { FullCampaign } from '../types';

export const theInheritanceOfLies: FullCampaign = {
  id: 'full-inheritance-of-lies',
  type: 'full',
  title: 'The Inheritance of Lies',
  tagline: 'A fortune left to the one who tells the truth. In a family of liars.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'social'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 2, end: 8 },
  estimatedSessions: 14,
  settingSummary:
    'Lord Edmond Blackwood, the wealthiest man in the province, is dead. His will is a single sentence: "My fortune goes to the one among my heirs who tells the truth." Six heirs. Six stories. Every story contradicts at least one other. The party is hired by the executor to determine who is the honest heir — and they have one month before the courts decide by default.',
  hook: 'The executor, a nervous halfling solicitor named Fennwick, contacts the party. "Six heirs. Six claims. Zero trustworthy people. Lord Blackwood was specific: the fortune goes to the truthful one. I need investigators, not lawyers. These people will lie to your face, and they will be very good at it." He hands over six sealed statements and a ring of keys to the Blackwood estate.',
  twist:
    'Lord Edmond Blackwood was the biggest liar of all. The fortune does not exist — he spent it decades ago maintaining the illusion of wealth. The estate is mortgaged to the hilt. The "inheritance" is not money. It is the truth about what Edmond did to build his reputation: fraud, theft, and a murder he covered up as an accident. The real inheritance is that truth, and Edmond\'s will is a posthumous confession disguised as a bequest. The heirs must decide if they want the truth made public — which destroys the family name — or buried, which means the murder victim\'s family never gets justice.',
  climax:
    'All six heirs are gathered. The party presents their findings. There is no fortune. There is only the truth about Edmond Blackwood. The heirs must decide together: publish the truth and ruin the family name, bury it and protect the legacy, or find a middle path. The party\'s investigation determines how much leverage each heir has, and the final scene is a family confrontation where decades of lies collapse.',
  acts: [
    {
      title: 'Act 1: The Six Stories',
      summary:
        'The party interviews each heir and investigates their claims. Each heir has a version of family history that makes them the truthful one. Every version contradicts the others in specific, verifiable ways.',
      keyEvents: [
        'Fennwick\'s briefing: the will, the heirs, the deadline, the estate keys',
        'Heir interviews: six sessions of interrogation, each heir confident and convincing',
        'First contradictions: Heir A says Edmond loved her most, Heir B says Edmond hated her',
        'The estate search: Edmond\'s study is full of locked drawers and coded journals',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Peeling Back the Layers',
      summary:
        'Deeper investigation reveals each heir\'s real secrets — affairs, debts, crimes, betrayals. The family is a web of lies so thick that even the liars have lost track of what is true. And Edmond\'s own secrets start to surface.',
      keyEvents: [
        'Heir C\'s alibi for a family scandal collapses — she was covering for Heir D',
        'Edmond\'s coded journals decoded: they reference a "debt that cannot be repaid"',
        'A seventh figure appears: someone who is not an heir but was in Edmond\'s life and has been erased from the family narrative',
        'The financial records: the fortune is not where it should be. It may not exist at all.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Real Inheritance',
      summary:
        'The truth emerges. Edmond was a fraud. The fortune is gone. The will was a confession. The party must present their findings and the heirs must face what their patriarch really was.',
      keyEvents: [
        'The empty vault: the party confirms the fortune was spent years ago',
        'The murder: Edmond killed a business rival and staged it as an accident — the rival\'s family still lives in town',
        'Confrontation: all six heirs in one room with the truth on the table',
        'The choice: expose, bury, or compromise — the party\'s evidence shapes what is possible',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Fennwick Bramble',
      role: 'executor / quest giver',
      personality:
        'A deeply stressed halfling solicitor who dabs his forehead with a handkerchief every thirty seconds and organizes his desk three times during a conversation. Speaks in legal clauses even when ordering lunch. "I am a contracts lawyer. I was not trained for family psychodrama. Clause 7b of the will says — no, actually, there is no Clause 7b. There is one sentence. One."',
    },
    {
      name: 'Helena Blackwood',
      role: 'eldest heir',
      personality:
        'The family matriarch-in-waiting. Cold, composed, and certain the fortune is hers by right. Her version of family history is the most polished and the most rehearsed.',
      secret: 'She found Edmond\'s confession years ago and has been quietly selling off estate assets to cover the debts before anyone noticed.',
    },
    {
      name: 'Tomas Blackwood',
      role: 'youngest heir',
      personality:
        'The black sheep who left the family a decade ago. He came back for the will reading and seems genuinely uninterested in the money. He might be the only honest one — or the best liar.',
      secret: 'He left because he witnessed the cover-up of Edmond\'s murder and could not live with it. He returned hoping the will would expose the truth.',
    },
    {
      name: 'The Victim\'s Daughter',
      role: 'hidden stakeholder',
      personality:
        'Maeve Croft, daughter of the man Edmond murdered. She lives in town, runs a bakery, and has no idea her father was killed. If the truth comes out, she gets justice. If it stays buried, she stays in the dark.',
    },
  ],
  keyLocations: [
    {
      name: 'Blackwood Manor',
      description: 'A sprawling estate that looks wealthy from outside. Inside, half the rooms are locked, the good silver is gone, and the art on the walls is reproductions.',
      significance: 'The primary investigation site, full of clues and red herrings.',
    },
    {
      name: 'Fennwick\'s Office',
      description: 'A cramped solicitor\'s office above a cobbler\'s shop. Piled with Blackwood paperwork.',
      significance: 'The party\'s base of operations and where they report findings.',
    },
    {
      name: 'The Empty Vault',
      description: 'Beneath the manor — a reinforced vault that once held the Blackwood fortune. Now it holds dust and a single letter in Edmond\'s handwriting.',
      significance: 'Where the truth about the fortune is confirmed.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'npcSchedule',
    'socialEncounter',
    'secretSociety',
    'politicalEvent',
    'darkBargain',
    'npcRelationship',
    'rumor',
  ],
};
