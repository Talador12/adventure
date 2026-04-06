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
        'The party\'s town is in the wrong place — only they notice',
        'The cartographer explains: the Master Map defines geography, and it\'s been stolen',
        'Three more edits: a mountain appears where there was none, a lake dries up, a forest rearranges',
        'Tracking the thief: the trail changes direction because the Map rewrites the path',
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
      role: 'quest giver / expert',
      personality: 'The royal cartographer who discovered the Map\'s power (by accidentally erasing a village). Guilt-ridden, brilliant, and determined to fix this.',
      secret: 'She didn\'t accidentally erase the village — she was testing the Map\'s limits. The village came back when she redrew it, but she knew the Map was dangerous and told no one.',
    },
    {
      name: 'The Master Map',
      role: 'sentient artifact / antagonist',
      personality: 'A map that has developed aesthetic sensibilities over centuries. Considers itself an artist. "Your rivers are crooked. Your mountains have no symmetry. Your coastline is a MESS. I\'m fixing it. You\'re welcome."',
    },
    {
      name: 'Navigator Pell',
      role: 'ally / increasingly lost',
      personality: 'A navigator whose life depends on accurate maps. The Map\'s edits are driving him to the edge. "North was THAT way yesterday. Now it\'s over THERE. I just want to go HOME."',
    },
  ],
  keyLocations: [
    { name: 'The Shifted Towns', description: 'Towns that have been moved, rotated, or redesigned by the Map. Residents don\'t notice. Visitors are very confused.', significance: 'Evidence of the Map\'s power.' },
    { name: 'The Perfect Valley', description: 'The one place the Map considers ideal — a valley with mathematical symmetry, golden-ratio proportions, and suspiciously organized vegetation.', significance: 'Where the Map has made its base.' },
    { name: 'The Cartographer\'s Vault', description: 'Where the Map was kept — a heavily warded room with an empty pedestal and scorch marks where the Map burned through its containment.', significance: 'Where the investigation begins.' },
  ],
  dataSystems: ['lyingMap', 'magicalAnomaly', 'wildernessLandmarks', 'locationNameGenerator', 'travelEncounters', 'puzzleLock', 'pocketDimension', 'sentientItem', 'naturalDisaster'],
};
