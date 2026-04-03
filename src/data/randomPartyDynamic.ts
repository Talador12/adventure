// Random party dynamic — relationship prompts between party members.
export interface PartyDynamic { dynamic: string; betweenRoles: string; sceneSuggestion: string; }
const DYNAMICS: PartyDynamic[] = [
  { dynamic: 'One character saved the other\'s life in the last fight. The debt feels heavy.', betweenRoles: 'Any two PCs', sceneSuggestion: 'A quiet campfire conversation about what "owing someone" means.' },
  { dynamic: 'Two characters have contradicting memories of the same event. Both are sure they\'re right.', betweenRoles: 'Any two PCs', sceneSuggestion: 'An argument that reveals something about both characters.' },
  { dynamic: 'One character is hiding an injury from the rest of the party.', betweenRoles: 'One PC vs the group', sceneSuggestion: 'A Medicine check notices, or the injury worsens at the worst time.' },
  { dynamic: 'Two characters both want the same magic item. Neither has said anything yet.', betweenRoles: 'Any two PCs', sceneSuggestion: 'DM offers the item and watches what happens.' },
  { dynamic: 'One character accidentally overheard another praying/crying/talking to themselves.', betweenRoles: 'Any two PCs', sceneSuggestion: 'Do they mention it? Pretend they didn\'t hear? The tension builds.' },
  { dynamic: 'The party realizes they\'ve never actually asked each other why they became adventurers.', betweenRoles: 'The whole party', sceneSuggestion: 'A "going around the campfire" moment during a long rest.' },
];
export function getRandomDynamic(): PartyDynamic { return DYNAMICS[Math.floor(Math.random() * DYNAMICS.length)]; }
export function formatPartyDynamic(d: PartyDynamic): string { return `🤝 **Party Dynamic:**\n*${d.dynamic}*\n👥 Between: ${d.betweenRoles}\n🎬 Scene: ${d.sceneSuggestion}`; }
