import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FolderOpen, Globe, RefreshCw } from 'lucide-react';
import { open as openUrl } from '@tauri-apps/plugin-shell';
import { open as openDialog } from '@tauri-apps/plugin-dialog';
import { toast } from 'sonner';

import { useSettingsStore } from '@/stores/settingsStore';
import { useGameStore } from '@/stores/gameStore';
import { useTranslation } from '@/lib/i18n';

export function Settings() {
  const { gamePath, setGamePath, language, setLanguage } = useSettingsStore();
  const { setLang, t } = useTranslation();
  const { refreshInstallationStatus } = useGameStore();

  const handleFolderChange = async () => {
    try {
      const selected = await openDialog({
        directory: true,
        multiple: false,
        title: 'Select Games Installation Folder',
      });
      if (selected) {
        setGamePath(selected as string);
        await refreshInstallationStatus(selected as string);
        toast.success('Game installation folder updated.');
      }
    } catch (err) {
      toast.error('Failed to open folder dialog.');
    }
  };

  function triggerUpdateCheck() {
    const btn = document.getElementById('check-for-updates-trigger') as HTMLButtonElement | null;
    if (btn) btn.click();
  }

  const settingsItems = [
    {
      title: t('general'),
      description: t('manage_settings'),
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('games_installation_folder')}</label>
            <div className="flex gap-2">
              <Input value={gamePath} readOnly className="bg-muted" />
              <Button variant="outline" size="icon" onClick={handleFolderChange}>
                <FolderOpen className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('language_label')}</label>
            <Select
              value={language}
              onValueChange={(v) => {
                setLanguage(v);
                setLang(v);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('select_language_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: t('update'),
      description: t('update_description'),
      content: (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
          <div>
            <p className="font-semibold text-sm">{t('version_text', { version: '2.0.0' })}</p>
            <p className="text-xs text-muted-foreground">{t('launcher_up_to_date')}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={triggerUpdateCheck}>
              <RefreshCw className="h-4 w-4" /> {t('force_update')}
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: t('about_community'),
      description: '',
      content: (
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            className="justify-start gap-2 h-12"
            onClick={() => openUrl('https://nytuo.fr/nytuo-launcher')}
          >
            <Globe className="h-4 w-4" /> {t('website')}
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-2 h-12"
            onClick={() => openUrl('https://github.com/Nytuo')}
          >
            <Globe className="h-4 w-4" /> {t('github')}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings')}</h1>
        <p className="text-muted-foreground">{t('settings_description')}</p>
      </div>

      <div className="space-y-6">
        {settingsItems.map((item, idx) => (
          <Card key={idx} className="border-border/40 bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>{item.content}</CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-8 text-xs text-muted-foreground">
        <p>© 2026 Nytuo Launcher - Powered by Tauri & React</p>
      </div>
    </div>
  );
}
