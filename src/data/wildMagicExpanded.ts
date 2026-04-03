// Wild magic surge table (expanded) — 30 additional results beyond the base table.

export type SurgeCategory = 'beneficial' | 'neutral' | 'harmful' | 'chaotic';

export interface ExpandedSurge {
  id: number;
  description: string;
  category: SurgeCategory;
  mechanicalEffect: string;
  duration: string;
}

const SURGES: ExpandedSurge[] = [
  { id: 1, description: 'You turn blue. Completely, vibrantly blue.', category: 'neutral', mechanicalEffect: 'Skin turns blue. No mechanical effect. Very noticeable.', duration: '1d4 days' },
  { id: 2, description: 'Fireball centered on self.', category: 'harmful', mechanicalEffect: '8d6 fire damage within 20ft including you. DEX DC 15 half.', duration: 'Instant' },
  { id: 3, description: 'You gain the ability to speak with plants.', category: 'beneficial', mechanicalEffect: 'Speak with Plants. Plants are chatty and opinionated.', duration: '24 hours' },
  { id: 4, description: 'Every door within 60ft flies open simultaneously.', category: 'chaotic', mechanicalEffect: 'All doors (locked or not) within 60ft open. Locks break.', duration: 'Instant' },
  { id: 5, description: 'You shrink to half your size.', category: 'harmful', mechanicalEffect: 'Reduce (as the spell). -1d4 weapon damage.', duration: '1 minute' },
  { id: 6, description: 'A unicorn appears, judges you, and vanishes.', category: 'neutral', mechanicalEffect: 'If good-aligned, +1d4 to next save. Otherwise, it snorts.', duration: 'Instant' },
  { id: 7, description: 'You become invisible. Clothes reappear first.', category: 'beneficial', mechanicalEffect: 'Invisibility 1 minute. Clothes visible after 30 seconds.', duration: '1 minute' },
  { id: 8, description: 'Your hair grows 3 feet instantly.', category: 'neutral', mechanicalEffect: 'Disadvantage on Perception if it covers eyes.', duration: 'Permanent' },
  { id: 9, description: 'You cast Confusion centered on yourself.', category: 'harmful', mechanicalEffect: 'Confusion 10ft radius. WIS DC 15. You are not immune.', duration: '1 minute' },
  { id: 10, description: 'You regain all expended spell slots.', category: 'beneficial', mechanicalEffect: 'All spell slots restored.', duration: 'Instant' },
  { id: 11, description: 'Gravity reverses for you only.', category: 'chaotic', mechanicalEffect: 'Fall upward 30ft, then gravity returns. 3d6 bludgeoning.', duration: '1 round' },
  { id: 12, description: 'A spectral choir sings your theme song.', category: 'neutral', mechanicalEffect: 'Disadvantage on Stealth. Advantage on Intimidation.', duration: '10 minutes' },
  { id: 13, description: 'You become magnetic.', category: 'chaotic', mechanicalEffect: 'Metal objects within 10ft pulled toward you.', duration: '1 minute' },
  { id: 14, description: 'You can see 1 round into the future.', category: 'beneficial', mechanicalEffect: 'Advantage on all rolls. Cannot be surprised.', duration: '1 round' },
  { id: 15, description: 'Butterflies erupt from your fingertips.', category: 'neutral', mechanicalEffect: 'Lightly obscures 10ft around you.', duration: '1 minute' },
  { id: 16, description: 'Your voice echoes impossibly loudly.', category: 'chaotic', mechanicalEffect: 'Stealth impossible. Shout = Thunderwave 2d8.', duration: '10 minutes' },
  { id: 17, description: 'You teleport 60 feet in a random direction.', category: 'chaotic', mechanicalEffect: 'Random 60ft teleport. May end up somewhere bad.', duration: 'Instant' },
  { id: 18, description: 'A third arm grows from your back.', category: 'beneficial', mechanicalEffect: 'Extra arm! Hold shield, somatic components, or unarmed strike.', duration: '1d4 hours' },
  { id: 19, description: 'All your potions activate simultaneously.', category: 'harmful', mechanicalEffect: 'Every potion takes effect at once.', duration: 'Per potion' },
  { id: 20, description: 'You know everyone\'s name within 100 feet.', category: 'beneficial', mechanicalEffect: 'True names of all creatures. Advantage on social checks.', duration: '1 hour' },
  { id: 21, description: 'It rains inside. Just where you are.', category: 'neutral', mechanicalEffect: 'Rain 10ft radius. Extinguishes fires.', duration: '1 hour' },
  { id: 22, description: 'Your shadow critiques your decisions audibly.', category: 'neutral', mechanicalEffect: 'Disadvantage on Deception (shadow reveals truth).', duration: '24 hours' },
  { id: 23, description: 'You gain tremorsense 30ft.', category: 'beneficial', mechanicalEffect: 'Detect creatures on ground within 30ft.', duration: '1 hour' },
  { id: 24, description: 'A helpful imp appears, then steals something.', category: 'chaotic', mechanicalEffect: 'Imp helps for 1 hour, steals one item, vanishes.', duration: '1 hour' },
  { id: 25, description: 'Your blood glows in the dark.', category: 'neutral', mechanicalEffect: 'If wounded, blood provides dim light 5ft.', duration: '1d4 days' },
  { id: 26, description: 'Mirror Image activates involuntarily.', category: 'beneficial', mechanicalEffect: 'Three illusory duplicates appear.', duration: '1 minute' },
  { id: 27, description: 'Everything you say rhymes perfectly.', category: 'neutral', mechanicalEffect: 'Verbal spell components require Performance DC 12.', duration: '1 hour' },
  { id: 28, description: 'Your next attack deals maximum damage.', category: 'beneficial', mechanicalEffect: 'Maximum possible damage. No roll needed.', duration: 'Next attack' },
  { id: 29, description: 'You swap bodies with nearest creature for 1 round.', category: 'chaotic', mechanicalEffect: 'Body swap. Use their stats, they use yours.', duration: '1 round' },
  { id: 30, description: 'A 10ft pit opens beneath you.', category: 'harmful', mechanicalEffect: 'DEX DC 13 or fall 10ft (1d6 bludgeoning). Pit is permanent.', duration: 'Instant' },
];

export function rollExpandedSurge(): ExpandedSurge {
  return SURGES[Math.floor(Math.random() * SURGES.length)];
}

export function getExpandedSurgeById(id: number): ExpandedSurge | undefined {
  return SURGES.find((s) => s.id === id);
}

export function getExpandedSurgesByCategory(category: SurgeCategory): ExpandedSurge[] {
  return SURGES.filter((s) => s.category === category);
}

export function getExpandedSurgeCount(): number {
  return SURGES.length;
}

export function getAllSurgeCategories(): SurgeCategory[] {
  return ['beneficial', 'neutral', 'harmful', 'chaotic'];
}

export function formatExpandedSurge(surge: ExpandedSurge): string {
  const icon = { beneficial: '✨', neutral: '❔', harmful: '💥', chaotic: '🌀' }[surge.category];
  return `${icon} **Wild Surge #${surge.id}** *(${surge.category})*\n  *${surge.description}*\n  ⚙️ ${surge.mechanicalEffect}\n  ⏱️ ${surge.duration}`;
}

export { SURGES as EXPANDED_SURGES };
