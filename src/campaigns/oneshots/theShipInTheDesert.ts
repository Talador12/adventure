import type { OneShotCampaign } from '../types';

export const theShipInTheDesert: OneShotCampaign = {
  id: 'oneshot-ship-in-the-desert',
  type: 'oneshot',
  title: 'The Ship in the Desert',
  tagline: 'A three-masted galleon in the deep desert. Flag still flying. Anchor buried in sand. Breakfast still warm below decks. No crew.',
  tone: 'exploration',
  themes: ['exploration', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'A trade caravan reports a fully rigged sailing ship sitting upright in the deep desert, 500 miles from any body of water. The ship is recent: sails intact, hull undamaged, cargo still in the hold. There is no crew. No tracks in the sand. No explanation. The party investigates.',
  hook: 'The party crests a dune and there it is: a three-masted galleon, sitting perfectly level on the sand as though the ocean simply vanished from around it. The flag is still flying. The anchor is down, buried in sand instead of seabed. Breakfast is on the table below decks, still warm.',
  twist: 'The ship did not travel here. The ocean did. The desert sits on top of what was once a sea, drained millennia ago. A malfunctioning artifact in the ship\'s hold is pulling objects through time. The ship is from the past, when this desert was an ocean. The artifact is destabilizing, pulling more of the past through: water is seeping up through the sand.',
  climax: 'The time artifact is accelerating. The ancient ocean is bleeding through in growing pools around the ship. The party must deactivate the artifact before the desert floods with a prehistoric sea, or let it run and restore the ancient ocean, drowning the trade routes and settlements built on the dry seabed.',
  scenes: [
    {
      title: 'Scene 1: The Impossible Ship',
      summary: 'Approaching and boarding the ship. Everything is intact, fresh, and wrong. No crew, no explanation, no tracks.',
      challenge: 'exploration',
      keyEvents: [
        'The ship: three masts, full sails, sitting on sand as naturally as on water',
        'Below decks: warm food, personal belongings, a captain\'s log dated 3,000 years ago',
        'The cargo hold: trade goods from a civilization that no longer exists',
        'A locked chest containing a crystalline device that hums with temporal energy',
      ],
    },
    {
      title: 'Scene 2: The Bleeding Past',
      summary: 'Water begins appearing around the ship. Pools form in the sand. Sea creatures from an ancient ocean surface briefly before vanishing.',
      challenge: 'exploration',
      keyEvents: [
        'Water seeps up through sand that has been dry for millennia. It pools around the ship in expanding circles, cold and salt-sharp, carrying the smell of a living ocean',
        'Things surface in the pools: translucent fish with too many fins, kelp that glows faintly blue, a jellyfish pulsing in water that should not exist. Creatures from an ecosystem that died 3,000 years ago',
        'The artifact pulses faster. Water rises to ankle depth across a mile of desert. The sand beneath dissolves into mud, then sediment, then open water',
        'A ghostly overlay shimmers into existence: waves cresting where dunes stood, the silhouette of a harbor on a horizon that holds no city, the distant cry of seabirds that went extinct with the ocean',
      ],
    },
    {
      title: 'Scene 3: The Choice',
      summary: 'The artifact must be dealt with. Deactivating it saves the present. Letting it run restores the ancient sea. Both have consequences.',
      challenge: 'puzzle',
      keyEvents: [
        'The artifact: a temporal anchor built to preserve trade routes that no longer exist',
        'Deactivation: requires solving the device\'s runic sequence as water rises',
        'The alternative: let the ocean return, restoring an ecosystem at the cost of the desert',
        'The crew appears as temporal ghosts, confused, asking why the ocean is gone',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Caravan Master Sabil', role: 'quest giver', personality: 'A desert trader who has crossed this route a hundred times and never seen anything but sand. Shaken but professional. "I do not need an explanation. I need it gone before it blocks my route."' },
    { name: 'Captain Morwen (ghost)', role: 'temporal echo', personality: 'The ship\'s captain, appearing as the artifact activates. Confused, imperious, and 3,000 years out of date. "What do you mean there is no sea? I can see the docks from here."' },
    { name: 'Navigator Zul', role: 'ally', personality: 'A party guide who specializes in desert travel and recognizes the fossilized shells in the sand for what they are. "This was all ocean once. I just never thought it could be again."' },
  ],
  keyLocations: [
    { name: 'The Desert Ship', description: 'A perfectly preserved galleon sitting upright on desert sand, 500 miles from water.', significance: 'The central mystery and location for most of the adventure.' },
    { name: 'The Expanding Shore', description: 'A growing area around the ship where ancient seawater bleeds through time.', significance: 'The escalating threat that forces the party to act.' },
    { name: 'The Cargo Hold', description: 'Below decks, containing trade goods from a dead civilization and the temporal artifact.', significance: 'Where the artifact is found and the climax plays out.' },
  ],
  dataSystems: ['explorationChallenge', 'puzzleLock', 'weatherGenerator', 'monsterLore', 'magicItemGenerator'],
};
