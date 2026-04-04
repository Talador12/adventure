import type { OneShotCampaign } from '../types';

export const raftColony: OneShotCampaign = {
  id: 'oneshot-raft-colony',
  type: 'oneshot',
  title: 'Raft Colony',
  tagline: 'The world flooded. All that\'s left is a raft, 30 survivors, and something in the water.',
  tone: 'survival',
  themes: ['survival', 'horror'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 4,
  settingSummary:
    'A magical catastrophe flooded the world three days ago. The party and 30 NPCs are on a massive raft made of lashed-together debris, drifting on an endless ocean. Food is running out, factions are forming, and something large is circling beneath the raft. The party must hold the colony together, find dry land, and survive whatever is hunting them.',
  hook: 'The party wakes on the raft with no memory of how they got there. The raft leader — a panicking merchant — hands them authority because "you look like adventurers." Within an hour, a fight breaks out over the last water barrel.',
  twist:
    'The flood wasn\'t natural — it was a containment spell. Something was imprisoned at the bottom of the ocean, and a foolish wizard raised the water level to keep it submerged. The land isn\'t gone — it\'s below, intact, under 100 feet of magical water. The thing in the deep is the prisoner, and the water is its cage.',
  climax:
    'The party finds the wizard\'s tower (sticking above the water). Inside: the mechanism to reverse the flood. But reversing it releases the prisoner. The party must choose: keep the world flooded and find a way to survive on water permanently, drain the ocean and fight whatever emerges, or find a way to destroy the prisoner while it\'s still submerged.',
  scenes: [
    {
      title: 'Scene 1: Day Three on the Raft',
      summary:
        'The party takes charge. Resources are scarce, tensions are high, and the first crisis hits: a fight over water, a sick child, and something bumps the raft from below.',
      challenge: 'social',
      keyEvents: [
        'Water rationing crisis — two factions form (share equally vs. the strong eat first)',
        'A child is sick — Medicine check or lose morale',
        'Something large bumps the raft — panic spreads',
        'The party must establish order or watch the colony tear itself apart',
      ],
    },
    {
      title: 'Scene 2: The Deep',
      summary:
        'The creature beneath attacks. The party must defend the raft, repair damage, and discover that the water itself is magical. A wizard\'s tower is spotted on the horizon.',
      challenge: 'combat',
      keyEvents: [
        'Tentacles attack the raft — combat on a pitching, fragmenting surface',
        'Raft repair under fire — skill checks to hold the colony together',
        'Discovery: the water is warm, slightly luminous, and magical',
        'A tower peak visible above the water — hope, or a trap',
      ],
    },
    {
      title: 'Scene 3: The Tower',
      summary:
        'The party reaches the wizard\'s tower and discovers the truth. Inside is the mechanism to drain the world — and the warnings about what it will release.',
      challenge: 'exploration',
      keyEvents: [
        'The tower\'s upper floors — a dead wizard\'s study with journals explaining the flood',
        'The mechanism — a massive arcane device that controls the water level',
        'The prisoner stirs — vibrations shake the tower',
        'The final choice: flood, drain, or destroy',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Marcus the Merchant',
      role: 'reluctant leader',
      personality:
        'A middle-aged merchant who ended up in charge because he owned the biggest piece of debris. Completely out of his depth. Will gladly hand authority to the party.',
    },
    {
      name: 'Kira Stormborn',
      role: 'faction leader / potential ally',
      personality:
        'A tough, pragmatic sailor who believes in survival of the fittest. Not evil — just realistic. Respects strength.',
    },
    {
      name: 'The Dead Wizard (journals)',
      role: 'exposition / absent antagonist',
      personality:
        'Known only through journals. Meant well. Panicked. Made the worst possible decision for the best possible reason.',
    },
  ],
  keyLocations: [
    {
      name: 'The Raft',
      description:
        'A 60-foot platform of lashed debris carrying 30+ survivors. It creaks, shifts, and occasionally a section breaks free.',
      significance: 'The colony and the party\'s responsibility.',
    },
    {
      name: 'The Endless Ocean',
      description:
        'Warm, faintly glowing, magically sustained water covering the entire world. Nothing natural lives in it. Something unnatural does.',
      significance: 'The environment and the containment mechanism.',
    },
    {
      name: 'The Wizard\'s Tower',
      description:
        'Only the top three floors are above water. Inside: research notes, the flood mechanism, and the terrible truth.',
      significance: 'Where the decision that determines the world\'s fate is made.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'navalCombat',
    'shipCrewManagement',
    'naturalDisaster',
    'encounterWaves',
    'cataclysmCountdown',
  ],
};
