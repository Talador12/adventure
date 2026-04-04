import type { OneShotCampaign } from '../types';

export const theOldFolksHome: OneShotCampaign = {
  id: 'oneshot-old-folks-home',
  type: 'oneshot',
  title: 'The Old Folks\' Home',
  tagline: 'Retired adventurers. Level 20. Creaky knees. One last job.',
  tone: 'comedic',
  themes: ['comedy', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 20,
  estimatedHours: 4,
  settingSummary:
    'The Sunset Rest Home for Retired Adventurers houses the most legendary heroes of the previous generation — now elderly, cranky, and arguing about whose glory days were better. When a young dragon threatens the home, the retirees must dust off their gear and do One Last Job. They have all their abilities. They also have bad backs, poor eyesight, and opinions about everything.',
  hook: 'A young red dragon lands outside the retirement home and demands tribute. The home\'s current security (a level 2 guard) faints. The party of retired level-20 adventurers looks at each other. "Fine. But I\'m not carrying the heavy stuff. My hip."',
  twist: 'The dragon is the child of a dragon the party defeated 40 years ago. It came for revenge. But upon meeting the party — old, frail, and nothing like the terrifying legends — it feels conflicted. Its parent spent decades telling stories about these heroes. The dragon grew up on stories about the party. Meeting its heroes as elderly retirees is disillusioning and strangely moving.',
  climax: 'The party confronts the dragon. They still have level-20 abilities but their bodies are failing. Spells fizzle (Arcana checks for each casting), attacks miss (disadvantage from bad eyesight), and healing hurts the healer\'s back. But experience, teamwork, and 40 years of wisdom make up for it. The dragon can be fought, befriended, or adopted (the home has a spare room).',
  scenes: [
    {
      title: 'Scene 1: The Morning Routine',
      summary: 'Meet the retired adventurers over breakfast. Everyone is level 20 and completely past their prime. Arguments about the old days.',
      challenge: 'social',
      keyEvents: [
        'Breakfast at Sunset Rest: oatmeal, complaints about youth, competitive reminiscing',
        'Character reintroduction: "I USED to be able to lift a horse. Now I can barely lift the remote."',
        'The dragon arrives: initial panic, then resignation, then competitive volunteering',
        'Gear retrieval: finding armor that still fits (it doesn\'t), weapons that aren\'t rusted (they are)',
      ],
    },
    {
      title: 'Scene 2: Preparing for Battle',
      summary: 'Getting ready for combat with level-20 abilities and level-1 bodies. Training, stretching, and arguing about tactics.',
      challenge: 'exploration',
      keyEvents: [
        'Training: the fighter swings a sword and throws out their back',
        'The wizard practices a fireball: it works perfectly, then they forget what they were doing',
        'Tactical planning: 40 years of experience means the plan is PERFECT. Executing it is the problem.',
        'Potions: raiding the home\'s medicine cabinet for anything useful',
      ],
    },
    {
      title: 'Scene 3: One Last Job',
      summary: 'The dragon fight. Level-20 abilities with level-20 complications. Every spell and attack comes with a physical cost.',
      challenge: 'combat',
      keyEvents: [
        'The charge: dramatic, heroic, and one person trips on a root',
        'Combat: full abilities but every action requires a secondary check (CON for back, WIS to remember the spell)',
        'The dragon realizes who they are: "You\'re... THE Silverblade? You killed my mother? You\'re so... small."',
        'Resolution: fight to victory, befriend through shared stories, or adopt (the home always needs entertainment)',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Young Dragon (Ember)', role: 'antagonist / potential friend', personality: 'A young dragon raised on stories of legendary heroes. Meeting them as retirees is... not what she expected. Conflicted between revenge and awe.' },
    { name: 'Nurse Goodberry', role: 'retirement home staff', personality: 'A halfling cleric who runs Sunset Rest. Fiercely protective of "her elders." Will fight a dragon if it threatens her residents. Level 3. Zero fear.' },
    { name: 'Grumble (retired barbarian)', role: 'NPC retiree', personality: 'An ancient orc barbarian in a wheelchair who still rages (it just looks different now). "I RAGE! ...ow. I rage gently."' },
  ],
  keyLocations: [
    { name: 'Sunset Rest Home', description: 'A cozy retirement home with comfortable chairs, a medicine cabinet, and a trophy room that hasn\'t been dusted in years.', significance: 'The party\'s home and the thing they\'re defending.' },
    { name: 'The Trophy Room', description: 'A room full of ancient weapons, faded portraits, and stories nobody young believes anymore.', significance: 'Where the party retrieves their gear.' },
    { name: 'The Front Lawn', description: 'A nice garden with a shuffleboard court, now occupied by a confused young dragon.', significance: 'The battlefield.' },
  ],
  dataSystems: ['dragonPersonality', 'combatNarration', 'fantasyInsults', 'socialEncounter', 'encounterWaves', 'partyMoraleTracker'],
};
