import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import type { Character } from '../../contexts/GameContext';

interface CharacterPickerProps {
  characters: Character[];
  room: string;
  onSelect: (character: Character) => void;
}

export default function CharacterPicker({ characters, room, onSelect }: CharacterPickerProps) {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 page-enter">
      <header className="bg-slate-900/90 border-b border-slate-800/80 px-4 sm:px-6 py-3 flex items-center gap-4 shrink-0 backdrop-blur-sm">
        <Button variant="ghost" onClick={() => navigate(`/lobby/${room}`)} className="text-slate-400 hover:text-white transition-colors">
          &larr; Lobby
        </Button>
        <h1 className="text-lg font-bold text-[#F38020]">Choose Your Character</h1>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-2xl w-full space-y-6 animate-fade-in-up">
          {characters.length === 0 ? (
            <div className="text-center space-y-4">
              <div className="text-6xl opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 mx-auto text-slate-600">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-400">No Characters Yet</h2>
              <p className="text-slate-500">Create a character before entering the game.</p>
              <Button onClick={() => navigate('/characters/new')} className="bg-gradient-to-r from-[#F38020] to-[#e06a10] hover:from-[#ff8c2e] hover:to-[#f38020] text-white px-6 py-3 text-lg font-bold rounded-xl shadow-lg transition-all active:scale-[0.97]">
                Create Character
              </Button>
            </div>
          ) : (
            <>
              <p className="text-center text-slate-500">Select a character to enter the adventure</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-children">
                {characters.map((char) => (
                  <button key={char.id} onClick={() => onSelect(char)} className="game-card flex items-center gap-4 p-4 rounded-xl border border-slate-700/50 bg-slate-900/80 hover:border-[#F38020]/50 hover:bg-[#F38020]/5 transition-all text-left group backdrop-blur-sm animate-card-reveal">
                    {/* Portrait */}
                    <img
                      src={char.portrait || `/portraits/classes/${char.class.toLowerCase()}.webp`}
                      alt={char.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-600/50 shrink-0 shadow-md transition-transform group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).src = `/portraits/races/${char.race.toLowerCase()}.webp`; }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-lg font-bold text-white group-hover:text-[#F38020] transition-colors truncate">{char.name}</div>
                      <div className="text-sm text-slate-400">Level {char.level} {char.race} {char.class}</div>
                      <div className="flex gap-3 mt-1.5">
                        <span className="text-xs text-red-400">HP {char.hp}/{char.maxHp}</span>
                        <span className="text-xs text-sky-400">AC {char.ac}</span>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-600 group-hover:text-[#F38020] transition-colors shrink-0">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                ))}
              </div>
              <div className="text-center pt-2">
                <button onClick={() => navigate('/characters/new')} className="text-sm text-slate-500 hover:text-[#F38020] transition-colors">
                  + Create New Character
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
