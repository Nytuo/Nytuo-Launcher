import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Library } from './pages/Library';
import { GameDetails } from './pages/GameDetails';
import { Settings as SettingsPage } from './pages/Settings';
import UpdaterDialog from '@/components/ui/UpdaterDialog';
import { useGameStore } from './stores/gameStore';
import { Settings, RefreshCw, Minus, Square, X } from 'lucide-react';
import { Toaster } from 'sonner';
import { getCurrentWindow } from '@tauri-apps/api/window';

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
  return (
    <div
      data-tauri-drag-region
      className="h-10 border-b border-border bg-card flex items-center justify-between select-none"
    >
      <div className="flex items-center gap-2 px-4 text-xs font-medium text-muted-foreground pointer-events-none">
        <span>Nytuo Launcher</span>
      </div>
      <WindowControls />
    </div>
  );
}

export function AppContent() {
  const { games, fetchRemoteVersions } = useGameStore();
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

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-border bg-card flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-border/40 flex items-center gap-3">
            <img src="/images/LogoLauncher.png" alt="Logo" className=" object-contain" />
          </div>

          <nav className="p-2 space-y-1 border-b border-border/40">
            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors"
            >
              <Settings className="w-4 h-4" /> Settings
            </Link>
            <div
              onClick={fetchRemoteVersions}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
              title="Fetch latest game versions from GitHub"
            >
              <RefreshCw className="w-4 h-4" /> Update Metadata
            </div>
          </nav>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <p className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Games Library
            </p>
            {games.map((game) => (
              <Link
                key={game.id}
                to={`/game/${game.id}`}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted/50 transition-colors truncate w-full"
              >
                <span className="truncate">{game.name}</span>
              </Link>
            ))}
          </div>
        </aside>

        <main className="flex-1 relative h-full bg-background overflow-hidden">
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
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
