// Campaign progress tracking - auto-generates session summaries from game data

export interface SessionSummary {
  sessionNumber: number;
  date: string;
  duration: number; // minutes
  xpEarned: number;
  monstersDefeated: string[];
  npcsEncountered: string[];
  locationsVisited: string[];
  keyEvents: string[];
  partyLevel: number;
}

export interface CampaignProgress {
  campaignName: string;
  startDate: string;
  sessions: SessionSummary[];
  totalXP: number;
  currentLevel: number;
  milestonesReached: string[];
}

const STORAGE_PREFIX = 'adventure:progress:';
const SESSION_START_PREFIX = 'adventure:session-start:';

function storageKey(roomId: string): string {
  return `${STORAGE_PREFIX}${roomId}`;
}

// Mark when a session starts so we can calculate duration later
export function startSession(roomId: string): void {
  try {
    localStorage.setItem(`${SESSION_START_PREFIX}${roomId}`, String(Date.now()));
  } catch { /* storage full */ }
}

// Get session start time, or null if not started
export function getSessionStartTime(roomId: string): number | null {
  try {
    const raw = localStorage.getItem(`${SESSION_START_PREFIX}${roomId}`);
    return raw ? Number(raw) : null;
  } catch {
    return null;
  }
}

// Save a completed session summary
export function endSession(roomId: string, summary: Omit<SessionSummary, 'sessionNumber' | 'date' | 'duration'>): SessionSummary {
  const progress = getCampaignProgress(roomId);
  const startTime = getSessionStartTime(roomId);
  const now = Date.now();
  const duration = startTime ? Math.round((now - startTime) / 60000) : 0;

  const session: SessionSummary = {
    sessionNumber: progress.sessions.length + 1,
    date: new Date().toISOString().split('T')[0],
    duration,
    ...summary,
  };

  progress.sessions.push(session);
  progress.totalXP = progress.sessions.reduce((sum, s) => sum + s.xpEarned, 0);
  progress.currentLevel = summary.partyLevel;

  // Track milestones based on session count and level
  if (session.sessionNumber === 1) progress.milestonesReached.push('First Session');
  if (session.sessionNumber === 5 && !progress.milestonesReached.includes('5 Sessions')) progress.milestonesReached.push('5 Sessions');
  if (session.sessionNumber === 10 && !progress.milestonesReached.includes('10 Sessions')) progress.milestonesReached.push('10 Sessions');
  if (summary.partyLevel >= 5 && !progress.milestonesReached.includes('Level 5')) progress.milestonesReached.push('Level 5');
  if (summary.partyLevel >= 10 && !progress.milestonesReached.includes('Level 10')) progress.milestonesReached.push('Level 10');
  if (summary.monstersDefeated.length >= 10 && !progress.milestonesReached.includes('10+ Monsters Defeated')) progress.milestonesReached.push('10+ Monsters Defeated');

  try {
    localStorage.setItem(storageKey(roomId), JSON.stringify(progress));
    localStorage.removeItem(`${SESSION_START_PREFIX}${roomId}`);
  } catch { /* storage full */ }

  return session;
}

// Load full campaign progress for a room
export function getCampaignProgress(roomId: string): CampaignProgress {
  try {
    const raw = localStorage.getItem(storageKey(roomId));
    if (raw) return JSON.parse(raw) as CampaignProgress;
  } catch { /* corrupt data */ }

  return {
    campaignName: '',
    startDate: new Date().toISOString().split('T')[0],
    sessions: [],
    totalXP: 0,
    currentLevel: 1,
    milestonesReached: [],
  };
}

// Auto-generate a session summary from game data
export function buildSessionSummary(opts: {
  dmHistory: string[];
  combatLog: string[];
  xpGranted: number;
  partyLevel: number;
  sceneName?: string;
}): Omit<SessionSummary, 'sessionNumber' | 'date' | 'duration'> {
  const { dmHistory, combatLog, xpGranted, partyLevel, sceneName } = opts;

  // Extract monsters defeated from combat log
  const monstersDefeated: string[] = [];
  const defeatPatterns = [/(\w[\w\s]*?) (?:is defeated|has been slain|drops to 0|falls)/gi, /defeated (\w[\w\s]*?)!/gi];
  for (const line of combatLog) {
    for (const pattern of defeatPatterns) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const name = match[1].trim();
        if (name && !monstersDefeated.includes(name)) monstersDefeated.push(name);
      }
    }
  }

  // Extract NPCs from DM history
  const npcsEncountered: string[] = [];
  const npcPattern = /(?:NPC|npc)[\s:]+(\w[\w\s]*?)(?:\s*[-:]|$)/gm;
  const dialoguePattern = /^"([^"]+)".*said\s+(\w+)/gm;
  for (const line of dmHistory) {
    npcPattern.lastIndex = 0;
    dialoguePattern.lastIndex = 0;
    let match;
    while ((match = npcPattern.exec(line)) !== null) {
      const name = match[1].trim();
      if (name && !npcsEncountered.includes(name)) npcsEncountered.push(name);
    }
  }

  // Extract key events from DM history (look for starred/emphasized text or scene descriptions)
  const keyEvents: string[] = [];
  for (const line of dmHistory) {
    // Starred lines (e.g. *The party enters the cave*) are usually key events
    if (line.startsWith('*') || line.startsWith('**') || line.includes('Combat begins') || line.includes('encounter')) {
      const cleaned = line.replace(/^\*+|\*+$/g, '').trim();
      if (cleaned.length > 10 && cleaned.length < 200 && keyEvents.length < 10) {
        keyEvents.push(cleaned);
      }
    }
  }

  // Locations from scene name
  const locationsVisited: string[] = [];
  if (sceneName && sceneName.trim()) locationsVisited.push(sceneName.trim());

  return {
    xpEarned: xpGranted,
    monstersDefeated,
    npcsEncountered,
    locationsVisited,
    keyEvents: keyEvents.slice(0, 8),
    partyLevel,
  };
}

// Format progress as a readable markdown summary
export function formatProgressMarkdown(progress: CampaignProgress): string {
  const lines: string[] = [];

  lines.push(`# ${progress.campaignName || 'Campaign'} Progress`);
  lines.push('');
  lines.push(`**Started:** ${progress.startDate}`);
  lines.push(`**Sessions:** ${progress.sessions.length}`);
  lines.push(`**Total XP:** ${progress.totalXP.toLocaleString()}`);
  lines.push(`**Current Level:** ${progress.currentLevel}`);

  if (progress.milestonesReached.length > 0) {
    lines.push('');
    lines.push('## Milestones');
    for (const m of progress.milestonesReached) {
      lines.push(`- ${m}`);
    }
  }

  lines.push('');
  lines.push('## Session History');
  lines.push('');

  for (const s of progress.sessions) {
    const durationStr = s.duration > 0 ? ` (${Math.floor(s.duration / 60)}h ${s.duration % 60}m)` : '';
    lines.push(`### Session ${s.sessionNumber} - ${s.date}${durationStr}`);
    lines.push('');
    if (s.xpEarned > 0) lines.push(`**XP Earned:** ${s.xpEarned}`);
    if (s.locationsVisited.length > 0) lines.push(`**Locations:** ${s.locationsVisited.join(', ')}`);
    if (s.monstersDefeated.length > 0) lines.push(`**Monsters Defeated:** ${s.monstersDefeated.join(', ')}`);
    if (s.npcsEncountered.length > 0) lines.push(`**NPCs:** ${s.npcsEncountered.join(', ')}`);
    if (s.keyEvents.length > 0) {
      lines.push('**Key Events:**');
      for (const e of s.keyEvents) {
        lines.push(`- ${e}`);
      }
    }
    lines.push('');
  }

  return lines.join('\n');
}

// Get a one-line summary string for display on Home page campaign cards
export function getProgressSummaryLine(roomId: string): string | null {
  const progress = getCampaignProgress(roomId);
  if (progress.sessions.length === 0) return null;
  return `Session ${progress.sessions.length} | Level ${progress.currentLevel} | ${progress.totalXP.toLocaleString()} XP`;
}
