import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/features/Auth/lib/auth";
import EditPasswordForm from "@/features/User/components/EditPasswordForm";

export default async function UserEditPasswordPage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/login");
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <EditPasswordForm />
      </div>
    </div>
  );
}
