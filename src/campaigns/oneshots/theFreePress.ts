import type { OneShotCampaign } from '../types';

export const theFreePress: OneShotCampaign = {
  id: 'oneshot-free-press',
  type: 'oneshot',
  title: 'The Free Press',
  tagline: 'The presses run at midnight. The mayor\'s man buys the building at dawn. Print the story or lose it forever.',
  tone: 'political',
  themes: ['political', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The Broadstone Gazette is the only independent newspaper in the city. It has been exposing corruption for forty years. Now its elderly owner is selling, and the only buyer is Merrick Thorne - the mayor\'s business partner. If Thorne buys the paper, the Gazette becomes a propaganda machine. The party has two days to find an alternative buyer, protect the journalists, and keep the presses running.',
  hook: 'Editor Laine Reed slaps the morning edition on the table: "We print the truth. In two days, Merrick Thorne owns this building, these presses, and decides what truth looks like. Our owner is selling because she is 80 and tired. I need someone to find another buyer, protect our sources, and make sure tomorrow\'s edition goes out with the story Thorne does not want printed."',
  twist: 'The story the Gazette is about to print involves Mayor Crossley\'s secret land deals - buying property along a planned road before the route is announced. Thorne\'s purchase of the paper is not about controlling media in general. It is about killing this specific story before it prints. If the story runs before the sale closes, Thorne has no reason to buy.',
  climax: 'The print run. Thorne\'s people arrive to "inspect the property" - really to stop the presses. The party must defend the printing house, get the edition out the door, and distribute it before Thorne\'s lawyers can file an injunction. Once the paper hits the streets, the story is public and the purchase becomes politically toxic.',
  scenes: [
    {
      title: 'Scene 1: The Newsroom',
      summary: 'Understanding the stakes, the story, and the deadline. The party joins the newsroom for the most important edition in forty years.',
      challenge: 'social',
      keyEvents: [
        'The Gazette: a cramped newsroom full of passionate journalists and a printing press older than the building',
        'The story: Mayor Crossley\'s land deals, documented with public records and insider sources',
        'The sale: Thorne\'s offer is generous - the owner, Madam Elara, needs the money for her retirement',
        'Alternative buyers: the party must find someone willing to buy a newspaper that makes enemies',
      ],
    },
    {
      title: 'Scene 2: The Search',
      summary: 'Finding a buyer while protecting the story. Thorne\'s people are watching.',
      challenge: 'exploration',
      keyEvents: [
        'Potential buyers: a merchant guild (wants editorial control), a collective of journalists (no money), a wealthy philanthropist (out of town)',
        'Thorne\'s pressure: his lawyer visits Madam Elara with a sweetened offer and a veiled threat',
        'Protecting sources: someone is following the Gazette\'s lead journalist - the party runs interference',
        'The deal: convincing someone to buy a newspaper that will immediately anger the mayor',
      ],
    },
    {
      title: 'Scene 3: The Print Run',
      summary: 'The presses roll. Thorne tries to stop them. The story hits the streets or it does not.',
      challenge: 'combat',
      keyEvents: [
        'The print: the press starts, the story runs, copies stack up',
        'Thorne\'s "inspectors": hired muscle posing as property assessors, here to stop the print',
        'The defense: the party holds the printing house while the edition runs',
        'Distribution: getting bundles of papers to every newsstand, tavern, and street corner before dawn',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Editor Laine Reed', role: 'ally', personality: 'Talks in headlines. "Corruption exposed. Mayor denies. Citizens demand answers." Every conversation sounds like she is dictating copy. Chain-smokes when stressed, which is always. Assigns tasks like she is running a newsroom - because she is.' },
    { name: 'Merrick Thorne', role: 'antagonist', personality: 'Speaks softly and slowly, like every word costs money. Never threatens directly - implies. "I would hate for Madam Elara to face legal complications during the sale." Smiles with his mouth only.', secret: 'He has already promised the mayor the story will never run.' },
    { name: 'Madam Elara', role: 'owner', personality: 'Calls the printing press "she." Touches the walls of the building as she walks through it. Starts sentences about the future and trails off. "When I am gone, the Gazette will..." Needs someone to finish that sentence for her.' },
  ],
  keyLocations: [
    { name: 'The Broadstone Gazette', description: 'A three-story building with a newsroom on top, offices in the middle, and a printing press in the basement. Ink-stained, noisy, alive.', significance: 'The heart of the operation and the site of the final defense.' },
    { name: 'The Mayor\'s Office', description: 'City hall, polished and powerful. The land deal documents are in the public records room if you know where to look.', significance: 'Where the corruption evidence is confirmed.' },
    { name: 'The Streets of Broadstone', description: 'The city at dawn, where newsboys and runners distribute the paper to every corner. If the edition reaches the streets, the truth is out.', significance: 'The final delivery route.' },
  ],
  dataSystems: ['socialEncounter', 'encounterWaves', 'combatNarration', 'chaseSequence'],
};
