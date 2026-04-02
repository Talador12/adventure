// Backstory-driven random events — triggers encounters based on character backstory themes.
// Scans backstory text for keywords and generates thematic events.

import type { Character } from '../types/game';

export interface BackstoryEvent {
  id: string;
  triggerKeywords: string[];
  name: string;
  description: string;
  type: 'encounter' | 'social' | 'discovery' | 'flashback';
  difficulty?: 'easy' | 'medium' | 'hard';
}

const EVENT_TEMPLATES: BackstoryEvent[] = [
  // Orphan / family themes
  {
    id: 'orphan-letter', triggerKeywords: ['orphan', 'parents', 'family', 'abandoned', 'lost family'],
    name: 'A Letter From the Past', type: 'discovery',
    description: 'A courier approaches with a sealed letter bearing an unfamiliar sigil. It claims to be from a relative thought long dead.',
  },
  {
    id: 'family-debt', triggerKeywords: ['orphan', 'family', 'debt', 'parents'],
    name: 'Family Debts', type: 'social',
    description: 'A debt collector appears, claiming the character\'s family owed a significant sum — and that blood debts pass to the living.',
  },
  // Criminal / underworld themes
  {
    id: 'old-gang', triggerKeywords: ['thief', 'criminal', 'guild', 'thieves', 'smuggler', 'rogue', 'crime'],
    name: 'Old Associates', type: 'social',
    description: 'A figure from the character\'s past life recognizes them in the crowd. They want a favor — or they\'ll tell everyone who this "adventurer" really is.',
  },
  {
    id: 'bounty-hunter', triggerKeywords: ['criminal', 'wanted', 'crime', 'thief', 'murder', 'outlaw'],
    name: 'Bounty on Your Head', type: 'encounter', difficulty: 'medium',
    description: 'A bounty hunter has tracked the party to this location, specifically seeking one of their members. Fight, negotiate, or run.',
  },
  // Military / war themes
  {
    id: 'war-flashback', triggerKeywords: ['soldier', 'war', 'battle', 'army', 'military', 'veteran', 'mercenary'],
    name: 'Echoes of War', type: 'flashback',
    description: 'The landscape reminds the character of a battlefield from their past. A WIS save (DC 12) or be shaken — disadvantage on next attack. On success, gain inspiration.',
  },
  {
    id: 'old-comrade', triggerKeywords: ['soldier', 'war', 'army', 'military', 'comrade', 'regiment'],
    name: 'A Familiar Face', type: 'social',
    description: 'A former comrade-in-arms appears, wounded and desperate. They need help with something that could pull the party into a larger conflict.',
  },
  // Noble / political themes
  {
    id: 'noble-assassin', triggerKeywords: ['noble', 'royal', 'heir', 'throne', 'court', 'political'],
    name: 'The Assassin\'s Mark', type: 'encounter', difficulty: 'hard',
    description: 'An assassin strikes at camp — specifically targeting the character with noble blood. Someone in the court wants this heir dead.',
  },
  {
    id: 'political-favor', triggerKeywords: ['noble', 'political', 'court', 'diplomat'],
    name: 'A Political Favor', type: 'social',
    description: 'A messenger arrives with an urgent request from a political figure who knows the character\'s true station. Help, and gain a powerful ally. Refuse, and make a powerful enemy.',
  },
  // Arcane / magical themes
  {
    id: 'wild-surge', triggerKeywords: ['magic', 'arcane', 'wizard', 'sorcerer', 'magical accident', 'experiment'],
    name: 'Residual Magic', type: 'discovery',
    description: 'The character\'s past magical studies left a mark. A surge of wild magic erupts nearby, drawn to them specifically. Roll on the Wild Magic table.',
  },
  {
    id: 'forbidden-book', triggerKeywords: ['magic', 'study', 'library', 'forbidden', 'knowledge', 'scholar'],
    name: 'The Forbidden Text', type: 'discovery',
    description: 'A book vendor has a tome that references the same forbidden knowledge the character once pursued. It could hold answers — or dangers.',
  },
  // Nature / wilderness themes
  {
    id: 'spirit-guide', triggerKeywords: ['nature', 'druid', 'forest', 'wilderness', 'animal', 'beast'],
    name: 'The Spirit Guide', type: 'social',
    description: 'A spectral animal from the character\'s homeland appears, leading them toward something hidden in the wilderness. Only they can see it.',
  },
  // Religious themes
  {
    id: 'divine-test', triggerKeywords: ['faith', 'god', 'temple', 'prayer', 'divine', 'cleric', 'paladin', 'oath'],
    name: 'A Test of Faith', type: 'social',
    description: 'A pilgrim approaches, claiming their deity has sent a vision about the character. The message is a test — how they respond reveals their true character.',
  },
  {
    id: 'fallen-shrine', triggerKeywords: ['faith', 'temple', 'god', 'divine', 'oath'],
    name: 'The Desecrated Shrine', type: 'discovery',
    description: 'The party stumbles upon a defiled shrine to the character\'s deity. Restoring it could grant a blessing. Ignoring it... might have consequences.',
  },
  // Revenge / enemy themes
  {
    id: 'nemesis-spy', triggerKeywords: ['revenge', 'enemy', 'nemesis', 'betrayed', 'betrayal', 'rival'],
    name: 'Eyes in the Shadows', type: 'discovery',
    description: 'Someone has been watching the party. Investigation reveals they were sent by the character\'s old enemy, gathering intelligence.',
  },
];

export function findRelevantEvents(character: Character): BackstoryEvent[] {
  const text = [
    character.backstory || '',
    character.personality?.bonds || '',
    character.personality?.flaws || '',
    character.personality?.traits || '',
    character.background || '',
    character.class || '',
  ].join(' ').toLowerCase();

  return EVENT_TEMPLATES.filter((evt) =>
    evt.triggerKeywords.some((kw) => text.includes(kw.toLowerCase()))
  );
}

export function rollBackstoryEvent(characters: Character[]): { character: Character; event: BackstoryEvent } | null {
  // Collect all characters with matching events, pick one randomly
  const candidates: { character: Character; event: BackstoryEvent }[] = [];
  for (const char of characters) {
    const events = findRelevantEvents(char);
    for (const evt of events) {
      candidates.push({ character: char, event: evt });
    }
  }
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function formatBackstoryEvent(character: Character, event: BackstoryEvent): string {
  const typeIcon = event.type === 'encounter' ? '⚔️' : event.type === 'social' ? '💬' : event.type === 'discovery' ? '🔍' : '💭';
  return `${typeIcon} **${event.name}** (${character.name})\n${event.description}`;
}
