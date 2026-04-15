import type { FullCampaign } from '../types';

export const theSmilingShadow: FullCampaign = {
  id: 'full-the-smiling-shadow',
  type: 'full',
  title: 'The Smiling Shadow',
  tagline: 'Dear Adventurers, I shall be attempting to kill you at 3pm on Tuesday. Please wear something nice.',
  tone: 'comedic',
  themes: ['comedy', 'mystery', 'urban'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'A string of cheerful city-states where everyone knows everyone and gossip travels faster than horses. Taverns are cozy, marketplaces are bustling, and a perfectly dressed elf keeps showing up at the same inns as the party, leaving little gift baskets of scented soaps and handwritten death threats on embossed stationery. His name is Velmaris. He is the most polite assassin in the world. He has never failed a contract. He considers the chase a courtship and the kill an act of respect.',
  hook: 'The party wakes up in their rooms at the Copper Kettle Inn to find a card slipped under each door. Cream-colored, wax-sealed, written in elegant calligraphy: "Dear Adventurers, it has come to my professional attention that one or more of you must die. I shall make my first attempt this Thursday at approximately sundown. I encourage you to be well-rested. There is nothing worse than dying tired. With warmest regards, Velmaris." Downstairs, the innkeeper mentions that "the lovely elf gentleman" already paid for their breakfast and left a bottle of wine with a note: "Something to take the edge off. -V"',
  twist:
    'Velmaris was hired by a future version of one of the party members. Decades from now, that party member does something catastrophic - the details vary depending on which member the DM selects, but the scale is always world-altering. The future self, consumed by regret, traveled back and hired the one assassin guaranteed to finish the job. Velmaris knows what the party member will do. He knows why the contract exists. He cannot tell them because client confidentiality is, in his words, "the bedrock of civilized murder." He genuinely respects the party. He genuinely intends to kill one of them. He sees no contradiction.',
  climax:
    'The party finally corners Velmaris - or rather, he allows himself to be cornered, because the chase has been "simply divine" and all good things must end. He reveals the contract: a future version of one party member hired him. He produces a temporal contract signed in blood that has not been spilled yet. The party must confront their possible future. They can let Velmaris finish the contract and prevent the catastrophe. They can break the contract by proving the future can be changed, which requires the targeted party member to make a binding oath that Velmaris considers credible. Or they can fight him, knowing he has never lost. He will be wearing his best suit for the occasion.',
  acts: [
    {
      title: 'Act 1: The Courtship',
      summary:
        'Velmaris introduces himself through a series of increasingly elaborate assassination attempts, each preceded by a polite card. He is charming, considerate, and terrifyingly good at his job. The party cannot figure out who hired him. Every town they flee to, he follows - booking a room at the same inn, complimenting their evasion techniques.',
      keyEvents: [
        'The first card: cream stationery, wax seal, a promise to kill them on Thursday at sundown',
        'Thursday sundown: a poisoned dessert course at a banquet the party did not know they were attending. Velmaris arranged the invitation.',
        'Second attempt: a collapsing bridge that was structurally sabotaged three days before the party arrived. Velmaris plans ahead.',
        'The party flees to Millhaven. Velmaris is already there, sipping tea at the inn. "I took the morning coach. Lovely ride."',
        'Gift basket outside their room: imported chocolates, a pressed flower, and a crossbow bolt with a ribbon on it',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Investigation',
      summary:
        'The party shifts from fleeing to investigating. Who hired Velmaris? Why? They dig into his history - legendary, spotless, weirdly admired by other assassins - and discover the contract involves temporal magic. Something about the future. Meanwhile, Velmaris keeps attempting to kill them with escalating creativity and unfailing manners.',
      keyEvents: [
        'An assassin guild contact reveals Velmaris has only one rule: he never takes a contract he considers unjust. If he accepted this one, he believes it is righteous.',
        'The party finds a temporal signature on the contract traces - whoever hired Velmaris has not been born yet, or rather, exists in a timeline that has not happened',
        'Velmaris sends a card apologizing for last Tuesday. "The exploding cake was perhaps excessive. I have spoken to my baker."',
        'A divination specialist confirms: the contract was signed by someone who shares a soul-signature with a current party member',
        'Velmaris joins the party for dinner uninvited. He is wonderful company. He picks up the check. He also poisoned the salt.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Reckoning',
      summary:
        'The party knows the truth: a future version of one of them hired Velmaris. They must decide what to do about it. Velmaris, ever the professional, gives them time to process. Then he sends the final card: the last attempt, the best he has, everything he has learned about them applied with lethal precision and genuine affection.',
      keyEvents: [
        'Velmaris reveals the contract details over tea. He is forthcoming about everything except the client\'s identity, which he considers confidential.',
        'The party member whose future self hired Velmaris must reckon with what they might become',
        'The final card: "Dear friends (and I do mean that), our time together has been the highlight of my career. Tomorrow at noon, I shall conclude our business. Dress formally. -V"',
        'The final confrontation: Velmaris in his best suit, every trick deployed, every weakness exploited, and a genuine smile on his face',
        'Resolution: the contract breaks, Velmaris yields, or someone dies. Velmaris accepts all outcomes with grace. "It has been an absolute pleasure."',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Velmaris',
      role: 'assassin / antagonist / involuntary comic relief',
      personality:
        'An elven assassin of legendary reputation who treats murder as a fine art and the chase as a social engagement. Impeccable manners, genuine warmth, encyclopedic knowledge of poisons and etiquette in equal measure. Sends thank-you cards after failed attempts. Considers rudeness a greater sin than homicide.',
      secret: 'He has been alive for six hundred years. The party is the first target he has genuinely enjoyed. He is not sure he wants to succeed anymore, but professionalism demands he try his absolute best.',
    },
    {
      name: 'Della Shortwick',
      role: 'innkeeper / unwitting accomplice',
      personality:
        'Runs the Copper Kettle, the party\'s first inn. Motherly, gossipy, thinks Velmaris is "such a lovely young man." Keeps accidentally giving him the party\'s room numbers because he asks so nicely.',
      secret: 'She has figured out he is an assassin. She has not told the party because he tips extremely well and she does not want to get involved.',
    },
    {
      name: 'Fetch',
      role: 'assassin guild contact / information source',
      personality:
        'A halfling who runs messages between assassins and clients. Nervous, twitchy, speaks entirely in euphemisms. Calls killing "completing paperwork." Respects Velmaris the way a journeyman respects a grandmaster.',
      secret: 'She has seen the contract. She knows it involves time magic. She is terrified because temporal contracts are supposed to be impossible, and Velmaris accepting one means something very bad is coming.',
    },
  ],
  keyLocations: [
    {
      name: 'The Copper Kettle Inn',
      description:
        'A warm, well-run inn at a crossroads town. Good food, soft beds, and an innkeeper who cannot keep a secret. The party keeps leaving. Velmaris keeps finding them here anyway.',
      significance: 'Recurring location. The party\'s reluctant home base and the site of at least three assassination attempts.',
    },
    {
      name: 'Millhaven',
      description:
        'A lakeside city famous for its fish market and its complete inability to keep strangers from finding each other. Everyone knows everyone. Privacy is a myth. Velmaris adores it.',
      significance: 'The town where the party realizes they cannot hide. Velmaris is always one step ahead because he does not need to track them - he just asks.',
    },
    {
      name: 'The Meridian Archive',
      description:
        'A library of temporal records maintained by a reclusive order of chronomancers. Dusty, cramped, staffed by people who speak in past tense about things that have not happened yet.',
      significance: 'Where the party confirms the temporal nature of the contract and begins to understand what their future holds.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'chaseSequence',
    'trapMechanism',
    'disguiseIdentity',
    'detectiveCase',
    'npcRelationshipWeb',
    'poisonBrew',
    'tavernEvent',
  ],
};
