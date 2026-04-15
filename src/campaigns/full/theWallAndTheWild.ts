import type { FullCampaign } from '../types';

export const theWallAndTheWild: FullCampaign = {
  id: 'full-wall-and-the-wild',
  type: 'full',
  title: 'The Wall and the Wild',
  tagline: 'They built the wall to keep the monsters out. The refugees are not the monsters.',
  tone: 'political',
  themes: ['political', 'war', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 18,
  settingSummary:
    'The Kingdom of Harenth built the Ashwall three years ago - a sixty-foot stone barrier spanning its entire northern border. On the other side: the Verdain, a nation destroyed by something its people will not name. Thousands of Verdain refugees press against the wall, desperate to cross. Inside Harenth, propaganda paints them as disease carriers, criminals, and barely human. The party starts as Ashwall garrison soldiers, loyal to the kingdom, believing the stories. Then they are assigned to a patrol outside the wall and see what is actually there.',
  hook: 'Captain Drenn pins patrol orders to the barracks wall. "Forward reconnaissance. Three days outside the Ashwall. Map refugee camps, count heads, assess threat levels. Do not engage unless fired upon. And keep your masks on - the wilders carry plague." The masks are decorative. There is no plague. But the party does not know that yet.',
  twist:
    'The Ashwall\'s architect, Lord Councilor Maren Hask, knows exactly what destroyed Verdain - an ancient entity called the Hollow that consumes civilizations by draining the life from the land itself. It is coming south. Hask did not build the wall to keep refugees out. He built it to keep Harenth\'s population IN - concentrated, immobile, trapped. He has made a deal with the Hollow: the population of Harenth in exchange for safe passage for himself and his inner circle. The wall is not a defense. It is a pen.',
  climax:
    'The Hollow reaches the Ashwall. The wall that was supposed to protect Harenth now traps its people with the threat bearing down. The party must open the wall - getting Harenth\'s citizens out means letting the refugees in, destroying the barrier between "us" and "them" in the most literal way possible. Hask tries to seal the gates. The party must stop him, unite both populations, and face the Hollow together - because the Verdain survivors are the only people who know how to fight it. They have been trying to warn Harenth for three years. No one listened.',
  acts: [
    {
      title: 'Act 1: The Wall',
      summary:
        'The party serves on the Ashwall, absorbs the propaganda, and is sent outside. They meet refugees. Not monsters. Families. Children. People who lost everything and are being treated like the thing that took it.',
      keyEvents: [
        'Garrison life: the propaganda, the training, the casual dehumanization of "wilders"',
        'Patrol outside the wall: the first encounter with refugees - scared, starving, human',
        'A refugee elder tries to warn the party about the Hollow: "We are not running from nothing."',
        'Returning to the garrison with information that contradicts everything they were told',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Truth',
      summary:
        'The party investigates. The refugee camps are not a threat - they are a humanitarian disaster. The propaganda campaign traces back to Hask. The party discovers the wall was not built for defense and the thing that destroyed Verdain is still coming.',
      keyEvents: [
        'Defying orders to aid refugees - medical supplies, food, crossing unauthorized people through',
        'Investigating Hask: following the propaganda to its source, finding his secret communications',
        'The Verdain survivors share what they know: the Hollow, what it does, how it moves',
        'Discovering Hask\'s deal: the wall is a trap, not a shield, and the Hollow is weeks away',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Opening',
      summary:
        'The Hollow arrives. The wall must come down or everyone inside dies. The party fights to open the gates, unites two peoples who have been taught to fear each other, and faces the real enemy together.',
      keyEvents: [
        'The Hollow reaches the wall\'s northern face - the land dies on contact',
        'Hask seals the gates and orders the army to hold position - trapping everyone inside',
        'The party breaks the gates: Harenth civilians flee south, refugees pour in to help fight',
        'United stand: Verdain survivors lead the defense using knowledge gained from their own defeat',
        'Confronting Hask: a man who sold a nation for his own survival',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Captain Drenn',
      role: 'commanding officer / evolving ally',
      personality:
        'Career soldier. Follows orders. Good at her job. Not cruel - just does not think about what the orders mean. When the party challenges her worldview, she resists. Then she sees the refugee children. The process of an honest person changing their mind, played slow.',
    },
    {
      name: 'Lord Councilor Maren Hask',
      role: 'primary antagonist',
      personality:
        'Architect of the wall. Brilliant engineer, gifted speaker, and the most frightened person in Harenth. Everything he has done - the wall, the propaganda, the deal with the Hollow - comes from a terror so deep it ate his conscience.',
      secret: 'He watched the Hollow take Verdain from a hilltop. He has not slept a full night since. His evil is cowardice, not malice.',
    },
    {
      name: 'Elder Vassha',
      role: 'refugee leader / ally',
      personality:
        'A Verdain elder who has spent three years being ignored, demonized, and denied. She is not angry. She is exhausted. She has been trying to save the people who hate her because it is the right thing to do.',
    },
    {
      name: 'Tomas (refugee child)',
      role: 'moral weight',
      personality:
        'Eight years old. Born in a refugee camp. Has never seen the inside of a building. Draws pictures of houses in the dirt. Asks the party if the people behind the wall are nice.',
    },
  ],
  keyLocations: [
    {
      name: 'The Ashwall',
      description: 'Sixty feet of stone stretching horizon to horizon. Guard towers every quarter mile. Built to last forever. Built for the wrong reason.',
      significance: 'The central symbol. Protection or prison depends on which side you stand.',
    },
    {
      name: 'The Refugee Camps',
      description: 'Tent cities pressed against the wall\'s northern face. Mud, cookfires, makeshift schools. Thousands of people living in the shadow of a wall built to ignore them.',
      significance: 'Where the party\'s understanding of "the enemy" falls apart.',
    },
    {
      name: 'Hask\'s Observatory',
      description: 'A tower built into the wall\'s highest point. Contains Hask\'s private study, his communications with the Hollow, and a telescope pointed north. He watches the thing coming.',
      significance: 'Where the conspiracy is revealed.',
    },
  ],
  dataSystems: [
    'factionReputation',
    'npcRelationshipWeb',
    'massCombat',
    'moralDilemma',
    'socialEncounter',
    'diplomaticNegotiation',
    'encounterWaves',
    'partyMoraleTracker',
  ],
};
