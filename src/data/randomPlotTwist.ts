// Random plot twist generator — narrative surprises for campaign moments.
export interface PlotTwist { twist: string; impact: 'minor' | 'major' | 'campaign_changing'; category: 'betrayal' | 'revelation' | 'reversal' | 'appearance' | 'connection'; }
const TWISTS: PlotTwist[] = [
  { twist: 'The quest giver is actually the villain.', impact: 'major', category: 'betrayal' },
  { twist: 'The "monster" they\'ve been hunting is innocent and being framed.', impact: 'major', category: 'reversal' },
  { twist: 'A party member\'s backstory NPC is involved — on the wrong side.', impact: 'campaign_changing', category: 'connection' },
  { twist: 'The treasure is cursed and was bait all along.', impact: 'major', category: 'reversal' },
  { twist: 'Two NPCs who seem unrelated are actually the same person.', impact: 'minor', category: 'revelation' },
  { twist: 'The dead NPC isn\'t actually dead — they faked it.', impact: 'major', category: 'appearance' },
  { twist: 'The party has been unknowingly working for the BBEG this whole time.', impact: 'campaign_changing', category: 'betrayal' },
  { twist: 'The "safe" town is entirely populated by doppelgangers.', impact: 'major', category: 'revelation' },
  { twist: 'The mcguffin they\'ve been chasing doesn\'t do what they think.', impact: 'major', category: 'reversal' },
  { twist: 'An old ally returns — but fundamentally changed by their experiences.', impact: 'minor', category: 'appearance' },
  { twist: 'The prophecy was misinterpreted — it actually refers to one of the PCs.', impact: 'campaign_changing', category: 'revelation' },
  { twist: 'The villain\'s motivation is sympathetic — maybe even justified.', impact: 'major', category: 'revelation' },
];
export function getRandomTwist(): PlotTwist { return TWISTS[Math.floor(Math.random() * TWISTS.length)]; }
export function getTwistsByImpact(impact: PlotTwist['impact']): PlotTwist[] { return TWISTS.filter((t) => t.impact === impact); }
export function formatPlotTwist(t: PlotTwist): string { const icon = t.impact === 'campaign_changing' ? '🌋' : t.impact === 'major' ? '💥' : '🔀'; return `${icon} **Plot Twist** (${t.impact}, ${t.category}):\n*${t.twist}*`; }
