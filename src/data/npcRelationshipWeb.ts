// NPC relationship web — NPCs have relationships with each other that affect party interactions.

export type NpcRelationType = 'ally' | 'rival' | 'family' | 'employer' | 'servant' | 'lover' | 'enemy' | 'mentor' | 'debtor' | 'stranger';

export interface NpcRelation {
  npcA: string;
  npcB: string;
  type: NpcRelationType;
  description: string;
  strength: number; // 1-5 how strong the connection is
  secret: boolean; // party doesn't know about this yet
}

export interface NpcRelationshipWeb {
  relations: NpcRelation[];
}

const RELATION_EFFECTS: Record<NpcRelationType, { partyEffect: string; leverageHint: string }> = {
  ally: { partyEffect: 'Helping one makes the other friendly.', leverageHint: 'Threaten or help one to influence the other.' },
  rival: { partyEffect: 'Helping one angers the other.', leverageHint: 'Play them against each other for leverage.' },
  family: { partyEffect: 'Family loyalty overrides all other concerns.', leverageHint: 'Harming one makes the other a permanent enemy.' },
  employer: { partyEffect: 'The servant follows orders. Convince the boss, convince them both.', leverageHint: 'The servant may resent their employer — exploitable.' },
  servant: { partyEffect: 'May secretly undermine their master.', leverageHint: 'Offer freedom or better pay for betrayal.' },
  lover: { partyEffect: 'Deeply protective of each other.', leverageHint: 'The strongest emotional lever — use carefully.' },
  enemy: { partyEffect: 'Will actively work against each other.', leverageHint: 'Offer to help one destroy the other for massive favor.' },
  mentor: { partyEffect: 'The student trusts the mentor implicitly.', leverageHint: 'Discredit the mentor to free the student\'s loyalty.' },
  debtor: { partyEffect: 'Owes a debt that can be called in.', leverageHint: 'Buy the debt to gain leverage.' },
  stranger: { partyEffect: 'No connection — a blank slate.', leverageHint: 'Introduce them for unpredictable results.' },
};

export function createRelationshipWeb(): NpcRelationshipWeb {
  return { relations: [] };
}

export function addRelation(web: NpcRelationshipWeb, npcA: string, npcB: string, type: NpcRelationType, description: string, strength: number = 3, secret: boolean = false): NpcRelationshipWeb {
  const existing = web.relations.find((r) => (r.npcA === npcA && r.npcB === npcB) || (r.npcA === npcB && r.npcB === npcA));
  if (existing) return web; // no duplicate edges
  return { relations: [...web.relations, { npcA, npcB, type, description, strength: Math.max(1, Math.min(5, strength)), secret }] };
}

export function removeRelation(web: NpcRelationshipWeb, npcA: string, npcB: string): NpcRelationshipWeb {
  return { relations: web.relations.filter((r) => !((r.npcA === npcA && r.npcB === npcB) || (r.npcA === npcB && r.npcB === npcA))) };
}

export function revealRelation(web: NpcRelationshipWeb, npcA: string, npcB: string): NpcRelationshipWeb {
  return {
    relations: web.relations.map((r) => {
      if ((r.npcA === npcA && r.npcB === npcB) || (r.npcA === npcB && r.npcB === npcA)) return { ...r, secret: false };
      return r;
    }),
  };
}

export function getRelationsForNpc(web: NpcRelationshipWeb, npcName: string): NpcRelation[] {
  return web.relations.filter((r) => r.npcA === npcName || r.npcB === npcName);
}

export function getRelationEffect(type: NpcRelationType) {
  return RELATION_EFFECTS[type];
}

export function getKnownRelations(web: NpcRelationshipWeb): NpcRelation[] {
  return web.relations.filter((r) => !r.secret);
}

export function getSecretRelations(web: NpcRelationshipWeb): NpcRelation[] {
  return web.relations.filter((r) => r.secret);
}

export function getAllRelationTypes(): NpcRelationType[] {
  return Object.keys(RELATION_EFFECTS) as NpcRelationType[];
}

export function formatRelation(r: NpcRelation): string {
  const icon = { ally: '🤝', rival: '⚡', family: '👪', employer: '👔', servant: '🧹', lover: '💕', enemy: '⚔️', mentor: '📚', debtor: '💰', stranger: '❓' }[r.type];
  const secret = r.secret ? ' 🔒' : '';
  return `${icon} **${r.npcA}** ↔ **${r.npcB}** — ${r.type} (${'★'.repeat(r.strength)}${'☆'.repeat(5 - r.strength)})${secret}\n  *${r.description}*`;
}

export function formatRelationshipWeb(web: NpcRelationshipWeb, showSecrets: boolean = false): string {
  const visible = showSecrets ? web.relations : getKnownRelations(web);
  if (visible.length === 0) return '🕸️ **NPC Relationships:** No known connections.';
  return '🕸️ **NPC Relationships:**\n' + visible.map(formatRelation).join('\n');
}
