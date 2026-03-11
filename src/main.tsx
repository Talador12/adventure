import React, { Component, Suspense } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ToastProvider } from './components/ui/toast';
import { GameProvider } from './contexts/GameContext';
import Home from './pages/Home'; // Home is the landing page — keep eagerly loaded
import './styles.css';

// Lazy-load heavy pages — Game (3266 lines), CharacterCreate (1838 lines), Lobby (897 lines)
const Game = React.lazy(() => import('./pages/Game'));
const Lobby = React.lazy(() => import('./pages/Lobby'));
const CharacterCreate = React.lazy(() => import('./pages/CharacterCreate'));

// Minimal loading fallback — matches the app's dark theme
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0c0f1a]">
      <div className="flex flex-col items-center gap-3 animate-fade-in-up">
        <div className="w-8 h-8 border-2 border-[#F38020] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-slate-400">Loading...</span>
      </div>
    </div>
  );
}

// Error boundary — catches lazy-load chunk failures and render errors
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[adventure] ErrorBoundary caught:', error, info.componentStack);
  }
  render() {
    if (this.state.error) {
      return <ErrorFallback error={this.state.error} onReset={() => this.setState({ error: null })} />;
    }
    return this.props.children;
  }
}

function ErrorFallback({ error, onReset }: { error: Error; onReset: () => void }) {
  const isChunkError = error.message.includes('Failed to fetch dynamically imported module') || error.message.includes('Loading chunk');
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0f1a] text-slate-100">
      <div className="flex flex-col items-center gap-4 max-w-md text-center px-6 page-enter">
        <div className="text-4xl">{isChunkError ? '\u26A0\uFE0F' : '\u{1F480}'}</div>
        <h1 className="text-xl font-bold text-white">{isChunkError ? 'Connection Lost' : 'Something Went Wrong'}</h1>
        <p className="text-sm text-slate-400">
          {isChunkError
            ? 'A page failed to load — this usually means a new version was deployed. Refresh to get the latest.'
            : 'An unexpected error occurred. Try refreshing the page.'}
        </p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => { onReset(); window.location.reload(); }}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#F38020] to-[#e06a10] text-white font-semibold text-sm shadow hover:shadow-lg transition-all active:scale-[0.97]"
          >
            Refresh Page
          </button>
          <Link
            to="/"
            onClick={onReset}
            className="px-5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition-all"
          >
            Back to Home
          </Link>
        </div>
        <details className="mt-4 text-left w-full">
          <summary className="text-[10px] text-slate-600 cursor-pointer hover:text-slate-400">Error details</summary>
          <pre className="mt-2 text-[10px] text-red-400/70 bg-slate-900 p-3 rounded-lg overflow-x-auto border border-slate-800">{error.message}</pre>
        </details>
      </div>
    </div>
  );
}

// 404 page — catch-all for unmatched routes
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0f1a] text-slate-100">
      <div className="flex flex-col items-center gap-4 max-w-md text-center px-6 page-enter">
        <div className="text-6xl font-black text-slate-800">404</div>
        <h1 className="text-xl font-bold text-white">Page Not Found</h1>
        <p className="text-sm text-slate-400">This room doesn't exist, or maybe it was a mimic all along.</p>
        <div className="flex gap-3 mt-2">
          <button onClick={() => navigate('/')} className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#F38020] to-[#e06a10] text-white font-semibold text-sm shadow hover:shadow-lg transition-all active:scale-[0.97]">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <GameProvider>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/lobby/:roomId" element={<Lobby />} />
                <Route path="/game" element={<Game />} />
                <Route path="/game/:roomId" element={<Game />} />
                <Route path="/characters/new" element={<CharacterCreate />} />
                <Route path="/characters/:id/edit" element={<CharacterCreate />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </GameProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
