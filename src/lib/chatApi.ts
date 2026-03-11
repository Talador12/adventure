// Chat persistence API — load/save chat messages from D1 via Worker endpoints.
// Fire-and-forget writes keep UI snappy; reads happen on mount for history.

import type { ChatMessage } from '../components/chat/ChatPanel';

// Convert D1 row to ChatMessage. D1 stores unix epoch seconds; frontend uses ms.
function rowToMessage(row: Record<string, unknown>): ChatMessage {
  const meta = row.metadata as Record<string, unknown> | null;
  return {
    id: row.id as string,
    type: (row.type as ChatMessage['type']) || 'chat',
    playerId: (row.user_id as string) || undefined,
    username: row.username as string,
    text: row.text as string,
    timestamp: ((row.created_at as number) || 0) * 1000, // seconds -> ms
    avatar: (row.avatar_url as string) || undefined,
    die: meta?.die as string | undefined,
    sides: meta?.sides as number | undefined,
    value: meta?.value as number | undefined,
    isCritical: meta?.isCritical as boolean | undefined,
    isFumble: meta?.isFumble as boolean | undefined,
    unitName: meta?.unitName as string | undefined,
    characterName: meta?.characterName as string | undefined,
  };
}

// Load recent chat history for a room from D1
export async function loadChatHistory(roomId: string, limit = 100): Promise<ChatMessage[]> {
  try {
    const res = await fetch(`/api/chat/${encodeURIComponent(roomId)}?limit=${limit}`, {
      credentials: 'include',
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { messages?: Record<string, unknown>[] };
    return (data.messages || []).map(rowToMessage);
  } catch {
    return [];
  }
}

// Save a chat message to D1 (fire-and-forget — errors are silently ignored)
export function persistChatMessage(
  roomId: string,
  msg: {
    username: string;
    type?: string;
    text: string;
    avatarUrl?: string;
    metadata?: Record<string, unknown>;
  }
): void {
  fetch(`/api/chat/${encodeURIComponent(roomId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(msg),
  }).catch(() => {}); // fire-and-forget
}
