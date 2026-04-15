import type { FullCampaign } from '../types';

export const theHoundOfEveryRoad: FullCampaign = {
  id: 'full-hound-of-every-road',
  type: 'full',
  title: 'The Hound of Every Road',
  tagline: 'Every road leads to it. Go where there are no roads.',
  tone: 'epic',
  themes: ['planar', 'wilderness', 'epic', 'exploration'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 15 },
  estimatedSessions: 22,
  settingSummary:
    'The world is crisscrossed with roads - trade roads, pilgrim paths, game trails, ley lines, even the currents of rivers and the orbits of stars. The Hound of Every Road exists on all of them simultaneously. It is a divine hunting beast the size of a house, made of compressed starlight and old hunger. Where there is a path, the Hound can see you. Where there is a road, the Hound can reach you. The only safe ground is pathless ground: trackless wilderness, underground rivers, open ocean, the spaces between planes where no one has walked before.',
  hook: 'The party is celebrating in a crossroads tavern when a woman stumbles through the door, bleeding from wounds that glow faintly silver. She says one sentence before collapsing: "Verath lost the wager. You are the penalty. Get off the roads." Within the hour, a howl shakes every road within fifty miles. Travelers drop to their knees. Horses bolt. The sound comes from every direction at once. Through the tavern window, the party sees it - a shape like a wolf made of white fire, standing at the crossroads, looking directly at them. They have until it finishes howling to get off every path, road, and trail within reach.',
  twist:
    'The goddess Verath did not lose the wager by accident. She rigged the bet against herself because she needed the Hound deployed - it was the only way to force it out of her divine kennels. The Hound was supposed to be controllable. It is not. It has been growing in power for centuries, feeding on every journey ever taken on every road. Verath cannot recall it, cannot command it, and cannot destroy it. She chose the party as the penalty because she has been watching them and believes they are capable of doing what she cannot: unmake the divine contract that birthed the Hound. She is secretly helping them through signs, omens, and convenient collapses of terrain that open pathless routes. She feels guilty about this. Not guilty enough to stop.',
  climax:
    'The party reaches the Unwoven Place - a gap between planes where no road has ever existed. Here, divine contracts can be unraveled because the laws that bind gods are thinner where no one has walked. The Hound is circling the boundary, pacing every path that leads near this place, howling. The party must perform an unmaking - pulling apart the threads of the wager that created the Hound while the beast tears at the edges of the Unwoven Place, trying to force a road into existence. If a path forms, even a footpath, the Hound can enter. The party must work in a place with no direction, no landmarks, and no ground that stays the same twice.',
  acts: [
    {
      title: 'Act 1: Off the Map',
      summary:
        'The party flees the roads and enters trackless wilderness. They learn the rules: roads are death, paths are dangerous, even game trails can betray them. They meet others who have fled the Hound before and discover the divine wager that put them in this position.',
      keyEvents: [
        'The crossroads howl: first sighting of the Hound, a wolf of white fire standing on every road at once',
        'Fleeing into the Thornveil Forest: no trails, no clearings, navigation by moss and instinct',
        'A hermit named Ossik explains the Hound - he has been off-road for forty years. He was a previous penalty.',
        'The party discovers that rivers count as roads. A near-miss on a ford that suddenly glows silver.',
        'Verath sends the first sign: a constellation rearranges itself to point toward the mountains',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: The Pathless Places',
      summary:
        'The party travels through places with no roads: underground river systems, open ocean on a raftless crossing, the Underdark where tunnels do not count as paths if no one has named them. They piece together the truth about Verath and the Hound while the beast adapts, learning to create its own roads.',
      keyEvents: [
        'Underground passage through a flooded cave system with no mapped route',
        'Open ocean crossing: the party builds a raft and sails with no destination, because destinations require routes',
        'The Hound learns to make roads. A silver path burns itself into a hillside, and the beast walks down it.',
        'A planar scholar trapped between worlds explains divine contracts and how they can be unmade',
        'Verath appears in a dream and admits the truth: she rigged the bet, the Hound is her mistake, and the Unwoven Place is the only solution',
      ],
      estimatedSessions: 8,
    },
    {
      title: 'Act 3: The Unwoven Place',
      summary:
        'The party reaches the gap between planes. The Hound circles outside. The unmaking begins. Every step of the ritual is complicated by a landscape that has no rules because no one has ever been here to make any. The Hound burns new roads toward them, and the party must erase them as fast as they form.',
      keyEvents: [
        'Entering the Unwoven Place: a void where direction is a suggestion and distance is negotiable',
        'The unmaking ritual: pulling apart the threads of a divine contract while the ground shifts underfoot',
        'The Hound forces a road into the Unwoven Place. Silver fire on nothing. The party has minutes to destroy it.',
        'Verath manifests to hold the boundary, burning through her divine essence to buy the party time',
        'The wager unravels. The Hound howls once - not in anger but in confusion, like a dog whose master vanished. It dissolves into every road simultaneously and is gone.',
        'Epilogue: the roads are safe. Verath is diminished. The party walks a road for the first time in months.',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'Verath',
      role: 'goddess / secret patron / guilty party',
      personality:
        'A trickster goddess of travelers and crossroads who got too clever for her own good. Speaks through omens, rearranged stars, and dreams. Witty, evasive, deeply ashamed of what she has done. Manifests as a woman with road-dust on her boots and silver in her eyes.',
      secret: 'The wager was with her own aspect - a fragment of herself she split off centuries ago. The Hound is made from her own divine essence. Killing it diminishes her permanently.',
    },
    {
      name: 'Ossik',
      role: 'hermit / guide / survivor',
      personality:
        'A weathered old man who was the Hound\'s penalty forty years ago. Survived by never setting foot on a road again. Lives in a cave he dug himself in a place with no trails. Bitter, practical, knows more about pathless travel than anyone alive. Talks to his goat more than to people.',
      secret: 'He made it to the Unwoven Place once. He turned back because the void terrified him more than the Hound. He has never forgiven himself.',
    },
    {
      name: 'Irixa',
      role: 'planar scholar / reluctant ally',
      personality:
        'A tiefling wizard trapped in a pocket dimension between planes. She fell through a hole in reality six years ago and cannot find a way out because there are no paths to follow. Brilliant, slightly unhinged from isolation, talks at high speed about theoretical cosmology.',
      secret: 'She can see the threads of divine contracts. She has been watching the Hound from between planes and has mapped its pattern. She knows the unmaking is possible. She does not know if it is survivable.',
    },
  ],
  keyLocations: [
    {
      name: 'The Thornveil Forest',
      description:
        'An ancient forest so dense that no trail has ever been successfully cut through it. Trees grow back overnight. Paths close behind you. The forest itself is pathless by nature, not by design.',
      significance: 'The party\'s first refuge. Safe from the Hound, hostile in every other way.',
    },
    {
      name: 'The Nameless Caverns',
      description:
        'An underground river system with no maps and no names. Water carved these tunnels over millennia with no purpose and no direction. The darkness is absolute and the acoustics are wrong.',
      significance: 'A critical mid-campaign transit route. No roads underground means no Hound, but also no way to know where you are.',
    },
    {
      name: 'The Unwoven Place',
      description:
        'A gap between planes where reality was never finished. No ground, no sky, no direction. Space folds on itself. Walking forward might bring you back. The only constant is the faint silver glow of the Hound circling the boundary outside.',
      significance: 'The final arena. The only place a divine contract can be unmade because no laws were ever established here.',
    },
  ],
  dataSystems: [
    'planarAnomaly',
    'travelPace',
    'wildernessHazard',
    'weatherPattern',
    'survivalCondition',
    'chaseSequence',
    'puzzleMechanism',
    'campingEvent',
  ],
};
