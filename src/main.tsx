import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/toast';
import { GameProvider } from './contexts/GameContext';
import Home from './pages/Home'; // Home is the landing page — keep eagerly loaded
import './styles.css';

// Lazy-load heavy pages — Game (3266 lines), CharacterCreate (1838 lines), Lobby (897 lines)
const Game = React.lazy(() => import('./pages/Game'));
const Lobby = React.lazy(() => import('./pages/Lobby'));
const CharacterCreate = React.lazy(() => import('./pages/CharacterCreate'));

// Minimal loading fallback — matches the app's dark theme
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0c0f1a]">
      <div className="flex flex-col items-center gap-3 animate-fade-in-up">
        <div className="w-8 h-8 border-2 border-[#F38020] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-slate-400">Loading...</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <GameProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/lobby/:roomId" element={<Lobby />} />
              <Route path="/game" element={<Game />} />
              <Route path="/game/:roomId" element={<Game />} />
              <Route path="/characters/new" element={<CharacterCreate />} />
              <Route path="/characters/:id/edit" element={<CharacterCreate />} />
            </Routes>
          </Suspense>
        </GameProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
