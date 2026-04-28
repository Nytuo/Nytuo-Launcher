import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGameStore } from '@/stores/gameStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useAppStore } from '@/stores/appStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Download,
  Clock,
  Calendar,
  Trophy,
  Share2,
  MoreHorizontal,
  FolderOpen,
  Trash2,
  Wrench,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { open as openUrl } from '@tauri-apps/plugin-shell';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { toast } from 'sonner';
import { compareVersions } from '@/lib/utils';
import { useTranslation } from '../lib/i18n';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

export function GameDetails() {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const { getGame, setCurrentGame, fetchAchievements, achievements, refreshInstallationStatus } =
    useGameStore();
  const { gamePath } = useSettingsStore();
  const { stopBGMusic } = useAppStore();

  const [scrollY, setScrollY] = useState(0);
  const [showLaunchAnim, setShowLaunchAnim] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const displayRef = useRef(0);
  const targetRef = useRef(0);
  const lastUpdateRef = useRef(0);
  const totalFilesRef = useRef<number>(0);
  const [changelog, setChangelog] = useState('');
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const game = id ? getGame(id) : undefined;

  const launchGame = async () => {
    if (!game) return;
    setShowLaunchAnim(true);
    try {
      const platform = window.navigator.userAgent.includes('Windows')
        ? 'windows'
        : window.navigator.userAgent.includes('Mac')
          ? 'macos'
          : 'linux';

      if (platform === 'macos') {
        const macExec = game.exec_name?.macos || `${game.id}.app`;
        const appBundle = `${gamePath}/${game.id}/${macExec}`;
        await invoke('launch_game', { path: appBundle });
      } else {
        const execName = game.exec_name?.[platform] || (platform === 'windows' ? 'nw.exe' : 'nw');
        const fullPath = `${gamePath}/${game.id}/${execName}`;
        await invoke('launch_game', { path: fullPath });
      }
    } catch (e) {
      console.error('Launch failed:', e);
      toast.error(`Launch failed: ${e}`);
    }
    setTimeout(() => setShowLaunchAnim(false), 3000);
  };

  const handleDownload = async (mode: 'install' | 'repair' | 'update') => {
    if (!game) return;
    setIsDownloading(true);
    displayRef.current = 0;
    targetRef.current = 0;
    setDisplayProgress(0);
    try {
      const platform = window.navigator.userAgent.includes('Windows')
        ? 'windows'
        : window.navigator.userAgent.includes('Mac')
          ? 'macos'
          : 'linux';

      const installPath = `${gamePath}/${game.id}`;

      if (mode === 'repair') {
        await invoke('repair_game', { gameId: game.id, platform, installPath: installPath });
      } else if (mode === 'update') {
        await invoke('update_game', { gameId: game.id, platform, installPath: installPath });
      } else {
        await invoke('download_game', { gameId: game.id, platform, installPath: installPath });
      }

      setIsDownloading(false);
      await refreshInstallationStatus(gamePath);
      if (mode === 'repair') toast.success(t('repair_complete', { name: game.name }));
      else if (mode === 'update') toast.success(t('update_complete', { name: game.name }));
      else toast.success(t('install_complete', { name: game.name }));
    } catch (e) {
      console.error('Download failed:', e);
      setIsDownloading(false);
      toast.error('Failed to download game. Please check your connection.');
    }
  };

  const handleUninstall = async () => {
    if (!game) return;
    try {
      const path = `${gamePath}/${game.id}`;
      await invoke('delete_dir', { path });
      await refreshInstallationStatus(gamePath);
      toast.success(t('uninstall_success', { name: game.name }));
    } catch (err) {
      toast.error(t('failed_uninstall', { name: game.name }));
    }
  };

  const handleOpenFolder = async () => {
    if (!game) return;
    const path = `${gamePath}/${game.id}`;
    try {
      await invoke('open_folder', { path });
    } catch (e) {
      toast.error(t('could_not_open_folder'));
    }
  };

  const handleOpenSaves = async () => {
    if (!game) return;
    const path = `${gamePath}/${game.id}/Saves`;
    try {
      await invoke('open_folder', { path });
    } catch (e) {
      handleOpenFolder();
    }
  };

  const handleCreateShortcut = async () => {
    if (!game) return;
    try {
      const platform = window.navigator.userAgent.includes('Windows') ? 'windows' : 'linux';
      if (platform !== 'windows') {
        toast.error(t('create_shortcut_only_windows'));
        return;
      }
      const execName = game.exec_name?.windows || 'nw.exe';
      const target = `${gamePath}/${game.id}/${execName}`;

      const iconPath = `${gamePath}/${game.id}/${game.id}.ico`;
      await invoke('create_shortcut', {
        path: '$HOME\\Desktop',
        name: game.name,
        target: target,
        icon: iconPath,
      });
      toast.success(t('shortcut_created'));
    } catch (e) {
      console.error('create_shortcut failed', e);
      toast.error(t('failed_create_shortcut'));
    }
  };

  useEffect(() => {
    const unlistenFns: Array<() => void> = [];

    listen<number>('download_started', (event) => {
      console.log('download_started event', event.payload);
      totalFilesRef.current = event.payload || 0;

      targetRef.current = 0;
      displayRef.current = 0;
      setDisplayProgress(0);
      lastUpdateRef.current = performance.now();
      setIsDownloading(true);
    }).then((fn) => unlistenFns.push(fn));

    listen<{ downloaded: number; total: number }>('download_progress', (event) => {
      console.log('download_progress received', event.payload);
      const { downloaded, total } = event.payload;
      const effectiveTotal = total && total > 0 ? total : totalFilesRef.current;
      if (effectiveTotal && effectiveTotal > 0) {
        const pct = Math.min(100, (downloaded / effectiveTotal) * 100);
        const now = performance.now();
        const minDelta = 0.3;
        const minInterval = 60;
        if (
          Math.abs(pct - targetRef.current) >= minDelta ||
          now - lastUpdateRef.current > minInterval
        ) {
          targetRef.current = pct;
          lastUpdateRef.current = now;
        }

        if (downloaded >= effectiveTotal) {
          setTimeout(() => {
            setIsDownloading(false);
          }, 350);
        }
      }
    }).then((fn) => unlistenFns.push(fn));

    listen<string>('download_debug', (event) => {
      console.log('backend-debug:', event.payload);
    }).then((fn) => unlistenFns.push(fn));

    return () => {
      unlistenFns.forEach((u) => u && u());
    };
  }, []);

  useEffect(() => {
    if (!isDownloading) {
      displayRef.current = 0;
      targetRef.current = 0;
      setDisplayProgress(0);
      return;
    }

    const id = setInterval(() => {
      if (displayRef.current !== targetRef.current) {
        const next = Math.max(0, Math.min(100, targetRef.current));
        displayRef.current = next;
        setDisplayProgress(next);
        console.log('applyProgress', next, 'isDownloading=', isDownloading);
      }
    }, 50);
    return () => clearInterval(id);
  }, [isDownloading]);

  useEffect(() => {
    if (!id || !game) return;

    refreshInstallationStatus(gamePath);
    setCurrentGame(game);
    setScrollY(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    fetchAchievements(id, gamePath);

    fetch(`/changelogs/${id.toUpperCase()}.txt`)
      .then((res) => res.text())
      .then((text) => {
        let html = text || '';

        if (html.trim().length > 0 && !html.trim().startsWith('<')) {
          const parts = html.split(/\r?\n/);
          if (parts.length > 1 && /^\d+\.\d+/.test(parts[0].trim())) {
            const ver = parts.shift();
            html = `<h3 class="changelog-version">${ver}</h3>` + parts.join('\n');
          } else {
            html = html
              .split(/\r?\n\r?\n/)
              .map((p) => `<p>${p.replace(/\r?\n/g, '<br/>')}</p>`)
              .join('\n');
          }
        }

        try {
          if (html.includes('<')) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const all = doc.body.querySelectorAll('*');
            all.forEach((el) => {
              if (!el.className) return;
              const classes = el.className.split(/\s+/).filter(Boolean);
              const newClasses: string[] = [];
              classes.forEach((c) => {
                if (c === 'fixed') {
                  newClasses.push('chlog-fixed');
                } else if (c === 'new') {
                  newClasses.push('chlog-new');
                } else if (
                  ['absolute', 'top-0', 'left-0', 'right-0', 'bottom-0', 'inset-0'].includes(c)
                ) {
                } else {
                  newClasses.push(c);
                }
              });
              el.className = newClasses.join(' ');
            });
            html = doc.body.innerHTML;
          } else {
          }
        } catch (e) {
          html = html.replace(/class=["']?fixed["']?/g, 'class="chlog-fixed"');
          html = html.replace(/class=["']?new["']?/g, 'class="chlog-new"');
        }

        setChangelog(html);
      })
      .catch(() => setChangelog(t('no_changelog')));

    return () => {
      stopBGMusic();
    };
  }, [
    id,
    game,
    gamePath,
    setCurrentGame,
    fetchAchievements,
    stopBGMusic,
    refreshInstallationStatus,
  ]);

  if (!game) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">{t('game_not_found')}</p>
      </div>
    );
  }

  const isUpdateAvailable =
    game.isInstalled &&
    game.remoteVersion &&
    game.version &&
    compareVersions(game.remoteVersion, game.version) === 1;

  const totalTimePlayed = '0h 0m';
  const lastTimePlayed = 'N/A';

  const bgOpacity = Math.max(0.1, 0.65 - (scrollY / 500) * 0.55);
  const heroOpacity = Math.max(0, 1 - scrollY / 300);

  const hasAchievements = achievements && achievements.length > 0;
  const isWindows = typeof window !== 'undefined' && window.navigator.userAgent.includes('Windows');

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={game.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="relative h-full overflow-hidden"
      >
        {game.background ? (
          <img
            src={game.background}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: bgOpacity }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-background to-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <ScrollArea
          className="h-full relative z-10"
          onScrollCapture={(e) => setScrollY(e.currentTarget.scrollTop)}
          ref={scrollRef}
        >
          <div className="max-w-[1200px] mx-auto px-8 pt-24 pb-16">
            <div
              className="flex flex-col md:flex-row gap-10 items-start md:items-end mb-12"
              style={{ opacity: heroOpacity }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden flex-shrink-0"
                style={{ border: 0 }}
              >
                <img src={game.logo} alt={game.name} className="w-full h-full object-contain" />
              </motion.div>

              <div className="flex-grow space-y-4">
                <div className="flex flex-wrap gap-2">
                  {game.version && (
                    <Badge variant="outline" className="border-white/20">
                      v{game.version}
                    </Badge>
                  )}
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">{game.name}</h1>
                <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{totalTimePlayed} played</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Last played {lastTimePlayed}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 ${hasAchievements ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-8`}
            >
              <div className={`${hasAchievements ? 'lg:col-span-2' : ''} space-y-8`}>
                <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                  {game.isInstalled ? (
                    <>
                      <Button
                        size="lg"
                        className="h-14 px-10 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                        onClick={launchGame}
                      >
                        <Play className="w-6 h-6 mr-3 fill-current" />
                        {t('play')}
                      </Button>
                      {isUpdateAvailable && (
                        <Button
                          size="lg"
                          variant="secondary"
                          className="h-14 px-8 text-lg font-bold rounded-2xl"
                          onClick={() => handleDownload('update')}
                        >
                          <RefreshCw className="w-6 h-6 mr-3" />
                          {t('update_to', { version: game.remoteVersion })}
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      size="lg"
                      className="h-14 px-10 text-lg font-bold rounded-2xl"
                      disabled={isDownloading}
                      onClick={() => handleDownload('install')}
                    >
                      {isDownloading ? (
                        <>
                          <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                          {t('installing')}
                        </>
                      ) : (
                        <>
                          <Download className="w-6 h-6 mr-3" />
                          {t('install_now')}
                        </>
                      )}
                    </Button>
                  )}

                  {game.online_url && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-lg font-bold rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                      onClick={() => {
                        if (game.online_url) {
                          openUrl(game.online_url);
                        } else {
                          toast.info(t('online_play_unavailable'));
                        }
                      }}
                      disabled={!game.online_url}
                    >
                      <ExternalLink className="w-6 h-6 mr-3" />
                      {t('play_online')}
                    </Button>
                  )}

                  <div className="flex gap-2 ml-auto">
                    {game.isInstalled && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-14 h-14 rounded-2xl border-white/10 bg-white/5"
                          >
                            <MoreHorizontal className="w-6 h-6" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-56 p-2 rounded-2xl bg-popover/95 backdrop-blur-xl border-white/10"
                        >
                          <DropdownMenuItem
                            className="rounded-xl py-3 cursor-pointer"
                            onClick={handleOpenFolder}
                          >
                            <FolderOpen className="w-4 h-4 mr-3" /> {t('open_game_folder')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded-xl py-3 cursor-pointer"
                            onClick={handleOpenSaves}
                          >
                            <FolderOpen className="w-4 h-4 mr-3" /> {t('open_save_folder')}
                          </DropdownMenuItem>
                          {isWindows && (
                            <DropdownMenuItem
                              className="rounded-xl py-3 cursor-pointer"
                              onClick={handleCreateShortcut}
                            >
                              <Share2 className="w-4 h-4 mr-3" /> Create Desktop Shortcut
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="rounded-xl py-3 cursor-pointer"
                            onClick={() => handleDownload('repair')}
                          >
                            <Wrench className="w-4 h-4 mr-3" /> {t('repair_files')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem
                            className="rounded-xl py-3 text-destructive focus:text-destructive cursor-pointer"
                            onClick={handleUninstall}
                          >
                            <Trash2 className="w-4 h-4 mr-3" /> {t('uninstall_game')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>

                {isDownloading && (
                  <Card className="rounded-3xl bg-white/5 border-white/10 overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-end mb-2">
                        <div className="space-y-1">
                          <CardTitle className="text-sm">{t('downloading')}</CardTitle>
                          <CardDescription>{t('overall_progress')}</CardDescription>
                        </div>
                        <span className="text-2xl font-black tabular-nums">
                          {Math.round(displayProgress)}%
                        </span>
                      </div>
                      <Progress
                        value={displayProgress}
                        className="h-2 transition-all duration-300"
                      />
                    </CardHeader>
                    <CardContent />
                  </Card>
                )}

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">{t('recent_updates')}</h2>
                  <Card className="rounded-3xl bg-white/5 border-white/10">
                    <ScrollArea className="h-[300px]">
                      <CardContent className="p-6">
                        <div
                          className="prose prose-invert max-w-none text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: changelog }}
                        />
                      </CardContent>
                    </ScrollArea>
                  </Card>
                </div>
              </div>

              {hasAchievements && (
                <div className="space-y-8">
                  <Card className="rounded-3xl bg-white/5 border-white/10 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Achievements
                      </CardTitle>
                      <CardDescription>
                        {achievements.filter((a) => a.unlocked).length} of {achievements.length}{' '}
                        unlocked
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress
                        value={
                          achievements.length > 0
                            ? (achievements.filter((a) => a.unlocked).length /
                                achievements.length) *
                              100
                            : 0
                        }
                        className="h-2"
                      />
                      <div className="space-y-2">
                        {achievements.slice(0, 5).map((ach, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                              ach.unlocked ? 'bg-white/10' : 'bg-white/5 opacity-50'
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                ach.unlocked ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/10'
                              }`}
                            >
                              <Trophy className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold">{ach.name}</p>
                              <p className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                                {ach.unlocked ? t('unlocked') : t('locked')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {achievements.length > 5 && (
                        <Dialog open={showAllAchievements} onOpenChange={setShowAllAchievements}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className="w-full rounded-xl text-xs font-bold">
                              {t('view_all_achievements')}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{t('all_achievements')}</DialogTitle>
                              <DialogDescription>
                                {achievements.filter((a) => a.unlocked).length} of{' '}
                                {achievements.length} unlocked
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-3 mt-4 max-h-[60vh] overflow-auto">
                              {achievements.map((ach, i) => (
                                <div
                                  key={i}
                                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                                    ach.unlocked ? 'bg-white/10' : 'bg-white/5 opacity-50'
                                  }`}
                                >
                                  <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${ach.unlocked ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/10'}`}
                                  >
                                    <Trophy className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold">{ach.name}</p>
                                    <p className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                                      {ach.unlocked ? t('unlocked') : t('locked')}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <DialogFooter>
                              <Button onClick={() => setShowAllAchievements(false)}>
                                {t('close')}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {showLaunchAnim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-background/50 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="w-48 h-48 flex items-center justify-center">
                <img
                  src={game.logo}
                  alt=""
                  className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(var(--primary),0.5)]"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tighter animate-pulse">
                  {t('launching', { name: game.name })}
                </h2>
                <p className="text-muted-foreground font-medium">{t('get_ready')}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
