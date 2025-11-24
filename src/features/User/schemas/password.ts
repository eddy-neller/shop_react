import { z } from "zod";

// Regex pour valider le mot de passe : au moins 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial
const PASSWORD_REGEX = /^(?=.*[()!@#$%^&*_-])(?=.*\d)(?=.*[A-Z]).{8,30}$/;

export const editPasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
    newPassword: z
      .string()
      .min(1, "Le nouveau mot de passe est requis")
      .regex(
        PASSWORD_REGEX,
        "Le mot de passe doit contenir entre 8 et 30 caractères, au moins une majuscule, un chiffre et un caractère spécial"
      ),
    confirmNewPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message:
      "Le nouveau mot de passe doit être différent du mot de passe actuel",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmNewPassword"],
  });

export type EditPasswordFormData = z.infer<typeof editPasswordFormSchema>;
