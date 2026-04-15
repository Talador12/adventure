import type { FullCampaign } from '../types';

export const immortalGoblin: FullCampaign = {
  id: 'full-immortal-goblin',
  type: 'full',
  title: 'The Immortal Goblin',
  tagline: 'One goblin. Completely unkillable. Not powerful - just unkillable. It wants to be your friend.',
  tone: 'shenanigans',
  themes: ['comedy', 'classic_fantasy', 'exploration'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 9 },
  estimatedSessions: 12,
  settingSummary:
    'Skrix is a goblin. He is three feet tall, has an IQ of roughly room temperature, and is completely, totally, absolutely unkillable. Not powerful. Not strong. Not magic resistant. Just unkillable. Drop him off a cliff - he bounces. Disintegrate him - he reassembles. Banish him - he appears behind you. He does not understand why. He does not care. He has decided the party is his best friend and will follow them EVERYWHERE. He names himself after a party member. He starts a fan club. He takes notes on the party\'s adventures in crayon. He is not a threat. He is an inevitability. And he will not stop.',
  hook: 'The party fights a goblin raiding party. Standard encounter. One goblin remains. They kill it. It stands back up. They kill it again. It stands back up again. They kill it a third time. It stands up, brushes itself off, and says: "You are AMAZING. I am Skrix. We are best friends now. Where are we going?" The goblin follows them out of the dungeon. He follows them to the inn. He follows them to bed. He is sleeping at the foot of the fighter\'s bed like a dog. He will not go away.',
  twist:
    'Skrix is unkillable because he is the physical anchor of a dying god. When the god Eternal Persistence was fading from existence, it poured its last divine spark into the nearest living creature - which happened to be Skrix. The goblin is a walking phylactery for a concept. As long as Skrix persists, the abstract concept of persistence exists in the universe. If Skrix is ever truly destroyed (which has been impossible so far), the universe loses the ability to persevere. Giving up becomes the default. Nobody finishes anything. The party must protect the most annoying creature in existence to preserve the cosmic concept of not quitting.',
  climax:
    'A cult devoted to entropy discovers what Skrix is and attempts to truly destroy him using a weapon designed to kill concepts. The party must defend Skrix in the most important and most absurd battle of their lives - protecting a three-foot goblin who keeps trying to "help" during the fight by throwing rocks at the wrong people and offering snacks at critical moments. If Skrix falls, persistence dies. The fate of the universe rests on the shoulders of the most annoying goblin alive.',
  acts: [
    {
      title: 'Act 1: He Will Not Go Away',
      summary:
        'Skrix attaches to the party and will not leave. They try everything: abandoning him, trapping him, teleporting away. He always comes back. He is relentlessly cheerful and completely useless. The party must complete normal adventuring quests while a indestructible goblin tries to participate.',
      keyEvents: [
        'First death and resurrection: the party kills Skrix three times in two minutes. He does not mind.',
        'Attachment: Skrix names himself after the fighter. "I am Skrix [Fighter Name]. We are the same."',
        'The fan club: Skrix starts recruiting other goblins to admire the party. There are commemorative pins.',
        'Abandonment attempts: the party leaves Skrix on an island. He appears in their tent that night.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Why Can He Not Die?',
      summary:
        'The party investigates Skrix\'s immortality and discovers the divine spark. The cult of entropy is introduced. Skrix becomes more than an annoyance - he becomes a responsibility. The party starts to care about the goblin they have been trying to ditch.',
      keyEvents: [
        'Investigation: a sage examines Skrix and goes pale. "He is a vessel. For something ENORMOUS."',
        'The divine spark: the remnant of the god of persistence, burning inside a goblin who eats crayons.',
        'The cult of entropy: nihilists who want to destroy the concept of persistence itself.',
        'Bonding: the party stops trying to ditch Skrix. He notices. He cries happy tears. It is messy.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Last Stand for Not Giving Up',
      summary:
        'The cult attacks with a concept-killing weapon. The party must protect Skrix in a battle where the stakes are cosmic but the VIP is a goblin who keeps wandering into the crossfire offering people granola bars.',
      keyEvents: [
        'The cult assembles: a weapon forged from condensed apathy, designed to destroy abstract concepts.',
        'The battle: the party fights entropy cultists while Skrix "helps" by throwing rocks at allies.',
        'The critical moment: the weapon fires. Skrix walks in front of it. The party dives to shield him.',
        'The spark holds: Skrix survives. Persistence survives. Skrix gives everyone a hug. Nobody is dry-eyed.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Skrix',
      role: 'the immortal goblin / the entire point',
      personality:
        'An aggressively affectionate, completely unkillable goblin with the intelligence of a golden retriever and the persistence of a cosmic force. He loves the party unconditionally. He draws pictures of their adventures in crayon. He has named all his teeth after party members. "You are my best friend. ALL of you are my best friend. I have so many best friends."',
      secret: 'He is dimly aware something is different about him. He calls it "the warm thing inside." He does not understand it but he knows it is important. When he is scared, it burns brighter.',
    },
    {
      name: 'The Remnant of Eternal Persistence',
      role: 'dying god / passenger',
      personality:
        'The fading consciousness of a god, now residing in a goblin. It cannot speak directly but influences Skrix\'s emotions. When the party considers abandoning Skrix, the remnant makes Skrix look at them with devastating sincerity. It chose Skrix because goblins never, ever give up.',
    },
    {
      name: 'Nihilex the Undone',
      role: 'entropy cult leader / villain',
      personality:
        'A lich who believes existence is suffering and the solution is to unmake abstract concepts one at a time. Has already destroyed the concept of "Tuesday" in three dimensions. Considers persistence the most dangerous concept because it keeps people going when they should stop. "Giving up is mercy. I am the most merciful being alive."',
    },
    {
      name: 'Sergeant Gretta Holdfast',
      role: 'soldier / Skrix fan club member #1',
      personality:
        'A human soldier who encountered Skrix independently and was so impressed by his inability to die that she became fan club member #1. She has a commemorative pin. She is not ashamed. "That goblin has been stabbed, burned, dissolved, and banished. He is STILL smiling. He is the bravest creature I have ever met."',
    },
  ],
  keyLocations: [
    {
      name: 'Everywhere the Party Goes',
      description: 'Skrix follows. Every tavern, dungeon, castle, and campsite the party visits now has a goblin in it. He does not need to sleep but he does anyway because the party does and he wants to fit in.',
      significance: 'The campaign has no fixed location because Skrix IS the location. Where he goes, the story goes.',
    },
    {
      name: 'The Shrine of Eternal Persistence',
      description: 'A crumbling temple to the forgotten god, now overgrown. The altar still glows faintly - the same light that burns inside Skrix. Crayon drawings cover the walls. Skrix has been here before. He does not remember when.',
      significance: 'Where the party learns the truth about Skrix\'s divine nature.',
    },
    {
      name: 'The Entropy Sanctum',
      description: 'A pocket dimension where concepts go to die. The air is thick with apathy. Colors are muted. Motivation is suppressed. The cult\'s headquarters and the site of the final battle.',
      significance: 'Where the concept-killing weapon is housed and where the final stand takes place.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'socialEncounter',
    'plotTwistEngine',
    'fantasyInsults',
    'explorationHazard',
    'environmentalHazard',
    'villainMonologue',
    'riddleGenerator',
  ],
};
