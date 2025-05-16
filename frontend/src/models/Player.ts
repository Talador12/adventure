// src/models/Player.ts
import { Character, CharacterInterface } from './Character';

export interface PlayerInterface extends CharacterInterface {
  experience: number;
  level: number;
  questIds: string[];
  completedQuestIds: string[];
}

export class Player extends Character implements PlayerInterface {
  experience: number;
  level: number;
  questIds: string[];
  completedQuestIds: string[];

  constructor(data: PlayerInterface) {
    super(data);
    this.experience = data.experience || 0;
    this.level = data.level || 1;
    this.questIds = data.questIds || [];
    this.completedQuestIds = data.completedQuestIds || [];
  }

  addExperience(amount: number): boolean {
    this.experience += amount;

    // Check for level up - simple level up formula
    const expNeeded = this.level * 100;
    if (this.experience >= expNeeded) {
      this.levelUp();
      return true;
    }
    return false;
  }

  levelUp(): void {
    this.level++;

    // Increase stats on level up
    this.stats.maxHealth += 10;
    this.stats.health = this.stats.maxHealth;
    this.stats.strength += 1;
    this.stats.dexterity += 1;
    this.stats.intelligence += 1;
  }

  addQuest(questId: string): void {
    if (!this.hasQuest(questId) && !this.hasCompletedQuest(questId)) {
      this.questIds.push(questId);
    }
  }

  completeQuest(questId: string): boolean {
    const index = this.questIds.indexOf(questId);
    if (index > -1) {
      this.questIds.splice(index, 1);
      this.completedQuestIds.push(questId);
      return true;
    }
    return false;
  }

  hasQuest(questId: string): boolean {
    return this.questIds.includes(questId);
  }

  hasCompletedQuest(questId: string): boolean {
    return this.completedQuestIds.includes(questId);
  }

  getBaseAttack(): number {
    return this.stats.strength;
  }

  getBaseDefense(): number {
    return this.stats.dexterity;
  }

  getExpNeededForNextLevel(): number {
    return this.level * 100;
  }

  getExpProgress(): number {
    const expNeeded = this.getExpNeededForNextLevel();
    return Math.min(100, Math.floor((this.experience / expNeeded) * 100));
  }
}
