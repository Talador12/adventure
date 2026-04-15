import type { FullCampaign } from '../types';

export const immortalityForBeginners: FullCampaign = {
  id: 'full-immortality-for-beginners',
  type: 'full',
  title: 'Immortality for Beginners',
  tagline: 'You cannot die. You still feel pain. You still age. You still need to eat. Congratulations?',
  tone: 'comedic',
  themes: ['comedy', 'social', 'urban'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The party has become immortal. Not in a cool way. They cannot die. But they still feel every bit of pain. They still age (slowly). They still get hungry, tired, cold, and sick. Death just does not happen. Sword through the chest? Hurts like hell. They pull it out and keep going. The campaign follows the increasingly absurd consequences of unkillable people living in a mortal world: getting a mortgage when you live forever, eating poison on a dare, picking a fight with a tarrasque because what is it going to do - kill them?',
  hook:
    'The party stumbles into a lich lair and accidentally triggers a soul-anchor trap. A flash of white light. Nothing seems different. Then one party member trips down the stairs, breaks their neck, and stands back up. Then another drinks from a poison trap and gets violently ill but does not die. Then the fighter takes a crossbow bolt to the eye and yanks it out, annoyed. They are immortal. The lich (who they have not found yet) is watching through a crystal ball, furious. Those were HIS test subjects. He needs them back.',
  twist:
    'They are not immortal. They are stuck in a time loop so small they cannot perceive it - dying and resurrecting every fraction of a second. The lich Mordevain was experimenting with temporal resurrection and the soul-anchor trap created a micro-loop: die, rewind one second, repeat. They experience it as immortality. Mordevain thinks they are dead because his scrying shows them dying continuously. He is trying to retrieve their "corpses" for further study. The loop is degrading. Eventually the rewind will fail and they will stay dead.',
  climax:
    'The party discovers the loop when they start experiencing micro-stutters - moments where the world flickers. The loop is failing. They must find Mordevain and either convince him to stabilize the loop (true immortality, but under a lich supervision), break the loop cleanly (mortality returns, they can die again), or take over the loop mechanism (risky, might work, might explode). The lich is not evil - just a researcher who lost his test subjects and is very stressed about it.',
  acts: [
    {
      title: 'Act 1: The Perks of Not Dying',
      summary:
        'The party discovers they are immortal and immediately tests it in the worst ways possible. Jumping off buildings. Eating everything. Picking fights. The comedy escalates as they realize immortality without invulnerability is a very specific kind of terrible. They still feel everything. Death just does not stick.',
      keyEvents: [
        'The discovery: one party member breaks their neck on stairs and stands up confused. Testing begins immediately.',
        'The escalation: a party member eats something they are deathly allergic to "just to see." Two hours of agony. They survive.',
        'The dragon fight: a young dragon attacks a village. The party walks into its breath weapon, screaming, and punches it in the face. The dragon is confused.',
        'The mortgage: a party member tries to buy a house. "What is your expected lifespan?" "Infinite." The bank panics. Running gag begins: Banker Loris Cale appears in every act, still processing this paperwork, increasingly unhinged.',
        'The first hint of something wrong: a party member sees the world "stutter" for a fraction of a second. Nobody else notices.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Consequences of Forever',
      summary:
        'Society reacts to immortal people. The church wants to study them. The crown wants to recruit them. A nihilist cult worships them. Meanwhile, the stutters get worse and the party starts investigating their own "immortality." Mordevain agents appear, trying to retrieve what he considers his property.',
      keyEvents: [
        'The church of the death god sends investigators: "You are an affront to the natural order." The party: "Cool. We are also hungry."',
        'The crown offers knighthoods in exchange for serving as unkillable soldiers. The offer is tempting and horrifying.',
        'Mordevain agents (undead retrieval teams) attack. They fight like they are collecting lab equipment, not battling heroes.',
        'The stutters intensify: the world flickers. A party member catches a glimpse of their own corpse for a split second.',
        'Research reveals the lich soul-anchor trap: a temporal device, not a life device. The "immortality" is mechanical, not magical.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Loop',
      summary:
        'The party confronts Mordevain and discovers the truth: they have been dying every fraction of a second and rewinding. The loop is failing. They must choose: stabilize (lich dependency), break (mortality), or seize (risky freedom). Mordevain is not a villain - he is a panicking researcher.',
      keyEvents: [
        'Mordevain lair: not a fortress but a laboratory. He is confused that his "dead" test subjects are walking around.',
        'The truth: scrying playback shows the party dying and rewinding on a loop. They watch themselves die a thousand times in one second.',
        'The degradation: the loop skips. A party member dies and stays dead for three seconds before rewinding. Time is running out.',
        'Mordevain offer: "I can stabilize the loop permanently. You live forever. But I need to monitor the anchor. You would be... tethered to me."',
        'The choice: eternal life under lich supervision, mortality restored (they can die again and they have to be okay with that), or the wild option - seize the anchor and hope they can run it themselves',
        'Callback: Banker Loris Cale appears in the lich laboratory, having tracked the party through three realms. "I STILL need your lifespan for the mortgage. Has it changed? PLEASE tell me it has changed."',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Mordevain the Methodical',
      role: 'lich / accidental antagonist',
      personality:
        'A lich who became undead specifically to have enough time to finish his research on temporal resurrection. He is not evil. He is a workaholic academic who lost his test subjects and is increasingly frantic. "I did not trap you. You stumbled into my experiment. Do you have any idea how much work you have set back?"',
      secret: 'He was trying to resurrect his wife. The soul-anchor was supposed to bring back one person. The party triggered it by accident and now the anchor is bonded to them instead.',
    },
    {
      name: 'Inquisitor Dorne',
      role: 'church investigator',
      personality:
        'A cleric of the death god sent to determine if the party immortality is heresy, miracle, or anomaly. Polite, thorough, and increasingly unnerved. "My god claims dominion over all death. If death does not apply to you, that is either theology or a bug report."',
    },
    {
      name: 'Kip "The Knife" Morrow',
      role: 'nihilist cult leader / fan',
      personality:
        'A rogue who started a cult worshipping the party as "the Deathless." He throws himself off buildings to prove his faith (he is mortal, so it goes poorly). Enthusiastic, deranged, and the party biggest and worst fan.',
    },
    {
      name: 'Banker Loris Cale',
      role: 'bureaucratic obstacle / comedy',
      personality:
        'A bank officer trying to process a mortgage application for an immortal client. His paperwork does not have a field for "infinite lifespan." He has been on hold with his supervisor for three days. He is handling this with the grim determination of a man who will not let paperwork defeat him.',
    },
  ],
  keyLocations: [
    {
      name: 'Mordevain Laboratory',
      description: 'A clean, organized lich lair that looks more like a university research wing than a dungeon. Filing cabinets. Labeled specimen jars. A whiteboard with equations. And one very stressed skeleton in a lab coat.',
      significance: 'Where the truth is revealed and the final choice happens.',
    },
    {
      name: 'The Deathless Pub',
      description: 'A tavern the party frequents where they have become celebrities. The menu includes "The Immortal Special: eat whatever you want, we dare you." The walls are covered in "I survived [thing]" plaques.',
      significance: 'Social hub. Where the comedy of immortal daily life plays out.',
    },
    {
      name: 'The Anchor Chamber',
      description: 'A small room in Mordevain lab containing the soul-anchor: a crystalline device pulsing with temporal energy. It shows a microsecond replay of the party dying and rewinding on loop. Watching it is nauseating.',
      significance: 'The mechanical heart of the campaign. Where the loop lives and where it must be resolved.',
    },
  ],
  dataSystems: ['npcGenerator', 'fantasyInsults', 'shopInventory', 'urbanEncounter', 'combatNarration'],
};
