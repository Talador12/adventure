import type { OneShotCampaign } from '../types';

export const theSoupKitchen: OneShotCampaign = {
  id: 'oneshot-soup-kitchen',
  type: 'oneshot',
  title: 'The Soup Kitchen',
  tagline: 'The homeless shelter is a front. For kindness. And also a portal to the Abyss.',
  tone: 'comedic',
  themes: ['comedy', 'urban', 'horror'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary: 'A soup kitchen in the slums has been suspiciously effective — nobody who eats there stays hungry, sick, or homeless for long. Investigation reveals the kitchen is run by a retired demon who is using Abyssal magic for good: the soup is enchanted with healing, the kitchen is a pocket dimension with infinite beds, and the "staff" are rehabilitated minor demons learning to be nice.',
  hook: 'The city watch hires the party to investigate the soup kitchen: "It\'s too good. Nobody is that generous. There must be something evil going on." The party arrives and is offered the best soup they\'ve ever tasted. By a very polite imp.',
  twist: 'The demon running the kitchen — a former pit fiend named Azrael — is genuinely reformed. She left the Abyss 50 years ago and has been running the shelter ever since. The city watch wants her shut down because a GOOD demon makes the church uncomfortable. The real threat: her former Abyssal superiors have found her and are sending a retrieval team.',
  climax: 'Demons arrive to drag Azrael back to the Abyss. The party must defend the soup kitchen — alongside an army of rehabilitated imps, grateful homeless people, and one very angry retired pit fiend who fights with a ladle the size of a greatsword.',
  scenes: [
    { title: 'Scene 1: Investigation', summary: 'The party investigates the too-good-to-be-true soup kitchen. Everything seems suspiciously nice.', challenge: 'exploration', keyEvents: ['The kitchen: clean, warm, incredible soup, staffed by very polite small red creatures', 'Investigation: the "staff" are imps who are TRYING very hard to not be evil', 'The soup: mildly enchanted with healing (not illegal but not normal)', 'Meeting Azrael: a 7-foot woman with barely-hidden horns who says "More bread?"'] },
    { title: 'Scene 2: The Truth', summary: 'Azrael reveals her nature. The party must decide: shut down the shelter or protect it.', challenge: 'social', keyEvents: ['Azrael\'s confession: "I was a pit fiend. I got tired of being evil. Is that so strange?"', 'The imps explain: "She saved us. We were going to be tortured for eternity. She gave us APRONS."', 'The church arrives: "A demon running a shelter is an abomination, regardless of how good the soup is."', 'An Abyssal beacon activates: Azrael\'s former commanders have found her'] },
    { title: 'Scene 3: The Siege', summary: 'Abyssal retrieval team attacks. The soup kitchen defends itself with ladles, imps, and righteous fury.', challenge: 'combat', keyEvents: ['Demons arrive: "Azrael. Your vacation is over. The Abyss demands your return."', 'The defense: imps with frying pans, homeless veterans with bench-legs, and Azrael with THE LADLE', 'The party holds the line while Azrael banishes the retrieval team', 'Victory: the kitchen stands, the soup is served, and the church reluctantly agrees to look the other way'] },
  ],
  keyNPCs: [
    { name: 'Azrael', role: 'reformed pit fiend / soup chef', personality: 'A former arch-demon who discovered she liked feeding people more than tormenting them. Fierce, kind, and makes a mushroom bisque that could end wars. "I spent 10,000 years causing suffering. I have a LOT of good deeds to make up for."' },
    { name: 'Pip the Imp', role: 'staff / reformed', personality: 'A tiny imp who is the kitchen\'s head waiter. Takes the job VERY seriously. "Table 3 needs water! On it! Being good is EXHAUSTING but the soup makes it worth it!"' },
    { name: 'Inquisitor Creed', role: 'church antagonist / reasonable', personality: 'A church investigator who knows Azrael is doing good but struggles with the theological implications. "A GOOD demon undermines everything we teach about evil. But... the soup IS really good."' },
  ],
  keyLocations: [
    { name: 'The Soup Kitchen', description: 'A warm, clean shelter in the slums. The soup is always hot, the beds are always soft, and the staff have little red tails they try to hide.', significance: 'The setting and the thing worth defending.' },
    { name: 'The Pocket Kitchen', description: 'Behind the counter — a pocket dimension with infinite beds, a massive kitchen, and a staff of rehabilitated imps in tiny chef hats.', significance: 'Where Azrael\'s magic is revealed.' },
    { name: 'The Front Door', description: 'Where the battle takes place. The doorframe is warded with "Welcome" in Abyssal and Common.', significance: 'The defensive position.' },
  ],
  dataSystems: ['enchantedFoodDrink', 'socialEncounter', 'encounterWaves', 'combatNarration', 'pocketDimension'],
};
