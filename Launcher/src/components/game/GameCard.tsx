import { Link } from 'react-router-dom';
import { CheckCircle2, Globe, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Game } from '@/stores/gameStore';
import { useDownloadStore } from '@/stores/downloadStore';
import { colorsToGradient } from '@/lib/pocketbase';
import { useTranslation } from '@/lib/i18n';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const { t } = useTranslation();
  const gradient = colorsToGradient(game.colors);
  const activeDownload = useDownloadStore((s) => s.activeDownload);
  const isDownloadingThis = activeDownload?.gameId === game.id;
  const downloadPercent =
    isDownloadingThis && activeDownload!.total > 0
      ? Math.min(100, Math.round((activeDownload!.downloaded / activeDownload!.total) * 100))
      : 0;

  return (
    <Link
      to={`/game/${game.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-transform hover:-translate-y-1 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {game.background ? (
          <>
            <img
              src={game.background}
              alt={game.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {game.logo && (
              <img
                src={game.logo}
                alt=""
                className="absolute bottom-2 left-2 h-10 max-w-[65%] object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
              />
            )}
          </>
        ) : (
          <div
            className="flex h-full w-full items-center justify-center p-6"
            style={gradient ? { background: gradient } : undefined}
          >
            {game.logo ? (
              <img
                src={game.logo}
                alt={game.name}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <span className="text-center text-sm font-semibold text-muted-foreground">
                {game.name}
              </span>
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

        <div className="absolute top-2 right-2">
          {isDownloadingThis ? (
            <Badge className="bg-primary text-primary-foreground gap-1">
              <Loader2 className="w-3 h-3 animate-spin" /> {downloadPercent}%
            </Badge>
          ) : game.isInstalled ? (
            <Badge className="bg-emerald-500/90 text-white gap-1">
              <CheckCircle2 className="w-3 h-3" /> {t('installed')}
            </Badge>
          ) : game.webOnly ? (
            <Badge variant="secondary" className="gap-1">
              <Globe className="w-3 h-3" /> {t('web_only')}
            </Badge>
          ) : null}
        </div>

        {isDownloadingThis && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <div
              className="h-full bg-primary transition-all duration-200"
              style={{ width: `${downloadPercent}%` }}
            />
          </div>
        )}
      </div>

      <div className="p-3 space-y-1">
        <p className="font-semibold text-sm leading-tight truncate">{game.name}</p>
        {game.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{game.description}</p>
        )}
      </div>
    </Link>
  );
}
