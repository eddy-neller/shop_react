import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/features/Auth/lib/auth";
import { getMe } from "@/features/User/services/user";
import UserProfileCard from "@/features/User/components/UserProfileCard";
import UserErrorCard from "@/features/User/components/UserErrorCard";

export default async function UserProfilePage() {
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

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <UserProfileCard user={user} isPrivate />
      </div>
    </div>
  );
}
