import type { FullCampaign } from '../types';

export const theGiantsPerspective: FullCampaign = {
  id: 'full-the-giants-perspective',
  type: 'full',
  title: "The Giant's Perspective",
  tagline: 'You are 60 feet tall. The door is 6 feet. Good luck joining the Adventurers Guild.',
  tone: 'comedic',
  themes: ['comedy', 'urban', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 15,
  settingSummary:
    'The party are giants living in a world built for people one-tenth their size. Every doorway is a mouse hole. Every tavern is a dollhouse. A "fearsome dragon" barely reaches their kneecaps. They desperately want to join the Adventurers Guild, get jobs, pay rent, and be part of society - but they keep accidentally stepping on things. The comedy writes itself. The heart beneath it: they just want to belong in a world that was not built for them.',
  hook:
    'The party wakes up in a field outside the city of Thornwall. They are 60 feet tall. They have always been 60 feet tall (they think). They have an appointment at the Adventurers Guild to register as an official party. The Guild is inside a building with a 7-foot door. Their first quest: get inside without destroying the building. They fail. The Guild sends them a bill. The campaign has begun.',
  twist:
    'They are not giants. They are normal-sized. A wizard named Pindrop Minimax attempted to create a pocket dimension and instead shrank the entire material plane. Every person, building, tree, and mountain was reduced to one-tenth scale - except the party, who were in an antimagic field at the time. Everyone else thinks THEY are normal and the party are freakish giants. The wizard is the size of a mouse and hiding in a thimble, too embarrassed to admit what happened.',
  climax:
    'Pindrop is found. He can reverse the spell, but it requires the party to shrink too - permanently giving up their giant perspective. Or they can stay big and the world stays small. The emotional gut-punch: the world has adapted to its new size. Children have grown up small. Cities rebuilt. If they reverse it, they fix reality but break everything that was rebuilt. The party must choose between the world that was and the world that is.',
  acts: [
    {
      title: 'Act 1: Big Problems',
      summary:
        'The party navigates daily life at giant scale. Getting registered at the Guild. Finding housing (a barn). Earning gold (one coin is the size of a dinner plate to everyone else). Every mundane task is a hilarious disaster. Combat encounters are absurd - bandits flee on sight, a "dire wolf" is a puppy.',
      keyEvents: [
        'Guild registration: filling out paperwork with a quill the size of a needle, dictating to a terrified clerk',
        'Housing crisis: the only building that fits them is an abandoned grain silo on the edge of town',
        'First quest: clear rats from a basement. The party IS too big to fit in the basement. They must improvise.',
        'A "fearsome dragon" attacks the city. It is knee-height. The party punts it. The city is horrified and grateful.',
        'The party accidentally destroys the town fountain by sitting on it. Property damage bill: 3,000 gold.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Fitting In',
      summary:
        'The party tries harder to integrate. They build giant-scale furniture, start a business (manual labor is trivial at their size), and develop genuine friendships with tiny people. But something is wrong - old maps show the mountains were bigger. Rivers were wider. The world does not match its own history.',
      keyEvents: [
        'Starting a construction company: they can build a house in an afternoon by hand',
        'A friendship forms with a halfling innkeeper who climbs onto their shoulder to chat at eye level',
        'An old cartographer shows maps from 50 years ago - the scale is completely different',
        'Discovery: a preserved pre-shrink apple in a wizard vault. It is the same size as the party. Apples should not be person-sized.',
        'The name Pindrop Minimax surfaces in research - a transmutation wizard who vanished the same day the party "became giants"',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Small Truth',
      summary:
        'The party tracks down Pindrop, who is hiding in a teacup in his collapsed tower. He confesses. The reversal spell exists but the consequences are real. The world has rebuilt at small scale. Reversing it means ripping apart everything these tiny people built. The comedy becomes bittersweet as the party faces a choice with no clean answer.',
      keyEvents: [
        'Finding Pindrop in his thimble-sized hiding spot, weeping into a cup the size of a raindrop',
        'The confession: he shrank the world, not them. The spell was supposed to compress a pocket dimension, not reality.',
        'The reversal ritual: requires the party to channel their "unshrunk" essence as an anchor point',
        'Community hearing: the tiny people vote on whether they WANT to be restored. The vote splits.',
        'Final choice: restore reality (destroying rebuilt infrastructure), stay as-is (accepting permanent wrongness), or a compromise - restore gradually over decades so the world can adapt',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Pindrop Minimax',
      role: 'accidental villain / wizard',
      personality:
        'A transmutation wizard with more ambition than competence. Currently mouse-sized and hiding in a teacup. Deeply ashamed. Speaks in a squeaky voice and cries easily. He did not mean to shrink the world. He just wanted a nice pocket dimension for his book collection.',
      secret: 'He has known how to reverse it for years but is terrified of the consequences - and of being blamed.',
    },
    {
      name: 'Bramble Thornfoot',
      role: 'halfling innkeeper / best friend',
      personality:
        'A halfling who runs the Tiny Tankard tavern. Climbs onto the party member shoulders to have conversations at eye level. Unflappable. Serves drinks in thimbles "because that is a normal cup size, thank you." The emotional anchor of the campaign.',
    },
    {
      name: 'Guild Registrar Fenn',
      role: 'bureaucratic obstacle / comic relief',
      personality:
        'A deeply stressed human clerk at the Adventurers Guild who insists on following protocol regardless of the applicant being 60 feet tall. "Sir, I need you to sign on the line. THE line. No, you just signed on the entire page. We will need a new form."',
    },
    {
      name: 'Councilwoman Marga Slatewood',
      role: 'political antagonist',
      personality:
        'Head of the Thornwall city council. Publicly welcoming, privately furious about property damage. Files injunctions, zoning complaints, and noise ordinances against the party. Not evil - just a bureaucrat dealing with an unprecedented situation.',
      secret: 'She suspects the truth about the shrinking and is terrified that reversing it will destroy her political legacy.',
    },
  ],
  keyLocations: [
    {
      name: 'Thornwall',
      description:
        'A mid-sized city that looks like a detailed model village from the party perspective. Buildings are knee-height. Streets are footpaths. The market square is a coffee table.',
      significance: 'Home base. Where every mundane task becomes a slapstick challenge.',
    },
    {
      name: 'The Grain Silo',
      description:
        'An abandoned grain storage building on the outskirts of town. The only structure tall enough for the party to sleep in. They have decorated it with wagon-wheel chandeliers and barn-door shutters.',
      significance: 'The party home. Where the comedy turns domestic and the friendships form.',
    },
    {
      name: "Pindrop's Collapsed Tower",
      description:
        'A wizard tower that "collapsed" during the shrinking. In reality it is intact - just ten times smaller than it should be. Pindrop lives in what used to be his study, now the size of a jewelry box.',
      significance: 'Where the truth is revealed and the final choice is made.',
    },
  ],
  dataSystems: ['shopInventory', 'npcGenerator', 'fantasyInsults', 'combatNarration', 'urbanEncounter'],
};
