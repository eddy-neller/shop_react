import { z } from "zod";

export const resendActivationSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .max(100, "L'email ne peut pas dépasser 100 caractères")
    .email("Format d'email invalide"),
});

export type ResendActivationFormData = z.infer<typeof resendActivationSchema>;
