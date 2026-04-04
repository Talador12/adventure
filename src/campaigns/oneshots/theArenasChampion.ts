import type { OneShotCampaign } from '../types';

export const theArenasChampion: OneShotCampaign = {
  id: 'oneshot-arenas-champion',
  type: 'oneshot',
  title: 'The Arena\'s Champion',
  tagline: 'Five rounds. Five impossible fights. One rule: the crowd must be entertained.',
  tone: 'epic',
  themes: ['classic_fantasy', 'war'],
  playerCount: { min: 3, max: 6 },
  level: 8,
  estimatedHours: 4,
  settingSummary:
    'The Grand Colosseum of Aethon hosts the Tournament of Heroes once per decade — a five-round gladiatorial event where teams fight exotic monsters, rival gladiators, and environmental challenges. Winning earns a wish from the Colosseum\'s patron god. But the arena is more than sport: every fight is designed to test a different virtue, and the crowd\'s favor is a mechanical resource.',
  hook: 'The party needs a miracle — a resurrection, a cure, a pardon, a second chance. The Tournament of Heroes grants a wish to the victors. They sign up. Their first opponent walks out: it\'s a hydra wearing a party hat. The crowd goes wild.',
  twist:
    'The final round isn\'t a fight — it\'s a sacrifice. The patron god reveals that the "wish" requires one champion to give up their greatest ability permanently. A fighter loses their strength. A wizard loses their magic. A rogue loses their agility. The wish works, but the cost is real and personal.',
  climax:
    'Round 5: the party faces a mirror version of themselves — constructs that have their exact abilities. The only way to win is to fight in ways that aren\'t in their stat block: creativity, teamwork, and doing things their class "shouldn\'t" be able to do. After victory, the sacrifice choice.',
  scenes: [
    {
      title: 'Scene 1: Registration and Round 1',
      summary:
        'Signing up, meeting rivals, and the first fight. The crowd mechanic is introduced: perform flashy moves, interact with the audience, and earn crowd favor (a spendable combat resource).',
      challenge: 'combat',
      keyEvents: [
        'Registration: the party picks a team name (the crowd remembers)',
        'Meet the rivals: Team Ironblood (veterans), The Beautiful Ones (performers), The Nameless (mysterious)',
        'Round 1: Hydra with environmental hazards (fire columns, rising water)',
        'Crowd mechanic introduced: flashy kills and dramatic moments earn crowd favor tokens',
      ],
    },
    {
      title: 'Scene 2: Rounds 2-4',
      summary:
        'Three escalating fights. Each tests a different virtue: Round 2 tests mercy, Round 3 tests sacrifice, Round 4 tests cunning.',
      challenge: 'combat',
      keyEvents: [
        'Round 2: the "monster" is a captured village chief — do they fight or refuse?',
        'Round 3: a trap room where the party can sacrifice a team member\'s HP to save the others',
        'Round 4: Team Ironblood — a fight against rivals who respect the party',
        'Between rounds: backstage politics, healing, and the crowd\'s growing investment',
      ],
    },
    {
      title: 'Scene 3: The Final Round',
      summary:
        'Mirror match against magical constructs of themselves. Then the wish — and its price.',
      challenge: 'combat',
      keyEvents: [
        'Round 5: mirror constructs with exact stat copies — brute force won\'t work',
        'Victory through creativity: doing things classes "can\'t" do',
        'The patron god appears: "Your wish is granted. The price is one champion\'s greatest gift."',
        'The sacrifice: which party member gives up what matters most?',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'The Arbiter',
      role: 'tournament master',
      personality:
        'A stern, fair half-giant who runs the tournament with military precision. Announces fights with theatrical flair. Secretly ensures fights are fair even when they don\'t seem it.',
    },
    {
      name: 'Kael Ironblood',
      role: 'rival champion / respect',
      personality:
        'Leader of Team Ironblood, a scarred veteran who fights with honor. Respects worthy opponents. Win or lose, she shakes your hand. "The arena reveals who you really are."',
    },
    {
      name: 'The Patron',
      role: 'patron god',
      personality:
        'A minor god of competition and growth. Not cruel — genuinely believes sacrifice makes wishes more meaningful. "A wish without cost is just a gift. Gifts are forgotten. Sacrifices are remembered."',
    },
  ],
  keyLocations: [
    {
      name: 'The Grand Colosseum',
      description:
        'A massive arena that magically reshapes between rounds: adding water, fire, elevation, or environmental hazards. Seats 10,000 screaming fans.',
      significance: 'Where all five rounds take place.',
    },
    {
      name: 'The Champions\' Hall',
      description:
        'Backstage area where teams rest between rounds. Healers, armorers, and whispered conversations between rivals.',
      significance: 'Between-round social interactions and politics.',
    },
    {
      name: 'The Patron\'s Dais',
      description:
        'A floating platform above the arena where the patron god watches. The air crackles with divine energy. This is where the wish is granted.',
      significance: 'The final scene and sacrifice choice.',
    },
  ],
  dataSystems: [
    'tournamentBracket',
    'gladiatorArena',
    'encounterWaves',
    'combatNarration',
    'partyMoraleTracker',
    'skillChallenge',
  ],
};
