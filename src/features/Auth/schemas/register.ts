import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "L'email est requis")
      .min(4, "L'email doit contenir au moins 4 caractères")
      .max(100, "L'email ne peut pas dépasser 100 caractères")
      .email("Format d'email invalide"),
    username: z
      .string()
      .min(1, "Le nom d'utilisateur est requis")
      .min(2, "Le nom d'utilisateur doit contenir au moins 2 caractères")
      .max(20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères"),
    password: z
      .string()
      .min(1, "Le mot de passe est requis")
      .regex(
        PASSWORD_REGEX,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      ),
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
