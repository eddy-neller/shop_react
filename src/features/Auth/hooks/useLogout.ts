"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { removeAuthToken } from "@/lib/api/httpClient";
import { removeAuthLogoutListener } from "@/features/Auth/utils/authEventListener";

/**
 * Hook pour gérer la déconnexion
 */
export const useLogout = () => {
  const router = useRouter();

  const clearAndRedirect = useCallback(
    (reason?: string) => {
      // Supprimer l'event listener lors de la déconnexion
      removeAuthLogoutListener();

      // Supprimer le token du localStorage
      removeAuthToken();

      // Afficher un message approprié selon la raison
      if (reason) {
        const logoutMessages: Record<
          string,
          {
            type: "success" | "warning" | "error" | "info";
            title: string;
            description: string;
          }
        > = {
          expired: {
            type: "warning",
            title: "Session expirée",
            description: "Votre session a expiré. Veuillez vous reconnecter.",
          },
          invalid: {
            type: "error",
            title: "Session invalide",
            description:
              "Votre token de session est invalide. Veuillez vous reconnecter.",
          },
          missing: {
            type: "info",
            title: "Authentification requise",
            description: "Veuillez vous connecter pour accéder à cette page.",
          },
          others: {
            type: "error",
            title: "Accès non autorisé",
            description:
              "Vous n'êtes pas autorisé à accéder à cette ressource. Veuillez vous reconnecter.",
          },
        };

        const config = logoutMessages[reason] || logoutMessages.others;
        toast[config.type](config.title, {
          description: config.description,
          duration: 5000,
        });
      }

      // Déconnexion NextAuth et redirection
      signOut({ redirect: false }).then(() => {
        router.push("/login");
        router.refresh();
      });
    },
    [router]
  );

  // Déconnexion manuelle (clic bouton)
  const logout = useCallback(() => {
    clearAndRedirect();
  }, [clearAndRedirect]);

  return { logout, clearAndRedirect };
};
