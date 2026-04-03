// Random mirror dimension generator — alternate reality encounters with twisted versions of familiar places.

export type MirrorType = 'shadow' | 'reversed' | 'nightmare' | 'utopia' | 'broken' | 'echo';

export interface MirrorDimension {
  type: MirrorType;
  name: string;
  description: string;
  entryMethod: string;
  exitCondition: string;
  twistedRules: string[];
  encounter: string;
  treasure: string | null;
  dangerLevel: 'eerie' | 'dangerous' | 'lethal';
}

const DIMENSIONS: MirrorDimension[] = [
  { type: 'shadow', name: 'The Dark Reflection', description: 'Everything is the same — but darker, colder, emptier. Your breath mists. The sun is a black disc.', entryMethod: 'Step through a mirror during a lunar eclipse, or touch a Shadow Crossing.', exitCondition: 'Find the mirror you entered through — it\'s in the same location but may be guarded by your shadow self.', twistedRules: ['Light sources produce half their normal radius.', 'Healing is halved. Necrotic damage heals instead.', 'Your shadow acts independently — it may help or hinder.', 'Creatures that die here rise as shadows in 1d4 rounds.'], encounter: 'Your shadow selves — duplicates with your stats but opposite alignment. They want your life.', treasure: 'Shadow Silk (500gp, makes one garment that grants advantage on Stealth in dim light).', dangerLevel: 'dangerous' },
  { type: 'reversed', name: 'The Inversion', description: 'Left is right. Up is down. Written text is backwards. Everyone speaks in reverse.', entryMethod: 'Read an inverted spell scroll, or walk backward through an enchanted doorway.', exitCondition: 'Do everything backward — walk backward through the exit while speaking your name in reverse.', twistedRules: ['All directions are reversed (left = right, up = down).', 'Damage types are inverted: fire heals, healing damages.', 'STR and DEX scores are swapped for all creatures.', 'Time flows backward — you see effects before causes.'], encounter: 'The Guardian of Symmetry — a creature that attacks anyone who acts "normally" (non-reversed).', treasure: 'Mirror of True Reflection (shows the true form of anything reflected, including disguised creatures).', dangerLevel: 'eerie' },
  { type: 'nightmare', name: 'The Fear Realm', description: 'The world reshapes itself around your deepest fears. Each room is someone\'s personal hell.', entryMethod: 'Fall asleep in a cursed location, or fail a save against a Night Hag.', exitCondition: 'Face your fear directly. Each party member must confront theirs or remain trapped.', twistedRules: ['Each room manifests one party member\'s worst fear (DM designs).', 'Frightened condition is permanent while in the realm unless resisted.', 'WIS saves are made at disadvantage.', 'Things killed here reform in 1d10 minutes.'], encounter: 'The Fearbringer — an entity that feeds on terror. Grows stronger with each frightened creature.', treasure: null, dangerLevel: 'lethal' },
  { type: 'utopia', name: 'The Perfect World', description: 'Everything is better here. The food is perfect. The people are kind. Nothing goes wrong. Nothing.', entryMethod: 'Touch a golden apple, or accept a fey bargain that\'s "too good to be true."', exitCondition: 'Choose to leave. WIS DC 16 each day you stay — failure means you no longer want to leave.', twistedRules: ['All ability checks succeed automatically.', 'No creature is hostile. Everything wants to help.', 'Food and drink are the best you\'ve ever had.', 'For every day here, 1 week passes outside.'], encounter: 'No combat encounters. The real threat is staying forever.', treasure: 'Nothing you can take with you. Items from the Utopia dissolve into mist at the border.', dangerLevel: 'dangerous' },
  { type: 'broken', name: 'The Shattered Plane', description: 'Reality is cracked. Chunks of different worlds float in a void. Gravity is local to each chunk.', entryMethod: 'Cast a spell during a magical anomaly, or shatter a powerful magic item.', exitCondition: 'Find and reassemble the Keystone — a crystal scattered across 3 floating chunks.', twistedRules: ['Each floating island has its own gravity and rules.', 'Gaps between islands: 10-100ft. No air in between (hold breath).', 'Magic works differently on each island (one amplifies, one suppresses, one wildcards).', 'Creatures from multiple planes are stranded here.'], encounter: 'A Beholder trapped here since the plane shattered. It knows where the Keystone pieces are — for a price.', treasure: 'Shard of Reality (1000gp, can be used as a component for Wish or Plane Shift).', dangerLevel: 'lethal' },
  { type: 'echo', name: 'The Yesterday', description: 'This is the past. Not THE past — a copy. Events replay on loop. No one notices you don\'t belong.', entryMethod: 'Step into a temporal anomaly or cast Time Stop in a place with strong emotional resonance.', exitCondition: 'Change one event in the echo. The loop breaks and reality snaps you back.', twistedRules: ['Events repeat in a 24-hour loop.', 'Interacting changes the loop — but changes reset each cycle unless you break it.', 'You cannot be permanently harmed (you reset too). But you feel the pain.', 'If you identify the key moment, changing it ends the loop.'], encounter: 'The echo inhabitants become aware of you after 3 loops. They become hostile.', treasure: 'Knowledge of something that happened in the past — a secret, a location, a name.', dangerLevel: 'eerie' },
];

export function getRandomMirrorDimension(): MirrorDimension {
  return DIMENSIONS[Math.floor(Math.random() * DIMENSIONS.length)];
}

export function getDimensionsByType(type: MirrorType): MirrorDimension[] {
  return DIMENSIONS.filter((d) => d.type === type);
}

export function getDimensionsByDanger(level: MirrorDimension['dangerLevel']): MirrorDimension[] {
  return DIMENSIONS.filter((d) => d.dangerLevel === level);
}

export function getDimensionsWithTreasure(): MirrorDimension[] {
  return DIMENSIONS.filter((d) => d.treasure !== null);
}

export function getAllMirrorTypes(): MirrorType[] {
  return [...new Set(DIMENSIONS.map((d) => d.type))];
}

export function formatMirrorDimension(dim: MirrorDimension): string {
  const icon = { shadow: '🌑', reversed: '🪞', nightmare: '😱', utopia: '✨', broken: '💔', echo: '🔁' }[dim.type];
  const danger = { eerie: '🟡', dangerous: '🟠', lethal: '🔴' }[dim.dangerLevel];
  const lines = [`${icon} ${danger} **${dim.name}** *(${dim.type}, ${dim.dangerLevel})*`];
  lines.push(`  *${dim.description}*`);
  lines.push(`  Entry: ${dim.entryMethod}`);
  lines.push(`  Exit: ${dim.exitCondition}`);
  lines.push('  **Twisted Rules:**');
  dim.twistedRules.forEach((r) => lines.push(`    🔄 ${r}`));
  return lines.join('\n');
}

export { DIMENSIONS as MIRROR_DIMENSIONS };
