import type { FullCampaign } from '../types';

export const thePatientMan: FullCampaign = {
  id: 'full-the-patient-man',
  type: 'full',
  title: 'The Patient Man',
  tagline: 'The five guilty nobles are already destroyed. He finished five years ago. He cannot stop.',
  tone: 'horror',
  themes: ['horror', 'mystery', 'urban'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The city of Durnwall is a place where justice is for sale and the powerful do as they please. Twenty years ago, a merchant named Orin Thatch lost his entire family to a group of nobles who wanted his land. They burned his home with his wife and children inside, then bought the magistrate\'s silence. Nobody was punished. Orin disappeared. Now he is back, and the nobles are being destroyed - not killed, but dismantled. Businesses collapse. Marriages dissolve. Reputations shatter. Fortunes evaporate. All perfectly legal. All meticulously planned. And the party has been hired to protect the next target.',
  hook: 'Lady Revara Ashmont contacts the party in a panic. Someone is destroying her life. Her investments have vanished. Her husband left her after receiving anonymous letters. Her son was expelled from the academy on fabricated charges. She is a noble. She is also one of five people who participated in the burning of Orin Thatch\'s family twenty years ago. She does not mention that part. She says she has "enemies" and needs protection. The party takes the job.',
  twist:
    'Orin already got his revenge. Five years ago. Every person directly responsible for his family\'s murder is dead or destroyed. He finished. He won. But the anger did not leave. It just found new targets. The people he is destroying now were tangentially connected at best - a magistrate\'s clerk who filed the wrong paperwork, a banker who processed a loan, a servant who did not speak up. Orin has expanded the circle of guilt to include anyone who could have done something and did not. The circle keeps growing. The revenge has become self-sustaining. It no longer needs a reason.',
  climax:
    'The party confronts Orin in the house he rebuilt on the land where his family died. He is calm, rational, and completely aware that his current targets are not guilty. He does not care. The machine runs. It has to run. Stopping means accepting that the anger has no purpose anymore, and that is the one thing he cannot do. The party can stop him by force (punishing a man whose original grievance was real), expose him legally (turning him into the system that failed him), convince him to stop (which requires making him face the grief beneath the rage), or walk away (leaving a city full of people wondering when their turn comes).',
  acts: [
    {
      title: 'Act 1: The Protectors',
      summary:
        'The party guards Lady Ashmont and investigates who is targeting her. They discover a pattern: five nobles are being systematically dismantled by someone with perfect information and infinite patience. The party sympathizes with the victims. Then they learn who the victims really are.',
      keyEvents: [
        'Lady Ashmont\'s briefing: someone is destroying her life piece by piece. She needs bodyguards and investigators.',
        'The pattern emerges: five nobles, all targeted, all losing everything through legal and social manipulation',
        'A former servant reveals the connection: all five were involved in a fire that killed a family twenty years ago',
        'The party finds Orin\'s dossier on the five. Detailed, decades of research, perfectly executed.',
        'The moral shift: the people the party is protecting are murderers who escaped justice. Orin is the victim.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Patient Man',
      summary:
        'The party investigates Orin and discovers the scope of his operation. Twenty years of planning. Perfectly legal devastation. But something is wrong - some of his current targets have no connection to the original crime. The revenge has metastasized.',
      keyEvents: [
        'Orin\'s history: the fire, the cover-up, the twenty years of silent preparation',
        'A current target who genuinely has no connection to the crime - a clerk who filed paperwork he did not understand',
        'Orin contacts the party directly. He is polite, articulate, and completely transparent about what he did and why.',
        'The party learns the five original guilty nobles were already destroyed five years ago. Orin kept going.',
        'A new target appears: someone whose only crime was living on the same street and not calling for help',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Machine',
      summary:
        'The party confronts the truth: Orin\'s revenge ended years ago but he cannot stop. The machinery of his anger runs on its own. The final confrontation is not a fight - it is an intervention with a man who has replaced his grief with purpose and will collapse without it.',
      keyEvents: [
        'The rebuilt house: Orin lives in a perfect replica of the home that burned. Empty rooms for the family that died.',
        'Orin explains himself without apology. His original revenge was just. He knows the current targets are not guilty. He cannot stop.',
        'Lady Ashmont arrives. She sees Orin. She recognizes him. She says nothing.',
        'The party chooses: force, law, persuasion, or departure. Each carries weight.',
        'Epilogue: Durnwall processes the revelation that its nobles were murderers and their destroyer was their victim.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Orin Thatch',
      role: 'antagonist / victim',
      personality:
        'A man of terrifying patience and absolute clarity. He speaks softly, never raising his voice, choosing words the way an architect chooses stones. His hands are always still. His eyes are always moving. He sits in a chair that faces the door and never puts his back to a window. He loved his family more than anything, and the space where that love was has been filled with something that looks like purpose but is actually just momentum. When the party asks him to stop, he pauses, genuinely considers it, and says: "I would. I cannot find the switch."',
      secret: 'He visits his family\'s graves every morning before dawn. He tells them what he did that day. He stopped expecting them to tell him to stop three years ago. He still goes.',
    },
    {
      name: 'Lady Revara Ashmont',
      role: 'quest giver / guilty party',
      personality:
        'Elegant, composed, and hiding a twenty-year secret behind perfect diction. She never sits with her back to a fireplace. She flinches at the smell of smoke and covers it by adjusting her collar. She participated in the burning. She has nightmares about it. She hired the party because she deserves to be protected, not because she is innocent.',
      secret: 'She tried to stop the fire. She failed. She has told herself that trying counts. It does not. Her hands still smell like ash when she wakes from the nightmares.',
    },
    {
      name: 'Fenwick',
      role: 'information broker / morally gray ally',
      personality:
        'A city investigator who has been tracking the pattern of noble collapses for two years. Professional, detached, and increasingly unsure which side he is on.',
    },
    {
      name: 'The Clerk (Parrin Dolse)',
      role: 'innocent target / moral weight',
      personality:
        'A middle-aged bureaucrat whose life is being destroyed because he processed a land transfer twenty years ago. He did not know what it was for. He is terrified and has no idea why this is happening.',
    },
  ],
  keyLocations: [
    {
      name: 'Durnwall',
      description: 'A city of old money and older secrets. Grand estates sit beside slums. The courts serve whoever pays the most.',
      significance: 'A city that created Orin by failing to deliver justice. Now it receives his version instead.',
    },
    {
      name: 'The Thatch House',
      description: 'A perfect replica of the home that burned, rebuilt on the same foundation. Every room is furnished for a family that has been dead for twenty years.',
      significance: 'Where Orin lives with his grief. Where the party confronts him. The empty rooms are louder than any argument.',
    },
    {
      name: 'The Noble Quarter',
      description: 'Durnwall\'s wealthiest district, where the five guilty nobles lived in comfort built on silence. Now each house is dark, abandoned, or for sale.',
      significance: 'The landscape of completed revenge. A visual map of what Orin has accomplished and what it cost.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'npcRelationshipWeb',
    'socialEncounter',
    'urbanEncounter',
    'courtIntrigue',
    'moralDilemma',
    'trapMechanism',
  ],
};
