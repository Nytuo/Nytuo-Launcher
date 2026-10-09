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
    download_already_in_progress: 'Another download is already in progress. Please wait for it to finish.',
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
    home: 'Home',
    search_games_placeholder: 'Search games...',
    filter_all: 'All',
    filter_installed: 'Installed',
    filter_not_installed: 'Not Installed',
    no_games_match: 'No games match your search.',
    library_subtitle: '{{count}} of {{total}} games installed',
    more_from_nytuo: 'More from Nytuo',
    more_from_nytuo_subtitle:
      'Other apps and tools from nytuo.fr — downloadable here, but not managed like your games.',
    installed: 'Installed',
    web_only: 'Web Only',
    web_only_notice: "This title isn't packaged for the launcher yet — play it online instead.",
    visit_website: 'Visit Website',
    view_on_itch: 'View on itch.io',
    view_on_gamejolt: 'View on Game Jolt',
    download_and_run_installer: 'Download & Run Installer',
    creation_not_managed_notice:
      "The launcher only downloads and opens this installer — it doesn't track or update it afterward. Most of these apps include their own built-in updater.",
    downloading_installer: 'Downloading the latest {{name}} installer...',
    installer_launched: '{{name}} installer launched — follow the on-screen instructions.',
    installer_not_found: 'Could not find a {{name}} installer for your platform. Opening GitHub...',
    installer_failed: 'Failed to download the {{name}} installer.',
    creation_not_found: 'Project not found',
    features_title: 'What {{name}} does',
    documentation_title: 'Documentation',
    documentation_subtitle: 'Installation guides, usage instructions, and troubleshooting.',
    view_documentation: 'View Documentation',
    copied_to_clipboard: 'Copied to clipboard!',
    copy: 'Copy',
    get_title: 'Get {{name}}',
    gallery_title: 'Gallery',
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
    download_already_in_progress:
      'Un autre téléchargement est déjà en cours. Veuillez attendre la fin.',
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
    home: 'Accueil',
    search_games_placeholder: 'Rechercher un jeu...',
    filter_all: 'Tous',
    filter_installed: 'Installés',
    filter_not_installed: 'Non installés',
    no_games_match: 'Aucun jeu ne correspond à votre recherche.',
    library_subtitle: '{{count}} jeux installés sur {{total}}',
    more_from_nytuo: 'Autres créations de Nytuo',
    more_from_nytuo_subtitle:
      "D'autres applications et outils de nytuo.fr — téléchargeables ici, mais pas gérés comme vos jeux.",
    installed: 'Installé',
    web_only: 'En ligne uniquement',
    web_only_notice:
      "Ce titre n'est pas encore empaqueté pour le lanceur — jouez-y en ligne à la place.",
    visit_website: 'Visiter le site',
    view_on_itch: 'Voir sur itch.io',
    view_on_gamejolt: 'Voir sur Game Jolt',
    download_and_run_installer: "Télécharger et lancer l'installeur",
    creation_not_managed_notice:
      "Le lanceur se contente de télécharger et d'ouvrir cet installeur — il ne le suit ni ne le met à jour ensuite. La plupart de ces applications intègrent leur propre système de mise à jour.",
    downloading_installer: "Téléchargement du dernier installeur de {{name}}...",
    installer_launched: "Installeur de {{name}} lancé — suivez les instructions à l'écran.",
    installer_not_found:
      "Impossible de trouver un installeur de {{name}} pour votre plateforme. Ouverture de GitHub...",
    installer_failed: "Échec du téléchargement de l'installeur de {{name}}.",
    creation_not_found: 'Projet introuvable',
    features_title: 'Ce que {{name}} propose',
    documentation_title: 'Documentation',
    documentation_subtitle: "Guides d'installation, d'utilisation et de dépannage.",
    view_documentation: 'Voir la documentation',
    copied_to_clipboard: 'Copié dans le presse-papiers !',
    copy: 'Copier',
    get_title: 'Obtenir {{name}}',
    gallery_title: 'Galerie',
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
    download_already_in_progress: 'Ya hay otra descarga en curso. Espera a que termine.',
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
    home: 'Inicio',
    search_games_placeholder: 'Buscar juegos...',
    filter_all: 'Todos',
    filter_installed: 'Instalados',
    filter_not_installed: 'No instalados',
    no_games_match: 'Ningún juego coincide con tu búsqueda.',
    library_subtitle: '{{count}} de {{total}} juegos instalados',
    more_from_nytuo: 'Más de Nytuo',
    more_from_nytuo_subtitle:
      'Otras aplicaciones y herramientas de nytuo.fr — descargables aquí, pero no gestionadas como tus juegos.',
    installed: 'Instalado',
    web_only: 'Solo en línea',
    web_only_notice: 'Este título aún no está empaquetado para el lanzador — juégalo en línea.',
    visit_website: 'Visitar sitio web',
    view_on_itch: 'Ver en itch.io',
    view_on_gamejolt: 'Ver en Game Jolt',
    download_and_run_installer: 'Descargar y ejecutar el instalador',
    creation_not_managed_notice:
      'El lanzador solo descarga y abre este instalador — no lo rastrea ni lo actualiza después. La mayoría de estas apps incluyen su propio actualizador.',
    downloading_installer: 'Descargando el último instalador de {{name}}...',
    installer_launched: 'Instalador de {{name}} iniciado — sigue las instrucciones en pantalla.',
    installer_not_found:
      'No se encontró un instalador de {{name}} para tu plataforma. Abriendo GitHub...',
    installer_failed: 'Error al descargar el instalador de {{name}}.',
    creation_not_found: 'Proyecto no encontrado',
    features_title: 'Lo que ofrece {{name}}',
    documentation_title: 'Documentación',
    documentation_subtitle: 'Guías de instalación, uso y solución de problemas.',
    view_documentation: 'Ver documentación',
    copied_to_clipboard: '¡Copiado al portapapeles!',
    copy: 'Copiar',
    get_title: 'Obtener {{name}}',
    gallery_title: 'Galería',
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
