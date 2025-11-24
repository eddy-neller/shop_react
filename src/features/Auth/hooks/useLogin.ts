import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { SignInResponse } from "next-auth/react";
import { useLogout } from "@/features/Auth/hooks/useLogout";
import { setupAuthLogoutListener } from "@/features/Auth/utils/authEventListener";
import type { LoginFormData } from "@/features/Auth/schemas/login";
import type { LoginCredentials } from "@/features/Auth/types/auth";

const loginWithNextAuth = async (
  credentials: LoginCredentials
): Promise<SignInResponse> => {
  const result = await signIn("credentials", {
    email: credentials.email,
    password: credentials.password,
    redirect: false,
  });

  // signIn peut retourner undefined dans certains cas
  if (!result) {
    return {
      error: "AUTH_ERROR",
      ok: false,
      status: 500,
      url: null,
    };
  }

  return result;
};

export const useLogin = () => {
  const router = useRouter();
  const { clearAndRedirect } = useLogout();

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) =>
      loginWithNextAuth({
        email: data.email,
        password: data.password,
      }),
    onSuccess: (result) => {
      if (result?.error) {
        toast.error("Identifiants invalides", {
          description: "Veuillez vérifier votre email et votre mot de passe.",
        });
      } else if (result?.ok) {
        // Initialiser l'event listener pour les déconnexions automatiques
        setupAuthLogoutListener(clearAndRedirect);

        router.push("/user");
        router.refresh();
      }
    },
    onError: () => {
      toast.error("Erreur lors de la connexion", {
        description: "Veuillez réessayer plus tard.",
      });
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
