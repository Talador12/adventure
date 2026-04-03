// NPC death scene generator — dramatic last words and dying wishes for important NPCs.

export type DeathContext = 'combat' | 'sacrifice' | 'betrayal' | 'illness' | 'old_age' | 'heroic';

export interface NpcDeathScene {
  context: DeathContext;
  lastWords: string;
  dyingWish: string;
  dramaticBeat: string;
  partyImpact: string;
  mechanicalEffect: string | null;
  memorialOption: string;
}

const SCENES: NpcDeathScene[] = [
  { context: 'combat', lastWords: '"Tell them... I didn\'t run. Tell them I stood."', dyingWish: 'Return their weapon to their family. It\'s been passed down for generations.', dramaticBeat: 'They grab the party member\'s hand and squeeze. Then the grip loosens.', partyImpact: 'The nearest ally is shaken. Disadvantage on attacks for 1 round (grief).', mechanicalEffect: 'Party gains Inspiration. The NPC\'s weapon becomes a +1 weapon permanently (memorial enchantment).', memorialOption: 'Build a cairn on the battlefield. Travelers leave stones for a generation.' },
  { context: 'sacrifice', lastWords: '"This is what I was for. Don\'t waste it. Don\'t you dare waste it."', dyingWish: 'Live. That\'s the wish. Just live.', dramaticBeat: 'They smile. For the first time since the party met them, they look at peace.', partyImpact: 'Silence. Absolute silence. Then rage, or tears, or both.', mechanicalEffect: 'All party members gain advantage on saves for 24 hours (the sacrifice inspires them).', memorialOption: 'The spot where they fell becomes hallowed ground. Flowers grow there year-round.' },
  { context: 'betrayal', lastWords: '"I knew. I knew the whole time. I just... hoped I was wrong."', dyingWish: 'Don\'t become like the betrayer. Promise me.', dramaticBeat: 'They look at the betrayer with pity, not anger. That\'s worse.', partyImpact: 'The betrayer falters. If still in combat, they hesitate for 1 round (conflicted).', mechanicalEffect: 'The party gains advantage on Insight checks against the betrayer permanently.', memorialOption: 'Carve their name into the betrayer\'s weapon. Let it remind them forever.' },
  { context: 'illness', lastWords: '"I\'m sorry I couldn\'t stay longer. I wanted to see how your story ends."', dyingWish: 'Finish the quest they started. The one they were too sick to complete.', dramaticBeat: 'They close their eyes mid-sentence. The room is too quiet.', partyImpact: 'The healer feels it hardest. "Could I have done more?"', mechanicalEffect: null, memorialOption: 'Write their name in the book at the temple. Light a candle that never goes out.' },
  { context: 'old_age', lastWords: '"It was a good life. Not a perfect one, but a good one. That\'s enough."', dyingWish: 'Pass on their knowledge. Teach someone what they taught you.', dramaticBeat: 'They ask for a story. Any story. Fall asleep during it. Don\'t wake up.', partyImpact: 'Bittersweet. No one is angry. Everyone is sad. And grateful.', mechanicalEffect: 'One party member gains proficiency in a skill the NPC was known for (DM chooses).', memorialOption: 'Plant a tree where they loved to sit. It grows faster than it should.' },
  { context: 'heroic', lastWords: '"BEHIND YOU!" *pushes party member out of the way*', dyingWish: 'None spoken. Their actions were the wish.', dramaticBeat: 'The blow that would have killed a party member kills them instead. They chose this.', partyImpact: 'The saved party member is changed forever. They carry the NPC\'s memory like a shield.', mechanicalEffect: 'Saved party member: +1 AC for 24 hours (heightened awareness from guilt/gratitude). NPC gets a hero\'s funeral.', memorialOption: 'The bard writes a song. It becomes popular. Strangers sing it in taverns. The NPC lives forever in music.' },
];

export function getRandomDeathScene(): NpcDeathScene {
  return SCENES[Math.floor(Math.random() * SCENES.length)];
}

export function getScenesByContext(context: DeathContext): NpcDeathScene[] {
  return SCENES.filter((s) => s.context === context);
}

export function getScenesWithMechanicalEffects(): NpcDeathScene[] {
  return SCENES.filter((s) => s.mechanicalEffect !== null);
}

export function getAllDeathContexts(): DeathContext[] {
  return [...new Set(SCENES.map((s) => s.context))];
}

export function formatDeathScene(scene: NpcDeathScene, npcName: string = 'The NPC'): string {
  const icon = { combat: '⚔️', sacrifice: '✨', betrayal: '🗡️', illness: '🏥', old_age: '🕯️', heroic: '🛡️' }[scene.context];
  const lines = [`${icon} **${npcName}'s Final Moment** *(${scene.context})*`];
  lines.push(`  💬 *${scene.lastWords}*`);
  lines.push(`  🎭 ${scene.dramaticBeat}`);
  lines.push(`  Dying wish: ${scene.dyingWish}`);
  lines.push(`  Party impact: ${scene.partyImpact}`);
  if (scene.mechanicalEffect) lines.push(`  ⚙️ ${scene.mechanicalEffect}`);
  lines.push(`  🪦 Memorial: ${scene.memorialOption}`);
  return lines.join('\n');
}

export { SCENES as DEATH_SCENES };
