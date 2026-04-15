import type { OneShotCampaign } from '../types';

export const theTrainJob: OneShotCampaign = {
  id: 'oneshot-train-job',
  type: 'oneshot',
  title: 'The Train Job',
  tagline: 'Fifty thousand gold in Car 7. One prisoner in Car 12. The fence says forget the gold. The train is warded against teleportation. It moves at 80 miles per hour. Any questions?',
  tone: 'heist',
  themes: ['heist', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 6,
  estimatedHours: 4,
  settingSummary:
    'The Lightning Rail - an arcane train connecting major cities - carries a fortune in gold for the Merchant Guild. The party has been hired to rob it. Problem: the train has magical defenses, the guards are elite, the passengers include off-duty adventurers, and the train itself is enchanted to resist unauthorized stops. A heist on a moving vehicle with no way off until the next station.',
  hook: 'A fence lays out the plan: "The Lightning Rail leaves Irongate at noon with 50,000 gold in Car 7. It arrives at Highport in 6 hours. The gold must not. You have 6 hours on a moving train. No teleportation - the train is warded. No jumping - it moves at 80 miles per hour. Any questions?"',
  twist: 'The gold is a decoy - the REAL cargo is a prisoner in Car 12, a political dissident the Merchant Guild is smuggling to a black site. The fence who hired the party is the dissident\'s wife. She does not want the gold. She wants her husband. The party discovers this mid-heist and must choose: take the gold (the easy score) or rescue the prisoner (the right thing, much harder).',
  climax: 'The party reaches Car 12. The prisoner is guarded by a golem. The train is approaching Highport - 30 minutes until arrival, and the station has the Guild\'s army waiting. The party must free the prisoner, fight or evade the golem, and find a way off the train before it reaches the station.',
  scenes: [
    {
      title: 'Scene 1: Boarding',
      summary: 'Getting on the train and establishing cover. The party must blend in with passengers while scouting the cars.',
      challenge: 'exploration',
      keyEvents: [
        'Boarding: fake tickets, disguises, or bribery - the conductor checks every face against a passenger manifest',
        'Scouting: 12 cars, from passenger to cargo to the mysterious sealed Car 12 with its blacked-out windows',
        'The guards: rotating patrols with detection wards at car boundaries - crossing triggers a silent ping',
        'Cover identities: each party member has a role to play among merchants, nobles, and one very chatty gnome',
      ],
    },
    {
      title: 'Scene 2: The Heist',
      summary: 'Moving through the train toward the gold. Bypassing wards, distracting guards, and discovering the real cargo.',
      challenge: 'exploration',
      keyEvents: [
        'Car 7: the gold vault, warded with alarm spells and guarded by an iron defender that tracks heat signatures',
        'The discovery: Car 12 has MORE guards than the gold - and it is not on the manifest',
        'The sending stone crackles: Elena\'s voice, barely controlled: "Forget the gold. Car 12. That is my husband. Please."',
        'The choice: gold or prisoner - the party can try both, but the train arrives in Highport in two hours',
      ],
    },
    {
      title: 'Scene 3: The Getaway',
      summary: 'Time is up. The train is 30 minutes from the station. The party must finish the job and escape a moving train.',
      challenge: 'combat',
      keyEvents: [
        'Car 12: the prisoner shackled to the floor, the golem filling the doorway, and a fight in a rattling car',
        'The alarm: the train KNOWS - doors lock magnetically, windows ward, the engine accelerates',
        'The escape: through the roof at 80 miles per hour, decouple the rear cars, or the emergency brake (also warded)',
        'The getaway: off the train, into the wilderness, with either gold, a prisoner, or both - and the Guild hunting them by morning',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Elena Voss', role: 'quest giver / motivated', personality: 'Planned a gold heist to fund a rescue. Briefed the party with steady hands and a steady voice. When the party reaches Car 12, the steadiness shatters. Her sending stone transmissions get shorter and more desperate. The last one is just his name.' },
    { name: 'Conductor Steelrail', role: 'obstacle / not a villain', personality: 'A dwarf who has not missed a schedule in fifteen years. Takes robbery personally - not as a crime against the Guild, but as a crime against his train. "Nobody robs the Lightning Rail. Nobody. I built this schedule." Will chase the party through every car in his pressed uniform.' },
    { name: 'The Iron Warden', role: 'golem guardian', personality: 'Fills the doorway of Car 12 like a plug in a bottle. Does not speak. Does not move until you try to pass. Then it moves very fast. Made of iron, rivets, and a single directive: nothing enters, nothing leaves.' },
  ],
  keyLocations: [
    { name: 'The Lightning Rail', description: 'A 12-car arcane train moving at 80mph. Each car is its own environment: passenger, dining, sleeping, cargo, vault, prison. The vibration never stops.', significance: 'The entire one-shot takes place here.' },
    { name: 'Car 7 (The Vault)', description: 'Reinforced steel, triple-warded, containing 50,000 gold pieces in locked chests. The decoy that looks like the score of a lifetime.', significance: 'The apparent target.' },
    { name: 'Car 12 (The Prison)', description: 'An unmarked car with blacked-out windows and more guards than the vault. Contains one man, one golem, and one set of shackles bolted to the floor.', significance: 'The real target.' },
  ],
  dataSystems: ['heistPlanner', 'trapDisarm', 'encounterWaves', 'combatNarration', 'socialEncounter', 'chaseSequence'],
};
