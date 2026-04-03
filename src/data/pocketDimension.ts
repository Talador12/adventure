// Random pocket dimension generator — small custom planes created by powerful mages.

export type DimensionPurpose = 'sanctuary' | 'prison' | 'laboratory' | 'vault' | 'garden' | 'trap';
export type DimensionStability = 'stable' | 'flickering' | 'collapsing' | 'expanding';

export interface PocketDimension {
  name: string;
  purpose: DimensionPurpose;
  stability: DimensionStability;
  creator: string;
  size: string;
  entryMethod: string;
  exitMethod: string;
  uniquePhysics: string[];
  contents: string;
  danger: string;
  treasure: string | null;
}

const DIMENSIONS: PocketDimension[] = [
  { name: 'The Quiet Room', purpose: 'sanctuary', stability: 'stable', creator: 'An agoraphobic archmage who never left', size: '50ft radius sphere', entryMethod: 'Speak the password while touching any mirror.', exitMethod: 'Speak the password again. Or break the mirror (risky — dimension shakes).', uniquePhysics: ['Time passes at 1/10 speed (1 hour inside = 6 minutes outside).', 'No sound can exceed a whisper. Thunderwave deals 0 damage.', 'Gravity is optional. Float or walk, your choice.'], contents: 'A cozy study. Bookshelves, a fireplace, tea that refills. The archmage\'s notes.', danger: 'If the last mirror connecting to it is destroyed, everyone inside is trapped permanently.', treasure: 'The archmage\'s spellbook (contains 3 unique spells found nowhere else).' },
  { name: 'The Eternal Arena', purpose: 'prison', stability: 'stable', creator: 'A war god who needed somewhere to put defeated champions', size: '200ft diameter colosseum', entryMethod: 'Challenge someone to a duel while holding the Arena Coin.', exitMethod: 'Win 3 consecutive bouts. Or die (respawn outside, minus 1 level).', uniquePhysics: ['Death is not permanent inside. Fallen combatants rise after 1 minute.', 'Weapons never break. Armor self-repairs between bouts.', 'There is no ceiling. The sky is an infinite swirl of past battles.'], contents: 'An empty arena that conjures opponents from history. Each one stronger than the last.', danger: 'The arena is addictive. WIS DC 14 each victory or refuse to leave.', treasure: 'After 3 wins: the Arena Champion\'s Laurel (advantage on Athletics, +2 to Initiative).' },
  { name: 'The Bottled Storm', purpose: 'laboratory', stability: 'flickering', creator: 'A weather mage studying lightning', size: '300ft cube', entryMethod: 'Uncork the bottle during a thunderstorm.', exitMethod: 'Recork the bottle from inside. Requires calm (the storm fights back).', uniquePhysics: ['Perpetual thunderstorm inside. Lightning strikes every 1d4 rounds.', 'Sound is amplified 10×. Whispers are shouts. Shouts are thunder.', 'Metal objects attract lightning (worn metal armor: +25% chance of strike).'], contents: 'Weather instruments, half-finished formulas, and a captured lightning elemental (friendly, lonely).', danger: 'The bottle is fragile. If it breaks while occupied, everyone is ejected into a real thunderstorm at 500ft altitude.', treasure: 'Lightning Bottle (3 charges of Lightning Bolt). Formula for bottling weather.' },
  { name: 'The Memory Palace', purpose: 'vault', stability: 'collapsing', creator: 'A dying wizard who stored their memories here', size: 'Varies — rooms appear based on memories', entryMethod: 'Touch the wizard\'s skull and think of them.', exitMethod: 'Find the exit — it\'s hidden in the wizard\'s happiest memory.', uniquePhysics: ['Rooms are memories. They replay on loop. You can interact but not change the outcome.', 'Time doesn\'t pass normally. You might experience years of memories in minutes.', 'The deeper you go, the more personal (and guarded) the memories become.'], contents: 'A lifetime of experiences. Some beautiful. Some terrible. All real to the wizard.', danger: 'The palace is collapsing. 1d4 rooms vanish per hour. If you\'re in one when it goes, you\'re lost.', treasure: 'The wizard\'s true name (power over their legacy). Location of their phylactery (if they became a lich).' },
  { name: 'The Inverted Garden', purpose: 'garden', stability: 'expanding', creator: 'A druid who wanted to grow plants from every plane', size: '1 mile diameter (and growing)', entryMethod: 'Plant a seed in the Feywild and water it with tears.', exitMethod: 'Eat a fruit from the Exit Tree (it tastes like home).', uniquePhysics: ['Gravity points toward the center sphere. You walk on the inside of a globe.', 'Plants from every plane grow here. Some are helpful. Some eat people.', 'The garden expands by 10ft each day. It will eventually breach into neighboring planes.'], contents: 'Impossible flora. Feywild roses, Shadowfell mushrooms, Mechanus clockwork vines. A treant librarian.', danger: 'The garden is expanding into the material plane. If unchecked, a forest of alien plants will emerge.', treasure: 'Seeds of any plant in existence. The treant knows recipes for potions lost to time.' },
];

export function getRandomDimension(): PocketDimension {
  return DIMENSIONS[Math.floor(Math.random() * DIMENSIONS.length)];
}

export function getDimensionsByPurpose(purpose: DimensionPurpose): PocketDimension[] {
  return DIMENSIONS.filter((d) => d.purpose === purpose);
}

export function getDimensionsByStability(stability: DimensionStability): PocketDimension[] {
  return DIMENSIONS.filter((d) => d.stability === stability);
}

export function getDimensionsWithTreasure(): PocketDimension[] {
  return DIMENSIONS.filter((d) => d.treasure !== null);
}

export function getAllPurposes(): DimensionPurpose[] {
  return [...new Set(DIMENSIONS.map((d) => d.purpose))];
}

export function formatDimension(dim: PocketDimension): string {
  const icon = { sanctuary: '🏠', prison: '⛓️', laboratory: '🔬', vault: '🔐', garden: '🌱', trap: '⚠️' }[dim.purpose];
  const stab = { stable: '🟢', flickering: '🟡', collapsing: '🟠', expanding: '🔵' }[dim.stability];
  const lines = [`${icon} ${stab} **${dim.name}** *(${dim.purpose}, ${dim.stability})*`];
  lines.push(`  Creator: ${dim.creator} | Size: ${dim.size}`);
  lines.push(`  Entry: ${dim.entryMethod}`);
  lines.push(`  Exit: ${dim.exitMethod}`);
  lines.push('  **Unique physics:**');
  dim.uniquePhysics.forEach((p) => lines.push(`    🔄 ${p}`));
  lines.push(`  ⚠️ Danger: ${dim.danger}`);
  if (dim.treasure) lines.push(`  💰 Treasure: ${dim.treasure}`);
  return lines.join('\n');
}

export { DIMENSIONS as POCKET_DIMENSIONS };
