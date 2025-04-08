import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="w-64 bg-parchment p-4">
    <h2 className="text-3xl font-display">Adventure</h2>
    <nav className="mt-6">
      <ul>
        <li>
          <Link to="/" className="block py-2">Lobby</Link>
        </li>
        <li>
          <Link to="/game" className="block py-2">Game</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
