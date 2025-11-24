"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthNav from "@/features/Auth/components/AuthNav";
import UserNav from "@/features/User/components/UserNav";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
            >
              E.N Shop
            </Link>
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "relative px-4 py-2 text-base font-medium transition-all duration-300 rounded-lg",
                            "active:scale-95",
                            "before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2",
                            "before:w-0 before:h-0.5 before:bg-blue-600 before:transition-all before:duration-300",
                            "hover:before:w-3/4",
                            isActive
                              ? "text-blue-600 before:w-3/4 before:bg-blue-600"
                              : "text-gray-700 hover:text-blue-600"
                          )}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              {!isAuthenticated ? <AuthNav /> : <UserNav />}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
}
