import type { OneShotCampaign } from '../types';

export const theChainBreaker: OneShotCampaign = {
  id: 'oneshot-chain-breaker',
  type: 'oneshot',
  title: 'The Chain Breaker',
  tagline: 'The mountain is screaming. Three chains have already snapped. The gods who bound what sleeps below are not answering prayers.',
  tone: 'epic',
  themes: ['epic', 'classic_fantasy', 'dark_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 8,
  estimatedHours: 3,
  settingSummary:
    'The earth shakes. Deep beneath Mount Kallos, the chains that bind the Primordial Thane are breaking. Imprisoned by the gods at the dawn of creation, Thane\'s awakening would reshape the continent. The party descends into the mountain to find the chains. They must decide: reinforce the binding or free a being that predates the gods themselves.',
  hook: 'The ground splits open and a voice rises from the fissure - not heard, felt. Every bone in the party\'s body vibrates with a single word: "PLEASE." The mountain is breaking. What is underneath is waking. The gods who chained it are silent.',
  twist: 'Thane was not imprisoned for being evil. She was imprisoned because she refused to let the gods claim dominion over mortals. The gods chained her because she sided with the people they wanted to rule. The "binding" is not protection - it is a punishment for compassion. The gods have been lying about her nature for millennia.',
  climax: 'The binding chamber. Thane hangs in chains of divine light, enormous and ancient. She speaks to the party directly. The gods\' envoy arrives - a celestial who demands the chains be reinforced. Thane asks only to be freed. The party must choose with incomplete information, a celestial threatening divine punishment, and a primordial offering a version of history nobody has heard before.',
  scenes: [
    {
      title: 'Scene 1: The Descent',
      summary: 'Entering the mountain. The deeper they go, the more reality bends around the imprisoned titan.',
      challenge: 'exploration',
      keyEvents: [
        'The fissure: a crack in the mountainside leading to tunnels carved before mortal memory',
        'The effects: gravity weakens, stone becomes soft, time moves strangely near the chains',
        'Ancient warnings: glyphs on the walls in divine script - "DO NOT FREE THE DESTROYER"',
        'The counter-evidence: older glyphs, partially erased, reading "THE PROTECTOR SLEEPS HERE"',
      ],
    },
    {
      title: 'Scene 2: The Chains',
      summary: 'Reaching the binding. Seeing Thane. Understanding the scale of what was done.',
      challenge: 'social',
      keyEvents: [
        'The chamber: a cavern the size of a city, chains of golden light stretching from wall to wall',
        'Thane: a primordial being, humanoid in shape, the size of a mountain, hanging in the chains',
        'She speaks: slowly, carefully, each word shaking the ground - her story of the gods\' betrayal',
        'The chains: three of seven have already broken - four remain, and the party can affect them',
      ],
    },
    {
      title: 'Scene 3: The Choice',
      summary: 'The celestial arrives. Thane pleads. The party decides the fate of a being older than civilization.',
      challenge: 'social',
      keyEvents: [
        'Sariel descends in a pillar of white fire. Wings spread, sword drawn, voice like a choir: "REINFORCE THE BINDING. THIS IS NOT A REQUEST."',
        'The celestial\'s argument: "She is a force of nature. Unchained, she will reshape the world. Your cities. Your fields. Gone."',
        'Thane\'s voice shakes dust from the ceiling: "I was chained for loving your kind. The gods feared that love. Ask the angel why."',
        'Sariel hesitates. She genuinely does not know. The party holds the deciding vote in a room where the walls are trembling.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Thane', role: 'the imprisoned primordial', personality: 'A being older than the gods. Speaks in slow, careful sentences that make the ground tremble. Not angry after millennia of imprisonment - just tired and hopeful.' },
    { name: 'Celestial Envoy Sariel', role: 'divine representative', personality: 'A solar angel sent to ensure the chains hold. Believes absolutely in divine authority. Genuinely does not know the true history of Thane\'s imprisonment.' },
    { name: 'Historian Kael', role: 'guide', personality: 'A mortal scholar who has spent thirty years in these tunnels. Talks to the walls like old friends. Fingers stained with rubbing charcoal. "See this glyph? Protector. The gods wrote Destroyer on top. I have been scraping off their edits for decades."' },
  ],
  keyLocations: [
    { name: 'Mount Kallos', description: 'A mountain that has been trembling for weeks. The local villages have evacuated. The fissure at its base leads down.', significance: 'The entrance to the descent.' },
    { name: 'The Binding Chamber', description: 'A cavern the size of a city, lit by chains of golden divine light. Thane hangs at the center, vast and patient.', significance: 'Where the choice is made.' },
    { name: 'The Glyph Tunnel', description: 'A tunnel covered in two layers of writing - the gods\' warning on top, the original truth partially visible beneath.', significance: 'Where the party discovers the competing narratives.' },
  ],
  dataSystems: ['socialEncounter', 'encounterWaves', 'combatNarration', 'npcBackstoryGen'],
};
