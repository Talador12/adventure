// Random haunted item generator — mundane objects with ghostly attachments.

export type HauntReason = 'unfinished_business' | 'attachment' | 'murder_weapon' | 'cursed' | 'accidental' | 'protective';

export interface HauntedItem {
  itemName: string;
  itemType: string;
  ghostName: string;
  hauntReason: HauntReason;
  manifestation: string;
  ghostPersonality: string;
  benefitIfAppeased: string;
  consequenceIfIgnored: string;
  resolutionMethod: string;
  value: number;
}

const ITEMS: HauntedItem[] = [
  { itemName: 'Grandmother\'s Teapot', itemType: 'Ceramic teapot (chipped handle)', ghostName: 'Nana Rosemary', hauntReason: 'protective', manifestation: 'Tea makes itself at 4 PM every day. The ghost tutts disapprovingly if you drink anything else.', ghostPersonality: 'Loving, overbearing, deeply concerned about whether you\'re eating enough.', benefitIfAppeased: 'Tea brewed in the pot heals 1d4 HP and removes the poisoned condition. Nana was a GOOD cook.', consequenceIfIgnored: 'The ghost gets passive-aggressive. Food near the pot tastes slightly of disappointment.', resolutionMethod: 'Visit Nana\'s grave and leave fresh flowers. She\'ll stop haunting but the tea magic remains as a gift.', value: 5 },
  { itemName: 'The General\'s Compass', itemType: 'Brass military compass', ghostName: 'General Ashworth', hauntReason: 'unfinished_business', manifestation: 'The needle always points toward the General\'s lost regiment — a unit that disappeared 200 years ago.', ghostPersonality: 'Stern, haunted by guilt, speaks only in military jargon.', benefitIfAppeased: 'Compass grants +5 to Survival (navigation) and always points true north — AND toward the nearest danger.', consequenceIfIgnored: 'The ghost barks orders at 3 AM. "ATTENTION! INSPECTION IN 5 MINUTES!" Every night.', resolutionMethod: 'Find the lost regiment (now skeletons in an underground cave). Give them proper military burial.', value: 50 },
  { itemName: 'The Musician\'s Violin', itemType: 'A cracked violin that plays itself', ghostName: 'Maestro Vivaldi (no relation)', hauntReason: 'attachment', manifestation: 'Plays mournful music at midnight. Beautiful. Heartbreaking. LOUD.', ghostPersonality: 'Dramatic, perfectionistic, cries if anyone plays the violin badly.', benefitIfAppeased: 'Performance checks with the violin have advantage. The ghost accompanies with a spectral orchestra.', consequenceIfIgnored: 'The music gets louder. And sadder. Neighbors complain. Dogs howl.', resolutionMethod: 'Play the Maestro\'s unfinished symphony correctly (Performance DC 16). The ghost weeps with joy and moves on.', value: 200 },
  { itemName: 'A Child\'s Wooden Soldier', itemType: 'A carved toy soldier (painted red)', ghostName: 'Tommy (age 7)', hauntReason: 'accidental', manifestation: 'The toy moves on its own. Marches around the room at night. Stands guard at the door.', ghostPersonality: 'Shy, brave for his age, thinks he\'s protecting whoever holds the toy.', benefitIfAppeased: 'The toy soldier alerts to danger (advantage on Perception while sleeping). Tommy watches over you.', consequenceIfIgnored: 'Tommy gets lonely. Other toys start moving. The toy box becomes an army.', resolutionMethod: 'Find Tommy\'s parents (still alive, elderly). Return the toy. Tommy says goodbye. Everyone cries.', value: 0 },
  { itemName: 'A Bloodstained Dagger', itemType: 'Rusted iron dagger', ghostName: 'The Victim (name unknown)', hauntReason: 'murder_weapon', manifestation: 'The bloodstain is always wet. The ghost appears reflected in any blade. Silently points at the murderer.', ghostPersonality: 'Silent. Angry. Patient. Will wait centuries for justice.', benefitIfAppeased: 'The dagger becomes +1 and deals an extra 1d6 necrotic against the murderer (or their descendants).', consequenceIfIgnored: 'The ghost gets louder. Not in sound — in PRESENCE. Disadvantage on social checks (people feel uneasy around you).', resolutionMethod: 'Bring the murderer (or their descendant) to justice. The ghost identifies them. You do the rest.', value: 25 },
];

export function getRandomHauntedItem(): HauntedItem {
  return ITEMS[Math.floor(Math.random() * ITEMS.length)];
}

export function getItemsByReason(reason: HauntReason): HauntedItem[] {
  return ITEMS.filter((i) => i.hauntReason === reason);
}

export function getAllHauntReasons(): HauntReason[] {
  return [...new Set(ITEMS.map((i) => i.hauntReason))];
}

export function formatHauntedItem(item: HauntedItem): string {
  const lines = [`👻 **${item.itemName}** *(${item.itemType}, haunted by ${item.ghostName})*`];
  lines.push(`  Reason: ${item.hauntReason.replace(/_/g, ' ')} — ${item.manifestation}`);
  lines.push(`  Ghost: ${item.ghostPersonality}`);
  lines.push(`  ✅ If appeased: ${item.benefitIfAppeased}`);
  lines.push(`  ❌ If ignored: ${item.consequenceIfIgnored}`);
  lines.push(`  🔧 Resolution: ${item.resolutionMethod}`);
  return lines.join('\n');
}

export { ITEMS as HAUNTED_ITEMS };
