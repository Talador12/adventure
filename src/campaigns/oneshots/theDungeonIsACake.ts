import type { OneShotCampaign } from '../types';

export const theDungeonIsACake: OneShotCampaign = {
  id: 'oneshot-the-dungeon-is-a-cake',
  type: 'oneshot',
  title: 'The Dungeon Is a Cake',
  tagline: 'The walls are fondant. The traps are frosting. The boss is a baker who is FURIOUS someone is eating his masterpiece.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'Grand Patissier Voltaire Fondant spent eleven years building the world\'s largest cake for the Annual Arcane Baking Championship. It is three stories tall, fondant walls, buttercream mortar, sugar-glass windows, and a marzipan drawbridge. It is structurally sound (magically reinforced). It is also, technically, a dungeon. Complete with frosting-pipe traps, gumdrop golems, and a chocolate lava moat that is both chocolate and lava. The party was hired to taste-test it. Voltaire did not expect them to eat the load-bearing wall.',
  hook: 'The party is hired as "Dungeon Integrity Testers" for a mysterious structure. They arrive to discover it is an enormous cake. Their job is to navigate it without eating it. They are already failing. The barbarian has eaten a doorframe.',
  twist: 'Every bite destabilizes the structure. The cake is load-bearing. By scene two, the party has eaten enough structural fondant that the second floor is sagging. Voltaire enters the dungeon in a rage, wielding a rolling pin of smiting, and begins chasing the party through his own collapsing cake while screaming about buttercream ratios.',
  climax: 'The cake is collapsing. Voltaire is chasing them. The only exit is through the chocolate lava moat. The party must escape a structurally failing three-story cake while its creator tries to kill them with pastry tools. The final challenge: crossing the moat on a bridge made of candy canes that are melting.',
  scenes: [
    {
      title: 'The Frosted Foyer',
      summary: 'The party enters the cake dungeon. Everything is edible. Everything smells incredible. Constitution saves to resist eating the walls. The barbarian fails immediately.',
      challenge: 'exploration',
      keyEvents: [
        'The doorframe is gingerbread. The barbarian takes a bite. It is delicious. He takes another.',
        'Frosting pipe traps: high-pressure frosting cannons that blind and deliciously immobilize targets',
        'Gumdrop golems patrol the halls. They are chewy, resilient, and taste like strawberry.',
        'A sugar-glass window reveals the chocolate lava moat below. It bubbles ominously and smells amazing.',
      ],
    },
    {
      title: 'The Structural Crisis',
      summary: 'The party has eaten too much. The second floor is sagging. Voltaire arrives in a fury. The dungeon becomes a chase through a collapsing cake.',
      challenge: 'combat',
      keyEvents: [
        'A groaning sound. The ceiling sags. Fondant cracks spread across the walls. Someone ate a support beam.',
        'Voltaire kicks down a marzipan door: "YOU ATE MY FLYING BUTTRESS. THAT WAS LOAD-BEARING FONDANT."',
        'He attacks with a rolling pin of smiting (+2, deals bludgeoning and emotional damage)',
        'Running through collapsing rooms: each room is less stable than the last. Floors give way into layers of sponge cake.',
      ],
    },
    {
      title: 'The Chocolate Lava Moat',
      summary: 'The only exit crosses the moat. The candy cane bridge is melting. Voltaire is right behind them. The party must cross before the bridge dissolves or the baker catches them.',
      challenge: 'puzzle',
      keyEvents: [
        'The candy cane bridge: each step melts it faster. Weight distribution matters. Single file.',
        'Voltaire throws fondant shurikens from behind. They stick to armor and taste like vanilla.',
        'The moat is real chocolate AND real lava. Falling in does 2d6 fire damage but tastes incredible.',
        'Escape: the party bursts through the final marzipan wall into daylight, covered in frosting, singed, and somehow still hungry.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Voltaire Fondant', role: 'villain / artisan', personality: 'A half-elf pastry chef who treats baking like warfare and his cake like a cathedral. Eleven years of work. Every bite the party takes is a personal assault. Wields a rolling pin with the fury of a man who has watched his life\'s work get eaten.' },
    { name: 'Sprinkle', role: 'guide / former taste-tester', personality: 'A halfling who was trapped in the cake three days ago during a previous taste test. She has survived entirely on cake. She is sick of cake. She knows the layout but cannot stop twitching from sugar overload.' },
  ],
  keyLocations: [
    { name: 'The Frosted Foyer', description: 'The entrance hall. Gingerbread pillars, fondant walls, a chandelier made of rock candy. It smells like a bakery exploded.', significance: 'Introduction to the edible dungeon. Sets up the eat-vs-survive tension.' },
    { name: 'The Sponge Layer', description: 'The second floor. The actual cake sponge is exposed where fondant has been eaten. Walking on it is like walking on a mattress.', significance: 'Where structural collapse begins. The turning point.' },
    { name: 'The Chocolate Lava Moat', description: 'A river of magically heated chocolate surrounding the cake. It is 200 degrees and delicious. Candy cane bridges span it at intervals.', significance: 'The final obstacle. Cross or die tasty.' },
  ],
  dataSystems: ['trapGenerator', 'chaseSequence', 'combatNarration'],
};
