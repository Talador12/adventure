import type { FullCampaign } from '../types';

export const theCelestialAuction: FullCampaign = {
  id: 'full-celestial-auction',
  type: 'full',
  title: 'The Celestial Auction',
  tagline: 'The gods are selling their failed experiments. Bidding starts at your soul.',
  tone: 'serious',
  themes: ['planar', 'intrigue', 'heist'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 7, end: 15 },
  estimatedSessions: 16,
  settingSummary:
    'Once every millennium, the gods gather at the Empyrean Exchange to auction divine artifacts, failed creations, and cosmic secrets. Mortals are invited for the first time in history—either as entertainment or because something has gone wrong among the divine. The party receives mysterious invitations with no return address.',
  hook: 'Each party member receives a gilded invitation to the Auction delivered by an angel who cannot speak, only bow. The invitation promises "one item of power sufficient to change your destiny" to whoever wins the final lot.',
  twist:
    'The final lot being auctioned is the party themselves—or rather, their collected potential futures. A rogue deity has gathered their possible destinies and is selling them to the highest bidder. Winning the auction means buying their own freedom.',
  climax:
    'The party must either outbid literal gods (impossible), steal their futures back during the Auction\'s chaos, or convince the other bidders that owning mortal potential is more trouble than it is worth.',
  acts: [
    {
      title: 'Act 1: The Empyrean Exchange',
      summary:
        'The party arrives at the Auction and navigates divine politics. They witness the sale of worlds, artifacts, and concepts. They learn the rules: anything can be bid, including abstract things like "three years of luck" or "the memory of your first love."',
      keyEvents: [
        'Arrival at the Exchange—a building that exists in all planes simultaneously',
        'Meeting other mortal guests, some helpful, some competitors',
        'First auctions: a forgotten god\'s portfolio, a cursed kingdom, a day that never happened',
        'Learning about the mysterious Final Lot that has gods whispering nervously',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Divine Games',
      summary:
        'Between auction sessions, the gods entertain themselves with games that use mortals as pieces. The party must survive these "amusements" while gathering intelligence about the Final Lot and finding potential allies among the divine attendees.',
      keyEvents: [
        'The Labyrinth of Fates—a maze where walls are possible futures',
        'The Court of Whispers—divine gossip reveals tensions between pantheons',
        'A secret meeting with a god who wants to help but cannot be seen doing so',
        'Discovering the Final Lot is sentient and trying to escape',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Final Lot',
      summary:
        'The Final Lot is revealed: the party\'s futures. The auction begins with bids from gods who want to use the party as agents, experiments, or entertainment. The party must act fast to disrupt the sale and reclaim their destinies.',
      keyEvents: [
        'The revelation—each party member sees their potential futures displayed like merchandise',
        'Desperate negotiations with sympathetic gods for temporary alliances',
        'The heist—stealing the vessel containing their futures during the chaos',
        'Escape from the Exchange as the divine attendees realize mortals have cheated them',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Auctioneer',
      role: 'neutral observer',
      personality:
        'An entity older than the gods, neither divine nor mortal. Speaks in transaction terms. Genuinely impartial—cares only that the Auction proceeds according to rules.',
    },
    {
      name: 'Lady Luck',
      role: 'potential ally',
      personality:
        'A goddess who finds the party amusing. Offers to help in exchange for a favor to be named later. Her help comes with ironic twists.',
      secret: 'She already knows how the Auction ends—she is betting on the party to disrupt it.',
    },
    {
      name: 'Lord Avarice',
      role: 'antagonist',
      personality:
        'A fallen god of wealth who collects mortal potential as others collect art. Views the party as particularly valuable acquisitions.',
    },
    {
      name: 'The Final Lot',
      role: 'ally / macguffin',
      personality:
        'The collective potential futures of the party, given temporary consciousness by the Auction\'s magic. Scared, defiant, eager to return to its owners.',
    },
  ],
  keyLocations: [
    {
      name: 'The Empyrean Exchange',
      description:
        'A structure that exists simultaneously on multiple planes. Each wing reflects the aesthetic of a different pantheon.',
      significance: 'The Auction venue and the campaign\'s primary setting.',
    },
    {
      name: 'The Gallery of Unwanted Things',
      description:
        'Where items are displayed before bidding. Contains everything from failed worlds to discarded emotions to imprisoned demons.',
      significance: 'Where the party first learns the scope of what is being sold.',
    },
    {
      name: 'The Bidding Hall',
      description:
        'The central chamber where the Auction occurs. Reality shifts to accommodate whatever is being sold.',
      significance: 'Site of the final confrontation and the party\'s escape.',
    },
  ],
  dataSystems: ['cursedAuction', 'planarMarketplace', 'diplomaticNegotiation', 'divineIntervention'],
};
