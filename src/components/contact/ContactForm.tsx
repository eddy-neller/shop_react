"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/schemas/contact";
import LoadingButton from "@/components/LoadingButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "@/lib/api/contact";
import { toast } from "sonner";
import { handleAxiosError } from "@/lib/utils/axiosErrorHandler";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => sendEmail(data),
    onSuccess: () => {
      reset();
      toast.success("Message envoyé avec succès !", {
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
    },
    onError: (error: unknown) => {
      handleAxiosError(
        error,
        setError,
        true,
        "Une erreur est survenue lors de l'envoi du message."
      );
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  const isBusy = isSubmitting || mutation.isPending;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Contactez-nous</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Nom complet</FieldLabel>
              <FieldContent>
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                <FieldError errors={errors.name ? [errors.name] : undefined} />
              </FieldContent>
            </Field>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                <FieldError
                  errors={errors.email ? [errors.email] : undefined}
                />
              </FieldContent>
            </Field>

            <Field data-invalid={!!errors.subject}>
              <FieldLabel htmlFor="subject">Sujet</FieldLabel>
              <FieldContent>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Sujet de votre message"
                  {...register("subject")}
                  className={errors.subject ? "border-destructive" : ""}
                />
                <FieldError
                  errors={errors.subject ? [errors.subject] : undefined}
                />
              </FieldContent>
            </Field>

            <Field data-invalid={!!errors.message}>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <FieldContent>
                <Textarea
                  id="message"
                  placeholder="Votre message..."
                  rows={6}
                  {...register("message")}
                  className={`${
                    errors.message ? "border-destructive" : ""
                  } text-gray-900 dark:text-gray-100`}
                />
                <FieldError
                  errors={errors.message ? [errors.message] : undefined}
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
              label="Envoyer le message"
              busyLabel="Envoi en cours..."
              icon={<Send className="h-4 w-4" />}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
