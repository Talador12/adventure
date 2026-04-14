// Magical trial by ordeal — divine judgment encounters where the accused faces supernatural tests of innocence.

export type OrdealType = 'fire' | 'water' | 'truth' | 'combat' | 'riddle' | 'fate';

export interface OrdealPhase {
  name: string;
  description: string;
  skillCheck: string;
  dc: number;
  passResult: string;
  failResult: string;
}

export interface TrialWitness {
  name: string;
  testimony: string;
  lying: boolean;
  detectLieDC: number;
}

export interface MagicalTrial {
  name: string;
  ordealType: OrdealType;
  accusation: string;
  accusedDescription: string;
  presider: string;
  setting: string;
  phases: OrdealPhase[];
  witnesses: TrialWitness[];
  divineIntervention: string;
  innocentTwist: string;
  guiltyTwist: string;
  spectatorReaction: string;
}

const TRIALS: MagicalTrial[] = [
  {
    name: 'The Trial of Burning Hands',
    ordealType: 'fire',
    accusation: 'Korrin Ashbluff, a halfling blacksmith, is accused of using infernal magic to sabotage a rival\'s forge, killing two apprentices.',
    accusedDescription: 'A nervous halfling with calloused hands and soot-stained clothes. He stammers when scared. His alibi is weak but his confusion seems genuine.',
    presider: 'High Inquisitor Theron, a stern aasimar who glows faintly when he detects lies. He is incorruptible but not infallible.',
    setting: 'The Temple of the Balanced Scale, where a perpetual flame burns on the altar. The accused must hold their hands in the flame. The innocent feel warmth. The guilty feel justice.',
    phases: [
      { name: 'The Approach', description: 'Walk to the altar barefoot across hot coals. The innocent stride. The guilty stumble.', skillCheck: 'Constitution', dc: 12, passResult: 'Walked straight and steady. The crowd murmurs approval.', failResult: 'Stumbled. Not proof of guilt, but the jury looks uncomfortable.' },
      { name: 'The Flame', description: 'Hold both hands in the sacred flame for 30 seconds. Divine fire burns only the guilty.', skillCheck: 'Constitution', dc: 14, passResult: 'The flame turns blue and cool. The accused withdraws unburned hands. Gasps from the crowd.', failResult: 'The flame flares red. Burns appear. But were the flames tampered with?' },
      { name: 'The Question', description: 'While hands are in the flame, the Inquisitor asks: "Did you cause the deaths of those apprentices?"', skillCheck: 'Charisma', dc: 15, passResult: 'A clear, steady denial. The flame does not react. Even the Inquisitor looks convinced.', failResult: 'The voice cracks. The flame flickers. Guilt, fear, or just a terrified innocent person?' },
    ],
    witnesses: [
      { name: 'Bessa Irongrip', testimony: 'I saw Korrin sneaking near the rival\'s forge the night before. He had something in his hands.', lying: true, detectLieDC: 14 },
      { name: 'Tam Whittler', testimony: 'Korrin was at my tavern all evening. He drank four ales and fell asleep in the corner.', lying: false, detectLieDC: 10 },
      { name: 'Mira Ashbluff (wife)', testimony: 'Korrin came home with burned hands the next morning. He said he burned them on his own forge.', lying: false, detectLieDC: 12 },
    ],
    divineIntervention: 'If the party prays to the god of justice before the trial, they receive a vision: hands in flame, but the fire comes from below the altar, not from the divine source. Someone has replaced the sacred fire.',
    innocentTwist: 'Korrin IS innocent. Bessa Irongrip sabotaged the forge to eliminate competition and framed Korrin. Korrin\'s burned hands are from trying to rescue the apprentices after the explosion.',
    guiltyTwist: 'If the party does not investigate and the trial proceeds normally, the tampered flame will burn Korrin. An innocent man will be executed unless someone intervenes.',
    spectatorReaction: 'The crowd is split. Half want blood, half want mercy. A riot is possible regardless of the outcome. The Inquisitor will defer to the party if they present evidence.',
  },
  {
    name: 'The Riddle of the Drowned God',
    ordealType: 'water',
    accusation: 'Captain Hessa Stormcrown is accused of deliberately sinking her own ship to collect insurance, drowning 12 crew members.',
    accusedDescription: 'A weathered half-orc woman with a captain\'s bearing. She does not beg or plead. She says "The sea took them. Not me." and refuses to elaborate.',
    presider: 'The Drowned Priest, a cleric of the sea god who conducts trials by submersion. He breathes water naturally and forgets this is unusual.',
    setting: 'A stone basin in the Temple of Tides, filled with seawater blessed by the god of storms. The accused is submerged. The innocent float. The guilty sink.',
    phases: [
      { name: 'The Submersion', description: 'Captain Hessa is bound and lowered into the basin. She must hold her breath and remain calm.', skillCheck: 'Constitution', dc: 13, passResult: 'She sinks slowly, calmly, and begins to rise. The water accepts her.', failResult: 'She thrashes. The water churns. Unclear if this is guilt or panic.' },
      { name: 'The Current', description: 'Underwater, a magical current pushes the guilty away from the surface and pulls the innocent up.', skillCheck: 'Wisdom', dc: 15, passResult: 'The current cradles her and pushes her toward the surface. She rises.', failResult: 'The current holds her down. Bubbles stream from her mouth. The Drowned Priest watches with detached curiosity.' },
      { name: 'The Vision', description: 'While submerged, the accused sees a vision of the crime. If innocent, they see what really happened. If guilty, they see their own actions.', skillCheck: 'Intelligence', dc: 14, passResult: 'Hessa surfaces gasping: "I saw it. The hull was rotted from the inside. Something was IN the wood." New evidence.', failResult: 'Hessa surfaces silent. She will not say what she saw. This is damning.' },
    ],
    witnesses: [
      { name: 'First Mate Dorin', testimony: 'The captain changed course into the storm. She knew what she was doing.', lying: true, detectLieDC: 16 },
      { name: 'Survivor Kella', testimony: 'I was below decks. The hull cracked from the inside out. No storm does that.', lying: false, detectLieDC: 10 },
      { name: 'Insurance Agent Varro', testimony: 'The policy was taken out 3 days before the voyage. Suspicious timing.', lying: false, detectLieDC: 11 },
    ],
    divineIntervention: 'Praying to the sea god reveals a vision of something large and dark clinging to the ship\'s hull beneath the waterline. Not a storm. Not sabotage. A creature.',
    innocentTwist: 'The ship was attacked by an aboleth that had been following the shipping lane. Dorin (the first mate) was already under its influence and steered toward the creature. He is lying to protect his master.',
    guiltyTwist: 'If Dorin is not exposed, Hessa will be convicted. The aboleth gets away. It will attack again.',
    spectatorReaction: 'The families of the drowned crew are present. They want someone to pay. The truth (a monster did it) is less satisfying than a human villain.',
  },
];

export function getRandomTrial(): MagicalTrial {
  return TRIALS[Math.floor(Math.random() * TRIALS.length)];
}

export function getTrialByType(type: OrdealType): MagicalTrial | undefined {
  return TRIALS.find((t) => t.ordealType === type);
}

export function getAllOrdealTypes(): OrdealType[] {
  return [...new Set(TRIALS.map((t) => t.ordealType))];
}

export function getLyingWitnesses(trial: MagicalTrial): TrialWitness[] {
  return trial.witnesses.filter((w) => w.lying);
}

export function formatTrial(trial: MagicalTrial): string {
  const lines = [`⚖️ **${trial.name}** *(${trial.ordealType} ordeal)*`];
  lines.push(`  Accusation: ${trial.accusation}`);
  lines.push(`  Accused: ${trial.accusedDescription}`);
  lines.push(`  Presider: ${trial.presider}`);
  lines.push(`  Setting: ${trial.setting}`);
  lines.push('  **Phases:**');
  for (const p of trial.phases) {
    lines.push(`    - **${p.name}** (DC ${p.dc} ${p.skillCheck}): ${p.description}`);
  }
  lines.push('  **Witnesses:**');
  for (const w of trial.witnesses) {
    lines.push(`    - **${w.name}**: "${w.testimony}"`);
  }
  lines.push(`  Divine clue: ${trial.divineIntervention}`);
  lines.push(`  Twist: ${trial.innocentTwist}`);
  return lines.join('\n');
}

export { TRIALS as MAGICAL_TRIALS };
