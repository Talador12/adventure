import type { OneShotCampaign } from '../types';

export const oneHitPointEach: OneShotCampaign = {
  id: 'oneshot-one-hit-point-each',
  type: 'oneshot',
  title: 'One Hit Point Each',
  tagline: 'Everyone and everything has 1 HP. The party. The monsters. The BBEG. The furniture. A single sneeze is lethal.',
  tone: 'shenanigans',
  themes: ['dungeon_crawl', 'comedy', 'survival'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 2,
  settingSummary:
    'The Dungeon of Fragile Equilibrium exists inside a pocket dimension where everything - every creature, object, and piece of furniture - has exactly 1 hit point. The party has 1 HP each. The goblins have 1 HP. The dragon has 1 HP. The treasure chest has 1 HP (sneeze near it and it shatters). The floor tiles have 1 HP (step too hard and they crack). Tactics matter infinitely. A single rat is a genuine threat because it can kill the fighter in one bite. But the fighter can also kill the dragon in one slap. Initiative order IS the game. Whoever acts first wins.',
  hook: 'A wizard offers the party 1,000 gold to clear his "practice dungeon." Easy money, he says. When they enter, a shimmering barrier passes over them and a message floats in the air: "FRAGILE MODE ACTIVATED. ALL HIT POINTS SET TO 1. ENJOY." The wizard\'s voice echoes: "I forgot to mention! Everything in there has 1 HP. Including you. First hit wins every fight! It is great for practicing tactics! ...Also the walls are fragile. And the floor. Try not to sneeze."',
  twist:
    'The wizard did not create this dungeon as practice. He is using the party to test a weapon: the Fragility Field. If it can reduce everything to 1 HP, it can turn an army of soldiers into an army of glass. He is watching through scrying and recording the results. The party is his weapons test. The "practice dungeon" is a proving ground, and if they survive, the wizard plans to sell the Fragility Field to the highest bidder. The final room contains the Field generator - and the wizard, who also has 1 HP.',
  climax:
    'The party reaches the generator room. The wizard is there with the Fragility Field device. He also has 1 HP. He has surrounded himself with 50 rats (each with 1 HP) as a living shield - any AoE attack kills them but also kills him. The party must get ONE hit past the rat wall without hitting the wizard\'s single HP with AoE. Or they can destroy the generator (1 HP) which turns off the field - restoring everyone to normal HP. Including the wizard, who reveals he is actually quite powerful at full HP. Pick your poison: fragile but even, or full power but outmatched.',
  scenes: [
    {
      title: 'Scene 1: Glass Cannon World',
      summary:
        'The party enters and discovers the 1 HP rule. First encounters teach the mechanic: a rat kills a party member. A party member kills a goblin with a poke. The floor cracks underfoot. A door shatters when pushed too hard. Everything is lethal and nothing is durable.',
      challenge: 'combat',
      keyEvents: [
        'A rat bites the fighter. The fighter drops to 0 HP. A rat. Just killed. The fighter. The cleric heals them. 1 HP restored. "WHAT IS HAPPENING."',
        'The rogue pokes a goblin. It dies. One finger. One poke. Instant death. The rogue stares at their finger.',
        'Someone leans on a wall. The wall cracks. Someone steps on a floor tile. It shatters. The dungeon is as fragile as the creatures in it.',
        'The party realizes: initiative order is everything. Whoever acts first wins. Surprise rounds are god-tier. Stealth is the most powerful ability in existence.',
      ],
    },
    {
      title: 'Scene 2: The Deadliest Dungeon',
      summary:
        'Standard dungeon rooms become terrifying when everything is 1 HP. A locked door? Kick it open (it shatters, but so does the frame, and the ceiling above). A trapped hallway? One hit kills, but the trap also dies if you hit it first. A room full of enemies? One AoE spell kills everything, including load-bearing columns.',
      challenge: 'puzzle',
      keyEvents: [
        'A room with 20 skeletons. The wizard casts an AoE. All 20 die. So does the floor, which was also at 1 HP. The party falls into the room below.',
        'A treasure chest. The rogue opens it gently. Inside: potions (1 HP containers) that heal 1 HP. They are the most valuable things in the dungeon.',
        'A dragon. An actual dragon. With 1 HP. It breathes fire (instant kill zone) but dies to a thrown rock. The fight is over in 6 seconds. It was still terrifying.',
        'A puzzle door that requires a password. The party could solve the puzzle OR just sneeze near the door and it disintegrates. Both are valid.',
      ],
    },
    {
      title: 'Scene 3: The Glass Wizard',
      summary:
        'The wizard reveals himself behind a wall of 50 rats. Everyone has 1 HP. The party must decide: precision strike through the rats to hit the wizard, or destroy the generator and face him at full power.',
      challenge: 'combat',
      keyEvents: [
        'The wizard stands behind 50 rats, each with 1 HP. "You cannot AoE me without killing yourself in the blast. And you cannot melee through 50 rats before one of them bites you."',
        'The generator hums in the corner. Destroying it (1 HP, one hit) turns off the field. Everyone returns to normal HP. The wizard is a level 15 mage.',
        'The party chooses: fragile fairness (1 HP wizard) or normal combat (full power wizard). Neither is easy.',
        'If they stay at 1 HP: a single creative trick wins the fight. A thrown coin. A gust of wind. Prestidigitation creating a flash. Anything that touches the wizard wins. If they restore HP: a real fight against a powerful wizard. Either way, the Fragility Field is destroyed.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Wizard Crystallus',
      role: 'quest giver / secret villain',
      personality:
        'A wizard who presents himself as a friendly experimenter and is actually a weapons dealer. He speaks in cheerful, encouraging tones while watching the party nearly die to rats. "Wonderful! The rat almost got you! This data is INVALUABLE."',
      secret: 'He plans to sell the Fragility Field to a warlord. The party is his beta test.',
    },
    {
      name: 'The 1 HP Dragon',
      role: 'boss encounter / existential horror',
      personality:
        'A dragon that is genuinely terrifying for the 3 seconds before someone throws a rock at it. It has full dragon intelligence, full dragon ego, and 1 hit point. It knows it is fragile. It is FURIOUS about it. "I AM AN ANCIENT WYRM. I WILL—" *bonk* Dead.',
    },
  ],
  keyLocations: [
    {
      name: 'The Dungeon of Fragile Equilibrium',
      description:
        'A dungeon where everything has 1 HP. Walls crack, floors shatter, doors splinter. Combat is lethal in both directions. The architecture is barely holding together. Walking is a hazard.',
      significance: 'The entire adventure. Every step, every hit, every sneeze matters.',
    },
    {
      name: 'The Generator Room',
      description:
        'The deepest room containing the Fragility Field generator - a humming crystal that reduces everything in the dungeon to 1 HP. Destroying it restores normal physics. The wizard stands beside it behind a wall of rats.',
      significance: 'The final encounter and the moral choice: fight fair at 1 HP or fight real at full power.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'trapDisarm',
    'dungeonDressing',
    'environmentalHazard',
    'fantasyInsults',
  ],
};
