import type { OneShotCampaign } from '../types';

export const theForgottenFloor: OneShotCampaign = {
  id: 'oneshot-forgotten-floor',
  type: 'oneshot',
  title: 'The Forgotten Floor',
  tagline: 'Between the 3rd and 5th floor is the 4th. Nobody remembers building it.',
  tone: 'exploration',
  themes: ['exploration', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The Greystone Archives is a four-story building in the city center. Everyone knows it has three floors. The blueprints show three floors. But when you count the windows from outside, there are four rows. Between floors 3 and 5 is a floor that does not appear on any plan and no one remembers constructing. The party is hired to investigate.',
  hook: 'A clerk counting windows for a renovation noticed the discrepancy. She went looking for a staircase to the 4th floor and found a door that was not there before, sealed with a lock that matches no key in the building. It is warm to the touch.',
  twist: 'The floor was not built. It grew. The building was constructed on the site of an arcane library that sank into the ground centuries ago. The library is rebuilding itself, one floor at a time, consuming the building from inside. The 4th floor is not part of the Archives. It is part of the original library, pushing through into the present.',
  climax: 'The library is sentient and wants to be whole again. The party must negotiate with it, satisfy its purpose by returning a stolen book, or sever its connection to the Archives before it consumes the entire building.',
  scenes: [
    {
      title: 'Scene 1: The Wrong Door',
      summary: 'Finding and entering the hidden 4th floor. The architecture makes no sense. Hallways curve where they should not. Rooms are bigger inside than outside.',
      challenge: 'exploration',
      keyEvents: [
        'The sealed door: bronze, warm as skin, no hinges or keyhole. When a party member places their palm flat against it, it swings inward with a sigh like displaced air',
        'The 4th floor: vaulted stone ceilings twice the height of the floors below. Shelves of dark wood hold books bound in materials that are not leather. The script on the spines shifts when viewed peripherally',
        'Spatial anomalies: a hallway that turns four right angles and returns to its starting point. A reading alcove with no ceiling that opens to a sky full of unfamiliar stars',
        'A circular reading room where book spines rearrange to spell messages when the party looks away and back: W-E-L-C-O-M-E',
      ],
    },
    {
      title: 'Scene 2: The Living Library',
      summary: 'The floor reacts to the party. It tests them, guides them, and reveals its history through environmental storytelling.',
      challenge: 'puzzle',
      keyEvents: [
        'The library communicates through rearranged text on book spines',
        'A puzzle room: shelves that must be organized by subject to unlock a passage',
        'A memory: the party witnesses a ghostly replay of the original library sinking',
        'The catalyst: a book was stolen centuries ago, and the library cannot rest without it',
      ],
    },
    {
      title: 'Scene 3: The Growth',
      summary: 'The library begins consuming the 3rd and 5th floors. The party must resolve its need before the entire building is absorbed.',
      challenge: 'social',
      keyEvents: [
        'The building shakes as walls shift and new rooms appear',
        'The stolen book is in the Archives collection, misfiled for decades',
        'Returning the book: the library calms and retracts, leaving the 4th floor as a gift',
        'Alternative: severing the connection collapses the 4th floor but saves the building',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Maren Solwick', role: 'quest giver', personality: 'The clerk who found the extra floor. Meticulous, nervous, and convinced she is losing her mind. "I counted the windows seven times. Seven."' },
    { name: 'The Library', role: 'sentient location', personality: 'Not a person but a presence. Communicates through book titles, shifting architecture, and ambient temperature. It is not hostile. It is lonely.' },
    { name: 'Archivist Dunne', role: 'ally / obstacle', personality: 'The head archivist who insists the 4th floor does not exist because it is not on the plans. He will not enter it. He will not acknowledge it.' },
  ],
  keyLocations: [
    { name: 'The Greystone Archives', description: 'A four-story building that everyone insists has three floors.', significance: 'The container for the mystery. The building itself is changing.' },
    { name: 'The 4th Floor', description: 'Ancient library architecture pushing through modern walls. Curved halls, impossible rooms, living shelves.', significance: 'The heart of the exploration. Every room reveals more of the library\'s story.' },
    { name: 'The Reading Room', description: 'A circular chamber at the center of the 4th floor where the library\'s consciousness is strongest.', significance: 'Where the party communicates with the library and resolves the conflict.' },
  ],
  dataSystems: ['puzzleLock', 'hauntedLocation', 'explorationChallenge', 'npcDialogue', 'magicItemGenerator'],
};
