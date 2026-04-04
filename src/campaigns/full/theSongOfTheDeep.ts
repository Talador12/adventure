import type { FullCampaign } from '../types';

export const theSongOfTheDeep: FullCampaign = {
  id: 'full-song-of-deep',
  type: 'full',
  title: 'The Song of the Deep',
  tagline: 'Something is singing at the bottom of the ocean. The fish are listening.',
  tone: 'exploration',
  themes: ['nautical', 'exploration', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'A haunting melody is rising from the ocean floor — audible to anyone within a mile of the coast. Fish behave strangely, swimming in spirals. Whales beach themselves. Sailors report hearing a voice that\'s beautiful and terrifying. The song is getting louder. The party must find its source — which means going to the bottom of the ocean.',
  hook: 'A coastal town hires the party: the fishermen won\'t go out because the song drives them mad, the fish are swimming in circles, and last night the song was so loud the harbor vibrated. A marine wizard offers the party water-breathing enchantments and a submersible. "I can get you down. Getting you back up is your problem."',
  twist:
    'The singer is a primordial being — the world\'s first bard, an entity that existed before gods, who sang creation into existence. It stopped singing eons ago and the world solidified. It\'s started again because it\'s rewriting the world — composing a new song. If it finishes, the current reality is overwritten. The song is a rough draft of a new universe.',
  climax:
    'The party reaches the singer at the deepest point in the ocean. It\'s not hostile — it\'s creating. Destroying it kills music itself. Silencing it freezes the world as-is (no change, no growth, no new songs). The party can add to the song — weaving their world into the new composition so reality evolves instead of being replaced.',
  acts: [
    {
      title: 'Act 1: The Coastal Crisis',
      summary:
        'The song\'s effects on the coast: mad fishermen, strange tides, beached whales, and the first dive beneath the surface.',
      keyEvents: [
        'The song: beautiful, maddening, getting louder every day',
        'Coastal investigation: the fish are forming patterns — musical notation',
        'The submersible and water-breathing enchantments acquired',
        'First dive: the continental shelf — the song is deafening here',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Deep',
      summary:
        'Descending through ocean layers. Each depth brings new wonders, new dangers, and the song grows clearer. Underwater civilizations are already affected.',
      keyEvents: [
        'Sunlight zone: merfolk are entranced — swimming toward the source',
        'Twilight zone: a sahuagin war party, also heading down, willing to ally',
        'Midnight zone: bioluminescent horrors, crushing pressure, beautiful silence — then the song returns',
        'The Abyssal zone: the song is so clear here it has words. They\'re in a language older than language.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Singer',
      summary:
        'The ocean floor. A being older than gods. A song that rewrites reality. The choice to destroy, silence, or harmonize.',
      keyEvents: [
        'The Singer revealed: a vast, ancient, beautiful entity at the bottom of everything',
        'The rough draft: the party sees glimpses of the new world the song is creating',
        'Negotiation: the Singer doesn\'t want to erase this world — it didn\'t know this world existed',
        'The harmonization: the party sings their world\'s story into the new composition',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Coral Vex',
      role: 'marine wizard / equipment provider',
      personality:
        'An eccentric marine biologist-wizard who has been studying the song for months. Obsessed with the ocean. "I\'ve spent my life studying the deep. I\'ve never heard it sing back."',
      secret: 'She can partially understand the song. She hasn\'t told anyone because what it says terrifies her — it\'s not just singing, it\'s composing a replacement for everything.',
    },
    {
      name: 'Tidecaller Neri',
      role: 'merfolk ally',
      personality:
        'A merfolk elder who is fighting the song\'s influence on her people. She\'s one of the few who can hear it without going mad. "It\'s not evil. It\'s just... very, very old."',
    },
    {
      name: 'The Singer',
      role: 'the source / not a villain',
      personality:
        'A primordial being that experiences reality as music. It didn\'t know the current world was "alive." It was composing what it thought was silence. "There are... listeners? I didn\'t know there were listeners."',
    },
    {
      name: 'Krull (sahuagin war-chief)',
      role: 'reluctant ally',
      personality:
        'A sahuagin leader heading to the source for his own reasons: the song is driving his people insane. Distrustful of surface-dwellers but pragmatic. "We kill the song or it kills us. I don\'t care who helps."',
    },
  ],
  keyLocations: [
    {
      name: 'Port Serene',
      description: 'A coastal town where the song is loudest. Fishermen wear earplugs. The harbor water vibrates in musical patterns.',
      significance: 'Where the adventure begins.',
    },
    {
      name: 'The Deep Layers',
      description: 'Ocean zones from surface to abyss — each deeper layer has different creatures, pressures, and effects of the song.',
      significance: 'The primary exploration environment.',
    },
    {
      name: 'The Singer\'s Chamber',
      description: 'A vast cavern at the ocean floor where a being older than gods sits and sings. The water here is warm. Reality is soft.',
      significance: 'Where the final encounter and choice take place.',
    },
  ],
  dataSystems: [
    'navalCombat',
    'wildernessSurvival',
    'encounterWaves',
    'monsterEcology',
    'ancientProphecy',
    'magicalAnomaly',
    'darkBargain',
    'diplomaticNegotiation',
    'ambientSounds',
  ],
};
