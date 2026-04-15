import type { FullCampaign } from '../types';

export const theBoneAge: FullCampaign = {
  id: 'full-the-bone-age',
  type: 'full',
  title: 'The Bone Age',
  tagline: 'You are not in the past. You are in the place where everything that ever died still lives.',
  tone: 'survival',
  themes: ['wilderness', 'survival', 'exploration'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 16,
  settingSummary:
    'A failed teleportation drops the party into a world that should not exist. Cycads taller than castles. Dragonflies with six-foot wingspans. A Tyrannosaurus rex drinking from a river of liquid amber. This is not the distant past - it is the Bonelands, a demiplane where every extinction event sends its dead. Trilobites share tide pools with dodo birds. Woolly mammoths graze beside Parasaurolophus herds. Saber-toothed cats stalk Cretaceous forests. Evolution never happened here - everything just arrived. The landscape is layered: Permian deserts next to Jurassic swamps next to Ice Age tundra, all stitched together by a magic that preserves what the material plane discards.',
  hook: 'The party wakes in a clearing of giant horsetail ferns. Their teleportation circle is burned into the ground, cold and dead. A pack of Velociraptors watches from the treeline - not attacking, just watching with an intelligence that reptiles should not have. In the distance, smoke rises. Someone else is here. Someone who has been here a very long time.',
  twist:
    'Humans went extinct once. Ten thousand years before recorded history, a magical cataclysm wiped humanity from the material plane. The Bonelands received them like every other extinction - and they survived. A human civilization has existed here for ten millennia, building cities from dinosaur bone and volcanic glass, riding Pachycephalosaurus mounts, farming in the shadow of sauropods. They call themselves the Remnant. They have no memory of the material plane. They believe THIS is the only world. The party is not just stranded - they are the first proof that humanity exists elsewhere.',
  climax:
    'The party discovers the mechanism that sends extinct species to the Bonelands: a crystallized rift at the center of the demiplane. It can be reversed - to send the party home. But activating it risks destabilizing the entire Bonelands. The Remnant will lose their world. Dinosaurs, dodos, mammoths - everything preserved here could be erased. The party must choose: go home and potentially destroy this sanctuary, stay forever, or find a way to stabilize the rift so both worlds survive.',
  acts: [
    {
      title: 'Act 1: Survival',
      summary: 'Lost in the Bonelands. The party must find food, water, shelter, and avoid predators while piecing together where - and when - they are.',
      keyEvents: [
        'First night: building shelter while Allosaurus hunting calls echo through Jurassic conifers',
        'The layered landscape: walking from Cretaceous jungle into Permian desert in a hundred yards',
        'A Triceratops herd migration: the ground shakes for an hour. The party must get out of the way.',
        'Finding the smoke: a Remnant hunting party riding Pachycephalosaurus, armed with obsidian spears',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Remnant',
      summary: 'Contact with the human civilization. Learning their culture, earning trust, and discovering that humans were once extinct. The party becomes diplomats between worlds that did not know the other existed.',
      keyEvents: [
        'The bone city of Marrow: buildings carved from sauropod ribs, roads paved with fossilized shell',
        'The Remnant elders: suspicious, fascinated. They have legends of "the world above" but thought them myths.',
        'A predator crisis: a Spinosaurus has moved into the fishing grounds. The party helps drive it off.',
        'The archive: cave paintings that show the human extinction event. The party recognizes the magic that caused it.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Rift',
      summary: 'Finding the crystallized rift at the center of the Bonelands. Understanding it, deciding whether to use it, and dealing with the consequences.',
      keyEvents: [
        'The journey to the center: through zones of increasing temporal instability. Past and present overlap.',
        'The rift: a column of frozen light surrounded by the bones of every species that ever arrived',
        'The choice: activate it to go home (risk destroying the Bonelands) or find another way',
        'The resolution: whatever the party chooses, the Remnant and the material plane are changed forever',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Kala Marrowborn',
      role: 'Remnant guide / cultural bridge',
      personality: 'A young Remnant hunter who rides a scarred Pachycephalosaurus named Anvil. Curious about the party, brave to the point of recklessness. She wants to see "the world above" more than anything.',
    },
    {
      name: 'Elder Thorn',
      role: 'Remnant leader / cautious authority',
      personality: 'The oldest living Remnant. He has survived Tyrannosaurus attacks, volcanic eruptions, and three famines. He does not trust outsiders because trusting the wrong thing in the Bonelands gets you eaten.',
      secret: 'He has been to the rift. He knows it can send people back. He chose not to use it because he could not guarantee the Bonelands would survive.',
    },
    {
      name: 'Anvil',
      role: 'Pachycephalosaurus mount / companion',
      personality: 'Kala\'s mount. A dome-headed dinosaur the size of a horse with the temperament of a loyal, headbutting dog. Protective, stubborn, and surprisingly affectionate.',
    },
    {
      name: 'The Watcher',
      role: 'mysterious entity / rift guardian',
      personality: 'Something lives near the rift - not a creature, but an awareness. It speaks through the bones of extinct things. It has been here since the first extinction. It does not judge. It remembers.',
    },
  ],
  keyLocations: [
    { name: 'The Bonelands', description: 'A demiplane stitched together from every era of extinction. Cretaceous jungle next to Ice Age tundra next to Permian desert. The sky has no sun - just a diffuse amber glow.', significance: 'The entire campaign setting. Every biome is a different geological era.' },
    { name: 'Marrow', description: 'The Remnant capital, built from dinosaur bones, volcanic glass, and fossilized coral. Ten thousand people living in the ribcage of a long-dead sauropod.', significance: 'Home base for Act 2 and the cultural heart of the Remnant civilization.' },
    { name: 'The Crystallized Rift', description: 'A column of frozen light at the center of the Bonelands, surrounded by bones from every extinction event. The mechanism that receives the dead and could send the living home.', significance: 'The campaign\'s final destination and the site of the ultimate choice.' },
  ],
  dataSystems: ['wildernessSurvival', 'naturalDisaster', 'terrainAdvantage', 'companionAnimal', 'socialEncounter', 'npcRelationshipWeb', 'weatherEncounterInteraction', 'travelMontage'],
};
