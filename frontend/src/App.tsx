import { Routes, Route } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Sidebar from './components/layout/Sidebar';
import Lobby from './pages/Lobby';
import Game from './pages/Game';

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-stone-900 font-body text-white">
      <TopBar />

      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
