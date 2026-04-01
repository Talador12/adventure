// Chase scene obstacles — random complications during pursuit.
// Each obstacle requires a skill check or triggers an effect.

export interface ChaseObstacle {
  description: string;
  skill: string;
  dc: number;
  failEffect: string;
}

export const URBAN_OBSTACLES: ChaseObstacle[] = [
  { description: 'A crowd blocks the street!', skill: 'Athletics', dc: 12, failEffect: 'Lose 1 round (fall behind).' },
  { description: 'A cart overturns in your path!', skill: 'Acrobatics', dc: 13, failEffect: 'Take 1d6 bludgeoning damage.' },
  { description: 'A dog runs between your legs!', skill: 'Acrobatics', dc: 10, failEffect: 'Prone — lose half movement.' },
  { description: 'You reach a locked gate!', skill: 'Athletics', dc: 15, failEffect: 'Must find another way — lose 1 round.' },
  { description: 'Laundry lines block your path!', skill: 'Perception', dc: 12, failEffect: 'Blinded for 1 round.' },
];

export const WILDERNESS_OBSTACLES: ChaseObstacle[] = [
  { description: 'A fallen log blocks the path!', skill: 'Athletics', dc: 12, failEffect: 'Prone — lose half movement.' },
  { description: 'You run into thick undergrowth!', skill: 'Nature', dc: 13, failEffect: 'Speed halved this round.' },
  { description: 'A hidden stream crossing!', skill: 'Athletics', dc: 14, failEffect: 'Fall in — take 1d4 damage, soaked.' },
  { description: 'Loose rocks on a slope!', skill: 'Acrobatics', dc: 13, failEffect: 'Slide back — lose 1 round.' },
  { description: 'A swarm of insects!', skill: 'Constitution', dc: 11, failEffect: 'Distracted — disadvantage next round.' },
];

export function getChaseObstacle(urban: boolean): ChaseObstacle {
  const table = urban ? URBAN_OBSTACLES : WILDERNESS_OBSTACLES;
  return table[Math.floor(Math.random() * table.length)];
}

export function resolveChaseRound(
  characterName: string,
  skillMod: number,
  urban: boolean,
): { obstacle: ChaseObstacle; roll: number; success: boolean; narration: string } {
  const obstacle = getChaseObstacle(urban);
  const roll = Math.floor(Math.random() * 20) + 1 + skillMod;
  const success = roll >= obstacle.dc;
  const narration = success
    ? `${characterName} overcomes: ${obstacle.description} (${obstacle.skill} ${roll} vs DC ${obstacle.dc}) ✅`
    : `${characterName} fails: ${obstacle.description} (${obstacle.skill} ${roll} vs DC ${obstacle.dc}) ❌ ${obstacle.failEffect}`;
  return { obstacle, roll, success, narration };
}
