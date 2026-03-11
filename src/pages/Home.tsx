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
  const [campaigns, setCampaigns] = useState<Array<{ roomId: string; name: string; createdAt: number }>>([]);
  const [partyMembers, setPartyMembers] = useState<Record<string, Array<{ display_name: string; avatar_url: string | null; role: string }>>>({});

  // Fetch saved campaigns on mount
  useEffect(() => {
    fetch('/api/campaigns')
      .then((r) => (r.ok ? (r.json() as Promise<{ campaigns?: Array<{ roomId: string; name: string; createdAt: number }> }>) : null))
      .then((data) => {
        if (data?.campaigns?.length) setCampaigns(data.campaigns);
      })
      .catch(() => {});
  }, []);

  // Fetch party members for all campaigns
  useEffect(() => {
    if (campaigns.length === 0) return;
    campaigns.forEach((c) => {
      fetch(`/api/party/${encodeURIComponent(c.roomId)}`, { credentials: 'include' })
        .then((r) => (r.ok ? (r.json() as Promise<{ members?: Array<{ display_name: string; avatar_url: string | null; role: string }> }>) : null))
        .then((data) => {
          if (data?.members?.length) {
            setPartyMembers((prev) => ({ ...prev, [c.roomId]: data.members! }));
          }
        })
        .catch(() => {});
    });
  }, [campaigns]);

  const handleDeleteCampaign = (roomId: string, name: string) => {
    fetch(`/api/campaigns/${encodeURIComponent(roomId)}`, { method: 'DELETE' }).catch(() => {});
    setCampaigns((prev) => prev.filter((c) => c.roomId !== roomId));
    // Clean up localStorage too
    try {
      localStorage.removeItem(`adventure:dm-history:${roomId}`);
      localStorage.removeItem(`adventure:scene:${roomId}`);
    } catch {
      /* ok */
    }
    toast(`${name} deleted`, 'info');
  };

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

  // Extract room ID from a full URL or plain code
  const parseRoomCode = (input: string): string => {
    const trimmed = input.trim();
    try {
      const url = new URL(trimmed);
      // Match /lobby/XXXX or /game/XXXX
      const match = url.pathname.match(/^\/(lobby|game)\/(.+)$/);
      if (match) return match[2];
    } catch {
      // Not a URL — treat as plain room code
    }
    // Also handle partial paths like /lobby/abc123
    const pathMatch = trimmed.match(/^\/(lobby|game)\/(.+)$/);
    if (pathMatch) return pathMatch[2];
    return trimmed;
  };

  const handleJoinCampaign = () => {
    if (!campaignCode.trim()) {
      toast('Enter a campaign code first', 'warning');
      return;
    }
    const roomId = parseRoomCode(campaignCode);
    if (!roomId) {
      toast('Could not parse a room code from that input', 'warning');
      return;
    }
    toast(`Joining campaign: ${roomId}`, 'info');
    navigate(`/lobby/${roomId}`);
  };

  const handleCreateCampaign = () => {
    const roomId = crypto.randomUUID().slice(0, 8);
    toast(`Created campaign: ${roomId}`, 'success');
    navigate(`/lobby/${roomId}`);
  };

  const handleDiscordLogin = () => {
    window.location.href = '/api/auth/discord';
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleSignOut = () => {
    document.cookie = 'adventure_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setUser(null);
    setShowDropdown(false);
    toast('Signed out', 'info');
  };

  // Google: picture is a full URL. Discord: avatar is a hash, construct CDN URL.
  const avatarUrl = user?.picture || (user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png');

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
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5865F2] text-white shadow border-2 border-[#5865F2] focus:outline-none focus:ring-2 focus:ring-[#5865F2] transition cursor-pointer hover:bg-[#6a76fa] hover:shadow-md hover:border-white active:bg-[#4752c4] active:scale-95" onClick={handleDiscordLogin} title="Sign in with Discord">
                <FontAwesomeIcon icon={faDiscord} className="text-2xl" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-700 shadow border-2 border-white focus:outline-none focus:ring-2 focus:ring-white/50 transition cursor-pointer hover:bg-slate-100 hover:shadow-md active:bg-slate-200 active:scale-95" onClick={handleGoogleLogin} title="Sign in with Google">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </button>
            </div>
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
                <input type="text" placeholder="Room code or invite link" className="w-full px-3 py-2 border-2 border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#F38020] focus:border-[#F38020] transition-all outline-none" value={campaignCode} onChange={(e) => setCampaignCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleJoinCampaign()} />
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

          {/* Saved Campaigns */}
          {campaigns.length > 0 && (
            <Card className="w-full shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl transition-shadow">
              <CardContent className="p-8 space-y-4">
                <h2 className="text-xl font-semibold text-[#F38020]">Your Campaigns</h2>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {campaigns.map((c) => (
                    <div key={c.roomId} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="w-9 h-9 rounded-lg bg-amber-900/30 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-500">
                          <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1 cursor-pointer" onClick={() => navigate(`/game/${c.roomId}`)}>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white truncate hover:text-[#F38020] transition-colors">{c.name}</div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-500 dark:text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                          {/* Party member avatars */}
                          {partyMembers[c.roomId] && partyMembers[c.roomId].length > 0 && (
                            <div className="flex -space-x-1.5 ml-1">
                              {partyMembers[c.roomId].slice(0, 5).map((m, i) =>
                                m.avatar_url ? (
                                  <img key={i} src={m.avatar_url} alt={m.display_name} title={`${m.display_name}${m.role === 'dm' ? ' (DM)' : ''}`} className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600" />
                                ) : (
                                  <div key={i} title={`${m.display_name}${m.role === 'dm' ? ' (DM)' : ''}`} className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 bg-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-300">
                                    {m.display_name.charAt(0).toUpperCase()}
                                  </div>
                                )
                              )}
                              {partyMembers[c.roomId].length > 5 && <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 bg-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-400">+{partyMembers[c.roomId].length - 5}</div>}
                            </div>
                          )}
                        </div>
                      </div>
                      <button onClick={() => navigate(`/lobby/${c.roomId}`)} className="text-xs text-sky-400 hover:text-sky-300 shrink-0" title="Open lobby">
                        Lobby
                      </button>
                      <button onClick={() => navigate(`/game/${c.roomId}`)} className="text-xs text-amber-500 hover:text-amber-300 shrink-0" title="Resume game">
                        Play
                      </button>
                      <button onClick={() => handleDeleteCampaign(c.roomId, c.name)} className="text-xs text-red-400 hover:text-red-300 shrink-0" title="Delete campaign">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Characters */}
          <Card className="w-full shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl transition-shadow">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-xl font-semibold text-[#F38020]">Characters</h2>
              {characters.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {characters.map((c) => (
                    <div key={c.id} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {/* Portrait thumbnail — illustrated art fallback */}
                      <img
                        src={c.portrait || `/portraits/classes/${c.class.toLowerCase()}.webp`}
                        alt=""
                        className="w-9 h-9 rounded-lg object-cover shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `/portraits/races/${c.race.toLowerCase()}.webp`;
                        }}
                      />
                      <div className="min-w-0 flex-1 cursor-pointer" onClick={() => navigate(`/characters/${c.id}/edit`)}>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white truncate hover:text-[#F38020] transition-colors">{c.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Lv{c.level} {c.race} {c.class}
                        </div>
                      </div>
                      <button onClick={() => navigate(`/characters/${c.id}/edit`)} className="text-xs text-amber-500 hover:text-amber-300 ml-1 shrink-0" title="Edit character">
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          removeCharacter(c.id);
                          toast(`${c.name} deleted`, 'info');
                        }}
                        className="text-xs text-red-400 hover:text-red-300 ml-1 shrink-0"
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
