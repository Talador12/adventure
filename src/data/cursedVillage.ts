// Cursed village — pre-built cursed settlement encounters with symptoms, investigation, and cure.

export type CurseOrigin = 'hag' | 'warlock' | 'artifact' | 'fey' | 'undead' | 'divine';

export interface VillageCurseSymptom {
  description: string;
  observationDC: number; // Perception or Insight to notice
  stage: number; // 1=early, 2=mid, 3=late
}

export interface InvestigationClue {
  location: string;
  findDC: number;
  skillCheck: string;
  clueText: string;
  leadsTo: string;
}

export interface CursedVillageScenario {
  name: string;
  villageName: string;
  population: number;
  curseOrigin: CurseOrigin;
  curseSummary: string;
  symptoms: VillageCurseSymptom[];
  clues: InvestigationClue[];
  trueSource: string;
  cureMethods: string[];
  complication: string;
  moralDilemma: string;
  rewardIfCured: string;
}

const SCENARIOS: CursedVillageScenario[] = [
  {
    name: 'The Village That Stopped Sleeping',
    villageName: 'Millhaven',
    population: 340,
    curseOrigin: 'hag',
    curseSummary: 'Nobody in Millhaven has slept in 19 days. They are functional but deteriorating. Children stare at walls. Adults forget their families. The baker keeps baking the same loaf.',
    symptoms: [
      { description: 'Dark circles under every villager\'s eyes. Children are unusually quiet.', observationDC: 8, stage: 1 },
      { description: 'Villagers repeat the same conversations daily, unaware they already had them.', observationDC: 12, stage: 2 },
      { description: 'Some villagers have started sleepwalking to the old mill at midnight, eyes open, humming the same tune.', observationDC: 14, stage: 3 },
    ],
    clues: [
      { location: 'The old mill', findDC: 12, skillCheck: 'Investigation', clueText: 'The millstone has been carved with hag runes. The grooves are filled with dried blood.', leadsTo: 'The miller\'s journal' },
      { location: 'The miller\'s house', findDC: 14, skillCheck: 'Investigation', clueText: 'A journal describes bargaining with "the woman in the marsh" for a good harvest. The last entry: "She wants the dreams. I said yes. What have I done."', leadsTo: 'The marsh' },
      { location: 'The marsh (2 miles east)', findDC: 16, skillCheck: 'Survival', clueText: 'A hag\'s hut hidden by illusion. Inside: 340 glass jars, each containing a softly glowing wisp. The dreams.', leadsTo: 'The hag' },
      { location: 'The children\'s drawings', findDC: 10, skillCheck: 'Insight', clueText: 'Every child in the village school has drawn the same picture: a woman with long fingers standing in water, holding a jar.', leadsTo: 'The marsh' },
    ],
    trueSource: 'Granny Thornweave, a night hag, made a deal with the miller: a perfect harvest in exchange for the village\'s dreams. She feeds on the collected dreams and has grown powerful.',
    cureMethods: [
      'Destroy the jars in the hag\'s hut (releases dreams, villagers sleep immediately, hag becomes hostile)',
      'Kill the hag (dreams return over 1d4 days as her magic unravels)',
      'Renegotiate the deal (DC 20 Persuasion - the hag wants something else of equal value)',
      'Find and destroy the carved millstone (breaks the conduit, hag loses her link but keeps the dreams she already has)',
    ],
    complication: 'The miller knows what he did and has been hiding it. He will actively obstruct the investigation because he is terrified the villagers will kill him if they find out.',
    moralDilemma: 'If the hag is killed, the harvest magic dies too. The crops will fail. The village chose sleep or food - they cannot have both unless a new deal is struck.',
    rewardIfCured: 'The village offers 500gp and free lodging for life. The mayor\'s daughter is a cleric who will join the party as an ally.',
  },
  {
    name: 'The Town Where Nobody Leaves',
    villageName: 'Brackenford',
    population: 210,
    curseOrigin: 'fey',
    curseSummary: 'Anyone who tries to leave Brackenford finds themselves walking back into town from the opposite direction. The roads loop. The forest closes. Even teleportation fails. The villagers have stopped trying.',
    symptoms: [
      { description: 'No merchants, travelers, or mail carriers have arrived or departed in weeks.', observationDC: 8, stage: 1 },
      { description: 'Walking any road out of town leads back to the central square within 30 minutes regardless of direction.', observationDC: 10, stage: 2 },
      { description: 'The treeline at the village border has grown inward by 10 feet. Flowers grow in patterns that spell words in Sylvan: "STAY."', observationDC: 15, stage: 3 },
    ],
    clues: [
      { location: 'The village border', findDC: 12, skillCheck: 'Arcana', clueText: 'A fey ward circle buried under the road. Incredibly old. Recently re-activated.', leadsTo: 'The old shrine' },
      { location: 'The old shrine in the woods', findDC: 14, skillCheck: 'Religion', clueText: 'A shrine to a forgotten archfey. Fresh offerings of milk and honey. Someone is maintaining it.', leadsTo: 'The groundskeeper' },
      { location: 'Talking to the groundskeeper', findDC: 13, skillCheck: 'Persuasion', clueText: 'Old Tomas admits he found the shrine and started leaving offerings after his wife died. He asked the archfey to "keep everyone safe." The fey interpreted this literally.', leadsTo: 'The archfey' },
      { location: 'The central well', findDC: 16, skillCheck: 'Perception', clueText: 'At midnight, the well water reflects a forest that does not exist. A figure in the reflection waves.', leadsTo: 'The archfey\'s domain' },
    ],
    trueSource: 'The archfey Silverbell took Old Tomas\'s prayer literally. "Keep everyone safe" became "keep everyone." Silverbell genuinely believes it is helping and will be confused by objections.',
    cureMethods: [
      'Convince Silverbell the village is safe (DC 18 Persuasion with 3 successes in a social challenge)',
      'Destroy the shrine (breaks the ward but angers the archfey - fey retribution within 1 month)',
      'Offer Silverbell something it wants more than the village (a rare flower, a mortal poem, or a new worshipper)',
      'Old Tomas revokes his prayer at the shrine (he is reluctant - he still feels safer this way)',
    ],
    complication: 'Some villagers prefer being trapped. No bandits, no wars, no tax collectors. A faction led by the blacksmith will oppose the party\'s efforts to break the ward.',
    moralDilemma: 'Old Tomas lost his wife to bandits on the road. He genuinely believes the cage is kindness. Several villagers agree. Breaking the ward means bad things can reach Brackenford again.',
    rewardIfCured: 'The merchants\' guild sends a thank-you caravan with 800gp in goods. Silverbell, if befriended, becomes a potential patron for a warlock.',
  },
  {
    name: 'The Village of Reversed Fortunes',
    villageName: 'Goldhollow',
    population: 420,
    curseOrigin: 'artifact',
    curseSummary: 'Goldhollow was the richest village in the region. Now the gold is turning to lead, the crops grow backwards into the ground, and the rich are becoming poor while the beggars find coins in their pockets.',
    symptoms: [
      { description: 'Gold coins in the market are discolored. Merchants bite coins and find them soft.', observationDC: 10, stage: 1 },
      { description: 'The wealthy merchant families are dressed in rags, confused, while former beggars are wearing fine clothes they do not remember acquiring.', observationDC: 12, stage: 2 },
      { description: 'Rivers flow uphill near the village. Rain falls upward. Gravity is selective - coins fall up, people fall down.', observationDC: 8, stage: 3 },
    ],
    clues: [
      { location: 'The mayor\'s vault', findDC: 14, skillCheck: 'Investigation', clueText: 'The vault is full of lead bars that were gold yesterday. In the center: an empty pedestal with a coin-shaped impression.', leadsTo: 'The missing coin' },
      { location: 'The beggar\'s alley', findDC: 12, skillCheck: 'Insight', clueText: 'A beggar named Pip has been spending gold freely for a week. He found a "funny coin" in the gutter. It whispers to him.', leadsTo: 'Pip' },
      { location: 'Pip\'s hiding spot', findDC: 10, skillCheck: 'Persuasion', clueText: 'Pip shows the coin. It is a Two-Faced Sovereign, an artifact that reverses fortune within a 1-mile radius. Pip cannot let go of it - literally.', leadsTo: 'The coin\'s history' },
      { location: 'The village archives', findDC: 16, skillCheck: 'History', clueText: 'Goldhollow\'s founder stole the coin from a dragon 200 years ago. The village\'s wealth was never earned - it was the coin\'s passive effect. Now it has flipped.', leadsTo: 'The dragon' },
    ],
    trueSource: 'The Two-Faced Sovereign is a cursed artifact that flips every 200 years. One side grants fortune, the other takes it away. The village has been living on borrowed luck since its founding.',
    cureMethods: [
      'Return the coin to the dragon it was stolen from (the dragon is still alive and wants it back)',
      'Destroy the coin in a forge of elemental fire (rare, dangerous, but permanent)',
      'Flip the coin deliberately using Remove Curse (DC 18) - but this just resets the 200-year timer',
      'Separate Pip from the coin using Greater Restoration, then seal it in a lead box',
    ],
    complication: 'The village has never been prosperous on its own merits. If the coin is destroyed, Goldhollow is just another poor farming village. The mayor will fight to keep the coin.',
    moralDilemma: 'The reversed fortunes have given the poor everything and the rich nothing. For the first time, the beggars have homes and the exploitative merchants are hungry. Is this justice or just another curse?',
    rewardIfCured: 'The dragon (if contacted) pays 1,000gp for the coin\'s return and considers the debt settled. Pip, freed from the coin, turns out to be a talented rogue who wants to join the party.',
  },
];

export function getRandomVillage(): CursedVillageScenario {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}

export function getVillageByOrigin(origin: CurseOrigin): CursedVillageScenario[] {
  return SCENARIOS.filter((s) => s.curseOrigin === origin);
}

export function getAllOrigins(): CurseOrigin[] {
  return [...new Set(SCENARIOS.map((s) => s.curseOrigin))];
}

export function getClueCount(scenario: CursedVillageScenario): number {
  return scenario.clues.length;
}

export function formatVillage(scenario: CursedVillageScenario): string {
  const lines = [`🏘️ **${scenario.name}**`];
  lines.push(`  Village: ${scenario.villageName} (pop. ${scenario.population})`);
  lines.push(`  Curse origin: ${scenario.curseOrigin}`);
  lines.push(`  ${scenario.curseSummary}`);
  lines.push('  **Symptoms:**');
  for (const s of scenario.symptoms) {
    lines.push(`    Stage ${s.stage} (DC ${s.observationDC}): ${s.description}`);
  }
  lines.push('  **Investigation Clues:**');
  for (const c of scenario.clues) {
    lines.push(`    - ${c.location} (DC ${c.findDC} ${c.skillCheck}): ${c.clueText}`);
  }
  lines.push(`  True source: ${scenario.trueSource}`);
  lines.push('  **Cures:**');
  for (const m of scenario.cureMethods) {
    lines.push(`    - ${m}`);
  }
  lines.push(`  Complication: ${scenario.complication}`);
  lines.push(`  Moral dilemma: ${scenario.moralDilemma}`);
  lines.push(`  Reward: ${scenario.rewardIfCured}`);
  return lines.join('\n');
}

export { SCENARIOS as CURSED_VILLAGE_SCENARIOS };
