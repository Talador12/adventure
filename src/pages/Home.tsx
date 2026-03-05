import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from '../components/ui/toast';
import { useGame } from '../contexts/GameContext';
import { Sun, Moon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudflare, faDiscord } from '@fortawesome/free-brands-svg-icons';

type Theme = 'dark' | 'light';

function getSystemTheme(): Theme {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    if (localStorage.theme === 'dark') return 'dark';
    if (localStorage.theme === 'light') return 'light';
    return getSystemTheme();
  }
  return 'light';
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [campaignCode, setCampaignCode] = useState('');
  const [user, setUser] = useState<Record<string, string> | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { characters, removeCharacter } = useGame();

  // Apply theme class
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.theme = theme;
  }, [theme]);

  // Fetch user session once on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        const d = data as { user?: Record<string, string> };
        if (d.user) setUser(d.user);
      })
      .catch(() => {}); // silently fail if backend not running
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const handleJoinCampaign = () => {
    if (!campaignCode.trim()) {
      toast('Enter a campaign code first', 'warning');
      return;
    }
    toast(`Joining campaign: ${campaignCode}`, 'info');
    navigate(`/lobby/${campaignCode.trim()}`);
  };

  const handleCreateCampaign = () => {
    const roomId = crypto.randomUUID().slice(0, 8);
    toast(`Created campaign: ${roomId}`, 'success');
    navigate(`/lobby/${roomId}`);
  };

  const handleDiscordLogin = () => {
    window.location.href = '/api/auth/discord';
  };

  const handleSignOut = () => {
    document.cookie = 'adventure_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setUser(null);
    setShowDropdown(false);
    toast('Signed out', 'info');
  };

  const avatarUrl = user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-[#F38020] to-[#e06a10] shadow-lg py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight drop-shadow text-white">Adventure</h1>
        <div className="flex gap-3 items-center">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-white/10 text-white">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Discord Auth / Profile Dropdown */}
          {user ? (
            <div ref={dropdownRef} className="relative">
              <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow focus:outline-none focus:ring-2 focus:ring-white/50 transition hover:ring-2 hover:ring-white/50" onClick={() => setShowDropdown(!showDropdown)} title={user.username}>
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl overflow-hidden z-50 animate-[slideIn_0.15s_ease-out]">
                  <div className="px-4 py-3 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                      <img src={avatarUrl} className="w-10 h-10 rounded-full" alt="" />
                      <div>
                        <div className="text-sm font-semibold text-white">{user.global_name || user.username}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <FontAwesomeIcon icon={faDiscord} className="text-[#5865F2]" />
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <button onClick={toggleTheme} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2">
                      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700/50">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5865F2] text-white shadow border-2 border-[#5865F2] focus:outline-none focus:ring-2 focus:ring-[#5865F2] transition cursor-pointer hover:bg-[#6a76fa] hover:shadow-md hover:border-white active:bg-[#4752c4] active:scale-95" onClick={handleDiscordLogin} title="Sign in with Discord">
              <FontAwesomeIcon icon={faDiscord} className="text-2xl" />
            </button>
          )}

          <a href="https://github.com/talador12/adventure" target="_blank" rel="noreferrer" className="text-sm underline text-white/80 hover:text-white font-medium hidden sm:inline">
            GitHub
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 flex flex-col items-center gap-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {/* Join a Campaign */}
          <Card className="w-full shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl transition-shadow">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-xl font-semibold text-[#F38020]">Join a Campaign</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Enter campaign code" className="w-full px-3 py-2 border-2 border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#F38020] focus:border-[#F38020] transition-all outline-none" value={campaignCode} onChange={(e) => setCampaignCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleJoinCampaign()} />
                <Button variant="default" className="w-full bg-[#F38020] hover:bg-[#e06a10] text-white font-semibold py-2.5 rounded-md shadow hover:shadow-md transition-all active:scale-[0.98]" onClick={handleJoinCampaign}>
                  Join Campaign
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Start a New Campaign */}
          <Card className="w-full shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl transition-shadow">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-xl font-semibold text-[#F38020]">Start a New Campaign</h2>
              <Button variant="default" className="w-full bg-[#F38020] hover:bg-[#e06a10] text-white font-semibold py-2.5 rounded-md shadow hover:shadow-md transition-all active:scale-[0.98]" onClick={handleCreateCampaign}>
                Create Campaign
              </Button>
            </CardContent>
          </Card>

          {/* Characters */}
          <Card className="w-full shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl transition-shadow">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-xl font-semibold text-[#F38020]">Characters</h2>
              {characters.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {characters.map((c) => (
                    <div key={c.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{c.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Lv{c.level} {c.race} {c.class}</div>
                      </div>
                      <button
                        onClick={() => { removeCharacter(c.id); toast(`${c.name} deleted`, 'info'); }}
                        className="text-xs text-red-400 hover:text-red-300 ml-2 shrink-0"
                        title="Delete character"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">No characters yet. Create one to get started!</p>
              )}
              <Button variant="default" className="w-full bg-[#F38020] hover:bg-[#e06a10] text-white font-semibold py-2.5 rounded-md shadow hover:shadow-md transition-all active:scale-[0.98]" onClick={() => navigate('/characters/new')}>
                + New Character
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm mt-6 opacity-80 flex items-center gap-1">
          Built by{' '}
          <a href="https://github.com/Talador12" target="_blank" rel="noreferrer" className="underline hover:text-[#F38020]">
            Keith Adler (@talador12)
          </a>{' '}
          running on Cloudflare
          <FontAwesomeIcon icon={faCloudflare} style={{ color: '#F38020', fontSize: '1.2em' }} />
        </p>
      </main>
    </div>
  );
}
