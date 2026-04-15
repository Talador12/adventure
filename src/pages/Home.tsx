import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from '../components/ui/toast';
import { useGame } from '../contexts/GameContext';
import { useI18n, LOCALE_NAMES, type Locale } from '../lib/i18n';
import { THEMES, getStoredTheme, applyTheme, type ThemeId } from '../lib/themes';
import { Sun, Moon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CAMPAIGN_TEMPLATES } from '../data/campaignTemplates';
import { ALL_CAMPAIGNS, FULL_CAMPAIGNS, ONESHOT_CAMPAIGNS, filterCampaigns, getAvailableTones, type CampaignStarterKit, type CampaignTone } from '../campaigns/index';
import { faCloudflare, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { importJSONFile } from '../lib/export';
import { randomFantasyName } from '../lib/names';

type Theme = 'dark' | 'light';
type PreferencePayload = {
  theme?: Theme;
  activeTheme?: ThemeId;
  lowFx?: boolean;
  accentColor?: string;
  locale?: Locale;
  updatedAt?: number;
};
type PrefSyncState = 'idle' | 'syncing' | 'synced' | 'conflict' | 'offline';

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

function getInitialLowFx(): boolean {
  if (typeof window !== 'undefined') return localStorage.getItem('adventure:lowfx') === '1';
  return false;
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [activeTheme, setActiveTheme] = useState<ThemeId>(getStoredTheme);
  const [lowFx, setLowFx] = useState(getInitialLowFx);
  const [showInstall, setShowInstall] = useState(() => {
    try { return typeof window !== 'undefined' && 'BeforeInstallPromptEvent' in window; } catch { return false; }
  });
  // Re-check install availability after mount (prompt may arrive late)
  useEffect(() => {
    const check = () => import('../main').then(({ canInstallPWA }) => { if (canInstallPWA()) setShowInstall(true); });
    const timer = setTimeout(check, 2000);
    return () => clearTimeout(timer);
  }, []);
  const [accentColor, setAccentColor] = useState(() => {
    try { return localStorage.getItem('adventure:accent') || '#F38020'; } catch { return '#F38020'; }
  });
  const [campaignCode, setCampaignCode] = useState('');
  const [user, setUser] = useState<Record<string, string> | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCampaignWizard, setShowCampaignWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<'choose' | 'custom' | 'catalog'>('choose');
  const [customCampaignName, setCustomCampaignName] = useState('');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogType, setCatalogType] = useState<'all' | 'full' | 'oneshot'>('all');
  const [catalogTone, setCatalogTone] = useState<CampaignTone | 'all'>('all');
  const [catalogExpanded, setCatalogExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auto-launch shared template links (?template=id)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get('template');
    if (!templateId) return;
    const template = ALL_CAMPAIGNS.find((c) => c.id === templateId) || CAMPAIGN_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;
    window.history.replaceState({}, '', '/'); // clean URL
    const roomId = `${template.id}-${Date.now().toString(36)}`;
    try { localStorage.setItem(`adventure:template:${roomId}`, JSON.stringify(template)); } catch { /* ok */ }
    navigate(`/lobby/${roomId}`);
  }, [navigate]);
  const { locale: i18nLocale, setLocale: setI18nLocale, t } = useI18n();
  const { characters, removeCharacter, addCharacter } = useGame();

  // Pick 8 random full campaigns + 8 random one-shots for quick start (shuffled once per mount)
  const quickStartPicks = useMemo(() => {
    const shuffle = <T,>(arr: T[]): T[] => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      return a;
    };
    return [...shuffle(FULL_CAMPAIGNS).slice(0, 8), ...shuffle(ONESHOT_CAMPAIGNS).slice(0, 8)] as CampaignStarterKit[];
  }, []);

  const [campaigns, setCampaigns] = useState<Array<{ roomId: string; name: string; createdAt: number; archived?: boolean; archivedAt?: number }>>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const [campaignSearch, setCampaignSearch] = useState('');
  const [campaignSort, setCampaignSort] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [publicCampaigns, setPublicCampaigns] = useState<Array<{ roomId: string; name: string; description?: string; dmName?: string; playerCount?: number }>>([]);
  const [partyMembers, setPartyMembers] = useState<Record<string, Array<{ display_name: string; avatar_url: string | null; role: string }>>>({});
  const [prefSyncState, setPrefSyncState] = useState<PrefSyncState>('idle');
  const [lastPrefSyncAt, setLastPrefSyncAt] = useState<number | null>(null);
  const [prefSyncRetryNonce, setPrefSyncRetryNonce] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<{ roomId: string; name: string } | null>(null);
  const lastCampaignCacheKeyRef = useRef<string | null>(null);
  const prefsHydratedUserRef = useRef<string | null>(null);
  const prefsSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefsRetryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefsSyncBackoffMsRef = useRef(1000);
  const prefsNextSyncAtRef = useRef(0);
  const prefsUpdatedAtRef = useRef<number | null>(null);

  const applyServerPreferences = (p: PreferencePayload) => {
    if (p.theme === 'dark' || p.theme === 'light') setTheme(p.theme);
    if (typeof p.lowFx === 'boolean') setLowFx(p.lowFx);
    if (typeof p.accentColor === 'string') setAccentColor(p.accentColor);
    if (p.locale && LOCALE_NAMES[p.locale]) setI18nLocale(p.locale);
    if (p.activeTheme && THEMES.some((t) => t.id === p.activeTheme)) {
      setActiveTheme(p.activeTheme);
      applyTheme(p.activeTheme);
      const def = THEMES.find((t) => t.id === p.activeTheme);
      setTheme(def?.isDark ? 'dark' : 'light');
    }
    if (typeof p.updatedAt === 'number') {
      prefsUpdatedAtRef.current = p.updatedAt;
      setLastPrefSyncAt(p.updatedAt);
    }
  };

  // Fetch saved campaigns + public campaigns.
  // Campaign cache is user-scoped to avoid cross-account leakage on shared browsers.
  useEffect(() => {
    const storedTempUserId = (() => {
      try {
        const raw = localStorage.getItem('adventure:tempUser');
        const parsed = raw ? (JSON.parse(raw) as { id?: string }) : null;
        return parsed?.id || null;
      } catch {
        return null;
      }
    })();
    const effectiveUserId = user?.id || storedTempUserId || 'anon';
    if (lastCampaignCacheKeyRef.current === effectiveUserId) return;
    lastCampaignCacheKeyRef.current = effectiveUserId;

    const isTempLogin = !!effectiveUserId.startsWith('temp-');
    setCampaignsLoading(true);

    if (isTempLogin) {
      try {
        const raw = localStorage.getItem('adventure:campaigns');
        if (raw) {
          const list = JSON.parse(raw) as Array<{ roomId: string; name: string; createdAt: number }>;
          if (list.length) setCampaigns(list);
        }
      } catch { /* ok */ }
      setCampaignsLoading(false);
    } else {
      // Try IndexedDB cache for instant display
      import('../lib/localCache').then(({ getCachedCampaigns }) => {
        getCachedCampaigns(effectiveUserId).then((cached) => {
          if (cached) setCampaigns(cached as typeof campaigns);
        });
      }).catch(() => {});
      // Then fetch fresh from server (overwrites cache, with ETag)
      const campaignEtagKey = 'adventure:campaigns-etag';
      const campaignHeaders: HeadersInit = {};
      try { const etag = localStorage.getItem(campaignEtagKey); if (etag) campaignHeaders['If-None-Match'] = etag; } catch { /* ok */ }
      fetch('/api/campaigns', { headers: campaignHeaders })
        .then((r) => {
          if (r.status === 304) return null;
          const etag = r.headers.get('etag');
          if (etag) try { localStorage.setItem(campaignEtagKey, etag); } catch { /* ok */ }
          return r.ok ? (r.json() as Promise<{ campaigns?: Array<{ roomId: string; name: string; createdAt: number }> }>) : null;
        })
        .then((data) => {
          if (data?.campaigns?.length) {
            setCampaigns(data.campaigns);
            import('../lib/localCache').then(({ cacheCampaigns }) => cacheCampaigns(effectiveUserId, data.campaigns!)).catch(() => {});
          }
        })
        .catch(() => {})
        .finally(() => setCampaignsLoading(false));
    }
    fetch('/api/campaigns/public')
      .then((r) => (r.ok ? (r.json() as Promise<{ campaigns?: Array<{ roomId: string; name: string; description?: string; dmName?: string; playerCount?: number }> }>) : null))
      .then((data) => {
        if (data?.campaigns?.length) setPublicCampaigns(data.campaigns);
      })
      .catch(() => {});
  }, [user?.id]);

  // Fetch party members for all campaigns (skip for temp users — no auth cookie)
  useEffect(() => {
    if (campaigns.length === 0) return;
    const isTempLogin = (() => { try { const s = localStorage.getItem('adventure:tempUser'); return !!s && JSON.parse(s)?.id?.startsWith('temp-'); } catch { return false; } })();
    if (isTempLogin) return; // temp users can't access party API
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
    setDeleteConfirm({ roomId, name });
  };

  const confirmDeleteCampaign = (permanent = false) => {
    if (!deleteConfirm) return;
    const { roomId, name } = deleteConfirm;
    const isTempLogin = (() => { try { const s = localStorage.getItem('adventure:tempUser'); return !!s && JSON.parse(s)?.id?.startsWith('temp-'); } catch { return false; } })();
    if (!isTempLogin) {
      const url = permanent
        ? `/api/campaigns/${encodeURIComponent(roomId)}?permanent=1`
        : `/api/campaigns/${encodeURIComponent(roomId)}`;
      fetch(url, { method: 'DELETE' }).catch(() => {});
    }
    if (permanent) {
      setCampaigns((prev) => prev.filter((c) => c.roomId !== roomId));
      // Clean up localStorage
      try {
        localStorage.removeItem(`adventure:dm-history:${roomId}`);
        localStorage.removeItem(`adventure:scene:${roomId}`);
        localStorage.removeItem(`adventure:campaign:${roomId}`);
        const raw = localStorage.getItem('adventure:campaigns');
        if (raw) {
          const list = JSON.parse(raw) as Array<{ roomId: string }>;
          localStorage.setItem('adventure:campaigns', JSON.stringify(list.filter((c) => c.roomId !== roomId)));
        }
      } catch { /* ok */ }
      toast(`${name} permanently deleted`, 'info');
    } else {
      // Soft-delete: mark as archived locally
      setCampaigns((prev) => prev.map((c) => c.roomId === roomId ? { ...c, archived: true, archivedAt: Date.now() } as typeof c : c));
      toast(`${name} archived`, 'info');
    }
    setDeleteConfirm(null);
  };

  const handleRestoreCampaign = (roomId: string, name: string) => {
    const isTempLogin = (() => { try { const s = localStorage.getItem('adventure:tempUser'); return !!s && JSON.parse(s)?.id?.startsWith('temp-'); } catch { return false; } })();
    if (!isTempLogin) {
      fetch(`/api/campaigns/${encodeURIComponent(roomId)}/restore`, { method: 'POST' }).catch(() => {});
    }
    setCampaigns((prev) => prev.map((c) => {
      if (c.roomId !== roomId) return c;
      const { archived: _, archivedAt: __, ...rest } = c as Record<string, unknown>;
      return rest as typeof c;
    }));
    toast(`${name} restored`, 'info');
  };

  // Apply theme class
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.theme = theme;
  }, [theme]);

  // Apply accent color
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accentColor);
  }, [accentColor]);

  // Apply Low-FX mode
  useEffect(() => {
    document.documentElement.classList.toggle('low-fx', lowFx);
    localStorage.setItem('adventure:lowfx', lowFx ? '1' : '0');
  }, [lowFx]);

  // Fetch user session once on mount (check localStorage temp user first)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('adventure:tempUser');
      if (stored) {
        setUser(JSON.parse(stored));
        return;
      }
    } catch {
      /* ignore bad JSON */
    }
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        const d = data as { user?: Record<string, string> };
        if (d.user) setUser(d.user);
      })
      .catch(() => {}); // silently fail if backend not running
  }, []);

  // Load server-synced preferences for authenticated users.
  useEffect(() => {
    if (!user?.id || user.id.startsWith('temp-')) {
      setPrefSyncState('idle');
      return;
    }
    prefsHydratedUserRef.current = null;
    prefsUpdatedAtRef.current = null;
    setPrefSyncState('syncing');

    fetch('/api/preferences')
      .then((res) => (res.ok ? (res.json() as Promise<{ preferences?: PreferencePayload | null }>) : null))
      .then((data) => {
        const p = data?.preferences;
        if (p) applyServerPreferences(p);
        setPrefSyncState('synced');
      })
      .catch(() => {
        setPrefSyncState('offline');
      })
      .finally(() => {
        prefsHydratedUserRef.current = user.id;
      });
  }, [user?.id, setI18nLocale]);

  // Push local preference changes to server for authenticated users.
  useEffect(() => {
    if (!user?.id || user.id.startsWith('temp-')) return;
    if (prefsHydratedUserRef.current !== user.id) return;

    const now = Date.now();
    if (prefsNextSyncAtRef.current > now) {
      const delay = prefsNextSyncAtRef.current - now;
      if (prefsRetryTimerRef.current) clearTimeout(prefsRetryTimerRef.current);
      prefsRetryTimerRef.current = setTimeout(() => {
        setPrefSyncRetryNonce((n) => n + 1);
      }, delay);
      return () => {
        if (prefsRetryTimerRef.current) clearTimeout(prefsRetryTimerRef.current);
      };
    }

    if (prefsSyncTimerRef.current) clearTimeout(prefsSyncTimerRef.current);
    prefsSyncTimerRef.current = setTimeout(() => {
      setPrefSyncState('syncing');
      fetch('/api/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseUpdatedAt: prefsUpdatedAtRef.current,
          theme,
          activeTheme,
          lowFx,
          accentColor,
          locale: i18nLocale,
        }),
      })
        .then((res) => {
          if (!res.ok) return res.json().then((data) => ({ ok: false as const, status: res.status, data })).catch(() => null);
          return res.json().then((data) => ({ ok: true as const, data })).catch(() => null);
        })
        .then((result) => {
          if (!result) return;
          if (result.ok) {
            const preferences = result.data?.preferences as PreferencePayload | undefined;
            if (preferences) applyServerPreferences(preferences);
            prefsSyncBackoffMsRef.current = 1000;
            prefsNextSyncAtRef.current = 0;
            if (prefsRetryTimerRef.current) clearTimeout(prefsRetryTimerRef.current);
            setPrefSyncState('synced');
            return;
          }
          if (result.status === 409) {
            const remote = result.data?.preferences as PreferencePayload | undefined;
            if (!remote) return;
            applyServerPreferences(remote);
            prefsSyncBackoffMsRef.current = 1000;
            prefsNextSyncAtRef.current = 0;
            if (prefsRetryTimerRef.current) clearTimeout(prefsRetryTimerRef.current);
            setPrefSyncState('conflict');
            toast('Settings updated from a newer tab', 'info');
          }
        })
        .catch(() => {
          const backoff = prefsSyncBackoffMsRef.current;
          prefsNextSyncAtRef.current = Date.now() + backoff;
          prefsSyncBackoffMsRef.current = Math.min(backoff * 2, 30000);
          if (prefsRetryTimerRef.current) clearTimeout(prefsRetryTimerRef.current);
          prefsRetryTimerRef.current = setTimeout(() => {
            setPrefSyncRetryNonce((n) => n + 1);
          }, backoff);
          setPrefSyncState('offline');
        });
    }, 500);
    return () => {
      if (prefsSyncTimerRef.current) clearTimeout(prefsSyncTimerRef.current);
      if (prefsRetryTimerRef.current) clearTimeout(prefsRetryTimerRef.current);
    };
  }, [user?.id, theme, activeTheme, lowFx, accentColor, i18nLocale, prefSyncRetryNonce]);

  // When network returns, retry preference sync immediately.
  useEffect(() => {
    if (!user?.id || user.id.startsWith('temp-')) return;
    const handleOnline = () => {
      prefsNextSyncAtRef.current = 0;
      prefsSyncBackoffMsRef.current = 1000;
      if (prefsRetryTimerRef.current) clearTimeout(prefsRetryTimerRef.current);
      setPrefSyncRetryNonce((n) => n + 1);
    };
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [user?.id]);

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
      toast(t('auth.signInToCreate'), 'warning');
      return;
    }
    setWizardStep('choose');
    setCustomCampaignName('');
    setCatalogSearch('');
    setCatalogType('all');
    setCatalogTone('all');
    setCatalogExpanded(null);
    setShowCampaignWizard(true);
  };

  const handleCustomCampaignCreate = () => {
    const name = customCampaignName.trim() || 'Untitled Campaign';
    const roomId = crypto.randomUUID().slice(0, 8);
    try { localStorage.setItem(`adventure:campaignName:${roomId}`, name); } catch { /* ok */ }
    toast(`Created: ${name}`, 'success');
    setShowCampaignWizard(false);
    navigate(`/lobby/${roomId}`);
  };

  const handleCatalogSelect = (campaign: CampaignStarterKit) => {
    const roomId = `${campaign.id}-${Date.now().toString(36)}`;
    try { localStorage.setItem(`adventure:template:${roomId}`, JSON.stringify(campaign)); } catch { /* ok */ }
    toast(`Starting: ${campaign.title}`, 'success');
    setShowCampaignWizard(false);
    navigate(`/lobby/${roomId}`);
  };

  const handleCreateCharacter = () => {
    if (!user) {
      toast('Sign in to create a character', 'warning');
      return;
    }
    navigate('/characters/new');
  };

  const handleImportCharacter = async () => {
    if (!user) {
      toast('Sign in to import a character', 'warning');
      return;
    }
    const result = await importJSONFile();
    if (result.errors.length > 0) {
      toast(result.errors[0], 'error');
      return;
    }
    if (result.character) {
      // Assign a new ID and current player to avoid conflicts
      const imported = { ...result.character, id: crypto.randomUUID(), playerId: user.id || '', createdAt: Date.now() };
      addCharacter(imported);
      const warnings = (result as { warnings?: string[] }).warnings;
      if (warnings && warnings.length > 0) {
        toast(`Imported ${imported.name} (${warnings.length} mapping note${warnings.length !== 1 ? 's' : ''})`, 'success');
      } else {
        toast(`Imported ${imported.name}!`, 'success');
      }
    }
  };

  const handleDiscordLogin = () => {
    window.location.href = '/api/auth/discord';
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleTempLogin = () => {
    const name = randomFantasyName('Human');
    const tempUser = {
      id: `temp-${crypto.randomUUID().slice(0, 8)}`,
      username: name,
      global_name: name,
      avatar: '',
      picture: '',
    };
    localStorage.setItem('adventure:tempUser', JSON.stringify(tempUser));
    setUser(tempUser);
    toast(`Welcome, ${name}!`, 'success');
  };

  const handleSignOut = () => {
    // Clear all auth state: real session cookie + temp user
    document.cookie = 'adventure_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.removeItem('adventure:tempUser');
    setUser(null);
    setShowDropdown(false);
    toast('Signed out', 'info');
    navigate('/');
  };

  // Google: picture is a full URL. Discord: avatar is a hash, construct CDN URL. Temp users: no avatar.
  const isTempUser = !!user?.id?.startsWith('temp-');
  const avatarUrl = user?.picture || (user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : '');
  const userInitial = (user?.global_name || user?.username || '?')[0].toUpperCase();
  const prefSyncLabel = (() => {
    if (!user?.id || user.id.startsWith('temp-')) return '';
    if (prefSyncState === 'syncing') return 'Syncing settings...';
    if (prefSyncState === 'offline') return 'Settings sync offline';
    if (prefSyncState === 'conflict') return 'Settings refreshed';
    if (lastPrefSyncAt) return `Settings synced ${new Date(lastPrefSyncAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return 'Settings synced';
  })();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0c0f1a] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-[#F38020] via-[#e87818] to-[#d06010] shadow-lg shadow-orange-900/20 py-2 px-3 sm:px-6 flex justify-between items-center relative">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.06)_50%,transparent_70%)] pointer-events-none" />
        <div className="flex items-baseline gap-2 relative z-10 min-w-0">
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight drop-shadow-md text-white shrink-0">{t('app.title')}</h1>
          <span className="text-[11px] text-white/50 font-medium hidden sm:inline">{t('app.tagline')}</span>
        </div>

        <div className="flex gap-2 sm:gap-3 items-center relative z-10">
          {/* PWA install button */}
          {showInstall && (
            <button
              onClick={() => { import('../main').then(({ installPWA }) => installPWA()); setShowInstall(false); }}
              className="text-[9px] px-2 py-1 rounded font-bold bg-[#F38020] text-white hover:bg-[#f9a05f] transition-all"
              title="Install Adventure as an app"
            >
              Install
            </button>
          )}
          {/* Accent color picker — hidden from header, available in settings */}
          {/* Low-FX toggle */}
          <button
            onClick={() => setLowFx(!lowFx)}
            className={`text-[9px] px-2 py-1 rounded font-bold transition-all ${lowFx ? 'bg-yellow-600 text-black' : 'bg-white/10 text-white/60 hover:text-white'}`}
            aria-label={lowFx ? 'Disable Low-FX mode' : 'Enable Low-FX mode'}
            title="Low-FX: disable animations, increase contrast"
          >
            FX
          </button>
          {/* Language selector */}
          <select
            value={i18nLocale}
            onChange={(e) => setI18nLocale(e.target.value as Locale)}
            className="text-[9px] px-1 py-1 rounded bg-white/10 text-white/80 border-none font-bold cursor-pointer focus:outline-none"
            title="Language"
          >
            {Object.entries(LOCALE_NAMES).map(([code, name]) => (
              <option key={code} value={code} className="bg-slate-900 text-white">{name}</option>
            ))}
          </select>
          {/* Theme selector */}
          <select
            value={activeTheme}
            onChange={(e) => {
              const id = e.target.value as ThemeId;
              setActiveTheme(id);
              applyTheme(id);
              const def = THEMES.find((t) => t.id === id);
              setTheme(def?.isDark ? 'dark' : 'light');
            }}
            className="text-[9px] px-1 py-1 rounded bg-white/10 text-white/80 border-none font-bold cursor-pointer focus:outline-none"
            title="Theme"
          >
            {THEMES.map((t) => (
              <option key={t.id} value={t.id} className="bg-slate-900 text-white">{t.name}</option>
            ))}
          </select>
          {prefSyncLabel && (
            <span className={`hidden lg:inline text-[9px] font-semibold ${prefSyncState === 'offline' ? 'text-red-200' : prefSyncState === 'conflict' ? 'text-yellow-100' : 'text-white/60'}`} title={prefSyncLabel}>
              {prefSyncLabel}
            </span>
          )}

          {/* Profile dropdown (logged in) or Sign In button (logged out) */}
          {user ? (
            <div ref={dropdownRef} className="relative">
              <button className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/80 shadow focus:outline-none focus:ring-2 focus:ring-white/50 transition hover:ring-2 hover:ring-white/50" onClick={() => setShowDropdown(!showDropdown)} title={user.global_name || user.username}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">{userInitial}</div>
                )}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl overflow-hidden z-50 animate-[slideIn_0.15s_ease-out]">
                  <div className="px-4 py-3 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                      {avatarUrl ? (
                        <img src={avatarUrl} className="w-9 h-9 rounded-full" alt="" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">{userInitial}</div>
                      )}
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{user.global_name || user.username}</div>
                        <div className="text-xs text-slate-400">
                          {isTempUser ? <span className="text-emerald-400">Guest</span> : user.username}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <button onClick={toggleTheme} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2">
                      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700/50 flex items-center gap-2">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setShowLoginModal(true)} className="h-8 px-3 rounded-lg bg-white/15 hover:bg-white/25 text-white text-sm font-semibold transition-all cursor-pointer border border-white/20">
              Sign In
            </button>
          )}

          <a href="https://github.com/talador12/adventure" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors" title="GitHub" aria-label="GitHub repository">
            <FontAwesomeIcon icon={faGithub} className="text-xl" />
          </a>
        </div>
      </header>

      {/* Login modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up" onClick={() => setShowLoginModal(false)} role="dialog" aria-modal="true" aria-label="Sign in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Sign In</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Choose how to sign in to Adventure.</p>

            <div className="flex flex-col gap-3">
              {/* Quick Login — works now */}
              <button onClick={() => { handleTempLogin(); setShowLoginModal(false); }} className="flex items-center gap-3 w-full h-11 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm transition-all active:scale-[0.98] shadow">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">?</span>
                <span className="flex-1 text-left">Quick Login</span>
                <span className="text-[10px] text-emerald-200 font-normal">works now</span>
              </button>

              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                <span className="text-[10px] text-slate-400 uppercase tracking-wide">or</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              </div>

              {/* Discord */}
              <button onClick={handleDiscordLogin} className="flex items-center gap-3 w-full h-11 px-4 rounded-lg bg-[#5865F2] hover:bg-[#6a76fa] active:bg-[#4752c4] text-white font-semibold text-sm transition-all active:scale-[0.98] shadow">
                <FontAwesomeIcon icon={faDiscord} className="text-lg w-5" />
                <span className="flex-1 text-left">Sign in with Discord</span>
              </button>

              {/* Google */}
              <button onClick={handleGoogleLogin} className="flex items-center gap-3 w-full h-11 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all active:scale-[0.98] shadow hover:bg-slate-50 dark:hover:bg-slate-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="flex-1 text-left">Sign in with Google</span>
              </button>

              {/* GitHub */}
              <button onClick={() => { window.location.href = '/api/auth/github'; }} className="flex items-center gap-3 w-full h-11 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all active:scale-[0.98] shadow">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span className="flex-1 text-left">Sign in with GitHub</span>
              </button>
            </div>

            <button onClick={() => setShowLoginModal(false)} className="mt-4 w-full text-center text-sm text-slate-400 hover:text-slate-300 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Hero section */}
      <section className="w-full hero-gradient border-b border-slate-800/50 relative overflow-hidden">
        {/* Subtle radial glow behind hero text */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F38020]/[0.04] rounded-full blur-[100px]" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/[0.03] rounded-full blur-[80px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center text-center gap-4 sm:gap-5 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight animate-fade-in-up">
            <span className="text-white">{t('app.hero.heading1')} </span><span className="text-shimmer text-[#F38020]">{t('app.hero.heading2')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl animate-fade-in-up" style={{ animationDelay: '80ms' }}>
            {t('app.hero.subtitle')}
          </p>

          {/* Quick actions */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-2 justify-center w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '160ms' }}>
            <div className="flex gap-2 items-center w-full sm:w-auto">
              <input type="text" placeholder={t('nav.roomCode')} className="input-glow flex-1 sm:flex-none px-4 py-2.5 sm:w-56 border-2 border-slate-700/80 rounded-lg bg-slate-800/80 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-[#F38020] focus:border-[#F38020] transition-all outline-none text-sm backdrop-blur-sm" value={campaignCode} onChange={(e) => setCampaignCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleJoinCampaign()} aria-label="Room code" />
              <Button variant="default" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 px-5 rounded-lg shadow hover:shadow-lg transition-all active:scale-[0.97] shrink-0" onClick={handleJoinCampaign}>
                {t('nav.join')}
              </Button>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="default" className="btn-glow flex-1 sm:flex-none bg-gradient-to-r from-[#F38020] to-[#e06a10] hover:from-[#ff8c2e] hover:to-[#f38020] text-white font-bold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.97]" onClick={handleCreateCampaign}>
                {t('nav.newCampaign')}
              </Button>
              <Button variant="default" className="btn-glow flex-1 sm:flex-none bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-2.5 px-5 rounded-lg shadow hover:shadow-lg transition-all active:scale-[0.97]" onClick={handleCreateCharacter}>
                {t('nav.createCharacter')}
              </Button>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 text-center w-full max-w-4xl stagger-children">
            {[
              { icon: '🌱', labelKey: 'feature.neverPlayed.label', descKey: 'feature.neverPlayed.desc' },
              { icon: '🎲', labelKey: 'feature.realDice.label', descKey: 'feature.realDice.desc' },
              { icon: '👥', labelKey: 'feature.bringEveryone.label', descKey: 'feature.bringEveryone.desc' },
              { icon: '⚔️', labelKey: 'feature.combat.label', descKey: 'feature.combat.desc' },
              { icon: '🗺️', labelKey: 'feature.maps.label', descKey: 'feature.maps.desc' },
              { icon: '🏰', labelKey: 'feature.quickStart.label', descKey: 'feature.quickStart.desc' },
            ].map((f) => (
              <div key={f.labelKey} className="feature-card card-glow p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 backdrop-blur-sm animate-card-reveal">
                <div className="text-2xl mb-1 animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>{f.icon}</div>
                <div className="text-sm font-semibold text-white">{t(f.labelKey)}</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">{t(f.descKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-center text-lg font-bold text-slate-400 uppercase tracking-widest mb-6 animate-fade-in-up">{t('howItWorks.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 stagger-children">
          {[
            { step: '1', titleKey: 'howItWorks.step1', descKey: 'howItWorks.step1.desc', icon: '🏰' },
            { step: '2', titleKey: 'howItWorks.step2', descKey: 'howItWorks.step2.desc', icon: '⚔️' },
            { step: '3', titleKey: 'howItWorks.step3', descKey: 'howItWorks.step3.desc', icon: '🎲' },
          ].map((s) => (
            <div key={s.step} className="relative flex flex-col items-center text-center p-5 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm animate-card-reveal">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#F38020] flex items-center justify-center text-xs font-black text-white shadow-lg">{s.step}</div>
              <div className="text-3xl mt-2 mb-2">{s.icon}</div>
              <h3 className="text-sm font-bold text-white mb-1">{t(s.titleKey)}</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main content */}
      {/* Quick Start Adventures — random selection from the full catalog */}
      <section className="px-4 sm:px-6 py-4 max-w-4xl mx-auto w-full">
        <h3 className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{t('quickStart.title')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickStartPicks.map((c) => {
            const typeIcon = c.type === 'full' ? '📖' : '⚡';
            const levelStr = c.type === 'full' ? `Lv ${c.levelRange.start}-${c.levelRange.end}` : `Lv ${c.level}`;
            const durationStr = c.type === 'full' ? `~${c.estimatedSessions} sessions` : `~${c.estimatedHours}h`;
            return (
              <button
                key={c.id}
                onClick={() => {
                  const roomId = `${c.id}-${Date.now().toString(36)}`;
                  try { localStorage.setItem(`adventure:template:${roomId}`, JSON.stringify(c)); } catch { /* ok */ }
                  navigate(`/lobby/${roomId}`);
                }}
                className="text-left p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-[#F38020]/30 hover:bg-slate-800/30 transition-all group"
              >
                <div className="text-2xl mb-1">{typeIcon}</div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-[#F38020] transition-colors">{c.title}</div>
                <div className="text-[9px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{c.tagline}</div>
                <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                  <span className="text-[7px] px-1 py-0.5 rounded bg-slate-800 text-slate-400">{levelStr}</span>
                  <span className="text-[7px] px-1 py-0.5 rounded bg-slate-800 text-slate-500">{c.tone}</span>
                  <span className="text-[7px] px-1 py-0.5 rounded bg-slate-800 text-slate-500">{durationStr}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const url = `${window.location.origin}/?template=${c.id}`;
                      navigator.clipboard.writeText(url).then(() => toast('Template link copied!', 'success')).catch(() => {});
                    }}
                    className="ml-auto text-[8px] text-slate-600 hover:text-[#F38020] transition-colors"
                    title="Copy shareable template link"
                  >
                    Share
                  </button>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <main className="flex-1 px-4 sm:px-6 py-6 max-w-6xl mx-auto w-full space-y-6 page-enter">

        {/* Public campaign browser — only show if there are public games */}
        {publicCampaigns.length > 0 && (
          <div className="space-y-3 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-slate-400">Public Games</h2>
            <div className="flex gap-3 overflow-x-auto pb-1 stagger-children">
              {publicCampaigns.filter((pc) => !campaigns.some((c) => c.roomId === pc.roomId)).slice(0, 8).map((pc) => (
                <div key={pc.roomId} className="game-card card-glow shrink-0 w-56 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 shadow hover:shadow-lg overflow-hidden animate-card-reveal backdrop-blur-sm">
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

        {/* Aggregate stats across all characters */}
        {characters.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up">
            {(() => {
              const totalGold = characters.reduce((sum, c) => sum + (c.gold || 0), 0);
              const totalXP = characters.reduce((sum, c) => sum + (c.xp || 0), 0);
              const highestLevel = Math.max(...characters.map((c) => c.level || 1));
              const totalSessions = campaigns.filter((c) => !c.archived).length;
              const stats = [
                { label: 'Characters', value: characters.length, icon: '🎭' },
                { label: 'Campaigns', value: totalSessions, icon: '⚔️' },
                { label: 'Highest Level', value: highestLevel, icon: '⭐' },
                { label: 'Total Gold', value: totalGold >= 1000 ? `${(totalGold / 1000).toFixed(1)}k` : String(totalGold), icon: '💰' },
              ];
              return stats.map((s) => (
                <div key={s.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-slate-700/30">
                  <span className="text-lg">{s.icon}</span>
                  <div>
                    <div className="text-sm font-bold text-white">{s.value}</div>
                    <div className="text-[9px] text-slate-500">{s.label}</div>
                  </div>
                </div>
              ));
            })()}
          </div>
        )}

        {/* 2-column layout on desktop — items-stretch forces equal height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

        {/* Campaigns column */}
        <div className="flex flex-col gap-4 animate-fade-in-up">
           <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-[#F38020] to-amber-400 bg-clip-text text-transparent">{t('nav.yourCampaigns')}</h2>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  if (!user) { toast('Sign in first', 'warning'); return; }
                  const { importCampaignState } = await import('../lib/export');
                  const result = await importCampaignState();
                  if (!result.success) { toast(result.errors[0] || 'Import failed', 'error'); return; }
                  if (result.characters) {
                    for (const c of result.characters) addCharacter({ ...c, playerId: user.id || '' });
                  }
                  toast(`Restored campaign: ${result.campaignName}`, 'success');
                  if (result.roomId) navigate(`/lobby/${result.roomId}`);
                }}
                className="py-2 px-3 rounded-lg text-xs font-semibold border border-slate-600 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
                title="Restore a campaign from a backup file"
              >
                Restore
              </button>
              <Button variant="default" className="btn-glow bg-gradient-to-r from-[#F38020] to-[#e06a10] hover:from-[#ff8c2e] hover:to-[#f38020] text-white font-semibold py-2 px-5 rounded-lg shadow hover:shadow-lg text-sm transition-all active:scale-[0.97]" onClick={handleCreateCampaign}>
                + {t('nav.newCampaign')}
              </Button>
            </div>
          </div>
          {/* Search + Sort controls */}
          {!campaignsLoading && campaigns.filter((c) => !c.archived).length > 2 && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={campaignSearch}
                onChange={(e) => setCampaignSearch(e.target.value)}
                className="flex-1 text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-slate-700/50 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#F38020]/50"
              />
              <select
                value={campaignSort}
                onChange={(e) => setCampaignSort(e.target.value as 'newest' | 'oldest' | 'name')}
                className="text-xs px-2 py-1.5 rounded-lg bg-white/5 border border-slate-700/50 text-slate-400 focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name">A-Z</option>
              </select>
            </div>
          )}
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
          ) : campaigns.filter((c) => !c.archived).length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 stagger-children">
              {campaigns
                .filter((c) => !c.archived)
                .filter((c) => !campaignSearch || c.name.toLowerCase().includes(campaignSearch.toLowerCase()) || c.roomId.toLowerCase().includes(campaignSearch.toLowerCase()))
                .sort((a, b) => {
                  if (campaignSort === 'name') return a.name.localeCompare(b.name);
                  if (campaignSort === 'oldest') return a.createdAt - b.createdAt;
                  return b.createdAt - a.createdAt; // newest (default)
                })
                .map((c) => {
                const members = partyMembers[c.roomId] || [];
                const dmMember = members.find((m) => m.role === 'dm');
                const playerCount = members.filter((m) => m.role !== 'dm').length;
                return (
                  <div key={c.roomId} className="game-card card-glow rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 shadow-lg overflow-hidden animate-card-reveal backdrop-blur-sm">
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
                        <button onClick={() => handleDeleteCampaign(c.roomId, c.name)} className="text-slate-500 hover:text-red-400 transition-colors p-1 -mt-1 -mr-1 hover:scale-110" title="Delete campaign" aria-label="Archive campaign">
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
            <div className="rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 p-8 text-center backdrop-blur-sm flex flex-col items-center justify-center h-[120px]">
              {user ? (
                <>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">No campaigns yet. Create or join one above.</p>
                  <Button variant="default" className="btn-glow bg-gradient-to-r from-[#F38020] to-[#e06a10] hover:from-[#ff8c2e] hover:to-[#f38020] text-white font-semibold py-2 px-5 rounded-lg shadow hover:shadow-lg text-sm transition-all active:scale-[0.97]" onClick={handleCreateCampaign}>
                    Create Your First Campaign
                  </Button>
                </>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to create and manage campaigns.</p>
              )}
            </div>
          )}

          {/* Archived campaigns section */}
          {campaigns.filter((c) => c.archived).length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setShowArchived(!showArchived)}
                className="flex items-center gap-2 text-[10px] text-slate-500 hover:text-slate-300 transition-colors font-semibold uppercase tracking-wider"
                aria-expanded={showArchived}
              >
                <svg className={`w-3 h-3 transition-transform ${showArchived ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
                Archived ({campaigns.filter((c) => c.archived).length})
              </button>
              {showArchived && (
                <div className="mt-2 space-y-2">
                  {campaigns.filter((c) => c.archived).map((c) => (
                    <div key={c.roomId} className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-slate-900/40 border border-slate-800/50 text-sm">
                      <div className="min-w-0">
                        <span className="text-slate-400 truncate block">{c.name}</span>
                        {c.archivedAt && <span className="text-[9px] text-slate-600">Archived {new Date(c.archivedAt).toLocaleDateString()}</span>}
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => handleRestoreCampaign(c.roomId, c.name)}
                          className="text-[10px] px-2 py-1 rounded bg-emerald-900/30 border border-emerald-800/40 text-emerald-400 hover:bg-emerald-900/50 font-semibold transition-colors"
                        >
                          Restore
                        </button>
                        <button
                          onClick={() => { setDeleteConfirm({ roomId: c.roomId, name: c.name }); }}
                          className="text-[10px] px-2 py-1 rounded bg-red-900/30 border border-red-800/40 text-red-400 hover:bg-red-900/50 font-semibold transition-colors"
                          title="Permanently delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Characters column */}
        <div className="flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">{t('nav.yourCharacters')}</h2>
            <div className="flex gap-2">
              <button
                onClick={handleImportCharacter}
                className="py-2 px-3 rounded-lg text-xs font-semibold border border-slate-600 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
                title="Import character from Adventure JSON or D&D Beyond export"
              >
                Import
              </button>
              <button
                onClick={async () => {
                  if (!user) { toast(t('auth.signInToImport'), 'warning'); return; }
                  const url = prompt('Paste a URL to a character JSON file:');
                  if (!url?.trim()) return;
                  try { new URL(url); } catch { toast('Invalid URL', 'error'); return; }
                  const { importJSONFromURL } = await import('../lib/export');
                  const result = await importJSONFromURL(url.trim());
                  if (result.errors.length > 0) { toast(result.errors[0], 'error'); return; }
                  if (result.character) {
                    const imported = { ...result.character, id: crypto.randomUUID(), playerId: user.id || '', createdAt: Date.now() };
                    addCharacter(imported);
                    toast(`Imported ${imported.name} from URL!`, 'success');
                  }
                }}
                className="py-2 px-3 rounded-lg text-xs font-semibold border border-slate-600 text-slate-300 hover:border-violet-500/50 hover:text-violet-400 transition-all"
                title="Import character from a URL (paste a link to a JSON file)"
              >
                URL
              </button>
              <button
                onClick={async () => {
                  if (!user) { toast('Sign in first', 'warning'); return; }
                  const text = await navigator.clipboard.readText().catch(() => null);
                  if (!text?.trim()) { toast('Clipboard is empty — copy a character sheet first', 'warning'); return; }
                  // Try JSON parse first
                  try {
                    const json = JSON.parse(text);
                    const { importCharacterFromJSON } = await import('../lib/export');
                    const result = await importCharacterFromJSON(json);
                    if (result.character) {
                      const imported = { ...result.character, id: crypto.randomUUID(), playerId: user.id || '', createdAt: Date.now() };
                      addCharacter(imported);
                      toast(`Imported ${imported.name} from clipboard JSON!`, 'success');
                      return;
                    }
                  } catch { /* not JSON, try text parse */ }
                  // Text parse: extract stats from common character sheet formats
                  const nameMatch = text.match(/(?:Name|Character)[:\s]+([^\n]+)/i);
                  const raceMatch = text.match(/(?:Race|Species)[:\s]+([^\n]+)/i);
                  const classMatch = text.match(/(?:Class)[:\s]+([^\n]+)/i);
                  const levelMatch = text.match(/(?:Level|Lv)[:\s]*(\d+)/i);
                  const statMatches = {
                    STR: text.match(/STR[:\s]*(\d+)/i)?.[1],
                    DEX: text.match(/DEX[:\s]*(\d+)/i)?.[1],
                    CON: text.match(/CON[:\s]*(\d+)/i)?.[1],
                    INT: text.match(/INT[:\s]*(\d+)/i)?.[1],
                    WIS: text.match(/WIS[:\s]*(\d+)/i)?.[1],
                    CHA: text.match(/CHA[:\s]*(\d+)/i)?.[1],
                  };
                  const hasStats = Object.values(statMatches).some(Boolean);
                  if (!nameMatch && !hasStats) { toast('Could not parse character data from clipboard text', 'error'); return; }
                  const { RACES, CLASSES, EMPTY_EQUIPMENT, DEFAULT_APPEARANCE } = await import('../types/game');
                  const parsedRace = RACES.find((r) => raceMatch?.[1]?.toLowerCase().includes(r.toLowerCase())) || 'Human';
                  const parsedClass = CLASSES.find((c) => classMatch?.[1]?.toLowerCase().includes(c.toLowerCase())) || 'Fighter';
                  const level = parseInt(levelMatch?.[1] || '1', 10) || 1;
                  const stats = { STR: parseInt(statMatches.STR || '10'), DEX: parseInt(statMatches.DEX || '10'), CON: parseInt(statMatches.CON || '10'), INT: parseInt(statMatches.INT || '10'), WIS: parseInt(statMatches.WIS || '10'), CHA: parseInt(statMatches.CHA || '10') };
                  const conMod = Math.floor((stats.CON - 10) / 2);
                  const hp = 10 + conMod + (level - 1) * (5 + conMod);
                  const char = {
                    id: crypto.randomUUID(), name: nameMatch?.[1]?.trim() || 'Imported Character',
                    race: parsedRace as import('../types/game').Race, class: parsedClass as import('../types/game').CharacterClass,
                    level, stats, hp, maxHp: hp, ac: 10 + Math.floor((stats.DEX - 10) / 2),
                    xp: 0, gold: 0, background: 'Adventurer', alignment: 'Neutral',
                    equipment: EMPTY_EQUIPMENT, inventory: [], appearance: DEFAULT_APPEARANCE,
                    playerId: user.id || '', createdAt: Date.now(),
                  };
                  addCharacter(char as any); // eslint-disable-line @typescript-eslint/no-explicit-any
                  toast(`Imported ${char.name} from clipboard text!`, 'success');
                }}
                className="py-2 px-3 rounded-lg text-xs font-semibold border border-slate-600 text-slate-300 hover:border-teal-500/50 hover:text-teal-400 transition-all"
                title="Import character from clipboard text — paste a character sheet or JSON"
              >
                Paste
              </button>
              <button
                onClick={async () => {
                  if (!user) { toast('Sign in to restore a backup', 'warning'); return; }
                  const pw = prompt('Backup password:');
                  if (!pw) return;
                  const { importBackup } = await import('../lib/backup');
                  const character = await importBackup(pw);
                  if (!character) { toast('Restore failed — wrong password or corrupt file', 'error'); return; }
                  const restored = { ...character, playerId: user.id || '', createdAt: Date.now() };
                  addCharacter(restored);
                  toast(`Restored ${restored.name}!`, 'success');
                }}
                className="py-2 px-3 rounded-lg text-xs font-semibold border border-slate-600 text-slate-300 hover:border-sky-500/50 hover:text-sky-400 transition-all"
                title="Restore character from encrypted backup file"
              >
                Restore
              </button>
              <button
                onClick={async () => {
                  if (characters.length === 0) { toast('No characters to export', 'warning'); return; }
                  const { exportAllCharacters } = await import('../lib/export');
                  exportAllCharacters(characters, true);
                  toast(`Exported ${characters.length} character${characters.length !== 1 ? 's' : ''}`, 'success');
                }}
                className="py-2 px-3 rounded-lg text-xs font-semibold border border-slate-600 text-slate-300 hover:border-amber-500/50 hover:text-amber-400 transition-all"
                title="Export all characters as a single JSON archive"
              >
                Export All
              </button>
              <button
                onClick={async () => {
                  if (!user) { toast('Sign in first', 'warning'); return; }
                  const { importAllCharacters } = await import('../lib/export');
                  const result = await importAllCharacters();
                  if (result.errors.length > 0 && result.characters.length === 0) { toast(result.errors[0], 'error'); return; }
                  for (const c of result.characters) {
                    addCharacter({ ...c, playerId: user.id || '', createdAt: Date.now() });
                  }
                  if (result.characters.length > 0) toast(`Imported ${result.characters.length} character${result.characters.length !== 1 ? 's' : ''}`, 'success');
                  if (result.errors.length > 0) toast(`${result.errors.length} skipped`, 'warning');
                }}
                className="py-2 px-3 rounded-lg text-xs font-semibold border border-slate-600 text-slate-300 hover:border-purple-500/50 hover:text-purple-400 transition-all"
                title="Import multiple characters from an archive JSON"
              >
                Import All
              </button>
              <Button variant="default" className="btn-glow bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-2 px-5 rounded-lg shadow hover:shadow-lg text-sm transition-all active:scale-[0.97]" onClick={handleCreateCharacter}>
                + New
              </Button>
            </div>
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
                  <div key={c.id} className="game-card card-glow rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 shadow-lg overflow-hidden animate-card-reveal backdrop-blur-sm">
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
                            className="text-slate-500 hover:text-red-400 transition-all p-1 -mt-1 -mr-1 hover:scale-110" title="Delete character" aria-label="Delete character"
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
            <div className="rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 p-8 text-center backdrop-blur-sm flex flex-col items-center justify-center h-[120px]">
              {user ? (
                <>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">No characters yet. Create one to join a campaign!</p>
                  <Button variant="default" className="btn-glow bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-2 px-5 rounded-lg shadow hover:shadow-lg text-sm transition-all active:scale-[0.97]" onClick={handleCreateCharacter}>
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

        <p className="text-slate-700 dark:text-slate-500 text-sm mt-8 mb-2 flex items-center gap-1.5 justify-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          Built by{' '}
          <a href="https://github.com/Talador12" target="_blank" rel="noreferrer" className="underline decoration-slate-400 dark:decoration-slate-600 hover:decoration-[#F38020] hover:text-[#F38020] transition-all">
            Keith Adler
          </a>{' '}
          on
          <a href="https://cloudflare.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#e06a10] dark:text-[#F38020] font-bold hover:text-[#ff9533] transition-colors">
            CLOUDFLARE
            <FontAwesomeIcon icon={faCloudflare} className="transition-transform hover:scale-110" style={{ fontSize: '1.2em' }} />
          </a>
        </p>
      </main>

      {/* Campaign Creation Wizard */}
      {showCampaignWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in-up" onClick={() => setShowCampaignWizard(false)} role="dialog" aria-modal="true" aria-label="Create Campaign">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>

            {/* Wizard header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                {wizardStep !== 'choose' && (
                  <button onClick={() => setWizardStep('choose')} className="text-slate-400 hover:text-white transition-colors text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" /></svg>
                  </button>
                )}
                <h2 className="text-lg font-bold text-white">
                  {wizardStep === 'choose' ? t('nav.newCampaign') : wizardStep === 'custom' ? 'Custom Campaign' : 'Campaign Catalog'}
                </h2>
              </div>
              <button onClick={() => setShowCampaignWizard(false)} className="text-slate-500 hover:text-white transition-colors p-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
              </button>
            </div>

            {/* Wizard body */}
            <div className="flex-1 overflow-y-auto p-6">

              {/* Step 1: Choose path */}
              {wizardStep === 'choose' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setWizardStep('custom')}
                    className="group text-left p-6 rounded-xl bg-slate-800/60 border-2 border-slate-700/50 hover:border-[#F38020]/50 transition-all"
                  >
                    <div className="text-3xl mb-3">🎨</div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#F38020] transition-colors mb-1">Custom Campaign</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">Start from scratch. Name your campaign, invite players, build your own world. Full creative freedom.</p>
                  </button>
                  <button
                    onClick={() => setWizardStep('catalog')}
                    className="group text-left p-6 rounded-xl bg-slate-800/60 border-2 border-slate-700/50 hover:border-emerald-500/50 transition-all"
                  >
                    <div className="text-3xl mb-3">📚</div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">Browse Catalog</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{ALL_CAMPAIGNS.length} premade campaigns ready to play. Full adventures and one-shots with NPCs, locations, and plot twists.</p>
                  </button>
                </div>
              )}

              {/* Step 2a: Custom campaign form */}
              {wizardStep === 'custom' && (
                <div className="space-y-4 max-w-md mx-auto">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Campaign Name</label>
                    <input
                      type="text"
                      placeholder="The Fall of Blackstone Keep..."
                      value={customCampaignName}
                      onChange={(e) => setCustomCampaignName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCustomCampaignCreate()}
                      className="w-full px-4 py-3 border-2 border-slate-700/80 rounded-lg bg-slate-800/80 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-[#F38020] focus:border-[#F38020] transition-all outline-none text-sm"
                      autoFocus
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">You can always change this later. Your players will see this name when they join.</p>
                  <Button
                    variant="default"
                    className="w-full btn-glow bg-gradient-to-r from-[#F38020] to-[#e06a10] hover:from-[#ff8c2e] hover:to-[#f38020] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.97]"
                    onClick={handleCustomCampaignCreate}
                  >
                    Create & Go to Lobby
                  </Button>
                </div>
              )}

              {/* Step 2b: Campaign catalog browser */}
              {wizardStep === 'catalog' && (() => {
                const filteredCampaigns = filterCampaigns({
                  type: catalogType === 'all' ? undefined : catalogType,
                  tone: catalogTone === 'all' ? undefined : catalogTone,
                  searchTerm: catalogSearch || undefined,
                });
                const tones = getAvailableTones();

                return (
                  <div className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="text"
                        placeholder="Search campaigns..."
                        value={catalogSearch}
                        onChange={(e) => setCatalogSearch(e.target.value)}
                        className="flex-1 min-w-[200px] px-3 py-2 text-xs border border-slate-700/80 rounded-lg bg-slate-800/80 text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-[#F38020]/50 outline-none"
                      />
                      <select
                        value={catalogType}
                        onChange={(e) => setCatalogType(e.target.value as 'all' | 'full' | 'oneshot')}
                        className="px-3 py-2 text-xs rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-300 cursor-pointer focus:outline-none"
                      >
                        <option value="all">All Types</option>
                        <option value="full">Full Campaigns</option>
                        <option value="oneshot">One-Shots</option>
                      </select>
                      <select
                        value={catalogTone}
                        onChange={(e) => setCatalogTone(e.target.value as CampaignTone | 'all')}
                        className="px-3 py-2 text-xs rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-300 cursor-pointer focus:outline-none"
                      >
                        <option value="all">All Tones</option>
                        {tones.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                      </select>
                    </div>
                    <div className="text-[10px] text-slate-500">{filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''} found</div>

                    {/* Campaign list */}
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                      {filteredCampaigns.map((c) => {
                        const isExpanded = catalogExpanded === c.id;
                        const typeIcon = c.type === 'full' ? '📖' : '⚡';
                        const levelStr = c.type === 'full' ? `Lv ${c.levelRange.start}-${c.levelRange.end}` : `Lv ${c.level}`;
                        const durationStr = c.type === 'full' ? `~${c.estimatedSessions} sessions` : `~${c.estimatedHours}h`;
                        return (
                          <div key={c.id} className="rounded-xl bg-slate-800/40 border border-slate-700/40 overflow-hidden transition-all hover:border-slate-600/60">
                            <button
                              onClick={() => setCatalogExpanded(isExpanded ? null : c.id)}
                              className="w-full text-left px-4 py-3 flex items-start gap-3"
                            >
                              <span className="text-lg shrink-0 mt-0.5">{typeIcon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-bold text-white">{c.title}</span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700/80 text-slate-400">{c.tone}</span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{c.tagline}</p>
                                <div className="flex items-center gap-2 mt-1 text-[9px] text-slate-500">
                                  <span>{levelStr}</span>
                                  <span>{durationStr}</span>
                                  <span>{c.playerCount.min}-{c.playerCount.max} players</span>
                                </div>
                              </div>
                              <svg className={`w-4 h-4 text-slate-500 shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                            </button>
                            {isExpanded && (
                              <div className="px-4 pb-4 space-y-3 border-t border-slate-700/30 pt-3">
                                <p className="text-xs text-slate-300 leading-relaxed">{c.settingSummary}</p>
                                <div>
                                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Hook</span>
                                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{c.hook}</p>
                                </div>
                                {c.keyNPCs.length > 0 && (
                                  <div>
                                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Key NPCs</span>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                      {c.keyNPCs.map((npc) => (
                                        <span key={npc.name} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300" title={npc.personality}>
                                          {npc.name} ({npc.role})
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                <div className="flex flex-wrap gap-1.5">
                                  {c.themes.map((th) => (
                                    <span key={th} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-400">{th.replace('_', ' ')}</span>
                                  ))}
                                </div>
                                <Button
                                  variant="default"
                                  className="w-full btn-glow bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-2.5 rounded-lg shadow-lg transition-all active:scale-[0.97] text-sm"
                                  onClick={() => handleCatalogSelect(c)}
                                >
                                  Start This Campaign
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {filteredCampaigns.length === 0 && (
                        <div className="text-center py-8 text-sm text-slate-500">No campaigns match your filters. Try broadening your search.</div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Delete/archive campaign confirmation modal */}
      {deleteConfirm && (() => {
        const isArchived = campaigns.find((c) => c.roomId === deleteConfirm.roomId)?.archived;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up" onClick={() => setDeleteConfirm(null)} role="dialog" aria-modal="true" aria-label="Confirm action">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-white mb-2">
                {isArchived ? 'Permanently Delete?' : 'Archive Campaign?'}
              </h3>
              <p className="text-sm text-slate-400 mb-5">
                {isArchived
                  ? <>Permanently delete <span className="font-semibold text-slate-200">{deleteConfirm.name}</span>? This removes all saved game state and cannot be undone.</>
                  : <>Archive <span className="font-semibold text-slate-200">{deleteConfirm.name}</span>? You can restore it later from the Archived section.</>
                }
              </p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                  Cancel
                </button>
                {isArchived ? (
                  <button onClick={() => confirmDeleteCampaign(true)} className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors shadow-lg shadow-red-900/30">
                    Delete Forever
                  </button>
                ) : (
                  <button onClick={() => confirmDeleteCampaign(false)} className="px-4 py-2 text-sm font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors shadow-lg shadow-amber-900/30">
                    Archive
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
