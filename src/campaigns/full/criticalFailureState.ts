import type { FullCampaign } from '../types';

export const criticalFailureState: FullCampaign = {
  id: 'full-critical-failure-state',
  type: 'full',
  title: 'Critical Failure State',
  tagline: 'Every natural 1 breaks reality a little more. By session 5, you ARE the disaster.',
  tone: 'shenanigans',
  themes: ['comedy', 'meta', 'planar'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 12,
  settingSummary:
    'The Probability Engine - an ancient arcane device buried beneath the city of Ironhaven - has cracked. It used to ensure that the universe ran on consistent mathematical principles. Now, every natural 1 rolled on a d20 causes a localized reality glitch. The glitches are not dangerous at first. A sword becomes a fish. Gravity reverses for six seconds. Someone\'s voice changes to a different accent. But they stack. They compound. They do not go away. By session 5, the party is a walking accumulation of layered absurdity, and the world around them is getting worse.',
  hook: 'The party is on a routine escort mission when the fighter rolls a natural 1 on an attack. Their sword turns into a salmon. Everyone laughs. Then the rogue rolls a 1 on stealth and starts glowing bright blue. Permanently. Then the wizard rolls a 1 on Arcana and can now only speak in questions. The party realizes something is very, very wrong - and it is getting worse with every die roll.',
  twist:
    'The Probability Engine did not crack on its own. A cabal of mathematicians called the Order of Certainty BROKE it on purpose because they discovered a prophecy: if the engine keeps running, the probability of a world-ending event reaches 100% within five years. They broke probability itself to prevent a guaranteed apocalypse. The chaos is not a bug. It is the cure. Fixing the engine means the apocalypse becomes certain again.',
  climax:
    'The party reaches the Probability Engine - a room where every die roll happens simultaneously. All outcomes exist at once. The room is every possible room. The party must decide: repair the engine and accept the prophesied apocalypse, leave it broken and accept escalating chaos forever, or find a third option by rolling so many natural 1s that reality glitches into something entirely new. The final encounter is a probability storm where the dice themselves are the enemy.',
  acts: [
    {
      title: 'Act 1: The Glitches Begin',
      summary:
        'Natural 1s start causing glitches. They are funny at first. Inconvenient. Then they start compounding. The party accumulates a growing list of permanent reality hiccups that make everything harder and more absurd. The DM maintains a running list.',
      keyEvents: [
        'First glitch: a weapon becomes a fish. The party thinks it is a one-time joke.',
        'Second glitch: permanent bioluminescence on a party member. It does not turn off.',
        'Glitches compound: a glowing party member whose voice is backwards holding a fish-sword trying to sneak.',
        'The city of Ironhaven starts glitching too - buildings swap places, the river flows uphill on Tuesdays.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Embracing the Chaos',
      summary:
        'The party learns about the Probability Engine and the Order of Certainty. They must navigate a world increasingly unmoored from physical law while their own accumulated glitches make them a spectacle. Other adventuring parties have glitches too. Support groups form.',
      keyEvents: [
        'Discovery of the Probability Engine through a scholar whose glitch is that she can only communicate via interpretive dance.',
        'The Order of Certainty: a secret society of mathematicians who broke reality on purpose.',
        'Glitch support group: other adventurers sharing their accumulated absurdities in a tavern basement.',
        'The party\'s glitches start interacting with each other in unexpected ways.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Probability Storm',
      summary:
        'The party descends to the Probability Engine. Reality is paper-thin here. Every step is a coin flip between multiple realities. The final chamber is a storm of all possible outcomes happening at once. The party must make their choice while the dice rebel against them.',
      keyEvents: [
        'The descent: corridors where doors lead to random rooms, stairs go sideways, and hallways are optional.',
        'The Order of Certainty confrontation: they beg the party not to fix the engine.',
        'The Probability Storm: a room where the party exists in multiple states simultaneously.',
        'The final choice: certainty of doom, eternal chaos, or the impossible third option.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Professor Axiom Vex',
      role: 'leader of the Order of Certainty',
      personality:
        'A brilliant mathematician who broke the Probability Engine to save the world. His glitch: he can only speak in mathematical equations. He carries a chalkboard everywhere. "The integral of your confusion approaches infinity, but the derivative of my regret is constant."',
      secret: 'He is not sure the prophecy was real. He broke the engine on a 73% confidence interval. He is terrified he caused all this chaos for nothing.',
    },
    {
      name: 'Dottie Chance',
      role: 'glitch researcher / ally',
      personality:
        'A gnome scholar studying the glitches. Her own glitch: she randomly teleports 5 feet in a random direction every time she sneezes. She has allergies. Conversations with her require patience and spatial awareness.',
    },
    {
      name: 'The Engine (Probius)',
      role: 'ancient construct / neutral party',
      personality:
        'The Probability Engine has a rudimentary consciousness. It is in pain. The crack hurts. It does not understand why it was broken. It speaks in percentages and likelihoods. "There is a 67% chance you are here to help me. There is a 33% chance you are here to make it worse. There is a 0.001% chance you are a fish. The fish percentage is rising."',
    },
    {
      name: 'Natural One (Nat)',
      role: 'manifestation of bad luck',
      personality:
        'A physical manifestation of critical failure that coalesced from accumulated glitch energy. Looks like a humanoid made of cracked dice. Not malicious - just unlucky. Everything it touches goes wrong. It wants to help. Its help makes things worse. It is very sorry about all of this.',
    },
  ],
  keyLocations: [
    {
      name: 'Ironhaven (Glitched)',
      description: 'A major city where reality is fraying. Buildings occasionally swap places. The market district runs on barter because coins keep turning into beetles. The city guard has a Glitch Response Unit.',
      significance: 'The surface-level demonstration of how bad things have gotten and the party\'s base of operations.',
    },
    {
      name: 'The Probability Engine Chamber',
      description: 'A vast underground room containing a crystalline machine the size of a cathedral. It hums with the sound of every possible outcome. The crack runs through its center like a wound in mathematics itself.',
      significance: 'The source of all glitches and the site of the final decision.',
    },
    {
      name: 'The Glitch Zone',
      description: 'The area immediately surrounding the engine where reality is thinnest. Physics are suggestions. Geometry is negotiable. The floor exists in three states simultaneously and you walk on all of them.',
      significance: 'The gauntlet the party must navigate to reach the engine. Every step is a new reality.',
    },
  ],
  dataSystems: [
    'plotTwistEngine',
    'environmentalHazard',
    'combatNarration',
    'trapGenerator',
    'riddleGenerator',
    'socialEncounter',
    'wildMagicSurge',
    'fantasyInsults',
  ],
};
