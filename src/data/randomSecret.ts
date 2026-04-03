// Random secret generator — dark secrets for NPCs, locations, and items.
export interface Secret { text: string; category: 'personal' | 'political' | 'supernatural' | 'criminal' | 'romantic'; dangerLevel: 'low' | 'medium' | 'high'; }
const SECRETS: Secret[] = [
  { text: 'They murdered someone and hid the body nearby.', category: 'criminal', dangerLevel: 'high' },
  { text: 'They\'re actually a polymorphed dragon observing mortals.', category: 'supernatural', dangerLevel: 'high' },
  { text: 'They\'re embezzling from their employer.', category: 'criminal', dangerLevel: 'medium' },
  { text: 'They\'re in love with someone forbidden — a rival, an enemy, a deity\'s chosen.', category: 'romantic', dangerLevel: 'medium' },
  { text: 'They can see ghosts but tell no one.', category: 'supernatural', dangerLevel: 'low' },
  { text: 'They\'re the rightful heir to a nearby throne.', category: 'political', dangerLevel: 'high' },
  { text: 'They owe a life debt to a powerful fiend.', category: 'supernatural', dangerLevel: 'high' },
  { text: 'They can\'t read but have faked literacy for years.', category: 'personal', dangerLevel: 'low' },
  { text: 'They\'re a spy for a foreign power.', category: 'political', dangerLevel: 'high' },
  { text: 'They\'re addicted to a rare substance.', category: 'personal', dangerLevel: 'medium' },
  { text: 'They witnessed something terrible and are being hunted for it.', category: 'criminal', dangerLevel: 'high' },
  { text: 'They have a twin no one knows about.', category: 'personal', dangerLevel: 'low' },
  { text: 'They were once undead and were resurrected — they remember everything.', category: 'supernatural', dangerLevel: 'medium' },
  { text: 'They\'re planning to betray their closest ally at a critical moment.', category: 'political', dangerLevel: 'high' },
  { text: 'They talk to an invisible friend who might actually be real.', category: 'supernatural', dangerLevel: 'low' },
];
export function getRandomSecret(): Secret { return SECRETS[Math.floor(Math.random() * SECRETS.length)]; }
export function getSecretsByCategory(cat: Secret['category']): Secret[] { return SECRETS.filter((s) => s.category === cat); }
export function formatSecret(s: Secret): string { const icon = s.dangerLevel === 'high' ? '🔴' : s.dangerLevel === 'medium' ? '🟡' : '🟢'; return `${icon} **Secret** (${s.category}, ${s.dangerLevel} danger):\n🤫 *${s.text}*`; }
