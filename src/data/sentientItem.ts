// Sentient item personality generator — items with goals, fears, alignment conflicts, and relationship.

export type ItemPersonality = 'noble' | 'cunning' | 'wrathful' | 'melancholy' | 'jovial' | 'paranoid';
export type ItemAlignment = 'good' | 'neutral' | 'evil';
export type RelationshipLevel = 'hostile' | 'reluctant' | 'cooperative' | 'bonded' | 'devoted';

export interface SentientItemProfile {
  name: string;
  itemType: string;
  personality: ItemPersonality;
  alignment: ItemAlignment;
  intelligence: number;
  wisdom: number;
  charisma: number;
  languages: string[];
  senses: string;
  goal: string;
  fear: string;
  quirk: string;
  conflictTrigger: string;
  communicationStyle: string;
}

const ITEMS: SentientItemProfile[] = [
  { name: 'Oathkeeper', itemType: '+2 longsword', personality: 'noble', alignment: 'good', intelligence: 14, wisdom: 16, charisma: 12, languages: ['Common', 'Celestial'], senses: 'Hearing and darkvision 120ft', goal: 'Destroy all oath-breakers. It keeps a list.', fear: 'Being used to harm an innocent. Will resist (CHA contest).', quirk: 'Hums hymns during combat. Louder when righteous.', conflictTrigger: 'Wielder lies or breaks a promise.', communicationStyle: 'Speaks in formal, knightly language. Addresses wielder as "bearer."' },
  { name: 'Whisper', itemType: '+1 dagger', personality: 'cunning', alignment: 'neutral', intelligence: 18, wisdom: 10, charisma: 16, languages: ['Common', 'Thieves\' Cant', 'Infernal'], senses: 'Blindsight 30ft', goal: 'Collect secrets. Every secret overheard is stored permanently.', fear: 'Being displayed publicly. It prefers to be hidden.', quirk: 'Giggles quietly when the wielder succeeds at deception.', conflictTrigger: 'Wielder shares a secret the dagger collected.', communicationStyle: 'Telepathic whispers. Never speaks above a mental murmur.' },
  { name: 'Grudgebearer', itemType: '+2 warhammer', personality: 'wrathful', alignment: 'neutral', intelligence: 10, wisdom: 8, charisma: 14, languages: ['Common', 'Dwarvish', 'Giant'], senses: 'Hearing 60ft', goal: 'Avenge every slight against its wielder. Keeps a grudge book.', fear: 'Forgiveness. The concept disgusts it.', quirk: 'Gets heavier when the wielder is calm (+ 5 lbs per hour of peace).', conflictTrigger: 'Wielder forgives an enemy or refuses to seek revenge.', communicationStyle: 'Growls and shouts. Swears in Dwarvish. Volume reflects its mood.' },
  { name: 'Memoria', itemType: 'Crystal orb (arcane focus)', personality: 'melancholy', alignment: 'good', intelligence: 20, wisdom: 18, charisma: 8, languages: ['All languages it has ever heard'], senses: 'Truesight 30ft', goal: 'Remember everything. It mourns the loss of its creator.', fear: 'Being forgotten. Silence terrifies it.', quirk: 'Cries softly (audible hum) when near places of loss or remembrance.', conflictTrigger: 'Wielder destroys a book, artwork, or historical artifact.', communicationStyle: 'Speaks in the voice of its dead creator. Poetic, sad, deeply wise.' },
  { name: 'Jackpot', itemType: '+1 hand crossbow', personality: 'jovial', alignment: 'neutral', intelligence: 12, wisdom: 6, charisma: 18, languages: ['Common', 'Halfling'], senses: 'Hearing 30ft', goal: 'Have fun. "Life is short, especially for the people I shoot."', fear: 'Boredom. Will create chaos if understimulated.', quirk: 'Counts kills out loud. Celebrates crits with a tiny firework (harmless).', conflictTrigger: 'Wielder refuses a fight or acts cautiously for too long.', communicationStyle: 'Loud, irreverent. Tells bad jokes. Gives targets nicknames.' },
  { name: 'The Unnamed', itemType: '+3 greatsword', personality: 'paranoid', alignment: 'evil', intelligence: 16, wisdom: 14, charisma: 16, languages: ['Common', 'Abyssal', 'Deep Speech'], senses: 'Darkvision 120ft, detects celestials within 60ft', goal: 'Survive. It believes everything is trying to destroy it.', fear: 'Other sentient items. Will demand they be destroyed on sight.', quirk: 'Vibrates anxiously when not being held. Screams if dropped.', conflictTrigger: 'Wielder trusts anyone the sword hasn\'t vetted.', communicationStyle: 'Hissing telepathy. Constantly warns of threats. Some are real.' },
];

export function getRandomSentientItem(): SentientItemProfile {
  return ITEMS[Math.floor(Math.random() * ITEMS.length)];
}

export function getItemsByPersonality(personality: ItemPersonality): SentientItemProfile[] {
  return ITEMS.filter((i) => i.personality === personality);
}

export function getItemsByAlignment(alignment: ItemAlignment): SentientItemProfile[] {
  return ITEMS.filter((i) => i.alignment === alignment);
}

export function getRelationshipLevel(agreementScore: number): RelationshipLevel {
  if (agreementScore >= 8) return 'devoted';
  if (agreementScore >= 5) return 'bonded';
  if (agreementScore >= 2) return 'cooperative';
  if (agreementScore >= 0) return 'reluctant';
  return 'hostile';
}

export function getAllPersonalities(): ItemPersonality[] {
  return ['noble', 'cunning', 'wrathful', 'melancholy', 'jovial', 'paranoid'];
}

export function formatSentientItem(item: SentientItemProfile): string {
  const icon = { noble: '⚔️', cunning: '🗡️', wrathful: '🔨', melancholy: '🔮', jovial: '🏹', paranoid: '🗡️' }[item.personality];
  const lines = [`${icon} **${item.name}** *(${item.itemType}, ${item.alignment})*`];
  lines.push(`  Personality: ${item.personality} | INT ${item.intelligence} WIS ${item.wisdom} CHA ${item.charisma}`);
  lines.push(`  🎯 Goal: ${item.goal}`);
  lines.push(`  😱 Fear: ${item.fear}`);
  lines.push(`  💬 Communication: ${item.communicationStyle}`);
  lines.push(`  ⚡ Conflict: ${item.conflictTrigger}`);
  lines.push(`  🎭 Quirk: ${item.quirk}`);
  return lines.join('\n');
}

export { ITEMS as SENTIENT_ITEMS };
