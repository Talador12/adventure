import React from "react";
import { Link } from "react-router-dom";

const Lobby = () => (
  <div className="flex flex-col items-center justify-center">
    <h1 className="text-4xl mb-4">Game Lobby</h1>
    <Link to="/game" className="bg-mana text-white py-2 px-4 rounded-lg shadow-md">Start Game</Link>
  </div>
);

export default Lobby;
