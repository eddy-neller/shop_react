/**
 * Client API pour les appels serveur (Server Components, Server Actions)
 * Gère automatiquement l'URL de base et les headers avec le token
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/features/Auth/lib/auth";

// Normaliser l'URL de l'API (supprimer le trailing slash)
const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL as string)?.replace(/\/$/, "") || "";

// Validation : s'assurer que l'URL de l'API est définie
if (!API_BASE_URL) {
  console.error(
    "⚠️ NEXT_PUBLIC_API_URL n'est pas définie. Veuillez configurer cette variable dans votre fichier .env.local"
  );
}

interface RequestOptions extends RequestInit {
  token?: string | null;
}

/**
 * Récupère automatiquement le token depuis la session NextAuth si disponible
 * @returns Le token d'accès ou null si non disponible
 */
async function getAuthToken(): Promise<string | null> {
  try {
    const session = await getServerSession(authOptions);
    return session?.accessToken ?? null;
  } catch {
    return null;
  }
}

/**
 * Effectue une requête API côté serveur avec gestion automatique de l'URL de base et des headers
 * @param endpoint - L'endpoint de l'API (ex: "/users/me")
 * @param options - Options de la requête fetch, incluant le token optionnel (si non fourni, récupéré automatiquement)
 * @returns Promise avec la réponse parsée en JSON
 * @throws Error si la requête échoue
 */
export async function serverApiRequest<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token: providedToken, headers = {}, ...fetchOptions } = options;

  // Récupérer le token : utiliser celui fourni ou récupérer automatiquement depuis NextAuth
  const token = providedToken ?? (await getAuthToken());

  // Construire l'URL complète
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  // Préparer les headers
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Ajouter le token d'authentification si disponible
  if (token) {
    if (Array.isArray(requestHeaders)) {
      requestHeaders.push(["Authorization", `Bearer ${token}`]);
    } else if (requestHeaders instanceof Headers) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    } else {
      (requestHeaders as Record<string, string>)["Authorization"] =
        `Bearer ${token}`;
    }
  }

  // Effectuer la requête
  const response = await fetch(url, {
    ...fetchOptions,
    headers: requestHeaders,
  });

  // Gérer les erreurs HTTP
  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  // Parser et retourner la réponse JSON
  return response.json();
}

/**
 * Méthodes HTTP simplifiées pour les appels API courants
 * Le token est récupéré automatiquement depuis NextAuth si non fourni
 */
export const serverApiClient = {
  /**
   * Effectue une requête GET
   * @param endpoint - L'endpoint de l'API
   * @param token - Token optionnel (récupéré automatiquement si non fourni)
   */
  get: <T = unknown>(endpoint: string, token?: string | null): Promise<T> => {
    return serverApiRequest<T>(endpoint, {
      method: "GET",
      token,
    });
  },

  /**
   * Effectue une requête POST
   * @param endpoint - L'endpoint de l'API
   * @param data - Les données à envoyer
   * @param token - Token optionnel (récupéré automatiquement si non fourni)
   */
  post: <T = unknown>(
    endpoint: string,
    data?: unknown,
    token?: string | null
  ): Promise<T> => {
    return serverApiRequest<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
      token,
    });
  },

  /**
   * Effectue une requête PUT
   * @param endpoint - L'endpoint de l'API
   * @param data - Les données à envoyer
   * @param token - Token optionnel (récupéré automatiquement si non fourni)
   */
  put: <T = unknown>(
    endpoint: string,
    data?: unknown,
    token?: string | null
  ): Promise<T> => {
    return serverApiRequest<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
      token,
    });
  },

  /**
   * Effectue une requête PATCH
   * @param endpoint - L'endpoint de l'API
   * @param data - Les données à envoyer
   * @param token - Token optionnel (récupéré automatiquement si non fourni)
   */
  patch: <T = unknown>(
    endpoint: string,
    data?: unknown,
    token?: string | null
  ): Promise<T> => {
    return serverApiRequest<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
      token,
    });
  },

  /**
   * Effectue une requête DELETE
   * @param endpoint - L'endpoint de l'API
   * @param token - Token optionnel (récupéré automatiquement si non fourni)
   */
  delete: <T = unknown>(
    endpoint: string,
    token?: string | null
  ): Promise<T> => {
    return serverApiRequest<T>(endpoint, {
      method: "DELETE",
      token,
    });
  },
};
