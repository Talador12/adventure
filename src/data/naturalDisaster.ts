// Random natural disaster generator — earthquakes, floods, volcanic eruptions with mechanical impact.

export type DisasterType = 'earthquake' | 'flood' | 'wildfire' | 'tornado' | 'volcanic_eruption' | 'tsunami' | 'blizzard' | 'drought';
export type DisasterScale = 'minor' | 'moderate' | 'major' | 'catastrophic';

export interface NaturalDisaster {
  type: DisasterType;
  scale: DisasterScale;
  name: string;
  description: string;
  warningSignsDC: number;
  onsetTime: string;
  mechanicalEffects: string[];
  survivalDC: number;
  aftermath: string;
  opportunities: string[];
}

const DISASTERS: NaturalDisaster[] = [
  { type: 'earthquake', scale: 'major', name: 'The Shattering', description: 'The ground heaves and splits. Buildings collapse. The world itself seems to scream.', warningSignsDC: 14, onsetTime: 'Immediate (6 seconds of shaking, aftershocks for hours)', mechanicalEffects: ['DEX DC 15 or fall prone each round.', 'Structures: 50% chance per round of partial collapse (4d10 bludgeoning, DEX DC 14 half).', '10ft fissures open randomly (DEX DC 13 or fall 2d6 × 10 ft).', 'Difficult terrain everywhere for 24 hours.'], survivalDC: 14, aftermath: 'Collapsed buildings, broken roads, exposed underground areas. Looting begins within hours.', opportunities: ['Rescue trapped survivors for reputation.', 'Explore newly exposed underground passages.', 'Loot collapsed buildings (morally questionable).'] },
  { type: 'flood', scale: 'moderate', name: 'The Rising', description: 'Rain that doesn\'t stop. Rivers burst their banks. The water keeps coming.', warningSignsDC: 11, onsetTime: '2d4 hours (gradual rise)', mechanicalEffects: ['Water rises 1ft per hour until 6ft deep.', 'Swim speed required above 4ft.', 'STR DC 13 each round or swept 30ft downstream.', 'Equipment submerged is ruined (paper, food) unless waterproofed.'], survivalDC: 12, aftermath: 'Mud everywhere. Disease risk (CON DC 11/day). Crops destroyed. Famine risk.', opportunities: ['Rescue villagers by boat for heroic reputation.', 'Deliver supplies to cut-off settlements.', 'Salvage valuables from flooded buildings.'] },
  { type: 'wildfire', scale: 'major', name: 'The Burning Crown', description: 'The forest explodes. A wall of flame 100ft tall advances at walking speed. The smoke is the real killer.', warningSignsDC: 10, onsetTime: '30 minutes warning from smoke, 10 minutes to arrival', mechanicalEffects: ['4d6 fire damage per round within the fire.', 'Smoke: CON DC 13 each minute or suffocate. Heavily obscured.', 'Fire spreads 60ft per round in dry conditions.', 'Animals stampede toward the party (environmental encounter).'], survivalDC: 14, aftermath: 'Blackened wasteland. No cover, no food. But the soil will be fertile in spring.', opportunities: ['Create firebreaks to save a village.', 'Rescue creatures and people from the path.', 'Investigate cause — natural or arson?'] },
  { type: 'tornado', scale: 'moderate', name: 'The Finger of God', description: 'A spinning column of destruction descends from black clouds. It sounds like a thousand freight trains.', warningSignsDC: 12, onsetTime: '1d4 minutes warning', mechanicalEffects: ['Within 100ft: STR DC 16 or pulled in and dealt 6d10 bludgeoning.', 'Within 300ft: flying debris, DEX DC 14 or 3d6 bludgeoning.', 'Structures within path are destroyed (no save).', 'Lasts 1d4 minutes, moves 60ft/round in random direction.'], survivalDC: 15, aftermath: 'A clean path of destruction. Debris scattered for miles. Strange items deposited from far away.', opportunities: ['Search debris for displaced treasure.', 'Help rebuild for community favor.', 'Investigate — was this conjured by a druid or weather mage?'] },
  { type: 'volcanic_eruption', scale: 'catastrophic', name: 'Ragnarok\'s Breath', description: 'The mountain awakens. Lava pours down the slopes. Ash fills the sky for a hundred miles.', warningSignsDC: 12, onsetTime: '1d4 hours of earthquakes before eruption', mechanicalEffects: ['Lava flow: 10d10 fire damage per round of contact. Destroys everything.', 'Ash cloud: heavily obscured. CON DC 14/hour or 1 level exhaustion.', 'Pyroclastic flow (if close): instant death without magical protection.', 'Volcanic bombs: DEX DC 15 or 6d6 bludgeoning + 2d6 fire.'], survivalDC: 16, aftermath: 'Landscape transformed. New terrain. Valuable minerals exposed. Migration of entire populations.', opportunities: ['Evacuate a town for legendary heroism.', 'Harvest rare volcanic minerals (100-500gp).', 'Seal the volcano (epic quest — appease the fire elemental inside).'] },
  { type: 'blizzard', scale: 'moderate', name: 'The White Death', description: 'Visibility drops to zero. Temperature plummets. The snow doesn\'t stop for days.', warningSignsDC: 10, onsetTime: '1d4 hours of increasing snowfall', mechanicalEffects: ['Visibility: 0 beyond 10ft. All ranged attacks have disadvantage.', 'CON DC 12 each hour or gain 1 exhaustion (cold).', 'Movement speed halved. Difficult terrain everywhere.', 'Getting lost: Survival DC 14 each hour or wander in circles.'], survivalDC: 13, aftermath: 'Snow drifts 10+ feet deep. Roads impassable for 1d4 weeks. Food shortages.', opportunities: ['Guide lost travelers to safety.', 'Hunt winter predators driven to desperation.', 'Discover things hidden by the snow melt.'] },
];

export function getRandomDisaster(): NaturalDisaster {
  return DISASTERS[Math.floor(Math.random() * DISASTERS.length)];
}

export function getDisastersByType(type: DisasterType): NaturalDisaster[] {
  return DISASTERS.filter((d) => d.type === type);
}

export function getDisastersByScale(scale: DisasterScale): NaturalDisaster[] {
  return DISASTERS.filter((d) => d.scale === scale);
}

export function getAllDisasterTypes(): DisasterType[] {
  return [...new Set(DISASTERS.map((d) => d.type))];
}

export function formatDisaster(disaster: NaturalDisaster): string {
  const icon = { earthquake: '🌍', flood: '🌊', wildfire: '🔥', tornado: '🌪️', volcanic_eruption: '🌋', tsunami: '🏖️', blizzard: '❄️', drought: '☀️' }[disaster.type];
  const scale = { minor: '🟢', moderate: '🟡', major: '🟠', catastrophic: '🔴' }[disaster.scale];
  const lines = [`${icon} ${scale} **${disaster.name}** *(${disaster.type.replace(/_/g, ' ')}, ${disaster.scale})*`];
  lines.push(`  *${disaster.description}*`);
  lines.push(`  Warning: Perception/Nature DC ${disaster.warningSignsDC} | Onset: ${disaster.onsetTime}`);
  lines.push(`  Survival DC: ${disaster.survivalDC}`);
  lines.push('  **Effects:**');
  disaster.mechanicalEffects.forEach((e) => lines.push(`    ⚡ ${e}`));
  return lines.join('\n');
}

export { DISASTERS as NATURAL_DISASTERS };
