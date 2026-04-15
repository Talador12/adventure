import type { OneShotCampaign } from '../types';

export const theTrainHeist: OneShotCampaign = {
  id: 'oneshot-train-heist',
  type: 'oneshot',
  title: 'The Train Heist',
  tagline: 'Rob a moving arcane train. The cargo is in the middle. The guards have the only key. The train does not stop.',
  tone: 'heist',
  themes: ['heist', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The Iron Serpent is an arcane express that runs non-stop between Ironport and Cresthaven - six hours, no stops, warded against teleportation. The cargo car in the middle carries sealed crates of confiscated magical weapons. The party\'s job: board the train, reach the cargo car, crack the lock, take one specific crate, and get off a train that will not stop moving.',
  hook: 'The handler opens a map of the rail line: "The Iron Serpent leaves Ironport at noon. Cargo car is Car 6 of 12. The guard captain has the only key. The train is warded against magical entry or exit. No teleporting on, no teleporting off. You board as passengers. You leave as thieves. Six hours."',
  twist: 'The "confiscated magical weapons" are not weapons at all. The crates contain enchanted prosthetics - magical limbs confiscated from disabled veterans by a government that decided the enchantments were "unauthorized military hardware." The handler is a veterans\' advocate stealing back what was taken from people who already lost enough.',
  climax: 'Car 6. The lock is picked. The crate is found. But the guard captain is not a fool - she set a trap using the cargo as bait. The party is surrounded in the cargo car with the crate. The train is twenty minutes from Cresthaven, where soldiers wait on the platform. Fight, negotiate, or decouple the car and ride it to a stop on the tracks.',
  scenes: [
    {
      title: 'Scene 1: Boarding',
      summary: 'Getting on the train and establishing covers. The party has six hours and twelve cars to navigate.',
      challenge: 'social',
      keyEvents: [
        'Boarding: tickets, disguises, or hiding in freight - each method has risks',
        'The layout: 12 cars - passenger, dining, sleeping, guard, cargo, guard, more passenger',
        'The guard rotation: four guards, two always at the cargo car, two roaming',
        'The key: the guard captain wears it around her neck - never removes it',
      ],
    },
    {
      title: 'Scene 2: Moving Through',
      summary: 'Navigating from the passenger cars to the cargo car. Social engineering, stealth, and improvisation.',
      challenge: 'exploration',
      keyEvents: [
        'The dining car: social hub where guards relax - an opportunity for distraction or pickpocketing',
        'The guard car: bunks for off-duty guards, a weapons locker, and the shift change schedule',
        'Between cars: the connectors are exposed to the outside - wind, noise, and a long drop',
        'The key: obtained by theft, trickery, or an impression cast for a lockpick',
      ],
    },
    {
      title: 'Scene 3: The Cargo Car',
      summary: 'Inside. The crate. The trap. Twenty minutes to Cresthaven.',
      challenge: 'combat',
      keyEvents: [
        'The cargo car: rows of sealed crates, dim lighting, and the target crate marked with a military seal',
        'The trap springs: the guard captain and her team emerge from hiding in adjacent crates',
        'The fight: confined space, moving train, stacked crates for cover',
        'The escape: decouple the car (stops but strands them), rooftop run (dangerous), or talk their way out (the veteran angle)',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Handler Voss', role: 'quest giver', personality: 'A veterans\' advocate with a missing arm - one of the prosthetics that was confiscated was his. Calm, organized, and driven by personal injustice. "They took my arm twice. Once in battle. Once with a form."' },
    { name: 'Guard Captain Mira Steele', role: 'antagonist', personality: 'Professional, smart, and one step ahead. She suspected the cargo would be targeted and set the trap. Not cruel - just very good at her job.' },
    { name: 'Conductor Thatch', role: 'neutral / bribable', personality: 'The train conductor who has seen everything and says nothing. Can be bribed to look the other way or provide information about the guard schedule.' },
  ],
  keyLocations: [
    { name: 'The Iron Serpent', description: 'A 12-car arcane express. Elegant passenger cars in front, fortified cargo in the middle, more passengers in back. Moves at speed, never stops.', significance: 'The entire heist takes place on this train.' },
    { name: 'Car 6 (Cargo)', description: 'A reinforced steel car with locked doors, dim lighting, and rows of sealed military crates. The target is here.', significance: 'The heist target and the trap location.' },
    { name: 'The Dining Car', description: 'A surprisingly comfortable car with tables, food, and off-duty guards who let their guard down over coffee.', significance: 'The social engineering opportunity.' },
  ],
  dataSystems: ['heistPlanner', 'encounterWaves', 'combatNarration', 'chaseSequence'],
};
