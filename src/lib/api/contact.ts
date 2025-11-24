import httpClient from "@/lib/api/httpClient";
import type { ContactFormData } from "@/schemas/contact";

/**
 * Envoie un email via l'API de contact
 * @param data - Les données du formulaire de contact
 * @returns Promise avec la réponse de l'API
 */
export const sendEmail = async (
  data: ContactFormData
): Promise<{ message: string }> => {
  const response = await httpClient.post<{ message: string }>(
    "/util/send-mail",
    data
  );
  return response.data;
};
