import type { FullCampaign } from '../types';

export const theDungeonHasReviews: FullCampaign = {
  id: 'full-the-dungeon-has-reviews',
  type: 'full',
  title: 'The Dungeon Has Reviews',
  tagline: 'Dungeons have Yelp ratings. The boss reads them. Your run is being live-reviewed by a magical critic.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 7 },
  estimatedSessions: 10,
  settingSummary:
    'The Dungeon Accreditation Board (DAB) has implemented a review system. Every dungeon in the realm now has a star rating visible at its entrance. Adventurers rate them after runs. Dungeon bosses read the reviews and respond. A 5-star dungeon gets more adventurers (and thus more treasure flow from the cosmic economy). A 2-star dungeon gets shut down. The party has been assigned a critic - Quillsworth, a magical construct who follows them through their next dungeon run and rates everything in real time. The dungeon boss knows the critic is coming and is PANICKING. He is bribing the party. He is renovating mid-run. He is putting out a guest book.',
  hook: 'The party approaches a dungeon and sees the sign: "THE CRYPTS OF MALVORAN - 3.2 Stars (47 reviews). Recent: \'Traps were predictable. Boss fight too easy. Loot was mid.\' Response from Management: \'We are addressing your concerns and have hired new trap consultants.\'" A small floating quill creature introduces itself as their assigned critic. "I will be observing your experience. Please do not interact with me. I am objective."',
  twist:
    'The Dungeon Accreditation Board is run by a retired adventurer who realized that regulating dungeons is more profitable than raiding them. The review system is a protection racket. Low ratings are manufactured to extort dungeon bosses. High ratings are sold to the highest bidder. The critic Quillsworth is starting to suspect the system is corrupt but has no proof. The dungeon boss knows the system is corrupt but cannot say anything without being shut down.',
  climax:
    'The party discovers the corruption and must decide: expose the DAB (which would collapse the dungeon economy), play within the corrupt system (leaving the racket intact but getting the boss a fair rating), or replace the system with something honest. The final "battle" is a board meeting where the party presents evidence, the DAB chair tries to silence them, and every dungeon boss in the region attends as a stakeholder. Parliamentary procedure has never been this violent.',
  acts: [
    {
      title: 'Act 1: The Reviewed Run',
      summary:
        'The party does a dungeon crawl while being live-reviewed. Every trap, every fight, every piece of loot is rated in real time. The dungeon boss is desperately trying to make a good impression - renovating rooms the party has not reached yet, planting better loot, and coaching his minions on customer service.',
      keyEvents: [
        'The entrance: rated on ambiance, signage, and "first impression dread factor."',
        'Trap review: "The spike pit was adequate but lacked innovation. 3 stars."',
        'The boss panic-renovates the throne room mid-dungeon. The party hears construction noises ahead.',
        'Boss fight: the boss is more concerned about the review than the fight. "Was that dramatic enough? Should I monologue more?"',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Corruption',
      summary:
        'After the run, the boss begs the party to help improve his rating. Investigation reveals the DAB\'s corruption. Other dungeon bosses share similar stories. The party becomes investigators in a conspiracy that spans the entire dungeon industry.',
      keyEvents: [
        'The boss\'s plea: "They gave me 2 stars last quarter. I cannot survive another bad review."',
        'The rival dungeon: a mediocre crypt with 5 stars because the boss paid for the rating.',
        'Quillsworth\'s doubts: the critic suspects the system but is afraid to speak up.',
        'Evidence gathering: the party finds falsified reviews, bribed critics, and fabricated inspection reports.',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 3: The Board Meeting',
      summary:
        'The party convenes an emergency meeting of the Dungeon Accreditation Board with every dungeon boss in attendance. The DAB chair tries to suppress the evidence. The meeting descends into chaos. Dungeon bosses argue about fair ratings. The solution requires convincing an industry that dungeons can self-regulate.',
      keyEvents: [
        'The meeting: 40 dungeon bosses, a corrupt board, and one party with evidence.',
        'The DAB chair\'s defense: "Without us, dungeons would be UNREGULATED. Think of the adventurers."',
        'Quillsworth testifies: "I was told to rate the Crypts of Malvoran a 2 before I entered."',
        'Resolution: the DAB is dissolved or reformed. The dungeon economy survives. The boss gets 4 stars. He cries.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Lord Malvoran',
      role: 'dungeon boss / anxious host',
      personality:
        'A vampire lord who takes immense pride in his dungeon and is devastated by bad reviews. Spends more time on trap design and ambiance than on being evil. "I installed new sconces. SCONCES. Do you know how hard it is to source gothic sconces? The review said my lighting was \'uninspired.\'"',
      secret: 'He is not actually evil. He inherited the dungeon from his father and runs it because the family legacy depends on it. He would rather be an interior designer.',
    },
    {
      name: 'Quillsworth',
      role: 'magical critic / assigned reviewer',
      personality:
        'A floating enchanted quill construct who writes reviews in real time on parchment that trails behind it. Tries desperately to be objective but has opinions it cannot suppress. "Professionally, that trap was a 3. Personally, the part where the floor became bees was inspired."',
    },
    {
      name: 'Chairperson Docket Goldscale',
      role: 'DAB chairman / corrupt regulator',
      personality:
        'A dragonborn bureaucrat who turned dungeon regulation into a protection racket. Wears expensive suits. Carries a briefcase full of fake inspection reports. Speaks in corporate doublespeak. "We do not \'extort.\' We provide \'premium accreditation services.\' There is a brochure."',
    },
    {
      name: 'Gary the Goblin (Employee of the Month)',
      role: 'dungeon minion / overachiever',
      personality:
        'A goblin in Malvoran\'s dungeon who took the customer service training seriously. Greets adventurers warmly before attacking them. "Welcome to the Crypts of Malvoran! I will be your assailant today. Our specials include a pit trap and a crossbow volley. Can I start you off with some menacing laughter?"',
    },
  ],
  keyLocations: [
    {
      name: 'The Crypts of Malvoran',
      description: 'A gothic dungeon with excellent production values and inconsistent reviews. New sconces, freshly mopped floors, and a suggestion box at the entrance. The boss fight arena has mood lighting.',
      significance: 'The primary dungeon and the setting for the reviewed run.',
    },
    {
      name: 'DAB Headquarters',
      description: 'A corporate office building that is technically inside a dungeon for tax purposes. Cubicles, filing cabinets, a break room. The most boring dungeon in existence, which is ironic.',
      significance: 'Where the corruption is headquartered and where the final board meeting takes place.',
    },
    {
      name: 'The 5-Star Sham (The Gilded Crypt)',
      description: 'A mediocre dungeon with a perfect rating because the boss paid for it. The traps are secondhand. The loot is painted gold. The boss fight is against a guy in a costume. 5 stars.',
      significance: 'Proof of the DAB\'s corruption and the contrast to Malvoran\'s genuine effort.',
    },
  ],
  dataSystems: [
    'dungeonDressing',
    'trapGenerator',
    'combatNarration',
    'socialEncounter',
    'plotTwistEngine',
    'fantasyInsults',
    'riddleGenerator',
    'villainMonologue',
  ],
};
