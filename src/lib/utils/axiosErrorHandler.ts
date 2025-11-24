import { AxiosError } from "axios";
import { toast } from "sonner";
import { UseFormSetError } from "react-hook-form";

export interface Violation {
  propertyPath: string;
  message: string;
}

/**
 * Gestionnaire centralisé des erreurs Axios
 * Gère les patterns d'erreurs courants comme 429 (rate limit) et 422 (erreurs de validation)
 */
export const handleAxiosError = (
  error: unknown,
  setError?: UseFormSetError<any>, // eslint-disable-line @typescript-eslint/no-explicit-any
  showToast?: boolean,
  defaultMessage?: string
): void => {
  if (!(error instanceof AxiosError)) {
    if (showToast) {
      toast.error(defaultMessage || "Une erreur est survenue");
    }
    return;
  }

  const response = error.response;

  // 🔒 429 Too Many Requests (Rate Limit)
  if (response?.status === 429) {
    const message = "Trop de requêtes. Veuillez réessayer plus tard.";
    if (showToast) {
      toast.error("Limite de requêtes atteinte", {
        description: message,
      });
    }
    return;
  }

  // 🔎 422 Validation errors
  if (response?.status === 422 && response.data?.violations) {
    const violations: Violation[] = response.data.violations;

    if (setError) {
      violations.forEach((violation: Violation) => {
        setError(violation.propertyPath as string, {
          type: "server",
          message: violation.message,
        });
      });
    }

    if (showToast) {
      toast.error("Erreur de validation", {
        description: "Veuillez vérifier les champs du formulaire.",
      });
    }
    return;
  }

  // 🚫 403 Forbidden
  if (response?.status === 403) {
    const message = "Vous n'avez pas la permission d'effectuer cette action.";
    if (showToast) {
      toast.error("Accès refusé", {
        description: message,
      });
    }
    return;
  }

  // 🔍 404 Not Found
  if (response?.status === 404) {
    const message = "La ressource demandée n'a pas été trouvée.";
    if (showToast) {
      toast.error("Ressource introuvable", {
        description: message,
      });
    }
    return;
  }

  // ⚠️ 500+ Server errors
  if (response?.status && response.status >= 500) {
    const message =
      "Une erreur serveur est survenue. Veuillez réessayer plus tard.";
    if (showToast) {
      toast.error("Erreur serveur", {
        description: message,
      });
    }
    return;
  }

  // 🌐 Network errors (no response)
  if (!response) {
    const message = "Erreur réseau. Veuillez vérifier votre connexion.";
    if (showToast) {
      toast.error("Erreur de connexion", {
        description: message,
      });
    }
    return;
  }

  // 📝 Generic error handling
  if (showToast) {
    const errorMessage =
      response.data?.message ||
      defaultMessage ||
      "Une erreur est survenue lors de l'envoi du message.";

    toast.error("Erreur", {
      description: errorMessage,
    });
  }
};
