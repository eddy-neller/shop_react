"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  setAuthToken,
  removeAuthToken,
  getAuthToken,
} from "@/lib/api/httpClient";
import { useLogout } from "@/features/Auth/hooks/useLogout";
import {
  setupAuthLogoutListener,
  isAuthLogoutListenerActive,
} from "@/features/Auth/utils/authEventListener";

/**
 * Composant pour synchroniser le token de la session NextAuth avec localStorage
 * Cela permet de maintenir la compatibilité avec httpClient qui utilise localStorage
 * Initialise également l'event listener pour les déconnexions automatiques
 */
export default function AuthTokenSync() {
  const { data: session } = useSession();
  const { clearAndRedirect } = useLogout();

  useEffect(() => {
    if (session?.accessToken) {
      // Stocker le token dans localStorage pour compatibilité avec httpClient
      setAuthToken(session.accessToken);

      // Initialiser l'event listener si l'utilisateur est déjà connecté au chargement
      if (!isAuthLogoutListenerActive()) {
        setupAuthLogoutListener(clearAndRedirect);
      }
    } else {
      // Supprimer le token si la session est fermée
      removeAuthToken();
    }
  }, [session, clearAndRedirect]);

  // Déconnexion automatique si le token est expiré
  useEffect(() => {
    if (!session && getAuthToken()) {
      window.dispatchEvent(
        new CustomEvent("auth:logout", {
          detail: { reason: "expired" },
        })
      );
    }
  }, [session]);

  return null;
}
