// src/models/Location.ts
import { Direction } from './types';

export interface Exit {
  direction: Direction;
  locationId: string;
  isLocked?: boolean;
  keyId?: string;
  description?: string;
}

export interface LocationInterface {
  id: string;
  name: string;
  description: string;
  exits: Exit[];
  itemIds: string[];
  creatureIds: string[];
  visited: boolean;
  events?: {
    onEnter?: string;
    onExit?: string;
  };
}

export class Location implements LocationInterface {
  id: string;
  name: string;
  description: string;
  exits: Exit[];
  itemIds: string[];
  creatureIds: string[];
  visited: boolean;
  events?: {
    onEnter?: string;
    onExit?: string;
  };

  constructor(data: LocationInterface) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.exits = data.exits || [];
    this.itemIds = data.itemIds || [];
    this.creatureIds = data.creatureIds || [];
    this.visited = data.visited || false;
    this.events = data.events || {};
  }

  hasExit(direction: Direction): boolean {
    return this.exits.some((exit) => exit.direction === direction);
  }

  getExit(direction: Direction): Exit | undefined {
    return this.exits.find((exit) => exit.direction === direction);
  }

  addItem(itemId: string): void {
    if (!this.itemIds.includes(itemId)) {
      this.itemIds.push(itemId);
    }
  }

  removeItem(itemId: string): boolean {
    const index = this.itemIds.indexOf(itemId);
    if (index > -1) {
      this.itemIds.splice(index, 1);
      return true;
    }
    return false;
  }

  addCreature(creatureId: string): void {
    if (!this.creatureIds.includes(creatureId)) {
      this.creatureIds.push(creatureId);
    }
  }

  removeCreature(creatureId: string): boolean {
    const index = this.creatureIds.indexOf(creatureId);
    if (index > -1) {
      this.creatureIds.splice(index, 1);
      return true;
    }
    return false;
  }
}
