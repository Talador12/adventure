// CharacterCard — generates a shareable social-media-style card for a character.
// Renders to an offscreen canvas for download as PNG.
// Shows: portrait, name, race/class/level, stats, HP/AC, equipment highlights.
import { useState, useCallback, useRef } from 'react';
import type { Character } from '../../types/game';

interface CharacterCardProps {
  character: Character;
}

const STAT_NAMES = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const;

function statMod(value: number): string {
  const mod = Math.floor((value - 10) / 2);
  return mod >= 0 ? `+${mod}` : String(mod);
}

// Draw the card to a canvas and return a data URL
function renderCardToCanvas(char: Character, portrait: HTMLImageElement | null): string {
  const W = 600;
  const H = 340;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0f172a');
  bg.addColorStop(1, '#1e293b');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Border
  ctx.strokeStyle = '#F38020';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, W - 4, H - 4);

  // Inner accent line
  ctx.strokeStyle = 'rgba(243, 128, 32, 0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 8, W - 16, H - 16);

  // Portrait (left side)
  const portraitSize = 140;
  const px = 24;
  const py = 40;
  if (portrait) {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(px, py, portraitSize, portraitSize, 12);
    ctx.clip();
    ctx.drawImage(portrait, px, py, portraitSize, portraitSize);
    ctx.restore();
    ctx.strokeStyle = 'rgba(243, 128, 32, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(px, py, portraitSize, portraitSize, 12);
    ctx.stroke();
  } else {
    // Placeholder circle with initial
    ctx.fillStyle = 'rgba(243, 128, 32, 0.15)';
    ctx.beginPath();
    ctx.roundRect(px, py, portraitSize, portraitSize, 12);
    ctx.fill();
    ctx.fillStyle = '#F38020';
    ctx.font = 'bold 48px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(char.name.charAt(0).toUpperCase(), px + portraitSize / 2, py + portraitSize / 2 + 16);
  }

  // Name
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 24px system-ui';
  ctx.textAlign = 'left';
  ctx.fillText(char.name, 184, 68);

  // Race / Class / Level
  ctx.fillStyle = '#F38020';
  ctx.font = '14px system-ui';
  ctx.fillText(`Level ${char.level} ${char.race} ${char.class}`, 184, 92);

  // Alignment + Background
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px system-ui';
  ctx.fillText(`${char.alignment || 'Neutral'} · ${char.background || 'Adventurer'}`, 184, 112);

  // HP / AC / Gold bar
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(184, 124, 380, 32, 6);
  ctx.fill();
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(184, 124, 380, 32, 6);
  ctx.stroke();

  // HP
  const hpPct = Math.max(0, char.hp / char.maxHp);
  ctx.fillStyle = hpPct > 0.5 ? '#22c55e' : hpPct > 0.25 ? '#eab308' : '#ef4444';
  ctx.font = 'bold 13px system-ui';
  ctx.fillText(`HP ${char.hp}/${char.maxHp}`, 196, 145);

  // AC
  ctx.fillStyle = '#38bdf8';
  ctx.fillText(`AC ${char.ac}`, 310, 145);

  // Gold
  ctx.fillStyle = '#fbbf24';
  ctx.fillText(`${char.gold}g`, 390, 145);

  // Level
  ctx.fillStyle = '#a78bfa';
  ctx.fillText(`XP ${char.xp}`, 460, 145);

  // Stat block
  const statY = 176;
  const statW = 56;
  STAT_NAMES.forEach((stat, i) => {
    const sx = 184 + i * (statW + 8);
    const val = (char.stats as Record<string, number>)[stat] || 10;
    const mod = statMod(val);

    // Stat box
    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.beginPath();
    ctx.roundRect(sx, statY, statW, 52, 6);
    ctx.fill();
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(sx, statY, statW, 52, 6);
    ctx.stroke();

    // Label
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 9px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(stat, sx + statW / 2, statY + 14);

    // Value
    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 16px system-ui';
    ctx.fillText(String(val), sx + statW / 2, statY + 34);

    // Modifier
    ctx.fillStyle = '#F38020';
    ctx.font = '10px system-ui';
    ctx.fillText(mod, sx + statW / 2, statY + 48);
  });

  // Equipment highlights (bottom)
  ctx.textAlign = 'left';
  const eqY = 248;
  const weapon = char.equipment?.weapon;
  const armor = char.equipment?.armor;
  ctx.fillStyle = '#475569';
  ctx.font = '10px system-ui';
  if (weapon) ctx.fillText(`Weapon: ${weapon.name}`, 184, eqY);
  if (armor) ctx.fillText(`Armor: ${armor.name}`, 184, eqY + 16);

  // Feats
  if (char.feats && char.feats.length > 0) {
    ctx.fillStyle = '#a78bfa';
    ctx.font = '10px system-ui';
    ctx.fillText(`Feats: ${char.feats.join(', ')}`, 184, eqY + 32);
  }

  // HP Bar under portrait
  const barY = py + portraitSize + 8;
  ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
  ctx.beginPath();
  ctx.roundRect(px, barY, portraitSize, 8, 4);
  ctx.fill();
  const hpColor = hpPct > 0.5 ? '#22c55e' : hpPct > 0.25 ? '#eab308' : '#ef4444';
  ctx.fillStyle = hpColor;
  ctx.beginPath();
  ctx.roundRect(px, barY, Math.round(portraitSize * hpPct), 8, 4);
  ctx.fill();

  // Branding
  ctx.fillStyle = 'rgba(100, 116, 139, 0.3)';
  ctx.font = '9px system-ui';
  ctx.textAlign = 'right';
  ctx.fillText('adventure — D&D 5e VTT', W - 16, H - 12);

  return canvas.toDataURL('image/png');
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const generateCard = useCallback(() => {
    setGenerating(true);
    // Load portrait if available
    if (character.portrait) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setCardUrl(renderCardToCanvas(character, img));
        setGenerating(false);
      };
      img.onerror = () => {
        setCardUrl(renderCardToCanvas(character, null));
        setGenerating(false);
      };
      img.src = character.portrait;
    } else {
      setCardUrl(renderCardToCanvas(character, null));
      setGenerating(false);
    }
  }, [character]);

  const downloadCard = useCallback(() => {
    if (!cardUrl) return;
    const a = document.createElement('a');
    a.href = cardUrl;
    a.download = `${character.name.replace(/[^a-zA-Z0-9]/g, '_')}_card.png`;
    a.click();
  }, [cardUrl, character.name]);

  const copyToClipboard = useCallback(async () => {
    if (!cardUrl) return;
    try {
      const response = await fetch(cardUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    } catch { /* clipboard API may not be available */ }
  }, [cardUrl]);

  return (
    <div className="space-y-2">
      {!cardUrl ? (
        <button
          onClick={generateCard}
          disabled={generating}
          className="w-full py-2 text-xs font-semibold rounded-lg bg-[#F38020]/20 text-[#F38020] hover:bg-[#F38020]/30 border border-[#F38020]/30 transition-colors disabled:opacity-50"
        >
          {generating ? 'Generating...' : 'Generate Character Card'}
        </button>
      ) : (
        <div className="space-y-2">
          <img src={cardUrl} alt={`${character.name} character card`} className="w-full rounded-lg border border-slate-700 shadow-lg" />
          <div className="flex gap-2">
            <button onClick={downloadCard} className="flex-1 py-1.5 text-[10px] font-semibold rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors">
              Download PNG
            </button>
            <button onClick={copyToClipboard} className="flex-1 py-1.5 text-[10px] font-semibold rounded bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 border border-sky-500/30 transition-colors">
              Copy to Clipboard
            </button>
            <button onClick={() => setCardUrl(null)} className="py-1.5 px-3 text-[10px] text-slate-500 hover:text-slate-300 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
