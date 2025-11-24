"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Mail, Send } from "lucide-react";
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
  passwordResetRequestSchema,
  type PasswordResetRequestFormData,
} from "@/features/Auth/schemas/passwordReset";
import { requestPasswordReset } from "@/features/Auth/services/auth";
import { handleAxiosError } from "@/lib/utils/axiosErrorHandler";

export default function ResetPasswordRequestForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetRequestFormData>({
    resolver: zodResolver(passwordResetRequestSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: PasswordResetRequestFormData) =>
      requestPasswordReset({ email: data.email }),
    onSuccess: (_res, variables) => {
      toast.success("Email envoyé avec succès", {
        description: "Un email de réinitialisation vous a été envoyé.",
      });

      // Stocker l'email dans sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("forgotPasswordEmail", variables.email);
      }
      router.push("/forgot-password/success");
    },
    onError: (error) => {
      handleAxiosError(
        error,
        setError,
        true,
        "Une erreur est survenue lors de l'envoi de l'email."
      );
    },
  });

  const onSubmit = (data: PasswordResetRequestFormData) => {
    mutation.mutate(data);
  };

  const isBusy = isSubmitting || mutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FieldGroup>
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
      </FieldGroup>

      <div className="flex justify-center mt-3">
        <LoadingButton
          variant="default"
          type="submit"
          isBusy={isBusy}
          icon={<Send className="h-4 w-4" />}
          label="Envoyer l'email de réinitialisation"
          busyLabel="Envoi en cours..."
          className="bg-blue-600 hover:bg-blue-700 text-white"
        />
      </div>
    </form>
  );
}
