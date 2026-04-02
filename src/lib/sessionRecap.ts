// Session recap generator — builds a structured summary from session data.
// Used for catch-up at the start of the next session.

export interface SessionRecapData {
  dmHistory: string[];
  combatLog: string[];
  sceneName: string;
  characterNames: string[];
  questsCompleted: string[];
  npcsEncountered: string[];
  goldChange: number;
  xpGained: number;
  combatCount: number;
  deathCount: number;
  sessionDurationMinutes: number;
}

export interface SessionRecap {
  title: string;
  summary: string;
  keyEvents: string[];
  combatSummary: string;
  partyStatus: string;
  cliffhanger: string;
}

export function generateRecap(data: SessionRecapData): SessionRecap {
  const title = `Session Recap — ${data.sceneName || 'Unknown Location'}`;

  // Extract key narrative moments (last 10 DM messages, filtered for substance)
  const keyEvents = data.dmHistory
    .filter((m) => m.length > 30 && !m.startsWith('*') && !m.startsWith('---'))
    .slice(-10)
    .map((m) => m.length > 120 ? m.slice(0, 117) + '...' : m);

  // Combat summary
  let totalDamage = 0;
  let totalKills = 0;
  let totalCrits = 0;
  for (const entry of data.combatLog) {
    const dmg = entry.match(/for (\d+) damage/);
    if (dmg) totalDamage += parseInt(dmg[1], 10);
    if (entry.includes('falls!') || entry.includes('defeated')) totalKills++;
    if (entry.includes('CRITICAL') || entry.includes('NAT 20')) totalCrits++;
  }

  const combatSummary = data.combatCount > 0
    ? `${data.combatCount} combat${data.combatCount > 1 ? 's' : ''} — ${totalKills} enemies defeated, ${totalDamage} total damage, ${totalCrits} critical hits.`
    : 'No combat this session.';

  // Party status
  const statusParts: string[] = [];
  if (data.xpGained > 0) statusParts.push(`+${data.xpGained} XP`);
  if (data.goldChange !== 0) statusParts.push(`${data.goldChange > 0 ? '+' : ''}${data.goldChange} gold`);
  if (data.deathCount > 0) statusParts.push(`${data.deathCount} death${data.deathCount > 1 ? 's' : ''}`);
  if (data.questsCompleted.length > 0) statusParts.push(`${data.questsCompleted.length} quest${data.questsCompleted.length > 1 ? 's' : ''} completed`);
  const partyStatus = statusParts.length > 0 ? statusParts.join(' · ') : 'No major changes.';

  // Cliffhanger (last DM narration)
  const lastNarration = data.dmHistory.filter((m) => m.length > 20).slice(-1)[0] || '';
  const cliffhanger = lastNarration
    ? `Last we left off: "${lastNarration.length > 150 ? lastNarration.slice(0, 147) + '...' : lastNarration}"`
    : 'The adventure continues...';

  // Build summary
  const summaryParts: string[] = [];
  summaryParts.push(`The party explored **${data.sceneName || 'unknown territory'}**.`);
  if (data.npcsEncountered.length > 0) summaryParts.push(`They met ${data.npcsEncountered.slice(0, 3).join(', ')}.`);
  if (data.combatCount > 0) summaryParts.push(`${data.combatCount} combat encounter${data.combatCount > 1 ? 's' : ''} tested their mettle.`);
  if (data.questsCompleted.length > 0) summaryParts.push(`Completed: ${data.questsCompleted.join(', ')}.`);
  const summary = summaryParts.join(' ');

  return { title, summary, keyEvents, combatSummary, partyStatus, cliffhanger };
}

export function formatRecap(recap: SessionRecap): string {
  const lines = [`📜 **${recap.title}**`, ''];
  lines.push(recap.summary);
  lines.push('');
  if (recap.keyEvents.length > 0) {
    lines.push('**Key Moments:**');
    for (const e of recap.keyEvents.slice(-5)) lines.push(`• ${e}`);
    lines.push('');
  }
  lines.push(`**Combat:** ${recap.combatSummary}`);
  lines.push(`**Party:** ${recap.partyStatus}`);
  lines.push('');
  lines.push(`*${recap.cliffhanger}*`);
  return lines.join('\n');
}
