import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .max(100, "L'email ne peut pas dépasser 100 caractères")
    .email("Format d'email invalide"),
});

export type PasswordResetRequestFormData = z.infer<
  typeof passwordResetRequestSchema
>;

export const passwordResetConfirmSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Le mot de passe est requis")
      .regex(
        PASSWORD_REGEX,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      ),
    confirmNewPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmNewPassword"],
  });

export type PasswordResetConfirmFormData = z.infer<
  typeof passwordResetConfirmSchema
>;
