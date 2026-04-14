// Failed prophecy — prophecies that went wrong and their consequences.

export type FailureType = 'misinterpreted' | 'averted' | 'wrong_hero' | 'delayed' | 'backfired' | 'fulfilled_badly';

export interface ProphecyAftershock {
  name: string;
  description: string;
  mechanicalEffect: string;
}

export interface FailedProphecy {
  name: string;
  failureType: FailureType;
  originalProphecy: string;
  whatActuallyHappened: string;
  aftermath: ProphecyAftershock[];
  whoBlames: string;
  hookForParty: string;
  canBeFixed: boolean;
  fixMethod: string;
}

const PROPHECIES: FailedProphecy[] = [
  {
    name: 'The Chosen One Quit',
    failureType: 'wrong_hero',
    originalProphecy: '"When the stars align over Keldrath, a child born under the silver moon shall rise to defeat the Shadow King and restore light to the realm."',
    whatActuallyHappened: 'The Chosen One was identified, trained, and prepared for 20 years. On the eve of the final battle, he looked at the Shadow King\'s army, said "Absolutely not," and moved to a fishing village. He now runs a bait shop.',
    aftermath: [
      { name: 'The Unfulfilled Destiny', description: 'The prophecy\'s magical energy had nowhere to go. It is leaking into the environment.', mechanicalEffect: 'Within 10 miles of Keldrath, divination spells give contradictory results. Prophecies spoken here are always wrong.' },
      { name: 'The Shadow King Won', description: 'Without the Chosen One, darkness spread. The Shadow King rules the northern provinces.', mechanicalEffect: 'The northern region is in permanent twilight. Undead roam freely. Trade routes are severed.' },
      { name: 'Destiny Refugees', description: 'People who were part of the prophecy\'s "supporting cast" feel purposeless.', mechanicalEffect: 'The mentor, the love interest, and the comic relief sidekick are all in the fishing village, running a support group for "Narrative Casualties."' },
    ],
    whoBlames: 'Everyone blames the Chosen One. He does not care. His bait shop is doing well. He is genuinely happier.',
    hookForParty: 'The mentor from the support group hires the party to either convince the Chosen One to finish the job, or find a replacement hero. The Shadow King is not going anywhere.',
    canBeFixed: true,
    fixMethod: 'The party can either be the replacement heroes (fight the Shadow King themselves) or convince the Chosen One to return (DC 20 Persuasion - he is very committed to fishing). A third option: redirect the prophecy energy to someone new with a ritual.',
  },
  {
    name: 'The Averted Apocalypse (That Was Not)',
    failureType: 'averted',
    originalProphecy: '"On the hundredth year, the Crimson Comet shall return and burn the world to ash unless the Five Seals are opened."',
    whatActuallyHappened: 'Heroes spent a decade finding and opening the Five Seals. The Crimson Comet arrived, saw the open Seals, and was DRAWN to them. The Seals were containment, not prevention. Opening them made it worse.',
    aftermath: [
      { name: 'The Scorched Circle', description: 'Where the comet landed is a 5-mile crater of molten glass. It pulses with residual energy.', mechanicalEffect: 'The crater radiates fire damage (1d6 per round within 100 feet). At the center: a shard of the comet with immense magical power.' },
      { name: 'The Apologetic Heroes', description: 'The five heroes who opened the Seals are alive, famous, and wracked with guilt.', mechanicalEffect: 'They control significant political power and resources. They will fund any expedition that might undo the damage. They are also targets of assassination from the survivors.' },
      { name: 'Prophecy Distrust', description: 'Nobody trusts prophecies anymore. Oracles are out of work. Divination schools are closing.', mechanicalEffect: 'Divination-focused NPCs are hostile and desperate. Some have turned to fraud. Others have genuinely lost their powers from lack of faith.' },
    ],
    whoBlames: 'The five heroes blame the oracle who gave the prophecy. The oracle blames the language of prophecy being "inherently ambiguous." She has a point.',
    hookForParty: 'The comet shard in the crater is growing. Whatever the comet was, it is not dead. The five heroes need someone without a prophecy-tainted reputation to investigate.',
    canBeFixed: true,
    fixMethod: 'Re-seal the Five Seals (they are damaged but repairable). Then use the comet shard to redirect the entity back into space. The entity is alive and can be negotiated with - it did not want to hit the planet either.',
  },
  {
    name: 'The King Who Would Not Die',
    failureType: 'fulfilled_badly',
    originalProphecy: '"King Aldric shall rule for a thousand years and know no death."',
    whatActuallyHappened: 'The prophecy was fulfilled literally. King Aldric has ruled for 847 years. He cannot die. He has tried. He is 900 years old, his body is failing, his mind is sharp, and he is trapped in a decaying corpse on a throne he cannot leave.',
    aftermath: [
      { name: 'The Undying Court', description: 'The kingdom\'s entire political system is paralyzed. No succession, no reform, no change for 847 years.', mechanicalEffect: 'The kingdom is a stagnant, decaying bureaucracy. Laws from 800 years ago are still enforced. Technology has not advanced. The people are miserable.' },
      { name: 'The King\'s Agony', description: 'Aldric is in constant pain. His body should have died centuries ago. He begs every visitor to end his suffering.', mechanicalEffect: 'Being near the king requires DC 12 Wisdom save or gain the Frightened condition from his appearance and desperation. He looks like a conscious mummy.' },
      { name: 'The 153-Year Queue', description: 'Every heir, claimant, and would-be ruler has been waiting for Aldric to die. The queue is 153 years long. Factions have formed.', mechanicalEffect: '7 factions with legitimate claims to the throne. All hate each other. All have armies. The moment Aldric dies, civil war begins instantly.' },
    ],
    whoBlames: 'Aldric blames the court wizard who commissioned the prophecy as a birthday gift. The wizard has been dead for 700 years. Aldric talks to his portrait.',
    hookForParty: 'Aldric\'s current advisor secretly contacts the party. "The king wants to die. The kingdom needs him to die. But his death will start a war. Find a way to end both problems."',
    canBeFixed: true,
    fixMethod: 'The prophecy said "a thousand years." Year 1000 is 153 years away. If the party can survive the political minefield, they can prepare a peaceful succession for when the prophecy naturally expires. Or: find the original prophecy scroll and alter it (DC 20 Arcana, risk of catastrophic magical backlash).',
  },
];

export function getRandomProphecy(): FailedProphecy {
  return PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)];
}

export function getProphecyByType(type: FailureType): FailedProphecy | undefined {
  return PROPHECIES.find((p) => p.failureType === type);
}

export function getAllFailureTypes(): FailureType[] {
  return [...new Set(PROPHECIES.map((p) => p.failureType))];
}

export function getAftershockCount(prophecy: FailedProphecy): number {
  return prophecy.aftermath.length;
}

export function formatProphecy(prophecy: FailedProphecy): string {
  const lines = [`🔮 **${prophecy.name}** *(${prophecy.failureType})*`];
  lines.push(`  Prophecy: *"${prophecy.originalProphecy}"*`);
  lines.push(`  What happened: ${prophecy.whatActuallyHappened}`);
  lines.push('  **Aftermath:**');
  for (const a of prophecy.aftermath) {
    lines.push(`    - **${a.name}:** ${a.description}`);
  }
  lines.push(`  Blame: ${prophecy.whoBlames}`);
  lines.push(`  Hook: ${prophecy.hookForParty}`);
  lines.push(`  Fix: ${prophecy.fixMethod}`);
  return lines.join('\n');
}

export { PROPHECIES as FAILED_PROPHECIES };
