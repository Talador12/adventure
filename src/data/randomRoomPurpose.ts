// Random room purpose — what was this dungeon room used for?
export interface RoomPurpose { purpose: string; evidence: string; currentState: string; lootChance: 'none' | 'low' | 'medium' | 'high'; }
const PURPOSES: RoomPurpose[] = [
  { purpose: 'Barracks — soldiers once slept here.', evidence: 'Rows of bed frames, weapon racks (mostly empty), a faded duty roster on the wall.', currentState: 'Abandoned. Some bedding remains. A rat nest in the corner.', lootChance: 'low' },
  { purpose: 'Alchemist\'s lab — potions were brewed here.', evidence: 'Glass apparatus, stained tables, ingredient shelves (ransacked).', currentState: 'Partly intact. Some vials remain. Investigation DC 14 finds usable potions.', lootChance: 'medium' },
  { purpose: 'Throne room — a leader held court.', evidence: 'A raised dais, shattered stained glass, a toppled throne.', currentState: 'Ruins of grandeur. The throne may hide a secret compartment (Investigation DC 15).', lootChance: 'high' },
  { purpose: 'Prison — captives were held here.', evidence: 'Iron bars, chains on the walls, scratches counting days.', currentState: 'Empty. The last prisoner left a message carved in the stone.', lootChance: 'none' },
  { purpose: 'Library — knowledge was stored here.', evidence: 'Shelves (mostly collapsed), scattered pages, a reading desk.', currentState: 'Fire damage. 1d4 intact books remain. Arcana DC 12 finds a useful tome.', lootChance: 'medium' },
  { purpose: 'Kitchen — meals were prepared here.', evidence: 'A massive fireplace, rusted pots, a butcher block.', currentState: 'The fireplace still works. Rest here for advantage on the next short rest.', lootChance: 'none' },
  { purpose: 'Treasury — wealth was stored here.', evidence: 'Reinforced door (already broken), empty shelves, a broken lock.', currentState: 'Looted long ago. But the false bottom in the floor was missed (Investigation DC 16).', lootChance: 'high' },
  { purpose: 'Temple — worship took place here.', evidence: 'An altar, faded murals of a deity, offering bowls.', currentState: 'Desecrated or still holy. Religion DC 12 determines which — and whether prayer helps.', lootChance: 'low' },
];
export function getRandomRoomPurpose(): RoomPurpose { return PURPOSES[Math.floor(Math.random() * PURPOSES.length)]; }
export function formatRoomPurpose(p: RoomPurpose): string { return `🏰 **Room Purpose:** ${p.purpose}\n🔍 Evidence: ${p.evidence}\n📌 Current state: ${p.currentState}\n💎 Loot chance: ${p.lootChance}`; }
