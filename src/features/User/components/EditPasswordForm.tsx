"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Lock, Key } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { updatePassword } from "@/features/User/services/user";
import {
  editPasswordFormSchema,
  type EditPasswordFormData,
} from "@/features/User/schemas/password";
import { toast } from "sonner";
import { handleAxiosError } from "@/lib/utils/axiosErrorHandler";

export default function EditPasswordForm() {
  const router = useRouter();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<EditPasswordFormData>({
    resolver: zodResolver(editPasswordFormSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: EditPasswordFormData) => updatePassword(data),
    onSuccess: () => {
      toast.success("Mot de passe mis à jour avec succès !");
      router.push("/user/profile");
      router.refresh();
    },
    onError: (error: unknown) => {
      handleAxiosError(
        error,
        setError,
        true,
        "Une erreur est survenue lors de la mise à jour du mot de passe."
      );
    },
  });

  const onSubmit = (data: EditPasswordFormData) => {
    mutation.mutate(data);
  };

  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");

  // Validation en temps réel : nouveau mot de passe différent de l'actuel
  useEffect(() => {
    if (newPassword && currentPassword) {
      if (newPassword === currentPassword) {
        setError("newPassword", {
          type: "manual",
          message:
            "Le nouveau mot de passe doit être différent du mot de passe actuel",
        });
      } else {
        clearErrors("newPassword");
      }
    }
  }, [newPassword, currentPassword, setError, clearErrors]);

  // Validation en temps réel : confirmation du mot de passe
  useEffect(() => {
    if (confirmNewPassword) {
      if (newPassword !== confirmNewPassword) {
        setError("confirmNewPassword", {
          type: "manual",
          message: "Les mots de passe ne correspondent pas",
        });
      } else {
        clearErrors("confirmNewPassword");
      }
    }
  }, [newPassword, confirmNewPassword, setError, clearErrors]);

  const isBusy = isSubmitting || mutation.isPending;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Modifier le mot de passe</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">
          Pour modifier votre mot de passe, veuillez renseigner votre mot de
          passe actuel ainsi que votre nouveau mot de passe.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <FieldGroup>
            {/* Mot de passe actuel */}
            <Field data-invalid={!!errors.currentPassword}>
              <FieldLabel htmlFor="currentPassword">
                Mot de passe actuel
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Entrez votre mot de passe actuel"
                    className={`pl-10 pr-10 ${
                      errors.currentPassword ? "border-destructive" : ""
                    }`}
                    {...register("currentPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={
                      showCurrentPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <FieldError
                  errors={
                    errors.currentPassword
                      ? [errors.currentPassword]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>

            <Separator className="my-6" />

            {/* Nouveau mot de passe */}
            <Field data-invalid={!!errors.newPassword}>
              <FieldLabel htmlFor="newPassword">
                Nouveau mot de passe
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Entrez votre nouveau mot de passe"
                    className={`pl-10 pr-10 ${
                      errors.newPassword ? "border-destructive" : ""
                    }`}
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={
                      showNewPassword
                        ? "Masquer le nouveau mot de passe"
                        : "Afficher le nouveau mot de passe"
                    }
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <FieldError
                  errors={errors.newPassword ? [errors.newPassword] : undefined}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Le mot de passe doit contenir entre 8 et 30 caractères, au
                  moins une majuscule, un chiffre et un caractère spécial
                  (()!@#$%^&*_-).
                </p>
              </FieldContent>
            </Field>

            {/* Confirmation du nouveau mot de passe */}
            <Field data-invalid={!!errors.confirmNewPassword}>
              <FieldLabel htmlFor="confirmNewPassword">
                Confirmer le nouveau mot de passe
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmNewPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmez votre nouveau mot de passe"
                    className={`pl-10 pr-10 ${
                      errors.confirmNewPassword ? "border-destructive" : ""
                    }`}
                    {...register("confirmNewPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={
                      showConfirmPassword
                        ? "Masquer la confirmation du mot de passe"
                        : "Afficher la confirmation du mot de passe"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <FieldError
                  errors={
                    errors.confirmNewPassword
                      ? [errors.confirmNewPassword]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>
          </FieldGroup>

          {/* Actions */}
          <div className="pt-4 mt-6">
            <LoadingButton
              type="submit"
              variant="default"
              size="lg"
              className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-100 font-medium"
              isBusy={isBusy}
              label="Mettre à jour le mot de passe"
              busyLabel="Mise à jour en cours..."
              icon={<Key className="h-4 w-4" />}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
