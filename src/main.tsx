import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/toast';
import { GameProvider } from './contexts/GameContext';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import CharacterCreate from './pages/CharacterCreate';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <GameProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/lobby/:roomId" element={<Lobby />} />
            <Route path="/game" element={<Game />} />
            <Route path="/game/:roomId" element={<Game />} />
            <Route path="/characters/new" element={<CharacterCreate />} />
            <Route path="/characters/:id/edit" element={<CharacterCreate />} />
          </Routes>
        </GameProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
