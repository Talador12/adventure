import type { FullCampaign } from '../types';

export const theCrownOfStars: FullCampaign = {
  id: 'full-the-crown-of-stars',
  type: 'full',
  title: 'The Crown of Stars',
  tagline: 'Seven artifacts. Godhood awaits. The prophecy is a trap.',
  tone: 'epic',
  themes: ['epic', 'planar', 'classic_fantasy'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 5, end: 20 },
  estimatedSessions: 22,
  settingSummary:
    'An ancient prophecy promises that a mortal who gathers the Crown of Stars - seven divine artifacts scattered across the planes - will ascend to godhood. The party has been identified as candidates by the prophecy\'s oracular network. They are not the only ones: a former hero named Aldren seeks the same crown. He is desperate, powerful, and running out of time. The race spans planes, continents, and the moral boundaries of what someone should become. Each artifact tests the wielder. Not all tests are fair.',
  hook: 'A constellation shifts. Seven new stars appear, each pointing to a location on a different plane. Every oracle on the material plane speaks the same words simultaneously: "The Crown awaits. The worthy will ascend. The unworthy will be consumed." The party receives a map that only they can read. On the reverse: "Beware the gift. The gods do not share power willingly."',
  twist:
    'The prophecy was written by the current gods. It is not a path to ascension. It is a trap. The gods do not want a mortal ascending to their level. Every artifact is a test designed to corrupt the wielder: one inflames ambition, another breeds paranoia, a third demands sacrifice of loved ones. A mortal who gathers all seven becomes a puppet of the pantheon, not a peer. Aldren already ascended once, a century ago. He was corrupted, used, and cast down. He is trying again because he believes he can resist the corruption this time. He might be wrong. He might be right.',
  climax:
    'The seventh artifact. Aldren and the party converge. They both know the truth now. The crown is a cage, not a throne. But Aldren believes he can break the cage from inside - ascend, resist the corruption, and reform the divine order. The party must decide: help Aldren ascend and hope he is strong enough, destroy the artifacts and end the prophecy forever, or attempt the ascension themselves with the knowledge of the trap. Each choice has consequences that reshape the divine hierarchy.',
  acts: [
    {
      title: 'Act 1: The Race Begins',
      summary: 'The prophecy activates. The party and Aldren both seek the first artifacts. Each artifact is guarded by a trial that reveals the seeker\'s character.',
      keyEvents: [
        'The constellation event: every oracle speaks at once. The race begins.',
        'Artifact 1 (Material Plane): the Star of Ambition. Grants power, whispers of potential. The first corruption test.',
        'Artifact 2 (Feywild): the Star of Memory. Shows the wielder their greatest failure. Demands they relive it.',
        'First encounter with Aldren: he is not a villain. He is a man who has been through this before and bears the scars.',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: The Trials',
      summary: 'Deeper into the planes. The artifacts grow more dangerous. The party discovers the prophecy\'s true author.',
      keyEvents: [
        'Artifact 3 (Shadowfell): the Star of Sacrifice. Demands the wielder give up something they love. The cost is real.',
        'Artifact 4 (Elemental Planes): the Star of Doubt. Makes the wielder question everything, including their mission.',
        'The discovery: a dead god\'s journal reveals the prophecy was authored by the pantheon as a control mechanism',
        'Aldren\'s history: he ascended, was controlled, and was thrown back to mortality. His scars glow with residual divinity.',
      ],
      estimatedSessions: 8,
    },
    {
      title: 'Act 3: The Crown',
      summary: 'The final artifacts, the confrontation with Aldren, and the choice that determines the future of divinity.',
      keyEvents: [
        'Artifacts 5 and 6 acquired in rapid succession. The crown\'s influence is overwhelming. Reality bends around the wielder.',
        'Artifact 7: the Star of Will. Located in the divine plane itself. The gods are watching.',
        'Aldren proposes an alliance: "Together we can break the cage. Alone, it breaks us."',
        'The ascension chamber: the crown assembles. The trap springs. The party must choose their path.',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'Aldren the Fallen',
      role: 'rival / tragic hero',
      personality: 'A former mortal hero who ascended to godhood a century ago and was controlled by the pantheon until they discarded him. He is haunted, determined, and dangerously certain he can do it right this time. "I know the trap. I walked into it once. I will not be the same fool twice. I will be a different one."',
      secret: 'He still has a fragment of divine power. He is not fully mortal. The gods did not take everything when they cast him down.',
    },
    {
      name: 'Oracle Syris',
      role: 'prophecy interpreter / unreliable advisor',
      personality: 'One of the oracles who spoke the prophecy. She does not understand what she channels. She is compelled to help the seekers even as she suspects the prophecy is a lie. "I speak what the stars say. I do not choose what the stars say."',
      secret: 'She can hear the gods arguing about the party. They are afraid.',
    },
    {
      name: 'The Keeper of the Seventh',
      role: 'divine guardian / the gods\' enforcer',
      personality: 'A celestial construct guarding the final artifact. It is programmed to test the worthy. It is beginning to question its instructions. "I was told to guard this for the worthy. I was not told what worthy means. I was told you would tell me. Will you?"',
    },
    {
      name: 'Vesper',
      role: 'Aldren\'s companion / moral anchor',
      personality: 'A tiefling warlock who has traveled with Aldren for decades. She believes in him but fears what the crown will do to him again. She is the voice of caution in his ear. "He deserves to try. He does not deserve to suffer again."',
    },
  ],
  keyLocations: [
    { name: 'The Planar Circuit', description: 'Seven locations across seven planes, each holding an artifact. From the Feywild to the Shadowfell to the Elemental Chaos.', significance: 'The campaign\'s primary exploration arc.' },
    { name: 'The Fallen Sanctum', description: 'Aldren\'s hidden base: a pocket dimension where he was cast after his failed ascension. Scarred with divine burns. His war room for the second attempt.', significance: 'Where the truth about the prophecy is fully revealed.' },
    { name: 'The Ascension Chamber', description: 'A space between planes where the crown assembles and the mortal touches divinity. The room where gods are made - or broken.', significance: 'The final scene. The choice. The transformation.' },
  ],
  dataSystems: ['legendaryWeapon', 'ancientProphecy', 'cataclysmCountdown', 'encounterWaves', 'puzzleTrap', 'magicalAnomaly', 'factionWar', 'dreamSequence'],
};
