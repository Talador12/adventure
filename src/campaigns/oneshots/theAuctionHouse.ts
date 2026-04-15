import type { OneShotCampaign } from '../types';

export const theAuctionHouse: OneShotCampaign = {
  id: 'oneshot-auction-house',
  type: 'oneshot',
  title: 'The Auction House',
  tagline: 'Lot 47 is a dead woman\'s necklace. Starting bid: ten thousand gold. You have twelve. Steal it before the hammer falls.',
  tone: 'heist',
  themes: ['heist', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A stolen family heirloom - a sapphire pendant with sentimental and magical value - is being auctioned at the prestigious Gilded Gavel auction house. The rightful owner cannot afford to bid. The party must steal the pendant during the auction itself: while it is being shown, while bidders compete, and while security watches every hand in the room.',
  hook: 'The old woman holds a faded portrait showing the pendant around her daughter\'s neck: "That necklace was taken when our village was sacked. Now it is \'Lot 47\' at the Gilded Gavel. They will sell my daughter\'s memory to the highest bidder tomorrow night. I have twelve gold. The starting bid is ten thousand. Please."',
  twist: 'The auctioneer, Madame Sable, knows the pendant is stolen goods. She knows about every stolen item in her auction. She runs the Gilded Gavel as a laundering operation for thieves\' guilds across the continent. If the party exposes this, every lot in the auction is evidence - and the bidders become witnesses to a criminal enterprise.',
  climax: 'Lot 47 is called. The pendant is displayed on stage under a glass dome and magical ward. The bidding begins. The party must steal it during the showing, the bidding, or the handoff to the winning bidder. Each moment has different security and different risks. The clock is the auctioneer\'s hammer.',
  scenes: [
    {
      title: 'Scene 1: Registration',
      summary: 'Getting into the auction. It is invitation-only. The party needs credentials, covers, and a plan.',
      challenge: 'social',
      keyEvents: [
        'The guest list: wealthy merchants, noble collectors, and suspected criminals - all by invitation',
        'Fake identities: forged invitations, borrowed names, or a genuine invite from a sympathetic collector',
        'The venue: a grand hall with a stage, display cases, and security that rivals a royal guard',
        'Casing: where the items are stored before showing, the stage layout, and the exits',
      ],
    },
    {
      title: 'Scene 2: The Auction Floor',
      summary: 'The auction begins. Earlier lots sell while the party positions for Lot 47. Security patterns become clear.',
      challenge: 'exploration',
      keyEvents: [
        'The rhythm: items displayed, bid, sold, removed to a secure room in the back',
        'Security: guards at every door, a mage scanning for enchantments, and Sable\'s personal bodyguard',
        'The back room: where purchased items are held for pickup - an alternative theft point',
        'The discovery: a ledger in Sable\'s office linking auction items to theft reports across the region',
      ],
    },
    {
      title: 'Scene 3: Lot 47',
      summary: 'The pendant is on stage. The bidding starts. The party acts.',
      challenge: 'puzzle',
      keyEvents: [
        'The display: glass dome, magical ward, spotlight - every eye in the room is on it',
        'The bidding: starting at ten thousand, climbing fast - the party cannot outbid',
        'The steal: during display (hardest, most public), during bidding (risky), or during handoff (last chance)',
        'The escape: with the pendant, through a room full of people who just watched it disappear',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Grandmother Elara', role: 'quest giver', personality: 'Holds the faded portrait with both hands at all times. When she describes the pendant, she touches her own neck where it used to hang. Does not ask the party to steal - asks them to "bring her daughter home." Offers her twelve gold like it is a fortune, because to her it is.' },
    { name: 'Madame Sable', role: 'auctioneer / criminal', personality: 'Describes stolen goods with the reverence of a museum curator. "Provenance: acquired." Never says "stolen." Wears gloves at all times. Her voice drops half a register when she senses a lie. She does not run an auction house - she runs a laundry.', secret: 'She fences stolen goods for three thieves\' guilds and launders the money through legitimate auction sales.' },
    { name: 'Bidder Nine', role: 'rival', personality: 'Bids by raising one finger. Never speaks. Wears a porcelain mask that shows no expression. Their bodyguard does all the talking, and what the bodyguard says is: "My employer is not accustomed to losing."' },
  ],
  keyLocations: [
    { name: 'The Gilded Gavel', description: 'An opulent auction house with velvet ropes, crystal chandeliers, and more security than a bank. Every surface gleams.', significance: 'The heist location.' },
    { name: 'The Display Stage', description: 'An elevated platform with magical lighting and a warded glass dome for showing high-value items.', significance: 'Where Lot 47 is displayed and the primary theft window.' },
    { name: 'The Secure Room', description: 'A back room where purchased items wait for buyer pickup. Locked, guarded, and the secondary theft window.', significance: 'The last chance to grab the pendant after sale.' },
  ],
  dataSystems: ['heistPlanner', 'socialEncounter', 'trapDisarm'],
};
