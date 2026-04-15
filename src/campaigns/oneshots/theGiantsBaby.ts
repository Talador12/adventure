import type { OneShotCampaign } from '../types';

export const theGiantsBaby: OneShotCampaign = {
  id: 'oneshot-the-giants-baby',
  type: 'oneshot',
  title: 'The Giant\'s Baby',
  tagline: 'A storm giant\'s baby is loose in the city. 10 feet tall. 500 pounds. Thinks everything is a toy. Mom is coming. Mom is NOT happy.',
  tone: 'shenanigans',
  themes: ['urban', 'comedy', 'social'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The city of Archgate is having a normal market day until a 10-foot-tall, 500-pound baby giant crawls through the main gate. The baby - a storm giant infant named Thundra - was left with a cloud giant babysitter who fell asleep. The baby crawled off a cloud, landed on a hay cart (destroying it), and is now loose in a city of breakable things. She thinks everything is a toy. Market stalls are blocks to knock over. City guards are dolls to pick up and shake. The clock tower bell is the shiniest thing she has ever seen. And somewhere in the distance, thunder rolls. That is not weather. That is mom.',
  hook: 'The party is in the Archgate market when a shadow falls over the square. A giant baby - 10 feet tall, wearing a diaper the size of a tent - crawls through the main gate, picks up a fruit cart, and puts the whole thing in her mouth. A cloud giant crashes down 30 seconds later, half-asleep, and says: "Oh no. Where did she go? Her mother is going to— Oh. Oh no. Do you hear that thunder? That is not clouds. That is Stormmother Vael. She will level this city to find her child. You have maybe two hours. Please. PLEASE find the baby."',
  twist:
    'Thundra is not just wandering randomly. She is following a trail - a magical lullaby humming from the clock tower. A hag has set a trap using enchanted music to lure the baby to the tower, intending to ransom her back to Stormmother Vael for a mountain\'s worth of gold. The hag did not plan for the baby\'s path of destruction. Or for the party. Or for the fact that a storm giant mother does not negotiate ransoms. She just destroys everything between her and her child.',
  climax:
    'The baby reaches the clock tower and begins climbing it. The tower is not structurally rated for a 500-pound infant. The hag is at the top, realizing her plan has gone catastrophically wrong because the baby is demolishing the tower from the outside. The party must get the baby down safely, deal with the hag, and present the child to Stormmother Vael before she reaches the city walls. The ground shakes with each of Vael\'s approaching footsteps. The baby thinks the shaking is a game and giggles. The giggle generates a small lightning bolt. The clock tower is on fire.',
  scenes: [
    {
      title: 'Scene 1: Baby on the Loose',
      summary:
        'The baby is in the market district, crawling through stalls, picking up guards, and heading toward shiny things. The party must track and contain a 10-foot infant who is faster than expected and has an iron grip on anything she grabs.',
      challenge: 'exploration',
      keyEvents: [
        'Thundra picks up a fruit cart and puts it in her mouth. Apples everywhere. The merchant is having a breakdown.',
        'A city guard tries to stop her. She picks him up, examines him, and puts him on a rooftop. He is fine. He cannot get down.',
        'The baby discovers a mirror shop. Her reflection delights her. She hugs the mirror. It shatters. She cries. The cry generates a small thunderclap that shatters every window on the street.',
        'The party realizes: shiny things attract her. They can lead her with reflective objects. Or she will find the shiniest thing in the city herself: the clock tower bell.',
      ],
    },
    {
      title: 'Scene 2: The Path of Destruction',
      summary:
        'The party follows the baby through the city as she heads toward the clock tower. Each district suffers her innocent destructive curiosity. The party must manage collateral damage, calm panicking citizens, and keep the baby moving in a safe direction.',
      challenge: 'social',
      keyEvents: [
        'The textile district: Thundra wraps herself in silk banners and parades through the street like a baby-sized parade float. She is happy. The weavers are NOT.',
        'The fountain square: she sits in the fountain. The fountain breaks. Water floods the square. She splashes. Lightning sparks from her giggles.',
        'The thunder gets louder. Stormmother Vael is closer. Citizens are panicking about BOTH the baby and the approaching giant. The guard captain begs the party to hurry.',
        'The party hears the lullaby humming from the clock tower. The baby hears it too. She starts crawling faster toward it.',
      ],
    },
    {
      title: 'Scene 3: The Clock Tower',
      summary:
        'The baby climbs the clock tower. A hag waits at the top. The tower is not built for this. Stormmother Vael arrives at the city walls. The party must resolve three simultaneous crises: get the baby safe, stop the hag, and present the child before mom levels the city.',
      challenge: 'combat',
      keyEvents: [
        'Thundra climbs the clock tower. Stones crack under her weight. The tower sways.',
        'The hag at the top realizes this is not going to plan. The baby is not a hostage - the baby is a wrecking ball ascending toward her.',
        'Stormmother Vael arrives at the walls. She is 80 feet tall. "WHERE IS MY CHILD." The sky goes black. Lightning strikes the flagpole.',
        'The party rescues the baby, defeats or chases off the hag, and returns Thundra to her mother. Vael picks up her baby, gives the party a nod, and walks away. The thunder stops. The sun returns. The clock tower collapses.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Thundra',
      role: 'the baby / force of nature',
      personality:
        'A storm giant infant. 10 feet tall. 500 pounds. Approximately 8 months old by giant standards. She has no malice. She has no plan. She sees shiny things and grabs them. She sees small people and picks them up. When she cries, thunder happens. When she laughs, lightning sparks. She is having the BEST day.',
    },
    {
      name: 'Stormmother Vael',
      role: 'ticking clock / concerned parent',
      personality:
        'An 80-foot storm giant mother whose baby has gone missing. She is not angry. She is TERRIFIED, which manifests as city-destroying thunderstorms. She does not want to hurt anyone. She will absolutely destroy everything between her and her child without hesitation.',
    },
    {
      name: 'Nimbus the Cloud Giant Babysitter',
      role: 'quest giver / deeply in trouble',
      personality:
        'The babysitter who fell asleep. He is panicking. He is crying. He is 30 feet tall and hiding behind a building because Vael will END him if she finds out. "Please. If Stormmother finds out I fell asleep... I am already dead. I am a dead giant talking to you."',
      secret: 'He fell asleep because the hag\'s lullaby enchantment affected him too. It was not his fault, but he does not know that.',
    },
    {
      name: 'Granny Thornweave',
      role: 'villain / hag with a bad plan',
      personality:
        'A green hag who thought luring a giant baby to a tower and ransoming it would be easy money. She did not account for the baby being a 500-pound destructive force, the mother being an 80-foot thunderstorm, or the party getting involved. Her plan is falling apart in real time. "This was supposed to be SIMPLE."',
    },
  ],
  keyLocations: [
    {
      name: 'Archgate City',
      description:
        'A mid-sized city with a market district, textile quarter, fountain square, and a prominent clock tower. Currently being casually demolished by a giant infant who thinks it is a playground.',
      significance: 'The entire adventure plays out across the city as the party follows the baby\'s trail of destruction.',
    },
    {
      name: 'The Clock Tower',
      description:
        'The tallest structure in Archgate, topped with a brass bell that is the shiniest object in the city. Currently being climbed by a 500-pound baby while a hag clings to the top floor.',
      significance: 'The climax location where all three crises converge.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'socialEncounter',
    'environmentalHazard',
    'plotTwistEngine',
    'fantasyInsults',
    'chaseScene',
  ],
};
