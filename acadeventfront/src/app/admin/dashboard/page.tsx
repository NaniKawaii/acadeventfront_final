import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RoleGuard from "@/components/role-guard";
import { Users, GraduationCap, BookOpen, Mic } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="space-y-8">
        <section className="rounded-3xl border bg-card p-8 shadow-sm">
          <h1 className="text-3xl font-semibold">Panel administrativo</h1>
          <p className="mt-2 text-muted-foreground">
            Supervisión general de eventos, usuarios, facultades y métricas institucionales.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-muted/60 bg-white/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,520</div>
              <p className="text-xs text-muted-foreground">Usuarios registrados</p>
              <Link href="/admin/users">
                <Button className="mt-3 w-full" size="sm">
                  Gestionar Usuarios
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-muted/60 bg-white/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Facultades</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Facultades configuradas</p>
              <Link href="/admin/faculties">
                <Button className="mt-3 w-full" size="sm">
                  Gestionar Facultades
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-muted/60 bg-white/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carreras</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Carreras registradas</p>
              <Link href="/admin/careers">
                <Button className="mt-3 w-full" size="sm">
                  Gestionar Carreras
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-muted/60 bg-white/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ponentes</CardTitle>
              <Mic className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Ponentes disponibles</p>
              <Link href="/admin/speakers">
                <Button className="mt-3 w-full" size="sm">
                  Gestionar Ponentes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="border-muted/60 bg-white/90">
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/admin/users">
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Crear Usuario
                </Button>
              </Link>
              <Link href="/admin/faculties">
                <Button variant="outline" className="w-full">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Nueva Facultad
                </Button>
              </Link>
              <Link href="/admin/careers">
                <Button variant="outline" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Nueva Carrera
                </Button>
              </Link>
              <Link href="/admin/speakers">
                <Button variant="outline" className="w-full">
                  <Mic className="mr-2 h-4 w-4" />
                  Nuevo Ponente
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
