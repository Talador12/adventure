// Magical parasite — creatures that attach to PCs with benefits and drawbacks.

export type ParasiteType = 'symbiote' | 'psychic' | 'arcane' | 'divine' | 'necrotic';

export interface ParasiteStage {
  stage: number;
  daysToReach: number;
  benefit: string;
  drawback: string;
  appearance: string;
}

export interface MagicalParasite {
  name: string;
  type: ParasiteType;
  description: string;
  attachMethod: string;
  stages: ParasiteStage[];
  removalMethod: string;
  removalConsequence: string;
  finalFormBenefit: string;
  finalFormCost: string;
}

const PARASITES: MagicalParasite[] = [
  {
    name: 'The Whisper Worm',
    type: 'psychic',
    description: 'A tiny translucent worm that burrows into the base of the skull. Invisible to casual observation. Detectable with DC 16 Medicine or any magical detection.',
    attachMethod: 'Enters through the ear while the host sleeps near infested areas (old libraries, mind flayer ruins, aberrant lairs). DC 14 Con save to resist.',
    stages: [
      { stage: 1, daysToReach: 0, benefit: 'You can hear surface thoughts of creatures within 10 feet (like a passive Detect Thoughts).', drawback: 'Headaches. Disadvantage on Concentration checks.', appearance: 'No visible change. Occasional nosebleed.' },
      { stage: 2, daysToReach: 7, benefit: 'You can send telepathic messages to any creature you can see within 60 feet.', drawback: 'You hear ALL thoughts within 10 feet. Cannot turn it off. Crowded areas are overwhelming (DC 13 Wisdom save or stunned for 1 round).', appearance: 'Faint purple veins visible at the temples.' },
      { stage: 3, daysToReach: 21, benefit: 'Cast Detect Thoughts at will (no slot). Cast Suggestion once per day (no slot).', drawback: 'The worm occasionally overrides your speech. You say things you did not intend. DM can insert one sentence per conversation.', appearance: 'Eyes have a faint purple glow in darkness. The veins are now visible on the forehead.' },
    ],
    removalMethod: 'Greater Restoration removes it. A skilled surgeon can extract it with DC 18 Medicine (failure deals 4d6 psychic damage). Or convince the worm to leave voluntarily by offering it a "better host" (DC 20 Persuasion with telepathy).',
    removalConsequence: 'You feel profoundly alone. The silence in your head is deafening. Disadvantage on Wisdom checks for 1d4 days as your brain readjusts.',
    finalFormBenefit: 'If kept for 30+ days, the worm bonds permanently. You gain telepathy 60ft and can cast Detect Thoughts once per long rest with no components.',
    finalFormCost: 'The worm is part of you now. Anti-magic fields cause you pain (1d6 psychic per round). If the worm dies (which happens if you die), it releases a psychic scream (30ft, 6d6 psychic damage).',
  },
  {
    name: 'The Ember Vine',
    type: 'arcane',
    description: 'A thin, warm tendril of living flame that wraps around the forearm. It pulses with the host\'s heartbeat. It is beautiful and hungry.',
    attachMethod: 'Grows from magical fire sources (enchanted forges, fire elemental remains, dragon nests). Reaches for the nearest warm-blooded creature. DC 13 Dex save to avoid.',
    stages: [
      { stage: 1, daysToReach: 0, benefit: 'Fire resistance. Your hands can produce candlelight at will.', drawback: 'You are always warm. Cold weather gear is unnecessary but you also cannot cool down. Disadvantage on saves vs. heat exhaustion.', appearance: 'A thin orange-red line spiraling up the forearm. Warm to the touch.' },
      { stage: 2, daysToReach: 5, benefit: 'Cast Burning Hands once per short rest (no slot, uses your spell save DC or DC 13).', drawback: 'Your body temperature is now 120F. Hugs are inadvisable. Flammable objects you hold for more than 1 minute catch fire.', appearance: 'The vine has branched. Covers the forearm and shoulder. Glows faintly in darkness.' },
      { stage: 3, daysToReach: 14, benefit: 'Fire immunity. Cast Fireball once per day (no slot). The vine acts as a +1 arcane focus.', drawback: 'You set things on fire by touching them for more than 6 seconds. Sleeping requires a stone or metal bed. Your hair is now literally flame.', appearance: 'The vine covers the entire arm and part of the chest. Your eyes have fire behind them. You are objectively terrifying.' },
    ],
    removalMethod: 'Submerge the limb in holy water for 1 hour (the vine screams). Remove Curse followed by Dispel Magic. Or let a fire elemental absorb it (the elemental becomes your ally for 24 hours out of gratitude).',
    removalConsequence: 'The arm is covered in burn scars. You feel cold for 1d4 weeks. Fire feels like loss, not warmth.',
    finalFormBenefit: 'At 14+ days, the vine offers a choice: merge fully or depart. Merging grants permanent fire immunity and the ability to cast Wall of Fire once per long rest.',
    finalFormCost: 'Water damage hurts double. Rain is painful. Swimming is dangerous (1d6 per round in water). Your blood is now flammable.',
  },
  {
    name: 'The Grief Moth',
    type: 'necrotic',
    description: 'A small, ethereal moth that nests in the host\'s shadow. It feeds on sorrow and regret. The sadder you are, the stronger it gets.',
    attachMethod: 'Found in places of great tragedy (battlefields, graveyards, sites of natural disaster). Attaches to whoever is feeling the most grief in the area. No save - it is drawn to pain.',
    stages: [
      { stage: 1, daysToReach: 0, benefit: 'Resistance to necrotic damage. You can see into the Ethereal Plane for 30 feet.', drawback: 'You feel a persistent melancholy. Disadvantage on saves vs. effects that cause fear or sadness.', appearance: 'Your shadow has wings. They flutter when you are sad.' },
      { stage: 2, daysToReach: 10, benefit: 'Cast Speak with Dead once per day (no components). The dead are drawn to you and are unusually talkative.', drawback: 'You attract undead. Mindless undead within 100 feet sense you and approach (not hostile, just... present). This is creepy.', appearance: 'Your shadow is now visibly moth-shaped. It moves independently of your body.' },
      { stage: 3, daysToReach: 30, benefit: 'Necrotic immunity. Cast Raise Dead once (ever) without material components. The moth sacrifices itself to power it.', drawback: 'You can feel the emotional weight of every death within 1 mile. In cities, this is unbearable. In battlefields, it is catastrophic (DC 16 Wisdom save or incapacitated for 1 minute).', appearance: 'The moth is visible to others now. It sits on your shoulder. It is beautiful and deeply unsettling.' },
    ],
    removalMethod: 'Experience genuine, overwhelming joy. The moth cannot feed on happiness and departs. Alternatively, a cleric of a life domain can coax it out with a DC 15 Religion check.',
    removalConsequence: 'The shadow returns to normal but feels lighter. You realize how much weight the melancholy had. Advantage on saves vs. fear for 1 week.',
    finalFormBenefit: 'At stage 3, the moth offers its life to cast one Raise Dead. This is its purpose. It was born from someone\'s grief and wants to undo one death before it passes.',
    finalFormCost: 'After the Raise Dead, the moth is gone. Your shadow is normal. The necrotic immunity and ethereal sight end. But someone is alive who was not.',
  },
];

export function getRandomParasite(): MagicalParasite {
  return PARASITES[Math.floor(Math.random() * PARASITES.length)];
}

export function getParasiteByType(type: ParasiteType): MagicalParasite | undefined {
  return PARASITES.find((p) => p.type === type);
}

export function getAllParasiteTypes(): ParasiteType[] {
  return [...new Set(PARASITES.map((p) => p.type))];
}

export function getStageCount(parasite: MagicalParasite): number {
  return parasite.stages.length;
}

export function formatParasite(parasite: MagicalParasite): string {
  const lines = [`🦠 **${parasite.name}** *(${parasite.type})*`];
  lines.push(`  ${parasite.description}`);
  lines.push(`  Attach: ${parasite.attachMethod}`);
  lines.push('  **Stages:**');
  for (const s of parasite.stages) {
    lines.push(`    Stage ${s.stage} (day ${s.daysToReach}+): ${s.appearance}`);
    lines.push(`      Benefit: ${s.benefit}`);
    lines.push(`      Drawback: ${s.drawback}`);
  }
  lines.push(`  Removal: ${parasite.removalMethod}`);
  lines.push(`  Final form: ${parasite.finalFormBenefit}`);
  lines.push(`  Final cost: ${parasite.finalFormCost}`);
  return lines.join('\n');
}

export { PARASITES as MAGICAL_PARASITES };
