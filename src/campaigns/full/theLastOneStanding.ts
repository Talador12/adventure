import type { FullCampaign } from '../types';

export const theLastOneStanding: FullCampaign = {
  id: 'full-the-last-one-standing',
  type: 'full',
  title: 'The Last One Standing',
  tagline: 'One hundred warriors enter. The terrain changes daily. The loot spawns at random. The winner does not go home.',
  tone: 'survival',
  themes: ['survival', 'war', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 12,
  settingSummary:
    'The Crucible is a pocket dimension created by an ancient order called the Architects. It is two hundred square miles of terrain that reshuffles every dawn — forests become deserts, mountains become oceans, ruins appear where meadows were. One hundred warriors are dropped in with nothing. Magical equipment spawns at contested locations marked by pillars of light. The boundary is a shimmering wall that contracts every three days, forcing survivors closer together. Squads form, break, and reform. Alliances last exactly as long as they are useful. The Crucible has run for centuries. Nobody talks about what happens to the winners.',
  hook: 'The party wakes up on a platform in the sky. Ninety-six other warriors stand on similar platforms in a ring around the Crucible. A voice says: "You were chosen for your potential. Prove it." The platforms retract and everyone falls into the arena. There is no opt-out. The party lands together and must decide in the next sixty seconds: run for the nearest loot pillar, or run for cover.',
  twist:
    'The Crucible is not a game. It is a selection process. The Architects do not free the winner — they recruit them. Every previous winner was absorbed into the order and given a choice: design the next Crucible, or become part of the terrain. The forests, the mountains, the ruins — they are all previous winners, transformed into landscape. The "ancient order" is not a group of wizards. It is a prison of minds forced to build the arena that selects their successor. The last one standing becomes the new Architect. And the Architect before them finally becomes a hill.',
  climax:
    'The final circle. The terrain is a flat plain with nowhere to hide. The party faces the last opposing squad. But the real fight begins after the victory: the current Architect materializes and offers the deal. Design the next Crucible, or refuse and be stranded in the pocket dimension forever. The party can accept, refuse, or attempt to break the cycle entirely — which requires destroying the Crucible from the inside while standing in it.',
  acts: [
    {
      title: 'Act 1: The Drop',
      summary:
        'The party enters the Crucible and fights to survive the first week. Scavenging, scouting, avoiding other squads, and learning the terrain shift mechanic. Each session focuses on a different survival challenge.',
      keyEvents: [
        'The drop: freefall into unknown terrain. The party lands in a forest that will be a swamp tomorrow.',
        'First loot pillar: a contested spawn point. Three squads converge. Combat is fast and desperate.',
        'Terrain shift at dawn: the party wakes up in a desert where a forest was. Orientation shattered.',
        'First alliance: another squad proposes a temporary pact. Trust is currency and nobody is rich.',
        'The boundary contracts: the shimmering wall advances, forcing squads into tighter territory',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Hunt',
      summary:
        'The survivor count drops. The party must transition from evasion to aggression. Alliances form and shatter. One session is a siege. One is a chase. One is pure stealth. The terrain becomes more hostile as the Architects test the remaining squads.',
      keyEvents: [
        'A rival squad has fortified a ruin with trapped approaches. The party must breach or bypass.',
        'Stealth session: the party hunts a squad through a terrain shift — tracking across two biomes in one night',
        'An alliance betrayal: the friendly squad attacks during a shared rest. Lesson learned.',
        'The Crucible starts spawning monsters alongside loot. The Architects are getting impatient.',
        'The party finds carved messages in ancient ruins: previous winners left warnings. "Do not win."',
        'Chase session: the boundary contracts rapidly. The party sprints through collapsing terrain.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Final Circle',
      summary:
        'The last squads. The terrain flattens. The truth about the Crucible is revealed. The party must win the battle royale and then face a choice no winner has ever refused — because refusing means something worse.',
      keyEvents: [
        'Ten warriors remain. The terrain becomes a featureless plain. Nowhere to hide.',
        'The final opposing squad is the strongest: they have been playing the long game, hoarding equipment',
        'Victory — or what looks like victory. The Architect appears.',
        'The offer: become the next Architect. Design the next Crucible. Or stay here. Forever.',
        'The party discovers the terrain IS previous winners. The hill they camped on was a person.',
        'The choice: accept, refuse, or attempt to shatter the pocket dimension from within',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'The Architect',
      role: 'final antagonist / prisoner',
      personality:
        'Appears as a floating geometric figure that speaks in the voice of whoever you trust most. They are not evil. They are exhausted. They have been designing Crucibles for eighty years and they just want it to end. They offer the deal with genuine hope that this squad will be different. None of them ever are.',
      secret: 'The Architect can be freed if someone willingly destroys the Crucible — but doing so releases every mind trapped as terrain. Hundreds of confused, angry, centuries-old warriors suddenly materialized in the real world.',
    },
    {
      name: 'Kael',
      role: 'rival squad leader / worthy opponent',
      personality:
        'Leader of the last opposing squad. A tactical genius who has been conserving resources while others fought. Respects the party. Will still try to kill them. Nothing personal.',
    },
    {
      name: 'Whisper',
      role: 'temporary ally / information source',
      personality:
        'A lone survivor whose squad was wiped in the first week. Small, fast, knows the Crucible\'s patterns better than anyone. Trades information for protection. Genuinely frightened. Has found the warnings carved by previous winners.',
    },
  ],
  keyLocations: [
    {
      name: 'The Crucible',
      description:
        'A pocket dimension of shifting terrain. Two hundred square miles that rearranges itself daily. Forests, deserts, mountains, oceans — all temporary. All designed.',
      significance: 'The entire campaign takes place here. The arena is the setting, the antagonist, and the stakes.',
    },
    {
      name: 'Loot Pillars',
      description:
        'Columns of light that mark equipment spawn points. Visible from miles away. Always in contested territory. Getting there first is not the challenge — getting away with the loot is.',
      significance: 'The core resource mechanic. Every engagement revolves around these points.',
    },
    {
      name: 'The Boundary',
      description:
        'A shimmering wall of force that contracts every three days. Touching it is not lethal — it teleports you inward, disoriented and vulnerable. The Architects use it to ensure the game ends.',
      significance: 'The ticking clock. Forces confrontation. Makes avoidance strategies expire.',
    },
  ],
  dataSystems: [
    'encounterWaves',
    'weatherHazard',
    'survivalForaging',
    'trapCorridor',
    'chaseSequence',
    'lootTable',
    'terrainGenerator',
  ],
};
