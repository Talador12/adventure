import type { FullCampaign } from '../types';

export const theLongCon: FullCampaign = {
  id: 'full-long-con',
  type: 'full',
  title: 'The Long Con',
  tagline: 'You are running a con. He knows. He is running one too. May the best liar win.',
  tone: 'heist',
  themes: ['heist', 'intrigue', 'social'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The free city of Pallara runs on trade, influence, and the polite fiction that everyone is honest. Merchant Prince Dorian Kael has built his fortune on the backs of indentured servants, rigged contracts, and strategic blackmail. The law cannot touch him because he writes the law. A consortium of wronged merchants has hired the party to destroy him the only way that works: take his money by making him give it to them willingly. The party must pose as foreign dignitaries from the fictitious Principality of Saravane, selling a trade agreement worth millions that does not exist.',
  hook: 'A halfling named Fig lays it out over expensive wine she cannot afford: "Dorian Kael has ruined every merchant in this room. Lawsuits do not work. Assassins do not work. He is too smart, too connected, too rich. But he has one weakness: greed. We need you to become the Saravanian Trade Delegation, offer him a deal too good to refuse, and walk away with his fortune. Every session, we build a deeper layer. By the end, he will thank you for robbing him."',
  twist:
    'Dorian Kael recognized the con on day one. He has been playing along because the party\'s scheme aligns with something he actually wants - a reason to move his assets out of Pallara before a political coup he knows is coming. He is running his own counter-con: using the fake trade deal as cover to liquidate his empire and disappear, leaving his creditors and enemies holding nothing. The party is not conning him. He is laundering through them.',
  climax:
    'The final signing ceremony. The party prepared for a clean exit with Kael\'s money. Instead, Kael reveals he has been ahead of them the entire time - and offers a deal. His counter-con is almost complete. The party can either expose him (saving Pallara but losing the money they promised the consortium), join him (take a cut and let him escape with everything), or outplay both sides (use what they know about his plan to force a real negotiation where the consortium gets something and Kael gets his exit, but nobody gets everything they wanted).',
  acts: [
    {
      title: 'Act 1: The Setup',
      summary:
        'Building the con. The party creates the fictitious Principality of Saravane, fabricates credentials, and makes first contact with Kael. Each session adds a layer - a fake embassy, forged trade goods, planted rumors in merchant circles.',
      keyEvents: [
        'Fig\'s briefing: Kael\'s weaknesses, the plan structure, the roles each party member plays',
        'Creating Saravane: fake history, fake ambassadors, fake trade goods, fake accents',
        'First meeting with Kael - charm, wine, careful lies. He is interested.',
        'The first test: Kael sends someone to verify Saravane exists. The party must make it real.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Build',
      summary:
        'Deepening the con while Kael deepens his. The party negotiates the fake trade deal, navigates Pallaran high society, and begins to notice that Kael is a little too cooperative. Something is wrong.',
      keyEvents: [
        'The gala: the party as foreign dignitaries among Pallara\'s elite. One wrong word ends everything.',
        'Kael\'s background check comes back clean - because he made it come back clean. Why?',
        'A rival con artist recognizes one of the party members and threatens to expose them',
        'The party catches Kael moving assets in ways that only make sense if he knows the deal is fake',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Take',
      summary:
        'The signing. The reveal. The counter-reveal. A three-way chess match where everyone knows everyone is lying and the question is who lies best.',
      keyEvents: [
        'Kael reveals he has known since session one - and he has been using them as cover',
        'The counter-con exposed: Kael is liquidating everything and leaving Pallara to burn',
        'The political coup Kael predicted begins early - the city is in chaos',
        'The final negotiation: a room, three sides, and a deal that costs everyone something',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Merchant Prince Dorian Kael',
      role: 'target / counter-antagonist',
      personality:
        'Brilliant, patient, and genuinely enjoys the game more than the money. Treats the party\'s con as the most entertaining thing that has happened to him in years. He is not angry they tried to rob him. He is delighted someone finally matched him.',
      secret: 'He built his empire from nothing after his own family was destroyed by the previous merchant princes. His cruelty is learned, not innate.',
    },
    {
      name: 'Fig',
      role: 'quest giver / handler',
      personality:
        'A halfling con artist who has run schemes across six kingdoms. Quick-talking, nervous, brilliant at fabrication. She has never targeted someone this dangerous before and it shows.',
      secret: 'She owes Kael personally. He ruined her parents\' merchant business. This is revenge dressed as a job.',
    },
    {
      name: 'Silvaine (Kael\'s spymaster)',
      role: 'antagonist / information broker',
      personality:
        'Kael\'s eyes and ears. Knows the con is fake, knows his boss knows. Enjoys watching the party squirm. A professional who respects other professionals.',
    },
    {
      name: 'Consortium Representative Aldara',
      role: 'patron / moral compass',
      personality:
        'A merchant Kael destroyed. She represents the consortium funding this con. Principled, impatient, expects results. If the party cuts a deal with Kael, she will never forgive them.',
    },
  ],
  keyLocations: [
    {
      name: 'The Saravanian Embassy (fake)',
      description: 'A rented townhouse the party converted into a convincing foreign embassy. Fake crests, forged documents, and an increasingly elaborate backstory.',
      significance: 'The center of the con. If anyone looks too hard, it all falls apart.',
    },
    {
      name: 'Kael\'s Palazzo',
      description: 'A waterfront mansion filled with art, wealth, and information. Every room is beautiful and every room is monitored.',
      significance: 'Where negotiations happen. Kael\'s home turf and his surveillance network.',
    },
    {
      name: 'The Pallaran Exchange',
      description: 'The trade floor where fortunes change hands in minutes. Loud, chaotic, and where the final signing is staged.',
      significance: 'Where the con ends, one way or another.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'socialEncounter',
    'npcRelationshipWeb',
    'courtIntrigue',
    'merchantHaggling',
    'factionReputation',
    'detectiveCase',
    'diplomaticNegotiation',
  ],
};
