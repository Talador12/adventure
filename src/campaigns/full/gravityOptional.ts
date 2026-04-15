import type { FullCampaign } from '../types';

export const gravityOptional: FullCampaign = {
  id: 'full-gravity-optional',
  type: 'full',
  title: 'Gravity Optional',
  tagline: 'Gravity stopped working. Not everywhere. Just in patches. Your horse is on the ceiling.',
  tone: 'exploration',
  themes: ['exploration', 'planar', 'comedy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 12 },
  estimatedSessions: 15,
  settingSummary:
    'Gravity has become unreliable. Random zones of zero gravity, reversed gravity, sideways gravity, and diagonal gravity appear and shift without warning. Rivers flow upward. Rain falls sideways. Entire neighborhoods float away. Buildings designed for "down" become climbing puzzles when down moves 90 degrees. Worse: objects develop gravitational memory. A rock that spent a century being pulled down will stubbornly fall downward even in a zone where gravity is reversed. Old things fall one way. New things fall another. Chaos.',
  hook:
    'The party wakes up on the ceiling. Not metaphorically - the gravity in their inn reversed overnight. The innkeeper is standing on the original floor (now the ceiling from the party perspective) shouting that this is the third time this week. Outside, the city is in shambles: half the buildings have correct gravity, half are inverted, and the market district is sideways. A reward is posted for anyone who can explain why. Every scholar in the city is floating somewhere unhelpful.',
  twist:
    'Gravity did not break. The world is being physically rotated by something gripping it from outside reality. The planet is a ball being turned in someone hand. The "gravity zones" are the parts of the world that face different directions as it rotates. Objects with "gravitational memory" remember which way they USED to face and resist the new orientation. The hand belongs to a being called the Examiner - an entity from outside the cosmology who picked up this world to study it, the way a child picks up a snow globe.',
  climax:
    'The party reaches the edge of the world (literally - the point where the Examiner fingers grip) and must communicate with a being so vast and alien that "conversation" is generous. The Examiner does not realize the world is inhabited. It is studying the geological formations. The party must make it understand that people live here, and that rotating the world is killing them. The Examiner response is gentle, horrified, and immediate - but the damage is done and the world must rebuild with scrambled gravity.',
  acts: [
    {
      title: 'Act 1: Down Is Negotiable',
      summary:
        'The party navigates a world where gravity is unreliable. They learn to traverse gravity zones, rescue floating citizens, and deal with the logistical nightmare of a world where "which way things fall" changes by neighborhood. They investigate the cause, following gravitational anomalies to their source.',
      keyEvents: [
        'Waking up on the ceiling. Getting down (up?) from the inn. The innkeeper charges extra for "ceiling rooms."',
        'Navigating the city: the market district is sideways. Merchants have nailed their goods to the walls.',
        'A rescue mission: a school full of children is in a zero-gravity zone. They are bouncing off walls and having the time of their lives.',
        'Gravitational memory discovered: an ancient statue stubbornly falls "down" regardless of the current gravity, crashing through walls',
        'Following the anomaly pattern: gravity distortion radiates from the world edges, not the center. Something external is causing this.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Objects in Motion',
      summary:
        'Gravity gets weirder. Entire regions have different orientations. The ocean flows upward in some places, creating vertical rivers and floating seas. The party discovers gravitational memory can be weaponized and learns that the distortion originates from contact points at the world edge.',
      keyEvents: [
        'The Vertical Ocean: a sea that flows upward into the sky, forming a hovering lake that rains from below',
        'Gravity weaponization: a warlord has figured out that gravitational memory means ancient castles fall differently than new ones - instant siege weapon',
        'The "compass" breaks: a device that previously pointed to the gravitational anomaly source now spins wildly because there are multiple contact points',
        'An expedition to the world edge: the party reaches a place where land just... ends. Beyond it is void. And something enormous is pressing against the barrier.',
        'First visual of the Examiner: a vast, curved surface pressing against the world boundary. A fingertip the size of a continent.',
      ],
      estimatedSessions: 5,
    },
    {
      title: "Act 3: The Examiner's Hand",
      summary:
        'The party reaches the contact point where the Examiner grips the world. They must communicate with a being that does not share their frame of reference, scale, or concept of "alive." The Examiner thinks it is holding a rock. The party must convince it otherwise.',
      keyEvents: [
        'Climbing the Examiner fingertip: a surface of alien skin stretching to the horizon, warm, with a pulse',
        'Attempting communication: light signals, carved messages, magical projection. The Examiner does not notice.',
        'The breakthrough: the party causes a small earthquake (a tap) that the Examiner feels as an itch. It pauses.',
        'Communication established: the Examiner uses gravity manipulation (its natural sense) to "speak." It is confused, then horrified.',
        'The world is set down gently. Gravity stabilizes but in the wrong orientation for half the planet. The rebuilding begins.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Professor Tove Cairnwell',
      role: 'gravity scholar / guide',
      personality:
        'Hair perpetually floating from residual zero-gravity exposure. Communicates in diagrams she draws in the air with a glowing chalk that stays suspended where she leaves it. Bounces between terror and ecstasy mid-sentence. "This is IMPOSSIBLE. This is BEAUTIFUL. This is going to kill us all. Look at this DIAGRAM!"',
    },
    {
      name: 'The Examiner',
      role: 'unwitting antagonist',
      personality:
        'An entity from outside the cosmology. Not malicious. Not even aware the world is inhabited. It picked up the planet the way a geologist picks up a rock. It is studying tectonic formations. When it learns people live there, it is mortified.',
      secret: 'It is a child of its species. It was told not to touch things in the cosmology display. It did anyway.',
    },
    {
      name: 'Warlord Dren Halvask',
      role: 'opportunist villain',
      personality:
        'A military commander who realized gravity chaos is a weapon. Uses gravitational memory to hurl ancient boulders through enemy walls. Pragmatic, ruthless, and genuinely believes he is restoring order through conquest.',
    },
    {
      name: 'Mika the Floating Child',
      role: 'emotional anchor',
      personality:
        'A 10-year-old born in a zero-gravity zone who has never experienced normal gravity. She swims through air like water and finds the ground terrifying. "Why would you want to be stuck to the floor? That is a prison."',
    },
  ],
  keyLocations: [
    {
      name: 'The Sideways City',
      description: 'The market district of the capital where gravity pulls perpendicular to normal. Merchants have adapted by bolting shelves to walls and using rope bridges between "floors."',
      significance: 'Opening location. Where the campaign tone is established.',
    },
    {
      name: 'The Vertical Ocean',
      description: 'A stretch of sea where gravity pulls upward. The water flows into the sky, forming a hovering lake that drizzles from its underside. Fish swim in the clouds.',
      significance: 'Act 2 set piece. The most visually stunning location in the campaign.',
    },
    {
      name: 'The Fingertip',
      description: 'The contact point where the Examiner grip meets the world boundary. A curved landscape of alien skin, warm to the touch, with a pulse you can feel through the ground.',
      significance: 'The final location. Where communication happens and the campaign resolves.',
    },
  ],
  dataSystems: ['environmentalHazard', 'planarAnomaly', 'puzzleRoom', 'weatherEvent', 'combatNarration'],
};
