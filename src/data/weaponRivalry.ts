// Enchanted weapon rivalry system — two sentient weapons that hate each other.

export interface WeaponRival { name: string; type: string; personality: string; }
export interface RivalryConflict { trigger: string; effect: string; resolution: string; }

export interface WeaponRivalry {
  weapon1: WeaponRival;
  weapon2: WeaponRival;
  historyOfConflict: string;
  conflicts: RivalryConflict[];
  truce: string;
  ifOneDestroyed: string;
}

const RIVALRIES: WeaponRivalry[] = [
  { weapon1: { name: 'Dawnbringer', type: '+2 longsword (radiant)', personality: 'Noble, self-righteous, lectures about honor at 6 AM.' }, weapon2: { name: 'Duskfall', type: '+2 scimitar (necrotic)', personality: 'Sardonic, pragmatic, finds Dawnbringer insufferable.' }, historyOfConflict: 'Forged by rival smiths during the same war. Dawnbringer was the king\'s sword. Duskfall was the assassin\'s. They\'ve been arguing for 800 years.', conflicts: [
    { trigger: 'Both drawn simultaneously.', effect: 'Both glow aggressively. -1 to attack with either (distracted by insults). They verbally argue telepathically.', resolution: 'Sheathe one. The sheathed weapon sulks for 1 hour (won\'t grant its bonus).' },
    { trigger: 'One scores a killing blow.', effect: 'The other mocks the wielder\'s technique. "I could have done that THREE rounds ago."', resolution: 'Let the non-killing weapon make the next kill. It stops complaining.' },
    { trigger: 'A moral dilemma.', effect: 'They give opposite advice. Simultaneously. In your head. Very loudly.', resolution: 'Make a decision. The weapon whose advice you followed gains +1 for the day. The other: -1.' },
  ], truce: 'They agree on ONE thing: protecting the wielder. If the wielder is at 0 HP, both activate at full power (each grants +3 until the wielder is healed).', ifOneDestroyed: 'The surviving weapon becomes inconsolable. Loses all magical properties for 1d4 weeks. Then gains the destroyed weapon\'s element as a second damage type. It never speaks about the rival again. But it dims occasionally.' },
  { weapon1: { name: 'Whisper', type: '+1 dagger (psychic)', personality: 'Quiet, intellectual, passive-aggressive. Communicates through feelings.' }, weapon2: { name: 'SHOUT', type: '+1 warhammer (thunder)', personality: 'LOUD. ENTHUSIASTIC. NO INDOOR VOICE. EVER.' }, historyOfConflict: 'Created by the same artificer as a matched pair. They were supposed to be partners. They are not partners. They are enemies.', conflicts: [
    { trigger: 'SHOUT speaks (which is always).', effect: 'Whisper gives the wielder a migraine. -1 to Concentration checks while both are equipped.', resolution: 'SHOUT learns to use its "inside voice" (it cannot, but trying is worth +1 to CHA for the effort).' },
    { trigger: 'Stealth situation.', effect: 'SHOUT vibrates excitedly. Stealth at disadvantage. Whisper radiates contempt.', resolution: 'Leave SHOUT behind. It will somehow find you later. It always does.' },
    { trigger: 'Combat begins.', effect: 'Both try to be drawn first. DEX DC 11 or draw the wrong one.', resolution: 'Designate one as "primary" before combat. The other accepts this grudgingly.' },
  ], truce: 'Music. They both love music. A bard playing calms both weapons completely. All rivalry effects suppressed during performances.', ifOneDestroyed: 'SHOUT if Whisper dies: goes silent. Permanently. Just... stops. The silence is worse. Whisper if SHOUT dies: starts screaming. It has never made noise before. It cannot stop.' },
  { weapon1: { name: 'The Pen', type: '+1 rapier (force)', personality: 'Believes it is mightier than the sword. Will not shut up about it.' }, weapon2: { name: 'The Sword', type: '+1 greatsword (slashing)', personality: 'Believes actions speak louder than words. Speaks anyway.' }, historyOfConflict: 'A literal manifestation of the proverb. Created by a philosopher-smith to settle the debate once and for all. The debate continues.', conflicts: [
    { trigger: 'The wielder resolves something with words.', effect: 'The Pen glows smugly. The Sword\'s bonus drops to +0 for 1 hour (demoralized).', resolution: 'Use The Sword to resolve the next problem. Balance is key.' },
    { trigger: 'The wielder resolves something with violence.', effect: 'The Sword glows smugly. The Pen refuses to function for 1 hour.', resolution: 'Write something thoughtful with The Pen (it doubles as a quill). It forgives immediately.' },
    { trigger: 'Someone asks "which is better?"', effect: 'Both try to answer simultaneously. The wielder must make a CHA DC 13 save or say something contradictory.', resolution: 'Say "they\'re equally important." Both are suspicious but accept it.' },
  ], truce: 'They agree when the wielder is creative — using words AND action together. Diplomacy backed by the threat of force (or vice versa) gives both +2.', ifOneDestroyed: 'The survivor wins the debate. It feels hollow. "I never wanted to win like this." Gains +1 permanently but radiates sadness.' },
];

export function getRandomRivalry(): WeaponRivalry {
  return RIVALRIES[Math.floor(Math.random() * RIVALRIES.length)];
}

export function getRivalryCount(): number {
  return RIVALRIES.length;
}

export function getConflictCount(rivalry: WeaponRivalry): number {
  return rivalry.conflicts.length;
}

export function formatRivalry(rivalry: WeaponRivalry): string {
  const lines = [`⚔️ **${rivalry.weapon1.name} vs ${rivalry.weapon2.name}**`];
  lines.push(`  ${rivalry.weapon1.name} (${rivalry.weapon1.type}): ${rivalry.weapon1.personality}`);
  lines.push(`  ${rivalry.weapon2.name} (${rivalry.weapon2.type}): ${rivalry.weapon2.personality}`);
  lines.push(`  History: ${rivalry.historyOfConflict}`);
  lines.push(`  🕊️ Truce: ${rivalry.truce}`);
  lines.push(`  💔 If one dies: ${rivalry.ifOneDestroyed}`);
  return lines.join('\n');
}

export { RIVALRIES as WEAPON_RIVALRIES };
