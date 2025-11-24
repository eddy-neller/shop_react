"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  passwordResetConfirmSchema,
  type PasswordResetConfirmFormData,
} from "@/features/Auth/schemas/passwordReset";
import { confirmPasswordReset } from "@/features/Auth/services/auth";
import { handleAxiosError } from "@/lib/utils/axiosErrorHandler";

interface ResetPasswordConfirmFormProps {
  token: string;
}

export default function ResetPasswordConfirmForm({
  token,
}: ResetPasswordConfirmFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetConfirmFormData>({
    resolver: zodResolver(passwordResetConfirmSchema),
  });

  const passwordWatch = watch("newPassword");
  const confirmPasswordWatch = watch("confirmNewPassword");

  // Validation en temps réel pour confirmNewPassword quand newPassword change
  useEffect(() => {
    if (confirmPasswordWatch) {
      if (passwordWatch !== confirmPasswordWatch) {
        setError("confirmNewPassword", {
          type: "manual",
          message: "Les mots de passe ne correspondent pas",
        });
      } else {
        clearErrors("confirmNewPassword");
      }
    }
  }, [passwordWatch, confirmPasswordWatch, setError, clearErrors]);

  const mutation = useMutation({
    mutationFn: (data: PasswordResetConfirmFormData) =>
      confirmPasswordReset({
        token,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      }),
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("Mot de passe réinitialisé avec succès", {
        description: "Vous allez être redirigé vers la page de connexion.",
      });
      // Rediriger vers login après un court délai
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    },
    onError: (error) => {
      handleAxiosError(
        error,
        setError,
        true,
        "Une erreur est survenue lors de la réinitialisation du mot de passe."
      );
    },
  });

  const onSubmit = (data: PasswordResetConfirmFormData) => {
    mutation.mutate(data);
  };

  const isBusy = isSubmitting || mutation.isPending;

  if (isSuccess) {
    return (
      <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <div className="text-center">
          <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-600 dark:text-green-400" />
          <AlertDescription className="font-semibold mb-2">
            Mot de passe réinitialisé avec succès !
          </AlertDescription>
          <AlertDescription className="text-sm">
            Votre mot de passe a été modifié. Vous allez être redirigé vers la
            page de connexion dans quelques secondes.
          </AlertDescription>
        </div>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FieldGroup>
        {/* New Password */}
        <Field data-invalid={!!errors.newPassword}>
          <FieldLabel htmlFor="newPassword">Nouveau mot de passe</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                className={`pl-10 pr-10 ${errors.newPassword ? "border-destructive" : ""}`}
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <FieldError
              errors={errors.newPassword ? [errors.newPassword] : undefined}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Le mot de passe doit contenir au moins 8 caractères, une
              majuscule, une minuscule, un chiffre et un caractère spécial
            </p>
          </FieldContent>
        </Field>

        {/* Confirm New Password */}
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
                placeholder="••••••••"
                autoComplete="new-password"
                className={`pl-10 pr-10 ${errors.confirmNewPassword ? "border-destructive" : ""}`}
                {...register("confirmNewPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={
                  showConfirmPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
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

      <div className="flex justify-center mt-3">
        <LoadingButton
          variant="default"
          type="submit"
          isBusy={isBusy}
          icon={<CheckCircle className="h-4 w-4" />}
          label="Réinitialiser le mot de passe"
          busyLabel="Réinitialisation en cours..."
          className="bg-blue-600 hover:bg-blue-700 text-white"
        />
      </div>
    </form>
  );
}
