"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";
import {
  registerSchema,
  type RegisterFormData,
} from "@/features/Auth/schemas/register";
import { registration } from "@/features/Auth/services/auth";
import { handleAxiosError } from "@/lib/utils/axiosErrorHandler";
import type { LangCode, RegistrationPayload } from "@/features/Auth/types/auth";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordWatch = watch("password");
  const confirmPasswordWatch = watch("confirmPassword");

  // Validation en temps réel pour confirmPassword quand password change
  useEffect(() => {
    if (confirmPasswordWatch) {
      if (passwordWatch !== confirmPasswordWatch) {
        setError("confirmPassword", {
          type: "manual",
          message: "Les mots de passe ne correspondent pas",
        });
      } else {
        clearErrors("confirmPassword");
      }
    }
  }, [passwordWatch, confirmPasswordWatch, setError, clearErrors]);

  const getDefaultLang = (): LangCode => {
    return "FR" as LangCode;
  };

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormData): Promise<void> => {
      const payload: RegistrationPayload = {
        email: data.email.trim(),
        username: data.username.trim(),
        password: data.password,
        confirmPassword: data.confirmPassword,
        preferences: {
          lang: getDefaultLang(),
        },
      };
      return registration(payload);
    },
    onSuccess: (_data, variables) => {
      toast.success("Inscription réussie", {
        description: "Un email de confirmation vous a été envoyé.",
      });

      // Stocker l'email dans sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("registerEmail", variables.email);
      }
      router.push("/register/success");
    },
    onError: (error: unknown) => {
      handleAxiosError(
        error,
        setError,
        true,
        "Une erreur est survenue lors de l'inscription."
      );
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  const isBusy = isSubmitting || mutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Honeypots */}
      <input
        type="text"
        name="fake-username"
        autoComplete="username"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
      <input
        type="password"
        name="fake-password"
        autoComplete="password"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      <FieldGroup>
        {/* Email */}
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                {...register("email")}
              />
            </div>
            <FieldError errors={errors.email ? [errors.email] : undefined} />
          </FieldContent>
        </Field>

        {/* Username */}
        <Field data-invalid={!!errors.username}>
          <FieldLabel htmlFor="username">Nom d&apos;utilisateur</FieldLabel>
          <FieldContent>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="nom_utilisateur"
                autoComplete="off"
                className={`pl-10 ${errors.username ? "border-destructive" : ""}`}
                {...register("username")}
              />
            </div>
            <FieldError
              errors={errors.username ? [errors.username] : undefined}
            />
          </FieldContent>
        </Field>

        {/* Password */}
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="off"
                className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                {...register("password")}
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
              errors={errors.password ? [errors.password] : undefined}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Le mot de passe doit contenir au moins 8 caractères, une
              majuscule, une minuscule, un chiffre et un caractère spécial
            </p>
          </FieldContent>
        </Field>

        {/* Confirm Password */}
        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword">
            Confirmer le mot de passe
          </FieldLabel>
          <FieldContent>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                {...register("confirmPassword")}
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
                errors.confirmPassword ? [errors.confirmPassword] : undefined
              }
            />
          </FieldContent>
        </Field>
      </FieldGroup>

      <LoadingButton
        type="submit"
        size="lg"
        className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-medium"
        isBusy={isBusy}
        label="Créer un compte"
        busyLabel="Inscription en cours..."
        icon={<UserPlus className="h-4 w-4" />}
      />
    </form>
  );
}
