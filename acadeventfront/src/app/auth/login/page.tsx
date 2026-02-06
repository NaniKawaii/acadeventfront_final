"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchJson } from "@/lib/utils";

type User = {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  facultyId?: string | null;
  careerId?: string | null;
};

type AuthResponse = {
  user: User;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      setError("Completa el correo y la contraseña.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetchJson<AuthResponse>("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          password,
        }),
      });
      localStorage.setItem("acadevent_user", JSON.stringify(response.user));
      const { roles } = response.user;
      if (roles.includes("ADMIN")) {
        router.push("/admin/dashboard");
        return;
      }
      if (roles.includes("ORGANIZADOR")) {
        router.push("/organizer/dashboard");
        return;
      }
      if (roles.includes("SCANNER")) {
        router.push("/scanner");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Correo</div>
            <Input
              type="email"
              placeholder="correo@universidad.edu"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Contraseña</div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
          {error ? <div className="text-sm text-destructive">{error}</div> : null}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <Link href="/auth/register" className="hover:underline">
              Crear cuenta
            </Link>
            <Link href="/verify" className="hover:underline">
              Verificar certificado
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
