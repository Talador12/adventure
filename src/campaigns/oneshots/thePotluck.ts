import type { OneShotCampaign } from '../types';

export const thePotluck: OneShotCampaign = {
  id: 'oneshot-potluck',
  type: 'oneshot',
  title: 'The Potluck',
  tagline: 'Every dish reveals something about the cook. One is enchanted. One is poisoned. One is sentient.',
  tone: 'social',
  themes: ['social', 'comedy', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The annual Willowbrook potluck. Every family brings a dish. This year, the dishes are unusual. Mrs. Crumb\'s pie makes people tell the truth. Old Benton\'s stew is accidentally poisoned (bad mushrooms, not malice). And the new neighbor\'s casserole is talking.',
  hook: 'The party attends a neighborhood potluck. Ten minutes in, a man eating pie blurts out his affair. A woman eating stew turns green. And a casserole dish says, very clearly, "Could someone please not put a spoon in me?"',
  twist:
    'The sentient casserole is the new neighbor\'s familiar, polymorphed as a prank by a rival wizard. It contains actual food on top of a very distressed pseudodragon. It is not harmful. It is just deeply, profoundly annoyed.',
  climax:
    'The truth pie, the poison stew, and the talking casserole create simultaneous crises. The party must cure the poisoned guests, manage the truth-telling chaos, and free the pseudodragon from the casserole before the potluck descends into total anarchy.',
  scenes: [
    {
      title: 'Scene 1: The Spread',
      summary: 'The potluck begins. Dishes are served. The party samples the food and things start going wrong immediately.',
      challenge: 'social',
      keyEvents: [
        'Twelve dishes on the table. The party samples freely.',
        'The pie: anyone who eats it cannot lie for an hour. Secrets spill.',
        'The stew: bad mushrooms. Not lethal but very unpleasant. Three people are sick.',
        'The casserole: "Excuse me. That is my eye you are spooning."',
      ],
    },
    {
      title: 'Scene 2: Chaos Management',
      summary: 'Three simultaneous crises. The party splits up to handle truth, poison, and a sentient dish.',
      challenge: 'social',
      keyEvents: [
        'Truth crisis: a husband admits he hates his wife\'s cooking. A woman confesses to stealing flowers.',
        'Poison crisis: three guests need healing. Old Benton is horrified and apologetic.',
        'Casserole crisis: the pseudodragon is panicking. The polymorph is wearing off slowly.',
        'The new neighbor realizes what happened and is furious at their rival wizard.',
      ],
    },
    {
      title: 'Scene 3: Resolution',
      summary: 'Fix the poison, contain the truth, free the pseudodragon, and somehow save the potluck.',
      challenge: 'social',
      keyEvents: [
        'Healing the poisoned guests: herbs, healing magic, or a very firm stomach.',
        'Managing the truth-tellers: some confessions are harmless. One is devastating.',
        'Dispelling the polymorph: the pseudodragon pops out of the casserole dish, very angry.',
        'The potluck continues. It is the most talked-about social event in village history.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Mrs. Crumb',
      role: 'baker / accidental enchanter',
      personality: 'A sweet old woman who put "a pinch of honesty" into her pie. She found the spice at a market. She did not read the label carefully.',
    },
    {
      name: 'Flicker',
      role: 'pseudodragon / the casserole',
      personality: 'Sarcastic, indignant, and covered in sauce. Being polymorphed into a casserole is the worst day of their life. They have opinions about the seasoning.',
    },
  ],
  keyLocations: [
    {
      name: 'Willowbrook Community Hall',
      description: 'A warm, lantern-lit hall with long tables covered in potluck dishes. Currently a disaster zone.',
      significance: 'Where every crisis happens simultaneously in a very small space.',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker', 'combatNarration'],
};
