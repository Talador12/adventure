import type { OneShotCampaign } from '../types';

export const theCouncilSeat: OneShotCampaign = {
  id: 'oneshot-council-seat',
  type: 'oneshot',
  title: 'The Council Seat',
  tagline: 'An orc is running for city council. First non-human candidate ever. You are the campaign team.',
  tone: 'political',
  themes: ['political', 'social', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'Grotha Ironfist, a half-orc blacksmith, is running for city council in Whitehall. She would be the first non-human council member in the city\'s history. She has grassroots support but zero political infrastructure. Her opponent is a popular human merchant backed by old money. The party is her campaign team for the final three days before the election.',
  hook: 'Grotha lays it out: "I know metal, not politics. I know what this neighborhood needs - better roads, fair wages, clean water. My opponent knows how to shake hands and make promises. I need people who can turn good ideas into votes. Three days. Can you do it?"',
  twist: 'Grotha\'s opponent, Alderman Fenn, is not running against her policies. He is secretly funding a "concerned citizens" group that spreads fear about non-humans in government. The leaflets, the whisper campaigns, the vandalism at Grotha\'s blacksmith shop - all traceable to Fenn\'s money through a cutout. He is running on prejudice while keeping his hands clean.',
  climax: 'Election eve debate in the city square. Grotha vs. Fenn in front of the whole neighborhood. The party has evidence of Fenn\'s fear campaign. The question: expose him publicly (risky, might look like a political attack) or let Grotha win on her own merits (harder, but more legitimate). Either way, Grotha has to stand on that stage and be better than the fear.',
  scenes: [
    {
      title: 'Scene 1: The Campaign',
      summary: 'Building Grotha\'s campaign from scratch. Door-knocking, message crafting, dealing with hostility and hope in equal measure.',
      challenge: 'social',
      keyEvents: [
        'Door to door: some people are enthusiastic, some are hostile, most are skeptical',
        'The message: Grotha is good on policy but struggles to connect emotionally in speeches',
        'Volunteer recruitment: finding supporters willing to publicly back a non-human candidate',
        'The opposition: anonymous leaflets appear overnight - "Keep Whitehall Human"',
      ],
    },
    {
      title: 'Scene 2: The Dirty Tricks',
      summary: 'Investigating the fear campaign while keeping the candidate on track.',
      challenge: 'exploration',
      keyEvents: [
        'Vandalism: Grotha\'s blacksmith shop is spray-painted with slurs - she wants to respond with rage',
        'The leaflets: professional printing, expensive paper - not a grassroots effort',
        'Following the money: the print shop, the payment, the intermediary, and Fenn\'s fingerprints',
        'The choice: go public with the evidence now or save it for the debate',
      ],
    },
    {
      title: 'Scene 3: The Debate',
      summary: 'Election eve. The whole neighborhood watches. Grotha must prove she belongs on that stage.',
      challenge: 'social',
      keyEvents: [
        'Fenn\'s opening: polished, warm, full of dog whistles about "traditional values"',
        'Grotha\'s opening: rough, honest, powerful - if the party coached her well',
        'The questions: from citizens about roads, taxes, safety - and one about "whether a non-human can represent human interests"',
        'The moment: Grotha answers the prejudice question - and the crowd decides who they trust',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Grotha Ironfist', role: 'the candidate', personality: 'A half-orc blacksmith who is better with a hammer than words. Honest to a fault, bad at politics, and exactly what the neighborhood needs. Gets frustrated by how much campaigning is performance.' },
    { name: 'Alderman Fenn', role: 'opponent', personality: 'A human merchant who has served on the council for eight years. Smooth, experienced, and willing to stoke racial fear through proxies while keeping his own speech clean and reasonable.', secret: 'He knows Grotha\'s platform is better. He is running on identity because he cannot run on policy.' },
    { name: 'Pip Weaver', role: 'volunteer coordinator', personality: 'A halfling community organizer who has been waiting years for a candidate like Grotha. Energetic, connected, knows every family in the neighborhood.' },
  ],
  keyLocations: [
    { name: 'Grotha\'s Blacksmith Shop', description: 'A working forge that doubles as campaign headquarters. Iron tools on one wall, campaign posters on the other. Smells like coal and coffee.', significance: 'Campaign HQ and a target for vandalism.' },
    { name: 'The City Square', description: 'A cobblestone plaza where the debate stage is being built. Lanterns strung between buildings. The whole neighborhood will be here.', significance: 'Where the debate and the campaign\'s climax happen.' },
    { name: 'The District Streets', description: 'Working-class blocks where every door is a potential vote and every conversation matters.', significance: 'Where the ground game happens.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
