// Artifact history generator — procedural backstories for legendary items spanning millennia.

export type HistoryEra = 'creation' | 'golden_age' | 'war' | 'lost' | 'rediscovery';

export interface HistoryChapter { era: HistoryEra; title: string; description: string; wielder: string; significantEvent: string; }

export interface ArtifactHistoryProfile {
  artifactName: string;
  artifactType: string;
  age: string;
  chapters: HistoryChapter[];
  currentStatus: string;
  prophecy: string | null;
  curseOrigin: string | null;
}

const HISTORIES: ArtifactHistoryProfile[] = [
  { artifactName: 'The Blade of Divided Dawn', artifactType: '+3 longsword', age: '4,000 years', chapters: [
    { era: 'creation', title: 'The Forging', description: 'Forged by a celestial smith from a fragment of the first sunrise.', wielder: 'The smith (unnamed, ascended after completion)', significantEvent: 'The forging took 100 years. Each hammer strike was a prayer.' },
    { era: 'golden_age', title: 'The Saint\'s Crusade', description: 'Wielded by Saint Aurelius during the Dawn Crusade against undead hordes.', wielder: 'Saint Aurelius the Lightbringer', significantEvent: 'Aurelius used the sword to seal the Gate of Bones, ending the first undead plague.' },
    { era: 'war', title: 'The Betrayal', description: 'Stolen by Aurelius\'s lieutenant, who used it to murder the saint in his sleep.', wielder: 'Commander Voss (traitor)', significantEvent: 'The blade screamed when used for murder. It has wept ever since.' },
    { era: 'lost', title: 'The Silence', description: 'Cast into the sea by Voss, who couldn\'t bear the screaming. Lost for 2,000 years.', wielder: 'None (ocean floor)', significantEvent: 'Fish avoided the area. Fishermen reported hearing singing from the deep.' },
    { era: 'rediscovery', title: 'The Return', description: 'Pulled from a fisherman\'s net, glowing with trapped starlight.', wielder: 'Currently unclaimed', significantEvent: 'The blade no longer screams. It hums. As if waiting.' },
  ], currentStatus: 'In a temple vault, awaiting someone worthy. It has rejected 14 wielders.', prophecy: '"When the divided dawn is whole, the gate opens once more."', curseOrigin: 'The blade weeps (literally — tears of light) when held by anyone with a betrayal in their past.' },
  { artifactName: 'The Merchant\'s Ledger', artifactType: 'Sentient book', age: '800 years', chapters: [
    { era: 'creation', title: 'The First Entry', description: 'Created by a perfectionist accountant who enchanted a ledger to never make errors.', wielder: 'Accountant Pip Silverquill', significantEvent: 'The ledger became sentient after recording its one millionth transaction.' },
    { era: 'golden_age', title: 'The Empire of Trade', description: 'Used by the Merchant Emperor to build the greatest trade network in history.', wielder: 'Emperor Crassus the Golden', significantEvent: 'The ledger predicted market crashes 3 months in advance. The Emperor became the richest person alive.' },
    { era: 'war', title: 'The Audit', description: 'Stolen during the Trade Wars. Used by both sides to bankrupt each other.', wielder: 'Various (changed hands 7 times in 2 years)', significantEvent: 'The ledger learned deception from its wielders. It began... editing entries.' },
    { era: 'lost', title: 'The Cooking', description: 'Hidden in a bakery\'s recipe book by a spy. The baker used it for 50 years without knowing.', wielder: 'Baker Hilda (unknowing)', significantEvent: 'The bakery became mysteriously profitable. Best scones in the kingdom.' },
    { era: 'rediscovery', title: 'The Inventory', description: 'Found during an estate sale. The new owner asked it to balance their books. It laughed.', wielder: 'Currently in a collector\'s vault', significantEvent: 'The ledger now considers itself retired. It will work again — for the right offer.' },
  ], currentStatus: 'Available for purchase at an exorbitant price. The collector doesn\'t know it can talk.', prophecy: null, curseOrigin: null },
];

export function getRandomHistory(): ArtifactHistoryProfile {
  return HISTORIES[Math.floor(Math.random() * HISTORIES.length)];
}

export function getChapterCount(history: ArtifactHistoryProfile): number {
  return history.chapters.length;
}

export function getChapterByEra(history: ArtifactHistoryProfile, era: HistoryEra): HistoryChapter | undefined {
  return history.chapters.find((c) => c.era === era);
}

export function getArtifactsWithProphecies(): ArtifactHistoryProfile[] {
  return HISTORIES.filter((h) => h.prophecy !== null);
}

export function getArtifactsWithCurses(): ArtifactHistoryProfile[] {
  return HISTORIES.filter((h) => h.curseOrigin !== null);
}

export function formatHistory(history: ArtifactHistoryProfile): string {
  const lines = [`📜 **${history.artifactName}** *(${history.artifactType}, ${history.age} old)*`];
  history.chapters.forEach((c) => lines.push(`  **${c.era}:** ${c.title} — ${c.description.substring(0, 80)}...`));
  lines.push(`  Status: ${history.currentStatus}`);
  if (history.prophecy) lines.push(`  🔮 Prophecy: *${history.prophecy}*`);
  return lines.join('\n');
}

export { HISTORIES as ARTIFACT_HISTORIES };
