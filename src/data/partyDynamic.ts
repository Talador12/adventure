// Random party dynamic generator — relationship tensions and bonding moments between PCs.

export type DynamicType = 'tension' | 'bonding' | 'rivalry' | 'mentorship' | 'secret' | 'comedic';

export interface PartyDynamic {
  type: DynamicType; title: string; trigger: string; description: string;
  roleplayPrompt: string; mechanicalEffect: string | null; resolutionPath: string;
}

const DYNAMICS: PartyDynamic[] = [
  { type: 'tension', title: 'The Loot Argument', trigger: 'After a major treasure haul, distribution feels unfair.', description: 'One character took the magic item without discussing it. Another needed it more. Nobody said anything at the time. It\'s been festering for 2 sessions.', roleplayPrompt: 'During a quiet moment, the aggrieved character makes a comment. Not about the item — about trust. "I just thought we were a team."', mechanicalEffect: 'Until resolved: the two characters can\'t benefit from each other\'s Help action.', resolutionPath: 'An honest conversation. The item-taker offers something in return. Or admits they were wrong. Trust rebuilds.' },
  { type: 'bonding', title: 'The Shared Watch', trigger: 'Two characters are alone on night watch. Nothing attacks. They just... talk.', description: 'No combat. No plot. Just two people sharing a fire and learning something real about each other.', roleplayPrompt: 'The DM asks both players: "What does your character talk about when they think nobody important is listening?" Let them answer. Don\'t interrupt.', mechanicalEffect: 'Both characters gain advantage on saves to protect each other for 24 hours. Bond forged.', resolutionPath: 'No resolution needed. This IS the resolution. For everything.' },
  { type: 'rivalry', title: 'The Kill Steal', trigger: 'One character keeps landing the finishing blow. Another notices.', description: 'It\'s not intentional. But it FEELS intentional. "You always get the last hit. I softened them up and you swoop in."', roleplayPrompt: 'Next combat, the "kill stealer" deliberately holds back. "This one\'s yours." The gesture matters more than the kill.', mechanicalEffect: null, resolutionPath: 'Friendly competition becomes a running joke. They start keeping a tally board. It becomes the party\'s favorite game.' },
  { type: 'mentorship', title: 'Teaching a New Trick', trigger: 'A veteran character notices a newer character making a rookie mistake.', description: 'The veteran could mock them. Instead: "Here, let me show you. I made the same mistake 10 years ago. Nearly died."', roleplayPrompt: 'The veteran teaches. The student learns. Both gain something: the veteran remembers who they were, the student sees who they could become.', mechanicalEffect: 'The student gains proficiency in one skill the veteran has (for 1 week). The veteran gains Inspiration.', resolutionPath: 'The mentorship becomes a thread. The student eventually surpasses the teacher. And thanks them.' },
  { type: 'secret', title: 'The Overheard Conversation', trigger: 'A character whispers to an NPC. Another character has unusually good Perception.', description: 'They heard something they weren\'t meant to hear. It changes how they see their companion. Not badly — just differently.', roleplayPrompt: '"I couldn\'t help but overhear..." or: they say nothing. They just look at their companion with new understanding.', mechanicalEffect: null, resolutionPath: 'The secret-keeper eventually confides. Or the listener confesses they know. Either way: trust deepens.' },
  { type: 'comedic', title: 'The Terrible Cook', trigger: 'Someone volunteers to cook during a long rest. The food is... ambitious.', description: 'It was supposed to be stew. It\'s technically a solid. The consistency is "aggressive." It has a flavor that can only be described as "loud."', roleplayPrompt: 'Everyone eats it. Because the cook is trying their best. The faces they make are worth more than any treasure.', mechanicalEffect: 'CON DC 8 or 1 level of "gastronomic distress" (no mechanical effect, just roleplay gold).', resolutionPath: 'The cook improves over time. By level 10, the stew is edible. By level 15, it\'s actually good. Character growth through cuisine.' },
];

export function getRandomDynamic(): PartyDynamic { return DYNAMICS[Math.floor(Math.random() * DYNAMICS.length)]; }
export function getDynamicsByType(type: DynamicType): PartyDynamic[] { return DYNAMICS.filter((d) => d.type === type); }
export function getAllDynamicTypes(): DynamicType[] { return [...new Set(DYNAMICS.map((d) => d.type))]; }
export function getDynamicsWithMechanics(): PartyDynamic[] { return DYNAMICS.filter((d) => d.mechanicalEffect !== null); }
export function formatDynamic(d: PartyDynamic): string {
  const icon = { tension: '⚡', bonding: '❤️', rivalry: '🏆', mentorship: '📚', secret: '🤫', comedic: '😂' }[d.type];
  const lines = [`${icon} **${d.title}** *(${d.type})*`]; lines.push(`  Trigger: ${d.trigger}`);
  lines.push(`  📖 ${d.description}`); lines.push(`  🎭 Prompt: ${d.roleplayPrompt}`);
  lines.push(`  🔧 Resolution: ${d.resolutionPath}`); return lines.join('\n');
}
export { DYNAMICS as PARTY_DYNAMICS };
