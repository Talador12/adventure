// Haunted location generator — ghostly manifestations with investigation and cleansing mechanics.

export type HauntType = 'poltergeist' | 'residual' | 'intelligent' | 'demonic' | 'cursed_ground';
export type ManifestationType = 'visual' | 'auditory' | 'physical' | 'emotional' | 'temporal';

export interface Manifestation {
  type: ManifestationType;
  description: string;
  dc: number; // WIS save to resist or Investigation to interpret
}

export interface HauntedLocation {
  name: string;
  hauntType: HauntType;
  backstory: string;
  manifestations: Manifestation[];
  investigationClues: string[];
  cleansingMethod: string;
  cleansingDC: number;
  treasureIfCleansed: string;
  dangerLevel: 'unsettling' | 'dangerous' | 'deadly';
}

const LOCATIONS: HauntedLocation[] = [
  { name: 'The Weeping Manor', hauntType: 'intelligent', backstory: 'Lady Alara was murdered by her husband for the inheritance. She waits for justice.', manifestations: [
    { type: 'auditory', description: 'Sobbing from the master bedroom at midnight. Gets louder when ignored.', dc: 12 },
    { type: 'visual', description: 'A woman in white appears in mirrors, pointing at the fireplace.', dc: 14 },
    { type: 'physical', description: 'The murder weapon (a letter opener) flies off the mantle at anyone who sits in the husband\'s chair.', dc: 13 },
  ], investigationClues: ['A hidden journal behind the fireplace bricks (Investigation DC 14).', 'The husband\'s portrait has scratch marks over the eyes.', 'Servants\' quarters have a locked diary naming the husband.'], cleansingMethod: 'Read the journal aloud in the master bedroom, then cast Speak with Dead to let Lady Alara name her killer.', cleansingDC: 14, treasureIfCleansed: 'Lady Alara\'s sapphire necklace (500gp) materializes as thanks.', dangerLevel: 'dangerous' },
  { name: 'The Battlefield of Thornmere', hauntType: 'residual', backstory: 'A massacre occurred here 200 years ago. The dead don\'t know they\'re dead.', manifestations: [
    { type: 'visual', description: 'Ghostly soldiers fight a battle at dusk. They can\'t see the living.', dc: 10 },
    { type: 'emotional', description: 'Overwhelming despair, rage, or battle-fury. WIS save or affected for 1 hour.', dc: 13 },
    { type: 'temporal', description: 'Time stutters. You see 6 seconds of the past overlaid on the present.', dc: 15 },
  ], investigationClues: ['A command banner buried under a cairn (History DC 13).', 'The general\'s sword is still lodged in an ancient oak.', 'Dog tags (or equivalent) scattered in the mud.'], cleansingMethod: 'Perform a proper funeral rite for both sides. Requires Religion DC 13 and 8 hours of continuous prayer.', cleansingDC: 13, treasureIfCleansed: 'The general\'s sword (+1 longsword, grants advantage on saves vs. fear).', dangerLevel: 'unsettling' },
  { name: 'The Orphanage on Gallows Hill', hauntType: 'poltergeist', backstory: 'The orphanage burned down with children inside. The matron locked the doors. The children are angry.', manifestations: [
    { type: 'physical', description: 'Toys move on their own. Doors slam. Objects are thrown at adults.', dc: 12 },
    { type: 'auditory', description: 'Children laughing, then screaming, then silence. On loop.', dc: 14 },
    { type: 'visual', description: 'Scorch marks appear and disappear. Small handprints on windows.', dc: 11 },
  ], investigationClues: ['The matron\'s keys are in the rubble (Investigation DC 12).', 'A child\'s drawing shows the matron locking the door.', 'The matron\'s grave in the nearby cemetery is desecrated.'], cleansingMethod: 'Find the matron\'s ghost (she\'s in the cemetery) and make her confess, then lead the children\'s spirits out.', cleansingDC: 15, treasureIfCleansed: 'A music box that casts Calm Emotions when opened (1/day).', dangerLevel: 'dangerous' },
  { name: 'The Sunken Chapel', hauntType: 'demonic', backstory: 'A priest summoned a demon to save his congregation from plague. The demon saved them. Then it collected.', manifestations: [
    { type: 'emotional', description: 'Compulsion to kneel and pray to something that is NOT a god. WIS DC 15.', dc: 15 },
    { type: 'physical', description: 'The altar bleeds. Holy water evaporates on contact.', dc: 14 },
    { type: 'visual', description: 'The stained glass windows show scenes of damnation instead of salvation.', dc: 13 },
  ], investigationClues: ['The priest\'s contract is carved into the underside of the altar (Investigation DC 16).', 'The congregation\'s names are scratched into the pews.', 'A hidden room below the chapel contains the demon\'s binding circle (cracked).'], cleansingMethod: 'Repair the binding circle (Arcana DC 16), reconsecrate the altar (Religion DC 15), and banish the demon (Dispel Evil and Good or equivalent).', cleansingDC: 16, treasureIfCleansed: 'The priest\'s holy symbol becomes a +2 focus. The demon\'s binding stone (400gp to a collector).', dangerLevel: 'deadly' },
  { name: 'The Crossroads Inn', hauntType: 'cursed_ground', backstory: 'Built on a crossroads where a witch was hanged. The land itself is wrong.', manifestations: [
    { type: 'temporal', description: 'Clocks run backward. Sunrise comes from the west.', dc: 12 },
    { type: 'auditory', description: 'The sound of a noose tightening. Always from directly above.', dc: 13 },
    { type: 'physical', description: 'Compasses spin wildly. Maps drawn here are always wrong.', dc: 11 },
  ], investigationClues: ['The witch\'s bones are buried under the crossroads (Investigation DC 14).', 'The hanging tree still stands behind the inn.', 'The inn\'s cat avoids one specific floorboard.'], cleansingMethod: 'Exhume the witch\'s bones and give them a proper burial elsewhere. Requires consent of the land (Nature DC 14).', cleansingDC: 14, treasureIfCleansed: 'The witch\'s familiar (a black cat) bonds with a party member — functions as a familiar.', dangerLevel: 'unsettling' },
];

export function getRandomHauntedLocation(): HauntedLocation {
  return LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
}

export function getLocationsByHauntType(type: HauntType): HauntedLocation[] {
  return LOCATIONS.filter((l) => l.hauntType === type);
}

export function getLocationsByDanger(level: HauntedLocation['dangerLevel']): HauntedLocation[] {
  return LOCATIONS.filter((l) => l.dangerLevel === level);
}

export function getAllHauntTypes(): HauntType[] {
  return [...new Set(LOCATIONS.map((l) => l.hauntType))];
}

export function formatHauntedLocation(loc: HauntedLocation): string {
  const icon = { poltergeist: '👻', residual: '🌫️', intelligent: '💀', demonic: '👹', cursed_ground: '🕳️' }[loc.hauntType];
  const danger = { unsettling: '🟡', dangerous: '🟠', deadly: '🔴' }[loc.dangerLevel];
  const lines = [`${icon} ${danger} **${loc.name}** *(${loc.hauntType.replace(/_/g, ' ')}, ${loc.dangerLevel})*`];
  lines.push(`  *${loc.backstory}*`);
  lines.push('  **Manifestations:**');
  loc.manifestations.forEach((m) => lines.push(`    ${m.type}: ${m.description} (DC ${m.dc})`));
  lines.push(`  🔧 Cleansing: ${loc.cleansingMethod} (DC ${loc.cleansingDC})`);
  lines.push(`  💰 Reward: ${loc.treasureIfCleansed}`);
  return lines.join('\n');
}

export { LOCATIONS as HAUNTED_LOCATIONS };
