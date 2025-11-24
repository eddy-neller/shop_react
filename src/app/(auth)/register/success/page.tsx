"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Mail, Clock, LogIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RegisterSuccessPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer l'email depuis sessionStorage
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("registerEmail");
      if (storedEmail) {
        setEmail(storedEmail);
        sessionStorage.removeItem("registerEmail");
      } else {
        router.replace("/register");
      }
    }
  }, [router]);

  if (!email) {
    return null; // Ou un loader pendant la redirection
  }

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
              <div className="text-center mb-6">
                <div className="rounded-full bg-green-100 dark:bg-green-900 inline-flex items-center justify-center w-16 h-16 mb-4">
                  <CheckCircle className="text-green-600 dark:text-green-400 h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Inscription réussie !
                </h3>
                <p className="text-muted-foreground">
                  Un email de confirmation a été envoyé à{" "}
                  <strong>{email}</strong>
                </p>
              </div>

              <div className="mt-6 mb-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <strong>Ouvrez votre boîte mail</strong> et cliquez sur le
                      lien de confirmation pour activer votre compte.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      Le lien de confirmation est valide pendant{" "}
                      <strong>24 heures</strong>. Après ce délai, vous devrez
                      demander un nouveau lien.
                    </p>
                  </div>
                </div>
              </div>

              <Alert className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                <AlertDescription className="text-sm">
                  <strong>Important :</strong> Vous devez activer votre compte
                  avant de pouvoir vous connecter.
                </AlertDescription>
              </Alert>

              <div className="text-center">
                <Link href="/login">
                  <Button
                    variant="default"
                    className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Aller à la page de connexion
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
