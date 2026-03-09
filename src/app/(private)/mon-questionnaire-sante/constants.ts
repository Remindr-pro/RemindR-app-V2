/**
 * Constantes partagées du questionnaire santé.
 * Fichier sans "use client" pour être utilisable depuis les Server Components
 * (pages mesures, maladies, habitudes) et le Client Component (layout, page).
 */
export const BASE_PATH = "/mon-questionnaire-sante";

/** Paramètre de recherche pour ouvrir le questionnaire ciblé sur un profil (ex. depuis la page Membres). */
export const PROFILE_ID_SEARCH_PARAM = "profileId";
