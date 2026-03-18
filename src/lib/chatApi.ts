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

// Check if current user is temp (no auth cookie — D1 calls will 401)
function isTempUser(): boolean {
  try {
    const s = localStorage.getItem('adventure:tempUser');
    const hasTempIdentity = !!s && JSON.parse(s)?.id?.startsWith('temp-');
    if (!hasTempIdentity) return false;
    // If a real session cookie exists, prefer persisted chat even if temp identity
    // data was left in localStorage from a prior visit.
    const hasSessionCookie = document.cookie.includes('adventure_session=');
    return !hasSessionCookie;
  } catch { return false; }
}

// Load recent chat history for a room from D1 (skips for temp users)
export async function loadChatHistory(roomId: string, limit = 100, beforeTsMs?: number): Promise<ChatMessage[]> {
  if (isTempUser()) return []; // no auth cookie — would 401
  try {
    const params = new URLSearchParams({ limit: String(limit) });
    if (typeof beforeTsMs === 'number' && beforeTsMs > 0) {
      params.set('before', new Date(beforeTsMs).toISOString());
    }
    const res = await fetch(`/api/chat/${encodeURIComponent(roomId)}?${params.toString()}`, {
      credentials: 'include',
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { messages?: Record<string, unknown>[] };
    return (data.messages || []).map(rowToMessage);
  } catch {
    return [];
  }
}

// Save a chat message to D1 (fire-and-forget, skips for temp users)
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
  if (isTempUser()) return; // no auth cookie — would 401
  fetch(`/api/chat/${encodeURIComponent(roomId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(msg),
  }).catch(() => {}); // fire-and-forget
}
