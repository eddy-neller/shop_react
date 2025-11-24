"use client";

import Link from "next/link";
import { UserPlus, Shield, CheckCircle, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RegisterForm from "@/features/Auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne formulaire */}
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
                    <div className="rounded-full bg-blue-600 inline-flex items-center justify-center mr-3 w-10 h-10">
                      <UserPlus className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold mb-1">
                        Créer un compte
                      </h1>
                      <p className="text-muted-foreground">
                        Rejoignez <strong>E.N Shop</strong> dès maintenant.
                      </p>
                    </div>
                  </div>

                  {/* Boutons SSO */}
                  <div className="grid gap-2 mb-4">
                    <Button
                      variant="outline"
                      className="w-full font-semibold flex items-center justify-center"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Continuer avec Google
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-semibold flex items-center justify-center"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Continuer avec Facebook
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-semibold flex items-center justify-center"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.405-2.037 4.537-1.142 1.131-2.688 1.858-4.531 2.037-.169.014-.338.021-.508.021s-.339-.007-.508-.021c-1.843-.179-3.389-.906-4.531-2.037-1.141-1.132-1.868-2.679-2.037-4.537C3.007 7.988 3 7.819 3 7.65s.007-.338.021-.508c.169-1.858.896-3.405 2.037-4.537C6.2 1.474 7.746.747 9.589.568 9.758.554 9.927.547 10.097.547s.339.007.508.021c1.843.179 3.389.906 4.531 2.037 1.141 1.132 1.868 2.679 2.037 4.537.014.17.021.339.021.508s-.007.338-.021.508z" />
                      </svg>
                      Continuer avec Apple
                    </Button>
                  </div>

                  {/* Séparateur */}
                  <div className="flex items-center my-6">
                    <div className="flex-grow border-t" />
                    <div className="px-2 text-sm text-muted-foreground">ou</div>
                    <div className="flex-grow border-t" />
                  </div>

                  <RegisterForm />

                  <div className="text-center mt-6">
                    <span className="text-muted-foreground text-sm">
                      Vous avez déjà un compte ?{" "}
                    </span>
                    <Link
                      href="/login"
                      className="font-semibold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
                    >
                      Se connecter
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

            {/* Colonne bénéfices */}
            <div className="lg:col-span-1">
              <Card
                className="h-full shadow-lg border border-blue-100"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, #fff 100%)",
                }}
              >
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Pourquoi nous rejoindre ?
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex gap-3">
                      <Zap className="mt-1 h-5 w-5 text-yellow-500 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Onboarding rapide
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Mettez-vous en route en quelques minutes avec notre
                          processus d&apos;intégration simplifié.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 text-green-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Meilleures pratiques
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Bénéficiez de nos années d&apos;expérience et de nos
                          meilleures pratiques éprouvées.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Shield className="mt-1 h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">Sécurité</div>
                        <div className="text-sm text-muted-foreground">
                          Vos données sont protégées avec les dernières
                          technologies de sécurité.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Disponibilité
                      </span>
                      <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        99.9%
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Garantie de disponibilité
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
