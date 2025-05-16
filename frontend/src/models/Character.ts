// src/models/Character.ts
import { Stats, EquipmentSlot } from './types';
import { Item } from './Item';

export interface CharacterInterface {
  id: string;
  name: string;
  description: string;
  stats: Stats;
  inventory: string[];
  equipped: Record<EquipmentSlot, string | null>;
  gold: number;
}

export class Character implements CharacterInterface {
  id: string;
  name: string;
  description: string;
  stats: Stats;
  inventory: string[];
  equipped: Record<EquipmentSlot, string | null>;
  gold: number;

  constructor(data: CharacterInterface) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.stats = data.stats;
    this.inventory = data.inventory || [];
    this.equipped = data.equipped || {
      weapon: null,
      armor: null,
      accessory: null,
    };
    this.gold = data.gold || 0;
  }

  addItem(itemId: string): void {
    this.inventory.push(itemId);
  }

  removeItem(itemId: string): boolean {
    const index = this.inventory.indexOf(itemId);
    if (index > -1) {
      this.inventory.splice(index, 1);
      return true;
    }
    return false;
  }

  hasItem(itemId: string): boolean {
    return this.inventory.includes(itemId);
  }

  equip(itemId: string, slot: EquipmentSlot): string | null {
    // Return the previously equipped item ID if there was one
    const previousItem = this.equipped[slot];
    this.equipped[slot] = itemId;
    return previousItem;
  }

  unequip(slot: EquipmentSlot): string | null {
    const itemId = this.equipped[slot];
    this.equipped[slot] = null;
    return itemId;
  }

  isEquipped(itemId: string): boolean {
    return Object.values(this.equipped).includes(itemId);
  }

  takeDamage(amount: number): boolean {
    this.stats.health = Math.max(0, this.stats.health - amount);
    return this.stats.health <= 0;
  }

  heal(amount: number): void {
    this.stats.health = Math.min(this.stats.maxHealth, this.stats.health + amount);
  }

  isDead(): boolean {
    return this.stats.health <= 0;
  }

  addGold(amount: number): void {
    this.gold += amount;
  }

  removeGold(amount: number): boolean {
    if (this.gold >= amount) {
      this.gold -= amount;
      return true;
    }
    return false;
  }
}
