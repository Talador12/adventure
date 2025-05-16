// src/models/Item.ts
import { ItemType, EquipmentSlot, Stats } from './types';

export interface ItemInterface {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  weight: number;
  value: number;
  isEquippable?: boolean;
  equipmentSlot?: EquipmentSlot;
  stats?: Partial<Stats>;
  damage?: number;
  defense?: number;
  uses?: number;
  effects?: string[];
  requiredItems?: string[];
  isQuestItem?: boolean;
  questId?: string;
}

export class Item implements ItemInterface {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  weight: number;
  value: number;
  isEquippable?: boolean;
  equipmentSlot?: EquipmentSlot;
  stats?: Partial<Stats>;
  damage?: number;
  defense?: number;
  uses?: number;
  effects?: string[];
  requiredItems?: string[];
  isQuestItem?: boolean;
  questId?: string;

  constructor(data: ItemInterface) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.weight = data.weight;
    this.value = data.value;
    this.isEquippable = data.isEquippable;
    this.equipmentSlot = data.equipmentSlot;
    this.stats = data.stats;
    this.damage = data.damage;
    this.defense = data.defense;
    this.uses = data.uses;
    this.effects = data.effects;
    this.requiredItems = data.requiredItems;
    this.isQuestItem = data.isQuestItem;
    this.questId = data.questId;
  }

  isWeapon(): boolean {
    return this.type === 'weapon';
  }

  isArmor(): boolean {
    return this.type === 'armor';
  }

  isConsumable(): boolean {
    return this.type === 'consumable';
  }

  canBeUsed(): boolean {
    return this.isConsumable() || (this.uses !== undefined && this.uses > 0);
  }

  use(): boolean {
    if (this.uses !== undefined && this.uses > 0) {
      this.uses--;
      return true;
    }
    return false;
  }

  getStatModifiers(): Partial<Stats> {
    return this.stats || {};
  }
}
