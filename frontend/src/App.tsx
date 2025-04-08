import { Routes, Route } from "react-router-dom";
import TopBar from "./components/layout/TopBar";
import Sidebar from "./components/layout/Sidebar";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-stone-900 text-white font-body">
      <TopBar />

      <div className="flex flex-1 min-h-0">
        <Sidebar />

        <main className="flex-1 px-6 py-8 overflow-y-auto">
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
