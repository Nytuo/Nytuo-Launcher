import { useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { open as openUrl } from '@tauri-apps/plugin-shell';
import { toast } from 'sonner';
import { detectPlatform, fetchLatestReleaseAsset } from '@/lib/github';
import { useTranslation } from '@/lib/i18n';

interface InstallerProgressPayload {
  id: string;
  downloaded: number;
  total: number;
}

export function useInstallerDownload(name: string, github?: string) {
  const { t } = useTranslation();
  const [installing, setInstalling] = useState(false);
  const [progress, setProgress] = useState(0);
  const downloadIdRef = useRef(0);

  const run = async () => {
    if (!github) return;
    const downloadId = `${Date.now()}-${++downloadIdRef.current}`;
    setInstalling(true);
    setProgress(0);

    const unlisten = await listen<InstallerProgressPayload>(
      'installer_download_progress',
      (event) => {
        if (event.payload.id !== downloadId || event.payload.total <= 0) return;
        setProgress(Math.min(100, Math.round((event.payload.downloaded / event.payload.total) * 100)));
      },
    );

    try {
      const platform = detectPlatform();
      const asset = await fetchLatestReleaseAsset(github, platform);
      if (!asset) {
        toast.error(t('installer_not_found', { name }));
        openUrl(github);
        return;
      }
      toast.info(t('downloading_installer', { name }));
      await invoke('download_and_open_installer', {
        url: asset.url,
        filename: asset.name,
        downloadId,
      });
      setProgress(100);
      toast.success(t('installer_launched', { name }));
    } catch (e) {
      console.error('download_and_open_installer failed', e);
      toast.error(t('installer_failed', { name }));
    } finally {
      unlisten();
      setInstalling(false);
      setTimeout(() => setProgress(0), 600);
    }
  };

  return { installing, progress, run };
}
