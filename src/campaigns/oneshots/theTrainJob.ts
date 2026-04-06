import type { OneShotCampaign } from '../types';
export const theTrainJob: OneShotCampaign = {
  id: 'oneshot-train-job', type: 'oneshot', title: 'The Train Job', tagline: 'Rob the train. Simple. Except the train fights back.', tone: 'heist', themes: ['heist', 'classic_fantasy'], playerCount: { min: 3, max: 6 }, level: 6, estimatedHours: 4,
  settingSummary: 'The Lightning Rail — an arcane train connecting major cities — carries a fortune in gold for the Merchant Guild. The party has been hired to rob it. Problem: the train has magical defenses, the guards are elite, the passengers include off-duty adventurers, and the train itself is enchanted to resist unauthorized stops. A heist on a moving vehicle with no way off until the next station.',
  hook: 'A fence lays out the plan: "The Lightning Rail leaves Irongate at noon with 50,000 gold in Car 7. It arrives at Highport in 6 hours. The gold must not. You have 6 hours on a moving train. No teleportation — the train is warded. No jumping — it moves at 80 miles per hour. Any questions?"',
  twist: 'The gold is a decoy — the REAL cargo is a prisoner in Car 12, a political dissident the Merchant Guild is smuggling to a black site. The fence who hired the party is the dissident\'s wife. She doesn\'t want the gold. She wants her husband. The party discovers this mid-heist and must choose: take the gold (the easy score) or rescue the prisoner (the right thing, much harder).',
  climax: 'The party reaches Car 12. The prisoner is guarded by a golem. The train is approaching Highport — 30 minutes until arrival, and the station has the Guild\'s army waiting. The party must free the prisoner, fight or evade the golem, and find a way off the train before it reaches the station.',
  scenes: [
    { title: 'Scene 1: Boarding', summary: 'Getting on the train and establishing cover. The party must blend in with passengers while scouting the cars.', challenge: 'exploration', keyEvents: ['Boarding: fake tickets, disguises, or bribery — the conductor is suspicious', 'Scouting: 12 cars, from passenger to cargo to the mysterious sealed Car 12', 'The guards: rotating patrols, magical detection at car boundaries', 'Cover identities: each party member has a role to play among the passengers'] },
    { title: 'Scene 2: The Heist', summary: 'Moving through the train toward the gold. Bypassing wards, distracting guards, and discovering the real cargo.', challenge: 'exploration', keyEvents: ['Car 7: the gold vault, warded with alarm spells and guarded by an iron defender', 'The discovery: Car 12 has MORE guards than the gold — and it\'s not on the manifest', 'The fence contacts the party (sending stone): "Forget the gold. Car 12. Please."', 'The choice: gold or prisoner — the party can try both, but time is limited'] },
    { title: 'Scene 3: The Getaway', summary: 'Time\'s up. The train is 30 minutes from the station. The party must finish the job and escape a moving train.', challenge: 'combat', keyEvents: ['Car 12: the prisoner, the golem, and a fight in a rattling train car', 'The alarm: the train knows — doors lock, windows ward, the engine speeds up', 'The escape: through the roof, decouple the rear cars, or the emergency brake (which is also warded)', 'The getaway: off the train, into the wilderness, with either gold, a prisoner, or both'] },
  ],
  keyNPCs: [
    { name: 'Elena Voss (the fence)', role: 'quest giver / motivated', personality: 'A woman who planned a gold heist to fund a rescue. Cool under pressure until the party reaches Car 12 — then her composure cracks. "That\'s my husband in there. Please."' },
    { name: 'Conductor Steelrail', role: 'obstacle / not a villain', personality: 'The train\'s conductor who takes his job very seriously. Not evil — just dedicated. Will pursue the party relentlessly because "nobody robs MY train."' },
    { name: 'The Iron Warden', role: 'golem guardian', personality: 'A construct programmed to protect Car 12\'s contents. Doesn\'t speak. Doesn\'t negotiate. Just blocks the door.' },
  ],
  keyLocations: [
    { name: 'The Lightning Rail', description: 'A 12-car arcane train moving at 80mph. Each car is its own environment: passenger, dining, sleeping, cargo, vault, prison.', significance: 'The entire one-shot takes place here.' },
    { name: 'Car 7 (The Vault)', description: 'Reinforced, warded, and containing 50,000 gold pieces. The decoy.', significance: 'The apparent target.' },
    { name: 'Car 12 (The Prison)', description: 'An unmarked car with more guards than the vault. Contains one prisoner and one golem.', significance: 'The real target.' },
  ],
  dataSystems: ['heistPlanner', 'trapDisarm', 'encounterWaves', 'combatNarration', 'socialEncounter', 'chaseSequence'],
};
