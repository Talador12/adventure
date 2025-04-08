const DiceHistory = ({ rolls }: { rolls: number[] }) => (
  <div className="mt-4 bg-stone-800 p-4 rounded-lg shadow-inner w-full text-center">
    <h3 className="font-display text-xl">Recent Rolls</h3>
    <ul className="flex justify-center gap-4 mt-2">
      {rolls.map((roll, idx) => (
        <li key={idx} className="bg-stone-700 px-3 py-1 rounded shadow">
          🎲 {roll}
        </li>
      ))}
    </ul>
  </div>
);

export default DiceHistory;
