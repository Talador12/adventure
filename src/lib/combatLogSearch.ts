// Combat log search — full-text search through combat log with filtering.
// Supports keyword search, type filters, and character name filtering.

export type LogEntryType = 'damage' | 'kill' | 'heal' | 'crit' | 'miss' | 'spell' | 'condition' | 'other';

export interface SearchResult {
  index: number;
  entry: string;
  type: LogEntryType;
  highlights: string[];
}

export function classifyLogEntry(entry: string): LogEntryType {
  if (entry.includes('CRITICAL') || entry.includes('NAT 20')) return 'crit';
  if (entry.includes('falls!') || entry.includes('defeated') || entry.includes('slain')) return 'kill';
  if (entry.match(/heals?\s/i)) return 'heal';
  if (entry.includes('misses') || entry.includes('NAT 1')) return 'miss';
  if (entry.includes('casts') || entry.includes('Cast:')) return 'spell';
  if (entry.match(/for \d+ damage/)) return 'damage';
  if (entry.includes('condition') || entry.includes('poisoned') || entry.includes('stunned') || entry.includes('frightened')) return 'condition';
  return 'other';
}

export function searchCombatLog(
  log: string[],
  query: string,
  typeFilter?: LogEntryType,
  characterFilter?: string,
): SearchResult[] {
  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();

  for (let i = 0; i < log.length; i++) {
    const entry = log[i];
    const type = classifyLogEntry(entry);

    // Type filter
    if (typeFilter && type !== typeFilter) continue;

    // Character filter
    if (characterFilter && !entry.toLowerCase().includes(characterFilter.toLowerCase())) continue;

    // Query match
    if (query && !entry.toLowerCase().includes(queryLower)) continue;

    // Find highlights
    const highlights: string[] = [];
    if (query) {
      const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      let match;
      while ((match = regex.exec(entry)) !== null) highlights.push(match[0]);
    }

    results.push({ index: i, entry, type, highlights });
  }

  return results;
}

export function getLogStats(log: string[]): Record<LogEntryType, number> {
  const stats: Record<LogEntryType, number> = { damage: 0, kill: 0, heal: 0, crit: 0, miss: 0, spell: 0, condition: 0, other: 0 };
  for (const entry of log) stats[classifyLogEntry(entry)]++;
  return stats;
}

export function formatSearchResults(results: SearchResult[], query: string): string {
  if (results.length === 0) return `🔍 No results for "${query}".`;
  const lines = [`🔍 **Search: "${query}"** (${results.length} results):`];
  for (const r of results.slice(0, 15)) {
    const typeEmoji = r.type === 'damage' ? '⚔️' : r.type === 'kill' ? '💀' : r.type === 'heal' ? '💚' : r.type === 'crit' ? '🎯' : r.type === 'miss' ? '❌' : r.type === 'spell' ? '✨' : '📋';
    lines.push(`${typeEmoji} [${r.index}] ${r.entry.length > 100 ? r.entry.slice(0, 97) + '...' : r.entry}`);
  }
  if (results.length > 15) lines.push(`... and ${results.length - 15} more`);
  return lines.join('\n');
}
