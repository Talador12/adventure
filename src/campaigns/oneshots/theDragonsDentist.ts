import type { OneShotCampaign } from '../types';

export const theDragonsDentist: OneShotCampaign = {
  id: 'oneshot-dragons-dentist',
  type: 'oneshot',
  title: 'The Dragon\'s Dentist',
  tagline: 'The dragon doesn\'t want to eat you. It wants you to fix its tooth.',
  tone: 'comedic',
  themes: ['comedy', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  level: 6,
  estimatedHours: 3,
  settingSummary:
    'A red dragon has been terrorizing the countryside — not because it\'s evil, but because it has a toothache. A massive infected molar is driving it insane with pain. The local lord hires the party to slay the dragon, but when they get there, it opens its mouth and says (through gritted, aching teeth): "Please. Help. It hurts." The party must perform emergency dental surgery on a dragon.',
  hook: 'Classic quest: slay the dragon, save the village, collect the reward. The party arrives at the cave expecting a fight. Instead, they find a red dragon lying on its side, whimpering, with one cheek swollen to twice its normal size. It sees them, opens its mouth (revealing the problem), and begs for help.',
  twist:
    'The tooth isn\'t just infected — there\'s a treasure-eating mimic lodged in the cavity. It\'s been consuming the dragon\'s hoard from the inside, growing, and the dragon didn\'t notice until it got big enough to hit a nerve. The "dental surgery" is actually a dungeon crawl inside a dragon\'s mouth.',
  climax:
    'The party must enter the dragon\'s mouth (yes, enter), navigate its teeth (which are the size of pillars), fight the mimic, and extract or destroy it — all while the dragon tries very hard not to sneeze, hiccup, or accidentally swallow them.',
  scenes: [
    {
      title: 'Scene 1: The Dragon\'s Plea',
      summary:
        'The party arrives expecting a boss fight and instead gets a desperate patient. Negotiation, examination, and the horrifying realization that they need to go inside.',
      challenge: 'social',
      keyEvents: [
        'The dragon pleads — "I\'ll give you anything, just make it stop"',
        'Medical examination — the tooth is massive, the infection is severe',
        'Discovery: something is MOVING inside the tooth',
        'The plan: someone has to go in. The dragon will try not to close its mouth.',
      ],
    },
    {
      title: 'Scene 2: The Mouth Dungeon',
      summary:
        'Inside the dragon\'s mouth. Teeth are pillars, the tongue is difficult terrain, saliva is an environmental hazard, and the infected tooth is the dungeon boss room.',
      challenge: 'exploration',
      keyEvents: [
        'Entry — rappelling down a fang, landing on the tongue',
        'Navigation — dodging saliva pools, climbing molars, avoiding the gag reflex',
        'The infected tooth — cracked, glowing with mimic adhesive, throbbing',
        'The dragon accidentally hiccups — everyone makes DEX saves',
      ],
    },
    {
      title: 'Scene 3: The Extraction',
      summary:
        'The mimic reveals itself. Combat inside a dragon\'s mouth with the constant threat of being swallowed. Victory means a very grateful — and very generous — dragon.',
      challenge: 'combat',
      keyEvents: [
        'The mimic emerges from the tooth cavity — it\'s been eating gold from the inside',
        'Combat in a mouth — the floor is a tongue, the walls are gums, the ceiling drools',
        'The dragon feels the fight and tries to help (fire breath in its own mouth — bad idea)',
        'Victory: the mimic is destroyed, the tooth is saved, the dragon is VERY grateful',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Scorchwing the Miserable',
      role: 'patient / quest giver',
      personality:
        'A 500-year-old red dragon who is usually terrifying but is currently a whimpering mess. Between sobs of pain, he\'s actually quite polite. Offers increasingly ridiculous amounts of treasure for relief.',
      secret: 'He\'s been too proud to ask for help for months. The infection has spread so far that if the party hadn\'t shown up, he would have died within a week.',
    },
    {
      name: 'Lord Brampton',
      role: 'original quest giver',
      personality:
        'The local lord who posted the "slay the dragon" bounty. Will be very confused when the party returns with a dragon ally instead of a dragon head.',
    },
    {
      name: 'The Mimic (Chompy)',
      role: 'the actual villain',
      personality:
        'A mimic that somehow got into the dragon\'s tooth cavity while disguised as a gold coin. It\'s been eating treasure for months and is now the size of a horse. Very angry about being discovered.',
    },
  ],
  keyLocations: [
    {
      name: 'Scorchwing\'s Cave',
      description:
        'A classic dragon lair, but the dragon is lying on its treasure pile looking miserable instead of menacing.',
      significance: 'Where the party meets their unusual quest giver.',
    },
    {
      name: 'Inside the Mouth',
      description:
        'A dungeon made of teeth, gums, and tongue. Saliva pools are difficult terrain. The infected molar glows ominously at the back.',
      significance: 'The primary adventure environment.',
    },
    {
      name: 'The Tooth Cavity',
      description:
        'A hollow space inside the infected molar, filled with partially digested gold and a very large, very angry mimic.',
      significance: 'The final boss arena.',
    },
  ],
  dataSystems: [
    'dragonPersonality',
    'trapDisarm',
    'combatNarration',
    'merchantHaggling',
    'monsterHarvesting',
  ],
};
