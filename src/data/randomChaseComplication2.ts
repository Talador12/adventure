// Random chase complication — obstacles during pursuit scenes.
export interface ChaseObstacle { obstacle: string; check: string; successResult: string; failResult: string; }
const OBSTACLES: ChaseObstacle[] = [
  { obstacle: 'A cart full of hay blocks the alley.', check: 'Athletics DC 12 or Acrobatics DC 14', successResult: 'You vault over/through it without slowing.', failResult: 'Lose 10ft of movement this round.' },
  { obstacle: 'A crowd of market shoppers.', check: 'STR DC 10 to push through or DEX DC 12 to weave', successResult: 'You navigate the crowd.', failResult: 'Tangled in the crowd. Lose your action.' },
  { obstacle: 'Loose rooftop tiles.', check: 'DEX DC 13', successResult: 'You keep your footing.', failResult: 'Slide and nearly fall. Prone. DEX DC 10 or fall off the roof.' },
  { obstacle: 'A guard steps into your path.', check: 'Persuasion DC 12 or Athletics DC 14 to push past', successResult: 'The guard steps aside or you barrel through.', failResult: 'Detained for 1 round. The quarry gains distance.' },
  { obstacle: 'A low-hanging clothesline.', check: 'Perception DC 10 (passive) or DEX DC 8', successResult: 'You duck in time.', failResult: 'Clotheslined. Fall prone. Embarrassing.' },
  { obstacle: 'The road forks. Which way did they go?', check: 'Perception DC 14 or Survival DC 12', successResult: 'You spot a clue and take the right fork.', failResult: 'Wrong way. Lose 1 round backtracking.' },
  { obstacle: 'A dog runs between your legs.', check: 'DEX DC 8', successResult: 'Easy dodge.', failResult: 'Trip. Fall prone. The dog licks your face.' },
  { obstacle: 'A wagon crosses your path from a side street.', check: 'DEX DC 14 to slide under or Athletics DC 12 to jump over', successResult: 'Spectacular move! Gain 5ft.', failResult: '1d6 bludgeoning. Lose your movement.' },
];
export function getRandomChaseObstacle(): ChaseObstacle { return OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)]; }
export function formatChaseObstacle(o: ChaseObstacle): string { return `🏃 **Chase Obstacle:**\n*${o.obstacle}*\n🎲 Check: ${o.check}\n✅ ${o.successResult}\n❌ ${o.failResult}`; }
