// Trap design tool — DM creates custom traps with trigger, effect, DC, and reset.
// Also includes pre-built trap templates for quick placement.

export type TrapTrigger = 'pressure_plate' | 'tripwire' | 'proximity' | 'door_open' | 'item_pickup' | 'magic_glyph';
export type TrapEffect = 'damage' | 'restrain' | 'alarm' | 'poison' | 'pit' | 'spell' | 'cage';
export type TrapReset = 'manual' | 'automatic' | 'one_shot';

export interface TrapDesign {
  id: string;
  name: string;
  trigger: TrapTrigger;
  effect: TrapEffect;
  detectionDC: number;
  disableDC: number;
  saveDC: number;
  saveAbility: string;
  damage: string; // e.g. "2d10 piercing"
  description: string;
  reset: TrapReset;
  area: string; // "single target", "10ft radius", etc.
}

const TRIGGER_LABELS: Record<TrapTrigger, string> = {
  pressure_plate: 'Pressure Plate',
  tripwire: 'Tripwire',
  proximity: 'Proximity (motion)',
  door_open: 'Door Opening',
  item_pickup: 'Item Removal',
  magic_glyph: 'Magic Glyph',
};

const EFFECT_LABELS: Record<TrapEffect, string> = {
  damage: 'Damage',
  restrain: 'Restrain',
  alarm: 'Alarm',
  poison: 'Poison',
  pit: 'Pit Fall',
  spell: 'Spell Effect',
  cage: 'Cage Drop',
};

export const TRAP_TEMPLATES: TrapDesign[] = [
  {
    id: 'spike-pit', name: 'Spike Pit', trigger: 'pressure_plate', effect: 'pit',
    detectionDC: 12, disableDC: 10, saveDC: 12, saveAbility: 'DEX',
    damage: '2d10 piercing', description: 'A concealed pit with sharpened stakes at the bottom.',
    reset: 'manual', area: 'single target',
  },
  {
    id: 'poison-dart', name: 'Poison Dart Wall', trigger: 'tripwire', effect: 'poison',
    detectionDC: 14, disableDC: 13, saveDC: 13, saveAbility: 'CON',
    damage: '1d4 piercing + 2d6 poison', description: 'Hidden darts shoot from the wall, coated in paralyzing venom.',
    reset: 'automatic', area: '10ft hallway',
  },
  {
    id: 'fire-glyph', name: 'Fire Glyph', trigger: 'magic_glyph', effect: 'spell',
    detectionDC: 16, disableDC: 16, saveDC: 15, saveAbility: 'DEX',
    damage: '5d8 fire', description: 'A magical glyph erupts in a burst of flame when disturbed.',
    reset: 'one_shot', area: '20ft radius',
  },
  {
    id: 'cage-trap', name: 'Falling Cage', trigger: 'pressure_plate', effect: 'cage',
    detectionDC: 13, disableDC: 15, saveDC: 14, saveAbility: 'DEX',
    damage: '1d6 bludgeoning', description: 'A heavy iron cage drops from the ceiling, trapping anyone beneath.',
    reset: 'manual', area: '10ft square',
  },
  {
    id: 'alarm-bell', name: 'Alarm Bell Tripwire', trigger: 'tripwire', effect: 'alarm',
    detectionDC: 10, disableDC: 8, saveDC: 0, saveAbility: '-',
    damage: 'none', description: 'A simple wire connected to a loud bell. Alerts everyone within 300ft.',
    reset: 'automatic', area: '300ft audible',
  },
  {
    id: 'net-trap', name: 'Net Trap', trigger: 'proximity', effect: 'restrain',
    detectionDC: 13, disableDC: 12, saveDC: 13, saveAbility: 'STR',
    damage: 'none (restrained)', description: 'A weighted net drops from above, pinning the target.',
    reset: 'manual', area: '10ft square',
  },
  {
    id: 'gas-room', name: 'Poison Gas Room', trigger: 'door_open', effect: 'poison',
    detectionDC: 15, disableDC: 14, saveDC: 14, saveAbility: 'CON',
    damage: '3d6 poison', description: 'Opening the door releases toxic gas that fills the room.',
    reset: 'one_shot', area: '20ft room',
  },
  {
    id: 'cursed-idol', name: 'Cursed Idol', trigger: 'item_pickup', effect: 'spell',
    detectionDC: 18, disableDC: 16, saveDC: 16, saveAbility: 'WIS',
    damage: 'Bestow Curse effect', description: 'Picking up this idol triggers a curse. WIS save or suffer random curse.',
    reset: 'one_shot', area: 'single target',
  },
];

export function getTriggerLabel(trigger: TrapTrigger): string { return TRIGGER_LABELS[trigger]; }
export function getEffectLabel(effect: TrapEffect): string { return EFFECT_LABELS[effect]; }

export function formatTrap(trap: TrapDesign): string {
  const lines = [`🪤 **${trap.name}** (${getEffectLabel(trap.effect)})`];
  lines.push(`*${trap.description}*`);
  lines.push(`Trigger: ${getTriggerLabel(trap.trigger)} | Area: ${trap.area}`);
  lines.push(`Detection DC: ${trap.detectionDC} (Perception/Investigation)`);
  lines.push(`Disable DC: ${trap.disableDC} (Thieves' Tools)`);
  if (trap.saveDC > 0) lines.push(`Save: ${trap.saveAbility} DC ${trap.saveDC} | Damage: ${trap.damage}`);
  lines.push(`Reset: ${trap.reset}`);
  return lines.join('\n');
}

export function getTrapsbyEffect(effect: TrapEffect): TrapDesign[] {
  return TRAP_TEMPLATES.filter((t) => t.effect === effect);
}
