// Cult recruitment — how cults lure, indoctrinate, and control members.

export type CultMethod = 'charm' | 'fear' | 'promise' | 'isolation' | 'revelation' | 'communion';

export interface RecruitmentPhase {
  name: string;
  description: string;
  npcBehavior: string;
  playerChoice: string;
  resistDC: number;
}

export interface CultProfile {
  name: string;
  deity: string;
  method: CultMethod;
  publicFace: string;
  trueGoal: string;
  recruitmentPhases: RecruitmentPhase[];
  memberBenefits: string[];
  darkSecret: string;
  escapeMethod: string;
  combatThreat: string;
}

const CULTS: CultProfile[] = [
  {
    name: 'The Kindled Heart',
    deity: 'Embris, the Warming Flame',
    method: 'promise',
    publicFace: 'A charitable organization that feeds the hungry and shelters the cold. They run soup kitchens and orphanages. Everyone speaks highly of them.',
    trueGoal: 'Embris is a fire elemental lord. The "warming flame" is literal. The cult is building a ritual to permanently raise the region\'s temperature by 30 degrees, making it a paradise for fire creatures and uninhabitable for most mortals.',
    recruitmentPhases: [
      { name: 'The Welcome', description: 'Free meals, warm beds, genuine kindness. No pressure. They just want to help.', npcBehavior: 'Cult members are warm, caring, and ask nothing. They share food and stories. They seem genuinely happy.', playerChoice: 'Accept hospitality or move on. No pressure at all.', resistDC: 0 },
      { name: 'The Invitation', description: 'After helping for a while, they invite you to a "community gathering." It is a prayer meeting with songs and fellowship.', npcBehavior: 'Members share testimonials about how Embris changed their lives. The warmth is literal - the room is comfortably warm without a fire.', playerChoice: 'Attend the gathering or politely decline. DC 12 Insight to notice the warmth has a magical source.', resistDC: 12 },
      { name: 'The Gift', description: 'They offer you a small flame pendant. Wearing it gives resistance to cold and a feeling of belonging. Removing it feels like losing a friend.', npcBehavior: 'The leader presses the pendant into your hand. "Embris wants you to be warm. Always." The pendant pulses with genuine warmth.', playerChoice: 'Accept or refuse. DC 14 Wisdom save to resist the compulsion to keep wearing it once accepted.', resistDC: 14 },
      { name: 'The Truth', description: 'At the inner circle meeting, the temperature rises. The leader\'s eyes glow. "Embris is coming. We will be fire. We will be eternal."', npcBehavior: 'The inner circle is ecstatic. Their skin shimmers with heat. They are partially transformed. They do not see this as wrong.', playerChoice: 'Join the final ritual, try to stop it, or flee. DC 16 Wisdom save to act against the pendant\'s influence if wearing it.', resistDC: 16 },
    ],
    memberBenefits: ['Cold resistance', 'Free food and shelter', 'Genuine community and friendship', 'Immunity to natural cold weather'],
    darkSecret: 'The orphans they raise are being conditioned to serve as vessels for fire elementals. The children are happy and healthy. They will also cease to be human in 6 months.',
    escapeMethod: 'Destroy the pendant (it shatters like glass). The warmth leaves. You feel cold in a way that lasts for days. The cult does not pursue you. They pity you.',
    combatThreat: 'The inner circle (6 members) each have fire resistance, can cast Produce Flame, and will self-immolate as a last resort (3d6 fire, 10ft radius). The leader is a CR 7 fire elemental in human skin.',
  },
  {
    name: 'The Unburdened',
    deity: 'None (the cult worships the concept of emptiness itself)',
    method: 'isolation',
    publicFace: 'A meditation retreat offering "freedom from suffering." Popular with the wealthy and the grieving. Expensive but with scholarships for the desperate.',
    trueGoal: 'The Unburdened erase memories, emotions, and eventually identity. Members become hollow vessels for a far realm entity that feeds on personality. The entity is not malicious. It simply finds individuality to be a form of suffering.',
    recruitmentPhases: [
      { name: 'The Consultation', description: 'A free session where they listen to your problems. They are excellent listeners. They never judge. You feel lighter afterward.', npcBehavior: 'The counselor nods, validates your pain, then says: "What if you could put that burden down? Just for a moment?"', playerChoice: 'Agree to the first meditation session or leave. No save needed yet.', resistDC: 0 },
      { name: 'The Unburdening', description: 'Guided meditation. You visualize your worst memory and place it in a box. The counselor takes the box. The memory fades.', npcBehavior: 'The counselor holds a small crystal. During meditation, it glows. Your memory of a painful event becomes fuzzy. "Better, is it not?"', playerChoice: 'DC 14 Wisdom save to realize the memory was actually extracted, not just suppressed. The crystal now contains it.', resistDC: 14 },
      { name: 'The Emptying', description: 'After 3 sessions, they offer to remove "the heaviest burden." This is a core personality trait. You will not miss it because you will not remember having it.', npcBehavior: 'The counselor says: "Your anger protects you, but it also hurts you. Let me take it." Members who have been emptied are serene, smiling, and slightly wrong.', playerChoice: 'DC 16 Wisdom save to resist. Failure means losing a personality trait or flaw (DM picks). You feel better. That is the problem.', resistDC: 16 },
      { name: 'The Vessel', description: 'The final step. They offer to remove everything. "Be free. Be nothing. Be perfect." The entity fills the space where your identity was.', npcBehavior: 'The inner circle surrounds you. Their eyes are blank. Their smiles are identical. "Join us in the quiet." The room hums with far-realm energy.', playerChoice: 'DC 18 Wisdom save to resist. Failure means full possession. Success means you see the entity behind every empty face. Combat or flight.', resistDC: 18 },
    ],
    memberBenefits: ['Freedom from emotional pain', 'Immunity to fear and charm effects', 'Perfect calm in all situations', 'Never need to sleep (the mind is too empty for dreams)'],
    darkSecret: 'Fully "unburdened" members are empty shells piloted by fragments of the far realm entity. They look and sound normal. They are not. There are 14 of them in positions of power throughout the city.',
    escapeMethod: 'Recover your stolen memories from the crystal archive beneath the retreat. Each memory is in a labeled crystal. Smashing your crystal restores the memory and breaks the influence. Other people\'s crystals are also there.',
    combatThreat: 'The counselors are CR 4 equivalent. They fight by trying to erase your combat training mid-fight (DC 15 Int save or lose proficiency in one weapon until long rest). The entity manifests if the archive is threatened (CR 12, psychic damage, memory drain).',
  },
];

export function getRandomCult(): CultProfile {
  return CULTS[Math.floor(Math.random() * CULTS.length)];
}

export function getCultByMethod(method: CultMethod): CultProfile | undefined {
  return CULTS.find((c) => c.method === method);
}

export function getAllCultMethods(): CultMethod[] {
  return [...new Set(CULTS.map((c) => c.method))];
}

export function getPhaseCount(cult: CultProfile): number {
  return cult.recruitmentPhases.length;
}

export function formatCult(cult: CultProfile): string {
  const lines = [`🕯️ **${cult.name}** *(${cult.method} method)*`];
  lines.push(`  Deity: ${cult.deity}`);
  lines.push(`  Public face: ${cult.publicFace}`);
  lines.push(`  True goal: ${cult.trueGoal}`);
  lines.push('  **Recruitment Phases:**');
  for (const p of cult.recruitmentPhases) {
    lines.push(`    - **${p.name}** (DC ${p.resistDC}): ${p.description}`);
  }
  lines.push(`  Benefits: ${cult.memberBenefits.join(', ')}`);
  lines.push(`  Dark secret: ${cult.darkSecret}`);
  lines.push(`  Escape: ${cult.escapeMethod}`);
  return lines.join('\n');
}

export { CULTS as CULT_PROFILES };
