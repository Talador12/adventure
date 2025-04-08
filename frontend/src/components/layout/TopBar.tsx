import React from "react";

const TopBar = () => {
  return (
    <div className="bg-mana text-white px-4 py-2 shadow-lg flex justify-between items-center">
      <h1 className="font-display text-2xl">Adventure</h1>
      <div className="text-sm opacity-80">Session ID: #1234</div>
    </div>
  );
};

export default TopBar;
