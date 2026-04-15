// NPC conversation memory - persists to localStorage per room.
// The server (KV) is the canonical source for NPC memory during AI calls.
// This client-side store provides a local mirror for UI display (wiki sidebar, NPC list).

export interface NPCMemoryEntry {
  npcName: string;
  interaction: string;
  sentiment: 'friendly' | 'neutral' | 'hostile' | 'fearful';
  timestamp: number;
}

export interface NPCMemory {
  entries: NPCMemoryEntry[];
}

function storageKey(roomId: string): string {
  return `adventure:npc-memory:${roomId}`;
}

function loadMemory(roomId: string): NPCMemory {
  try {
    const raw = localStorage.getItem(storageKey(roomId));
    if (raw) return JSON.parse(raw) as NPCMemory;
  } catch { /* corrupted data, start fresh */ }
  return { entries: [] };
}

function saveMemory(roomId: string, memory: NPCMemory): void {
  try {
    localStorage.setItem(storageKey(roomId), JSON.stringify(memory));
  } catch { /* storage full or unavailable */ }
}

export function addNPCInteraction(
  roomId: string,
  npcName: string,
  interaction: string,
  sentiment: NPCMemoryEntry['sentiment'] = 'neutral'
): void {
  const memory = loadMemory(roomId);
  memory.entries.push({
    npcName,
    interaction,
    sentiment,
    timestamp: Date.now(),
  });
  // Cap at 200 entries per room to avoid bloating localStorage
  if (memory.entries.length > 200) {
    memory.entries = memory.entries.slice(-200);
  }
  saveMemory(roomId, memory);
}

export function getNPCMemory(roomId: string, npcName: string): NPCMemoryEntry[] {
  const memory = loadMemory(roomId);
  return memory.entries.filter(
    (e) => e.npcName.toLowerCase() === npcName.toLowerCase()
  );
}

export function getAllNPCNames(roomId: string): string[] {
  const memory = loadMemory(roomId);
  const seen = new Set<string>();
  const names: string[] = [];
  for (const e of memory.entries) {
    const key = e.npcName.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      names.push(e.npcName);
    }
  }
  return names;
}

export function formatNPCContext(roomId: string, npcName: string): string {
  const entries = getNPCMemory(roomId, npcName);
  if (entries.length === 0) return '';
  const lines = entries.slice(-8).map((e) => {
    const time = new Date(e.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    return `[${time}] (${e.sentiment}) ${e.interaction}`;
  });
  return `Previous interactions with ${npcName}:\n${lines.join('\n')}`;
}

// Infer sentiment from NPC dialogue text (simple heuristic)
export function inferSentiment(dialogue: string): NPCMemoryEntry['sentiment'] {
  const lower = dialogue.toLowerCase();
  if (/threat|kill|destroy|attack|fool|die|curse/.test(lower)) return 'hostile';
  if (/friend|thank|welcome|glad|pleased|help|trust/.test(lower)) return 'friendly';
  if (/afraid|scared|flee|run|mercy|please.*no|trembl/.test(lower)) return 'fearful';
  return 'neutral';
}

export function getAllMemory(roomId: string): NPCMemory {
  return loadMemory(roomId);
}
