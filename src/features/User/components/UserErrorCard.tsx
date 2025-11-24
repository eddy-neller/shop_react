"use client";

import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UserErrorCard() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <CardTitle>Erreur</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Impossible de charger les informations de votre profil. Veuillez
          réessayer plus tard.
        </p>
        <Button onClick={() => router.refresh()} variant="outline">
          Réessayer
        </Button>
      </CardContent>
    </Card>
  );
}
