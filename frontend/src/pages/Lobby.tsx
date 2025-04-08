import DiceRoller from "../components/dice/DiceRoller";

const Lobby = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 p-6">
      <h1 className="text-5xl font-display text-mana text-center">
        🎲 Welcome to your next Adventure!
      </h1>

      <section className="w-full max-w-md bg-stone-800 rounded-2xl shadow-xl border border-stone-700 p-6">
        <DiceRoller />
      </section>
    </div>
  );
};

export default Lobby;
