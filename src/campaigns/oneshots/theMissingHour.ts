import type { OneShotCampaign } from '../types';

export const theMissingHour: OneShotCampaign = {
  id: 'oneshot-missing-hour',
  type: 'oneshot',
  title: 'The Missing Hour',
  tagline: 'Everyone in town lost an hour. Same hour. Nobody remembers it. Someone used that hour for the perfect crime.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'At 2 PM, every person in Millhaven blinked and it was 3 PM. One hour, gone. No one remembers anything. During that hour, the town vault was emptied, the mayor\'s seal was used to sign three documents, and a prisoner escaped. The party investigates what happened in the hour nobody remembers.',
  hook: 'The clocktower reads 3 PM. Every person in Millhaven\'s last memory is 2 PM. The vault is empty. The mayor does not remember signing anything. And Cell 4 in the jail is open. "What happened in that hour?"',
  twist:
    'A chronomancer froze time for everyone except herself. She did not stop time - she removed one hour from everyone\'s memory and lived through it normally. She is the new librarian, hired two weeks ago, and nobody thinks to suspect the quiet woman who shelves books.',
  climax:
    'The party traces the magical signature to the library. The chronomancer is calm, professional, and offers to return everything if the party lets her keep one item from the vault: a pocket watch that belonged to her murdered daughter. The vault robbery was a cover for recovering the watch.',
  scenes: [
    {
      title: 'Scene 1: The Gap',
      summary: 'Discovery of the missing hour. Three crimes happened simultaneously. The party must figure out how.',
      challenge: 'exploration',
      keyEvents: [
        'Every clock jumped an hour. Every person lost the same sixty minutes.',
        'The vault: opened with the correct combination. 10,000 gold gone.',
        'The mayor\'s seal: used to sign land transfers. He does not remember.',
        'The prisoner: gone. Cell unlocked from the outside with the jailer\'s key.',
      ],
    },
    {
      title: 'Scene 2: The Trace',
      summary: 'Magical investigation. The missing hour left traces. Someone was awake while everyone else was frozen.',
      challenge: 'puzzle',
      keyEvents: [
        'Residual chronomancy detected. Powerful. Centered on the town square.',
        'Physical evidence: footprints in the vault dust from one person. Small. Deliberate.',
        'The three crimes are connected: vault, seal, prisoner. All benefited one person.',
        'The librarian was hired two weeks ago. Nobody checked her references.',
      ],
    },
    {
      title: 'Scene 3: The Librarian',
      summary: 'Confrontation at the library. The chronomancer is not a villain. She is a grieving mother who went too far.',
      challenge: 'social',
      keyEvents: [
        'The librarian does not run. She expected to be found eventually.',
        'Her daughter was murdered. The killer was the escaped prisoner. The watch is all she has left.',
        'The vault gold: she does not want it. She needed the documents to free the prisoner so she could confront him.',
        'Return everything, keep the watch, and hand over the prisoner. Or arrest a grieving mother.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Seraphine Duskwood',
      role: 'chronomancer / the librarian',
      personality: 'Quiet, precise, deeply sad. She planned the missing hour for months. Every detail was perfect because she has nothing left to lose.',
      secret: 'She already confronted the prisoner during the missing hour. He is dead in the woods outside town. She has not told anyone.',
    },
    {
      name: 'Constable Barret',
      role: 'town guard',
      personality: 'Competent, honest, and completely out of his depth. Time magic is not in his training manual.',
    },
  ],
  keyLocations: [
    {
      name: 'Millhaven Town Square',
      description: 'The epicenter of the time anomaly. Clocks here are still slightly off. The air smells like ozone.',
      significance: 'Where the chronomancy was cast and where investigation begins.',
    },
    {
      name: 'The Millhaven Library',
      description: 'A quiet, well-organized library. The new librarian\'s desk has a locked drawer and a faint shimmer of temporal magic.',
      significance: 'Where the chronomancer hides in plain sight.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator', 'combatNarration'],
};
