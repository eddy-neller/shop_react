"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  User,
  CreditCard,
  Key,
  UserCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useLogout } from "@/features/Auth/hooks/useLogout";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function UserNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { logout } = useLogout();
  const [open, setOpen] = useState(false);

  if (!session?.user) return null;

  const username = session.user.name || session.user.email;

  const USER_PATHS = [
    "/user",
    "/user/profile",
    "/user/avatar",
    "/user/password",
  ];
  const isAuthActive = USER_PATHS.some((p) => pathname.startsWith(p));

  return (
    <NavigationMenuItem className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 text-base font-medium transition-all duration-300 rounded-lg",
              "active:scale-95",
              "before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2",
              "before:w-0 before:h-0.5 before:bg-blue-600 before:transition-all before:duration-300",
              "hover:before:w-3/4",
              isAuthActive
                ? "text-blue-600 before:w-3/4 before:bg-blue-600"
                : "text-gray-700 hover:text-blue-600"
            )}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <User className="h-5 w-5" />
            <span className="hidden md:inline">{username}</span>
            <ChevronDown className="h-4 w-4 hidden md:inline" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 p-0"
          align="end"
          sideOffset={8}
          role="menu"
          aria-label="Menu utilisateur"
        >
          <div className="p-1">
            <Link
              href="/user"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors"
            >
              <User className="h-4 w-4" />
              Tableau de bord
            </Link>
            <Link
              href="/user/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors"
            >
              <CreditCard className="h-4 w-4" />
              Profil
            </Link>
            <Separator className="my-1" />
            <Link
              href="/user/avatar"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors"
            >
              <UserCircle className="h-4 w-4" />
              Avatar
            </Link>
            <Link
              href="/user/password"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors"
            >
              <Key className="h-4 w-4" />
              Mot de passe
            </Link>
            <Separator className="my-1" />
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors text-red-600 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </NavigationMenuItem>
  );
}
