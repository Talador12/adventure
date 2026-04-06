import type { OneShotCampaign } from '../types';

export const theDeadParty: OneShotCampaign = {
  id: 'oneshot-dead-party',
  type: 'oneshot',
  title: 'The Dead Party',
  tagline: 'You\'re ghosts. Your bodies are right there. The dungeon is still here. Improvise.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 6,
  estimatedHours: 3,
  settingSummary: 'The party died on the first floor of a dungeon. TPK. But their ghosts are still here, standing over their own corpses, and the dungeon is between them and the exit. As ghosts, they can pass through walls but can\'t interact with objects. They can possess creatures briefly but lose control after one action. They must get their bodies to a resurrection altar on floor 3 — while dead.',
  hook: 'The dragon breathes fire. Rocks fall. Everyone dies. The party stands up — translucent, glowing, and looking down at their own very dead bodies. The dungeon is quiet. The dragon is asleep on the party\'s loot. The resurrection altar is three floors down. "Well. This is inconvenient."',
  twist: 'The dungeon\'s monsters can see ghosts — and they\'re terrified. The dungeon\'s ecology operates on a strict "dead things stay dead" policy. Ghosts break the rules. The monsters will do ANYTHING to get the ghosts out of their dungeon, including helping carry the bodies to the altar.',
  climax: 'The altar is guarded by a spectral gatekeeper who demands a fee for resurrection: one permanent memory per party member. The party must choose which memory to sacrifice. Then: resurrection. Waking up surrounded by terrified monsters who have been carrying their corpses for an hour. Awkward.',
  scenes: [
    { title: 'Scene 1: The TPK', summary: 'Death. Ghosts. Looking at your own corpse. The logistical challenge of being dead in a dungeon.', challenge: 'exploration', keyEvents: ['The death: dramatic, final, and slightly embarrassing', 'Ghost rules: pass through walls, can\'t touch objects, can possess creatures for ONE action', 'The bodies: need to get to floor 3 (they\'re on floor 1)', 'First possession: possessing a goblin to pick up your own corpse is... an experience'] },
    { title: 'Scene 2: The Escort', summary: 'Getting the bodies through 3 floors of dungeon. Possessing monsters to carry corpses. The monsters are NOT happy.', challenge: 'exploration', keyEvents: ['Possession chains: possess goblin, pick up body, goblin regains control, drops body, repeat', 'Monster reactions: "GHOSTS! IN MY DUNGEON! THIS IS AGAINST THE RULES!"', 'A smart goblin offers a deal: "I carry the bodies, you LEAVE MY DUNGEON"', 'Floor 2: the mimics. One ate a party member\'s backpack. The ghost haunts it until it throws up.'] },
    { title: 'Scene 3: The Altar', summary: 'The resurrection altar. The fee. The return to life surrounded by monsters who are now more scared of you than you are of them.', challenge: 'social', keyEvents: ['The altar: ancient, glowing, guarded by a spectral gatekeeper', 'The fee: one permanent memory per person (the player chooses which)', 'Resurrection: painful, disorienting, and you\'re surrounded by goblins carrying your corpse', 'The aftermath: the monsters just want you to leave. You just want your stuff back from the dragon.'] },
  ],
  keyNPCs: [
    { name: 'Glitch the Goblin', role: 'reluctant corpse-carrier', personality: 'A goblin who is absolutely terrified of ghosts and will do anything to get them out of the dungeon. "I\'ll carry the body! Just STOP BEING TRANSPARENT AT ME!"' },
    { name: 'The Gatekeeper', role: 'altar guardian', personality: 'A spectral entity that guards the resurrection altar. Charges one memory per resurrection. Very matter-of-fact. "Death is free. Life has a service charge."' },
    { name: 'The Dragon (sleeping)', role: 'environmental hazard', personality: 'The dragon that killed the party. Still asleep. On the party\'s loot. Snoring loudly. The ghosts must get past it to reach the stairs.' },
  ],
  keyLocations: [
    { name: 'Floor 1: The Kill Zone', description: 'Where the party died. Their bodies, their loot (under the dragon), and a lot of scorch marks.', significance: 'Where the adventure begins (in death).' },
    { name: 'Floor 2: The Gauntlet', description: 'Standard dungeon floor that\'s much more challenging when you\'re a ghost trying to possess goblins into carrying corpses.', significance: 'The main obstacle course.' },
    { name: 'Floor 3: The Altar', description: 'A resurrection altar carved into the deepest chamber. The gatekeeper waits.', significance: 'Where resurrection happens — for a price.' },
  ],
  dataSystems: ['deathSaveDrama', 'combatNarration', 'trapDisarm', 'socialEncounter', 'dungeonRoomTemplates'],
};
