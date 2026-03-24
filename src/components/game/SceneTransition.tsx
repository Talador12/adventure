// SceneTransition — dramatic title card between encounters and scene changes.
// Full-screen overlay with the scene name, a fade-in/out, and a brief mood line.
// Fires when sceneName changes. The kind of thing that makes a session feel cinematic.
import { useState, useEffect, useRef } from 'react';

interface SceneTransitionProps {
  sceneName: string;
}

export default function SceneTransition({ sceneName }: SceneTransitionProps) {
  const [visible, setVisible] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const prevScene = useRef(sceneName);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (sceneName && sceneName !== prevScene.current && prevScene.current !== '') {
      setDisplayName(sceneName);
      setVisible(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 3000);
    }
    prevScene.current = sceneName;
  }, [sceneName]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9992] pointer-events-none flex items-center justify-center">
      <div className="animate-fade-in-up text-center">
        <div className="text-[10px] text-slate-600 uppercase tracking-[0.3em] mb-2">Scene Change</div>
        <div className="text-2xl font-bold text-slate-200 tracking-wide">{displayName}</div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mt-3" />
      </div>
    </div>
  );
}
