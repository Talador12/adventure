// Random NPC farewell — how an NPC says goodbye.
export const NPC_FAREWELLS: string[] = [
  '"Safe travels. The road is dark and full of terrors."',
  '"Come back alive. I still owe you a drink."',
  '"May the gods watch over you. The rest of us certainly can\'t."',
  '"Don\'t be strangers. Unless you bring trouble. Then be strangers."',
  '"*waves without looking up* Yeah yeah. Good luck."',
  '"Remember what I told you. It could save your life."',
  '"I hope we meet again. Under better circumstances."',
  '"*firm handshake* You\'re good people. Don\'t let anyone tell you otherwise."',
  '"The next time you\'re in town, the first round is on me."',
  '"*silence. A nod. That\'s enough.*"',
  '"Be careful out there. The world doesn\'t care about heroes."',
  '"If you don\'t come back, I\'m keeping your tab open. Forever."',
];
export function getRandomFarewell(): string { return NPC_FAREWELLS[Math.floor(Math.random() * NPC_FAREWELLS.length)]; }
export function formatNpcFarewell(npcName: string = 'NPC'): string { return `👋 **${npcName} says goodbye:** *${getRandomFarewell()}*`; }
