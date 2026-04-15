import type { OneShotCampaign } from '../types';

export const theSunStealer: OneShotCampaign = {
  id: 'oneshot-sun-stealer',
  type: 'oneshot',
  title: 'The Sun Stealer',
  tagline: 'Someone stole the sun. You have one night to find it before the world freezes.',
  tone: 'epic',
  themes: ['epic', 'mystery', 'planar'],
  playerCount: { min: 3, max: 5 },
  level: 7,
  estimatedHours: 3,
  settingSummary:
    'The sun did not rise this morning. Not an eclipse - the sun is gone. Temperatures are already dropping. Within 24 hours, the surface will be uninhabitable. Someone stole the sun, and the party must follow the trail from the empty sky to whatever pocket dimension, vault, or being now holds the world\'s light.',
  hook: 'Dawn was supposed to be two hours ago. The sky is black. The stars are wrong - the sun\'s absence has shifted the constellations. A freezing wind picks up. A scholar calculates: "24 hours until everything freezes. Whoever took the sun left a trail - residual solar energy pointing... underground."',
  twist: 'The sun was not stolen by a villain. It was claimed by a forgotten sun god - Solenne - who was abandoned by her worshippers millennia ago. Without worshippers, a god weakens. She pulled the sun into her fading divine realm to sustain herself. She is not evil. She is dying and desperate. The party must either find her new worshippers or convince her to let go.',
  climax: 'Solenne\'s fading realm. She sits on a throne of dimming light, holding the sun in her lap like a mother holding a child. She is barely conscious. The party can take the sun back (killing her), convince her to release it (she fades to nothing), or find a third option - rekindling worship so she lives AND releases the sun.',
  scenes: [
    {
      title: 'Scene 1: The Dark',
      summary: 'The world without a sun. Panic, cold, and the trail of solar residue leading underground.',
      challenge: 'exploration',
      keyEvents: [
        'The world: darkness at noon, temperatures dropping, cities lighting emergency fires',
        'The trail: golden particles of solar energy forming a path - through a mountain, downward',
        'Ancient texts: a reference to Solenne, the First Sun, the god who lit the sky before being forgotten',
        'The entrance: a hidden temple entrance in the mountainside, sealed with a prayer nobody remembers',
      ],
    },
    {
      title: 'Scene 2: The Fading Realm',
      summary: 'Entering Solenne\'s divine realm. A plane of existence collapsing from lack of belief.',
      challenge: 'exploration',
      keyEvents: [
        'The realm: once a paradise of eternal golden light, now dimming, crumbling, cold',
        'Memory echoes: ghostly worshippers from millennia ago, going through rituals nobody performs anymore',
        'The hazards: reality gaps where the realm has dissolved - holes in existence itself',
        'The approach: Solenne\'s throne room, visible in the distance, glowing with stolen sunlight',
      ],
    },
    {
      title: 'Scene 3: The Sun',
      summary: 'Face to face with a dying god and a stolen star. The world\'s clock is running out.',
      challenge: 'social',
      keyEvents: [
        'Solenne: vast, luminous, and barely awake - holding the sun the way a drowning person holds a lifeline',
        'Her plea: "I was the first light. They forgot me. Without this, I am nothing."',
        'The options: take the sun (she dies), persuade her (she fades), or rekindle her worship (both survive)',
        'The prayer: if the party can remember or reconstruct the ancient prayer, the realm stabilizes and Solenne releases the sun willingly',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Solenne', role: 'the sun thief / dying god', personality: 'The first sun god. Forgotten for three thousand years. Not malicious - starving for belief. Her consciousness flickers like a candle. She took the sun because it was all she had left.' },
    { name: 'Scholar Fennwick', role: 'guide', personality: 'An astronomer who first noticed the sun was gone (not missing - gone). Brilliant, terrified, and fascinated by the theological implications in equal measure.' },
    { name: 'Echo Priestess', role: 'memory ghost', personality: 'A ghostly echo of Solenne\'s last high priestess. Not truly alive - a memory given form by the fading realm. She can teach the party the prayer if they can reach her.' },
  ],
  keyLocations: [
    { name: 'The Darkened World', description: 'The mortal world without a sun. Black sky, dropping temperature, and the first signs of a civilization realizing this is not a normal night.', significance: 'The ticking clock and the stakes.' },
    { name: 'Solenne\'s Fading Realm', description: 'A divine dimension that was once a paradise of light. Now it is dimming, crumbling, and barely holding together.', significance: 'The path to the sun and to Solenne.' },
    { name: 'The Throne of Light', description: 'Solenne\'s throne, carved from solid sunlight. She sits upon it holding the sun - the only bright thing in a dying world.', significance: 'Where the final choice is made.' },
  ],
  dataSystems: ['encounterWaves', 'socialEncounter', 'npcBackstoryGen'],
};
