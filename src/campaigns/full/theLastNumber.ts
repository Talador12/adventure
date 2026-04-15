import type { FullCampaign } from '../types';

export const theLastNumber: FullCampaign = {
  id: 'full-the-last-number',
  type: 'full',
  title: 'The Last Number',
  tagline: 'The number 7 no longer exists. Weeks have 6 days. Buildings with 7 floors collapse. Mathematics is dying.',
  tone: 'mystery',
  themes: ['mystery', 'planar', 'meta'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 14 },
  estimatedSessions: 15,
  settingSummary:
    'Numbers are finite and someone is using them up. The number 7 was the first to go - anything in groups of 7 became 6 or 8. Weeks collapsed to 6 days. Musical octaves lost a note (the seventh vanishes mid-scale). Buildings with 7 floors lost one overnight, crushing everything between the 6th and what was the 8th. Then 13 vanished. Then 23. The pattern is accelerating. Mathematics itself is failing. Bridges calculated with missing numbers collapse. Economies built on precise accounting crumble. And someone is hoarding the numbers in a vault, protecting them - or stealing them.',
  hook:
    'The party is at an inn. A bard plays a familiar tune and a note is missing. Not wrong - absent. The melody jumps from the 6th note to the 8th as if the 7th never existed. The party counts coins: six, eight. Never seven. A calendar on the wall shows a six-day week. The innkeeper sees nothing wrong. "It has always been six days. What is a seven?" The party realizes a number has been erased from reality. A mathematician bursts through the door, wild-eyed: "Somebody help me. I can prove thirteen used to exist and I am the only one who remembers."',
  twist:
    'A mathematician named Dr. Yara Solen discovered that numbers are not abstract concepts - they are finite resources. Each number has a fixed quantity of "uses" across all of reality. When a number runs out, it ceases to exist. She has been tracking depletion rates for decades and realized that zero - the most fundamental number - is nearly exhausted. If zero is consumed, the concept of nothing ceases to exist. Everything becomes something. Void fills. Emptiness becomes solid. The universe chokes on its own existence. She is not stealing numbers. She is rationing them, hoarding the rarest ones to prevent total collapse.',
  climax:
    'The party reaches the Vault of Numbers. Dr. Solen is protecting the last reserves of zero, one, and two - the load-bearing numbers of reality. A faction wants to crack the vault and redistribute the numbers (restoring 7 and 13 but depleting the reserves faster). Solen argues that rationing is the only way to buy time for a permanent solution. The party must decide: redistribute (temporary relief, faster collapse), ration (continued loss of numbers, but zero survives), or find the source of numerical generation and restart it (a quest into the abstract plane of mathematics itself).',
  acts: [
    {
      title: 'Act 1: The Missing Numbers',
      summary:
        'The party discovers that specific numbers no longer exist. Seven is gone. Then 13. They investigate the phenomenon, finding a mathematician who has been tracking the disappearances. Buildings collapse. Economies fail. Nobody else even notices the missing numbers.',
      keyEvents: [
        'The bard missing note. The six-day week. The coins that skip from 6 to 8. The first realization that 7 is gone.',
        'Dr. Fennick Grale, a wild-eyed mathematician: "Thirteen existed! I can prove it! Look at this equation - there is a gap!"',
        'A 7-floor building collapsed overnight. The wreckage shows six floors and eight floors. Nothing between. 23 people died. Or was it 22?',
        'The party counts their own inventory: they cannot have exactly 7, 13, or 23 of anything. The numbers are absent from reality.',
        'Tracking the disappearances: they follow a mathematical trail - equations that should work but fail - to a hidden vault in a mountain.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Vault Keeper',
      summary:
        'The party finds Dr. Solen and her Vault of Numbers. She explains the horrifying truth: numbers are finite. She has been hoarding the endangered ones to prevent zero from being consumed. If zero goes, nothing goes. The concept of absence disappears. Everything becomes something.',
      keyEvents: [
        'The vault entrance: a door that requires solving an equation with missing numbers to open. The party must think mathematically.',
        'Inside the vault: shelves of crystallized numbers. Physical manifestations of mathematical concepts. Some shelves are empty.',
        'Dr. Solen explains: numbers are not infinite. They are mined from an abstract source. Civilization uses them like fuel. The well is running dry.',
        'The demonstration: Solen removes a 3 from a shelf. Briefly, all groups of 3 in the room become 2 or 4. She puts it back. The horror is visceral.',
        'The zero crisis: the crystal representing zero is cracked, dim, nearly depleted. If it breaks, nothing ceases to exist.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Source',
      summary:
        'The party must find the source of numbers - the abstract plane where mathematical concepts originate - and either restart production, find a renewable model, or accept that mathematics is a finite resource and civilization must adapt. A faction attacks the vault, wanting to redistribute numbers regardless of the cost.',
      keyEvents: [
        'The redistribution faction: a coalition of merchants, engineers, and bankers who NEED 7 and 13 back and do not care about the long-term cost',
        'Vault siege: the party must defend the vault while preparing to enter the abstract plane of mathematics',
        'Entering the Numerical Plane: a space where every surface is an equation, every object is a quantity, and distance is measured in factors',
        'The Source: a wellspring of mathematical truth that has been running low for millennia. Not dry - but the drain exceeds the flow.',
        'The solution: the party can widen the source (risky, might destabilize the plane), reduce consumption (civilization must use fewer numbers), or create a new mathematical system that recycles (the hardest, most elegant option)',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Dr. Yara Solen',
      role: 'vault keeper / protector',
      personality:
        'Writes equations on every surface — walls, tables, her own arms. Counts things compulsively: tiles, heartbeats, words per sentence. Exhausted, paranoid, and fully aware that she looks insane. Hands shake when she holds the crystals. "I am not stealing numbers. I am keeping reality from dividing by zero. Do you know what happens when you divide by zero? Everything. Everything happens. All at once. Forever."',
      secret: 'She has already used up her personal allocation of the number 1. She is technically zero people. She exists only because she is standing in the vault where the concept of one is preserved.',
    },
    {
      name: 'Dr. Fennick Grale',
      role: 'ally / initial contact',
      personality:
        'A mathematician who noticed the gaps before anyone else. Frenetic, obsessive, and carrying notebooks full of equations that prove missing numbers existed. Everyone thinks he is mad. He has been right about everything.',
    },
    {
      name: 'Guildmaster Revka Toll',
      role: 'redistribution leader / antagonist',
      personality:
        'Head of the Merchants Guild. She needs 7 and 13 back because the economy is collapsing without them. She is not wrong - people are starving because logistics mathematics fail. She wants the vault opened and does not care about theoretical risks.',
    },
    {
      name: 'The Null',
      role: 'abstract entity / guardian',
      personality:
        'An entity that exists in the Numerical Plane, born from the concept of zero. It guards the source. It speaks in equations. It does not experience emotion but it understands that if zero dies, it dies. Self-preservation drives it. It is the universe immune response to mathematical collapse.',
    },
  ],
  keyLocations: [
    {
      name: 'The Vault of Numbers',
      description: 'A hidden chamber in a mountain where crystallized numbers are stored on shelves. Each crystal hums with a specific quantity. Empty shelves mark consumed numbers. The zero crystal flickers dangerously.',
      significance: 'The heart of the campaign. Where the truth is revealed and the vault must be defended.',
    },
    {
      name: 'The Collapsed District',
      description: 'A neighborhood where every 7-floor building lost a floor simultaneously. Rubble, displaced residents, and a gaping absence in the skyline where the math stopped working.',
      significance: 'Where the stakes are most visible. Real people hurt by missing numbers.',
    },
    {
      name: 'The Numerical Plane',
      description: 'The abstract dimension where mathematics originates. Every surface is an equation. Distance is measured in prime factors. The sky is a fractal. The source of numbers flows like a river of pure logic.',
      significance: 'The final location. Where the party must fix or replace the source of mathematical truth.',
    },
  ],
  dataSystems: ['puzzleRoom', 'riddleGenerator', 'plotTwistEngine', 'planarAnomaly', 'environmentalHazard'],
};
