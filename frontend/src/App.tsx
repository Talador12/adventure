import React from "react";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";

// No need for <Router> or <BrowserRouter> here anymore
const App = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <TopBar />
      <div className="p-4 flex-1">
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default App;
