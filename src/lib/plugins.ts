// Plugin system — load custom JS modules as game extensions.
// Plugins register hooks for game events. No eval, no arbitrary code execution.
// Plugins are plain objects with lifecycle methods + event handlers.
//
// Usage:
//   registerPlugin({ id: 'my-plugin', name: 'My Plugin', onRoll: (roll) => { ... } });
//   emitPluginEvent('roll', { sides: 20, value: 15 });

export interface PluginEventMap {
  roll: { sides: number; value: number; isCritical: boolean; isFumble: boolean; rollerName: string };
  damage: { source: string; target: string; amount: number; type?: string };
  turnStart: { unitName: string; unitId: string; round: number };
  turnEnd: { unitName: string; unitId: string };
  combatStart: { unitCount: number };
  combatEnd: { rounds: number; xpEarned: number };
  rest: { type: 'short' | 'long'; characterName: string };
  death: { unitName: string; killerName?: string };
  levelUp: { characterName: string; newLevel: number };
  sceneChange: { sceneName: string };
}

export type PluginEventName = keyof PluginEventMap;

export interface AdventurePlugin {
  id: string;
  name: string;
  version?: string;
  description?: string;
  /** Called when the plugin is registered */
  onLoad?: () => void;
  /** Called when the plugin is unregistered */
  onUnload?: () => void;
  /** Event handlers — return a string to add a message to the DM history */
  onRoll?: (event: PluginEventMap['roll']) => string | void;
  onDamage?: (event: PluginEventMap['damage']) => string | void;
  onTurnStart?: (event: PluginEventMap['turnStart']) => string | void;
  onTurnEnd?: (event: PluginEventMap['turnEnd']) => string | void;
  onCombatStart?: (event: PluginEventMap['combatStart']) => string | void;
  onCombatEnd?: (event: PluginEventMap['combatEnd']) => string | void;
  onRest?: (event: PluginEventMap['rest']) => string | void;
  onDeath?: (event: PluginEventMap['death']) => string | void;
  onLevelUp?: (event: PluginEventMap['levelUp']) => string | void;
  onSceneChange?: (event: PluginEventMap['sceneChange']) => string | void;
}

// --- Plugin registry ---
const plugins = new Map<string, AdventurePlugin>();
let messageCallback: ((msg: string) => void) | null = null;

export function setPluginMessageCallback(cb: (msg: string) => void) {
  messageCallback = cb;
}

export function registerPlugin(plugin: AdventurePlugin): boolean {
  if (plugins.has(plugin.id)) return false;
  plugins.set(plugin.id, plugin);
  plugin.onLoad?.();
  return true;
}

export function unregisterPlugin(id: string): boolean {
  const plugin = plugins.get(id);
  if (!plugin) return false;
  plugin.onUnload?.();
  plugins.delete(id);
  return true;
}

export function getPlugins(): AdventurePlugin[] {
  return Array.from(plugins.values());
}

export function emitPluginEvent<K extends PluginEventName>(event: K, data: PluginEventMap[K]): void {
  const handlerName = `on${event.charAt(0).toUpperCase()}${event.slice(1)}` as keyof AdventurePlugin;
  for (const plugin of plugins.values()) {
    try {
      const handler = plugin[handlerName] as ((data: PluginEventMap[K]) => string | void) | undefined;
      if (handler) {
        const result = handler(data);
        if (typeof result === 'string' && result.trim() && messageCallback) {
          messageCallback(`[${plugin.name}] ${result}`);
        }
      }
    } catch (err) {
      console.warn(`Plugin ${plugin.id} error on ${event}:`, err);
    }
  }
}

// Expose to window for manual plugin loading from console
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__ADVENTURE_PLUGINS__ = {
    register: registerPlugin,
    unregister: unregisterPlugin,
    list: getPlugins,
    emit: emitPluginEvent,
  };
}
