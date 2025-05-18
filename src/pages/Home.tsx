import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
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
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.theme = theme;
    // Fetch user info from /api/auth/me
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, [theme]);

  // Fetch dev secrets in local development only
  useEffect(() => {
    if (import.meta.env.DEV) {
      fetch('/api/dev-secrets')
        .then((res) => {
          if (!res.ok) throw new Error('Not allowed or not in dev mode');
          return res.json();
        })
        .then((secrets) => {
          // You can use these secrets as needed in your dev environment
          console.log('Dev secrets:', secrets);
          // Example: set them in state, context, or pass to child components
        })
        .catch((err) => {
          // Not available in prod or if not using dev/test secrets
          console.warn('Dev secrets endpoint not available:', err.message);
        });
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev: Theme) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleJoinCampaign = () => {
    if (!campaignCode.trim()) {
      alert('Please enter a campaign code');
      return;
    }
    // TODO: Implement join campaign logic
    console.log('Joining campaign:', campaignCode);
  };

  const handleCreateCampaign = () => {
    // TODO: Implement create campaign logic
    console.log('Creating new campaign');
  };

  const handleManageCharacters = () => {
    // TODO: Implement character management logic
    console.log('Opening character management');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const handleDiscordLogin = () => {
    window.location.href = '/api/auth/discord';
  };

  const handleSignOut = () => {
    // Clear cookie by expiring it
    document.cookie = 'adventure_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <header className="w-full bg-gradient-to-r from-accent to-cloudflare shadow-lg py-6 px-8 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight drop-shadow text-white">Adventure</h1>
        <div className="flex gap-4 items-center">
          {/* Discord Auth/Profile Button */}
          {user ? (
            <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow focus:outline-none focus:ring-2 focus:ring-accent" title={user.username || user.email} onClick={handleSignOut}>
              <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="Profile" className="w-full h-full object-cover" />
            </button>
          ) : (
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5865F2] text-white shadow border-2 border-[#5865F2] focus:outline-none focus:ring-2 focus:ring-[#5865F2] transition cursor-pointer hover:bg-[#6a76fa] hover:shadow-md hover:border-white active:bg-[#4752c4] active:scale-95 active:ring-4 active:ring-[#5865F2] active:ring-opacity-80" onClick={handleDiscordLogin} title="Sign in with Discord">
              <FontAwesomeIcon icon={faDiscord} className="text-2xl" />
            </button>
          )}
          {/* <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-white/10">
            {theme === 'dark' ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
          </Button> */}
          <a href="https://github.com/talador12/adventure" target="_blank" rel="noreferrer" className="text-sm underline text-white/80 hover:text-white font-medium focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1" aria-label="Visit project on GitHub">
            GitHub • Keith Adler
          </a>
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center gap-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <Card className="w-full shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl transition-shadow">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-xl font-semibold text-accent">Join a Campaign</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter campaign code or link"
                  className="w-full px-3 py-2 border-2 border-white/10 dark:border-white/10 rounded bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 ring-accent focus:ring-4 focus:ring-accent focus:border-accent transition-all hover:border-white/40 dark:hover:border-white/40"
                  value={campaignCode}
                  onChange={(e) => setCampaignCode(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleJoinCampaign)}
                  aria-label="Campaign code input"
                />
                <Button
                  variant="default"
                  className="w-full bg-accent/90 hover:bg-accent text-white font-semibold py-2.5 rounded-md shadow-sm hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 active:ring-4 active:ring-accent active:ring-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/20 hover:border-white/40 active:border-accent hover:scale-[1.02] active:scale-[0.98]"
                  onClick={handleJoinCampaign}
                  aria-label="Join campaign"
                >
                  Join Campaign
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl transition-shadow">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-xl font-semibold text-cloudflare">Start a New Campaign</h2>
              <Button
                variant="default"
                className="w-full bg-cloudflare/90 hover:bg-cloudflare text-white font-semibold py-2.5 rounded-md shadow-sm hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cloudflare/50 active:ring-4 active:ring-cloudflare active:ring-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/20 hover:border-white/40 active:border-cloudflare hover:scale-[1.02] active:scale-[0.98]"
                onClick={handleCreateCampaign}
                aria-label="Create new campaign"
              >
                Create Campaign
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl transition-shadow">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-xl font-semibold">Characters</h2>
              <Button
                variant="secondary"
                className="w-full bg-accent/90 hover:bg-accent text-white font-semibold py-2.5 rounded-md shadow-sm hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 active:ring-4 active:ring-accent active:ring-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/20 hover:border-white/40 active:border-accent hover:scale-[1.02] active:scale-[0.98]"
                onClick={handleManageCharacters}
                aria-label="Manage characters"
              >
                Manage My Characters
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm mt-6 opacity-80 flex items-center gap-1">
          Built by Keith Adler (@talador12) running on Cloudflare
          <FontAwesomeIcon icon={faCloudflare} style={{ color: '#F38020', fontSize: '1.2em' }} aria-hidden="true" />
        </p>

        {/* <div className="h-32 w-32 bg-red-500 dark:bg-blue-900 border-4 border-red-500 dark:border-green-500"></div> */}
      </main>
    </div>
  );
}
