"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Lock,
  Shield,
  Users,
  Smile,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ResetPasswordRequestForm from "@/features/Auth/components/ResetPasswordRequestForm";

export default function ForgotPasswordPage() {
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
                    <div className="rounded-full bg-yellow-500 inline-flex items-center justify-center mr-3 w-10 h-10">
                      <Lock className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold mb-1">
                        Mot de passe oublié ?
                      </h1>
                      <p className="text-muted-foreground">
                        Entrez votre adresse email et nous vous enverrons un
                        lien pour réinitialiser votre mot de passe.
                      </p>
                    </div>
                  </div>

                  {/* Formulaire de réinitialisation */}
                  <ResetPasswordRequestForm />

                  {/* Lien retour */}
                  <div className="flex justify-center mt-4 text-sm">
                    <Link
                      href="/login"
                      className="text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline flex items-center"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      Retour à la connexion
                    </Link>
                  </div>

                  {/* Mentions confiance */}
                  <div className="flex items-center justify-between flex-wrap gap-2 mt-6 pt-6 border-t">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Lock className="mr-2 h-4 w-4" />
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

            {/* Colonne "Pourquoi réinitialiser ?" */}
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
                    Pourquoi réinitialiser ?
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex gap-3">
                      <Shield className="mt-1 h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">Sécurité</div>
                        <div className="text-sm text-muted-foreground">
                          Protégez votre compte avec un mot de passe fort et
                          unique.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Lock className="mt-1 h-5 w-5 text-yellow-500 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">Récupération</div>
                        <div className="text-sm text-muted-foreground">
                          Accédez rapidement à votre compte en cas d&apos;oubli.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Users className="mt-1 h-5 w-5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">Support</div>
                        <div className="text-sm text-muted-foreground">
                          Notre équipe est là pour vous aider si besoin.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Smile className="mt-1 h-5 w-5 text-green-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">Tranquillité</div>
                        <div className="text-sm text-muted-foreground">
                          Reprenez le contrôle de votre compte en toute
                          sérénité.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Taux de réinitialisation
                      </span>
                      <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        99.9%
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Taux de succès
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
