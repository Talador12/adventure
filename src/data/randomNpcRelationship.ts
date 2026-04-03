// Random NPC relationship generator — connections between two NPCs.
export interface NpcRelationship { npc1Role: string; npc2Role: string; relationship: string; tension: string; secret: string; }
const RELATIONSHIPS: NpcRelationship[] = [
  { npc1Role: 'Merchant', npc2Role: 'Guard Captain', relationship: 'Old friends from military service.', tension: 'The merchant owes the captain a debt they can\'t repay.', secret: 'They once committed a crime together and covered it up.' },
  { npc1Role: 'Innkeeper', npc2Role: 'Priest', relationship: 'Rivals for the affection of the same person.', tension: 'Public politeness masks genuine dislike.', secret: 'The innkeeper secretly attends the priest\'s sermons every week.' },
  { npc1Role: 'Noble', npc2Role: 'Blacksmith', relationship: 'Siblings separated at birth.', tension: 'The noble doesn\'t know. The blacksmith does.', secret: 'The blacksmith has a birthmark proving their lineage.' },
  { npc1Role: 'Bard', npc2Role: 'Thief', relationship: 'Former adventuring partners.', tension: 'The bard wrote a song about their exploits. The thief\'s identity is in it.', secret: 'They still do jobs together occasionally.' },
  { npc1Role: 'Farmer', npc2Role: 'Wizard', relationship: 'Student and teacher — the farmer is learning magic in secret.', tension: 'The village would run the wizard out if they knew.', secret: 'The farmer has actual talent — more than the wizard expected.' },
  { npc1Role: 'Mayor', npc2Role: 'Tavern Owner', relationship: 'Political allies who present a united front.', tension: 'They disagree on everything behind closed doors.', secret: 'The tavern owner has blackmail material on the mayor.' },
];
export function getRandomRelationship(): NpcRelationship { return RELATIONSHIPS[Math.floor(Math.random() * RELATIONSHIPS.length)]; }
export function formatRelationship(r: NpcRelationship): string { return `🤝 **NPC Relationship:**\n👤 ${r.npc1Role} ↔ ${r.npc2Role}\n💬 ${r.relationship}\n⚡ Tension: ${r.tension}\n🤫 Secret: ${r.secret}`; }
