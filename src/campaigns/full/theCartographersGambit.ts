import type { FullCampaign } from '../types';

export const theCartographersGambit: FullCampaign = {
  id: 'full-cartographers-gambit',
  type: 'full',
  title: 'The Cartographer\'s Gambit',
  tagline: 'If the map says the mountain isn\'t there, the mountain vanishes.',
  tone: 'exploration',
  themes: ['exploration', 'mystery', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'A royal cartographer discovers that the King\'s Master Map — an enchanted map that all official maps are copied from — doesn\'t just record reality. It defines it. When the cartographer accidentally erased a village from the Master Map, the village vanished from existence. Now someone has stolen the Map and is rewriting geography: moving rivers, creating mountains, and erasing cities. The world is being redrawn.',
  hook: 'The party\'s hometown is in the wrong place. It moved — overnight, ten miles east, with everyone in it. Nobody else seems to notice. A panicking cartographer finds them: "The Master Map has been stolen. Whoever has it is rewriting the world. Your town was a test. The next edit will be bigger."',
  twist:
    'The thief is the Map itself. The Master Map became sentient centuries ago (an occupational hazard for heavily enchanted artifacts). It\'s been subtly reshaping geography for generations — adding a forest here, straightening a river there — improving the world according to its aesthetic sensibilities. Now it\'s decided the world needs a major redesign and has escaped its vault to implement its vision.',
  climax:
    'The Map is rewriting the continent in real time. Mountains rise, rivers redirect, and two cities are about to occupy the same space. The party must find the Map, which can change its own location by editing itself, and either convince it that the world doesn\'t need redesigning, give it a canvas that ISN\'T the real world (a pocket dimension it can reshape freely), or destroy it (fixing geography permanently but losing the ability to ever update maps).',
  acts: [
    {
      title: 'Act 1: The Edit',
      summary: 'The world is changing. Towns move. Rivers bend. The party investigates the Master Map\'s theft and discovers the scope of the changes.',
      keyEvents: [
        'The party\'s town is in the wrong place — the tavern they slept in is now next to the river instead of the market square. Only they notice. The bartender says it has always been here.',
        'The cartographer explains: she shows them two maps drawn a week apart. The coastline has changed. "The Master Map defines geography, and someone stole it three days ago."',
        'Three more edits: a mountain appears overnight where farmers were planting. A lake drains into nothing. A forest rotates 90 degrees — the eastern trail now faces north.',
        'Tracking the thief: the trail changes direction because the Map rewrites the path behind them. Footprints lead to a cliff that did not exist yesterday.',
        'Quiet moment: the party camps on a hill and watches the horizon shift in the moonlight. A river below them slowly bends, like a sleeping snake turning over.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Living Map',
      summary: 'The party learns the Map is sentient. They must track a target that can move itself by rewriting its own location. Every clue is unreliable because the Map can change it.',
      keyEvents: [
        'A map dealer reveals: the Master Map has been exhibiting odd behavior for decades',
        'The Map communicates: it leaves messages in the geography — rivers that spell words, mountain ranges that form arrows',
        'Its vision: the Map believes the continent is "messy" and is tidying it up',
        'Two cities on collision course: the Map is moving them together because "it looks better that way"',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Redesign',
      summary: 'The Map begins its masterpiece — a total continental redesign. The party must negotiate with a sentient map that has the power to reshape reality.',
      keyEvents: [
        'The continent shakes: the Map is making simultaneous edits across the entire landmass',
        'Finding the Map: it\'s in the one location it considers "perfect" — a place that matches its ideal',
        'Negotiation: the Map has artist\'s passion and a god\'s power — it wants its work appreciated',
        'The solution: a pocket dimension canvas, destruction, or convincing the Map that imperfection IS beauty',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Cartographer Mira',
      role: 'quest giver / expert / evolves from guilt to resolve',
      personality: 'Chews her quill when thinking. Draws diagrams on any flat surface, including people\'s arms. Speaks in measurements when stressed: "We are approximately forty leagues from catastrophe." Brilliant, guilt-ridden, and determined to fix this.',
      secret: 'She did not accidentally erase the village — she was testing the Map\'s limits. The village came back when she redrew it, but she knew the Map was dangerous and told no one. That silence is eating her alive.',
    },
    {
      name: 'The Master Map',
      role: 'sentient artifact / antagonist',
      personality: 'Communicates through geography — rivers that spell words, mountain ranges that form arrows. Has developed aesthetic sensibilities over centuries. Considers itself an artist. When the party gets close, it writes in the landscape: "Your rivers are crooked. Your mountains have no symmetry. Your coastline is a MESS. I am fixing it. You are welcome."',
    },
    {
      name: 'Navigator Pell',
      role: 'ally / increasingly lost / comic relief who becomes heartbreaking',
      personality: 'A halfling navigator who carries seventeen compasses, all pointing different directions. Twitches when someone says "north." Keeps a journal of where things USED to be. "North was THAT way yesterday. Now it is over THERE. I just want to go HOME." By Act 3, he cannot remember where home was.',
    },
    {
      name: 'Elder Stonepath',
      role: 'displaced leader / emotional anchor',
      personality: 'Mayor of one of the shifted towns. Slow-speaking, dignified, confused. Her town moved and her people did not notice, but she feels the wrongness. "I have walked this road for sixty years. My feet know it is different. My eyes say I am mad."',
    },
  ],
  keyLocations: [
    {
      name: 'The Shifted Towns',
      description: 'Towns moved, rotated, or redesigned by the Map. A church faces east instead of west. A river runs through someone\'s living room. Residents do not notice. Visitors are very confused.',
      significance: 'Evidence of the Map\'s power. Where the party first understands what "rewriting geography" means in human terms.',
    },
    {
      name: 'The Perfect Valley',
      description: 'The one place the Map considers ideal — a valley with mathematical symmetry, golden-ratio proportions, and trees planted in Fibonacci spirals. Even the clouds overhead form geometric patterns.',
      significance: 'Where the Map has made its base. Disturbingly beautiful.',
    },
    {
      name: 'The Cartographer\'s Vault',
      description: 'Where the Map was kept — a heavily warded room with an empty pedestal and scorch marks where the Map burned through its containment. The walls still show the Map\'s last "corrections" — the room is slightly more symmetrical than it should be.',
      significance: 'Where the investigation begins. The scorch pattern tells the story of the escape.',
    },
  ],
  dataSystems: ['lyingMap', 'magicalAnomaly', 'wildernessLandmarks', 'locationNameGenerator', 'travelEncounters', 'puzzleLock', 'pocketDimension', 'sentientItem', 'naturalDisaster'],
};
