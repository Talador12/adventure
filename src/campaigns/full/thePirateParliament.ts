import type { FullCampaign } from '../types';

export const thePirateParliament: FullCampaign = {
  id: 'full-the-pirate-parliament',
  type: 'full',
  title: 'The Pirate Parliament',
  tagline: 'The most dangerous place in the world is not a battlefield. It is a room full of pirates trying to agree on something.',
  tone: 'political',
  themes: ['nautical', 'political', 'social'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 5, end: 10 },
  estimatedSessions: 12,
  settingSummary:
    'Freeport Isle sits at the intersection of three shipping lanes and belongs to no nation. Once a year, every pirate captain in the known seas sails here for the Parliament — a week-long assembly where the Code is debated, amended, and ratified. The Code is the only law pirates recognize: rules of engagement, division of plunder, treatment of prisoners, and the mutual defense pact that keeps the navies from wiping them out. Without the Code, piracy is just crime. With it, piracy is a nation without a flag.',
  hook: 'The party are delegates — either captains in their own right or representatives of a captain too paranoid to attend in person. They arrive at Freeport to find the Parliament in crisis: Captain Morwenna Blackwater has proposed abolishing the Code entirely. She claims it restricts pirate freedom. She has support. The vote is in six days. If the Code falls, pirate infighting will begin within the week.',
  twist:
    'Captain Blackwater is not a pirate. She is Admiral Vera Kastor of the Royal Navy, operating under deep cover for two years. Without the Code, the mutual defense pact collapses. Pirates fight each other instead of coordinating against the navy. Within a year, the navy picks them off one by one. The Code is not a chain — it is the only thing keeping piracy alive. Blackwater/Kastor is not destroying freedom. She is destroying the organization that makes freedom possible.',
  climax:
    'The final vote. The party has spent six days building alliances, breaking them, bribing, threatening, and debating. They stand before the full Parliament — two hundred captains in a hall that smells like rum and old grudges. If they expose Kastor, the Parliament unites but loses trust in its own vetting. If they defeat the motion politically, the Code survives but Kastor escapes to try again. If they let the vote happen without interference, democracy takes its course — even if democracy is wrong. Two hundred pirates. One vote. No take-backs.',
  acts: [
    {
      title: 'Act 1: Arrival',
      summary:
        'The party arrives at Freeport and navigates the opening ceremonies. Every captain has an agenda. The party must identify allies, enemies, and the undecided. The abolition motion is announced and the clock starts.',
      keyEvents: [
        'Docking at Freeport: a hundred ships in the harbor, flags from every sea',
        'The opening feast: rum, speeches, and a knife fight that is settled by parliamentary procedure',
        'Captain Blackwater\'s speech: charismatic, persuasive, and terrifyingly logical',
        'First vote count: the motion is closer than anyone expected. The party needs to move fast.',
        'Introduction to the faction leaders: the Traditionalists, the Free Sailors, the Merchant Pirates, and the Corsair Alliance',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: The Backroom',
      summary:
        'Pure political maneuvering. The party works the delegates: trading favors, making promises, exposing leverage, and occasionally solving problems with their fists. Every vote they flip has a cost.',
      keyEvents: [
        'A key swing vote captain is being blackmailed. The party must find and neutralize the leverage.',
        'Blackwater offers the party a deal: support abolition and she guarantees their fleet is untouched for a year',
        'A rival delegate sabotages the party\'s alliance by framing them for stealing from the treasury',
        'The party discovers Blackwater\'s quarters contain naval cipher documents. The cover begins to crack.',
        'A duel: a captain challenges the party to resolve a dispute the old way. Win the duel, win the vote.',
        'Backroom negotiations with the Corsair Alliance: they will support the Code for a price nobody wants to pay',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Vote',
      summary:
        'The final day. Last-minute deals, the exposure (or protection) of Blackwater\'s identity, and the vote itself. Two hundred pirates decide the future of piracy. The party\'s work comes down to a show of hands.',
      keyEvents: [
        'Dawn: final headcount. The vote is a coin flip.',
        'The party decides whether to expose Kastor publicly, confront her privately, or let the vote proceed',
        'Kastor makes her final pitch: passionate, clever, and almost convincing enough even knowing the truth',
        'The vote: pirates stand for or against. Ties are broken by combat. Parliamentary procedure was always going to end in a sword fight.',
        'Aftermath: the Code survives, or it does not. Either way, the Parliament sails out of Freeport into a changed world.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Captain Morwenna Blackwater / Admiral Vera Kastor',
      role: 'antagonist / deep cover operative',
      personality:
        'Plays the part of a passionate libertarian pirate so well that she has started believing it. Two years undercover changes a person. She is not entirely sure she wants to go back to the navy. But the mission is the mission.',
      secret: 'She has a naval extraction fleet waiting two days\' sail from Freeport. If exposed, she has an exit plan. If the vote fails, she disappears.',
    },
    {
      name: 'Old Mako',
      role: 'traditionalist leader / elder statesman',
      personality:
        'The oldest captain at Parliament. Missing an arm, an eye, and all patience for political games. He wrote half the current Code. He will defend it with his remaining hand if necessary. Speaks in nautical metaphors exclusively.',
    },
    {
      name: 'Captain Silk',
      role: 'swing vote / opportunist',
      personality:
        'A pirate who has gone semi-legitimate — running a shipping company that is only partially illegal. She will vote for whoever helps her business. No ideology. Just profit. Charming, honest about her dishonesty.',
    },
    {
      name: 'The Quartermaster',
      role: 'Parliament moderator / neutral party',
      personality:
        'Runs the Parliament sessions with an iron gavel. Has no vote. Has no side. Enforces procedure with absolute authority. The only person in the room every pirate respects.',
    },
  ],
  keyLocations: [
    {
      name: 'Freeport Isle',
      description:
        'A volcanic island with a natural harbor large enough for a fleet. The town is built from salvaged ships. Every building is a former vessel. The taverns never close during Parliament week.',
      significance: 'The only neutral ground in piracy. Where the Code is made and unmade.',
    },
    {
      name: 'The Parliament Hall',
      description:
        'The hull of a beached warship, converted into an assembly chamber. Benches carved from cannon carriages. The speaker\'s podium is the ship\'s wheel.',
      significance: 'Where every debate and vote takes place. The heart of pirate democracy.',
    },
    {
      name: 'The Back Rooms',
      description:
        'Taverns, storerooms, and hidden alcoves throughout Freeport where the real negotiations happen. More votes are decided over rum than rhetoric.',
      significance: 'Where the party does their actual work. The Parliament floor is theater. The back rooms are where laws are written.',
    },
  ],
  dataSystems: [
    'diplomaticNegotiation',
    'politicalIntrigue',
    'factionReputation',
    'socialEncounter',
    'npcRelationshipWeb',
    'navalCombat',
    'duel',
  ],
};
