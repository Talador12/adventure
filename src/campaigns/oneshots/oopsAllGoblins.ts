import type { OneShotCampaign } from '../types';

export const oopsAllGoblins: OneShotCampaign = {
  id: 'oneshot-oops-all-goblins',
  type: 'oneshot',
  title: 'Oops! All Goblins',
  tagline: 'Everyone is a goblin. The quest giver is a goblin. The villain is a goblin. The treasure is more goblins.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  level: 1,
  estimatedHours: 2,
  settingSummary:
    'The Goblin Warren of Chief Skraggle is a network of mud tunnels, trash-heap throne rooms, and suspiciously organized filing cabinets. Every living creature in this ecosystem is a goblin. The rats are goblins in rat costumes. The "dragon" at the end is twelve goblins in a trench coat. Even the treasure chest is a goblin curled up holding coins in his mouth. The players are also goblins. Nobody told them this was an all-goblin production but here they are.',
  hook: 'The party (goblins) receives a quest from Chief Skraggle (goblin) to retrieve the Sacred Shiny from the Evil Overlord (goblin) who stole it from the Ancient Vault (a shoebox). The reward is the highest honor in goblin society: a slightly bigger stick.',
  twist: 'The Sacred Shiny is a mirror. The Evil Overlord stole it because he thought his reflection was another goblin trapped inside and he was trying to rescue it. He has been talking to the mirror for three weeks. He is emotionally attached. Taking it back will break his heart. The party must choose between completing the quest and devastating a goblin who genuinely believes he saved someone.',
  climax: 'Confrontation with the Evil Overlord, who is just a goblin named Merk sitting in a cardboard box throne talking to a mirror. If they take the mirror, he cries. If they leave it, Chief Skraggle throws a tantrum. The optimal solution is giving Merk a second mirror so he thinks his friend has a friend. This creates a philosophical crisis about goblin consciousness that nobody expected.',
  scenes: [
    {
      title: 'The Quest Dispensary',
      summary: 'Chief Skraggle assigns the quest from his throne (an upside-down bucket). The party receives equipment: a stick, a slightly pointy rock, and a bag that is just a smaller goblin holding things.',
      challenge: 'social',
      keyEvents: [
        'Chief Skraggle gives a rousing speech that is 90% screaming and 10% accidentally correct military strategy',
        'Equipment distribution: the "magic sword" is a butter knife with glitter on it',
        'The party navigator has a map drawn in crayon on a leaf. It is upside down. He does not know this.',
        'A goblin bard plays them off with a war song performed on a tin can with a string',
      ],
    },
    {
      title: 'The Gauntlet of Mild Inconvenience',
      summary: 'The tunnel to the Evil Overlord is "trapped." The traps are goblin-made and barely functional. A pit that is six inches deep. A swinging log that swings too slowly. An alarm that is just a goblin hiding behind a rock yelling "ALARM" when he sees someone.',
      challenge: 'exploration',
      keyEvents: [
        'The pit trap: six inches deep, filled with "spikes" (twigs). A goblin at the bottom pretends to be dead.',
        'The swinging log: takes forty-five seconds per swing. The party can walk past between swings. Or under it. Or around it.',
        'The alarm goblin: screams ALARM but nobody comes because the guards are on break',
        'A toll bridge over a puddle. The troll is a goblin on stilts. The toll is one bug.',
      ],
    },
    {
      title: 'The Overlord\'s Keep',
      summary: 'The Evil Overlord\'s fortress is a slightly larger mud room with delusions of grandeur. Merk sits on his cardboard throne talking to the Sacred Shiny (mirror), convinced his reflection is his best friend.',
      challenge: 'social',
      keyEvents: [
        'Merk introduces the party to "Gregory" (his reflection). Gregory is very quiet but Merk assures everyone he is just shy.',
        'Combat is optional and sad. Merk has 4 HP and his weapon is a spoon.',
        'The moral dilemma: steal the mirror and break a goblin heart, or fail the quest and face Chief Skraggle\'s wrath (he throws a bucket)',
        'The two-mirror solution: if the party finds or makes a second mirror, Merk believes Gregory now has a friend and voluntarily gives back the original',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Chief Skraggle', role: 'quest giver', personality: 'A goblin who found a bucket, sat on it, and declared himself king. Rules through volume. Every sentence is shouted. Surprisingly effective administrator despite being functionally illiterate.' },
    { name: 'Merk the Evil Overlord', role: 'villain / tragic figure', personality: 'A lonely goblin who stole a mirror and fell in love with his own reflection, thinking it was a trapped friend. Gentle, confused, and will absolutely cry if you take Gregory away from him.' },
    { name: 'Bix the Navigator', role: 'guide / liability', personality: 'Carries the map. Cannot read the map. Cannot read anything. Navigates by "feeling the earth\'s energy" which means he walks into walls and then turns left.' },
  ],
  keyLocations: [
    { name: 'The Goblin Warren', description: 'A network of mud tunnels lit by fireflies in jars (the fireflies are not happy about this). Smells like wet dog and ambition.', significance: 'Starting location. Sets the tone: everything is goblin-made and barely holding together.' },
    { name: 'The Gauntlet', description: 'A "heavily trapped" corridor that a moderately athletic toddler could navigate without difficulty.', significance: 'The dungeon crawl portion, played completely straight despite the traps being pathetic.' },
    { name: 'The Overlord\'s Keep', description: 'A mud room with a cardboard throne, a mirror on a pedestal, and crayon drawings of "Merk and Gregory\'s Adventures" on the walls.', significance: 'Final confrontation. The emotional core of the one-shot.' },
  ],
  dataSystems: ['socialEncounter', 'combatNarration', 'fantasyInsults'],
};
