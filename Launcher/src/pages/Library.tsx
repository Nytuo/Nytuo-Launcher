import { useMemo, useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { useGameStore } from '@/stores/gameStore';
import { useCreationStore } from '@/stores/creationStore';
import { GameCard } from '@/components/game/GameCard';
import { CreationCard } from '@/components/game/CreationCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type Filter = 'all' | 'installed' | 'not_installed';

export function Library() {
  const { t } = useTranslation();
  const { games, ready } = useGameStore();
  const { creations } = useCreationStore();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const installedGames = useMemo(() => games.filter((g) => g.isInstalled), [games]);

  const filteredGames = useMemo(() => {
    return games.filter((g) => {
      if (filter === 'installed' && !g.isInstalled) return false;
      if (filter === 'not_installed' && g.isInstalled) return false;
      if (query && !g.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [games, filter, query]);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('filter_all') },
    { key: 'installed', label: t('filter_installed') },
    { key: 'not_installed', label: t('filter_not_installed') },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-8 py-10 space-y-10">
        <div className="flex items-center gap-4">
          <img
            src="/images/LogoLauncher.png"
            alt={t('nytuo_launcher')}
            className="h-16 sm:h-20 w-auto object-contain flex-shrink-0"
          />
          <div className="flex flex-col gap-1 min-w-0">
            <h1 className="text-3xl font-black tracking-tight truncate">{t('nytuo_launcher')}</h1>
            <p className="text-muted-foreground text-sm">
              {ready
                ? t('library_subtitle', { count: installedGames.length, total: games.length })
                : t('loading_library')}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                  filter === f.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search_games_placeholder')}
              className="pl-9 rounded-full bg-white/5 border-white/10"
            />
          </div>
        </div>

        {!ready ? null : filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t('no_games_match')}</p>
        )}

        {creations.length > 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight">{t('more_from_nytuo')}</h2>
              <p className="text-sm text-muted-foreground">{t('more_from_nytuo_subtitle')}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {creations.map((creation) => (
                <CreationCard key={creation.id} creation={creation} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
