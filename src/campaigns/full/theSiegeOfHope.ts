import type { FullCampaign } from '../types';

export const theSiegeOfHope: FullCampaign = {
  id: 'full-siege-of-hope',
  type: 'full',
  title: 'The Siege of Hope',
  tagline: 'The last free city. The largest army in history. Thirty days.',
  tone: 'serious',
  themes: ['war', 'survival', 'classic_fantasy'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 5, end: 14 },
  estimatedSessions: 18,
  settingSummary:
    'The Iron Horde — a million-strong army of united orc, goblinoid, and giant clans — marches on Bastion, the last free city. The city has 30 days before the siege. The party must prepare the defense: training militia, forging alliances, building fortifications, managing resources, and keeping hope alive. Each day is a strategic choice. Each week brings a crisis. The siege itself is the final exam.',
  hook: 'Scouts ride in: the Iron Horde is thirty days out. A million soldiers. Bastion has 10,000 defenders. The city council appoints the party as War Commanders: "You have a month. Make it count." The first decision: how to spend Day 1.',
  twist:
    'The Iron Horde\'s warchief doesn\'t want to destroy Bastion — he wants to capture it intact. His people are refugees from a magical catastrophe that destroyed their homeland. The siege is a last resort after every diplomatic overture was rejected by Bastion\'s xenophobic previous council. The party can discover this and negotiate — but the Horde has committed to the siege and not all clan leaders will accept peace.',
  climax:
    'Day 30: the siege begins. The party\'s 30 days of preparation are tested. The city\'s defenses hold — or don\'t — based on the choices made. Mid-siege, the party gets a chance to negotiate with the warchief. The ending depends on everything: the walls they built, the alliances they forged, and whether they can convince two sides that have committed to war that peace is still possible.',
  acts: [
    {
      title: 'Act 1: The Countdown (Days 1-10)',
      summary:
        'Assessment, initial preparations, and the first crisis. Each day is a strategic choice: train militia, build walls, forge weapons, or seek allies.',
      keyEvents: [
        'Assessment: Bastion\'s strengths (walls, mages, geography) and weaknesses (food, soldiers, morale)',
        'Days 1-5: immediate preparations — reinforcing walls, training civilians',
        'Days 6-10: first crisis - a spy is found, food stores are lower than reported',
        'Quiet moment: Day 8. A child brings the party flowers and asks if the monsters are coming. The party\'s answer sets the morale tone for the rest of the campaign.',
        'Ally mission: a nearby dwarven fortress might help, but they have demands',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Preparations (Days 11-25)',
      summary:
        'Advanced preparations, discovering the Horde\'s true motivation, and managing a city that\'s running out of time.',
      keyEvents: [
        'Advanced defenses: war machines, magical wards, evacuation tunnels',
        'Morale management: the city is scared, factions argue about surrender vs. fight',
        'Horde scouts captured — they\'re not warriors, they\'re families',
        'Discovery: the Horde is fleeing something worse. They don\'t want war. They want a home.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Siege (Days 26-30)',
      summary:
        'The Horde arrives. Everything the party built is tested. A chance at peace emerges mid-battle.',
      keyEvents: [
        'Day 26: the Horde arrives — a sea of tents stretching to the horizon',
        'Day 27: first assault — the walls hold (or crack) based on preparation',
        'Day 28-29: grinding siege — resources deplete, the party leads critical defenses',
        'Day 30: the warchief offers parley — one chance at peace before the final assault',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'Warchief Grom',
      role: 'opposing leader / potential ally',
      personality:
        'A massive orc who carries the weight of a million refugees. Not cruel - exhausted, desperate, and willing to do terrible things because his people have no other options. Speaks slowly, choosing words with the care of someone who knows one wrong sentence means war. "I did not come here to fight. I came here because my people need walls. Yours were the only walls left." Arc: begins as implacable threat, becomes a negotiating partner if the party discovered the Horde\'s true motivation in Act 2.',
      secret: 'His people\'s homeland was destroyed by a dragon flight. He sent diplomats to Bastion three times. Each time, the previous council refused to even meet.',
    },
    {
      name: 'Commander Elara Brightshield',
      role: 'military advisor',
      personality:
        'Bastion\'s top military officer. Competent, realistic, and privately terrified. "I can hold these walls for two weeks. I need you to find the other two weeks."',
    },
    {
      name: 'Mayor Thorne',
      role: 'political leader / obstacle',
      personality:
        'The civilian leader who wants to surrender. Not a coward — a pragmatist who doesn\'t believe the city can win. "Every dead soldier was someone\'s family. Is the city worth that?"',
    },
    {
      name: 'Forge-Mother Grenda',
      role: 'dwarven potential ally',
      personality:
        'Leader of the nearby dwarven fortress. Willing to help — if Bastion agrees to a trade alliance that heavily favors the dwarves. "Help has a price. Freedom isn\'t free."',
    },
  ],
  keyLocations: [
    {
      name: 'Bastion',
      description: 'A walled city on a river — defensible but not impregnable. 10,000 citizens. Good walls, low food, mixed morale.',
      significance: 'The setting for the entire campaign.',
    },
    {
      name: 'The Walls',
      description: 'Ancient stone fortifications that need reinforcement. Every section the party doesn\'t repair is a weakness.',
      significance: 'The primary defense and a physical manifestation of the party\'s choices.',
    },
    {
      name: 'The Parley Ground',
      description: 'A field between the walls and the Horde camp. Neutral ground for negotiation. The most dangerous place in the world.',
      significance: 'Where peace becomes possible.',
    },
  ],
  dataSystems: [
    'siegeDefense',
    'siegeWarfare',
    'massCombat',
    'warRoomBriefing',
    'warbandBuilder',
    'partyMoraleTracker',
    'encounterWaves',
    'diplomaticNegotiation',
    'stronghold',
  ],
};
