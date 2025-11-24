"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import LoadingButton from "@/components/LoadingButton";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateAvatar } from "@/features/User/services/user";
import {
  avatarFormSchema,
  type AvatarFormData,
} from "@/features/User/schemas/avatar";
import { toast } from "sonner";
import { handleAxiosError } from "@/lib/utils/axiosErrorHandler";
import { Upload } from "lucide-react";

export default function AvatarForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AvatarFormData>({
    resolver: zodResolver(avatarFormSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: AvatarFormData) => {
      const avatarFile = data.avatarFile[0];
      if (!avatarFile) {
        throw new Error("Aucun fichier sélectionné.");
      }
      return updateAvatar(avatarFile);
    },
    onSuccess: () => {
      toast.success("Avatar mis à jour avec succès !");
      router.push("/user/profile");
      router.refresh();
    },
    onError: (error: unknown) => {
      handleAxiosError(
        error,
        setError,
        true,
        "Une erreur est survenue lors de la mise à jour de l'avatar."
      );
    },
  });

  const onSubmit = (data: AvatarFormData) => {
    mutation.mutate(data);
  };

  const isBusy = isSubmitting || mutation.isPending;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Modifier l&apos;avatar</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={!!errors.avatarFile}>
              <FieldLabel
                htmlFor="avatarFile"
                className="text-gray-900 dark:text-gray-100 font-semibold"
              >
                Fichier image
              </FieldLabel>
              <FieldContent>
                <input
                  id="avatarFile"
                  type="file"
                  accept="image/jpeg, image/png"
                  {...register("avatarFile")}
                  className="block w-full text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/20 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
                />
                <p className="mt-1 text-sm text-muted-foreground">
                  Formats acceptés : JPEG, PNG. Taille maximale : 200 Ko.
                </p>
                <FieldError
                  errors={errors.avatarFile ? [errors.avatarFile] : undefined}
                />
              </FieldContent>
            </Field>
          </FieldGroup>

          <div className="pt-4 mt-6">
            <LoadingButton
              type="submit"
              variant="default"
              size="lg"
              className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-100 font-medium"
              isBusy={isBusy}
              label="Mettre à jour l'avatar"
              busyLabel="Upload en cours..."
              icon={<Upload className="h-4 w-4" />}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
