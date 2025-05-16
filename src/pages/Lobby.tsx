import DiceRoller from '../components/dice/DiceRoller';

const Lobby = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-center font-display text-5xl text-mana">🎲 Welcome to your next Adventure!</h1>

      <section className="w-full max-w-md rounded-2xl border border-stone-700 bg-stone-800 p-6 shadow-xl">
        <DiceRoller />
      </section>
    </div>
  );
};

export default Lobby;
