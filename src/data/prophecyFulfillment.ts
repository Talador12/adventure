// Prophecy fulfillment tracker — track prophecies and mark them fulfilled during gameplay.

export interface Prophecy {
  id: string;
  text: string;
  source: string; // who delivered it (NPC name, ancient scroll, dream, etc.)
  fulfilled: boolean;
  fulfilledAt?: string; // description of when/how
  category: ProphecyCategory;
}

export type ProphecyCategory = 'doom' | 'glory' | 'betrayal' | 'love' | 'discovery' | 'transformation';

export const PROPHECY_TEMPLATES: { text: string; category: ProphecyCategory }[] = [
  { text: 'When the last star falls, the sealed gate shall open.', category: 'doom' },
  { text: 'The one who carries fire in their blood will unite the broken kingdoms.', category: 'glory' },
  { text: 'A trusted hand will turn the blade. Beware the smile of a friend.', category: 'betrayal' },
  { text: 'Two souls entwined by fate shall find each other beneath the weeping tree.', category: 'love' },
  { text: 'Beneath the forgotten city lies a truth that will reshape the world.', category: 'discovery' },
  { text: 'The beast within shall awaken when the moon bleeds crimson.', category: 'transformation' },
  { text: 'Three trials await the chosen: fire, silence, and the abyss.', category: 'doom' },
  { text: 'A crown of thorns shall rest upon the brow of the unlikely hero.', category: 'glory' },
  { text: 'The child of two worlds will walk between shadow and light.', category: 'transformation' },
  { text: 'When the river runs backward, the old pact will be broken.', category: 'betrayal' },
  { text: 'The sword that was shattered shall be reforged in dragon fire.', category: 'discovery' },
  { text: 'From sacrifice, a new dawn. The willing heart pays the price.', category: 'love' },
  { text: 'The dead shall whisper the name of the one who can save them all.', category: 'doom' },
  { text: 'An empire built on lies will crumble at the speaking of a single truth.', category: 'glory' },
  { text: 'The shadow in the mirror is not your own. It never was.', category: 'transformation' },
];

export const PROPHECY_SOURCES: string[] = [
  'A blind oracle in a ruined temple',
  'An ancient scroll found in a dragon\'s hoard',
  'A dying knight\'s last words',
  'A vision during a fever dream',
  'Carved into the wall of a forgotten dungeon',
  'Whispered by the wind on a mountaintop',
  'Sung by a bard who vanished the next morning',
  'Written in blood on a tavern wall',
  'Spoken by a child who then forgot everything',
  'Found inside a sealed bottle floating in the sea',
];

export interface ProphecyTracker {
  prophecies: Prophecy[];
}

export function createProphecyTracker(): ProphecyTracker {
  return { prophecies: [] };
}

export function addProphecy(tracker: ProphecyTracker, text: string, source: string, category: ProphecyCategory): ProphecyTracker {
  const id = `prophecy-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return { prophecies: [...tracker.prophecies, { id, text, source, fulfilled: false, category }] };
}

export function fulfillProphecy(tracker: ProphecyTracker, id: string, fulfilledAt: string): ProphecyTracker {
  return {
    prophecies: tracker.prophecies.map((p) => (p.id === id ? { ...p, fulfilled: true, fulfilledAt } : p)),
  };
}

export function getUnfulfilled(tracker: ProphecyTracker): Prophecy[] {
  return tracker.prophecies.filter((p) => !p.fulfilled);
}

export function getFulfilled(tracker: ProphecyTracker): Prophecy[] {
  return tracker.prophecies.filter((p) => p.fulfilled);
}

export function getRandomProphecy(): { text: string; source: string; category: ProphecyCategory } {
  const template = PROPHECY_TEMPLATES[Math.floor(Math.random() * PROPHECY_TEMPLATES.length)];
  const source = PROPHECY_SOURCES[Math.floor(Math.random() * PROPHECY_SOURCES.length)];
  return { text: template.text, source, category: template.category };
}

export function formatProphecyTracker(tracker: ProphecyTracker): string {
  if (tracker.prophecies.length === 0) return '🔮 **Prophecies:** None recorded.';
  const unfulfilled = getUnfulfilled(tracker);
  const fulfilled = getFulfilled(tracker);
  const lines: string[] = ['🔮 **Prophecies:**'];
  if (unfulfilled.length > 0) {
    lines.push(`  **Unfulfilled (${unfulfilled.length}):**`);
    unfulfilled.forEach((p) => lines.push(`    ☐ *"${p.text}"* — ${p.source}`));
  }
  if (fulfilled.length > 0) {
    lines.push(`  **Fulfilled (${fulfilled.length}):**`);
    fulfilled.forEach((p) => lines.push(`    ☑ *"${p.text}"* — ${p.fulfilledAt || 'fulfilled'}`));
  }
  return lines.join('\n');
}
