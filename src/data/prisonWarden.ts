// Enchanted prison warden NPC — a jailer for magical criminals with unique containment.

export type ContainmentMethod = 'antimagic_cell' | 'dream_prison' | 'time_freeze' | 'voluntary_binding' | 'planar_exile';

export interface MagicalPrisoner { name: string; crime: string; containment: ContainmentMethod; escapeRisk: number; personality: string; }

export interface PrisonWardenNPC {
  name: string;
  race: string;
  personality: string;
  facility: string;
  containmentMethods: ContainmentMethod[];
  notablePrisoners: MagicalPrisoner[];
  wardenPhilosophy: string;
  weakness: string;
  questHook: string;
}

const WARDENS: PrisonWardenNPC[] = [
  { name: 'Warden Steelheart', race: 'Warforged', personality: 'Emotionless efficiency. Treats prisoners with mechanical fairness. Never cruel, never kind. Just... correct.', facility: 'The Nullforge — an antimagic prison built inside a dead volcano. The suppression field is geological.', containmentMethods: ['antimagic_cell', 'voluntary_binding'], notablePrisoners: [
    { name: 'The Laughing Lich', crime: 'Attempted world domination (3rd offense)', containment: 'antimagic_cell', escapeRisk: 8, personality: 'Finds imprisonment hilarious. Has escaped twice. Plans to make it three.' },
    { name: 'Whisper', crime: 'Stealing the voice of a god', containment: 'voluntary_binding', escapeRisk: 2, personality: 'Turned herself in. Refuses to explain why. Cooperates completely.' },
  ], wardenPhilosophy: '"Containment is not punishment. It is prevention. I do not judge. I contain."', weakness: 'The Nullforge\'s antimagic is powered by a lava flow. Redirect it and the cells fail.', questHook: 'The Laughing Lich is requesting a meeting with the party. Specifically. By name. The warden is concerned.' },
  { name: 'Madame Reverie', race: 'Eladrin', personality: 'Gentle, melancholy. She believes rehabilitation is possible for everyone. The prisoners love her. The guards think she\'s naive. She\'s neither.', facility: 'The Dreaming Ward — prisoners are kept in enchanted sleep. Their sentences are served in custom dream-worlds.', containmentMethods: ['dream_prison', 'time_freeze'], notablePrisoners: [
    { name: 'The Architect', crime: 'Building a demiplane that crushed a village when it collapsed', containment: 'dream_prison', escapeRisk: 6, personality: 'Doesn\'t believe they did anything wrong. "The math was correct. Reality was wrong."' },
    { name: 'Commander Frost', crime: 'Freezing an entire city in a temper tantrum', containment: 'time_freeze', escapeRisk: 3, personality: 'Frozen mid-sentence. When thawed (if ever), will finish the sentence. It\'s been 40 years.' },
  ], wardenPhilosophy: '"Every dreamer can wake changed. The cell is the dream. The cure is the story I write for them."', weakness: 'If Madame Reverie loses concentration (she maintains ALL the dreams simultaneously), every prisoner wakes at once.', questHook: 'A prisoner\'s dream is leaking into reality. The village nearby is experiencing someone else\'s nightmare.' },
];

export function getRandomWarden(): PrisonWardenNPC {
  return WARDENS[Math.floor(Math.random() * WARDENS.length)];
}

export function getPrisonerCount(warden: PrisonWardenNPC): number {
  return warden.notablePrisoners.length;
}

export function getHighRiskPrisoners(warden: PrisonWardenNPC): MagicalPrisoner[] {
  return warden.notablePrisoners.filter((p) => p.escapeRisk >= 6);
}

export function formatWarden(warden: PrisonWardenNPC): string {
  const lines = [`🔒 **${warden.name}** *(${warden.race})*`];
  lines.push(`  Facility: ${warden.facility}`);
  lines.push(`  Philosophy: *${warden.wardenPhilosophy}*`);
  warden.notablePrisoners.forEach((p) => lines.push(`  ⛓️ ${p.name} — ${p.crime} (Escape risk: ${p.escapeRisk}/10)`));
  lines.push(`  ⚡ Weakness: ${warden.weakness}`);
  lines.push(`  📜 Hook: ${warden.questHook}`);
  return lines.join('\n');
}

export { WARDENS as PRISON_WARDENS };
