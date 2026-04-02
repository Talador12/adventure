// Quest branching system — player choices affect future quest availability.
// Each decision point creates a fork with tracked consequences.

export interface QuestChoice {
  id: string;
  questId: string;
  prompt: string;       // "Do you help the merchant or rob them?"
  options: QuestOption[];
  madeChoice?: string;  // ID of chosen option
}

export interface QuestOption {
  id: string;
  label: string;
  description: string;
  consequences: QuestConsequence[];
}

export interface QuestConsequence {
  type: 'unlock_quest' | 'lock_quest' | 'faction_change' | 'gold_change' | 'npc_disposition' | 'narration';
  questId?: string;        // for unlock/lock
  factionId?: string;      // for faction_change
  value?: number;          // amount (gold, reputation)
  npcName?: string;        // for npc_disposition
  text?: string;           // for narration
}

// Pre-built branching points for campaign templates
export const BRANCHING_TEMPLATES: QuestChoice[] = [
  {
    id: 'merchant-choice', questId: 'q1', prompt: 'The merchant offers information in exchange for gold, or you could take it by force.',
    options: [
      { id: 'pay', label: 'Pay the merchant', description: 'Spend 50gp for the information.',
        consequences: [
          { type: 'gold_change', value: -50 },
          { type: 'npc_disposition', npcName: 'Merchant', value: 1 },
          { type: 'narration', text: 'The merchant smiles and shares what they know. A fair deal.' },
        ] },
      { id: 'intimidate', label: 'Intimidate them', description: 'CHA check DC 14 to get the info for free.',
        consequences: [
          { type: 'npc_disposition', npcName: 'Merchant', value: -2 },
          { type: 'narration', text: 'The merchant\'s hands tremble as they reveal the information. They won\'t forget this.' },
        ] },
      { id: 'walk-away', label: 'Walk away', description: 'Find another source of information.',
        consequences: [
          { type: 'unlock_quest', questId: 'alternative-source' },
          { type: 'narration', text: 'You leave the merchant and seek answers elsewhere.' },
        ] },
    ],
  },
  {
    id: 'prisoner-choice', questId: 'q2', prompt: 'You\'ve captured an enemy scout. What do you do with them?',
    options: [
      { id: 'release', label: 'Release them', description: 'Show mercy — they might spread word of your kindness.',
        consequences: [
          { type: 'faction_change', factionId: 'enemy', value: 1 },
          { type: 'narration', text: 'The scout bows and flees. Perhaps this mercy will bear fruit.' },
        ] },
      { id: 'interrogate', label: 'Interrogate', description: 'Extract information about enemy positions.',
        consequences: [
          { type: 'unlock_quest', questId: 'ambush-intel' },
          { type: 'narration', text: 'After some persuasion, the scout reveals valuable intelligence.' },
        ] },
      { id: 'recruit', label: 'Recruit them', description: 'Offer them a place in your party as a guide.',
        consequences: [
          { type: 'narration', text: 'The scout, grateful for the second chance, agrees to guide you.' },
          { type: 'npc_disposition', npcName: 'Scout', value: 2 },
        ] },
    ],
  },
];

export function applyConsequences(
  choice: QuestOption,
  callbacks: {
    changeGold?: (amount: number) => void;
    changeFaction?: (factionId: string, delta: number) => void;
    changeNpcDisposition?: (npcName: string, delta: number) => void;
    addNarration?: (text: string) => void;
    unlockQuest?: (questId: string) => void;
    lockQuest?: (questId: string) => void;
  },
): void {
  for (const c of choice.consequences) {
    switch (c.type) {
      case 'gold_change': callbacks.changeGold?.(c.value || 0); break;
      case 'faction_change': if (c.factionId) callbacks.changeFaction?.(c.factionId, c.value || 0); break;
      case 'npc_disposition': if (c.npcName) callbacks.changeNpcDisposition?.(c.npcName, c.value || 0); break;
      case 'narration': if (c.text) callbacks.addNarration?.(c.text); break;
      case 'unlock_quest': if (c.questId) callbacks.unlockQuest?.(c.questId); break;
      case 'lock_quest': if (c.questId) callbacks.lockQuest?.(c.questId); break;
    }
  }
}
