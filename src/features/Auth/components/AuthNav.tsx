"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, UserPlus, LogIn } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";

const CLOSE_DELAY = 150; // couvre le petit gap au survol

export default function AuthNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const AUTH_PATHS = ["/login", "/register", "/forgot-password"];
  const isAuthActive = AUTH_PATHS.some((p) => pathname.startsWith(p));

  const openAuth = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  };

  const scheduleCloseAuth = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, CLOSE_DELAY);
  };

  const closeAuthNow = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(false);
  }, []);

  // Fermer le panel lors du changement de route
  useEffect(() => {
    closeAuthNow();
  }, [pathname, closeAuthNow]);

  // Nettoyer le timer au démontage
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <NavigationMenuItem
      onMouseEnter={openAuth}
      onMouseLeave={scheduleCloseAuth}
      className="relative"
    >
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
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="authPanel"
            onClick={(e) => e.preventDefault()}
          >
            <User className="h-5 w-5" />
            <span className="hidden md:inline">
              S&apos;inscrire / Se connecter
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          id="authPanel"
          className="w-80 p-0"
          align="end"
          sideOffset={8}
          role="dialog"
          aria-label="Panneau d'authentification"
          onMouseEnter={openAuth}
          onMouseLeave={scheduleCloseAuth}
        >
          <div className="p-4">
            <div className="mb-4">
              <h6 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                Bienvenue
              </h6>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Choisissez une option pour continuer
              </div>
            </div>

            <div className="space-y-2">
              <Link href="/login" onClick={closeAuthNow}>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Se connecter
                </Button>
              </Link>

              <div className="mt-3">
                <Link href="/register" onClick={closeAuthNow}>
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Créer un compte
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-center mt-3">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 underline-offset-4 hover:underline transition-colors"
                onClick={closeAuthNow}
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </NavigationMenuItem>
  );
}
