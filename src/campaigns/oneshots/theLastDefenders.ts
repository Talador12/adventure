import type { OneShotCampaign } from '../types';

export const theLastDefenders: OneShotCampaign = {
  id: 'oneshot-last-defenders',
  type: 'oneshot',
  title: 'The Last Defenders',
  tagline: 'The army is gone. The walls are thin. You have until dawn.',
  tone: 'serious',
  themes: ['war', 'survival'],
  playerCount: { min: 4, max: 6 },
  level: 7,
  estimatedHours: 4,
  settingSummary:
    'The army marched out three days ago to fight a dragon. They haven\'t come back. Tonight, the orc horde that was supposed to be the army\'s problem arrives at the village walls. The party and 30 villagers are all that\'s left. Dawn is 8 hours away. Reinforcements are coming — if the village still exists by morning.',
  hook: 'A dying scout staggers through the gate: "The army... the dragon... they\'re gone. The orcs. The orcs are coming. They\'ll be here by nightfall." The village elder looks at the party. "You\'re all we have."',
  twist:
    'The orc horde isn\'t united. Their warchief died fighting the dragon, and three lieutenants are competing for leadership by proving who can sack the village first. The orcs are fighting each other as much as attacking the walls. A cunning party can exploit the division — pit the lieutenants against each other, negotiate with the one who seems reasonable, or even convince one to switch sides.',
  climax:
    'The final wave at dawn. The strongest lieutenant makes an all-out push. The walls are breached. The party must hold the gap long enough for the rising sun to reveal reinforcements on the horizon — or fall trying.',
  scenes: [
    {
      title: 'Scene 1: Preparation',
      summary:
        'Four hours until dark. The party must fortify the village, arm the villagers, set traps, and make hard choices about what to defend and what to sacrifice.',
      challenge: 'exploration',
      keyEvents: [
        'Village assessment: weak walls, a smithy, a grain store, 30 able-bodied villagers',
        'Fortification: barricades, traps, fallback positions — the party decides the defense plan',
        'Arming the villagers: most have never held a weapon',
        'Scouts report: the horde is bigger than expected, but divided',
      ],
    },
    {
      title: 'Scene 2: The Night',
      summary:
        'Three waves of attacks across the night. Each wave is harder. Between waves, the party must repair, heal, and make choices about depleting resources.',
      challenge: 'combat',
      keyEvents: [
        'Wave 1 (dusk): probing attack — testing the defenses',
        'Between waves: repair, tend wounded, discover the orc division',
        'Wave 2 (midnight): serious assault — one wall section falls',
        'Between waves: morale check, a villager wants to surrender, the party must decide',
      ],
    },
    {
      title: 'Scene 3: Dawn',
      summary:
        'The final assault. Everything the party built and planned is tested. The walls are breached. Hold the gap until dawn.',
      challenge: 'combat',
      keyEvents: [
        'Wave 3 (pre-dawn): all-out assault, walls breached at two points',
        'The strongest lieutenant leads personally — a boss fight in the rubble',
        'The villagers fight alongside the party — their training pays off (or doesn\'t)',
        'Dawn breaks: reinforcements visible on the horizon. Hold. One. More. Minute.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Marta',
      role: 'village leader',
      personality:
        'A tough, practical woman who has survived two famines and a flood. Doesn\'t panic. "Tell me what you need and I\'ll get it done. Tears can wait until morning."',
    },
    {
      name: 'Bren the Smith',
      role: 'ally / resource',
      personality:
        'The village blacksmith. Can turn farm tools into crude weapons in an hour. Has been wanting to make a ballista his whole life. Tonight, he gets his chance.',
    },
    {
      name: 'Grukk, Son of Nobody',
      role: 'orc lieutenant / potential negotiation',
      personality:
        'The youngest orc lieutenant, and the only one who doesn\'t want to sack the village. He wants to prove himself by being smarter than the others. A cunning party can negotiate.',
      secret: 'He\'s terrified. He was a scout two weeks ago. Leadership was thrust on him when his captain died.',
    },
  ],
  keyLocations: [
    {
      name: 'Millbrook Village',
      description:
        'A farming village with a low stone wall, a smithy, a granary, and 30 houses. Not built for war. About to be.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The North Wall',
      description:
        'The weakest section of wall. This is where the breach will happen. The party must decide how to reinforce it.',
      significance: 'The main defensive challenge.',
    },
    {
      name: 'The Smithy',
      description:
        'Where weapons and traps are forged. Bren works through the night, every hour producing another batch of equipment.',
      significance: 'The party\'s resource production center.',
    },
  ],
  dataSystems: [
    'siegeDefense',
    'encounterWaves',
    'warRoomBriefing',
    'partyMoraleTracker',
    'trapDesigner',
    'warbandBuilder',
  ],
};
