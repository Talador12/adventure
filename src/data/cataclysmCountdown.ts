// Random cataclysm countdown — world-ending events with escalating signs and intervention windows.

export type CataclysmType = 'arcane' | 'divine' | 'natural' | 'extraplanar' | 'undead' | 'cosmic';

export interface CountdownStage { stage: number; name: string; signsVisible: string[]; mechanicalEffect: string; daysUntilNext: number; interventionWindow: string; }

export interface Cataclysm {
  name: string;
  type: CataclysmType;
  description: string;
  stages: CountdownStage[];
  finalEvent: string;
  preventionMethod: string;
  preventionDifficulty: string;
  consequenceIfIgnored: string;
}

const CATACLYSMS: Cataclysm[] = [
  { name: 'The Unraveling', type: 'arcane', description: 'The weave of magic is fraying. Spells misfire. Enchantments fail. Reality cracks.', stages: [
    { stage: 1, name: 'Flickers', signsVisible: ['Cantrips occasionally produce wrong effects.', 'Magic items glow at random.'], mechanicalEffect: '5% spell failure chance on all spells.', daysUntilNext: 30, interventionWindow: 'Easiest to fix now. Locate the leyline disruption source.' },
    { stage: 2, name: 'Fractures', signsVisible: ['Wild magic surges in non-sorcerers.', 'Permanent enchantments flicker.', 'The sky has visible cracks.'], mechanicalEffect: '15% spell failure. Concentration DC +2.', daysUntilNext: 14, interventionWindow: 'Still possible. Need a ritual at the primary leyline nexus.' },
    { stage: 3, name: 'Collapse', signsVisible: ['Entire spells cease to function randomly.', 'Magical creatures go mad.', 'Portals open and close involuntarily.'], mechanicalEffect: '30% spell failure. Magic items deactivate 50% of the time.', daysUntilNext: 7, interventionWindow: 'Last chance. Requires sacrifice of a 9th-level spell slot to stabilize.' },
  ], finalEvent: 'All magic ceases permanently. Every magical creature dies. Every enchantment ends. The world becomes mundane.', preventionMethod: 'Find and repair the Keystone of the Weave — a crystal hidden in the oldest dungeon in the world.', preventionDifficulty: 'Legendary quest chain. CR 15+ encounters. Multiple planes involved.', consequenceIfIgnored: 'A world without magic. Civilizations built on magic collapse. Dragons die. Gods go silent.' },
  { name: 'The Awakening Below', type: 'cosmic', description: 'Something beneath the world is waking up. It is older than the gods. It is very, very large.', stages: [
    { stage: 1, name: 'Tremors', signsVisible: ['Earthquakes with no geological cause.', 'Animals flee toward high ground.', 'Deep mines report "breathing" sounds.'], mechanicalEffect: 'DEX DC 10 each day or fall prone (random tremor).', daysUntilNext: 60, interventionWindow: 'Research the entity. Find its previous awakening records. Locate the seals.' },
    { stage: 2, name: 'The Pulse', signsVisible: ['A rhythmic vibration felt worldwide.', 'Underground rivers reverse flow.', 'Dwarven cities evacuate.'], mechanicalEffect: 'All underground structures: 10% collapse chance per day. -2 to all checks underground.', daysUntilNext: 21, interventionWindow: 'Repair the 4 Seals of Binding (one per continent). Each is a dungeon.' },
    { stage: 3, name: 'The Eye Opens', signsVisible: ['A mountain moves. Literally.', 'The ocean drains from one coast.', 'Stars rearrange into a pattern that spells a name.'], mechanicalEffect: 'Madness checks (WIS DC 15) per day for all intelligent creatures.', daysUntilNext: 7, interventionWindow: 'Confront the entity directly. Or convince the gods to intervene. Both are terrible options.' },
  ], finalEvent: 'A creature the size of a continent rises. Cities are destroyed by the act of it standing up.', preventionMethod: 'Sing the Lullaby of Ages at the entity\'s ear (location unknown). Requires a bard of legendary skill.', preventionDifficulty: 'Near-impossible. The Lullaby is in fragments across 5 ancient libraries.', consequenceIfIgnored: 'The world as known ceases. The entity reshapes reality to its liking. Survivors adapt or perish.' },
  { name: 'The Final Plague', type: 'undead', description: 'Death itself is broken. The dead rise. All of them. Every cemetery, every battlefield, every shallow grave.', stages: [
    { stage: 1, name: 'The Stir', signsVisible: ['Fresh graves disturbed from below.', 'Speak with Dead spells get unsolicited responses.', 'Cats avoid cemeteries.'], mechanicalEffect: 'Random undead encounters increase by 50%. Resurrection spells have a 10% complication rate.', daysUntilNext: 21, interventionWindow: 'Investigate the source. The Death domain is being corrupted from within.' },
    { stage: 2, name: 'The March', signsVisible: ['Entire cemeteries empty overnight.', 'Skeleton armies form with no necromancer.', 'The god of death goes silent.'], mechanicalEffect: 'All corpses within 1 mile of the party animate within 24 hours. Turn Undead DC +3.', daysUntilNext: 10, interventionWindow: 'Enter the realm of the dead and confront whoever overthrew the god of death.' },
    { stage: 3, name: 'The Reckoning', signsVisible: ['The recently deceased rise immediately.', 'Ancient battlefields disgorge thousands.', 'A lich claims the throne of death.'], mechanicalEffect: 'Party members who die rise as hostile undead in 1d4 rounds unless cremated immediately.', daysUntilNext: 3, interventionWindow: 'Kill the usurper on the throne of death. Restore the natural order.' },
  ], finalEvent: 'Death ceases to function. Nothing can die. But things can still suffer. The world fills with the immortal, broken, and in pain.', preventionMethod: 'Restore the god of death by returning their stolen divine spark from the usurper lich.', preventionDifficulty: 'Epic. The lich is CR 20+ with an army of undead and the powers of a minor death god.', consequenceIfIgnored: 'Eternal undeath. A world where death is no longer an escape from anything.' },
];

export function getRandomCataclysm(): Cataclysm {
  return CATACLYSMS[Math.floor(Math.random() * CATACLYSMS.length)];
}

export function getCataclysmsByType(type: CataclysmType): Cataclysm[] {
  return CATACLYSMS.filter((c) => c.type === type);
}

export function getTotalDaysToFinal(cataclysm: Cataclysm): number {
  return cataclysm.stages.reduce((sum, s) => sum + s.daysUntilNext, 0);
}

export function getCurrentStage(cataclysm: Cataclysm, daysElapsed: number): CountdownStage {
  let remaining = daysElapsed;
  for (const stage of cataclysm.stages) { if (remaining < stage.daysUntilNext) return stage; remaining -= stage.daysUntilNext; }
  return cataclysm.stages[cataclysm.stages.length - 1];
}

export function getAllCataclysmTypes(): CataclysmType[] {
  return [...new Set(CATACLYSMS.map((c) => c.type))];
}

export function formatCataclysm(cataclysm: Cataclysm, currentStage: number = 1): string {
  const icon = { arcane: '🔮', divine: '✨', natural: '🌍', extraplanar: '🌀', undead: '💀', cosmic: '🌌' }[cataclysm.type];
  const stage = cataclysm.stages.find((s) => s.stage === currentStage);
  const lines = [`${icon} **${cataclysm.name}** *(${cataclysm.type})*`];
  lines.push(`  *${cataclysm.description}*`);
  if (stage) { lines.push(`  **Stage ${stage.stage}: ${stage.name}** (${stage.daysUntilNext} days to next)`); lines.push(`  ⚙️ ${stage.mechanicalEffect}`); lines.push(`  🔧 Intervention: ${stage.interventionWindow}`); }
  lines.push(`  💀 Final: ${cataclysm.finalEvent}`);
  lines.push(`  🛡️ Prevention: ${cataclysm.preventionMethod}`);
  return lines.join('\n');
}

export { CATACLYSMS };
