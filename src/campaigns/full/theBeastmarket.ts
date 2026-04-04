import type { FullCampaign } from '../types';

export const theBeastmarket: FullCampaign = {
  id: 'full-beastmarket',
  type: 'full',
  title: 'The Beastmarket',
  tagline: 'Someone is selling monsters. The prices are too good. The buyers are worse.',
  tone: 'exploration',
  themes: ['exploration', 'intrigue', 'wilderness'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 15,
  settingSummary:
    'An illegal monster market has appeared in the wilderness — a vast bazaar where captured creatures from across the planes are sold to the highest bidder. Dragons, owlbears, beholders, and things without names — all for sale. The party discovers the market while tracking missing creatures from their region and must decide: shut it down, infiltrate it, or use it.',
  hook: 'Three owlbears vanish from the Silverwood in one night — no tracks, no signs of combat, just gone. The local druid circle hires the party to investigate. The trail leads to a hidden market deeper in the wilderness where a manticore is being auctioned to a laughing noble.',
  twist:
    'The market isn\'t just selling monsters — it\'s selling their essence. The creatures are being drained of their magical nature and sold as components for a mega-ritual. The drained husks are the "products." The real customer is a lich who needs enough raw magical essence to achieve apotheosis — becoming a god. Every creature sold brings the lich one step closer.',
  climax:
    'The party can shut down the market (freeing hundreds of captured creatures — chaos), infiltrate the supply chain to reach the lich, or turn the market\'s resources against the lich by rallying the captured monsters. The finale: a battle where freed monsters fight alongside the party against a near-divine lich.',
  acts: [
    {
      title: 'Act 1: The Hunt',
      summary:
        'Tracking missing creatures through the wilderness, discovering the market, and going undercover as buyers.',
      keyEvents: [
        'Investigation: missing creatures across the region — all magical',
        'Tracking through the deep wilderness using ranger/druid skills',
        'Discovery of the Beastmarket — a hidden bazaar in a canyon',
        'Going undercover: the party needs a cover story and gold to blend in',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Market',
      summary:
        'Infiltrating the Beastmarket, learning the supply chain, discovering the essence-draining operation, and meeting the diverse cast of buyers and sellers.',
      keyEvents: [
        'The market: stalls selling everything from pseudodragons to juvenile hydras',
        'The VIP section: rare creatures, higher prices, shadier clientele',
        'Discovery of the draining operation — husks of once-magical creatures',
        'The lich\'s agents are buying in bulk — the party pieces together the plan',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Liberation',
      summary:
        'The party makes their move. Freeing the monsters, tracking the essence to the lich, and the final confrontation — with unexpected monster allies.',
      keyEvents: [
        'Mass cage-break — hundreds of monsters freed simultaneously (controlled chaos)',
        'Tracking the essence shipment to the lich\'s sanctum',
        'Freed monsters follow the party — an army of grateful creatures',
        'The lich confrontation: near-divine power vs. a party backed by every monster they saved',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Ringmaster',
      role: 'market leader / complex villain',
      personality:
        'A charismatic gnome who runs the Beastmarket with showman flair. Not evil by nature — sees creatures as merchandise. Can be turned if the party convinces him the lich will destroy everything.',
      secret: 'He started the market to pay off a debt to the lich. He\'s trapped. He\'d shut it down if he could.',
    },
    {
      name: 'Thorn',
      role: 'druid ally / moral compass',
      personality:
        'A druid who has been working undercover in the market as a "creature handler." Furious, disciplined, and counting the days until she can burn it all down.',
    },
    {
      name: 'The Collector',
      role: 'lich / true antagonist',
      personality:
        'A lich who has spent centuries preparing for apotheosis. Patient, brilliant, and completely willing to drain every magical creature on the continent to become a god.',
    },
    {
      name: 'Rex',
      role: 'captured creature / ally',
      personality:
        'An awakened dire wolf captured by the market. Can speak Common badly. Leads the captive creatures. "Free us. We fight. Together strong."',
    },
  ],
  keyLocations: [
    {
      name: 'The Beastmarket',
      description: 'A hidden canyon bazaar lit by caged fire elementals. Hundreds of creatures in enchanted pens. The smell is memorable.',
      significance: 'The primary setting for Acts 1-2.',
    },
    {
      name: 'The Draining Pits',
      description: 'Below the market — where creatures\' magical essence is extracted and bottled. Clinical, horrifying, and well-guarded.',
      significance: 'Where the true horror is discovered.',
    },
    {
      name: 'The Collector\'s Sanctum',
      description: 'A hidden tower where thousands of essence bottles line the walls, each glowing faintly with stolen magic.',
      significance: 'The final confrontation location.',
    },
  ],
  dataSystems: [
    'monsterEcology',
    'monsterHarvesting',
    'merchantCaravan',
    'heistPlanner',
    'encounterWaves',
    'companionAnimal',
    'factionReputation',
    'wildernessLandmarks',
    'encounterBudget',
  ],
};
