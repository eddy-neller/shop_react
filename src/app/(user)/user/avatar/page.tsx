import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/features/Auth/lib/auth";
import { getMe } from "@/features/User/services/user";
import AvatarForm from "@/features/User/components/AvatarForm";
import UserAvatar from "@/features/User/components/UserAvatar";
import UserErrorCard from "@/features/User/components/UserErrorCard";
import { coupeMot, supRepLettre } from "@/lib/utils/format";
import { Card, CardContent } from "@/components/ui/card";

export default async function UserAvatarPage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/login");
  }

  let user;
  try {
    user = await getMe();
  } catch {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <UserErrorCard />
        </div>
      </div>
    );
  }

  const formattedUser = {
    username: coupeMot(supRepLettre(user.username), 15),
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <p className="text-muted-foreground mb-4">
                  Un avatar est une petite image qui aide les visiteurs à vous
                  reconnaître facilement. Il doit être carré, d&apos;une taille
                  standard de 96x96 pixels et d&apos;un poids maximum de 200 KB.
                </p>
                {user.avatarUrl && (
                  <div className="flex justify-center">
                    <UserAvatar
                      avatarUrl={user.avatarUrl}
                      username={formattedUser.username}
                    />
                  </div>
                )}
                <p className="text-sm text-muted-foreground mb-6">
                  Dernier point, si l&apos;image contient un contenu pouvant
                  être jugé offensant ou inapproprié pour les visiteurs,
                  l&apos;administrateur se réserve le droit de supprimer
                  l&apos;avatar.
                </p>
              </div>
            </CardContent>
          </Card>

          <AvatarForm />
        </div>
      </div>
    </div>
  );
}
