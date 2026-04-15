import type { OneShotCampaign } from '../types';

export const theHealingWord: OneShotCampaign = {
  id: 'oneshot-healing-word',
  type: 'oneshot',
  title: 'The Healing Word',
  tagline: 'She can mend any bone. She cannot mend what happened.',
  tone: 'social',
  themes: ['social', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 3,
  settingSummary:
    'The village of Fenhollow was raided three weeks ago. The attackers are gone. The survivors are physically healed - a powerful cleric named Sister Maren walked through town the morning after and mended every wound, set every bone, regrew every lost limb. The village looks untouched. But the people inside it are shattered. They flinch at loud noises. They do not eat. Children do not play. A farmer stares at his rebuilt barn and cannot go inside.',
  hook:
    'Sister Maren sends word to the party, not for combat but for help she cannot provide. "I healed their bodies in an hour. Their spirits... I do not know how. I have cast Healing Word a thousand times and it has never felt so useless. Please come. Not as warriors. As people."',
  twist:
    'Sister Maren cannot heal the villagers\' trauma because she has not faced her own. She was not present during the raid - she arrived after. But she was present for a different attack, years ago, in a different village. She healed everyone then too. And then she left. She has been leaving ever since. Healing bodies and moving on because staying means feeling.',
  climax:
    'The party has spent the session helping survivors. Now they turn to Maren and ask: "Who heals you?" She breaks. She admits she runs. She admits she has never stayed long enough to see if the people she heals actually recover. The village, seeing her pain, reaches back. The farmer who could not enter his barn brings her bread. The children sit with her. Healing, it turns out, is not a spell. It is presence.',
  scenes: [
    {
      title: 'Arrival in Fenhollow',
      summary:
        'The party arrives to a village that looks perfect and feels wrong. Every building is repaired. Every person is whole. But no one makes eye contact. The market is open but no one is buying. A dog sits by a door and will not stop whining.',
      challenge: 'exploration',
      keyEvents: [
        'Walking through a physically perfect village where everything feels hollow',
        'Meeting Sister Maren, who is composed and professional and clearly exhausted',
        'The party is assigned to specific survivors who need different kinds of help',
        'A child tugs a party member\'s sleeve and says: "Can you make the bad dream stop?"',
      ],
    },
    {
      title: 'The Conversations',
      summary:
        'No combat. No puzzles. The party splits up and sits with survivors. A farmer who cannot enter his barn. A mother who has not slept. An elderly man building a memorial out of stones and unable to stop. The "encounters" are conversations. The challenge is listening.',
      challenge: 'social',
      keyEvents: [
        'The farmer: his family hid in the barn during the raid. He can still smell the smoke even though the barn was rebuilt',
        'The mother: she protected her children but now cannot let them out of her sight. They need space she cannot give',
        'The memorial builder: he lost no one. He feels guilty for being unharmed. He builds because he does not know what else to do',
        'A community meal where the party helps people sit together for the first time since the raid',
      ],
    },
    {
      title: 'The Healer\'s Wound',
      summary:
        'The party realizes Maren is not just tired - she is broken in the same way the village is. She has been healing bodies and running for years. The party turns their attention to her. She resists. Then she does not.',
      challenge: 'social',
      keyEvents: [
        'Maren deflects when asked about herself: "I am fine. I was not even here when it happened."',
        'A party member notices her hands shake when she is not casting spells',
        'The confrontation: "You heal everyone but yourself. Why?"',
        'Maren admits the truth. The village responds. The farmer brings bread. The children sit beside her. Healing without magic.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Sister Maren',
      role: 'quest giver / the one who needs saving',
      personality:
        'A cleric of extraordinary power and zero self-awareness about her own pain. Professional, kind, competent, and running from something she will not name. She has healed a hundred villages and stayed in none of them.',
      secret: 'The first village she healed was her own. She was 16. She healed everyone and left that night. She has never gone back.',
    },
    {
      name: 'Edric the Farmer',
      role: 'survivor',
      personality:
        'A quiet man who has not entered his rebuilt barn in three weeks. His family is safe. The barn is perfect. He stands outside it every morning and cannot go in. He does not understand why.',
    },
    {
      name: 'Dalla',
      role: 'survivor / mother',
      personality:
        'A mother of three who held them in a cellar during the raid. The children are fine. She has not slept since. She watches their door all night. She knows it is irrational. She cannot stop.',
    },
    {
      name: 'Old Tomas',
      role: 'survivor / memorial builder',
      personality:
        'An elderly man who was not harmed during the raid. He carries stones to the village square every day and stacks them. When asked why, he says: "Someone should remember." He does not know when to stop.',
    },
  ],
  keyLocations: [
    {
      name: 'Fenhollow Village',
      description:
        'A village that looks postcard-perfect. Every building repaired by divine magic. Flowers in window boxes. But the streets are too quiet and the people move like they are underwater.',
      significance: 'The setting - a place healed on the outside and broken on the inside.',
    },
    {
      name: 'Edric\'s Barn',
      description:
        'A perfectly rebuilt barn. The wood is new. The hay is fresh. There is no reason not to go inside. Edric stands outside it every morning.',
      significance: 'A symbol of trauma that cannot be fixed with magic.',
    },
    {
      name: 'The Memorial Stones',
      description:
        'A growing pile of river stones in the village square. Old Tomas adds one each day. No names yet. Just stones.',
      significance: 'Where the community meal happens and where Maren finally sits down.',
    },
  ],
  dataSystems: ['socialEncounter', 'npcPersonality', 'villageEvent'],
};
