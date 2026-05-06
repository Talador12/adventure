// DM screen panel preferences — keep layout custom without coupling tests to React.

export const DM_SCREEN_PANEL_IDS = ['initiative', 'party', 'enemies', 'currentTurn', 'dice', 'reference', 'notes'] as const;

export type DMScreenPanelId = typeof DM_SCREEN_PANEL_IDS[number];

export const DEFAULT_DM_SCREEN_PANELS: DMScreenPanelId[] = ['initiative', 'party', 'enemies', 'currentTurn', 'dice'];

export const DM_SCREEN_PANEL_LABELS: Record<DMScreenPanelId, string> = {
  initiative: 'Initiative',
  party: 'Party',
  enemies: 'Enemies',
  currentTurn: 'Current Turn',
  dice: 'Dice Tray',
  reference: 'Rules Reference',
  notes: 'DM Notes',
};

export function normalizeDmScreenPanels(raw: unknown): DMScreenPanelId[] {
  if (!Array.isArray(raw)) return [...DEFAULT_DM_SCREEN_PANELS];
  const valid = new Set<DMScreenPanelId>(DM_SCREEN_PANEL_IDS);
  const seen = new Set<DMScreenPanelId>();
  const panels: DMScreenPanelId[] = [];

  for (const item of raw) {
    if (!valid.has(item as DMScreenPanelId)) continue;
    const panel = item as DMScreenPanelId;
    if (seen.has(panel)) continue;
    seen.add(panel);
    panels.push(panel);
  }

  return panels.length > 0 ? panels : [...DEFAULT_DM_SCREEN_PANELS];
}

export function toggleDmScreenPanel(panels: DMScreenPanelId[], panel: DMScreenPanelId): DMScreenPanelId[] {
  if (panels.includes(panel)) {
    const next = panels.filter((p) => p !== panel);
    return next.length > 0 ? next : panels;
  }
  return normalizeDmScreenPanels([...panels, panel]);
}
