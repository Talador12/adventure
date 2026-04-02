// Persistent NPC shop inventories — shops remember stock, prices fluctuate.
// Each shop is identified by a location string. Stock depletes on purchase.
// Prices adjust based on faction reputation and supply/demand.

import type { Item } from '../types/game';

export interface ShopStock {
  item: Item & { category?: string };
  quantity: number; // -1 = unlimited
  basePrice: number;
}

export interface ShopState {
  id: string;
  name: string;
  location: string;
  stock: ShopStock[];
  restockDay: number; // next in-game day stock refreshes
  restockIntervalDays: number; // how often stock refreshes (default 7)
  priceModifier: number; // 0.8 = 20% discount, 1.2 = 20% markup
}

const STORAGE_PREFIX = 'adventure:shop:';

export function loadShop(roomId: string, shopId: string): ShopState | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${roomId}:${shopId}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function saveShop(roomId: string, shop: ShopState): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${roomId}:${shop.id}`, JSON.stringify(shop));
  } catch { /* full */ }
}

export function listShops(roomId: string): string[] {
  const shops: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`${STORAGE_PREFIX}${roomId}:`)) {
        shops.push(key.replace(`${STORAGE_PREFIX}${roomId}:`, ''));
      }
    }
  } catch { /* ok */ }
  return shops;
}

export function purchaseFromShop(shop: ShopState, itemId: string): { success: boolean; price: number; item?: Item } {
  const stockEntry = shop.stock.find((s) => s.item.id === itemId);
  if (!stockEntry) return { success: false, price: 0 };
  if (stockEntry.quantity === 0) return { success: false, price: 0 };

  const price = Math.max(1, Math.round(stockEntry.basePrice * shop.priceModifier));
  const item = { ...stockEntry.item };
  delete item.category;

  if (stockEntry.quantity > 0) stockEntry.quantity--;

  return { success: true, price, item: item as Item };
}

export function restockShop(shop: ShopState, defaultStock: ShopStock[]): ShopState {
  // Merge: existing items get quantity bumped, new items added
  const existingIds = new Set(shop.stock.map((s) => s.item.id));
  for (const ds of defaultStock) {
    const existing = shop.stock.find((s) => s.item.id === ds.item.id);
    if (existing) {
      // Restock: add back up to original quantity
      if (existing.quantity >= 0 && ds.quantity >= 0) {
        existing.quantity = Math.min(existing.quantity + Math.ceil(ds.quantity / 2), ds.quantity);
      }
    } else {
      shop.stock.push({ ...ds });
    }
  }
  return shop;
}

export function adjustPriceByReputation(baseModifier: number, factionRep: number): number {
  // Rep: -5 to +5. Higher rep = better prices.
  // -5 = 1.5x markup, 0 = 1x, +5 = 0.7x discount
  const repBonus = factionRep * -0.06; // each rep point = 6% price change
  return Math.max(0.5, Math.min(2.0, baseModifier + repBonus));
}

export function createDefaultShop(id: string, name: string, location: string, items: ShopStock[]): ShopState {
  return {
    id,
    name,
    location,
    stock: items,
    restockDay: 8, // restock on day 8
    restockIntervalDays: 7,
    priceModifier: 1.0,
  };
}
