// Built-in plugin: Crit Tracker — counts crits and fumbles per session.
// Example of how to write an Adventure plugin.
import type { AdventurePlugin } from '../lib/plugins';

let crits = 0;
let fumbles = 0;

const critTracker: AdventurePlugin = {
  id: 'crit-tracker',
  name: 'Crit Tracker',
  version: '1.0.0',
  description: 'Counts natural 20s and natural 1s per session.',

  onLoad() {
    crits = 0;
    fumbles = 0;
  },

  onRoll(event) {
    if (event.isCritical) {
      crits++;
      if (crits % 5 === 0) return `${crits} critical hits this session. The dice are in a generous mood.`;
    }
    if (event.isFumble) {
      fumbles++;
      if (fumbles % 5 === 0) return `${fumbles} fumbles this session. The dice have chosen violence.`;
    }
  },
};

export default critTracker;
