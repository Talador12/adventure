const Sidebar = () => {
  return (
    <aside className="w-64 bg-stone-800 p-4 text-parchment">
      <nav className="space-y-4">
        <div className="font-display text-xl">🗺️ Map</div>
        <div className="font-display text-xl">📜 Quests</div>
        <div className="font-display text-xl">🎒 Inventory</div>
      </nav>
    </aside>
  );
};

export default Sidebar;
