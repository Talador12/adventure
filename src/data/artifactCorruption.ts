// Random artifact corruption tracker — how powerful items corrupt their wielders over time.

export type CorruptionStage = 'clean' | 'tempted' | 'influenced' | 'dependent' | 'consumed';

export interface CorruptionEffect {
  stage: CorruptionStage;
  description: string;
  mechanicalEffect: string;
  behavioralChange: string;
  saveDC: number;
}

export interface ArtifactCorruptionProfile {
  artifactName: string;
  corruptionType: string;
  stages: CorruptionEffect[];
  resistanceMethod: string;
  purificationCost: string;
  corruptionRate: string; // how fast it spreads
}

const PROFILES: ArtifactCorruptionProfile[] = [
  { artifactName: 'The Hungering Blade', corruptionType: 'Bloodlust', stages: [
    { stage: 'clean', description: 'The blade is dormant. It hums faintly when drawn.', mechanicalEffect: '+1 longsword. No corruption yet.', behavioralChange: 'None.', saveDC: 0 },
    { stage: 'tempted', description: 'The blade sings in combat. You want to fight more.', mechanicalEffect: '+2 longsword. Advantage on Initiative. CHA DC 12 to sheathe during combat.', behavioralChange: 'Picks fights unnecessarily. Suggests violence as first solution.', saveDC: 12 },
    { stage: 'influenced', description: 'The blade drinks blood. You feel what it feels: joy.', mechanicalEffect: '+2, heal 1d6 on killing blow. WIS DC 14 to spare a defeated enemy.', behavioralChange: 'Talks to the sword. Cleans it obsessively. Sleeps with it.', saveDC: 14 },
    { stage: 'dependent', description: 'You need the blade. Being apart from it causes physical pain.', mechanicalEffect: '+3. 1d6 psychic damage per hour without the weapon. -2 to all checks without it.', behavioralChange: 'Paranoid about the blade being stolen. Trusts no one near it.', saveDC: 16 },
    { stage: 'consumed', description: 'You ARE the blade. The blade is you. There is no distinction.', mechanicalEffect: '+3, but the sword controls combat actions (DM rolls, wielder attacks nearest creature).', behavioralChange: 'Personality fully overwritten by the sword\'s will. NPC until cured.', saveDC: 18 },
  ], resistanceMethod: 'WIS save (DC = stage DC) each dawn. Success prevents progression for 1 day.', purificationCost: 'Greater Restoration removes 1 stage. Full purification: a cleric of 15th+ level + 1000gp in holy water.', corruptionRate: '1 stage per week of continuous use. Resets to stage 1 if unused for 1 month.' },
  { artifactName: 'The Crown of Whispers', corruptionType: 'Paranoia', stages: [
    { stage: 'clean', description: 'A circlet that grants insight into others\' thoughts.', mechanicalEffect: 'Detect Thoughts 1/day. No corruption.', behavioralChange: 'None.', saveDC: 0 },
    { stage: 'tempted', description: 'You hear whispers at the edge of your mind. Most are real.', mechanicalEffect: 'Detect Thoughts at will. +2 Insight. WIS DC 12 to not read thoughts of allies.', behavioralChange: 'Questions everyone\'s motives. Eavesdrops compulsively.', saveDC: 12 },
    { stage: 'influenced', description: 'The whispers say everyone is lying. Are they wrong?', mechanicalEffect: 'Telepathy 60ft. -2 to Persuasion (paranoid tone). Advantage on saves vs. charm.', behavioralChange: 'Accuses allies of hiding things. Tests loyalty constantly.', saveDC: 14 },
    { stage: 'dependent', description: 'Without the crown, you can\'t think clearly. The silence is terrifying.', mechanicalEffect: 'Without crown: disadvantage on all WIS/INT checks. With crown: advantage.', behavioralChange: 'Refuses to remove the crown. Sleeps in it.', saveDC: 16 },
    { stage: 'consumed', description: 'You hear EVERYTHING. Every thought within 1 mile. It never stops.', mechanicalEffect: 'Know all thoughts within 120ft. Incapacitated for 1d4 rounds when entering crowds.', behavioralChange: 'Becomes a recluse. Cannot function around more than 2 people.', saveDC: 18 },
  ], resistanceMethod: 'CHA save each dawn. Success = no progression. Failure = the whispers grow louder.', purificationCost: 'Remove Curse (7th level) or convince the wielder they are wrong about everyone. Good luck with that.', corruptionRate: '1 stage per 2 weeks. Accelerates to 1/week if the wielder catches someone actually lying.' },
  { artifactName: 'The Mirror of Vanity', corruptionType: 'Narcissism', stages: [
    { stage: 'clean', description: 'A hand mirror that shows you at your best. Very flattering.', mechanicalEffect: '+1 CHA. That\'s it. For now.', behavioralChange: 'None.', saveDC: 0 },
    { stage: 'tempted', description: 'You look amazing. Everyone should notice. Why aren\'t they noticing?', mechanicalEffect: '+2 CHA. -1 WIS. CHA DC 12 to not check the mirror hourly.', behavioralChange: 'Overly concerned with appearance. Fixes hair in combat.', saveDC: 12 },
    { stage: 'influenced', description: 'You are the most important person in any room. Obviously.', mechanicalEffect: '+3 CHA. -2 WIS. Cannot willingly take actions that make you look bad.', behavioralChange: 'Demands to be the center of attention. Jealous of praise given to others.', saveDC: 14 },
    { stage: 'dependent', description: 'The mirror shows you as a god. You\'re starting to believe it.', mechanicalEffect: '+4 CHA. -3 WIS. Disadvantage on Insight (you only see yourself).', behavioralChange: 'Genuinely believes they are divinely important. Expects worship.', saveDC: 16 },
    { stage: 'consumed', description: 'You step through the mirror. The reflection steps out. It has your stats and none of your morals.', mechanicalEffect: 'Trapped in the mirror dimension. The reflection replaces you. It\'s charming. And evil.', behavioralChange: 'You no longer exist in the material plane.', saveDC: 18 },
  ], resistanceMethod: 'WIS save each dawn. A genuine compliment from an ally gives advantage on the save.', purificationCost: 'Shatter the mirror (DC 20 CHA save to even attempt it — the wielder doesn\'t want to). Or have someone truly humble hold it for 24 hours.', corruptionRate: '1 stage per 3 days. Halved if the wielder receives genuine criticism they accept.' },
];

export function getCorruptionProfile(name: string): ArtifactCorruptionProfile | undefined {
  return PROFILES.find((p) => p.artifactName.toLowerCase().includes(name.toLowerCase()));
}

export function getStageByName(profile: ArtifactCorruptionProfile, stage: CorruptionStage): CorruptionEffect | undefined {
  return profile.stages.find((s) => s.stage === stage);
}

export function getCorruptionStageOrder(): CorruptionStage[] {
  return ['clean', 'tempted', 'influenced', 'dependent', 'consumed'];
}

export function isFullyCorrupted(stage: CorruptionStage): boolean {
  return stage === 'consumed';
}

export function getAllArtifactNames(): string[] {
  return PROFILES.map((p) => p.artifactName);
}

export function formatCorruptionProfile(profile: ArtifactCorruptionProfile, currentStage: CorruptionStage = 'clean'): string {
  const stageIcon = { clean: '🟢', tempted: '🟡', influenced: '🟠', dependent: '🔴', consumed: '💀' }[currentStage];
  const stage = getStageByName(profile, currentStage);
  const lines = [`${stageIcon} **${profile.artifactName}** — ${currentStage.toUpperCase()} (${profile.corruptionType})`];
  if (stage) { lines.push(`  *${stage.description}*`); lines.push(`  ⚙️ ${stage.mechanicalEffect}`); lines.push(`  🧠 Behavior: ${stage.behavioralChange}`); }
  lines.push(`  Resist: ${profile.resistanceMethod}`);
  lines.push(`  💊 Purify: ${profile.purificationCost}`);
  return lines.join('\n');
}

export { PROFILES as CORRUPTION_PROFILES };
