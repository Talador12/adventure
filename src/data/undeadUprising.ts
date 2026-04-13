// Undead uprising — escalating outbreak phases with containment measures, infection mechanics, and turning points.

export type UprisingPhase = 'rumors' | 'first_dead' | 'outbreak' | 'siege' | 'overrun' | 'resolution';
export type UndeadType = 'zombie' | 'skeleton' | 'ghoul' | 'wight' | 'vampire_spawn' | 'shadow';

export interface InfectionVector {
  name: string;
  description: string;
  saveDC: number;
  saveType: string;
  incubationHours: number;
  symptoms: string[];
  cure: string;
}

export interface UprisingPhaseDetail {
  phase: UprisingPhase;
  phaseNumber: number;
  description: string;
  undeadActive: UndeadType[];
  populationLoss: string;
  containmentOptions: string[];
  failureConsequence: string;
  turningPoint: string;
}

export interface UndeadUprisingScenario {
  name: string;
  origin: string;
  infectionVector: InfectionVector;
  phases: UprisingPhaseDetail[];
  finalBoss: string;
  finalBossWeakness: string;
  collateralDamage: string;
}

const SCENARIOS: UndeadUprisingScenario[] = [
  {
    name: 'The Gravedigger\'s Mistake',
    origin: 'A gravedigger cracked open an ancient sarcophagus buried beneath the town cemetery. The corpse inside was not dead - it was waiting.',
    infectionVector: {
      name: 'Grave Rot',
      description: 'Spread through bite wounds and contact with corpse fluid. Victims feel cold, then hungry, then nothing.',
      saveDC: 13,
      saveType: 'Constitution',
      incubationHours: 8,
      symptoms: ['Pale skin and cold extremities', 'Craving for raw meat', 'Inability to sleep', 'Loss of reflection in mirrors'],
      cure: 'Remove Curse before stage 3, or destroy the original corpse to break the chain.',
    },
    phases: [
      { phase: 'rumors', phaseNumber: 1, description: 'Pets go missing. Livestock found drained. The gravedigger has not been seen in days.', undeadActive: ['zombie'], populationLoss: '0', containmentOptions: ['Investigate the cemetery', 'Post guards at the graveyard entrance', 'Consult the local priest'], failureConsequence: 'The gravedigger rises as a ghoul at midnight and kills 3 families.', turningPoint: 'A child reports seeing the gravedigger "walking funny" near the old well.' },
      { phase: 'first_dead', phaseNumber: 2, description: '6 townsfolk found dead with bite marks. 2 more missing. The temple reports corpses moving in the morgue.', undeadActive: ['zombie', 'ghoul'], populationLoss: '2-5%', containmentOptions: ['Burn the infected corpses', 'Quarantine bitten survivors', 'Seal the cemetery'], failureConsequence: 'Infected survivors turn overnight. The population doubles.', turningPoint: 'The town healer is bitten while treating a patient. Clock is ticking.' },
      { phase: 'outbreak', phaseNumber: 3, description: 'Dozens of undead roaming the streets at night. Survivors barricade in the temple and town hall. Supply lines cut.', undeadActive: ['zombie', 'ghoul', 'wight'], populationLoss: '15-25%', containmentOptions: ['Organize armed patrols', 'Create a kill zone with fire', 'Evacuate through the sewers'], failureConsequence: 'The original corpse awakens fully and begins raising the dead intentionally.', turningPoint: 'A survivor reveals the sarcophagus had warning glyphs in Abyssal. This was a prison.' },
      { phase: 'siege', phaseNumber: 4, description: 'The undead are organized now. Something intelligent is directing them. They avoid fire and target the weakest barricades.', undeadActive: ['zombie', 'ghoul', 'wight', 'shadow'], populationLoss: '30-50%', containmentOptions: ['Destroy the original corpse in the cemetery', 'Call for military aid (3 days away)', 'Perform a mass consecration ritual'], failureConsequence: 'The town falls. Survivors scatter. The horde moves to the next settlement.', turningPoint: 'The original corpse sends a ghoul with a message: "Return what was taken from my tomb, or I take everything from yours."' },
    ],
    finalBoss: 'Kaelith the Undying, a 3,000-year-old necromancer-king who was imprisoned alive in the sarcophagus. Now a wight lord with 200 HP, legendary resistances, and the ability to raise any corpse within 300 feet.',
    finalBossWeakness: 'The crown that was in the sarcophagus with him. Placing it on his head re-activates the binding seal. He knows this and has hidden it.',
    collateralDamage: 'The cemetery is permanently desecrated. The town will need a new burial site and a cleric to consecrate the old one - a 30-day ritual.',
  },
  {
    name: 'The Plague Ship',
    origin: 'A merchant vessel arrived in port with its crew missing and its hold full of coffins. The harbormaster opened one.',
    infectionVector: {
      name: 'The Pallid Cough',
      description: 'Airborne fungal spores released from the coffins. Victims develop a dry cough, then necrotic patches, then they stop breathing but keep moving.',
      saveDC: 14,
      saveType: 'Constitution',
      incubationHours: 12,
      symptoms: ['Persistent dry cough', 'Grey patches on skin', 'Sensitivity to sunlight', 'Whispering voices only the infected can hear'],
      cure: 'Burning the ship destroys the spore source. Infected individuals need Lesser Restoration within 24 hours.',
    },
    phases: [
      { phase: 'rumors', phaseNumber: 1, description: 'Dock workers calling in sick. The harbor smells worse than usual. Seagulls avoid the ship.', undeadActive: [], populationLoss: '0', containmentOptions: ['Quarantine the ship', 'Test the dock workers', 'Investigate the ship\'s origin'], failureConsequence: 'The spores spread to the fish market. Infection rate triples.', turningPoint: 'A dock worker collapses, stops breathing, then stands back up and walks toward the ship.' },
      { phase: 'first_dead', phaseNumber: 2, description: 'The harbor district is in panic. 20+ infected, 8 turned. The turned are walking back to the ship as if called.', undeadActive: ['zombie', 'skeleton'], populationLoss: '1-3%', containmentOptions: ['Burn the ship at anchor', 'Seal the harbor district', 'Distribute cloth masks soaked in holy water'], failureConsequence: 'The turned reach the ship and begin unloading the remaining 40 coffins.', turningPoint: 'Inside a coffin: not a body, but a journal written by a cleric. "We sealed it. Gods forgive us, we sealed IT with them."' },
      { phase: 'outbreak', phaseNumber: 3, description: 'Coffins opened across the waterfront. Each contains something different. The fungus is spreading through the sewer system.', undeadActive: ['zombie', 'skeleton', 'ghoul', 'shadow'], populationLoss: '10-20%', containmentOptions: ['Flood the sewers with holy water from the temple', 'Firebomb the harbor (destroys the district)', 'Find the journal\'s author for answers'], failureConsequence: 'The fungal network achieves critical mass. A massive undead fungal horror rises from the ship.', turningPoint: 'The "captain" of the ship is still alive, sealed in the captain\'s quarters. He has been scratching a warning into the door for weeks.' },
      { phase: 'siege', phaseNumber: 4, description: 'A fungal horror the size of a building has rooted itself in the harbor. Undead stream from it like antibodies. The city guard is overwhelmed.', undeadActive: ['zombie', 'skeleton', 'ghoul', 'shadow', 'wight'], populationLoss: '25-40%', containmentOptions: ['Sever the fungal root network beneath the city', 'Lure the horror into deep water where it cannot anchor', 'Ignite the entire harbor with alchemist\'s fire'], failureConsequence: 'The horror spreads spores to the farmland. The region starves within months.', turningPoint: 'The captain reveals the horror is a living ship from another plane. It can be commanded - if you can reach its heart.' },
    ],
    finalBoss: 'The Mycelium Mind, a ship-sized fungal undead that fused with an eldritch entity during a planar crossing. 300 HP, regeneration 20/round, creates zombie spawn from any corpse within 100 feet.',
    finalBossWeakness: 'Radiant damage prevents its regeneration. The ship\'s original wheel, still intact at the creature\'s core, can be used to steer it back through the planar rift it came from.',
    collateralDamage: 'The harbor district is destroyed. Trade is disrupted for months. Spore contamination requires clerics to purify the soil before crops grow again.',
  },
];

export function getRandomScenario(): UndeadUprisingScenario {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}

export function getPhaseByNumber(scenario: UndeadUprisingScenario, phase: number): UprisingPhaseDetail | undefined {
  return scenario.phases.find((p) => p.phaseNumber === phase);
}

export function getActiveUndeadTypes(scenario: UndeadUprisingScenario, phase: number): UndeadType[] {
  const p = getPhaseByNumber(scenario, phase);
  return p ? p.undeadActive : [];
}

export function getAllOrigins(): string[] {
  return SCENARIOS.map((s) => s.origin);
}

export function formatScenario(scenario: UndeadUprisingScenario): string {
  const lines = [`💀 **${scenario.name}**`];
  lines.push(`  Origin: ${scenario.origin}`);
  lines.push(`  Infection: ${scenario.infectionVector.name} (DC ${scenario.infectionVector.saveDC} ${scenario.infectionVector.saveType})`);
  lines.push(`  Symptoms: ${scenario.infectionVector.symptoms.join(' -> ')}`);
  lines.push(`  Cure: ${scenario.infectionVector.cure}`);
  lines.push('  **Phases:**');
  for (const p of scenario.phases) {
    lines.push(`    ${p.phaseNumber}. ${p.phase.toUpperCase()}: ${p.description}`);
    lines.push(`       Undead: ${p.undeadActive.join(', ') || 'none yet'} | Loss: ${p.populationLoss}`);
    lines.push(`       Turning point: ${p.turningPoint}`);
  }
  lines.push(`  🏆 Final Boss: ${scenario.finalBoss}`);
  lines.push(`  💡 Weakness: ${scenario.finalBossWeakness}`);
  return lines.join('\n');
}

export { SCENARIOS as UNDEAD_UPRISING_SCENARIOS };
