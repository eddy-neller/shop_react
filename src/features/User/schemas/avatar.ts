import { z } from "zod";

export const avatarFormSchema = z.object({
  avatarFile: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Veuillez sélectionner un fichier.",
    })
    .refine((files) => files[0]?.size <= 200 * 1024, {
      message: "Le fichier ne doit pas dépasser 200 Ko.",
    })
    .refine(
      (files) =>
        files[0]?.type === "image/jpeg" || files[0]?.type === "image/png",
      {
        message: "Le fichier doit être au format JPEG ou PNG.",
      }
    ),
});

export type AvatarFormData = z.infer<typeof avatarFormSchema>;
