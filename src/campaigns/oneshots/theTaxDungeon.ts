import type { OneShotCampaign } from '../types';

export const theTaxDungeon: OneShotCampaign = {
  id: 'oneshot-tax-dungeon',
  type: 'oneshot',
  title: 'The Tax Dungeon',
  tagline: 'You owe back taxes. The IRS has a dungeon. It\'s worse than dragons.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The party has been audited by the Royal Bureau of Revenue. Their adventuring income (loot, quest rewards, treasure hoards) was never declared. The penalty: navigate the Tax Dungeon — a bureaucratic labyrinth where every room is a form, every trap is a penalty, and the final boss is a Senior Auditor who has never been defeated. If they survive, their debt is forgiven.',
  hook: 'A letter arrives: "NOTICE OF DELINQUENCY. Re: undeclared income from adventuring activities including but not limited to: treasure hoards, quest rewards, magical item acquisitions. Penalty: navigate the Bureau\'s Compliance Dungeon OR pay 47,000 gold. Report to Room 1A at 9 AM sharp."',
  twist: 'The dungeon was designed by an adventurer-turned-accountant who hated both professions equally. Every room is a parody of both dungeon crawling AND tax law. The traps test financial literacy. The monsters are living tax codes. The treasure is properly filed receipts.',
  climax: 'The Senior Auditor: an ancient construct that has audited kingdoms into bankruptcy. It can only be defeated by finding the one loophole in its tax code — or by filing the perfect return (which requires every receipt found in the dungeon). Or the party can just fight a construct made of adding machines and red tape.',
  scenes: [
    {
      title: 'Scene 1: Room 1A (Processing)',
      summary: 'Entry into the Tax Dungeon. Paperwork, processing, and the first "traps" — forms that must be filled correctly or face penalties.',
      challenge: 'exploration',
      keyEvents: [
        'Room 1A: a waiting room with a number dispenser. The party\'s number is 47,000.',
        'The form trap: a room full of forms. Fill them wrong and the floor drops out.',
        'The penalty corridor: every wrong answer adds 1,000 gold to the debt (displayed on a running total)',
        'First receipt found: "PROOF OF LEGITIMATE EXPENSE — DO NOT LOSE"',
      ],
    },
    {
      title: 'Scene 2: The Deductions Wing',
      summary: 'Deeper into the dungeon. The "monsters" are animated tax codes. The "treasure" is properly filed documentation.',
      challenge: 'combat',
      keyEvents: [
        'The Living Tax Code: a golem made of scrolling regulations that attacks with subsections',
        'The Depreciation Room: everything in the room loses value while you\'re in it',
        'The Charitable Deduction: a puzzle where giving away gold EARNS gold',
        'Receipt collection: scattered through the dungeon, each one reduces the debt',
      ],
    },
    {
      title: 'Scene 3: The Senior Auditor',
      summary: 'The final boss: a construct that audits in real time. Every action the party takes is assessed for tax implications.',
      challenge: 'combat',
      keyEvents: [
        'The Auditor: a massive construct with a stamp that says "DENIED" and deals force damage',
        'Every attack is assessed: "Sword damage: 2d6. Capital gains on looted weapon: 30 gold. PLUS INTEREST."',
        'The loophole: buried in the dungeon\'s own tax code (Section 7, Paragraph 12: "Adventurers who survive the dungeon are exempt")',
        'Victory: the debt is cleared, receipts filed, and the party gets a refund (3 copper)',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Senior Auditor', role: 'final boss', personality: 'A construct that speaks in monotone and has never approved a refund. "YOUR CLAIM IS UNDER REVIEW. PROCESSING TIME: FOREVER."' },
    { name: 'Clerk Inkwell', role: 'guide / obstacle', personality: 'A goblin clerk who appears at checkpoints. "Form 12-B? You needed form 12-B-REVISED. Back to room 3. Next!"' },
    { name: 'The Ghost of Tax Season', role: 'environmental hazard', personality: 'A spectral figure that wails about deadlines. Standing near it causes Wisdom saves against existential dread about finances.' },
  ],
  keyLocations: [
    { name: 'Room 1A', description: 'A waiting room with uncomfortable chairs, flickering lights, and a number counter that displays absurd numbers.', significance: 'The dungeon entrance.' },
    { name: 'The Deductions Wing', description: 'A section of the dungeon where financial concepts are physical hazards. The Depreciation Room literally makes things worth less.', significance: 'The mid-dungeon challenges.' },
    { name: 'The Audit Chamber', description: 'A vast room dominated by the Senior Auditor: a construct of gears, stamps, and red tape.', significance: 'The final boss arena.' },
  ],
  dataSystems: ['trapDisarm', 'puzzleLock', 'combatNarration', 'riddleGenerator', 'fantasyInsults'],
};
