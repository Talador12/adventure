// Random wilderness hazards — environmental dangers for travel.

export interface WildernessHazard { name: string; description: string; check: string; successText: string; failText: string; terrain: string[]; }

const HAZARDS: WildernessHazard[] = [
  { name: 'Quicksand', description: 'The ground gives way beneath your feet!', check: 'STR DC 12', successText: 'You pull free before sinking.', failText: 'Sink to waist. Restrained. Each round STR DC 14 or sink further.', terrain: ['swamp', 'desert'] },
  { name: 'Poisonous Plants', description: 'Thorny vines brush against exposed skin.', check: 'Nature DC 12', successText: 'You recognize and avoid the poison ivy.', failText: '1d4 poison damage + rash (-1 to checks for 24h).', terrain: ['forest', 'swamp'] },
  { name: 'Loose Scree', description: 'The rocky slope shifts dangerously.', check: 'DEX DC 13', successText: 'You keep your balance on the shifting rocks.', failText: 'Slide 20ft down, take 1d6 bludgeoning.', terrain: ['mountain', 'hills'] },
  { name: 'Flash Flood', description: 'Water rushes through the low ground without warning.', check: 'STR DC 14', successText: 'You grab hold and ride out the surge.', failText: 'Swept 60ft downstream. 2d6 bludgeoning. Lose 1d4 items.', terrain: ['desert', 'mountain', 'plains'] },
  { name: 'Sinkhole', description: 'The ground collapses into a cavity below!', check: 'DEX DC 14', successText: 'You leap clear as the ground crumbles.', failText: 'Fall 20ft into the hole. 2d6 bludgeoning. Climbing out costs full movement.', terrain: ['plains', 'forest', 'swamp'] },
  { name: 'Swarm of Insects', description: 'A cloud of biting insects descends.', check: 'CON DC 11', successText: 'You endure the bites without lasting effect.', failText: '1d4 piercing. Disadvantage on Concentration for 10 min.', terrain: ['swamp', 'forest', 'coast'] },
  { name: 'Hidden Crevasse', description: 'A thin layer of ice conceals a deep crack.', check: 'Perception DC 14 (passive) or DEX DC 13', successText: 'You spot and avoid the hidden gap.', failText: 'Fall 30ft. 3d6 bludgeoning. Climbing out requires Athletics DC 12.', terrain: ['arctic', 'mountain'] },
  { name: 'Thorn Thicket', description: 'Dense thorns block the path forward.', check: 'STR DC 10 to push through or DEX DC 12 to find a way around', successText: 'You navigate through the thorns.', failText: '1d6 piercing. Movement halved for 1 hour.', terrain: ['forest', 'swamp'] },
  { name: 'Dust Devil', description: 'A small whirlwind kicks up sand and debris.', check: 'STR DC 11', successText: 'You brace against the wind.', failText: 'Knocked prone. Blinded for 1 round.', terrain: ['desert', 'plains'] },
  { name: 'Avalanche', description: 'The mountainside gives way above you!', check: 'DEX DC 15', successText: 'You dive to safety behind a rock.', failText: '4d10 bludgeoning. Buried — STR DC 15 to dig out.', terrain: ['mountain', 'arctic'] },
];

export function rollWildernessHazard(terrain?: string): WildernessHazard {
  const pool = terrain ? HAZARDS.filter((h) => h.terrain.includes(terrain)) : HAZARDS;
  return (pool.length > 0 ? pool : HAZARDS)[Math.floor(Math.random() * (pool.length || HAZARDS.length))];
}

export function formatWildernessHazard(hazard: WildernessHazard): string {
  return `⚠️ **${hazard.name}**\n*${hazard.description}*\n🎲 Check: ${hazard.check}\n✅ Success: ${hazard.successText}\n❌ Fail: ${hazard.failText}`;
}
