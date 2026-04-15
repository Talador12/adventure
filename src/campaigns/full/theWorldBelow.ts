import type { FullCampaign } from '../types';

export const theWorldBelow: FullCampaign = {
  id: 'full-the-world-below',
  type: 'full',
  title: 'The World Below',
  tagline: 'The mine goes down 200 miles. Something dug it from the bottom.',
  tone: 'exploration',
  themes: ['underdark', 'exploration', 'survival'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 14 },
  estimatedSessions: 20,
  settingSummary:
    'The Descent is the deepest vertical shaft in the known world. It drops straight down through the crust, past the Underdark, past the magma layer, into zones that have no names because no one has returned to name them. The shaft is not natural. Something carved it - claws or tools or both, moving upward from a depth that should not support life. The Miners Guild has been following it down for decades, establishing camps at each level, losing expeditions to things that defy cataloging. The party joins the deepest push yet: past Camp Twelve, into the unnamed levels, following the claw marks to whatever made them.',
  hook: 'The Miners Guild posts a contract in every adventuring hall on the surface: "Expedition members needed for deep exploration. Requirements: combat ability, survival skills, comfort with enclosed spaces. Compensation: name a level after yourself. Warning: the last three expeditions below Camp Twelve did not return. We found their supplies. We did not find them." The party signs up. The elevator to Camp Twelve takes four hours to descend.',
  twist:
    'The shaft was not dug by something escaping the depths. It was dug by something escaping the surface. Millions of years ago, a being of immense power fled the wars of the surface world and carved downward, seeking peace. The deepest level is not a hellscape - it is a paradise. A vast underground garden lit by bioluminescent crystal, watered by thermal springs, populated by creatures that evolved in perfect isolation. The being that dug the shaft lives here still, ancient and content. It was not running from something. It was running to something. The party is the first surface-dweller to find it.',
  climax:
    'The party reaches the Garden. The being - an ancient elemental of stone and light - welcomes them. It has no interest in the surface. It left because the surface was violent. It asks one thing: do not tell anyone what you found. The party must choose: honor the request and return with no proof (losing the Guild contract, their reputations, everything they came for), or reveal the Garden to the surface world and watch it be exploited. The elevator is a long ride up. Plenty of time to decide.',
  acts: [
    {
      title: 'Act 1: The Known Depths',
      summary: 'Camps One through Twelve. The party descends through mapped territory - the Underdark, the magma margins, the crystal caverns - resupplying at Guild camps and hearing stories from veteran miners.',
      keyEvents: [
        'The elevator: a four-hour descent in a rattling cage. The walls change from stone to crystal to obsidian.',
        'Camp Seven: the last "comfortable" stop. A veteran miner warns: "Past Twelve, the compass stops working. So does prayer."',
        'The Underdark crossing: familiar dangers - drow patrols, mind flayer territory, fungal forests',
        'Camp Twelve: the frontier. The last outpost. Beyond this, the shaft enters unnamed territory.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Unnamed Levels',
      summary: 'Below Camp Twelve. Every level is a different ecosystem that should not exist at this depth. The party maps, survives, and follows the claw marks deeper.',
      keyEvents: [
        'The Crystal Forest: trees made of living quartz that grow toward heat instead of light. They sing when the temperature changes.',
        'The Magnetic Caves: metal floats. Armor drifts off your body. Weapons orbit the ceiling. Combat is transformed.',
        'The Living Stone: caverns where the walls move. Not collapse - breathe. The stone is alive and curious.',
        'The Lake of Liquid Time: water that flows backward. Objects placed in it age in reverse. The claw marks end at its shore.',
      ],
      estimatedSessions: 8,
    },
    {
      title: 'Act 3: The Garden',
      summary: 'The deepest level. A paradise carved by something that wanted peace. The party meets the digger, understands the shaft, and faces a choice with no right answer.',
      keyEvents: [
        'The transition: the shaft opens into vast space. The party steps out of darkness into soft light. Bioluminescent crystal illuminates a garden the size of a city. The air smells like rain.',
        'The Garden: thermal springs that steam gently, crystal trees bearing fruit that glows from within, creatures that move without fear because nothing here has ever hunted them.',
        'The Digger: Geode rises from the stone like a mountain waking up. Eyes of crystal. Voice of grinding tectonic plates. "You came from above. How is it up there?" Pause. "Still violent?" It is not impressed by the answer.',
        'Quiet moment: the party sits in the Garden eating crystal fruit. It tastes like the best thing any of them have ever eaten. Geode sits nearby, watching, content. Nobody speaks. Nobody needs to.',
        'The request: "Do not tell them about me. They will come with picks and ambition. They always do." The elevator ride home is the longest four hours of their lives.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Foreperson Bren Deepdelve',
      role: 'expedition leader / Guild authority',
      personality: 'A dwarf who has spent more of her life underground than above. She leads the expedition with competence and dark humor. "If I die down here, bury me deeper. I want to see what is next."',
    },
    {
      name: 'Geode',
      role: 'the Digger / ancient elemental',
      personality: 'An elemental being of stone, crystal, and soft light. It carved the shaft over millions of years, one claw-length at a time, moving away from violence toward peace. It does not hate the surface. It simply prefers the quiet.',
    },
    {
      name: 'Scraps',
      role: 'deep survivor / wild card',
      personality: 'A human from a previous lost expedition who survived alone below Camp Twelve for three years by eating cave mushrooms and befriending the Living Stone. He is not entirely sane, but he knows the unnamed levels better than anyone alive.',
      secret: 'He found the Garden. He chose to stay. He came back because he ran out of mushrooms.',
    },
    {
      name: 'Prill',
      role: 'Guild cartographer / knowledge seeker',
      personality: 'A gnome obsessed with mapping every inch of the Descent. She has named seventeen new minerals and discovered four ecosystems. She will not stop. She cannot stop. The unknown is the only thing that keeps her moving forward.',
    },
  ],
  keyLocations: [
    {
      name: 'The Descent',
      description: 'A vertical shaft 200 miles deep. Carved by claws from the bottom up — the claw marks point downward, meaning something dug upward toward the surface, then turned around and went home. Each level is a different world.',
      significance: 'The entire campaign is a journey down this shaft. Each level is a session. Each level is stranger than the last.',
    },
    {
      name: 'Camp Twelve',
      description: 'The deepest Guild outpost. A collection of tents and supply caches bolted to the shaft wall with iron spikes. A message board holds notes from previous expeditions. The last note reads: "Beautiful down here. Do not follow us."',
      significance: 'The last safe point. Everything below is uncharted. The last place where the party can turn back.',
    },
    {
      name: 'The Garden',
      description: 'A vast bioluminescent cavern at the deepest point. Crystal trees bearing actual fruit that tastes like sunlight. Thermal springs that steam gently. Creatures that have never known the sun and do not miss it. Paradise, built by something that wanted to be left alone.',
      significance: 'The campaign\'s destination. The most beautiful place the party will ever see. The hardest secret they will ever keep.',
    },
  ],
  dataSystems: ['wildernessSurvival', 'magicalAnomaly', 'terrainAdvantage', 'abandonedMine', 'naturalDisaster', 'travelMontage', 'companionAnimal', 'npcRelationshipWeb', 'partyMoraleTracker'],
};
