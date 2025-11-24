"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Crown, Shield, User, CheckCircle2, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Accent = ({ color }: { color: string }) => (
  <div
    className="rounded-l-lg"
    style={{
      width: "6px",
      alignSelf: "stretch",
      background: color,
    }}
  />
);

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 py-1">
    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
    <span className="text-sm">{children}</span>
  </div>
);

const HeaderCard = ({ username }: { username: string }) => {
  return (
    <Card className="border-0 shadow-sm rounded-2xl mb-4">
      <CardContent className="flex items-center p-6">
        <div className="me-4 flex items-center justify-center rounded-full w-14 h-14 bg-blue-100">
          <User className="text-xl text-blue-600" />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-1">
            Bienvenue, {username} !
          </h3>
          <div className="text-gray-600">Content de vous revoir</div>
        </div>
        <div>
          <Link href="/user/profile">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Voir le profil
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default function UserDashboard() {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const roles = session.user.roles || [];
  const username = session.user.name || session.user.email || "Utilisateur";
  const isAdmin =
    roles.includes("ROLE_ADMIN") || roles.includes("ROLE_SUPER_ADMIN");
  const isModerator = roles.includes("ROLE_MODERATEUR");
  const isMember = !isAdmin && !isModerator;

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      <HeaderCard username={username} />

      {/* Admin Section */}
      {isAdmin && (
        <Card className="border-0 shadow-sm rounded-2xl mb-3">
          <CardContent className="p-0 flex">
            <Accent color="#fbbf24" />
            <div className="p-6 w-full">
              <div className="flex items-center mb-3">
                <div className="me-3 inline-flex items-center justify-center rounded-full w-9 h-9 bg-yellow-100">
                  <Crown className="h-5 w-5 text-yellow-600" />
                </div>
                <h5 className="text-lg font-semibold mb-0">Administrateur</h5>
              </div>
              <p className="text-gray-600 mb-0">
                Vous avez accès à toutes les fonctionnalités administratives du
                site.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Moderator Section (visible only if not admin) */}
      {isModerator && !isAdmin && (
        <Card className="border-0 shadow-sm rounded-2xl mb-3">
          <CardContent className="p-0 flex">
            <Accent color="#3b82f6" />
            <div className="p-6 w-full">
              <div className="flex items-center mb-3">
                <div className="me-3 inline-flex items-center justify-center rounded-full w-9 h-9 bg-blue-100">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <h5 className="text-lg font-semibold mb-0">Modérateur</h5>
              </div>
              <p className="text-gray-600 mb-3">
                En tant que modérateur, vous pouvez gérer le contenu du site.
              </p>
              <div className="space-y-1">
                <FeatureItem>Gérer les actualités</FeatureItem>
                <FeatureItem>Supprimer du contenu</FeatureItem>
                <FeatureItem>Modérer les règles</FeatureItem>
                <FeatureItem>Résoudre les conflits</FeatureItem>
                <FeatureItem>Modérer le forum</FeatureItem>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Member Section (visible only if not moderator) */}
      {isMember && (
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardContent className="p-0 flex">
            <Accent color="#3b82f6" />
            <div className="p-6 w-full">
              <div className="flex items-center mb-3">
                <div className="me-3 inline-flex items-center justify-center rounded-full w-9 h-9 bg-blue-100">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <h5 className="text-lg font-semibold mb-0">Membre</h5>
              </div>
              <p className="text-gray-600 mb-3">
                Bienvenue dans votre espace membre. Profitez de toutes les
                fonctionnalités disponibles.
              </p>
              <div className="space-y-1">
                <FeatureItem>Participer au forum</FeatureItem>
                <FeatureItem>Envoyer des messages privés</FeatureItem>
                <FeatureItem>Accéder aux partenaires</FeatureItem>
                <FeatureItem>Lire les actualités</FeatureItem>
                <FeatureItem>Accéder aux contenus privés</FeatureItem>
                <FeatureItem>Gérer votre profil</FeatureItem>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
