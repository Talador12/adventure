import type { OneShotCampaign } from '../types';

export const theFirstDescent: OneShotCampaign = {
  id: 'oneshot-first-descent',
  type: 'oneshot',
  title: 'The First Descent',
  tagline: 'The sinkhole appeared overnight. Perfectly circular. The air rising from it is warm. The rope comes back chewed.',
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
        'The sinkhole rim: grass growing right to the edge, then nothing. The stone walls are warm to the touch and glassy smooth, like something melted through',
        'First 100 feet: spiral claw marks gouge the rock, each groove wide as a fist. The walls weep bioluminescent mucus that glows pale green',
        'A ledge at 150 feet: shed chitin fragments the size of tower shields litter the floor, still iridescent, smelling faintly of copper',
        'The rope frays at 200 feet - something coated the walls with a mild acid. The party must piton their way down or find another method',
      ],
    },
    {
      title: 'Scene 2: The Descent',
      summary: 'Navigating the vertical tunnel as it transitions from bored stone to organic cavern. Environmental hazards and underground fauna.',
      challenge: 'exploration',
      keyEvents: [
        'At 250 feet, the walls transition from stone to something organic: amber-colored resin, warm and yielding underfoot, pulsing with a rhythm like a slow heartbeat',
        'A side chamber holds a clutch of smaller cocoons, each split open like eggshells. The fluid inside is still warm. The smell is sweet and wrong, like rotting honey',
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
