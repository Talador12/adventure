// Mounted combat — ride mounts with movement bonuses and special actions.
// Mounts provide speed, special abilities, and tactical advantages.

export type MountType = 'horse' | 'warhorse' | 'pony' | 'griffon' | 'dire_wolf' | 'elephant';

export interface Mount {
  type: MountType;
  name: string;
  emoji: string;
  speed: number; // cells per turn
  hp: number;
  ac: number;
  cost: number; // gp
  specialAbility: string;
  canFly: boolean;
  size: 'medium' | 'large' | 'huge';
}

export const MOUNTS: Mount[] = [
  { type: 'pony', name: 'Pony', emoji: '🐴', speed: 8, hp: 11, ac: 10, cost: 30, specialAbility: 'None', canFly: false, size: 'medium' },
  { type: 'horse', name: 'Riding Horse', emoji: '🐎', speed: 12, hp: 13, ac: 10, cost: 75, specialAbility: 'None', canFly: false, size: 'large' },
  { type: 'warhorse', name: 'Warhorse', emoji: '🏇', speed: 12, hp: 19, ac: 11, cost: 400, specialAbility: 'Trampling Charge: If the warhorse moves at least 20ft and hits with hooves, target must make DC 14 STR save or be knocked prone.', canFly: false, size: 'large' },
  { type: 'dire_wolf', name: 'Dire Wolf', emoji: '🐺', speed: 10, hp: 37, ac: 14, cost: 500, specialAbility: 'Pack Tactics: Advantage on attacks if an ally is within 5ft of target.', canFly: false, size: 'large' },
  { type: 'griffon', name: 'Griffon', emoji: '🦅', speed: 16, hp: 59, ac: 12, cost: 3000, specialAbility: 'Flight: Can fly at full speed. Dive Attack: +2d6 damage if diving 30ft+ before attack.', canFly: true, size: 'large' },
  { type: 'elephant', name: 'Elephant', emoji: '🐘', speed: 8, hp: 76, ac: 12, cost: 1000, specialAbility: 'Trampling Charge: DC 12 STR save or 3d10 bludgeoning + prone. Gore attack: 3d8+5.', canFly: false, size: 'huge' },
];

export interface MountedState {
  riderId: string;
  mount: Mount;
  mountHp: number;
  isMounted: boolean;
}

export function getMount(type: MountType): Mount {
  return MOUNTS.find((m) => m.type === type) || MOUNTS[0];
}

export function getMountedSpeed(mount: Mount, riderSpeed: number): number {
  // While mounted, use mount's speed (usually faster)
  return Math.max(mount.speed, riderSpeed);
}

export function canMountInCombat(): { cost: string; description: string } {
  return {
    cost: 'Half your movement speed',
    description: 'Mounting or dismounting costs half your movement for the turn.',
  };
}

export function resolveMountDamage(state: MountedState, damage: number): {
  state: MountedState;
  riderDismounted: boolean;
  narration: string;
} {
  const newHp = Math.max(0, state.mountHp - damage);
  const dismounted = newHp <= 0;

  const narration = dismounted
    ? `${state.mount.emoji} **${state.mount.name}** falls! (${damage} damage, mount destroyed) Rider is dismounted!`
    : `${state.mount.emoji} **${state.mount.name}** takes ${damage} damage (${newHp}/${state.mount.hp} HP).`;

  return {
    state: { ...state, mountHp: newHp, isMounted: !dismounted },
    riderDismounted: dismounted,
    narration,
  };
}

export function formatMountStatus(state: MountedState): string {
  const hpPct = Math.round((state.mountHp / state.mount.hp) * 100);
  const bar = hpPct > 50 ? '🟢' : hpPct > 25 ? '🟡' : '🔴';
  return `${state.mount.emoji} **${state.mount.name}**: ${bar} ${state.mountHp}/${state.mount.hp} HP | Speed: ${state.mount.speed * 5}ft${state.mount.canFly ? ' (fly)' : ''} | AC: ${state.mount.ac}`;
}

export function formatMountList(): string {
  const lines = ['🐎 **Available Mounts:**'];
  for (const m of MOUNTS) {
    lines.push(`${m.emoji} **${m.name}** — ${m.speed * 5}ft speed, ${m.hp} HP, AC ${m.ac}, ${m.cost}gp${m.canFly ? ' (flying)' : ''}`);
    if (m.specialAbility !== 'None') lines.push(`  *${m.specialAbility}*`);
  }
  return lines.join('\n');
}
