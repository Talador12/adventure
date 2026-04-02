// Party resource tracker — shared consumable pool with auto-depletion.
// Tracks rations, arrows, torches, potions, and other shared supplies.

export interface SharedResource {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
  maxQuantity: number;
  autoDeplete: boolean; // auto-consume on certain triggers
  depleteOn: 'long_rest' | 'short_rest' | 'travel_day' | 'combat_round' | 'manual';
  depleteAmount: number;
  category: 'food' | 'ammunition' | 'light' | 'utility' | 'medical';
}

export const DEFAULT_RESOURCES: SharedResource[] = [
  { id: 'rations', name: 'Rations', emoji: '🍖', quantity: 20, maxQuantity: 50, autoDeplete: true, depleteOn: 'long_rest', depleteAmount: 1, category: 'food' },
  { id: 'water', name: 'Water Skins', emoji: '💧', quantity: 10, maxQuantity: 20, autoDeplete: true, depleteOn: 'long_rest', depleteAmount: 1, category: 'food' },
  { id: 'arrows', name: 'Arrows', emoji: '🏹', quantity: 40, maxQuantity: 100, autoDeplete: false, depleteOn: 'manual', depleteAmount: 1, category: 'ammunition' },
  { id: 'bolts', name: 'Crossbow Bolts', emoji: '➡️', quantity: 30, maxQuantity: 60, autoDeplete: false, depleteOn: 'manual', depleteAmount: 1, category: 'ammunition' },
  { id: 'torches', name: 'Torches', emoji: '🔥', quantity: 10, maxQuantity: 30, autoDeplete: false, depleteOn: 'manual', depleteAmount: 1, category: 'light' },
  { id: 'rope', name: 'Rope (50ft)', emoji: '🪢', quantity: 2, maxQuantity: 5, autoDeplete: false, depleteOn: 'manual', depleteAmount: 1, category: 'utility' },
  { id: 'healkit', name: 'Healer\'s Kit Uses', emoji: '🩹', quantity: 10, maxQuantity: 10, autoDeplete: false, depleteOn: 'manual', depleteAmount: 1, category: 'medical' },
  { id: 'antidote', name: 'Antitoxin', emoji: '🧪', quantity: 3, maxQuantity: 10, autoDeplete: false, depleteOn: 'manual', depleteAmount: 1, category: 'medical' },
];

const STORAGE_PREFIX = 'adventure:resources:';

export function loadResources(roomId: string): SharedResource[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${roomId}`);
    return raw ? JSON.parse(raw) : [...DEFAULT_RESOURCES];
  } catch { return [...DEFAULT_RESOURCES]; }
}

export function saveResources(roomId: string, resources: SharedResource[]): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${roomId}`, JSON.stringify(resources));
  } catch { /* full */ }
}

export function depleteResource(resources: SharedResource[], id: string, amount?: number): { resources: SharedResource[]; depleted: boolean; remaining: number } {
  const idx = resources.findIndex((r) => r.id === id);
  if (idx === -1) return { resources, depleted: false, remaining: 0 };

  const r = { ...resources[idx] };
  const depleteAmt = amount ?? r.depleteAmount;
  r.quantity = Math.max(0, r.quantity - depleteAmt);
  const updated = [...resources];
  updated[idx] = r;
  return { resources: updated, depleted: true, remaining: r.quantity };
}

export function restockResource(resources: SharedResource[], id: string, amount: number): SharedResource[] {
  return resources.map((r) => r.id === id ? { ...r, quantity: Math.min(r.maxQuantity, r.quantity + amount) } : r);
}

export function autoDeplete(resources: SharedResource[], trigger: SharedResource['depleteOn'], partySize: number): { resources: SharedResource[]; messages: string[] } {
  const messages: string[] = [];
  let updated = [...resources];

  for (const r of updated) {
    if (r.autoDeplete && r.depleteOn === trigger && r.quantity > 0) {
      const amount = r.depleteAmount * partySize;
      const prev = r.quantity;
      r.quantity = Math.max(0, r.quantity - amount);
      messages.push(`${r.emoji} ${r.name}: ${prev} → ${r.quantity} (-${amount})`);
      if (r.quantity === 0) messages.push(`⚠️ Out of ${r.name}!`);
    }
  }

  return { resources: updated, messages };
}

export function getResourceWarnings(resources: SharedResource[]): string[] {
  const warnings: string[] = [];
  for (const r of resources) {
    if (r.quantity === 0) warnings.push(`❌ Out of ${r.name}!`);
    else if (r.quantity <= r.maxQuantity * 0.2) warnings.push(`⚠️ Low on ${r.name} (${r.quantity} remaining)`);
  }
  return warnings;
}

export function formatResourceStatus(resources: SharedResource[]): string {
  const lines = ['📦 **Party Supplies:**'];
  const grouped: Record<string, SharedResource[]> = {};
  for (const r of resources) {
    if (!grouped[r.category]) grouped[r.category] = [];
    grouped[r.category].push(r);
  }
  for (const [cat, items] of Object.entries(grouped)) {
    lines.push(`**${cat.charAt(0).toUpperCase() + cat.slice(1)}:** ${items.map((r) => `${r.emoji} ${r.name} ×${r.quantity}`).join(', ')}`);
  }
  return lines.join('\n');
}
