import InitiativeBar from '../components/combat/InitiativeBar';

const Game = () => {
  const entries = [
    { name: 'Warrior', hp: 50, isCurrentTurn: true },
    { name: 'Mage', hp: 30, isCurrentTurn: false },
    { name: 'Rogue', hp: 40, isCurrentTurn: false },
  ];

  return (
    <div>
      <h1 className="mb-4 text-4xl">Game Page</h1>
      <InitiativeBar entries={entries} />
    </div>
  );
};

export default Game;
