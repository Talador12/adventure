import type { OneShotCampaign } from '../types';

export const theTunnelUnderTown: OneShotCampaign = {
  id: 'oneshot-tunnel-under-town',
  type: 'oneshot',
  title: 'The Tunnel Under Town',
  tagline: 'Every basement in town connects to the same tunnel. Nobody built it. It predates the town by thousands of years.',
  tone: 'exploration',
  themes: ['exploration', 'underdark'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'When a tavern owner breaks through her cellar wall during renovation, she finds a stone tunnel. The blacksmith across the street finds the same tunnel from his basement. The baker, the temple, the constable\'s office: every building in town has a connection. The tunnel is ancient, carved, and older than the town by millennia.',
  hook: 'The tavern owner brings the party down to see. Through the broken wall: a carved stone tunnel, 15 feet wide, running perfectly straight beneath the main street. Rune lights flicker on. The tunnel is clean. Someone, or something, has been maintaining it.',
  twist: 'The tunnel is a ley line conduit, built to channel magical energy beneath the earth. The town was not built on top of it by accident. The town\'s founder knew about the tunnel and built the town to tap its energy. Every building\'s foundation is aligned to draw from it. The town\'s unusual prosperity, fertile soil, and long-lived residents are all because of the tunnel. And it is running out of energy.',
  climax: 'The tunnel\'s energy source is a dying elemental at its far end, bound millennia ago. The party must free the elemental (ending the town\'s prosperity), replace the energy source (requiring a significant sacrifice), or find a way to sustain both.',
  scenes: [
    {
      title: 'Scene 1: The Discovery',
      summary: 'Mapping the tunnel from multiple basements and realizing the scale. Every building in town connects to it.',
      challenge: 'exploration',
      keyEvents: [
        'Through the broken cellar wall: carved stone, 15 feet wide, lit by runes that flicker to life as if waking up. The air inside is warm and dry and smells of deep stone',
        'Checking other buildings: the blacksmith\'s basement has a bricked-over arch. The temple\'s crypt has a sealed door with matching runes. Every building in town sits on this tunnel',
        'The tunnel runs the full length of town and continues beyond in both directions',
        'Maintenance signs: swept floors, repaired runes, but no footprints',
      ],
    },
    {
      title: 'Scene 2: Following the Tunnel',
      summary: 'The tunnel extends beyond the town in both directions. One end is collapsed. The other leads to a chamber pulsing with fading energy.',
      challenge: 'exploration',
      keyEvents: [
        'East end: collapsed, deliberately sealed with wards that still hold',
        'West end: a long walk through increasingly ornate carvings and weakening rune lights',
        'The founder\'s journal: hidden in a wall niche, explaining the bargain',
        'The energy is visibly failing: lights dim, warmth fades, the tunnel groans',
      ],
    },
    {
      title: 'Scene 3: The Bound Elemental',
      summary: 'A dying earth elemental chained at the tunnel\'s heart, its life force drained to power the town for centuries.',
      challenge: 'social',
      keyEvents: [
        'The binding chamber: an elemental of stone and crystal, dimming, chained in runework',
        'It speaks: slowly, painfully, asking to be released after millennia of service',
        'The cost of freedom: the town loses its prosperity, soil turns thin, lifespans normalize',
        'Alternatives: the party can offer their own energy, find a replacement, or negotiate terms',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Tavern Owner Mags', role: 'quest giver', personality: 'A practical woman who renovated one wall too many. Not afraid of the tunnel but deeply annoyed. "I just wanted a bigger cellar. Now I have an archaeological crisis."' },
    { name: 'The Bound One', role: 'the heart', personality: 'An ancient earth elemental, weakened beyond recognition, who has powered the town for 2,000 years. Patient, tired, and without malice. "I have given enough. Please."' },
    { name: 'Mayor Halden', role: 'obstacle', personality: 'The mayor who suspects what the tunnel is and does not want anyone to disturb it. He knows the town\'s prosperity is not natural. He prefers it stay that way.' },
  ],
  keyLocations: [
    { name: 'The Tunnel', description: 'A 15-foot-wide carved stone passage running beneath the entire town, older than anything on the surface.', significance: 'The central exploration space connecting all locations.' },
    { name: 'The Founder\'s Niche', description: 'A hidden alcove containing the journal of the town\'s founder, explaining the bargain.', significance: 'Where the truth about the town\'s prosperity is revealed.' },
    { name: 'The Binding Chamber', description: 'A runic chamber at the tunnel\'s western end containing the chained elemental.', significance: 'The climax location where the party makes their choice.' },
  ],
  dataSystems: ['underdarkNavigation', 'npcDialogue', 'socialEncounter', 'puzzleLock', 'explorationChallenge'],
};
