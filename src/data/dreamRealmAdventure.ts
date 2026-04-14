// Dream realm adventure — dreamscape environments, surreal encounters, and dreamwalking mechanics.

export type DreamType = 'nightmare' | 'memory' | 'prophecy' | 'shared' | 'fever';

export interface DreamRule {
  name: string;
  description: string;
  mechanicalEffect: string;
}

export interface DreamEncounter {
  name: string;
  description: string;
  challenge: string;
  resolution: string;
}

export interface DreamRealmScenario {
  name: string;
  dreamType: DreamType;
  description: string;
  entryMethod: string;
  dreamRules: DreamRule[];
  encounters: DreamEncounter[];
  dreamBoss: string;
  wakeCondition: string;
  realWorldConsequence: string;
}

const SCENARIOS: DreamRealmScenario[] = [
  {
    name: 'The City That Remembers',
    dreamType: 'memory',
    description: 'The party enters a dream version of a city that was destroyed 200 years ago. Everything is intact but wrong - streets loop, buildings rearrange, and the residents are memories that do not know they are dead.',
    entryMethod: 'Touching a Dream Stone found in the ruins of the real city. All party members fall asleep simultaneously.',
    dreamRules: [
      { name: 'Memory Logic', description: 'The city reshapes based on what the party expects to find.', mechanicalEffect: 'DC 14 Investigation or History to "remember" a building into existence. Useful for finding things that no longer exist in the real world.' },
      { name: 'Emotional Gravity', description: 'Strong emotions pull the dreamscape toward them.', mechanicalEffect: 'Fear warps the environment into darkness. Joy makes flowers grow. Anger summons storms. Characters with the lowest Wisdom save are most affected.' },
      { name: 'Death is Waking', description: 'Dying in the dream wakes you up.', mechanicalEffect: 'Reduced to 0 HP = wake up. You cannot re-enter the dream for 24 hours. Being alone in the real world while the party is dreaming is dangerous.' },
    ],
    encounters: [
      { name: 'The Lost Child', description: 'A child memory asks you to take her to her mother. Her mother\'s house does not exist anymore - the memory is degraded. She starts to panic, and the buildings around her crumble.', challenge: 'DC 13 Persuasion to calm the child. DC 15 History to reconstruct the house from historical records. Failure causes a localized reality collapse (3d6 psychic damage, DC 14 Wis save for half).', resolution: 'Reuniting the child memory with the mother memory stabilizes this district. The memories thank you and share a clue about why the city was really destroyed.' },
      { name: 'The Parade of the Dead', description: 'A funeral procession winds through the streets. The mourners are all the city\'s dead. They carry an empty coffin. They are looking for someone to put in it.', challenge: 'DC 14 Stealth to avoid the procession. If spotted, DC 16 Deception to convince them you are already dead. Failure means they try to put you in the coffin (grapple, contested Athletics DC 15).', resolution: 'Following the procession to the cemetery reveals the coffin is for the city itself. The city is trying to grieve its own destruction. Filling the coffin with a meaningful offering (something from the real-world ruins) lets the city rest.' },
      { name: 'The Archivist', description: 'A sentient library that has organized every memory in the city. It speaks through book titles rearranging on shelves. It knows what destroyed the city but will only trade information for memories.', challenge: 'DC 15 Arcana to communicate. The Archivist wants a memory from each party member (player chooses what to give up - DM determines mechanical cost). A childhood memory costs nothing. A skill proficiency costs until the next long rest.', resolution: 'The Archivist reveals the city was destroyed by its own rulers to prevent a prophecy. The prophecy is still active. The Dream Stone is the trigger.' },
    ],
    dreamBoss: 'The Hollow King - the last ruler of the city, who ordered its destruction. In the dream, he is still king. His crown controls the dreamscape. He knows the party is real and will not let them leave with the truth.',
    wakeCondition: 'Break the Hollow King\'s crown, or voluntarily give up a memory to the Archivist (it creates an exit as payment). The Dream Stone cracks either way.',
    realWorldConsequence: 'The party wakes with knowledge of what really destroyed the city. The ruins in the real world have shifted overnight - a hidden vault, previously buried, is now accessible.',
  },
  {
    name: 'The Fever Dream of Karthax',
    dreamType: 'fever',
    description: 'A party member contracts a magical disease. While feverish, they pull the entire party into their fever dream - a surreal landscape where physics obeys fever logic and nothing makes sense.',
    entryMethod: 'Involuntary. When the infected party member sleeps, everyone within 30 feet is pulled in. Long rest is impossible until the fever breaks.',
    dreamRules: [
      { name: 'Fever Logic', description: 'Nothing works the way it should. Doors open to different rooms each time. Gravity changes with mood. Fire is cold.', mechanicalEffect: 'Ability checks use a random ability score each time (d6: 1=Str, 2=Dex, etc). Spells work but the effect is cosmetically wrong (Fireball is cold, Cure Wounds makes flowers grow from wounds).' },
      { name: 'The Fever Rises', description: 'The dream gets worse as the fever peaks.', mechanicalEffect: 'Every 30 minutes (real time), the DM rolls a d6. On 1-2, the environment becomes hostile (walls close in, floor becomes lava, etc). The DC to resist effects increases by 1 each time.' },
      { name: 'Healing the Dreamer', description: 'The infected character appears as a child version of themselves in the dream. Protecting them weakens the fever.', mechanicalEffect: 'The child-version takes damage when nightmarish things happen. If the child reaches 0 HP, the real body\'s fever becomes lethal. Healing the child in the dream heals the real fever.' },
    ],
    encounters: [
      { name: 'The Reversed Tavern', description: 'A tavern where the chairs sit on people, the ale pours itself, and the barkeep is a sentient mustache. It offers advice that sounds insane but is secretly correct.', challenge: 'DC 12 Wisdom save to understand the mustache\'s backward-logic advice. Success: it tells you where the fever\'s source is in the dreamscape. Failure: you spend 10 minutes arguing with furniture.', resolution: 'The mustache reveals the fever is caused by a parasite that exists in the dream. It looks like a friendly NPC. The nicer the NPC seems, the more suspicious you should be.' },
      { name: 'The Hallway of Doors', description: 'An infinite hallway. Every door leads somewhere different. Some doors lead to memories, some to nightmares, one leads to the parasite\'s lair. The doors rearrange every time you blink.', challenge: 'DC 14 Investigation to track door patterns. DC 16 Arcana to sense the parasite\'s energy behind one door. DC 12 Athletics to force a door that does not want to be opened.', resolution: 'The correct door is always the one the party wants to avoid. The dream resists healing.' },
    ],
    dreamBoss: 'The Dream Leech - a creature that looks exactly like the infected character\'s best friend (or parent, or mentor). It speaks kindly. It offers comfort. It is feeding on the fever and making it worse. Combat against it feels like attacking a loved one (DC 14 Wisdom save to attack without hesitation).',
    wakeCondition: 'Kill the Dream Leech. The child-version of the infected character must deliver the final blow (help action from party members works). The fever breaks immediately.',
    realWorldConsequence: 'The infected character wakes with 1 HP but the fever is gone. They have a new flaw: "I see faces I trust and wonder if they are real." This fades after 1d4 days. The party all slept through the night but feel exhausted - no long rest benefits.',
  },
];

export function getRandomDream(): DreamRealmScenario {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}

export function getDreamByType(type: DreamType): DreamRealmScenario | undefined {
  return SCENARIOS.find((s) => s.dreamType === type);
}

export function getAllDreamTypes(): DreamType[] {
  return [...new Set(SCENARIOS.map((s) => s.dreamType))];
}

export function getRuleCount(scenario: DreamRealmScenario): number {
  return scenario.dreamRules.length;
}

export function formatDream(scenario: DreamRealmScenario): string {
  const lines = [`💭 **${scenario.name}** *(${scenario.dreamType} dream)*`];
  lines.push(`  ${scenario.description}`);
  lines.push(`  Entry: ${scenario.entryMethod}`);
  lines.push('  **Dream Rules:**');
  for (const r of scenario.dreamRules) {
    lines.push(`    - **${r.name}:** ${r.description}`);
    lines.push(`      Effect: ${r.mechanicalEffect}`);
  }
  lines.push('  **Encounters:**');
  for (const e of scenario.encounters) {
    lines.push(`    - **${e.name}:** ${e.description}`);
  }
  lines.push(`  Boss: ${scenario.dreamBoss}`);
  lines.push(`  Wake condition: ${scenario.wakeCondition}`);
  lines.push(`  Real-world consequence: ${scenario.realWorldConsequence}`);
  return lines.join('\n');
}

export { SCENARIOS as DREAM_REALM_SCENARIOS };
