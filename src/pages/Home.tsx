import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Sun, Moon } from 'lucide-react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-foreground transition-colors">
      <header className="w-full bg-gradient-to-r from-accent to-cloudflare shadow-lg py-6 px-8 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight drop-shadow text-white">Adventure</h1>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hover:bg-white/10">
            {darkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
          </Button>
          <a href="https://github.com/talador12/adventure" target="_blank" rel="noreferrer" className="text-sm underline text-white/80 hover:text-white font-medium">
            GitHub • Keith Adler
          </a>
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center gap-8 max-w-2xl mx-auto w-full">
        <Card className="w-full shadow-xl border-none bg-white/5 dark:bg-white/10">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-xl font-semibold text-accent">Join a Campaign</h2>
            <input type="text" placeholder="Enter campaign code or link" className="w-full px-3 py-2 border border-accent/30 rounded bg-gray-900/80 text-foreground focus:outline-accent" />
            <Button className="w-full bg-accent text-white font-semibold hover:bg-accent/80">Join Campaign</Button>
          </CardContent>
        </Card>

        <Card className="w-full shadow-xl border-none bg-white/5 dark:bg-white/10">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-xl font-semibold text-cloudflare">Start a New Campaign</h2>
            <Button className="w-full bg-cloudflare text-white font-semibold hover:bg-cloudflare/80">Create Campaign</Button>
          </CardContent>
        </Card>

        <Card className="w-full shadow-xl border-none bg-white/5 dark:bg-white/10">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-xl font-semibold">Characters</h2>
            <Button variant="secondary" className="w-full">
              Manage My Characters
            </Button>
          </CardContent>
        </Card>

        <p className="text-muted-foreground text-sm mt-6 opacity-80">Built by Keith Adler (@talador12) using Cloudflare ⚡</p>
      </main>
    </div>
  );
}
