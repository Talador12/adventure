import type { FullCampaign } from '../types';

export const theFlatEarthConspiracy: FullCampaign = {
  id: 'full-the-flat-earth-conspiracy',
  type: 'full',
  title: 'The Flat Earth Conspiracy',
  tagline: 'The world IS flat. The Flat Earth Society is trying to cover it up. Someone built a gift shop at the edge.',
  tone: 'comedic',
  themes: ['comedy', 'exploration', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 8 },
  estimatedSessions: 12,
  settingSummary:
    'In this world, the conspiracy theorists were right: the world is flat. It has an edge. Beyond the edge is a waterfall that pours into the cosmic void. But the Flat Earth Society — the people who KNOW it is flat — are trying to SUPPRESS the information because tourism to the edge is destroying the local ecosystem. Meanwhile, the Round Earth Society (the actual conspiracy) has spent centuries using illusion magic to make the horizon look curved. The party stumbles into both groups and must navigate competing cover-ups while the actual edge of the world has a gift shop, a scenic overlook, and a deeply underpaid park ranger.',
  hook: 'The party is traveling through a remote region when their map runs out. Not because the mapmaker was lazy — the map literally says "HERE ENDS THE WORLD" at the edge. They follow the road to the edge and find a wooden railing, a waterfall into stars, and a gift shop selling "I Went to the Edge of the World and All I Got Was This Lousy Tunic" tunics. Before they can process this, agents from two competing secret societies arrive and demand they pick a side.',
  twist:
    'The world is flat, but it was not always. It USED to be round. An ancient magical catastrophe literally flattened it, and the Round Earth Society are the descendants of the wizards who caused the disaster. They are not covering up the flatness because they believe in round earth — they are covering it up because they are guilty. The edge is where their spell went wrong, and the waterfall is reality leaking through the crack they made.',
  climax:
    'The crack is widening. The waterfall is getting stronger. The world is literally losing mass over the edge. Both societies must work together: the Flat Earth Society knows the edge, the Round Earth Society knows the original spell. The party must mediate between two groups who have been lying to each other for centuries, trek to the bottom of the waterfall (it is a very long way down), and patch reality itself — all while the gift shop owner insists they pay for anything they broke.',
  acts: [
    {
      title: 'Act 1: The Edge of Everything',
      summary:
        'The party discovers the edge, the gift shop, and both secret societies. They are recruited (aggressively) by both sides and must navigate conspiracy, counter-conspiracy, and a park ranger who just wants people to stop littering near the cosmic waterfall.',
      keyEvents: [
        'Discovery: the edge of the world, complete with safety railing and scenic overlook',
        'The gift shop: run by an entrepreneur who stumbled here 10 years ago and saw a business opportunity',
        'The Flat Earth Society agents arrive: "You have seen too much. Also please do not post about this online"',
        'The Round Earth Society agents arrive: "The world is round, ignore the waterfall into space"',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Conspiracy Within Conspiracy',
      summary:
        'The party investigates both societies and discovers neither is what it seems. The Flat Earthers are environmentalists. The Round Earthers are guilt-ridden descendants of world-breakers. A third group — Edge Tourism Inc. — just wants to build a resort. Everything is getting worse because the waterfall is accelerating.',
      keyEvents: [
        'Flat Earth Society HQ: a nature preserve near the edge, staffed by druids and rangers',
        'Round Earth Society HQ: a hidden academy where illusion mages maintain the "curved horizon" spell',
        'The truth comes out: the world was flattened by the Round Earthers\' ancestors',
        'Edge Tourism Inc. starts construction on a resort and accidentally widens the crack',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: Patching the World',
      summary:
        'The crack is critical. Both societies must cooperate. The party leads an expedition to the bottom of the waterfall — where reality is thin and the original spell scar is visible — to seal the crack before the world loses too much mass and tips over the edge like a cosmic dinner plate.',
      keyEvents: [
        'Peace negotiations between the Flat and Round Earth Societies (they hate each other)',
        'The descent: rappelling down the waterfall of reality, past fragments of what the world used to look like',
        'The spell scar: a wound in the fabric of the world that must be sealed with combined magic',
        'The gift shop owner shows up at the bottom because she heard there might be a new retail opportunity',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Ranger Thornwall',
      role: 'park ranger / straight man',
      personality:
        'The only government employee assigned to the literal edge of the world. Underpaid, overworked, and deeply tired of tourists throwing coins over the edge for wishes. "There is no wishing well down there. It is the cosmic void. Your coins are gone forever. Please stop."',
      secret: 'He has been slowly mapping what is below the edge by dropping enchanted stones. He knows more about the structure of the world than either society.',
    },
    {
      name: 'Archdruid Canopy',
      role: 'Flat Earth Society leader',
      personality:
        'A passionate elf druid who leads the FES not out of conspiracy love but out of genuine environmental concern. The edge ecosystem is unique and fragile. "Yes, the world is flat. That is not the POINT. The point is that tourism is killing the endemic void-moss and I will NOT let that happen."',
    },
    {
      name: 'Archmage Ptolemy IX',
      role: 'Round Earth Society leader',
      personality:
        'The ninth in a line of illusionists maintaining the "round horizon" spell. Exhausted by centuries of family guilt. "My ancestors broke the world. My family has been lying about it for 800 years. I am very, very tired."',
      secret: 'He wants to confess publicly but fears the world would panic if they knew reality has a crack in it.',
    },
    {
      name: 'Jinx Copperworth',
      role: 'gift shop owner / chaos agent',
      personality:
        'A gnome entrepreneur who found the edge of the world and immediately thought "retail opportunity." Relentlessly capitalist, surprisingly brave, and somehow always present at critical moments. "I have t-shirts, mugs, and commemorative snow globes of the cosmic void. The snow globe is just empty. That is the point."',
    },
  ],
  keyLocations: [
    {
      name: 'The Edge',
      description: 'The literal edge of the flat world. A rocky cliff with a safety railing, a scenic overlook, and a waterfall of ocean water cascading into the starry void below. It is breathtaking and deeply unsettling.',
      significance: 'Where the world ends and the adventure begins.',
    },
    {
      name: 'Copperworth\'s Edge-of-the-World Gift Shop',
      description: 'A surprisingly well-stocked gift shop perched 50 feet from the end of reality. Sells themed merchandise, snacks, and "certified edge water" in bottles. Has a 4.2 star rating.',
      significance: 'The hub for all three acts and the most unlikely base of operations in the multiverse.',
    },
    {
      name: 'The Underside',
      description: 'Below the edge. A vast, vertiginous space where the waterfall plunges past the exposed underside of the world — roots of mountains hanging above, the spell scar glowing like a wound, and fragments of the original round world drifting in the void.',
      significance: 'Where the crack must be sealed and the final expedition takes place.',
    },
  ],
  dataSystems: [
    'explorationHazard',
    'socialEncounter',
    'factionReputation',
    'plotTwistEngine',
    'environmentalHazard',
    'combatNarration',
    'fantasyInsults',
    'riddleGenerator',
  ],
};
