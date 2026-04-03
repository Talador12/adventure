// Random dark bargain generator — deals with dark powers that always have a price.

export type BargainSource = 'demon' | 'devil' | 'hag' | 'eldritch' | 'death' | 'shadow';

export interface DarkBargain {
  name: string;
  source: BargainSource;
  offer: string;
  immediateGain: string;
  price: string;
  hiddenCost: string;
  escalation: string;
  breakCondition: string;
  temptationLevel: number; // 1-10 how attractive the deal seems
}

const BARGAINS: DarkBargain[] = [
  { name: 'The Gift of Tongues', source: 'devil', offer: '"You\'ll understand every language. Every secret whispered. Every lie told."', immediateGain: 'Comprehend Languages at will. Advantage on Insight to detect lies.', price: 'You can never un-hear. Every cruel word, every private grief — you hear it all.', hiddenCost: 'After 30 days, you begin hearing THOUGHTS. WIS DC 14 each day or 1 level of madness.', escalation: 'At 3 madness levels, the devil can speak through you for 1 round per day.', breakCondition: 'Voluntarily deafen yourself for 1 year. The silence breaks the pact.', temptationLevel: 7 },
  { name: 'The Borrowed Time', source: 'death', offer: '"I will give you 10 more years. All I ask is that you collect for me. When I call."', immediateGain: 'Remove one terminal condition, disease, or curse. Restore to full health.', price: 'When Death calls (1d4 times per year), you must ensure a specific person dies within 7 days.', hiddenCost: 'The targets are good people. Innocent people. And you know exactly who they are.', escalation: 'Each refused collection ages you 10 years. Three refusals and the bargain reverses — you die instantly.', breakCondition: 'Die voluntarily before your borrowed time ends. Someone else can negotiate your release.', temptationLevel: 9 },
  { name: 'The Beautiful Lie', source: 'hag', offer: '"I\'ll make you beautiful. Truly, devastatingly beautiful. Everyone will love you."', immediateGain: 'CHA becomes 20. Advantage on all social checks. People are drawn to you.', price: 'Your true face — the one you were born with — is gone. The hag wears it now.', hiddenCost: 'The beauty fades 1 point of CHA per month unless you bring the hag a "gift" — a memory of love from someone else.', escalation: 'At CHA 10, the hag appears wearing YOUR original face and offers to sell it back. The price has tripled.', breakCondition: 'Someone must say "I love you" while seeing your true face (which the hag wears). They must mean it.', temptationLevel: 6 },
  { name: 'The Hunger Pact', source: 'eldritch', offer: '*No words. Just a vision: unlimited power flowing through you like a river. All you have to do is open the door.*', immediateGain: '+2 to spell save DC. Access to one 6th-level spell of your choice, once per day.', price: 'The entity feeds on emotion. You lose the ability to feel one emotion per month (DM chooses).', hiddenCost: 'After losing 3 emotions, the entity can see through your eyes. After 5, it can act through your body for 1 round per day.', escalation: 'At 0 emotions remaining, you become a vessel. The entity walks the material plane wearing you.', breakCondition: 'Experience a genuinely new emotion you\'ve never felt before. The entity can\'t consume what it doesn\'t recognize.', temptationLevel: 8 },
  { name: 'The Shadow\'s Offer', source: 'shadow', offer: '"Step into my darkness. I\'ll teach you things the light can\'t. All shadows will be yours."', immediateGain: 'Shadow Step at will (bonus action teleport between dim light/darkness, 60ft).', price: 'Your shadow is no longer yours. It acts independently and reports to the Shadowfell.', hiddenCost: 'In bright light, you have no shadow. People notice. Clerics become suspicious. Detection spells flag you as undead-adjacent.', escalation: 'After 60 days, your shadow can physically interact with the world — and it doesn\'t like you.', breakCondition: 'Stand in the light of a solstice dawn for 1 full hour. The light reclaims your shadow. The power leaves with it.', temptationLevel: 5 },
];

export function getRandomBargain(): DarkBargain {
  return BARGAINS[Math.floor(Math.random() * BARGAINS.length)];
}

export function getBargainsBySource(source: BargainSource): DarkBargain[] {
  return BARGAINS.filter((b) => b.source === source);
}

export function getHighTemptationBargains(minLevel: number): DarkBargain[] {
  return BARGAINS.filter((b) => b.temptationLevel >= minLevel);
}

export function getAllBargainSources(): BargainSource[] {
  return [...new Set(BARGAINS.map((b) => b.source))];
}

export function formatBargain(bargain: DarkBargain, showHidden: boolean = false): string {
  const icon = { demon: '👹', devil: '🔥', hag: '🧙', eldritch: '🌀', death: '💀', shadow: '🌑' }[bargain.source];
  const lines = [`${icon} **${bargain.name}** *(${bargain.source}, temptation ${bargain.temptationLevel}/10)*`];
  lines.push(`  Offer: *${bargain.offer}*`);
  lines.push(`  ✅ Gain: ${bargain.immediateGain}`);
  lines.push(`  💸 Price: ${bargain.price}`);
  if (showHidden) { lines.push(`  ⚠️ Hidden: ${bargain.hiddenCost}`); lines.push(`  📈 Escalation: ${bargain.escalation}`); }
  lines.push(`  🔓 Break: ${bargain.breakCondition}`);
  return lines.join('\n');
}

export { BARGAINS as DARK_BARGAINS };
