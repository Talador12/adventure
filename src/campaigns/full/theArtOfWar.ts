import type { FullCampaign } from '../types';

export const theArtOfWar: FullCampaign = {
  id: 'full-art-of-war',
  type: 'full',
  title: 'The Art of War',
  tagline: 'Steal a painting from a fortress. During a siege. While both sides are trying to kill you.',
  tone: 'heist',
  themes: ['heist', 'war', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 14,
  settingSummary:
    'The Thornwall War has ground on for three years. Warlord Kazren holds Thornwall Fortress with an iron grip. The allied kingdoms are losing. Hidden inside the fortress is a painting called "The General\'s Eye" - believed to be a map to a weapons cache from a previous age that could end the war overnight. A resistance cell wants the party to infiltrate the fortress during the chaos of the next assault and steal the painting before either army can claim it.',
  hook: 'Commander Vael of the resistance unfurls a sketch on a tavern table. It shows a painting hanging in Warlord Kazren\'s war room. "That painting is a map. It shows the location of the Sunforge Arsenal - enough firepower to end this war in a week. Kazren does not know what he has. The allied generals do and they want it for themselves. We need someone with no army and no loyalty to walk in during the battle and walk out with it."',
  twist:
    'The painting is a forgery - a decoy hung generations ago. The real map to the Sunforge Arsenal is tattooed across the back and shoulders of Lieutenant Reva Solenne, Kazren\'s most trusted officer. Reva knows what she carries. She has been looking for someone trustworthy enough to defect to, but every side in this war wants the arsenal for conquest, not peace. She will only reveal the map to people who intend to destroy the cache, not use it.',
  climax:
    'The fortress during full siege. The party has the fake painting and discovers the truth mid-heist. They must find Reva in the chaos of battle, convince her they are not just another faction grabbing for power, and escape a collapsing fortress while two armies fight through it. The final choice: deliver the arsenal\'s location to end the war fast (but arm one side for future conquest), destroy the information entirely (prolonging this war but preventing the next one), or help Reva broker a third option - revealing the arsenal\'s existence publicly so no one side can monopolize it.',
  acts: [
    {
      title: 'Act 1: Behind the Lines',
      summary:
        'The party crosses into occupied territory, makes contact with resistance cells, and gathers intelligence on the fortress. The war is not an abstract backdrop - they see what it does to people.',
      keyEvents: [
        'Commander Vael\'s briefing: the painting, the fortress layout, the timing of the next assault',
        'Crossing no-man\'s land - minefields, patrols, desperate refugees',
        'Infiltrating the town below the fortress, gathering intel from locals living under occupation',
        'First sighting of Lieutenant Reva - efficient, respected by her troops, something hidden in her eyes',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Siege Begins',
      summary:
        'The allied assault begins. The party uses the chaos to infiltrate Thornwall Fortress. Inside they find the painting, steal it, and then discover it is a worthless fake. The real map is walking around in a lieutenant\'s uniform.',
      keyEvents: [
        'Siege day: catapults, breaches, smoke and screaming - the party enters through the chaos',
        'Navigating the fortress interior during active combat - soldiers, traps, collapsing walls',
        'Stealing the painting from the war room - too easy, which should worry them',
        'A captured resistance agent reveals the truth: "The painting is nothing. Find Reva."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Defector',
      summary:
        'Finding Reva in a fortress that is falling apart. Convincing her to trust them. Escaping while two armies tear the place down around them. And deciding what to do with a weapon that could end one war and start three more.',
      keyEvents: [
        'Tracking Reva through the battle - she is trying to reach the armory to destroy records',
        'The pitch: Reva will only share the map if she believes they will not weaponize it',
        'Escape from Thornwall as the walls come down - running fight through collapsing corridors',
        'The decision: use the arsenal, destroy it, or expose it to the world',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Commander Vael',
      role: 'quest giver',
      personality:
        'A resistance leader who has been fighting for three years and shows it. Pragmatic, tired, willing to use people if it stops the bleeding. "I do not need heroes. I need results."',
      secret: 'Vael wants the arsenal for the resistance, not to destroy it. Winning matters more to her than principle.',
    },
    {
      name: 'Lieutenant Reva Solenne',
      role: 'defector / key ally',
      personality:
        'Career soldier on the wrong side of a war she stopped believing in. Carries the tattooed map like a burden. Quiet, watchful, tests everyone. "Every faction wants what I carry. None of them deserve it."',
    },
    {
      name: 'Warlord Kazren',
      role: 'antagonist',
      personality:
        'A competent military commander, not a cartoon villain. Fights because he believes his people were wronged. His occupation is brutal because occupations always are. He does not know about the map on Reva\'s back.',
    },
    {
      name: 'Smoke (resistance infiltrator)',
      role: 'ally / guide',
      personality:
        'A halfling who has lived undercover in the fortress town for two years. Knows every tunnel, every bribable guard, every weak point. Speaks in whispers out of habit.',
    },
  ],
  keyLocations: [
    {
      name: 'Thornwall Fortress',
      description: 'A massive hilltop stronghold built for sieges. Thick walls, narrow corridors, kill zones. Currently under bombardment.',
      significance: 'The heist location. The party must navigate it during active combat.',
    },
    {
      name: 'The War Room',
      description: 'Kazren\'s command center. Maps, dispatches, and one forged painting hanging above the fireplace.',
      significance: 'Where the party steals the wrong thing.',
    },
    {
      name: 'The Breach',
      description: 'Where the allied army finally cracks the wall. A gap of rubble, fire, and chaos. The loudest place in the world.',
      significance: 'The entry point and the escape route. Timing is everything.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'massCombat',
    'siegeWarfare',
    'socialEncounter',
    'trapDisarm',
    'encounterWaves',
    'npcRelationshipWeb',
    'moralDilemma',
  ],
};
