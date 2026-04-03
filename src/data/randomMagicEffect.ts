// Random ambient magic effect — strange magical phenomena for enchanted areas.
export interface MagicEffect { effect: string; visual: string; mechanical: string | null; duration: string; }
const EFFECTS: MagicEffect[] = [
  { effect: 'Gravity reversal zone', visual: 'Objects slowly float upward. Hair stands on end.', mechanical: 'Movement costs double. Ranged attacks have disadvantage.', duration: '10ft radius, permanent' },
  { effect: 'Time skip', visual: 'Flowers bloom and wilt in seconds. Shadows spin rapidly.', mechanical: 'Each round spent here = 1 hour outside. Or vice versa.', duration: 'Until you leave the area' },
  { effect: 'Emotion amplifier', visual: 'Colors seem more vivid. Music sounds more beautiful.', mechanical: 'Advantage on CHA checks. Disadvantage on WIS saves vs charm.', duration: '30ft radius' },
  { effect: 'Echo of the past', visual: 'Ghostly images of people who were here before flicker in and out.', mechanical: null, duration: 'Permanent' },
  { effect: 'Wild magic zone', visual: 'Sparks and small explosions happen randomly. Cantrips go haywire.', mechanical: 'Every spell cast triggers a Wild Magic Surge check (d20, surge on 1-5).', duration: '60ft radius' },
  { effect: 'Silence bubble', visual: 'Sound stops dead at an invisible boundary. Your voice makes no noise.', mechanical: 'No verbal spell components. Communication by gestures only.', duration: '20ft radius' },
  { effect: 'Mirror world', visual: 'Every surface is reflective. You see yourself from every angle.', mechanical: 'Disadvantage on attacks (reflections are confusing). Advantage on Perception.', duration: 'Entire room' },
  { effect: 'Life bloom', visual: 'Plants grow from solid stone. Vines crawl across walls in real time.', mechanical: 'Healing spells restore +2 HP per die. Fire damage doubled.', duration: '30ft radius' },
];
export function getRandomMagicEffect(): MagicEffect { return EFFECTS[Math.floor(Math.random() * EFFECTS.length)]; }
export function formatMagicEffect(e: MagicEffect): string { return `✨ **Ambient Magic: ${e.effect}**\n👁️ *${e.visual}*${e.mechanical ? `\n⚙️ ${e.mechanical}` : '\n⚙️ No mechanical effect — flavor only.'}\n⏰ ${e.duration}`; }
