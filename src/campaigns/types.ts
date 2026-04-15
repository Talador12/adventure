// Campaign Starter Kit type definitions
// Shared types for full campaigns (multi-session) and one-shots (single-session)

export type CampaignTone =
  | 'serious'
  | 'comedic'
  | 'horror'
  | 'mystery'
  | 'heist'
  | 'political'
  | 'epic'
  | 'survival'
  | 'exploration'
  | 'social'
  | 'shenanigans';

export type CampaignTheme =
  | 'classic_fantasy'
  | 'dark_fantasy'
  | 'urban'
  | 'nautical'
  | 'planar'
  | 'underdark'
  | 'wilderness'
  | 'war'
  | 'intrigue'
  | 'dungeon_crawl'
  | 'comedy'
  | 'horror'
  | 'mystery'
  | 'heist'
  | 'survival'
  | 'meta'
  | 'exploration'
  | 'social'
  | 'epic'
  | 'political';

export type CampaignType = 'full' | 'oneshot';

export interface CampaignNPC {
  name: string;
  role: string; // "quest giver", "villain", "ally", "comic relief", etc.
  personality: string; // 1-2 sentence personality sketch
  secret?: string; // hidden motivation or twist (DM-only)
}

export interface CampaignLocation {
  name: string;
  description: string; // 1-2 sentences
  significance: string; // why it matters to the plot
}

export interface CampaignAct {
  title: string;
  summary: string; // 2-3 sentences
  keyEvents: string[]; // bullet-point events
  estimatedSessions: number; // how many sessions this act typically takes
}

export interface CampaignScene {
  title: string;
  summary: string;
  challenge: string; // combat, puzzle, social, exploration
  keyEvents: string[];
}

export interface FullCampaign {
  id: string;
  type: 'full';
  title: string;
  tagline: string; // one-line elevator pitch
  tone: CampaignTone;
  themes: CampaignTheme[];
  playerCount: { min: number; max: number };
  levelRange: { start: number; end: number };
  estimatedSessions: number;
  settingSummary: string; // 2-3 sentence setting description
  hook: string; // how the adventure begins
  twist: string; // the mid-campaign revelation
  climax: string; // how it ends (broadly)
  acts: CampaignAct[];
  keyNPCs: CampaignNPC[];
  keyLocations: CampaignLocation[];
  dataSystems: string[]; // which src/data/ systems this campaign uses
}

export interface OneShotCampaign {
  id: string;
  type: 'oneshot';
  title: string;
  tagline: string;
  tone: CampaignTone;
  themes: CampaignTheme[];
  playerCount: { min: number; max: number };
  level: number; // single level for one-shots
  estimatedHours: number;
  settingSummary: string;
  hook: string;
  twist: string;
  climax: string;
  scenes: CampaignScene[];
  keyNPCs: CampaignNPC[];
  keyLocations: CampaignLocation[];
  dataSystems: string[];
}

export type CampaignStarterKit = FullCampaign | OneShotCampaign;

export interface CampaignFilter {
  type?: CampaignType;
  tone?: CampaignTone;
  theme?: CampaignTheme;
  levelRange?: { min: number; max: number };
  playerCount?: number;
  searchTerm?: string;
}

// Format helpers
export function formatCampaignSummary(campaign: CampaignStarterKit): string {
  const lines: string[] = [];
  const icon = campaign.type === 'full' ? '\u{1F4D6}' : '\u26A1';
  lines.push(`${icon} **${campaign.title}**`);
  lines.push(`*${campaign.tagline}*`);
  lines.push('');
  lines.push(`**Tone:** ${campaign.tone} | **Themes:** ${campaign.themes.join(', ')}`);
  lines.push(
    `**Players:** ${campaign.playerCount.min}-${campaign.playerCount.max}`,
  );

  if (campaign.type === 'full') {
    lines.push(
      `**Levels:** ${campaign.levelRange.start}-${campaign.levelRange.end} | **Sessions:** ~${campaign.estimatedSessions}`,
    );
  } else {
    lines.push(
      `**Level:** ${campaign.level} | **Duration:** ~${campaign.estimatedHours}h`,
    );
  }

  lines.push('');
  lines.push(`**Setting:** ${campaign.settingSummary}`);
  lines.push('');
  lines.push(`**Hook:** ${campaign.hook}`);
  lines.push('');

  if (campaign.type === 'full') {
    lines.push('**Acts:**');
    campaign.acts.forEach((act, i) => {
      lines.push(`  ${i + 1}. ${act.title} (~${act.estimatedSessions} sessions)`);
      lines.push(`     ${act.summary}`);
    });
  } else {
    lines.push('**Scenes:**');
    campaign.scenes.forEach((scene, i) => {
      lines.push(`  ${i + 1}. ${scene.title} [${scene.challenge}]`);
      lines.push(`     ${scene.summary}`);
    });
  }

  lines.push('');
  lines.push('**Key NPCs:**');
  campaign.keyNPCs.forEach((npc) => {
    lines.push(`  - **${npc.name}** (${npc.role}): ${npc.personality}`);
  });

  lines.push('');
  lines.push('**Key Locations:**');
  campaign.keyLocations.forEach((loc) => {
    lines.push(`  - **${loc.name}**: ${loc.description}`);
  });

  lines.push('');
  lines.push(
    `**Data Systems:** ${campaign.dataSystems.length > 0 ? campaign.dataSystems.join(', ') : 'none'}`,
  );

  return lines.join('\n');
}

export function formatCampaignCard(campaign: CampaignStarterKit): string {
  const icon = campaign.type === 'full' ? '\u{1F4D6}' : '\u26A1';
  const levelStr =
    campaign.type === 'full'
      ? `Lv ${campaign.levelRange.start}-${campaign.levelRange.end}`
      : `Lv ${campaign.level}`;
  const durationStr =
    campaign.type === 'full'
      ? `~${campaign.estimatedSessions} sessions`
      : `~${campaign.estimatedHours}h`;

  return `${icon} ${campaign.title} | ${campaign.tone} | ${levelStr} | ${durationStr}\n   ${campaign.tagline}`;
}
