import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';

type Translations = Record<string, Record<string, string>>;

const translations: Translations = {
  en: {
    play: 'Play',
    install_now: 'Install Now',
    installing: 'Installing...',
    update_to: 'Update to v{{version}}',
    play_online: 'Play Online',
    open_game_folder: 'Open Game Folder',
    open_save_folder: 'Open Save Folder',
    repair_files: 'Repair Files',
    uninstall_game: 'Uninstall Game',
    downloading: 'Downloading',
    overall_progress: 'Overall Progress',
    recent_updates: 'Recent Updates',
    no_changelog: 'No changelog available.',
    create_shortcut_only_windows: 'Shortcuts are currently only supported on Windows.',
    launch_failed: 'Launch failed',
    uninstall_success: '{{name}} has been uninstalled.',
    install_complete: '{{name}} installation complete!',
    repair_complete: '{{name}} repair complete!',
    update_complete: '{{name}} update complete!',
    failed_uninstall: 'Failed to uninstall {{name}}.',
    could_not_open_folder: 'Could not open folder. Is the game installed?',
    shortcut_created: 'Shortcut created on Desktop!',
    failed_create_shortcut: 'Failed to create shortcut. See console for details.',
    game_not_found: 'Game not found',
    online_play_unavailable: 'Online play not hosted for this title.',
    view_all_achievements: 'View All Achievements',
    all_achievements: 'All Achievements',
    launching: 'Launching {{name}}...',
    get_ready: 'Get ready for adventure',
    close: 'Close',
    settings: 'Settings',
    settings_description: 'Configure the launcher to your needs.',
    select_install_folder_title: 'Select Games Installation Folder',
    general: 'General',
    manage_settings: 'Manage your launcher settings',
    games_installation_folder: 'Games Installation Folder',
    language_label: 'Language',
    select_language_placeholder: 'Select Language',
    update: 'Update',
    update_description: 'Launcher version and update options',
    version_text: 'Version {{version}} (Tauri Remake)',
    launcher_up_to_date: 'Your launcher is up to date.',
    force_update: 'Check for updates',
    about_community: 'About & Community',
    website: 'Website',
    github: 'GitHub',
    footer_copy: '© 2026 Nytuo Launcher - Powered by Tauri & React',
    nytuo_launcher: 'Nytuo Launcher',
    unlocked: 'Unlocked',
    locked: 'Locked',
  },
  fr: {
    play: 'Jouer',
    install_now: 'Installer',
    installing: 'Installation...',
    update_to: 'Mettre à jour vers v{{version}}',
    play_online: 'Jouer en ligne',
    open_game_folder: 'Ouvrir le dossier du jeu',
    open_save_folder: 'Ouvrir le dossier des sauvegardes',
    repair_files: 'Réparer les fichiers',
    uninstall_game: 'Désinstaller le jeu',
    downloading: 'Téléchargement',
    overall_progress: 'Progression globale',
    recent_updates: 'Mises à jour récentes',
    no_changelog: 'Aucun journal de modifications disponible.',
    create_shortcut_only_windows: 'Les raccourcis sont uniquement pris en charge sur Windows.',
    launch_failed: 'Échec du lancement',
    uninstall_success: '{{name}} a été désinstallé.',
    install_complete: 'Installation de {{name}} terminée !',
    repair_complete: 'Réparation de {{name}} terminée !',
    update_complete: 'Mise à jour de {{name}} terminée !',
    failed_uninstall: 'Échec de la désinstallation de {{name}}.',
    could_not_open_folder: "Impossible d'ouvrir le dossier. Le jeu est-il installé ?",
    shortcut_created: 'Raccourci créé sur le Bureau !',
    failed_create_shortcut: 'Échec de la création du raccourci. Voir la console pour les détails.',
    game_not_found: 'Jeu introuvable',
    online_play_unavailable: "Le jeu en ligne n'est pas disponible pour ce titre.",
    view_all_achievements: 'Voir toutes les Succès',
    all_achievements: 'Tous les Succès',
    launching: 'Lancement de {{name}}...',
    get_ready: "Préparez-vous pour l'aventure",
    close: 'Fermer',
    settings: 'Paramètres',
    settings_description: 'Configurez le lanceur selon vos besoins.',
    select_install_folder_title: "Sélectionnez le dossier d'installation des jeux",
    general: 'Général',
    manage_settings: 'Gérez les paramètres du lanceur',
    games_installation_folder: "Dossier d'installation des jeux",
    language_label: 'Langue',
    select_language_placeholder: 'Sélectionner la langue',
    update: 'Mise à jour',
    update_description: 'Version du lanceur et options de mise à jour',
    version_text: 'Version {{version}} (Refonte Tauri)',
    launcher_up_to_date: 'Votre lanceur est à jour.',
    force_update: 'Vérifier les mises à jour',
    about_community: 'À propos & Communauté',
    website: 'Site web',
    github: 'GitHub',
    footer_copy: '© 2026 Nytuo Launcher - Propulsé par Tauri & React',
    nytuo_launcher: 'Nytuo Launcher',
    unlocked: 'Débloqué',
    locked: 'Verrouillé',
  },
  es: {
    play: 'Jugar',
    install_now: 'Instalar',
    installing: 'Instalando...',
    update_to: 'Actualizar a v{{version}}',
    play_online: 'Jugar en línea',
    open_game_folder: 'Abrir carpeta del juego',
    open_save_folder: 'Abrir carpeta de partidas',
    repair_files: 'Reparar archivos',
    uninstall_game: 'Desinstalar juego',
    downloading: 'Descargando',
    overall_progress: 'Progreso general',
    recent_updates: 'Actualizaciones recientes',
    no_changelog: 'No hay registro de cambios disponible.',
    create_shortcut_only_windows: 'Los accesos directos solo son compatibles en Windows.',
    launch_failed: 'Error al iniciar',
    uninstall_success: '{{name}} ha sido desinstalado.',
    install_complete: '¡Instalación de {{name}} completada!',
    repair_complete: '¡Reparación de {{name}} completada!',
    update_complete: '¡Actualización de {{name}} completada!',
    failed_uninstall: 'Error al desinstalar {{name}}.',
    could_not_open_folder: 'No se pudo abrir la carpeta. ¿Está instalado el juego?',
    shortcut_created: '¡Acceso directo creado en el Escritorio!',
    failed_create_shortcut:
      'Error al crear el acceso directo. Consulte la consola para más detalles.',
    game_not_found: 'Juego no encontrado',
    online_play_unavailable: 'El juego en línea no está disponible para este título.',
    view_all_achievements: 'Ver todos los logros',
    all_achievements: 'Todos los logros',
    launching: 'Iniciando {{name}}...',
    get_ready: 'Prepárate para la aventura',
    close: 'Cerrar',
    settings: 'Ajustes',
    settings_description: 'Configura el lanzador a tu gusto.',
    select_install_folder_title: 'Selecciona la carpeta de instalación de juegos',
    general: 'General',
    manage_settings: 'Administra la configuración del lanzador',
    games_installation_folder: 'Carpeta de instalación de juegos',
    language_label: 'Idioma',
    select_language_placeholder: 'Seleccionar idioma',
    update: 'Actualizar',
    update_description: 'Versión del lanzador y opciones de actualización',
    version_text: 'Versión {{version}} (Tauri Remake)',
    launcher_up_to_date: 'Tu lanzador está actualizado.',
    force_update: 'Comprobar actualizaciones',
    about_community: 'Acerca & Comunidad',
    website: 'Sitio web',
    github: 'GitHub',
    footer_copy: '© 2026 Nytuo Launcher - Impulsado por Tauri & React',
    nytuo_launcher: 'Nytuo Launcher',
    unlocked: 'Desbloqueado',
    locked: 'Bloqueado',
  },
};

const I18nContext = createContext({
  lang: 'en',
  setLang: (_l: string) => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const storeLang = useSettingsStore((s) => s.language);
  const setStoreLanguage = useSettingsStore((s) => s.setLanguage);
  const [lang, setLangState] = useState(storeLang || 'en');

  useEffect(() => {
    if (storeLang && storeLang !== lang) setLangState(storeLang);
  }, [storeLang]);

  const setLang = (l: string) => {
    setLangState(l);
    setStoreLanguage(l);
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function interp(template: string, vars?: Record<string, any>) {
  if (!vars) return template;
  return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, k) => {
    const v = vars[k];
    return v === undefined || v === null ? '' : String(v);
  });
}

export function useTranslation() {
  const { lang, setLang } = useContext(I18nContext);
  const t = (key: string, vars?: Record<string, any>) => {
    const dict = translations[lang] || translations['en'];
    const v = dict[key] ?? key;
    return interp(v, vars);
  };
  return { t, lang, setLang } as const;
}

export default useTranslation;
