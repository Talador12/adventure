// Random title/honorific generator — titles NPCs or PCs can earn.
export interface Title { title: string; requirements: string; perks: string; source: string; }
const TITLES: Title[] = [
  { title: 'Champion of the Arena', requirements: 'Win 3 consecutive arena fights.', perks: 'Free lodging in any city. +2 to Intimidation with commoners.', source: 'Arena' },
  { title: 'Friend of the Forest', requirements: 'Complete a quest for the druids.', perks: 'Safe passage through enchanted forests. Druids are friendly.', source: 'Druidic Circle' },
  { title: 'Slayer of [Monster]', requirements: 'Kill a notable monster (CR 5+).', perks: 'Free drinks in any tavern. Bards write songs about you.', source: 'Public acclaim' },
  { title: 'Knight of the Realm', requirements: 'Perform a great service for the crown.', perks: 'Land grant, small retainer income (10gp/month), access to court.', source: 'Royalty' },
  { title: 'Guildmaster\'s Favor', requirements: 'Complete 5 guild contracts without failure.', perks: '10% discount at guild shops. Priority on high-paying contracts.', source: 'Adventurers\' Guild' },
  { title: 'The Undying', requirements: 'Survive 3 death saving throw sequences.', perks: 'Advantage on death saves. Reputation as unkillable.', source: 'Earned through survival' },
  { title: 'Keeper of Secrets', requirements: 'Protect a dangerous secret for an important NPC.', perks: 'Access to hidden information networks. One free "I know a guy."', source: 'Underground contacts' },
  { title: 'Bane of the Undead', requirements: 'Destroy 50+ undead creatures.', perks: '+1 to damage against undead. Undead-friendly NPCs are wary.', source: 'Reputation' },
];
export function getRandomTitle(): Title { return TITLES[Math.floor(Math.random() * TITLES.length)]; }
export function formatTitle(t: Title): string { return `👑 **${t.title}**\n📋 Requirements: ${t.requirements}\n✨ Perks: ${t.perks}\n📍 Source: ${t.source}`; }
