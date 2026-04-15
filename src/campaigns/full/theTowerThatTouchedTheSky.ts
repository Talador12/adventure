import type { FullCampaign } from '../types';

export const theTowerThatTouchedTheSky: FullCampaign = {
  id: 'full-the-tower-that-touched-the-sky',
  type: 'full',
  title: 'The Tower That Touched the Sky',
  tagline: 'They built it to reach the gods. There is nothing at the top.',
  tone: 'epic',
  themes: ['epic', 'classic_fantasy', 'planar'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 15 },
  estimatedSessions: 18,
  settingSummary:
    'The city of Ascendara is building the Spire of Man - a tower to reach the divine realm. The project has consumed three generations. Every floor is an architectural wonder: the Glass Tier refracts sunlight into permanent rainbows, the Singing Tier resonates with the wind, the Storm Tier pierces the clouds. The city believes they deserve to stand before the gods. The tower is their proof. Nobody asks what was sacrificed to build each floor, or what the gods think about uninvited guests.',
  hook: 'The party is hired as escorts for the next construction team ascending to the Unfinished Tier - the current top of the Spire, where builders work at the edge of the sky. The pay is extraordinary because the casualty rate is extraordinary. Laborers fall. Materials vanish. Strange lights appear above the construction zone. The previous escort team did not come back. The builders say it is the altitude. The priests say it is divine testing. The party will discover it is something else entirely.',
  twist:
    'There are no gods at the top. There never were. The divine realm is not above. It is not anywhere that can be reached by building upward. The tower\'s architects knew this from the first floor. The original plans, buried in the foundation, show the tower was never designed to reach anything. It was designed to be built. The act of construction - the ambition, the sacrifice, the refusal to accept limits - was the point. The architect believed that a species capable of building a tower to heaven did not need the gods at its top. The Spire is a monument to the conviction that mortals deserve divinity. It was always going to be empty at the summit. The journey was the theology.',
  climax:
    'The party reaches the top of the Spire and finds open sky. No gods. No divine realm. No gateway. Just wind and a view of the world below that makes everything look small. The city below is watching through scrying mirrors. They see the empty summit. The party must decide what to tell Ascendara: the truth (the tower reaches nothing and the architect knew it), a lie (the gods are testing them and more building is needed), or the architect\'s message (the tower was the point all along, and they have already proven what they set out to prove). Below, the construction guild prepares another tier. The priests sharpen their rhetoric. The laborers shoulder their tools.',
  acts: [
    {
      title: 'Act 1: The Ascent Begins',
      summary:
        'The party climbs through the completed tiers of the Spire, each one more magnificent than the last. They witness the human cost: the crushed neighborhoods that provided foundation stone, the forests that fueled the forges, the workers who fell and were buried in the walls. Beauty and brutality, floor by floor.',
      keyEvents: [
        'The Foundation Tier: built on rubble from demolished homes. Names are carved into the stone by former residents.',
        'The Glass Tier: stunning, refracting light into permanent rainbows. The glass was made by burning an entire forest for fuel.',
        'The party meets Architect Solenne, who oversees construction and genuinely believes they are building toward divinity',
        'A laborer falls from the Singing Tier. The body vanishes before it hits the ground. Nobody is surprised.',
        'Strange resistance from above: winds that push back, whispers that say "no higher"',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Cost of Climbing',
      summary:
        'The upper tiers. The air thins. The magic intensifies. The party passes through the Storm Tier into uncharted heights where reality warps. They find evidence that the divine is actively resisting the tower - or that something is pretending to be divine to stop the ascent. The original architect\'s notes begin surfacing.',
      keyEvents: [
        'The Storm Tier: perpetual lightning, gale winds, construction crews working in chains to avoid being blown off',
        'A celestial entity appears and demands the builders stop. It is an angel. It is also terrified.',
        'The architect\'s journal found in a sealed chamber: "They will ask what is at the top. The answer will disappoint them."',
        'The party discovers the angel was sent not by gods but by planar beings who fear what a tower this tall means',
        'A vote among the builders: continue or stop? The party\'s testimony sways it.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Summit',
      summary:
        'The final push to the top of the Spire. The party faces the last defenses - real or imagined - and arrives at the summit to find nothing. The wind. The view. The emptiness. And a city below waiting for a revelation.',
      keyEvents: [
        'The last tier: construction scaffolding and open sky. The builders refuse to go higher. Only the party continues.',
        'The summit: no gods, no gate, no divine realm. Just the highest point in the world and a sealed box left by the original architect.',
        'The architect\'s final message, written three generations ago: "If you are reading this, you have proven my point."',
        'Ascendara watches through scrying mirrors. Sixty thousand faces waiting for a miracle.',
        'The party speaks to the city. What they say determines whether the tower is abandoned, continued, or understood.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Architect Solenne',
      role: 'ally / true believer',
      personality:
        'Third-generation architect overseeing the Spire. Brilliant, driven, and utterly convinced the divine is one more tier away. She has sacrificed her family, her health, and her youth for the project.',
      secret: 'She found the original architect\'s notes years ago. She burned them. She cannot accept that the tower leads nowhere.',
    },
    {
      name: 'The Angel (Zerathiel)',
      role: 'obstacle / sympathetic antagonist',
      personality:
        'A celestial being sent to stop the tower. Not by gods - by the planar council that fears mortal ambition. Zerathiel is formal, melancholic, and deeply conflicted about opposing a species that builds things this beautiful.',
      secret: 'Zerathiel has never met the gods either. The celestials serve an ideal, not a presence. The tower terrifies them because it might prove there is nothing above.',
    },
    {
      name: 'Foreman Drask',
      role: 'ally / voice of the workers',
      personality:
        'A grizzled laborer who has built the Spire for twenty years. He does not care about gods. He cares about the workers who die every week. Blunt, tired, loyal to his crew.',
    },
    {
      name: 'High Priestess Verada',
      role: 'political figure / zealot',
      personality:
        'The spiritual leader of Ascendara who has staked the city\'s faith on the tower reaching the divine. Eloquent, commanding, and terrified of being wrong.',
    },
  ],
  keyLocations: [
    {
      name: 'The Spire of Man',
      description: 'A tower of unprecedented scale, each floor a different architectural wonder, ascending through clouds into the upper atmosphere.',
      significance: 'The entire campaign. Every floor is a dungeon, a social encounter, and a moral question about the cost of ambition.',
    },
    {
      name: 'The Foundation Quarter',
      description: 'The demolished neighborhood that was cleared to build the Spire\'s base. Now a shantytown of displaced families who live in the tower\'s shadow.',
      significance: 'The first cost. The party sees what was destroyed to begin the ascent.',
    },
    {
      name: 'The Summit',
      description: 'Open sky. Wind. The highest point in the world. A sealed box and a view that makes continents look like puddles.',
      significance: 'The end. The empty answer. The question of what it meant to climb this far.',
    },
  ],
  dataSystems: [
    'dungeonRoom',
    'environmentalHazard',
    'moralDilemma',
    'factionReputation',
    'deityPantheon',
    'socialEncounter',
    'weatherGenerator',
    'planarTravel',
  ],
};
