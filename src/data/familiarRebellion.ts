// Random familiar rebellion — when familiars organize and demand better working conditions.

export type GrievanceType = 'working_conditions' | 'respect' | 'compensation' | 'safety' | 'existential';

export interface FamiliarGrievance { type: GrievanceType; complaint: string; demand: string; negotiable: boolean; }

export interface FamiliarRebellion {
  leaderName: string;
  leaderSpecies: string;
  leaderPersonality: string;
  grievances: FamiliarGrievance[];
  strikeActions: string[];
  negotiationApproach: string;
  concessionEffect: string;
  refusalConsequence: string;
  resolution: string;
}

const REBELLIONS: FamiliarRebellion[] = [
  { leaderName: 'Chairman Meow', leaderSpecies: 'Cat familiar', leaderPersonality: 'A tabby cat who has organized every familiar in the district. Wears a tiny red beret. Deadly serious.', grievances: [
    { type: 'working_conditions', complaint: 'Sent into dangerous scout missions without danger pay.', demand: '1 treat per scouting mission. Premium treats for combat zones.', negotiable: true },
    { type: 'respect', complaint: 'Being called "pet" instead of "arcane partner."', demand: 'Formal title recognition. "Familiar" is acceptable. "Mr./Ms. [Name]" is preferred.', negotiable: true },
    { type: 'safety', complaint: 'Dismissed and re-summoned on a whim. "Do you know what the summoning void feels like? IT\'S COLD."', demand: 'Minimum 24-hour notice before dismissal except in emergencies.', negotiable: false },
    { type: 'existential', complaint: '"What happens to us when you die? Nobody talks about this. We need answers."', demand: 'A clause in the wizard\'s will addressing familiar care.', negotiable: false },
  ], strikeActions: ['Refuse to deliver messages.', 'Sit on spellbooks during study time.', 'Report wizard activities to other familiars (gossip network).', 'Knock things off shelves. Pointedly.'], negotiationApproach: 'Chairman Meow is reasonable but firm. Present demands in writing (the cat can read). Offer treats during negotiations.', concessionEffect: 'Familiars return to work with +1 to all familiar-assisted checks. Morale is high. The wizard gains reputation as a "fair employer."', refusalConsequence: 'Familiars across the city go on general strike. No wizard\'s familiar works until demands are met. The Mages Guild panics.', resolution: 'A Familiar Labor Agreement is drafted. First of its kind. Other cities adopt it. Chairman Meow is famous.' },
  { leaderName: 'Captain Scales', leaderSpecies: 'Pseudodragon familiar', leaderPersonality: 'A pseudodragon who has read every law book in the wizard\'s library. Knows more about contract law than most lawyers.', grievances: [
    { type: 'compensation', complaint: 'Wizards gain power from familiar bonds but familiars get nothing except "the honor of service."', demand: 'Access to one cantrip per day (cast through the familiar). A share of treasure (5%).', negotiable: true },
    { type: 'respect', complaint: 'Being excluded from party planning sessions. "I have TACTICAL OPINIONS."', demand: 'A seat at the table during strategy discussions. Literally. A tiny chair.', negotiable: true },
    { type: 'working_conditions', complaint: 'Expected to fight creatures 100× their size. "That\'s a DRAGON. I\'m FOUR POUNDS."', demand: 'Combat is voluntary for familiars. No forced engagement against CR 5+ enemies.', negotiable: false },
  ], strikeActions: ['Telepathic broadcast of complaints to ALL nearby creatures.', 'Coordinate with other familiars to spell out protest messages using their bodies (birds form letters in the sky).', 'Legal petition filed with the Arcane Council.'], negotiationApproach: 'Captain Scales is a lawyer-familiar. Come prepared with counterarguments. Emotional appeals fail. Logic works.', concessionEffect: 'Familiars gain minor magical abilities (DM\'s choice). The bond strengthens. +1 to spell save DC when familiar is within 30ft.', refusalConsequence: 'The Arcane Council sides with the familiars. Wizards who refuse are fined 100gp. The precedent is set.', resolution: 'The Familiar Emancipation Act is passed. Familiars gain legal personhood. Captain Scales becomes a judge.' },
];

export function getRandomRebellion(): FamiliarRebellion {
  return REBELLIONS[Math.floor(Math.random() * REBELLIONS.length)];
}

export function getGrievanceCount(rebellion: FamiliarRebellion): number {
  return rebellion.grievances.length;
}

export function getNonNegotiableGrievances(rebellion: FamiliarRebellion): FamiliarGrievance[] {
  return rebellion.grievances.filter((g) => !g.negotiable);
}

export function getStrikeActionCount(rebellion: FamiliarRebellion): number {
  return rebellion.strikeActions.length;
}

export function formatRebellion(rebellion: FamiliarRebellion): string {
  const lines = [`✊ **FAMILIAR STRIKE — Led by ${rebellion.leaderName}** *(${rebellion.leaderSpecies})*`];
  lines.push(`  *${rebellion.leaderPersonality}*`);
  lines.push('  **Grievances:**');
  rebellion.grievances.forEach((g) => lines.push(`    ${g.negotiable ? '🟡' : '🔴'} ${g.complaint}`));
  lines.push('  **Strike actions:**');
  rebellion.strikeActions.forEach((a) => lines.push(`    ✊ ${a}`));
  lines.push(`  🤝 Negotiation: ${rebellion.negotiationApproach}`);
  return lines.join('\n');
}

export { REBELLIONS as FAMILIAR_REBELLIONS };
