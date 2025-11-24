"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, IdCard, Shield, Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RegisterValidationSuccessPage() {
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Récupérer le flag depuis sessionStorage
    const checkValidation = () => {
      if (typeof window !== "undefined") {
        const validationSuccess = sessionStorage.getItem(
          "registerValidationSuccess"
        );
        if (validationSuccess) {
          setIsValid(true);
          sessionStorage.removeItem("registerValidationSuccess");
        } else {
          router.replace("/register");
        }
      }
    };

    // Utiliser requestAnimationFrame pour s'assurer que le DOM est prêt
    requestAnimationFrame(() => {
      requestAnimationFrame(checkValidation);
    });
  }, [router]);

  // Ne rien afficher tant qu'on n'a pas vérifié le flag
  if (isValid === null) {
    return null;
  }
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Card
            className="shadow-lg border border-blue-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, #fff 100%)",
            }}
          >
            <CardContent className="p-8">
              {/* HERO */}
              <div className="text-center mb-8">
                <div className="rounded-full bg-green-100 dark:bg-green-900 inline-flex items-center justify-center w-16 h-16 mb-4">
                  <CheckCircle className="text-green-600 dark:text-green-400 h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Compte activé avec succès !
                </h3>
                <p className="text-muted-foreground mb-0">
                  Votre compte a été activé. Vous pouvez maintenant vous
                  connecter.
                </p>

                <div className="flex justify-center mt-6">
                  <Link href="/login">
                    <Button
                      variant="default"
                      className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Se connecter
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t" />
                <div className="px-3 text-sm text-muted-foreground">
                  Prochaines étapes
                </div>
                <div className="flex-grow border-t" />
              </div>

              {/* NEXT STEPS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Explore dashboard */}
                <Card className="h-full shadow-sm border-0">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="rounded-full bg-blue-100 dark:bg-blue-900 inline-flex items-center justify-center mr-3 w-10 h-10">
                        <Gauge className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold">
                          Explorer le tableau de bord
                        </div>
                        <div className="text-muted-foreground text-sm">
                          Découvrez toutes les fonctionnalités disponibles
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <Badge variant="secondary" className="opacity-75">
                        Recommandé
                      </Badge>
                      <Link
                        href="/login"
                        className="text-sm text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
                      >
                        Continuer <ArrowRight className="inline h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Complete profile */}
                <Card className="h-full shadow-sm border-0">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="rounded-full bg-gray-100 dark:bg-gray-800 inline-flex items-center justify-center mr-3 w-10 h-10">
                        <IdCard className="text-gray-600 dark:text-gray-400 h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold">
                          Compléter votre profil
                        </div>
                        <div className="text-muted-foreground text-sm">
                          Ajoutez vos informations personnelles
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <Badge variant="secondary" className="opacity-75">
                        Optionnel
                      </Badge>
                      <Link
                        href="/login"
                        className="text-sm text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
                      >
                        Commencer <ArrowRight className="inline h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Secure account */}
                <Card className="h-full shadow-sm border-0">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="rounded-full bg-green-100 dark:bg-green-900 inline-flex items-center justify-center mr-3 w-10 h-10">
                        <Shield className="text-green-600 dark:text-green-400 h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold">
                          Sécuriser votre compte
                        </div>
                        <div className="text-muted-foreground text-sm">
                          Configurez l&apos;authentification à deux facteurs
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <Badge variant="secondary" className="opacity-75">
                        Sécurité
                      </Badge>
                      <Link
                        href="/login"
                        className="text-sm text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
                      >
                        En savoir plus{" "}
                        <ArrowRight className="inline h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* TRUST / INFO */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-6">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    Votre compte est maintenant actif et sécurisé.
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-600 text-white"
                    >
                      99.9%
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Disponibilité garantie
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
