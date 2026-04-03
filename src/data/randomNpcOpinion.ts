// Random NPC opinion — what an NPC thinks about a topic the party asks about.
export interface NpcOpinion { topic: string; opinion: string; tone: 'positive' | 'negative' | 'neutral' | 'evasive' | 'passionate'; hiddenTruth: string; }
const OPINIONS: NpcOpinion[] = [
  { topic: 'The local lord', opinion: '"He\'s fair enough. Taxes could be lower, but whose couldn\'t?"', tone: 'neutral', hiddenTruth: 'The NPC is terrified of the lord and would never speak ill of him.' },
  { topic: 'The recent disappearances', opinion: '"Just travelers moving on. Nothing sinister."', tone: 'evasive', hiddenTruth: 'They\'ve seen something but are too afraid to talk.' },
  { topic: 'The war', opinion: '"Best thing that happened to this town. Business is booming."', tone: 'positive', hiddenTruth: 'They profit from selling supplies to both sides.' },
  { topic: 'Magic users', opinion: '"Can\'t trust \'em. Too much power, not enough accountability."', tone: 'negative', hiddenTruth: 'Their child has magical talent and they\'re hiding it.' },
  { topic: 'The adventurers\' guild', opinion: '"A bunch of glorified mercenaries. But they get results, I\'ll give them that."', tone: 'neutral', hiddenTruth: 'They applied to join and were rejected.' },
  { topic: 'The old ruins', opinion: '"Stay away. Everyone who goes there comes back... changed."', tone: 'passionate', hiddenTruth: 'They went there once. What they saw haunts them.' },
];
export function getRandomOpinion(): NpcOpinion { return OPINIONS[Math.floor(Math.random() * OPINIONS.length)]; }
export function formatNpcOpinion(o: NpcOpinion): string { return `💬 **NPC Opinion on "${o.topic}"** (${o.tone}):\n${o.opinion}\n🤫 Hidden truth: *${o.hiddenTruth}*`; }
