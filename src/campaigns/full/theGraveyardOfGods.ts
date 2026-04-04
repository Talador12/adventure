import type { FullCampaign } from '../types';

export const theGraveyardOfGods: FullCampaign = {
  id: 'full-graveyard-gods',
  type: 'full',
  title: 'The Graveyard of Gods',
  tagline: 'Gods don\'t die. But something is killing them anyway.',
  tone: 'epic',
  themes: ['planar', 'dark_fantasy', 'exploration'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 8, end: 18 },
  estimatedSessions: 20,
  settingSummary:
    'In the Astral Sea, there is a place where dead gods drift — vast stone corpses floating in silver void. Clerics have started losing their powers. Paladins feel their oaths weaken. Something is eating dead gods, and whatever it excretes is killing living ones. The party must travel to the Graveyard of Gods, find the predator, and stop a deicide cascade before all divine magic vanishes from the world.',
  hook: 'The party\'s cleric (or a cleric ally) suddenly loses all divine magic mid-prayer. Across the world, the same thing is happening — intermittent divine blackouts. A desperate angel appears: "The source is in the Graveyard. Gods are dying. We cannot go ourselves — the predator targets divine beings. We need mortals."',
  twist:
    'The predator is a god itself — the god of hunger, the first deity, the one that existed before creation. The other gods killed it at the dawn of time and buried it in the Graveyard. It wasn\'t dead. It was patient. Now it\'s been feeding on dead gods long enough to wake up, and it\'s moving to the living ones.',
  climax:
    'The God of Hunger has grown massive by consuming dead deities. It\'s heading for the living pantheon. The party must either destroy it (requiring a weapon forged from dead god-essence), contain it (re-creating the prison that held it for eons), or find a way to satiate its hunger permanently (feeding it something that isn\'t a god).',
  acts: [
    {
      title: 'Act 1: The Divine Blackout',
      summary:
        'Divine magic fails worldwide. The party investigates, makes contact with the angels, and prepares for the journey to the Astral Sea.',
      keyEvents: [
        'Divine blackout — clerics, paladins, druids all lose power intermittently',
        'Angel visitation — explains the Graveyard and the divine restriction',
        'Preparation: acquire astral travel means (spelljammer, portal, ritual)',
        'First entry into the Astral Sea — the scale is incomprehensible',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Graveyard',
      summary:
        'The party explores the Graveyard of Gods — vast divine corpses, each a dungeon-sized environment with residual powers and dangers. They track the predator through consumed remains.',
      keyEvents: [
        'First dead god — a mountain-sized corpse with an ecosystem inside it',
        'The consumed gods: gnawed, hollowed, stripped of divine essence',
        'Encounters with god-parasites: creatures that live on dead gods',
        'The trail leads deeper — the predator is heading toward the Barrier of Life and Death',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The First God',
      summary:
        'The party confronts the God of Hunger at the edge of the living divine realm. A fight against something that was old when creation was young.',
      keyEvents: [
        'The God of Hunger manifests — a void with teeth, older than memory',
        'Living gods offer fragments of their power as weapons — each at a cost',
        'The battle: a running fight across dead god-corpses being consumed in real time',
        'The final choice: destroy, contain, or satiate',
      ],
      estimatedSessions: 8,
    },
  ],
  keyNPCs: [
    {
      name: 'Sentinel Kael',
      role: 'angelic guide / dying ally',
      personality:
        'A solar angel who has guarded the Graveyard for millennia. Weakening as gods die. Formal, ancient, terrified for the first time in his existence.',
      secret: 'He was created by the very gods who imprisoned the God of Hunger. If it escapes, he ceases to exist — his purpose ends.',
    },
    {
      name: 'The Scavenger',
      role: 'Graveyard inhabitant / ally',
      personality:
        'A githyanki hermit who has lived in the Graveyard for centuries, harvesting dead-god materials for trade. Knows every corpse, every hazard. Utterly irreverent about deities.',
    },
    {
      name: 'The God of Hunger',
      role: 'ultimate antagonist',
      personality:
        'Not evil in a comprehensible way. It is pure need — the fundamental force of want that existed before anything else did. It doesn\'t hate. It doesn\'t scheme. It just needs to eat.',
    },
    {
      name: 'Vessel (a dead god\'s echo)',
      role: 'oracle / tragic guide',
      personality:
        'The residual awareness of a dead god of knowledge. Not truly alive — more like an echo in a canyon. Can answer questions but each answer costs it a memory until nothing is left.',
    },
  ],
  keyLocations: [
    {
      name: 'The Graveyard of Gods',
      description:
        'A vast region of the Astral Sea where dead god-corpses drift. Each body is the size of a mountain and contains residual divine environments.',
      significance: 'The primary exploration environment.',
    },
    {
      name: 'The Corpse of Amara (God of Gardens)',
      description:
        'A dead nature god whose body has become an impossible garden — forests growing from stone flesh, rivers of divine ichor.',
      significance: 'A major exploration dungeon and the first dead god the party encounters.',
    },
    {
      name: 'The Barrier',
      description:
        'The boundary between dead and living divine space. A wall of pure faith that separates the Graveyard from the active pantheon.',
      significance: 'Where the final confrontation takes place.',
    },
  ],
  dataSystems: [
    'spelljammerHelm',
    'astralEncounter',
    'astralShipCombat',
    'deityPantheon',
    'artifactCorruption',
    'cataclysmCountdown',
    'monsterHarvesting',
    'encounterWaves',
    'pocketDimension',
  ],
};
