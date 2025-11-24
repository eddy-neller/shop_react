"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, Loader2, Lock, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { checkPasswordResetToken } from "@/features/Auth/services/auth";
import ResetPasswordConfirmForm from "@/features/Auth/components/ResetPasswordConfirmForm";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const noToken = !token.trim();
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  const mutation = useMutation({
    mutationFn: (token: string) => checkPasswordResetToken({ token }),
    onSuccess: () => {
      setIsTokenValid(true);
    },
    onError: () => {
      setIsTokenValid(false);
    },
  });

  // Vérifier le token au chargement
  useEffect(() => {
    if (!noToken) {
      mutation.mutate(token);
    } else {
      setIsTokenValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noToken, token]);

  // Afficher la vérification
  if (isTokenValid === null) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card
              className="shadow-lg border border-blue-100"
              style={{
                background:
                  "linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, #fff 100%)",
              }}
            >
              <CardContent className="p-8">
                {mutation.isPending && (
                  <div
                    className="text-center"
                    aria-live="polite"
                    aria-busy="true"
                  >
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                    <p className="text-muted-foreground mt-3 mb-0">
                      Vérification du lien en cours...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Si le token est invalide
  if (!isTokenValid) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card
              className="shadow-lg border border-blue-100"
              style={{
                background:
                  "linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, #fff 100%)",
              }}
            >
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="rounded-full bg-red-100 dark:bg-red-900 inline-flex items-center justify-center w-16 h-16 mb-4">
                    <XCircle className="text-red-600 dark:text-red-400 h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Lien invalide ou expiré
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Ce lien de réinitialisation n&apos;est plus valide ou a
                    expiré. Veuillez demander un nouveau lien.
                  </p>
                  <Link href="/forgot-password">
                    <Button
                      variant="default"
                      className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Demander un nouveau lien
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Si le token est valide, afficher le formulaire
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2">
              <Card
                className="shadow-lg border border-blue-100"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, #fff 100%)",
                }}
              >
                <CardContent className="p-6">
                  {/* Header / Hero */}
                  <div className="flex items-center mb-6">
                    <div className="rounded-full bg-green-500 inline-flex items-center justify-center mr-3 w-10 h-10">
                      <Lock className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold mb-1">
                        Réinitialiser votre mot de passe
                      </h1>
                      <p className="text-muted-foreground">
                        Définissez un nouveau mot de passe pour votre compte{" "}
                        <strong>E.N Shop</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Formulaire de confirmation */}
                  <ResetPasswordConfirmForm token={token} />

                  {/* Note de sécurité */}
                  <Alert className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Note de sécurité :</strong> Assurez-vous de
                      choisir un mot de passe fort et unique que vous
                      n&apos;utilisez nulle part ailleurs.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            {/* Colonne d'information */}
            <div className="lg:col-span-1">
              <Card
                className="h-full shadow-lg border border-blue-100"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, #fff 100%)",
                }}
              >
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Exigences</h2>
                  <div className="mb-4">
                    <p className="text-muted-foreground text-sm mb-3">
                      Votre mot de passe doit respecter les critères suivants :
                    </p>
                    <ul className="text-muted-foreground text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Au moins 8 caractères</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Une lettre majuscule</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Une lettre minuscule</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Un chiffre</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Un caractère spécial (@$!%*?&)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">
                      <strong>Astuce :</strong> Utilisez un gestionnaire de mots
                      de passe pour générer et stocker des mots de passe forts
                      et uniques.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
