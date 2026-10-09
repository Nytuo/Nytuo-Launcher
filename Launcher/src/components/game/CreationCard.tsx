import { Link } from 'react-router-dom';
import { Download, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Creation } from '@/stores/creationStore';
import { useInstallerDownload } from '@/hooks/useInstallerDownload';
import { colorsToGradient } from '@/lib/pocketbase';
import { useTranslation } from '@/lib/i18n';

interface CreationCardProps {
  creation: Creation;
}

const statusLabel: Record<string, string> = {
  active: 'Active',
  maintained: 'Maintained',
  wip: 'WIP',
  archived: 'Archived',
};

export function CreationCard({ creation }: CreationCardProps) {
  const { t } = useTranslation();
  const { installing, progress, run } = useInstallerDownload(creation.name, creation.github);
  const gradient = colorsToGradient(creation.colors);
  const canDownload = creation.githubDL && !!creation.github;

  return (
    <Link
      to={`/creation/${creation.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-transform hover:-translate-y-1 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <div
          className="flex h-full w-full items-center justify-center p-6"
          style={gradient ? { background: gradient } : undefined}
        >
          {creation.logo ? (
            <img
              src={creation.logo}
              alt={creation.name}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-center text-sm font-semibold text-muted-foreground">
              {creation.name}
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

        {creation.status && statusLabel[creation.status] && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">{statusLabel[creation.status]}</Badge>
          </div>
        )}

        {canDownload && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              run();
            }}
            disabled={installing}
            title={`${t('download_and_run_installer')} — ${t('creation_not_managed_notice')}`}
            className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black/90 disabled:opacity-50"
          >
            {installing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
          </button>
        )}

        {installing && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <div
              className="h-full bg-primary transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="p-3 space-y-1">
        <p className="font-semibold text-sm leading-tight truncate">{creation.name}</p>
        {creation.summary && (
          <p className="text-xs text-muted-foreground line-clamp-2">{creation.summary}</p>
        )}
      </div>
    </Link>
  );
}
