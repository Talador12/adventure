// Random weapon quirk generator — personality quirks for magical weapons.
export interface WeaponQuirk { quirk: string; category: 'cosmetic' | 'personality' | 'mechanical' | 'curse'; }
const QUIRKS: WeaponQuirk[] = [
  { quirk: 'Glows faintly blue when orcs are within 120ft.', category: 'mechanical' },
  { quirk: 'Hums a battle hymn during combat.', category: 'cosmetic' },
  { quirk: 'Demands to be named and addressed by that name.', category: 'personality' },
  { quirk: 'Weeps blood when it deals a killing blow.', category: 'cosmetic' },
  { quirk: 'Refuses to be sheathed until it has tasted blood each day.', category: 'curse' },
  { quirk: 'Gets jealous of other weapons. Vibrates angrily if another weapon is drawn.', category: 'personality' },
  { quirk: 'Changes color based on the wielder\'s mood.', category: 'cosmetic' },
  { quirk: 'Whispers tactical advice — sometimes helpful, sometimes wrong.', category: 'personality' },
  { quirk: 'Is unnaturally warm to the touch.', category: 'cosmetic' },
  { quirk: 'Points toward the nearest source of danger like a compass.', category: 'mechanical' },
  { quirk: 'Makes a dramatic *schwing* sound every time it\'s drawn.', category: 'cosmetic' },
  { quirk: 'Attracts cats. Cats love this weapon.', category: 'cosmetic' },
  { quirk: 'Can only be wielded by someone who tells it a joke each morning.', category: 'personality' },
  { quirk: 'Grows slightly heavier after each kill.', category: 'curse' },
  { quirk: 'Occasionally speaks the last words of someone it killed.', category: 'curse' },
];
export function getRandomQuirk(): WeaponQuirk { return QUIRKS[Math.floor(Math.random() * QUIRKS.length)]; }
export function getQuirksByCategory(cat: WeaponQuirk['category']): WeaponQuirk[] { return QUIRKS.filter((q) => q.category === cat); }
export function formatWeaponQuirk(q: WeaponQuirk): string { const icon = q.category === 'curse' ? '💀' : q.category === 'mechanical' ? '⚙️' : q.category === 'personality' ? '🗣️' : '✨'; return `${icon} **Weapon Quirk** (${q.category}): ${q.quirk}`; }
