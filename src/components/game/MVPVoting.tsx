// MVPVoting — end-of-session player vote for best moment/player.
// DM triggers voting, each player picks their MVP, results shown to all.

import { useState, useCallback } from 'react';

interface MVPVotingProps {
  players: Array<{ id: string; name: string }>;
  currentPlayerId: string;
  onVote: (votedForId: string) => void;
  onClose: () => void;
  votes: Record<string, string>; // voterId -> votedForId
}

export default function MVPVoting({ players, currentPlayerId, onVote, onClose, votes }: MVPVotingProps) {
  const [hasVoted, setHasVoted] = useState(!!votes[currentPlayerId]);

  const handleVote = useCallback((targetId: string) => {
    if (hasVoted) return;
    onVote(targetId);
    setHasVoted(true);
  }, [hasVoted, onVote]);

  // Tally votes
  const tally = new Map<string, number>();
  for (const votedFor of Object.values(votes)) {
    tally.set(votedFor, (tally.get(votedFor) || 0) + 1);
  }
  const totalVotes = Object.keys(votes).length;
  const allVoted = totalVotes >= players.length;
  const winner = allVoted ? [...tally.entries()].sort((a, b) => b[1] - a[1])[0] : null;
  const winnerName = winner ? players.find((p) => p.id === winner[0])?.name : null;

  return (
    <div className="fixed inset-0 z-[9996] flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-5 shadow-2xl max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-sm font-bold text-amber-400 mb-3">
          {allVoted ? '🏆 Session MVP' : '🗳️ Vote for Session MVP'}
        </h3>

        {allVoted && winnerName ? (
          <div className="text-center py-4">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-lg font-black text-amber-300">{winnerName}</div>
            <div className="text-[10px] text-slate-500 mt-1">{winner![1]} vote{winner![1] > 1 ? 's' : ''}</div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[10px] text-slate-500 mb-2">Who played the best this session? ({totalVotes}/{players.length} voted)</p>
            {players.filter((p) => p.id !== currentPlayerId).map((player) => (
              <button
                key={player.id}
                onClick={() => handleVote(player.id)}
                disabled={hasVoted}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-all text-sm font-semibold ${
                  hasVoted && votes[currentPlayerId] === player.id
                    ? 'border-amber-500/50 bg-amber-900/30 text-amber-300'
                    : hasVoted
                    ? 'border-slate-700 bg-slate-800/50 text-slate-500 opacity-50'
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-amber-500/40 hover:text-amber-400'
                }`}
              >
                {player.name}
                {tally.has(player.id) && <span className="text-[9px] text-amber-500 ml-2">({tally.get(player.id)} vote{tally.get(player.id)! > 1 ? 's' : ''})</span>}
              </button>
            ))}
            {hasVoted && <p className="text-[9px] text-slate-600 text-center">Waiting for other players...</p>}
          </div>
        )}

        <button onClick={onClose} className="w-full mt-3 text-[10px] py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200">
          {allVoted ? 'Close' : 'Skip'}
        </button>
      </div>
    </div>
  );
}
