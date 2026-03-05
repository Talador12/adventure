import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui/toast';
import { Button } from '../components/ui/button';

export default function Lobby() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const room = roomId || 'default';
  const roomLink = `${window.location.origin}/lobby/${room}`;

  const copyLink = () => {
    navigator.clipboard.writeText(roomLink).then(() => toast('Link copied!', 'success'));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-slate-400 hover:text-white">
            &larr; Home
          </Button>
          <h1 className="text-lg font-bold text-[#F38020]">Lobby</h1>
          <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">Room: {room}</span>
        </div>
        <Button variant="ghost" onClick={() => navigate(`/game/${room}`)} className="text-[#F38020] hover:text-white">
          Start Game &rarr;
        </Button>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <h2 className="text-lg font-semibold">Players</h2>
          <div className="text-slate-500 text-sm">
            <p>Waiting for players to join...</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-slate-600">Invite link:</span>
              <code className="text-xs bg-slate-800 px-2 py-1 rounded text-[#F38020] select-all truncate max-w-xs">{roomLink}</code>
              <button onClick={copyLink} className="text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 transition-colors shrink-0">
                Copy
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
