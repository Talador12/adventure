import type { FullCampaign } from '../types';

export const theWorldIsACreature: FullCampaign = {
  id: 'full-the-world-is-a-creature',
  type: 'full',
  title: 'The World Is a Creature',
  tagline: 'The mountains are bones. The rivers are veins. The ground just started breathing.',
  tone: 'horror',
  themes: ['horror', 'exploration', 'survival'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 16 },
  estimatedSessions: 16,
  settingSummary:
    'The world is alive. Not metaphorically. The mountains are its skeleton. The rivers are its circulatory system. The forests are body hair. The magma core is its heart. Civilization has existed on this body for millennia without knowing it was a body. Now the creature is waking up. Earthquakes are muscle twitches. Volcanic eruptions are fever responses. And the immune system has activated. The party has been flagged as a foreign organism. White-cell creatures are hunting them across a world that wants them expelled.',
  hook:
    'The ground breathes. Not a metaphor. The party feels the earth beneath them rise and fall in a slow, rhythmic cycle. Trees sway without wind, following the breath. A river pulses like an artery. Then a wound opens in the earth - not a crack, a cut - and something white and amorphous crawls out, heading directly for the nearest town. A healer examines the substance: "This is a white blood cell. The size of a horse. The world has an immune system and we just triggered it."',
  twist:
    'The world is not hostile. It is sick. The immune response is not targeting the party specifically - it is in overdrive because the creature is dying of an infection. The infection is civilization itself. Ten thousand years of mining, building, and magical drilling has introduced something toxic to the creature system. The party is not the disease. But they are part of a species that is. The cure requires either removing civilization from the creature (impossible) or healing the creature while it lives beneath millions of people who do not know they are parasites.',
  climax:
    'The party must descend to the creature heart (the planetary core) and administer a cure - a magical treatment that will make civilization compatible with the host body. But the cure changes the world: metal veins become actual veins. Stone bones become actual bones. The world becomes visibly, undeniably alive. Mountains move. Rivers redirect. The ground is warm and pulses. Humanity must learn to live on a body that is aware of them.',
  acts: [
    {
      title: 'Act 1: The Awakening',
      summary:
        'The world shows signs of life. The ground breathes. Water pulses. The immune system activates. White-cell creatures emerge and attack settlements. The party investigates and discovers the horrifying truth: they live on a living organism.',
      keyEvents: [
        'The first breath: the earth rises and falls beneath the party feet. Animals panic. Birds flee.',
        'White cell emergence: amorphous creatures crawl from cracks in the earth, attacking anything "foreign" - including buildings',
        'A scholar deciphers ancient texts: "The First People knew. They called the world Soma. They said it slept. They begged us not to wake it."',
        'Mapping the anatomy: mountains correspond to a skeletal structure. Rivers follow circulatory patterns. The world has organs.',
        'The immune system targets the party specifically after they enter a cave (a pore) - they are now marked.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Diagnosis',
      summary:
        'The party must find out why the world is waking up and what is making it sick. They travel through the body of the world - navigating vein-tunnels, crossing organ-chambers, avoiding immune responses - to find the source of the infection. The answer is uncomfortable: it is civilization.',
      keyEvents: [
        'Entering the vein system: underground rivers that are literally blood vessels. The current has a pulse.',
        'The Liver: a vast underground cavern that filters toxins. It is overwhelmed - mine runoff, magical waste, industrial pollution',
        'Meeting the Nerve Speakers: a cult that has communicated with the world for centuries. They confirm it is dying.',
        'The diagnosis: civilization is a low-grade infection. Mining is drilling into bones. Cities are lesions. Magic use irritates the nervous system.',
        'The moral crisis: the party is part of the infection. Their armor is made from the creature bones. Their potions from its blood.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Cure',
      summary:
        'The party descends to the heart to administer a symbiosis cure - magic that will make civilization compatible with the host body. The journey through the deep body is the most dangerous environment they have ever faced. The cure works but changes the world forever.',
      keyEvents: [
        'Descent to the core: navigating through muscle layers, past the stomach (a magma chamber), through bone marrow caverns',
        'The heart: a chamber the size of a country, pulsing with heat and light. The heartbeat is deafening.',
        'Administering the cure: a ritual that requires the party to bond with the creature immune system - becoming part of the body',
        'The transformation: the world visibly changes. Stone becomes warm. Mountains shift. Rivers reroute. The ground has a heartbeat you can feel.',
        'The surface: humanity discovers they live on something alive. Panic. Wonder. The beginning of a new relationship with the world.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Whisper',
      role: 'Nerve Speaker leader',
      personality:
        'Leader of the cult that communicates with the world creature. Speaks in half-sentences because the world speaks in feelings, not words. Patient, strange, and deeply sad. She has known the world was dying for decades and nobody believed her.',
      secret: 'She is partially bonded with the creature nervous system. She feels its pain. Every mine that opens is a wound she experiences.',
    },
    {
      name: 'The Phage',
      role: 'immune system commander',
      personality:
        'The largest and most intelligent white-cell creature. Not evil - it is doing its job. It hunts foreign bodies with clinical precision. Can be reasoned with if the party proves they are trying to help, not harm. Communicates through chemical signals.',
    },
    {
      name: 'Dr. Korvel Ashwick',
      role: 'biologist / ally',
      personality:
        'A naturalist who has been studying "anomalous geological behavior" for 30 years. He mapped the circulatory system without knowing what it was. When the truth clicks, he is equal parts horrified and vindicated. "I TOLD the academy these rock formations were organic."',
    },
    {
      name: 'Mining Baron Drest Ironfall',
      role: 'political obstacle',
      personality:
        'The wealthiest mine owner on the continent. His mines are the deepest wounds in the creature body. He refuses to believe the world is alive because believing it means his entire fortune was built on butchery. He is not wrong to resist - millions of jobs depend on mining.',
    },
  ],
  keyLocations: [
    {
      name: 'The Vein Tunnels',
      description: 'Underground rivers that pulse with a heartbeat. The water is warm, mineral-rich, and slightly luminescent. The walls are smooth organic tissue disguised as stone.',
      significance: 'The primary travel network through the world body. Beautiful, claustrophobic, and alive.',
    },
    {
      name: 'The Liver',
      description: 'A vast underground cavern that filters toxins from the creature system. Currently overwhelmed and failing. The air smells like chemicals and the walls weep dark fluid.',
      significance: 'Where the infection is most visible and the moral stakes become clear.',
    },
    {
      name: 'The Heart',
      description: 'The planetary core. A chamber so vast you cannot see the far wall. It pulses with heat and light on a rhythm. The heartbeat shakes your bones. It is the most beautiful and terrifying place in the world.',
      significance: 'The final location. Where the cure is administered and the world changes forever.',
    },
  ],
  dataSystems: ['environmentalHazard', 'survivalCondition', 'combatNarration', 'magicalEcosystem', 'wildernessExploration'],
};
