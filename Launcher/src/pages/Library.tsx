import { useTranslation } from '@/lib/i18n';

export function Library() {
  const { t } = useTranslation();
  return (
    <div className="h-full flex items-center justify-center">
      <img
        src="/images/LogoLauncher.png"
        alt={t('nytuo_launcher')}
        className="w-72 h-72 md:w-96 md:h-96 object-contain"
      />
    </div>
  );
}
