import type { User } from "@/features/User/types/user";
import { serverApiClient } from "@/lib/api/serverApiClient";
import httpClient from "@/lib/api/httpClient";

/**
 * Récupère les informations de l'utilisateur connecté
 */
export const getMe = async (): Promise<User> => {
  return serverApiClient.get<User>("/users/me");
};

/**
 * Récupère les informations d'un utilisateur par son ID
 * @param id - L'ID de l'utilisateur
 */
export const getUser = async (id: string): Promise<User> => {
  return serverApiClient.get<User>(`/users/${id}`);
};

/**
 * Met à jour l'avatar de l'utilisateur
 * @param avatarFile - Le fichier image à uploader
 * @returns Promise avec les données utilisateur mises à jour
 */
export const updateAvatar = async (avatarFile: File): Promise<User> => {
  const formData = new FormData();
  formData.append("avatarFile", avatarFile);

  const response = await httpClient.post<User>("/users/me/avatar", formData);
  return response.data;
};

/**
 * Met à jour le mot de passe de l'utilisateur
 * @param data - Les données du formulaire (currentPassword, newPassword, confirmNewPassword)
 * @returns Promise avec les données utilisateur mises à jour
 */
export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}): Promise<User> => {
  const response = await httpClient.patch<User>(
    "/users/me/update-password",
    {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    },
    {
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
    }
  );
  return response.data;
};
