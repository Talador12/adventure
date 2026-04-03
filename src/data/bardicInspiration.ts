// Bardic inspiration table — dramatic effects beyond the mechanical +1d6.

export type InspirationMoment = 'before_attack' | 'before_save' | 'before_check' | 'after_damage' | 'death_save' | 'social';

export interface BardicInspirationEffect {
  moment: InspirationMoment;
  narration: string;
  mechanicalBonus: string;
  bardAction: string;
  crowdReaction: string;
}

const EFFECTS: BardicInspirationEffect[] = [
  { moment: 'before_attack', narration: 'The bard strikes a power chord. Time seems to slow. Your blade sings.', mechanicalBonus: '+1d6 to attack roll. On hit, the enemy is momentarily dazzled (disadvantage on next attack).', bardAction: 'Strums a dramatic riff on their lute.', crowdReaction: 'Allies feel a surge of confidence. Enemies hesitate.' },
  { moment: 'before_attack', narration: '"Hit them where it COUNTS!" The bard points at the enemy\'s weak spot.', mechanicalBonus: '+1d6 to attack. If attack hits, add inspiration die to damage too.', bardAction: 'Shouts tactical advice disguised as lyrics.', crowdReaction: 'The party\'s rhythm syncs. They move as one.' },
  { moment: 'before_save', narration: 'A calm melody cuts through chaos. Your mind clears. You can do this.', mechanicalBonus: '+1d6 to saving throw. If save succeeds by 5+, gain advantage on next save too.', bardAction: 'Plays a soothing counter-melody to the magical effect.', crowdReaction: 'The enemy caster looks annoyed. Their spell is being outperformed.' },
  { moment: 'before_save', narration: '"NOT TODAY!" The bard\'s voice is a shield.', mechanicalBonus: '+1d6 to save. If this is a death-related effect, add +2 more.', bardAction: 'Screams defiance into the face of doom.', crowdReaction: 'Goosebumps. Even the villain pauses.' },
  { moment: 'before_check', narration: 'The bard hums a working song. Your hands steady. The task feels possible.', mechanicalBonus: '+1d6 to ability check. If you roll a natural 20, the bard writes a song about this moment.', bardAction: 'Provides a rhythm to work to.', crowdReaction: 'Onlookers are oddly captivated by mundane work done to music.' },
  { moment: 'after_damage', narration: 'You take the hit. The bard transitions from battle march to dirge — then back. You\'re still standing.', mechanicalBonus: 'Gain temporary HP equal to the inspiration die roll.', bardAction: 'Switches to a resilience anthem mid-song.', crowdReaction: 'The attacker can\'t believe you\'re still up.' },
  { moment: 'death_save', narration: 'The bard kneels beside you and plays. Soft. Personal. "Come back. We need you."', mechanicalBonus: '+1d6 to death save. If this stabilizes you, gain 1 HP instead of 0.', bardAction: 'Stops everything else. This is the only song that matters.', crowdReaction: 'The battlefield goes quiet for a heartbeat. Even enemies watch.' },
  { moment: 'death_save', narration: 'A melody you remember from childhood. Home. Safety. Not yet.', mechanicalBonus: '+1d6 to death save. If result is 20+, regain 1d4 HP instead of 1.', bardAction: 'Plays a lullaby. Somehow it\'s the most powerful thing in the room.', crowdReaction: 'Tears. From everyone. Even the barbarian.' },
  { moment: 'social', narration: 'The bard casually name-drops you as a hero from their latest ballad. The NPC\'s eyes widen.', mechanicalBonus: '+1d6 to Persuasion/Deception/Intimidation. Success by 5+ means the NPC becomes a fan.', bardAction: 'Provides your reputation as background music.', crowdReaction: 'Murmuring. "Wait, THAT\'S the one from the song?"' },
  { moment: 'social', narration: 'The bard winks and plays a smooth jazz riff. The entire room\'s mood shifts in your favor.', mechanicalBonus: '+1d6 to any CHA check. Advantage if the target appreciates music.', bardAction: 'Sets the vibe. Purely vibes.', crowdReaction: 'Everyone relaxes. Negotiations feel more like a dinner party.' },
];

export function getInspirationForMoment(moment: InspirationMoment): BardicInspirationEffect {
  const pool = EFFECTS.filter((e) => e.moment === moment);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getAllEffectsForMoment(moment: InspirationMoment): BardicInspirationEffect[] {
  return EFFECTS.filter((e) => e.moment === moment);
}

export function getAllMoments(): InspirationMoment[] {
  return [...new Set(EFFECTS.map((e) => e.moment))];
}

export function getEffectCount(): number {
  return EFFECTS.length;
}

export function formatInspiration(effect: BardicInspirationEffect): string {
  const icon = { before_attack: '⚔️', before_save: '🛡️', before_check: '🎯', after_damage: '💪', death_save: '💗', social: '🎭' }[effect.moment];
  const lines = [`${icon} **Bardic Inspiration** *(${effect.moment.replace(/_/g, ' ')})*`];
  lines.push(`  *${effect.narration}*`);
  lines.push(`  ⚙️ ${effect.mechanicalBonus}`);
  lines.push(`  🎵 Bard: ${effect.bardAction}`);
  lines.push(`  👥 Crowd: ${effect.crowdReaction}`);
  return lines.join('\n');
}

export { EFFECTS as BARDIC_INSPIRATIONS };
