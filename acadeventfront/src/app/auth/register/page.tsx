"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchJson } from "@/lib/utils";

type Faculty = {
  id: string;
  name: string;
};

type Career = {
  id: string;
  name: string;
  facultyId: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [facultyId, setFacultyId] = useState<string | null>(null);
  const [careerId, setCareerId] = useState<string | null>(null);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["ASISTENTE"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [facultiesResponse, careersResponse] = await Promise.all([
          fetchJson<Faculty[]>("/faculties"),
          fetchJson<Career[]>("/careers"),
        ]);
        setFaculties(facultiesResponse);
        setCareers(careersResponse);
      } catch {
        setFaculties([]);
        setCareers([]);
      }
    };
    void loadOptions();
  }, []);

  const handleRegister = async () => {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedName || !trimmedEmail || !password) {
      setError("Completa los datos obligatorios.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await fetchJson("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: trimmedName,
          email: trimmedEmail,
          password,
          roles: selectedRoles,
          facultyId,
          careerId,
        }),
      });
      router.push("/auth/login");
    } catch {
      setError("No se pudo registrar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  const availableCareers = facultyId
    ? careers.filter((career) => career.facultyId === facultyId)
    : careers;

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <div className="text-sm font-medium">Nombre completo</div>
            <Input
              placeholder="Nombre y apellidos"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Correo institucional</div>
            <Input
              type="email"
              placeholder="correo@universidad.edu"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Facultad</div>
            <Select value={facultyId ?? ""} onValueChange={(value) => setFacultyId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona facultad" />
              </SelectTrigger>
              <SelectContent>
                {faculties.length === 0 ? (
                  <SelectItem value="__empty_faculty__" disabled>
                    Sin facultades
                  </SelectItem>
                ) : (
                  faculties.map((faculty) => (
                    <SelectItem key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Carrera</div>
            <Select value={careerId ?? ""} onValueChange={(value) => setCareerId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona carrera" />
              </SelectTrigger>
              <SelectContent>
                {availableCareers.length === 0 ? (
                  <SelectItem value="__empty_career__" disabled>
                    Sin carreras
                  </SelectItem>
                ) : (
                  availableCareers.map((career) => (
                    <SelectItem key={career.id} value={career.id}>
                      {career.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <div className="text-sm font-medium">Roles</div>
            <div className="space-y-2">
              {[
                { value: "ASISTENTE", label: "Asistente" },
                { value: "ORGANIZADOR", label: "Organizador" },
                { value: "ADMIN", label: "Administrador" },
                { value: "SCANNER", label: "Scanner" },
              ].map((roleOption) => (
                <label key={roleOption.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(roleOption.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRoles([...selectedRoles, roleOption.value]);
                      } else {
                        setSelectedRoles(selectedRoles.filter(r => r !== roleOption.value));
                      }
                    }}
                  />
                  <span>{roleOption.label}</span>
                </label>
              ))}
            </div>
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
          <div className="space-y-2">
            <div className="text-sm font-medium">Confirmar contraseña</div>
            <Input
              type="password"
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Button className="w-full" onClick={handleRegister} disabled={loading}>
              {loading ? "Registrando..." : "Registrarme"}
            </Button>
          </div>
          {error ? (
            <div className="md:col-span-2 text-sm text-destructive">{error}</div>
          ) : null}
          <div className="md:col-span-2 text-center text-sm text-muted-foreground">
            <Link href="/auth/login" className="hover:underline">
              Ya tengo cuenta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
