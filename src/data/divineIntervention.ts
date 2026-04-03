// Random divine intervention table — what happens when a god directly answers a prayer.

export type InterventionScale = 'subtle' | 'notable' | 'dramatic' | 'miraculous';

export interface DivineIntervention {
  name: string;
  scale: InterventionScale;
  description: string;
  mechanicalEffect: string;
  divineCost: string; // what the god expects in return
  sideEffect: string;
  witnessReaction: string;
}

const INTERVENTIONS: DivineIntervention[] = [
  { name: 'The Guiding Light', scale: 'subtle', description: 'A beam of light illuminates the correct path. Only the faithful can see it.', mechanicalEffect: 'Auto-succeed on one Navigation or Survival check. The path avoids all dangers.', divineCost: 'Light a candle at the next shrine you pass.', sideEffect: 'None visible to others.', witnessReaction: 'No one else notices. The cleric just "knew" which way to go.' },
  { name: 'The Healing Word', scale: 'subtle', description: 'A wound closes on its own. The pain just... stops.', mechanicalEffect: 'One creature heals to full HP. All conditions removed.', divineCost: 'Heal a stranger before the next dawn.', sideEffect: 'A faint glow on the healed wound that fades in an hour.', witnessReaction: 'Witnesses are unsettled. "That should have killed them."' },
  { name: 'The Shield of Faith', scale: 'notable', description: 'An invisible barrier deflects a killing blow. The sound of a bell rings from nowhere.', mechanicalEffect: 'Negate one attack, spell, or effect that would kill or incapacitate a creature.', divineCost: 'Build or repair a shrine within 1 month.', sideEffect: 'The divine symbol of the god appears briefly in the air.', witnessReaction: 'Awe. Even enemies pause for a moment. The faithful kneel.' },
  { name: 'The Thunderous Voice', scale: 'notable', description: 'The god speaks. Not through the cleric — through the sky, the earth, the walls. Everyone hears.', mechanicalEffect: 'All hostile creatures within 100ft must WIS DC 18 save or be frightened for 1 minute. Allies gain +2 to all saves for 1 hour.', divineCost: 'Deliver the god\'s specific message to someone within 1 week.', sideEffect: 'The words echo for days in the area. People remember them.', witnessReaction: 'Terror for enemies. Euphoria for the faithful. Everyone else: existential crisis.' },
  { name: 'The Resurrection', scale: 'dramatic', description: 'A dead ally breathes again. Their eyes open with divine light.', mechanicalEffect: 'True Resurrection with no material components. The revived creature returns at full HP with a divine mark.', divineCost: 'A major quest in service of the god. Non-negotiable.', sideEffect: 'The revived creature now has a divine mark (visible to the faithful). They occasionally receive visions.', witnessReaction: 'Conversion. Some witnesses become followers on the spot. Others are terrified.' },
  { name: 'The Smiting', scale: 'dramatic', description: 'A bolt of divine energy strikes the enemy. It\'s personal. The god is angry.', mechanicalEffect: '10d10 radiant/necrotic damage (type matches the god) to one creature. No save. No resistance.', divineCost: 'Dedicate the next victory to the god publicly.', sideEffect: 'The ground where the creature stood is consecrated/desecrated permanently.', witnessReaction: 'Silence. Then screaming. Then prayers.' },
  { name: 'The Miracle', scale: 'miraculous', description: 'The impossible happens. Water parts. Mountains move. Time reverses.', mechanicalEffect: 'Wish-level effect determined by the DM based on the prayer. The god interprets generously.', divineCost: 'A year of devoted service. Or a sacrifice the god finds meaningful.', sideEffect: 'The area becomes a holy site. Pilgrims will come. A religion may form.', witnessReaction: 'History is being made. Songs will be written. Wars may start over the interpretation.' },
  { name: 'The Gentle Refusal', scale: 'subtle', description: 'A warm feeling of love — and a quiet "no." The god heard, but the answer is not yet.', mechanicalEffect: 'No mechanical effect. But the cleric knows the god listened. Inspiration granted.', divineCost: 'None. The refusal IS the lesson.', sideEffect: 'Peace. Even in the worst circumstances, a moment of absolute peace.', witnessReaction: 'The cleric smiles despite everything. Others wonder why.' },
];

export function getRandomIntervention(): DivineIntervention {
  return INTERVENTIONS[Math.floor(Math.random() * INTERVENTIONS.length)];
}

export function getInterventionsByScale(scale: InterventionScale): DivineIntervention[] {
  return INTERVENTIONS.filter((i) => i.scale === scale);
}

export function rollIntervention(faithLevel: number): DivineIntervention {
  // Higher faith = higher chance of dramatic intervention
  const roll = Math.floor(Math.random() * 20) + 1 + faithLevel;
  if (roll >= 25) return getInterventionsByScale('miraculous')[0];
  if (roll >= 20) { const dramatic = getInterventionsByScale('dramatic'); return dramatic[Math.floor(Math.random() * dramatic.length)]; }
  if (roll >= 14) { const notable = getInterventionsByScale('notable'); return notable[Math.floor(Math.random() * notable.length)]; }
  const subtle = getInterventionsByScale('subtle');
  return subtle[Math.floor(Math.random() * subtle.length)];
}

export function getAllScales(): InterventionScale[] {
  return ['subtle', 'notable', 'dramatic', 'miraculous'];
}

export function formatIntervention(intervention: DivineIntervention): string {
  const icon = { subtle: '🕯️', notable: '⛪', dramatic: '⚡', miraculous: '🌟' }[intervention.scale];
  const lines = [`${icon} **${intervention.name}** *(${intervention.scale})*`];
  lines.push(`  *${intervention.description}*`);
  lines.push(`  ⚙️ Effect: ${intervention.mechanicalEffect}`);
  lines.push(`  🙏 Divine cost: ${intervention.divineCost}`);
  lines.push(`  👁️ Witnesses: ${intervention.witnessReaction}`);
  return lines.join('\n');
}

export { INTERVENTIONS as DIVINE_INTERVENTIONS };
