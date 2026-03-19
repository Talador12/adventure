// Character export — zero deps, all string templates + Blob downloads
// Supports: JSON, Markdown, Foundry VTT (dnd5e), Fantasy Grounds (5e XML), printable HTML

import type { Character, CharacterClass } from '../contexts/GameContext';

// Hit die by class — duplicated here to avoid circular dep with CharacterCreate
const CLASS_HIT_DIE: Record<CharacterClass, number> = {
  Fighter: 10, Barbarian: 12, Paladin: 10, Ranger: 10,
  Rogue: 8, Monk: 8, Cleric: 8, Bard: 8, Druid: 8, Warlock: 8,
  Wizard: 6, Sorcerer: 6,
};

function mod(stat: number): number {
  return Math.floor((stat - 10) / 2);
}

function modStr(stat: number): string {
  const m = mod(stat);
  return m >= 0 ? `+${m}` : `${m}`;
}

function profBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

// -- File download helper --
function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// -- Clipboard helper --
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
//  JSON — Adventure native format (reimportable)
// ============================================================================
export function exportJSON(char: Character) {
  const clean = { ...char };
  delete (clean as Record<string, unknown>).portrait; // strip base64 to keep file small
  const json = JSON.stringify(clean, null, 2);
  downloadFile(`${char.name.replace(/\s+/g, '_')}.adventure.json`, json, 'application/json');
}

// ============================================================================
//  JSON Import — validate and parse Adventure JSON format
// ============================================================================
const REQUIRED_CHAR_FIELDS = ['name', 'race', 'class', 'level', 'stats', 'hp', 'maxHp', 'ac'] as const;

export function validateCharacterJSON(data: unknown): { valid: boolean; character?: Character; errors: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') return { valid: false, errors: ['Not a valid JSON object'] };
  const obj = data as Record<string, unknown>;

  // Check required fields
  for (const field of REQUIRED_CHAR_FIELDS) {
    if (obj[field] === undefined) errors.push(`Missing required field: ${field}`);
  }
  if (errors.length > 0) return { valid: false, errors };

  // Validate types
  if (typeof obj.name !== 'string' || !obj.name.trim()) errors.push('name must be a non-empty string');
  if (typeof obj.race !== 'string') errors.push('race must be a string');
  if (typeof obj.class !== 'string') errors.push('class must be a string');
  if (typeof obj.level !== 'number' || obj.level < 1 || obj.level > 20) errors.push('level must be 1-20');
  if (typeof obj.hp !== 'number') errors.push('hp must be a number');
  if (typeof obj.maxHp !== 'number') errors.push('maxHp must be a number');
  if (typeof obj.ac !== 'number') errors.push('ac must be a number');
  if (typeof obj.stats !== 'object' || !obj.stats) {
    errors.push('stats must be an object with STR/DEX/CON/INT/WIS/CHA');
  } else {
    const stats = obj.stats as Record<string, unknown>;
    for (const s of ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']) {
      if (typeof stats[s] !== 'number') errors.push(`stats.${s} must be a number`);
    }
  }
  if (errors.length > 0) return { valid: false, errors };

  // Build character with defaults for optional fields
  const char: Character = {
    id: (obj.id as string) || crypto.randomUUID(),
    name: (obj.name as string).trim(),
    race: obj.race as Character['race'],
    class: obj.class as Character['class'],
    level: obj.level as number,
    xp: (obj.xp as number) ?? 0,
    stats: obj.stats as Character['stats'],
    hp: obj.hp as number,
    maxHp: obj.maxHp as number,
    ac: obj.ac as number,
    deathSaves: (obj.deathSaves as Character['deathSaves']) ?? { successes: 0, failures: 0 },
    condition: (obj.condition as Character['condition']) ?? 'normal',
    portrait: obj.portrait as string | undefined,
    appearance: (obj.appearance as Character['appearance']) ?? { bodyType: 1, skinTone: 0, hairColor: 0, eyeColor: 0, hairStyle: 'short', scar: 'none', faceMarking: 'none', facialHair: 'none' },
    background: (obj.background as Character['background']) ?? 'Folk Hero',
    alignment: (obj.alignment as Character['alignment']) ?? 'True Neutral',
    personalityTraits: (obj.personalityTraits as string) ?? '',
    ideals: (obj.ideals as string) ?? '',
    bonds: (obj.bonds as string) ?? '',
    flaws: (obj.flaws as string) ?? '',
    backstory: (obj.backstory as string) ?? '',
    appearanceDescription: obj.appearanceDescription as string | undefined,
    playerId: (obj.playerId as string) ?? '',
    gold: (obj.gold as number) ?? 0,
    inventory: (obj.inventory as Character['inventory']) ?? [],
    equipment: (obj.equipment as Character['equipment']) ?? { weapon: null, armor: null, shield: null, ring: null },
    spellSlotsUsed: (obj.spellSlotsUsed as Record<number, number>) ?? {},
    classAbilityUsed: (obj.classAbilityUsed as boolean) ?? false,
    feats: (obj.feats as string[]) ?? [],
    asiChoicesMade: (obj.asiChoicesMade as number) ?? 0,
    hitDiceRemaining: (obj.hitDiceRemaining as number) ?? (obj.level as number),
    inspiration: (obj.inspiration as boolean) ?? false,
    exhaustion: (obj.exhaustion as number) ?? 0,
    createdAt: (obj.createdAt as number) ?? Date.now(),
  };

  return { valid: true, character: char, errors: [] };
}

export function importJSONFile(): Promise<{ character?: Character; errors: string[]; warnings?: string[] }> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.adventure.json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) { resolve({ errors: ['No file selected'] }); return; }
      try {
        const text = await file.text();
        const data = JSON.parse(text);

        // Auto-detect D&D Beyond format (has classes array or data.character wrapper)
        const isDDB = Array.isArray((data as Record<string, unknown>).classes)
          || (data?.data && typeof data.data === 'object' && (data.data as Record<string, unknown>).character);
        if (isDDB) {
          const { parseDDBCharacter } = await import('./ddbImport');
          const result = parseDDBCharacter(data, '');
          resolve({ character: result.character, errors: [], warnings: result.warnings });
          return;
        }

        // Auto-detect Foundry VTT actor format (type='character' + system.abilities)
        const { isFoundryActor, parseFoundryActor } = await import('./foundryImport');
        if (isFoundryActor(data as Record<string, unknown>)) {
          const result = parseFoundryActor(data as Record<string, unknown>, '');
          resolve({ character: result.character, errors: [], warnings: result.warnings });
          return;
        }

        // Native Adventure format
        const result = validateCharacterJSON(data);
        resolve(result.valid ? { character: result.character, errors: [] } : { errors: result.errors });
      } catch (e) {
        resolve({ errors: [`Failed to parse JSON: ${e instanceof Error ? e.message : 'Unknown error'}`] });
      }
    };
    input.click();
  });
}

// ============================================================================
//  Markdown — universal clipboard-friendly format
// ============================================================================
export function exportMarkdown(char: Character): string {
  const hitDie = CLASS_HIT_DIE[char.class];
  const pb = profBonus(char.level);
  const lines = [
    `# ${char.name}`,
    `**Level ${char.level} ${char.race} ${char.class}** | ${char.background} | ${char.alignment}`,
    ``,
    `## Ability Scores`,
    `| STR | DEX | CON | INT | WIS | CHA |`,
    `|-----|-----|-----|-----|-----|-----|`,
    `| ${char.stats.STR} (${modStr(char.stats.STR)}) | ${char.stats.DEX} (${modStr(char.stats.DEX)}) | ${char.stats.CON} (${modStr(char.stats.CON)}) | ${char.stats.INT} (${modStr(char.stats.INT)}) | ${char.stats.WIS} (${modStr(char.stats.WIS)}) | ${char.stats.CHA} (${modStr(char.stats.CHA)}) |`,
    ``,
    `## Combat`,
    `- **HP:** ${char.hp}/${char.maxHp} | **AC:** ${char.ac} | **Hit Die:** d${hitDie}`,
    `- **Proficiency Bonus:** +${pb}`,
    `- **Initiative:** ${modStr(char.stats.DEX)}`,
    `- **Speed:** 30 ft.`,
    ``,
    `## Personality`,
  ];
  if (char.personalityTraits) lines.push(`**Personality Traits:** ${char.personalityTraits}`);
  if (char.ideals) lines.push(`**Ideals:** ${char.ideals}`);
  if (char.bonds) lines.push(`**Bonds:** ${char.bonds}`);
  if (char.flaws) lines.push(`**Flaws:** ${char.flaws}`);
  if (char.appearanceDescription) {
    lines.push(``, `## Appearance`, char.appearanceDescription);
  }
  if (char.backstory) {
    lines.push(``, `## Backstory`, char.backstory);
  }
  lines.push(``, `---`, `*Exported from Adventure — ${new Date().toLocaleDateString()}*`);
  return lines.join('\n');
}

export function downloadMarkdown(char: Character) {
  const md = exportMarkdown(char);
  downloadFile(`${char.name.replace(/\s+/g, '_')}.md`, md, 'text/markdown');
}

export async function copyMarkdown(char: Character): Promise<boolean> {
  return copyToClipboard(exportMarkdown(char));
}

// ============================================================================
//  Foundry VTT — dnd5e system actor JSON (importable via Foundry)
// ============================================================================
export function exportFoundryVTT(char: Character) {
  const hitDie = CLASS_HIT_DIE[char.class];
  const pb = profBonus(char.level);

  // Foundry dnd5e actor schema (simplified — covers the import fields)
  const actor = {
    name: char.name,
    type: 'character',
    system: {
      abilities: {
        str: { value: char.stats.STR },
        dex: { value: char.stats.DEX },
        con: { value: char.stats.CON },
        int: { value: char.stats.INT },
        wis: { value: char.stats.WIS },
        cha: { value: char.stats.CHA },
      },
      attributes: {
        ac: { flat: char.ac, calc: 'flat' },
        hp: { value: char.hp, max: char.maxHp, formula: `1d${hitDie} + ${mod(char.stats.CON)}` },
        init: { ability: 'dex' },
        death: { success: char.deathSaves.successes, failure: char.deathSaves.failures },
        prof: pb,
      },
      details: {
        level: char.level,
        xp: { value: char.xp },
        race: char.race,
        background: char.background,
        alignment: char.alignment,
        biography: {
          value: [
            char.backstory && `<h3>Backstory</h3><p>${char.backstory.replace(/\n/g, '</p><p>')}</p>`,
            char.personalityTraits && `<h3>Personality</h3><p>${char.personalityTraits}</p>`,
            char.ideals && `<p><strong>Ideals:</strong> ${char.ideals}</p>`,
            char.bonds && `<p><strong>Bonds:</strong> ${char.bonds}</p>`,
            char.flaws && `<p><strong>Flaws:</strong> ${char.flaws}</p>`,
            char.appearanceDescription && `<h3>Appearance</h3><p>${char.appearanceDescription}</p>`,
          ].filter(Boolean).join('\n'),
        },
      },
      currency: { gp: char.gold },
      traits: {
        size: ['Halfling', 'Gnome'].includes(char.race) ? 'sm' : 'med',
      },
    },
    items: [
      {
        name: char.class,
        type: 'class',
        system: {
          levels: char.level,
          hitDice: `d${hitDie}`,
          hitDiceUsed: 0,
        },
      },
      {
        name: char.background,
        type: 'background',
      },
    ],
    flags: { adventure: { sourceId: char.id, exportedAt: new Date().toISOString() } },
  };

  const json = JSON.stringify(actor, null, 2);
  downloadFile(`${char.name.replace(/\s+/g, '_')}.foundry.json`, json, 'application/json');
}

// ============================================================================
//  Fantasy Grounds — 5e XML character format
// ============================================================================
function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function exportFantasyGrounds(char: Character) {
  const hitDie = CLASS_HIT_DIE[char.class];
  const pb = profBonus(char.level);
  const bio = [char.backstory, char.personalityTraits, char.ideals, char.bonds, char.flaws, char.appearanceDescription].filter(Boolean).join('\n\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root version="4.5" dataversion="20230101">
  <character>
    <name type="string">${xmlEscape(char.name)}</name>
    <race type="string">${xmlEscape(char.race)}</race>
    <classes>
      <class>
        <name type="string">${xmlEscape(char.class)}</name>
        <level type="number">${char.level}</level>
        <hddie type="string">d${hitDie}</hddie>
      </class>
    </classes>
    <level type="number">${char.level}</level>
    <exp type="number">${char.xp}</exp>
    <background type="string">${xmlEscape(char.background)}</background>
    <alignment type="string">${xmlEscape(char.alignment)}</alignment>
    <profbonus type="number">${pb}</profbonus>
    <abilities>
      <strength><score type="number">${char.stats.STR}</score><bonus type="number">${mod(char.stats.STR)}</bonus></strength>
      <dexterity><score type="number">${char.stats.DEX}</score><bonus type="number">${mod(char.stats.DEX)}</bonus></dexterity>
      <constitution><score type="number">${char.stats.CON}</score><bonus type="number">${mod(char.stats.CON)}</bonus></constitution>
      <intelligence><score type="number">${char.stats.INT}</score><bonus type="number">${mod(char.stats.INT)}</bonus></intelligence>
      <wisdom><score type="number">${char.stats.WIS}</score><bonus type="number">${mod(char.stats.WIS)}</bonus></wisdom>
      <charisma><score type="number">${char.stats.CHA}</score><bonus type="number">${mod(char.stats.CHA)}</bonus></charisma>
    </abilities>
    <hp type="number">${char.hp}</hp>
    <hpmax type="number">${char.maxHp}</hpmax>
    <ac type="number">${char.ac}</ac>
    <initiative type="number">${mod(char.stats.DEX)}</initiative>
    <speed type="string">30 ft.</speed>
    <coins>
      <gp type="number">${char.gold}</gp>
    </coins>
    <personalitytraits type="string">${xmlEscape(char.personalityTraits)}</personalitytraits>
    <ideals type="string">${xmlEscape(char.ideals)}</ideals>
    <bonds type="string">${xmlEscape(char.bonds)}</bonds>
    <flaws type="string">${xmlEscape(char.flaws)}</flaws>
    <backstory type="formattedtext">${xmlEscape(bio)}</backstory>
  </character>
</root>`;

  downloadFile(`${char.name.replace(/\s+/g, '_')}.fantasy_grounds.xml`, xml, 'application/xml');
}

// ============================================================================
//  Printable HTML character sheet — opens in new tab, user prints to PDF
// ============================================================================
export function exportPrintableHTML(char: Character) {
  const hitDie = CLASS_HIT_DIE[char.class];
  const pb = profBonus(char.level);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${char.name} — Character Sheet</title>
<style>
  @page { margin: 0.5in; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; color: #1a1a1a; max-width: 800px; margin: 0 auto; padding: 24px; line-height: 1.4; }
  h1 { font-size: 28px; border-bottom: 3px solid #1a1a1a; padding-bottom: 4px; margin-bottom: 2px; }
  .subtitle { font-size: 14px; color: #666; margin-bottom: 16px; }
  .grid { display: grid; gap: 12px; margin-bottom: 16px; }
  .grid-6 { grid-template-columns: repeat(6, 1fr); }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-2 { grid-template-columns: 1fr 1fr; }
  .stat-box { border: 2px solid #333; border-radius: 8px; text-align: center; padding: 8px 4px; }
  .stat-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #666; }
  .stat-score { font-size: 28px; font-weight: 800; }
  .stat-mod { font-size: 14px; color: #555; }
  .combat-box { border: 2px solid #333; border-radius: 8px; text-align: center; padding: 12px 8px; }
  .combat-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #666; }
  .combat-value { font-size: 24px; font-weight: 800; }
  section { margin-bottom: 16px; }
  section h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #888; border-bottom: 1px solid #ddd; padding-bottom: 3px; margin-bottom: 8px; }
  .field { margin-bottom: 8px; }
  .field-label { font-weight: 700; font-size: 11px; text-transform: uppercase; color: #666; }
  .field-value { font-size: 13px; margin-top: 2px; }
  .backstory { font-size: 13px; white-space: pre-wrap; line-height: 1.6; }
  .footer { margin-top: 24px; border-top: 1px solid #ddd; padding-top: 8px; font-size: 10px; color: #aaa; text-align: center; }
  @media print { body { padding: 0; } .no-print { display: none; } }
</style>
</head>
<body>
<h1>${char.name}</h1>
<div class="subtitle">Level ${char.level} ${char.race} ${char.class} &bull; ${char.background} &bull; ${char.alignment}</div>

<div class="grid grid-6">
  ${(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const).map(s => `
  <div class="stat-box">
    <div class="stat-label">${s}</div>
    <div class="stat-score">${char.stats[s]}</div>
    <div class="stat-mod">${modStr(char.stats[s])}</div>
  </div>`).join('')}
</div>

<div class="grid grid-3" style="max-width: 400px;">
  <div class="combat-box"><div class="combat-label">HP</div><div class="combat-value">${char.hp}/${char.maxHp}</div></div>
  <div class="combat-box"><div class="combat-label">AC</div><div class="combat-value">${char.ac}</div></div>
  <div class="combat-box"><div class="combat-label">Initiative</div><div class="combat-value">${modStr(char.stats.DEX)}</div></div>
</div>

<div class="grid grid-3" style="max-width: 400px; margin-bottom: 16px;">
  <div class="combat-box"><div class="combat-label">Hit Die</div><div class="combat-value">d${hitDie}</div></div>
  <div class="combat-box"><div class="combat-label">Prof. Bonus</div><div class="combat-value">+${pb}</div></div>
  <div class="combat-box"><div class="combat-label">Gold</div><div class="combat-value">${char.gold}</div></div>
</div>

<section>
  <h2>Personality</h2>
  ${char.personalityTraits ? `<div class="field"><div class="field-label">Personality Traits</div><div class="field-value">${char.personalityTraits}</div></div>` : ''}
  <div class="grid grid-3">
    ${char.ideals ? `<div class="field"><div class="field-label">Ideals</div><div class="field-value">${char.ideals}</div></div>` : ''}
    ${char.bonds ? `<div class="field"><div class="field-label">Bonds</div><div class="field-value">${char.bonds}</div></div>` : ''}
    ${char.flaws ? `<div class="field"><div class="field-label">Flaws</div><div class="field-value">${char.flaws}</div></div>` : ''}
  </div>
</section>

${char.appearanceDescription ? `<section><h2>Appearance</h2><div class="field-value">${char.appearanceDescription}</div></section>` : ''}

${char.equipment?.weapon || char.equipment?.armor || char.equipment?.shield ? `
<section>
  <h2>Equipment</h2>
  <div class="grid grid-3">
    ${char.equipment.weapon ? `<div class="field"><div class="field-label">Weapon</div><div class="field-value">${char.equipment.weapon.name}${char.equipment.weapon.damageDie ? ` (${char.equipment.weapon.damageDie})` : ''}</div></div>` : ''}
    ${char.equipment.armor ? `<div class="field"><div class="field-label">Armor</div><div class="field-value">${char.equipment.armor.name}${char.equipment.armor.acBonus ? ` (AC ${char.equipment.armor.acBonus})` : ''}</div></div>` : ''}
    ${char.equipment.shield ? `<div class="field"><div class="field-label">Shield</div><div class="field-value">${char.equipment.shield.name}${char.equipment.shield.acBonus ? ` (+${char.equipment.shield.acBonus} AC)` : ''}</div></div>` : ''}
  </div>
</section>` : ''}

${char.inventory?.length ? `
<section>
  <h2>Inventory (${char.inventory.length})</h2>
  <div style="font-size:12px;columns:2;column-gap:16px;">
    ${char.inventory.map(i => `<div style="break-inside:avoid;margin-bottom:4px;"><strong>${i.name}</strong>${i.quantity && i.quantity > 1 ? ` ×${i.quantity}` : ''} <span style="color:#888">${i.type}${i.value ? `, ${i.value}gp` : ''}</span></div>`).join('')}
  </div>
</section>` : ''}

${char.customSpells?.length ? `
<section>
  <h2>Spellbook (${char.customSpells.length})</h2>
  <div style="font-size:12px;columns:2;column-gap:16px;">
    ${char.customSpells.map(s => `<div style="break-inside:avoid;margin-bottom:4px;"><strong>${s.name}</strong> <span style="color:#888">${s.level === 0 ? 'Cantrip' : `Lv${s.level}`}, ${s.school}${s.damage ? `, ${s.damage}` : ''}${s.isConcentration ? ', C' : ''}</span></div>`).join('')}
  </div>
</section>` : ''}

${char.backstory ? `<section><h2>Backstory</h2><div class="backstory">${char.backstory}</div></section>` : ''}

<div class="footer">Exported from Adventure &mdash; ${new Date().toLocaleDateString()}</div>
<div class="no-print" style="text-align:center;margin-top:16px;"><button onclick="window.print()" style="padding:8px 24px;font-size:14px;cursor:pointer;">Print / Save as PDF</button></div>
</body>
</html>`;

  const w = window.open('', '_blank');
  if (w) {
    w.document.write(html);
    w.document.close();
  }
}

// ============================================================================
//  D&D Beyond — formatted text for manual entry (no import API)
// ============================================================================
export function exportDndBeyondText(char: Character): string {
  const hitDie = CLASS_HIT_DIE[char.class];
  const lines = [
    `=== D&D Beyond Manual Entry ===`,
    `(D&D Beyond has no import API — use this as reference while filling in your character)`,
    ``,
    `Name: ${char.name}`,
    `Race: ${char.race}`,
    `Class: ${char.class}`,
    `Level: ${char.level}`,
    `Background: ${char.background}`,
    `Alignment: ${char.alignment}`,
    ``,
    `-- Ability Scores (enter in Standard Array / Manual section) --`,
    `STR: ${char.stats.STR}  DEX: ${char.stats.DEX}  CON: ${char.stats.CON}`,
    `INT: ${char.stats.INT}  WIS: ${char.stats.WIS}  CHA: ${char.stats.CHA}`,
    ``,
    `HP: ${char.maxHp}  AC: ${char.ac}  Hit Die: d${hitDie}  Gold: ${char.gold}`,
    ``,
    `-- Description (paste into the respective fields) --`,
  ];
  if (char.personalityTraits) lines.push(`Personality Traits: ${char.personalityTraits}`);
  if (char.ideals) lines.push(`Ideals: ${char.ideals}`);
  if (char.bonds) lines.push(`Bonds: ${char.bonds}`);
  if (char.flaws) lines.push(`Flaws: ${char.flaws}`);
  if (char.backstory) lines.push(``, `Backstory:`, char.backstory);
  if (char.appearanceDescription) lines.push(``, `Appearance:`, char.appearanceDescription);
  return lines.join('\n');
}

export async function copyDndBeyondText(char: Character): Promise<boolean> {
  return copyToClipboard(exportDndBeyondText(char));
}

// ============================================================================
//  Export format registry — used by the UI
// ============================================================================
export interface ExportFormat {
  id: string;
  label: string;
  desc: string;
  method: 'download' | 'clipboard' | 'window';
  ext?: string;
  available: boolean;    // can export now
  systemNote?: string;   // note about system compatibility
}

export const EXPORT_FORMATS: ExportFormat[] = [
  { id: 'json', label: 'Adventure JSON', desc: 'Native format — reimportable into Adventure', method: 'download', ext: '.json', available: true },
  { id: 'markdown', label: 'Markdown', desc: 'Universal text format — works everywhere', method: 'download', ext: '.md', available: true },
  { id: 'clipboard', label: 'Copy to Clipboard', desc: 'Markdown format copied to clipboard', method: 'clipboard', available: true },
  { id: 'pdf', label: 'Printable Sheet', desc: 'Opens a styled character sheet — print or save as PDF', method: 'window', available: true },
  { id: 'foundry', label: 'Foundry VTT', desc: 'Import directly into Foundry VTT (dnd5e system)', method: 'download', ext: '.json', available: true },
  { id: 'fantasygrounds', label: 'Fantasy Grounds', desc: 'XML character file for Fantasy Grounds', method: 'download', ext: '.xml', available: true },
  { id: 'dndbeyond', label: 'D&D Beyond', desc: 'Formatted text for manual entry (no import API exists)', method: 'clipboard', available: true, systemNote: 'Copy & paste into D&D Beyond fields' },
  { id: 'pathfinder', label: 'Pathfinder 2e', desc: 'Requires stat conversion — different system', method: 'download', available: false, systemNote: 'Coming soon — needs ability/proficiency conversion' },
  { id: 'forbiddenlands', label: 'Forbidden Lands', desc: 'Year Zero Engine — different mechanics', method: 'download', available: false, systemNote: 'Coming soon — needs full system conversion' },
  { id: 'savaged', label: 'Savage Worlds', desc: 'Attributes/Edges/Hindrances — different system', method: 'download', available: false, systemNote: 'Coming soon — needs full system conversion' },
];

export async function runExport(formatId: string, char: Character): Promise<{ success: boolean; message: string }> {
  switch (formatId) {
    case 'json':
      exportJSON(char);
      return { success: true, message: `Saved ${char.name}.adventure.json` };
    case 'markdown':
      downloadMarkdown(char);
      return { success: true, message: `Saved ${char.name}.md` };
    case 'clipboard': {
      const ok = await copyMarkdown(char);
      return ok ? { success: true, message: 'Copied to clipboard' } : { success: false, message: 'Clipboard access denied' };
    }
    case 'pdf':
      exportPrintableHTML(char);
      return { success: true, message: 'Opened printable sheet' };
    case 'foundry':
      exportFoundryVTT(char);
      return { success: true, message: `Saved ${char.name}.foundry.json` };
    case 'fantasygrounds':
      exportFantasyGrounds(char);
      return { success: true, message: `Saved ${char.name}.fantasy_grounds.xml` };
    case 'dndbeyond': {
      const ok2 = await copyDndBeyondText(char);
      return ok2 ? { success: true, message: 'D&D Beyond text copied to clipboard' } : { success: false, message: 'Clipboard access denied' };
    }
    default:
      return { success: false, message: 'Format not yet available' };
  }
}
