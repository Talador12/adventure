import type { OneShotCampaign } from '../types';

export const thePetShow: OneShotCampaign = {
  id: 'oneshot-the-pet-show',
  type: 'oneshot',
  title: 'The Pet Show',
  tagline: 'Best in Show, but the show is on fire and the blink dog is in another dimension.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2,
  settingSummary:
    'The Annual Familiar and Companion Showcase is the most prestigious pet competition in the realm. Held in the town square of Brighthollow, it draws handlers from across the continent. Categories include Obedience, Agility, Best Costume, Talent, and the coveted Best in Show. The judges are respected, the prizes are legendary, and the cheating is rampant. This year, the party enters their familiars and animal companions. Nothing will go smoothly.',
  hook: 'The party signs up for the Annual Familiar and Companion Showcase. Registration is simple. Everything after registration is chaos. The pseudodragon sets the judge\'s hair on fire during the meet-and-greet. The blink dog keeps teleporting to the finish line before the agility course starts. The owl is wearing a costume of a wizard wearing an owl costume. And someone in the competition is suspiciously confident - their "cat" is way too large and occasionally breathes smoke.',
  twist:
    'Lady Cressida Thornton\'s "champion cat" is a polymorphed young dragon. She has been winning Best in Show for five years running with various polymorphed monsters. Last year\'s "poodle" was a displacer beast. The year before, her "parrot" was a cockatrice. She does not consider this cheating because "the polymorph is part of the grooming process." If the polymorph wears off during the competition, things escalate rapidly.',
  climax:
    'The polymorph drops during Best in Show. A young red dragon is suddenly standing on the judging platform, confused and surrounded by screaming civilians. The party must calm the dragon (it is actually quite young and scared), protect the crowd, deal with Lady Cressida (who is furious about losing, not about the danger), and still win the competition. The judges rule that a dragon is technically a companion. It does not win Best Costume.',
  scenes: [
    {
      title: 'Scene 1: Registration and the Meet-and-Greet',
      summary:
        'The party registers their companions, meets the other contestants, and navigates the social minefield of competitive pet showing. First suspicious signs about Lady Cressida\'s cat.',
      challenge: 'social',
      keyEvents: [
        'Registration chaos: the pseudodragon refuses to be weighed, the blink dog teleports into the judges\' tent',
        'Lady Cressida\'s "cat" hisses at a familiar and the ground shakes slightly',
        'The meet-and-greet: competitors size each other up while their pets cause property damage',
        'A rival contestant warns the party that Cressida always wins and something is not right about her animals',
      ],
    },
    {
      title: 'Scene 2: The Competitions',
      summary:
        'The categories begin. Each is a set-piece comedy scene. Obedience goes wrong, agility breaks physics, and Best Costume is surprisingly emotional. Lady Cressida\'s cat performs suspiciously well.',
      challenge: 'exploration',
      keyEvents: [
        'Obedience: the pseudodragon sets the judge\'s hair on fire instead of sitting on command',
        'Agility: the blink dog completes the course instantly by teleporting, sparking a rules debate',
        'Best Costume: the owl dressed as a wizard dressed as an owl receives a standing ovation',
        'Cressida\'s "cat" clears the agility course by walking through the obstacles instead of around them',
      ],
    },
    {
      title: 'Scene 3: Best in Show',
      summary:
        'The polymorph drops. A dragon appears. Panic erupts. The party must handle the situation, expose Cressida, and resolve the competition.',
      challenge: 'combat',
      keyEvents: [
        'The polymorph wears off mid-judging - a red dragon replaces the "cat" on the platform',
        'The dragon is young, confused, and scared - it was raised as a pet and does not know it is a dragon',
        'Lady Cressida demands the judges honor her entry: "It is still well-groomed!"',
        'The party calms the dragon, protects the crowd, and the judges declare the results',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Lady Cressida Thornton',
      role: 'antagonist',
      personality:
        'A noblewoman who has won Best in Show five years running through increasingly elaborate fraud. She does not see the problem. Her grooming IS legendary. "The polymorph is simply part of my process. Do you criticize a hairdresser for using product?"',
    },
    {
      name: 'Judge Humphrey Thistlewick',
      role: 'authority figure',
      personality:
        'The head judge. A halfling who takes the competition deadly seriously. He has been suspicious of Cressida for years but has never been able to prove anything. His hair is singed from the pseudodragon incident. He is fine.',
    },
    {
      name: 'Ember (the "cat")',
      role: 'innocent monster',
      personality:
        'A young red dragon who was raised from an egg by Cressida and has always been polymorphed. It genuinely thinks it is a cat. When the polymorph drops, it is confused and scared. It tries to purr. It sets things on fire.',
    },
  ],
  keyLocations: [
    {
      name: 'Brighthollow Town Square',
      description: 'A cheerful town square decorated with banners and competition rings. By the end of the one-shot, several banners are on fire and the agility course has been destroyed.',
      significance: 'The entire competition venue.',
    },
    {
      name: 'The Competitor Staging Area',
      description: 'A tent where handlers prepare their companions. It smells like every animal at once. Cressida\'s section is suspiciously well-warded.',
      significance: 'Where clues about Cressida\'s cheating can be found.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'combatNarration',
    'randomCombatTerrain',
    'plotTwistEngine',
  ],
};
