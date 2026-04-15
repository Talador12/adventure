import type { OneShotCampaign } from '../types';

export const spiderVsOctopus: OneShotCampaign = {
  id: 'oneshot-spider-vs-octopus',
  type: 'oneshot',
  title: 'Spider vs. Octopus',
  tagline: 'Eight legs versus eight arms. The pier is the border. The seagulls have chosen a side. This will not end well.',
  tone: 'comedic',
  themes: ['comedy', 'nautical', 'dungeon_crawl'],
  playerCount: { min: 4, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The docks of Port Marrow are divided by an ancient and sacred boundary: the pier. Above the pier, the docks belong to Shelob Jr., a giant spider who has claimed every rope, crate, and fishing net as part of her web empire. Below the pier, the harbor belongs to Tentacles McGee, an octopus of unusual size who controls the pilings, the kelp beds, and the lucrative barnacle trade. For years an uneasy peace held. Then Shelob Jr. built a web that extended six inches past the pier. Into octopus territory. The war began over six inches. As all the best wars do.',
  hook: 'Players split into two teams: Team Spider and Team Octopus. Each team receives a briefing from their respective leader. The objective is simple: control the pier. The methods are unlimited. Webs vs. ink. Climbing vs. swimming. Eight legs vs. eight arms. May the best invertebrate win.',
  twist:
    'A pelican named Gerald has been watching both sides escalate and has been subtly encouraging the conflict by stealing fish from the octopus territory and dropping them in spider territory, and vice versa. Gerald is not smart. Gerald is not strategic. Gerald just thinks war is funny and he gets to eat the casualties. When both sides are exhausted, Gerald swoops in as the final boss — a bird the size of a dragon at invertebrate scale — and attempts to eat everyone.',
  climax:
    'Gerald attacks. The spider and the octopus must form an emergency alliance to fight a pelican who is objectively the most dangerous thing on these docks. The spider wraps Gerald\'s beak in web while the octopus blinds him with ink. The seagulls (who accidentally started a cargo cult worshipping the octopus\'s ink clouds as "the dark prophecy") provide air support. The fish mercenaries switch sides three times. A crab named Steve refuses to participate and watches from a barnacle, eating popcorn kelp.',
  scenes: [
    {
      title: 'Scene 1: The Briefing',
      summary: 'Teams receive their assignments. Team Spider learns web tactics, wall-climbing, and ambush strategy. Team Octopus learns ink deployment, water manipulation, and the art of tentacle grappling. Both sides scout the pier.',
      challenge: 'social',
      keyEvents: [
        'Team Spider briefing: "The pier is OURS. That invertebrate in the puddle thinks eight arms beats eight legs? We have WEBS."',
        'Team Octopus briefing: "The dry-lander has overstepped. Literally. Six inches past the line. We respond with overwhelming aquatic force."',
        'Reconnaissance: both teams map the pier from their respective domains',
        'First skirmish: a test web meets a test ink cloud at the pier\'s edge. The war is on.',
      ],
    },
    {
      title: 'Scene 2: Escalation',
      summary: 'The turf war escalates beyond all reason. Both sides recruit allies, build siege weapons, and accidentally involve the local wildlife. Someone starts a religion.',
      challenge: 'combat',
      keyEvents: [
        'The spider builds a web catapult that launches sticky projectiles across the pier',
        'The octopus recruits fish mercenaries by promising them "whatever fish want, probably algae or something"',
        'A seagull observes the octopus\'s ink cloud and decides it is a divine sign. A cargo cult forms in minutes.',
        'The spider commandeers a fishing net as a weapon of mass entanglement',
        'The octopus floods a section of dock by plugging a drain with kelp. Amphibious warfare.',
      ],
    },
    {
      title: 'Scene 3: The False Flag',
      summary: 'Both sides discover evidence that a third party has been manipulating the conflict. Fish found in spider territory. Webs found in octopus territory. Who is responsible?',
      challenge: 'puzzle',
      keyEvents: [
        'Team Spider finds octopus ink in places the octopus could not have reached. Planted.',
        'Team Octopus finds web strands in the harbor that dissolve in water. Also planted.',
        'Both teams independently discover pelican feathers at the evidence sites',
        'The seagull cult delivers a prophecy: "The Great Beak comes. The Great Beak hungers."',
      ],
    },
    {
      title: 'Scene 4: Gerald',
      summary: 'The pelican attacks. Spider and octopus must unite or die. Eight legs plus eight arms versus one very hungry bird.',
      challenge: 'combat',
      keyEvents: [
        'Gerald descends. He is enormous. He is hungry. He does not care about your politics.',
        'Emergency alliance: the spider and octopus coordinate for the first time. Web the beak. Ink the eyes.',
        'The seagull cult interprets Gerald as their dark prophecy fulfilled and provides chaotic air support',
        'Steve the crab watches from his barnacle. He saw this coming. Nobody asked Steve.',
        'Gerald is defeated, waddles away in shame, and the pier is declared a shared demilitarized zone',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Shelob Jr.', role: 'Team Spider leader / dramatic general', personality: 'A giant dock spider with delusions of grandeur and a legitimate claim to the docks above the waterline. Speaks like a Shakespearean villain. Takes the turf war with deadly seriousness. "We did not choose this war. But we will FINISH it."' },
    { name: 'Tentacles McGee', role: 'Team Octopus leader / tactical genius', personality: 'An octopus of unusual intelligence who runs the harbor like a crime boss. Changes color to match his mood: red for angry, blue for scheming, a weird plaid when confused. Considers the pier dispute a matter of honor.' },
    { name: 'Gerald the Pelican', role: 'final boss / agent of chaos', personality: 'A pelican with no higher thought than "that looks edible." Has been engineering the conflict by moving evidence between territories because chaos means distracted prey. Not evil. Just profoundly, irredeemably bird-brained.' },
    { name: 'Steve the Crab', role: 'neutral observer / narrator', personality: 'A hermit crab living in a barnacle at the exact center of the pier. Refuses to pick a side. Watches everything. Offers commentary to no one. "Here they go again. Nobody ever asks the crab."' },
  ],
  keyLocations: [
    { name: 'The Pier', description: 'A wooden pier extending into the harbor. Above: spider territory (ropes, crates, nets). Below: octopus territory (pilings, kelp, barnacles). The border is the plank line.', significance: 'The contested territory. The DMZ. The entire war is about six inches of this pier.' },
    { name: 'The Web Fortress', description: 'Shelob Jr.\'s headquarters in the rigging of a docked ship. Geometric, beautiful, and structurally load-bearing.', significance: 'Team Spider\'s base of operations and siege weapon factory.' },
    { name: 'The Ink Den', description: 'An underwater cave beneath the pier pilings where Tentacles McGee holds court. Bioluminescent. Smells like the ocean\'s armpit.', significance: 'Team Octopus\'s base of operations and war room.' },
  ],
  dataSystems: ['encounterWaves', 'trapCorridor', 'chaseSequence', 'navalCombat'],
};
