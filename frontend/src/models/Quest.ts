// src/models/Quest.ts

export interface QuestStage {
  id: string;
  description: string;
  completed: boolean;
  itemsNeeded?: string[];
  locationId?: string;
  creatureId?: string;
  nextStageId?: string;
}

export interface QuestReward {
  gold?: number;
  experience?: number;
  itemIds?: string[];
}

export interface QuestInterface {
  id: string;
  name: string;
  description: string;
  stages: QuestStage[];
  reward: QuestReward;
  isCompleted: boolean;
  giver: string; // NPC ID
}

export class Quest implements QuestInterface {
  id: string;
  name: string;
  description: string;
  stages: QuestStage[];
  reward: QuestReward;
  isCompleted: boolean;
  giver: string;

  constructor(data: QuestInterface) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.stages = data.stages || [];
    this.reward = data.reward || {};
    this.isCompleted = data.isCompleted || false;
    this.giver = data.giver;
  }

  getCurrentStage(): QuestStage | undefined {
    return this.stages.find((stage) => !stage.completed);
  }

  completeStage(stageId: string): boolean {
    const stage = this.stages.find((s) => s.id === stageId);
    if (stage) {
      stage.completed = true;

      // Check if this was the last stage
      const incompleteStages = this.stages.filter((s) => !s.completed);
      if (incompleteStages.length === 0) {
        this.isCompleted = true;
      }

      return true;
    }
    return false;
  }

  isStageCompleted(stageId: string): boolean {
    const stage = this.stages.find((s) => s.id === stageId);
    return stage ? stage.completed : false;
  }

  getProgress(): number {
    if (this.stages.length === 0) return 100;

    const completedStages = this.stages.filter((stage) => stage.completed).length;
    return Math.floor((completedStages / this.stages.length) * 100);
  }

  hasStage(stageId: string): boolean {
    return this.stages.some((stage) => stage.id === stageId);
  }

  getStage(stageId: string): QuestStage | undefined {
    return this.stages.find((stage) => stage.id === stageId);
  }
}
