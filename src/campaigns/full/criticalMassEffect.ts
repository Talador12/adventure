import type { FullCampaign } from '../types';

export const criticalMassEffect: FullCampaign = {
  id: 'full-critical-mass-effect',
  type: 'full',
  title: 'Critical Mass Effect',
  tagline: 'A wizard discovered the rules of reality. He never splits the party. He always checks for traps. He is unstoppable.',
  tone: 'comedic',
  themes: ['comedy', 'meta', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 14,
  settingSummary:
    'The wizard Metagros the Calculated discovered a set of stone tablets describing the "Rules of Reality" — the underlying mechanical laws governing the universe. He knows that fire erupts in a 20-foot sphere. He knows that standing exactly 31 feet from an enemy makes him untouchable by most effects. He never enters a room without checking for traps. He knows action economy. He is the most dangerous person alive, and every kingdom has failed to stop him because he plays by rules nobody else can see.',
  hook: 'The party is hired by a coalition of frustrated rulers. A wizard has been single-handedly destabilizing kingdoms, stealing artifacts, and defeating armies — not through raw power, but through an uncanny ability to exploit the world itself. He stands in specific spots. He takes specific actions in a specific order. He seems to know how reality works at a fundamental level. "He is not stronger than us. He just knows the rules and we do not."',
  twist:
    'Metagros is not evil. He discovered the Rules and realized that reality is a constructed system — a game. Everything he has done has been an attempt to find other people who can see the Rules, because knowing reality is a game and being the only one who knows is a special kind of loneliness. Every "heist" was a test. Every "theft" was bait. He is looking for players, not opponents. He wants someone to tell him it still matters.',
  climax:
    'The party confronts Metagros in his sanctum — a room he has optimized for every tactical advantage. He is unbeatable by the Rules. But the party has something he does not: each other. They do things the Rules say are suboptimal — sacrifice actions to help allies, take hits they could avoid, make choices that are mechanically wrong but narratively right. The realization breaks something in Metagros. The Rules say none of that should work. But it does. Because the game was never about the rules.',
  acts: [
    {
      title: 'Act 1: The Man Who Broke Reality',
      summary:
        'The party investigates Metagros\'s trail of impossible victories. Every battle site shows the same pattern: perfect positioning, perfect timing, zero wasted actions. They begin to learn the Rules themselves through fragments left behind.',
      keyEvents: [
        'Briefing: the coalition explains Metagros\'s impossible feats',
        'Investigation: battle sites where geometry was weaponized — scorch marks in perfect 20-foot spheres',
        'Finding a Rule Fragment: a stone tablet that describes how healing works (mechanically)',
        'First encounter: Metagros appears, defeats an ambush without taking damage, and leaves a note saying "you are almost interesting"',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Learning the Rules',
      summary:
        'The party studies the Rule Fragments and begins seeing reality differently. They learn to exploit the Rules too — but Metagros is always three steps ahead. Until they realize his pattern is not conquest. It is communication.',
      keyEvents: [
        'The party learns basic Rules: movement, action economy, area effects',
        'They use the Rules to win an "impossible" encounter — it feels like cheating',
        'Metagros leaves messages hidden in his tactical choices — encoded in positioning',
        'Decoded message: "I know you can see the Rules now. Come find me. Please."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Game Within the Game',
      summary:
        'The party reaches Metagros\'s sanctum. He has built a perfectly optimized fortress. By the Rules, he cannot lose. The party must choose: beat him at his own game (impossible), break the Rules entirely (dangerous), or show him that the things the Rules cannot quantify — friendship, sacrifice, meaning — are what make reality worth living in.',
      keyEvents: [
        'The sanctum: every room is a tactical puzzle designed by someone who knows the answer key',
        'Metagros\'s confession: he found the Rules 20 years ago and has been alone ever since',
        'The final battle: Metagros fights at full optimization, the party fights with heart',
        'The Rules crack — suboptimal choices produce optimal outcomes because meaning is not mechanical',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Metagros the Calculated',
      role: 'antagonist / tragic figure',
      personality:
        'A brilliant wizard who speaks in precise measurements and probabilities. Not cruel, just optimized. He has not had a genuine conversation in 20 years because he can predict what everyone will say. "You are standing in a suboptimal position. Three feet to the left. There. Now we can talk."',
      secret: 'He wants to be surprised. He wants someone to do something he cannot predict. He wants to believe reality is more than mathematics.',
    },
    {
      name: 'General Ironwood',
      role: 'quest giver / frustrated leader',
      personality:
        'The coalition\'s military commander. A veteran of dozens of campaigns who cannot comprehend why a single wizard keeps defeating entire armies. "He does not fight harder. He fights CORRECTLY. And I cannot figure out what that means."',
    },
    {
      name: 'Pip',
      role: 'comic relief / Rule breaker',
      personality:
        'A goblin who was exposed to a Rule Fragment and now occasionally glitches — walking through walls, falling upward, or briefly existing in two places. She does not understand the Rules at all but somehow breaks them constantly. Metagros is fascinated by her.',
      secret: 'She is a natural anomaly — proof that the Rules have exceptions. Metagros has been trying to study her without her knowing.',
    },
    {
      name: 'The Echo',
      role: 'environmental threat',
      personality:
        'A semi-sentient manifestation of the Rules themselves. It appears when someone exploits the Rules too aggressively, "correcting" reality. Speaks in dry, mechanical descriptions of what is happening. "The creature takes 8d6 fire damage. The creature is displeased."',
    },
  ],
  keyLocations: [
    {
      name: 'The Calculated Sanctum',
      description: 'Metagros\'s fortress, designed with mathematical precision. Every hallway is exactly 30 feet long. Every room has optimal cover placement. The furniture is positioned for tactical advantage.',
      significance: 'The final dungeon — a puzzle box designed by someone who knows the answer to every puzzle.',
    },
    {
      name: 'The Rule Archive',
      description: 'A hidden vault containing the original stone tablets that describe reality\'s rules. The tablets are warm to the touch and hum faintly, as if reality is uncomfortable being described.',
      significance: 'Where the party learns the Rules and decides what to do with that knowledge.',
    },
    {
      name: 'The Anomaly Field',
      description: 'A region where the Rules break down. Gravity changes direction. Time stutters. A fireball might heal you. Pip loves it here.',
      significance: 'Proof that the Rules are not absolute and that reality is more than its mechanics.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'encounterDifficultyTuner',
    'plotTwistEngine',
    'villainMonologue',
    'trapGenerator',
    'riddleGenerator',
    'environmentalHazard',
    'moralDilemma',
  ],
};
