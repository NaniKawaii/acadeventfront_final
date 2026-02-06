"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchJson } from "@/lib/utils";
import RoleGuard from "@/components/role-guard";

type Registration = {
  id: string;
  event: {
    id: string;
    title: string;
    startAt: string;
  };
  status: string;
  qrCode?: {
    qrToken: string;
  };
};

type Certificate = {
  id: string;
  event: {
    title: string;
  };
  verificationCode: string;
};

export default function AssistantDashboardPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("acadevent_user") || "{}");
        if (!user.id) return;

        const [regs, certs] = await Promise.all([
          fetchJson<Registration[]>(`/users/${user.id}/registrations`),
          fetchJson<Certificate[]>(`/users/${user.id}/certificates`)
        ]);

        setRegistrations(regs);
        setCertificates(certs);
      } catch {
        // Ignore
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateQr = async (registrationId: string) => {
    try {
      await fetchJson(`/qr-codes/registrations/${registrationId}`, {
        method: "POST",
      });
      // Refresh data
      const user = JSON.parse(localStorage.getItem("acadevent_user") || "{}");
      const regs = await fetchJson<Registration[]>(`/users/${user.id}/registrations`);
      setRegistrations(regs);
    } catch (error) {
      alert("Error generando QR");
    }
  };

  if (loading) {
    return <div className="p-8">Cargando...</div>;
  }
  return (
    <RoleGuard allowedRoles={["ASISTENTE"]}>
      <div className="space-y-8">
        <section className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border bg-card p-8 shadow-sm">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard del asistente</h1>
            <p className="text-muted-foreground">
              Revisa tus inscripciones, certificados y eventos próximos.
            </p>
          </div>
          <Button asChild>
            <Link href="/events">Explorar eventos</Link>
          </Button>
        </section>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Eventos inscritos", value: registrations.length.toString(), detail: "Activos" },
            { title: "Certificados emitidos", value: certificates.length.toString(), detail: "Verificados" },
            {
              title: "Próximo evento",
              value: registrations.length > 0 ? new Date(registrations[0].event.startAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) : "—",
              detail: registrations.length > 0 ? registrations[0].event.title : "Sin eventos",
            },
          ].map((item) => (
            <Card key={item.title} className="border-muted/60 bg-white/90">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-semibold">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.detail}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-muted/60 bg-white/90">
            <CardHeader>
              <CardTitle>Mis inscripciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {registrations.map((registration) => (
                <div
                  key={registration.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/30 px-4 py-3"
                >
                  <div>
                    <div className="font-medium">{registration.event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Fecha: {new Date(registration.event.startAt).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{registration.status}</Badge>
                    {registration.status === 'INSCRITO' && (
                      <Button size="sm" variant="outline" onClick={() => generateQr(registration.id)}>
                        Generar QR
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-muted/60 bg-white/90">
            <CardHeader>
              <CardTitle>Mis certificados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/30 px-4 py-3"
                >
                  <div>
                    <div className="font-medium">{certificate.event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Código: {certificate.verificationCode}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/verify?code=${certificate.verificationCode}`}>Verificar</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleGuard>
  );
}
