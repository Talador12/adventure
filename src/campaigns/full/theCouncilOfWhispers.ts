import type { FullCampaign } from '../types';

export const theCouncilOfWhispers: FullCampaign = {
  id: 'full-council-of-whispers',
  type: 'full',
  title: 'The Council of Whispers',
  tagline: 'The city is ruled by people no one can identify. Someone figured out who they are.',
  tone: 'political',
  themes: ['political', 'mystery', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'The free city of Vorath is governed by the Masked Council - seven anonymous rulers who speak through enchanted masks that disguise their voices, faces, and even their body language. The system was designed 200 years ago to make corruption impossible: you cannot bribe someone whose identity you do not know. For two centuries, it worked. Vorath became the most honestly governed city on the continent. Then one of the council members voted against their own beliefs. Then another. Then a third. Someone has cracked the anonymity. Someone is blackmailing the council. And the system designed to be incorruptible is being corrupted by the very secrecy that protected it.',
  hook: 'A Masked Councilor contacts the party through an intermediary - a note delivered by a street urchin, written in the Council\'s official cipher. "I am being blackmailed. I cannot tell you who I am - the mask enchantment prevents it. I cannot tell you which votes I was forced to change - that would identify me. I can tell you this: three of us are compromised. The blackmailer knows who we are and is rewriting our city\'s laws one vote at a time. Find them. Stop them. And do it without breaking the anonymity that keeps the other four of us honest."',
  twist:
    'The blackmailer is Serai Voss, the original architect of the Masked Council system - or rather, her ghost. She designed the anonymity with a deliberate backdoor: a scrying focus hidden in each mask that lets the holder identify any council member at will. She built it 200 years ago because she never trusted the powerful to stay honest without surveillance. She was right. Two of the three "blackmailed" councilors were already corrupt before she intervened - taking bribes, selling votes, using their anonymity as a shield. Serai\'s ghost has been watching for two centuries and finally decided to act. Her blackmail forced the corrupt ones to vote honestly for the first time in years. The system is compromised. But the compromised system was catching corruption the clean system missed.',
  climax:
    'The party must decide: expose Serai\'s backdoor (which restores the Council\'s anonymity but lets the corrupt members go back to grifting), support Serai\'s surveillance (which keeps the Council honest but destroys the principle of anonymous governance), or redesign the system entirely (transparent governance with accountability, which means the Council members\' identities become public and their lives are at risk from every faction they ever ruled against). There is no clean answer. Every option has costs.',
  acts: [
    {
      title: 'Act 1: The Cipher',
      summary:
        'The party investigates the blackmail without knowing who the victims are, who the blackmailer is, or what the changed votes accomplished. A mystery wrapped in institutional secrecy.',
      keyEvents: [
        'The anonymous councilor\'s message: help me, but I cannot tell you who I am',
        'Studying the Council system: how the masks work, how votes are cast, who built it all',
        'Investigating the changed votes: trade policy, military funding, and taxation - each favoring different factions',
        'First clue: the blackmail letters reference details only someone present at the Council\'s founding could know',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Architect',
      summary:
        'The trail leads to Serai Voss, dead for two centuries. The party discovers the backdoor, the scrying focuses in the masks, and the uncomfortable truth that the blackmailer was catching real corruption.',
      keyEvents: [
        'Serai\'s workshop: hidden beneath Vorath\'s original council chamber, untouched for 200 years',
        'The scrying focuses: one embedded in each mask, keyed to a master crystal Serai kept',
        'The ghost of Serai Voss: not malicious, not peaceful - a woman who trusted systems more than people and was proven right',
        'The corruption evidence: two councilors were selling votes long before Serai intervened',
        'Serai\'s argument: "I gave them anonymity to be honest. They used it to steal. I built the check they needed."',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Unmasking',
      summary:
        'The party must resolve an impossible governance problem. Every solution breaks something. The city\'s political factions circle like sharks, ready to exploit whatever the party decides.',
      keyEvents: [
        'Presenting the evidence to the full Council - masked, anonymous, and deeply divided',
        'The corrupt councilors attempt to destroy the scrying focuses to protect themselves',
        'Serai\'s ghost makes her case publicly: "Privacy for the powerful is a privilege, not a right."',
        'The party brokers a new system: what does accountable governance look like when transparency has costs?',
        'Epilogue: the first open Council session. Messy. Vulnerable. Better than secrets.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Serai Voss (ghost)',
      role: 'blackmailer / moral challenge',
      personality:
        'The ghost of a brilliant political architect who designed a perfect system and then could not trust it to work without her watching. She is not wrong that the Council needed oversight. She is not right that secret surveillance is the answer. Two centuries of watching has made her certain. Certainty in a ghost is terrifying.',
      secret: 'She never trusted anyone in her life. Not even herself. The backdoor was her first instinct, not her last resort.',
    },
    {
      name: 'The Masked Councilor (contact)',
      role: 'quest giver / ambiguous',
      personality:
        'Genuinely frightened. Votes honestly, has always voted honestly, and is terrified that the blackmailer will ruin the system they believe in. Communicates only through intermediaries and ciphers.',
      secret: 'This councilor is the only one of the seven who has never been tempted by corruption. They are the exception that proves the system works - and they know it.',
    },
    {
      name: 'Councilor Wraith (corrupt)',
      role: 'hidden antagonist',
      personality:
        'One of the corrupt councilors. Has been selling votes to the merchant guild for a decade. Uses the mask\'s anonymity as a shield. Charming in public, ruthless in secret. When Serai forced honest votes, this councilor lost a fortune.',
    },
    {
      name: 'Kellan (street-level investigator)',
      role: 'ally / information broker',
      personality:
        'A former city guard turned private investigator. Knows Vorath\'s politics from the gutter up. Cynical, thorough, and not remotely surprised that anonymous power attracted corruption. "You gave seven people masks and unlimited authority. What did you think would happen?"',
    },
  ],
  keyLocations: [
    {
      name: 'The Masked Chamber',
      description: 'A circular room where the seven councilors sit in identical chairs wearing identical masks. Voices emerge from enchanted grilles, stripped of all identifying features.',
      significance: 'Where the Council governs and where the system\'s design is most visible.',
    },
    {
      name: 'Serai\'s Workshop',
      description: 'A hidden chamber beneath the original council hall. Dusty workbenches, enchantment tools, and the master scrying crystal that sees through all seven masks.',
      significance: 'Where the party discovers the backdoor and meets Serai\'s ghost.',
    },
    {
      name: 'The Broker\'s Alley',
      description: 'A narrow street in the trade district where information is the currency. Everyone whispers. Nobody uses real names. The city\'s political underbelly.',
      significance: 'Where the party gathers intelligence and meets Kellan.',
    },
  ],
  dataSystems: [
    'courtIntrigue',
    'detectiveCase',
    'npcRelationshipWeb',
    'factionReputation',
    'socialEncounter',
    'moralDilemma',
    'diplomaticNegotiation',
    'secretSociety',
  ],
};
