// One-off helper: merges the launcher's new UI strings into assets/data/{en,fr,es}.json.
const fs = require("fs");
const path = require("path");

const add = {
  en: {
    uninstall_confirm: "All installed files will be deleted from your computer, including saves stored in the game folder.",
    cancel: "Cancel",
    checking_updates: "Checking for updates...",
    hero_update_ready: "Update ready",
    hero_jump_back: "Jump back in",
    hero_featured: "Featured",
    details: "Details",
    manage: "Manage",
    create_shortcut: "Desktop shortcut",
    tab_overview: "Overview",
    tab_achievements: "Achievements",
    no_description: "No description available.",
    installed_version: "Installed version",
    latest_version: "Latest version",
    developers: "Developers",
    release_date: "Release date",
    status: "Status",
    location: "Location",
    about: "About",
    no_achievements: "No achievements for this game.",
    no_gallery: "No screenshots available.",
    watch_video: "Watch video",
    change: "Change",
    view_release: "View release",
  },
  fr: {
    uninstall_confirm: "Tous les fichiers installés seront supprimés de votre ordinateur, y compris les sauvegardes du dossier du jeu.",
    cancel: "Annuler",
    checking_updates: "Recherche de mises à jour...",
    hero_update_ready: "Mise à jour disponible",
    hero_jump_back: "Reprendre",
    hero_featured: "À la une",
    details: "Détails",
    manage: "Gérer",
    create_shortcut: "Raccourci bureau",
    tab_overview: "Aperçu",
    tab_achievements: "Succès",
    no_description: "Aucune description disponible.",
    installed_version: "Version installée",
    latest_version: "Dernière version",
    developers: "Développeurs",
    release_date: "Date de sortie",
    status: "Statut",
    location: "Emplacement",
    about: "À propos",
    no_achievements: "Aucun succès pour ce jeu.",
    no_gallery: "Aucune capture d'écran disponible.",
    watch_video: "Voir la vidéo",
    change: "Modifier",
    view_release: "Voir la version",
  },
  es: {
    uninstall_confirm: "Se eliminarán todos los archivos instalados, incluidas las partidas guardadas en la carpeta del juego.",
    cancel: "Cancelar",
    checking_updates: "Buscando actualizaciones...",
    hero_update_ready: "Actualización lista",
    hero_jump_back: "Continuar",
    hero_featured: "Destacado",
    details: "Detalles",
    manage: "Gestionar",
    create_shortcut: "Acceso directo",
    tab_overview: "Resumen",
    tab_achievements: "Logros",
    no_description: "No hay descripción disponible.",
    installed_version: "Versión instalada",
    latest_version: "Última versión",
    developers: "Desarrolladores",
    release_date: "Fecha de lanzamiento",
    status: "Estado",
    location: "Ubicación",
    about: "Acerca de",
    no_achievements: "Este juego no tiene logros.",
    no_gallery: "No hay capturas disponibles.",
    watch_video: "Ver vídeo",
    change: "Cambiar",
    view_release: "Ver versión",
  },
};

for (const lang of Object.keys(add)) {
  const file = path.join(__dirname, "..", "assets", "data", lang + ".json");
  const dict = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const [k, v] of Object.entries(add[lang])) if (!(k in dict)) dict[k] = v;
  // The old string advertised the Tauri remake.
  dict.version_text = dict.version_text.replace(/ \(.*\)$/, "");
  fs.writeFileSync(file, JSON.stringify(dict, null, 1));
}
console.log("ok");
