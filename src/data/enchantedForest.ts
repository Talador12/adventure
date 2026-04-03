// Enchanted forest generator — magical woodlands with unique rules and inhabitants.

export type ForestMagicType = 'fey_touched' | 'corrupted' | 'ancient' | 'sentient' | 'time_lost' | 'dream';

export interface ForestRule { rule: string; effect: string; }
export interface ForestInhabitant { name: string; disposition: string; role: string; }

export interface EnchantedForest {
  name: string;
  magicType: ForestMagicType;
  description: string;
  rules: ForestRule[];
  inhabitants: ForestInhabitant[];
  centralFeature: string;
  dangerLevel: 'mysterious' | 'dangerous' | 'deadly';
  questHook: string;
}

const FORESTS: EnchantedForest[] = [
  { name: 'The Whispering Glade', magicType: 'sentient', description: 'The trees think. The forest decides who enters and who leaves. It has opinions.', rules: [{ rule: 'The forest watches', effect: 'Stealth is impossible — the trees report your position. -10 to Stealth.' }, { rule: 'Ask before taking', effect: 'Picking plants or cutting wood without permission summons 1d4 angry treants.' }, { rule: 'The path shifts', effect: 'Navigation DC 16 each hour. The forest leads you where IT wants you to go.' }], inhabitants: [{ name: 'The Elderoak', disposition: 'Neutral, ancient, speaks slowly', role: 'Guardian. Can grant safe passage — for a price.' }, { name: 'Moss sprites', disposition: 'Curious, mischievous', role: 'Messengers. Will relay your words to the forest.' }], centralFeature: 'The Heart Tree — a colossal oak at the center. Touching it lets you hear the forest\'s thoughts.', dangerLevel: 'mysterious', questHook: 'The forest is dying. Something is poisoning the Heart Tree from below.' },
  { name: 'The Blightwood', magicType: 'corrupted', description: 'Once a paradise. Now the sap runs black. The flowers have teeth.', rules: [{ rule: 'The corruption spreads', effect: 'CON DC 12 each hour or gain 1 corruption point. At 5 points, plants begin growing on you.' }, { rule: 'Healing is inverted near the core', effect: 'Within 100ft of the corruption source, healing spells deal damage instead.' }, { rule: 'The dead don\'t stay dead', effect: 'Creatures killed here rise as blighted undead in 1d4 hours.' }], inhabitants: [{ name: 'Blight druid', disposition: 'Hostile, zealous', role: 'Protector of the corruption. Worships it.' }, { name: 'Corrupted dryad', disposition: 'Tormented, dangerous', role: 'Former guardian, now enslaved. Can be freed.' }], centralFeature: 'The Blight Heart — a pulsing mass of dark energy where the corruption began.', dangerLevel: 'deadly', questHook: 'A paladin entered 3 days ago to cleanse it. They haven\'t returned.' },
  { name: 'The Twilight Canopy', magicType: 'fey_touched', description: 'It\'s always dusk here. Fireflies are everywhere. Nothing is what it seems.', rules: [{ rule: 'Time is unreliable', effect: '1 hour inside = 1d6 hours outside. You never know how much time has passed.' }, { rule: 'Names have power', effect: 'Giving your true name to a fey creature creates a minor bond (CHA save DC 14 to break).' }, { rule: 'Bargains are binding', effect: 'Verbal agreements become magically enforced. Choose your words carefully.' }], inhabitants: [{ name: 'The Thorn Prince', disposition: 'Charming, manipulative', role: 'Fey noble who collects interesting mortals.' }, { name: 'Will-o-wisps', disposition: 'Deceptive', role: 'Lure travelers deeper. Not inherently evil — just lonely.' }], centralFeature: 'The Moonpool — a clearing where the boundary between Material and Feywild is thin.', dangerLevel: 'dangerous', questHook: 'Children from the nearby village keep wandering in and coming back... different.' },
  { name: 'The Petrified Epoch', magicType: 'time_lost', description: 'Trees made of stone. Fossilized creatures mid-stride. Time stopped here — 10,000 years ago.', rules: [{ rule: 'Time freezes at the boundary', effect: 'At the forest edge, objects thrown in stop mid-air. Step through and you enter the frozen moment.' }, { rule: 'Movement restarts time locally', effect: 'Your footsteps "wake" the area. Creatures frozen mid-action resume for 1 round when disturbed.' }, { rule: 'Nothing decays', effect: 'Food, potions, and corpses from 10,000 years ago are perfectly preserved.' }], inhabitants: [{ name: 'Frozen warriors', disposition: 'Confused, panicked when awakened', role: 'Soldiers from an ancient battle. Think the war is still happening.' }, { name: 'The Timekeeper', disposition: 'Enigmatic, neutral', role: 'A creature that maintains the frozen state. Fears what happens if the forest fully wakes.' }], centralFeature: 'The Hourglass Tree — a crystallized tree that is slowly cracking. When it breaks, 10,000 years resume at once.', dangerLevel: 'dangerous', questHook: 'The Hourglass Tree cracks further each day. If it shatters, an ancient army resumes its march.' },
];

export function getRandomEnchantedForest(): EnchantedForest {
  return FORESTS[Math.floor(Math.random() * FORESTS.length)];
}

export function getForestsByMagic(type: ForestMagicType): EnchantedForest[] {
  return FORESTS.filter((f) => f.magicType === type);
}

export function getForestsByDanger(level: EnchantedForest['dangerLevel']): EnchantedForest[] {
  return FORESTS.filter((f) => f.dangerLevel === level);
}

export function getAllForestTypes(): ForestMagicType[] {
  return [...new Set(FORESTS.map((f) => f.magicType))];
}

export function formatEnchantedForest(forest: EnchantedForest): string {
  const icon = { fey_touched: '🌸', corrupted: '☠️', ancient: '🌳', sentient: '🧠', time_lost: '⏳', dream: '💤' }[forest.magicType];
  const danger = { mysterious: '🟡', dangerous: '🟠', deadly: '🔴' }[forest.dangerLevel];
  const lines = [`${icon} ${danger} **${forest.name}** *(${forest.magicType.replace(/_/g, ' ')})*`];
  lines.push(`  *${forest.description}*`);
  lines.push('  **Rules:**');
  forest.rules.forEach((r) => lines.push(`    🔄 ${r.rule}: ${r.effect}`));
  lines.push(`  🌟 Central: ${forest.centralFeature}`);
  lines.push(`  📜 Quest: ${forest.questHook}`);
  return lines.join('\n');
}

export { FORESTS as ENCHANTED_FORESTS };
