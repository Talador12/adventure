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
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">Adventure</h1>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <a href="https://github.com/talador12/adventure" target="_blank" rel="noreferrer" className="text-sm underline">
            GitHub • Keith Adler
          </a>
        </div>
      </header>

      <main className="p-6 flex flex-col items-center gap-6 max-w-2xl mx-auto">
        <Card className="w-full">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Join a Campaign</h2>
            <input type="text" placeholder="Enter campaign code or link" className="w-full px-3 py-2 border rounded" />
            <Button className="w-full">Join Campaign</Button>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Start a New Campaign</h2>
            <Button className="w-full">Create Campaign</Button>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Characters</h2>
            <Button variant="secondary" className="w-full">
              Manage My Characters
            </Button>
          </CardContent>
        </Card>

        <p className="text-muted-foreground text-sm mt-6">Built by Keith Adler (@talador12) using Cloudflare ⚡</p>
      </main>
    </div>
  );
}
