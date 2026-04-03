// Random campfire story generator — tales NPCs or PCs tell during long rests.
export interface CampfireStory { title: string; opening: string; twist: string; moral: string; genre: 'horror' | 'comedy' | 'legend' | 'tragedy' | 'mystery'; }
const STORIES: CampfireStory[] = [
  { title: 'The Headless Knight', opening: 'They say on moonless nights, a knight rides through the forest...', twist: 'The knight isn\'t looking for victims — he\'s searching for his own grave to finally rest.', moral: 'Even the dead deserve peace.', genre: 'horror' },
  { title: 'The Dragon and the Farmer', opening: 'Once, a farmer challenged a dragon to a contest of strength...', twist: 'The farmer won — by challenging the dragon to a plowing competition.', moral: 'Strength isn\'t always about fighting.', genre: 'comedy' },
  { title: 'The Star That Fell', opening: 'Long ago, a star fell from the heavens and took mortal form...', twist: 'The star forgot what it was and lived an entire human life, happy.', moral: 'Sometimes forgetting is a gift.', genre: 'legend' },
  { title: 'The Last Wizard of Thornkeep', opening: 'Thornkeep once housed the greatest wizard academy in the realm...', twist: 'The last wizard sealed the academy to protect the world from what they\'d created inside.', moral: 'Some knowledge is too dangerous to share.', genre: 'tragedy' },
  { title: 'The Smiling Innkeeper', opening: 'Every traveler who stayed at the Laughing Raven inn vanished...', twist: 'They didn\'t vanish — they all loved it so much they never left. The inn is that good.', moral: 'Not every mystery has a dark answer.', genre: 'mystery' },
  { title: 'The Bridge Troll\'s Riddle', opening: 'A troll guarded a bridge and asked every traveler a riddle...', twist: 'The troll didn\'t know the answers either. He just wanted someone to talk to.', moral: 'Loneliness makes fools of us all.', genre: 'comedy' },
];
export function getRandomStory(): CampfireStory { return STORIES[Math.floor(Math.random() * STORIES.length)]; }
export function formatCampfireStory(s: CampfireStory): string { return `🔥 **Campfire Story: "${s.title}"** (${s.genre})\n\n*${s.opening}*\n\n🔀 Twist: ${s.twist}\n💭 Moral: *"${s.moral}"*`; }
