import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { Library } from './pages/Library';
import { GameDetails } from './pages/GameDetails';
import { CreationDetails } from './pages/CreationDetails';
import { Settings as SettingsPage } from './pages/Settings';
import UpdaterDialog from '@/components/ui/UpdaterDialog';
import { useGameStore } from './stores/gameStore';
import { useCreationStore } from './stores/creationStore';
import { useSettingsStore } from './stores/settingsStore';
import { useDownloadStore, type DownloadMode } from './stores/downloadStore';
import { Settings, Minus, Square, X, Home } from 'lucide-react';
import { Toaster } from 'sonner';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const appWindow = getCurrentWindow();

function WindowControls() {
  return (
    <div className="flex items-center gap-1 px-2 no-drag">
      <button
        onClick={() => appWindow.minimize()}
        className="p-2 hover:bg-muted rounded-md transition-colors"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => appWindow.toggleMaximize()}
        className="p-2 hover:bg-muted rounded-md transition-colors"
      >
        <Square className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => appWindow.close()}
        className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function TitleBar() {
  const { t } = useTranslation();
  const location = useLocation();

  const navLinkClass = (path: string) =>
    cn(
      'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors hover:bg-muted/50',
      location.pathname === path && 'bg-muted/60',
    );

  return (
    <div
      data-tauri-drag-region
      className="h-10 border-b border-border bg-card flex items-center justify-between select-none"
    >
      <div className="flex items-center gap-3 px-3 no-drag">
        <Link
          to="/"
          className="flex items-center text-sm font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          {t('nytuo_launcher')}
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/" className={navLinkClass('/')}>
            <Home className="w-3.5 h-3.5" /> {t('home')}
          </Link>
          <Link to="/settings" className={navLinkClass('/settings')}>
            <Settings className="w-3.5 h-3.5" /> {t('settings')}
          </Link>
        </nav>
      </div>
      <WindowControls />
    </div>
  );
}

export function AppContent() {
  const { loadLibrary } = useGameStore();
  const { fetchCreations } = useCreationStore();
  const { gamePath } = useSettingsStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (sessionStorage.getItem('updateCheckDone')) return;
        const res = await invoke<any>('check_for_update');
        if (res) {
          const btn = document.getElementById(
            'check-for-updates-trigger',
          ) as HTMLButtonElement | null;
          if (btn) btn.click();
          else navigate('/settings?showUpload=1');
        }
        sessionStorage.setItem('updateCheckDone', '1');
      } catch (e) {
        // ignore
      }
    })();
  }, [navigate]);

  useEffect(() => {
    loadLibrary(gamePath);
    fetchCreations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unlistenFns: Array<() => void> = [];

    (async () => {
      try {
        const active = await invoke<{
          game_id: string;
          mode: string;
          downloaded: number;
          total: number;
        } | null>('get_active_download');
        if (active) {
          useDownloadStore.getState().setActiveDownload({
            gameId: active.game_id,
            mode: active.mode as DownloadMode,
            downloaded: active.downloaded,
            total: active.total,
          });
        }
      } catch {
        // ignore
      }

      unlistenFns.push(
        await listen<number>('download_started', (event) => {
          useDownloadStore.getState().updateProgress(0, event.payload || 0);
        }),
      );
      unlistenFns.push(
        await listen<{ downloaded: number; total: number }>('download_progress', (event) => {
          useDownloadStore.getState().updateProgress(event.payload.downloaded, event.payload.total);
        }),
      );
    })();

    return () => unlistenFns.forEach((u) => u());
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <TitleBar />
      <main className="flex-1 relative h-full bg-background overflow-hidden">
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/creation/:id" element={<CreationDetails />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <Toaster theme="dark" position="bottom-right" />
      <UpdaterDialog />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
