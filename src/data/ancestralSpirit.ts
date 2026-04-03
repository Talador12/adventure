// Ancestral spirit guide system — departed mentors who offer wisdom and occasional intervention.

export type SpiritDisposition = 'wise' | 'stern' | 'playful' | 'sorrowful' | 'fierce';

export interface SpiritGuidance { situation: string; advice: string; mechanicalBonus: string | null; }

export interface AncestralSpirit {
  name: string;
  relation: string;
  disposition: SpiritDisposition;
  appearance: string;
  guidances: SpiritGuidance[];
  interventionAbility: string;
  interventionCost: string;
  summonCondition: string;
  quirk: string;
}

const SPIRITS: AncestralSpirit[] = [
  { name: 'Grandmother Ashwood', relation: 'Maternal great-grandmother', disposition: 'wise', appearance: 'A translucent woman knitting a scarf that never ends. Smells of lavender.', guidances: [
    { situation: 'Before a difficult negotiation', advice: '"Listen more than you speak, dear. People tell you everything if you just let them talk."', mechanicalBonus: 'Advantage on Insight checks for 1 hour.' },
    { situation: 'When the party is lost', advice: '"Follow the water downstream. It always finds civilization eventually."', mechanicalBonus: '+5 to Survival (navigation) for the day.' },
    { situation: 'When someone is grieving', advice: '"Grief is love with nowhere to go. Give it somewhere. Plant a tree. Write a letter. Fight for what they believed in."', mechanicalBonus: null },
  ], interventionAbility: 'Once per month, can cast Calm Emotions on the party (no save for allies, affects enemies normally).', interventionCost: 'The spirit grows fainter for 1 week after intervention. Communication is difficult.', summonCondition: 'Sit quietly for 10 minutes near a natural water source.', quirk: 'Comments on everyone\'s posture. "Stand up straight. The dead don\'t slouch."' },
  { name: 'Sergeant Ironjaw', relation: 'Former commanding officer (died in your arms)', disposition: 'stern', appearance: 'A scarred half-orc in battered armor. Still gives orders. Still expects them followed.', guidances: [
    { situation: 'Before combat', advice: '"Check your flanks. ALWAYS check your flanks. I died because someone didn\'t check their flanks."', mechanicalBonus: 'Cannot be surprised for the next combat.' },
    { situation: 'When someone suggests retreat', advice: '"Retreat is not defeat. A smart retreat saves lives. A stupid last stand wastes them. I should know."', mechanicalBonus: 'Disengage action doesn\'t provoke opportunity attacks for 1 combat.' },
    { situation: 'When the party argues about leadership', advice: '"The best leader is the one nobody notices. They just do the work and everyone follows."', mechanicalBonus: null },
  ], interventionAbility: 'Once per month, can shout a warning that gives one ally +5 AC against one attack.', interventionCost: 'The spirit relives a painful memory. Becomes unavailable for 3 days.', summonCondition: 'Polish a weapon or armor piece while standing at attention.', quirk: 'Calls everyone "soldier" regardless of class. Critiques combat form mid-fight.' },
  { name: 'Pip the Wanderer', relation: 'Childhood friend who died young (illness)', disposition: 'playful', appearance: 'A halfling child who never aged. Surrounded by butterflies that only exist when they\'re around.', guidances: [
    { situation: 'When the party is demoralized', advice: '"Remember when we used to pretend the garden was a dungeon? This is just a bigger garden. You can do this."', mechanicalBonus: 'Remove frightened condition from all party members.' },
    { situation: 'When facing a puzzle', advice: '"Adults make everything so complicated. What would a kid do? Just... push the shiny button."', mechanicalBonus: '+3 to Investigation for this puzzle (child\'s perspective bypasses overthinking).' },
    { situation: 'When someone is cruel to a child', advice: '*silence. The butterflies die. The spirit stares. The temperature drops 20 degrees.*', mechanicalBonus: 'The offender must WIS DC 14 save or be frightened for 1 minute.' },
  ], interventionAbility: 'Once per month, can make one creature genuinely laugh — breaking charm effects and restoring 1d8 HP.', interventionCost: 'The spirit cries afterward. Butterflies don\'t return for a week.', summonCondition: 'Play a game. Any game. Cards, dice, catch. Must be genuinely playful.', quirk: 'Asks "why?" about everything. "Why is the dragon angry?" "Why can\'t we just be friends?" "Why is lava hot?"' },
];

export function getRandomSpirit(): AncestralSpirit {
  return SPIRITS[Math.floor(Math.random() * SPIRITS.length)];
}

export function getSpiritsByDisposition(disposition: SpiritDisposition): AncestralSpirit[] {
  return SPIRITS.filter((s) => s.disposition === disposition);
}

export function getGuidanceCount(spirit: AncestralSpirit): number {
  return spirit.guidances.length;
}

export function getGuidancesWithBonuses(spirit: AncestralSpirit): SpiritGuidance[] {
  return spirit.guidances.filter((g) => g.mechanicalBonus !== null);
}

export function getAllDispositions(): SpiritDisposition[] {
  return [...new Set(SPIRITS.map((s) => s.disposition))];
}

export function formatSpirit(spirit: AncestralSpirit): string {
  const icon = { wise: '🦉', stern: '⚔️', playful: '🦋', sorrowful: '🌧️', fierce: '🔥' }[spirit.disposition];
  const lines = [`${icon} **${spirit.name}** *(${spirit.relation}, ${spirit.disposition})*`];
  lines.push(`  *${spirit.appearance}*`);
  lines.push(`  Summon: ${spirit.summonCondition}`);
  lines.push(`  💬 Quirk: ${spirit.quirk}`);
  lines.push(`  ⚡ Intervention: ${spirit.interventionAbility}`);
  return lines.join('\n');
}

export { SPIRITS as ANCESTRAL_SPIRITS };
