// Random session theme — a thematic focus for tonight's game.
export interface SessionTheme { theme: string; description: string; toneGuide: string; suggestions: string[]; }
const THEMES: SessionTheme[] = [
  { theme: 'Betrayal', description: 'Someone isn\'t who they claim to be. Trust is tested.', toneGuide: 'Tense, paranoid. Play NPCs with subtle tells.', suggestions: ['An ally switches sides.', 'Evidence of deception surfaces.', 'A vote of trust within the party.'] },
  { theme: 'Survival', description: 'Resources are scarce. The environment is the enemy.', toneGuide: 'Gritty, desperate. Track rations, water, hit dice.', suggestions: ['Harsh weather event.', 'Equipment breaks.', 'A shelter must be found before nightfall.'] },
  { theme: 'Mystery', description: 'Something doesn\'t add up. The truth is hidden.', toneGuide: 'Slow burn. Clues over combat. Let players think.', suggestions: ['Red herrings mixed with real clues.', 'An NPC knows more than they let on.', 'A ticking clock.'] },
  { theme: 'Heist', description: 'Plan the job. Execute the job. Escape.', toneGuide: 'Energetic, clever. Reward creative solutions.', suggestions: ['A map of the target.', 'Disguises and deception.', 'Something goes wrong mid-heist.'] },
  { theme: 'Horror', description: 'Something is deeply wrong. Fear is the enemy.', toneGuide: 'Quiet, unsettling. Less is more. Describe sounds, not sights.', suggestions: ['Isolation.', 'An enemy that can\'t be fought normally.', 'Something the party cares about is threatened.'] },
  { theme: 'Festival', description: 'Celebration! Games, competitions, socializing.', toneGuide: 'Light, fun. Let players relax before the next crisis.', suggestions: ['Mini-games with prizes.', 'NPC introductions.', 'A quiet subplot that seeds the next arc.'] },
];
export function getRandomTheme(): SessionTheme { return THEMES[Math.floor(Math.random() * THEMES.length)]; }
export function formatSessionTheme(t: SessionTheme): string { return `🎭 **Tonight's Theme: ${t.theme}**\n*${t.description}*\n🎬 Tone: ${t.toneGuide}\n💡 Suggestions:\n${t.suggestions.map((s) => `  • ${s}`).join('\n')}`; }
