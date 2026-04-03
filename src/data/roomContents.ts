// Random room contents — furniture, debris, clutter for dressing empty rooms.

export interface RoomDressing {
  furniture: string[];
  clutter: string[];
  atmosphere: string;
  interestingDetail: string;
}

const FURNITURE = [
  'A rickety wooden table with two chairs', 'A stone altar covered in dust', 'A broken bookshelf, books scattered',
  'An overturned barrel leaking dark liquid', 'A rusted iron cage, door hanging open', 'A moth-eaten tapestry on the wall',
  'A pile of rotting crates', 'A stone bench carved into the wall', 'A cracked mirror in a tarnished frame',
  'A weapon rack — mostly empty, one rusty sword remains', 'A bed frame with no mattress', 'A writing desk with a broken leg',
  'An iron chandelier lying on the floor', 'A large fireplace, cold and dark', 'A wooden chest, lid ajar',
];
const CLUTTER = [
  'Bones scattered across the floor', 'Cobwebs thick as curtains', 'Rat droppings everywhere',
  'A faded map pinned to the wall', 'Candle stubs melted to the floor', 'Scratch marks on the walls',
  'A broken potion vial with dried residue', 'Footprints in the dust — recent', 'A child\'s doll, eyes missing',
  'Empty wine bottles', 'Dried blood stains on the stone', 'A half-eaten meal, now covered in mold',
];
const ATMOSPHERES = [
  'The air is cold and still.', 'A faint draft suggests a hidden passage.', 'Moisture drips from the ceiling.',
  'The room smells of decay.', 'Torchlight flickers from the corridor behind you.', 'An eerie silence fills the space.',
  'The walls are damp with condensation.', 'A low hum vibrates through the floor.', 'Shadows dance in the corners.',
];
const INTERESTING_DETAILS = [
  'A loose stone in the wall — could hide something.', 'Faded writing on the floor in an unknown language.',
  'A single fresh flower sits in a vase — someone was here recently.', 'The ceiling is unusually high, disappearing into darkness.',
  'One wall is a different color than the others.', 'A tiny carved symbol near the doorframe — a thieves\' cant mark.',
  'The floor slopes slightly toward one corner.', 'A faint sound of running water comes from behind the wall.',
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN<T>(arr: T[], n: number): T[] { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }

export function generateRoomContents(): RoomDressing {
  return {
    furniture: pickN(FURNITURE, 2 + Math.floor(Math.random() * 2)),
    clutter: pickN(CLUTTER, 1 + Math.floor(Math.random() * 2)),
    atmosphere: pick(ATMOSPHERES),
    interestingDetail: pick(INTERESTING_DETAILS),
  };
}

export function formatRoomContents(contents: RoomDressing): string {
  const lines = ['🏚️ **Room Contents:**'];
  lines.push(`*${contents.atmosphere}*`);
  lines.push('**Furniture:**');
  for (const f of contents.furniture) lines.push(`  • ${f}`);
  lines.push('**Clutter:**');
  for (const c of contents.clutter) lines.push(`  • ${c}`);
  lines.push(`🔍 **Detail:** ${contents.interestingDetail}`);
  return lines.join('\n');
}
