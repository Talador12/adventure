// Random NPC filler phrase — things NPCs say while thinking or stalling.
export const NPC_FILLER_PHRASES: string[] = [
  '"Well now, let me think about that..."', '"Hmm. Hmm hmm hmm."',
  '"That\'s a complicated question."', '"You know, it\'s funny you should ask..."',
  '"*long pause* ...Where was I?"', '"I\'m not sure I should be telling you this."',
  '"Between you and me and this here lamppost..."', '"How much is it worth to you?"',
  '"My memory isn\'t what it used to be. *significant look at coin purse*"',
  '"I heard a rumor, but you didn\'t hear it from me."',
  '"*looks around nervously* Not here. Meet me at the docks at midnight."',
  '"That depends entirely on who\'s asking. And who\'s paying."',
  '"*changes the subject* Have you tried the stew? It\'s quite good."',
  '"I know exactly what you need. Follow me. Actually, wait. Never mind."',
];
export function getRandomPhrase(): string { return NPC_FILLER_PHRASES[Math.floor(Math.random() * NPC_FILLER_PHRASES.length)]; }
export function formatNpcPhrase(npcName: string = 'NPC'): string { return `💬 **${npcName}:** *${getRandomPhrase()}*`; }
