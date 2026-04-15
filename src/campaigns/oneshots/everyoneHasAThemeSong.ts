import type { OneShotCampaign } from '../types';

export const everyoneHasAThemeSong: OneShotCampaign = {
  id: 'oneshot-everyone-has-a-theme-song',
  type: 'oneshot',
  title: 'Everyone Has a Theme Song',
  tagline: 'A curse gives everyone a theme song. The rogue\'s stealth music is a full orchestra at maximum volume.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 2,
  settingSummary:
    'A bard named Melodius accidentally activated an ancient Instrument of the Muses, cursing everyone within a mile to have a permanent, audible, magically generated theme song that plays constantly and matches their current activity. The songs are WRONG. The rogue\'s stealth theme is dramatic orchestral swells. The barbarian\'s combat music is smooth jazz. The bard\'s theme is total silence. The cleric\'s healing music is death metal. The wizard\'s casting theme is a jaunty polka. Nobody can turn them off. Stealth is impossible. Diplomacy is difficult when boss fight music plays every time the fighter enters a room.',
  hook: 'The party is hired to retrieve the Instrument of the Muses from a dungeon. Easy job. Then the curse hits. The rogue tries to sneak ahead and a 40-piece orchestra erupts from thin air, trumpets blaring. The barbarian draws their axe and a saxophone starts playing smooth jazz. The bard opens their mouth to sing and there is absolute silence. The dungeon must still be completed. The theme songs cannot be stopped. Every enemy in the dungeon can hear them coming from three rooms away.',
  twist:
    'The theme songs are not random - they are what the Instrument thinks each person SHOULD sound like based on their true personality. The rogue\'s dramatic orchestra plays because they secretly want to be the hero, not the sneaky one. The barbarian\'s smooth jazz reflects their hidden gentleness. The bard\'s silence is because the Instrument thinks their real music is their actions, not their voice. The songs cannot be changed until each person accepts what the music says about them.',
  climax:
    'The party reaches the Instrument in the final room. Melodius is there, his own theme song an ear-splitting accordion polka he cannot stop. The Instrument can only be deactivated if each person plays their theme song willingly - accepting it rather than fighting it. The rogue must dramatically announce their entrance. The barbarian must fight to smooth jazz ON PURPOSE. The bard must act in meaningful silence. When they accept, the music harmonizes into something beautiful for exactly three seconds, then stops. Melodius weeps with relief.',
  scenes: [
    {
      title: 'Scene 1: The Concert Nobody Asked For',
      summary:
        'The curse activates. Every party member gets a theme song that is hilariously wrong for their class. The first dungeon rooms must be navigated with a full soundtrack blaring. Every enemy knows exactly where they are.',
      challenge: 'combat',
      keyEvents: [
        'The rogue tries to scout ahead. A 40-piece orchestra announces their position with a heroic fanfare.',
        'The barbarian rages and smooth jazz fills the corridor. It is very relaxing. The barbarian is not relaxed.',
        'The bard tries to inspire the party with a song. Absolute silence. The Instrument has muted them entirely.',
        'A group of kobolds hears the music from three rooms away and has already set up an ambush. They brought snacks. They were expecting a show.',
      ],
    },
    {
      title: 'Scene 2: The Noise Problem',
      summary:
        'The party must solve puzzles and navigate traps while their theme songs interfere. A stealth section becomes a comedy of errors. A social encounter with a dungeon guardian is complicated by boss music playing every time someone reaches for a weapon.',
      challenge: 'puzzle',
      keyEvents: [
        'A trapped hallway requires silence to cross (sound-triggered darts). The party has zero silence. The bard, ironically, is the only one who can cross safely.',
        'A guardian sphinx asks a riddle. The wizard tries to think and a polka plays. Concentration is impossible.',
        'The party discovers that the theme songs change based on activity: the fighter\'s romance music (elevator muzak) plays whenever they look at the guardian.',
        'A room with sleeping enemies. The party must cross without waking them. Every footstep triggers a different musical genre.',
      ],
    },
    {
      title: 'Scene 3: Acceptance',
      summary:
        'The party reaches Melodius and the Instrument. To deactivate it, each person must willingly embrace their theme song - performing their class role with the wrong music on purpose. The rogue announces. The barbarian smooths. The bard acts in silence.',
      challenge: 'social',
      keyEvents: [
        'Melodius explains the curse: the music reflects truth. It stops when you stop fighting it.',
        'Each player must roleplay accepting their theme: the rogue makes a dramatic entrance on purpose, the barbarian fights gracefully to jazz.',
        'The bard\'s moment: they must do something meaningful in total silence. No words. No music. Just action.',
        'All themes harmonize for three seconds of genuinely beautiful music. Then blessed, complete quiet. Melodius collapses with relief.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Melodius the Unfortunate Bard',
      role: 'quest giver / curse origin',
      personality:
        'A bard who activated the Instrument by playing it "just to see what it does." His own theme song is an aggressive accordion polka that has been playing for three days straight. He has not slept. He cannot hear himself think over the polka. "PLEASE. I AM BEGGING YOU. MAKE THE ACCORDION STOP."',
    },
    {
      name: 'The Instrument of the Muses',
      role: 'artifact / sentient plot device',
      personality:
        'A sentient harp that genuinely believes it is giving everyone the gift of self-knowledge through music. It does not understand why people are upset. "I gave the rogue heroic music! That is a COMPLIMENT! Why is he crying?"',
      secret: 'It is lonely. It gives people music because it wants them to hear themselves the way it hears them.',
    },
  ],
  keyLocations: [
    {
      name: 'The Resonance Dungeon',
      description:
        'A dungeon built by ancient bards with acoustics that amplify every sound. The worst possible location for a curse that generates constant music. Every room echoes. Every theme song reverberates.',
      significance: 'The dungeon\'s acoustics make the theme song curse exponentially worse.',
    },
    {
      name: 'The Instrument Chamber',
      description:
        'A circular room at the dungeon\'s heart with perfect acoustics. The Instrument of the Muses sits on a pedestal, strings vibrating with the combined theme songs of everyone it has cursed.',
      significance: 'The final scene location where the curse is broken through acceptance.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'puzzleLock',
    'socialEncounter',
    'fantasyInsults',
    'dungeonDressing',
  ],
};
