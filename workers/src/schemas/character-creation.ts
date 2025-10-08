/**
 * JSON schema for character creation using LLM structured outputs
 */
export const characterCreationSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "The character's name"
    },
    race: {
      type: "string",
      description: "The character's race (e.g., Human, Elf, Dwarf, Halfling, Orc, Tiefling)"
    },
    class: {
      type: "string",
      description: "The character's class (e.g., Warrior, Mage, Rogue, Cleric, Paladin, Ranger)"
    },
    level: {
      type: "number",
      description: "The character's level (1-20)"
    },
    background: {
      type: "string",
      description: "The character's background (e.g., Soldier, Scholar, Criminal, Noble, Folk Hero, Sage)"
    },
    alignment: {
      type: "string",
      description: "The character's moral alignment (e.g., Lawful Good, Chaotic Neutral, True Neutral)"
    },
    personality_traits: {
      type: "array",
      description: "Array of 2-3 personality traits that define the character",
      items: {
        type: "string"
      },
      minItems: 2,
      maxItems: 3
    },
    backstory: {
      type: "string",
      description: "A brief backstory (2-3 sentences) explaining the character's history and motivations"
    }
  },
  required: ["name", "race", "class", "level", "background", "alignment", "personality_traits", "backstory"]
} as const;

/**
 * TypeScript type derived from the schema
 */
export interface CharacterCreation {
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment: string;
  personality_traits: string[];
  backstory: string;
}
