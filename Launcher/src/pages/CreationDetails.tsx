import { useParams } from 'react-router-dom';
import { open as openUrl } from '@tauri-apps/plugin-shell';
import { toast } from 'sonner';
import {
  Download,
  Globe,
  GitFork,
  BookOpen,
  ExternalLink,
  Loader2,
  Copy,
  Package,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScreenshotGallery } from '@/components/game/ScreenshotGallery';
import { useCreationStore } from '@/stores/creationStore';
import { useInstallerDownload } from '@/hooks/useInstallerDownload';
import { parseAuthors, colorsToGradient } from '@/lib/pocketbase';
import { parseIcons, tagParser, parseFeatures } from '@/lib/tech';
import { useTranslation } from '@/lib/i18n';

const statusMeta: Record<string, { label: string; dot: string }> = {
  active: { label: 'Active', dot: 'bg-emerald-500' },
  maintained: { label: 'Maintained', dot: 'bg-blue-500' },
  wip: { label: 'Work in Progress', dot: 'bg-amber-500' },
  archived: { label: 'Archived', dot: 'bg-slate-500' },
};

function LinkCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: typeof Globe;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 text-center sm:text-left">
      <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{description}</p>
        <Button variant="outline" size="sm" className="gap-2" onClick={onAction}>
          <ExternalLink className="w-3.5 h-3.5" /> {actionLabel}
        </Button>
      </div>
    </div>
  );
}

export function CreationDetails() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { getCreation } = useCreationStore();
  const creation = id ? getCreation(id) : undefined;
  const { installing, progress, run } = useInstallerDownload(creation?.name ?? '', creation?.github);

  if (!creation) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">{t('creation_not_found')}</p>
      </div>
    );
  }

  const techTags = parseIcons(creation.icons);
  const authors = parseAuthors(creation.authors);
  const features = parseFeatures(creation.information);
  const status = creation.status ? statusMeta[creation.status] : undefined;
  const canDownload = creation.githubDL && !!creation.github;

  const distributionLinks: { label: string; url?: string }[] = [
    { label: 'GitHub', url: creation.github },
    { label: 'Flathub', url: creation.flathub },
    { label: 'Chocolatey', url: creation.chocolatey },
    { label: 'Snap Store', url: creation.snapstore },
    { label: 'Google Play', url: creation.android },
    { label: 'Microsoft Store', url: creation.windowsStore },
    { label: 'itch.io', url: creation.itch },
    { label: 'Game Jolt', url: creation.gamejolt },
  ].filter((d) => !!d.url);

  const hasGallery = creation.screenshots.length > 0 || creation.video;
  const gradient = colorsToGradient(creation.colors);

  return (
    <div className="relative h-full overflow-hidden">
      {gradient ? (
        <div className="absolute inset-0 opacity-30" style={{ background: gradient }} />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-background to-muted opacity-60" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />

      <ScrollArea className="h-full relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            {creation.logo ? (
              <img src={creation.logo} alt={creation.name} className="w-full h-full object-contain p-4" />
            ) : (
              <Package className="w-10 h-10 text-muted-foreground" />
            )}
          </div>

          {status && (
            <Badge variant="secondary" className="gap-1.5">
              <span className={`w-2 h-2 rounded-full ${status.dot}`} /> {status.label}
            </Badge>
          )}

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight break-words">
            {creation.name}
          </h1>

          {creation.summary && (
            <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
              {creation.summary}
            </p>
          )}

          {techTags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center max-w-xl">
              {techTags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tagParser(tag)}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {canDownload && (
              <Button size="lg" className="gap-2" disabled={installing} onClick={run}>
                {installing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {t('download_and_run_installer')}
              </Button>
            )}
            {creation.website && (
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => openUrl(creation.website!)}
              >
                <Globe className="w-5 h-5" /> {t('visit_website')}
              </Button>
            )}
            {creation.github && !canDownload && (
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => openUrl(creation.github)}
              >
                <GitFork className="w-5 h-5" /> GitHub
              </Button>
            )}
          </div>

          {canDownload && (
            <p className="text-xs text-muted-foreground max-w-sm">{t('creation_not_managed_notice')}</p>
          )}

          {installing && (
            <div className="w-full max-w-xs space-y-1.5">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground tabular-nums">{progress}%</p>
            </div>
          )}
        </div>

        {creation.description && (
          <section className="max-w-2xl mx-auto text-center">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {creation.description}
            </p>
          </section>
        )}

        {authors.length > 0 && (
          <section className="space-y-3">
            <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Users className="w-3.5 h-3.5" /> {authors.length > 1 ? 'Authors' : 'Author'}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {authors.map((author) => (
                <span
                  key={author.name}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm"
                >
                  {author.name}
                  {author.role && (
                    <span className="text-muted-foreground"> — {author.role}</span>
                  )}
                </span>
              ))}
            </div>
          </section>
        )}

        {features.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-center">
              {t('features_title', { name: creation.name })}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => {
                const shot =
                  feature.image !== undefined ? creation.screenshots[feature.image] : undefined;
                return (
                  <div
                    key={feature.name}
                    className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                  >
                    {shot && (
                      <img src={shot} alt={feature.name} className="w-full aspect-video object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{feature.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {creation.documentation && (
          <LinkCard
            icon={BookOpen}
            title={t('documentation_title')}
            description={t('documentation_subtitle')}
            actionLabel={t('view_documentation')}
            onAction={() => openUrl(creation.documentation!)}
          />
        )}

        {creation.homebrew && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
            <code className="flex-1 w-full text-xs sm:text-sm bg-black/30 rounded-lg px-4 py-3 overflow-x-auto">
              brew install --cask {creation.homebrew}
            </code>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 flex-shrink-0"
              onClick={() => {
                navigator.clipboard.writeText(`brew install --cask ${creation.homebrew}`);
                toast.success(t('copied_to_clipboard'));
              }}
            >
              <Copy className="w-3.5 h-3.5" /> {t('copy')}
            </Button>
          </div>
        )}

        {distributionLinks.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-center">
              {t('get_title', { name: creation.name })}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {distributionLinks.map((d) => (
                <Button
                  key={d.label}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => openUrl(d.url!)}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> {d.label}
                </Button>
              ))}
            </div>
          </section>
        )}

        {hasGallery && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-center">{t('gallery_title')}</h2>
            <ScreenshotGallery screenshots={creation.screenshots} video={creation.video} />
          </section>
        )}
      </div>
      </ScrollArea>
    </div>
  );
}
