import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from '../components/ui/toast';
import { useGame } from '../contexts/GameContext';
import { Sun, Moon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudflare, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

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
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const [publicCampaigns, setPublicCampaigns] = useState<Array<{ roomId: string; name: string; description?: string; dmName?: string; playerCount?: number }>>([]);
  const [partyMembers, setPartyMembers] = useState<Record<string, Array<{ display_name: string; avatar_url: string | null; role: string }>>>({});

  // Fetch saved campaigns + public campaigns on mount
  useEffect(() => {
    fetch('/api/campaigns')
      .then((r) => (r.ok ? (r.json() as Promise<{ campaigns?: Array<{ roomId: string; name: string; createdAt: number }> }>) : null))
      .then((data) => {
        if (data?.campaigns?.length) setCampaigns(data.campaigns);
      })
      .catch(() => {})
      .finally(() => setCampaignsLoading(false));
    fetch('/api/campaigns/public')
      .then((r) => (r.ok ? (r.json() as Promise<{ campaigns?: Array<{ roomId: string; name: string; description?: string; dmName?: string; playerCount?: number }> }>) : null))
      .then((data) => {
        if (data?.campaigns?.length) setPublicCampaigns(data.campaigns);
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
    if (!user) {
      toast('Sign in to create a campaign', 'warning');
      return;
    }
    const roomId = crypto.randomUUID().slice(0, 8);
    toast(`Created campaign: ${roomId}`, 'success');
    navigate(`/lobby/${roomId}`);
  };

  const handleCreateCharacter = () => {
    if (!user) {
      toast('Sign in to create a character', 'warning');
      return;
    }
    navigate('/characters/new');
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0c0f1a] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-[#F38020] via-[#e87818] to-[#d06010] shadow-lg shadow-orange-900/20 py-2 px-3 sm:px-6 flex justify-between items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.06)_50%,transparent_70%)] pointer-events-none" />
        <div className="flex items-baseline gap-2 relative z-10 min-w-0">
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight drop-shadow-md text-white shrink-0">Adventure</h1>
          <span className="text-[11px] text-white/50 font-medium hidden sm:inline">your table, your rules</span>
        </div>
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
              <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-[#5865F2] text-white shadow font-semibold text-sm transition cursor-pointer hover:bg-[#6a76fa] hover:shadow-md active:bg-[#4752c4] active:scale-[0.98]" onClick={handleDiscordLogin}>
                <FontAwesomeIcon icon={faDiscord} className="text-lg" />
                <span className="hidden sm:inline">Sign in</span>
              </button>
              <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-white text-slate-700 shadow font-semibold text-sm transition cursor-pointer hover:bg-slate-100 hover:shadow-md active:bg-slate-200 active:scale-[0.98]" onClick={handleGoogleLogin}>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="hidden sm:inline">Google</span>
              </button>
            </div>
          )}

          <a href="https://github.com/talador12/adventure" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors" title="GitHub">
            <FontAwesomeIcon icon={faGithub} className="text-xl" />
          </a>
        </div>
      </header>

      {/* Hero section */}
      <section className="w-full hero-gradient border-b border-slate-800/50 relative overflow-hidden">
        {/* Subtle radial glow behind hero text */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F38020]/[0.04] rounded-full blur-[100px]" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/[0.03] rounded-full blur-[80px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center text-center gap-4 sm:gap-5 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight animate-fade-in-up">
            <span className="text-white">Your table. </span><span className="text-shimmer text-[#F38020]">Your rules.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl animate-fade-in-up" style={{ animationDelay: '80ms' }}>
            An accessible D&D 5e tabletop in your browser. Play with friends, go solo, or just spectate.
            Every seat at the table is yours to fill however you want.
          </p>

          {/* Quick actions */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-2 justify-center w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '160ms' }}>
            <div className="flex gap-2 items-center w-full sm:w-auto">
              <input type="text" placeholder="Room code or invite link" className="input-glow flex-1 sm:flex-none px-4 py-2.5 sm:w-56 border-2 border-slate-700/80 rounded-lg bg-slate-800/80 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-[#F38020] focus:border-[#F38020] transition-all outline-none text-sm backdrop-blur-sm" value={campaignCode} onChange={(e) => setCampaignCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleJoinCampaign()} />
              <Button variant="default" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 px-5 rounded-lg shadow hover:shadow-lg transition-all active:scale-[0.97] shrink-0" onClick={handleJoinCampaign}>
                Join
              </Button>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="default" className="btn-glow flex-1 sm:flex-none bg-gradient-to-r from-[#F38020] to-[#e06a10] hover:from-[#ff8c2e] hover:to-[#f38020] text-white font-bold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.97]" onClick={handleCreateCampaign}>
                New Campaign
              </Button>
              <Button variant="default" className="flex-1 sm:flex-none bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-2.5 px-5 rounded-lg shadow hover:shadow-lg transition-all active:scale-[0.97]" onClick={handleCreateCharacter}>
                Create Character
              </Button>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 text-center w-full max-w-4xl stagger-children">
            {[
              { icon: '👥', label: 'Any Party Size', desc: 'Solo, co-op, full table, or spectate — humans and AI in any seat' },
              { icon: '⚔️', label: 'Full 5e Combat', desc: 'Initiative, AoE spells, saving throws, death saves, opportunity attacks' },
              { icon: '🗺️', label: 'Tactical Maps', desc: 'Fog of war, terrain, pathfinding, traps, animated tokens' },
              { icon: '🎲', label: 'Live Dice', desc: 'Server-authoritative rolls synced across all players in real-time' },
              { icon: '✨', label: 'Just Works', desc: 'No plugins, no install, no PDF imports — open a browser and play in minutes' },
              { icon: '🎭', label: 'Every Seat, Your Call', desc: 'Human or AI for any seat — DM, players, spectators. Or no AI at all' },
            ].map((f) => (
              <div key={f.label} className="feature-card p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 backdrop-blur-sm animate-card-reveal">
                <div className="text-2xl mb-1 animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>{f.icon}</div>
                <div className="text-sm font-semibold text-white">{f.label}</div>
                <div className="text-[11px] text-slate-400">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 py-6 max-w-6xl mx-auto w-full space-y-6 page-enter">

        {/* Public campaign browser — only show if there are public games */}
        {publicCampaigns.length > 0 && (
          <div className="space-y-3 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-slate-400">Public Games</h2>
            <div className="flex gap-3 overflow-x-auto pb-1 stagger-children">
              {publicCampaigns.filter((pc) => !campaigns.some((c) => c.roomId === pc.roomId)).slice(0, 8).map((pc) => (
                <div key={pc.roomId} className="game-card shrink-0 w-56 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 shadow hover:shadow-lg overflow-hidden animate-card-reveal backdrop-blur-sm">
                  <div className="px-3 pt-3 pb-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{pc.name}</h3>
                    {pc.description && <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{pc.description}</p>}
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                      {pc.dmName && <span className="text-amber-500">DM: {pc.dmName}</span>}
                      {typeof pc.playerCount === 'number' && <span>{pc.playerCount} player{pc.playerCount !== 1 ? 's' : ''}</span>}
                    </div>
                  </div>
                  <div className="flex border-t border-slate-200 dark:border-slate-700/50">
                    <button onClick={() => navigate(`/lobby/${pc.roomId}`)} className="flex-1 py-2 text-xs font-semibold text-sky-400 hover:bg-sky-500/10 transition-colors text-center border-r border-slate-200 dark:border-slate-700/50">
                      Join
                    </button>
                    <button onClick={() => navigate(`/lobby/${pc.roomId}?spectate=1`)} className="flex-1 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-500/10 transition-colors text-center">
                      Spectate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2-column layout on desktop — items-stretch forces equal height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

        {/* Campaigns column */}
        <div className="flex flex-col gap-4 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-[#F38020] to-amber-400 bg-clip-text text-transparent">Your Campaigns</h2>
            <Button variant="default" className="bg-gradient-to-r from-[#F38020] to-[#e06a10] hover:from-[#ff8c2e] hover:to-[#f38020] text-white font-semibold py-2 px-5 rounded-lg shadow hover:shadow-lg text-sm transition-all active:scale-[0.97]" onClick={handleCreateCampaign}>
              + New Campaign
            </Button>
          </div>
          {campaignsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 stagger-children">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-xl bg-slate-900/80 border border-slate-700/50 overflow-hidden animate-card-reveal">
                  <div className="p-4 space-y-3">
                    <div className="skeleton skeleton-text w-3/4 h-3.5" />
                    <div className="skeleton skeleton-text w-1/2 h-2.5" />
                    <div className="flex gap-1.5 mt-2">
                      {[1, 2, 3].map((j) => <div key={j} className="skeleton skeleton-circle w-7 h-7" />)}
                    </div>
                  </div>
                  <div className="flex border-t border-slate-700/50 h-10">
                    <div className="flex-1 border-r border-slate-700/50" />
                    <div className="flex-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : campaigns.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 stagger-children">
              {campaigns.map((c) => {
                const members = partyMembers[c.roomId] || [];
                const dmMember = members.find((m) => m.role === 'dm');
                const playerCount = members.filter((m) => m.role !== 'dm').length;
                return (
                  <div key={c.roomId} className="game-card rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 shadow-lg overflow-hidden animate-card-reveal backdrop-blur-sm">
                    {/* Campaign header */}
                    <div className="px-4 pt-4 pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{c.name}</h3>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                            <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                            {dmMember && <span className="text-amber-500">DM: {dmMember.display_name}</span>}
                            {playerCount > 0 && <span>{playerCount} player{playerCount !== 1 ? 's' : ''}</span>}
                          </div>
                        </div>
                        <button onClick={() => handleDeleteCampaign(c.roomId, c.name)} className="text-slate-500 hover:text-red-400 transition-colors p-1 -mt-1 -mr-1 hover:scale-110" title="Delete campaign">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 000 1.5h.3l.815 8.15A1.5 1.5 0 005.357 15h5.285a1.5 1.5 0 001.493-1.35l.815-8.15h.3a.75.75 0 000-1.5H11v-.75A2.25 2.25 0 008.75 1h-1.5A2.25 2.25 0 005 3.25zm2.25-.75a.75.75 0 00-.75.75V4h3v-.75a.75.75 0 00-.75-.75h-1.5z" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                      {/* Party member avatars */}
                      {members.length > 0 && (
                        <div className="flex -space-x-2 mt-2.5">
                          {members.slice(0, 6).map((m, i) =>
                            m.avatar_url ? (
                              <img key={i} src={m.avatar_url} alt={m.display_name} title={`${m.display_name}${m.role === 'dm' ? ' (DM)' : ''}`} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 transition-transform hover:scale-110 hover:z-10" />
                            ) : (
                              <div key={i} title={`${m.display_name}${m.role === 'dm' ? ' (DM)' : ''}`} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-300 transition-transform hover:scale-110 hover:z-10">
                                {m.display_name.charAt(0).toUpperCase()}
                              </div>
                            )
                          )}
                          {members.length > 6 && <div className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-400">+{members.length - 6}</div>}
                        </div>
                      )}
                    </div>
                    {/* Action buttons */}
                    <div className="flex border-t border-slate-200 dark:border-slate-700/50">
                      <button onClick={() => navigate(`/lobby/${c.roomId}`)} className="flex-1 py-2.5 text-xs font-semibold text-sky-400 hover:bg-sky-500/10 hover:text-sky-300 transition-all text-center border-r border-slate-200 dark:border-slate-700/50">
                        Lobby
                      </button>
                      <button onClick={() => navigate(`/game/${c.roomId}`)} className="flex-1 py-2.5 text-xs font-semibold text-amber-500 hover:bg-amber-500/10 hover:text-amber-400 transition-all text-center">
                        Play
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 p-8 text-center backdrop-blur-sm">
              <p className="text-sm text-slate-500 dark:text-slate-400">{user ? 'No campaigns yet. Create one to get started, or join with a room code above.' : 'Sign in to create and manage campaigns.'}</p>
            </div>
          )}
        </div>

        {/* Characters column */}
        <div className="flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Your Characters</h2>
            <Button variant="default" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-2 px-5 rounded-lg shadow hover:shadow-lg text-sm transition-all active:scale-[0.97]" onClick={handleCreateCharacter}>
              + New Character
            </Button>
          </div>
          {characters.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 stagger-children">
              {characters.map((c) => {
                const hpPct = c.maxHp > 0 ? Math.max(0, Math.min(100, (c.hp / c.maxHp) * 100)) : 100;
                const hpColor = hpPct <= 25 ? 'bg-red-500' : hpPct <= 50 ? 'bg-yellow-500' : 'bg-green-500';
                const strMod = Math.floor((c.stats.STR - 10) / 2);
                const dexMod = Math.floor((c.stats.DEX - 10) / 2);
                const conMod = Math.floor((c.stats.CON - 10) / 2);
                const intMod = Math.floor((c.stats.INT - 10) / 2);
                const wisMod = Math.floor((c.stats.WIS - 10) / 2);
                const chaMod = Math.floor((c.stats.CHA - 10) / 2);
                const fmtMod = (v: number) => v >= 0 ? `+${v}` : `${v}`;
                return (
                  <div key={c.id} className="game-card rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 shadow-lg overflow-hidden animate-card-reveal backdrop-blur-sm">
                    <div className="flex gap-3 p-4">
                      {/* Portrait */}
                      <img
                        src={c.portrait || `/portraits/classes/${c.class.toLowerCase()}.webp`}
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-600/50 shadow-md transition-transform hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).src = `/portraits/races/${c.race.toLowerCase()}.webp`; }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{c.name}</h3>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">Lv{c.level} {c.race} {c.class}</div>
                          </div>
                          <button
                            onClick={() => { removeCharacter(c.id); toast(`${c.name} deleted`, 'info'); }}
                            className="text-slate-500 hover:text-red-400 transition-all p-1 -mt-1 -mr-1 hover:scale-110" title="Delete character"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 000 1.5h.3l.815 8.15A1.5 1.5 0 005.357 15h5.285a1.5 1.5 0 001.493-1.35l.815-8.15h.3a.75.75 0 000-1.5H11v-.75A2.25 2.25 0 008.75 1h-1.5A2.25 2.25 0 005 3.25zm2.25-.75a.75.75 0 00-.75.75V4h3v-.75a.75.75 0 00-.75-.75h-1.5z" clipRule="evenodd" /></svg>
                          </button>
                        </div>
                        {/* HP bar */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden hp-bar-shimmer">
                            <div className={`h-full rounded-full transition-all duration-500 ${hpColor}`} style={{ width: `${hpPct}%` }} />
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">{c.hp}/{c.maxHp}</span>
                        </div>
                        {/* Quick stats */}
                        <div className="flex items-center gap-2 mt-1.5 text-[9px] font-mono text-slate-500 dark:text-slate-400">
                          <span className="text-sky-400">AC {c.ac}</span>
                          <span className="text-amber-400">{c.gold}g</span>
                          {c.inventory.length > 0 && <span>{c.inventory.length} items</span>}
                        </div>
                      </div>
                    </div>
                    {/* Stat mods row */}
                    <div className="grid grid-cols-6 gap-0 border-t border-slate-200 dark:border-slate-700/50 text-center">
                      {([['STR', strMod], ['DEX', dexMod], ['CON', conMod], ['INT', intMod], ['WIS', wisMod], ['CHA', chaMod]] as [string, number][]).map(([stat, mod]) => (
                        <div key={stat} className="stat-badge py-1.5 border-r border-slate-200 dark:border-slate-700/50 last:border-r-0 cursor-default">
                          <div className="text-[8px] text-slate-400 uppercase">{stat}</div>
                          <div className={`text-[10px] font-bold ${mod > 0 ? 'text-green-400' : mod < 0 ? 'text-red-400' : 'text-slate-500'}`}>{fmtMod(mod)}</div>
                        </div>
                      ))}
                    </div>
                    {/* Action button */}
                    <div className="border-t border-slate-200 dark:border-slate-700/50">
                      <button onClick={() => navigate(`/characters/${c.id}/edit`)} className="w-full py-2.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all text-center">
                        Edit Character
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 p-8 text-center backdrop-blur-sm">
              {user ? (
                <>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">No characters yet. Create one to join a campaign!</p>
                  <Button variant="default" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-2 px-5 rounded-lg shadow hover:shadow-lg text-sm transition-all active:scale-[0.97]" onClick={handleCreateCharacter}>
                    Create Your First Character
                  </Button>
                </>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to create and manage characters.</p>
              )}
            </div>
          )}
        </div>

        </div>{/* end 2-column grid */}

        <p className="text-slate-500 dark:text-slate-500 text-sm mt-8 mb-2 flex items-center gap-1.5 justify-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          Built by{' '}
          <a href="https://github.com/Talador12" target="_blank" rel="noreferrer" className="underline decoration-slate-600 hover:decoration-[#F38020] hover:text-[#F38020] transition-all">
            Keith Adler
          </a>{' '}
          on
          <FontAwesomeIcon icon={faCloudflare} className="text-[#F38020] transition-transform hover:scale-110" style={{ fontSize: '1.2em' }} />
        </p>
      </main>
    </div>
  );
}
