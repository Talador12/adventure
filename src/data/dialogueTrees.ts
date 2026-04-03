// NPC dialogue tree builder — branching conversation paths with conditional responses.
// DM pre-builds or picks from templates. Players choose responses.

export interface DialogueNode {
  id: string;
  npcText: string;
  playerOptions: DialogueOption[];
  isEnd: boolean;
}

export interface DialogueOption {
  text: string;
  nextNodeId: string | null; // null = end conversation
  requirement?: { type: 'skill_check'; skill: string; dc: number } | { type: 'item'; itemName: string } | { type: 'reputation'; minRep: number };
  consequence?: { type: 'reputation'; delta: number } | { type: 'gold'; amount: number } | { type: 'item'; itemName: string } | { type: 'quest'; questName: string };
}

export interface DialogueTree {
  id: string;
  npcName: string;
  description: string;
  startNodeId: string;
  nodes: DialogueNode[];
}

export const DIALOGUE_TEMPLATES: DialogueTree[] = [
  {
    id: 'merchant-haggle', npcName: 'Merchant', description: 'Haggle with a merchant over prices.',
    startNodeId: 'start',
    nodes: [
      { id: 'start', npcText: '"Welcome, traveler! Looking to buy or sell? My prices are fair... mostly."', isEnd: false, playerOptions: [
        { text: '"Show me your wares."', nextNodeId: 'browse' },
        { text: '"Your prices are too high. Can we negotiate?"', nextNodeId: 'haggle', requirement: { type: 'skill_check', skill: 'Persuasion', dc: 12 } },
        { text: '"I\'m just passing through."', nextNodeId: null },
      ]},
      { id: 'browse', npcText: '"Take your time. Everything here is of the finest quality — I guarantee it."', isEnd: true, playerOptions: [] },
      { id: 'haggle', npcText: '"Hmm... you drive a hard bargain. Fine, 15% off — but don\'t tell anyone."', isEnd: true, playerOptions: [
        { text: '"Deal."', nextNodeId: null, consequence: { type: 'reputation', delta: 1 } },
      ]},
    ],
  },
  {
    id: 'suspicious-guard', npcName: 'Town Guard', description: 'A guard questions the party\'s intentions.',
    startNodeId: 'start',
    nodes: [
      { id: 'start', npcText: '"Halt! State your business in town. We\'ve had trouble lately."', isEnd: false, playerOptions: [
        { text: '"We\'re adventurers, here to help."', nextNodeId: 'helpful' },
        { text: '"None of your business."', nextNodeId: 'hostile', consequence: { type: 'reputation', delta: -1 } },
        { text: '[Deception] "We\'re merchants from the east."', nextNodeId: 'deception', requirement: { type: 'skill_check', skill: 'Deception', dc: 14 } },
        { text: '[Intimidation] "Step aside."', nextNodeId: 'intimidate', requirement: { type: 'skill_check', skill: 'Intimidation', dc: 16 } },
      ]},
      { id: 'helpful', npcText: '"Adventurers, eh? We could use your help. There\'s been disappearances near the old mine."', isEnd: false, playerOptions: [
        { text: '"We\'ll look into it."', nextNodeId: null, consequence: { type: 'quest', questName: 'Investigate the Mine' } },
        { text: '"What\'s the pay?"', nextNodeId: 'pay' },
      ]},
      { id: 'pay', npcText: '"The mayor has put up 200 gold for anyone who can solve this. Talk to him at the town hall."', isEnd: true, playerOptions: [] },
      { id: 'hostile', npcText: '"Watch your tone. I\'ll be keeping an eye on you."', isEnd: true, playerOptions: [] },
      { id: 'deception', npcText: '"Merchants? Very well, carry on. The market is to the east."', isEnd: true, playerOptions: [] },
      { id: 'intimidate', npcText: '*The guard pales.* "R-right away. Sorry to bother you."', isEnd: true, playerOptions: [] },
    ],
  },
  {
    id: 'mysterious-stranger', npcName: 'Hooded Figure', description: 'A mysterious figure offers information... for a price.',
    startNodeId: 'start',
    nodes: [
      { id: 'start', npcText: '"Psst... you look like you could use some information. I know things. Important things."', isEnd: false, playerOptions: [
        { text: '"What kind of information?"', nextNodeId: 'offer' },
        { text: '"Get lost."', nextNodeId: null },
        { text: '[Insight] Read their intentions.', nextNodeId: 'insight', requirement: { type: 'skill_check', skill: 'Insight', dc: 13 } },
      ]},
      { id: 'offer', npcText: '"The location of a hidden treasure vault. All I ask is 50 gold. A bargain, really."', isEnd: false, playerOptions: [
        { text: '"Here\'s your gold." [Pay 50gp]', nextNodeId: 'paid', consequence: { type: 'gold', amount: -50 } },
        { text: '"Too rich for my blood."', nextNodeId: null },
      ]},
      { id: 'paid', npcText: '"A pleasure doing business. The vault is beneath the old lighthouse. Look for the loose stone on the third step."', isEnd: true, playerOptions: [] },
      { id: 'insight', npcText: '*You sense they\'re genuinely trying to sell information, not set a trap. They seem desperate for coin.*', isEnd: false, playerOptions: [
        { text: '"Fine, here\'s 50 gold."', nextNodeId: 'paid', consequence: { type: 'gold', amount: -50 } },
        { text: '"I\'ll pass."', nextNodeId: null },
      ]},
    ],
  },
];

export function getDialogueTree(id: string): DialogueTree | undefined {
  return DIALOGUE_TEMPLATES.find((t) => t.id === id);
}

export function getNode(tree: DialogueTree, nodeId: string): DialogueNode | undefined {
  return tree.nodes.find((n) => n.id === nodeId);
}

export function formatDialogueNode(npcName: string, node: DialogueNode): string {
  const lines = [`💬 **${npcName}:** ${node.npcText}`];
  if (!node.isEnd && node.playerOptions.length > 0) {
    for (let i = 0; i < node.playerOptions.length; i++) {
      const opt = node.playerOptions[i];
      let label = `${i + 1}. ${opt.text}`;
      if (opt.requirement?.type === 'skill_check') label += ` [${opt.requirement.skill} DC ${opt.requirement.dc}]`;
      lines.push(label);
    }
  }
  return lines.join('\n');
}
