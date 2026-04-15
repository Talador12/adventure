import type { FullCampaign } from '../types';

export const theLastLongship: FullCampaign = {
  id: 'full-the-last-longship',
  type: 'full',
  title: 'The Last Longship',
  tagline: 'The homeland is ash. The sea is all that remains. Find new land or die on the water.',
  tone: 'survival',
  themes: ['nautical', 'war', 'wilderness'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 18,
  settingSummary:
    'The Ashborn Coast is gone. An army from the south burned every hall, salted every field, and broke every shield wall the clans could muster. What remains is one longship - the Stormtooth - sixty survivors, a hold full of desperate hope, and an ocean that does not care. The party must navigate by raven and star, ration dwindling supplies, decide whether to raid foreign shores for food, and find a land worth dying to defend. Every island is a gamble. Every storm is a funeral.',
  hook: 'The Stormtooth launches at dawn with smoke still rising from the last hall. The elder navigator is dead. The captain hands the party a carved bone compass that points to nothing they recognize and says: "My grandmother said there is land beyond the Shattered Reach. She also said the sea would kill us before we got there. Prove her half wrong."',
  twist:
    'After weeks of sailing, the party finds land - green, fertile, defensible. But it is already settled. The people there speak a dialect of the party\'s own language, wear the same knotwork patterns, and worship the same gods under older names. They are the Firstborn - ancestors who made this same desperate voyage a thousand years ago and forgot where they came from. They do not want visitors. History is repeating itself, and the party must decide: take the land by force (becoming the invaders they fled), negotiate a place among kin who do not remember them, or sail on into the unknown.',
  climax:
    'A storm drives both peoples into the same sheltered bay. The Firstborn and the Ashborn must cooperate to survive a three-day gale that threatens to destroy both settlements. In the aftermath, the party brokers a peace - or a war. The final session is the founding of a new hall, built from timbers of the Stormtooth, on land shared or conquered.',
  acts: [
    {
      title: 'Act 1: The Burning Shore',
      summary: 'Departure, grief, and the first weeks at sea. The party learns to lead, ration, and navigate while holding sixty traumatized survivors together.',
      keyEvents: [
        'The launch: choosing what to bring (weapons or seeds, warriors or children)',
        'First storm: the Stormtooth nearly capsizes. Someone does not make it.',
        'Raven navigation: releasing ravens to find land, reading wind and current',
        'A moral choice: a merchant vessel with food. Do you trade, beg, or raid?',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: Islands of the Desperate',
      summary: 'Island-hopping through the Shattered Reach. Each session is a new shore - some hostile, some strange, all dangerous. Supplies shrink. Morale fractures.',
      keyEvents: [
        'The volcanic island: fresh water but the ground shakes and the locals worship the mountain',
        'The raider port: a lawless haven of exiles. Cheap supplies, expensive debts.',
        'Mutiny threat: a faction wants to settle on the next passable island and stop risking the sea',
        'The bone compass activates: it points west with purpose for the first time',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Firstborn',
      summary: 'Landfall on the green shore. Discovery of the Firstborn. Negotiation, cultural collision, and the founding of a new home - however that looks.',
      keyEvents: [
        'First contact: hunters find the party on the beach. They speak an old version of the same tongue.',
        'The Firstborn council: suspicious elders, curious youth. The party pleads their case.',
        'The storm: forces cooperation between both peoples. Shared survival builds trust or exposes cracks.',
        'The founding: a new hall is built. The Stormtooth is dismantled for timber. A new saga begins.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Sigrid Ashborn',
      role: 'ship captain / leader',
      personality: 'A shield-maiden who lost her family in the burning. She leads because no one else will. Quiet, decisive, and haunted. She speaks to her dead husband at the prow when she thinks no one is listening.',
    },
    {
      name: 'Ulf the Skald',
      role: 'navigator / morale keeper',
      personality: 'An old poet who keeps the survivors\' spirits alive with songs of the homeland. His memory is fading and he knows it. The bone compass was his mother\'s.',
      secret: 'He has been to the Firstborn shore before, as a child. He remembers fragments but is not certain they are real.',
    },
    {
      name: 'Revna Firstborn',
      role: 'Firstborn elder / gatekeeper',
      personality: 'The Firstborn\'s chief speaker. She sees the Ashborn as invaders wearing familiar faces. Her caution is not cruelty - her people fought their own wars to earn this land.',
    },
    {
      name: 'Kettil Redhands',
      role: 'warrior / mutiny risk',
      personality: 'A young berserker who wants to fight for everything. Loyal but impatient. He will follow strength and question anything that looks like weakness.',
    },
  ],
  keyLocations: [
    { name: 'The Stormtooth', description: 'A battered longship with a carved wolf prow. Home, prison, and the last piece of the homeland. Every plank has a name carved into it - the dead.', significance: 'The entire first two acts take place on or near this ship.' },
    { name: 'The Shattered Reach', description: 'An archipelago of volcanic islands, reef-ringed atolls, and fog-shrouded rocks. Each island is its own encounter.', significance: 'The exploration sandbox of Act 2. Each island is a session.' },
    { name: 'Greenshore', description: 'A fertile coastline backed by old-growth forest and defensible cliffs. The Firstborn have farmed it for a thousand years.', significance: 'The promised land - and the site of the campaign\'s final conflict or peace.' },
  ],
  dataSystems: ['wildernessSurvival', 'navalCombat', 'shipCargo', 'socialEncounter', 'npcRelationshipWeb', 'weatherEncounterInteraction', 'naturalDisaster', 'partyMoraleTracker'],
};
