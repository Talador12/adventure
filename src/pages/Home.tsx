import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Sun, Moon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudflare } from '@fortawesome/free-brands-svg-icons';

function getSystemTheme() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

function getInitialTheme() {
  if (typeof window !== 'undefined') {
    if (localStorage.theme === 'dark') return 'dark';
    if (localStorage.theme === 'light') return 'light';
    return getSystemTheme();
  }
  return 'light';
}

export default function Home() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.theme = theme;
    console.log('Theme set to:', theme, 'HTML classes:', document.documentElement.className);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <header className="w-full bg-gradient-to-r from-accent to-cloudflare shadow-lg py-6 px-8 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight drop-shadow text-white">Adventure</h1>
        <div className="flex gap-4 items-center">
          {/* <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-white/10">
            {theme === 'dark' ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
          </Button> */}
          <a href="https://github.com/talador12/adventure" target="_blank" rel="noreferrer" className="text-sm underline text-white/80 hover:text-white font-medium">
            GitHub • Keith Adler
          </a>
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center gap-8 max-w-2xl mx-auto w-full">
        <Card className="w-full shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-xl font-semibold text-accent">Join a Campaign</h2>
            <input type="text" placeholder="Enter campaign code or link" className="w-full px-3 py-2 border border-accent/30 rounded bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-accent" />
            <Button className="w-full bg-accent text-white font-semibold hover:bg-accent/80">Join Campaign</Button>
          </CardContent>
        </Card>

        <Card className="w-full shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-xl font-semibold text-cloudflare">Start a New Campaign</h2>
            <Button className="w-full bg-cloudflare text-white font-semibold hover:bg-cloudflare/80">Create Campaign</Button>
          </CardContent>
        </Card>

        <Card className="w-full shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-xl font-semibold">Characters</h2>
            <Button variant="secondary" className="w-full">
              Manage My Characters
            </Button>
          </CardContent>
        </Card>

        <p className="text-slate-500 dark:text-slate-400 text-sm mt-6 opacity-80 flex items-center gap-1">
          Built by Keith Adler (@talador12) using Cloudflare
          <FontAwesomeIcon icon={faCloudflare} style={{ color: '#F38020', fontSize: '1.2em' }} />
        </p>

        {/* <div className="h-32 w-32 bg-red-500 dark:bg-blue-900 border-4 border-red-500 dark:border-green-500"></div> */}
      </main>
    </div>
  );
}
