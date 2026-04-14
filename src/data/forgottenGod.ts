// Forgotten god — deities losing power as worship fades, desperate for relevance.

export type DivineDomain = 'nature' | 'war' | 'knowledge' | 'death' | 'trickery' | 'light';
export type FadeStage = 'diminishing' | 'fading' | 'nearly_gone' | 'echo';

export interface ForgottenGod {
  name: string;
  domain: DivineDomain;
  fadeStage: FadeStage;
  formerGlory: string;
  currentState: string;
  personality: string;
  lastWorshipper: string;
  desperateRequest: string;
  whatTheyOffer: string;
  ifIgnored: string;
  ifHelped: string;
  moralComplication: string;
}

const GODS: ForgottenGod[] = [
  {
    name: 'Solmara, the Dawnkeeper',
    domain: 'light',
    fadeStage: 'fading',
    formerGlory: 'Once the primary sun goddess of the eastern continent. Temples in every city. A thousand priests. She held the sun in place during an eclipse that lasted a month. Everyone knew her name.',
    currentState: 'A flickering candle-flame in an abandoned temple. She can barely manifest as a translucent woman made of dying light. Her voice is a whisper. She warms a 5-foot radius.',
    personality: 'Dignified despite everything. Refuses to beg. Speaks formally. Still tries to light the path for anyone who enters her ruined temple. Cannot accept that people stopped needing her.',
    lastWorshipper: 'An elderly blind woman named Hessa who lights a candle for Solmara every morning out of habit. She does not know she is the only reason the goddess still exists.',
    desperateRequest: 'Convince 10 people to say her name in prayer. Not grand temples. Not sacrifices. Just... remember her. That is enough to stabilize her for another century.',
    whatTheyOffer: 'Daylight spell at will for the party. A blessing that prevents magical darkness within 30 feet of the blessed individual. Knowledge of every sunrise since the beginning of time.',
    ifIgnored: 'She fades completely within 1 year. The sun still rises - it always did without her. But sunrises feel colder somehow. Hessa dies and nobody lights a candle.',
    ifHelped: 'She stabilizes as a minor deity. Not her former glory, but alive. She becomes a patron available to warlocks and clerics. Her temple rebuilds itself overnight. Hessa can see again.',
    moralComplication: 'The current sun god, Pyranthos, deliberately caused Solmara\'s decline by absorbing her worship. Helping Solmara means challenging an active, powerful deity who will notice.',
  },
  {
    name: 'Grolk the Undying',
    domain: 'war',
    fadeStage: 'nearly_gone',
    formerGlory: 'The orcish god of honorable combat. Every warrior prayed to Grolk before battle. He did not grant victory - he granted courage. His blessing was simple: "Stand up one more time."',
    currentState: 'A scarred, translucent orc sitting on a broken throne in a collapsed temple. His weapon has rusted. He cannot stand. He watches the world through a crack in the rubble.',
    personality: 'Blunt, honest, exhausted. No self-pity. He knows why he was forgotten: wars became political, not personal. Honor left the battlefield. He does not blame mortals. He blames himself for not adapting.',
    lastWorshipper: 'A retired orc gladiator named Krush who still salutes Grolk\'s name before every meal. Krush thinks it is a cultural tradition. He does not know it is literally keeping a god alive.',
    desperateRequest: 'Fight an honorable duel in his name. Win or lose does not matter. What matters is that someone fights with honor, publicly, and dedicates it to Grolk.',
    whatTheyOffer: 'A permanent +1 to initiative. The ability to stand up from prone as a free action. Once per long rest: when reduced to 0 HP, drop to 1 HP instead.',
    ifIgnored: 'He fades. The concept of honorable combat does not die - it was never his exclusively. But something ineffable leaves the world. Fights feel meaner.',
    ifHelped: 'He returns as a minor war god. Orc tribes begin honoring him again. His blessing spreads: warriors across the world feel braver. Krush wins his final gladiator match at age 67.',
    moralComplication: 'The current dominant war god, Bane, considers all competing war deities a threat. Reviving Grolk puts a target on the party from Bane\'s clerics.',
  },
  {
    name: 'Whisper',
    domain: 'knowledge',
    fadeStage: 'echo',
    formerGlory: 'The goddess of secrets and whispered truths. Every spy, scholar, and confessor prayed to her. She knew everything said in confidence. Libraries were her temples.',
    currentState: 'A voice with no body. She exists as a faint echo in old libraries. If you press your ear to the oldest book in any collection, you might hear her breathing.',
    personality: 'Still curious. Still listening. Cannot speak above a whisper. Finds the party by hiding in a book they are reading. Communicates through rearranging text on pages.',
    lastWorshipper: 'Nobody. Her last worshipper died 40 years ago. Whisper persists because secrets still exist - they are a natural force, and she is bonded to the concept. But without worship, she is just an echo.',
    desperateRequest: 'Tell her a secret nobody else knows. A real one. The secret sustains her the way prayer sustains other gods. She needs 7 secrets from 7 different people.',
    whatTheyOffer: 'She shares one secret in exchange for each secret given. Her secrets are always true, always useful, and always dangerous to know.',
    ifIgnored: 'She becomes ambient noise in old libraries. Scholars feel watched. Secrets feel heavier. The concept of confidentiality weakens - people become slightly worse at keeping secrets.',
    ifHelped: 'She returns as the patron of spies and librarians. Every library gains a faint protective presence. Secrets whispered near books are kept safe.',
    moralComplication: 'One of the 7 secrets she offers in return will destroy a friendship, end a marriage, or topple a government. She does not choose which. Truth is neutral.',
  },
];

export function getRandomGod(): ForgottenGod {
  return GODS[Math.floor(Math.random() * GODS.length)];
}

export function getGodByDomain(domain: DivineDomain): ForgottenGod | undefined {
  return GODS.find((g) => g.domain === domain);
}

export function getAllDomains(): DivineDomain[] {
  return [...new Set(GODS.map((g) => g.domain))];
}

export function getGodsByFadeStage(stage: FadeStage): ForgottenGod[] {
  return GODS.filter((g) => g.fadeStage === stage);
}

export function formatGod(god: ForgottenGod): string {
  const lines = [`✨ **${god.name}** *(${god.domain}, ${god.fadeStage})*`];
  lines.push(`  Former glory: ${god.formerGlory}`);
  lines.push(`  Current state: ${god.currentState}`);
  lines.push(`  Personality: ${god.personality}`);
  lines.push(`  Last worshipper: ${god.lastWorshipper}`);
  lines.push(`  Request: ${god.desperateRequest}`);
  lines.push(`  Offers: ${god.whatTheyOffer}`);
  lines.push(`  If ignored: ${god.ifIgnored}`);
  lines.push(`  If helped: ${god.ifHelped}`);
  lines.push(`  Complication: ${god.moralComplication}`);
  return lines.join('\n');
}

export { GODS as FORGOTTEN_GODS };
