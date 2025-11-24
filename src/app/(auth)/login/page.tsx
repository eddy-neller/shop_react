import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/features/Auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Connexion - E.N Shop",
  description:
    "Connectez-vous à votre compte pour accéder à votre espace personnel.",
};

export default function LoginPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Bienvenue</h1>
            <p className="text-gray-600">
              Connectez-vous à votre compte pour continuer
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-medium underline-offset-4 hover:underline"
              >
                Créer un compte
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 font-medium underline-offset-4 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
