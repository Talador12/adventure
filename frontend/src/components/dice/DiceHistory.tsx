const DiceHistory = ({ rolls }: { rolls: number[] }) => (
  <div className="mt-4 w-full rounded-lg bg-stone-800 p-4 text-center shadow-inner">
    <h3 className="font-display text-xl">Recent Rolls</h3>
    <ul className="mt-2 flex justify-center gap-4">
      {rolls.map((roll, idx) => (
        <li key={idx} className="rounded bg-stone-700 px-3 py-1 shadow">
          🎲 {roll}
        </li>
      ))}
    </ul>
  </div>
);

export default DiceHistory;
