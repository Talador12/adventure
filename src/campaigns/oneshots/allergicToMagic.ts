import type { OneShotCampaign } from '../types';

export const allergicToMagic: OneShotCampaign = {
  id: 'oneshot-allergic-to-magic',
  type: 'oneshot',
  title: 'Allergic to Magic',
  tagline: 'The fighter sneezes Thunderwave every time someone casts a spell near him. In a dungeon full of wizards.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'survival'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'Bron the fighter recently developed a severe magical allergy. Any spell cast within 30 feet triggers a violent sneeze that functions as a Thunderwave centered on him. He cannot control it. He cannot suppress it. The party has been hired to clear the Wizard Academy\'s basement of escaped experiments. The basement is full of magical creatures, enchanted traps, and apprentice wizards who cast cantrips reflexively. Every room is a minefield where any use of magic turns Bron into an area-of-effect weapon that hurts everyone equally.',
  hook: 'The party descends into the academy basement. Bron asks everyone not to cast any spells near him. The wizard casts Light to see in the dark. Bron sneezes. The entire party is knocked back 10 feet. A bookshelf collapses. Three apprentices run screaming. "I TOLD you," Bron says, nose running.',
  twist: 'The escaped experiments are ALL magical. Touching them, fighting them, even being near them triggers Bron\'s allergy. By scene two, the party realizes Bron himself is the most dangerous thing in the dungeon. Every encounter becomes: how do we solve this without magic, near magic, or touching anything magical, in a wizard school basement where everything is magical?',
  climax: 'The final experiment is a Living Spell - pure concentrated magic in creature form. Bron cannot get within 60 feet of it without continuous sneezing. The party must either defeat it without Bron or deliberately weaponize his allergy by pushing him INTO the spell, triggering a sneeze so powerful it disperses the magic entirely. Bron volunteers. It is heroic. It is disgusting. It works.',
  scenes: [
    {
      title: 'The First Sneeze',
      summary: 'The party enters the basement and learns the hard way that Bron\'s allergy is real, violent, and indiscriminate. Magic is off the table. The casters are not happy.',
      challenge: 'exploration',
      keyEvents: [
        'The wizard casts Light. Bron sneezes. Everyone is knocked prone. The wizard\'s hat is gone.',
        'An enchanted door: normally opened with Knock. The party must find a non-magical solution. A crowbar.',
        'The cleric forgets and casts Guidance. Bron sneezes. The cleric is launched into a wall. Bron apologizes.',
        'New rule established: all casters stay at least 31 feet from Bron at all times. The corridors are 20 feet wide.',
      ],
    },
    {
      title: 'The Magical Minefield',
      summary: 'The experiments roam free. Enchanted brooms, animated armor, arcane oozes. All magical. All triggering Bron. The party navigates rooms where the FLOOR is enchanted.',
      challenge: 'combat',
      keyEvents: [
        'Animated brooms sweep toward the party. Bron sneezes on contact. Brooms explode into splinters.',
        'An arcane ooze oozes toward Bron. Continuous proximity = continuous sneezing. Bron becomes a Thunderwave turret.',
        'The party realizes Bron IS a weapon. They start strategically positioning him near enemies.',
        'An enchanted floor tile: one step and Bron sneezes so hard he launches himself to the ceiling. The ceiling is also enchanted.',
      ],
    },
    {
      title: 'The Living Spell',
      summary: 'The final experiment: a Living Spell of pure magic. Bron\'s allergy versus concentrated arcane energy. The biggest sneeze of all time.',
      challenge: 'combat',
      keyEvents: [
        'The Living Spell pulses with raw magic. Bron starts sneezing from 60 feet away. Continuous, violent sneezes.',
        'The party tries to fight it without Bron. It regenerates. It absorbs magic. Mundane weapons barely scratch it.',
        'The plan: push Bron into the spell. Maximum allergy. Maximum sneeze. "Are you sure?" "DO IT."',
        'Bron charges into the Living Spell. The resulting sneeze is a Thunderwave at 5th-level equivalent. The spell disperses. Bron passes out. His nose is finally clear.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Bron', role: 'party member / weapon of mass destruction', personality: 'A burly human fighter who just wants to hit things with a sword like a normal person. His magical allergy is new, unexplained, and humiliating. Carries a handkerchief the size of a bedsheet. Apologizes after every sneeze.' },
    { name: 'Archmage Nettles', role: 'quest giver / responsible party', personality: 'The academy headmaster whose experiments escaped because an apprentice left a door open. Deeply embarrassed. Hired adventurers instead of fixing it himself because "the paperwork for self-resolved incidents is worse."' },
  ],
  keyLocations: [
    { name: 'The Academy Basement', description: 'A sprawling underground laboratory full of escaped magical experiments, enchanted equipment, and panicking apprentices.', significance: 'Every room is a magical minefield for Bron. The dungeon itself is the enemy.' },
    { name: 'The Containment Chamber', description: 'The deepest lab where the Living Spell was held. Wards are broken. Magic saturates the air. Bron starts sneezing from the doorway.', significance: 'The final boss room. Where Bron\'s allergy becomes the solution.' },
  ],
  dataSystems: ['combatNarration', 'encounterWaves', 'trapGenerator'],
};
