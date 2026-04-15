import type { FullCampaign } from '../types';

export const theRedYear: FullCampaign = {
  id: 'full-the-red-year',
  type: 'full',
  title: 'The Red Year',
  tagline: 'The war was righteous. Then it was not. Nobody noticed the moment it changed.',
  tone: 'serious',
  themes: ['war', 'dark_fantasy', 'political'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 13 },
  estimatedSessions: 16,
  settingSummary:
    'The Kingdom of Valdren is at war. Three months ago, the neighboring Khassari Dominion poisoned Valdren\'s western wells. Four thousand people died - mostly children. King Aldric declared total war with the full support of every lord, every temple, and every family that lost someone. The party rides with the Valdren army, part of a righteous campaign to punish an atrocity. The anger is real. The cause is just. The enemy is guilty. At first.',
  hook: 'The party is recruited into the Valdren vanguard by Commander Brenneth, a veteran whose own daughter died from the poisoned wells. The mission is clear: push into Khassari territory, take the border fortresses, and hold them until the Khassari leadership surrenders the officials responsible for the poisoning. Brenneth is calm, professional, and utterly committed. The army marches with hymns. The party believes they are on the right side.',
  twist:
    'The wells were not poisoned by the Khassari Dominion. They were poisoned by Lord Advisor Hasek, King Aldric\'s closest counselor. Hasek wanted the war because the Khassari border region contains mithral deposits worth a kingdom\'s ransom. He poisoned Valdren\'s own people to manufacture a casus belli. The rage that drives the army, the grief that fuels the king, the righteousness that justifies every burned village - all of it was engineered by a man who calculated that four thousand dead children was an acceptable cost for mineral rights.',
  climax:
    'The party has the proof: Hasek\'s correspondence, the alchemist who brewed the poison, the shipping records. They stand before King Aldric in the Khassari capital his army just conquered. The king can accept the truth (ending the war but revealing he destroyed a nation over a lie), reject the evidence (keeping the conquered territory and burying the crime), or execute Hasek publicly while claiming the war was still justified (a political compromise that satisfies nobody and comforts everyone). The army watches. They have done terrible things for a cause they believed in. What the king says next determines whether those things were murder or justice.',
  acts: [
    {
      title: 'Act 1: The March',
      summary:
        'The party rides with the Valdren army into Khassari territory. The cause is righteous. The morale is high. The first engagements are against military targets. Then the line between soldier and civilian begins to blur.',
      keyEvents: [
        'The army crosses the border. Villages evacuate. The party takes a Khassari border fort with minimal casualties.',
        'A Khassari prisoner insists his people did not poison the wells. Nobody listens.',
        'The first atrocity: a village burned by a Valdren scout company because "they were harboring soldiers." They were not.',
        'Commander Brenneth disciplines the scouts. Then he burns the next village himself. "They knew what their leaders did."',
        'The party sees Khassari refugees fleeing - families with children the same age as those who died in the wells.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Rot',
      summary:
        'The war transforms. What started as a punitive campaign becomes a conquest. Prisoners are executed. Temples are looted. The party begins to question everything, and begins to find evidence that the poisoning was not what it seemed.',
      keyEvents: [
        'King Aldric arrives at the front. His grief has turned to cold fury. He orders no quarter for Khassari military.',
        'The party discovers the poison used on the wells was not Khassari in origin - it was Valdren-made',
        'Lord Advisor Hasek redirects the investigation, blaming Khassari agents who used stolen Valdren alchemy',
        'A Khassari defector provides evidence of mithral deposits along the border - exactly where the army is seizing territory',
        'Commander Brenneth orders the execution of Khassari prisoners. Some in the party are expected to participate.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Truth',
      summary:
        'The party assembles the proof. Hasek poisoned the wells. The war was manufactured. Now they must get the truth to the king while Hasek moves to silence them and the army finishes conquering a nation that did nothing wrong.',
      keyEvents: [
        'The party traces the poison to an alchemist in Valdren who worked for Hasek. He is terrified and cooperative.',
        'Hasek discovers the investigation. He sends soldiers to arrest the party as "Khassari spies."',
        'A desperate chase through occupied Khassari territory with Hasek\'s men in pursuit',
        'The party reaches King Aldric in the conquered Khassari capital with the evidence',
        'The king\'s choice. The army\'s reaction. The aftermath for a nation built on a lie.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Commander Brenneth',
      role: 'ally / moral barometer',
      personality:
        'A decorated soldier whose daughter died from the poisoned wells. Professional, principled at first, then slowly consumed by a rage that feels earned. He is not a bad man. He is a grieving father with an army.',
      secret: 'He knows the war has gone too far. He cannot stop because stopping means his daughter died for nothing.',
    },
    {
      name: 'Lord Advisor Hasek',
      role: 'villain',
      personality:
        'A brilliant political operative who speaks in calm, reasonable tones about necessary sacrifices. He did not enjoy poisoning the wells. He simply determined it was the most efficient path to the mithral deposits.',
      secret: 'He has a family. He loves them. He poisoned the wells knowing children would die. He has not slept well since.',
    },
    {
      name: 'King Aldric',
      role: 'tragic authority',
      personality:
        'A good king unmade by grief. He lost cousins in the poisoning. His rage is genuine, earned, and pointed in the wrong direction. When confronted with the truth, his response will define the kingdom.',
    },
    {
      name: 'Sera',
      role: 'Khassari perspective / ally',
      personality:
        'A Khassari healer captured by the Valdren army. Quiet, observant, and carrying a fury of her own - for a war her people did not start and cannot stop.',
    },
  ],
  keyLocations: [
    {
      name: 'The Western Wells',
      description: 'The poisoned water sources in rural Valdren. Now shrines. Four thousand names carved into the stone casings.',
      significance: 'The inciting atrocity. The party visits before the march to understand what they are fighting for.',
    },
    {
      name: 'The Khassari Borderlands',
      description: 'Rolling grasslands and farming villages, now burning. A beautiful country being systematically destroyed.',
      significance: 'Where the war plays out. Each session brings the army deeper and the moral ground lower.',
    },
    {
      name: 'The Conquered Capital',
      description: 'The Khassari capital of Tessara, taken by siege. Damaged but standing. The king holds court in a throne room that belongs to someone else.',
      significance: 'Where the truth is delivered. A throne room full of conquerors hearing that their war was a lie.',
    },
  ],
  dataSystems: [
    'combatEncounter',
    'warBattle',
    'moralDilemma',
    'courtIntrigue',
    'factionReputation',
    'detectiveCase',
    'npcRelationshipWeb',
  ],
};
