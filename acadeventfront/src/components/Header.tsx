"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";

interface User {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("acadevent_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem("acadevent_user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "acadevent_user") {
        checkUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("acadevent_user");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            AcadEvent
          </Link>
          <span className="hidden rounded-full border px-2 py-1 text-xs text-muted-foreground md:inline-flex">
            Gestión académica institucional
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {[
            { href: "/events", label: "Eventos" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "/organizer/dashboard", label: "Organizador" },
            { href: "/admin/dashboard", label: "Admin" },
            { href: "/scanner", label: "Scanner" },
            { href: "/notifications", label: "Notificaciones" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 transition hover:bg-muted/70 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.fullName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Editar perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm font-medium">
                Iniciar sesión
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}