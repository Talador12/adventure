import type { FullCampaign } from '../types';

export const theBottomlessPurse: FullCampaign = {
  id: 'full-the-bottomless-purse',
  type: 'full',
  title: 'The Bottomless Purse',
  tagline: 'He is crying and reaching into the purse simultaneously. He has been doing this for hours.',
  tone: 'horror',
  themes: ['horror', 'dark_fantasy', 'urban'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The merchant city of Verdemonte is prosperous, noisy, and alive. Then people start dying. Not violently - they age. A dockworker goes to bed at thirty and wakes up at ninety, dead by noon. A child turns grey overnight. A bride crumbles to dust at her own wedding. The deaths are random, scattered, impossible to predict. The city is terrified. The only pattern: each victim lost exactly one year of life, all at once, as if it was pulled out of them like a tooth.',
  hook: 'The city magistrate hires the party after the seventh death in two weeks. A young mother aged forty years in her sleep. Her husband is inconsolable. The healers say it is not disease, not a curse they can identify, not poison. Something is extracting time from people. The magistrate wants answers before the city panics. It is already too late for that.',
  twist:
    'The purse is a test, placed by Aurava, a forgotten god of commerce and fair exchange. Every century, she places the purse in a mortal city. Every century, the finder chooses wealth over life. Every single time. Aurava is not punishing anyone. She is collecting data. She has a ledger of every mortal who found the purse across ten thousand years, and the number who chose to stop pulling coins is zero. The purse is not a curse. It is a census of what mortals value most. The number is damning, and Aurava is running out of reasons to believe the species deserves her patronage.',
  climax:
    'The party confronts Aldren in his counting house, surrounded by gold that cost hundreds of lives. He is lucid, aware, and unable to stop. The purse is in his hand. He is crying and reaching in simultaneously. The party can destroy the purse (ending the deaths but releasing Aurava\'s judgment - she will withdraw her blessing from commerce across the continent, causing economic collapse). They can convince Aldren to stop (the first mortal in ten thousand years to do so, which would shatter Aurava\'s thesis and force her to reconsider). Or they can take the purse themselves and discover whether they are any different.',
  acts: [
    {
      title: 'Act 1: The Dying',
      summary:
        'Investigation. People are aging to death overnight. The party traces the deaths, maps the pattern, and discovers they cluster around a single merchant district. Someone is spending stolen time.',
      keyEvents: [
        'The first crime scene: a young woman aged to ninety in her bed. Her hair is white. Her skin is paper. Her husband sits beside her, holding a hand that was smooth this morning. The room smells like dust and lilacs - her perfume, aged along with her.',
        'Divination reveals the deaths share a magical signature - something is extracting life force',
        'The party maps the deaths geographically: they radiate outward from the market district',
        'A shopkeeper remembers a merchant named Aldren who suddenly became very wealthy three months ago',
        'The party finds Aldren\'s ledger: he has been tracking the deaths. He knows exactly what he is doing.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Merchant',
      summary:
        'The party finds Aldren and discovers a man at war with himself. He knows the purse kills. He has tried to stop. He cannot. The horror escalates as the party watches addiction consume a man who is fully aware of the destruction he causes.',
      keyEvents: [
        'Aldren\'s house: immaculate, wealthy, and full of empty rooms he bought for people who died before they could move in',
        'Aldren begs the party to take the purse away. They do. He breaks into their room that night to steal it back.',
        'A priest of commerce examines the purse and goes pale: this is divine craftsmanship, older than the city',
        'Aldren confesses everything: the first coin was innocent. By the tenth he suspected. By the hundredth he knew.',
        'The deaths accelerate. The purse demands more. Aldren is pulling coins in his sleep.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Ledger',
      summary:
        'The party discovers the purse\'s true nature: a divine test administered across millennia. Aurava\'s temple reveals the history. Every finder chose wealth. Every time. The party must break the pattern or accept its conclusion.',
      keyEvents: [
        'The ruined temple of Aurava beneath the merchant district: dusty, forgotten, full of identical purses on display',
        'The ledger: ten thousand names across ten thousand years. None of them stopped.',
        'Aurava manifests - not angry, not cruel, just tired. She asks the party what they expected to find.',
        'The final confrontation with Aldren. He has the purse. The party has the truth.',
        'The choice: destroy, convince, or take. Each option has a cost the party must live with.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Aldren Soth',
      role: 'victim / villain',
      personality:
        'A merchant of middling success who found the purse and became the wealthiest man in Verdemonte. He speaks in short, precise sentences, as if rationing words the way he cannot ration greed. His hands move toward the purse constantly - he catches himself, forces them flat on the table, and they migrate back. His eyes are clear and aware. That is the horror. He sees exactly what he is doing. He hates himself more than the party ever could.',
      secret: 'He tried to kill himself twice to stop the deaths. The purse would not let him die. It needs a hand to reach into it. The scars are on his wrists. He wears long sleeves.',
    },
    {
      name: 'Aurava',
      role: 'god / observer / judge',
      personality:
        'A forgotten god of fair exchange who speaks in the language of ledgers and balances. She manifests as a tired woman with ink-stained fingers, carrying a book that is too heavy. She does not look at the party when she speaks. She looks at the book. She is not malicious. She is exhausted by ten thousand years of the same result. She wants to be proven wrong. Her voice cracks when she says "I was hoping."',
      secret: 'She has been placing the purses hoping someone will stop. If someone does, she will restore everything. She has never had to prepare that contingency.',
    },
    {
      name: 'Magistrate Hella Vane',
      role: 'quest giver / political pressure',
      personality:
        'A sharp, no-nonsense city official who needs answers before the city tears itself apart. Pragmatic to a fault. She will sacrifice one person to save a thousand without blinking.',
    },
    {
      name: 'Brother Cassius',
      role: 'ally / lore keeper',
      personality:
        'A priest of a minor trade god who recognizes the purse\'s divine signature. Scholarly, nervous, and increasingly horrified as he connects the historical dots.',
    },
  ],
  keyLocations: [
    {
      name: 'Verdemonte',
      description: 'A prosperous merchant city built on coastal trade, now gripped by a plague of accelerated aging that nobody can explain.',
      significance: 'The campaign\'s stage. The city\'s wealth and vitality make the deaths more horrifying by contrast.',
    },
    {
      name: 'Aldren\'s Counting House',
      description: 'A beautiful merchant townhouse filled with gold and emptied of everything else. Aldren sits alone among his purchased luxury, reaching into the purse.',
      significance: 'The physical manifestation of the horror: wealth bought with stolen life, enjoyed by nobody.',
    },
    {
      name: 'The Temple of Aurava',
      description: 'A buried temple beneath the old market. Rows of identical purses on pedestals, each with a name and a number. A ledger of ten thousand failures.',
      significance: 'Where the party learns the truth: this has happened before, and it has always ended the same way.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'npcRelationshipWeb',
    'cursedItem',
    'socialEncounter',
    'deityPantheon',
    'urbanEncounter',
    'moralDilemma',
  ],
};
