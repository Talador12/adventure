// Enchanted compass that points to what you need most — not what you want.

export type NeedCategory = 'survival' | 'emotional' | 'spiritual' | 'knowledge' | 'relationship' | 'danger';

export interface CompassReading {
  needCategory: NeedCategory;
  needDescription: string;
  compassBehavior: string;
  whatItPointsTo: string;
  whyTheyNeedIt: string;
  reaction: string;
}

const READINGS: CompassReading[] = [
  { needCategory: 'survival', needDescription: 'The party is about to walk into a trap.', compassBehavior: 'Spins frantically, then locks pointing BEHIND them. Vibrates urgently.', whatItPointsTo: 'The safe path they passed 10 minutes ago. The one that looked boring.', whyTheyNeedIt: 'The road ahead has an ambush. The compass knows.', reaction: '"Why is it pointing backward? We already CAME from there."' },
  { needCategory: 'emotional', needDescription: 'A party member is carrying unresolved grief.', compassBehavior: 'Slowly drifts toward one party member, then points to a distant location.', whatItPointsTo: 'The grave of someone the party member lost. They haven\'t visited.', whyTheyNeedIt: 'They need closure. The grief is affecting their judgment and combat performance.', reaction: '"It\'s pointing at... nothing. There\'s nothing important that direction." There is.' },
  { needCategory: 'spiritual', needDescription: 'The cleric\'s faith is wavering.', compassBehavior: 'Points at the cleric\'s holy symbol. Not a direction — the object itself.', whatItPointsTo: 'The cleric\'s own faith. It\'s the thing they need most.', whyTheyNeedIt: 'Spell failure rate has been creeping up. The cleric hasn\'t prayed in days.', reaction: '"It\'s broken. It\'s just pointing at me." It\'s not broken.' },
  { needCategory: 'knowledge', needDescription: 'The party is missing a critical piece of information.', compassBehavior: 'Points steadily toward the nearest library, sage, or knowledgeable NPC.', whatItPointsTo: 'The answer to a question they haven\'t thought to ask yet.', whyTheyNeedIt: 'Without this knowledge, the next encounter will be 10× harder.', reaction: '"A library? We don\'t need a library, we need a SWORD." They need the library more.' },
  { needCategory: 'relationship', needDescription: 'Two party members need to talk. They won\'t.', compassBehavior: 'Points back and forth between two party members. Like it can\'t decide.', whatItPointsTo: 'Reconciliation. An unspoken argument is weakening the group.', whyTheyNeedIt: 'Trust is eroding. In the next combat, one might not watch the other\'s back.', reaction: '"Is it broken?" "No, I think it\'s... pointing at both of us."' },
  { needCategory: 'danger', needDescription: 'Something is following them. They don\'t know.', compassBehavior: 'Points directly behind the party. Vibrates. Then stops. Then vibrates again.', whatItPointsTo: 'The threat pursuing them. The compass wants them to FACE it, not flee.', whyTheyNeedIt: 'Running from this will make it worse. Confrontation now is survivable. Later: not so much.', reaction: '"It keeps pointing behind us. There\'s nothing—" *a branch snaps in the darkness*' },
  { needCategory: 'survival', needDescription: 'They\'re going to run out of water in 2 days.', compassBehavior: 'Points steadily northeast. Doesn\'t waver. Patient.', whatItPointsTo: 'An underground spring, 4 miles away. Not on any map.', whyTheyNeedIt: 'They packed for 3 days. The journey is 5. Do the math.', reaction: '"Why is it pointing away from the road?" Because the road doesn\'t have water.' },
  { needCategory: 'emotional', needDescription: 'The party needs to laugh. It\'s been too dark for too long.', compassBehavior: 'Spins lazily, then points at the party\'s bard. Wiggles.', whatItPointsTo: 'Entertainment. Joy. A break from the relentless darkness.', whyTheyNeedIt: 'Morale is critical. One more tragedy without relief and someone breaks.', reaction: '"It\'s... pointing at me?" The bard hasn\'t played a song in a week. The compass remembers.' },
];

export function getRandomReading(): CompassReading {
  return READINGS[Math.floor(Math.random() * READINGS.length)];
}

export function getReadingsByCategory(category: NeedCategory): CompassReading[] {
  return READINGS.filter((r) => r.needCategory === category);
}

export function getAllNeedCategories(): NeedCategory[] {
  return [...new Set(READINGS.map((r) => r.needCategory))];
}

export function formatReading(reading: CompassReading): string {
  const icon = { survival: '🧭', emotional: '💔', spiritual: '🙏', knowledge: '📚', relationship: '🤝', danger: '⚠️' }[reading.needCategory];
  const lines = [`${icon} **The Compass Points** *(${reading.needCategory})*`];
  lines.push(`  🧭 Behavior: ${reading.compassBehavior}`);
  lines.push(`  ➡️ Points to: ${reading.whatItPointsTo}`);
  lines.push(`  💭 Why: ${reading.whyTheyNeedIt}`);
  lines.push(`  💬 Party reaction: *${reading.reaction}*`);
  return lines.join('\n');
}

export { READINGS as COMPASS_READINGS };
