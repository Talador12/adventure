import type { OneShotCampaign } from '../types';

export const theFirstDescent: OneShotCampaign = {
  id: 'oneshot-first-descent',
  type: 'oneshot',
  title: 'The First Descent',
  tagline: 'The sinkhole was not there yesterday. It goes down. Way down.',
  tone: 'exploration',
  themes: ['exploration', 'underdark'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'A sinkhole opens overnight in a farmer\'s field outside a quiet village. It is perfectly circular, 40 feet across, and impossibly deep. Dropped stones take 20 seconds to hit bottom. The village wants answers. The party volunteers to descend.',
  hook: 'The farmer shows the party the hole at dawn. The grass around the rim is warm. The air rising from below smells like rain on hot stone. A rope lowered 200 feet comes back frayed at the end, as though something chewed it.',
  twist: 'The sinkhole is not geological. It is a wound. Something enormous burrowed upward from deep below, broke through the surface overnight, and left. The bottom of the hole is an empty cocoon. Whatever hatched is now somewhere on the surface.',
  climax: 'The party reaches the cocoon chamber and pieces together what emerged. They must decide: climb back up to warn the village, or follow the tunnel network deeper to find where it came from and whether more are coming.',
  scenes: [
    {
      title: 'Scene 1: The Rim',
      summary: 'Investigating the sinkhole from above, rigging descent equipment, and making the first drop into darkness.',
      challenge: 'exploration',
      keyEvents: [
        'The sinkhole: perfectly circular, warm stone walls, no natural formation looks like this',
        'First 100 feet: smooth bore, claw marks in the rock, bioluminescent residue',
        'A ledge at 150 feet with shed chitin fragments the size of shields',
        'The rope problem: something below frays rope, party must find alternatives',
      ],
    },
    {
      title: 'Scene 2: The Descent',
      summary: 'Navigating the vertical tunnel as it transitions from bored stone to organic cavern. Environmental hazards and underground fauna.',
      challenge: 'exploration',
      keyEvents: [
        'The walls shift from stone to organic material: resinous, warm, pulsing faintly',
        'A side chamber with smaller cocoons, all empty, all recently hatched',
        'Underground fauna disturbed by the burrowing: cave fishers, darkmantles, displaced creatures',
        'A vast underground lake that the tunnel punches straight through',
      ],
    },
    {
      title: 'Scene 3: The Cocoon Chamber',
      summary: 'The bottom. A massive chamber containing the remains of something that incubated for centuries.',
      challenge: 'combat',
      keyEvents: [
        'The cocoon: 60 feet across, split open, still warm inside',
        'Guardian organisms left behind to protect the nest attack the party',
        'Evidence of what hatched: claw patterns, acidic residue, a scale the size of a door',
        'A tunnel leading deeper, and a choice: warn the surface or follow it down',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Farmer Hadden', role: 'quest giver', personality: 'Practical and terrified. He has farmed this land for 30 years and the ground has never so much as shifted. "I put my ear to the dirt last night. Something was breathing down there."' },
    { name: 'Wren', role: 'guide / ally', personality: 'A young spelunker from the village who has explored every cave in the region. None of them connect to this hole. She is fascinated and scared in equal measure.' },
    { name: 'The Nest Keeper', role: 'antagonist', personality: 'A chitinous guardian organism left behind to protect the cocoon chamber. Not intelligent, but fiercely territorial. It does not want the party near the remains.' },
  ],
  keyLocations: [
    { name: 'The Sinkhole Rim', description: 'A perfect circle in a barley field, warm to the touch, smelling of deep earth.', significance: 'Entry point and the mystery that starts everything.' },
    { name: 'The Bore Tunnel', description: 'A vertical shaft bored through solid rock by something massive, with claw marks spiraling downward.', significance: 'The descent itself, with hazards and clues at every depth.' },
    { name: 'The Cocoon Chamber', description: 'A cathedral-sized cavern at the bottom, dominated by the split remains of an organic cocoon.', significance: 'Where the truth is revealed and the party decides what to do next.' },
  ],
  dataSystems: ['underdarkNavigation', 'environmentalHazard', 'monsterLore', 'encounterWaves', 'explorationChallenge'],
};
