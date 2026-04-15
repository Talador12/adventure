import type { OneShotCampaign } from '../types';

export const theLastBid: OneShotCampaign = {
  id: 'oneshot-last-bid',
  type: 'oneshot',
  title: 'The Last Bid',
  tagline: 'Infiltrate a black market auction run by a beholder. Each eye stalk watches a different bidder. Cheat anyway.',
  tone: 'heist',
  themes: ['heist', 'underdark', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 7,
  estimatedHours: 3,
  settingSummary:
    'The Beholder Xenthar runs the most exclusive black market auction in the Underdark. Ten eye stalks, each watching a different bidder. Antimagic cone pointed at the exit. No cheating is supposed to be possible. The party must attend, bid on a stolen artifact, and either win it legitimately (they cannot afford it) or cheat a beholder who can see in every direction at once.',
  hook: 'The handler briefs the party in a dimly lit cave: "Xenthar\'s auction. Once a year. The Starweave Amulet is Lot 12. It was stolen from our client. We cannot afford to outbid the other buyers. You must cheat. Yes, the auctioneer is a beholder. Yes, it can see everything. Find the blind spot."',
  twist: 'Xenthar knows the amulet is stolen and does not care - except that the original owner has put a bounty on it that exceeds its auction value. Xenthar plans to sell the amulet AND collect the bounty by identifying the buyer to the original owner. Every bidder is a target. Xenthar is playing everyone.',
  climax: 'Lot 12 is called. The bidding starts. The party\'s cheat must activate now - whatever they planned. Xenthar\'s eye stalks sweep the room. The other bidders are dangerous criminals who will kill for the amulet. The party must win the lot, survive the aftermath, and escape an Underdark cavern run by a paranoid beholder.',
  scenes: [
    {
      title: 'Scene 1: The Descent',
      summary: 'Reaching the auction in the Underdark. Getting credentials. Understanding the rules.',
      challenge: 'exploration',
      keyEvents: [
        'The invitation: forged, stolen, or earned through a favor - each has different risk levels',
        'The descent: three miles underground, past Xenthar\'s duergar guards',
        'The rules: no weapons, no magic within the auction chamber, disputes settled by Xenthar personally',
        'The other bidders: a drow matron, a mind flayer merchant, a fire giant arms dealer - serious competition',
      ],
    },
    {
      title: 'Scene 2: The Auction',
      summary: 'The auction is underway. Earlier lots sell while the party sets up their play for Lot 12.',
      challenge: 'social',
      keyEvents: [
        'The chamber: carved from obsidian, Xenthar floating at center, eye stalks sweeping constantly',
        'Studying the pattern: the eye stalks have a rhythm - brief gaps when they sweep past each other',
        'Setting the cheat: whatever the party planned - a decoy bidder, a rigged paddle, a distraction',
        'Pre-lot intelligence: the drow matron is the biggest competitor - she wants the amulet badly',
      ],
    },
    {
      title: 'Scene 3: Lot 12',
      summary: 'The amulet. The bidding. The cheat. The escape.',
      challenge: 'puzzle',
      keyEvents: [
        'The display: the Starweave Amulet, glowing softly, held aloft by a telekinetic eye stalk',
        'The bidding: opens at five thousand gold and climbs fast - the drow and the mind flayer are serious',
        'The cheat: the party\'s plan executes - success or failure depends on timing and execution',
        'The escape: auction won (or stolen), Xenthar suspicious, the exit is past the antimagic cone',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Xenthar', role: 'auctioneer / threat', personality: 'A beholder who runs an auction because it enjoys watching lesser beings compete. Paranoid, brilliant, and uses its eye stalks as the ultimate surveillance system. Considers cheating an insult punishable by disintegration.' },
    { name: 'Matron Zilith', role: 'rival bidder', personality: 'A drow matron who wants the amulet for political power. Wealthy, ruthless, and willing to kill the winning bidder after the auction if she loses the bid.' },
    { name: 'The Handler', role: 'quest giver', personality: 'A surface-world fixer who knows the Underdark well enough to be afraid of it. Provides the plan framework but the execution is entirely on the party.' },
  ],
  keyLocations: [
    { name: 'The Auction Chamber', description: 'A circular obsidian cavern deep in the Underdark. Xenthar floats at the center. Bidders sit in carved alcoves around the perimeter.', significance: 'Where the auction and the heist happen.' },
    { name: 'The Approach Tunnels', description: 'Three miles of Underdark tunnel patrolled by duergar. The only way in and out.', significance: 'The approach and the escape route.' },
    { name: 'The Holding Vault', description: 'Where auction items are stored before and after sale. Guarded by Xenthar\'s personal constructs.', significance: 'An alternative theft point if the auction cheat fails.' },
  ],
  dataSystems: ['heistPlanner', 'socialEncounter', 'encounterWaves', 'combatNarration'],
};
