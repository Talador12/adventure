import type { FullCampaign } from '../types';

export const theLastApothecary: FullCampaign = {
  id: 'full-last-apothecary',
  type: 'full',
  title: 'The Last Apothecary',
  tagline: 'The cure exists. The price is what is killing people.',
  tone: 'political',
  themes: ['political', 'urban', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The Greywasting is a plague that liquefies the lungs over six weeks. It started in the Narrows - the poorest district of the city of Ashenmere - and it is spreading. The cure exists: Moonpetal Tincture, brewed from ingredients controlled exclusively by the five Noble Houses. They sell doses at 200 gold per vial. A laborer makes 2 gold a week. In the Narrows, an apothecary named Yara has synthesized the cure from common herbs - dock root, boiled willow, and cave moss. It works. It costs nothing. And the Noble Houses have put a bounty on her head.',
  hook: 'The party hears coughing before they see the Narrows. Grey-faced people line the streets. Children sit in doorways too tired to play. A halfling woman with herb-stained hands meets them at a barricade of overturned carts. "I am Yara. I can cure every person in this district for the cost of a day\'s foraging. The Houses want me dead because I proved their cure is not special. I do not need fighters. I need people who can get medicine to the dying while keeping me alive long enough to teach others how to make it."',
  twist:
    'Lord Caelen Ashworth, the most vocal opponent of Yara\'s cure, has been secretly funding her through an anonymous intermediary for months. His youngest daughter, Mira, has the Greywasting. The House physicians cannot help - they have been diluting their own cure to maximize profit, and the weakened doses do not work on severe cases. Yara\'s full-strength herbal cure is Mira\'s only chance. Caelen is trapped between his family\'s power structure and his child\'s life.',
  climax:
    'The Noble Houses send enforcers to burn the Narrows and destroy Yara\'s workshop. The party must defend the district, distribute the cure to as many as possible, and expose the Houses\' price-gouging in front of the city council. Caelen\'s secret comes out - his funding of Yara, his daughter\'s illness, the diluted doses. The Houses fracture. The question is not whether Yara wins but what victory costs: does the party burn the system down entirely (chaos, but freedom), reform it (slower, but stable), or cut a deal with the broken Houses (fastest cure distribution, but the powerful stay powerful)?',
  acts: [
    {
      title: 'Act 1: The Narrows',
      summary:
        'The party arrives in a district dying of a treatable disease. They meet Yara, learn the economics of the plague, and begin the work of distributing medicine while dodging House enforcers.',
      keyEvents: [
        'Entering the Narrows: the scale of the plague, the desperation, the coughing',
        'Yara\'s workshop: a cramped back room where she brews cure from weeds. It works.',
        'First House enforcer encounter: thugs sent to "quarantine" the Narrows - really to contain Yara',
        'The price list: learning that the Noble Houses have been selling the cure at 100x markup',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Supply Chain',
      summary:
        'Scaling the cure. The party builds a distribution network, trains others to brew the tincture, and fights the Houses on economic, political, and physical fronts. Someone is funding Yara anonymously. The trail leads somewhere uncomfortable.',
      keyEvents: [
        'Training herbalists across the city: Yara\'s recipe spreads despite House attempts to suppress it',
        'The Houses escalate: arson, bribery of city guards, a propaganda campaign calling Yara a witch',
        'Following the money: anonymous funding traced to Lord Caelen Ashworth',
        'Confronting Caelen: his daughter is dying, his own House\'s cure is diluted, he is terrified',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Reckoning',
      summary:
        'The Houses make their final move. The city council convenes. The truth about the diluted cure comes out. Ashenmere faces a choice about what kind of city it wants to be.',
      keyEvents: [
        'The Narrows burns: House enforcers set fires, the party defends the district',
        'City council: the party presents evidence of price-gouging and cure dilution',
        'Caelen\'s testimony: a noble lord admits his House has been killing people for profit',
        'The aftermath: rebuilding the Narrows, establishing public apothecaries, Yara teaching freely',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Yara',
      role: 'quest giver / ally',
      personality:
        'A halfling apothecary who talks to her plants and does not suffer fools. Brilliant, stubborn, and genuinely confused that anyone would let people die over money. "The cure grows in ditches. It is not rare. They just told you it was."',
    },
    {
      name: 'Lord Caelen Ashworth',
      role: 'conflicted antagonist',
      personality:
        'A noble who publicly condemns Yara while secretly keeping her alive. Not a good person - he built his fortune on the same system killing his daughter. But watching his child struggle to breathe has cracked something open.',
      secret: 'He knows the Houses diluted the cure. He helped design the pricing structure. His daughter\'s illness is the consequence of his own greed.',
    },
    {
      name: 'Lady Serath Kaine',
      role: 'primary antagonist',
      personality:
        'Head of the wealthiest Noble House. Cold, intelligent, and utterly convinced that the cure\'s high price is what funds the research that created it. She is wrong but she is not stupid - she believes the system works.',
      secret: 'She ordered the cure dilution personally to stretch supply and maximize revenue.',
    },
    {
      name: 'Mira Ashworth (age 9)',
      role: 'moral weight',
      personality:
        'A sick child who does not understand why medicine costs more than her father makes. She befriends Yara and asks questions that no adult can answer without lying. "If the medicine exists, why are people still coughing?"',
    },
  ],
  keyLocations: [
    {
      name: 'The Narrows',
      description: 'The poorest district in Ashenmere. Cramped streets, communal wells, washing lines between buildings. Currently a plague ward with no walls.',
      significance: 'Where the plague is worst and where the cure was born.',
    },
    {
      name: 'Yara\'s Workshop',
      description: 'A backroom behind a cobbler\'s shop. Drying herbs hang from every surface. A single cauldron. The most important room in the city.',
      significance: 'Where the free cure is made. The Houses want it destroyed.',
    },
    {
      name: 'The Council Chambers',
      description: 'A marble hall where the city\'s decisions are made. The Noble Houses have permanent seats. The Narrows has never been represented.',
      significance: 'Where the political climax plays out.',
    },
  ],
  dataSystems: [
    'factionReputation',
    'npcRelationshipWeb',
    'socialEncounter',
    'courtIntrigue',
    'moralDilemma',
    'encounterWaves',
    'diplomaticNegotiation',
    'partyMoraleTracker',
  ],
};
