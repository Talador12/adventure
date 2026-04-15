import type { FullCampaign } from '../types';

export const theDeadCalm: FullCampaign = {
  id: 'full-the-dead-calm',
  type: 'full',
  title: 'The Dead Calm',
  tagline: 'No wind. No current. No magic works to move the ship. Something circles below.',
  tone: 'survival',
  themes: ['survival', 'nautical', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 13,
  settingSummary:
    'The merchant vessel Ardent Star crossed into a patch of ocean where nothing moves. The wind stopped. The current died. The tide does not rise or fall. Magic that creates wind fizzles. Oars push through water that feels thick, almost reluctant. Supplies are calculated in days. The crew of thirty is one missed meal from mutiny. And something large is circling the ship just below the waterline - visible only as a shadow that never surfaces. The party must keep the crew alive, keep them sane, and figure out why this patch of ocean is dead.',
  hook: 'Day three of no wind. The captain is calm. Day five, she is less calm. Day seven, she gathers the party: "The water is wrong. My navigation magic returns nothing. The compass spins. We have food for fifteen days and we are not moving. I need you to fix this or we all die out here." Below deck, a sailor has scratched a name into the wood a thousand times: MARETHAN. He does not remember doing it.',
  twist:
    'The ship crossed into a dead god\'s domain. Marethan, a sea god, died in this spot centuries ago. When a god dies, the divine energy does not disappear - it stagnates. The wind stopped because Marethan was the wind. The current died because Marethan was the current. The thing circling the ship is Marethan\'s last faithful - a leviathan that has been waiting for centuries for someone to give its god a proper burial. The only way to restart the wind is to send Marethan\'s remains to the bottom of the sea with the correct rites.',
  climax:
    'The funeral. The party must gather what remains of Marethan - his essence is scattered through the dead water, visible as faint phosphorescence, audible as a low moan on windless nights. They must assemble the essence, perform a funeral rite pieced together from fragments of maritime tradition, and lower it to the deep. The leviathan serves as pallbearer. When Marethan is buried, the wind returns all at once - a gale that nearly capsizes the ship. The ocean is alive again.',
  acts: [
    {
      title: 'Act 1: Becalmed',
      summary: 'The first week without wind. Crew tensions, rationing, and the growing awareness that this is not natural.',
      keyEvents: [
        'Day 7: the captain\'s briefing. The party takes charge of crisis management.',
        'Rationing begins. The cook calculates: 15 days of food, 10 of fresh water.',
        'The shadow beneath the ship: something enormous that never surfaces, never attacks, just circles',
        'A sailor goes overboard at night. He says the water called to him. He cannot explain how.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Domain',
      summary: 'Investigation, deterioration, and the discovery that they are stranded in a dead god\'s grave.',
      keyEvents: [
        'The water itself is the clue: faintly luminous at night, warm in spots, cold in others. A pattern.',
        'A diving expedition: beneath the ship, the ocean floor is covered in temples, coral-encrusted shrines to a forgotten god',
        'Crew mutiny attempt: a faction wants to take the longboat and row. The party must handle it.',
        'The name MARETHAN appears everywhere: carved into the hull, whispered in dreams, spelled out by phosphorescent algae',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Funeral',
      summary: 'Gathering the god\'s essence, performing the rites, and burying a deity to free the sea.',
      keyEvents: [
        'The essence: scattered pieces of divine presence that must be gathered from the water, the air, and the crew\'s dreams',
        'The rite: pieced together from the ship\'s library, sailor folklore, and the leviathan\'s behavior (it shows them how)',
        'The lowering: Marethan\'s essence placed in a vessel and sent to the deep. The leviathan carries it down.',
        'The wind returns. A storm. The crew fights to survive the sudden gale. Then: blue sky, fair wind, and a sea that moves.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Captain Thessaly',
      role: 'ship captain / authority figure',
      personality: 'A veteran sailor who has survived storms, pirates, and sea monsters. She has never faced calm. It terrifies her more than any storm. "A storm you can fight. A calm just sits there and watches you die."',
    },
    {
      name: 'Bosun Crake',
      role: 'crew leader / mutiny risk',
      personality: 'The crew\'s representative. Loyal to the captain but loyal to survival first. He will follow the party if they show competence. If not, he will take the longboat and leave. "I have a wife and a kid in Saltmere. I am going home."',
      secret: 'He has been hearing Marethan\'s voice for days. He understands fragments. It is saying "bury me."',
    },
    {
      name: 'The Leviathan',
      role: 'Marethan\'s last faithful / guide',
      personality: 'An ancient whale-like creature that has circled this spot for centuries, waiting for someone who can perform the funeral rites. It communicates through movement: leading the party to key locations, nudging the ship toward the essence fragments.',
    },
    {
      name: 'Marethan (dead god)',
      role: 'the cause / the solution',
      personality: 'Present only as fragments: a voice in the water, phosphorescence, warmth in the deep. Not vengeful. Not demanding. Just dead and unburied. The sadness is oceanic.',
    },
  ],
  keyLocations: [
    { name: 'The Ardent Star', description: 'A three-masted merchant vessel. Sturdy, well-maintained, and going absolutely nowhere. The entire campaign takes place on and around this ship.', significance: 'Home, prison, and the only solid ground for miles.' },
    { name: 'The Dead Water', description: 'A miles-wide patch of ocean where nothing moves. The surface is glass. The depths glow faintly. The silence is oppressive.', significance: 'The dead god\'s domain and the source of all problems.' },
    { name: 'The Sunken Temples', description: 'Ruins on the ocean floor beneath the ship. Coral-covered shrines to Marethan, preserved by the stagnant water.', significance: 'Where the funeral rites are discovered and the essence is strongest.' },
  ],
  dataSystems: ['wildernessSurvival', 'navalCombat', 'cataclysmCountdown', 'socialEncounter', 'npcRelationshipWeb', 'encounterWaves', 'dreamSequence', 'ambientSounds'],
};
