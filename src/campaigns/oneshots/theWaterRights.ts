import type { OneShotCampaign } from '../types';

export const theWaterRights: OneShotCampaign = {
  id: 'oneshot-water-rights',
  type: 'oneshot',
  title: 'The Water Rights',
  tagline: 'Two villages. One river. A dam that is killing the downstream town. No easy answers.',
  tone: 'political',
  themes: ['political', 'social', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The village of Millbrook built a dam on the Silverthorn River to power a mill and irrigate their fields. Downstream, the village of Dusthaven is dying - their wells are dry, their crops are failing, and their children are sick from drinking stagnant water. Both villages have legitimate claims. The party has been sent by the regional magistrate to resolve the dispute before it becomes a war.',
  hook: 'The magistrate\'s letter is blunt: "Millbrook and Dusthaven are arming. Millbrook says the dam is their right. Dusthaven says the river is everyone\'s. You have three days to find a solution or I send soldiers. I would rather not send soldiers."',
  twist: 'The dam is not just powering Millbrook\'s mill. It is holding back a contaminated aquifer that a long-dead mining operation poisoned. If the dam breaks, both villages get water - but the water is toxic. The dam\'s builder knew this. Millbrook\'s current leadership does not. Solving the water dispute means dealing with the contamination nobody knows about.',
  climax: 'The party presents their findings to both villages in a joint meeting. The contaminated aquifer changes everything. Millbrook and Dusthaven must cooperate to build a filtration system - or the river kills them both. The question becomes: can these two communities that nearly went to war work together to survive?',
  scenes: [
    {
      title: 'Scene 1: Dusthaven',
      summary: 'The party visits the downstream village first. The human cost of water deprivation is visible and urgent.',
      challenge: 'social',
      keyEvents: [
        'The village: cracked earth, dead gardens, a well that produces a trickle of muddy water',
        'The elder: Widow Tarn has been rationing water for months - two cups per person per day',
        'The sick: children with fever from contaminated standing water, a healer stretched thin',
        'The anger: young men with weapons, talking about marching on Millbrook and breaking the dam',
      ],
    },
    {
      title: 'Scene 2: Millbrook',
      summary: 'The upstream village. Prosperous, defensive, and convinced they have every right to their dam.',
      challenge: 'social',
      keyEvents: [
        'The village: green fields, a working mill, water flowing freely - a stark contrast',
        'Mayor Bren: built the dam with his own hands, sees it as Millbrook\'s salvation',
        'The dam: well-constructed, with old reinforcements at the base that do not match Bren\'s work',
        'The discovery: behind the dam, water samples show trace contaminants - something is wrong upstream',
      ],
    },
    {
      title: 'Scene 3: The Joint Meeting',
      summary: 'Both villages at one table. The contamination changes the calculus. The party must forge cooperation from conflict.',
      challenge: 'social',
      keyEvents: [
        'Presenting the contamination evidence: both villages are shocked',
        'Breaking the dam is no longer an option - it would poison Dusthaven, not save it',
        'The proposal: shared filtration, modified water flow, joint maintenance',
        'The hardest part: getting people who nearly killed each other to trust each other',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Widow Tarn', role: 'Dusthaven elder', personality: 'Speaks in measurements. "Two cups per person per day. That is what we have. A horse needs ten. We do not have horses anymore." Never raises her voice. Does not need to. Places a jar of brown water on the table and lets it sit there during the entire conversation.' },
    { name: 'Mayor Bren', role: 'Millbrook leader', personality: 'Talks with his hands because they built the dam and he is proud of them. Takes any criticism of the dam personally. "I carried those stones myself." Cannot hear Dusthaven\'s argument because admitting the dam is a problem means admitting his life\'s work is wrong.', secret: 'He found the old dam reinforcements and wondered about them but never investigated.' },
    { name: 'Druid Kael', role: 'neutral expert', personality: 'Touches the water before drinking it everywhere she goes. Has a collection of water samples in labeled vials. Speaks to the river when she thinks nobody is listening. Has been keeping contamination records for years in a journal no one asked to see - until now.' },
  ],
  keyLocations: [
    { name: 'Dusthaven', description: 'A dying village downstream. Cracked earth, empty troughs, and the sound of coughing from every house.', significance: 'Where the cost of water deprivation is undeniable.' },
    { name: 'The Silverthorn Dam', description: 'A stone and timber dam across the river. Behind it, a lake of water hiding a poisoned secret.', significance: 'The source of the conflict and the contamination.' },
    { name: 'The Joint Meeting Hall', description: 'A barn halfway between the two villages. Neutral ground. Long table. Two sets of angry people.', significance: 'Where the resolution is forged or fails.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
