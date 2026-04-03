// Magical communication system — sending stones, message spells, and crystal ball networks.

export type CommMethod = 'sending_stones' | 'message_spell' | 'crystal_ball' | 'animal_messenger' | 'dream_sending' | 'blood_link';
export type CommReliability = 'perfect' | 'good' | 'unreliable' | 'risky';

export interface CommunicationMethod {
  method: CommMethod;
  name: string;
  range: string;
  reliability: CommReliability;
  messageLimit: string;
  cost: number;
  requirements: string;
  interceptionRisk: string;
  flavor: string;
}

export interface CommunicationNetwork {
  name: string;
  method: CommMethod;
  members: string[];
  securityLevel: number; // 1-10
  compromised: boolean;
}

const METHODS: CommunicationMethod[] = [
  { method: 'sending_stones', name: 'Sending Stones', range: 'Unlimited (same plane)', reliability: 'perfect', messageLimit: '25 words per day', cost: 2000, requirements: 'Paired stones. Both holders must be attuned.', interceptionRisk: 'None unless stone is stolen.', flavor: 'The stone warms when a message arrives. The sender\'s voice is tiny and tinny.' },
  { method: 'message_spell', name: 'Message (cantrip)', range: '120 feet', reliability: 'perfect', messageLimit: '6 seconds of whispering', cost: 0, requirements: 'Must see or know the target. Line of effect (can bend around corners).', interceptionRisk: 'Target can reply. Others within 5ft of either party may detect whispering (Perception DC 15).', flavor: 'A whisper that travels on an invisible thread. The air crackles faintly.' },
  { method: 'crystal_ball', name: 'Crystal Ball (scrying)', range: 'Unlimited (same plane)', reliability: 'good', messageLimit: 'Visual + audio observation only (no two-way)', cost: 50000, requirements: 'Crystal ball (very rare). 10-minute casting. Target\'s WIS save to resist.', interceptionRisk: 'High. Target feels watched (WIS DC 15 to notice). Wards can block.', flavor: 'Mists swirl in the crystal. An image forms. You see them... but can they see you?' },
  { method: 'animal_messenger', name: 'Animal Messenger (2nd level)', range: '25 miles per day', reliability: 'unreliable', messageLimit: '25 words spoken to the animal', cost: 0, requirements: '2nd-level spell slot. A Tiny beast within range. Lasts 24 hours.', interceptionRisk: 'Animal can be killed, captured, or eaten. No guarantee of arrival.', flavor: 'A sparrow with a purpose. It knows where to go but not why. It will try its best.' },
  { method: 'dream_sending', name: 'Dream (5th level)', range: 'Unlimited (same plane)', reliability: 'good', messageLimit: 'Full conversation during 8-hour rest', cost: 0, requirements: '5th-level spell slot. Target must be sleeping. Messenger can shape the dream.', interceptionRisk: 'If target is warded, the spell fails. Night Hags can intrude on dream messages.', flavor: 'You step into their dream. It\'s their world — you\'re just visiting. Make it count.' },
  { method: 'blood_link', name: 'Blood Bond Communication', range: 'Unlimited', reliability: 'risky', messageLimit: 'Emotions and single words. Not full sentences.', cost: 500, requirements: 'Both parties exchange blood in a ritual (Religion DC 14). Permanent link.', interceptionRisk: 'The link transmits pain. If one is hurt, the other feels it. Exploitable.', flavor: 'Not words — feelings. You KNOW they\'re afraid. You KNOW they need you. You feel their heartbeat.' },
];

export function getMethod(method: CommMethod): CommunicationMethod | undefined {
  return METHODS.find((m) => m.method === method);
}

export function getMethodsByReliability(reliability: CommReliability): CommunicationMethod[] {
  return METHODS.filter((m) => m.reliability === reliability);
}

export function getFreeMethods(): CommunicationMethod[] {
  return METHODS.filter((m) => m.cost === 0);
}

export function createNetwork(name: string, method: CommMethod, members: string[]): CommunicationNetwork {
  return { name, method, members, securityLevel: 5, compromised: false };
}

export function getAllMethods(): CommMethod[] {
  return METHODS.map((m) => m.method);
}

export function formatMethod(method: CommunicationMethod): string {
  const icon = { sending_stones: '💎', message_spell: '💬', crystal_ball: '🔮', animal_messenger: '🐦', dream_sending: '💤', blood_link: '🩸' }[method.method];
  const rel = { perfect: '🟢', good: '🟡', unreliable: '🟠', risky: '🔴' }[method.reliability];
  const lines = [`${icon} ${rel} **${method.name}** *(${method.range})*`];
  lines.push(`  *${method.flavor}*`);
  lines.push(`  Limit: ${method.messageLimit} | Cost: ${method.cost > 0 ? method.cost + 'gp' : 'Free'}`);
  lines.push(`  Requirements: ${method.requirements}`);
  lines.push(`  ⚠️ Interception: ${method.interceptionRisk}`);
  return lines.join('\n');
}

export { METHODS as COMMUNICATION_METHODS };
