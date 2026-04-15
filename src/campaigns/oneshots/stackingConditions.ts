import type { OneShotCampaign } from '../types';

export const stackingConditions: OneShotCampaign = {
  id: 'oneshot-stacking-conditions',
  type: 'oneshot',
  title: 'Stacking Conditions',
  tagline: 'Every condition stacks. By scene 3, the healer is poisoned, frightened, charmed, blinded, prone, and exhausted. Simultaneously.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'survival'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The Cursed Halls of Accumulation are a dungeon where negative conditions never expire. They stack. Indefinitely. A single poison dart does not just poison you - it ADDS poison to whatever you already have. By the end of a run, adventurers are simultaneously poisoned, frightened, charmed, blinded, deafened, prone, restrained, paralyzed, and exhausted. The dungeon is short - only six rooms. It does not need to be long. The conditions do the work.',
  hook: 'A sign at the entrance: "WARNING: Conditions Persist. The Management Is Not Responsible For Accumulated Debuffs." The first room has a poison dart trap. Easy. One condition. The second room has a fear aura. Two conditions now. The party realizes the math is going to get ugly fast.',
  twist: 'The healer is the primary target. Every room has something that specifically hits the person trying to remove conditions. By scene three, the healer is the most debuffed member of the party. Blinded, poisoned, frightened, charmed, deafened, and prone. They are still the healer. They must heal while unable to see, hear, stand, think clearly, or stop shaking.',
  climax: 'The final room requires the MOST debuffed party member to activate the exit. A pedestal reads: "Only the truly afflicted may open the way." The healer, staggering under a dozen conditions, must navigate to the pedestal while simultaneously frightened (running away), charmed (wanting to stay), restrained (cannot move), and prone (on the floor). It is the most pathetic heroic moment in dungeon history.',
  scenes: [
    {
      title: 'Rooms 1-2: It Begins',
      summary: 'The first conditions are applied. The party thinks this is manageable. One poison, one fear. They have seen worse. They have not seen this dungeon.',
      challenge: 'combat',
      keyEvents: [
        'Room one: poison dart trap. The rogue triggers it. Poisoned condition applied. "I have antidote." "Antidotes do not work here."',
        'Room two: a specter with a fear aura. The fighter fails the save. Poisoned AND frightened. Still functional. Barely.',
        'The cleric tries to cast Lesser Restoration. It works - for six seconds. The condition comes back. The dungeon reasserts.',
        'Exit strategy debate: "Do we keep going or cut losses?" The treasure is in room six. Greed wins.',
      ],
    },
    {
      title: 'Rooms 3-4: The Healer Problem',
      summary: 'Conditions stack faster. The healer becomes the primary target. Charm, blindness, deafness. The person who should fix this is now the worst off.',
      challenge: 'puzzle',
      keyEvents: [
        'Room three: a siren charms the cleric. The cleric is now poisoned (from room one splash), charmed, and trying to hug the monster.',
        'Room four: a darkness trap blinds the cleric specifically. Poisoned, charmed, and blind. They bump into a pillar. They are prone.',
        'The party starts guiding the cleric by hand. "Step left. NO, your OTHER left." The cleric cannot hear them. Deafened in room four.',
        'The fighter is carrying three conditions. The rogue has four. The cleric has six. The cleric is the healer.',
      ],
    },
    {
      title: 'Rooms 5-6: The Afflicted Hero',
      summary: 'Maximum conditions. The exit requires the most debuffed party member to act. The cleric must be heroic while barely functional.',
      challenge: 'puzzle',
      keyEvents: [
        'Room five: exhaustion. Everyone gets one level. The cleric, already carrying six conditions, gets two levels. The cleric is crawling.',
        'Room six: the exit pedestal. "Only the truly afflicted may pass." The cleric qualifies. By a lot.',
        'The cleric must crawl (prone, restrained), navigate blind (blinded), resist running away (frightened), resist staying (charmed), while poisoned and exhausted',
        'Inch by inch. The party guides them with touch (they cannot see or hear). The cleric reaches the pedestal. The door opens. All conditions lift. The cleric stands up, blinks, and says: "I am never healing any of you again."',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Dungeon Architect (Malvex)', role: 'villain / absent', personality: 'A sadistic wizard who designed the dungeon as a thesis on "accumulated misery as a game mechanic." His notes are on the walls in each room explaining the design philosophy. "Room four adds blindness. The healer should now be functionally useless. Elegant."' },
    { name: 'The Score Keeper', role: 'neutral observer', personality: 'A magical construct that tallies conditions in real time. Displays a floating scoreboard above each party member. "Cleric: 8 conditions. New personal best!" It is trying to be encouraging.' },
  ],
  keyLocations: [
    { name: 'The Cursed Halls of Accumulation', description: 'A six-room dungeon where conditions never expire and always stack. Short by design. Does not need to be long when the math works against you.', significance: 'Every room adds conditions. The dungeon IS the escalation.' },
    { name: 'The Affliction Pedestal', description: 'Room six. A glowing pedestal that responds only to maximum debuffs. The most miserable person in the room is the key.', significance: 'The climax. Where being the most afflicted is actually the qualification.' },
  ],
  dataSystems: ['combatNarration', 'trapGenerator', 'dungeonRoom'],
};
