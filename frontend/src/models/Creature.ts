// src/models/Creature.ts
import { Character, CharacterInterface } from './Character';

export interface CreatureInterface extends CharacterInterface {
  hostile: boolean;
  experienceValue: number;
  lootTable?: {
    itemId: string;
    chance: number;
  }[];
  dialogue?: Record<string, string>;
  aiType?: 'passive' | 'aggressive' | 'cowardly' | 'intelligent';
}

export class Creature extends Character implements CreatureInterface {
  hostile: boolean;
  experienceValue: number;
  lootTable?: {
    itemId: string;
    chance: number;
  }[];
  dialogue?: Record<string, string>;
  aiType: 'passive' | 'aggressive' | 'cowardly' | 'intelligent';

  constructor(data: CreatureInterface) {
    super(data);
    this.hostile = data.hostile || false;
    this.experienceValue = data.experienceValue || 0;
    this.lootTable = data.lootTable || [];
    this.dialogue = data.dialogue || {};
    this.aiType = data.aiType || 'passive';
  }

  getRandomLoot(): string[] {
    if (!this.lootTable || this.lootTable.length === 0) {
      return [];
    }

    const loot: string[] = [];
    this.lootTable.forEach((item) => {
      if (Math.random() <= item.chance) {
        loot.push(item.itemId);
      }
    });

    return loot;
  }

  speak(key: string): string {
    if (this.dialogue && this.dialogue[key]) {
      return this.dialogue[key];
    }
    return "The creature doesn't respond.";
  }

  getAttackDamage(): number {
    // Base damage plus random factor
    return this.stats.strength + Math.floor(Math.random() * 3) - 1;
  }

  makeHostile(): void {
    this.hostile = true;
  }

  isHostile(): boolean {
    return this.hostile;
  }

  chooseAction(playerHealth: number): 'attack' | 'flee' | 'special' {
    // Simple AI decision making based on type
    switch (this.aiType) {
      case 'passive':
        return this.hostile ? 'attack' : 'flee';

      case 'aggressive':
        return 'attack';

      case 'cowardly':
        return this.stats.health < this.stats.maxHealth / 2 ? 'flee' : 'attack';

      case 'intelligent':
        // More complex decision making
        if (this.stats.health < this.stats.maxHealth * 0.3) {
          return 'flee';
        } else if (Math.random() < 0.2) {
          return 'special';
        } else {
          return 'attack';
        }

      default:
        return 'attack';
    }
  }
}
