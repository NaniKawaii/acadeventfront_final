import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border bg-card p-10 shadow-sm md:grid md:grid-cols-[1.3fr_1fr] md:items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-transparent to-emerald-50" />
        <div className="relative space-y-6">
          <Badge className="bg-primary/10 text-primary" variant="outline">
            Plataforma institucional
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Gestiona eventos académicos con una experiencia moderna y confiable.
          </h1>
          <p className="text-muted-foreground">
            AcadEvent centraliza catálogo, inscripciones, asistencia y certificados
            verificables para toda la universidad.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/events">Explorar eventos</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/login">Ingresar al sistema</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>✔️ Reportes listos para rectoría</span>
            <span>✔️ Control de cupos en tiempo real</span>
            <span>✔️ Certificados con verificación pública</span>
          </div>
        </div>
        <div className="relative mt-10 grid gap-4 md:mt-0">
          {[
            { title: "Eventos activos", value: "12", detail: "+3 esta semana" },
            { title: "Inscripciones confirmadas", value: "1,280", detail: "89% ocupación" },
            { title: "Certificados emitidos", value: "320", detail: "Últimos 30 días" },
          ].map((item) => (
            <Card key={item.title} className="border-muted/60 bg-white/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-3xl font-semibold">{item.value}</span>
                <span className="text-xs text-muted-foreground">{item.detail}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Catálogo y difusión",
            description:
              "Explora eventos por fecha, facultad, modalidad o categoría desde una vista clara.",
          },
          {
            title: "Inscripciones y cupos",
            description:
              "Evita duplicados, habilita lista de espera y envía notificaciones internas.",
          },
          {
            title: "Asistencia inteligente",
            description:
              "Marca asistencia manual o por QR con registro automático de hora.",
          },
          {
            title: "Certificados verificables",
            description:
              "Genera PDFs con códigos únicos y página pública de verificación.",
          },
          {
            title: "Reportes ejecutivos",
            description:
              "Estadísticas por evento, carrera, facultad o rango de fechas.",
          },
          {
            title: "Escalable por fases",
            description:
              "Implementa módulos por etapas sin perder consistencia institucional.",
          },
        ].map((item) => (
          <Card key={item.title} className="border-muted/60 bg-card/80">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{item.description}</CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Roles definidos para universidad</h2>
          <p className="text-muted-foreground">
            Cada perfil tiene flujos claros para operar eventos, mantener control y
            garantizar trazabilidad.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Administrador general",
                detail: "Configura facultades, gestiona organizadores y reportes globales.",
              },
              {
                title: "Organizador",
                detail: "Crea eventos, controla cupos, ponentes y asistencia.",
              },
              {
                title: "Asistente",
                detail: "Se registra, consulta historial y descarga certificados.",
              },
              {
                title: "Control de acceso",
                detail: "Valida QR en puerta sin permisos de edición.",
              },
            ].map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border bg-white/80 p-4 shadow-sm"
              >
                <div className="text-sm font-semibold">{role.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{role.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <Card className="border-muted/60 bg-white/90">
          <CardHeader>
            <CardTitle>Visión institucional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Diseñada para facultades, carreras y unidades académicas, la plataforma
              garantiza gobernanza, métricas confiables y trazabilidad de asistencia.
            </p>
            <div className="space-y-2">
              {[
                "Publicación de eventos con requisitos y cupos",
                "Registro de asistentes internos y externos",
                "Control de asistencia por sesión",
                "Emisión automática de certificados con verificación",
                "Reportes exportables por filtros avanzados",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button className="w-full" asChild>
              <Link href="/auth/register">Solicitar acceso institucional</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
