"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Mail,
  Clock,
  ArrowLeft,
  Shield,
  Users,
  Smile,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ForgotPasswordSuccessPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Récupérer l'email depuis sessionStorage
    const checkValidation = () => {
      if (typeof window !== "undefined") {
        const storedEmail = sessionStorage.getItem("forgotPasswordEmail");
        if (storedEmail) {
          setEmail(storedEmail);
          sessionStorage.removeItem("forgotPasswordEmail");
        } else {
          router.replace("/forgot-password");
        }
      }
    };

    // Utiliser requestAnimationFrame pour s'assurer que le DOM est prêt
    requestAnimationFrame(() => {
      requestAnimationFrame(checkValidation);
    });
  }, [router]);

  if (!email) {
    return null; // Ou un loader pendant la redirection
  }

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
                      <CheckCircle className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold mb-1">
                        Email envoyé avec succès !
                      </h1>
                      <p className="text-muted-foreground">
                        Un email de réinitialisation a été envoyé à{" "}
                        <strong>{email}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Message de succès */}
                  <div className="text-center mb-6">
                    <Mail className="text-blue-600 mx-auto mb-4 h-12 w-12" />
                    <h5 className="mb-3 font-semibold">
                      Vérifiez votre boîte mail
                    </h5>
                    <p className="text-muted-foreground mb-4">
                      Cliquez sur le lien dans l&apos;email pour réinitialiser
                      votre mot de passe.
                    </p>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-center text-muted-foreground text-sm mb-2">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Le lien est valide pendant 15 minutes</span>
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Vous n&apos;avez pas reçu l&apos;email ?{" "}
                        <Link
                          href="/forgot-password"
                          className="text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
                        >
                          Demander un nouveau lien
                        </Link>
                        .
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-center gap-2">
                    <Link href="/login">
                      <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à la connexion
                      </Button>
                    </Link>
                    <Link href="/forgot-password">
                      <Button variant="outline" size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Renvoyer l&apos;email
                      </Button>
                    </Link>
                  </div>

                  {/* Mentions confiance */}
                  <div className="flex items-center justify-between flex-wrap gap-2 mt-6 pt-6 border-t">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Sécurisé</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      <span>Pas de spam</span>
                    </div>
                  </div>
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
                  <h2 className="text-xl font-bold mb-4">Prochaines étapes</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex gap-3">
                      <Mail className="mt-1 h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Vérifiez votre boîte mail
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Ouvrez l&apos;email que nous venons de vous envoyer.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Shield className="mt-1 h-5 w-5 text-yellow-500 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Cliquez sur le lien
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Le lien vous redirigera vers la page de
                          réinitialisation.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Users className="mt-1 h-5 w-5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Définissez un nouveau mot de passe
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Choisissez un mot de passe fort et unique.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Smile className="mt-1 h-5 w-5 text-green-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">Connectez-vous</div>
                        <div className="text-sm text-muted-foreground">
                          Utilisez votre nouveau mot de passe pour vous
                          connecter.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Niveau de sécurité
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-green-600 text-white"
                      >
                        Élevé
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Protection maximale
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
