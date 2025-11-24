import axios, { AxiosError } from "axios";
import { ERROR_CODES } from "@/lib/utils/errorCodes";

// Normaliser l'URL de l'API (supprimer le trailing slash)
const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL as string)?.replace(/\/$/, "") || "";

// Validation : s'assurer que l'URL de l'API est définie
if (!API_BASE_URL) {
  console.error(
    "⚠️ NEXT_PUBLIC_API_URL n'est pas définie. Veuillez configurer cette variable dans votre fichier .env.local"
  );
}

const AUTH_STORAGE_KEY = "_auth_shop";

/**
 * Récupère le token JWT depuis le localStorage
 * Retourne null si on est côté serveur (SSR)
 */
export function getAuthToken(): string | null {
  // Vérifier si on est côté client (localStorage n'existe pas côté serveur)
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    return token ? token.trim() : null;
  } catch {
    return null;
  }
}

/**
 * Définit le token JWT dans le localStorage
 */
export function setAuthToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(AUTH_STORAGE_KEY, token);
}

/**
 * Supprime le token JWT du localStorage
 */
export function removeAuthToken(): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Récupère le code de langue préféré pour l'API
 * Retourne un code simple (en, fr) au lieu de la chaîne complète du navigateur
 */
function getAcceptLanguage(): string {
  if (typeof window === "undefined") {
    return "en";
  }

  try {
    // Essayer de récupérer depuis localStorage si disponible
    const stored =
      localStorage.getItem("locale") || localStorage.getItem("i18nextLng");
    if (stored && (stored === "en" || stored === "fr")) {
      return stored;
    }

    // Sinon, extraire le code de langue depuis navigator.language
    const browserLang = navigator.language || "en";
    const langCode = browserLang.split("-")[0].toLowerCase();

    // Retourner seulement si c'est une langue supportée, sinon "en" par défaut
    return langCode === "fr" ? "fr" : "en";
  } catch {
    return "en";
  }
}

/**
 * Déclenche un événement de déconnexion avec une raison spécifique
 * @param reason - La raison de la déconnexion (expired, invalid, missing, others)
 */
function handleLogout(reason?: string): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(
    new CustomEvent("auth:logout", {
      detail: { reason },
    })
  );
}

/**
 * Gère la déconnexion en cas d'erreur d'authentification
 */
function handleAuthError(): void {
  removeAuthToken();
}

/**
 * Instance Axios configurée pour l'API
 */
const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": getAcceptLanguage(),
  },
});

// Intercepteur de requête : ajoute le token JWT dans les headers
httpClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Mettre à jour le header Accept-Language à chaque requête
    if (config.headers) {
      config.headers["Accept-Language"] = getAcceptLanguage();
    }

    // Gestion des FormData (pour les uploads)
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse : gestion des erreurs d'authentification
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error?.response?.status;
    const url = error?.config?.url;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorCode = (error?.response?.data as any)?.message;

    // Gestion des erreurs 401 (non authentifié)
    // SAUF pour les endpoints où une erreur 401 est un comportement normal :
    // - /login : identifiants incorrects
    // - /token/invalidate : déconnexion avec token expiré
    const isLoginEndpoint = url === "/login" || url?.endsWith("/login");
    const isLogoutEndpoint =
      url === "/token/invalidate" || url?.endsWith("/token/invalidate");

    if (status === 401 && !isLoginEndpoint && !isLogoutEndpoint) {
      // Gestion spécifique des erreurs JWT
      if (errorCode) {
        switch (errorCode) {
          case ERROR_CODES.JWT.EXPIRED_TOKEN:
            handleLogout("expired");
            break;
          case ERROR_CODES.JWT.INVALID_TOKEN:
            handleLogout("invalid");
            break;
          case ERROR_CODES.JWT.MISSING_TOKEN:
            handleLogout("missing");
            break;
          // Pour BAD_CREDENTIALS, on laisse l'erreur remonter vers le formulaire de login
          default:
            // Autres erreurs 401 non-JWT ou erreurs inconnues
            handleAuthError();
            break;
        }
      } else {
        // Erreur 401 sans code d'erreur spécifique
        handleAuthError();
      }
    } else if (!error.response) {
      // Erreur réseau (pas de réponse du serveur)
      handleLogout("others");
    }

    return Promise.reject(error);
  }
);

export default httpClient;
