import type { OneShotCampaign } from '../types';

export const theEscortMission: OneShotCampaign = {
  id: 'oneshot-the-escort-mission',
  type: 'oneshot',
  title: 'The Escort Mission',
  tagline: 'Escort an NPC who actively tries to die. Not suicidal - just catastrophically unlucky and oblivious.',
  tone: 'shenanigans',
  themes: ['comedy', 'survival', 'exploration'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The party must escort Merchant Aldric Pemberton from the city of Voss to the village of Thornfield. A three-day journey through mild countryside. Should be easy. Aldric is the unluckiest man alive and the most oblivious. He walks toward every trap. He pets every monster. He eats suspicious mushrooms. He stands on cliff edges for the view. He has survived forty years through sheer cosmic accident and the party must continue this streak for seventy-two hours.',
  hook: 'The merchant guild pays triple rate because every previous escort party quit. "He is not difficult," the guild rep says with dead eyes. "He is just... unfortunate. And curious. And he does not listen. At all. To anyone. Ever. The last escort found him trying to befriend a displacer beast. He thought it was a cat."',
  twist: 'Aldric is not just unlucky - he is cosmically protected. A trickster god finds him amusing and keeps him alive through increasingly improbable means. The god is also the one sending dangers his way because the near-misses are entertaining. The party is not protecting Aldric from danger. They are actors in a divine comedy and the audience is a god.',
  climax: 'The final stretch to Thornfield: a bridge over a gorge. Aldric immediately walks to the edge of the decaying bridge, leans over, and says "What a lovely view!" The bridge collapses. The party must save Aldric while he free-falls, oblivious, commenting on the scenery. "Oh look, a bird!" The bird is a roc. The roc catches Aldric. The god laughs.',
  scenes: [
    {
      title: 'Day One: Introduction to Aldric',
      summary: 'The party meets Aldric and within the first hour understands why every previous escort quit. He wanders off the path, touches everything, and has the survival instincts of a lemming.',
      challenge: 'social',
      keyEvents: [
        'Aldric introduces himself. He is cheerful, well-dressed, and immediately walks into a tree. "The trees here are aggressive!"',
        'First near-death: Aldric picks a mushroom and eats it before anyone can stop him. It is a Death Cap. He is fine. He thinks it was "tangy."',
        'The party sets watches at night. Aldric wakes up, wanders into the forest to "see the fireflies," and is found petting a wolf. The wolf is confused.',
        'The rogue puts a bell on Aldric. Aldric thinks it is a gift. He is touched. He jingles constantly now.',
      ],
    },
    {
      title: 'Day Two: Escalation',
      summary: 'The dangers increase. Aldric\'s obliviousness keeps pace. The party is exhausted from constant vigilance. Aldric is having the best trip of his life.',
      challenge: 'combat',
      keyEvents: [
        'A pit trap in the road. Aldric walks around it to look at a flower. Falls in the pit anyway. From the side. "A tunnel! How exciting!"',
        'Bandits attack. Aldric tries to negotiate a fair trade with them. While they are shooting arrows. He offers them cheese.',
        'A river crossing. Aldric decides to take the scenic route and walks upstream. Into rapids. Past a waterfall. "The water here has personality!"',
        'The fighter physically carries Aldric for an hour. Aldric thinks it is a local custom. He is delighted.',
      ],
    },
    {
      title: 'Day Three: The Bridge',
      summary: 'The final obstacle. A decaying bridge over a gorge. Aldric sees it as a photo opportunity. The party sees it as their worst nightmare.',
      challenge: 'puzzle',
      keyEvents: [
        'The bridge: rotting rope, missing planks, a 200-foot drop. Aldric: "Charming! Very rustic."',
        'He walks to the middle, leans on the rope, and it snaps. He does not fall. His coat catches on a nail. "Breezy up here!"',
        'The bridge collapses. Aldric falls. The party scrambles. Ropes, spells, everything.',
        'A roc swoops in and catches Aldric mid-fall. Aldric thinks it is a tour service. "Marvelous views! Tip your pilot!" The trickster god laughs from somewhere far away.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Aldric Pemberton', role: 'escort target / walking disaster', personality: 'A cheerful, wealthy merchant with zero survival instincts and absolute confidence that everything will work out. It always does, but only because the universe bends to keep him alive for comedic purposes. "What a beautiful day! Is that quicksand? How interesting!"' },
    { name: 'The Trickster God (Malachar)', role: 'hidden antagonist / audience', personality: 'A minor trickster deity who has claimed Aldric as his favorite mortal. Keeps sending dangers to watch the near-misses. Keeps saving Aldric at the last second. Finds the escorts\' stress hilarious.' },
  ],
  keyLocations: [
    { name: 'The Road to Thornfield', description: 'A three-day journey through countryside that should be safe. With Aldric, every rock is a potential hazard and every creature is a potential "new friend."', significance: 'The journey IS the one-shot. Each day escalates the danger and the frustration.' },
    { name: 'The Thornfield Bridge', description: 'A rotting rope bridge over a 200-foot gorge. The final obstacle. With any other escort, it would be tense. With Aldric, it is a disaster.', significance: 'The climax. Where the cosmic protection reveals itself in the most dramatic way possible.' },
  ],
  dataSystems: ['chaseSequence', 'socialEncounter', 'combatNarration', 'encounterWaves'],
};
