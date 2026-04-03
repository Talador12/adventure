// Random treasure guardian — what protects the loot?
export interface TreasureGuardian { guardian: string; behavior: string; weakness: string; reward: string; }
const GUARDIANS: TreasureGuardian[] = [
  { guardian: 'An ancient golem that activates when the treasure is touched.', behavior: 'Attacks the hand that touched it. Ignores others unless attacked.', weakness: 'Dispel Magic on the golem\'s core (Arcana DC 15 to locate).', reward: 'The golem\'s core is worth 500gp.' },
  { guardian: 'A ghost bound to protect the treasure for eternity.', behavior: 'Warns first. Attacks if the warning is ignored.', weakness: 'Laying the ghost to rest (Religion DC 14) pacifies it permanently.', reward: 'The ghost reveals additional hidden treasure before departing.' },
  { guardian: 'A puzzle lock that reshuffles if you get it wrong.', behavior: 'No combat. Pure problem-solving. 3 attempts before it seals forever.', weakness: 'INT DC 16 or the answer is hidden in the room (Investigation DC 13).', reward: 'The puzzle itself is a magic item — Puzzle Box of Holding.' },
  { guardian: 'A mimic disguised as the treasure chest itself.', behavior: 'Attacks when someone tries to open it. Adhesive pseudopod.', weakness: 'Fire damage prevents adhesive. It\'s cowardly — below 50% HP it flees.', reward: 'The mimic\'s adhesive can be harvested (worth 100gp to alchemists).' },
  { guardian: 'Living vines that grow from the walls and floor.', behavior: 'Grapple anyone who enters the room. STR DC 14 to escape.', weakness: 'Fire. Or simply waiting — they retract after 1 minute.', reward: 'The vines produce berries worth 1d4 Goodberries.' },
  { guardian: 'Nothing. The treasure is completely unguarded.', behavior: 'N/A', weakness: 'N/A', reward: 'Just the treasure. But the paranoia was its own kind of trap.' },
];
export function getRandomGuardian(): TreasureGuardian { return GUARDIANS[Math.floor(Math.random() * GUARDIANS.length)]; }
export function formatTreasureGuardian(g: TreasureGuardian): string { return `🛡️ **Treasure Guardian:**\n*${g.guardian}*\n🎭 Behavior: ${g.behavior}\n💔 Weakness: ${g.weakness}\n🎁 Bonus: ${g.reward}`; }
