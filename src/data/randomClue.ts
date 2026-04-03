// Random clue generator — investigation clues for mystery adventures.
export interface Clue { description: string; type: 'physical' | 'testimony' | 'document' | 'magical'; checkRequired: string; revealsWhen: string; }
const CLUES: Clue[] = [
  { description: 'Muddy bootprints leading away from the scene — wrong size for the suspect.', type: 'physical', checkRequired: 'Investigation DC 12', revealsWhen: 'Someone else was present.' },
  { description: 'A torn piece of fabric caught on a nail — expensive silk, dyed purple.', type: 'physical', checkRequired: 'Perception DC 10', revealsWhen: 'The culprit is wealthy or noble.' },
  { description: 'A witness saw a hooded figure at the tavern that night.', type: 'testimony', checkRequired: 'Persuasion DC 13 to get details', revealsWhen: 'The figure had a limp and smelled of sulfur.' },
  { description: 'A crumpled letter in a wastepaper basket, partially burned.', type: 'document', checkRequired: 'Investigation DC 14 to find, History DC 12 to read', revealsWhen: 'Names a meeting place and time.' },
  { description: 'Detect Magic reveals residual enchantment on the victim\'s belongings.', type: 'magical', checkRequired: 'Detect Magic or Arcana DC 15', revealsWhen: 'The victim was charmed before the incident.' },
  { description: 'A local dog keeps barking at one specific building.', type: 'physical', checkRequired: 'Animal Handling DC 10 or Investigation DC 13', revealsWhen: 'Something is hidden in the cellar.' },
  { description: 'The town records show the suspect was elsewhere — but the ink is fresh.', type: 'document', checkRequired: 'Investigation DC 15', revealsWhen: 'The alibi was forged after the fact.' },
  { description: 'A beggar on the corner knows everything but will only trade for food.', type: 'testimony', checkRequired: 'Persuasion DC 8 (if you feed them)', revealsWhen: 'They saw the whole thing from their usual spot.' },
];
export function getRandomClue(): Clue { return CLUES[Math.floor(Math.random() * CLUES.length)]; }
export function getClues(count: number = 3): Clue[] { return [...CLUES].sort(() => Math.random() - 0.5).slice(0, count); }
export function formatClues(clues: Clue[]): string { const lines = ['🔍 **Investigation Clues:**']; for (const c of clues) { const icon = c.type === 'physical' ? '👣' : c.type === 'testimony' ? '👤' : c.type === 'document' ? '📄' : '✨'; lines.push(`${icon} ${c.description}\n  Check: ${c.checkRequired}\n  Reveals: ${c.revealsWhen}`); } return lines.join('\n'); }
