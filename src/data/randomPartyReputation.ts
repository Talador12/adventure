// Random party reputation — what do the locals say about the party?
export interface PartyRep { reputation: string; source: string; effect: string; accuracy: 'accurate' | 'exaggerated' | 'completely wrong'; }
const REPS: PartyRep[] = [
  { reputation: '"They slew a dragon with their bare hands!"', source: 'A bard who embellished the story.', effect: 'People expect impossible feats. Disappointment incoming.', accuracy: 'exaggerated' },
  { reputation: '"They robbed the merchant guild blind."', source: 'A rival adventuring group spreading lies.', effect: 'Merchants are hostile. Prices increase 25%.', accuracy: 'completely wrong' },
  { reputation: '"They saved the orphanage. Good people."', source: 'The orphanage itself.', effect: 'Children wave. Adults offer free meals.', accuracy: 'accurate' },
  { reputation: '"They\'re working for the crown. Stay out of their way."', source: 'Overheard guard gossip.', effect: 'People are cautious but cooperative.', accuracy: 'exaggerated' },
  { reputation: '"They consort with demons."', source: 'A zealous priest who saw the warlock\'s patron.', effect: 'Religious NPCs are hostile. Some try to "save" party members.', accuracy: 'exaggerated' },
  { reputation: '"Never heard of them."', source: 'Nobody cares.', effect: 'Complete anonymity. Which can be useful.', accuracy: 'accurate' },
];
export function getRandomReputation(): PartyRep { return REPS[Math.floor(Math.random() * REPS.length)]; }
export function formatPartyReputation(r: PartyRep): string { return `📢 **What the locals say:** *${r.reputation}*\n📍 Source: ${r.source}\n⚡ Effect: ${r.effect}\n🎯 Accuracy: ${r.accuracy}`; }
