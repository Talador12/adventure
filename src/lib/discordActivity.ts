// Discord Activity SDK integration — detects if running inside Discord Activity iframe
// and provides hooks for voice channel integration + presence updates.
//
// When running as a Discord Activity:
// 1. The app loads inside an iframe in Discord
// 2. We can detect this via window.parent !== window + referrer check
// 3. Discord passes auth tokens via postMessage
// 4. We expose activity state for voice channel awareness
//
// Setup required (not in this file):
// - Create a Discord Application at https://discord.com/developers
// - Enable Activities, set URL mapping to your deployed domain
// - Set DISCORD_APPLICATION_ID in env

export interface DiscordActivityState {
  isActivity: boolean;       // true if running inside Discord Activity iframe
  channelId: string | null;  // voice channel ID (from Discord SDK)
  guildId: string | null;    // server ID
  instanceId: string | null; // unique activity instance
  participants: string[];    // Discord user IDs in the activity
}

let activityState: DiscordActivityState = {
  isActivity: false,
  channelId: null,
  guildId: null,
  instanceId: null,
  participants: [],
};

const listeners = new Set<(state: DiscordActivityState) => void>();

export function getActivityState(): DiscordActivityState {
  return { ...activityState };
}

export function onActivityStateChange(cb: (state: DiscordActivityState) => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function notifyListeners() {
  const snapshot = { ...activityState };
  for (const cb of listeners) cb(snapshot);
}

// Detect if we're running inside a Discord Activity iframe
export function detectDiscordActivity(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    // Discord Activities run in a nested iframe
    if (window.parent === window) return false;
    // Check URL params that Discord injects
    const params = new URLSearchParams(window.location.search);
    const frameId = params.get('frame_id');
    const instanceId = params.get('instance_id');
    const channelId = params.get('channel_id');
    const guildId = params.get('guild_id');
    if (frameId && instanceId) {
      activityState = {
        isActivity: true,
        channelId: channelId || null,
        guildId: guildId || null,
        instanceId: instanceId || null,
        participants: [],
      };
      notifyListeners();
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// Initialize Discord Activity SDK messaging
export function initDiscordActivity() {
  if (!activityState.isActivity) return;

  // Listen for messages from Discord parent frame
  window.addEventListener('message', (event) => {
    try {
      const data = event.data;
      if (!data || typeof data !== 'object') return;

      // Handle participant updates from Discord
      if (data.type === 'ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE' && Array.isArray(data.participants)) {
        activityState.participants = data.participants.map((p: { id?: string }) => p.id || '').filter(Boolean);
        notifyListeners();
      }

      // Handle auth token from Discord
      if (data.type === 'DISPATCH' && data.evt === 'READY') {
        // Discord has loaded the activity — we can now make API calls
        notifyListeners();
      }
    } catch {
      // Ignore malformed messages
    }
  });

  // Tell Discord we're ready
  window.parent.postMessage({ type: 'ACTIVITY_READY' }, '*');
}

// Update Discord Rich Presence for the activity
export function updateActivityPresence(details: string, state?: string) {
  if (!activityState.isActivity) return;
  try {
    window.parent.postMessage({
      type: 'SET_ACTIVITY',
      activity: {
        details,
        state: state || undefined,
        timestamps: { start: Date.now() },
      },
    }, '*');
  } catch {
    // Silently fail if not in activity context
  }
}

// Generate an activity invite URL for a campaign room
export function getActivityInviteUrl(roomId: string): string | null {
  if (!activityState.isActivity || !activityState.channelId) return null;
  return `https://discord.com/activities/${activityState.channelId}?room=${roomId}`;
}
